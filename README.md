# delonix — Enterprise Billing Console

- **`web/`** — the production frontend: a Next.js static-export app deployed to
  GitHub Pages by `.github/workflows/deploy-pages.yml`. See
  [web/README.md](web/README.md).
- **Repo root (`index.html`, `billing.css`, `js/`)** — the original static
  mockup. It remains the source of truth for the view modules and styles: the
  Next.js build regenerates its legacy layer from these files, and an automated
  screenshot-diff suite keeps the two pixel-identical.
