/* delonix — subscriptions.js */

function openNewQuote(){
  openDrawer('New Quote',`
    <div class="form-row"><div class="form-group"><label class="form-label">Customer</label>
      <select class="form-select"><option value="">— select —</option>${custOpts()}</select></div>
      <div class="form-group"><label class="form-label">Owner</label>
      <select class="form-select"><option>M. Reyes</option><option>P. Anand</option><option>D. Cho</option><option>Amir Bukhari</option></select></div></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Deal name</label>
      <input class="form-input" placeholder="e.g. Acme Corp Enterprise Renewal 2027"></div>
      <div class="form-group" style="max-width:140px"><label class="form-label">Expires</label>
      <input class="form-input" type="date" value="2026-07-28"></div></div>
    <div class="form-section">
      <div class="form-section-title">Line items</div>
      <div style="display:grid;grid-template-columns:1fr 60px 90px 70px 80px 28px;gap:8px;margin-bottom:6px">
        <span class="form-label">Product</span><span class="form-label">Qty</span>
        <span class="form-label">Unit price</span><span class="form-label">Disc %</span>
        <span class="form-label">Total</span><span></span></div>
      <div class="line-item-row" style="grid-template-columns:1fr 60px 90px 70px 80px 28px">
        <select class="form-select">${planOpts()}</select>
        <input class="form-input" type="number" value="1"><input class="form-input" type="number" value="8500">
        <input class="form-input" type="number" value="10"><span class="line-item-total">$7,650</span>
        <button class="li-del">×</button></div>
      <button class="btn ghost" style="margin-top:6px;font-size:12px" data-act="toast" data-arg="Line item added">+ Add line item</button>
    </div>
    <div class="form-row"><div class="form-group"><label class="form-label">Payment terms</label>
      <select class="form-select"><option>Net 30</option><option>Net 60</option><option>Annual prepay</option></select></div>
      <div class="form-group"><label class="form-label">Stage</label>
      <select class="form-select"><option>Discovery</option><option>Proposal</option><option>Negotiation</option></select></div></div>
    <div class="form-group"><label class="form-label">Notes</label>
      <textarea class="form-textarea" placeholder="Deal context, custom terms, internal notes…"></textarea></div>
    <div class="form-footer">
      <button class="btn ghost" data-act="toast" data-arg="Quote QT-2026-0094 saved as draft">Save draft</button>
      <button class="btn primary" data-act="toast" data-arg="Quote QT-2026-0094 sent for internal review">Send for review</button>
    </div>`);
}

/* ── New Customer ── */

function openNewSub(){
  openDrawer('New Subscription',`
    <div class="form-row"><div class="form-group"><label class="form-label">Customer</label>
      <select class="form-select" id="ns_customer"><option value="">— select customer —</option>${custOpts()}</select></div></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Plan</label>
      <select class="form-select" id="ns_plan">${planOpts()}</select></div>
      <div class="form-group"><label class="form-label">Billing cycle</label>
      <select class="form-select"><option>Monthly</option><option>Annual (save 20%)</option><option>Quarterly</option></select></div></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Seats</label>
      <input class="form-input" type="number" value="5" min="1"></div>
      <div class="form-group"><label class="form-label">Start date</label>
      <input class="form-input" type="date" value="2026-07-01"></div>
      <div class="form-group"><label class="form-label">Trial period</label>
      <select class="form-select"><option>No trial</option><option>7 days</option><option>14 days</option><option>30 days</option></select></div></div>
    <div class="form-group"><label class="form-label">Notes</label>
      <textarea class="form-textarea" placeholder="Internal notes…"></textarea></div>
    <div class="form-footer">
      <button class="btn ghost" data-act="close">Cancel</button>
      <button class="btn primary" data-act="createsub">Create subscription</button>
    </div>`);
}

/* ── New Credit Note ── */

