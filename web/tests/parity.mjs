/*
 * parity.mjs — pixel-compares the Next.js build against the original mockup.
 *
 * Usage:
 *   MOCKUP_URL=http://127.0.0.1:8000 NEXT_URL=http://127.0.0.1:8001 node tests/parity.mjs
 *
 * Serves nothing itself — point the two env vars at a server for the repo root
 * (the mockup) and one for web/out (the exported Next.js app). Screenshots and
 * diff images land in tests/.artifacts/.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const MOCKUP_URL = process.env.MOCKUP_URL || 'http://127.0.0.1:8000';
const NEXT_URL = process.env.NEXT_URL || 'http://127.0.0.1:8001';
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '.artifacts');
await mkdir(OUT, { recursive: true });

const VIEWPORT = { width: 1600, height: 1000 };
const SETTLE_MS = 1400; // KPI count-up runs 920ms; charts draw on rAF

/* interaction scenarios beyond plain routing: [name, route, css selector to click] */
const SCENARIOS = [
  ['drawer-invoice', 'invoices', 'tbody#invBody tr[data-act="invoice"]'],
  ['drawer-account', 'accounts', 'tr[data-act="account"]'],
  ['drawer-notifications', 'dashboard', 'button[data-act="notifications"]'],
  ['cmd-palette', 'dashboard', '#cmdInput'],
  ['theme-dawn', 'dashboard', null], // handled specially via setTheme
  ['signout-splash', null, null], // sign out → splash/login screen
];

async function boot(browser, base) {
  const page = await browser.newPage({ viewport: VIEWPORT });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => {
    // resource-load failures (fonts are unreachable in the sandbox) hit both
    // apps identically and aren't app defects — only JS errors count
    if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text());
  });
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.click('[data-act="enter"]');
  await page.waitForSelector('#app.show');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(SETTLE_MS);
  return { page, errors };
}

async function shot(page, file) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(SETTLE_MS);
  return page.screenshot({ path: file, animations: 'disabled' });
}

function diffPNGs(aBuf, bBuf, diffFile) {
  const a = PNG.sync.read(aBuf);
  const b = PNG.sync.read(bBuf);
  if (a.width !== b.width || a.height !== b.height) return { pixels: Infinity, note: 'size mismatch' };
  const d = new PNG({ width: a.width, height: a.height });
  const pixels = pixelmatch(a.data, b.data, d.data, a.width, a.height, { threshold: 0.05 });
  if (pixels > 0) writeFile(diffFile, PNG.sync.write(d));
  return { pixels };
}

const browser = await chromium.launch(
  // sandboxed CI images ship a pinned system chromium
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const m = await boot(browser, MOCKUP_URL);
const n = await boot(browser, NEXT_URL);

/* route lists must match exactly */
const routesOf = (p) => p.evaluate(() => enabledNavGroups().flatMap((g) => g.items.map((i) => i.id)));
const [mRoutes, nRoutes] = [await routesOf(m.page), await routesOf(n.page)];
if (JSON.stringify(mRoutes) !== JSON.stringify(nRoutes)) {
  console.error('ROUTE MISMATCH', { mockup: mRoutes, next: nRoutes });
  process.exit(1);
}
console.log(`${mRoutes.length} routes enabled in both apps`);

let failures = 0;
async function compare(name, act) {
  await act(m.page);
  await act(n.page);
  const [aBuf, bBuf] = [
    await shot(m.page, path.join(OUT, `${name}.mockup.png`)),
    await shot(n.page, path.join(OUT, `${name}.next.png`)),
  ];
  const { pixels, note } = diffPNGs(aBuf, bBuf, path.join(OUT, `${name}.diff.png`));
  const ok = pixels === 0;
  if (!ok) failures++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${name}${ok ? '' : ` — ${pixels} px differ${note ? ` (${note})` : ''}`}`);
}

for (const id of mRoutes) {
  await compare(`route-${id}`, (p) => p.evaluate((r) => { closeDrawer(); route(r); }, id));
}

for (const [name, routeId, sel] of SCENARIOS) {
  await compare(`scenario-${name}`, async (p) => {
    if (name === 'signout-splash') { await p.evaluate(() => { closeDrawer(); signOut(); }); return; }
    await p.evaluate((r) => { closeDrawer(); route(r); }, routeId);
    if (name === 'theme-dawn') { await p.evaluate(() => setTheme('dawn')); return; }
    if (sel === '#cmdInput') { await p.click(sel); await p.type(sel, 'rev'); return; }
    // dispatch the click in-page: Playwright's auto-scroll actionability pass can
    // race the initial font-fallback reflow and leave the two pages at different
    // scroll offsets, which is a harness artifact, not an app difference
    await p.evaluate((s) => document.querySelector(s).click(), sel);
  });
}
/* restore default theme for cleanliness */
for (const p of [m.page, n.page]) await p.evaluate(() => setTheme('ember'));

console.log('\nconsole/page errors — mockup:', m.errors.length ? m.errors : 'none');
console.log('console/page errors — next:  ', n.errors.length ? n.errors : 'none');
if (n.errors.length || m.errors.length) failures++;

await browser.close();
console.log(failures ? `\n${failures} comparison(s) FAILED` : '\nAll comparisons passed — pixel-identical.');
process.exit(failures ? 1 : 0);
