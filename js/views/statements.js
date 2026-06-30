/* delonix — statements.js */

VIEWS.statements = (v)=>{
  let activeTab = 'pl';

  const money = n => {
    if(n===0) return '—';
    const abs = Math.abs(n);
    const s = '$'+abs.toLocaleString('en-US',{minimumFractionDigits:0,maximumFractionDigits:0});
    return n<0 ? `(${s})` : s;
  };
  const pct = (n,base) => base?Math.round(n/base*100)+'%':'—';
  const varColor = n => n>=0 ? 'var(--good)' : 'var(--crit)';

  const pl = [
    ['Revenue',null,null,null,4],
    ['Subscription revenue',418350,1241600,2428800,0],
    ['Professional services',42650,128000,249000,0],
    ['One-time fees & setup',26200,74000,142000,0],
    ['Total Revenue',487200,1443600,2819800,1],
    ['Less: Discounts & credits',-18400,-54200,-103600,0],
    ['Net Revenue',468800,1389400,2716200,2],
    [null,null,null,null,3],
    ['Cost of Revenue',null,null,null,4],
    ['Infrastructure & hosting',-68400,-201800,-394000,0],
    ['Support & operations',-41200,-122600,-239400,0],
    ['Payment processing',-26352,-78100,-152600,0],
    ['Total COGS',-135952,-402500,-786000,1],
    ['Gross Profit',332848,986900,1930200,2],
    [null,null,null,null,3],
    ['Operating Expenses',null,null,null,4],
    ['Research & Development',-89400,-264200,-516000,0],
    ['Sales & Marketing',-72100,-213800,-417400,0],
    ['General & Administrative',-38200,-113200,-221000,0],
    ['Total Operating Expenses',-199700,-591200,-1154400,1],
    [null,null,null,null,3],
    ['EBITDA',133148,395700,775800,2],
    ['Depreciation & Amortization',-12400,-36800,-72000,0],
    ['EBIT',120748,358900,703800,1],
    ['Interest expense',-2200,-6600,-12900,0],
    ['EBT',118548,352300,690900,1],
    ['Income tax provision',-27266,-81030,-158907,0],
    ['Net Income',91282,271270,532000,2],
  ];

  const assets = [
    ['Cash & equivalents',2840000,2751600,2751600],
    ['Accounts receivable',157800,142600,142600],
    ['Contract assets (unbilled)',214000,196400,196400],
    ['Prepaid expenses & deposits',38400,38400,38400],
    ['Total Current Assets',3250200,3129000,3129000],
    ['Property, plant & equipment (net)',124600,132400,132400],
    ['Intangible assets & IP',284000,296400,296400],
    ['Capitalized software',188000,162000,162000],
    ['Total Non-current Assets',596600,590800,590800],
    ['Total Assets',3846800,3719800,3719800],
  ];
  const liab = [
    ['Accounts payable',48200,51400,51400],
    ['Accrued liabilities',82600,78200,78200],
    ['Deferred revenue (current)',1240000,1180000,1180000],
    ['Tax payable',27266,24800,24800],
    ['Total Current Liabilities',1398066,1334400,1334400],
    ['Deferred revenue (non-current)',1600000,1620000,1620000],
    ['Total Liabilities',2998066,2954400,2954400],
    ["Shareholders' equity",848734,765400,765400],
    ['Total Liabilities & Equity',3846800,3719800,3719800],
  ];

  const re = [
    ['Opening retained earnings (Jan 1, 2026)',236800,null,null],
    ['Net income YTD',532000,null,null],
    ['Dividends declared',0,null,null],
    ['Closing retained earnings (Jun 28, 2026)',768800,null,null],
  ];

  const renderPL = (col) => {
    const colIdx = col==='qtd'?2:col==='ytd'?3:1;
    const base = pl.find(r=>r[0]==='Net Revenue')?.[colIdx] || 468800;
    return pl.map(r=>{
      if(r[3]===3) return `<tr style="height:6px"><td colspan="4"></td></tr>`;
      if(r[3]===4) return `<tr><td colspan="4" style="padding-top:14px;padding-bottom:2px"><span style="font-size:10px;text-transform:uppercase;letter-spacing:1.1px;color:var(--text-3);font-weight:700">${r[0]}</span></td></tr>`;
      const v = r[colIdx];
      const margin = r[3]>=1 && v!==null ? ` <span style="color:var(--text-3);font-weight:400;font-size:12px">(${pct(v,base)})</span>` : '';
      const isSub = r[3]===1, isHL = r[3]===2;
      const bg = isHL ? 'background:var(--surface-2);' : '';
      const fw = (isSub||isHL) ? 'font-weight:700;' : '';
      const label = (isSub||isHL) ? `<b style="${fw}">${r[0]}</b>` : `<span style="padding-left:10px">${r[0]}</span>`;
      const vc = v!==null ? (v<0?'var(--text-2)':'var(--text)') : '';
      return `<tr style="${bg}"><td style="${fw}">${label}</td><td class="num" style="${fw}color:${vc}">${v!==null?money(v):''}${isHL?margin:''}</td></tr>`;
    }).join('');
  };

  const renderBS = () => {
    const assetRows = assets.map((r,i)=>{
      const last = i===assets.length-1||i===4;
      const fw = last?'font-weight:700;':'padding-left:10px;';
      const bg = last?'background:var(--surface-2);':'';
      return `<tr style="${bg}"><td style="${fw}">${r[0]}</td><td class="num" style="${fw}font-variant-numeric:tabular-nums">${money(r[1])}</td></tr>`;
    }).join('');
    const liabRows = liab.map((r,i)=>{
      const last = i===liab.length-1||i===6||i===4;
      const fw = last?'font-weight:700;':'padding-left:10px;';
      const bg = last?'background:var(--surface-2);':'';
      return `<tr style="${bg}"><td style="${fw}">${r[0]}</td><td class="num" style="${fw}font-variant-numeric:tabular-nums">${money(r[1])}</td></tr>`;
    }).join('');
    return `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div class="card panel">
          <div class="panel-head"><h3>Assets</h3><span class="sub">June 28, 2026</span></div>
          <div class="table-wrap" style="border:none"><table><tbody>${assetRows}</tbody></table></div>
        </div>
        <div class="card panel">
          <div class="panel-head"><h3>Liabilities &amp; Equity</h3><span class="sub">June 28, 2026</span></div>
          <div class="table-wrap" style="border:none"><table><tbody>${liabRows}</tbody></table></div>
        </div>
      </div>`;
  };

  const renderRE = () => {
    const rows = re.map((r,i)=>{
      const isLast = i===re.length-1;
      const bg = isLast?'background:var(--surface-2);':'';
      const fw = isLast?'font-weight:700;':'';
      return `<tr style="${bg}"><td style="${fw}padding-left:${isLast?0:10}px">${r[0]}</td><td class="num" style="${fw}">${money(r[1])}</td></tr>`;
    }).join('');
    return `
      <div style="max-width:620px">
        <div class="card panel">
          <div class="panel-head"><h3>Retained Earnings Statement</h3><span class="sub">Jan 1 – Jun 28, 2026</span></div>
          <div class="table-wrap" style="border:none"><table><tbody>${rows}</tbody></table></div>
          <div class="note info" style="margin-top:16px">${svg(I.reports,15)}<div>Retained earnings represents cumulative net income less dividends since incorporation. No dividends were declared in the current period. Total equity of <b>$848,734</b> reflects the strengthening of the balance sheet as the company scales toward profitability milestones.</div></div>
        </div>
      </div>`;
  };

  const render = (tab, periodCol='mtd') => {
    const tabBar = `<div style="display:flex;gap:2px;background:var(--surface-2);border:1px solid var(--border-soft);border-radius:10px;padding:3px;width:fit-content;margin-bottom:20px" id="stmtTabs">
      <button class="seg-tab ${tab==='pl'?'on':''}" data-tab="pl" style="padding:7px 16px;border:none;border-radius:8px;font-size:12.5px;font-weight:600;cursor:pointer;background:${tab==='pl'?'var(--ember-glow)':'none'};color:${tab==='pl'?'var(--ember-soft)':'var(--text-3)'};transition:.12s">P&amp;L</button>
      <button class="seg-tab ${tab==='bs'?'on':''}" data-tab="bs" style="padding:7px 16px;border:none;border-radius:8px;font-size:12.5px;font-weight:600;cursor:pointer;background:${tab==='bs'?'var(--ember-glow)':'none'};color:${tab==='bs'?'var(--ember-soft)':'var(--text-3)'};transition:.12s">Balance Sheet</button>
      <button class="seg-tab ${tab==='re'?'on':''}" data-tab="re" style="padding:7px 16px;border:none;border-radius:8px;font-size:12.5px;font-weight:600;cursor:pointer;background:${tab==='re'?'var(--ember-glow)':'none'};color:${tab==='re'?'var(--ember-soft)':'var(--text-3)'};transition:.12s">Retained Earnings</button>
    </div>`;

    const periodBar = tab==='pl' ? `<div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">
      <span style="font-size:11px;color:var(--text-3);font-weight:700;text-transform:uppercase;letter-spacing:.8px">Period:</span>
      <div class="seg" id="periodSeg">
        <button class="${periodCol==='mtd'?'on':''}" data-period="mtd">MTD</button>
        <button class="${periodCol==='qtd'?'on':''}" data-period="qtd">QTD</button>
        <button class="${periodCol==='ytd'?'on':''}" data-period="ytd">YTD</button>
      </div>
    </div>` : '';

    const plLabel = periodCol==='qtd'?'Q2 2026':periodCol==='ytd'?'YTD 2026':'Jun 2026';
    const plTotal = periodCol==='qtd'?1443600:periodCol==='ytd'?2819800:487200;
    const netInc = periodCol==='qtd'?271270:periodCol==='ytd'?532000:91282;
    const gm = periodCol==='qtd'?68.3:periodCol==='ytd'?68.4:71.0;
    const ebitdaM = periodCol==='qtd'?27.4:periodCol==='ytd'?27.5:28.4;
    const netM = periodCol==='qtd'?18.8:periodCol==='ytd'?18.9:19.5;

    let tabContent;
    if(tab==='pl'){
      tabContent = `
        <div class="row" style="grid-template-columns:1.6fr 1fr;align-items:start">
          <div class="card panel">
            <div class="panel-head">
              <h3>Profit &amp; Loss — ${plLabel}</h3>
              <span class="sub">Management-basis, accrual</span>
              <div class="right">${pill('good','On Track')}</div>
            </div>
            <div class="table-wrap" style="border:none">
              <table><thead><tr><th>Line item</th><th class="num">${plLabel}</th></tr></thead>
              <tbody>${renderPL(periodCol)}</tbody></table>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:16px">
            <div class="card panel">
              <div class="panel-head"><h3>Margin summary</h3><span class="sub">${plLabel}</span></div>
              <div style="display:flex;flex-direction:column;gap:14px;padding:2px 0">
                <div>
                  <div style="display:flex;justify-content:space-between;margin-bottom:5px">
                    <span style="font-size:12px;color:var(--text-2)">Gross margin</span>
                    <span style="font-size:12px;font-weight:700;font-variant-numeric:tabular-nums">${gm}%</span>
                  </div>
                  <div style="height:5px;background:var(--surface-3);border-radius:3px"><div style="height:5px;width:${gm}%;background:var(--good);border-radius:3px"></div></div>
                </div>
                <div>
                  <div style="display:flex;justify-content:space-between;margin-bottom:5px">
                    <span style="font-size:12px;color:var(--text-2)">EBITDA margin</span>
                    <span style="font-size:12px;font-weight:700;font-variant-numeric:tabular-nums">${ebitdaM}%</span>
                  </div>
                  <div style="height:5px;background:var(--surface-3);border-radius:3px"><div style="height:5px;width:${ebitdaM}%;background:var(--ember-soft);border-radius:3px"></div></div>
                </div>
                <div>
                  <div style="display:flex;justify-content:space-between;margin-bottom:5px">
                    <span style="font-size:12px;color:var(--text-2)">Net income margin</span>
                    <span style="font-size:12px;font-weight:700;font-variant-numeric:tabular-nums">${netM}%</span>
                  </div>
                  <div style="height:5px;background:var(--surface-3);border-radius:3px"><div style="height:5px;width:${netM}%;background:var(--info);border-radius:3px"></div></div>
                </div>
              </div>
            </div>
            <div class="card panel">
              <div class="panel-head"><h3>Key figures</h3></div>
              <dl class="kv">
                <dt>Total Revenue</dt><dd class="tnum" style="font-weight:600">${money(plTotal)}</dd>
                <dt>Net Income</dt><dd class="tnum" style="font-weight:600;color:var(--good)">${money(netInc)}</dd>
                <dt>COGS ratio</dt><dd class="tnum">29%</dd>
                <dt>OpEx ratio</dt><dd class="tnum">41%</dd>
                <dt>Effective tax rate</dt><dd class="tnum">23%</dd>
                <dt>D&amp;A</dt><dd class="tnum">${money(-12400)}</dd>
              </dl>
            </div>
            <div class="note info">${svg(I.statements,15)}<div>Management-basis P&amp;L. GAAP reconciliation and full audited financials available on request. D&amp;A includes capitalized software amortization of <b>$8,200</b> and equipment <b>$4,200</b>.</div></div>
          </div>
        </div>`;
    } else if(tab==='bs'){
      tabContent = renderBS();
    } else {
      tabContent = renderRE();
    }

    v.innerHTML='';
    v.appendChild(el(`<div class="view">
      ${pageHead('Financial statements','GAAP-basis P&amp;L, balance sheet, and retained earnings · Delonix Inc · June 2026',
        `<button class="btn ghost" data-act="download" data-arg="xlsx|Financial Statements|Q2 2026">${svg(I.download,15)} Export XLSX</button>`)}
      <div class="grid kpis">
        ${kpi('Net Revenue','$468,800','Jun 2026 · after discounts',{trend:4.2,accent:true})}
        ${kpi('Gross Profit','$332,848','71.0% gross margin',{trend:1.1})}
        ${kpi('EBITDA','$133,148','28.4% EBITDA margin',{trend:3.2})}
        ${kpi('Net Income','$91,282','19.5% net margin',{trend:2.8})}
      </div>
      ${tabBar}${periodBar}${tabContent}
    </div>`));

    v.querySelectorAll('.seg-tab').forEach(btn=>{
      btn.onclick=()=>{ activeTab=btn.dataset.tab; render(activeTab,'mtd'); };
    });
    if(tab==='pl'){
      v.querySelectorAll('#periodSeg button').forEach(btn=>{
        btn.onclick=()=>render('pl',btn.dataset.period);
      });
    }
  };

  render('pl','mtd');
};

/* ---------- Cash & Treasury ---------- */
