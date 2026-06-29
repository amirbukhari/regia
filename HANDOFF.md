# delonix Enterprise Billing Console — Full Project Handoff

> **Purpose of this document:** Complete context for continuing development in a new conversation. Read this before touching any file.

---

## 1. What This Is

A **single-page, client-side-only enterprise billing dashboard mockup** called the **delonix Enterprise Billing Console**. It is a financial SaaS UI — think Stripe Billing meets NetSuite — with no backend. All data is hardcoded in JS. It lives at:

- **GitHub repo:** `amirbukhari/regia` (main branch, root)
- **GitHub Pages URL:** `https://amirbukhari.github.io/regia/`
- **Git push proxy:** `http://local_proxy@127.0.0.1:41729/git/amirbukhari/regia.git`
- **Local working copy:** `/tmp/regia-push/`

To push: `cd /tmp/regia-push && git add -A && git commit -m "..." && git push -u origin main`

---

## 2. File Structure

```
/tmp/regia-push/
├── index.html          (126 lines) — Shell HTML, SVG symbol definition, script tags
├── billing.css         (1704 lines) — ALL styles, heavily layered (see §5)
├── logo.svg            (103 KB) — Source SVG (not loaded at runtime; inlined in HTML)
└── js/
    ├── utils.js        (81 lines)   — fmt helpers, icon defs, countUpKPIs()
    ├── data.js         (100 lines)  — NAV model, BUS, LEGAL_ENTITIES, mock data arrays
    ├── helpers.js      (104 lines)  — enterApp, signOut, buildNav, route, kpi(), pill(), pageHead()
    ├── views.js        (4242 lines) — VIEWS.* render functions (one per nav item)
    ├── theme.js        (161 lines)  — THEMES[], setTheme(), setAccentColor(), theme popover
    ├── events.js       (142 lines)  — Global delegated click handler, keyboard shortcuts
    └── drawers.js      (2065 lines) — All drawer/modal content (openInvoice, openAccount, etc.)
```

Script load order in `index.html`: `utils.js → data.js → helpers.js → views.js → events.js → theme.js → drawers.js`

---

## 3. Architecture

### Routing
No framework. `route(id)` in `helpers.js` clears `#view`, calls `VIEWS[id](v)`, updates nav active state, scrolls to top.

### Rendering
Every view is a function `VIEWS.foo = (v) => { v.appendChild(el(`...`)) }`. The `el()` helper creates DOM from an HTML string via `<template>`. Views are pure strings assembled with template literals — no virtual DOM, no components.

### Events
All clicks delegated to `document` via `data-act` + `data-arg` attributes (CSP-safe, no inline handlers). See `events.js` for the full dispatch table — ~80 action types.

### Drawers
Slide-in panels (right edge, 540px wide) via `.drawer` + `.drawer-bg`. All drawer open functions are in `drawers.js`. `closeDrawer()` is global.

### Theme System
`document.documentElement.dataset.theme` drives CSS variable overrides. Saved to `localStorage` as `dlx-theme`. Applied immediately via IIFE at bottom of `theme.js` to prevent flash.

### Fonts
Google Fonts CDN (loaded in `index.html` `<head>`):
- `Bricolage Grotesque` → `var(--display)` — headings, KPI values, brand name
- `Plus Jakarta Sans` → `var(--sans)` — body, UI text

---

## 4. The 5 Themes

Defined in `billing.css` `:root` (defaults = Ember) and per-theme blocks, then resolved in the **DEFINITIVE THEME RESOLUTION** block at the very end of `billing.css` (~line 1380+).

| Theme ID | Name | Accent color | Character |
|---|---|---|---|
| `ember` | Ember | `#ff5a1f` | Warm dark — default |
| `midnight` | Midnight | `#4a9eff` | Deep navy, blue glow |
| `forge` | Forge | `#ffaa00` | Dark amber-brown, gold |
| `obsidian` | Obsidian | `#a855f7` | Cool violet-dark, purple |
| `dawn` | Dawn | `#e0440f` | Full light mode |

**How theming works:**
1. `[data-theme="X"]` blocks in CSS define per-theme CSS vars (`--bg`, `--surface`, `--ember`, etc.)
2. CSS vars propagate to components that use them
3. Components that use **hardcoded hex values** (gradients) are overridden in the **DEFINITIVE THEME RESOLUTION** block at end of CSS — this is the critical fix

**Accent color** is separate from theme. `setAccentColor(hex)` in `theme.js` overrides `--ember`, `--ember-soft`, `--ember-deep`, `--ember-glow` inline on `:root`. Saved as `dlx-accent` in localStorage.

---

## 5. CSS Architecture — CRITICAL READING

The CSS is **heavily layered** — multiple passes have been appended over many sessions. This means there are **cascading conflicts** where later rules override earlier ones. The order of major blocks in `billing.css`:

