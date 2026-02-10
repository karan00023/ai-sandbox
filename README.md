# Comprehensive Fitness, Sobriety & Fertility Tracker

A local-first web application for Karan's 8-week transformation (Feb 9, 2026 → Apr 6, 2026) and 90-day sobriety/fertility milestone plan (to May 10, 2026), with an elegant black default theme inspired by iOS-style dark UI.

## Implemented feature coverage

- Dashboard with week/day counters, clean streak, milestone countdown, weight/waist snapshots, and macro/workout summaries.
- Sobriety tracker with clean/relapse logging, streak heatmap, and milestone messaging.
- Full weekly workout schedule with per-exercise completion and weight entry.
- Nutrition logging with macro targets, high-carb training day rules, and avoid-food note flagging.
- Supplement checklists by schedule windows and adherence summary.
- Weekly metrics input (weight/waist/body fat) and progress photo storage.
- Weekly check-in questionnaire.
- Fertility milestone timeline with status progression.
- Home gym shopping checklist with purchase links and live budget range.
- Educational knowledge base sections (body recomposition, fertility, nutrition, overload, recovery).
- Settings/customization: units, theme, check-in day, reminder times.
- Data management: JSON export, CSV export, and reset program action.

## How to run (important)

Run the server **from this project folder** (not from your home directory):

```bash
cd /workspace/ai-sandbox
python3 -m http.server 4173
```

Then open:

- <http://localhost:4173/index.html>

## Troubleshooting

If you see a "Directory listing for /" page, it means the server was started in the wrong folder.

1. Stop the server (`Ctrl + C`)
2. Run:

```bash
cd /workspace/ai-sandbox
python3 -m http.server 4173
```

3. Open <http://localhost:4173/index.html> directly.

## Storage model

All data is persisted in browser localStorage:

- `fitness-fertility-tracker-v2`

## Deploy publicly (shareable URL)

This project is static HTML/CSS/JS, so it can be deployed without a build step.

### Option A: Vercel

1. Push this folder to a Git repository.
2. Import the repo into Vercel.
3. Framework preset: **Other**.
4. Build command: *(leave empty)*
5. Output directory: `.`

A `vercel.json` file is included to serve static files with clean URLs.

### Option B: Netlify

1. Push this folder to a Git repository.
2. Import the repo in Netlify.
3. Build command: *(leave empty)*
4. Publish directory: `.`

After deploy, share the generated URL from the host dashboard.
