# delonix — Enterprise Billing Console

- **`web/`** — the production frontend: a Next.js static-export app deployed to
  GitHub Pages by `.github/workflows/deploy-pages.yml`. See
  [web/README.md](web/README.md).
- **Repo root (`index.html`, `billing.css`, `js/`)** — the original static
  mockup. It remains the source of truth for the view modules and styles: the
  Next.js build regenerates its legacy layer from these files, and an automated
  screenshot-diff suite keeps the two pixel-identical.

## Local demo database

The console is fully interactive: invoices, payments, customers, credits,
collection contacts and every configuration drawer persist to a local demo
database (`js/db.js`, stored in the browser's localStorage under `dlx-db-v1`).
Data never leaves the machine — each visitor gets their own sandbox, and
**Settings → Demo data → Reset demo data** restores the original samples.

## UI/UX tooling

The repo carries the [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
skill in `.claude/skills/` (installed via `npx ui-ux-pro-max-cli init --ai claude`).
Its design-system generator and UX checklist drive the interface audits;
`web/tests/runtime-audit.mjs` and `web/tests/parity.mjs` verify the result.
