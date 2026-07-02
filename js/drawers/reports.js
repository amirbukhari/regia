/* delonix — reports.js */

function openReportBuilder(){
  openDrawer('Custom Report Builder',`
    <div class="val-banner info" style="margin-bottom:16px">${svg(I.reports,15)} Build a custom report from billing datasets, preview it, then export or schedule delivery.</div>
    <div class="form-section">
      <div class="form-section-title">1 — Dataset</div>
      <div class="radio-group">
        ${[['Revenue ledger','MRR, ARR, NRR, GRR, churn, expansion'],
           ['Invoices','Invoice status, aging, tax, credits, payments'],
           ['Subscriptions','Plan, lifecycle, cohort, seats, renewals'],
           ['Usage events','Meters, overages, caps, invoice usage detail'],
           ['Customers','Segment, health, credit risk, lifecycle stage']
          ].map((r,i)=>`<label class="radio-opt${i===0?' selected':''}">
          <input type="radio" name="rtype" ${i===0?'checked':''} style="accent-color:var(--ember)">
          <div><div style="font-size:13px;font-weight:600;color:var(--text)">${r[0]}</div>
               <div style="font-size:11px;color:var(--text-3);margin-top:1px">${r[1]}</div></div>
        </label>`).join('')}
      </div>
    </div>
    <div class="form-section">
      <div class="form-section-title">2 — Metrics, dimensions and filters</div>
      <div class="builder-pillbox">
        ${['MRR','ARR','NRR','GRR','Churn','Expansion','DSO','AR aging','Tax liability','Usage overage'].map((m,i)=>`<span class="builder-pill ${i<6?'on':''}">${m}</span>`).join('')}
      </div>
      <div class="form-row" style="margin-top:10px"><div class="form-group"><label class="form-label">Group by</label>
        <select class="form-select"><option>Plan → Region → Legal entity</option><option>Cohort → Segment</option><option>Owner → Customer health</option></select></div>
        <div class="form-group"><label class="form-label">Filter</label>
        <select class="form-select"><option>Active enterprise customers</option><option>At-risk renewals</option><option>Open invoices only</option></select></div></div>
    </div>
    <div class="form-section">
      <div class="form-section-title">3 — Date range</div>
      <div class="form-row"><div class="form-group"><label class="form-label">From</label>
        <input class="form-input" type="date" value="2026-06-01"></div>
        <div class="form-group"><label class="form-label">To</label>
        <input class="form-input" type="date" value="2026-06-28"></div></div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${['MTD','QTD','YTD','Last month','Last quarter'].map(l=>`<button class="btn ghost" style="font-size:11px;padding:4px 8px" data-act="toast" data-arg="Date range set to ${l}">${l}</button>`).join('')}
      </div>
    </div>
    <div class="form-section">
      <div class="form-section-title">4 — Visualization and output</div>
      <div class="form-row"><div class="form-group"><label class="form-label">Visualization</label>
        <select class="form-select"><option>Pivot table + line chart</option><option>Bar chart</option><option>Cohort heatmap</option><option>Waterfall</option></select></div>
        <div class="form-group"><label class="form-label">Destination</label>
        <select class="form-select"><option>Reports library + Slack</option><option>Email recipients</option><option>Google Sheets</option><option>S3 export</option></select></div></div>
      <div class="radio-group" style="flex-direction:row;gap:8px">
        ${['PDF','XLSX','CSV','Sheets'].map((f,i)=>`<label class="radio-opt${i===0?' selected':''}" style="flex:1;justify-content:center">
          <input type="radio" name="rfmt" ${i===0?'checked':''} style="accent-color:var(--ember)">${f}</label>`).join('')}
      </div>
    </div>
    <div class="form-section">
      <div class="form-section-title">Preview</div>
      <div class="table-wrap"><table>
        <thead><tr><th>Plan</th><th>Region</th><th class="num">MRR</th><th class="num">NRR</th><th class="num">Churn</th></tr></thead>
        <tbody>
          <tr><td>Enterprise+</td><td>US</td><td class="num tnum">$238,400</td><td class="num tnum">116%</td><td class="num tnum">1.2%</td></tr>
          <tr><td>Enterprise</td><td>EU</td><td class="num tnum">$91,200</td><td class="num tnum">109%</td><td class="num tnum">2.1%</td></tr>
          <tr><td>Growth</td><td>APAC</td><td class="num tnum">$42,700</td><td class="num tnum">101%</td><td class="num tnum">3.4%</td></tr>
        </tbody>
      </table></div>
    </div>
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn ghost" data-act="schedulereport">Schedule delivery</button>
      <button class="btn primary" data-act="download" data-arg="xlsx|Custom Revenue Report|MRR · ARR · NRR · custom dimensions">Generate report</button>
    </div>`);
}

