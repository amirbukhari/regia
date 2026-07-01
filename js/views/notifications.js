/* delonix — notifications.js */

VIEWS.notifications = (v)=>{
  const templates=[['Invoice issued','Email + PDF','Live','good','7 brands · 11 languages'],['Payment failed','Email + SMS','Live','warn','retry link + card update'],['Renewal notice','Email + in-app','Draft','muted','90/60/30 day cadence'],['Suspension warning','Email + Slack','Review','crit','legal copy pending']];
  const triggers=[['invoice.finalized','Send branded invoice email','Customer billing contact','99.2%'],['payment.failed','Start dunning sequence','Payer + account owner','86.4%'],['subscription.renewal.upcoming','Send renewal notice','Admin contacts','94.1%'],['credit.created','Notify finance approver','Internal finance channel','100%']];
  const log=[['Aurora Health Group','Invoice issued','Delivered','Jun 30 22:11'],['Apex Systems','Payment failed','Bounced','Jun 30 19:04'],['Northwind Logistics','Renewal notice','Opened','Jun 30 16:21'],['Fulcrum Labs','Card expiring','SMS sent','Jun 29 12:08']];
  v.appendChild(el(`<div class="view">
    ${pageHead('Notifications','Production communication center for invoice delivery, payment receipts, renewal notices, dunning messages, preferences and delivery evidence.',`<button class="btn ghost" data-act="download" data-arg="csv|Communication Delivery Log|1,248 events">${svg(I.download,14)} Export log</button><button class="btn primary" data-act="toast" data-arg="Template editor opened">+ New template</button>`)}
    <div class="grid kpis" style="grid-template-columns:repeat(4,1fr)">${kpi('Delivery rate','98.7%','email · SMS · in-app',{accent:true})}${kpi('Templates','42','11 languages · 7 brands',{})}${kpi('Failed sends','16','4 need owner action',{})}${kpi('Unsubscribes','0.8%','below policy threshold',{trend:-0.2})}</div>
    <div class="two-col" style="align-items:start">
      <div class="card panel"><div class="panel-head"><h3>Template library</h3><span class="sub">channel, language and brand aware</span></div><div class="table-wrap"><table><thead><tr><th>Template</th><th>Channels</th><th>Status</th><th>Coverage</th></tr></thead><tbody>${templates.map(t=>`<tr><td class="nm">${t[0]}</td><td>${t[1]}</td><td>${pill(t[3],t[2])}</td><td class="mut">${t[4]}</td></tr>`).join('')}</tbody></table></div></div>
      <div class="card panel"><div class="panel-head"><h3>Preference center</h3><span class="sub">per customer and contact role</span></div>${['Billing contacts receive invoices and receipts','Admins receive renewal and cancellation notices','Collectors receive failed-payment escalation alerts','Customers can opt out of marketing but not transactional notices'].map((x,i)=>`<div class="set-row"><div><div class="t">${x}</div><div class="d">Policy ${i+1} · audited</div></div><div class="spacer"></div><div class="toggle on" data-act="toggle"><i></i></div></div>`).join('')}</div>
    </div>
    <div class="two-col" style="align-items:start;margin-top:16px">
      <div class="card panel"><div class="panel-head"><h3>Event triggers</h3><span class="sub">event-driven communication rules</span></div><div class="table-wrap"><table><thead><tr><th>Event</th><th>Action</th><th>Audience</th><th>Success</th></tr></thead><tbody>${triggers.map(t=>`<tr><td class="mono">${t[0]}</td><td>${t[1]}</td><td class="mut">${t[2]}</td><td class="tnum">${t[3]}</td></tr>`).join('')}</tbody></table></div></div>
      <div class="card panel"><div class="panel-head"><h3>Delivery log</h3><span class="sub">immutable evidence</span></div><div class="activity">${log.map(l=>`<div class="act"><div class="ai">${svg(I.audit,15)}</div><div><div class="at">${l[0]}</div><div class="am">${l[1]} · ${l[2]}</div></div><time>${l[3]}</time></div>`).join('')}</div></div>
    </div>
  </div>`));
};
