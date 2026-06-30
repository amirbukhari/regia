# Contributing to delonix

A guide to the codebase and **how to add a new feature**. Read the "Architecture"
section once, then jump to the recipe you need.

---

## TL;DR — add a new page in 3 steps

1. **Create the view file** `js/views/<id>.js`:
   ```js
   /* delonix — <id>.js */
   VIEWS.foo = (v) => {
     v.appendChild(el(`<div class="view">
       ${pageHead('Foo', 'What this page is for.')}
       <div class="grid kpis" id="kpisFoo">
         ${kpi('Total Foo', '1,240', 'this month', {trend: 4.2, accent: true})}
         ${kpi('Open Foo', '38', 'awaiting review')}
       </div>
       <div class="card panel">
         <div class="panel-head"><h3>Recent foo</h3></div>
         <div class="table-wrap">
           <table>…</table>
         </div>
       </div>
     </div>`));
   };
   ```
2. **Register it in the nav** — add an entry to the `NAV` array in `js/data.js`:
   ```js
   { id: 'foo', label: 'Foo', icon: 'reports' }   // icon = a key in the `I` icon map (js/utils.js)
   ```
3. **Load the file** — add one `<script>` tag in `index.html` next to the other
   `js/views/*.js` tags, and bump the cache version (see "Cache busting"):
   ```html
   <script src="js/views/foo.js?v=18"></script>
   ```

That's it. The router (`route(id)` in `js/helpers.js`) automatically resolves
`VIEWS.foo` when the nav item is clicked. No central file to wire up, no build step.

---

## Architecture

**Zero-build, framework-free.** Plain HTML + CSS + vanilla JS, loaded as ordered
`<script>` tags. There is **no bundler, no npm install, no compile step.** You edit a
file, refresh the browser, and `git push` deploys it to GitHub Pages. Keep it that way
unless we collectively decide to adopt a build — that decision is bigger than any one
feature.

### File layout

```
index.html            App shell (splash, sidebar, topbar) + the ordered <script> list
billing.css           The entire design system (see "Theming & CSS")
js/
  utils.js            fmt(), el(), the `I` icon map, svg(), low-level helpers
  data.js             Mock data + the NAV array (sidebar nav groups/items)
  helpers.js          route(), buildNav(), and view helpers: pageHead(), kpi(), pill()
  views/
    _registry.js      Defines `const VIEWS = {}` — loads BEFORE any view file
    <id>.js           ONE file per page. Assigns VIEWS.<id> = (v) => {…}
    _actions.js       Cross-view row actions (openInvoice, openAccount, …)
  core/
    ui.js             Shared chart/drawer plumbing: openDrawer, closeDrawer, toast,
                        dpi, drawRevChart, drawSparks, …
  drawers/
    <domain>.js       Drawer builders grouped by domain (invoicing, payments,
                        catalog, entities, finance, reports, developers, settings, …)
                        Each defines open<Thing>() functions.
  events.js           Global click dispatch: maps data-act="x" → a handler
  theme.js            Theme switching (sets <html data-theme>) + accent/density
```

### How things talk to each other

- **Routing** — `route(id)` looks up `VIEWS[id]` and renders it into `#view`. Nav items
  call it automatically; from code use `route('invoices')`.
- **Interactivity** — use **delegated events**, not inline handlers. Add
  `data-act="thing"` (and optional `data-arg="…"`) to any element; `js/events.js`
  catches the click and calls the matching handler. Avoid `onclick="…"` in template
  strings — a few legacy ones remain, but new code should use `data-act`.
- **Globals are intentional.** Files are classic scripts, so `VIEWS`, `el`, `kpi`, `I`,
  `openDrawer`, etc. are shared globals. This is what keeps the app buildless and is why
  load order matters: `_registry.js` (defines `VIEWS`) and the core helpers load before
  the view files.

---

## Recipe: add a drawer / side-panel action

Drawers are the slide-in panels (New Invoice, Edit Plan, …).

> **Granularity rule:** drawers are grouped one file per *domain*, not one file per
> drawer. Keep it that way until a single domain file crosses **~40 KB or ~15
> functions** — at that point split *that file* by sub-feature
> (e.g. `invoicing.js` → `invoicing.js` + `invoicing-drafts.js`). Don't split
> everything up front; react to actual growth.

