/* delonix — invoices.js */

VIEWS.invoices = (v)=>{
  const INV_DATA = db().invoices;
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

  const totInv = INV_DATA.reduce((s,i)=>s+i.amt,0);
  const totPaid = INV_DATA.filter(i=>i.sl==='Paid').reduce((s,i)=>s+i.amt,0);
  const openInvs = INV_DATA.filter(i=>i.sl==='Sent'||i.sl==='Overdue');
  const totOpen = openInvs.reduce((s,i)=>s+i.amt,0), nOpen = openInvs.length;
  const overdue = INV_DATA.filter(i=>i.sl==='Overdue');
  const totOver = overdue.reduce((s,i)=>s+i.amt,0), nOver = new Set(overdue.map(i=>i.acct)).size;
  const nInvalid = INV_DATA.filter(i=>i.sl==='Draft'&&(!i.validated||i.validationErrors)).length;
  const nDraft = INV_DATA.filter(i=>i.sl==='Draft').length;
  v.appendChild(el(`<div class="view">
    ${pageHead('Invoices',`June 2026 — ${fmt(totInv)} invoiced across ${new Set(INV_DATA.map(i=>i.acct)).size} accounts.`,
      `<button class="btn ghost" data-act="download" data-arg="csv|Invoice Export|47 invoices · $487,200">${svg(I.download,15)} Export CSV</button><button class="btn primary" data-act="newinvoice">+ New Invoice</button>`)}
    <div class="period-bar draft">${svg(I.audit,15)} <strong>June 2026 billing period</strong> <span style="font-weight:400;opacity:.7">— Draft invoices generated · ${INV_DATA.filter(i=>i.sl==='Draft'&&(!i.validated||i.validationErrors)).length} require validation before finalization</span> <span style="margin-left:auto;display:flex;gap:8px"><button class="btn ghost" style="padding:4px 10px;font-size:12px" data-act="route" data-arg="billingruns">Billing run schedule</button><button class="btn ghost" style="padding:4px 10px;font-size:12px" data-act="draftvalidate" data-arg="all">Review all issues</button><button class="btn primary" style="padding:4px 10px;font-size:12px" data-act="signoffclose">Finalize period</button></span></div>
    ${nInvalid?`<div class="val-banner warn">${svg(I.warning,15)} <div><strong>${nInvalid} draft invoice${nInvalid===1?' has':'s have'} validation issues</strong><ul class="val-issue-list">${INV_DATA.filter(i=>i.validationErrors).map(i=>`<li>${svg(I.warning,12)} ${i.id} — ${i.validationErrors.join(', ')}</li>`).join('')}${nInvalid>1?`<li>${svg(I.warning,12)} 2 invoices pending GL mapping review</li>`:''}</ul></div></div>`:''}
    <div class="grid kpis" style="grid-template-columns:repeat(5,1fr);margin-bottom:20px">
      ${kpi('Invoiced (Jun)',fmt(totInv),INV_DATA.length+' invoices',{accent:true})}
      ${kpi('Collected',fmt(totPaid),Math.round(totPaid/(totInv||1)*100)+'% collected',{trend:2.1})}
      ${kpi('Outstanding',fmt(totOpen),nOpen+' open invoices',{})}
      ${kpi('Overdue',fmt(totOver),nOver+' account'+(nOver===1?'':'s'),{trend:0})}
      ${kpi('Draft',''+nDraft,'pending finalization',{})}
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
