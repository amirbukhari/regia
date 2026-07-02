/*
 * runtime-audit.mjs — boots the mockup and exercises everything it renders:
 *
 *  - every function referenced by the events.js dispatch table must exist
 *  - every route renders without page/console errors
 *  - every unique [data-act] element (views and opened drawers) is clicked
 *  - rendered view and drawer HTML is scanned for template bugs
 *    (literal "undefined", "NaN", "[object Object]", unrendered "${")
 *
 * Usage: MOCKUP_URL=http://127.0.0.1:8000 node tests/runtime-audit.mjs
 * (CHROMIUM_PATH=... to pin a browser executable)
 */
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';

const MOCKUP_URL = process.env.MOCKUP_URL || 'http://127.0.0.1:8000';
const BUG_PATTERNS = ['undefined', 'NaN', '[object Object]', '${'];
const SKIP_ACTS = ['enter', 'signout', 'menu', 'resetflags'];

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
const findings = [];
let ctx = 'boot';
page.on('pageerror', (e) => findings.push({ ctx, type: 'pageerror', msg: String(e).split('\n')[0] }));
page.on('console', (m) => {
  if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) findings.push({ ctx, type: 'console', msg: m.text() });
});
page.on('dialog', (d) => d.dismiss());

await page.goto(MOCKUP_URL + '/', { waitUntil: 'networkidle' });
// enable every feature flag so all routes are auditable
await page.evaluate(() => localStorage.setItem('dlx-feature-flags-v1',
  JSON.stringify(Object.fromEntries(Object.keys(FEATURE_FLAGS).map((k) => [k, true])))));
await page.reload({ waitUntil: 'networkidle' });
await page.click('[data-act="enter"]');
await page.waitForSelector('#app.show');
await page.waitForTimeout(800);

/* 1) dispatch table: every handler function must exist */
const evSrc = readFileSync(new URL('../../js/events.js', import.meta.url), 'utf8');
const fns = [...new Set([...evSrc.matchAll(/return\s+([A-Za-z_$][\w$]*)\s*\(/g)].map((m) => m[1]))];
const missing = await page.evaluate((names) => names.filter((n) => typeof window[n] !== 'function'), fns);
missing.forEach((n) => findings.push({ ctx: 'dispatch', type: 'missing-handler', msg: n }));
console.log(`dispatch handlers: ${fns.length}, missing: ${missing.length}`);

const scanExpr = (scopeSel) => `(() => {
  const scope = document.querySelector(${JSON.stringify(scopeSel)});
  if (!scope) return [];
  const h = scope.innerHTML; const out = [];
  for (const pat of ${JSON.stringify(BUG_PATTERNS)}) {
    let i = h.indexOf(pat); let n = 0;
    while (i !== -1 && n < 6) { out.push(pat + ' :: ' + h.slice(Math.max(0, i - 60), i + 40).replace(/\\s+/g, ' ')); i = h.indexOf(pat, i + 1); n++; }
  }
  return out;
})()`;

/* 2) walk every route, scan markup, click every unique action */
const routes = await page.evaluate(() => enabledNavGroups().flatMap((g) => g.items.map((i) => i.id)));
console.log(`${routes.length} routes`);
const clicked = new Set();
let clicks = 0;

for (const r of routes) {
  ctx = `route:${r}`;
  await page.evaluate((id) => { closeDrawer(); route(id); }, r);
  await page.waitForTimeout(120);
  (await page.evaluate(scanExpr('#view'))).forEach((b) => findings.push({ ctx, type: 'view-html', msg: b }));

  for (let pass = 0; pass < 2; pass++) {
    const targets = await page.evaluate((skip) => {
      const scope = document.querySelector('.drawer.open') || document.getElementById('view');
      return [...scope.querySelectorAll('[data-act]')]
        .map((el, i) => ({ i, act: el.dataset.act, arg: el.dataset.arg || '' }))
        .filter((t) => !skip.includes(t.act));
    }, SKIP_ACTS);
    for (const t of targets) {
      const sig = `${t.act}|${t.arg}`;
      if (clicked.has(sig)) continue;
      clicked.add(sig);
      ctx = `route:${r} act:${t.act} arg:${t.arg}`;
      await page.evaluate(({ i, skip }) => {
        const scope = document.querySelector('.drawer.open') || document.getElementById('view');
        const el = [...scope.querySelectorAll('[data-act]')].filter((e) => !skip.includes(e.dataset.act))[i];
        el?.click();
      }, { i: t.i, skip: SKIP_ACTS });
      clicks++;
      (await page.evaluate(scanExpr('.drawer.open'))).forEach((b) => findings.push({ ctx, type: 'drawer-html', msg: b }));
      await page.evaluate((id) => { if (typeof current !== 'undefined' && current !== id) { closeDrawer(); route(id); } }, r);
    }
    // second pass audits drawer-internal actions when the view opened a drawer
    if (pass === 0 && !(await page.evaluate(() => !!document.querySelector('.drawer.open')))) break;
  }
  await page.evaluate(() => closeDrawer());
}

await browser.close();
console.log(`clicked ${clicks} unique actions`);
if (findings.length) {
  console.error(JSON.stringify(findings, null, 1));
  process.exit(1);
}
console.log('runtime audit clean.');
