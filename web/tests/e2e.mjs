/*
 * e2e.mjs — executable version of TEST_PLAN.md §5 (manual test cases).
 *
 * Runs every case (SH/INV/PAY/ACC/SUB/CRD/DUN/CFG/DB/UX) against a served
 * build of the console and reports pass/fail per test-plan ID.
 *
 * Usage:
 *   BASE_URL=http://127.0.0.1:8000 node tests/e2e.mjs    # mockup (default)
 *   BASE_URL=http://127.0.0.1:8001 node tests/e2e.mjs    # next export
 *   CHROMIUM_PATH=... to pin a browser executable.
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:8000';
const results = [];
let page, context, pageErrors;

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);

async function freshPage(opts = {}) {
  if (context) await context.close();
  context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, ...opts });
  page = await context.newPage();
  pageErrors = [];
  page.on('pageerror', (e) => pageErrors.push(String(e).split('\n')[0]));
  page.on('console', (m) => {
    if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) pageErrors.push(m.text());
  });
  return page;
}
async function boot(reset = true) {
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  if (reset) { await page.evaluate(() => localStorage.clear()); await page.reload({ waitUntil: 'networkidle' }); }
  await page.click('[data-act="enter"]');
  await page.waitForSelector('#app.show');
  await page.waitForTimeout(500);
}
const go = async (r) => { await page.evaluate((id) => { closeDrawer(); route(id); }, r); await page.waitForTimeout(150); };
const click = (sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) throw new Error('no element: ' + s); el.click(); }, sel);
const drawerText = () => page.evaluate(() => document.getElementById('drawer').innerText);
const dbEval = (fn) => page.evaluate(fn);

async function test(id, name, fn) {
  try { await fn(); results.push({ id, name, ok: true }); }
  catch (e) { results.push({ id, name, ok: false, err: String(e).split('\n')[0] }); }
}
function expect(cond, msg) { if (!cond) throw new Error(msg); }

/* ================= 5.1 Entry & shell ================= */
await freshPage();
await test('SH-1', 'splash renders cleanly', async () => {
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  expect(await page.isVisible('#splash .splash-card'), 'splash card not visible');
  expect((await page.inputValue('#email')).includes('@'), 'email not prefilled');
  expect(await page.isVisible('.build-stamp'), 'build stamp missing');
});
await test('SH-2', 'sign in shows the app shell', async () => {
  await page.click('[data-act="enter"]');
  await page.waitForSelector('#app.show');
  await page.waitForTimeout(700);
  expect(await page.isVisible('.sidebar .nav-item'), 'nav items missing');
  expect((await page.textContent('#crumb')).includes('Dashboard'), 'breadcrumb wrong');
  expect(await page.isVisible('#revChart'), 'dashboard chart missing');
});
await test('SH-3', 'command palette: open, filter, navigate, escape', async () => {
  await page.click('#cmdInput');
  await page.type('#cmdInput', 'rev');
  await page.waitForTimeout(150);
  const items = await page.$$eval('#cmdMenu .cmd-item', (els) => els.map((e) => e.innerText));
  expect(items.length > 0 && items.every((t) => /rev/i.test(t)), 'palette filter wrong: ' + items.join());
  await page.keyboard.press('Enter');
  await page.waitForTimeout(200);
  expect(!(await page.textContent('#crumb')).includes('Dashboard'), 'Enter did not navigate');
  await page.click('#cmdInput'); await page.keyboard.press('Escape');
  expect(!(await page.$eval('#cmdMenu', (m) => m.classList.contains('open'))), 'Escape did not close palette');
});
await test('SH-4', 'every route renders via the sidebar', async () => {
  await go('dashboard');
  const ids = await page.evaluate(() => enabledNavGroups().flatMap((g) => g.items.map((i) => i.id)));
  for (const id of ids) {
    await page.evaluate((r) => { document.querySelector(`.nav-item[data-id="${r}"]`).click(); }, id);
    await page.waitForTimeout(60);
    expect(await page.$eval('#view', (v) => v.children.length > 0), `route ${id} rendered empty`);
    expect(await page.$eval(`.nav-item[data-id="${id}"]`, (n) => n.classList.contains('active')), `nav not active for ${id}`);
  }
  expect(pageErrors.length === 0, 'errors during nav: ' + pageErrors.join(' | '));
});
await test('SH-5', 'sign out returns to splash and back in works', async () => {
  await click('[data-act="signout"]');
  expect(!(await page.$eval('#app', (a) => a.classList.contains('show'))), 'app still shown');
  await page.click('[data-act="enter"]');
  await page.waitForSelector('#app.show');
});

