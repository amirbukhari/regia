/* delonix — collections.js */

function openCollectionDetail(acct){
  const logged = db().contactLog[acct||'Apex Systems'] || [];
  openDrawer((acct||'Apex Systems')+' — Collections',`
    <div class="grid kpis" style="grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:18px">
      <div class="card kpi" style="padding:12px 14px"><div class="lab">Outstanding</div><div class="val tnum" style="font-size:18px">$5,800</div><div class="sub" style="color:var(--neg)">14 days overdue</div></div>
      <div class="card kpi" style="padding:12px 14px"><div class="lab">Day in sequence</div><div class="val tnum" style="font-size:18px">14</div><div class="sub">Next: final notice</div></div>
      <div class="card kpi" style="padding:12px 14px"><div class="lab">Contact attempts</div><div class="val tnum" style="font-size:18px">${3+logged.length}</div><div class="sub">Last: ${logged.length?logged[0].when+' '+logged[0].type.toLowerCase():'Jun 26 email'}</div></div>
    </div>
    <div class="form-section-title">Dunning timeline</div>
    <div class="timeline" style="margin-bottom:18px">
      ${logged.map(l=>`<div class="tl-item"><div class="tl-dot done"></div><div class="tl-content"><div class="tl-title">Manual — ${l.type} · ${l.outcome}</div><div class="tl-sub">${l.when}${l.note?' · '+l.note:''} · follow-up ${l.followup}</div></div></div>`).join('')}
      <div class="tl-item"><div class="tl-dot done"></div><div class="tl-content"><div class="tl-title">Day 1 — Friendly reminder sent</div><div class="tl-sub">Jun 15 · Email opened (2 times)</div></div></div>
      <div class="tl-item"><div class="tl-dot done"></div><div class="tl-content"><div class="tl-title">Day 3 — Payment failed notice</div><div class="tl-sub">Jun 17 · Email delivered, not opened</div></div></div>
      <div class="tl-item"><div class="tl-dot done"></div><div class="tl-content"><div class="tl-title">Day 7 — Urgent notice (email + SMS)</div><div class="tl-sub">Jun 21 · Email opened · SMS delivered</div></div></div>
      <div class="tl-item"><div class="tl-dot active"></div><div class="tl-content"><div class="tl-title">Day 14 — Final notice + manual call task</div><div class="tl-sub">Jun 28 · Today — email sent, call pending</div></div></div>
      <div class="tl-item"><div class="tl-dot"></div><div class="tl-content"><div class="tl-title">Day 21 — Suspension warning</div><div class="tl-sub">Scheduled Jul 6</div></div></div>
      <div class="tl-item"><div class="tl-dot"></div><div class="tl-content"><div class="tl-title">Day 30 — Account suspend</div><div class="tl-sub">Scheduled Jul 15</div></div></div>
    </div>
    <div class="form-section-title">Log manual contact</div>
    <div class="form-row"><div class="form-group"><label class="form-label">Contact type</label>
      <select class="form-select" id="lc_type"><option>Phone call</option><option>Email</option><option>SMS</option><option>Meeting</option></select></div>
      <div class="form-group"><label class="form-label">Outcome</label>
      <select class="form-select" id="lc_outcome"><option>Promise to pay</option><option>Dispute raised</option><option>Voicemail</option><option>No answer</option><option>Paid</option></select></div></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Follow-up date</label>
      <input class="form-input" id="lc_followup" type="date" value="2026-07-01"></div>
      <div class="form-group"><label class="form-label">Notes</label>
      <input class="form-input" id="lc_note" placeholder="Call notes…"></div></div>
    <div class="form-footer">
      <button class="btn ghost" style="color:var(--neg);border-color:var(--neg)" data-act="suspendaccount" data-arg="${acct||'Apex Systems'}">Suspend account</button>
      <button class="btn ghost" data-act="logcontact" data-arg="${acct||'Apex Systems'}">Log contact</button>
      <button class="btn primary" data-act="toast" data-arg="Manual payment link sent to ${acct||'customer'} billing contact">Send payment link</button>
    </div>`);
}

/* ── Dunning Config ── */

