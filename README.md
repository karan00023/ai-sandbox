# Comprehensive Fitness, Sobriety & Fertility Tracker

## Your live link (after I push to your GitHub)

- **https://karan00023.github.io/ai-sandbox/**

I configured automatic GitHub Pages deployment, so every update pushed to `main` will auto-update this same link.

## What I set up for you

- Tab-based app UI for all sections (dashboard, sobriety, workout, nutrition, supplements, metrics, check-in, fertility, shopping, learning, settings).
- Data tracking in browser local storage (works on the live website without local setup).
- Optional backend (`server.py` + SQLite) still included for local/full-server mode.
- Auto-deploy workflow: `.github/workflows/deploy-pages.yml`.

## GitHub Pages activation

The workflow now includes `enablement: true`, so it can auto-enable Pages for this repo when it runs with proper permissions.

If your org/repo policy blocks that, set it once manually in **Settings → Pages → Build and deployment → GitHub Actions**.

## If you want server + database on a real hosted backend

GitHub Pages is static-only. For online SQLite-backed APIs, deploy `server.py` to Render/Railway/Fly.
