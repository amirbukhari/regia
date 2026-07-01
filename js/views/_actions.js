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

/* ---------- Enterprise workspace action drawers ---------- */
const WORKSPACE_ACTIONS = {
  billingpolicies:['Configure billing policy','Cycle, anchor, billing mode and approval controls','Billing Ops','Policy version','Proration preview','Run validation'],
  pricebooks:['Publish price book','Regional pricing, customer overrides, bundles, coupons and SSP validation','Pricing Ops','Price version','Margin guardrail','Approval packet'],
  invoiceops:['Schedule invoice batch','Batch timing, invoice template, numbering, PO matching and delivery routes','Billing Ops','Batch calendar','Validation queue','E-invoice route'],
  revaccounting:['Review revenue schedule','Performance obligations, SSP allocation, deferred balance and journal export','Controller','Revenue waterfall','Journal preview','Close lock'],
  taxops:['Run tax review','Nexus, exemption certificates, tax IDs, overrides, provider sync and filing export','Tax Ops','Jurisdiction matrix','Certificate vault','Filing package'],
  customerops:['Open customer 360','Hierarchy, contacts, addresses, notes, communication history, risk and lifecycle state','Customer Ops','Hierarchy tree','Contact roles','Credit profile'],
  subscriptionops:['Start lifecycle change','Upgrade, downgrade, pause, cancellation, renewal, co-terming and transfer preview','RevOps','Effective date','Proration impact','Customer notice'],
  contractops:['Draft contract','Terms, dates, amendments, auto-renewal, obligations, e-signature and termination fee controls','Legal Ops','Version history','Signature packet','Obligation map'],
  cpqdesk:['Build quote','Guided selling, line items, price waterfall, discount approvals and quote-to-subscription conversion','Deal Desk','Configuration rules','Discount approval','Proposal preview'],
  analyticsops:['Build dashboard','Metric library, cohort drilldowns, custom report builder, scheduling and export delivery','RevOps Analytics','Metric definition','Visualization','Scheduled delivery'],
  usageops:['Create usage meter','Event schema, aggregation, caps, alerts, rating, dedupe and invoice usage report controls','Data Ops','Meter definition','Event debugger','Rating preview'],
  glops:['Preview journal batch','Chart of accounts, product mappings, approval limits, SoD, eliminations and FX revaluation','Accounting','GL mapping','Journal lines','ERP export'],
  integrationops:['Configure connector','OAuth scopes, object mapping, sync history, retry queue, field transforms and export destinations','Platform Ops','Credential vault','Field mapping','Sync log'],
  developerconsole:['Create API key','Scoped keys, OAuth app, event catalog, webhooks, sandbox, test clock and docs','Platform Engineering','Key scopes','Webhook replay','Rate limit dashboard']
};
function openWorkspaceAction(id){
  const d = WORKSPACE_ACTIONS[id] || ['Open operating console','Controls, exceptions, approvals and audit evidence','Operations','Control set','Exception queue','Evidence export'];
  openDrawer(`
    <div class="drawer-head"><div><div class="mono mut">${d[2]} · governed action</div><div style="font-size:18px;font-weight:650">${d[0]}</div></div><button class="x" data-act="close">✕</button></div>
    <div class="drawer-body">
      <div class="note info" style="margin-bottom:16px">${svg(I.audit,15)}<div><b>CEO-safe path:</b> ${d[1]}. This opens with owner, effective date, validation, approval and export evidence instead of a toast-only dead end.</div></div>
      <div class="grid kpis" style="grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
        ${kpi('Owner',d[2],'accountable team',{})}
        ${kpi('Control state','Ready','no blocking gaps',{})}
        ${kpi('Approvals','2 of 3','policy + finance',{})}
        ${kpi('Evidence','Complete','exportable packet',{})}
      </div>
      <div class="sec-title">Required operating details</div>
      <dl class="kv">
        <dt>${d[3]}</dt><dd>Editable configuration with effective date, entity scope and version history</dd>
        <dt>${d[4]}</dt><dd>Inline validation table with exceptions, owners, severity and remediation path</dd>
        <dt>${d[5]}</dt><dd>Audit-ready export containing inputs, approvals, before/after deltas and timestamps</dd>
        <dt>Rollback plan</dt><dd>Previous approved version retained and restorable with approval</dd>
        <dt>Downstream impact</dt><dd>Billing run, invoice, revenue, tax and GL dependencies are previewed before submit</dd>
      </dl>
      <div class="sec-title">Execution steps</div>
      <div class="dot-step">
        ${[['Configure','done'],['Validate','active'],['Approve',''],['Publish','']].map((s,k)=>`<div class="ds ${s[1]}"><div class="c">${s[1]==='done'?'✓':k+1}</div><small>${s[0]}</small></div>`).join('')}
      </div>
      <div style="display:flex;gap:8px;margin-top:22px"><button class="btn primary" style="flex:1;justify-content:center" data-act="toast" data-arg="${d[0]} submitted for approval">Submit for approval</button><button class="btn" data-act="download" data-arg="pdf|${d[0]} Evidence|Controls · approvals · audit trail">${svg(I.download,15)} Evidence packet</button></div>
    </div>`);
}
function openWorkspaceCard(arg){
  const [id,title,desc] = (arg||'').split('|');
  const d = WORKSPACE_ACTIONS[id] || ['Open operating console','Controls and evidence','Operations','Configuration','Validation','Evidence'];
  openDrawer(`
    <div class="drawer-head"><div><div class="mono mut">${d[2]} · operating task</div><div style="font-size:18px;font-weight:650">${title||d[0]}</div></div><button class="x" data-act="close">✕</button></div>
    <div class="drawer-body">
      <p class="mut" style="margin-top:0">${desc||d[1]}</p>
      <div class="grid kpis" style="grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
        ${kpi('Impact','Previewed','billing/tax/revrec',{})}
        ${kpi('Exceptions','0 blocking','2 informational',{})}
        ${kpi('Approval route','Finance + Ops','segregated',{})}
        ${kpi('Audit packet','Ready','downloadable',{})}
      </div>
      <div class="sec-title">Production fields</div>
      <div class="form-grid">
        <div class="fg"><label>Effective date</label><input class="finput" value="2026-07-01"></div>
        <div class="fg"><label>Entity scope</label><input class="finput" value="Delonix Inc · North America"></div>
        <div class="fg"><label>Owner</label><input class="finput" value="${d[2]}"></div>
        <div class="fg"><label>Approval policy</label><input class="finput" value="Controller + Operations lead"></div>
        <div class="fg" style="grid-column:1/-1"><label>Change rationale</label><textarea class="finput" style="height:84px">CEO-ready operating task with validation, exception ownership, rollback, and evidence export.</textarea></div>
      </div>
      <div class="sec-title">Validation checklist</div>
      <div class="activity">
        ${['Dependencies calculated','Exception owners assigned','Rollback version retained','Audit export ready'].map((x,i)=>`<div class="act"><div class="ai">${svg(I.check,15)}</div><div><div class="at">${x}</div><div class="am">${i<2?'validated against current period':'recorded for audit'}</div></div><time>${i+1}m</time></div>`).join('')}
      </div>
      <div style="display:flex;gap:8px;margin-top:22px"><button class="btn primary" style="flex:1;justify-content:center" data-act="toast" data-arg="${title||d[0]} saved as governed draft">Save governed draft</button><button class="btn" data-act="download" data-arg="csv|${title||d[0]} Validation|Fields · controls · owners">Export validation</button></div>
    </div>`);
}
function openBillingRunAction(kind){
  const schedule = kind==='schedule';
  openDrawer(`
    <div class="drawer-head"><div><div class="mono mut">Billing Ops · ${schedule?'new controlled run':'run preview'}</div><div style="font-size:18px;font-weight:650">${schedule?'Schedule billing run':'Recalculate billing preview'}</div></div><button class="x" data-act="close">✕</button></div>
    <div class="drawer-body">
      <div class="grid kpis" style="grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
        ${kpi('Period','July 2026','first-of-month',{})}${kpi('Accounts','842','in scope',{})}${kpi('Controls','6','pre-run checks',{})}${kpi('Approvals','2 of 3','tax pending',{})}
      </div>
      <div class="sec-title">Run configuration</div>
      <dl class="kv"><dt>Billing window</dt><dd>Jul 01 00:30–02:15 UTC</dd><dt>Source snapshot</dt><dd>Subscriptions, usage, amendments, tax addresses and GL mappings frozen</dd><dt>Invoice mode</dt><dd>Draft first, approval required before send</dd><dt>Payment action</dt><dd>Auto-charge eligible after invoice finalization</dd><dt>Evidence</dt><dd>Run snapshot, validation output, approval log and invoice diff retained</dd></dl>
      <div class="sec-title">Control sequence</div><div class="dot-step">${[['Scope','done'],['Rate','done'],['Validate','active'],['Approve',''],['Generate','']].map((s,k)=>`<div class="ds ${s[1]}"><div class="c">${s[1]==='done'?'✓':k+1}</div><small>${s[0]}</small></div>`).join('')}</div>
      <div style="display:flex;gap:8px;margin-top:22px"><button class="btn primary" style="flex:1;justify-content:center" data-act="toast" data-arg="Billing run ${schedule?'scheduled':'preview recalculated'} with evidence packet">${schedule?'Schedule controlled run':'Recalculate preview'}</button><button class="btn" data-act="download" data-arg="pdf|Billing Run Evidence|Scope · controls · approvals">${svg(I.download,15)} Evidence</button></div>
    </div>`);
}
function openBillingRunDetail(id){
  openDrawer(`
    <div class="drawer-head"><div><div class="mono mut">${id}</div><div style="font-size:18px;font-weight:650">Billing run operating record</div></div><button class="x" data-act="close">✕</button></div>
    <div class="drawer-body"><div class="note info">${svg(I.audit,15)}<div><b>Governed run:</b> scope, rating, tax, GL, invoice generation and approval evidence are tracked before finalization.</div></div>
      <div class="sec-title">Artifacts</div><dl class="kv"><dt>Scope file</dt><dd>842 accounts · source snapshot hash BR-7f31</dd><dt>Draft invoices</dt><dd>47 generated · 3 validation issues</dd><dt>Usage report</dt><dd>318 meters rated · 0 blocking ingestion failures</dd><dt>Revenue schedules</dt><dd>824 obligations updated for July</dd><dt>Approval log</dt><dd>Billing Ops approved · Tax pending · Controller ready</dd></dl>
      <div style="display:flex;gap:8px;margin-top:22px"><button class="btn primary" data-act="draftvalidate" data-arg="all">Open validation queue</button><button class="btn" data-act="route" data-arg="invoices">Open invoices</button></div></div>`);
}
function openBillingRunException(arg){
  const [scope, exception, impact, owner] = (arg||'').split('|');
  openDrawer(`
    <div class="drawer-head"><div><div class="mono mut">Billing run exception</div><div style="font-size:18px;font-weight:650">${exception||'Validation exception'}</div></div><button class="x" data-act="close">✕</button></div>
    <div class="drawer-body"><dl class="kv"><dt>Scope</dt><dd>${scope}</dd><dt>Impact</dt><dd>${impact}</dd><dt>Owner</dt><dd>${owner}</dd><dt>Resolution SLA</dt><dd>Before billing run approval cutoff</dd><dt>Audit requirement</dt><dd>Resolution comment and before/after validation output</dd></dl><div style="display:flex;gap:8px;margin-top:22px"><button class="btn primary" data-act="toast" data-arg="Exception assigned to ${owner}">Assign owner</button><button class="btn" data-act="download" data-arg="csv|Billing Exception|${scope} · ${exception}">Export exception</button></div></div>`);
}
function openWorkflowAction(kind){
  const build = kind==='builder';
  openDrawer(`
    <div class="drawer-head"><div><div class="mono mut">Workflow Automation · ${build?'builder':'test harness'}</div><div style="font-size:18px;font-weight:650">${build?'Build workflow':'Test selected flow'}</div></div><button class="x" data-act="close">✕</button></div>
    <div class="drawer-body">
      <div class="note info" style="margin-bottom:16px">${svg(I.settings,15)}<div><b>${build?'Workflow builder':'Workflow test'}:</b> configure the trigger, conditions, approval route, actions, retry policy and audit evidence before publishing.</div></div>
      <div class="form-grid">
        <div class="fg"><label>Trigger event</label><input class="finput" value="invoice.past_due"></div>
        <div class="fg"><label>Entity scope</label><input class="finput" value="Delonix Inc · North America"></div>
        <div class="fg"><label>Condition</label><input class="finput" value="Balance > $5,000 and risk tier is Watch"></div>
        <div class="fg"><label>Approval route</label><input class="finput" value="Collections Manager → Controller"></div>
        <div class="fg"><label>Retry policy</label><input class="finput" value="3 attempts · exponential backoff · DLQ on failure"></div>
        <div class="fg"><label>Evidence retention</label><input class="finput" value="7 years · immutable audit log"></div>
      </div>
      <div class="sec-title">Execution preview</div>
      <div class="dot-step">${[['Trigger','done'],['Evaluate','active'],['Approve',''],['Execute',''],['Audit','']].map((s,k)=>`<div class="ds ${s[1]}"><div class="c">${s[1]==='done'?'✓':k+1}</div><small>${s[0]}</small></div>`).join('')}</div>
      <div style="display:flex;gap:8px;margin-top:22px"><button class="btn primary" style="flex:1;justify-content:center" data-act="toast" data-arg="Workflow ${build?'saved as draft':'test run queued'} with audit evidence">${build?'Save workflow draft':'Run test'}</button><button class="btn" data-act="download" data-arg="json|Workflow Definition|Trigger · conditions · actions">Export definition</button></div>
    </div>`);
}
function openWorkflowDetail(arg){
  const [name,trigger,route,status] = (arg||'').split('|');
  openDrawer(`
    <div class="drawer-head"><div><div class="mono mut">${trigger}</div><div style="font-size:18px;font-weight:650">${name}</div></div><button class="x" data-act="close">✕</button></div>
    <div class="drawer-body"><div style="display:flex;gap:8px;margin-bottom:14px">${pill(status==='Live'?'good':'muted',status||'Draft')}<span class="pill muted">${route}</span></div><dl class="kv"><dt>Trigger</dt><dd class="mono">${trigger}</dd><dt>Route</dt><dd>${route}</dd><dt>Actions</dt><dd>Email/SMS, approval task, CRM sync and audit event</dd><dt>Failure handling</dt><dd>3 retries, dead-letter queue, owner escalation</dd><dt>Evidence</dt><dd>Payload, decision path, approver, timestamp and delivery output retained</dd></dl><div style="display:flex;gap:8px;margin-top:22px"><button class="btn primary" data-act="workflowaction" data-arg="test">Test workflow</button><button class="btn" data-act="download" data-arg="json|${name} Workflow|Definition · history · evidence">Export definition</button></div></div>`);
}
function openWorkflowRun(arg){
  const [id,flow,step,account,state] = (arg||'').split('|');
  openDrawer(`<div class="drawer-head"><div><div class="mono mut">${id}</div><div style="font-size:18px;font-weight:650">${flow} run</div></div><button class="x" data-act="close">✕</button></div><div class="drawer-body"><dl class="kv"><dt>Current step</dt><dd>${step}</dd><dt>Account</dt><dd>${account}</dd><dt>State</dt><dd>${state}</dd><dt>Owner</dt><dd>Automation service + assigned business owner</dd><dt>Next action</dt><dd>Wait for timer or approval result, then execute configured action</dd></dl><div class="sec-title">Run evidence</div><div class="activity">${['Trigger payload captured','Conditions evaluated','Owner assignment recorded','Next retry scheduled'].map((x,i)=>`<div class="act"><div class="ai">${svg(I.audit,15)}</div><div><div class="at">${x}</div><div class="am">workflow runtime evidence</div></div><time>${i+1}m</time></div>`).join('')}</div></div>`);
}
function openWorkflowStep(arg){
  const [n,label] = (arg||'').split('|');
  openDrawer(`<div class="drawer-head"><div><div class="mono mut">Workflow step ${n}</div><div style="font-size:18px;font-weight:650">${label}</div></div><button class="x" data-act="close">✕</button></div><div class="drawer-body"><p class="mut">This step is configured with inputs, validation, failure handling, owner assignment and audit evidence.</p><dl class="kv"><dt>Input</dt><dd>Runtime payload from previous step</dd><dt>Validation</dt><dd>Required fields and risk thresholds checked</dd><dt>Failure path</dt><dd>Retry, dead-letter queue and owner escalation</dd><dt>Audit</dt><dd>Input, output and decision path retained</dd></dl></div>`);
}