/* ================= 5.2 Invoices ================= */
await freshPage(); await boot();
await test('INV-1', 'send new invoice: row + derived KPIs update', async () => {
  await go('invoices');
  const before = await dbEval(() => ({ n: db().invoices.length, total: db().invoices.reduce((s, i) => s + i.amt, 0) }));
  await click('[data-act="newinvoice"]');
  await page.selectOption('#ni_customer', { index: 2 });
  await click('[data-act="createinvoice"][data-arg="send"]');
  await page.waitForTimeout(250);
  const after = await dbEval(() => db().invoices.length);
  expect(after === before.n + 1, 'invoice not added');
  const firstRow = await page.textContent('#invBody tr td');
  expect(firstRow.includes(await dbEval(() => db().invoices[0].id)), 'new invoice not first row');
  const kpi = await page.textContent('.kpi .val');
  expect(kpi !== '$' + before.total.toLocaleString('en-US'), 'Invoiced KPI did not change');
});
await test('INV-2', 'save draft: Draft KPI and tab count increment', async () => {
  const drafts = await dbEval(() => db().invoices.filter((i) => i.sl === 'Draft').length);
  await click('[data-act="newinvoice"]');
  await click('[data-act="createinvoice"][data-arg="draft"]');
  await page.waitForTimeout(250);
  expect(await dbEval(() => db().invoices.filter((i) => i.sl === 'Draft').length) === drafts + 1, 'draft not added');
  const tab = await page.$$eval('#invTabs button', (b) => b.find((x) => x.innerText.startsWith('Draft')).innerText);
  expect(tab.includes(String(drafts + 1)), 'Draft tab count wrong: ' + tab);
});
await test('INV-3', 'invoice drawer shows the clicked row and reconciles totals', async () => {
  const target = await dbEval(() => db().invoices.find((i) => i.sl === 'Paid').id);
  await page.evaluate((id) => document.querySelector(`tr[data-act="invoice"][data-arg="${id}"]`).click(), target);
  await page.waitForTimeout(150);
  const txt = await drawerText();
  expect(txt.includes(target), 'drawer shows wrong invoice');
  const amt = await dbEval((/* row amount */) => db().invoices.find((i) => i.sl === 'Paid').amt);
  const fmt2 = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  expect(txt.includes(fmt2(amt)), `drawer total ${fmt2(amt)} not found`);
  await page.evaluate(() => closeDrawer());
});
await test('INV-4', 're-run validation clears draft issues and banner', async () => {
  await go('invoices');
  expect(await page.isVisible('.val-banner.warn'), 'expected validation banner before fix');
  await click('[data-act="draftvalidate"][data-arg="all"]');
  await click('[data-act="revalidate"]');
  await page.waitForTimeout(250);
  expect(!(await page.isVisible('.val-banner.warn')), 'banner still visible after validation');
  expect(await dbEval(() => db().invoices.every((i) => !i.validationErrors)), 'validation errors remain in db');
});
await test('INV-5', 'finalize period sends validated drafts', async () => {
  const drafts = await dbEval(() => db().invoices.filter((i) => i.sl === 'Draft').length);
  expect(drafts > 0, 'no drafts to finalize');
  await click('[data-act="signoffclose"]');
  await click('[data-act="finalizeperiod"]');
  await page.waitForTimeout(250);
  expect(await dbEval(() => db().invoices.filter((i) => i.sl === 'Draft').length) === 0, 'drafts remain');
});
await test('INV-6', 'credit/rebill creates a pending credit note', async () => {
  const target = await dbEval(() => db().invoices.find((i) => i.finalized).id);
  const credits = await dbEval(() => db().credits.length);
  await page.evaluate((id) => document.querySelector(`[data-act="creditrebill"][data-arg="${id}"]`)?.click() ||
    openCreditRebill(id), target);
  await page.waitForTimeout(150);
  await click('[data-act="submitcredit"]');
  await page.waitForTimeout(250);
  const cn = await dbEval(() => db().credits[0]);
  expect(await dbEval(() => db().credits.length) === credits + 1, 'credit note not created');
  expect(cn.sl === 'Pending Approval' && cn.applied === target, 'credit note not linked/pending');
});

