# delonix Billing Console — Test Plan

**Version:** 1.0 · **Date:** July 2, 2026 · **Owner:** Amir Bukhari (Revenue Operations)
**Repository:** github.com/amirbukhari/regia · **Pull request:** #4 (branch `claude/nextjs-frontend-mockup-kltvhh`)

## 1. Purpose & scope

This plan covers verification of the delonix enterprise billing console demo: the static mockup at the repository root (source of truth) and the Next.js static-export frontend in `web/` that is deployed to GitHub Pages. It includes the interactive local demo database (localStorage), the configuration drawers, the automated verification suites, and the deployment pipeline.

**In scope:** visual parity between mockup and Next.js build; all 55 routes; drawer interactions; local DB flows (create/mutate/persist/reset); configuration persistence; accessibility and UX checklist items; GitHub Pages deployment.

**Out of scope:** real payment/tax/GL integrations (all data is illustrative); server-side behavior (there is none — the app is fully static); the read-only Legacy Feature Workbench evidence drawers (documentation by design, behind a default-off feature flag).

## 2. System under test

| Component | Location | Notes |
|---|---|---|
| Static mockup | repo root (`index.html`, `billing.css`, `js/`) | Source of truth for views, styles and behavior |
| Next.js frontend | `web/` (App Router, static export) | Regenerates its legacy layer from the mockup at build time (`scripts/sync-legacy.mjs`) |
| Local demo DB | `js/db.js` | Seeds + mutations persisted per-browser in localStorage key `dlx-db-v1` |
| Deployment | `.github/workflows/deploy-pages.yml` | Builds `web/` with base path `/<repo>` and publishes via actions/deploy-pages on pushes to `main` |

## 3. Test strategy

Three layers, in order:

1. **Automated suites** (run on every substantive change) — fast, objective, cover breadth.
2. **Manual functional passes** — the interactive flows and configuration persistence described in section 5.
3. **Release verification** — deployment checks on the live GitHub Pages URL after merging to `main`.

## 4. Automated test suites

All commands run from `web/` unless noted. Serve the two apps first:

```bash
python3 -m http.server 8000 -d ..     # mockup
python3 -m http.server 8001 -d out    # export (built without base path)
```

In sandboxed CI images pass `CHROMIUM_PATH=/opt/pw-browsers/chromium`.

| Suite | Command | What it verifies | Pass criteria |
|---|---|---|---|
| Static action audit | `node scripts/audit-actions.mjs` (repo root) | Every `data-act` used in markup has a dispatch line; every nav route has a view | Exit 0, status "ok" |
| Runtime audit | `npm run test:audit` | All dispatch handler functions exist; all 55 routes render; every unique action is clicked (~1,000+, views and open drawers); rendered HTML scanned for template bugs (`undefined`, `NaN`, `[object Object]`, unrendered `${…}`); no page/console errors | "runtime audit clean." |
| Pixel parity | `npm run test:parity` | Mockup vs. Next.js export screenshot diff: all enabled routes plus drawer, command-palette, theme, and splash scenarios | All comparisons ≤ 2 px (tolerance for single-pixel compositor noise; real differences measure in the hundreds) |
| Next.js build | `npm run build` | sync-legacy regeneration + static export compile | Build succeeds; `out/index.html` exists |
| E2E (this plan, §5) | `npm run test:e2e` (`BASE_URL=` to target the export) | Every manual case in section 5 (SH/INV/PAY/ACC/SUB/CRD/DUN/CFG/DB/UX), executed headlessly and reported per test-plan ID | "40/40 test-plan cases passed" |
| Deployment check (§7) | `npm run test:deploy` (`DEPLOY_URL=` for the live site) | Section 7 items 2–5 against a deployed URL | "Deployment verified." |

Artifacts (screenshots and diff images) land in `web/tests/.artifacts/`.

**Continuous integration:** `.github/workflows/tests.yml` runs the static audit, build, runtime audit, E2E (against both the mockup and the export) and pixel parity on every pull request and push to `main`, uploading screenshots/diffs on failure. The deployment check runs via the workflow's manual trigger (`workflow_dispatch`) after a release.

