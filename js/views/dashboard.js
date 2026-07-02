/* delonix — dashboard.js */

VIEWS.dashboard = (v)=>{
  v.appendChild(el(`<div class="view">
    ${pageHead('Dashboard',
      'Revenue operations · June 2026 · Delonix Inc',
      `<div class="seg" id="lensSeg">
        <button class="on" data-act="lens" data-arg="revops">RevOps</button>
        <button data-act="lens" data-arg="cfo">CFO</button>
      </div>
      <button class="btn ghost" data-act="download" data-arg="pdf|Executive Board Pack|P&L · MRR bridge · ARR · AR aging">${svg(I.download,15)} Export</button>`
    )}

    <div class="grid kpis" id="kpisRevops">
      ${kpi('Monthly Recurring Revenue','$418,350','Jun 2026',{trend:4.2,accent:true,spark:'mrr',featured:true})}
      ${kpi('ARR','$5.02M','annualised run rate',{trend:6.1,spark:'arr'})}
      ${kpi('Net Revenue MTD','$329,400','net of credits & refunds',{trend:6.8,spark:'rev'})}
      ${kpi('Net Rev Retention','112%','trailing 12 months',{trend:2.0,spark:'nrr'})}
      ${kpi('Active Subscriptions','842','+18 net new this month',{trend:2.2,spark:'subs'})}
      ${kpi('Gross Churn','1.8%','revenue churn rate',{trend:-0.4,spark:'churn'})}
    </div>

    <div class="grid kpis" id="kpisCfo" style="display:none">
      ${kpi('ARR','$5.02M','annualised run rate',{trend:6.1,accent:true})}
      ${kpi('Gross Margin','71%','blended, ex-COGS',{trend:1.4})}
      ${kpi('EBITDA Margin','23%','trailing 12 months',{trend:2.8})}
      ${kpi('CAC Payback','14 mo','blended new business',{trend:-1.0})}
      ${kpi('LTV / CAC','4.2x','enterprise cohort',{trend:0.3})}
      ${kpi('Runway','28 mo','at current burn rate',{trend:2.0})}
    </div>

    <div class="two-col dash-cols" style="margin-bottom:16px;align-items:start">
      <div>
        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-head">
            <h3>Revenue trend</h3>
            <span class="sub">12-month net revenue · USD thousands</span>
            <div class="right">
              <div class="seg" id="dashSeg"><button class="on" data-act="dashseries" data-arg="net">Net Rev</button><button data-act="dashseries" data-arg="mrr">MRR</button></div>
            </div>
          </div>
          <canvas id="revChart" style="width:100%;height:240px;display:block"></canvas>
          <div class="legend" style="display:flex;gap:18px;padding:10px 0 2px;font-size:11px;letter-spacing:.04em;color:var(--text-2)">
            <span style="display:flex;align-items:center;gap:5px"><i style="width:12px;height:3px;border-radius:2px;background:var(--ember);display:inline-block"></i>Net revenue</span>
            <span style="display:flex;align-items:center;gap:5px"><i style="width:12px;height:3px;border-radius:2px;background:rgba(182,169,154,.45);display:inline-block"></i>Prior year</span>
          </div>
        </div>

        <div class="card panel">
          <div class="panel-head"><h3>MRR movement</h3><span class="sub">June 2026 bridge</span></div>
          <div style="overflow-x:auto">
            <table style="min-width:420px">
              <thead><tr>
                <th>Component</th>
                <th class="num">Amount</th>
                <th class="num">vs May</th>
                <th style="width:120px">Contribution</th>
              </tr></thead>
              <tbody>
                <tr><td style="color:var(--text-1)">Opening MRR</td><td class="num tnum">$396,950</td><td class="num tnum">—</td><td></td></tr>
                <tr><td style="color:var(--good)">New business</td><td class="num tnum" style="color:var(--good)">+$3,000</td><td class="num tnum mut">+$600</td><td><div style="height:6px;border-radius:3px;background:var(--surface-3)"><i style="display:block;height:100%;width:14%;border-radius:3px;background:var(--good)"></i></div></td></tr>
                <tr><td style="color:#059669">Expansion</td><td class="num tnum" style="color:#059669">+$28,400</td><td class="num tnum mut">+$3,200</td><td><div style="height:6px;border-radius:3px;background:var(--surface-3)"><i style="display:block;height:100%;width:100%;border-radius:3px;background:#059669"></i></div></td></tr>
                <tr><td style="color:var(--text-2)">Reactivation</td><td class="num tnum" style="color:var(--text-2)">+$1,200</td><td class="num tnum mut">—</td><td><div style="height:6px;border-radius:3px;background:var(--surface-3)"><i style="display:block;height:100%;width:6%;border-radius:3px;background:var(--text-3)"></i></div></td></tr>
                <tr><td style="color:var(--warn)">Contraction</td><td class="num tnum" style="color:var(--warn)">−$4,200</td><td class="num tnum mut">−$800</td><td><div style="height:6px;border-radius:3px;background:var(--surface-3)"><i style="display:block;height:100%;width:19%;border-radius:3px;background:var(--warn)"></i></div></td></tr>
                <tr><td style="color:var(--crit)">Churn</td><td class="num tnum" style="color:var(--crit)">−$7,000</td><td class="num tnum mut">+$1,400</td><td><div style="height:6px;border-radius:3px;background:var(--surface-3)"><i style="display:block;height:100%;width:31%;border-radius:3px;background:var(--crit)"></i></div></td></tr>
                <tr style="border-top:1px solid var(--border-2)"><td style="font-weight:700;color:var(--text-1)">Closing MRR</td><td class="num tnum" style="font-weight:700;color:var(--ember)">$418,350</td><td class="num tnum" style="color:var(--good);font-weight:600">+$21,400</td><td><span class="pill good" style="font-size:10px">+5.4% MoM</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-head"><h3>Top accounts by MRR</h3><div class="right"><a class="chip" data-act="route" data-arg="accounts">All accounts →</a></div></div>
          <div class="table-wrap" style="border:none">
            <table>
              <thead><tr><th>Account</th><th>Tier</th><th class="num">MRR</th><th class="num">ARR</th></tr></thead>
              <tbody>
                <tr data-act="account" data-arg="AC-5340" style="cursor:pointer"><td class="nm">Meridian Bank</td><td>${pill('ember','Enterprise+')}</td><td class="num tnum">$142,000</td><td class="num tnum mut">$1.70M</td></tr>
                <tr data-act="account" data-arg="AC-5102" style="cursor:pointer"><td class="nm">Aurora Health Group</td><td>${pill('ember','Enterprise+')}</td><td class="num tnum">$96,400</td><td class="num tnum mut">$1.16M</td></tr>
                <tr data-act="account" data-arg="Stellar Systems" style="cursor:pointer"><td class="nm">Stellar Systems</td><td>${pill('ember','Enterprise+')}</td><td class="num tnum">$9,200</td><td class="num tnum mut">$110.4k</td></tr>
                <tr data-act="account" data-arg="Pinnacle SaaS" style="cursor:pointer"><td class="nm">Pinnacle SaaS</td><td>${pill('ember','Enterprise+')}</td><td class="num tnum">$8,500</td><td class="num tnum mut">$102.0k</td></tr>
                <tr data-act="account" data-arg="CloudBase Inc" style="cursor:pointer"><td class="nm">CloudBase Inc</td><td>${pill('muted','Enterprise')}</td><td class="num tnum">$7,200</td><td class="num tnum mut">$86.4k</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-head"><h3>A/R summary</h3><div class="right"><a class="chip" data-act="route" data-arg="ar">A/R module →</a></div></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px 18px;margin-bottom:14px">
            <div class="stat-row"><div class="stat-label">Total outstanding</div><div class="tnum" style="font-size:20px;font-weight:700;color:var(--text-1)">$157,800</div></div>
            <div class="stat-row"><div class="stat-label">Overdue &gt;30 days</div><div class="tnum" style="font-size:20px;font-weight:700;color:var(--crit)">$42,100</div></div>
            <div class="stat-row"><div class="stat-label">Days Sales Outstanding</div><div class="tnum" style="font-size:20px;font-weight:700;color:var(--text-1)">28</div></div>
            <div class="stat-row"><div class="stat-label">Collection rate (MTD)</div><div class="tnum" style="font-size:20px;font-weight:700;color:var(--good)">96.2%</div></div>
          </div>
          <div style="height:6px;border-radius:3px;background:var(--surface-3);overflow:hidden;margin-bottom:4px">
            <div style="height:100%;width:73%;border-radius:3px;background:var(--good)"></div>
          </div>
          <div style="font-size:11px;color:var(--text-3);letter-spacing:.03em">$329,400 collected of $487,200 invoiced MTD (67.6%)</div>
        </div>

        <div class="card panel">
          <div class="panel-head"><h3>Quick actions</h3></div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <button class="btn primary" style="justify-content:center" data-act="route" data-arg="invoices">${svg(I.invoices,15)} New Invoice</button>
            <button class="btn outline" style="justify-content:center" data-act="route" data-arg="dunning">${svg(I.dunning,15)} Run Collection</button>
            <button class="btn ghost" style="justify-content:center" data-act="download" data-arg="pdf|Board Pack|P&L · MRR bridge · ARR forecast">${svg(I.download,15)} Export Board Pack</button>
          </div>
        </div>
      </div>
    </div>
  </div>`));
  requestAnimationFrame(()=>{ drawRevChart(); drawSparks(); countUpKPIs(); });
};


/* ---------- Customers ---------- */
