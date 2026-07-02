/*
 * deploy-check.mjs — TEST_PLAN.md §7: release verification against the live
 * GitHub Pages deployment (or any deployed URL).
 *
 * Usage:
 *   DEPLOY_URL=https://<owner>.github.io/regia node tests/deploy-check.mjs
 *   (CHROMIUM_PATH=... to pin a browser executable)
 */
import { chromium } from 'playwright';

const URL = (process.env.DEPLOY_URL || 'https://amirbukhari.github.io/regia').replace(/\/$/, '');
const checks = [];
const check = (name, ok, detail = '') => { checks.push({ name, ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`); };

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
const failed404 = [];
page.on('response', (r) => { if (r.status() === 404) failed404.push(r.url()); });
const pageErrors = [];
page.on('pageerror', (e) => pageErrors.push(String(e).split('\n')[0]));

// 7.2/7.3 — app loads under the base path, splash renders, sign-in works
await page.goto(URL + '/', { waitUntil: 'networkidle', timeout: 45000 });
check('page loads', true, URL);
check('splash renders', await page.isVisible('#splash .splash-card'));
await page.click('[data-act="enter"]');
await page.waitForSelector('#app.show');
await page.waitForTimeout(800);
check('app shell renders after sign-in', await page.isVisible('.sidebar .nav-item'));

// navigate 5+ routes, open an invoice drawer
for (const r of ['invoices', 'payments', 'accounts', 'dunning', 'reports', 'settings']) {
  await page.evaluate((id) => { closeDrawer(); route(id); }, r);
  await page.waitForTimeout(150);
}
await page.evaluate(() => route('invoices'));
await page.waitForTimeout(200);
await page.evaluate(() => document.querySelector('tr[data-act="invoice"]').click());
await page.waitForTimeout(200);
check('invoice drawer opens', await page.$eval('#drawer', (d) => d.classList.contains('open')));
check('no 404s (assets respect base path)', failed404.length === 0, failed404.slice(0, 3).join(', '));
check('no page errors', pageErrors.length === 0, pageErrors.slice(0, 2).join(' | '));

// 7.4 — logo assets
for (const logo of ['logo-orange.svg', 'logo-blue.svg']) {
  const resp = await page.request.get(`${URL}/logos/${logo}`);
  check(`logos/${logo} served`, resp.ok(), String(resp.status()));
}

// 7.5 — one DB flow persists across reload on the live origin
await page.evaluate(() => { closeDrawer(); route('invoices'); });
const before = await page.evaluate(() => db().invoices.length);
await page.evaluate(() => document.querySelector('[data-act="newinvoice"]').click());
await page.selectOption('#ni_customer', { index: 1 });
await page.evaluate(() => document.querySelector('[data-act="createinvoice"][data-arg="send"]').click());
await page.waitForTimeout(300);
await page.reload({ waitUntil: 'networkidle' });
await page.click('[data-act="enter"]');
await page.waitForSelector('#app.show');
check('demo DB persists on live origin', await page.evaluate(() => db().invoices.length) === before + 1);
await page.evaluate(() => { localStorage.removeItem('dlx-db-v1'); }); // leave the origin clean

await browser.close();
const failures = checks.filter((c) => !c.ok).length;
console.log(failures ? `\n${failures} deployment check(s) FAILED` : '\nDeployment verified.');
process.exit(failures ? 1 : 0);