| Line range | Block |
|---|---|
| 1–55 | Base variables (`:root`) + reset |
| 56–263 | Original shell: sidebar, topbar, cards, tables, pills, drawers |
| 264–287 | v3 splash upgrade (overrides some splash styles) |
| 288–322 | Theme variable definitions (per-theme `:root` overrides) |
| 323–491 | Theme picker UI, form elements, entity cards, audit, diff panels |
| 492–821 | **UI-UX PRO MAX UPGRADE block** — glassmorphism, ambient, micro-animations |
| 822–898 | Intro animation sequence (logoIntro, emberGlow, cardRise, fadeUp) |
| 899–1119 | **OVERHAUL block** — brand mark, KPI grid, card elevation, topbar polish |
| 1120–1229 | **CEO-READY PASS** — bento grid, featured KPI card, executive header |
| 1230–1379 | **CEO-READY PASS 2 & 3** — splash login, sidebar logo, dash layout |
| 1380–1704 | **DEFINITIVE THEME RESOLUTION** — per-theme overrides for sidebar, splash, KPI accent, topbar, body glow, nav active, cards, drawer, Dawn light mode |

**Rule:** The LAST matching rule wins (assuming equal specificity). This is why the theme resolution block MUST be at the bottom.

### Key CSS variables

```css
:root {
  /* backgrounds */
  --bg: #0b0a08          /* page background */
  --bg-2: #100d0a        /* slightly lighter bg */
  --surface: #16120e     /* card surface */
  --surface-2: #1e1813   /* elevated surface (hover states, etc.) */
  --surface-3: #28201a   /* highest surface (segment controls, etc.) */

  /* borders */
  --border: #2e261f
  --border-soft: #241d17
  --hair: rgba(255,236,214,.06)

  /* text */
  --text: #f7f2ea         /* primary */
  --text-2: #b6a99a       /* secondary */
  --text-3: #7f7264       /* muted/labels */

  /* accent (ember) */
  --ember: #ff5a1f
  --ember-soft: #ff9152
  --ember-deep: #bf3d10
  --ember-glow: rgba(255,90,31,.18)

  /* semantic */
  --good: #49c46e         /* green */
  --good-bg: rgba(73,196,110,.12)
  --warn: #e8b23f         /* amber */
  --warn-bg: rgba(232,178,63,.12)
  --crit: #f24e30         /* red */
  --crit-bg: rgba(242,78,48,.12)
  --info: #6aa6ff         /* blue */
  --info-bg: rgba(106,166,255,.12)

  /* typography */
  --sans: 'Plus Jakarta Sans', ...
  --display: 'Bricolage Grotesque', ...
  --mono: ui-monospace, "SF Mono", ...

  /* dimensions */
  --r: 14px              /* border-radius large */
  --r-sm: 9px            /* border-radius small */
  --sidebar-w: 244px
}
```

---

## 6. Navigation Model (all 30 views)

Defined in `data.js` → `const NAV`. Each maps to a `VIEWS[id]` function in `views.js`.

**Overview**
- `dashboard` — KPI bento grid, revenue chart, MRR bridge table, top accounts, A/R summary, quick actions
- `reports` — Report builder, scheduled reports, archive
- `aiinsights` — AI-generated revenue insights, anomaly detection, churn prediction

**Revenue**
- `accounts` — Customer list with health, plan, BU, grouping policy
- `subscriptions` — Plan tier breakdown, recent changes log
- `catalog` — Product/plan grid with feature comparison matrix
- `calculator` — Pricing calculator with formula editor
- `quotes` — Quotes & contracts (badge: 4)
- `usage` — Usage metering, meter config, usage events

**Accounts Receivable**
- `invoices` — Invoice list, filters, create invoice, approve/void/send-reminder actions
- `payments` — Payment list, retry, refund, manual payment
- `credits` — Credits & refunds list, create credit, re-bill
- `ar` — A/R aging, cash application, manual match
- `dunning` — Collections queue, dunning sequences, config (badge: 7)

**Finance & Controls**
- `statements` — P&L, balance sheet, trial balance
- `consolidation` — Multi-entity consolidation, IC eliminations
- `revrec` — Revenue recognition schedules, ASC 606 obligations
- `cashflow` — Cash & treasury, forecasts, treasury sweep
- `close` — Financial close checklist, period lock (badge: 5)
- `tax` — Tax config, nexus, compliance
- `controls` — Controls & audit trail

**Organization**
- `bizunits` — Business Unit management (5 BUs defined)
- `legalentity` — Legal Entity management (4 entities defined)
- `customentities` — Custom entity types and fields
- `migration` — Legacy source system migration (BuildStream: 312 customers, 289 mapped, 23 unresolved)

**Platform**
- `portal` — Customer portal config, custom domain, logo upload, portal theming
- `developers` — API keys, webhooks, SDK docs
- `integrations` — NetSuite, Xero, Stripe, Adyen, Salesforce connectors
- `permissions` — Roles & permissions, team members
- `auditlog` — Audit log with filters
- `thememanager` — Theme & branding config (applies themes to customer-facing portal)
- `settings` — App settings panel