/* ================= 5.3 Payments ================= */
await freshPage(); await boot();
await test('PAY-1', 'payment drawer shows the clicked payment', async () => {
  await go('payments');
  await click('tr[data-act="paydetail"][data-arg="PAY-94197"]');
  await page.waitForTimeout(150);
  const head = await page.textContent('#drawer .drawer-head');
  expect(head.includes('Apex Systems') && head.includes('PAY-94197'), 'wrong payment in drawer: ' + head.replace(/\n/g, ' '));
});
await test('PAY-2', 'retry flips failed payment to succeeded, KPIs recompute', async () => {
  const failed = await dbEval(() => db().payments.filter((p) => p.sl === 'Failed').length);
  await click('[data-act="retrypay"]');
  await page.waitForTimeout(150);
  await click('[data-act="retrypaynow"]');
  await page.waitForTimeout(250);
  expect(await dbEval(() => db().payments.find((p) => p.id === 'PAY-94197').sl) === 'Succeeded', 'payment not succeeded');
  expect(await dbEval(() => db().payments.filter((p) => p.sl === 'Failed').length) === failed - 1, 'failed count unchanged');
  const kpis = await page.$$eval('.kpi .lab', (els) => els.map((e) => e.innerText));
  expect(kpis.some((k) => /FAILED/i.test(k)), 'failed KPI card missing');
});
await test('PAY-3', 'refund marks a payment refunded', async () => {
  await click('tr[data-act="paydetail"][data-arg="PAY-94195"]');
  await page.waitForTimeout(150);
  await click('[data-act="refund"]');
  await page.waitForTimeout(150);
  await click('[data-act="refundnow"]');
  await page.waitForTimeout(250);
  expect(await dbEval(() => db().payments.find((p) => p.id === 'PAY-94195').sl) === 'Refunded', 'payment not refunded');
});
await test('PAY-4', 'manual payment posts and marks the invoice paid', async () => {
  const before = await dbEval(() => db().payments.length);
  await click('[data-act="manualpayment"]');
  await page.waitForTimeout(150);
  const opt = await page.$eval('#mp_invoice', (s) => s.value);
  const invId = (opt.match(/INV-\S+/) || [])[0];
  await page.fill('#mp_amount', '1234');
  await click('[data-act="recordpayment"]');
  await page.waitForTimeout(250);
  expect(await dbEval(() => db().payments.length) === before + 1, 'payment not recorded');
  expect(await page.evaluate((id) => db().invoices.find((i) => i.id === id).sl, invId) === 'Paid', 'invoice not marked paid');
});

