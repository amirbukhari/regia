/* delonix — accounts.js */

VIEWS.accounts = (v)=>{
  const customers = db().customers;
  const healthDot = h => `<span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${h==='green'?'var(--pos)':h==='yellow'?'var(--warn)':'var(--neg)'};flex:none"></span>`;
  const planPill = p => p.includes('+')?pill('ember',p):p.startsWith('Enterprise')?pill('info',p):pill('muted',p);
  const initC = n => n.split(' ').slice(0,2).map(w=>w[0]).join('');
  const clr = n => COLORS[[...n].reduce((a,c)=>a+c.charCodeAt(0),0)%COLORS.length];
  const buColor = id => (BUS.find(b=>b.id===id)||{color:'#888'}).color;
  const tabs = ['All','Enterprise','Business','Starter','Overdue'];
  const matchTab = (c,t) => t==='All' ? true
    : t==='Overdue' ? c.blab==='Overdue'
    : c.plan.startsWith(t);
  const counts = tabs.map(t=>customers.filter(c=>matchTab(c,t)).length);
  const buTabs = ['All BUs',...BUS.map(b=>b.name)];
  const rowsFor = t => customers.filter(c=>matchTab(c,t)).map(c=>`<tr data-act="account" data-arg="${c.name}" style="cursor:pointer">
            <td><div class="acct"><div class="logo-chip" style="background:${clr(c.name)}">${initC(c.name)}</div><div><span class="nm">${c.name}</span><div class="mut" style="font-size:10.5px;margin-top:1px">${c.id}</div></div></div></td>
            <td><span class="bu-badge"><span class="bu-dot" style="background:${buColor(c.bu)}"></span>${c.buName}</span></td>
            <td>${planPill(c.plan)}</td>
            <td class="num">${fmt(c.mrr)}</td>
            <td><span class="mut" style="font-size:12px">${c.grouping}</span></td>
            <td>${pill(c.badge,c.blab)}</td>
            <td><div style="display:flex;align-items:center;gap:7px">${healthDot(c.health)}<span class="mut" style="font-size:11.5px">${c.health==='green'?'Healthy':c.health==='yellow'?'At-risk':c.blab==='Suspended'?'Suspended':'Churning'}</span></div></td>
            <td><button class="btn ghost" style="padding:5px 11px;font-size:12px" data-act="invgrouping" data-arg="${c.id}">Grouping</button></td>
          </tr>`).join('') || `<tr><td colspan="8" class="empty">No ${t.toLowerCase()} accounts.</td></tr>`;
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
      <div class="tabs" id="acctTabs2">${tabs.map((t,i)=>`<button class="${i===0?'on':''}" onclick="(function(b){document.querySelectorAll('#acctTabs2 button').forEach(x=>x.classList.remove('on'));b.classList.add('on');document.getElementById('acctBody').innerHTML=rowsFor_acct('${t}')})(this)">${t}<span class="ct">${counts[i]}</span></button>`).join('')}</div>
      <div class="spacer"></div>
      <span class="mut" style="font-size:12px;align-self:center">Top ${customers.length} of 247 by MRR — Export CSV for all</span>
      <span class="chip" data-act="toast" data-arg="Showing consolidated view">${svg(I.filter,13)} Business Unit</span>
      <span class="chip" data-act="toast" data-arg="Showing consolidated view">${svg(I.filter,13)} Region</span>
      <span class="chip" data-act="toast" data-arg="Filter: owner">${svg(I.filter,13)} Owner</span>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Company</th><th>Business Unit</th><th>Plan</th><th class="num">MRR</th><th>Invoice Grouping</th><th>Status</th><th>Health</th><th>Actions</th></tr></thead>
        <tbody id="acctBody">
          ${rowsFor('All')}
        </tbody>
      </table>
    </div>
  </div>`));
  window.rowsFor_acct = rowsFor;
};
/* ---------- Subscriptions ---------- */