---

## 7. Mock Data Summary

All in `data.js` and inline in view functions.

**Accounts** (8 in `data.js`; 12 in `VIEWS.accounts`):
- Meridian Bank — Enterprise+, $142k MRR, 5400 seats, UK
- Aurora Health Group — Enterprise+, $96.4k MRR, 3120 seats, US
- Northwind Logistics — Enterprise, $48.2k MRR, 1450 seats, US
- Vega Retail — Enterprise, $41.3k MRR, 1120 seats, APAC
- Helios Manufacturing — Enterprise, $39.75k MRR, 980 seats, EU (past due)
- Tundra Energy — Enterprise, $33.5k MRR, 760 seats, CA (past due)
- Cobalt Robotics — Growth, $9.8k MRR, 240 seats, US (suspended/crit)
- Solstice Media — Growth, $7.4k MRR, 180 seats, US

**Business Units** (5, in `helpers.js` → `BUS`):
- BU-001 Residential — $218k MRR, 624 subs, ember orange, entity LE-001
- BU-002 Commercial — $156.35k MRR, 218 subs, blue, entity LE-001
- BU-003 Enterprise Platform — $44k MRR, 47 subs, purple, entity LE-002
- BU-004 International — $0 MRR, 0 subs (new), green, entity LE-003
- BU-005 PropTech (BuildStream, acquired) — $0 MRR, 312 subs, amber, entity LE-004, status: migration

**Legal Entities** (4, in `helpers.js` → `LEGAL_ENTITIES`):
- LE-001 Delonix Holdings LLC — US, NetSuite
- LE-002 Delonix Platform Inc. — US, NetSuite
- LE-003 Delonix EU B.V. — NL, Xero, EUR
- LE-004 BuildStream Technologies Ltd. — US, QuickBooks (legacy)

**Dashboard KPIs:**
- MRR: $418,350 (+4.2% MoM)
- ARR: $5.02M
- Net Revenue MTD: $329,400
- NRR: 112%
- Active subs: 842
- Gross churn: 1.8%

**Revenue series (12 months, $k):** 218, 232, 241, 238, 256, 270, 265, 284, 301, 312, 308, 329

---

## 8. The Logo

The delonix phoenix/tree SVG logo is **inlined directly in `index.html`** as a `<symbol>`:

```html
<svg style="display:none">
  <symbol id="dlx-logo" viewBox="0 0 1254 1254">
    <!-- white tree path: fill="white" -->
    <!-- phoenix paths: fill="currentColor" — inherits CSS color for theme accent -->
  </symbol>
</svg>
```

Used in two places:
1. **Splash screen:** `.splash-logo-wrap { color: var(--ember); }` → `<svg class="splash-logo"><use href="#dlx-logo"/></svg>`
2. **Sidebar:** `.brand-mark { color: var(--ember); }` → `<svg class="brand-mark"><use href="#dlx-logo"/></svg>`

The white tree side always stays white. The phoenix (orange) side follows `currentColor`, which is set to `var(--ember)` — so it changes with the theme accent color automatically.

`logo.svg` at root is the original source file (103KB) — it is NOT loaded at runtime.

---

## 9. The KPI System

### `kpi()` helper in `helpers.js`

```javascript
function kpi(lab, val, sub, opts={}) {
  // opts.trend    — number, shows ↑/↓ arrow (positive=green, negative=red)
  // opts.accent   — bool, ember-accented card background
  // opts.featured — bool, spans 2 columns, 48px value, wider spark
  // opts.spark    — string key ('mrr','arr','rev','nrr','subs','churn'), draws mini sparkline
  // val           — string like '$418,350', '$5.02M', '112%', '842'
  //                 stored in data-val="..." for countUpKPIs() animation
}
```

### Count-up animation — `countUpKPIs()` in `utils.js`

- Triggered after `requestAnimationFrame()` in each view that has KPIs
- Parses `data-val` attribute with regex: `^(\$?)([\d,]+\.?\d*)(.*)$`
- Handles: `$418,350`, `$5.02M`, `112%`, `1.8%`, `842`
- Eases in-out quad over 920ms
- Also called when switching between RevOps/CFO lens on dashboard

### Bento grid

```css
.kpis { grid-template-columns: repeat(4, 1fr); }
.kpi-featured { grid-column: span 2; }         /* MRR card */
#kpisRevops .kpi:last-child { grid-column: span 2; }  /* Gross Churn */
#kpisCfo .kpi:first-child { grid-column: span 2; }    /* ARR (CFO view) */
```

---

## 10. Charts

All canvas-based, drawn in `views.js`. No charting library.

