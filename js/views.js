/* delonix — view render functions */

const VIEWS = {};

/* ---------- Dashboard ---------- */
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

    <div class="two-col" style="margin-bottom:16px;align-items:start">
      <div>
        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-head">
            <h3>Revenue trend</h3>
            <span class="sub">12-month net revenue · USD thousands</span>
            <div class="right">
              <div class="seg"><button class="on">Net Rev</button><button data-act="toast" data-arg="Switching to MRR view">MRR</button></div>
            </div>
          </div>
          <canvas id="revChart" style="width:100%;height:220px;display:block"></canvas>
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
                <tr><td style="color:#ff8a4c">Expansion</td><td class="num tnum" style="color:#ff8a4c">+$28,400</td><td class="num tnum mut">+$3,200</td><td><div style="height:6px;border-radius:3px;background:var(--surface-3)"><i style="display:block;height:100%;width:100%;border-radius:3px;background:#ff8a4c"></i></div></td></tr>
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
VIEWS.accounts = (v)=>{
  const customers = [
    {name:'Northwind Logistics', id:'AC-4821',bu:'BU-001',buName:'Residential',    plan:'Enterprise',  mrr:48200, status:'good', health:'green',  lastInv:'Jun 01', badge:'good', blab:'Active',  grouping:'Consolidated'},
    {name:'Helios Manufacturing',id:'AC-4795',bu:'BU-002',buName:'Commercial',     plan:'Enterprise',  mrr:34800, status:'good', health:'green',  lastInv:'Jun 01', badge:'good', blab:'Active',  grouping:'Split by BU'},
    {name:'Acme Corp',          id:'AC-4102', bu:'BU-001',buName:'Residential',    plan:'Enterprise',  mrr:4200,  status:'good', health:'green',  lastInv:'Jun 01', badge:'good', blab:'Active',  grouping:'Consolidated'},
    {name:'TechFlow Inc',       id:'AC-4103', bu:'BU-003',buName:'Enterprise Platform',plan:'Business',mrr:1800,  status:'good', health:'green',  lastInv:'Jun 01', badge:'good', blab:'Active',  grouping:'Consolidated'},
    {name:'Nexus Digital',      id:'AC-4104', bu:'BU-001',buName:'Residential',    plan:'Starter',     mrr:950,   status:'warn', health:'yellow', lastInv:'May 28', badge:'warn', blab:'At-risk', grouping:'Consolidated'},
    {name:'Pinnacle SaaS',      id:'AC-4105', bu:'BU-002',buName:'Commercial',     plan:'Enterprise+', mrr:8500,  status:'good', health:'green',  lastInv:'Jun 01', badge:'good', blab:'Active',  grouping:'Sectioned by BU'},
    {name:'Streamline Co',      id:'AC-4106', bu:'BU-001',buName:'Residential',    plan:'Business',    mrr:2400,  status:'good', health:'green',  lastInv:'Jun 03', badge:'good', blab:'Active',  grouping:'Consolidated'},
    {name:'CloudBase Inc',      id:'AC-4108', bu:'BU-003',buName:'Enterprise Platform',plan:'Enterprise',mrr:7200, status:'good', health:'green', lastInv:'Jun 01', badge:'good', blab:'Active',  grouping:'Consolidated'},
    {name:'Meridian Tech',      id:'AC-4109', bu:'BU-002',buName:'Commercial',     plan:'Business',    mrr:1450,  status:'warn', health:'yellow', lastInv:'Apr 30', badge:'crit', blab:'Overdue', grouping:'Consolidated'},
    {name:'Apex Systems',       id:'AC-4110', bu:'BU-001',buName:'Residential',    plan:'Enterprise',  mrr:5800,  status:'good', health:'green',  lastInv:'Jun 01', badge:'good', blab:'Active',  grouping:'Split by Ownership'},
    {name:'Cascade Analytics',  id:'AC-4111', bu:'BU-001',buName:'Residential',    plan:'Business',    mrr:2950,  status:'crit', health:'red',    lastInv:'Apr 01', badge:'crit', blab:'Churning',grouping:'Consolidated'},
    {name:'Stellar Systems',    id:'AC-4112', bu:'BU-002',buName:'Commercial',     plan:'Enterprise+', mrr:9200,  status:'good', health:'green',  lastInv:'Jun 01', badge:'good', blab:'Active',  grouping:'Split by BU'},
  ];
  const healthDot = h => `<span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${h==='green'?'var(--pos)':h==='yellow'?'var(--warn)':'var(--neg)'};flex:none"></span>`;
  const planPill = p => p.includes('+')?pill('ember',p):p.startsWith('Enterprise')?pill('info',p):pill('muted',p);
  const initC = n => n.split(' ').slice(0,2).map(w=>w[0]).join('');
  const clr = n => COLORS[[...n].reduce((a,c)=>a+c.charCodeAt(0),0)%COLORS.length];
  const buColor = id => (BUS.find(b=>b.id===id)||{color:'#888'}).color;
  const tabs = ['All','Enterprise','Business','Starter','Overdue'];
  const counts = [12,4,5,3,1];
  const buTabs = ['All BUs',...BUS.map(b=>b.name)];
  v.appendChild(el(`<div class="view">
    ${pageHead('Customers','247 accounts · $418,350 MRR · June 2026',
      `<button class="btn ghost" data-act="download" data-arg="csv|Customer Export|247 accounts · 842 subscriptions">${svg(I.download,15)} Export CSV</button><button class="btn primary" data-act="newcustomer">+ New Customer</button>`)}
    <div class="grid kpis" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
      ${kpi('Total Customers','247','+8 this month',{trend:3.3,accent:true})}
      ${kpi('Enterprise Accounts','38','41% of MRR',{trend:2.6})}
      ${kpi('At-Risk','12','health score < 65',{trend:8.3})}
      ${kpi('New (30d)','8','$14,200 new MRR',{trend:0})}
    </div>
    <div class="toolbar">
      <div class="tabs" id="acctTabs2">${tabs.map((t,i)=>`<button class="${i===0?'on':''}" data-act="toast" data-arg="Filter: ${t}">${t}<span class="ct">${counts[i]}</span></button>`).join('')}</div>
      <div class="spacer"></div>
      <span class="chip" data-act="toast" data-arg="Showing consolidated view">${svg(I.filter,13)} Business Unit</span>
      <span class="chip" data-act="toast" data-arg="Showing consolidated view">${svg(I.filter,13)} Region</span>
      <span class="chip" data-act="toast" data-arg="Filter: owner">${svg(I.filter,13)} Owner</span>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Company</th><th>Business Unit</th><th>Plan</th><th class="num">MRR</th><th>Invoice Grouping</th><th>Status</th><th>Health</th><th>Actions</th></tr></thead>
        <tbody>
          ${customers.map(c=>`<tr data-act="account" data-arg="${c.name}" style="cursor:pointer">
            <td><div class="acct"><div class="logo-chip" style="background:${clr(c.name)}">${initC(c.name)}</div><div><span class="nm">${c.name}</span><div class="mut" style="font-size:10.5px;margin-top:1px">${c.id}</div></div></div></td>
            <td><span class="bu-badge"><span class="bu-dot" style="background:${buColor(c.bu)}"></span>${c.buName}</span></td>
            <td>${planPill(c.plan)}</td>
            <td class="num">${fmt(c.mrr)}</td>
            <td><span class="mut" style="font-size:12px">${c.grouping}</span></td>
            <td>${pill(c.badge,c.blab)}</td>
            <td><div style="display:flex;align-items:center;gap:7px">${healthDot(c.health)}<span class="mut" style="font-size:11.5px">${c.health==='green'?'Healthy':c.health==='yellow'?'At-risk':'Churning'}</span></div></td>
            <td><button class="btn ghost" style="padding:5px 11px;font-size:12px" data-act="invgrouping" data-arg="${c.id}">Grouping</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`));
};
/* ---------- Subscriptions ---------- */
VIEWS.subscriptions = (v)=>{
  const tiers = [
    {tier:'Enterprise+', mrr:127400, subs:12,  pct:30.5, color:'var(--ember)'},
    {tier:'Enterprise',  mrr:163200, subs:26,  pct:39.0, color:'var(--info)'},
    {tier:'Business+',   mrr:61300,  subs:22,  pct:14.7, color:'var(--good)'},
    {tier:'Business',    mrr:52900,  subs:88,  pct:12.6, color:'var(--warn)'},
    {tier:'Starter',     mrr:13550,  subs:694, pct:3.2,  color:'var(--text-3)'},
  ];
  const totalMrr = tiers.reduce((s,t)=>s+t.mrr,0);
  const changes = [
    {cust:'Pinnacle SaaS',    type:'Upgrade',   oldPlan:'Enterprise',  newPlan:'Enterprise+', delta:+2300, date:'Jun 24'},
    {cust:'DataVault',        type:'Upgrade',   oldPlan:'Business',    newPlan:'Business+',   delta:+900,  date:'Jun 22'},
    {cust:'Streamline Co',    type:'New',       oldPlan:'—',      newPlan:'Business',    delta:+2400, date:'Jun 21'},
    {cust:'Cascade Analytics',type:'Downgrade', oldPlan:'Business+',   newPlan:'Business',    delta:-400,  date:'Jun 20'},
    {cust:'Orbit Labs',       type:'Churn',     oldPlan:'Starter',     newPlan:'—',      delta:-620,  date:'Jun 19'},
    {cust:'Meridian Tech',    type:'Upgrade',   oldPlan:'Starter',     newPlan:'Business',    delta:+830,  date:'Jun 17'},
    {cust:'Bridgepoint',      type:'New',       oldPlan:'—',      newPlan:'Business',    delta:+2150, date:'Jun 15'},
    {cust:'Ironside Tech',    type:'Downgrade', oldPlan:'Business+',   newPlan:'Business',    delta:-500,  date:'Jun 13'},
    {cust:'NovaSpark',        type:'New',       oldPlan:'—',      newPlan:'Starter',     delta:+780,  date:'Jun 10'},
    {cust:'Vertex IO',        type:'Churn',     oldPlan:'Starter',     newPlan:'—',      delta:-890,  date:'Jun 08'},
  ];
  const changeType = t => t==='Upgrade'?pill('good','Upgrade'):t==='New'?pill('info','New'):t==='Downgrade'?pill('warn','Downgrade'):pill('crit','Churn');
  const deltaFmt = d => `<span class="tnum" style="color:${d>0?'var(--good)':'var(--crit)'};font-weight:600">${d>0?'+':''}${fmt(d)}</span>`;
  v.appendChild(el(`<div class="view">
    ${pageHead('Subscriptions','842 active · 34 trial · $418,350 MRR · June 2026',
      `<button class="btn ghost" data-act="route" data-arg="catalog">View catalog</button><button class="btn primary" data-act="newsub">+ New subscription</button>`)}
    <div class="grid kpis" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
      ${kpi('Active','842','+18 net new this month',{trend:2.2,accent:true})}
      ${kpi('Trial','34','avg 14-day window',{trend:6.3})}
      ${kpi('Paused','18','$22,400 MRR paused',{})}
      ${kpi('Cancelled (30d)','9','−$7,000 churned MRR',{trend:-9})}
    </div>
    <div class="sec-title">MRR by plan tier</div>
    <div class="table-wrap" style="margin-bottom:20px">
      <table>
        <thead><tr><th>Plan tier</th><th class="num">Subscriptions</th><th class="num">MRR</th><th>Share of MRR</th><th class="num">Avg MRR / sub</th></tr></thead>
        <tbody>
          ${tiers.map(t=>`<tr>
            <td><span class="nm" style="display:flex;align-items:center;gap:9px"><span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${t.color};flex:none"></span>${t.tier}</span></td>
            <td class="num tnum">${t.subs.toLocaleString()}</td>
            <td class="num tnum">${fmt(t.mrr)}</td>
            <td><div style="display:flex;align-items:center;gap:10px"><div class="bar" style="width:120px"><i style="width:${t.pct}%;background:${t.color}"></i></div><span class="mut tnum" style="font-size:12px">${t.pct}%</span></div></td>
            <td class="num tnum">${fmt(Math.round(t.mrr/t.subs))}</td>
          </tr>`).join('')}
          <tr style="border-top:1px solid var(--border);font-weight:600">
            <td class="nm">Total</td>
            <td class="num tnum">842</td>
            <td class="num tnum">${fmt(totalMrr)}</td>
            <td><span class="mut">100%</span></td>
            <td class="num tnum">${fmt(Math.round(totalMrr/842))}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="sec-title">Recent subscription changes</div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Customer</th><th>Change</th><th>Previous plan</th><th>New plan</th><th class="num">MRR delta</th><th>Date</th></tr></thead>
        <tbody>
          ${changes.map(c=>`<tr style="cursor:pointer" data-act="subdetail" data-arg="${c.cust}">
            <td class="nm">${c.cust}</td>
            <td>${changeType(c.type)}</td>
            <td class="mut">${c.oldPlan}</td>
            <td>${c.newPlan==='—'?`<span class="mut">—</span>`:c.newPlan}</td>
            <td class="num">${deltaFmt(c.delta)}</td>
            <td class="mut">${c.date}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`));
};

/* ---------- Products & Plans ---------- */
VIEWS.catalog = (v)=>{
  const ck  = (ok)=> ok ? `<span style="color:var(--good)">${svg(I.check,14)}</span>` : `<span style="color:var(--text-3);opacity:.4">—</span>`;
  const lim = (s) => `<span style="font-size:12px;color:var(--text-2)">${s}</span>`;
  const feat = (t)=>`<li>${svg(I.check,14)}<span>${t}</span></li>`;
  const plans = [
    {name:'Starter',    price:'$79',   unit:'/mo',            badge:'muted', blab:'Self-serve', subs:694},
    {name:'Business',   price:'$199',  unit:'/mo',            badge:'muted', blab:'Popular',    subs:88},
    {name:'Business+',  price:'$349',  unit:'/mo',            badge:'info',  blab:'Growing',    subs:22},
    {name:'Enterprise', price:'Custom',unit:'/ negotiated',   badge:'ember', blab:'Most MRR',   subs:26},
    {name:'Enterprise+',price:'Custom',unit:'/ negotiated',   badge:'ember', blab:'Top tier',   subs:12},
  ];
  const planFeatures = [
    {name:'Starter',    users:'Up to 5',   api:'100k/mo',   storage:'10 GB',    sso:false, revrec:false, csmded:false, customdunning:false, multiCurr:false},
    {name:'Business',   users:'Up to 25',  api:'1M/mo',     storage:'100 GB',   sso:false, revrec:false, csmded:false, customdunning:false, multiCurr:false},
    {name:'Business+',  users:'Up to 100', api:'5M/mo',     storage:'500 GB',   sso:true,  revrec:false, csmded:false, customdunning:true,  multiCurr:false},
    {name:'Enterprise', users:'Unlimited', api:'Unlimited', storage:'2 TB',     sso:true,  revrec:true,  csmded:false, customdunning:true,  multiCurr:true},
    {name:'Enterprise+',users:'Unlimited', api:'Unlimited', storage:'Unlimited',sso:true,  revrec:true,  csmded:true,  customdunning:true,  multiCurr:true},
  ];
  const featureRows = [
    ['Included seats',         f=>lim(f.users)],
    ['API calls',              f=>lim(f.api)],
    ['Storage',                f=>lim(f.storage)],
    ['Single sign-on (SSO)',   f=>ck(f.sso)],
    ['Revenue recognition',    f=>ck(f.revrec)],
    ['Dedicated CSM',          f=>ck(f.csmded)],
    ['Custom dunning flows',   f=>ck(f.customdunning)],
    ['Multi-currency billing', f=>ck(f.multiCurr)],
    ['Priority support',       f=>ck(f.name!=='Starter')],
    ['99.99% SLA',             f=>ck(f.name==='Enterprise+')],
    ['Custom contracts / POs', f=>ck(f.name==='Enterprise'||f.name==='Enterprise+')],
    ['ACH & wire payments',    f=>ck(f.name==='Enterprise'||f.name==='Enterprise+')],
    ['Audit log export',       f=>ck(f.sso)],
    ['Usage metering',         f=>ck(f.name!=='Starter')],
    ['Advanced analytics',     f=>ck(f.revrec||f.name==='Business+')],
  ];
  v.appendChild(el(`<div class="view">
    ${pageHead('Products & Plans','Pricing catalog, plan packaging and feature entitlements across all tiers.',
      `<button class="btn ghost" data-act="pricebook">Manage price books</button><button class="btn primary" data-act="newplan">+ New plan</button>`)}
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-bottom:24px">
      ${plans.map((p,i)=>`<div class="card plan${i===3?' feat':''}">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:6px">
          <h4 style="margin:0;font-family:var(--display);font-size:14px;font-weight:700">${p.name}</h4>
          ${pill(p.badge,p.blab)}
        </div>
        <div class="price" style="font-size:22px;margin:10px 0 4px">${p.price}<small style="font-size:11px;color:var(--text-3);font-weight:400">${p.unit}</small></div>
        <div style="font-size:11.5px;color:var(--text-3);margin-bottom:12px">${p.subs.toLocaleString()} active subs</div>
        <ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:7px;font-size:12px;color:var(--text-2)">
          ${p.name==='Starter'    ? feat('5 users')+feat('100k API calls/mo')+feat('Email support')+feat('Card payments') : ''}
          ${p.name==='Business'   ? feat('25 users')+feat('1M API calls/mo')+feat('Chat + email support')+feat('Usage metering') : ''}
          ${p.name==='Business+'  ? feat('100 users')+feat('5M API calls/mo')+feat('SSO & audit log')+feat('Custom dunning flows') : ''}
          ${p.name==='Enterprise' ? feat('Unlimited users')+feat('Unlimited API')+feat('ACH, wire, multi-currency')+feat('Revenue recognition')+feat('Priority support SLA 99.9%') : ''}
          ${p.name==='Enterprise+'? feat('Everything in Enterprise')+feat('Dedicated CSM')+feat('99.99% SLA')+feat('Custom contracts & POs')+feat('Ramped & volume pricing') : ''}
        </ul>
        <button class="btn ${i===3?'primary':'ghost'}" style="justify-content:center;margin-top:auto;padding-top:10px" data-act="editplan" data-arg="${p.name}">Edit plan</button>
      </div>`).join('')}
    </div>
    <div class="sec-title">Feature comparison</div>
    <div class="table-wrap">
      <table style="min-width:700px">
        <thead><tr><th style="width:220px">Feature</th>${plans.map(p=>`<th style="text-align:center;color:var(--text-2)">${p.name}</th>`).join('')}</tr></thead>
        <tbody>
          ${featureRows.map(([label,fn])=>`<tr>
            <td style="color:var(--text-2);font-size:13px">${label}</td>
            ${planFeatures.map(f=>`<td style="text-align:center">${fn(f)}</td>`).join('')}
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`));
};

/* ---------- Invoices ---------- */
VIEWS.invoices = (v)=>{
  const INV_DATA = [
    {id:'INV-2026-0847',acct:'Stellar Systems',   bu:'BU-002',buName:'Commercial',    amt:9200, issued:'Jun 01',due:'Jul 01',period:'Jun 2026',sl:'Paid',     status:'good', finalized:true,  validated:true},
    {id:'INV-2026-0846',acct:'Pinnacle SaaS',     bu:'BU-002',buName:'Commercial',    amt:8500, issued:'Jun 01',due:'Jul 01',period:'Jun 2026',sl:'Sent',     status:'muted',finalized:true,  validated:true},
    {id:'INV-2026-0845',acct:'CloudBase Inc',     bu:'BU-003',buName:'Ent. Platform', amt:7200, issued:'Jun 01',due:'Jul 01',period:'Jun 2026',sl:'Paid',     status:'good', finalized:true,  validated:true},
    {id:'INV-2026-0844',acct:'Summit Digital',    bu:'BU-001',buName:'Residential',   amt:6400, issued:'Jun 01',due:'Jul 01',period:'Jun 2026',sl:'Sent',     status:'muted',finalized:true,  validated:true},
    {id:'INV-2026-0843',acct:'Apex Systems',      bu:'BU-001',buName:'Residential',   amt:5800, issued:'Jun 01',due:'Jun 30',period:'Jun 2026',sl:'Overdue',  status:'neg',  finalized:true,  validated:true},
    {id:'INV-2026-0842',acct:'Zenith Cloud',      bu:'BU-001',buName:'Residential',   amt:4750, issued:'Jun 01',due:'Jul 01',period:'Jun 2026',sl:'Paid',     status:'good', finalized:true,  validated:true},
    {id:'INV-2026-0841',acct:'Acme Corp',         bu:'BU-001',buName:'Residential',   amt:4200, issued:'Jun 01',due:'Jul 01',period:'Jun 2026',sl:'Paid',     status:'good', finalized:true,  validated:true},
    {id:'INV-2026-0840',acct:'Fulcrum Labs',      bu:'BU-003',buName:'Ent. Platform', amt:3400, issued:'Jun 01',due:'Jun 30',period:'Jun 2026',sl:'Overdue',  status:'neg',  finalized:true,  validated:true},
    {id:'INV-2026-0839',acct:'DataVault',         bu:'BU-002',buName:'Commercial',    amt:3100, issued:'Jun 01',due:'Jul 01',period:'Jun 2026',sl:'Sent',     status:'muted',finalized:true,  validated:true},
    {id:'INV-2026-0838',acct:'Cascade Analytics', bu:'BU-001',buName:'Residential',   amt:2950, issued:'Jun 01',due:'Jul 01',period:'Jun 2026',sl:'Paid',     status:'good', finalized:true,  validated:true},
    {id:'INV-2026-0837',acct:'Streamline Co',     bu:'BU-001',buName:'Residential',   amt:2400, issued:'Jun 28',due:'—',     period:'Jun 2026',sl:'Draft',    status:'muted',finalized:false, validated:false},
    {id:'INV-2026-0836',acct:'Bridgepoint',       bu:'BU-002',buName:'Commercial',    amt:2150, issued:'May 28',due:'Jun 27',period:'May 2026',sl:'Overdue',  status:'neg',  finalized:true,  validated:true},
    {id:'INV-2026-0835',acct:'Ironside Tech',     bu:'BU-001',buName:'Residential',   amt:1650, issued:'Jun 01',due:'Jul 01',period:'Jun 2026',sl:'Paid',     status:'good', finalized:true,  validated:true},
    {id:'INV-2026-0834',acct:'TechFlow Inc',      bu:'BU-003',buName:'Ent. Platform', amt:1800, issued:'Jun 01',due:'Jul 01',period:'Jun 2026',sl:'Sent',     status:'muted',finalized:true,  validated:true},
    {id:'INV-2026-0833',acct:'Meridian Tech',     bu:'BU-002',buName:'Commercial',    amt:1450, issued:'May 15',due:'Jun 14',period:'May 2026',sl:'Void',     status:'muted',finalized:true,  validated:true},
    {id:'INV-2026-DRAFT-2',acct:'NovaSpark',      bu:'BU-001',buName:'Residential',   amt:3820, issued:'Jun 28',due:'—',     period:'Jun 2026',sl:'Draft',    status:'warn', finalized:false, validated:false,validationErrors:['Missing tax address','Missing invoice contact']},
    {id:'INV-2026-DRAFT-3',acct:'Orbit Labs',     bu:'BU-001',buName:'Residential',   amt:620,  issued:'Jun 28',due:'—',     period:'Jun 2026',sl:'Draft',    status:'muted',finalized:false, validated:true},
  ];
  const tabs = ['All','Draft','Sent','Paid','Overdue','Void'];
  const matchTab = (inv, t) => t==='All' ? true : inv.sl===t;
  const countTab = t => INV_DATA.filter(i=>matchTab(i,t)).length;
  const buColor = id => (BUS.find(b=>b.id===id)||{color:'#888'}).color;
  const rowsFor = t => INV_DATA.filter(i=>matchTab(i,t)).map(i=>{
    const actions = i.sl==='Draft'
      ? `<button class="btn ghost" style="padding:5px 10px;font-size:12px" data-act="draftvalidate" data-arg="${i.id}">Validate</button> <button class="btn primary" style="padding:5px 10px;font-size:12px" data-act="invoice" data-arg="${i.id}">Review</button>`
      : i.finalized && (i.sl==='Overdue'||i.sl==='Void'||i.sl==='Sent')
        ? `<button class="btn ghost" style="padding:5px 10px;font-size:12px" data-act="creditrebill" data-arg="${i.id}">Credit/Rebill</button>`
        : `<span class="mut" style="font-size:12px">${svg('<polyline points="9 18 15 12 9 6"/>',14)}</span>`;
    const warnIcon = i.validationErrors
      ? `<span title="${i.validationErrors.join(', ')}" style="color:var(--warn);margin-left:4px">${svg(I.warning,12)}</span>`:'';
    return `<tr data-act="invoice" data-arg="${i.id}" style="cursor:pointer">
      <td class="mono" style="font-size:12px">${i.id}${warnIcon}</td>
      <td><span class="nm">${i.acct}</span></td>
      <td><span class="bu-badge"><span class="bu-dot" style="background:${buColor(i.bu)}"></span>${i.buName}</span></td>
      <td class="num tnum">${fmt(i.amt)}</td>
      <td class="mut" style="font-size:12px">${i.period}</td>
      <td class="mut">${i.issued}</td>
      <td class="mut" style="${i.sl==='Overdue'?'color:var(--neg)':''}">${i.due}</td>
      <td>${pill(i.status,i.sl)}</td>
      <td style="white-space:nowrap">${actions}</td>
    </tr>`;
  }).join('') || `<tr><td colspan="9" class="empty">No ${t.toLowerCase()} invoices.</td></tr>`;

  v.appendChild(el(`<div class="view">
    ${pageHead('Invoices','June 2026 — $487,200 invoiced across 15 accounts.',
      `<button class="btn ghost" data-act="download" data-arg="csv|Invoice Export|47 invoices · $487,200">${svg(I.download,15)} Export CSV</button><button class="btn primary" data-act="newinvoice">+ New Invoice</button>`)}
    <div class="period-bar draft">${svg(I.audit,15)} <strong>June 2026 billing period</strong> <span style="font-weight:400;opacity:.7">— Draft invoices generated · 3 require validation before finalization</span> <span style="margin-left:auto;display:flex;gap:8px"><button class="btn ghost" style="padding:4px 10px;font-size:12px" data-act="draftvalidate" data-arg="all">Review all issues</button><button class="btn primary" style="padding:4px 10px;font-size:12px" data-act="signoffclose">Finalize period</button></span></div>
    <div class="val-banner warn">${svg(I.warning,15)} <div><strong>3 draft invoices have validation issues</strong><ul class="val-issue-list"><li>${svg(I.warning,12)} INV-2026-DRAFT-2 — Missing tax address, missing invoice contact</li><li>${svg(I.warning,12)} 2 invoices pending GL mapping review</li></ul></div></div>
    <div class="grid kpis" style="grid-template-columns:repeat(5,1fr);margin-bottom:20px">
      ${kpi('Invoiced (Jun)','$487,200','15 invoices',{accent:true})}
      ${kpi('Collected','$312,450','64% collected',{trend:2.1})}
      ${kpi('Outstanding','$174,750','7 open invoices',{})}
      ${kpi('Overdue','$13,350','3 accounts',{trend:0})}
      ${kpi('Draft','3','pending finalization',{})}
    </div>
    <div class="toolbar">
      <div class="tabs" id="invTabs">${tabs.map((t,i)=>`<button class="${i===0?'on':''}" onclick="(function(btn){document.querySelectorAll('#invTabs button').forEach(b=>b.classList.remove('on'));btn.classList.add('on');document.getElementById('invBody').innerHTML=rowsFor_inv('${t}');})(this)">${t}<span class="ct">${countTab(t)}</span></button>`).join('')}</div>
      <div class="spacer"></div>
      <span class="chip" data-act="toast" data-arg="Showing consolidated view">${svg(I.filter,13)} Business Unit</span>
      <span class="chip" data-act="daterange" data-arg="custom">${svg(I.filter,13)} Period</span>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Invoice #</th><th>Account</th><th>Business Unit</th><th class="num">Amount</th><th>Period</th><th>Issued</th><th>Due</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody id="invBody">${rowsFor('All')}</tbody>
      </table>
    </div>
  </div>`));
  window.rowsFor_inv = rowsFor;
};
/* ---------- Quotes & Contracts ---------- */
VIEWS.quotes = (v)=>{
  const stages = [
    {label:'Discovery',   count:8,  value:142000},
    {label:'Proposal',    count:14, value:387000},
    {label:'Negotiation', count:6,  value:218000},
    {label:'Signed',      count:22, value:614000},
  ];
  const totalPipeline = stages.reduce((s,x)=>s+x.value,0);
  const stageColors = ['var(--text-3)','var(--info)','var(--warn)','var(--good)'];
  const quotes = [
    {id:'Q-2026-322', acct:'Pinnacle SaaS',     plan:'Enterprise+', val:312000, owner:'P. Anand',  stage:'Signed',      exp:'—',    status:'good',  sl:'Signed'},
    {id:'Q-2026-321', acct:'Stellar Systems',   plan:'Enterprise+', val:187200, owner:'M. Reyes',  stage:'Negotiation', exp:'Jul 05',    status:'warn',  sl:'Negotiating'},
    {id:'Q-2026-320', acct:'CloudBase Inc',     plan:'Enterprise',  val:144000, owner:'D. Cho',    stage:'Proposal',    exp:'Jul 12',    status:'info',  sl:'Sent'},
    {id:'Q-2026-319', acct:'Apex Systems',      plan:'Enterprise',  val:228000, owner:'P. Anand',  stage:'Signed',      exp:'—',    status:'good',  sl:'Signed'},
    {id:'Q-2026-318', acct:'Summit Digital',    plan:'Enterprise',  val:96000,  owner:'M. Reyes',  stage:'Negotiation', exp:'Jul 08',    status:'ember', sl:'Pending approval'},
    {id:'Q-2026-317', acct:'Zenith Cloud',      plan:'Enterprise',  val:57000,  owner:'D. Cho',    stage:'Proposal',    exp:'Jul 15',    status:'info',  sl:'Sent'},
    {id:'Q-2026-316', acct:'Fulcrum Labs',      plan:'Business+',   val:41880,  owner:'P. Anand',  stage:'Proposal',    exp:'Jul 18',    status:'info',  sl:'Sent'},
    {id:'Q-2026-315', acct:'Bridgepoint',       plan:'Business',    val:25800,  owner:'M. Reyes',  stage:'Discovery',   exp:'—',    status:'muted', sl:'Discovery'},
    {id:'Q-2026-314', acct:'Ironside Tech',     plan:'Business',    val:19800,  owner:'D. Cho',    stage:'Signed',      exp:'—',    status:'good',  sl:'Signed'},
    {id:'Q-2026-313', acct:'Cascade Analytics', plan:'Business+',   val:34200,  owner:'P. Anand',  stage:'Proposal',    exp:'Jul 22',    status:'info',  sl:'Sent'},
    {id:'Q-2026-312', acct:'NovaSpark',         plan:'Business',    val:9360,   owner:'M. Reyes',  stage:'Discovery',   exp:'—',    status:'muted', sl:'Discovery'},
    {id:'Q-2026-311', acct:'Meridian Tech',     plan:'Business+',   val:44400,  owner:'D. Cho',    stage:'Signed',      exp:'—',    status:'good',  sl:'Signed'},
  ];
  v.appendChild(el(`<div class="view">
    ${pageHead('Quotes & Contracts','CPQ pipeline · approval routing · e-signature · June 2026',
      `<button class="btn ghost" data-act="approvalrules">Approval rules</button><button class="btn primary" data-act="newquote">+ New quote</button>`)}
    <div class="grid kpis" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
      ${kpi('Pipeline value','$1.36M','total open ACV',{accent:true})}
      ${kpi('Win rate','68%','quote → signed, trailing 90d',{trend:4})}
      ${kpi('Avg deal cycle','23 days','first touch → close',{trend:-12})}
      ${kpi('Signed (30d)','22','$614k closed ACV',{trend:18})}
    </div>
    <div class="sec-title">Pipeline by stage</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:22px">
      ${stages.map((s,i)=>`<div class="card" style="padding:16px 18px">
        <div style="font-size:10.5px;text-transform:uppercase;letter-spacing:1.1px;color:${stageColors[i]};font-weight:700;margin-bottom:8px">${s.label}</div>
        <div style="font-family:var(--display);font-size:26px;font-weight:700;font-variant-numeric:tabular-nums">${fmt(Math.round(s.value/1000))}k</div>
        <div style="color:var(--text-3);font-size:12px;margin-top:4px">${s.count} quotes</div>
        <div class="bar" style="margin-top:12px"><i style="width:${Math.round(s.value/totalPipeline*100)}%;background:${stageColors[i]}"></i></div>
      </div>`).join('')}
    </div>
    <div class="sec-title">All quotes</div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Quote #</th><th>Customer</th><th class="num">Value (ACV)</th><th>Plan</th><th>Owner</th><th>Stage</th><th>Expires</th><th>Status</th></tr></thead>
        <tbody>
          ${quotes.map(q=>`<tr style="cursor:pointer" data-act="invoice" data-arg="${q.id}">
            <td class="mono">${q.id}</td>
            <td class="nm">${q.acct}</td>
            <td class="num tnum">${fmt(q.val)}</td>
            <td><span class="mut" style="font-size:12px">${q.plan}</span></td>
            <td class="mut">${q.owner}</td>
            <td><span class="mut" style="font-size:12px">${q.stage}</span></td>
            <td class="mono mut">${q.exp}</td>
            <td>${pill(q.status,q.sl)}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`));
};

/* ---------- Usage & Metering ---------- */
VIEWS.usage = (v)=>{
  const planUsage = [
    {plan:'Enterprise+', allocated:'Unlimited', apiUsed:'1.24B', storage:'480 GB',  storageAlloc:'Unlimited', usagePct:null, overage:3200},
    {plan:'Enterprise',  allocated:'Unlimited', apiUsed:'2.18B', storage:'1.1 TB',  storageAlloc:'Unlimited', usagePct:null, overage:2800},
    {plan:'Business+',   allocated:'5M/mo',     apiUsed:'3.92M', storage:'312 GB',  storageAlloc:'500 GB',    usagePct:78,   overage:1100},
    {plan:'Business',    allocated:'1M/mo',     apiUsed:'0.71M', storage:'68 GB',   storageAlloc:'100 GB',    usagePct:71,   overage:820},
    {plan:'Starter',     allocated:'100k/mo',   apiUsed:'62k',   storage:'5.8 GB',  storageAlloc:'10 GB',     usagePct:62,   overage:480},
  ];
  const topConsumers = [
    {cust:'Stellar Systems',    api:'824M',  seats:3120, storage:'310 GB', overage:1840},
    {cust:'Pinnacle SaaS',      api:'612M',  seats:2400, storage:'218 GB', overage:1360},
    {cust:'CloudBase Inc',      api:'488M',  seats:1980, storage:'184 GB', overage:0},
    {cust:'Apex Systems',       api:'341M',  seats:1640, storage:'142 GB', overage:2200},
    {cust:'DataVault',          api:'192M',  seats:840,  storage:'76 GB',  overage:620},
  ];
  const usageEvents = [
    {id:'EVT-8821042',src:'BuildStream-API',srcId:'bs_evt_4821042',idempotency:'bsv2-4821042',eventTs:'Jun 28 14:32:01',receivedTs:'Jun 28 14:32:02',acct:'AC-4821',product:'API Calls',qty:'14,200',unit:'calls',status:'accepted',correction:null},
    {id:'EVT-8821041',src:'BuildStream-API',srcId:'bs_evt_4821041',idempotency:'bsv2-4821041',eventTs:'Jun 28 14:31:48',receivedTs:'Jun 28 14:31:49',acct:'AC-4795',product:'Storage',qty:'8.4',unit:'GB',status:'accepted',correction:null},
    {id:'EVT-8821040',src:'Meter-v2',srcId:'mtr_991028',idempotency:'mtrv2-991028',eventTs:'Jun 28 14:30:12',receivedTs:'Jun 28 14:30:13',acct:'AC-4112',product:'Units Occupied',qty:'312',unit:'unit-nights',status:'accepted',correction:null},
    {id:'EVT-8820991',src:'BuildStream-API',srcId:'bs_evt_4820991',idempotency:'bsv2-4820991',eventTs:'Jun 28 13:48:20',receivedTs:'Jun 28 13:48:21',acct:'AC-UNKNOWN',product:'API Calls',qty:'200',unit:'calls',status:'rejected',correction:'No account mapping'},
    {id:'EVT-8820987',src:'Legacy-CSV',srcId:'csv_row_1248',idempotency:null,eventTs:'Jun 27 22:00:00',receivedTs:'Jun 28 00:12:04',acct:'AC-4104',product:'API Calls',qty:'42,000',unit:'calls',status:'pending-mapping',correction:'Awaiting product mapping'},
    {id:'EVT-8820843',src:'Meter-v2',srcId:'mtr_990122',idempotency:'mtrv2-990122',eventTs:'Jun 27 12:00:00',receivedTs:'Jun 27 12:00:01',acct:'AC-4821',product:'Units Occupied',qty:'298',unit:'unit-nights',status:'corrected',correction:'EVT-8820843-CORR'},
  ];
  const failedEvents = [
    {id:'EVT-8820991',src:'BuildStream-API',acct:'AC-UNKNOWN',product:'API Calls',qty:'200',reason:'No account mapping',received:'Jun 28 13:48'},
    {id:'EVT-8820988',src:'Legacy-CSV',acct:'AC-4103',product:'Unknown-SKU-441',qty:'1',reason:'Product not found',received:'Jun 28 00:12'},
    {id:'EVT-8820843-v2',src:'Meter-v2',acct:'AC-4821',product:'Units Occupied',qty:'298',reason:'Duplicate idempotency key',received:'Jun 27 12:00'},
  ];
  const usagePctBar = pct => pct===null
    ? `<span class="mut" style="font-size:11.5px">Unlimited</span>`
    : `<div style="display:flex;align-items:center;gap:8px"><div class="bar" style="width:80px"><i style="width:${pct}%;background:${pct>90?'var(--neg)':pct>75?'var(--warn)':'var(--pos)'}"></i></div><span class="mut tnum" style="font-size:12px">${pct}%</span></div>`;
  const statusPill = s => s==='accepted'?pill('good','Accepted'):s==='rejected'?pill('neg','Rejected'):s==='corrected'?pill('info','Corrected'):s==='pending-mapping'?pill('warn','Pending Mapping'):pill('muted',s);
  const usageTabs = ['Overview','Event Explorer','Failed Queue','Corrections','Source Systems'];
  const tabContent = {
    Overview: `
      <div class="grid kpis" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
        ${kpi('Events (Jun)','4.82B','across all meters',{accent:true})}
        ${kpi('Failed Events','23','3 unresolved',{trend:0})}
        ${kpi('Overage Revenue','$8,400','9 accounts',{})}
        ${kpi('Pending Corrections','4','awaiting replay',{})}
      </div>
      <div class="grid" style="grid-template-columns:1fr 1fr;gap:16px">
        <div class="card panel">
          <div class="panel-head"><h3>Usage by Plan Tier</h3></div>
          <div class="table-wrap" style="padding:0">
            <table><thead><tr><th>Plan</th><th>Allocated</th><th>API Used</th><th>Storage</th><th>Usage</th><th class="num">Overage</th></tr></thead>
            <tbody>${planUsage.map(r=>`<tr><td><strong style="font-size:13px">${r.plan}</strong></td><td class="mut">${r.allocated}</td><td class="tnum" style="font-size:13px">${r.apiUsed}</td><td class="tnum" style="font-size:13px">${r.storage}</td><td>${usagePctBar(r.usagePct)}</td><td class="num tnum" style="font-size:13px">${r.overage?fmt(r.overage):'—'}</td></tr>`).join('')}</tbody>
            </table>
          </div>
        </div>
        <div class="card panel">
          <div class="panel-head"><h3>Top Consumers</h3></div>
          <div class="table-wrap" style="padding:0">
            <table><thead><tr><th>Account</th><th class="num">API Events</th><th class="num">Seats</th><th class="num">Overage</th></tr></thead>
            <tbody>${topConsumers.map(r=>`<tr data-act="account" data-arg="${r.cust}" style="cursor:pointer"><td><span class="nm">${r.cust}</span></td><td class="num tnum">${r.api}</td><td class="num tnum">${r.seats.toLocaleString()}</td><td class="num tnum" style="${r.overage?'color:var(--warn)':''}">${r.overage?fmt(r.overage):'—'}</td></tr>`).join('')}</tbody>
            </table>
          </div>
        </div>
      </div>`,
    'Event Explorer': `
      <div class="toolbar" style="margin-bottom:12px">
        <span class="chip" data-act="toast" data-arg="Filter by source">${svg(I.filter,13)} Source</span>
        <span class="chip" data-act="toast" data-arg="Filter by status">${svg(I.filter,13)} Status</span>
        <span class="chip" data-act="daterange" data-arg="custom">${svg(I.filter,13)} Time range</span>
        <div class="spacer"></div>
        <span class="mut" style="font-size:12px">Showing last 500 events</span>
      </div>
      <div class="table-wrap">
        <table><thead><tr><th>Event ID</th><th>Source</th><th>Account</th><th>Product</th><th class="num">Qty</th><th>Event Time</th><th>Status</th><th></th></tr></thead>
        <tbody>${usageEvents.map(e=>`<tr style="cursor:pointer" data-act="usageevent" data-arg="${e.id}">
          <td class="mono" style="font-size:11.5px">${e.id}</td>
          <td class="mut" style="font-size:12px">${e.src}</td>
          <td style="font-size:12.5px">${e.acct}</td>
          <td style="font-size:12.5px">${e.product}</td>
          <td class="num tnum">${e.qty} ${e.unit}</td>
          <td class="mut tnum" style="font-size:11.5px">${e.eventTs}</td>
          <td>${statusPill(e.status)}</td>
          <td class="mut">${svg('<polyline points="9 18 15 12 9 6"/>',14)}</td>
        </tr>`).join('')}</tbody>
        </table>
      </div>`,
    'Failed Queue': `
      <div class="val-banner error" style="margin-bottom:12px">${svg(I.warning,15)} <strong>${failedEvents.length} events failed ingestion</strong> — resolve mapping issues or ignore to exclude from billing.</div>
      <div class="table-wrap">
        <table><thead><tr><th>Event ID</th><th>Source</th><th>Account</th><th>Product</th><th>Failure Reason</th><th>Received</th><th>Actions</th></tr></thead>
        <tbody>${failedEvents.map(e=>`<tr>
          <td class="mono" style="font-size:11.5px">${e.id}</td>
          <td class="mut">${e.src}</td><td>${e.acct}</td><td>${e.product}</td>
          <td style="color:var(--neg);font-size:12px">${e.reason}</td>
          <td class="mut tnum" style="font-size:11.5px">${e.received}</td>
          <td style="display:flex;gap:6px"><button class="btn ghost" style="padding:4px 9px;font-size:11px" data-act="migrationdetail" data-arg="${e.id}">Fix Mapping</button><button class="btn ghost" style="padding:4px 9px;font-size:11px" data-act="toast" data-arg="Event ${e.id} ignored">Ignore</button></td>
        </tr>`).join('')}</tbody>
        </table>
      </div>`,
    Corrections: `<div class="table-wrap"><table><thead><tr><th>Original Event</th><th>Correction Event</th><th>Account</th><th>Reason</th><th>Applied</th><th>Status</th></tr></thead>
      <tbody><tr><td class="mono" style="font-size:11.5px">EVT-8820843</td><td class="mono" style="font-size:11.5px">EVT-8820843-CORR</td><td>AC-4821</td><td class="mut">Unit night count correction — Jun 27</td><td class="mut">Jun 28 09:14</td><td>${pill('info','Replayed')}</td></tr>
      <tr><td class="mono" style="font-size:11.5px">EVT-8818210</td><td class="mono" style="font-size:11.5px">EVT-8818210-CORR</td><td>AC-4795</td><td class="mut">Duplicate charge removed</td><td class="mut">Jun 22 15:30</td><td>${pill('good','Applied')}</td></tr>
      </tbody></table></div>`,
    'Source Systems': `<div class="grid" style="grid-template-columns:repeat(3,1fr);gap:12px">${SOURCE_SYSTEMS.map(s=>`<div class="card" style="padding:16px"><div style="font-weight:700;margin-bottom:4px">${s.name}</div><div class="mut" style="font-size:12px;margin-bottom:8px">${s.type}</div>${s.type==='acquired'?`<div style="font-size:12px;margin-bottom:2px">Customers: ${s.mapped}/${s.legacyCustomers} mapped</div><div style="font-size:12px;color:${s.unresolved?'var(--warn)':'var(--pos)'}">Unresolved: ${s.unresolved}</div><button class="btn ghost" style="margin-top:10px;font-size:12px;padding:4px 10px" data-act="migrationdetail" data-arg="${s.id}">View Reconciliation</button>`:`<div style="font-size:12px;color:var(--pos)">${svg(I.check,12)} ${s.status} · ${s.lastSync}</div><div class="mut" style="font-size:11.5px;margin-top:2px">${s.recordsExported} records exported</div>`}</div>`).join('')}</div>`,
  };
  let curUsageTab = 'Overview';
  const render = () => {
    const tabBar = `<div class="tabs" id="usageTabs">${usageTabs.map(t=>`<button class="${t===curUsageTab?'on':''}" onclick="window._setUsageTab('${t}')">${t}</button>`).join('')}</div>`;
    v.innerHTML='';
    v.appendChild(el(`<div class="view">
      ${pageHead('Usage & Metering','June 2026 · 4.82B events ingested · $8,400 overage revenue',
        `<button class="btn ghost" data-act="newmeter">${svg(I.usage,14)} New Meter</button><button class="btn ghost" data-act="usageimport">Import Events</button>`)}
      <div class="toolbar" style="margin-bottom:16px">${tabBar}<div class="spacer"></div></div>
      ${tabContent[curUsageTab]||''}
    </div>`));
  };
  window._setUsageTab = t => { curUsageTab=t; render(); };
  render();
};
/* ---------- Payments ---------- */
VIEWS.payments = (v)=>{
  const PAY_DATA = [
    {id:'PAY-94201', acct:'Stellar Systems',   amt:9200,  net:8993,  gw:'Stripe', method:'ACH ••7741',        date:'Jun 27',  status:'good',  sl:'Succeeded'},
    {id:'PAY-94200', acct:'Pinnacle SaaS',      amt:8500,  net:8308,  gw:'Adyen',  method:'Wire',              date:'Jun 27',  status:'muted', sl:'Pending'},
    {id:'PAY-94199', acct:'CloudBase Inc',      amt:7200,  net:7038,  gw:'Stripe', method:'ACH ••3302',        date:'Jun 26',  status:'good',  sl:'Succeeded'},
    {id:'PAY-94198', acct:'Summit Digital',     amt:6400,  net:6254,  gw:'Stripe', method:'Visa ••4121',       date:'Jun 26',  status:'good',  sl:'Succeeded'},
    {id:'PAY-94197', acct:'Apex Systems',       amt:5800,  net:5669,  gw:'Adyen',  method:'Mastercard ••8804', date:'Jun 25',  status:'neg',   sl:'Failed'},
    {id:'PAY-94196', acct:'Zenith Cloud',       amt:4750,  net:4641,  gw:'Stripe', method:'ACH ••2290',        date:'Jun 25',  status:'good',  sl:'Succeeded'},
    {id:'PAY-94195', acct:'Acme Corp',          amt:4200,  net:4103,  gw:'Stripe', method:'ACH ••1187',        date:'Jun 24',  status:'good',  sl:'Succeeded'},
    {id:'PAY-94194', acct:'Fulcrum Labs',       amt:3400,  net:3322,  gw:'Adyen',  method:'Visa ••5599',       date:'Jun 24',  status:'neg',   sl:'Failed'},
    {id:'PAY-94193', acct:'DataVault',          amt:3100,  net:3029,  gw:'Stripe', method:'ACH ••6612',        date:'Jun 23',  status:'good',  sl:'Succeeded'},
    {id:'PAY-94192', acct:'Cascade Analytics',  amt:2950,  net:2882,  gw:'Stripe', method:'Amex ••3391',       date:'Jun 23',  status:'good',  sl:'Succeeded'},
    {id:'PAY-94191', acct:'Ironside Tech',      amt:1650,  net:1612,  gw:'Stripe', method:'Visa ••0042',       date:'Jun 22',  status:'good',  sl:'Succeeded'},
    {id:'PAY-94190', acct:'TechFlow Inc',       amt:1800,  net:1759,  gw:'Adyen',  method:'Mastercard ••7712', date:'Jun 22',  status:'muted', sl:'Pending'},
    {id:'PAY-94189', acct:'Bridgepoint',        amt:2150,  net:2101,  gw:'Stripe', method:'ACH ••4430',        date:'Jun 21',  status:'good',  sl:'Succeeded'},
    {id:'PAY-94188', acct:'NovaSpark',          amt:780,   net:762,   gw:'Stripe', method:'Visa ••1123',       date:'Jun 20',  status:'good',  sl:'Succeeded'},
    {id:'PAY-94187', acct:'Prism Networks',     amt:1100,  net:1075,  gw:'Other',  method:'Bank transfer',     date:'Jun 20',  status:'good',  sl:'Succeeded'},
  ];
  const gwColors = {Stripe:'#635bff', Adyen:'#0abf53', Other:'#ff8a4c'};
  const gwShare = [{gw:'Stripe',pct:72,vol:'$237,170',status:'Healthy',s:'good'},{gw:'Adyen',pct:22,vol:'$72,468',status:'Operational',s:'good'},{gw:'Other',pct:6,vol:'$19,762',status:'Manual',s:'muted'}];

  v.appendChild(el(`<div class="view">
    ${pageHead('Payments','Payment ledger — gateway receipts, fee netting and status across processors.',
      `<button class="btn ghost" data-act="download" data-arg="csv|Payment Ledger|312 payments · $329,400">${svg(I.download,14)} Export</button><button class="btn primary" data-act="manualpayment" data-arg="new">+ Record Payment</button>`)}

    <div class="grid kpis" style="grid-template-columns:repeat(4,1fr)">
      ${kpi('Collected MTD','$329,400','net of processing fees',{accent:true,trend:7})}
      ${kpi('Pending Settlement','$28,400','2–3 business days',{})}
      ${kpi('Failed Payments','$12,100','2 retries queued',{})}
      ${kpi('Refunds Issued','$4,200','MTD · 3 transactions',{})}
    </div>

    <div class="card" style="padding:16px 18px;margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <span style="font-size:12px;text-transform:uppercase;letter-spacing:.07em;color:var(--mut)">Gateway split · June 2026</span>
        <span style="font-size:12px;color:var(--mut)">$329,400 settled</span>
      </div>
      <div style="display:flex;gap:12px">
        ${gwShare.map(g=>`<div style="flex:${g.pct};background:${gwColors[g.gw]}18;border:1px solid ${gwColors[g.gw]}44;border-radius:6px;padding:12px 14px;min-width:0">`+
          `<div style="font-size:18px;font-weight:700;color:${gwColors[g.gw]};font-variant-numeric:tabular-nums">${g.pct}%</div>`+
          `<div style="font-size:13px;font-weight:600;margin:2px 0">${g.gw}</div>`+
          `<div style="font-size:12px;color:var(--mut)">${g.vol} · ${g.status}</div>`+
          `</div>`).join('')}
      </div>
    </div>

    <div class="card" style="padding:0;overflow:hidden">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid var(--border)">
        <span style="font-size:13px;font-weight:600">All Payments</span>
        <div style="display:flex;gap:8px">
          <span class="chip">${svg(I.filter,13)} Gateway</span>
          <span class="chip">${svg(I.filter,13)} Status</span>
        </div>
      </div>
      <div class="table-wrap" style="border:none">
        <table>
          <thead><tr>
            <th style="width:120px">Reference</th>
            <th>Customer</th>
            <th class="num">Amount</th>
            <th class="num">Net</th>
            <th>Gateway</th>
            <th>Method</th>
            <th>Date</th>
            <th>Status</th>
          </tr></thead>
          <tbody>${PAY_DATA.map(p=>`<tr style="cursor:pointer" data-act="paydetail" data-arg="${p.id}">`+
            `<td class="mono">${p.id}</td>`+
            `<td class="nm">${p.acct}</td>`+
            `<td class="num tnum">${fmt(p.amt)}</td>`+
            `<td class="num tnum" style="color:var(--mut)">${fmt(p.net)}</td>`+
            `<td><span style="font-size:12px;font-weight:600;color:${gwColors[p.gw]}">${p.gw}</span></td>`+
            `<td class="mono mut" style="font-size:12px">${p.method}</td>`+
            `<td class="mut">${p.date}</td>`+
            `<td>${pill(p.status,p.sl)}</td>`+
            `</tr>`).join('')}</tbody>
        </table>
      </div>
    </div>
  </div>`));
};

/* ---------- Credits & Refunds ---------- */
VIEWS.credits = (v)=>{
  const CRD_DATA = [
    {id:'CN-2026-112',acct:'Apex Systems',     amt:4200, reason:'Service outage · Jun 14–15',       applied:'INV-2026-0843',date:'Jun 22',status:'good', sl:'Applied',  type:'service-credit',    finalized:true},
    {id:'CN-2026-111',acct:'Fulcrum Labs',     amt:2800, reason:'Billing error · duplicate charge',  applied:'INV-2026-0840',date:'Jun 21',status:'good', sl:'Applied',  type:'rebill-correction', finalized:true},
    {id:'CN-2026-110',acct:'CloudBase Inc',    amt:3600, reason:'Proration adjustment · downgrade',   applied:'INV-2026-0845',date:'Jun 20',status:'good', sl:'Applied',  type:'proration',         finalized:true},
    {id:'CN-2026-109',acct:'Bridgepoint',      amt:1200, reason:'Goodwill credit',                   applied:'INV-2026-0836',date:'Jun 18',status:'good', sl:'Applied',  type:'goodwill',          finalized:true},
    {id:'CN-2026-108',acct:'DataVault',        amt:3100, reason:'Service outage · Jun 10–11',        applied:'—',            date:'Jun 15',status:'muted',sl:'Outstanding',type:'service-credit',  finalized:false},
    {id:'CN-2026-107',acct:'TechFlow Inc',     amt:900,  reason:'Billing error · wrong tier billed', applied:'INV-2026-0834',date:'Jun 14',status:'good', sl:'Applied',  type:'rebill-correction', finalized:true},
    {id:'CN-2026-106',acct:'NovaSpark',        amt:620,  reason:'Tax reversal · address correction',  applied:'—',           date:'Jun 12',status:'warn', sl:'Pending Approval',type:'tax-reversal',finalized:false},
    {id:'CN-2026-105',acct:'Meridian Tech',    amt:1450, reason:'Full credit on void INV-2026-0833', applied:'INV-2026-0833',date:'May 15',status:'muted',sl:'Applied',  type:'full-credit',       finalized:true},
  ];
  const typeLabel = t => t==='rebill-correction'?pill('info','Rebill Correction'):t==='service-credit'?pill('muted','Service Credit'):t==='proration'?pill('muted','Proration'):t==='tax-reversal'?pill('warn','Tax Reversal'):t==='full-credit'?pill('neg','Full Credit'):pill('muted',t);
  const tabs = ['All','Applied','Outstanding','Pending Approval'];
  const matchTab = (c,t) => t==='All'?true:c.sl===t;
  const rowsFor = t => CRD_DATA.filter(c=>matchTab(c,t)).map(c=>`<tr>
    <td class="mono" style="font-size:12px">${c.id}</td>
    <td><span class="nm">${c.acct}</span></td>
    <td class="num tnum">${fmt(c.amt)}</td>
    <td style="font-size:12px;color:var(--text-2);max-width:220px">${c.reason}</td>
    <td>${typeLabel(c.type)}</td>
    <td class="mono mut" style="font-size:11.5px">${c.applied}</td>
    <td class="mut">${c.date}</td>
    <td>${pill(c.status,c.sl)}</td>
    <td><button class="btn ghost" style="padding:5px 10px;font-size:12px" data-act="creditrebill" data-arg="${c.id}">${c.sl==='Outstanding'||c.sl==='Pending Approval'?'Review':'View'}</button></td>
  </tr>`).join('') || `<tr><td colspan="9" class="empty">No ${t.toLowerCase()} credit notes.</td></tr>`;

  v.appendChild(el(`<div class="view">
    ${pageHead('Credits & Refunds','8 credit notes · $17,870 total credits issued',
      `<button class="btn ghost" data-act="download" data-arg="pdf|Document|1 page">${svg(I.download,15)} Export</button><button class="btn primary" data-act="newcredit">+ New Credit Note</button>`)}
    <div class="val-banner info" style="margin-bottom:14px">${svg(I.audit,15)} <div><strong>Finalized invoices cannot be directly edited.</strong> To correct a finalized invoice, use <strong>Credit/Rebill</strong> — this creates a credit note against the original invoice and optionally generates a corrected replacement. <a href="#" data-act="toast" data-arg="Opening credit/rebill documentation" style="color:var(--ember);text-decoration:none">Learn more</a></div></div>
    <div class="grid kpis" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
      ${kpi('Total Credits (Jun)','$17,870','8 notes issued',{accent:true})}
      ${kpi('Applied','$13,150','5 notes applied',{trend:0})}
      ${kpi('Outstanding','$3,720','1 note pending',{})}
      ${kpi('Pending Approval','$620','1 awaiting Finance',{})}
    </div>
    <div class="toolbar">
      <div class="tabs" id="crdTabs">${tabs.map((t,i)=>`<button class="${i===0?'on':''}" onclick="(function(b){document.querySelectorAll('#crdTabs button').forEach(x=>x.classList.remove('on'));b.classList.add('on');document.getElementById('crdBody').innerHTML=rowsFor_crd('${t}')})(this)">${t}</button>`).join('')}</div>
      <div class="spacer"></div>
      <button class="btn ghost" style="font-size:12px" data-act="creditrebill" data-arg="new">+ Credit/Rebill correction</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Credit Note</th><th>Account</th><th class="num">Amount</th><th>Reason</th><th>Type</th><th>Applied To</th><th>Date</th><th>Status</th><th></th></tr></thead>
        <tbody id="crdBody">${rowsFor('All')}</tbody>
      </table>
    </div>
  </div>`));
  window.rowsFor_crd = rowsFor;
};
/* ---------- Dunning & Collections ---------- */
VIEWS.dunning = (v)=>{
  const DUN_DATA = [
    {acct:'Apex Systems',      amt:5800,  day:28, last:'Jun 25',  next:'Final notice',   status:'neg',   sl:'Day 28'},
    {acct:'Fulcrum Labs',      amt:3400,  day:28, last:'Jun 25',  next:'Final notice',   status:'neg',   sl:'Day 28'},
    {acct:'Bridgepoint',       amt:2150,  day:21, last:'Jun 22',  next:'Suspend Jun 30', status:'neg',   sl:'Day 21'},
    {acct:'Cascade Analytics', amt:2950,  day:21, last:'Jun 22',  next:'Suspend Jun 30', status:'neg',   sl:'Day 21'},
    {acct:'Prism Networks',    amt:1100,  day:14, last:'Jun 21',  next:'Call · Jun 28',  status:'warn',  sl:'Day 14'},
    {acct:'NovaSpark',         amt:780,   day:14, last:'Jun 21',  next:'Call · Jun 28',  status:'warn',  sl:'Day 14'},
    {acct:'Orbit Labs',        amt:620,   day:14, last:'Jun 21',  next:'Call · Jun 28',  status:'warn',  sl:'Day 14'},
    {acct:'Vertex IO',         amt:890,   day:7,  last:'Jun 28',  next:'Email+SMS today', status:'warn',  sl:'Day 7'},
    {acct:'TechFlow Inc',      amt:1800,  day:7,  last:'Jun 28',  next:'Email+SMS today', status:'warn',  sl:'Day 7'},
    {acct:'Ironside Tech',     amt:1650,  day:3,  last:'Jun 27',  next:'Email · Jun 30', status:'muted', sl:'Day 3'},
    {acct:'Meridian Tech',     amt:1450,  day:3,  last:'Jun 27',  next:'Email · Jun 30', status:'muted', sl:'Day 3'},
    {acct:'Streamline Co',     amt:2400,  day:1,  last:'Jun 28',  next:'Email · Jul 01', status:'muted', sl:'Day 1'},
  ];
  const SEQ = [
    {day:'Day 1',  action:'Email · payment reminder',        done:true},
    {day:'Day 3',  action:'Email · second notice',             done:true},
    {day:'Day 7',  action:'Email + SMS · urgent notice',       done:false},
    {day:'Day 14', action:'Phone call · collections team',     done:false},
    {day:'Day 21', action:'Final notice email + letter',       done:false},
    {day:'Day 30', action:'Suspend account + legal referral',  done:false},
  ];
  const dayBarColor = (d) => d>=21?'var(--neg)':d>=7?'var(--warn)':'var(--mut)';

  v.appendChild(el(`<div class="view">
    ${pageHead('Dunning & Collections','Automated retry sequences, escalation rules and recovery tracking.',
      `<button class="btn ghost" data-act="dunningconfig">Sequence Rules</button><button class="btn primary" data-act="collectionssweep">Run Sweep</button>`)}

    <div class="grid kpis" style="grid-template-columns:repeat(4,1fr)">
      ${kpi('In Dunning','23 accounts','$47,200 total exposure',{accent:true})}
      ${kpi('At Risk','$47,200','31–60d overdue',{})}
      ${kpi('Recovered MTD','$18,400','11 accounts cleared',{trend:8})}
      ${kpi('Success Rate','61%','failed → recovered MTD',{trend:4})}
    </div>

    <div style="display:grid;grid-template-columns:1fr 320px;gap:16px;margin-bottom:16px">
      <div class="card" style="padding:16px 18px">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:.07em;color:var(--mut);margin-bottom:14px">Recovery Trend · Rolling 6 Months</div>
        <canvas id="recoveryChart" height="130" style="width:100%"></canvas>
      </div>
      <div class="card" style="padding:16px 18px">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:.07em;color:var(--mut);margin-bottom:14px">Dunning Sequence</div>
        <div style="display:flex;flex-direction:column;gap:0">
          ${SEQ.map((s,i)=>`<div style="display:flex;gap:12px;align-items:flex-start;padding:9px 0;${i<SEQ.length-1?'border-bottom:1px solid var(--border)':''}"> `+
            `<div style="width:28px;height:28px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;font-variant-numeric:tabular-nums;background:${s.done?'var(--accent)22':'var(--surface)'};border:1.5px solid ${s.done?'var(--accent)':'var(--border)'};color:${s.done?'var(--accent)':'var(--mut)'}">${s.done?'✓':String(i+1)}</div>`+
            `<div style="flex:1">`+
              `<div style="font-size:13px;font-weight:600;color:${s.done?'var(--text)':'var(--mut)'}">${s.day}</div>`+
              `<div style="font-size:11px;color:var(--mut);margin-top:1px">${s.action}</div>`+
            `</div></div>`).join('')}
        </div>
      </div>
    </div>

    <div class="card" style="padding:0;overflow:hidden">
      <div style="padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:13px;font-weight:600">Active Dunning Sequences <span class="tnum" style="font-weight:400;color:var(--mut)">· 12 accounts</span></span>
        <div style="display:flex;gap:8px">
          <span class="chip">${svg(I.filter,13)} Stage</span>
          <span class="chip" style="cursor:pointer" data-act="download" data-arg="xlsx|Dunning Report|23 sequences · $47,200 at risk">${svg(I.download,13)} Export</span>
        </div>
      </div>
      <div class="table-wrap" style="border:none">
        <table>
          <thead><tr>
            <th>Customer</th>
            <th class="num">Amount</th>
            <th class="num">Day</th>
            <th>Last Attempt</th>
            <th>Next Action</th>
            <th>Status</th>
            <th></th>
          </tr></thead>
          <tbody>${DUN_DATA.map(r=>`<tr style="cursor:pointer" data-act="colldetail" data-arg="${r.acct}">`+
            `<td class="nm">${r.acct}</td>`+
            `<td class="num tnum">${fmt(r.amt)}</td>`+
            `<td class="num tnum" style="color:${dayBarColor(r.day)};font-weight:700">${r.day}</td>`+
            `<td class="mut">${r.last}</td>`+
            `<td style="font-size:12px;color:${dayBarColor(r.day)}">${r.next}</td>`+
            `<td>${pill(r.status,r.sl)}</td>`+
            `<td style="text-align:right"><button class="btn ghost" style="font-size:11px;padding:4px 8px;height:auto" data-act="toast" data-arg="Manual contact logged for ${r.acct}">Log contact</button></td>`+
            `</tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`));

  requestAnimationFrame(()=>{
    const canvas = document.getElementById('recoveryChart'); if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.offsetWidth || 400; const H = 130;
    canvas.width = W * devicePixelRatio; canvas.height = H * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    const recovered = [9200, 11400, 13800, 15200, 14600, 18400];
    const atRisk =    [52000,48000,44000,51000,49000,47200];
    const mo = ['Jan','Feb','Mar','Apr','May','Jun'];
    const pad = {l:36,r:12,t:8,b:28};
    const cw = W-pad.l-pad.r, ch = H-pad.t-pad.b;
    const maxR = 55000;
    const xp = (i)=>pad.l+i*(cw/5);
    const yp = (v)=>pad.t+ch-(v/maxR)*ch;
    const style = getComputedStyle(document.documentElement);
    const borderC = style.getPropertyValue('--border').trim()||'#2a2521';
    const textC = style.getPropertyValue('--mut').trim()||'#7a7068';
    [0,20000,40000].forEach(g=>{
      ctx.beginPath(); ctx.strokeStyle=borderC; ctx.lineWidth=1;
      ctx.moveTo(pad.l,yp(g)); ctx.lineTo(pad.l+cw,yp(g)); ctx.stroke();
      ctx.fillStyle=textC; ctx.font='10px ui-monospace,monospace'; ctx.textAlign='right';
      ctx.fillText(g===0?'$0':'$'+(g/1000)+'k', pad.l-4, yp(g)+3);
    });
    const bw = (cw/5)*0.35;
    atRisk.forEach((v,i)=>{
      ctx.fillStyle='rgba(239,68,68,0.18)';
      const bh = (v/maxR)*ch;
      ctx.fillRect(xp(i)-bw/2, pad.t+ch-bh, bw, bh);
    });
    ctx.beginPath();
    recovered.forEach((v,i)=>i===0?ctx.moveTo(xp(i),yp(v)):ctx.lineTo(xp(i),yp(v)));
    const grad=ctx.createLinearGradient(0,pad.t,0,pad.t+ch);
    grad.addColorStop(0,'rgba(34,197,94,0.25)'); grad.addColorStop(1,'rgba(34,197,94,0.02)');
    ctx.lineTo(xp(5),pad.t+ch); ctx.lineTo(xp(0),pad.t+ch); ctx.closePath();
    ctx.fillStyle=grad; ctx.fill();
    ctx.beginPath();
    recovered.forEach((v,i)=>i===0?ctx.moveTo(xp(i),yp(v)):ctx.lineTo(xp(i),yp(v)));
    ctx.strokeStyle='#22c55e'; ctx.lineWidth=2; ctx.stroke();
    ctx.beginPath(); ctx.arc(xp(5),yp(recovered[5]),4,0,Math.PI*2);
    ctx.fillStyle='#22c55e'; ctx.fill();
    mo.forEach((m,i)=>{
      ctx.fillStyle=textC; ctx.font='10px ui-monospace,monospace'; ctx.textAlign='center';
      ctx.fillText(m, xp(i), H-8);
    });
  });
};

/* ---------- Revenue Recognition ---------- */
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

function setDashLens(which, btn){
  const ro=document.getElementById('kpisRevops'), fin=document.getElementById('kpisFinance');
  if(!ro||!fin) return;
  const finance = which==='finance';
  ro.style.display = finance?'none':'';
  fin.style.display = finance?'':'none';
  document.querySelectorAll('#lensSeg button').forEach(b=>b.classList.toggle('on', b===btn));
  if(!finance) requestAnimationFrame(drawSparks); // re-draw sparklines when revops grid returns
}

function openSubscription(acct){
  const s=subs.find(x=>x.acct===acct)||subs[0];
  const a=accounts.find(x=>x.name===acct);
  const accInv=invoices.filter(x=>x.acct===acct);
  const term=s.plan.includes('annual')?'Annual':'Monthly';
  openDrawer(`
    <div class="drawer-head">
      <div class="logo-chip" style="background:${colorFor(acct)};width:40px;height:40px;font-size:14px">${initials(acct)}</div>
      <div><div style="font-size:18px;font-weight:650">${acct}</div><div class="mut">${s.plan}</div></div>
      <button class="x" data-act="close">✕</button>
    </div>
    <div class="drawer-body">
      <div style="display:flex;gap:8px;margin-bottom:18px">${pill(s.status,s.sl)}<span class="pill muted">${s.model}</span><span class="pill muted">${term}</span></div>
      <div class="grid kpis" style="grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px">
        ${kpi('MRR',fmt(s.mrr),'recurring',{})}
        ${kpi('Annual value',fmt(s.mrr*12),'ARR',{})}
        ${kpi('Seats',s.seats.toLocaleString(),'licensed',{})}
        ${kpi('Renews',s.renew,term.toLowerCase()+' term',{})}
      </div>
      <dl class="kv">
        <dt>Pricing model</dt><dd>${s.model}</dd>
        <dt>Rate</dt><dd>${fmt(Math.round(s.mrr/s.seats))} / seat / mo</dd>
        <dt>Billing term</dt><dd>${term}, in advance</dd>
        <dt>Payment terms</dt><dd>${a?a.terms:'Net 30'}</dd>
        <dt>Owner</dt><dd>${a?a.owner:'—'}</dd>
        <dt>Auto-renew</dt><dd>${s.sl==='Suspended'?'Off':'On'}</dd>
      </dl>
      <div class="sec-title">Billing schedule</div>
      <div class="dot-step">
        ${[['Booked','done'],['Current period','active'],['Renewal','' ]].map((x,k)=>`<div class="ds ${x[1]}"><div class="c">${x[1]==='done'?'✓':k+1}</div><small>${x[0]}</small></div>`).join('')}
      </div>
      <div class="sec-title">Invoices</div>
      ${accInv.length?`<div class="table-wrap"><table style="min-width:0"><tbody>${accInv.map(i=>`<tr style="cursor:pointer" data-act="invoice" data-arg="${i.id}"><td class="mono">${i.id}</td><td class="num">${fmt(i.amt)}</td><td>${pill(i.status,i.slabel)}</td></tr>`).join('')}</tbody></table></div>`:'<div class="empty">No invoices this period.</div>'}
      <div style="display:flex;gap:8px;margin-top:22px">
        <button class="btn primary" style="flex:1;justify-content:center" data-act="changeplan" data-arg="current">Change plan</button>
        <button class="btn" data-act="renewalquote" data-arg="current">Renew</button>
      </div>
    </div>`);
}

function openPayment(id){
  const p=payments.find(x=>x.id===id)||payments[0];
  const fee=Math.round(p.amt*0.0225);
  const failed=p.status==='crit', pending=p.status==='ember';
  const steps=failed?[['Created','done'],['Authorize','active'],['Capture',''],['Settle','']]
    :pending?[['Created','done'],['Authorized','done'],['Capture','active'],['Settle','']]
    :[['Created','done'],['Authorized','done'],['Captured','done'],['Settled','done']];
  openDrawer(`
    <div class="drawer-head">
      <div><div class="mono mut">${p.id}</div><div style="font-size:18px;font-weight:650">${p.acct}</div></div>
      <button class="x" data-act="close">✕</button>
    </div>
    <div class="drawer-body">
      <div style="display:flex;gap:8px;margin-bottom:18px">${pill(p.status,p.sl)}<span class="pill muted">${p.gw}</span></div>
      <dl class="kv">
        <dt>Amount</dt><dd class="mono" style="font-size:16px;color:var(--ember-soft)">${fmt2(p.amt)}</dd>
        <dt>Method</dt><dd class="mono">${p.method}</dd>
        <dt>Gateway</dt><dd>${p.gw}</dd>
        <dt>Processing fee</dt><dd class="mono">${failed?'—':fmt2(fee)+' (2.25%)'}</dd>
        <dt>Net</dt><dd class="mono">${failed?'—':fmt2(p.amt-fee)}</dd>
        <dt>Timestamp</dt><dd>${p.when}</dd>
        <dt>Reference</dt><dd class="mono">ch_${p.id.slice(-5)}${p.id.slice(-2)}</dd>
      </dl>
      <div class="sec-title">Lifecycle</div>
      <div class="dot-step">
        ${steps.map((x,k)=>`<div class="ds ${x[1]}"><div class="c">${x[1]==='done'?'✓':k+1}</div><small>${x[0]}</small></div>`).join('')}
      </div>
      ${failed?`<div class="note warn" style="margin-top:16px">${svg(I.dunning,15)}<div><b>Declined</b> — issuer response: insufficient funds. Smart-retry scheduled; account routed to dunning.</div></div>`:''}
      <div style="display:flex;gap:8px;margin-top:22px">
        ${failed?`<button class="btn primary" style="flex:1;justify-content:center" data-act="retrypay" data-arg="${p.id}">Retry now</button>`
          :`<button class="btn primary" style="flex:1;justify-content:center" data-act="refund" data-arg="${p.id}">Refund</button>`}
        <button class="btn" data-act="download" data-arg="pdf|Payment Receipt|1 page">${svg(I.download,15)} Receipt</button>
      </div>
    </div>`);
}

function openRevSchedule(arg){
  const [id,acct,total,recog,deferred,method]=arg.split('|');
  const T=+total, R=+recog, D=+deferred;
  const monthly=Math.round(T/12);
  const recognizedMonths=Math.round(R/monthly);
  const mlabels=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const rows=mlabels.map((m,i)=>{
    const done=i<recognizedMonths;
    const cur=i===recognizedMonths;
    return `<tr ${cur?'style="background:var(--surface-2)"':''}>
      <td class="mono">${m} 2026</td>
      <td class="num">${fmt2(monthly)}</td>
      <td class="num">${fmt(monthly*(i+1))}</td>
      <td class="num" style="color:var(--ember-soft)">${fmt(Math.max(0,T-monthly*(i+1)))}</td>
      <td>${done?pill('good','Recognized'):cur?pill('ember','Current'):pill('muted','Scheduled')}</td></tr>`;
  }).join('');
  openDrawer(`
    <div class="drawer-head">
      <div><div class="mono mut">${id} · ASC 606 schedule</div><div style="font-size:18px;font-weight:650">${acct}</div></div>
      <button class="x" data-act="close">✕</button>
    </div>
    <div class="drawer-body">
      <div class="grid kpis" style="grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
        ${kpi('Contract value',fmt(T),method,{})}
        ${kpi('Recognized',fmt(R),Math.round(R/T*100)+'% to P&L',{})}
        ${kpi('Deferred',fmt(D),'balance sheet',{})}
        ${kpi('Monthly',fmt(monthly),'straight-line',{})}
      </div>
      <div class="sec-title">Recognition schedule</div>
      <table class="line-items"><thead><tr><th>Period</th><th style="text-align:right">Recognized</th><th style="text-align:right">Cumulative</th><th style="text-align:right">Remaining</th><th style="text-align:right">Status</th></tr></thead>
      <tbody>${rows}</tbody></table>
      <div class="note info" style="margin-top:16px">${svg(I.revrec,15)}<div>Revenue is recognized ratably as the performance obligation is satisfied (ASC 606 / IFRS 15). Unrecognized amounts sit in <b>deferred revenue</b> until earned.</div></div>
    </div>`);
}

/* ---------- Tax & Compliance ---------- */
VIEWS.tax = (v)=>{
  const jurisdictions=[
    ['California','Sales Tax','9.5%','$6,840','$11,640',  'Jul 20','good','Compliant'],
    ['New York','Sales Tax','8.875%','$5,220','$10,890',  'Jul 20','good','Compliant'],
    ['Texas','Sales Tax','6.25%','$3,980','$7,460',      'Jul 20','good','Compliant'],
    ['Florida','Sales Tax','6.0%','$2,870','$5,400',     'Jul 20','good','Compliant'],
    ['Washington','Sales Tax','10.25%','$1,940','$3,210','Jul 20','warn','Review'],
    ['Illinois','Sales Tax','6.25%','$1,620','$2,840',   'Jul 20','good','Compliant'],
    ['Massachusetts','Sales Tax','6.25%','$1,240','$2,080','Jul 20','good','Compliant'],
    ['Colorado','Sales Tax','2.9%','$980','$1,600',      'Jul 20','good','Compliant'],
    ['EU (OSS)','VAT','20.0%','$14,200','$28,400',       'Jul 31','warn','Filing due'],
    ['United Kingdom','VAT','20.0%','$6,800','$13,600',  'Aug 7','good','Compliant'],
    ['Canada','GST','5.0%','$4,100','$8,200',            'Jul 31','warn','Filing due'],
    ['Australia','GST','10.0%','$2,400','$4,800',        'Aug 21','good','Compliant'],
  ];
  const filings=[
    ['California (multi-county)','Sales Tax','Jul 20, 2026','$6,840','warn','Due in 22 days'],
    ['EU VAT OSS','VAT (OSS)','Jul 31, 2026','$14,200','warn','Due in 33 days'],
    ['Canada GST/HST','GST/HST','Jul 31, 2026','$4,100','warn','Due in 33 days'],
    ['New York State','Sales Tax','Jul 20, 2026','$5,220','warn','Due in 22 days'],
    ['United Kingdom','VAT','Aug 7, 2026','$6,800','muted','Due in 40 days'],
    ['Australia','GST','Aug 21, 2026','$2,400','muted','Due in 54 days'],
  ];
  const exemptions=[
    ['Acme Corp','Reseller certificate','CAL-4821-RES','Dec 2026','good','Valid'],
    ['Pinnacle SaaS','501(c)(3) nonprofit','EXT-5512-NP','Apr 2027','good','Valid'],
    ['CloudBase Inc','Government entity','GOV-7208-CA','Permanent','good','Valid'],
    ['Stellar Systems','Reseller certificate','TX-9931-RES','Aug 2026','warn','Expiring'],
    ['Summit Digital','Edu institution','EDU-3347-NY','Jun 2027','good','Valid'],
    ['DataVault','Government contract','GOV-4481-US','Permanent','good','Valid'],
    ['Apex Systems','Reseller certificate','WA-2204-RES','Nov 2026','good','Valid'],
    ['Fulcrum Labs','Exempt — SaaS B2B EU','EU-VAT-REG','Ongoing','good','Valid'],
  ];
  v.appendChild(el(`<div class="view">
    ${pageHead('Tax &amp; compliance','Automated tax determination, nexus tracking, exemption management and filing calendar.',
      `<button class="btn ghost" data-act="taxconfig">${svg(I.settings,15)} Tax settings</button>
       <button class="btn primary" data-act="download" data-arg="zip|Tax Filing Package|Q2 2026 · 3 entities">${svg(I.download,15)} Export filings</button>`)}
    <div class="grid kpis" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
      ${kpi('Tax collected (MTD)','$38,400','14 jurisdictions active',{accent:true,trend:4.2})}
      ${kpi('Jurisdictions','14','US · EU · UK · CA · AU',{})}
      ${kpi('Nexus states','8','economic nexus triggered',{})}
      ${kpi('Next filing','Jul 20','CA + NY sales tax',{})}
    </div>
    <div class="sec-title">Tax by jurisdiction</div>
    <div class="card" style="padding:0">
      <div class="table-wrap" style="border:none;margin:0">
        <table><thead><tr>
          <th>Jurisdiction</th><th>Tax type</th><th class="num">Rate</th>
          <th class="num">Taxable rev.</th><th class="num">Tax amount</th>
          <th>Next filing</th><th>Status</th>
        </tr></thead>
        <tbody>${jurisdictions.map(r=>`<tr>
          <td class="nm">${r[0]}</td><td>${r[1]}</td><td class="num">${r[2]}</td>
          <td class="num">${r[3]}</td><td class="num tnum">${r[4]}</td>
          <td class="mut">${r[5]}</td><td>${pill(r[6],r[7])}</td>
        </tr>`).join('')}</tbody></table>
      </div>
    </div>
    <div class="row" style="margin-top:0">
      <div>
        <div class="sec-title">Upcoming filings</div>
        <div class="card" style="padding:0">
          <div class="table-wrap" style="border:none;margin:0">
            <table><thead><tr>
              <th>Jurisdiction</th><th>Type</th><th>Due</th>
              <th class="num">Est. amount</th><th>Status</th>
            </tr></thead>
            <tbody>${filings.map(f=>`<tr>
              <td class="nm">${f[0]}</td><td class="mut">${f[1]}</td>
              <td class="mut">${f[2]}</td><td class="num tnum">${f[3]}</td>
              <td>${pill(f[4],f[5])}</td>
            </tr>`).join('')}</tbody></table>
          </div>
        </div>
      </div>
      <div>
        <div class="sec-title">Exemption certificates</div>
        <div class="card" style="padding:0">
          <div class="table-wrap" style="border:none;margin:0">
            <table><thead><tr>
              <th>Customer</th><th>Type</th><th>Certificate #</th>
              <th>Expires</th><th>Status</th>
            </tr></thead>
            <tbody>${exemptions.map(e=>`<tr>
              <td class="nm">${e[0]}</td><td class="mut">${e[1]}</td>
              <td class="mono mut" style="font-size:11px">${e[2]}</td>
              <td class="mut">${e[3]}</td><td>${pill(e[4],e[5])}</td>
            </tr>`).join('')}</tbody></table>
          </div>
        </div>
        <div class="note info" style="margin-top:12px">${svg(I.tax,15)}<div>E-invoicing mandates (Italy SdI, India IRP, France PPF) are generated and cleared automatically per jurisdiction. Certificates are validated against state databases on upload.</div></div>
      </div>
    </div>
  </div>`));
};

/* ---------- Reports ---------- */
VIEWS.reports = (v)=>{
  v.appendChild(el(`<div class="view">
    ${pageHead('Reports & analytics',
      'Board-ready financial reporting, SaaS metrics and data exports — June 2026',
      `<div class="seg" id="reportRangeSeg">
        <button class="on" data-act="toast" data-arg="Showing month-to-date data">MTD</button>
        <button data-act="toast" data-arg="Switching to quarter-to-date">QTD</button>
        <button data-act="toast" data-arg="Switching to year-to-date">YTD</button>
        <button data-act="daterange" data-arg="custom">Custom</button>
      </div>
      <button class="btn ghost" data-act="schedulereport">${svg(I.settings,15)} Schedule</button>
      <button class="btn primary" data-act="reportbuilder">${svg(I.plus,15)} New report</button>`
    )}

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;margin-bottom:24px">
      <div class="card panel" style="display:flex;flex-direction:column;gap:10px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:36px;height:36px;border-radius:8px;background:rgba(255,90,31,.12);display:flex;align-items:center;justify-content:center;color:var(--ember);flex-shrink:0">${svg(I.revrec,18)}</div>
          <div style="font-weight:700;font-size:14px;color:var(--text-1)">Revenue Analytics</div>
        </div>
        <div style="font-size:12px;color:var(--text-2);line-height:1.5">MRR bridge, cohort ARR, expansion waterfall, and churn analysis across all entities.</div>
        <button class="btn outline" style="margin-top:auto;justify-content:center" data-act="download" data-arg="pdf|Revenue Analytics|June 2026 · 847 records">${svg(I.download,14)} Generate Report</button>
      </div>
      <div class="card panel" style="display:flex;flex-direction:column;gap:10px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:36px;height:36px;border-radius:8px;background:rgba(255,90,31,.12);display:flex;align-items:center;justify-content:center;color:var(--ember);flex-shrink:0">${svg(I.ar,18)}</div>
          <div style="font-weight:700;font-size:14px;color:var(--text-1)">A/R Aging</div>
        </div>
        <div style="font-size:12px;color:var(--text-2);line-height:1.5">Aging buckets by customer, overdue exposure, DSO trend, and collection risk scoring.</div>
        <button class="btn outline" style="margin-top:auto;justify-content:center" data-act="download" data-arg="xlsx|A/R Aging|Jun 28 · 94 invoices · $157,800">${svg(I.download,14)} Generate Report</button>
      </div>
      <div class="card panel" style="display:flex;flex-direction:column;gap:10px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:36px;height:36px;border-radius:8px;background:rgba(255,90,31,.12);display:flex;align-items:center;justify-content:center;color:var(--ember);flex-shrink:0">${svg(I.subscriptions,18)}</div>
          <div style="font-weight:700;font-size:14px;color:var(--text-1)">Subscription Cohorts</div>
        </div>
        <div style="font-size:12px;color:var(--text-2);line-height:1.5">Monthly cohort retention, expansion rates, and lifetime value by acquisition quarter.</div>
        <button class="btn outline" style="margin-top:auto;justify-content:center" data-act="download" data-arg="xlsx|Subscription Cohort Analysis|Q2 2026 · 842 subscribers">${svg(I.download,14)} Generate Report</button>
      </div>
      <div class="card panel" style="display:flex;flex-direction:column;gap:10px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:36px;height:36px;border-radius:8px;background:rgba(255,90,31,.12);display:flex;align-items:center;justify-content:center;color:var(--ember);flex-shrink:0">${svg(I.reports,18)}</div>
          <div style="font-weight:700;font-size:14px;color:var(--text-1)">Executive Pack</div>
        </div>
        <div style="font-size:12px;color:var(--text-2);line-height:1.5">Board-ready PDF: KPI summary, variance to budget, forecast, and key commentary.</div>
        <button class="btn primary" style="margin-top:auto;justify-content:center" data-act="download" data-arg="pdf|Executive Board Pack|12 slides · P&L · MRR bridge · AR aging">${svg(I.download,14)} Generate Report</button>
      </div>
    </div>

    <div class="two-col" style="margin-bottom:16px;align-items:start">
      <div>
        <div class="card panel">
          <div class="panel-head"><h3>Metric snapshot</h3><span class="sub">June 2026 · MTD unless noted</span></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${kpi('Net Revenue','$329,400','MTD collected',{trend:6.8})}
            ${kpi('Gross Revenue','$487,200','invoiced MTD',{trend:5.1})}
            ${kpi('MRR','$418,350','Jun 2026',{trend:4.2,accent:true})}
            ${kpi('ARR','$5.02M','run rate',{trend:6.1})}
            ${kpi('Gross Churn','1.8%','revenue churn',{trend:-0.4})}
            ${kpi('Expansion MRR','$28,400','upsell & seat adds',{trend:12.3})}
            ${kpi('DSO','28 days','days sales outstanding',{trend:-3.1})}
            ${kpi('Collection Rate','96.2%','MTD payments',{trend:0.6})}
            ${kpi('Invoice Count','172','issued MTD',{trend:2.4})}
            ${kpi('Avg Invoice','$2,840','per issued invoice',{trend:2.6})}
            ${kpi('CAC','$4,100','blended, Jun',{trend:-5.0})}
            ${kpi('LTV','$17,220','blended, trailing',{trend:3.2})}
          </div>
        </div>
      </div>

      <div>
        <div class="card panel">
          <div class="panel-head"><h3>Recent reports</h3><div class="right"><button class="btn ghost" style="padding:5px 10px" data-act="reportarchive">View all</button></div></div>
          <div class="table-wrap" style="border:none">
            <table>
              <thead><tr><th>Report</th><th>Period</th><th>Generated by</th><th>Date</th><th>Format</th><th></th></tr></thead>
              <tbody>
                <tr>
                  <td class="nm">Executive Board Pack</td>
                  <td class="mut">May 2026</td>
                  <td class="mut">M. Reyes</td>
                  <td class="mut tnum">Jun 01</td>
                  <td>${pill('muted','PDF')}</td>
                  <td><button class="btn ghost" style="padding:4px 8px" data-act="download" data-arg="pdf|Executive Board Pack|May 2026 · 12 slides">${svg(I.download,13)}</button></td>
                </tr>
                <tr>
                  <td class="nm">A/R Aging Detail</td>
                  <td class="mut">Jun 28</td>
                  <td class="mut">D. Cho</td>
                  <td class="mut tnum">Jun 28</td>
                  <td>${pill('muted','XLSX')}</td>
                  <td><button class="btn ghost" style="padding:4px 8px" data-act="download" data-arg="xlsx|A/R Aging Detail|Jun 28 · 94 invoices">${svg(I.download,13)}</button></td>
                </tr>
                <tr>
                  <td class="nm">Revenue Analytics</td>
                  <td class="mut">Q2 2026</td>
                  <td class="mut">M. Reyes</td>
                  <td class="mut tnum">Jun 27</td>
                  <td>${pill('muted','PDF')}</td>
                  <td><button class="btn ghost" style="padding:4px 8px" data-act="download" data-arg="pdf|Revenue Analytics|Q2 2026 · 847 records">${svg(I.download,13)}</button></td>
                </tr>
                <tr>
                  <td class="nm">Subscription Cohorts</td>
                  <td class="mut">Q1 2026</td>
                  <td class="mut">System</td>
                  <td class="mut tnum">Jun 25</td>
                  <td>${pill('muted','XLSX')}</td>
                  <td><button class="btn ghost" style="padding:4px 8px" data-act="download" data-arg="xlsx|Subscription Cohort Analysis|Q1 2026">${svg(I.download,13)}</button></td>
                </tr>
                <tr>
                  <td class="nm">Tax Liability Summary</td>
                  <td class="mut">May 2026</td>
                  <td class="mut">P. Anand</td>
                  <td class="mut tnum">Jun 20</td>
                  <td>${pill('muted','PDF')}</td>
                  <td><button class="btn ghost" style="padding:4px 8px" data-act="download" data-arg="xlsx|Tax Liability Summary|May 2026">${svg(I.download,13)}</button></td>
                </tr>
                <tr>
                  <td class="nm">Collections Risk Report</td>
                  <td class="mut">Jun 2026</td>
                  <td class="mut">D. Cho</td>
                  <td class="mut tnum">Jun 18</td>
                  <td>${pill('muted','XLSX')}</td>
                  <td><button class="btn ghost" style="padding:4px 8px" data-act="download" data-arg="xlsx|Collections Risk Report|Jun 2026 · 23 accounts">${svg(I.download,13)}</button></td>
                </tr>
                <tr>
                  <td class="nm">Cash Flow Forecast</td>
                  <td class="mut">H2 2026</td>
                  <td class="mut">M. Reyes</td>
                  <td class="mut tnum">Jun 15</td>
                  <td>${pill('muted','XLSX')}</td>
                  <td><button class="btn ghost" style="padding:4px 8px" data-act="download" data-arg="xlsx|Cash Flow Forecast|H2 2026 · 6 months">${svg(I.download,13)}</button></td>
                </tr>
                <tr>
                  <td class="nm">MRR Movement Bridge</td>
                  <td class="mut">May 2026</td>
                  <td class="mut">System</td>
                  <td class="mut tnum">Jun 01</td>
                  <td>${pill('muted','PDF')}</td>
                  <td><button class="btn ghost" style="padding:4px 8px" data-act="download" data-arg="xlsx|MRR Movement Bridge|May 2026">${svg(I.download,13)}</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>`));
};


/* ---------- Settings ---------- */
/* ---------- Consolidation ---------- */
VIEWS.consolidation = (v)=>{
  v.appendChild(el(`<div class="view">
    ${pageHead('Consolidation',
      'Multi-entity consolidation · June 2026',
      `<div class="seg" id="consViewSeg">
        <button class="on" data-act="toast" data-arg="Showing consolidated view">Consolidated</button>
        <button data-act="toast" data-arg="Switching to entity view">By entity</button>
      </div>
      <button class="btn ghost" data-act="download" data-arg="xlsx|Consolidated Statements|Q2 2026 · 3 entities">${svg(I.download,15)} Export</button>
      <button class="btn primary" data-act="eliminations">${svg(I.check,15)} Run Eliminations</button>`
    )}

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;margin-bottom:24px">
      ${kpi('Consolidated ARR','$5.02M','all entities',{trend:6.1,accent:true})}
      ${kpi('Consolidated MRR','$418,350','Jun 2026',{trend:4.2})}
      ${kpi('Interco Eliminations','$38,400','Jun 2026',{})}
      ${kpi('FX Impact (MTD)','−$4,200','USD equivalent',{trend:-1.1})}
    </div>

    <div style="margin-bottom:16px">
      <div class="card panel">
        <div class="panel-head"><h3>Entity overview</h3><span class="sub">June 2026 · functional currency reporting</span></div>
        <div class="table-wrap" style="border:none">
          <table>
            <thead><tr><th>Entity</th><th>Country</th><th>Currency</th><th class="num">MRR (local)</th><th class="num">MRR (USD)</th><th class="num">ARR (USD)</th><th>Status</th></tr></thead>
            <tbody>
              <tr>
                <td class="nm">Delonix Inc</td>
                <td class="mut">United States</td>
                <td class="mut">USD</td>
                <td class="num tnum">$348,200</td>
                <td class="num tnum">$348,200</td>
                <td class="num tnum mut">$4.18M</td>
                <td>${pill('good','Open')}</td>
              </tr>
              <tr>
                <td class="nm">Delonix EU GmbH</td>
                <td class="mut">Germany</td>
                <td class="mut">EUR</td>
                <td class="num tnum">€56,400</td>
                <td class="num tnum">$60,800</td>
                <td class="num tnum mut">$730k</td>
                <td>${pill('good','Open')}</td>
              </tr>
              <tr>
                <td class="nm">Delonix APAC Pte</td>
                <td class="mut">Singapore</td>
                <td class="mut">SGD</td>
                <td class="num tnum">S$12,700</td>
                <td class="num tnum">$9,350</td>
                <td class="num tnum mut">$112k</td>
                <td>${pill('warn','Pending')}</td>
              </tr>
              <tr style="border-top:1px solid var(--border-2)">
                <td style="font-weight:700;color:var(--text-1)">Consolidated (pre-elim)</td>
                <td class="mut">—</td>
                <td class="mut">USD</td>
                <td class="num tnum">—</td>
                <td class="num tnum" style="font-weight:700">$418,350</td>
                <td class="num tnum mut" style="font-weight:700">$5.02M</td>
                <td>${pill('warn','In progress')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="two-col" style="margin-bottom:16px;align-items:start">
      <div>
        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-head"><h3>Intercompany eliminations</h3><span class="sub">June 2026 · USD equivalent</span></div>
          <div class="table-wrap" style="border:none">
            <table>
              <thead><tr><th>Transaction</th><th>From</th><th>To</th><th class="num">Amount</th><th>Type</th><th>Status</th></tr></thead>
              <tbody>
                <tr>
                  <td class="nm">Management fee</td>
                  <td class="mut" style="font-size:11px">Delonix Inc</td>
                  <td class="mut" style="font-size:11px">Delonix EU GmbH</td>
                  <td class="num tnum">$18,000</td>
                  <td>${pill('muted','Revenue')}</td>
                  <td>${pill('good','Eliminated')}</td>
                </tr>
                <tr>
                  <td class="nm">IP royalty</td>
                  <td class="mut" style="font-size:11px">Delonix Inc</td>
                  <td class="mut" style="font-size:11px">Delonix APAC Pte</td>
                  <td class="num tnum">$8,400</td>
                  <td>${pill('muted','Revenue')}</td>
                  <td>${pill('good','Eliminated')}</td>
                </tr>
                <tr>
                  <td class="nm">Shared services</td>
                  <td class="mut" style="font-size:11px">Delonix Inc</td>
                  <td class="mut" style="font-size:11px">Delonix EU GmbH</td>
                  <td class="num tnum">$7,200</td>
                  <td>${pill('muted','Expense')}</td>
                  <td>${pill('good','Eliminated')}</td>
                </tr>
                <tr>
                  <td class="nm">Interco loan interest</td>
                  <td class="mut" style="font-size:11px">Delonix EU GmbH</td>
                  <td class="mut" style="font-size:11px">Delonix Inc</td>
                  <td class="num tnum">$4,800</td>
                  <td>${pill('muted','Interest')}</td>
                  <td>${pill('good','Eliminated')}</td>
                </tr>
                <tr style="border-top:1px solid var(--border-2)">
                  <td style="font-weight:700;color:var(--text-1)" colspan="3">Total eliminations</td>
                  <td class="num tnum" style="font-weight:700;color:var(--ember)">$38,400</td>
                  <td></td>
                  <td>${pill('good','All clear')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card panel">
          <div class="panel-head"><h3>Consolidated P&amp;L (MTD)</h3><span class="sub">June 2026 · USD · post-elimination</span></div>
          <div class="table-wrap" style="border:none">
            <table>
              <thead><tr><th>Line item</th><th class="num">Jun 2026</th><th class="num">May 2026</th><th class="num">Var</th></tr></thead>
              <tbody>
                <tr>
                  <td class="nm">Gross revenue</td>
                  <td class="num tnum">$487,200</td>
                  <td class="num tnum mut">$463,000</td>
                  <td class="num tnum" style="color:var(--good)">+5.2%</td>
                </tr>
                <tr>
                  <td style="color:var(--text-2);font-size:12px;padding-left:20px">Less: credits &amp; refunds</td>
                  <td class="num tnum mut" style="font-size:12px">($14,200)</td>
                  <td class="num tnum mut" style="font-size:12px">($13,100)</td>
                  <td class="num tnum mut" style="font-size:12px">+8.4%</td>
                </tr>
                <tr>
                  <td style="color:var(--text-2);font-size:12px;padding-left:20px">Less: interco eliminations</td>
                  <td class="num tnum mut" style="font-size:12px">($38,400)</td>
                  <td class="num tnum mut" style="font-size:12px">($35,200)</td>
                  <td class="num tnum mut" style="font-size:12px">+9.1%</td>
                </tr>
                <tr style="border-top:1px solid var(--border-2)">
                  <td style="font-weight:700;color:var(--text-1)">Net revenue</td>
                  <td class="num tnum" style="font-weight:700;color:var(--ember)">$434,600</td>
                  <td class="num tnum mut" style="font-weight:600">$414,700</td>
                  <td class="num tnum" style="color:var(--good);font-weight:600">+4.8%</td>
                </tr>
                <tr>
                  <td style="color:var(--text-2);font-size:12px;padding-left:20px">Cost of revenue</td>
                  <td class="num tnum mut" style="font-size:12px">($126,000)</td>
                  <td class="num tnum mut" style="font-size:12px">($122,400)</td>
                  <td class="num tnum mut" style="font-size:12px">+2.9%</td>
                </tr>
                <tr style="border-top:1px solid var(--border-2)">
                  <td style="font-weight:600;color:var(--text-1)">Gross profit</td>
                  <td class="num tnum" style="font-weight:600">$308,600</td>
                  <td class="num tnum mut">$292,300</td>
                  <td class="num tnum" style="color:var(--good)">+5.6%</td>
                </tr>
                <tr>
                  <td style="color:var(--text-3);font-size:11px;padding-left:4px">Gross margin</td>
                  <td class="num tnum" style="font-size:11px;color:var(--text-2)">71.0%</td>
                  <td class="num tnum" style="font-size:11px;color:var(--text-3)">70.5%</td>
                  <td class="num tnum" style="font-size:11px;color:var(--good)">+0.5pp</td>
                </tr>
                <tr>
                  <td style="color:var(--text-2);font-size:12px;padding-left:20px">Operating expenses</td>
                  <td class="num tnum mut" style="font-size:12px">($208,100)</td>
                  <td class="num tnum mut" style="font-size:12px">($201,800)</td>
                  <td class="num tnum mut" style="font-size:12px">+3.1%</td>
                </tr>
                <tr style="border-top:1px solid var(--border-2)">
                  <td style="font-weight:700;color:var(--text-1)">EBITDA</td>
                  <td class="num tnum" style="font-weight:700;color:var(--good)">$100,500</td>
                  <td class="num tnum mut" style="font-weight:600">$90,500</td>
                  <td class="num tnum" style="color:var(--good);font-weight:600">+11.0%</td>
                </tr>
                <tr>
                  <td style="color:var(--text-3);font-size:11px;padding-left:4px">EBITDA margin</td>
                  <td class="num tnum" style="font-size:11px;color:var(--text-2)">23.1%</td>
                  <td class="num tnum" style="font-size:11px;color:var(--text-3)">21.8%</td>
                  <td class="num tnum" style="font-size:11px;color:var(--good)">+1.3pp</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-head"><h3>FX rates</h3><span class="sub">Jun 28, 2026 · vs USD</span></div>
          <div class="table-wrap" style="border:none">
            <table>
              <thead><tr><th>Currency</th><th class="num">Rate</th><th class="num">vs May avg</th><th class="num">MRR impact</th></tr></thead>
              <tbody>
                <tr>
                  <td class="nm">EUR / USD</td>
                  <td class="num tnum">1.0781</td>
                  <td class="num tnum" style="color:var(--warn)">−0.8%</td>
                  <td class="num tnum" style="color:var(--warn)">−$490</td>
                </tr>
                <tr>
                  <td class="nm">SGD / USD</td>
                  <td class="num tnum">0.7362</td>
                  <td class="num tnum" style="color:var(--warn)">−1.4%</td>
                  <td class="num tnum" style="color:var(--warn)">−$130</td>
                </tr>
                <tr style="border-top:1px solid var(--border-2)">
                  <td style="font-weight:600;color:var(--text-1)">Total FX impact</td>
                  <td class="num tnum">—</td>
                  <td class="num tnum">—</td>
                  <td class="num tnum" style="font-weight:700;color:var(--warn)">−$620</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="font-size:11px;color:var(--text-3);margin-top:10px;letter-spacing:.03em">MTD FX translation loss: −$4,200 (cumulative unrealised)</div>
        </div>

        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-head"><h3>MRR by entity</h3><span class="sub">June 2026 · USD equivalent</span></div>
          <div style="display:flex;flex-direction:column;gap:10px;padding:4px 0">
            <div>
              <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
                <span style="color:var(--text-1);font-weight:600">Delonix Inc (USD)</span>
                <span class="tnum" style="color:var(--text-2)">$348,200 · 83.2%</span>
              </div>
              <div style="height:8px;border-radius:4px;background:var(--surface-3);overflow:hidden">
                <div style="height:100%;width:83.2%;border-radius:4px;background:var(--ember)"></div>
              </div>
            </div>
            <div>
              <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
                <span style="color:var(--text-1);font-weight:600">Delonix EU GmbH (EUR)</span>
                <span class="tnum" style="color:var(--text-2)">$60,800 · 14.5%</span>
              </div>
              <div style="height:8px;border-radius:4px;background:var(--surface-3);overflow:hidden">
                <div style="height:100%;width:14.5%;border-radius:4px;background:#ff8a4c"></div>
              </div>
            </div>
            <div>
              <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
                <span style="color:var(--text-1);font-weight:600">Delonix APAC Pte (SGD)</span>
                <span class="tnum" style="color:var(--text-2)">$9,350 · 2.2%</span>
              </div>
              <div style="height:8px;border-radius:4px;background:var(--surface-3);overflow:hidden">
                <div style="height:100%;width:2.2%;border-radius:4px;background:var(--text-3)"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="card panel">
          <div class="panel-head"><h3>Consolidation status</h3></div>
          <div style="display:flex;flex-direction:column;gap:8px;padding:4px 0">
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:12px;color:var(--text-2)">Delonix Inc data</span>
              ${pill('good','Complete')}
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:12px;color:var(--text-2)">Delonix EU GmbH data</span>
              ${pill('good','Complete')}
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:12px;color:var(--text-2)">Delonix APAC Pte data</span>
              ${pill('warn','Pending bank rec')}
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:12px;color:var(--text-2)">Interco eliminations</span>
              ${pill('good','Complete')}
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:12px;color:var(--text-2)">FX translation</span>
              ${pill('good','Applied')}
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:12px;color:var(--text-2)">Consolidated statements</span>
              ${pill('warn','Pending APAC')}
            </div>
            <button class="btn primary" style="justify-content:center;margin-top:4px" data-act="consolidation">${svg(I.check,15)} Run Full Consolidation</button>
          </div>
        </div>
      </div>
    </div>
  </div>`));
};


/* ---------- Financial Statements ---------- */
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
VIEWS.close = (v)=>{
  v.appendChild(el(`<div class="view">
    ${pageHead('Period Close',
      'Month-end close · June 2026 · Delonix Inc',
      `<button class="btn ghost" data-act="postjournals">${svg(I.settings,15)} Close calendar</button>
      <button class="btn primary" data-act="signoffclose">${svg(I.check,15)} Sign Off Period</button>`
    )}

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-bottom:24px">
      ${kpi('Tasks Complete','17 / 20','June 2026',{accent:true})}
      ${kpi('Period','Jun 2026','closes Jun 30',{})}
      ${kpi('Days Remaining','2','until hard close',{trend:-2})}
      ${kpi('Open Issues','3','blocking sign-off',{})}
    </div>

    <div style="margin-bottom:16px">
      <div class="card panel">
        <div class="panel-head"><h3>Close progress</h3><span class="sub">June 2026 · 17 of 20 tasks complete</span></div>
        <div style="height:8px;border-radius:4px;background:var(--surface-3);overflow:hidden;margin-bottom:6px">
          <div style="height:100%;width:85%;border-radius:4px;background:var(--good)"></div>
        </div>
        <div style="font-size:11px;color:var(--text-3);letter-spacing:.03em;margin-bottom:16px">85% complete — 3 tasks outstanding</div>
        <div class="table-wrap" style="border:none">
          <table>
            <thead><tr><th>#</th><th>Task</th><th>Owner</th><th>Due</th><th>Status</th><th>Notes</th></tr></thead>
            <tbody>
              <tr>
                <td class="mut tnum">01</td>
                <td class="nm">Lock AR sub-ledger</td>
                <td class="mut">D. Cho</td>
                <td class="mut tnum">Jun 28</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">Completed Jun 28 09:14</td>
              </tr>
              <tr>
                <td class="mut tnum">02</td>
                <td class="nm">Post cash receipts</td>
                <td class="mut">D. Cho</td>
                <td class="mut tnum">Jun 28</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">172 receipts posted</td>
              </tr>
              <tr>
                <td class="mut tnum">03</td>
                <td class="nm">Revenue recognition run</td>
                <td class="mut">System</td>
                <td class="mut tnum">Jun 28</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">ASC 606 automated</td>
              </tr>
              <tr>
                <td class="mut tnum">04</td>
                <td class="nm">Deferred revenue schedule</td>
                <td class="mut">M. Reyes</td>
                <td class="mut tnum">Jun 28</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">$218,400 deferred</td>
              </tr>
              <tr>
                <td class="mut tnum">05</td>
                <td class="nm">Bank reconciliation — USD</td>
                <td class="mut">P. Anand</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">Matched Jun 27 stmt</td>
              </tr>
              <tr>
                <td class="mut tnum">06</td>
                <td class="nm">Bank reconciliation — EUR</td>
                <td class="mut">P. Anand</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">€42,100 reconciled</td>
              </tr>
              <tr>
                <td class="mut tnum">07</td>
                <td class="nm">Bank reconciliation — SGD</td>
                <td class="mut">P. Anand</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('warn','In progress')}</td>
                <td class="mut" style="font-size:11px">Awaiting Jun 27 stmt</td>
              </tr>
              <tr>
                <td class="mut tnum">08</td>
                <td class="nm">Intercompany eliminations</td>
                <td class="mut">M. Reyes</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">3 entities reconciled</td>
              </tr>
              <tr>
                <td class="mut tnum">09</td>
                <td class="nm">Prepaid expense amortization</td>
                <td class="mut">P. Anand</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">$14,200 amortized</td>
              </tr>
              <tr>
                <td class="mut tnum">10</td>
                <td class="nm">Fixed asset depreciation</td>
                <td class="mut">System</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">Auto-posted</td>
              </tr>
              <tr>
                <td class="mut tnum">11</td>
                <td class="nm">Accrued liabilities review</td>
                <td class="mut">M. Reyes</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">$87,300 accrued</td>
              </tr>
              <tr>
                <td class="mut tnum">12</td>
                <td class="nm">Payroll accrual</td>
                <td class="mut">P. Anand</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">Jun 16–30 accrued</td>
              </tr>
              <tr>
                <td class="mut tnum">13</td>
                <td class="nm">Commission accrual</td>
                <td class="mut">M. Reyes</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">$22,400 accrued</td>
              </tr>
              <tr>
                <td class="mut tnum">14</td>
                <td class="nm">Tax provision — federal</td>
                <td class="mut">P. Anand</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('warn','In progress')}</td>
                <td class="mut" style="font-size:11px">Pending Q2 calc</td>
              </tr>
              <tr>
                <td class="mut tnum">15</td>
                <td class="nm">Sales tax filing — US</td>
                <td class="mut">System</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">Auto-filed via Avalara</td>
              </tr>
              <tr>
                <td class="mut tnum">16</td>
                <td class="nm">VAT return — EU</td>
                <td class="mut">P. Anand</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">Filed Jun 27</td>
              </tr>
              <tr>
                <td class="mut tnum">17</td>
                <td class="nm">GL trial balance review</td>
                <td class="mut">M. Reyes</td>
                <td class="mut tnum">Jun 30</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">Zero difference</td>
              </tr>
              <tr>
                <td class="mut tnum">18</td>
                <td class="nm">Financial statements draft</td>
                <td class="mut">M. Reyes</td>
                <td class="mut tnum">Jun 30</td>
                <td>${pill('crit','Blocked')}</td>
                <td class="mut" style="font-size:11px">Awaiting tasks 07, 14</td>
              </tr>
              <tr>
                <td class="mut tnum">19</td>
                <td class="nm">CFO review &amp; sign-off</td>
                <td class="mut">S. Chen</td>
                <td class="mut tnum">Jun 30</td>
                <td>${pill('muted','Pending')}</td>
                <td class="mut" style="font-size:11px">Not started</td>
              </tr>
              <tr>
                <td class="mut tnum">20</td>
                <td class="nm">Period lock &amp; archive</td>
                <td class="mut">System</td>
                <td class="mut tnum">Jun 30</td>
                <td>${pill('muted','Pending')}</td>
                <td class="mut" style="font-size:11px">Auto on CFO sign-off</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="two-col" style="margin-bottom:16px;align-items:start">
      <div>
        <div class="card panel">
          <div class="panel-head"><h3>GL reconciliation summary</h3><span class="sub">Key account balances · June 28, 2026</span></div>
          <div class="table-wrap" style="border:none">
            <table>
              <thead><tr><th>Account</th><th class="num">GL Balance</th><th class="num">Sub-ledger</th><th class="num">Difference</th><th>Status</th></tr></thead>
              <tbody>
                <tr>
                  <td class="nm">Cash &amp; equivalents</td>
                  <td class="num tnum">$1,842,300</td>
                  <td class="num tnum">$1,842,300</td>
                  <td class="num tnum" style="color:var(--good)">$0</td>
                  <td>${pill('good','Reconciled')}</td>
                </tr>
                <tr>
                  <td class="nm">Accounts receivable</td>
                  <td class="num tnum">$157,800</td>
                  <td class="num tnum">$157,800</td>
                  <td class="num tnum" style="color:var(--good)">$0</td>
                  <td>${pill('good','Reconciled')}</td>
                </tr>
                <tr>
                  <td class="nm">Deferred revenue</td>
                  <td class="num tnum">$218,400</td>
                  <td class="num tnum">$218,400</td>
                  <td class="num tnum" style="color:var(--good)">$0</td>
                  <td>${pill('good','Reconciled')}</td>
                </tr>
                <tr>
                  <td class="nm">Prepaid expenses</td>
                  <td class="num tnum">$62,100</td>
                  <td class="num tnum">$62,100</td>
                  <td class="num tnum" style="color:var(--good)">$0</td>
                  <td>${pill('good','Reconciled')}</td>
                </tr>
                <tr>
                  <td class="nm">Accrued liabilities</td>
                  <td class="num tnum">$87,300</td>
                  <td class="num tnum">$87,300</td>
                  <td class="num tnum" style="color:var(--good)">$0</td>
                  <td>${pill('good','Reconciled')}</td>
                </tr>
                <tr>
                  <td class="nm">SGD bank account</td>
                  <td class="num tnum">S$84,200</td>
                  <td class="num tnum">—</td>
                  <td class="num tnum" style="color:var(--warn)">Pending</td>
                  <td>${pill('warn','In progress')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-head"><h3>Sign-off chain</h3><span class="sub">Required approvers for June 2026</span></div>
          <div style="display:flex;flex-direction:column;gap:12px;padding:4px 0">
            <div style="display:flex;align-items:center;gap:12px">
              <div style="width:32px;height:32px;border-radius:50%;background:var(--good);display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700;flex-shrink:0">DA</div>
              <div style="flex:1">
                <div style="font-weight:600;font-size:13px;color:var(--text-1)">D. Cho — AR Lead</div>
                <div style="font-size:11px;color:var(--text-3)">AR sub-ledger locked · Jun 28 09:14</div>
              </div>
              ${pill('good','Signed')}
            </div>
            <div style="display:flex;align-items:center;gap:12px">
              <div style="width:32px;height:32px;border-radius:50%;background:var(--good);display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700;flex-shrink:0">PA</div>
              <div style="flex:1">
                <div style="font-weight:600;font-size:13px;color:var(--text-1)">P. Anand — Controller</div>
                <div style="font-size:11px;color:var(--text-3)">Bank recs &amp; tax filings complete (1 pending)</div>
              </div>
              ${pill('warn','Partial')}
            </div>
            <div style="display:flex;align-items:center;gap:12px">
              <div style="width:32px;height:32px;border-radius:50%;background:var(--good);display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700;flex-shrink:0">MR</div>
              <div style="flex:1">
                <div style="font-weight:600;font-size:13px;color:var(--text-1)">M. Reyes — Finance Director</div>
                <div style="font-size:11px;color:var(--text-3)">GL review done · financial statements pending</div>
              </div>
              ${pill('warn','Partial')}
            </div>
            <div style="display:flex;align-items:center;gap:12px">
              <div style="width:32px;height:32px;border-radius:50%;background:var(--surface-3);display:flex;align-items:center;justify-content:center;color:var(--text-3);font-size:12px;font-weight:700;flex-shrink:0">SC</div>
              <div style="flex:1">
                <div style="font-weight:600;font-size:13px;color:var(--text-1)">S. Chen — CFO</div>
                <div style="font-size:11px;color:var(--text-3)">Awaiting financials draft from M. Reyes</div>
              </div>
              ${pill('muted','Pending')}
            </div>
          </div>
        </div>

        <div class="card panel">
          <div class="panel-head"><h3>Open issues</h3><span class="sub">Blocking close completion</span></div>
          <div style="display:flex;flex-direction:column;gap:10px;padding:4px 0">
            <div style="padding:10px 12px;border-radius:8px;background:var(--surface-2);border-left:3px solid var(--warn)">
              <div style="font-weight:600;font-size:12px;color:var(--text-1);margin-bottom:3px">SGD bank statement not received</div>
              <div style="font-size:11px;color:var(--text-3)">DBS Bank Singapore · Expected Jun 27 · Owner: P. Anand</div>
            </div>
            <div style="padding:10px 12px;border-radius:8px;background:var(--surface-2);border-left:3px solid var(--warn)">
              <div style="font-weight:600;font-size:12px;color:var(--text-1);margin-bottom:3px">Q2 federal tax provision pending</div>
              <div style="font-size:11px;color:var(--text-3)">Awaiting external tax advisor estimate · Owner: P. Anand</div>
            </div>
            <div style="padding:10px 12px;border-radius:8px;background:var(--surface-2);border-left:3px solid var(--crit)">
              <div style="font-weight:600;font-size:12px;color:var(--text-1);margin-bottom:3px">Financial statements draft blocked</div>
              <div style="font-size:11px;color:var(--text-3)">Depends on SGD bank rec &amp; tax provision · Owner: M. Reyes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`));
};


/* ---------- Controls & Audit ---------- */
VIEWS.controls = (v)=>{
  const soc2=[
    ['Security','CC1–CC9','47','50','good'],
    ['Availability','A1','9','9','good'],
    ['Processing Integrity','PI1','6','7','warn'],
    ['Confidentiality','C1–C2','8','8','good'],
    ['Privacy','P1–P8','11','11','good'],
  ];
  const auditLog=[
    ['2026-06-28 14:31:04','a.bukhari@delonix.com','invoice_approved','INV-2026-1042','104.21.88.14','good','Success'],
    ['2026-06-28 13:58:17','system','payment_captured','PAY-88241 · $96,400','—','good','Success'],
    ['2026-06-28 11:22:43','m.reyes@delonix.com','export_generated','AR aging report Q2','67.44.120.9','good','Success'],
    ['2026-06-28 10:05:31','d.cho@delonix.com','user_invited','sarah.kim@delonix.com','67.44.120.9','good','Success'],
    ['2026-06-27 16:44:12','a.bukhari@delonix.com','settings_changed','dunning.retry_schedule','104.21.88.14','warn','Changed'],
    ['2026-06-27 14:19:05','system','payment_captured','PAY-88240 · $48,200','—','good','Success'],
    ['2026-06-27 09:02:51','p.anand@delonix.com','login','console.delonix.com','185.42.11.87','good','Success'],
    ['2026-06-26 17:33:28','m.reyes@delonix.com','refund_issued','REF-2026-019 · $1,400','67.44.120.9','good','Success'],
    ['2026-06-26 15:10:02','d.cho@delonix.com','invoice_approved','INV-2026-1039','67.44.120.9','good','Success'],
    ['2026-06-26 12:44:17','system','export_generated','SOC 2 evidence pack','—','good','Success'],
    ['2026-06-25 18:08:54','a.bukhari@delonix.com','login','console.delonix.com','104.21.88.14','good','Success'],
    ['2026-06-25 11:31:22','p.anand@delonix.com','settings_changed','tax.nexus_states','185.42.11.87','warn','Changed'],
    ['2026-06-24 16:02:08','system','payment_captured','PAY-88236 · $41,300','—','good','Success'],
    ['2026-06-24 09:15:44','m.reyes@delonix.com','invoice_approved','INV-2026-1036','67.44.120.9','good','Success'],
    ['2026-06-23 14:27:33','d.cho@delonix.com','login','console.delonix.com','67.44.120.9','good','Success'],
  ];
  const findings=[
    ['High','Access review overdue — 4 stale user accounts not recertified since Q1','P. Anand','Jul 5, 2026','crit'],
    ['Medium','MFA not enforced for 2 API-only service accounts','D. Cho','Jul 15, 2026','warn'],
    ['Low','Webhook signing key rotation last performed 182 days ago (policy: 90d)','A. Bukhari','Jul 31, 2026','muted'],
  ];
  v.appendChild(el(`<div class="view">
    ${pageHead('Controls &amp; audit','SOC 2, access controls, and the immutable audit log — built for SOX compliance, external audit and due diligence.',
      `<button class="btn ghost" data-act="download" data-arg="zip|Evidence Pack|23 control documents · 847 transaction samples">${svg(I.download,15)} Evidence pack</button>
       <button class="btn primary" data-act="audithistory" data-arg="Controls:SOC2-2025-11">View certificates</button>`)}
    <div class="grid kpis" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
      ${kpi('Open issues','3','1 High · 1 Med · 1 Low',{accent:true})}
      ${kpi('Controls passing','47/50','94% effective rate',{trend:2})}
      ${kpi('Last audit','May 2026','SOC 2 Type II',{})}
      ${kpi('Risk score','Low','no critical findings',{})}
    </div>
    <div class="row">
      <div>
        <div class="sec-title">SOC 2 control categories</div>
        <div class="card" style="padding:0">
          <div class="table-wrap" style="border:none;margin:0">
            <table><thead><tr>
              <th>Category</th><th>Criteria</th>
              <th class="num">Passing</th><th class="num">Total</th><th>Status</th>
            </tr></thead>
            <tbody>${soc2.map(s=>{
              const pct=Math.round(parseInt(s[2])/parseInt(s[3])*100);
              return `<tr>
                <td class="nm">${s[0]}</td><td class="mono mut" style="font-size:11px">${s[1]}</td>
                <td class="num">${s[2]}</td><td class="num">${s[3]}</td>
                <td>${pill(s[4], pct===100?'Passing':'Review')}</td>
              </tr>`;
            }).join('')}</tbody></table>
          </div>
        </div>
        <div class="sec-title">Open findings</div>
        <div class="card" style="padding:0">
          <div class="table-wrap" style="border:none;margin:0">
            <table><thead><tr>
              <th>Severity</th><th>Description</th><th>Owner</th><th>Due</th>
            </tr></thead>
            <tbody>${findings.map(f=>`<tr>
              <td>${pill(f[4],f[0])}</td>
              <td style="max-width:280px;white-space:normal;line-height:1.45;font-size:12.5px">${f[1]}</td>
              <td class="mut">${f[2]}</td>
              <td class="mut">${f[3]}</td>
            </tr>`).join('')}</tbody></table>
          </div>
        </div>
      </div>
      <div>
        <div class="sec-title">Recent audit events</div>
        <div class="card" style="padding:0">
          <div class="table-wrap" style="border:none;margin:0">
            <table><thead><tr>
              <th>Timestamp</th><th>User</th><th>Action</th>
              <th>Resource</th><th>IP</th><th>Result</th>
            </tr></thead>
            <tbody>${auditLog.map(e=>`<tr>
              <td class="mono mut" style="font-size:11px;white-space:nowrap">${e[0]}</td>
              <td class="mut" style="font-size:11.5px;white-space:nowrap">${e[1]}</td>
              <td><span class="mono" style="font-size:11px;color:var(--text-2)">${e[2]}</span></td>
              <td class="mut" style="font-size:11.5px">${e[3]}</td>
              <td class="mono mut" style="font-size:10.5px">${e[4]}</td>
              <td>${pill(e[5],e[6])}</td>
            </tr>`).join('')}</tbody></table>
          </div>
        </div>
      </div>
    </div>
  </div>`));
};

/* ---------- A/R & Cash Application ---------- */
VIEWS.ar = (v)=>{
  const AGING = [
    {acct:'Stellar Systems',   inv:'INV-2026-0847', amt:9200,  age:1,  bucket:'Current',  status:'good',  sl:'Current'},
    {acct:'Pinnacle SaaS',     inv:'INV-2026-0846', amt:8500,  age:3,  bucket:'Current',  status:'good',  sl:'Current'},
    {acct:'CloudBase Inc',     inv:'INV-2026-0844', amt:6400,  age:3,  bucket:'Current',  status:'good',  sl:'Current'},
    {acct:'DataVault',         inv:'INV-2026-0839', amt:3100,  age:5,  bucket:'Current',  status:'good',  sl:'Current'},
    {acct:'TechFlow Inc',      inv:'INV-2026-0834', amt:1800,  age:5,  bucket:'Current',  status:'good',  sl:'Current'},
    {acct:'Streamline Co',     inv:'INV-2026-0837', amt:2400,  age:12, bucket:'Current',  status:'good',  sl:'Current'},
    {acct:'Prism Networks',    inv:'INV-2026-0830', amt:1100,  age:18, bucket:'1–30d',    status:'warn',  sl:'1–30 days'},
    {acct:'Ironside Tech',     inv:'INV-2026-0829', amt:1650,  age:22, bucket:'1–30d',    status:'warn',  sl:'1–30 days'},
    {acct:'Bridgepoint',       inv:'INV-2026-0836', amt:2150,  age:28, bucket:'1–30d',    status:'warn',  sl:'1–30 days'},
    {acct:'Apex Systems',      inv:'INV-2026-0843', amt:5800,  age:28, bucket:'1–30d',    status:'warn',  sl:'1–30 days'},
    {acct:'Fulcrum Labs',      inv:'INV-2026-0840', amt:3400,  age:34, bucket:'31–60d',   status:'neg',   sl:'31–60 days'},
    {acct:'Cascade Analytics', inv:'INV-2026-0821', amt:2950,  age:42, bucket:'31–60d',   status:'neg',   sl:'31–60 days'},
  ];
  const BUCKETS = [
    {label:'Current',  val:115700, sub:'0–30 days', color:'var(--good)'},
    {label:'1–30d',    val:28400,  sub:'past due',   color:'var(--warn)'},
    {label:'31–60d',   val:9200,   sub:'at risk',    color:'#f97316'},
    {label:'61–90d',   val:3800,   sub:'escalate',   color:'var(--neg)'},
    {label:'90d+',     val:700,    sub:'write-off?', color:'#9f1239'},
  ];
  const total = BUCKETS.reduce((s,b)=>s+b.val,0);
  const UNAPPLIED = [
    {acct:'Vertex IO',       ref:'WIRE-2026-8821', amt:890,  date:'Jun 26', note:'No remittance data'},
    {acct:'NovaSpark',       ref:'ACH-2026-7740',  amt:780,  date:'Jun 25', note:'Invoice ref missing'},
    {acct:'Orbit Labs',      ref:'ACH-2026-7719',  amt:620,  date:'Jun 24', note:'Partial — short $120'},
  ];
  const bucketColor = (b) => ({Current:'var(--good)','1–30d':'var(--warn)','31–60d':'#f97316','61–90d':'var(--neg)','90d+':'#9f1239'}[b]||'var(--mut)');

  v.appendChild(el(`<div class="view">
    ${pageHead('A/R & Cash Application','Accounts-receivable aging, DSO tracking and incoming cash matching.',
      `<button class="btn ghost" data-act="download" data-arg="xlsx|A/R Aging Report|Jun 28 · generating…">${svg(I.download,14)} Aging Report</button><button class="btn primary" data-act="collectionssweep">Send Statements</button>`)}

    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:16px">
      ${BUCKETS.map(b=>`<div class="card" style="padding:14px 16px">`+
        `<div style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--mut);margin-bottom:6px">${b.label}</div>`+
        `<div class="tnum" style="font-size:22px;font-weight:700;color:${b.color}">${fmt(b.val)}</div>`+
        `<div style="font-size:12px;color:var(--mut);margin-top:3px">${b.sub}</div>`+
        `<div style="margin-top:10px;height:3px;background:var(--border);border-radius:2px">`+
          `<div style="width:${Math.round(b.val/total*100)}%;height:100%;background:${b.color};border-radius:2px"></div>`+
        `</div></div>`).join('')}
    </div>

    <div style="display:grid;grid-template-columns:1fr 280px;gap:16px;margin-bottom:16px">
      <div class="card" style="padding:16px 18px">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:.07em;color:var(--mut);margin-bottom:14px">DSO Trend · Rolling 6 months</div>
        <canvas id="dsoChart" height="110" style="width:100%"></canvas>
        <div style="display:flex;gap:20px;margin-top:14px">
          ${[['Current DSO','28 days','var(--accent)'],['Industry Avg','35 days','var(--mut)'],['Target','25 days','var(--good)']]
            .map(([l,v,c])=>`<div><div style="font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:var(--mut)">${l}</div><div class="tnum" style="font-size:18px;font-weight:700;color:${c}">${v}</div></div>`).join('')}
        </div>
      </div>
      <div class="card" style="padding:16px 18px">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:.07em;color:var(--mut);margin-bottom:12px">Unapplied Cash <span class="pill warn" style="margin-left:6px">3 to match</span></div>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${UNAPPLIED.map(u=>`<div style="padding:10px 12px;background:var(--surface);border:1px solid var(--border);border-radius:6px;border-left:3px solid var(--warn)">`+
            `<div style="display:flex;justify-content:space-between;align-items:baseline">`+
              `<span style="font-size:13px;font-weight:600">${u.acct}</span>`+
              `<span class="tnum" style="font-size:13px;font-weight:700">${fmt(u.amt)}</span>`+
            `</div>`+
            `<div style="font-size:11px;color:var(--mut);margin-top:3px">${u.ref} · ${u.date}</div>`+
            `<div style="font-size:11px;color:var(--warn);margin-top:3px">${u.note}</div>`+
            `<button class="btn ghost" style="font-size:11px;padding:4px 10px;margin-top:8px;height:auto" data-act="manualmatch" data-arg="${u.ref}">Match manually</button>`+
            `</div>`).join('')}
        </div>
      </div>
    </div>

    <div class="card" style="padding:0;overflow:hidden">
      <div style="padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:13px;font-weight:600">Open Receivables <span class="tnum" style="font-weight:400;color:var(--mut)">· ${fmt(total)} total</span></span>
        <span style="font-size:12px;color:var(--mut)">12 invoices · 96.2% collection rate</span>
      </div>
      <div class="table-wrap" style="border:none">
        <table>
          <thead><tr>
            <th>Customer</th>
            <th>Invoice</th>
            <th class="num">Amount</th>
            <th class="num">Age</th>
            <th>Bucket</th>
            <th>Status</th>
            <th></th>
          </tr></thead>
          <tbody>${AGING.map(r=>`<tr>`+
            `<td class="nm">${r.acct}</td>`+
            `<td class="mono mut" style="font-size:12px">${r.inv}</td>`+
            `<td class="num tnum">${fmt(r.amt)}</td>`+
            `<td class="num tnum" style="color:${bucketColor(r.bucket)}">${r.age}d</td>`+
            `<td><span style="font-size:12px;font-weight:600;color:${bucketColor(r.bucket)}">${r.bucket}</span></td>`+
            `<td>${pill(r.status,r.sl)}</td>`+
            `<td style="text-align:right"><button class="btn ghost" style="font-size:11px;padding:4px 8px;height:auto" data-act="account" data-arg="${r.acct}">View</button></td>`+
            `</tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`));

  requestAnimationFrame(()=>{
    const canvas = document.getElementById('dsoChart'); if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.offsetWidth || 400; const H = 110;
    canvas.width = W * devicePixelRatio; canvas.height = H * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    const dso = [34,33,32,31,30,28];
    const ind = [35,35,35,35,35,35];
    const tgt = [25,25,25,25,25,25];
    const pad = {l:28,r:12,t:8,b:28};
    const cw = W-pad.l-pad.r, ch = H-pad.t-pad.b;
    const minV=22, maxV=40;
    const xp = (i)=>pad.l+i*(cw/5);
    const yp = (val)=>pad.t+ch-(val-minV)/(maxV-minV)*ch;
    const style = getComputedStyle(document.documentElement);
    const borderC = style.getPropertyValue('--border').trim()||'#2a2521';
    const textC = style.getPropertyValue('--mut').trim()||'#7a7068';
    [30,35,40].forEach(g=>{
      ctx.beginPath(); ctx.strokeStyle=borderC; ctx.lineWidth=1;
      ctx.moveTo(pad.l, yp(g)); ctx.lineTo(pad.l+cw, yp(g));
      ctx.stroke();
      ctx.fillStyle=textC; ctx.font='10px ui-monospace,monospace'; ctx.textAlign='right';
      ctx.fillText(g, pad.l-4, yp(g)+3);
    });
    ctx.beginPath(); ctx.strokeStyle=borderC; ctx.lineWidth=1.5; ctx.setLineDash([4,4]);
    ind.forEach((v,i)=>i===0?ctx.moveTo(xp(i),yp(v)):ctx.lineTo(xp(i),yp(v))); ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath(); ctx.strokeStyle='#22c55e44'; ctx.lineWidth=1.5; ctx.setLineDash([3,3]);
    tgt.forEach((v,i)=>i===0?ctx.moveTo(xp(i),yp(v)):ctx.lineTo(xp(i),yp(v))); ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    dso.forEach((v,i)=>i===0?ctx.moveTo(xp(i),yp(v)):ctx.lineTo(xp(i),yp(v)));
    const grad = ctx.createLinearGradient(0,pad.t,0,pad.t+ch);
    grad.addColorStop(0,'rgba(255,90,31,0.22)'); grad.addColorStop(1,'rgba(255,90,31,0.02)');
    ctx.lineTo(xp(5),pad.t+ch); ctx.lineTo(xp(0),pad.t+ch); ctx.closePath();
    ctx.fillStyle=grad; ctx.fill();
    ctx.beginPath(); dso.forEach((v,i)=>i===0?ctx.moveTo(xp(i),yp(v)):ctx.lineTo(xp(i),yp(v)));
    ctx.strokeStyle='#ff5a1f'; ctx.lineWidth=2; ctx.stroke();
    ctx.beginPath(); ctx.arc(xp(5),yp(dso[5]),4,0,Math.PI*2);
    ctx.fillStyle='#ff5a1f'; ctx.fill();
    ['Jan','Feb','Mar','Apr','May','Jun'].forEach((m,i)=>{
      ctx.fillStyle=textC; ctx.font='10px ui-monospace,monospace'; ctx.textAlign='center';
      ctx.fillText(m, xp(i), H-8);
    });
  });
};

/* ---------- Customer Portal ---------- */
VIEWS.portal = (v)=>{
  const activity=[
    ['Acme Corp','invoice_viewed','INV-2026-1042 · $96,400','Jun 28, 14:02'],
    ['TechFlow Inc','payment_made','$1,800 via Visa ••4242','Jun 28, 11:47'],
    ['Pinnacle SaaS','invoice_downloaded','INV-2026-1038 (PDF)','Jun 28, 10:33'],
    ['CloudBase Inc','payment_method_updated','Added ACH ••7801','Jun 27, 16:22'],
    ['Streamline Co','support_ticket','Billing question — invoice dates','Jun 27, 14:08'],
    ['DataVault','subscription_viewed','Business+ plan details','Jun 27, 11:55'],
    ['Apex Systems','invoice_viewed','INV-2026-1035 · $5,800','Jun 26, 15:41'],
    ['Meridian Tech','payment_made','$1,450 via ACH ••2204','Jun 26, 13:28'],
    ['Zenith Cloud','invoice_downloaded','INV-2026-1031 (PDF)','Jun 25, 17:03'],
    ['NovaSpark','login','Portal session started','Jun 25, 09:44'],
    ['Fulcrum Labs','subscription_viewed','Business+ — 3 seats added','Jun 24, 16:19'],
    ['Bridgepoint','support_ticket','Payment failure query','Jun 24, 11:52'],
  ];
  const actionColor={'payment_made':'#49c46e','support_ticket':'#e8b23f','login':'#6aa6ff','invoice_viewed':'#b07cff','invoice_downloaded':'#b07cff','payment_method_updated':'#ff8a4c','subscription_viewed':'#2dd4bf'};
  v.appendChild(el(`<div class="view">
    ${pageHead('Customer portal','Self-service billing portal — activity, configuration and branding for your customers.',
      `<button class="btn ghost" data-act="toast" data-arg="Portal link copied to clipboard">${svg(I.send,15)} Copy portal link</button>
       <button class="btn primary" data-act="portaltheme">Customize portal</button>`)}
    <div class="grid kpis" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
      ${kpi('Portal logins (30d)','847','↑ 12% vs prior period',{trend:12})}
      ${kpi('Invoices viewed','1,204','across all customers',{accent:true})}
      ${kpi('Payments made','312','self-serve payments',{trend:8})}
      ${kpi('Support tickets','28','deflection rate 96.7%',{})}
    </div>
    <div class="row">
      <div>
        <div class="sec-title">Portal features</div>
        <div class="card panel">
          <div class="panel-head"><h3>Self-service toggles</h3><span class="sub">per-customer or global</span></div>
          ${
            [
              ['Invoice download','Customers can download PDF invoices directly','on'],
              ['Payment methods','Customers can add, update and remove payment methods','on'],
              ['Usage dashboard','Real-time usage and quota visualisation','on'],
              ['Subscription management','Plan upgrade/downgrade and seat changes','on'],
              ['Support chat','Embedded support widget (Intercom)','off'],
            ].map(t=>`<div class="set-row">
              <div><div class="t">${t[0]}</div><div class="d">${t[1]}</div></div>
              <div class="spacer"></div>
              <div class="toggle ${t[2]}" data-act="toggle"><i></i></div>
            </div>`).join('')
          }
        </div>
        <div class="sec-title">Portal customization</div>
        <div class="card panel">
          <div class="panel-head"><h3>Branding</h3><span class="sub">white-label configuration</span></div>
          <div class="set-row">
            <div><div class="t">Logo</div><div class="d">Shown in portal header and PDF invoices</div></div>
            <div class="spacer"></div>
            <button class="btn ghost" style="padding:6px 12px" data-act="logoupload">Upload</button>
          </div>
          <div class="set-row">
            <div><div class="t">Accent color</div><div class="d">Primary button and link color in the portal</div></div>
            <div class="spacer"></div>
            <div style="display:flex;gap:6px;align-items:center">
              ${['#ff5a1f','#635bff','#0abf53','#00a1e0','#e8b23f'].map(c=>`<span style="width:20px;height:20px;border-radius:50%;background:${c};cursor:pointer;display:inline-block;flex-shrink:0" data-act="toast" data-arg="Portal accent set to ${c}"></span>`).join('')}
            </div>
          </div>
          <div class="set-row">
            <div><div class="t">Custom domain</div><div class="d">billing.yourcompany.com (CNAME required)</div></div>
            <div class="spacer"></div>
            <button class="btn ghost" style="padding:6px 12px" data-act="customdomain">Configure</button>
          </div>
          <div class="set-row">
            <div><div class="t">Invoice footer text</div><div class="d">Legal text shown on every invoice</div></div>
            <div class="spacer"></div>
            <button class="btn ghost" style="padding:6px 12px" data-act="invoicefooter">Edit</button>
          </div>
        </div>
      </div>
      <div>
        <div class="sec-title">Recent portal activity</div>
        <div class="card" style="padding:0">
          <div class="table-wrap" style="border:none;margin:0">
            <table><thead><tr>
              <th>Customer</th><th>Action</th><th>Detail</th><th>Date</th>
            </tr></thead>
            <tbody>${activity.map(a=>{
              const col=actionColor[a[1]]||'#7f7264';
              const label=a[1].replace(/_/g,' ');
              return `<tr>
                <td class="nm">${a[0]}</td>
                <td><span style="font-size:11px;padding:2px 7px;border-radius:5px;background:${col}22;color:${col};font-weight:600;white-space:nowrap">${label}</span></td>
                <td class="mut" style="font-size:12px">${a[2]}</td>
                <td class="mut" style="font-size:11.5px;white-space:nowrap">${a[3]}</td>
              </tr>`;
            }).join('')}</tbody></table>
          </div>
        </div>
      </div>
    </div>
  </div>`));
};

/* ---------- Developers & API ---------- */
VIEWS.developers = (v)=>{
  const apiKeys=[
    ['Live · publishable','pk_live_••••7Qx2','Read-only','Jun 28, 14:31','good','Active'],
    ['Live · secret','sk_live_••••a9Fd','Full access','Jun 28, 14:31','good','Active'],
    ['Test · secret','sk_test_••••0Tz1','Sandbox','Jun 25, 09:44','muted','Sandbox'],
  ];
  const webhooks=[
    ['https://hooks.acme••••.com/billing','invoice.*, payment.*','Jun 28, 14:32','good','Healthy'],
    ['https://api.techfl••••.io/webhooks','subscription.*, usage.*','Jun 28, 11:47','good','Healthy'],
    ['https://crm.salesfo••••.com/inbound','customer.*','Jun 27, 16:22','good','Healthy'],
    ['https://staging.yourco••••.com/test','invoice.*','Jun 20, 10:05','muted','Disabled'],
  ];
  const requests=[
    ['POST','/v1/subscriptions','201','138ms','Jun 28, 14:31','good'],
    ['POST','/v1/usage_records','200','41ms','Jun 28, 14:30','good'],
    ['GET','/v1/invoices','200','58ms','Jun 28, 14:29','good'],
    ['GET','/v1/customers/AC-4821','200','32ms','Jun 28, 14:28','good'],
    ['POST','/v1/payment_intents','402','224ms','Jun 28, 14:22','warn'],
    ['POST','/v1/customers','201','117ms','Jun 28, 13:58','good'],
    ['GET','/v1/subscriptions','200','63ms','Jun 28, 13:51','good'],
    ['PUT','/v1/subscriptions/sub_8821','200','88ms','Jun 28, 13:44','good'],
    ['POST','/v1/invoices/INV-1042/pay','200','191ms','Jun 28, 13:33','good'],
    ['DELETE','/v1/payment_methods/pm_4829','204','44ms','Jun 28, 13:21','good'],
  ];
  const methPill={'POST':'ember','GET':'info','PUT':'warn','DELETE':'crit','PATCH':'muted'};
  v.appendChild(el(`<div class="view">
    ${pageHead('Developers &amp; API','REST API, webhooks, SDKs and sandbox — with idempotency, versioning and live request logging.',
      `<button class="btn ghost" data-act="apidocs">API docs</button>
       <button class="btn primary" data-act="apikey">+ Create key</button>`)}
    <div class="grid kpis" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
      ${kpi('API calls (24h)','42,847','+9% vs 7-day avg',{trend:9,accent:true})}
      ${kpi('Webhooks delivered','1,204','99.7% delivery rate',{trend:0.2})}
      ${kpi('Error rate','0.3%','p4xx + p5xx',{trend:-0.1})}
      ${kpi('Avg latency','124ms','p50 across all endpoints',{trend:-6})}
    </div>
    <div class="sec-title">API keys</div>
    <div class="card" style="padding:0;margin-bottom:0">
      <div class="table-wrap" style="border:none;margin:0">
        <table><thead><tr>
          <th>Label</th><th>Token</th><th>Permissions</th><th>Last used</th><th>Status</th><th></th>
        </tr></thead>
        <tbody>${apiKeys.map(k=>`<tr>
          <td class="nm">${k[0]}</td>
          <td class="mono mut" style="font-size:12px">${k[1]}</td>
          <td class="mut">${k[2]}</td>
          <td class="mut" style="font-size:11.5px">${k[3]}</td>
          <td>${pill(k[4],k[5])}</td>
          <td style="text-align:right"><a class="chip" data-act="rotatekey" data-arg="${k[1]}">Rotate</a></td>
        </tr>`).join('')}</tbody></table>
      </div>
    </div>
    <div class="row" style="margin-top:0">
      <div>
        <div class="sec-title">Webhook endpoints</div>
        <div class="card" style="padding:0">
          <div class="table-wrap" style="border:none;margin:0">
            <table><thead><tr>
              <th>URL</th><th>Events</th><th>Last delivery</th><th>Status</th><th></th>
            </tr></thead>
            <tbody>${webhooks.map(w=>`<tr>
              <td class="mono mut" style="font-size:11px">${w[0]}</td>
              <td class="mut" style="font-size:11.5px">${w[1]}</td>
              <td class="mut" style="font-size:11.5px">${w[2]}</td>
              <td>${pill(w[3],w[4])}</td>
              <td style="text-align:right"><a class="chip" data-act="webhookdetail" data-arg="${w[0]}">Edit</a></td>
            </tr>`).join('')}</tbody></table>
          </div>
        </div>
        <div class="sec-title">SDKs &amp; libraries</div>
        <div class="card" style="padding:14px 16px">
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            ${['Node.js','Python','Go','Ruby','Java','PHP','Swift','.NET'].map(s=>`<span class="chip" data-act="sdkdocs" data-arg="${s}">${s}</span>`).join('')}
          </div>
          <div class="note info" style="margin-top:14px">${svg(I.api,15)}<div>All write calls accept an <b>Idempotency-Key</b> header for safe retries. Pin the API version with <code>delonix-Version: 2026-06-01</code>. Use <code>sk_test_</code> keys for sandbox testing with no side-effects.</div></div>
        </div>
      </div>
      <div>
        <div class="sec-title">Recent API requests</div>
        <div class="card" style="padding:0">
          <div class="table-wrap" style="border:none;margin:0">
            <table><thead><tr>
              <th>Method</th><th>Endpoint</th>
              <th class="num">Status</th><th class="num">Latency</th><th>Time</th>
            </tr></thead>
            <tbody>${requests.map(r=>`<tr>
              <td><span class="pill ${methPill[r[0]]||'muted'}">${r[0]}</span></td>
              <td class="mono mut" style="font-size:11.5px">${r[1]}</td>
              <td class="num"><span style="color:${r[2].startsWith('2')?'var(--good)':r[2].startsWith('4')?'var(--warn)':'var(--crit)'};font-weight:600">${r[2]}</span></td>
              <td class="num">${r[3]}</td>
              <td class="mut" style="font-size:11px;white-space:nowrap">${r[4]}</td>
            </tr>`).join('')}</tbody></table>
          </div>
        </div>
      </div>
    </div>
  </div>`));
};

/* ---------- Integrations ---------- */
VIEWS.integrations = (v)=>{
  const integrations={
    'Payments':[
      ['Stripe','#635bff','Connected · primary gateway','847 invoices synced · 2 min ago','good','Connected'],
      ['Adyen','#0abf53','Connected · EU &amp; APAC','312 transactions · 4 min ago','good','Connected'],
      ['PayPal','#003087','Not connected','—','muted','Connect'],
      ['GoCardless','#2c4ecf','Not connected','—','muted','Connect'],
    ],
    'Accounting':[
      ['NetSuite','#2dbd63','Connected · GL sync nightly','2,841 journal entries · 12 min ago','good','Connected'],
      ['QuickBooks','#2ca01c','Not connected','—','muted','Connect'],
      ['Xero','#13b5ea','Not connected','—','muted','Connect'],
      ['Sage','#00b050','Not connected','—','muted','Connect'],
    ],
    'CRM':[
      ['Salesforce','#00a1e0','Connected · bi-directional','418 accounts synced · 8 min ago','good','Connected'],
      ['HubSpot','#ff7a59','Not connected','—','muted','Connect'],
      ['Pipedrive','#e74c3c','Not connected','—','muted','Connect'],
    ],
    'Banking':[
      ['Plaid','#00d064','Connected · bank verification','20 accounts linked · 1 hr ago','good','Connected'],
      ['Open Banking EU','#0085ff','Connected · PSD2','14 mandates active · 3 hr ago','good','Connected'],
    ],
  };
  const dataFlow=[
    ['Customer master','Salesforce (CRM)','delonix','Salesforce','1,204','2 min ago'],
    ['Subscription state','delonix','NetSuite (GL)','delonix','2,841','12 min ago'],
    ['Payment events','Stripe','delonix','Stripe','3,622','Real-time'],
    ['Invoice ledger','delonix','NetSuite (GL)','delonix','487','12 min ago'],
    ['Bank accounts','Plaid','delonix','Plaid','20','1 hr ago'],
    ['Product catalog','delonix','Salesforce (CRM)','delonix','94','30 min ago'],
  ];
  const bgFor=name=>({
    Stripe:'#635bff',Adyen:'#0abf53',PayPal:'#003087',GoCardless:'#2c4ecf',
    NetSuite:'#2dbd63',QuickBooks:'#2ca01c',Xero:'#13b5ea',Sage:'#00b050',
    Salesforce:'#00a1e0',HubSpot:'#ff7a59',Pipedrive:'#e74c3c',
    Plaid:'#00d064','Open Banking EU':'#0085ff',
  }[name]||'#7f7264');
  v.appendChild(el(`<div class="view">
    ${pageHead('Integrations','Pre-built connectors keeping billing, CRM, GL and banking in sync.',
      `<button class="btn ghost" data-act="integeventlogs">View logs</button>
       <button class="btn primary" data-act="route" data-arg="integrations">Browse marketplace</button>`)}
    <div class="grid kpis" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
      ${kpi('Active connectors','6','of 13 installed',{accent:true})}
      ${kpi('Records synced (24h)','48,621','across 6 integrations',{trend:6})}
      ${kpi('Sync health','100%','no failures in 30d',{})}
      ${kpi('Last sync','2 min ago','Stripe · Salesforce',{})}
    </div>
    ${Object.entries(integrations).map(([cat,items])=>`
      <div class="sec-title">${cat}</div>
      <div class="grid cards-3" style="margin-bottom:4px">
        ${items.map(g=>{
          const color=bgFor(g[0]);
          const isConn=g[5]==='Connected';
          return `<div class="card gw">
            <div class="gi" style="background:${color}22;color:${color};font-size:13px;font-weight:800;letter-spacing:-.3px">${g[0].substring(0,2).toUpperCase()}</div>
            <div style="flex:1;min-width:0">
              <div class="nm">${g[0]}</div>
              <div class="mut" style="font-size:11.5px">${isConn?g[2]:'Not connected'}</div>
              ${isConn?`<div style="font-size:10.5px;color:var(--good);margin-top:2px">${g[3]}</div>`:''}
            </div>
            ${isConn
              ? `<div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px">${pill(g[4],'Active')}<button class="btn ghost" style="padding:4px 10px;font-size:12px" data-act="connectintegration" data-arg="${g[0]}">Manage</button></div>`
              : `<button class="btn ghost" style="padding:5px 11px;font-size:12px" data-act="connectintegration" data-arg="${g[0]}">Connect</button>`
            }
          </div>`;
        }).join('')}
      </div>
    `).join('')}
    <div class="sec-title">Data flow &amp; source of truth</div>
    <div class="card" style="padding:0">
      <div class="table-wrap" style="border:none;margin:0">
        <table><thead><tr>
          <th>Data type</th><th>Source system</th><th>Destination</th>
          <th>Source of truth</th><th class="num">Records</th><th>Last sync</th>
        </tr></thead>
        <tbody>${dataFlow.map(d=>`<tr>
          <td class="nm">${d[0]}</td>
          <td class="mut">${d[1]}</td>
          <td class="mut">${d[2]}</td>
          <td><span style="font-size:11.5px;font-weight:600;color:var(--ember-soft)">${d[3]}</span></td>
          <td class="num tnum">${d[4]}</td>
          <td class="mut" style="font-size:11.5px">${d[5]}</td>
        </tr>`).join('')}</tbody></table>
      </div>
    </div>
  </div>`));
};


/* ---------- Business Units ---------- */
VIEWS.bizunits = (v)=>{
  const buColor = b => b.color||'#888';
  const statusPill = s => s==='active'?pill('good','Active'):s==='migration'?pill('warn','Migration'):pill('muted',s);

  /* GL mapping rows per BU */
  const GL_ROWS = [
    ['Subscription Revenue','4000 · SaaS Revenue','4000 · SaaS Revenue','4000 · SaaS Revenue','4000 · SaaS Revenue','N/A (legacy)'],
    ['Overage / Usage Revenue','4010 · Usage Revenue','4010 · Usage Revenue','4010 · Usage Revenue','4010 · Usage Revenue','N/A'],
    ['Deferred Revenue','2800 · Deferred Rev.','2800 · Deferred Rev.','2800 · Deferred Rev.','2800 · Deferred Rev.','N/A'],
    ['Accounts Receivable','1200 · AR Trade','1200 · AR Trade','1200 · AR Trade','1250 · EU AR','1200 · AR Trade'],
    ['Tax Payable','2100 · Sales Tax','2100 · Sales Tax','2100 · Sales Tax','2110 · EU VAT','2100 · Sales Tax'],
    ['Revenue Contra','4090 · Discounts','4090 · Discounts','4090 · Discounts','4090 · Discounts','N/A'],
  ];

  /* Product availability matrix */
  const PLANS = ['Enterprise Plus','Enterprise','Business+','Business','Starter'];
  const PLAN_AVAIL = [
    [true,true,true,true,false],   // BU-001 Residential
    [true,true,true,true,true],    // BU-002 Commercial
    [true,true,false,false,false], // BU-003 Enterprise Platform
    [true,true,true,false,false],  // BU-004 International
    [false,false,true,true,true],  // BU-005 PropTech (legacy plans only)
  ];

  v.appendChild(el(`<div class="view">
    ${pageHead('Business Units','5 units · 4 legal entities · $418,350 MRR',
      `<button class="btn ghost" data-act="glmapping" data-arg="BU-001">${svg(I.settings,14)} GL Mappings</button><button class="btn primary" data-act="newbizunit">+ New Business Unit</button>`)}

    <div class="grid kpis" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
      ${kpi('Active Business Units','4','1 in migration',{accent:true})}
      ${kpi('Legal Entities','4','3 currencies',{})}
      ${kpi('Total MRR','$418,350','across all BUs',{trend:5.2})}
      ${kpi('Active Subscriptions','689','in 4 BUs',{})}
    </div>

    <div class="val-banner info" style="margin-bottom:16px">${svg(I.bu,15)} <strong>Business Unit</strong> controls invoice branding, legal entity assignment, tax profile, GL export destination, product availability, and default invoice grouping. A single customer may span multiple Business Units.</div>

    <!-- BU Table -->
    <div class="card panel" style="margin-bottom:20px;padding:0;overflow:hidden">
      <div class="panel-head" style="border-bottom:1px solid var(--border)"><h3>All Business Units</h3></div>
      <div class="table-wrap" style="margin:0">
        <table>
          <thead><tr>
            <th>Business Unit</th><th>Brand Name</th><th>Legal Entity</th><th>Currency</th>
            <th>Tax Profile</th><th>GL Export</th><th>Template</th>
            <th class="num">MRR</th><th class="num">Subs</th><th>Status</th><th></th>
          </tr></thead>
          <tbody>${BUS.map(b=>`<tr data-act="bizunit" data-arg="${b.id}" style="cursor:pointer">
            <td><div style="display:flex;align-items:center;gap:8px">
              <span class="bu-dot" style="background:${buColor(b)};width:10px;height:10px;border-radius:50%;flex-shrink:0"></span>
              <strong style="font-size:13px">${b.name}</strong>
            </div></td>
            <td class="mut" style="font-size:12px">${b.brand}</td>
            <td style="font-size:12px">${b.entity}</td>
            <td class="mono mut" style="font-size:12px">${b.currency}</td>
            <td class="mut" style="font-size:11.5px">${b.taxProfile}</td>
            <td class="mut" style="font-size:11.5px">${b.glDest}</td>
            <td class="mut" style="font-size:11.5px">${b.template}</td>
            <td class="num tnum">${b.mrr?fmt(b.mrr):'—'}</td>
            <td class="num tnum">${b.subs}</td>
            <td>${statusPill(b.status)}</td>
            <td class="mut">${svg('<polyline points="9 18 15 12 9 6"/>',14)}</td>
          </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- GL Mapping Overview -->
    <div class="card panel" style="margin-bottom:20px;padding:0;overflow:hidden">
      <div class="panel-head" style="border-bottom:1px solid var(--border)">
        <h3>GL Account Mappings — All Business Units</h3>
        <button class="btn ghost" style="font-size:12px;padding:5px 10px" data-act="glmapping" data-arg="BU-001">Edit Mappings</button>
      </div>
      <div class="table-wrap" style="margin:0">
        <table>
          <thead><tr>
            <th>Revenue Category</th>
            ${BUS.map(b=>`<th><span class="bu-badge"><span class="bu-dot" style="background:${buColor(b)}"></span>${b.name}</span></th>`).join('')}
          </tr></thead>
          <tbody>${GL_ROWS.map(([cat,...accts])=>`<tr>
            <td style="font-size:12.5px;font-weight:600">${cat}</td>
            ${accts.map((a,i)=>`<td class="mono mut" style="font-size:11px;${a==='N/A'||a==='N/A (legacy)'?'color:var(--neg);opacity:.7':''}">${a}</td>`).join('')}
          </tr>`).join('')}</tbody>
        </table>
      </div>
      <div style="padding:10px 16px;border-top:1px solid var(--border);font-size:12px;color:var(--text-2)">
        ${svg(I.warning,13)} <span style="color:var(--warn)">BU-005 (PropTech)</span> has no active GL mappings — all charges route to manual review queue during migration.
      </div>
    </div>

    <!-- Product Availability Matrix -->
    <div class="card panel" style="margin-bottom:20px;padding:0;overflow:hidden">
      <div class="panel-head" style="border-bottom:1px solid var(--border)"><h3>Product Availability Matrix</h3><span class="mut" style="font-size:12px">Which plans are available to sell in each Business Unit</span></div>
      <div class="table-wrap" style="margin:0">
        <table>
          <thead><tr>
            <th>Plan</th>
            ${BUS.map(b=>`<th style="text-align:center"><span class="bu-badge"><span class="bu-dot" style="background:${buColor(b)}"></span>${b.name}</span></th>`).join('')}
          </tr></thead>
          <tbody>${PLANS.map((p,pi)=>`<tr>
            <td style="font-weight:600;font-size:13px">${p}</td>
            ${PLAN_AVAIL.map((buPlans,bi)=>`<td style="text-align:center;font-size:16px">${buPlans[pi]?'<span style="color:var(--pos)">✓</span>':'<span style="color:var(--border-2)">—</span>'}</td>`).join('')}
          </tr>`).join('')}</tbody>
        </table>
      </div>
    </div>

    <!-- Conflicts & Warnings -->
    <div class="card panel" style="padding:0;overflow:hidden">
      <div class="panel-head" style="border-bottom:1px solid var(--border)"><h3>Conflicts &amp; Warnings</h3></div>
      <div style="padding:14px 18px;display:flex;flex-direction:column;gap:10px">
        <div class="val-banner warn">${svg(I.warning,14)}
          <div><strong>BU-005 (PropTech/Acquired)</strong> still uses BuildStream invoice template. 8 customers have finalized invoices with legacy branding.
          <button class="btn ghost" style="margin-left:8px;padding:3px 8px;font-size:12px" data-act="migrationdetail" data-arg="SS-001">View migration status</button></div>
        </div>
        <div class="val-banner warn">${svg(I.warning,14)}
          <div><strong>BU-003 (Enterprise Platform)</strong> and <strong>BU-004 (International)</strong> have different legal entities. Accounts with subscriptions in both BUs require explicit invoice grouping policy or invoices will be split.
          <button class="btn ghost" style="margin-left:8px;padding:3px 8px;font-size:12px" data-act="invgrouping" data-arg="GP-001">Review policies</button></div>
        </div>
        <div class="val-banner info">${svg(I.check,14)} <div>BU-001 through BU-004 all have GL mappings and tax profiles configured. All active subscriptions will invoice normally at next billing cycle.</div></div>
      </div>
    </div>
  </div>`));
};


VIEWS.legalentity = (v)=>{
  /* Tax registrations per entity */
  const TAX_REGS = {
    'LE-001': [
      {jurisdiction:'US Federal',type:'EIN',id:'98-4821034',status:'Active'},
      {jurisdiction:'California',type:'CA SUT',id:'CA-482-103412',status:'Active'},
      {jurisdiction:'New York',type:'NY SUT',id:'NY-73841-9',status:'Active'},
      {jurisdiction:'Texas',type:'TX SUT',id:'TX-1102948-4',status:'Active'},
    ],
    'LE-002': [
      {jurisdiction:'US Federal',type:'EIN',id:'47-9012384',status:'Active'},
      {jurisdiction:'Delaware',type:'DE Franchise',id:'DE-7284012',status:'Active'},
    ],
    'LE-003': [
      {jurisdiction:'Netherlands',type:'VAT',id:'NL004821034B01',status:'Active'},
      {jurisdiction:'EU OSS',type:'VAT OSS',id:'EU-OSS-NL-2024',status:'Active'},
      {jurisdiction:'Germany',type:'DE VAT',id:'DE-482-104823',status:'Active'},
    ],
    'LE-004': [
      {jurisdiction:'England & Wales',type:'VAT',id:'GB 482 1034 82',status:'Inactive (legacy)'},
    ],
  };
  const GL_ACCTS = {
    'LE-001': [['4000','SaaS Revenue'],['2800','Deferred Revenue'],['1200','Accounts Receivable'],['2100','Sales Tax Payable']],
    'LE-002': [['4000','SaaS Revenue'],['2800','Deferred Revenue'],['1200','Accounts Receivable'],['2100','Sales Tax Payable']],
    'LE-003': [['4000','SaaS Revenue EUR'],['2800','Deferred Revenue EUR'],['1250','EU AR Trade'],['2110','EU VAT Payable']],
    'LE-004': [['Legacy','Mapped to BuildStream GL'],['—','Pending migration'],['—','—'],['—','—']],
  };
  v.appendChild(el(`<div class="view">
    ${pageHead('Legal Entities','4 entities · 3 currencies · GL systems: NetSuite, Xero, QuickBooks',
      `<button class="btn ghost" data-act="download" data-arg="xlsx|Tax Registrations|4 entities">${svg(I.download,14)} Export</button><button class="btn primary" data-act="newlegalentity">+ New Legal Entity</button>`)}
    <div class="grid kpis" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
      ${kpi('Legal Entities','4','2 active, 1 legacy, 1 migration',{accent:true})}
      ${kpi('Currencies','3','USD, EUR + legacy GBP',{})}
      ${kpi('GL Systems','3','NetSuite · Xero · QB',{})}
      ${kpi('Tax Jurisdictions','8','across all entities',{})}
    </div>
    <div class="val-banner warn" style="margin-bottom:18px">${svg(I.warning,15)} <strong>Invoices cannot mix charges from different legal entities.</strong> Accounts with subscriptions across multiple legal entities will generate split invoices unless an explicit cross-entity grouping policy is approved by Finance.</div>
    ${LEGAL_ENTITIES.map(e=>`<div class="card panel" style="margin-bottom:16px;padding:0;overflow:hidden">
      <div class="panel-head" style="cursor:pointer;border-bottom:1px solid var(--border)" data-act="legalentity" data-arg="${e.id}">
        <span style="font-size:22px;margin-right:2px">${e.flag}</span>
        <div style="flex:1">
          <div style="font-weight:700;font-size:14px">${e.name}</div>
          <div class="mut" style="font-size:12px">${e.country} · Tax ID: <span class="mono">${e.taxId}</span>${e.vatId&&e.vatId!=='—'?' · VAT: <span class="mono">'+e.vatId+'</span>':''}</div>
        </div>
        <div style="display:flex;align-items:center;gap:12px">
          <div style="text-align:right"><div style="font-weight:600;font-size:13px">${e.currency}</div><div class="mut" style="font-size:11.5px">${e.glSystem}</div></div>
          ${e.status==='migration'?pill('warn','Migration'):e.status==='legacy'?pill('muted','Legacy'):pill('good','Active')}
          <span class="mut">${svg('<polyline points="9 18 15 12 9 6"/>',14)}</span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;border-bottom:1px solid var(--border)">
        <div style="padding:12px 18px;border-right:1px solid var(--border)">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-2);margin-bottom:8px">GL Accounts</div>
          ${(GL_ACCTS[e.id]||[]).map(([code,name])=>`<div style="display:flex;gap:8px;font-size:12px;margin-bottom:4px"><span class="mono mut" style="min-width:60px">${code}</span><span>${name}</span></div>`).join('')}
        </div>
        <div style="padding:12px 18px;border-right:1px solid var(--border)">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-2);margin-bottom:8px">Tax Registrations</div>
          ${(TAX_REGS[e.id]||[]).map(r=>`<div style="font-size:12px;margin-bottom:4px;display:flex;gap:6px;align-items:center">
            <span class="mono mut" style="font-size:11px;min-width:65px">${r.type}</span>
            <span>${r.jurisdiction}</span>
            ${r.status!=='Active'?'<span style="font-size:10.5px;color:var(--warn)">'+r.status+'</span>':''}
          </div>`).join('')}
        </div>
        <div style="padding:12px 18px">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-2);margin-bottom:8px">Active Business Units</div>
          ${e.bUs.map(id=>{const b=BUS.find(x=>x.id===id);return b?`<div class="bu-badge" style="margin-bottom:5px;display:inline-flex;cursor:pointer" data-act="bizunit" data-arg="${id}"><span class="bu-dot" style="background:${b.color}"></span>${b.name}</div> `:'';}).join('')}
          ${e.bUs.length===0?'<div class="mut" style="font-size:12px">No active BUs</div>':''}
          <div style="margin-top:8px">
            <div style="font-size:12px"><span class="mut">AR Account: </span><span class="mono">${e.arAcct}</span></div>
            <div style="font-size:12px;margin-top:3px"><span class="mut">Deferred Rev: </span><span class="mono">${e.deferredAcct}</span></div>
          </div>
        </div>
      </div>
      <div style="padding:10px 18px;display:flex;align-items:center;gap:10px">
        <button class="btn ghost" style="font-size:12px;padding:5px 10px" data-act="legalentity" data-arg="${e.id}">View details</button>
        <button class="btn ghost" style="font-size:12px;padding:5px 10px" data-act="glmapping" data-arg="BU-001">GL Mappings</button>
        ${e.status==='migration'?'<button class="btn ghost" style="font-size:12px;padding:5px 10px" data-act="migrationdetail" data-arg="SS-001">Migration status</button>':''}
        <span class="mut" style="font-size:11.5px;margin-left:auto">Remittance: ${e.remittance||e.name}</span>
      </div>
    </div>`).join('')}
    <div class="card panel" style="padding:0;overflow:hidden">
      <div class="panel-head" style="border-bottom:1px solid var(--border)"><h3>Cross-Entity Boundary Rules</h3></div>
      <div style="padding:14px 18px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
        <div style="padding:12px 14px;border:1px solid var(--border);border-radius:8px">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-2);margin-bottom:6px">Currency Mismatch</div>
          <div style="font-size:12.5px;color:var(--neg);font-weight:600">${svg(I.warning,13)} Blocked by default</div>
          <div class="mut" style="font-size:11.5px;margin-top:4px">USD and EUR cannot appear on the same invoice. Invoices split automatically by legal entity.</div>
        </div>
        <div style="padding:12px 14px;border:1px solid var(--border);border-radius:8px">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-2);margin-bottom:6px">Tax Profile Mismatch</div>
          <div style="font-size:12.5px;color:var(--warn);font-weight:600">${svg(I.warning,13)} Warning + split</div>
          <div class="mut" style="font-size:11.5px;margin-top:4px">US-Residential and EU-VAT cannot be mixed. Invoice splits with Finance warning.</div>
        </div>
        <div style="padding:12px 14px;border:1px solid var(--border);border-radius:8px">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-2);margin-bottom:6px">GL Export Conflict</div>
          <div style="font-size:12.5px;color:var(--warn);font-weight:600">${svg(I.warning,13)} Requires approval</div>
          <div class="mut" style="font-size:11.5px;margin-top:4px">Cross-GL invoices (NetSuite + QuickBooks) require Finance approval before export batch proceeds.</div>
        </div>
      </div>
    </div>
  </div>`));
};

/* ---------- Migration & Source Systems ---------- */
VIEWS.migration = (v)=>{
  const recons = [
    {metric:'Customer records',legacy:'312',current:'289',delta:'-23',note:'23 pending mapping',status:'warn'},
    {metric:'Active subscriptions',legacy:'308',current:'289',delta:'-19',note:'19 remapped to BU-001/002',status:'ok'},
    {metric:'Invoice total (May 2026)',legacy:'$1,847,200',current:'$1,846,850',delta:'-$350',note:'Rounding & proration diff',status:'ok'},
    {metric:'Revenue recognized (May 2026)',legacy:'$142,800',current:'$143,100',delta:'+$300',note:'Tax recalculation applied',status:'ok'},
    {metric:'Open AR balance',legacy:'$24,200',current:'$23,850',delta:'-$350',note:'Void + re-bill corrections',status:'ok'},
    {metric:'Usage events ingested',legacy:'N/A',current:'47,214',delta:'47,214',note:'All BuildStream events imported',status:'ok'},
    {metric:'Failed usage events',legacy:'N/A',current:'23',delta:'23',note:'23 events need source mapping',status:'warn'},
    {metric:'Product SKU mappings',legacy:'14',current:'11',delta:'-3',note:'3 legacy SKUs unmapped',status:'warn'},
  ];

  const unresolved = [
    {legacyId:'BS-CUST-4821',name:'Riverfront Properties',product:'BuildStream Pro',issue:'No matching delonix account',severity:'crit'},
    {legacyId:'BS-CUST-4798',name:'Harborview Mgmt',product:'BuildStream Enterprise',issue:'Product SKU not found in BU-001',severity:'warn'},
    {legacyId:'BS-CUST-4791',name:'Meadow Creek HOA',product:'BuildStream Starter',issue:'Duplicate customer detected — may be alias',severity:'crit'},
    {legacyId:'BS-CUST-4765',name:'Sunrise Capital Group',product:'BuildStream Pro',issue:'Multiple delonix accounts match',severity:'warn'},
    {legacyId:'BS-CUST-4758',name:'Pacific Coast Properties',product:'BuildStream Enterprise',issue:'Missing invoice contact email',severity:'warn'},
    {legacyId:'BS-CUST-4742',name:'Lakefront Estates LLC',product:'BuildStream Pro',issue:'Currency mismatch: GBP vs USD',severity:'crit'},
  ];

  const idMappings = [
    {legacy:'BS-CUST-0001',current:'ACC-2024-0847',type:'Customer',status:'ok',confidence:'High',batch:'BATCH-MIG-001'},
    {legacy:'BS-CUST-0002',current:'ACC-2024-0848',type:'Customer',status:'ok',confidence:'High',batch:'BATCH-MIG-001'},
    {legacy:'BS-CUST-0003',current:'ACC-2024-0851',type:'Customer',status:'ok',confidence:'Medium',batch:'BATCH-MIG-001'},
    {legacy:'BS-INV-10291',current:'INV-2026-0812',type:'Invoice',status:'ok',confidence:'High',batch:'BATCH-MIG-002'},
    {legacy:'BS-INV-10290',current:'INV-2026-0811',type:'Invoice',status:'ok',confidence:'High',batch:'BATCH-MIG-002'},
    {legacy:'BS-PROD-PRO',current:'PLN-ENTERPRISE',type:'Product',status:'ok',confidence:'High',batch:'BATCH-MIG-001'},
    {legacy:'BS-PROD-ENT',current:'PLN-ENTERPRISE-PLUS',type:'Product',status:'ok',confidence:'Medium',batch:'BATCH-MIG-001'},
    {legacy:'BS-PROD-STR',current:'—',type:'Product',status:'warn',confidence:'None',batch:'BATCH-MIG-001'},
  ];

  const batches = [
    {id:'BATCH-MIG-003',desc:'Failed usage events + 3 unresolved customers',started:'Jun 28 · 08:00',status:'running',pct:45},
    {id:'BATCH-MIG-002',desc:'Invoice history import — 1,847 invoices',started:'Jun 20 · 02:00',status:'complete',pct:100},
    {id:'BATCH-MIG-001',desc:'Customer + subscription initial migration — 312 accounts',started:'Jun 10 · 02:00',status:'complete',pct:100},
  ];

  v.appendChild(el(`<div class="view">
    ${pageHead('Migration & Source Systems','BuildStream acquisition · 312 legacy customers · 3 source systems',
      `<button class="btn ghost" data-act="download" data-arg="xlsx|Migration Reconciliation Report|BuildStream">${svg(I.download,14)} Export Report</button><button class="btn primary" data-act="migrationdetail" data-arg="bulk">Bulk Map</button>`)}

    <div class="grid kpis" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
      ${kpi('Legacy Customers','312','from BuildStream acquisition',{accent:true})}
      ${kpi('Mapped','289','93% complete',{trend:6.1})}
      ${kpi('Unresolved','23','need manual mapping',{})}
      ${kpi('Revenue Variance','-$350','invoice total diff — within tolerance',{})}
    </div>

    <!-- Source Systems -->
    <div class="card panel" style="margin-bottom:20px;padding:0;overflow:hidden">
      <div class="panel-head" style="border-bottom:1px solid var(--border)"><h3>Source Systems</h3></div>
      <div class="table-wrap" style="margin:0">
        <table>
          <thead><tr><th>System</th><th>Type</th><th>Records</th><th>Last Sync</th><th>Coverage</th><th>Status</th><th></th></tr></thead>
          <tbody>
            ${SOURCE_SYSTEMS.map(s=>`<tr data-act="migrationdetail" data-arg="${s.id}" style="cursor:pointer">
              <td style="font-weight:600;font-size:13px">${s.name}</td>
              <td class="mut" style="font-size:12px">${s.type}</td>
              <td class="tnum" style="font-size:12.5px">${s.records}</td>
              <td class="mut tnum" style="font-size:11.5px">${s.lastSync}</td>
              <td style="font-size:12px">${s.coverage}</td>
              <td>${s.status==='active'?pill('good','Active'):s.status==='complete'?pill('ember','Complete'):pill('warn',s.status)}</td>
              <td class="mut">${svg('<polyline points="9 18 15 12 9 6"/>',14)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Migration Batches -->
    <div class="card panel" style="margin-bottom:20px;padding:0;overflow:hidden">
      <div class="panel-head" style="border-bottom:1px solid var(--border)"><h3>Migration Batches</h3></div>
      <div style="padding:14px 18px;display:flex;flex-direction:column;gap:10px">
        ${batches.map(b=>`<div style="padding:12px 16px;border:1px solid var(--border);border-radius:8px;background:var(--surface)">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
            <span class="mono mut" style="font-size:12px">${b.id}</span>
            <span style="font-size:13px;font-weight:600;flex:1">${b.desc}</span>
            ${b.status==='complete'?pill('good','Complete'):b.status==='running'?pill('ember','Running'):pill('warn',b.status)}
            <span class="mut" style="font-size:11.5px">${b.started}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <div style="flex:1;height:6px;background:var(--border);border-radius:3px;overflow:hidden">
              <div style="width:${b.pct}%;height:100%;background:${b.pct===100?'var(--pos)':'var(--ember)'}"></div>
            </div>
            <span class="mut" style="font-size:11.5px;font-variant-numeric:tabular-nums;min-width:35px">${b.pct}%</span>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Reconciliation -->
    <div class="card panel" style="margin-bottom:20px;padding:0;overflow:hidden">
      <div class="panel-head" style="border-bottom:1px solid var(--border)">
        <h3>BuildStream Reconciliation — May 2026</h3>
        <span class="mut" style="font-size:12px">Last run: Jun 28 · 02:00 AM · auto-runs nightly</span>
      </div>
      <div style="padding:0 18px 18px">
        <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1.5fr;gap:0;padding:8px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-2);border-bottom:1px solid var(--border)">
          <div>Metric</div><div class="num">Legacy (BuildStream)</div><div class="num">Current (delonix)</div><div class="num">Delta</div>
        </div>
        ${recons.map(r=>`<div style="display:grid;grid-template-columns:2fr 1fr 1fr 1.5fr;gap:0;padding:8px 0;border-bottom:1px solid var(--border);align-items:center">
          <div style="font-size:13px;font-weight:600">${r.metric}</div>
          <div class="num tnum" style="font-size:13px">${r.legacy}</div>
          <div class="num tnum" style="font-size:13px">${r.current}</div>
          <div class="num tnum" style="font-size:13px;font-weight:600;color:${r.status==='warn'?'var(--warn)':'var(--text)'}">
            ${r.delta} <span class="mut" style="font-weight:400;font-size:11px">${r.note}</span>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Unresolved Customers -->
    <div class="card panel" style="margin-bottom:20px;padding:0;overflow:hidden">
      <div class="panel-head" style="border-bottom:1px solid var(--border)">
        <h3>Unresolved Customers (${unresolved.length})</h3>
        <button class="btn ghost" style="font-size:12px;padding:5px 10px" data-act="migrationdetail" data-arg="bulk">Bulk Map</button>
      </div>
      <div class="table-wrap" style="margin:0">
        <table>
          <thead><tr><th>Legacy ID</th><th>Legacy Name</th><th>Legacy Product</th><th>Issue</th><th>Severity</th><th>Actions</th></tr></thead>
          <tbody>${unresolved.map(u=>`<tr>
            <td class="mono mut" style="font-size:11.5px">${u.legacyId}</td>
            <td style="font-size:13px;font-weight:600">${u.name}</td>
            <td class="mut" style="font-size:12px">${u.product}</td>
            <td style="font-size:12px;color:${u.severity==='crit'?'var(--neg)':'var(--warn)'}">${u.issue}</td>
            <td>${u.severity==='crit'?pill('crit','Critical'):pill('warn','Warning')}</td>
            <td><button class="btn ghost" style="padding:4px 9px;font-size:11px" data-act="migrationdetail" data-arg="${u.legacyId}">${u.severity==='crit'?'Resolve':'Map'}</button></td>
          </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Legacy ID Mapping Table -->
    <div class="card panel" style="padding:0;overflow:hidden">
      <div class="panel-head" style="border-bottom:1px solid var(--border)">
        <h3>Legacy ID Mappings</h3>
        <span class="mut" style="font-size:12px">${idMappings.filter(m=>m.status==='ok').length}/${idMappings.length} mapped · showing sample</span>
        <button class="btn ghost" style="font-size:12px;padding:5px 10px;margin-left:8px" data-act="download" data-arg="csv|Legacy ID Mapping|full export">Export All</button>
      </div>
      <div class="table-wrap" style="margin:0">
        <table>
          <thead><tr><th>Legacy ID</th><th>Type</th><th>Maps To</th><th>Batch</th><th>Confidence</th><th>Status</th></tr></thead>
          <tbody>${idMappings.map(m=>`<tr>
            <td class="mono mut" style="font-size:11.5px">${m.legacy}</td>
            <td class="mut" style="font-size:12px">${m.type}</td>
            <td class="mono" style="font-size:11.5px;${m.current==='—'?'color:var(--neg)':''}">${m.current}</td>
            <td class="mono mut" style="font-size:11px">${m.batch}</td>
            <td style="font-size:12px;color:${m.confidence==='High'?'var(--pos)':m.confidence==='Medium'?'var(--text)':m.confidence==='None'?'var(--neg)':'var(--warn)'}">${m.confidence}</td>
            <td>${m.status==='ok'?pill('good','Mapped'):pill('warn','Unmapped')}</td>
          </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`));
};


VIEWS.settings = (v)=>{
  requestAnimationFrame(()=>{
    const p=document.getElementById('themePicker');if(p)buildThemePicker(p);
    // Build settings accent swatches
    const ar=document.getElementById('settingsAccentRow');
    if(ar&&!ar.dataset.built){
      ar.dataset.built='1';
      const curAccent=localStorage.getItem('dlx-accent')||'';
      ACCENT_PRESETS.forEach(a=>{
        const sw=document.createElement('span');
        sw.className='accent-swatch'+(curAccent===a.hex?' active':'');
        sw.title=a.label;sw.dataset.hex=a.hex;
        sw.style.cssText=`background:${a.hex};width:24px;height:24px;border-radius:50%;cursor:pointer;display:inline-block;border:2px solid transparent;transition:transform .12s,border-color .12s;flex-shrink:0`;
        sw.addEventListener('click',()=>setAccentColor(a.hex));
        ar.appendChild(sw);
      });
      const wrap=document.createElement('div');
      wrap.style.cssText='display:flex;align-items:center;gap:4px;margin-left:4px';
      wrap.innerHTML='<input type="color" id="settingsColorPicker" value="#ff5a1f" style="width:24px;height:24px;border-radius:50%;border:2px solid var(--border-2);padding:0;cursor:pointer"><span style="font-size:11px;color:var(--text-3);margin-left:2px">Custom</span>';
      wrap.querySelector('input').addEventListener('input',e=>setAccentColor(e.target.value));
      ar.appendChild(wrap);
      // Sync density buttons
      const saved=localStorage.getItem('dlx-density')||'default';
      document.querySelectorAll('.settings-d-btn').forEach(b=>b.classList.toggle('active',b.dataset.arg===saved));
    }
  });
  v.appendChild(el(`<div class="view">
    ${pageHead('Settings','Billing configuration, payment gateways, team access and audit trail.','')}
            <div class="card panel" style="margin-bottom:16px">
          <div class="panel-head"><h3>Appearance</h3></div>
          <div style="padding:0 18px 18px">
            <div style="font-size:11px;letter-spacing:.6px;text-transform:uppercase;color:var(--text-3);font-weight:700;padding:12px 0 8px">Color theme</div>
            <div class="theme-picker-grid" id="themePicker"></div>
            <div style="font-size:11px;letter-spacing:.6px;text-transform:uppercase;color:var(--text-3);font-weight:700;padding:18px 0 8px">Accent color</div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap" id="settingsAccentRow">
              <span style="font-size:12px;color:var(--text-2)">Preset:</span>
            </div>
            <div style="font-size:11px;letter-spacing:.6px;text-transform:uppercase;color:var(--text-3);font-weight:700;padding:18px 0 8px">Data density</div>
            <div style="display:flex;gap:8px">
              <button class="d-btn settings-d-btn" data-act="density" data-arg="compact" style="flex:1;padding:8px 0;border-radius:6px;border:1px solid var(--border-2);background:var(--surface-2);cursor:pointer;font-size:12px;color:var(--text-2);font-weight:600">Compact</button>
              <button class="d-btn settings-d-btn active" data-act="density" data-arg="default" style="flex:1;padding:8px 0;border-radius:6px;border:1px solid var(--border-2);background:var(--surface-2);cursor:pointer;font-size:12px;color:var(--text-2);font-weight:600">Default</button>
              <button class="d-btn settings-d-btn" data-act="density" data-arg="spacious" style="flex:1;padding:8px 0;border-radius:6px;border:1px solid var(--border-2);background:var(--surface-2);cursor:pointer;font-size:12px;color:var(--text-2);font-weight:600">Spacious</button>
            </div>
          </div>
        </div>
    <div class="two-col">
      <div>
        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-head"><h3>Billing configuration</h3></div>
          <div class="set-row"><div><div class="t">Auto-collection</div><div class="d">Automatically charge saved payment methods on due date</div></div><div class="spacer"></div><div class="toggle on" data-act="toggle"><i></i></div></div>
          <div class="set-row"><div><div class="t">Smart dunning retries</div><div class="d">ML-optimized retry timing for failed payments</div></div><div class="spacer"></div><div class="toggle on" data-act="toggle"><i></i></div></div>
          <div class="set-row"><div><div class="t">Proration</div><div class="d">Prorate mid-cycle upgrades and downgrades</div></div><div class="spacer"></div><div class="toggle on" data-act="toggle"><i></i></div></div>
          <div class="set-row"><div><div class="t">Multi-currency invoicing</div><div class="d">Invoice in customer's local currency</div></div><div class="spacer"></div><div class="toggle on" data-act="toggle"><i></i></div></div>
          <div class="set-row"><div><div class="t">Revenue recognition (ASC 606)</div><div class="d">Generate deferred revenue schedules</div></div><div class="spacer"></div><div class="toggle on" data-act="toggle"><i></i></div></div>
        </div>
        <div class="card panel">
          <div class="panel-head"><h3>Team & permissions</h3><div class="right"><button class="btn ghost" style="padding:5px 10px" data-act="inviteusr">+ Invite</button></div></div>
          <div class="table-wrap" style="border:none"><table style="min-width:0"><thead><tr><th>Member</th><th>Role</th><th>Access</th></tr></thead>
          <tbody>${[['Amir Bukhari','Admin','Full'],['M. Reyes','Revenue Manager','Billing, A/R'],['D. Cho','Collections','A/R, Dunning'],['P. Anand','Sales Ops','Quotes'],['Auditor (read-only)','Viewer','Reports']]
            .map(r=>`<tr><td class="nm">${r[0]}</td><td>${pill(r[1]==='Admin'?'ember':'muted',r[1])}</td><td class="mut">${r[2]}</td></tr>`).join('')}</tbody></table></div>
        </div>
      </div>
      <div>
        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-head"><h3>Payment gateways</h3></div>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${[['Stripe','#635bff','Connected · primary','good','Live'],['Adyen','#0abf53','Connected · EU/APAC','good','Live'],['PayPal','#003087','Not connected','muted','Off'],['NetSuite (GL sync)','#1f7a3d','Syncing nightly','good','Live']]
              .map(g=>`<div class="gw"><div class="gi" style="background:${g[1]}22;color:${g[1]}">${g[0][0]}</div><div style="flex:1"><div class="nm">${g[0]}</div><div class="mut">${g[2]}</div></div>${pill(g[3],g[4])}</div>`).join('')}
          </div>
        </div>
        <div class="card panel">
          <div class="panel-head"><h3>Audit log</h3><span class="sub">immutable</span></div>
          <div class="activity">
            ${[['Amir Bukhari','enabled smart dunning retries','2m'],['M. Reyes','voided INV-2026-1033','1h'],['System','closed May period','2d'],['D. Cho','refunded $400 to Solstice Media','3d'],['P. Anand','approved Q-2026-315','4d']]
              .map(r=>`<div class="act"><div class="ai">${svg(I.settings,15)}</div><div><div class="at">${r[0]}</div><div class="am">${r[1]}</div></div><time>${r[2]}</time></div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`));
};

/* ============================================================
   AI Insights view
   ============================================================ */
VIEWS.aiinsights = (v)=>{
  v.appendChild(el(`<div class="view">
  ${pageHead('AI Insights','Natural language analytics, anomaly detection and revenue forecasting — powered by Ember AI',
    `<button class="btn ghost" data-act="scheduledigest" data-arg="">Schedule digest</button>`
  )}
    <div style="margin-bottom:18px;display:flex;gap:10px;align-items:center">
      <div style="flex:1;display:flex;align-items:center;gap:10px;background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:10px 14px">
        ${svg(I.ai,16)}<input class="finput" style="border:none;background:transparent;flex:1;font-size:14px;padding:0" placeholder="Ask your data… e.g. "Which cohorts have net retention above 110%?"" oninput="filterAIQuery(this.value)">
        <button class="btn primary" style="padding:5px 14px;font-size:13px" data-act="aiquery">Ask Ember</button>
      </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:18px">
      ${[
        {label:'Anomalies detected', val:'4', sub:'Last 7 days', color:'var(--crit)', icon:'dunning'},
        {label:'Forecast accuracy', val:'94.2%', sub:'vs actual last quarter', color:'var(--ok)', icon:'reports'},
        {label:'AI recommendations', val:'12', sub:'Revenue-impacting', color:'var(--ember)', icon:'ai'},
      ].map(k=>`
        <div class="kpi-card" style="cursor:default">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div class="kl">${k.label}</div>
            <div style="color:${k.color};opacity:.7">${svg(I[k.icon],16)}</div>
          </div>
          <div class="kv" style="font-size:26px;font-weight:700;color:${k.color}">${k.val}</div>
          <div class="ks">${k.sub}</div>
        </div>`).join('')}
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
      <div class="card panel">
        <div class="panel-head"><h3>${svg(I.dunning,14)} Anomalies</h3><span class="pill crit">4 active</span></div>
        <div style="display:flex;flex-direction:column;gap:2px">
          ${[
            {sev:'crit', title:'Churn spike — Cobalt Robotics segment', detail:'Gross churn 4.2% this week vs 1.1% baseline. 3 Enterprise accounts flagged for cancellation intent.', act:'accountseg'},
            {sev:'warn', title:'Invoice aging outlier — Helios Manufacturing', detail:'DSO 68 days vs account average of 41. Pattern consistent with payment dispute — recommend escalation.', act:'colldetail'},
            {sev:'warn', title:'Usage overrun — API tier mismatch', detail:'14 accounts consuming >2× plan limit for 3+ weeks. Estimated missed revenue: $18,400/mo.', act:'usage'},
            {sev:'info', title:'MRR bridge discrepancy', detail:'$2,100 gap between recognized MRR and subscription system. Likely draft invoice not finalized.', act:'invoices'},
          ].map(a=>`
            <div class="act" style="cursor:pointer;padding:10px 0;border-bottom:1px solid var(--border)" data-act="route" data-arg="${a.act}">
              <div style="margin-right:10px">${a.sev==='crit'?pill('crit','Critical'):a.sev==='warn'?pill('warn','Warning'):pill('info','Info')}</div>
              <div style="flex:1">
                <div style="font-size:13px;font-weight:600;margin-bottom:2px">${a.title}</div>
                <div class="mut" style="font-size:12px">${a.detail}</div>
              </div>
              <div style="color:var(--text-3)">${svg(I.migration,14)}</div>
            </div>`).join('')}
        </div>
      </div>

      <div class="card panel">
        <div class="panel-head"><h3>${svg(I.reports,14)} Revenue forecast</h3><span class="sub">12-month · 90% CI</span></div>
        <canvas id="forecastChart" height="180" style="width:100%;margin-bottom:12px"></canvas>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;font-size:12px">
          ${[['Jul 2026 MRR','$436k','+4.2%','ok'],['ARR exit (Dec)','$5.61M','+11.7%','ok'],['Churn risk','$42k','↑ flagged','warn']].map(r=>`
            <div style="padding:8px;background:var(--surface);border-radius:6px">
              <div class="mut">${r[0]}</div>
              <div style="font-weight:700;font-size:14px;color:var(--${r[3]==='ok'?'ok':'warn'})">${r[1]}</div>
              <div class="mut" style="font-size:11px">${r[2]}</div>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px">
      <div class="card panel">
        <div class="panel-head"><h3>${svg(I.ai,14)} Ember recommendations</h3><span class="sub">Revenue-impacting · updated Jun 28</span></div>
        <div style="display:flex;flex-direction:column;gap:0">
          ${[
            {tag:'Expansion',  tagc:'ok',   title:'Upgrade 14 usage-overrun accounts to Business+', impact:'+$18,400 MRR', effort:'Low — automated email sequence ready', action:'newsub'},
            {tag:'Retention',  tagc:'warn', title:'Proactive outreach for 3 at-risk Enterprise accounts', impact:'Protect $287k ARR', effort:'Medium — CSM assignment recommended', action:'dunning'},
            {tag:'Pricing',    tagc:'info', title:'Introduce API overage tier for top 8 API consumers', impact:'+$9,200 MRR', effort:'Low — update plan entitlements', action:'catalog'},
            {tag:'Efficiency', tagc:'muted',title:'Consolidate 38 stale draft invoices from May period', impact:'Clean close cycle', effort:'Low — batch finalize available', action:'invoices'},
            {tag:'Expansion',  tagc:'ok',   title:'Renewal risk: 7 Enterprise contracts expire in 90 days', impact:'$487k ARR at risk', effort:'High — NDA + pricing review required', action:'quotes'},
          ].map(r=>`
            <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);cursor:pointer" data-act="route" data-arg="${r.action}">
              <div style="min-width:72px">${pill(r.tagc, r.tag)}</div>
              <div style="flex:1">
                <div style="font-size:13px;font-weight:600;margin-bottom:2px">${r.title}</div>
                <div class="mut" style="font-size:12px">${r.impact} · ${r.effort}</div>
              </div>
              <button class="btn ghost" style="font-size:11px;padding:3px 9px;white-space:nowrap" data-act="route" data-arg="${r.action}">Review →</button>
            </div>`).join('')}
        </div>
      </div>

      <div class="card panel">
        <div class="panel-head"><h3>${svg(I.ai,14)} Recent queries</h3></div>
        <div style="display:flex;flex-direction:column;gap:6px">
          ${[
            'Show me all accounts with NRR > 115% in Q2',
            'Which plans have the highest expansion rate?',
            'Compare churn by acquisition cohort 2023 vs 2024',
            'MRR movement bridge last 6 months by BU',
            'Top 10 accounts by expansion revenue YTD',
          ].map(q=>`
            <div style="padding:8px 10px;background:var(--surface);border-radius:6px;font-size:12.5px;cursor:pointer;display:flex;align-items:center;gap:8px" data-act="aiquery" data-arg="${q}">
              ${svg(I.ai,13)}<span class="mut">${q}</span>
            </div>`).join('')}
        </div>
        <button class="btn ghost" style="width:100%;margin-top:10px;justify-content:center" data-act="toast" data-arg="Opening AI query history">View all queries</button>
      </div>
    </div>
  </div>`));
  // draw forecast sparkline
  setTimeout(()=>{
    const c=document.getElementById('forecastChart'); if(!c) return;
    const ctx=c.getContext('2d'); const W=c.offsetWidth||400; c.width=W; c.height=180;
    const pts=[418,424,430,436,440,446,453,459,464,470,476,483];
    const mn=380,mx=520,h=160,pad=20;
    const x=(i)=>pad+(i/(pts.length-1))*(W-2*pad);
    const y=(v)=>h+pad-((v-mn)/(mx-mn))*h;
    // CI band
    ctx.beginPath();
    pts.forEach((v,i)=>{ const lo=v-i*2.5,hi=v+i*2.5; if(i===0) ctx.moveTo(x(i),y(hi)); else ctx.lineTo(x(i),y(hi)); });
    [...pts].reverse().forEach((v,i)=>{ const ri=pts.length-1-i; ctx.lineTo(x(ri),y(v-ri*2.5)); });
    ctx.closePath(); ctx.fillStyle='rgba(255,90,31,0.1)'; ctx.fill();
    // actual / forecast line
    ctx.beginPath(); pts.forEach((v,i)=>{ i===0?ctx.moveTo(x(i),y(v)):ctx.lineTo(x(i),y(v)); });
    ctx.strokeStyle='var(--ember,#ff5a1f)'; ctx.lineWidth=2; ctx.stroke();
    // month labels
    ctx.fillStyle='#888'; ctx.font='10px sans-serif'; ctx.textAlign='center';
    ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'].forEach((m,i)=>ctx.fillText(m,x(i),180));
  },100);
};

/* ============================================================
   Pricing Calculator Builder view
   ============================================================ */
VIEWS.calculator = (v)=>{
  const CALCS = [
    {id:'CALC-001',name:'Enterprise ROI Calculator',status:'published',views:1284,leads:87,lastEdit:'Jun 22',url:'calc.delonix.io/enterprise-roi'},
    {id:'CALC-002',name:'API Pricing Estimator',status:'published',views:632,leads:41,lastEdit:'Jun 15',url:'calc.delonix.io/api-pricing'},
    {id:'CALC-003',name:'TCO vs Legacy System',status:'draft',views:0,leads:0,lastEdit:'Jun 27',url:'—'},
    {id:'CALC-004',name:'Multi-Site Property Manager',status:'published',views:319,leads:22,lastEdit:'May 30',url:'calc.delonix.io/property'},
  ];
  v.appendChild(el(`<div class="view">
  ${pageHead('Pricing Calculator','Build and embed interactive pricing calculators for sales, website and customer portal',
    `<button class="btn ghost" data-act="toast" data-arg="Opening template library…">Browse templates</button>
     <button class="btn primary" data-act="newcalculator">+ New calculator</button>`
  )}
    <div style="display:flex;justify-content:flex-end;gap:10px;margin-bottom:18px;display:none">
      <button class="btn ghost" data-act="toast" data-arg="Opening template library…">Browse templates</button>
      <button class="btn primary" data-act="newcalculator">+ New calculator</button>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">
      ${CALCS.map(c=>`
        <div class="card" style="padding:18px;cursor:pointer" data-act="editcalculator" data-arg="${c.id}">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
            <div>
              <div style="font-size:15px;font-weight:650;margin-bottom:4px">${c.name}</div>
              <div class="mut" style="font-size:12px">${c.id} · edited ${c.lastEdit}</div>
            </div>
            ${c.status==='published'?pill('ok','Published'):pill('muted','Draft')}
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px">
            <div style="background:var(--surface);padding:8px;border-radius:6px;text-align:center">
              <div style="font-size:18px;font-weight:700">${c.views.toLocaleString()}</div>
              <div class="mut" style="font-size:11px">Views</div>
            </div>
            <div style="background:var(--surface);padding:8px;border-radius:6px;text-align:center">
              <div style="font-size:18px;font-weight:700;color:var(--ok)">${c.leads}</div>
              <div class="mut" style="font-size:11px">Leads</div>
            </div>
            <div style="background:var(--surface);padding:8px;border-radius:6px;text-align:center">
              <div style="font-size:18px;font-weight:700">${c.leads&&c.views?Math.round(c.leads/c.views*100):0}%</div>
              <div class="mut" style="font-size:11px">Conversion</div>
            </div>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn ghost" style="flex:1;justify-content:center;font-size:12px" data-act="editcalculator" data-arg="${c.id}">${svg(I.settings,13)} Edit</button>
            ${c.status==='published'?`<button class="btn ghost" style="flex:1;justify-content:center;font-size:12px" data-act="toast" data-arg="Copied embed code for ${c.name}">${svg(I.api,13)} Embed</button>`:''}
            <button class="btn ghost" style="flex:1;justify-content:center;font-size:12px" data-act="toast" data-arg="Opening preview for ${c.name}">${svg(I.portal,13)} Preview</button>
          </div>
        </div>`).join('')}
    </div>

    <div class="card panel">
      <div class="panel-head"><h3>Calculator builder</h3><span class="sub">Live preview — Enterprise ROI Calculator</span></div>
      <div style="display:grid;grid-template-columns:280px 1fr;gap:0;min-height:400px;border:1px solid var(--border);border-radius:8px;overflow:hidden">
        <div style="background:var(--surface);border-right:1px solid var(--border);padding:14px">
          <div style="font-size:11px;font-weight:700;color:var(--text-3);letter-spacing:.08em;margin-bottom:10px">INPUTS</div>
          ${[
            {label:'Number of units', type:'slider', val:'120', min:'10', max:'500', step:'10'},
            {label:'Average monthly rent', type:'number', val:'2,400', prefix:'$'},
            {label:'Current software cost', type:'number', val:'3,200', prefix:'$', suffix:'/mo'},
            {label:'Staff time on billing', type:'slider', val:'8', min:'1', max:'40', suffix:'hrs/wk'},
            {label:'Payment processing fee', type:'select', val:'2.9%', opts:['1.5%','2.2%','2.9%','Custom']},
          ].map(f=>`
            <div class="fg" style="margin-bottom:10px">
              <label style="font-size:12px;font-weight:600;display:flex;justify-content:space-between">
                ${f.label}
                <span class="mut" style="font-size:11px;cursor:pointer" data-act="toast" data-arg="Field settings for ${f.label}">⚙</span>
              </label>
              ${f.type==='slider'?`
                <input type="range" class="finput" min="${f.min}" max="${f.max}" step="${f.step}" value="${f.val}" style="padding:4px 0;height:auto">
                <div style="font-size:12px;color:var(--ember);font-weight:600">${f.prefix||''}${f.val}${f.suffix||''}</div>
              `:f.type==='select'?`
                <select class="finput" style="font-size:12px">${f.opts.map(o=>`<option${o===f.val?' selected':''}>${o}</option>`).join('')}</select>
              `:`
                <div style="display:flex;align-items:center;gap:4px">
                  ${f.prefix?`<span class="mut">${f.prefix}</span>`:''}
                  <input class="finput" value="${f.val}" style="font-size:13px">
                  ${f.suffix?`<span class="mut">${f.suffix}</span>`:''}
                </div>`}
            </div>`).join('')}
          <button class="btn ghost" style="width:100%;justify-content:center;font-size:12px;margin-top:6px" data-act="addcalcfield" data-arg="">+ Add input field</button>
        </div>
        <div style="padding:24px;display:flex;flex-direction:column;gap:16px">
          <div style="font-size:11px;font-weight:700;color:var(--text-3);letter-spacing:.08em">LIVE RESULTS PREVIEW</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
            ${[
              {label:'Annual savings', val:'$147,600', color:'var(--ok)', sub:'vs current stack'},
              {label:'ROI', val:'312%', color:'var(--ember)', sub:'year one'},
              {label:'Payback period', val:'3.8 mo', color:'var(--ok)', sub:'fully loaded'},
            ].map(k=>`
              <div style="background:var(--surface);padding:14px;border-radius:8px;text-align:center">
                <div style="font-size:22px;font-weight:700;color:${k.color}">${k.val}</div>
                <div style="font-size:12px;font-weight:600;margin:2px 0">${k.label}</div>
                <div class="mut" style="font-size:11px">${k.sub}</div>
              </div>`).join('')}
          </div>
          <div style="background:var(--surface);padding:14px;border-radius:8px">
            <div style="font-size:12px;font-weight:700;margin-bottom:10px">5-YEAR VALUE BREAKDOWN</div>
            ${[['Billing automation savings','$61,200'],['Reduced payment failures','$28,400'],['Staff time recaptured','$47,040'],['Faster collections (DSO −12 days)','$18,200'],['Overage & expansion revenue','$22,800']].map(r=>`
              <div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border);font-size:13px">
                <span>${r[0]}</span><span style="font-weight:600;color:var(--ok)">${r[1]}</span>
              </div>`).join('')}
          </div>
          <div style="display:flex;gap:10px;justify-content:flex-end">
            <button class="btn ghost" data-act="editformulas" data-arg="">Edit formulas</button>
            <button class="btn ghost" data-act="toast" data-arg="Copied embed code">Copy embed</button>
            <button class="btn primary" data-act="publishcalc" data-arg="enterprise-roi">Publish changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>`));
};

/* ============================================================
   Custom Entities view
   ============================================================ */
VIEWS.customentities = (v)=>{
  const ENTITIES = [
    {id:'CE-001',name:'Property',icon:'🏢',fields:14,records:312,system:false,desc:'Multi-unit residential or commercial property with units, owners and billing contacts'},
    {id:'CE-002',name:'Contract',icon:'📄',fields:11,records:847,system:false,desc:'Custom contract object linked to Account and Subscription with legal terms and obligations'},
    {id:'CE-003',name:'Ownership Group',icon:'👥',fields:8,records:94,system:false,desc:'Portfolio entity grouping multiple Properties and Accounts under a single billing hierarchy'},
    {id:'CE-004',name:'Cost Center',icon:'💰',fields:6,records:28,system:true,desc:'System-level GL cost allocation object — read-only from billing, write via GL sync'},
  ];
  const FIELDS = [
    {name:'property_id',type:'Text',required:true,indexed:true,system:true,display:'Property ID'},
    {name:'owner_name',type:'Text',required:true,indexed:false,system:false,display:'Owner name'},
    {name:'unit_count',type:'Number',required:true,indexed:false,system:false,display:'Unit count'},
    {name:'property_class',type:'Dropdown',required:false,indexed:true,system:false,display:'Property class',opts:'Class A,Class B,Class C,Mixed-use'},
    {name:'billing_contact',type:'Relation → Contact',required:false,indexed:false,system:false,display:'Billing contact'},
    {name:'management_company',type:'Relation → Account',required:false,indexed:true,system:false,display:'Management company'},
    {name:'go_live_date',type:'Date',required:false,indexed:false,system:false,display:'Go-live date'},
    {name:'annual_revenue',type:'Currency',required:false,indexed:false,system:false,display:'Annual revenue'},
    {name:'portal_enabled',type:'Boolean',required:false,indexed:false,system:false,display:'Portal enabled'},
  ];
  v.appendChild(el(`<div class="view">
  ${pageHead('Custom Entities','Define custom object types, fields and relationships to extend the billing data model',
    `<button class="btn primary" data-act="newentity">+ New entity</button>`
  )}
    <div style="display:grid;grid-template-columns:280px 1fr;gap:16px">
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <div style="font-size:12px;font-weight:700;color:var(--text-3);letter-spacing:.07em">ENTITY TYPES</div>
          <button class="btn ghost" style="font-size:11px;padding:3px 9px" data-act="newentity">+ New</button>
        </div>
        ${ENTITIES.map((e,i)=>`
          <div class="nav-item${i===0?' active':''}" style="margin-bottom:2px;cursor:pointer" data-act="toast" data-arg="Switched to ${e.name} entity">
            <span style="font-size:16px">${e.icon}</span>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:600">${e.name}</div>
              <div class="mut" style="font-size:11px">${e.fields} fields · ${e.records.toLocaleString()} records</div>
            </div>
            ${e.system?`<span class="pill muted" style="font-size:10px">system</span>`:''}
          </div>`).join('')}

        <div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--border)">
          <div style="font-size:11px;font-weight:700;color:var(--text-3);letter-spacing:.07em;margin-bottom:8px">STANDARD OBJECTS</div>
          ${['Account','Subscription','Invoice','Contact','Product','Payment'].map(o=>`
            <div style="padding:7px 10px;font-size:12.5px;color:var(--text-2);display:flex;align-items:center;gap:8px">
              <span class="pill muted" style="font-size:10px">read-only</span>${o}
            </div>`).join('')}
        </div>
      </div>

      <div>
        <div class="card panel" style="margin-bottom:14px">
          <div class="panel-head">
            <div><h3>🏢 Property</h3><div class="sub">Custom entity · ${FIELDS.length} fields · 312 records</div></div>
            <div class="right" style="gap:8px">
              <button class="btn ghost" style="font-size:12px" data-act="toast" data-arg="Exporting Property schema as JSON">Export schema</button>
              <button class="btn primary" style="font-size:12px" data-act="newfield">+ Add field</button>
            </div>
          </div>
          <div class="mut" style="font-size:13px;margin-bottom:14px">${ENTITIES[0].desc}</div>

          <table class="tbl" style="width:100%">
            <thead><tr><th>Field name</th><th>API key</th><th>Type</th><th>Required</th><th>Indexed</th><th></th></tr></thead>
            <tbody>
              ${FIELDS.map(f=>`
                <tr>
                  <td style="font-weight:600">${f.display}</td>
                  <td><code class="mono" style="font-size:11.5px;background:var(--surface);padding:2px 6px;border-radius:4px">${f.name}</code></td>
                  <td><span class="pill muted" style="font-size:11px">${f.type}</span></td>
                  <td>${f.required?`<span style="color:var(--ok)">${svg(I.check,13)}</span>`:'<span class="mut">—</span>'}</td>
                  <td>${f.indexed?`<span style="color:var(--ok)">${svg(I.check,13)}</span>`:'<span class="mut">—</span>'}</td>
                  <td>${f.system?'':`<button class="btn ghost" style="font-size:11px;padding:2px 8px" data-act="editfield" data-arg="${f.name}">Edit</button>`}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>

        <div class="card panel">
          <div class="panel-head"><h3>Relationships</h3><span class="sub">Property ↔ other objects</span></div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
            ${[
              {from:'Property',to:'Account',type:'Many → One',label:'Managed by',field:'management_company'},
              {from:'Property',to:'Subscription',type:'One → Many',label:'Has subscriptions',field:'(via account)'},
              {from:'Property',to:'Ownership Group',type:'Many → One',label:'Belongs to',field:'ownership_group_id'},
              {from:'Property',to:'Contact',type:'Many → One',label:'Billing contact',field:'billing_contact'},
              {from:'Property',to:'Invoice',type:'One → Many',label:'Billed on',field:'(via account)'},
              {from:'Property',to:'Cost Center',type:'Many → One',label:'GL allocation',field:'cost_center_id'},
            ].map(r=>`
              <div style="background:var(--surface);padding:10px;border-radius:7px;font-size:12px">
                <div style="font-weight:700;margin-bottom:4px">${r.label}</div>
                <div class="mut">${r.from} → ${r.to}</div>
                <div class="mut">${r.type}</div>
                <code class="mono" style="font-size:10.5px;color:var(--text-3)">${r.field}</code>
              </div>`).join('')}
          </div>
          <button class="btn ghost" style="margin-top:12px;font-size:12px" data-act="toast" data-arg="Add relationship dialog opened">+ Add relationship</button>
        </div>
      </div>
    </div>
  </div>`));
};

VIEWS.permissions = (v)=>{
  const roles=[
    {name:'Super Admin',desc:'Full platform access including billing & security',members:1,color:'#ff5a1f'},
    {name:'Admin',desc:'Full access except security settings & audit config',members:3,color:'#635bff'},
    {name:'Finance Manager',desc:'Revenue, invoicing, reports, GL export',members:5,color:'#0abf53'},
    {name:'Revenue Ops',desc:'Subscriptions, quotes, customers, usage',members:8,color:'#00a1e0'},
    {name:'Viewer',desc:'Read-only across all modules',members:12,color:'#888'},
    {name:'API Service Account',desc:'Scoped programmatic access',members:4,color:'#e8b23f'},
  ];
  const perms=[
    {cat:'Customers',     sa:2,ad:2,fm:1,ro:2,vw:0,api:1},
    {cat:'Subscriptions', sa:2,ad:2,fm:1,ro:2,vw:0,api:1},
    {cat:'Invoicing',     sa:2,ad:2,fm:2,ro:1,vw:0,api:2},
    {cat:'Payments',      sa:2,ad:2,fm:2,ro:0,vw:0,api:1},
    {cat:'Reports',       sa:2,ad:2,fm:2,ro:1,vw:1,api:1},
    {cat:'Quotes',        sa:2,ad:2,fm:1,ro:2,vw:0,api:0},
    {cat:'Revenue Rec.',  sa:2,ad:1,fm:2,ro:0,vw:0,api:0},
    {cat:'GL & Finance',  sa:2,ad:1,fm:2,ro:0,vw:0,api:0},
    {cat:'Settings',      sa:2,ad:1,fm:0,ro:0,vw:0,api:0},
    {cat:'Audit Log',     sa:2,ad:1,fm:1,ro:0,vw:0,api:0},
    {cat:'API & Webhooks',sa:2,ad:2,fm:0,ro:0,vw:0,api:2},
    {cat:'User Mgmt',     sa:2,ad:1,fm:0,ro:0,vw:0,api:0},
  ];
  const team=[
    {name:'Amir Bukhari',email:'abukhari@delonix.com',role:'Super Admin',status:'active',last:'Just now',mfa:true},
    {name:'M. Reyes',email:'mreyes@delonix.com',role:'Revenue Ops',status:'active',last:'2h ago',mfa:true},
    {name:'D. Cho',email:'dcho@delonix.com',role:'Finance Manager',status:'active',last:'1d ago',mfa:true},
    {name:'P. Anand',email:'panand@delonix.com',role:'Admin',status:'active',last:'3d ago',mfa:false},
    {name:'L. Torres',email:'ltorres@delonix.com',role:'Viewer',status:'pending',last:'—',mfa:false},
    {name:'CI/CD Bot',email:'ci-bot@delonix.com',role:'API Service Account',status:'active',last:'5m ago',mfa:false},
  ];
  const pCell=v=>{
    if(v===2) return `<span style="color:var(--good);font-size:14px" title="Full">●</span>`;
    if(v===1) return `<span style="color:var(--ember-soft);font-size:14px" title="Read-only">◑</span>`;
    return `<span style="color:var(--border);font-size:14px" title="None">○</span>`;
  };
  v.appendChild(el(`<div class="view">
    ${pageHead('Roles & Permissions','Team access control, role definitions, permission matrix',`
      <button class="btn ghost" data-act="toast" data-arg="SCIM provisioning settings">${svg(I.plug,15)} SCIM/SSO</button>
      <button class="btn primary" data-act="inviteusr">${svg(I.team,15)} Invite member</button>
    `)}

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px">
      ${roles.map(r=>`
        <div class="card panel" style="cursor:pointer;border-left:3px solid ${r.color}" data-act="editrole" data-arg="${r.name}">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
            <span style="font-weight:650;font-size:13px">${r.name}</span>
            <span class="pill muted">${r.members} ${r.name==='API Service Account'?'keys':'members'}</span>
          </div>
          <div class="mut" style="font-size:12px;line-height:1.5">${r.desc}</div>
        </div>`).join('')}
    </div>

    <div class="card panel" style="margin-bottom:24px;padding:0;overflow:hidden">
      <div style="padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <span style="font-weight:650;font-size:13px">Permission Matrix</span>
        <span class="mut" style="font-size:11px">● Full &nbsp;◑ Read-only &nbsp;○ None</span>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table" style="min-width:700px">
          <thead><tr>
            <th style="width:160px">Module</th>
            <th style="text-align:center">Super Admin</th>
            <th style="text-align:center">Admin</th>
            <th style="text-align:center">Finance Mgr</th>
            <th style="text-align:center">Revenue Ops</th>
            <th style="text-align:center">Viewer</th>
            <th style="text-align:center">API</th>
          </tr></thead>
          <tbody>
            ${perms.map(p=>`<tr>
              <td style="font-weight:500;font-size:12px">${p.cat}</td>
              <td style="text-align:center">${pCell(p.sa)}</td>
              <td style="text-align:center">${pCell(p.ad)}</td>
              <td style="text-align:center">${pCell(p.fm)}</td>
              <td style="text-align:center">${pCell(p.ro)}</td>
              <td style="text-align:center">${pCell(p.vw)}</td>
              <td style="text-align:center">${pCell(p.api)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="card panel" style="padding:0;overflow:hidden">
      <div style="padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <span style="font-weight:650;font-size:13px">Team Members</span>
        <div style="display:flex;gap:8px">
          <span class="mut" style="font-size:12px;align-self:center">6 members · 1 pending</span>
          <button class="btn ghost" style="font-size:12px" data-act="toast" data-arg="Export team roster">Export</button>
        </div>
      </div>
      <table class="data-table">
        <thead><tr>
          <th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Last active</th><th>MFA</th><th></th>
        </tr></thead>
        <tbody>
          ${team.map(m=>`<tr>
            <td style="font-weight:600">${m.name}</td>
            <td class="mono mut" style="font-size:12px">${m.email}</td>
            <td>${pill(m.role==='Super Admin'?'crit':m.role==='API Service Account'?'warn':'good',m.role)}</td>
            <td>${pill(m.status==='pending'?'warn':'good',m.status)}</td>
            <td class="mut" style="font-size:12px">${m.last}</td>
            <td style="font-size:12px">${m.mfa?'<span style="color:var(--good)">✓ enabled</span>':'<span style="color:var(--crit)">✗ off</span>'}</td>
            <td style="text-align:right"><button class="btn ghost" style="font-size:11px;padding:3px 8px" data-act="editmember" data-arg="${m.name}">Edit</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`));
};

VIEWS.auditlog = (v)=>{
  const events=[
    {ts:'2026-06-28 11:42:07',type:'Invoice sent',user:'M. Reyes',resource:'INV-2026-0842',ip:'10.0.0.12',sev:'low',detail:'$48,200 to Northwind Logistics'},
    {ts:'2026-06-28 11:38:54',type:'Data export',user:'D. Cho',resource:'Subscriptions CSV',ip:'10.0.0.8',sev:'medium',detail:'842 records exported'},
    {ts:'2026-06-28 10:55:21',type:'Price book modified',user:'P. Anand',resource:'Enterprise 2026',ip:'10.0.0.4',sev:'medium',detail:'Unit price changed: Platform seats $38 → $42'},
    {ts:'2026-06-28 10:41:03',type:'Permission changed',user:'A. Bukhari',resource:'D. Cho → Finance Mgr',ip:'10.0.0.1',sev:'high',detail:'Role escalation from Revenue Ops'},
    {ts:'2026-06-28 09:20:17',type:'API key created',user:'A. Bukhari',resource:'ci-bot-prod-v2',ip:'10.0.0.1',sev:'medium',detail:'Scopes: invoices:read, subs:read'},
    {ts:'2026-06-28 09:01:44',type:'User login',user:'M. Reyes',resource:'—',ip:'203.0.113.45',sev:'low',detail:'SSO · Chrome/macOS'},
    {ts:'2026-06-27 17:33:12',type:'Credit note issued',user:'D. Cho',resource:'CN-2026-0051',ip:'10.0.0.8',sev:'medium',detail:'$9,800 credit against INV-2026-0791'},
    {ts:'2026-06-27 16:50:29',type:'Webhook endpoint added',user:'P. Anand',resource:'stripe-sync-prod',ip:'10.0.0.4',sev:'medium',detail:'invoice.finalized event'},
    {ts:'2026-06-27 15:22:08',type:'MFA enforcement enabled',user:'A. Bukhari',resource:'Org policy',ip:'10.0.0.1',sev:'high',detail:'All admin roles now require MFA'},
    {ts:'2026-06-27 14:10:55',type:'Failed login',user:'unknown',resource:'—',ip:'185.234.218.7',sev:'critical',detail:'3 attempts · account locked'},
    {ts:'2026-06-27 11:05:33',type:'Invoice voided',user:'D. Cho',resource:'INV-2026-0788',ip:'10.0.0.8',sev:'high',detail:'$39,750 voided — disputed'},
    {ts:'2026-06-26 09:44:21',type:'Revenue rec. rule modified',user:'P. Anand',resource:'ASC-606 SaaS',ip:'10.0.0.4',sev:'high',detail:'Recognition start offset: 0 → 30 days'},
  ];
  const sevStyle={critical:'var(--crit)',high:'var(--warn)',medium:'var(--ember-soft)',low:'var(--text-3)'};
  const sevPill=s=>`<span class="pill ${s==='critical'?'crit':s==='high'?'warn':'muted'}" style="font-size:10px">${s}</span>`;
  v.appendChild(el(`<div class="view">
    ${pageHead('Audit Log','Complete activity record across the platform — immutable, tamper-evident',`
      <button class="btn ghost" data-act="toast" data-arg="Configuring SIEM export…">${svg(I.plug,15)} SIEM export</button>
      <button class="btn ghost" data-act="toast" data-arg="Downloading audit log CSV…">${svg(I.download,15)} Export CSV</button>
    `)}

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px">
      ${kpi('Events this month','4,218','↑ 12% vs last month',{})}
      ${kpi('Unique actors','23','users + 6 API keys',{})}
      ${kpi('High-risk events','14','3 critical · 11 high',{neg:true})}
      ${kpi('Compliance score','98.2','SOC 2 · ISO 27001',{})}
    </div>

    <div class="card panel" style="padding:0;overflow:hidden">
      <div style="padding:12px 16px;border-bottom:1px solid var(--border);display:flex;gap:10px;flex-wrap:wrap;align-items:center">
        <input placeholder="Search events, users, resources…" class="input" style="flex:1;min-width:220px;height:32px;font-size:12px">
        <select class="input" style="height:32px;font-size:12px;width:160px"><option>All event types</option><option>Logins</option><option>Permission changes</option><option>Data exports</option><option>Financial actions</option><option>API activity</option><option>Security events</option></select>
        <select class="input" style="height:32px;font-size:12px;width:120px"><option>All users</option><option>A. Bukhari</option><option>M. Reyes</option><option>D. Cho</option><option>P. Anand</option></select>
        <select class="input" style="height:32px;font-size:12px;width:130px"><option>Last 30 days</option><option>Last 7 days</option><option>Last 90 days</option><option>Custom range</option></select>
        <select class="input" style="height:32px;font-size:12px;width:110px"><option>All severity</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table" style="min-width:880px">
          <thead><tr>
            <th style="width:160px">Timestamp</th>
            <th>Event</th>
            <th>Actor</th>
            <th>Resource</th>
            <th style="width:120px">IP address</th>
            <th style="width:90px">Severity</th>
            <th></th>
          </tr></thead>
          <tbody>
            ${events.map(e=>`<tr>
              <td class="mono mut" style="font-size:11px">${e.ts}</td>
              <td style="font-weight:500;font-size:12px">${e.type}</td>
              <td style="font-size:12px">${e.user}</td>
              <td class="mut" style="font-size:12px">${e.resource}</td>
              <td class="mono mut" style="font-size:11px">${e.ip}</td>
              <td>${sevPill(e.sev)}</td>
              <td style="text-align:right"><button class="btn ghost" style="font-size:11px;padding:3px 8px" data-act="auditdetail" data-arg="${e.type}">View</button></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div style="padding:10px 16px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <span class="mut" style="font-size:12px">Showing 12 of 4,218 events · Retention: 2 years</span>
        <div style="display:flex;gap:8px">
          <button class="btn ghost" style="font-size:12px" data-act="toast" data-arg="Previous page">← Prev</button>
          <button class="btn ghost" style="font-size:12px" data-act="toast" data-arg="Next page">Next →</button>
        </div>
      </div>
    </div>
  </div>`));
};

VIEWS.thememanager = (v)=>{
  const themes=[
    {id:'dark',label:'Midnight',desc:'Default dark · ember accents',bg:'#0b0a08',acc:'#ff5a1f',active:true},
    {id:'dawn',label:'Dawn',desc:'Light mode · warm neutrals',bg:'#f7f4f0',acc:'#e84e0f',active:false},
    {id:'slate',label:'Slate',desc:'Cool dark · blue-grey tones',bg:'#0f1117',acc:'#638cff',active:false},
    {id:'forest',label:'Forest',desc:'Dark green · earthy palette',bg:'#0b110d',acc:'#3fb950',active:false},
  ];
  const fonts=[
    {id:'inter',label:'Inter',preview:'The quick brown fox',note:'Default — clean, legible'},
    {id:'dm',label:'DM Sans',preview:'The quick brown fox',note:'Geometric, modern'},
    {id:'mono',label:'JetBrains Mono',preview:'The quick brown fox',note:'Monospace · data-dense'},
  ];
  v.appendChild(el(`<div class="view">
    ${pageHead('Theme & Branding','Customise the visual identity of the delonix platform',`
      <button class="btn ghost" data-act="toast" data-arg="Theme reset to defaults">Reset defaults</button>
      <button class="btn primary" data-act="applytheme">Apply changes</button>
    `)}

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div>
        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-title" style="margin-bottom:14px">Theme preset</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${themes.map(t=>`
              <div data-act="switchtheme" data-arg="${t.id}" style="cursor:pointer;border:1px solid ${t.active?'var(--ember)':'var(--border)'};border-radius:var(--r-sm);padding:12px;transition:.15s;${t.active?'background:rgba(255,90,31,.06)':''}">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                  <div style="width:18px;height:18px;border-radius:50%;background:${t.bg};border:2px solid ${t.acc}"></div>
                  <span style="font-weight:650;font-size:12px">${t.label}</span>
                  ${t.active?'<span class="pill good" style="font-size:10px;margin-left:auto">Active</span>':''}
                </div>
                <div class="mut" style="font-size:11px">${t.desc}</div>
              </div>`).join('')}
          </div>
        </div>

        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-title" style="margin-bottom:14px">Brand colours</div>
          <div style="display:flex;flex-direction:column;gap:12px">
            <div style="display:flex;align-items:center;justify-content:space-between">
              <div><div style="font-size:13px;font-weight:600">Accent colour</div><div class="mut" style="font-size:11px">CTAs, active states, highlights</div></div>
              <div style="display:flex;align-items:center;gap:6px">
                ${['#ff5a1f','#635bff','#0abf53','#e8b23f','#00a1e0','#b07cff'].map(c=>`<div data-act="toast" data-arg="Accent set to ${c}" style="width:22px;height:22px;border-radius:50%;background:${c};cursor:pointer;border:2px solid ${c==='#ff5a1f'?'white':'transparent'}" title="${c}"></div>`).join('')}
                <input type="color" value="#ff5a1f" style="width:28px;height:28px;border:none;background:none;cursor:pointer;border-radius:4px" data-act="toast" data-arg="Custom colour picked">
              </div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between">
              <div><div style="font-size:13px;font-weight:600">Secondary colour</div><div class="mut" style="font-size:11px">Charts, secondary badges</div></div>
              <div style="display:flex;align-items:center;gap:6px">
                ${['#5aa9ff','#3fb950','#e3b341','#b07cff','#ff6b9d'].map(c=>`<div data-act="toast" data-arg="Secondary set to ${c}" style="width:22px;height:22px;border-radius:50%;background:${c};cursor:pointer" title="${c}"></div>`).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="card panel">
          <div class="panel-title" style="margin-bottom:14px">Typography</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${fonts.map(f=>`
              <div style="display:flex;align-items:center;gap:10px;padding:8px;border-radius:var(--r-sm);border:1px solid var(--border);cursor:pointer" data-act="toast" data-arg="Font set to ${f.label}">
                <div style="width:34px;height:34px;border-radius:50%;background:var(--surface-2);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700">Aa</div>
                <div style="flex:1"><div style="font-weight:600;font-size:12px">${f.label}</div><div class="mut" style="font-size:11px">${f.note}</div></div>
                <span class="mut" style="font-size:12px;font-style:italic">${f.preview}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>

      <div>
        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-title" style="margin-bottom:14px">Logo & wordmark</div>
          <div style="display:flex;gap:12px;margin-bottom:14px">
            <div style="flex:1;border:1px dashed var(--border);border-radius:var(--r-sm);padding:20px;text-align:center;cursor:pointer" data-act="toast" data-arg="Logo upload dialog">
              <div style="font-size:24px;margin-bottom:4px">⬆</div>
              <div style="font-size:12px;font-weight:600">Upload logo</div>
              <div class="mut" style="font-size:11px">SVG, PNG · max 512KB</div>
            </div>
            <div style="flex:1;border:1px dashed var(--border);border-radius:var(--r-sm);padding:20px;text-align:center;cursor:pointer" data-act="toast" data-arg="Favicon upload dialog">
              <div style="font-size:24px;margin-bottom:4px">⬆</div>
              <div style="font-size:12px;font-weight:600">Upload favicon</div>
              <div class="mut" style="font-size:11px">ICO, PNG 32×32</div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Company name</label><input class="input" value="Delonix Inc" style="width:100%"></div>
            <div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Tagline (optional)</label><input class="input" value="Revenue operations platform" style="width:100%"></div>
          </div>
        </div>

        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-title" style="margin-bottom:14px">Customer portal branding</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Portal URL</label><input class="input" value="billing.delonix.io" style="width:100%"></div>
            <div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Support email</label><input class="input" value="billing@delonix.com" style="width:100%"></div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-top:1px solid var(--border);margin-top:4px">
              <span style="font-size:12px;font-weight:600">Remove "Powered by delonix" footer</span>
              <div style="width:36px;height:20px;background:var(--good);border-radius:10px;cursor:pointer;position:relative"><div style="width:16px;height:16px;background:white;border-radius:50%;position:absolute;right:2px;top:2px"></div></div>
            </div>
          </div>
        </div>

        <div class="card panel">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
            <div class="panel-title">Custom CSS</div>
            <span class="pill warn" style="font-size:10px">Enterprise only</span>
          </div>
          <textarea class="input" style="width:100%;height:90px;font-family:monospace;font-size:11px;resize:vertical" placeholder=":root { --ember: #ff5a1f; }&#10;.sidebar { width: 220px; }"></textarea>
          <div class="mut" style="font-size:11px;margin-top:6px">CSS applies to the main app and customer portal. Changes are validated before deployment.</div>
        </div>
      </div>
    </div>
  </div>`));
};

/* ============================================================
   Drawers (detail panels)
   ============================================================ */
function openDrawer(titleOrHtml, body){
  const d=document.getElementById('drawer');
  if(body !== undefined){
    d.innerHTML = `<div class="drawer-head"><div style="font-size:18px;font-weight:650">${titleOrHtml}</div><button class="x" data-act="close">✕</button></div><div class="drawer-body">${body}</div>`;
  } else {
    d.innerHTML = titleOrHtml;
  }
  d.classList.add('open'); document.getElementById('drawerBg').classList.add('open');
}
function closeDrawer(){ document.getElementById('drawer').classList.remove('open'); document.getElementById('drawerBg').classList.remove('open'); }

function openInvoice(id){
  const i=invoices.find(x=>x.id===id)||invoices[0];
  const li=[
    ['Platform seats — Enterprise (annual)', i.acct==='Meridian Bank'?5400:1450, 38, ],
    ['API usage — metered (per 1k)', 4200, 0.40],
    ['Premium support', 1, 2500],
  ];
  const sub=li.reduce((s,r)=>s+r[1]*r[2],0);
  const tax=Math.round(sub*0.08), grand=sub+tax;
  openDrawer(`
    <div class="drawer-head">
      <div><div class="mono mut">${i.id}</div><div style="font-size:18px;font-weight:650">${i.acct}</div></div>
      <button class="x" data-act="close">✕</button>
    </div>
    <div class="drawer-body">
      <div style="display:flex;gap:10px;margin-bottom:18px">${pill(i.status,i.slabel)}<span class="pill muted">${i.method}</span></div>
      <dl class="kv">
        <dt>Amount</dt><dd class="mono" style="font-size:16px;color:var(--ember-soft)">${fmt2(grand)}</dd>
        <dt>Issued</dt><dd>${i.issued==='—'?'Not issued':i.issued+' 2026'}</dd>
        <dt>Due</dt><dd>${i.due==='—'?'—':i.due+' 2026'}</dd>
        <dt>Payment terms</dt><dd>Net 30</dd>
        <dt>Currency</dt><dd>USD</dd>
        <dt>PO number</dt><dd>PO-${i.id.slice(-4)}</dd>
      </dl>
      <div class="sec-title">Line items</div>
      <table class="line-items"><thead><tr><th>Description</th><th style="text-align:right">Qty</th><th style="text-align:right">Unit</th><th style="text-align:right">Amount</th></tr></thead>
      <tbody>${li.map(r=>`<tr><td>${r[0]}</td><td style="text-align:right" class="mono">${r[1].toLocaleString()}</td><td style="text-align:right" class="mono">${fmt2(r[2])}</td><td style="text-align:right" class="mono">${fmt2(r[1]*r[2])}</td></tr>`).join('')}</tbody></table>
      <div class="totals">
        <div class="t"><span class="mut">Subtotal</span><span class="num">${fmt2(sub)}</span></div>
        <div class="t"><span class="mut">Tax (8%)</span><span class="num">${fmt2(tax)}</span></div>
        <div class="t grand"><span>Total due</span><span class="num">${fmt2(grand)}</span></div>
      </div>
      <div class="sec-title">Lifecycle</div>
      <div class="dot-step">
        ${[['Draft','done'],['Sent','done'],['Viewed','done'],[i.slabel==='Paid'?'Paid':'Payment',i.slabel==='Paid'?'done':'active']].map((s,k)=>`<div class="ds ${s[1]}"><div class="c">${s[1]==='done'?'✓':k+1}</div><small>${s[0]}</small></div>`).join('')}
      </div>
      <div style="display:flex;gap:8px;margin-top:22px">
        <button class="btn primary" style="flex:1;justify-content:center" data-act="toast" data-arg="Reminder sent">${svg(I.send,15)} Send reminder</button>
        <button class="btn" data-act="download" data-arg="pdf|Document|1 page">${svg(I.download,15)} PDF</button>
      </div>
    </div>`);
}

function openAccount(id){
  const a=accounts.find(x=>x.id===id)||accounts[0];
  const accInv=invoices.filter(x=>x.acct===a.name);
  openDrawer(`
    <div class="drawer-head">
      <div class="logo-chip" style="background:${colorFor(a.name)};width:40px;height:40px;font-size:14px">${initials(a.name)}</div>
      <div><div style="font-size:18px;font-weight:650">${a.name}</div><div class="mono mut">${a.id} · customer since ${a.since}</div></div>
      <button class="x" data-act="close">✕</button>
    </div>
    <div class="drawer-body">
      <div class="grid kpis" style="grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px">
        ${kpi('MRR',fmt(a.mrr),'recurring',{})}
        ${kpi('Lifetime value',fmt(a.mrr*12*(2026-(+a.since))),'to date',{})}
        ${kpi('Open A/R',fmt(a.ar),a.ar?'past due':'current',{})}
        ${kpi('Health',a.health+'',a.health>80?'healthy':a.health>60?'watch':'at risk',{})}
      </div>
      <dl class="kv">
        <dt>Plan</dt><dd>${a.plan}</dd>
        <dt>Seats</dt><dd>${a.seats.toLocaleString()}</dd>
        <dt>Payment terms</dt><dd>${a.terms}</dd>
        <dt>Region</dt><dd>${a.region}</dd>
        <dt>Account owner</dt><dd>${a.owner}</dd>
        <dt>Billing contact</dt><dd>ap@${a.name.toLowerCase().split(' ')[0]}.com</dd>
      </dl>
      <div class="sec-title">Invoices</div>
      ${accInv.length? `<div class="table-wrap"><table style="min-width:0"><tbody>${accInv.map(i=>`<tr style="cursor:pointer" data-act="invoice" data-arg="${i.id}"><td class="mono">${i.id}</td><td class="num">${fmt(i.amt)}</td><td>${pill(i.status,i.slabel)}</td></tr>`).join('')}</tbody></table></div>` : '<div class="empty">No invoices in current period.</div>'}
      <div style="display:flex;gap:8px;margin-top:22px">
        <button class="btn primary" style="flex:1;justify-content:center" data-act="route" data-arg="subscriptions">View subscription</button>
        <button class="btn" data-act="account" data-arg="Acme Corp">Manage</button>
      </div>
    </div>`);
}

/* ============================================================
   Charts (canvas)
   ============================================================ */
function dpi(c){const r=window.devicePixelRatio||1;const w=c.clientWidth,h=c.height;c.width=w*r;c.height=h*r;const x=c.getContext('2d');x.scale(r,r);return{x,w,h};}

function drawRevChart(){
  const c=document.getElementById('revChart'); if(!c)return;
  const {x,w,h}=dpi(c); const pad={l:44,r:12,t:16,b:26};
  const data=revenueSeries, prior=data.map((d,i)=>Math.round(d*(0.82-i*0.004))); // prior-year shadow
  const max=Math.max(...data)*1.12, min=170;
  const X=i=>pad.l+(w-pad.l-pad.r)*i/(data.length-1);
  const Y=val=>pad.t+(h-pad.t-pad.b)*(1-(val-min)/(max-min));
  // grid + axis
  x.strokeStyle='#241d16'; x.fillStyle='#7f7264'; x.font='10px Hanken,ui-sans-serif'; x.lineWidth=1;
  for(let g=0;g<=4;g++){const val=min+(max-min)*g/4;const y=Y(val);x.beginPath();x.moveTo(pad.l,y);x.lineTo(w-pad.r,y);x.stroke();x.fillText('$'+Math.round(val)+'k',6,y+3);}
  months.forEach((m,i)=>{if(i%2===0)x.fillText(m,X(i)-8,h-8);});
  // prior-year dashed comparison
  x.save(); x.setLineDash([4,4]); x.beginPath();
  prior.forEach((d,i)=>{i?x.lineTo(X(i),Y(d)):x.moveTo(X(i),Y(d));});
  x.strokeStyle='rgba(182,169,154,.45)'; x.lineWidth=1.4; x.stroke(); x.restore();
  // area
  const grad=x.createLinearGradient(0,pad.t,0,h-pad.b); grad.addColorStop(0,'rgba(255,90,31,.38)'); grad.addColorStop(1,'rgba(255,90,31,0)');
  x.beginPath(); x.moveTo(X(0),Y(data[0]));
  data.forEach((d,i)=>{if(i)x.lineTo(X(i),Y(d));});
  x.lineTo(X(data.length-1),h-pad.b); x.lineTo(X(0),h-pad.b); x.closePath(); x.fillStyle=grad; x.fill();
  // line with glow
  x.save(); x.shadowColor='rgba(255,90,31,.55)'; x.shadowBlur=10;
  x.beginPath(); data.forEach((d,i)=>{i?x.lineTo(X(i),Y(d)):x.moveTo(X(i),Y(d));});
  x.strokeStyle='#ff6a2c'; x.lineWidth=2.6; x.lineJoin='round'; x.stroke(); x.restore();
  // endpoint
  const lx=X(data.length-1),ly=Y(data.at(-1));
  x.fillStyle='rgba(255,90,31,.25)'; x.beginPath(); x.arc(lx,ly,8,0,7); x.fill();
  x.fillStyle='#ff6a2c'; x.beginPath(); x.arc(lx,ly,4.5,0,7); x.fill();
  x.fillStyle='#160d07'; x.beginPath(); x.arc(lx,ly,2,0,7); x.fill();
}

function drawUsageChart(){
  const c=document.getElementById('usageChart'); if(!c)return;
  const {x,w,h}=dpi(c); const pad={l:34,r:8,t:12,b:22};
  const data=[28,31,33,30,36,39,38,41,44,46,45,48]; const max=Math.max(...data)*1.15;
  const bw=(w-pad.l-pad.r)/data.length*0.6;
  x.fillStyle='#7f7264'; x.font='10px Hanken,ui-sans-serif';
  for(let g=0;g<=3;g++){const y=pad.t+(h-pad.t-pad.b)*g/3;x.strokeStyle='#241d16';x.beginPath();x.moveTo(pad.l,y);x.lineTo(w-pad.r,y);x.stroke();}
  data.forEach((d,i)=>{
    const cx=pad.l+(w-pad.l-pad.r)*(i+0.5)/data.length;
    const bh=(h-pad.t-pad.b)*(d/max); const y=h-pad.b-bh;
    const g=x.createLinearGradient(0,y,0,h-pad.b); g.addColorStop(0,'#ff9152'); g.addColorStop(1,'#bf3d10');
    x.fillStyle=i===data.length-1?'#ff5a1f':g; x.beginPath();
    if(x.roundRect)x.roundRect(cx-bw/2,y,bw,bh,4); else x.rect(cx-bw/2,y,bw,bh); x.fill();
    if(i%2===0){x.fillStyle='#7f7264';x.fillText(months[i],cx-8,h-6);}
  });
}

function drawMrrChart(){
  const c=document.getElementById('mrrChart'); if(!c)return;
  const {x,w,h}=dpi(c); const pad={l:38,r:8,t:12,b:22};
  const groups=[[42,18,-6,-9],[38,22,-5,-11],[45,26,-7,-8],[40,30,-4,-12],[48,28,-6,-10],[52,34,-5,-9]];
  const labs=['Jan','Feb','Mar','Apr','May','Jun'];
  const cols=['#3fb950','#ff5a1f','#e3b341','#f0492f'];
  const max=80, zero=pad.t+(h-pad.t-pad.b)*0.62;
  const scale=v=>(h-pad.t-pad.b)*0.62*(v/max);
  x.strokeStyle='#241d16';x.beginPath();x.moveTo(pad.l,zero);x.lineTo(w-pad.r,zero);x.stroke();
  const gw=(w-pad.l-pad.r)/groups.length;
  groups.forEach((g,i)=>{
    const cx=pad.l+gw*(i+0.5);
    let yUp=zero;
    [g[0],g[1]].forEach((v,k)=>{const bh=scale(v);yUp-=bh;x.fillStyle=cols[k];if(x.roundRect&&k===1){x.beginPath();x.roundRect(cx-14,yUp,28,bh,[4,4,0,0]);x.fill();}else{x.fillRect(cx-14,yUp,28,bh);} });
    let yDn=zero;
    [g[2],g[3]].forEach((v,k)=>{const bh=scale(-v);x.fillStyle=cols[k+2];x.fillRect(cx-14,yDn,28,bh);yDn+=bh;});
    x.fillStyle='#7f7264';x.font='10px Hanken,ui-sans-serif';x.fillText(labs[i],cx-9,h-6);
  });
}

function drawWaterfall(){
  const wrap=document.getElementById('waterfall'); if(!wrap)return;
  const data=[398,372,341,318,296,271,255,232,210,188,166,142];
  const max=Math.max(...data);
  wrap.innerHTML=data.map((d,i)=>{
    const hpct=(d/max)*100;
    return `<div class="mb"><div class="stack" style="height:${hpct}%"><i style="height:100%;background:linear-gradient(180deg,var(--ember-soft),var(--ember-deep))"></i></div><small>${months[i]}</small></div>`;
  }).join('');
}

function drawSparks(){
  const seeds={
    mrr:[6,7,7,8,8,9,10,11,12],
    arr:[5,5,6,7,7,8,9,10,11],
    rev:[5,6,7,8,7,9,10,11,12],
    nrr:[9,10,10,11,11,12,12,12,12],
    subs:[6,7,7,8,9,9,10,11,12],
    churn:[12,11,11,10,10,9,9,8,7]
  };
  document.querySelectorAll('canvas[data-spark]').forEach(c=>{
    const data=seeds[c.dataset.spark]||[5,6,7,6,8,9];
    const isDown=c.dataset.spark==='churn';
    const {x,w,h}=dpi(c); const max=Math.max(...data),min=Math.min(...data);
    const X=i=>4+(w-8)*i/(data.length-1), Y=v=>4+(h-8)*(1-(v-min)/(max-min||1));
    // area fill
    const grad=x.createLinearGradient(0,0,0,h);
    grad.addColorStop(0,isDown?'rgba(242,78,48,.25)':'rgba(255,90,31,.28)');
    grad.addColorStop(1,'rgba(255,90,31,0)');
    x.beginPath();x.moveTo(X(0),Y(data[0]));
    data.forEach((d,i)=>{if(i)x.lineTo(X(i),Y(d));});
    x.lineTo(X(data.length-1),h);x.lineTo(X(0),h);x.closePath();x.fillStyle=grad;x.fill();
    // line
    x.beginPath();data.forEach((d,i)=>{i?x.lineTo(X(i),Y(d)):x.moveTo(X(i),Y(d));});
    x.strokeStyle=isDown?'rgba(242,78,48,.9)':'rgba(255,138,76,.9)';x.lineWidth=1.8;x.lineJoin='round';x.stroke();
    // endpoint dot
    x.fillStyle=isDown?'#f24e30':'#ff5a1f';
    x.beginPath();x.arc(X(data.length-1),Y(data.at(-1)),2.4,0,7);x.fill();
  });
}

/* ---- toast ---- */
let toastT;
function toast(msg){
  const t=document.getElementById('toast'); document.getElementById('toastMsg').textContent=msg;
  t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('show'),2400);
}