## 5. Manual test cases

> **Automated:** every case in this section is implemented in `web/tests/e2e.mjs` and runs in CI. The tables below remain the human-readable specification (and the script's source of truth for IDs); use them for exploratory passes and for non-Chromium browsers.

### 5.1 Entry & shell

| ID | Steps | Expected |
|---|---|---|
| SH-1 | Load the app | Splash/login renders with logo, prefilled email, build stamp; no console errors |
| SH-2 | Click "Sign in to console" (or SSO button) | App shell appears: sidebar nav (grouped), topbar, Executive Dashboard with charts and animated KPIs |
| SH-3 | Press ⌘K / Ctrl-K, type "rev" | Command palette opens, filters to matching modules; Enter navigates; Esc closes |
| SH-4 | Click every sidebar group and item | Each of the 55 routes renders; breadcrumb updates; active nav item highlighted |
| SH-5 | Sign out (sidebar footer) | Returns to splash; signing back in restores the dashboard |

### 5.2 Invoices (local DB)

| ID | Steps | Expected |
|---|---|---|
| INV-1 | Invoices → "+ New Invoice" → pick a customer → "Send invoice" | New INV-2026-08xx row appears at top with status Sent; header total, KPI cards and tab counts all update; toast confirms amount and due date |
| INV-2 | Same, but "Save draft" | Row appears as Draft; Draft KPI and tab count increment |
| INV-3 | Click any invoice row | Detail drawer shows *that* invoice (ID, account, status); line items + tax reconcile exactly to the row amount |
| INV-4 | "Review all issues" → "Re-run Validation" | Draft validation errors clear; warning banner disappears; period bar count drops to 0 |
| INV-5 | "Finalize period" → Submit sign-off | Validated drafts flip to Sent; toast reports counts; unvalidated drafts stay Draft |
| INV-6 | Credit/Rebill on a finalized invoice → Submit for Approval | New CN-2026-xxx appears in Credits & Refunds as Pending Approval, linked to the invoice |

### 5.3 Payments (local DB)

| ID | Steps | Expected |
|---|---|---|
| PAY-1 | Click a **Failed** payment row (e.g. PAY-94197 Apex Systems) | Drawer shows the clicked payment's account, amount and gateway — not a fallback record |
| PAY-2 | "Retry now" → confirm in retry drawer | Row flips to Succeeded; Failed KPI decreases; Collected and gateway split recompute |
| PAY-3 | Open a Succeeded payment → "Refund" → Issue refund | Row becomes Refunded; Refunds Issued KPI updates |
| PAY-4 | "+ Record Payment" → pick an open invoice → Record | New payment row appears; the selected invoice shows Paid in the Invoices view |

### 5.4 Accounts, subscriptions, credits, collections (local DB)

| ID | Steps | Expected |
|---|---|---|
| ACC-1 | Accounts → filter tabs (Enterprise / Business / Starter / Overdue) | Table actually filters; tab counts match visible rows |
| ACC-2 | "+ New Customer" → name + plan → Create account | New account row at top with "New" badge; Cancel button closes without side effects |
| ACC-3 | Row → "Grouping" → choose a policy → Apply Change | Account's Invoice Grouping column updates; reopening the drawer shows the saved selection |
| SUB-1 | Subscriptions → "+ New subscription" → customer + plan → Create | Entry appears in Recent subscription changes with correct MRR delta |
| SUB-2 | Open a subscription → "Change plan" → pick a different tier → Confirm | Drawer title names the right account; Upgrade/Downgrade entry lands in the changes feed |
| CRD-1 | Credits → "+ New Credit Note" → amount > $1,000 | Credit note created as Pending Approval (≤ $1,000 → Applied); KPIs update |
| DUN-1 | Dunning → row "Log contact" → fill type/outcome/note → Log contact | Collections drawer reopens with the new entry at the top of the dunning timeline; contact-attempts KPI increments |
| DUN-2 | Collections drawer → "Suspend account" → confirm | Account shows Suspended in the Accounts view; toast confirms |

### 5.5 Configuration persistence

For each drawer below: change values → Save → reopen the drawer → **saved values must be restored**. Then reload the page and reopen — values must still be there.

Dunning sequence toggles · Tax Configuration (provider + nexus toggles) · Approval Rules · Recognition Rules · Refund Policy · Invoice Footer · Portal Theme · Custom Domain · Edit Role · Edit Custom Field · Edit Plan · Edit Price Book · Price book "Set default" (Default pill moves) · Integration Manage → Sync settings · Workspace "Configure policy/connector" governed actions · Workflow step editor · Settings → Billing configuration toggles.

### 5.6 Local DB lifecycle

| ID | Steps | Expected |
|---|---|---|
| DB-1 | Perform INV-1, PAY-2, DUN-1, then reload the page and sign in | All mutations survive: new invoice present, payment Succeeded, contact in timeline |
| DB-2 | Open the app in a different browser/profile | Fresh seed data — demo state is per-browser, nothing is shared or sent anywhere |
| DB-3 | Settings → Demo data → "Reset demo data" | All collections return to seeds; toast confirms; current view re-renders |
| DB-4 | Settings → Audit log after performing actions | Your demo actions appear at the top of the audit feed |
| DB-5 | DevTools → Application → localStorage | Only `dlx-*` keys; no network requests carrying user data (fonts are the only external requests) |

### 5.7 Theming, flags, accessibility

| ID | Steps | Expected |
|---|---|---|
| UX-1 | Switch themes (topbar + Settings), including light themes (Daybook, Paper); reload | Theme applies everywhere incl. canvas charts; persists across reload with no flash of wrong theme |
| UX-2 | Density: Compact / Default / Spacious | Applies and persists |
| UX-3 | Settings → Feature flags: disable a group; try navigating to a hidden route | Nav group disappears; direct route redirects to Settings with an explanatory toast; Reset restores defaults |
| UX-4 | Keyboard-only pass: Tab through topbar, nav, a form drawer and a toggle switch | Visible focus rings; Enter/Space flips toggles; Esc closes drawers; skip-link jumps to content |
| UX-5 | Enable OS "reduce motion" | Splash/logo/KPI animations are suppressed |
| UX-6 | Spot-check with a screen reader / accessibility tree | Icon-only buttons (drawer close, sign-out, notifications) and switches have labels/roles |
| UX-7 | Viewport pass at 375, 768, 1024, 1440 px | No horizontal scroll; mobile menu button opens/closes the nav; drawers usable |

## 6. Browser matrix

Chrome (primary — parity suites run on Chromium), plus a manual smoke of sections 5.1/5.2/5.6 on: Edge (latest), Firefox (latest), Safari (latest, incl. localStorage behavior in private mode — the app must not crash when storage writes fail).

## 7. Deployment verification (after merge to main)

1. One-time: repo Settings → Pages → Source = **GitHub Actions**.
2. "Deploy to GitHub Pages" workflow is green; visit `https://<owner>.github.io/regia/`.
3. Splash renders with fonts and logo; sign in; navigate 5+ routes; open an invoice drawer; confirm no 404s in DevTools (assets respect the `/regia` base path).
4. Logo assets served at `/regia/logos/logo-orange.svg` and `/regia/logos/logo-blue.svg`.
5. Run one DB flow (INV-1) and reload — persistence works on the live origin.

## 8. Regression policy

CI (`.github/workflows/tests.yml`) enforces this automatically on every PR: static audit → `npm run build` → runtime audit → E2E on both builds → parity suite, all green before merge. New interactive features should add a case to section 5 and, where practical, a scenario to `web/tests/parity.mjs`.

## 9. Entry / exit criteria

**Entry:** branch builds; both local servers start; automated suites runnable.

**Exit (release-ready):** all automated suites green; sections 5.1–5.6 pass with zero console errors; at least one non-Chromium browser smoke passed; deployment verification (section 7) passed on the live URL.

## 10. Known limitations

- All figures are illustrative; KPIs on non-wired views (e.g. dashboard totals) remain static by design.
- Legacy Feature Workbench drawers are intentionally read-only evidence pages.
- Demo state is device-local: clearing site data or switching browsers resets it — this is the intended privacy model.
