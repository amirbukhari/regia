/* delonix — usage.js */

VIEWS.usage = (v)=>{
  const planUsage = [
    {plan:'Enterprise+', allocated:'Unlimited', apiUsed:'1.24B', storage:'480 GB',  storageAlloc:'Unlimited', usagePct:null, overage:3200},
    {plan:'Enterprise',  allocated:'Unlimited', apiUsed:'2.18B', storage:'1.1 TB',  storageAlloc:'Unlimited', usagePct:null, overage:2800},
    {plan:'Business+',   allocated:'5M/mo',     apiUsed:'3.92M', storage:'312 GB',  storageAlloc:'500 GB',    usagePct:78,   overage:1100},
    {plan:'Business',    allocated:'1M/mo',     apiUsed:'0.71M', storage:'68 GB',   storageAlloc:'100 GB',    usagePct:71,   overage:820},
    {plan:'Starter',     allocated:'100k/mo',   apiUsed:'62k',   storage:'5.8 GB',  storageAlloc:'10 GB',     usagePct:62,   overage:480},
  ];
  const topConsumers = [
    {cust:'Stellar Systems',    api:'824M',  seats:3120, storage:'310 GB', overage:1840},
    {cust:'Pinnacle SaaS',      api:'612M',  seats:2400, storage:'218 GB', overage:1360},
    {cust:'CloudBase Inc',      api:'488M',  seats:1980, storage:'184 GB', overage:0},
    {cust:'Apex Systems',       api:'341M',  seats:1640, storage:'142 GB', overage:2200},
    {cust:'DataVault',          api:'192M',  seats:840,  storage:'76 GB',  overage:620},
  ];
  const usageEvents = [
    {id:'EVT-8821042',src:'BuildStream-API',srcId:'bs_evt_4821042',idempotency:'bsv2-4821042',eventTs:'Jun 28 14:32:01',receivedTs:'Jun 28 14:32:02',acct:'AC-4821',product:'API Calls',qty:'14,200',unit:'calls',status:'accepted',correction:null},
    {id:'EVT-8821041',src:'BuildStream-API',srcId:'bs_evt_4821041',idempotency:'bsv2-4821041',eventTs:'Jun 28 14:31:48',receivedTs:'Jun 28 14:31:49',acct:'AC-4795',product:'Storage',qty:'8.4',unit:'GB',status:'accepted',correction:null},
    {id:'EVT-8821040',src:'Meter-v2',srcId:'mtr_991028',idempotency:'mtrv2-991028',eventTs:'Jun 28 14:30:12',receivedTs:'Jun 28 14:30:13',acct:'AC-4112',product:'Units Occupied',qty:'312',unit:'unit-nights',status:'accepted',correction:null},
    {id:'EVT-8820991',src:'BuildStream-API',srcId:'bs_evt_4820991',idempotency:'bsv2-4820991',eventTs:'Jun 28 13:48:20',receivedTs:'Jun 28 13:48:21',acct:'AC-UNKNOWN',product:'API Calls',qty:'200',unit:'calls',status:'rejected',correction:'No account mapping'},
    {id:'EVT-8820987',src:'Legacy-CSV',srcId:'csv_row_1248',idempotency:null,eventTs:'Jun 27 22:00:00',receivedTs:'Jun 28 00:12:04',acct:'AC-4104',product:'API Calls',qty:'42,000',unit:'calls',status:'pending-mapping',correction:'Awaiting product mapping'},
    {id:'EVT-8820843',src:'Meter-v2',srcId:'mtr_990122',idempotency:'mtrv2-990122',eventTs:'Jun 27 12:00:00',receivedTs:'Jun 27 12:00:01',acct:'AC-4821',product:'Units Occupied',qty:'298',unit:'unit-nights',status:'corrected',correction:'EVT-8820843-CORR'},
  ];
  const failedEvents = [
    {id:'EVT-8820991',src:'BuildStream-API',acct:'AC-UNKNOWN',product:'API Calls',qty:'200',reason:'No account mapping',received:'Jun 28 13:48'},
    {id:'EVT-8820988',src:'Legacy-CSV',acct:'AC-4103',product:'Unknown-SKU-441',qty:'1',reason:'Product not found',received:'Jun 28 00:12'},
    {id:'EVT-8820843-v2',src:'Meter-v2',acct:'AC-4821',product:'Units Occupied',qty:'298',reason:'Duplicate idempotency key',received:'Jun 27 12:00'},
  ];
  const usagePctBar = pct => pct===null
    ? `<span class="mut" style="font-size:11.5px">Unlimited</span>`
    : `<div style="display:flex;align-items:center;gap:8px"><div class="bar" style="width:80px"><i style="width:${pct}%;background:${pct>90?'var(--neg)':pct>75?'var(--warn)':'var(--pos)'}"></i></div><span class="mut tnum" style="font-size:12px">${pct}%</span></div>`;
  const statusPill = s => s==='accepted'?pill('good','Accepted'):s==='rejected'?pill('neg','Rejected'):s==='corrected'?pill('info','Corrected'):s==='pending-mapping'?pill('warn','Pending Mapping'):pill('muted',s);
  const usageTabs = ['Overview','Event Explorer','Failed Queue','Corrections','Source Systems'];
  const tabContent = {
    Overview: `
      <div class="grid kpis" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
        ${kpi('Events (Jun)','4.82B','across all meters',{accent:true})}
        ${kpi('Failed Events','23','3 unresolved',{trend:0})}
        ${kpi('Overage Revenue','$8,400','9 accounts',{})}
        ${kpi('Pending Corrections','4','awaiting replay',{})}
      </div>
      <div class="grid" style="grid-template-columns:1fr 1fr;gap:16px">
        <div class="card panel">
          <div class="panel-head"><h3>Usage by Plan Tier</h3></div>
          <div class="table-wrap" style="padding:0">
            <table><thead><tr><th>Plan</th><th>Allocated</th><th>API Used</th><th>Storage</th><th>Usage</th><th class="num">Overage</th></tr></thead>
            <tbody>${planUsage.map(r=>`<tr><td><strong style="font-size:13px">${r.plan}</strong></td><td class="mut">${r.allocated}</td><td class="tnum" style="font-size:13px">${r.apiUsed}</td><td class="tnum" style="font-size:13px">${r.storage}</td><td>${usagePctBar(r.usagePct)}</td><td class="num tnum" style="font-size:13px">${r.overage?fmt(r.overage):'—'}</td></tr>`).join('')}</tbody>
            </table>
          </div>
        </div>
        <div class="card panel">
          <div class="panel-head"><h3>Top Consumers</h3></div>
          <div class="table-wrap" style="padding:0">
            <table><thead><tr><th>Account</th><th class="num">API Events</th><th class="num">Seats</th><th class="num">Overage</th></tr></thead>
            <tbody>${topConsumers.map(r=>`<tr data-act="account" data-arg="${r.cust}" style="cursor:pointer"><td><span class="nm">${r.cust}</span></td><td class="num tnum">${r.api}</td><td class="num tnum">${r.seats.toLocaleString()}</td><td class="num tnum" style="${r.overage?'color:var(--warn)':''}">${r.overage?fmt(r.overage):'—'}</td></tr>`).join('')}</tbody>
            </table>
          </div>
        </div>
      </div>`,
    'Event Explorer': `
      <div class="toolbar" style="margin-bottom:12px">
        <span class="chip" data-act="toast" data-arg="Filter by source">${svg(I.filter,13)} Source</span>
        <span class="chip" data-act="toast" data-arg="Filter by status">${svg(I.filter,13)} Status</span>
        <span class="chip" data-act="daterange" data-arg="custom">${svg(I.filter,13)} Time range</span>
        <div class="spacer"></div>
        <span class="mut" style="font-size:12px">Showing last 500 events</span>
      </div>
      <div class="table-wrap">
        <table><thead><tr><th>Event ID</th><th>Source</th><th>Account</th><th>Product</th><th class="num">Qty</th><th>Event Time</th><th>Status</th><th></th></tr></thead>
        <tbody>${usageEvents.map(e=>`<tr style="cursor:pointer" data-act="usageevent" data-arg="${e.id}">
          <td class="mono" style="font-size:11.5px">${e.id}</td>
          <td class="mut" style="font-size:12px">${e.src}</td>
          <td style="font-size:12.5px">${e.acct}</td>
          <td style="font-size:12.5px">${e.product}</td>
          <td class="num tnum">${e.qty} ${e.unit}</td>
          <td class="mut tnum" style="font-size:11.5px">${e.eventTs}</td>
          <td>${statusPill(e.status)}</td>
          <td class="mut">${svg('<polyline points="9 18 15 12 9 6"/>',14)}</td>
        </tr>`).join('')}</tbody>
        </table>
      </div>`,
    'Failed Queue': `
      <div class="val-banner error" style="margin-bottom:12px">${svg(I.warning,15)} <strong>${failedEvents.length} events failed ingestion</strong> — resolve mapping issues or ignore to exclude from billing.</div>
      <div class="table-wrap">
        <table><thead><tr><th>Event ID</th><th>Source</th><th>Account</th><th>Product</th><th>Failure Reason</th><th>Received</th><th>Actions</th></tr></thead>
        <tbody>${failedEvents.map(e=>`<tr>
          <td class="mono" style="font-size:11.5px">${e.id}</td>
          <td class="mut">${e.src}</td><td>${e.acct}</td><td>${e.product}</td>
          <td style="color:var(--neg);font-size:12px">${e.reason}</td>
          <td class="mut tnum" style="font-size:11.5px">${e.received}</td>
          <td style="display:flex;gap:6px"><button class="btn ghost" style="padding:4px 9px;font-size:11px" data-act="migrationdetail" data-arg="${e.id}">Fix Mapping</button><button class="btn ghost" style="padding:4px 9px;font-size:11px" data-act="toast" data-arg="Event ${e.id} ignored">Ignore</button></td>
        </tr>`).join('')}</tbody>
        </table>
      </div>`,
    Corrections: `<div class="table-wrap"><table><thead><tr><th>Original Event</th><th>Correction Event</th><th>Account</th><th>Reason</th><th>Applied</th><th>Status</th></tr></thead>
      <tbody><tr><td class="mono" style="font-size:11.5px">EVT-8820843</td><td class="mono" style="font-size:11.5px">EVT-8820843-CORR</td><td>AC-4821</td><td class="mut">Unit night count correction — Jun 27</td><td class="mut">Jun 28 09:14</td><td>${pill('info','Replayed')}</td></tr>
      <tr><td class="mono" style="font-size:11.5px">EVT-8818210</td><td class="mono" style="font-size:11.5px">EVT-8818210-CORR</td><td>AC-4795</td><td class="mut">Duplicate charge removed</td><td class="mut">Jun 22 15:30</td><td>${pill('good','Applied')}</td></tr>
      </tbody></table></div>`,
    'Source Systems': `<div class="grid" style="grid-template-columns:repeat(3,1fr);gap:12px">${SOURCE_SYSTEMS.map(s=>`<div class="card" style="padding:16px"><div style="font-weight:700;margin-bottom:4px">${s.name}</div><div class="mut" style="font-size:12px;margin-bottom:8px">${s.type}</div>${s.type==='acquired'?`<div style="font-size:12px;margin-bottom:2px">Customers: ${s.mapped}/${s.legacyCustomers} mapped</div><div style="font-size:12px;color:${s.unresolved?'var(--warn)':'var(--pos)'}">Unresolved: ${s.unresolved}</div><button class="btn ghost" style="margin-top:10px;font-size:12px;padding:4px 10px" data-act="migrationdetail" data-arg="${s.id}">View Reconciliation</button>`:`<div style="font-size:12px;color:var(--pos)">${svg(I.check,12)} ${s.status} · ${s.lastSync}</div><div class="mut" style="font-size:11.5px;margin-top:2px">${s.recordsExported} records exported</div>`}</div>`).join('')}</div>`,
  };
  let curUsageTab = 'Overview';
  const render = () => {
    const tabBar = `<div class="tabs" id="usageTabs">${usageTabs.map(t=>`<button class="${t===curUsageTab?'on':''}" onclick="window._setUsageTab('${t}')">${t}</button>`).join('')}</div>`;
    v.innerHTML='';
    v.appendChild(el(`<div class="view">
      ${pageHead('Usage & Metering','June 2026 · 4.82B events ingested · $8,400 overage revenue',
        `<button class="btn ghost" data-act="newmeter">${svg(I.usage,14)} New Meter</button><button class="btn ghost" data-act="usageimport">Import Events</button>`)}
      <div class="toolbar" style="margin-bottom:16px">${tabBar}<div class="spacer"></div></div>
      ${tabContent[curUsageTab]||''}
    </div>`));
  };
  window._setUsageTab = t => { curUsageTab=t; render(); };
  render();
};
/* ---------- Payments ---------- */
