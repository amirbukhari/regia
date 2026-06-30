/* delonix — revrec.js */

VIEWS.revrec = (v)=>{
  const contracts = [
    {id:'CT-5340',acct:'Pinnacle SaaS',   total:1224000,recog:612000, deferred:612000, method:'Ratable · 12mo',  start:'Jan 2026',end:'Dec 2026',pobs:3,pobDone:6,period:12},
    {id:'CT-5102',acct:'Stellar Systems', total:1324800,recog:993600, deferred:331200, method:'Ratable · 12mo',  start:'Jan 2026',end:'Dec 2026',pobs:3,pobDone:9,period:12},
    {id:'CT-4821',acct:'CloudBase Inc',   total:1036800,recog:604800, deferred:432000, method:'Ratable · 12mo',  start:'Jan 2026',end:'Dec 2026',pobs:2,pobDone:6,period:12},
    {id:'CT-5618',acct:'Summit Digital',  total:921600, recog:460800, deferred:460800, method:'Ratable · 12mo',  start:'Jan 2026',end:'Dec 2026',pobs:4,pobDone:6,period:12},
    {id:'CT-5720',acct:'Apex Systems',    total:835200, recog:556800, deferred:278400, method:'Ratable · 12mo',  start:'Jan 2026',end:'Dec 2026',pobs:2,pobDone:8,period:12},
    {id:'CT-5201',acct:'Zenith Cloud',    total:684000, recog:399000, deferred:285000, method:'Milestone',       start:'Feb 2026',end:'Jan 2027',pobs:5,pobDone:3,period:12},
    {id:'CT-4990',acct:'DataVault',       total:446400, recog:297600, deferred:148800, method:'Ratable · 12mo',  start:'Jan 2026',end:'Dec 2026',pobs:2,pobDone:8,period:12},
    {id:'CT-5410',acct:'Fulcrum Labs',    total:489600, recog:244800, deferred:244800, method:'Ratable · 12mo',  start:'Jan 2026',end:'Dec 2026',pobs:3,pobDone:6,period:12},
    {id:'CT-5105',acct:'Acme Corp',       total:302400, recog:201600, deferred:100800, method:'Ratable · 12mo',  start:'Jan 2026',end:'Dec 2026',pobs:1,pobDone:8,period:12},
    {id:'CT-5330',acct:'Bridgepoint',     total:309600, recog:154800, deferred:154800, method:'Ratable · 12mo',  start:'Jan 2026',end:'Dec 2026',pobs:2,pobDone:6,period:12},
    {id:'CT-5512',acct:'Cascade Analytics',total:424800,recog:212400,deferred:212400, method:'Ratable · 12mo',  start:'Jan 2026',end:'Dec 2026',pobs:2,pobDone:6,period:12},
    {id:'CT-5601',acct:'Meridian Tech',   total:208800, recog:104400, deferred:104400, method:'Milestone',       start:'Mar 2026',end:'Feb 2027',pobs:4,pobDone:2,period:12},
  ];

  const totalDeferred = contracts.reduce((s,c)=>s+c.deferred,0);
  const totalRecog    = contracts.reduce((s,c)=>s+c.recog,0);
  const totalValue    = contracts.reduce((s,c)=>s+c.total,0);

  const pobs = [
    {name:'SaaS platform license',type:'License',method:'Ratable over term',allocated:2680000,recognized:1604200,status:'good','slabel':'On schedule'},
    {name:'Onboarding & implementation',type:'Service',method:'% completion',allocated:486000,recognized:441200,status:'good','slabel':'On schedule'},
    {name:'Professional services (custom dev)',type:'Service',method:'Hours delivered',allocated:312000,recognized:198400,status:'ember','slabel':'In progress'},
    {name:'Premium support SLA',type:'Support',method:'Ratable over term',allocated:194400,recognized:130200,status:'good','slabel':'On schedule'},
    {name:'Integration setup (one-time)',type:'Setup',method:'At completion',allocated:148800,recognized:148800,status:'good','slabel':'Complete'},
    {name:'Training & certification',type:'Training',method:'Sessions delivered',allocated:86400,recognized:64800,status:'warn','slabel':'Behind schedule'},
  ];

  const wfMonths = ['Jul','Aug','Sep','Oct','Nov','Dec'];
  const wfData = [
    [102,102,102,102,102,102],
    [ 55, 55, 55, 55, 55, 56],
    [ 72, 72, 72, 72, 72, 72],
    [ 76, 76, 76, 76, 76, 76],
    [ 46, 46, 46, 46, 46, 46],
  ];
  const wfTotals = wfMonths.map((_,i)=>wfData.reduce((s,r)=>s+r[i],0));
  const wfMax = Math.max(...wfTotals);

  const money = n=>'$'+Math.abs(n).toLocaleString('en-US');

  v.appendChild(el(`<div class="view">
    ${pageHead('Revenue recognition','ASC 606 / IFRS 15 — performance obligations, deferred revenue waterfall, and recognition schedules.',
      `<button class="btn ghost" data-act="revrules">Recognition rules</button>
       <button class="btn primary" data-act="postjournals">Close period</button>`)}

    <div class="grid kpis">
      ${kpi('Deferred Revenue','$2.84M','balance sheet liability — 12 contracts',{accent:true})}
      ${kpi('Recognized MTD','$398,200','posted to P&L · Jun 2026',{trend:6.2})}
      ${kpi('Contract asset (unbilled)','$214,000','accrued — earned not invoiced',{})}
      ${kpi('Rec. rate','86.4%','recognized / total contract value',{trend:1.8})}
    </div>

    <div class="card panel" style="margin-bottom:16px">
      <div class="panel-head"><h3>Performance obligations</h3><span class="sub">ASC 606 — 6 distinct POBs across active contracts</span></div>
      <div class="table-wrap" style="border:none">
        <table>
          <thead><tr><th>Performance obligation</th><th>Type</th><th>Method</th><th class="num">Allocated</th><th class="num">Recognized</th><th class="num">Remaining</th><th>Status</th></tr></thead>
          <tbody>${pobs.map(p=>{
            const rem = p.allocated - p.recognized;
            const rpct = Math.round(p.recognized/p.allocated*100);
            return `<tr>
              <td class="nm">${p.name}</td>
              <td><span class="pill muted">${p.type}</span></td>
              <td class="mut">${p.method}</td>
              <td class="num">${money(p.allocated)}</td>
              <td class="num" style="color:var(--good)">${money(p.recognized)} <span class="mut" style="font-size:11px">(${rpct}%)</span></td>
              <td class="num" style="color:var(--ember-soft)">${money(rem)}</td>
              <td>${pill(p.status,p.slabel)}</td>
            </tr>`;
          }).join('')}</tbody>
        </table>
      </div>
    </div>

    <div class="row">
      <div class="card panel">
        <div class="panel-head"><h3>Deferred revenue waterfall</h3><span class="sub">expected recognition — top 5 contracts · next 6 months ($k)</span></div>
        <div id="revrecWaterfall" style="display:flex;align-items:flex-end;gap:12px;height:140px;padding-top:12px"></div>
        <div class="legend" style="margin-top:10px">
          <span><i style="background:var(--ember)"></i>Pinnacle SaaS</span>
          <span><i style="background:var(--ember-soft)"></i>Stellar Systems</span>
          <span><i style="background:#ff9152"></i>CloudBase Inc</span>
          <span><i style="background:#ffa570"></i>Summit Digital</span>
          <span><i style="background:#ffc4a0"></i>Apex Systems</span>
        </div>
        <div class="note info" style="margin-top:14px">${svg(I.revrec,15)}<div>Deferred revenue of <b>${money(totalDeferred)}</b> will be recognized over the remaining contract terms. Straight-line ratable recognition accounts for <b>82%</b> of contracts by value; milestone-based recognition is used for professional services where distinct deliverables define the performance obligation.</div></div>
      </div>
      <div class="card panel">
        <div class="panel-head"><h3>Recognition summary</h3><span class="sub">portfolio totals</span></div>
        <div class="totals">
          <div class="t"><span class="mut">Total contract value</span><span class="num tnum">${money(totalValue)}</span></div>
          <div class="t"><span class="mut">Recognized to date</span><span class="num tnum" style="color:var(--good)">${money(totalRecog)}</span></div>
          <div class="t"><span class="mut">Deferred (liability)</span><span class="num tnum" style="color:var(--ember-soft)">${money(totalDeferred)}</span></div>
          <div class="t grand"><span>Recognized %</span><span class="num">${Math.round(totalRecog/totalValue*100)}%</span></div>
        </div>
        <div class="sec-title">Period close status</div>
        <div class="dot-step">
          ${[['Rating cut-off','done'],['ASC 606 schedules','done'],['Journal posting','active'],['GL lock','']].map((s,i)=>`<div class="ds ${s[1]}"><div class="c">${s[1]==='done'?'✓':i+1}</div><small>${s[0]}</small></div>`).join('')}
        </div>
      </div>
    </div>

    <div class="card panel" style="margin-top:16px">
      <div class="panel-head"><h3>Contract recognition schedule</h3><span class="sub">click any row for monthly schedule</span><div class="right"><span class="pill good">${contracts.length} active contracts</span></div></div>
      <div class="table-wrap" style="border:none">
        <table>
          <thead><tr><th>Contract</th><th>Account</th><th class="num">Total value</th><th class="num">Recognized</th><th class="num">Deferred</th><th class="num">% done</th><th>Method</th><th>Period</th></tr></thead>
          <tbody>${contracts.map(c=>{
            const dpct = Math.round(c.recog/c.total*100);
            return `<tr style="cursor:pointer" data-act="revsched" data-arg="${c.id}|${c.acct}|${c.total}|${c.recog}|${c.deferred}|${c.method}">
              <td class="mono">${c.id}</td>
              <td class="nm">${c.acct}</td>
              <td class="num">${money(c.total)}</td>
              <td class="num" style="color:var(--good)">${money(c.recog)}</td>
              <td class="num" style="color:var(--ember-soft)">${money(c.deferred)}</td>
              <td class="num">
                <div style="display:flex;align-items:center;gap:8px;justify-content:flex-end">
                  <div style="width:52px;height:4px;background:var(--surface-3);border-radius:2px"><div style="height:4px;width:${dpct}%;background:var(--good);border-radius:2px"></div></div>
                  <span>${dpct}%</span>
                </div>
              </td>
              <td class="mut">${c.method}</td>
              <td class="mut">${c.start} – ${c.end}</td>
            </tr>`;
          }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`));

  requestAnimationFrame(()=>{
    const wrap = document.getElementById('revrecWaterfall');
    if(!wrap) return;
    const colors = ['var(--ember)','var(--ember-soft)','#ff9152','#ffa570','#ffc4a0'];
    wrap.innerHTML = wfMonths.map((mo,i)=>{
      const total = wfTotals[i];
      const segs = wfData.map((row,ri)=>{
        const sh = Math.round((row[i]/wfMax)*120);
        return `<div style="height:${sh}px;background:${colors[ri]};opacity:${1-ri*0.12}" title="${['Pinnacle','Stellar','CloudBase','Summit','Apex'][ri]}: $${row[i]}k"></div>`;
      }).reverse().join('');
      return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px">
        <span style="font-size:11px;color:var(--text-3);font-variant-numeric:tabular-nums">$${total}k</span>
        <div style="width:100%;display:flex;flex-direction:column;justify-content:flex-end;gap:1px;height:120px;border-radius:5px 5px 0 0;overflow:hidden">${segs}</div>
        <span style="font-size:11px;color:var(--text-3)">${mo}</span>
      </div>`;
    }).join('');
  });
};
