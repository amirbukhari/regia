/* delonix — collections.js */

function openCollectionDetail(acct){
  const name = acct||'Apex Systems';
  const logged = db().contactLog[name] || [];
  const row = DUN_ROWS.find(r=>r.acct===name) || {amt:dlxRange(name,600,6000), day:14, last:'Jun 26', next:'Final notice'};
  const SEQ = [[1,'Friendly reminder sent'],[3,'Payment failed notice'],[7,'Urgent notice (email + SMS)'],[14,'Final notice + manual call task'],[21,'Suspension warning'],[30,'Account suspend']];
  const stepDate = d => d <= row.day ? `Jun ${Math.max(1, 28-(row.day-d))}` : `Scheduled Jul ${Math.min(28, d-row.day)}`;
  const attempts = SEQ.filter(([d])=>d<=row.day).length + logged.length;
  const nextStep = (SEQ.find(([d])=>d>row.day)||[null,'Escalation review'])[1];
  openDrawer(name+' — Collections',`
    <div class="grid kpis" style="grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:18px">
      <div class="card kpi" style="padding:12px 14px"><div class="lab">Outstanding</div><div class="val tnum" style="font-size:18px">${fmt(row.amt)}</div><div class="sub" style="color:var(--neg)">${row.day} day${row.day===1?'':'s'} overdue</div></div>
      <div class="card kpi" style="padding:12px 14px"><div class="lab">Day in sequence</div><div class="val tnum" style="font-size:18px">${row.day}</div><div class="sub">Next: ${row.next}</div></div>
      <div class="card kpi" style="padding:12px 14px"><div class="lab">Contact attempts</div><div class="val tnum" style="font-size:18px">${attempts}</div><div class="sub">Last: ${logged.length?logged[0].when+' '+logged[0].type.toLowerCase():row.last+' email'}</div></div>
    </div>
    <div class="form-section-title">Dunning timeline</div>
    <div class="timeline" style="margin-bottom:18px">
      ${logged.map(l=>`<div class="tl-item"><div class="tl-dot done"></div><div class="tl-content"><div class="tl-title">Manual — ${l.type} · ${l.outcome}</div><div class="tl-sub">${l.when}${l.note?' · '+l.note:''} · follow-up ${l.followup}</div></div></div>`).join('')}
      ${SEQ.map(([d,label])=>`<div class="tl-item"><div class="tl-dot ${d<row.day?'done':d===row.day?'active':''}"></div><div class="tl-content"><div class="tl-title">Day ${d} — ${label}</div><div class="tl-sub">${d<row.day?stepDate(d)+' · completed':d===row.day?stepDate(d)+' · Today — in progress':stepDate(d)}</div></div></div>`).join('')}
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
      <button class="btn ghost" style="color:var(--neg);border-color:var(--neg)" data-act="suspendaccount" data-arg="${name}">Suspend account</button>
      <button class="btn ghost" data-act="logcontact" data-arg="${name}">Log contact</button>
      <button class="btn primary" data-act="sendpaylink" data-arg="${name}">Send payment link</button>
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
  const accounts = DUN_ROWS.filter(r=>r.day>=7).sort((a,b)=>b.amt-a.amt).slice(0,5)
    .map(r=>({name:r.acct, overdue:fmt(r.amt), days:r.day, action:r.day>=21?'Final notice + call task':r.day>=14?'Email + phone':'Email reminder'}));
  const sweepTotal = accounts.reduce((s,a)=>s+(+a.overdue.replace(/[^0-9]/g,'')),0);
  openDrawer('Collections Sweep — June 28, 2026', `
    <div class="val-banner warn" style="margin-bottom:14px">${svg(I.dunning,14)} <strong>${accounts.length} accounts</strong> have overdue balances totalling <strong>${fmt(sweepTotal)}</strong>. This sweep will send reminders and log collection attempts.</div>
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
      <button class="btn primary" data-act="runsweep">Run Sweep</button>
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