function openUsageEvent(id){
  const evts = {
    'EVT-8821042':{src:'BuildStream-API',srcId:'bs_evt_4821042',idempotency:'bsv2-4821042',eventTs:'Jun 28 2026 14:32:01 UTC',receivedTs:'Jun 28 2026 14:32:02 UTC',acct:'AC-4821',acctName:'Northwind Logistics',product:'API Calls',qty:'14,200',unit:'calls',status:'accepted',tier:'Business+',overage:200,invoiced:'INV-2026-DRAFT-4',ratingStatus:'rated'},
    'EVT-8820991':{src:'BuildStream-API',srcId:'bs_evt_4820991',idempotency:'bsv2-4820991',eventTs:'Jun 28 2026 13:48:20 UTC',receivedTs:'Jun 28 2026 13:48:21 UTC',acct:'AC-UNKNOWN',acctName:'Unknown',product:'API Calls',qty:'200',unit:'calls',status:'rejected',rejectionReason:'No account mapping — source ID "AC-UNKNOWN" not found in account registry.',invoiced:null,ratingStatus:'not rated'},
  };
  const e = evts[id]||evts['EVT-8821042'];
  openDrawer(`Usage Event — ${id}`, `
    <div style="margin-bottom:16px">${e.status==='accepted'?pill('good','Accepted'):e.status==='rejected'?pill('neg','Rejected'):pill('warn',e.status)}</div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-bottom:16px">
      <div class="fg"><label>Event ID</label><div class="mono" style="font-size:12px">${id}</div></div>
      <div class="fg"><label>Source System</label><div>${e.src}</div></div>
      <div class="fg"><label>Source Event ID</label><div class="mono" style="font-size:12px">${e.srcId}</div></div>
      <div class="fg"><label>Idempotency Key</label><div class="mono" style="font-size:12px">${e.idempotency||'—'}</div></div>
      <div class="fg"><label>Event Timestamp</label><div class="tnum" style="font-size:12px">${e.eventTs}</div></div>
      <div class="fg"><label>Received</label><div class="tnum" style="font-size:12px">${e.receivedTs}</div></div>
      <div class="fg"><label>Account</label><div>${e.acctName} <span class="mono mut" style="font-size:11px">${e.acct}</span></div></div>
      <div class="fg"><label>Product</label><div>${e.product}</div></div>
      <div class="fg"><label>Quantity</label><div class="tnum">${e.qty} ${e.unit}</div></div>
      <div class="fg"><label>Applied to Invoice</label><div class="mono" style="font-size:12px">${e.invoiced||'—'}</div></div>
    </div>
    ${e.rejectionReason?`<div class="val-banner error">${svg(I.warning,14)} <div><strong>Rejection reason:</strong> ${e.rejectionReason}</div></div>`:''}
    ${e.status==='accepted'?`<button class="btn ghost" style="font-size:12px" data-act="ratingdetail" data-arg="${id}">View rating detail</button>`:`<button class="btn primary" style="font-size:12px" data-act="migrationdetail" data-arg="${id}">Fix Mapping &amp; Replay</button>`}
  `);
}

