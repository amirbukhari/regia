# delonix web — Next.js frontend

Next.js (App Router, static export) port of the delonix mockup at the repository
root. The exported site is **pixel-identical** to the mockup — verified by an
automated screenshot diff across every route (see [Parity testing](#parity-testing)).

## Architecture

The mockup is a vanilla-JS SPA: an HTML shell plus ~65 classic scripts sharing
one global scope (`js/`), a view registry of HTML-string render functions, and
delegated `data-act` click handling. The port keeps that contract intact:

- **Shell** — `app/page.jsx` renders the mockup's `<body>` markup (splash/login,
  sidebar, topbar, drawer, toast) as React components, element-for-element.
  `app/layout.jsx` carries the head: fonts, favicon, metadata and the
  pre-paint theme snippet.
- **Legacy modules** — `scripts/sync-legacy.mjs` regenerates
  `src/legacy/generated/` from the mockup sources at the repo root on every
  build (`prebuild`/`predev`). Each mockup script becomes an ES module that
  keeps its code verbatim and attaches its top-level declarations to `window`,
  so cross-file references resolve exactly as they did in the mockup.
  `src/legacy/boot.js` imports them in the original `<script>` tag order, and
  `app/Boot.jsx` loads it client-side after the shell mounts. `billing.css`
  and the inline logo symbol are copied from the mockup by the same script.
- **Single source of truth** — the mockup files at the repo root. Don't edit
  anything under `src/legacy/generated/` or `app/billing.css`; change the
  mockup and re-run `npm run sync:legacy`.

This is a deliberate strangler-fig setup: views can be promoted from
HTML-string modules to React components incrementally, with the parity suite
guarding each step.

## Commands

```bash
npm install
npm run dev     # dev server (regenerates src/legacy first)
npm run build   # static export to out/ (set NEXT_PUBLIC_BASE_PATH for Pages)
```

## Parity testing

`tests/parity.mjs` boots the mockup and the exported app side by side in
Chromium, walks all enabled routes plus drawer / command-palette / theme /
splash scenarios, and pixel-diffs the screenshots (any differing pixel fails).

```bash
# serve both apps
python3 -m http.server 8000 -d .. &          # mockup
python3 -m http.server 8001 -d out &         # next export (built without basePath)

node tests/parity.mjs                        # CHROMIUM_PATH=... to pin a browser
```

Screenshots and diff images land in `tests/.artifacts/`.

## Deployment

`.github/workflows/deploy-pages.yml` builds the export with
`NEXT_PUBLIC_BASE_PATH=/<repo>` and publishes it via `actions/deploy-pages` on
every push to `main`. One-time setup: repo **Settings → Pages → Source →
GitHub Actions**.
