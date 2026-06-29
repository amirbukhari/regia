const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const EXE='/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
(async () => {
  const b = await chromium.launch({ executablePath: EXE });
  const ctx = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2 });
  const p = await ctx.newPage();
  await p.goto('http://localhost:8080/index.html?v=5',{waitUntil:'networkidle'});
  await p.evaluate(()=>document.querySelector('[data-act="enter"]').click());
  await p.waitForTimeout(900);
  // dashboard full page
  await p.screenshot({path:'/tmp/cap-dash-full.png', fullPage:true});
  // CFO view
  await p.evaluate(()=>{ const t=[...document.querySelectorAll('button,.seg-tab,[data-tab]')].find(e=>/CFO/i.test(e.textContent)); if(t) t.click(); });
  await p.waitForTimeout(700);
  await p.screenshot({path:'/tmp/cap-cfo.png'});
  // navigate to Invoices
  await p.evaluate(()=>{ if(window.route) route('invoices'); });
  await p.waitForTimeout(800);
  await p.screenshot({path:'/tmp/cap-invoices.png'});
  await b.close(); console.log('done');
})().catch(e=>{console.error(e);process.exit(1)});