/* ====== 5.4 Accounts / subscriptions / credits / collections ====== */
await freshPage(); await boot();
await test('ACC-1', 'account tabs filter and counts match', async () => {
  await go('accounts');
  await page.evaluate(() => [...document.querySelectorAll('#acctTabs2 button')].find((b) => b.innerText.startsWith('Enterprise')).click());
  await page.waitForTimeout(150);
  const rows = await page.$$eval('#acctBody tr', (trs) => trs.map((r) => r.innerText));
  expect(rows.every((r) => r.includes('Enterprise')), 'non-enterprise rows visible');
  const badge = await page.evaluate(() => [...document.querySelectorAll('#acctTabs2 button')].find((b) => b.innerText.startsWith('Enterprise')).querySelector('.ct').innerText);
  expect(rows.length === +badge, `rows ${rows.length} != tab count ${badge}`);
});
await test('ACC-2', 'new customer appears with New badge', async () => {
  await click('[data-act="newcustomer"]');
  await page.fill('#nc_name', 'Playwright Test Co');
  await click('[data-act="createcustomer"]');
  await page.waitForTimeout(300);
  const first = await page.textContent('#acctBody tr');
  expect(first.includes('Playwright Test Co') && first.includes('New'), 'new customer row wrong: ' + first.slice(0, 80));
});
await test('ACC-3', 'invoice grouping saves and restores', async () => {
  await page.evaluate(() => document.querySelector('[data-act="invgrouping"][data-arg="AC-4102"]').click());
  await page.waitForTimeout(150);
  await page.evaluate(() => { document.querySelectorAll('#drawer input[name="gp_radio"]')[3].checked = true; });
  await click('[data-act="applygrouping"]');
  await page.waitForTimeout(250);
  expect(await dbEval(() => db().customers.find((c) => c.id === 'AC-4102').grouping) === 'Sectioned by BU', 'grouping not applied');
  await page.evaluate(() => document.querySelector('[data-act="invgrouping"][data-arg="AC-4102"]').click());
  await page.waitForTimeout(150);
  expect(await page.evaluate(() => document.querySelectorAll('#drawer input[name="gp_radio"]')[3].checked), 'saved grouping not restored');
  await page.evaluate(() => closeDrawer());
});
await test('SUB-1', 'new subscription lands in the changes feed', async () => {
  await go('subscriptions');
  await click('[data-act="newsub"]');
  await page.selectOption('#ns_customer', { index: 1 });
  await page.selectOption('#ns_plan', { index: 0 });
  await click('[data-act="createsub"]');
  await page.waitForTimeout(300);
  const c = await dbEval(() => db().subChanges[0]);
  expect(c.type === 'New' && c.delta > 0, 'change entry wrong: ' + JSON.stringify(c));
});
await test('SUB-2', 'change plan names the account and records the change', async () => {
  await click('tr[data-act="subdetail"]');
  await page.waitForTimeout(150);
  const acct = await page.evaluate(() => document.querySelector('#drawer .drawer-head div div').innerText);
  await click('[data-act="changeplan"]');
  await page.waitForTimeout(150);
  expect((await drawerText()).length > 0 && (await page.textContent('#drawer .drawer-head')).includes(acct), 'drawer lost the account name');
  await page.evaluate(() => { document.querySelectorAll('#drawer input[name="planchange"]')[0].checked = true; });
  await click('[data-act="planchange"]');
  await page.waitForTimeout(300);
  const c = await dbEval(() => db().subChanges[0]);
  expect(c.cust === acct && c.type === 'Upgrade', 'plan change entry wrong: ' + JSON.stringify(c));
});
await test('CRD-1', 'large credit note requires approval', async () => {
  await go('credits');
  await click('[data-act="newcredit"]');
  await page.selectOption('#ncr_customer', { index: 1 });
  await page.fill('#ncr_amount', '1500');
  await click('[data-act="createcredit"]');
  await page.waitForTimeout(300);
  const cn = await dbEval(() => db().credits[0]);
  expect(cn.amt === 1500 && cn.sl === 'Pending Approval', 'credit note wrong: ' + JSON.stringify(cn));
});
await test('DUN-1', 'logging a contact writes a timeline entry', async () => {
  await go('dunning');
  await click('tr[data-act="colldetail"]');
  await page.waitForTimeout(150);
  await page.selectOption('#lc_type', 'Meeting');
  await page.fill('#lc_note', 'e2e note');
  await click('[data-act="logcontact"]');
  await page.waitForTimeout(300);
  const first = await page.textContent('#drawer .timeline .tl-item .tl-title');
  expect(first.includes('Manual — Meeting'), 'timeline entry missing: ' + first);
  expect((await drawerText()).includes('e2e note'), 'note not shown');
});
await test('DUN-2', 'suspend account reflects in the accounts view', async () => {
  await click('[data-act="suspendaccount"]');
  await page.waitForTimeout(150);
  await click('[data-act="suspendnow"]');
  await page.waitForTimeout(300);
  expect(await dbEval(() => db().customers.find((c) => c.name === 'Apex Systems').blab) === 'Suspended', 'customer not suspended');
});

