/*
 * coherence-audit.mjs — advisory audit: does each drawer reflect what was clicked?
 *
 * For each drawer-opening act it opens up to 4 different args and flags
 *   (a) drawers that never mention the clicked arg/entity, and
 *   (b) drawers whose innerText is identical across different args once the
 *       arg text itself is masked — i.e. context-insensitive content.
 *
 * Advisory, not CI-gating: expect some false positives (drawers that show a
 * human label instead of a raw id, URL-encoded args, or differences that live
 * in control values rather than text). Review output by hand.
 *
 * Usage: BASE_URL=http://127.0.0.1:8000 node tests/coherence-audit.mjs
 */
import { chromium } from 'playwright';
const BASE = process.env.BASE_URL || 'http://127.0.0.1:8000';
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
page.on('dialog', (d) => d.dismiss());
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.evaluate(() => { localStorage.clear(); localStorage.setItem('dlx-feature-flags-v1', JSON.stringify(Object.fromEntries(Object.keys(FEATURE_FLAGS).map(k => [k, true])))); });
await page.reload({ waitUntil: 'networkidle' });
await page.click('[data-act="enter"]');
await page.waitForSelector('#app.show');
await page.waitForTimeout(500);

const SKIP = new Set(['enter','signout','menu','toast','route','toggle','lens','theme','density','featureflag','resetflags','download','close','saveconfig','savedone','resetdemo','createinvoice','revalidate','submitcredit','finalizeperiod','retrypaynow','refundnow','recordpayment','createcustomer','createsub','planchange','createcredit','logcontact','suspendnow','setpricebookdefault','applygrouping']);
const routes = await page.evaluate(() => enabledNavGroups().flatMap(g => g.items.map(i => i.id)));
const byAct = new Map(); // act -> Map(arg -> {route, body})

for (const r of routes) {
  await page.evaluate((id) => { closeDrawer(); route(id); }, r);
  await page.waitForTimeout(80);
  const targets = await page.evaluate((skip) =>
    [...document.getElementById('view').querySelectorAll('[data-act]')]
      .filter(el => !skip.includes(el.dataset.act) && el.dataset.arg)
      .map(el => ({ act: el.dataset.act, arg: el.dataset.arg })), [...SKIP]);
  for (const t of targets) {
    if (!byAct.has(t.act)) byAct.set(t.act, new Map());
    const seen = byAct.get(t.act);
    if (seen.has(t.arg) || seen.size >= 4) continue;
    const body = await page.evaluate(({ act, arg }) => {
      closeDrawer();
      const el = [...document.getElementById('view').querySelectorAll(`[data-act="${act}"]`)].find(e => e.dataset.arg === arg);
      if (!el) return null;
      el.click();
      const d = document.querySelector('.drawer.open');
      return d ? d.innerText : null;
    }, t);
    if (body !== null) seen.set(t.arg, { route: r, body });
    await page.evaluate(() => closeDrawer());
  }
}
await browser.close();

const report = [];
for (const [act, args] of byAct) {
  if (args.size === 0) continue;
  // (a) does the drawer mention the arg (first token before any | separator)?
  for (const [arg, { route, body }] of args) {
    const key = arg.split('|')[0];
    if (key && key.length > 2 && !/^(new|all|current|bulk|csv|pdf|json|xlsx|custom|test|builder|schedule|recalc)$/i.test(key)
        && !body.toLowerCase().includes(key.toLowerCase())) {
      report.push(`NO-MENTION   ${act}(${key})  [${route}] — drawer never mentions the clicked entity`);
    }
  }
  // (b) identical bodies across different args (mask the arg text first)
  if (args.size >= 2) {
    const norm = [...args].map(([arg, { body }]) => body.split(arg.split('|')[0]).join('#').replace(/\s+/g, ' '));
    const uniq = new Set(norm);
    if (uniq.size === 1) {
      report.push(`SAME-BODY    ${act}  args tried: ${[...args.keys()].map(a => a.split('|')[0]).join(', ')} — content identical regardless of argument`);
    }
  }
}
console.log(report.sort().join('\n') || 'coherent');
