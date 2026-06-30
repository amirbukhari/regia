/* delonix — credits.js */

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