function openNewMeter(){
  openDrawer('New Usage Meter', `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Meter name</label><input class="finput" placeholder="e.g. API Calls" autofocus></div>
      <div class="fg"><label>Meter ID / slug</label><input class="finput" placeholder="api_calls" style="font-family:monospace"></div>
      <div class="fg"><label>Unit of measure</label><input class="finput" placeholder="calls, GB, users, unit-nights…"></div>
      <div class="fg"><label>Aggregation</label><select class="finput"><option>Sum</option><option>Max</option><option>Count distinct</option><option>Last value</option></select></div>
      <div class="fg"><label>Reset interval</label><select class="finput"><option>Monthly</option><option>Annually</option><option>Never (cumulative)</option></select></div>
      <div class="fg"><label>Idempotency</label><select class="finput"><option selected>Required (recommended)</option><option>Optional</option><option>Disabled</option></select></div>
      <div class="fg" style="grid-column:1/-1"><label>Source system filter</label><input class="finput" placeholder="Leave blank to accept from all sources"></div>
    </div>
    <div class="val-banner info" style="margin-top:12px">${svg(I.rating,14)} Meter ID is immutable after creation. Events must include this ID as the meter reference to be counted.</div>
    <div class="form-actions" style="margin-top:14px">
      <button class="btn primary" data-act="toast" data-arg="New meter created — begin sending events to start tracking">Create Meter</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openUsageImport(){
  openDrawer('Import Usage Events', `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1">
        <label>Upload CSV or JSONL</label>
        <div style="border:2px dashed var(--border-2);border-radius:8px;padding:28px;text-align:center;color:var(--text-3);cursor:pointer" onclick="toast('File picker opened')">
          <div style="margin-bottom:8px">${svg(I.download,26)}</div>
          <div style="font-size:13px">Drop file here or click to browse</div>
          <div class="mut" style="font-size:11.5px;margin-top:4px">CSV or JSONL · max 100 MB · up to 1M events</div>
        </div>
      </div>
      <div class="fg"><label>Source system</label><select class="finput"><option>BuildStream-API</option><option>Meter-v2</option><option>Legacy-CSV</option><option>Manual</option></select></div>
      <div class="fg"><label>Deduplication</label><select class="finput"><option selected>Skip duplicates (idempotency key)</option><option>Allow duplicates</option><option>Error on duplicates</option></select></div>
      <div class="fg"><label>Billing period override</label><input class="finput" placeholder="Leave blank to use event timestamp"></div>
      <div class="fg"><label>Validation mode</label><select class="finput"><option selected>Validate then import</option><option>Import with warnings</option></select></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Usage import queued — validating 0 events">Start Import</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openChangePlan(acct){
  openDrawer(`Change Plan — ${acct||'Account'}`, `
    <div class="mut" style="font-size:12.5px;margin-bottom:16px">Plan changes take effect at the next billing cycle unless immediate activation is selected. Proration will apply for mid-cycle changes.</div>
    <div style="margin-bottom:16px">
      <div style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:6px">CURRENT PLAN</div>
      <div style="padding:10px 14px;border:1px solid var(--ember);border-radius:8px;background:var(--ember-glow)">${pill('ember','Enterprise')} <span style="margin-left:8px;font-size:13px;font-weight:600">$9,200 / month</span></div>
    </div>
    <div>
      <div style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:8px">SELECT NEW PLAN</div>
      <div style="display:flex;flex-direction:column;gap:7px">
        ${[['Enterprise+','$12,000','Unlimited API · Priority support'],['Enterprise','$9,200','Current plan'],['Business+','$4,200','5M API · 500GB storage'],['Business','$1,800','1M API · 100GB storage']].map((p,i)=>`<label style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1.5px solid ${i===1?'var(--ember)':'var(--border)'};border-radius:8px;cursor:pointer">
          <input type="radio" name="planchange" ${i===1?'checked':''}> <div style="flex:1"><div style="font-weight:600;font-size:13px">${p[0]}</div><div class="mut" style="font-size:12px">${p[2]}</div></div><span class="tnum" style="font-weight:700">${p[1]}/mo</span>
        </label>`).join('')}
      </div>
    </div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-top:12px">
      <div class="fg"><label>Effective date</label><select class="finput"><option selected>Next billing cycle (Jul 1)</option><option>Immediately (prorated)</option></select></div>
      <div class="fg"><label>Reason</label><select class="finput"><option>Customer request</option><option>Sales negotiation</option><option>Auto-upgrade</option></select></div>
    </div>
    <div class="form-actions" style="margin-top:14px">
      <button class="btn primary" data-act="planchange" data-arg="${acct||'Account'}">Confirm Change</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openRenewalQuote(acct){
  openDrawer(`Renewal Quote — ${acct||'Account'}`, `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg"><label>Contract end date</label><div class="tnum">Jun 30, 2026</div></div>
      <div class="fg"><label>Current ARR</label><div class="tnum">$110,400</div></div>
      <div class="fg"><label>Renewal term</label><select class="finput"><option selected>12 months</option><option>24 months</option><option>36 months</option></select></div>
      <div class="fg"><label>Renewal type</label><select class="finput"><option selected>Auto-renew at current pricing</option><option>Price increase (CPI + 3%)</option><option>Custom pricing</option><option>Do not renew</option></select></div>
      <div class="fg"><label>Renewal ARR</label><input class="finput" type="number" value="110400"></div>
      <div class="fg"><label>Discount</label><input class="finput" type="number" placeholder="0" value="0">%</div>
    </div>
    <div class="form-actions" style="margin-top:14px">
      <button class="btn primary" data-act="toast" data-arg="Renewal quote QT-2026-0095 created and sent for review">Create Renewal Quote</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}