/* ── Schedule Report ── */

function openScheduleReport(){
  openDrawer('Schedule Report Delivery',`
    <div class="form-row"><div class="form-group"><label class="form-label">Report</label>
      <select class="form-select"><option>Revenue Analytics</option><option>A/R Aging</option><option>Executive Summary</option><option>Subscription Cohorts</option></select></div>
      <div class="form-group"><label class="form-label">Format</label>
      <select class="form-select"><option>PDF</option><option>XLSX</option></select></div></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Frequency</label>
      <select class="form-select"><option>Weekly</option><option>Monthly</option><option>Quarterly</option></select></div>
      <div class="form-group"><label class="form-label">Deliver on</label>
      <select class="form-select"><option>1st of month</option><option>Last day of month</option><option>Monday</option><option>Friday</option></select></div></div>
    <div class="form-group"><label class="form-label">Recipients</label>
      <input class="form-input" placeholder="amir@delonix.com, cfo@delonix.com"></div>
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn primary" data-act="toast" data-arg="Scheduled report saved — first delivery on Jul 1">Save schedule</button>
    </div>`);
}

/* ── Invite User ── */

function openRatingDetail(lineId){
  openDrawer('Rating Detail — ' + (lineId||'INV-2026-0847'), `
    <div class="mut" style="font-size:12px;margin-bottom:16px">Shows how each line item was calculated from the subscription, price rule, and usage data.</div>
    <div style="margin-bottom:16px">
      <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-bottom:0">
        <div class="fg"><label>Subscription</label><div class="mono" style="font-size:12px">SUB-2026-0821</div></div>
        <div class="fg"><label>Product Version</label><div class="mut" style="font-size:12px">Enterprise Plan v4.2</div></div>
        <div class="fg"><label>Price Rule</label><div class="mono" style="font-size:12px">PR-ENT-MONTHLY-2026</div></div>
        <div class="fg"><label>Billing Period</label><div class="mut" style="font-size:12px">Jun 1–30, 2026</div></div>
        <div class="fg"><label>GL Account</label><div class="mono" style="font-size:12px">4000 · SaaS Revenue</div></div>
        <div class="fg"><label>Tax Profile</label><div class="mut" style="font-size:12px">US-Standard · 8.25%</div></div>
      </div>
    </div>
    <h4 style="font-size:13px;font-weight:700;margin-bottom:10px">Charge Calculation</h4>
    <div>
      <div class="rating-line"><span class="rating-line-label">Base subscription charge</span><span class="rating-line-note">$9,200 / month</span><span class="rating-line-amt">$9,200.00</span></div>
      <div class="rating-line"><span class="rating-line-label">Proration (30/30 days)</span><span class="rating-line-note">Full month · no proration</span><span class="rating-line-amt" style="color:var(--text-3)">× 1.0000</span></div>
      <div class="rating-line"><span class="rating-line-label">Volume tier discount</span><span class="rating-line-note">Tier 3 · &gt;3000 seats · −5%</span><span class="rating-line-amt" style="color:var(--neg)">−$460.00</span></div>
      <div class="rating-line"><span class="rating-line-label">Contracted discount</span><span class="rating-line-note">Annual commitment discount</span><span class="rating-line-amt" style="color:var(--neg)">−$0.00</span></div>
      <div class="rating-line"><span class="rating-line-label">Subtotal (pre-tax)</span><span class="rating-line-note"></span><span class="rating-line-amt">$8,740.00</span></div>
      <div class="rating-line"><span class="rating-line-label">Tax</span><span class="rating-line-note">US-Standard · 8.25% on $8,740</span><span class="rating-line-amt">$721.05</span></div>
      <div class="rating-total"><span>Final charge</span><span>$9,461.05</span></div>
    </div>
    <div style="margin-top:16px">
      <div class="val-banner info" style="margin-bottom:0">${svg(I.rating,14)} This calculation is based on the price rule snapshot at billing generation time. The source rule version is locked to the invoice and cannot be retroactively changed.</div>
    </div>
  `);
}