### `drawRevChart()` — revenue trend line chart
- Canvas ID: `revChart`, height 240px
- Data: `revenueSeries` (12 months) + prior year (shifted down ~15%)
- Ember line + area fill + muted prior year line
- Draws y-axis labels, x-axis month labels, horizontal grid lines
- Font: `"10px 'Plus Jakarta Sans', ui-sans-serif"` (double-quoted to avoid JS string parse error)

### `drawSparks()` — sparklines in KPI cards
- Finds all `canvas[data-spark]` elements
- Seed data per spark key: `mrr`, `arr`, `rev`, `nrr`, `subs`, `churn`
- Draws area fill + line, colored by seed (churn = red, rest = ember)
- Featured spark (`.spark-wide`, 180×44px) gets a dot at the endpoint

### `drawUsageChart()` — usage metering view bar chart
- Only drawn when `current === 'usage'`

### `drawMrrChart()` — reports view multi-line chart
- Only drawn when `current === 'reports'`

All charts listen to `window.resize` (in `events.js`) and redraw.

---

## 11. Drawer System

`drawers.js` (2065 lines) contains ~80 drawer open functions. Pattern:

```javascript
function openInvoice(id) {
  const inv = invoices.find(i => i.id === id) || invoices[0];
  const bg = document.getElementById('drawerBg');
  const dr = document.getElementById('drawer');
  dr.innerHTML = `<div class="drawer-head">...</div><div class="drawer-body">...</div>`;
  bg.classList.add('open');
  dr.classList.add('open');
}
function closeDrawer() {
  document.getElementById('drawerBg')?.classList.remove('open');
  document.getElementById('drawer')?.classList.remove('open');
}
```

Key drawers:
- `openInvoice(id)` — Invoice detail with line items, timeline, approval actions
- `openAccount(name)` — Account detail with health, subscription, payment history
- `openNewInvoice()` — Create invoice form with line items, tax, summary
- `openNewCustomer()` — New customer form
- `openNewSub()` — New subscription form
- `openPayment(id)` — Payment detail with retry/refund actions
- `openRevSchedule(id)` — Rev rec schedule with ASC 606 obligation chart
- `openEntitySwitch()` — Legal entity switcher overlay
- `openThemePopover()` — (in theme.js) — Theme/accent/density picker
- `openBizUnit(id)` — Business unit detail
- `openLegalEntity(id)` — Legal entity detail
- `openMigrationDetail(id)` — BuildStream migration status

---

## 12. Theme Manager View (`VIEWS.thememanager`)

The nav item "Theme & Branding" routes to a full view (not just the topbar popover) showing:
- Theme preview cards for all 5 themes
- `data-act="switchtheme" data-arg="[id]"` applies the theme via `doSwitchTheme(id)` → `setTheme(id)`
- Branding: logo upload area, custom domain, invoice footer, portal theme editor
- All wired to drawer open functions in `drawers.js`

The **topbar theme button** (`#themeBtn`) opens a popover (`#themePopover`) with:
- Theme chips (Ember, Midnight, Forge, Obsidian, Dawn)
- Accent color swatches (7 presets + custom color picker)
- Density controls (Compact / Default / Spacious)

---

## 13. What Was Done in This Session (What Changed)

### Push history (newest first):

1. **`63e0624`** — DEFINITIVE THEME RESOLUTION: Fixed all themes actually changing
   - Sidebar background: was hardcoded `#0f0c09 → #090807` for ALL themes. Now each theme has its own gradient
   - Splash background: was hardcoded warm dark for ALL themes
   - KPI accent card: was hardcoded ember dark for ALL themes
   - Topbar: was hardcoded `rgba(11,10,8,.82)` for ALL themes
   - Body radial glow: was always ember orange for ALL themes
   - Dawn theme: comprehensive light mode — white cards, beige sidebar, all inputs/buttons/tabs/drawers/toasts re-styled
   - Nav active states: now theme-colored (blue for Midnight, gold for Forge, purple for Obsidian)
   - Featured KPI gradient: now theme-colored per theme
   - Segment/tab active: now theme-colored

2. **`9c0a836`** — Fixed JS syntax error from sed mangling chart font string
   - `x.font = '10px 'Plus Jakarta Sans'...'` → `x.font = "10px 'Plus Jakarta Sans'..."`
   - This was breaking ALL view rendering

3. **`7983083`** — CEO-ready fixes: CFO lens bug, chart polish, count-up on lens switch
   - `setDashLens` was looking for `getElementById('kpisFinance')` — doesn't exist. Fixed to `kpisCfo`
   - `drawSparks` seed keys were `'1','2','3'` — never matched. Fixed to `'mrr','arr','rev','nrr','subs','churn'`

4. **`6d41033`** — Dashboard column ratio, chart font, A/R stats polish

5. **`3c933bb`** — Premium splash login: wordmark, tagline, glass inputs, brand mark fix

6. **`fa3fe12`** — Bento KPI grid, count-up animation, featured MRR card, fixed sparks

