/* delonix — auditlog.js */

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