1. **Write the builder** in the matching `js/drawers/<domain>.js` (pick the domain by
   topic; if none fits, `settings.js` is the catch-all):
   ```js
   function openFooEditor(arg) {
     openDrawer('Edit foo', `
       <div class="form-section">
         <div class="form-group">
           <label class="form-label">Name</label>
           <input class="form-input" value="${arg || ''}">
         </div>
       </div>
       <div class="form-footer">
         <button class="btn ghost" data-act="close">Cancel</button>
         <button class="btn primary" data-act="toast" data-arg="Saved">Save</button>
       </div>
     `);
   }
   ```
   `openDrawer(title, bodyHtml)` handles the shell, backdrop, and open animation.
2. **Wire the action** — add one line to the dispatcher in `js/events.js`:
   ```js
   if (a === 'fooeditor') return openFooEditor(arg);
   ```
3. **Trigger it** from any markup:
   ```html
   <button class="btn" data-act="fooeditor" data-arg="FOO-001">Edit</button>
   ```

> `js/events.js` is the one file multiple people may touch for new actions. Keep edits
> to a single added line and it won't conflict.

---

## View building blocks

Use these instead of hand-rolling markup, so pages stay consistent:

| Helper | Produces |
|---|---|
| `pageHead(title, sub, actions)` | The page title block. `actions` is optional button HTML. |
| `kpi(label, value, sub, opts)` | A KPI card. `opts`: `{trend, accent, featured, spark}`. |
| `pill(status, label)` | A status chip. `status` ∈ `good \| warn \| crit \| info \| muted`. |
| `svg(I.name, size)` | An inline icon from the `I` map in `js/utils.js`. |
| `el(htmlString)` | Parse an HTML string into a DOM node. |
| `fmt(n)` | Format a number with thousands separators. |

**Sparklines:** pass `{spark: 'mrr'}` to `kpi()` and add a seed array in `drawSparks()`
(`js/core/ui.js`). They render as a full-width footer and recolor with the theme
automatically.

---

## Theming & CSS

- **Never hardcode colors.** Use the CSS variables in `:root` (`billing.css`):
  `var(--ember)` (accent), `var(--text)/(--text-2)/(--text-3)`, surfaces
  `var(--surface)/(--surface-2)`, borders `var(--border)`, and **semantic**
  `var(--good)/(--warn)/(--crit)/(--info)`. Semantic colors are separate from the accent.
- The 5 themes (`ember`, `midnight`, `forge`, `obsidian`, `dawn`) are `[data-theme]`
  blocks that override the same variables. If you use the variables, your feature themes
  for free.
- **Type:** `var(--display)` (Bricolage Grotesque) for headings, `var(--sans)` for body,
  `var(--mono)` for code. Add `tnum` / `font-variant-numeric: tabular-nums` to aligned
  numbers.

### Mobile (don't ship a feature without checking it)

- Put wide tables in `<div class="table-wrap"><table>…</table></div>` so they scroll
  inside their card instead of pushing the page sideways.
- Prefer the layout classes (`grid`, `row`, `two-col`, `cards-2/3`) over inline
  `style="grid-template-columns:…"`. Inline grids are auto-stacked on mobile by a
  defensive rule, but classes are cleaner.
- Filter `.tabs` scroll horizontally on small screens automatically.
- Check your page at **390px wide** before pushing. The quickest check:
  ```
  python3 -m http.server 8080      # then open localhost:8080 and use device emulation
  ```

---

## Local dev & deploy

- **Run locally:** `python3 -m http.server 8080` from the repo root, open
  `http://localhost:8080`. No install step.
- **Deploy:** push to `main`. GitHub Pages serves it. There is no build.

### Cache busting

Assets are referenced with a `?v=N` query string in `index.html` so browsers fetch
fresh files after a deploy. **When you change CSS/JS, bump the version** — bump the
`?v=` on the files you touched (or all of them) to the next number. This is currently
manual; if it becomes a chore, that's a good first candidate for a tiny build step.

---

## Conventions checklist (before opening a PR)

- [ ] New page is one file in `js/views/`, registered in `NAV`, with a `<script>` tag.
- [ ] Interactions use `data-act` / `data-arg`, not inline `onclick`.
- [ ] Colors are CSS variables, not hex literals.
- [ ] Wide tables are wrapped in `.table-wrap`.
- [ ] Checked at 390px — no horizontal page scroll.
- [ ] Bumped `?v=` for changed assets.