function openDateRangePicker(context){
  openDrawer('Select Date Range', `
    <div style="margin-bottom:14px">
      <div style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:8px">QUICK RANGES</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
        ${[['This month','Jun 1 – Jun 28, 2026'],['Last month','May 1 – May 31, 2026'],['This quarter','Apr 1 – Jun 30, 2026'],['Last quarter','Jan 1 – Mar 31, 2026'],['YTD','Jan 1 – Jun 28, 2026'],['Last 12 months','Jul 2025 – Jun 2026']].map(([l,d])=>`<button class="btn ghost" style="text-align:left;font-size:12px;padding:8px 12px" data-act="toast" data-arg="Date range set to ${l}"><div style="font-weight:600">${l}</div><div class="mut" style="font-size:11px">${d}</div></button>`).join('')}
      </div>
    </div>
    <div style="margin-bottom:14px">
      <div style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:8px">CUSTOM RANGE</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div class="fg" style="margin:0"><label>From</label><input class="finput" type="date" value="2026-06-01"></div>
        <div class="fg" style="margin:0"><label>To</label><input class="finput" type="date" value="2026-06-28"></div>
      </div>
    </div>
    <div class="form-actions">
      <button class="btn primary" data-act="toast" data-arg="Date range set to custom Jun 1–28">Apply Range</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openReportArchive(){
  openDrawer('Report Archive', `
    <div class="toolbar" style="margin-bottom:12px">
      <span class="chip">${svg(I.filter,13)} Report type</span>
      <span class="chip">${svg(I.filter,13)} Period</span>
      <div class="spacer"></div>
    </div>
    <div class="table-wrap"><table>
      <thead><tr><th>Report</th><th>Period</th><th>Generated</th><th>Format</th><th></th></tr></thead>
      <tbody>
        ${[['Revenue Analytics','May 2026','Jun 1 · 09:00','PDF'],['A/R Aging Detail','May 2026','Jun 1 · 09:05','XLSX'],['Board Pack','Q1 2026','Apr 2 · 08:00','PDF'],['MRR Movement Bridge','Q1 2026','Apr 2 · 08:05','XLSX'],['Tax Liability Summary','Q1 2026','Apr 15 · 12:00','XLSX'],['Collections Risk Report','Apr 2026','May 1 · 09:10','XLSX']].map(([n,p,g,f])=>`<tr>
          <td style="font-weight:600;font-size:13px">${n}</td>
          <td class="mut">${p}</td>
          <td class="mut tnum" style="font-size:11.5px">${g}</td>
          <td class="mono mut" style="font-size:11.5px">${f}</td>
          <td><button class="btn ghost" style="padding:4px 8px;font-size:11px" data-act="download" data-arg="${f.toLowerCase()}|${n}|${p}">Download</button></td>
        </tr>`).join('')}
      </tbody>
    </table></div>
  `);
}

function openAIQuery(q){
  const query = q||'Which cohorts have net retention above 110%?';
  const ANSWERS = [
    {test:/nrr|retention/i, intro:'<strong>3 cohorts</strong> show net revenue retention above 110% in the trailing 12 months:',
     head:['Cohort','NRR','Accounts','Avg MRR','Trend'],
     rows:[['Q1 2023 · Enterprise','<b style="color:var(--pos)">118%</b>','24','$9,200','↑ +2pp QoQ'],['Q3 2023 · Enterprise+','<b style="color:var(--pos)">115%</b>','12','$14,800','↑ +1pp QoQ'],['Q2 2022 · Business+','<b style="color:var(--pos)">112%</b>','38','$3,900','→ flat']],
     note:'Expansion revenue is the primary driver in all three cohorts. Q1 2023 Enterprise shows the highest seat expansion rate (avg 1.4 seats/account/quarter).'},
    {test:/expansion|plan/i, intro:'<strong>Enterprise+ leads expansion</strong> across the trailing two quarters:',
     head:['Plan','Expansion rate','Upgrades (90d)','Avg delta'],
     rows:[['Enterprise+','<b style="color:var(--pos)">9.4%</b>','7','+$2,300'],['Enterprise','6.1%','11','+$1,480'],['Business+','4.8%','9','+$760'],['Business','2.2%','6','+$410']],
     note:'Seat growth drives 71% of expansion; usage overages the remainder. Business tiers expand mainly at renewal.'},
    {test:/churn|cohort/i, intro:'<strong>2024 cohorts churn less than 2023</strong> at every tenure checkpoint:',
     head:['Cohort year','M6 gross churn','M12 gross churn','Trend'],
     rows:[['2023','3.1%','5.8%','baseline'],['2024','<b style="color:var(--pos)">2.2%</b>','<b style="color:var(--pos)">4.1%</b>','↓ 29% better']],
     note:'Improved onboarding and dunning recovery account for most of the reduction; Starter remains the highest-churn tier in both cohorts.'},
    {test:/mrr|bridge|movement/i, intro:'<strong>MRR bridge, last 6 months</strong> (net +$24,150 across business units):',
     head:['Component','Residential','Commercial','Ent. Platform'],
     rows:[['New','+$9,400','+$6,100','+$3,800'],['Expansion','+$7,900','+$5,300','+$2,600'],['Contraction','−$2,100','−$1,700','−$900'],['Churn','−$3,600','−$2,300','−$450']],
     note:'Residential contributes 47% of net growth; Enterprise Platform churn is near zero on annual contracts.'},
  ];
  const a = ANSWERS.find(x=>x.test.test(query)) || ANSWERS[0];
  openDrawer('Delonix Intelligence — Query Results', `
    <div style="background:var(--surface);border-radius:8px;padding:12px 14px;margin-bottom:16px;font-size:13px;display:flex;align-items:flex-start;gap:10px">
      ${svg(I.ai,15)}<span class="mut">${query}</span>
    </div>
    <div style="font-size:13px;line-height:1.7;margin-bottom:16px">
      <p>${a.intro}</p>
      <table class="tbl" style="width:100%;margin-top:8px">
        <thead><tr>${a.head.map(h=>`<th>${h}</th>`).join('')}</tr></thead>
        <tbody>${a.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
      <p style="margin-top:12px" class="mut">${a.note}</p>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">
      ${['Show breakdown','Chart over time','Export to CSV','Add to report'].map(s=>`
        <button class="btn ghost" style="font-size:12px" data-act="toast" data-arg="${s} — ${query.slice(0,50)}">${s}</button>`).join('')}
    </div>
    <div class="form-actions">
      <button class="btn primary" data-act="toast" data-arg="Report created from AI query">Save as report</button>
      <button class="btn ghost" onclick="closeDrawer()">Close</button>
    </div>
  `);
}

function openScheduleDigest(){
  openDrawer('Schedule AI digest',`
    <div style="display:flex;flex-direction:column;gap:12px">
      <div class="mut" style="font-size:13px">Delonix Intelligence will analyse your revenue data and send a digest to selected recipients.</div>
      <div><label class="lbl">Frequency</label><select class="input" style="width:100%"><option>Weekly (every Monday 8am)</option><option>Daily (every day 8am)</option><option>Bi-weekly</option><option>Monthly (1st of month)</option></select></div>
      <div><label class="lbl">Recipients</label><input class="input" value="abukhari@delonix.com" style="width:100%"></div>
      <div><label class="lbl">Include sections</label>
        <div style="display:flex;flex-direction:column;gap:6px;margin-top:6px">
          ${['Revenue anomalies','MRR movement','Top accounts at risk','Forecast vs actual','AI recommendations'].map(s=>`
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px">
              <input type="checkbox" checked style="accent-color:var(--ember)"> ${s}
            </label>`).join('')}
        </div>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button class="btn ghost" data-act="close">Cancel</button>
        <button class="btn primary" data-act="toast" data-arg="AI digest scheduled">Save schedule</button>
      </div>
    </div>
  `);
}
