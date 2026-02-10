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

I changed deployment to publish a `gh-pages` branch (this avoids the failing Pages API call you saw).

In GitHub do this once:
1. **Settings → Pages**
2. **Build and deployment → Source: Deploy from a branch**
3. Branch: **gh-pages** (folder `/`)

After that, every push to `main` updates your live link automatically.

## If you want server + database on a real hosted backend

GitHub Pages is static-only. For online SQLite-backed APIs, deploy `server.py` to Render/Railway/Fly.
