// Repro for CI failure: clipboard writeText denied must not raise a page error.
// Overrides navigator.clipboard.writeText to reject (as CI's headless shell does),
// clicks every copy-flavored action, and fails on any pageerror.
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:8000';
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));

await page.addInitScript(() => {
  if (navigator.clipboard) {
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: () => Promise.reject(new DOMException('Write permission denied.', 'NotAllowedError')),
    });
  }
});

await page.goto(BASE + '/index.html', { waitUntil: 'load' });
await page.evaluate(() => { localStorage.clear(); });
await page.reload({ waitUntil: 'load' });
await page.evaluate(() => document.querySelector('[data-act="enter"]').click());
await page.waitForSelector('#app.on', { timeout: 5000 }).catch(() => {});

let toastMsg = '';
for (const route of ['portal', 'developers']) {
  await page.evaluate((r) => window.route(r), route);
  await page.waitForTimeout(150);
  const acts = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('#view [data-act="copy"], #view [data-act="rotatekey"], #view [data-act="apikey"], #view [data-act="webhookdetail"]').forEach((el) => out.push(true));
    return out.length;
  });
  console.log(`${route}: ${acts} copy-flavored triggers`);
  await page.evaluate(() => {
    document.querySelectorAll('#view [data-act="copy"], #view [data-act="rotatekey"], #view [data-act="apikey"], #view [data-act="webhookdetail"]').forEach((el) => el.click());
  });
  await page.waitForTimeout(400);
  // drawers opened by rotatekey/webhookdetail/apikey may contain copy buttons too
  await page.evaluate(() => {
    document.querySelectorAll('#drawer [data-act="copy"]').forEach((el) => el.click());
  });
  await page.waitForTimeout(400);
  toastMsg = await page.evaluate(() => document.getElementById('toastMsg').textContent);
  await page.evaluate(() => window.closeDrawer && window.closeDrawer());
}

console.log('last toast:', JSON.stringify(toastMsg));
await browser.close();

if (errors.length) {
  console.error('PAGE ERRORS:', errors);
  process.exit(1);
}
console.log('clipboard-denied repro clean — no page errors.');
