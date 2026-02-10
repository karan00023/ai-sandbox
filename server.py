#!/usr/bin/env python3
import json
import sqlite3
from datetime import datetime, timezone
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

DB_PATH = Path('tracker.db')


def db_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS app_state (
          id INTEGER PRIMARY KEY CHECK (id = 1),
          data TEXT NOT NULL,
          updated_at TEXT NOT NULL
        )
        """
    )
    conn.commit()
    return conn


def load_state():
    with db_conn() as conn:
        row = conn.execute("SELECT data FROM app_state WHERE id = 1").fetchone()
        return json.loads(row[0]) if row else {}


def save_state(state):
    payload = json.dumps(state)
    now = datetime.now(timezone.utc).isoformat()
    with db_conn() as conn:
        conn.execute(
            """
            INSERT INTO app_state (id, data, updated_at)
            VALUES (1, ?, ?)
            ON CONFLICT(id) DO UPDATE SET data=excluded.data, updated_at=excluded.updated_at
            """,
            (payload, now),
        )
        conn.commit()


def reset_state():
    with db_conn() as conn:
        conn.execute("DELETE FROM app_state WHERE id=1")
        conn.commit()


class Handler(SimpleHTTPRequestHandler):
    def _send_json(self, code, data):
        body = json.dumps(data).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == '/api/health':
            return self._send_json(200, {'ok': True})
        if self.path == '/api/state':
            return self._send_json(200, {'state': load_state()})
        return super().do_GET()

    def do_PUT(self):
        if self.path != '/api/state':
            return self._send_json(404, {'error': 'Not found'})
        content_len = int(self.headers.get('Content-Length', '0'))
        raw = self.rfile.read(content_len) if content_len else b'{}'
        try:
            data = json.loads(raw.decode('utf-8'))
            state = data.get('state', {})
            if not isinstance(state, dict):
                return self._send_json(400, {'error': 'state must be an object'})
            save_state(state)
            return self._send_json(200, {'ok': True})
        except json.JSONDecodeError:
            return self._send_json(400, {'error': 'Invalid JSON'})

    def do_POST(self):
        if self.path == '/api/reset':
            reset_state()
            return self._send_json(200, {'ok': True})
        return self._send_json(404, {'error': 'Not found'})


if __name__ == '__main__':
    server = ThreadingHTTPServer(('0.0.0.0', 4173), Handler)
    print('Serving full app on http://127.0.0.1:4173 (SQLite: tracker.db)')
    server.serve_forever()