/* ================= 5.5 Configuration persistence ================= */
await freshPage(); await boot();
await test('CFG-1', 'tax config: provider choice survives save/reopen/reload', async () => {
  await go('tax');
  await click('[data-act="taxconfig"]');
  await page.evaluate(() => { document.querySelectorAll('#drawer input[name="taxp"]')[1].checked = true; });
  await click('[data-act="saveconfig"]');
  await page.waitForTimeout(200);
  await page.reload({ waitUntil: 'networkidle' });
  await page.click('[data-act="enter"]'); await page.waitForSelector('#app.show');
  await go('tax'); await click('[data-act="taxconfig"]');
  expect(await page.evaluate(() => document.querySelectorAll('#drawer input[name="taxp"]')[1].checked), 'provider not restored after reload');
  await page.evaluate(() => closeDrawer());
});
await test('CFG-2', 'dunning sequence toggle persists', async () => {
  await go('dunning');
  await click('[data-act="dunningconfig"]');
  await page.evaluate(() => document.querySelector('#drawer .toggle[data-key="dunning-step-5"]').click());
  await page.evaluate(() => closeDrawer());
  await click('[data-act="dunningconfig"]');
  expect(!(await page.evaluate(() => document.querySelector('#drawer .toggle[data-key="dunning-step-5"]').classList.contains('on'))), 'toggle state not persisted');
  await page.evaluate(() => closeDrawer());
});
await test('CFG-3', 'workflow step editor saves parameters', async () => {
  await go('workflows');
  await page.evaluate(() => document.querySelector('[data-act="workflowstep"]').click());
  await page.waitForTimeout(150);
  await page.evaluate(() => { const i = document.querySelector('#drawer .form-grid input.finput'); i.value = 'e2e-param'; });
  await click('[data-act="saveconfig"]');
  await page.waitForTimeout(200);
  await page.evaluate(() => document.querySelector('[data-act="workflowstep"]').click());
  await page.waitForTimeout(150);
  expect(await page.evaluate(() => document.querySelector('#drawer .form-grid input.finput').value) === 'e2e-param', 'step param not restored');
  await page.evaluate(() => closeDrawer());
});
await test('CFG-4', 'price book default moves the Default pill', async () => {
  await go('catalog');
  await click('[data-act="pricebook"]');
  await page.waitForTimeout(150);
  await page.evaluate(() => document.querySelector('[data-act="setpricebookdefault"][data-arg="Volume Discount"]').click());
  await page.waitForTimeout(250);
  const cards = await page.$$eval('#drawer .entity-card', (els) => els.map((e) => e.innerText));
  expect(cards.find((c) => c.includes('Volume Discount')).includes('Default'), 'Default pill did not move');
  await page.evaluate(() => closeDrawer());
});
await test('CFG-5', 'settings billing toggle persists across reload', async () => {
  await go('settings');
  await page.evaluate(() => document.querySelector('.set-row .toggle[data-key^="settings-"]').click());
  const key = await page.evaluate(() => document.querySelector('.set-row .toggle[data-key^="settings-"]').dataset.key);
  await page.reload({ waitUntil: 'networkidle' });
  await page.click('[data-act="enter"]'); await page.waitForSelector('#app.show');
  await go('settings');
  expect(!(await page.evaluate((k) => document.querySelector(`.toggle[data-key="${k}"]`).classList.contains('on'), key)), 'toggle not persisted across reload');
});

