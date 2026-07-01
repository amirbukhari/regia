/* delonix — billingruns.js */

VIEWS.billingruns = (v)=>{
  const runs = [
    {id:'RUN-2026-07-MONTHLY', name:'July monthly recurring run', cadence:'Monthly · first of month', window:'Jul 01 00:30–02:15 UTC', accounts:842, status:'Scheduled', s:'info', amount:418350, owner:'Billing Ops', approvals:'2 of 3 ready'},
    {id:'RUN-2026-06-USAGE', name:'June usage true-up', cadence:'Monthly · usage close', window:'Jun 30 23:00–Jul 01 01:00 UTC', accounts:318, status:'In validation', s:'warn', amount:64200, owner:'RevOps', approvals:'Tax pending'},
    {id:'RUN-2026-Q3-PREPAID', name:'Q3 prepaid renewals', cadence:'Quarterly · contract anchor', window:'Jul 01 03:00–04:00 UTC', accounts:74, status:'Ready', s:'good', amount:287900, owner:'Finance', approvals:'Approved'},
    {id:'RUN-2026-ADHOC-041', name:'Backdated amendment catch-up', cadence:'Ad hoc · amendment queue', window:'Jun 30 18:00–18:20 UTC', accounts:12, status:'Blocked', s:'crit', amount:18450, owner:'Deal Desk', approvals:'Proration review'},
  ];
  const steps = [
    ['01','Collect source data','Subscriptions, contract amendments, billing anchors, usage events and one-time charges are frozen into the run snapshot.','good'],
    ['02','Rate and price','Plan versions, price books, discounts, commitments, overages and regional price rules calculate line items.','good'],
    ['03','Prorate and align','Mid-cycle changes, backdated charges and first-of-month normalization are previewed before invoice creation.','warn'],
    ['04','Validate controls','Tax address, PO requirement, GL mapping, credit limits and approval thresholds are checked before finalization.','warn'],
    ['05','Generate artifacts','Draft invoices, usage detail CSVs, revenue schedules, payment attempts and audit evidence are produced.','muted'],
  ];
  const cohorts = [
    {label:'Monthly subscriptions', count:842, pct:100, note:'recurring billing · payment terms · auto-charge'},
    {label:'Usage meters', count:318, pct:72, note:'metered billing · hybrid pricing · overage handling'},
    {label:'Contract anchors', count:196, pct:54, note:'custom billing dates · co-term alignment'},
    {label:'Mid-cycle amendments', count:43, pct:21, note:'proration · immediate/deferred effects'},
    {label:'One-time charges', count:28, pct:18, note:'ad hoc fees · implementation charges'},
  ];
  const exceptions = [
    ['Apex Systems','Missing tax address','Blocks invoice finalization','Tax ops'],
    ['Fulcrum Labs','Usage file late','Holds usage true-up only','Data pipeline'],
    ['NovaSpark','PO required above $5k','Approval before send','Account owner'],
    ['Backdated amendments','Proration delta over tolerance','Controller review','Finance'],
  ];
  const calendar = [
    ['Jun 28','Draft build','3 draft invoices generated', 'good'],
    ['Jun 29','Control review','Tax + GL validations opened', 'warn'],
    ['Jun 30','Usage lock','Usage true-up closes 23:00 UTC', 'info'],
    ['Jul 01','Billing run','842 recurring invoices scheduled', 'ember'],
    ['Jul 02','Payment capture','Auto-charge and hosted payment links', 'muted'],
  ];

  v.appendChild(el(`<div class="view">
    ${pageHead('Billing Runs','Schedule, preview, validate and approve enterprise billing runs before invoices are finalized.',
      `<button class="btn ghost" data-act="download" data-arg="csv|Billing Run Schedule|4 scheduled runs · 1 blocked">${svg(I.download,15)} Export schedule</button><button class="btn primary" data-act="toast" data-arg="New billing run wizard opened">+ Schedule run</button>`)}

    <div class="grid kpis" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
      ${kpi('Next run','Jul 01','00:30 UTC · monthly',{accent:true})}
      ${kpi('Run amount','$418,350','842 accounts in scope',{trend:4.2})}
      ${kpi('Exceptions','4','2 blocking controls',{})}
      ${kpi('Automation','96%','manual overrides below threshold',{trend:1.1})}
    </div>

    <div class="billing-run-hero card panel">
      <div>
        <div class="sec-title">Billing run schedule</div>
        <h3>July monthly recurring run</h3>
        <p>Combines recurring billing, usage true-ups, one-time charges, proration, billing anchors, minimum commitments and overage handling into a controlled run calendar.</p>
        <div class="run-actions">
          <button class="btn primary" data-act="toast" data-arg="Run preview recalculated">Recalculate preview</button>
          <button class="btn ghost" data-act="route" data-arg="invoices">Open draft invoices</button>
          <button class="btn ghost" data-act="route" data-arg="usage">Review usage meters</button>
        </div>
      </div>
      <div class="run-calendar">
        ${calendar.map(([day,title,sub,status])=>`<div class="run-day ${status}"><b>${day}</b><span>${title}</span><small>${sub}</small></div>`).join('')}
      </div>
    </div>

    <div class="two-col" style="align-items:start;margin-top:16px">
      <div class="card panel">
        <div class="panel-head"><h3>Scheduled runs</h3><span class="sub">Each row opens as a real billing operation, not a checklist item.</span></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Run</th><th>Cadence</th><th>Window</th><th class="num">Accounts</th><th class="num">Amount</th><th>Status</th><th>Approvals</th></tr></thead>
            <tbody>${runs.map(r=>`<tr data-act="toast" data-arg="Opened ${r.id}" style="cursor:pointer">
              <td><span class="mono">${r.id}</span><br><span class="nm">${r.name}</span></td>
              <td>${r.cadence}</td>
              <td class="mut">${r.window}</td>
              <td class="num tnum">${fmt(r.accounts,false)}</td>
              <td class="num tnum">${fmt(r.amount)}</td>
              <td>${pill(r.s,r.status)}</td>
              <td class="mut">${r.approvals}</td>
            </tr>`).join('')}</tbody>
          </table>
        </div>
      </div>

      <div class="card panel">
        <div class="panel-head"><h3>Run configuration</h3><span class="sub">Controls visible before finalization</span></div>
        <div class="run-config-grid">
          <div class="config-field"><label>Billing period</label><strong>July 2026</strong><span>first-of-month normalized</span></div>
          <div class="config-field"><label>Invoice mode</label><strong>Draft first</strong><span>approval required before send</span></div>
          <div class="config-field"><label>Proration policy</label><strong>Daily exact</strong><span>backdating allowed with approval</span></div>
          <div class="config-field"><label>Usage cutoff</label><strong>Jun 30 · 23:00 UTC</strong><span>late events routed to true-up</span></div>
          <div class="config-field"><label>Payment action</label><strong>Auto-charge eligible</strong><span>card, ACH, wire and hosted link</span></div>
          <div class="config-field"><label>Audit mode</label><strong>Evidence required</strong><span>snapshot, diff, approval log</span></div>
        </div>
      </div>
    </div>

    <div class="two-col" style="align-items:start;margin-top:16px">
      <div class="card panel">
        <div class="panel-head"><h3>Run pipeline</h3><span class="sub">The visible pieces of a mocked billing run</span></div>
        <div class="run-steps">
          ${steps.map(([n,title,body,status])=>`<div class="run-step ${status}"><i>${n}</i><div><b>${title}</b><span>${body}</span></div></div>`).join('')}
        </div>
      </div>
      <div class="card panel">
        <div class="panel-head"><h3>In-scope feature cohorts</h3><span class="sub">Mapped to real billing operations</span></div>
        ${cohorts.map(c=>`<div class="cohort-row"><div><b>${c.label}</b><span>${c.note}</span></div><strong class="tnum">${fmt(c.count,false)}</strong><div class="bar"><i style="width:${c.pct}%"></i></div></div>`).join('')}
      </div>
    </div>

    <div class="card panel" style="margin-top:16px">
      <div class="panel-head"><h3>Blocking exceptions</h3><span class="sub">Visible validation, approval and exception states before checking the feature off</span></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Scope</th><th>Exception</th><th>Impact</th><th>Owner</th><th>Action</th></tr></thead>
          <tbody>${exceptions.map(e=>`<tr>
            <td class="nm">${e[0]}</td><td>${e[1]}</td><td class="mut">${e[2]}</td><td>${e[3]}</td>
            <td><button class="btn ghost" style="padding:5px 10px;font-size:12px" data-act="toast" data-arg="Opened exception for ${e[0]}">Resolve</button></td>
          </tr>`).join('')}</tbody>
        </table>
      </div>
    </div>
  </div>`));
};
