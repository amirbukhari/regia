/* delonix — cashflow.js */

VIEWS.cashflow = (v)=>{
  const banks = [
    {name:'Operating Account',  bank:'JP Morgan Chase',  ref:'••4021',bal:1820000,ccy:'USD',status:'good',sl:'Reconciled'},
    {name:'Reserve / Savings',  bank:'JP Morgan Chase',  ref:'••9902',bal:680000, ccy:'USD',status:'good',sl:'Reconciled'},
    {name:'Payroll Account',    bank:'Silicon Valley Bank',ref:'••3317',bal:340000, ccy:'USD',status:'good',sl:'Reconciled'},
    {name:'Operating (EU)',     bank:'Deutsche Bank',    ref:'••1185',bal:0,       ccy:'EUR',status:'warn',sl:'Pending sweep',eur:185000},
  ];
  const totalUSD = banks.reduce((s,b)=>s+(b.ccy==='USD'?b.bal:(b.eur||0)*1.08),0);

  const obligations = [
    {name:'Payroll — Engineering & Product', due:'Jun 30',  amt:184000, cat:'Payroll',  status:'ember', sl:'Due in 2 days'},
    {name:'AWS / GCP Infrastructure',        due:'Jul 1',   amt:68400,  cat:'Vendor',   status:'ember', sl:'Due in 3 days'},
    {name:'Office lease — SF HQ',            due:'Jul 1',   amt:28500,  cat:'Rent',     status:'ember', sl:'Due in 3 days'},
    {name:'Payroll — GTM & G&A',             due:'Jul 15',  amt:96000,  cat:'Payroll',  status:'muted', sl:'Scheduled'},
    {name:'Stripe processing fees (Jun)',     due:'Jul 5',   amt:14200,  cat:'Vendor',   status:'muted', sl:'Scheduled'},
    {name:'Health benefits (Aetna)',          due:'Jul 10',  amt:18600,  cat:'Benefits', status:'muted', sl:'Scheduled'},
    {name:'401(k) employer match',            due:'Jul 15',  amt:11400,  cat:'Benefits', status:'muted', sl:'Scheduled'},
    {name:'SaaS tools & subscriptions',       due:'Jul 20',  amt:8200,   cat:'Vendor',   status:'muted', sl:'Scheduled'},
    {name:'D&O Insurance premium',            due:'Jul 22',  amt:14800,  cat:'Insurance',status:'muted', sl:'Scheduled'},
    {name:'Legal retainer (Wilson Sonsini)',  due:'Jul 31',  amt:12000,  cat:'Legal',    status:'muted', sl:'Scheduled'},
  ];
  const totalObligation = obligations.reduce((s,o)=>s+o.amt,0);

  const bridgeMonths = ['Jan','Feb','Mar','Apr','May','Jun'];
  const bridgeOpen =   [2140000,2280000,2390000,2510000,2680000,2752000];
  const bridgeClose =  [2280000,2390000,2510000,2680000,2752000,2840000];
  const bridgeOCF =    [140000, 148000, 132000, 158000, 124000, 148400];

  const money = n=>'$'+Math.abs(n).toLocaleString('en-US');
  const catColors = {Payroll:'var(--ember)',Vendor:'var(--warn)',Rent:'var(--info)',Benefits:'var(--good)',Insurance:'var(--text-2)',Legal:'var(--text-3)'};

  v.appendChild(el(`<div class="view">
    ${pageHead('Cash & treasury','Cash position, operating cash flow, bank accounts, and upcoming payment obligations.',
      `<button class="btn ghost" data-act="download" data-arg="xlsx|Cash Flow Statement|June 2026">${svg(I.download,15)} Cash flow stmt</button>
       <button class="btn primary" data-act="treasurysweep" data-arg="EUR|314000|1.0842">Sweep EUR → USD</button>`)}

    <div class="grid kpis">
      ${kpi('Cash position','$2.84M','3 accounts · USD',{trend:3.4,accent:true})}
      ${kpi('Operating CF','$148,400','Jun 2026 · MTD',{trend:14.2})}
      ${kpi('Days cash on hand','89','at current burn rate',{trend:4})}
      ${kpi('Burn rate','N/A','profitable · OCF positive',{})}
    </div>

    <div class="row">
      <div class="card panel">
        <div class="panel-head"><h3>Cash flow statement</h3><span class="sub">Jun 2026 · indirect method</span></div>
        <table style="width:100%">
          <thead><tr><th>Activity</th><th class="num">Amount</th><th class="num">YTD</th></tr></thead>
          <tbody>
            <tr><td colspan="3" style="padding-top:14px;padding-bottom:2px"><span style="font-size:10px;text-transform:uppercase;letter-spacing:1.1px;color:var(--text-3);font-weight:700">Operating Activities</span></td></tr>
            <tr><td style="padding-left:10px">Net income</td><td class="num">$91,282</td><td class="num mut">$532,000</td></tr>
            <tr><td style="padding-left:10px">Add: Depreciation &amp; amortization</td><td class="num">$12,400</td><td class="num mut">$72,000</td></tr>
            <tr><td style="padding-left:10px">Change in accounts receivable</td><td class="num">(${money(18600)})</td><td class="num mut">($42,100)</td></tr>
            <tr><td style="padding-left:10px">Change in deferred revenue</td><td class="num" style="color:var(--good)">$62,318</td><td class="num mut">$186,000</td></tr>
            <tr><td style="padding-left:10px">Change in accounts payable</td><td class="num">$3,200</td><td class="num mut">$11,400</td></tr>
            <tr><td style="padding-left:10px">Change in accrued liabilities</td><td class="num">(${money(2800)})</td><td class="num mut">$8,200</td></tr>
            <tr style="background:var(--surface-2)"><td><b>Net cash from operations</b></td><td class="num"><b>$148,400</b></td><td class="num mut">$770,100</td></tr>

            <tr><td colspan="3" style="padding-top:14px;padding-bottom:2px"><span style="font-size:10px;text-transform:uppercase;letter-spacing:1.1px;color:var(--text-3);font-weight:700">Investing Activities</span></td></tr>
            <tr><td style="padding-left:10px">Capitalized software development</td><td class="num">(${money(28000)})</td><td class="num mut">($162,000)</td></tr>
            <tr><td style="padding-left:10px">Equipment purchases</td><td class="num">(${money(14000)})</td><td class="num mut">($48,000)</td></tr>
            <tr style="background:var(--surface-2)"><td><b>Net cash from investing</b></td><td class="num"><b>(${money(42000)})</b></td><td class="num mut">($210,000)</td></tr>

            <tr><td colspan="3" style="padding-top:14px;padding-bottom:2px"><span style="font-size:10px;text-transform:uppercase;letter-spacing:1.1px;color:var(--text-3);font-weight:700">Financing Activities</span></td></tr>
            <tr><td style="padding-left:10px">Repayment of equipment financing</td><td class="num">(${money(12000)})</td><td class="num mut">($72,000)</td></tr>
            <tr><td style="padding-left:10px">Stock option exercises</td><td class="num">($6,000)</td><td class="num mut">$18,000</td></tr>
            <tr style="background:var(--surface-2)"><td><b>Net cash from financing</b></td><td class="num"><b>(${money(18000)})</b></td><td class="num mut">($54,000)</td></tr>

            <tr style="height:6px"><td colspan="3"></td></tr>
            <tr style="border-top:2px solid var(--border)"><td><b style="font-family:var(--display)">Net change in cash</b></td><td class="num"><b style="color:var(--good)">+$88,400</b></td><td class="num mut">+$506,100</td></tr>
            <tr><td style="color:var(--text-3)">Opening cash balance</td><td class="num mut">$2,751,600</td><td class="num mut">$2,333,900</td></tr>
            <tr style="background:var(--surface-2)"><td><b>Closing cash balance</b></td><td class="num"><b style="color:var(--ember-soft)">$2,840,000</b></td><td class="num mut">$2,840,000</td></tr>
          </tbody>
        </table>
      </div>

      <div style="display:flex;flex-direction:column;gap:16px">
        <div class="card panel">
          <div class="panel-head"><h3>Bank accounts</h3><span class="sub">${money(Math.round(totalUSD))} total</span></div>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${banks.map(b=>{
              const dispBal = b.ccy==='EUR' ? `€${(b.eur||0).toLocaleString()} EUR` : money(b.bal);
              const barW = b.ccy==='USD' ? Math.round(b.bal/1820000*100) : 10;
              return `<div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
                  <div><div style="font-weight:600;font-size:13px">${b.name}</div><div style="font-size:11px;color:var(--text-3);font-family:var(--mono)">${b.bank} ${b.ref}</div></div>
                  <div style="text-align:right">
                    <div style="font-weight:700;font-variant-numeric:tabular-nums;font-size:14px">${dispBal}</div>
                    <div>${pill(b.status,b.sl)}</div>
                  </div>
                </div>
                <div style="height:3px;background:var(--surface-3);border-radius:2px"><div style="height:3px;width:${barW}%;background:${b.status==='good'?'var(--good)':'var(--warn)'};border-radius:2px"></div></div>
              </div>`;
            }).join('')}
          </div>
        </div>

        <div class="card panel">
          <div class="panel-head"><h3>6-month cash bridge</h3><span class="sub">opening to closing · $k</span></div>
          <div id="cashBridge" style="display:flex;align-items:flex-end;gap:8px;height:120px"></div>
          <div class="legend" style="margin-top:8px">
            <span><i style="background:var(--surface-3)"></i>Opening</span>
            <span><i style="background:var(--good)"></i>OCF</span>
            <span><i style="background:var(--ember-soft)"></i>Closing</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card panel" style="margin-top:16px">
      <div class="panel-head"><h3>Upcoming payment obligations</h3><span class="sub">next 30 days · ${money(totalObligation)} total</span><div class="right"><span class="pill ember">3 due within 3 days</span></div></div>
      <div class="table-wrap" style="border:none">
        <table>
          <thead><tr><th>Obligation</th><th>Category</th><th>Due</th><th class="num">Amount</th><th>Status</th></tr></thead>
          <tbody>${obligations.map(o=>{
            const dotColor = catColors[o.cat]||'var(--text-3)';
            return `<tr>
              <td class="nm">${o.name}</td>
              <td><span style="display:inline-flex;align-items:center;gap:5px;font-size:12px;color:var(--text-2)"><i style="width:7px;height:7px;border-radius:50%;background:${dotColor};flex:none"></i>${o.cat}</span></td>
              <td class="mut">${o.due}</td>
              <td class="num tnum">${money(o.amt)}</td>
              <td>${pill(o.status,o.sl)}</td>
            </tr>`;
          }).join('')}
          <tr style="background:var(--surface-2)">
            <td colspan="3"><b>Total obligations (30 days)</b></td>
            <td class="num"><b>${money(totalObligation)}</b></td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`));

  requestAnimationFrame(()=>{
    const wrap = document.getElementById('cashBridge');
    if(!wrap) return;
    const maxV = Math.max(...bridgeClose)/1000;
    wrap.innerHTML = bridgeMonths.map((mo,i)=>{
      const op = Math.round(bridgeOpen[i]/1000);
      const cl = Math.round(bridgeClose[i]/1000);
      const ocf = Math.round(bridgeOCF[i]/1000);
      const ch = Math.round(cl/maxV*110);
      return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:5px">
        <span style="font-size:10px;color:var(--text-3)">${cl}k</span>
        <div style="width:100%;position:relative;height:${ch}px;display:flex;gap:1px;border-radius:4px 4px 0 0;overflow:hidden">
          <div style="flex:1;background:var(--surface-3)" title="Opening: $${op}k"></div>
          <div style="flex:1;background:var(--good);opacity:.9" title="OCF: +$${ocf}k"></div>
        </div>
        <span style="font-size:10px;color:var(--text-3)">${mo}</span>
      </div>`;
    }).join('');
  });
};

/* ---------- Financial Close ---------- */
