/* delonix — invoices.js */

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