/* ================= 5.6 Local DB lifecycle ================= */
await freshPage(); await boot();
await test('DB-1', 'mutations survive a reload', async () => {
  await go('invoices');
  const seedCount = await dbEval(() => db().invoices.length);
  await click('[data-act="newinvoice"]');
  await page.selectOption('#ni_customer', { index: 1 });
  await click('[data-act="createinvoice"][data-arg="send"]');
  await page.waitForTimeout(250);
  await page.reload({ waitUntil: 'networkidle' });
  await page.click('[data-act="enter"]'); await page.waitForSelector('#app.show');
  expect(await dbEval(() => db().invoices.length) === seedCount + 1, 'invoice lost on reload');
});
await test('DB-2', 'a fresh browser context gets fresh seed data', async () => {
  const other = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
  const p2 = await other.newPage();
  await p2.goto(BASE + '/', { waitUntil: 'networkidle' });
  await p2.click('[data-act="enter"]');
  await p2.waitForSelector('#app.show');
  const n = await p2.evaluate(() => db().invoices.length);
  await other.close();
  expect(n === 19, 'fresh context not seeded: ' + n);
});
await test('DB-3', 'reset demo data restores seeds', async () => {
  await go('settings');
  await click('[data-act="resetdemo"]');
  await page.waitForTimeout(250);
  expect(await dbEval(() => db().invoices.length) === 19, 'reset did not restore seeds');
});
await test('DB-4', 'audit log shows demo actions', async () => {
  await go('payments');
  await click('tr[data-act="paydetail"][data-arg="PAY-94194"]');
  await click('[data-act="retrypay"]'); await page.waitForTimeout(120);
  await click('[data-act="retrypaynow"]'); await page.waitForTimeout(250);
  await go('settings');
  const feed = await page.textContent('.activity');
  expect(/retried payment PAY-94194/.test(feed), 'action missing from audit feed');
});
await test('DB-5', 'storage is local-only under dlx-* keys', async () => {
  const keys = await page.evaluate(() => Object.keys(localStorage));
  expect(keys.length > 0 && keys.every((k) => k.startsWith('dlx-')), 'unexpected storage keys: ' + keys.join());
});

