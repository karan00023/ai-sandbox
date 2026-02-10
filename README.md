# Comprehensive Fitness, Sobriety & Fertility Tracker

## Your live link (after I push to your GitHub)

- **https://karan00023.github.io/ai-sandbox/**

I configured automatic GitHub Pages deployment, so every update pushed to `main` will auto-update this same link.

## What I set up for you

- Tab-based app UI for all sections (dashboard, sobriety, workout, nutrition, supplements, metrics, check-in, fertility, shopping, learning, settings).
- Data tracking in browser local storage (works on the live website without local setup).
- Optional backend (`server.py` + SQLite) still included for local/full-server mode.
- Auto-deploy workflow: `.github/workflows/deploy-pages.yml`.

## One-time GitHub setting (needed once)

In your GitHub repo:
1. Open **Settings** → **Pages**
2. Under **Build and deployment**, choose **GitHub Actions**

After that, pushes to `main` will publish automatically.

## If you want server + database on a real hosted backend

GitHub Pages is static-only. For online SQLite-backed APIs, deploy `server.py` to Render/Railway/Fly.
This is now a **full application**:
- Frontend: tabbed UI (`index.html`, `style.css`, `app.js`)
- Backend API: Python server (`server.py`)
- Database: SQLite (`tracker.db` auto-created)

## What changed

- Added tabbed navigation for better UX (Dashboard, Sobriety, Workout, Nutrition, Supplements, Metrics, Check-In, Fertility, Shopping, Learn, Settings).
- Added backend API endpoints:
  - `GET /api/health`
  - `GET /api/state`
  - `PUT /api/state`
  - `POST /api/reset`
- Added SQLite persistence so data is saved in `tracker.db` (not only browser localStorage).
- Kept local export tools (JSON/CSV).

## Run locally

```bash
cd /workspace/ai-sandbox
python3 server.py
```

Open:
- http://127.0.0.1:4173

## Verify backend + DB

```bash
curl http://127.0.0.1:4173/api/health
curl http://127.0.0.1:4173/api/state
```

SQLite DB file should appear:
- `tracker.db`

## Put it on your GitHub

From your machine terminal:

```bash
cd ~/workspace
rm -rf ai-sandbox

git clone https://github.com/karan00023/ai-sandbox.git
cd ai-sandbox

# copy these updated files in, then:
git add .
git commit -m "Upgrade to full app with tabbed UI and SQLite backend"
git push origin main
```

## Deploy options

### A) Render / Railway (recommended for SQLite + backend)
Deploy as a Python web service with start command:

```bash
python3 server.py
```

### B) Vercel/Netlify
Only suitable for static frontend (no SQLite backend). For full DB features, use Render/Railway/Fly.io.
