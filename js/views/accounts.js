/* delonix — accounts.js */

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
