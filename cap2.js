const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const ctx = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2 });
  const p = await ctx.newPage();
  await p.goto('http://localhost:8080/index.html?v=6',{waitUntil:'networkidle'});
  await p.evaluate(()=>document.querySelector('[data-act="enter"]').click());
  await p.waitForTimeout(1100);
  await p.evaluate(()=>{ const t=[...document.querySelectorAll('button,.seg-tab,[data-tab]')].find(e=>/CFO/i.test(e.textContent)); if(t) t.click(); });
  await p.waitForTimeout(350); // mid-animation
  await p.screenshot({path:'/tmp/cfo-mid.png'});
  await p.waitForTimeout(900); // at rest
  await p.screenshot({path:'/tmp/cfo-rest.png'});
  await b.close(); console.log('done');
})().catch(e=>{console.error(e);process.exit(1)});