/* ================= 5.7 Theming, flags, accessibility ================= */
await freshPage(); await boot();
await test('UX-1', 'theme applies and persists across reload', async () => {
  await page.evaluate(() => setTheme('dawn'));
  expect(await page.evaluate(() => document.documentElement.dataset.theme) === 'dawn', 'theme not applied');
  await page.reload({ waitUntil: 'networkidle' });
  expect(await page.evaluate(() => document.documentElement.dataset.theme) === 'dawn', 'theme not persisted');
  await page.evaluate(() => { localStorage.setItem('dlx-theme', 'ember'); });
});
await test('UX-2', 'density persists across reload', async () => {
  await page.click('[data-act="enter"]'); await page.waitForSelector('#app.show');
  await page.evaluate(() => setDensity('compact'));
  await page.reload({ waitUntil: 'networkidle' });
  expect(await page.evaluate(() => document.documentElement.dataset.density) === 'compact', 'density not persisted');
  await page.evaluate(() => localStorage.setItem('dlx-density', 'default'));
});
await test('UX-3', 'feature flags hide modules and guard routes', async () => {
  await page.click('[data-act="enter"]'); await page.waitForSelector('#app.show');
  await go('settings');
  await page.evaluate(() => document.querySelector('[data-act="featureflag"][data-arg="partnerAndAi"]').click());
  await page.waitForTimeout(200);
  expect(!(await page.$('.nav-item[data-id="partnerbilling"]')), 'nav item still visible');
  await page.evaluate(() => route('partnerbilling'));
  await page.waitForTimeout(200);
  expect((await page.textContent('#crumb')).includes('Settings'), 'hidden route not guarded');
  expect(await page.$eval('#toast', (t) => t.classList.contains('show')), 'no explanatory toast');
  await page.evaluate(() => resetFeatureFlags());
});
await test('UX-4', 'keyboard: Enter flips switches, Esc closes drawers', async () => {
  await go('settings');
  const flipped = await page.evaluate(() => {
    const t = document.querySelector('.set-row .toggle[data-key]');
    const before = t.classList.contains('on');
    t.focus();
    t.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    return t.classList.contains('on') !== before;
  });
  expect(flipped, 'Enter did not flip the switch');
  await page.evaluate(() => { const t = document.querySelector('.set-row .toggle[data-key]'); t.focus(); t.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); });
  await click('[data-act="inviteusr"]');
  await page.waitForTimeout(150);
  await page.keyboard.press('Escape');
  expect(!(await page.$eval('#drawer', (d) => d.classList.contains('open'))), 'Esc did not close drawer');
  expect(await page.$('a.skip-link'), 'skip link missing');
});
await test('UX-5', 'prefers-reduced-motion suppresses animations', async () => {
  const rm = await browser.newContext({ viewport: { width: 1600, height: 1000 }, reducedMotion: 'reduce' });
  const p2 = await rm.newPage();
  await p2.goto(BASE + '/', { waitUntil: 'networkidle' });
  const anim = await p2.$eval('.splash-logo', (el) => {
    const cs = getComputedStyle(el);
    return { name: cs.animationName, dur: cs.animationDuration };
  });
  await rm.close();
  expect(anim.name === 'none' || anim.dur === '0.01ms' || anim.dur === '0.00001s', 'animation not reduced: ' + JSON.stringify(anim));
});
await test('UX-6', 'icon-only controls carry accessible labels', async () => {
  const a11y = await page.evaluate(() => ({
    close: [...document.querySelectorAll('.x[data-act="close"]')].every((b) => b.getAttribute('aria-label')),
    signout: !!document.querySelector('[data-act="signout"]').title,
    notif: !!document.querySelector('[data-act="notifications"]').title,
    switches: [...document.querySelectorAll('.toggle[data-key]')].every((t) => t.getAttribute('role') === 'switch'),
    menu: !!document.querySelector('.menu-btn').getAttribute('aria-label'),
  }));
  for (const [k, v] of Object.entries(a11y)) expect(v, `a11y gap: ${k}`);
});
await test('UX-7', 'no horizontal scroll at 375/768/1024/1440', async () => {
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const r of ['dashboard', 'invoices']) {
      await go(r);
      const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(over <= 0, `horizontal scroll (${over}px) at ${width}px on ${r}`);
    }
  }
  await page.setViewportSize({ width: 375, height: 900 });
  await page.evaluate(() => document.querySelector('.menu-btn').click());
  expect(await page.$eval('#app', (a) => a.classList.contains('nav-open')), 'mobile menu did not open');
  await page.evaluate(() => document.querySelector('.nav-scrim').click());
  expect(!(await page.$eval('#app', (a) => a.classList.contains('nav-open'))), 'mobile menu did not close');
});

/* ================= report ================= */
await context.close();
await browser.close();
const failed = results.filter((r) => !r.ok);
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.id.padEnd(6)} ${r.name}${r.ok ? '' : ' — ' + r.err}`);
console.log(`\n${results.length - failed.length}/${results.length} test-plan cases passed (${BASE})`);
process.exit(failed.length ? 1 : 0);