7. **`e548ea2`** — Comprehensive UI/UX overhaul block

8. **Earlier commits** — Initial build, file push, logo inlining, animations

---

## 14. Known Issues & Remaining Work

### HIGH PRIORITY

**1. The `ui-ux-pro-max` skill is not installed in this environment**
- User installed it via Claude.ai web customization. It was lost when context was exhausted.
- The user explicitly said: "use only the UI UX MAX skill hardcore man"
- In the new conversation, check available skills via `Skill` tool calls — if not there, ask user to re-add it

**2. Dawn theme still has issues**
- The `splash-form input` background in Dawn needs verification — currently `rgba(0,0,0,.05)` on a cream background might not have enough contrast
- Dawn sidebar: `.nav-item .ic` icons may still appear in dark colors on the light sidebar
- Dawn: `.table-wrap` thead may need explicit light background in some edge cases
- Dawn: The `body` background is set to a warm cream but the `.main` area grid lines are removed — verify this looks clean

**3. CSS cascade conflicts throughout**
- There are ~7 major CSS blocks each re-styling the same elements
- Some rules cancel each other unpredictably
- A full CSS consolidation/cleanup pass is needed (major effort — don't do it unless asked)

**4. `page-head h1` in Dawn theme**
- Uses `background-clip: text` gradient for dark text — this should be `[data-theme="dawn"] .page-head h1 { -webkit-text-fill-color: var(--text); background: none; }` to avoid invisible text
- The theme resolution block at end of CSS handles this, but verify it actually wins

**5. `.card:hover` transform in light mode**
- The `transform: translateY(-1px)` on card hover is fine in dark mode. In Dawn, verify the elevated card shadow still looks clean at the lighter shadow values

### MEDIUM PRIORITY

**6. Some drawers have dark-hardcoded backgrounds**
- Drawer backgrounds are overridden per theme in the resolution block, but inner drawer content (`.drawer-head`, `.drawer-body` child elements) may have hardcoded dark inline styles from the drawer builder functions in `drawers.js`
- Example: some drawer forms have `background: rgba(0,0,0,.3)` inline styles that won't respond to Dawn theme

**7. Charts don't respond to theme changes**
- `drawRevChart()`, `drawSparks()` etc. use hardcoded ember colors for strokes
- These charts should read from CSS computed vars and re-draw on theme change
- Currently: switching theme mid-session leaves charts with ember-colored lines even in Midnight/Obsidian etc.

**8. Font loading**
- Google Fonts CDN is loaded in `<head>` — if the user is offline or CDN is blocked, falls back to system `ui-sans-serif`. This is intentional but worth noting.
- The fallback chain: `'Plus Jakarta Sans', 'Hanken', ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

**9. Missing views**
- Some `VIEWS.*` may render minimal/empty content. Not all 30 nav items have fully built-out views.
- `aiinsights`, `calculator`, `reports`, `consolidation`, `cashflow`, `controls`, `permissions`, `auditlog`, `developers`, `integrations` — check if content is complete

**10. Mobile responsiveness**
- Sidebar hides on `max-width: 760px` — there's no hamburger menu or mobile nav
- Charts are canvas-based and don't resize perfectly on mobile
- This is a desktop-first mockup, but mobile breakpoints exist

### LOW PRIORITY

**11. Theme popover chip previews**
- Chips in the theme popover show a colored dot but no actual visual preview of the theme
- Each chip could be a mini thumbnail showing the sidebar + card colors for that theme

**12. Accent swatch custom color picker**
- The `<input type="color">` in the accent row works but is styled poorly
- It's a native OS color picker — hard to style but could use a custom overlay

**13. No persistence of drawer state**
- Opening a drawer and refreshing loses state (no localStorage for drawer content)
- This is fine for a mockup but worth noting

**14. `setDashLens` performance**
- Switching between RevOps/CFO lens hides/shows KPI grids and calls `countUpKPIs()` again
- Could flicker on slow devices — consider adding a transition

**15. The `logo.svg` file (103KB) in repo root**
- Not used at runtime (symbol is inlined in HTML) but still sits in the repo
- Could be removed to reduce repo size, or kept as source asset

---

## 15. CSS Classes Quick Reference

```
Layout
  .view           — Page content wrapper (padded, max-width 1340px, fade animation)
  .page-head      — Title + subtitle + actions row
  .grid           — CSS grid container (needs column template)
  .kpis           — 4-col KPI grid
  .row            — 2-col layout (1.7fr 1fr)
  .dash-cols      — Dashboard-specific 2-col (1.65fr 1fr)
  .two-col        — Equal 2-col
  .cards-2        — auto-fit minmax(300px, 1fr)
  .cards-3        — auto-fit minmax(264px, 1fr)
  .toolbar        — Flex row with gap (filters, tabs, search)

Cards
  .card           — Base card (bg gradient, border, shadow, hover)
  .kpi            — KPI metric card
  .kpi.accent     — Ember-accented KPI (MRR hero)
  .kpi-featured   — Spans 2 cols, 48px value
  .panel          — Card with 20px padding

Navigation
  .nav-item       — Sidebar nav link
  .nav-item.active — Active state with left indicator bar
  .nav-group      — Nav section wrapper
  .nav-group h6   — Section label (uppercase, muted)

Tables
  .table-wrap     — Scrollable table container
  table           — Standard table
  thead th        — Sticky header cells
  .num            — Right-aligned numeric column
  .nm             — Bold name cell
  .mut            — Muted secondary text in cell
  .acct           — Account cell with logo chip

UI Controls
  .btn            — Base button
  .btn.primary    — Ember gradient CTA button
  .btn.ghost      — Transparent button
  .btn.outline    — Bordered button (rgba bg)
  .chip           — Filter/tag chip
  .tabs           — Horizontal tab strip
  .seg            — Segmented control (for RevOps/CFO lens)
  .icon-btn       — Square icon button (36px)
  .pill-select    — Entity selector pill in topbar
  .toggle         — iOS-style toggle switch

Status
  .pill.good      — Green status pill
  .pill.warn      — Amber status pill
  .pill.crit      — Red status pill
  .pill.info      — Blue status pill
  .pill.ember     — Ember/accent pill
  .pill.muted     — Gray muted pill
  .bar            — Progress bar container
  .bar > i        — Progress bar fill (animated barFill)
  .dotg           — Pulsing green status dot

Drawers
  .drawer         — Right-panel drawer
  .drawer-bg      — Full-screen backdrop
  .drawer-head    — Drawer title area
  .drawer-body    — Drawer scrollable content
  .drawer.open    — Visible state
  .drawer-bg.open — Backdrop visible

Forms
  .form-input     — Text input (themed)
  .form-select    — Select dropdown (themed)
  .form-textarea  — Textarea (themed)
  .form-label     — Field label (uppercase, muted)
  .form-group     — Label + input stack
  .form-row       — Horizontal group of form-groups
  .form-section   — Form section with title
  .form-footer    — Bottom action bar

Other
  .kv             — Key-value definition list (2-col grid)
  .sec-title      — Section divider with line
  .note.warn      — Warning banner
  .note.info      — Info banner
  .val-banner     — Validation error/warning banner
  .period-bar     — Billing period status bar
  .bu-badge       — Business unit colored badge
  .tnum           — tabular-nums font-variant
  .mono           — Monospace font
  .toast          — Bottom notification toast
  .avatar         — User avatar chip
  .dot-step       — Horizontal progress stepper
  .timeline / .tl-item — Vertical timeline
  .entity-card    — Entity selection card
  .radio-opt      — Radio option row
  .seq-step       — Dunning sequence step row
```

---

## 16. Events/Action Reference

All `data-act` values and what they do (from `events.js`):

| data-act | data-arg | Effect |
|---|---|---|
| `enter` | — | `enterApp()` — dismiss splash, go to dashboard |
| `signout` | — | `signOut()` — show splash again |
| `route` | view id | `route(id)` — navigate to view |
| `invoice` | invoice id | `openInvoice(id)` |
| `account` | account name/id | `openAccount(arg)` |
| `revsched` | id | `openRevSchedule(id)` |
| `subdetail` | customer name | `openSubscription(arg)` |
| `paydetail` | payment id | `openPayment(id)` |
| `lens` | `revops`/`cfo` | `setDashLens(arg)` — toggle dashboard KPI view |
| `invfilter` | filter name | `setInvFilter(arg)` |
| `acctfilter` | filter name | `setAcctFilter(arg)` |
| `toast` | message string | shows bottom toast notification |
| `theme` | theme id | `setTheme(id)` |
| `density` | `compact`/`default`/`spacious` | `setDensity(arg)` |
| `newinvoice` | — | `openNewInvoice()` |
| `notifications` | — | `openNotifications()` |
| `entityswitch` | — | `openEntitySwitch()` |
| `currencypanel` | — | `openCurrencyPanel()` |
| `newquote` | — | `openNewQuote()` |
| `newcustomer` | — | `openNewCustomer()` |
| `newsub` | — | `openNewSub()` |
| `newcredit` | — | `openNewCredit()` |
| `approveinv` | invoice id | `openApproveInvoice(id)` |
| `voidinv` | invoice id | `openVoidInvoice(id)` |
| `sendinvreminder` | id | `openSendReminder(id)` |
| `retrypayment` | payment id | `openRetryPayment(id)` |
| `refundpay` | payment id | `openRefund(id)` |
| `collectiondetail` | id | `openCollectionDetail(id)` |
| `logcontact` | id | `openLogContact(id)` |
| `manualmatch` | id | `openManualMatch(id)` |
| `dunningconfig` | — | `openDunningConfig()` |
| `approvalrules` | — | `openApprovalRules()` |
| `postjournals` | — | `openPostJournals()` |
| `signoffclose` | — | `openSignOff()` |
| `reportbuilder` | — | `openReportBuilder()` |
| `schedulereport` | — | `openScheduleReport()` |
| `inviteusr` | — | `openInviteUser()` |
| `pricebook` | — | `openPriceBook()` |
| `taxconfig` | — | `openTaxConfig()` |
| `revrules` | — | `openRevRules()` |
| `bizunit` | BU id | `openBizUnit(id)` |
| `legalentity` | LE id | `openLegalEntity(id)` |
| `invgrouping` | account id | `openInvoiceGroupingPolicy(id)` |
| `ratingdetail` | id | `openRatingDetail(id)` |
| `audithistory` | id | `openAuditHistory(id)` |
| `creditrebill` | id | `openCreditRebill(id)` |
| `acctexport` | id | `openAccountingExport(id)` |
| `migrationdetail` | id | `openMigrationDetail(id)` |
| `draftvalidate` | id | `openDraftValidation(id)` |
| `usageevent` | id | `openUsageEvent(id)` |
| `groupingpolicy` | id | `openGroupingPolicy(id)` |
| `download` | `format\|title\|desc` | `openDownloadPanel(arg)` |
| `newplan` | — | `openNewPlan()` |
| `newpricebook` | — | `openNewPricebook()` |
| `editpricebook` | id | `openEditPricebook(id)` |
| `editplan` | id | `openEditPlan(id)` |
| `editobligation` | id | `openEditObligation(id)` |
| `newmeter` | — | `openNewMeter()` |
| `usageimport` | — | `openUsageImport()` |
| `manualpayment` | id | `openManualPayment(id)` |
| `glmapping` | id | `openGLMappingEditor(id)` |
| `connectintegration` | id | `openIntegrationDetail(id)` |
| `webhookdetail` | id | `openWebhookDetail(id)` |
| `sdkdocs` | id | `openSDKDocs(id)` |
| `apidocs` | — | `openAPIDocs()` |
| `changeplan` | id | `openChangePlan(id)` |
| `daterange` | id | `openDateRangePicker(id)` |
| `customdomain` | — | `openCustomDomain()` |
| `integeventlogs` | — | `openIntegrationEventLogs()` |
| `invoicefooter` | — | `openInvoiceFooterEditor()` |
| `logoupload` | — | `openLogoUpload()` |
| `portaltheme` | — | `openPortalThemeEditor()` |
| `renewalquote` | id | `openRenewalQuote(id)` |
| `refundpolicy` | — | `openRefundPolicy()` |
| `reportarchive` | — | `openReportArchive()` |
| `treasurysweep` | id | `openTreasurySweep(id)` |
| `eliminations` | — | `openICEliminations()` |
| `consolidation` | — | `openConsolidationRun()` |
| `collectionssweep` | — | `openCollectionsSweep()` |
| `suspendaccount` | id | `openSuspendAccount(id)` |
| `apikey` | — | `openAPIKeyCreator()` |
| `rotatekey` | id | `openRotateKey(id)` |
| `newbizunit` | — | `openNewBizUnit()` |
| `newlegalentity` | — | `openNewLegalEntity()` |
| `aiquery` | id | `openAIQuery(id)` |
| `newcalculator` | — | `openNewCalculator()` |
| `editcalculator` | id | `openEditCalculator(id)` |
| `newentity` | — | `openNewEntity()` |
| `newfield` | — | `openNewField()` |
| `editfield` | id | `openEditField(id)` |
| `editrole` | id | `openEditRole(id)` |
| `editmember` | id | `openEditMember(id)` |
| `auditdetail` | id | `openAuditDetail(id)` |
| `applytheme` | — | `openApplyTheme()` |
| `switchtheme` | theme id | `doSwitchTheme(id)` → `setTheme(id)` |
| `publishcalc` | id | `openPublishCalc(id)` |
| `editformulas` | — | `openEditFormulas()` |
| `addcalcfield` | — | `openAddCalcField()` |
| `scheduledigest` | — | `openScheduleDigest()` |
| `close` | — | `closeDrawer()` |
| `toggle` | — | toggles `.on` class on element |

**Keyboard shortcuts:**
- `⌘K` / `Ctrl+K` — Open command palette (search all views)
- `Escape` — Close drawer

---

## 17. How to Continue in a New Conversation

1. **Read this file first** before touching any code
2. **Check working copy exists:** `ls /tmp/regia-push/` — if not, clone from GitHub
3. **To clone fresh:** The proxy URL is `http://local_proxy@127.0.0.1:41729/git/amirbukhari/regia.git`
4. **Check the ui-ux-pro-max skill** — user wants it applied. Check `Skill` tool. If not available, ask user.
5. **The user's main complaints were:**
   - All themes looked identical (black) — **FIXED in commit 63e0624**
   - Dawn theme was ugly — **substantially improved, still needs verification**
   - Unstyled buttons and text inputs — **improved but could go further**
   - Theme manager should actually work — **works now**
   - General ugly UI — needs continued polish with ui-ux-pro-max skill

6. **Next logical steps after reading this doc:**
   - Verify all 5 themes look visually distinct in the browser (use `/verify` or `/run` skill)
   - Check Dawn theme specifically — light sidebar, white cards, warm beige splash
   - Apply ui-ux-pro-max skill principles to any remaining ugly sections
   - Charts: make them theme-aware (redraw with correct colors when theme changes)
   - Continue polishing any views that still look rough

7. **Never use the `artifact-design` skill** — user specifically said to stop using it and only use `ui-ux-pro-max`

---

## 18. Index.html Structure (abbreviated)

```html
<!DOCTYPE html>
<html lang="en" data-theme="ember">
<head>
  <!-- Google Fonts: Bricolage Grotesque + Plus Jakarta Sans -->
  <!-- billing.css -->
</head>
<body>

<!-- Hidden SVG symbol (logo) -->
<svg style="display:none" xmlns="http://www.w3.org/2000/svg">
  <symbol id="dlx-logo" viewBox="0 0 1254 1254">
    <!-- ~103KB of path data here -->
    <!-- White tree: fill="white" -->
    <!-- Phoenix: fill="currentColor" -->
  </symbol>
</svg>

<!-- Splash screen -->
<div id="splash">
  <div class="splash-card">
    <div class="splash-logo-wrap">
      <svg class="splash-logo" viewBox="0 0 1254 1254"><use href="#dlx-logo"/></svg>
    </div>
    <div class="splash-wordmark"><span class="splash-wm-del">del</span>onix</div>
    <div class="splash-tagline">Enterprise Revenue Operations</div>
    <form class="splash-form" id="loginForm">
      <label>Work email</label>
      <input type="email" placeholder="you@company.com" autocomplete="email">
      <label>Password</label>
      <input type="password" placeholder="••••••••" autocomplete="current-password">
      <button class="enter-btn" data-act="enter">Sign in to console</button>
      <div class="splash-or">or</div>
      <button class="sso-btn" data-act="enter">Continue with SSO</button>
    </form>
    <div class="splash-meta">
      <span><span class="dotg"></span> All systems operational</span>
      <span>SOC 2 Type II</span>
      <span>ISO 27001</span>
    </div>
  </div>
</div>

<!-- App shell -->
<div id="app">
  <aside class="sidebar">
    <!-- Brand -->
    <div class="brand">
      <svg class="brand-mark" viewBox="0 0 1254 1254"><use href="#dlx-logo"/></svg>
      <span class="name"><b>del</b>onix</span>
      <span class="env">PROD</span>
    </div>
    <!-- Nav (built by buildNav() in helpers.js) -->
    <nav class="nav" id="nav"></nav>
    <!-- Footer -->
    <div class="sb-foot">
      <div class="avatar">AB</div>
      <div class="who"><b>Amir Bukhari</b><span>Finance Admin</span></div>
    </div>
  </aside>

  <div class="main">
    <!-- Topbar -->
    <header class="topbar">
      <div class="crumbs">delonix · <b id="crumb">Dashboard</b></div>
      <div class="search">
        <svg class="ic si">...</svg>
        <input id="cmdInput" placeholder="Search or jump to…">
        <div id="cmdMenu" class="cmd-menu"></div>
      </div>
      <div class="spacer"></div>
      <!-- Entity pill -->
      <button class="pill-select ent" data-act="entityswitch">...</button>
      <!-- Currency -->
      <button class="pill-select" data-act="currencypanel">USD</button>
      <!-- Theme button -->
      <div style="position:relative">
        <button class="theme-btn" id="themeBtn">
          <span class="tdot" id="themeBtnDot" style="background:#ff5a1f"></span>
          <span id="themeBtnLabel">Ember</span>
        </button>
        <div class="theme-popover" id="themePopover">
          <!-- Built lazily by buildThemePopover() in theme.js -->
          <div id="tpList">...</div>
          <div id="accentRow">...</div>
          <!-- Density controls -->
        </div>
      </div>
      <!-- Notifications -->
      <button class="icon-btn" data-act="notifications">...</button>
    </header>

    <!-- View container -->
    <div class="view" id="view"></div>
  </div>
</div>

<!-- Drawer system -->
<div class="drawer-bg" id="drawerBg" data-act="close"></div>
<div class="drawer" id="drawer"></div>

<!-- Toast -->
<div class="toast" id="toast"></div>

<!-- Scripts (order matters) -->
<script src="js/utils.js"></script>
<script src="js/data.js"></script>
<script src="js/helpers.js"></script>
<script src="js/views.js"></script>
<script src="js/events.js"></script>
<script src="js/theme.js"></script>
<script src="js/drawers.js"></script>
</body>
</html>
```
