/* delonix — _actions.js */

function setDashLens(which, btn){
  const ro=document.getElementById('kpisRevops'), cfo=document.getElementById('kpisCfo');
  if(!ro||!cfo) return;
  const isCfo = which==='cfo';
  ro.style.display = isCfo?'none':'';
  cfo.style.display = isCfo?'':'none';
  document.querySelectorAll('#lensSeg button').forEach(b=>b.classList.toggle('on', b===btn));
  requestAnimationFrame(()=>{ if(!isCfo) drawSparks(); countUpKPIs(); });
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
