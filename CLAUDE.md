# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, dependency-free single-page app for planning a trip to Nerja (Spain): a checklist of activities/beaches/food ideas with categories, favorites, notes, and a day field. No build step, no package manager, no framework, no tests.

## Running it

- Open `index.html` directly in a browser, or
- Serve it locally to test the PWA/service-worker behavior (service worker only registers when not loaded via `file:`):
  ```bash
  python3 -m http.server 8000
  ```
  then visit `http://localhost:8000`.

There is no build, lint, or test command — there's nothing to compile and no test suite.

## Deployment

Per `README.md`, the app is meant to be published via GitHub Pages from the `main` branch (`Settings > Pages > Build and deployment > GitHub Actions`), served at `https://daviddel28.github.io/vacaciones_nerja/`. `.nojekyll` is present so Pages serves files as-is without Jekyll processing. Note: the README references a `.github/workflows/pages.yml` workflow, but as of this writing there is no `.github` directory in the repo — that workflow doesn't exist yet, so don't assume Pages deploys will run until it's added.

## Architecture

There's no module system — everything in `app.js` runs as one script tag loaded by `index.html`.

- **`app.js`** — all state and behavior:
  - `state` is a single mutable object: `{ activities, status, category, search, editingId }`.
  - `activities` is an array of plain objects: `{ id, title, category, day, notes, done, favorite }`. `initialActivities` is the seed data used the first time the app runs (or after "reset"); `quickIdeas` are the one-tap suggestion chips (added via the same `addActivity()` path).
  - Persistence is trivial: `loadActivities()`/`saveActivities()` read/write the entire `activities` array as JSON to `localStorage` under `STORAGE_KEY` (`"nerja-vacation-plan-v1"`). There's no migration logic — bumping the data shape means bumping this key or handling old shapes in `loadActivities`.
  - Rendering is a manual, full re-render on every state change (no virtual DOM/diffing): `render()` calls `renderCounts()` and `renderActivities()`, which filters via `getFilteredActivities()` (status/category/search), groups via `groupByCategory()`, and rebuilds the DOM under `#activityList` from scratch using `createActivityCard()`. `renderQuickIdeas()` is separate and only runs once at startup, since the quick-idea chips never change.
  - All mutations (`addActivity`, `updateActivity`, `deleteActivity`) follow the same pattern: mutate `state.activities`, call `saveActivities()`, call `render()`.
  - `els` is a single lookup object caching all DOM references by id, built once from `index.html`'s markup — if you add a new interactive element, add its selector here too.
  - Event wiring is centralized in `bindEvents()`, using `data-action`/`data-id` attributes on buttons (event delegation on `#activityList`) rather than per-element listeners.
  - Inline SVG icons (check, circle, star, edit) are inlined as strings in the `icon(name)` helper rather than loaded as files — add new icons there rather than pulling in an icon font/library.
  - The service worker is registered at the bottom of the file only when `serviceWorker` is supported and the page isn't loaded via `file:` (registration is a no-op, not an error, when opening `index.html` directly).
- **`index.html`** — the entire DOM shell, including the add-activity form and the edit `<dialog>`. Element ids referenced here must match `els` in `app.js`. Category options are hardcoded in three places (`#activityCategory`, `#editCategory`, `#categoryFilter`) — adding a category means updating all three plus any `initialActivities`/`quickIdeas` entries in `app.js`.
- **`styles.css`** — all styling, no preprocessor. Theming (colors, shadows) is centralized as CSS custom properties on `:root` (`--ink`, `--sea`, `--sun`, `--coral`, etc.) — reuse these variables rather than hardcoding new colors.
- **`sw.js`** — a minimal offline-cache service worker. `ASSETS` lists exactly the files to precache; if you add/rename a top-level asset that must work offline, update `ASSETS` here, and bump `CACHE_NAME` so returning clients pick up the new cache instead of serving stale files.
- **`manifest.webmanifest`** — PWA metadata (name, icons, theme colors) used for "Add to Home Screen". Icons are the SVGs in `icons/` (`icon-192.svg`, `icon-512.svg`); `index.html` also references `icons/icon-192.svg` as the `apple-touch-icon`.

## Conventions

- UI copy and content are in Spanish; keep new user-facing strings consistent with that.
- Keep everything framework-free and dependency-free unless explicitly asked to introduce tooling — the whole point of this project is that it runs by opening a file in a browser.
- Interactive elements get both `title` and `aria-label` (or an `aria-label`/`aria-hidden` pairing on decorative SVGs) — follow this pattern for new buttons/icons rather than leaving them unlabeled.