function openDunningConfig(){
  const steps=[
    {day:'Day 1',label:'Friendly reminder',ch:'Email',on:true},
    {day:'Day 3',label:'Payment failed notice',ch:'Email',on:true},
    {day:'Day 7',label:'Urgent notice',ch:'Email + SMS',on:true},
    {day:'Day 14',label:'Final notice + call task',ch:'Email + SMS + Task',on:true},
    {day:'Day 21',label:'Suspension warning',ch:'Email',on:true},
    {day:'Day 30',label:'Account suspend',ch:'Automated action',on:true},
  ];
  openDrawer('Dunning Sequence Config',`
    <p style="font-size:12px;color:var(--text-2);margin-bottom:16px">Configure the automated recovery sequence applied to all failed and overdue accounts.</p>
    ${steps.map((s,i)=>`<div class="seq-step">
      <span class="seq-day">${s.day}</span>
      <span class="seq-label">${s.label}</span>
      <span class="seq-channel">${s.ch}</span>
      ${tgl('dunning-step-'+i, s.on, `aria-label="Toggle ${s.label}"`)}
    </div>`).join('')}
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn primary" data-act="savedone" data-arg="Dunning sequence saved and active">Save configuration</button>
    </div>`);
}

/* ── Approval Rules ── */

function openCollectionsSweep(){
  const accounts = [
    {name:'Meridian Tech',  overdue:'$1,450', days:59, action:'Email + phone'},
    {name:'Bridgepoint',    overdue:'$2,150', days:31, action:'Email reminder'},
    {name:'Apex Systems',   overdue:'$5,800', days:28, action:'Email reminder'},
    {name:'Fulcrum Labs',   overdue:'$3,400', days:28, action:'Email reminder'},
    {name:'Cascade Analytics',overdue:'$2,950', days:87, action:'Final notice + legal hold'},
  ];
  openDrawer('Collections Sweep — June 28, 2026', `
    <div class="val-banner warn" style="margin-bottom:14px">${svg(I.dunning,14)} <strong>${accounts.length} accounts</strong> have overdue balances totalling <strong>$15,750</strong>. This sweep will send reminders and log collection attempts.</div>
    <div class="table-wrap" style="margin-bottom:14px"><table>
      <thead><tr><th>Account</th><th class="num">Overdue</th><th>Days past due</th><th>Planned action</th></tr></thead>
      <tbody>${accounts.map(a=>`<tr>
        <td style="font-weight:600">${a.name}</td>
        <td class="num tnum" style="color:var(--neg)">${a.overdue}</td>
        <td class="tnum" style="color:${a.days>60?'var(--neg)':a.days>30?'var(--warn)':'var(--text-2)'}">${a.days}d</td>
        <td style="font-size:12px">${a.action}</td>
      </tr>`).join('')}
      </tbody>
    </table></div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg"><label>From email</label><input class="finput" value="ar@delonix.io"></div>
      <div class="fg"><label>CC Finance</label><input class="finput" value="finance@delonix.io"></div>
    </div>
    <div class="form-actions" style="margin-top:12px">
      <button class="btn primary" data-act="toast" data-arg="Collections sweep complete — 5 reminders sent · 5 attempts logged">Run Sweep</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openSuspendAccount(acct){
  openDrawer(`Suspend Account — ${acct||'Account'}`, `
    <div class="val-banner error" style="margin-bottom:16px">${svg(I.warning,15)} <strong>Account suspension immediately revokes the customer's access.</strong> This action is reversible but will interrupt the customer's service.</div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg"><label>Reason</label><select class="finput"><option selected>Non-payment</option><option>Fraud suspicion</option><option>Terms violation</option><option>Customer request</option></select></div>
      <div class="fg"><label>Notify customer</label><select class="finput"><option selected>Yes — send suspension email</option><option>No — silent suspension</option></select></div>
      <div class="fg" style="grid-column:1/-1"><label>Internal note</label><textarea class="finput" rows="2" placeholder="Reason for suspension — visible in audit log"></textarea></div>
    </div>
    <div class="form-actions" style="margin-top:14px">
      <button class="btn" style="background:var(--neg);color:#fff;padding:9px 18px;border-radius:8px;border:none;cursor:pointer;font-weight:600" data-act="suspendnow" data-arg="${acct||'Account'}">Suspend Account</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}
