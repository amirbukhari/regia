/* delonix — reports.js */

VIEWS.reports = (v)=>{
  const REP_SNAP = {
    MTD: {sub:'June 2026 · MTD', rows:[['Net Revenue','$329,400','MTD collected',6.8],['Gross Revenue','$487,200','invoiced MTD',5.1],['MRR','$418,350','Jun 2026',4.2],['ARR','$5.02M','run rate',6.1],['Gross Churn','1.8%','revenue churn',-0.4],['Expansion MRR','$28,400','upsell & seat adds',12.3],['DSO','28 days','days sales outstanding',-3.1],['Collection Rate','96.2%','MTD payments',0.6],['Invoice Count','172','issued MTD',2.4],['Avg Invoice','$2,840','per issued invoice',2.6],['CAC','$4,100','blended, Jun',-5.0],['LTV:CAC','8.4×','trailing cohort',3.1]]},
    QTD: {sub:'Q2 2026 · QTD', rows:[['Net Revenue','$948,700','QTD collected',5.9],['Gross Revenue','$1.41M','invoiced QTD',4.8],['MRR','$418,350','Jun 2026',4.2],['ARR','$5.02M','run rate',6.1],['Gross Churn','2.1%','revenue churn',-0.2],['Expansion MRR','$81,200','upsell & seat adds',10.8],['DSO','29 days','days sales outstanding',-2.2],['Collection Rate','95.8%','QTD payments',0.4],['Invoice Count','501','issued QTD',2.1],['Avg Invoice','$2,815','per issued invoice',1.9],['CAC','$4,240','blended, Q2',-3.8],['LTV:CAC','8.1×','trailing cohort',2.6]]},
    YTD: {sub:'2026 · YTD', rows:[['Net Revenue','$1.86M','YTD collected',6.4],['Gross Revenue','$2.74M','invoiced YTD',5.5],['MRR','$418,350','Jun 2026',4.2],['ARR','$5.02M','run rate',6.1],['Gross Churn','2.3%','revenue churn',-0.5],['Expansion MRR','$156,800','upsell & seat adds',11.4],['DSO','30 days','days sales outstanding',-1.8],['Collection Rate','95.4%','YTD payments',0.5],['Invoice Count','987','issued YTD',2.8],['Avg Invoice','$2,776','per issued invoice',1.6],['CAC','$4,380','blended, YTD',-2.9],['LTV:CAC','7.9×','trailing cohort',2.2]]},
  };
  const repSnapFor = (range) => REP_SNAP[range].rows.map(([l,vv,s,tr])=>kpi(l,vv,s,{trend:tr,accent:l==='MRR'})).join('');
  window._setRepRange = (range, btn) => {
    document.querySelectorAll('#reportRangeSeg button').forEach(b=>b.classList.toggle('on', b===btn));
    document.getElementById('repSnapGrid').innerHTML = repSnapFor(range);
    document.getElementById('repSnapSub').textContent = REP_SNAP[range].sub;
    countUpKPIs();
  };
  v.appendChild(el(`<div class="view">
    ${pageHead('Reports & analytics',
      'Board-ready financial reporting, SaaS metrics and data exports — June 2026',
      `<div class="seg" id="reportRangeSeg">
        <button class="on" onclick="window._setRepRange('MTD',this)">MTD</button>
        <button onclick="window._setRepRange('QTD',this)">QTD</button>
        <button onclick="window._setRepRange('YTD',this)">YTD</button>
        <button data-act="daterange" data-arg="custom">Custom</button>
      </div>
      <button class="btn ghost" data-act="schedulereport">${svg(I.settings,15)} Schedule</button>
      <button class="btn primary" data-act="reportbuilder">${svg(I.plus,15)} New report</button>`
    )}

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;margin-bottom:24px">
      <div class="card panel" style="display:flex;flex-direction:column;gap:10px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:36px;height:36px;border-radius:8px;background:rgba(37,99,235,.12);display:flex;align-items:center;justify-content:center;color:var(--ember);flex-shrink:0">${svg(I.revrec,18)}</div>
          <div style="font-weight:700;font-size:14px;color:var(--text-1)">Revenue Analytics</div>
        </div>
        <div style="font-size:12px;color:var(--text-2);line-height:1.5">MRR bridge, cohort ARR, expansion waterfall, and churn analysis across all entities.</div>
        <button class="btn outline" style="margin-top:auto;justify-content:center" data-act="download" data-arg="pdf|Revenue Analytics|June 2026 · 847 records">${svg(I.download,14)} Generate Report</button>
      </div>
      <div class="card panel" style="display:flex;flex-direction:column;gap:10px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:36px;height:36px;border-radius:8px;background:rgba(37,99,235,.12);display:flex;align-items:center;justify-content:center;color:var(--ember);flex-shrink:0">${svg(I.ar,18)}</div>
          <div style="font-weight:700;font-size:14px;color:var(--text-1)">A/R Aging</div>
        </div>
        <div style="font-size:12px;color:var(--text-2);line-height:1.5">Aging buckets by customer, overdue exposure, DSO trend, and collection risk scoring.</div>
        <button class="btn outline" style="margin-top:auto;justify-content:center" data-act="download" data-arg="xlsx|A/R Aging|Jun 28 · 94 invoices · $157,800">${svg(I.download,14)} Generate Report</button>
      </div>
      <div class="card panel" style="display:flex;flex-direction:column;gap:10px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:36px;height:36px;border-radius:8px;background:rgba(37,99,235,.12);display:flex;align-items:center;justify-content:center;color:var(--ember);flex-shrink:0">${svg(I.subs,18)}</div>
          <div style="font-weight:700;font-size:14px;color:var(--text-1)">Subscription Cohorts</div>
        </div>
        <div style="font-size:12px;color:var(--text-2);line-height:1.5">Monthly cohort retention, expansion rates, and lifetime value by acquisition quarter.</div>
        <button class="btn outline" style="margin-top:auto;justify-content:center" data-act="download" data-arg="xlsx|Subscription Cohort Analysis|Q2 2026 · 842 subscribers">${svg(I.download,14)} Generate Report</button>
      </div>
      <div class="card panel" style="display:flex;flex-direction:column;gap:10px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:36px;height:36px;border-radius:8px;background:rgba(37,99,235,.12);display:flex;align-items:center;justify-content:center;color:var(--ember);flex-shrink:0">${svg(I.reports,18)}</div>
          <div style="font-weight:700;font-size:14px;color:var(--text-1)">Executive Pack</div>
        </div>
        <div style="font-size:12px;color:var(--text-2);line-height:1.5">Board-ready PDF: KPI summary, variance to budget, forecast, and key commentary.</div>
        <button class="btn primary" style="margin-top:auto;justify-content:center" data-act="download" data-arg="pdf|Executive Board Pack|12 slides · P&L · MRR bridge · AR aging">${svg(I.download,14)} Generate Report</button>
      </div>
    </div>

    <div class="card panel custom-report-builder" style="margin-bottom:16px">
      <div class="panel-head">
        <h3>Custom report builder</h3>
        <span class="sub">Drag-and-drop reporting mockup · saved as Finance / QBR / Renewal Risk</span>
        <div class="right"><button class="btn primary" data-act="reportbuilder">${svg(I.plus,14)} Open builder</button></div>
      </div>
      <div class="report-builder-grid">
        <div class="builder-rail">
          <div class="builder-label">Dataset</div>
          <div class="builder-card selected">${svg(I.revrec,14)} Revenue ledger</div>
          <div class="builder-card">${svg(I.invoices,14)} Invoices</div>
          <div class="builder-card">${svg(I.subs,14)} Subscriptions</div>
          <div class="builder-card">${svg(I.accounts,14)} Customers</div>
        </div>
        <div class="builder-canvas">
          <div class="builder-label">Builder canvas</div>
          <div class="drop-zone">
            <div>
              <strong>Metrics</strong>
              <span>MRR · ARR · NRR · GRR · churn · expansion · DSO · AR aging</span>
            </div>
            <div>
              <strong>Dimensions</strong>
              <span>Plan · region · legal entity · cohort · customer segment · owner</span>
            </div>
            <div>
              <strong>Filters</strong>
              <span>Enterprise plans · US + EU · active subscriptions · Q2 2026</span>
            </div>
          </div>
          <div class="builder-preview">
            <div class="preview-bar" style="width:92%"></div>
            <div class="preview-bar" style="width:76%"></div>
            <div class="preview-bar" style="width:61%"></div>
            <div class="preview-bar" style="width:47%"></div>
          </div>
        </div>
        <div class="builder-inspector">
          <div class="builder-label">Inspector</div>
          <div class="inspector-row"><span>Visualization</span><b>Pivot + line</b></div>
          <div class="inspector-row"><span>Delivery</span><b>Email + Slack</b></div>
          <div class="inspector-row"><span>Exports</span><b>CSV · PDF · XLSX</b></div>
          <div class="inspector-row"><span>Permissions</span><b>CFO, RevOps</b></div>
          <button class="btn ghost" data-act="schedulereport" style="width:100%;justify-content:center;margin-top:10px">Schedule this report</button>
        </div>
      </div>
    </div>

    <div class="two-col" style="margin-bottom:16px;align-items:start">
      <div>
        <div class="card panel">
          <div class="panel-head"><h3>Metric snapshot</h3><span class="sub" id="repSnapSub">June 2026 · MTD</span></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px" id="repSnapGrid">${repSnapFor('MTD')}
          </div>iv>
        </div>
      </div>

      <div>
        <div class="card panel">
          <div class="panel-head"><h3>Recent reports</h3><div class="right"><button class="btn ghost" style="padding:5px 10px" data-act="reportarchive">View all</button></div></div>
          <div class="table-wrap" style="border:none">
            <table>
              <thead><tr><th>Report</th><th>Period</th><th>Generated by</th><th>Date</th><th>Format</th><th></th></tr></thead>
              <tbody>
                ${db().added.reports.map(r=>`<tr>
                  <td class="nm">${r.name}</td>
                  <td class="mut">${r.period}</td>
                  <td class="mut">${r.by}</td>
                  <td class="mut tnum">${r.date}</td>
                  <td>${pill('muted',r.fmt)}</td>
                  <td><button class="btn ghost" style="padding:4px 8px" data-act="download" data-arg="${r.fmt.toLowerCase()}|${r.name}|${r.period}">${svg(I.download,13)}</button></td>
                </tr>`).join('')}
                <tr>
                  <td class="nm">Executive Board Pack</td>
                  <td class="mut">May 2026</td>
                  <td class="mut">M. Reyes</td>
                  <td class="mut tnum">Jun 01</td>
                  <td>${pill('muted','PDF')}</td>
                  <td><button class="btn ghost" style="padding:4px 8px" data-act="download" data-arg="pdf|Executive Board Pack|May 2026 · 12 slides">${svg(I.download,13)}</button></td>
                </tr>
                <tr>
                  <td class="nm">A/R Aging Detail</td>
                  <td class="mut">Jun 28</td>
                  <td class="mut">D. Cho</td>
                  <td class="mut tnum">Jun 28</td>
                  <td>${pill('muted','XLSX')}</td>
                  <td><button class="btn ghost" style="padding:4px 8px" data-act="download" data-arg="xlsx|A/R Aging Detail|Jun 28 · 94 invoices">${svg(I.download,13)}</button></td>
                </tr>
                <tr>
                  <td class="nm">Revenue Analytics</td>
                  <td class="mut">Q2 2026</td>
                  <td class="mut">M. Reyes</td>
                  <td class="mut tnum">Jun 27</td>
                  <td>${pill('muted','PDF')}</td>
                  <td><button class="btn ghost" style="padding:4px 8px" data-act="download" data-arg="pdf|Revenue Analytics|Q2 2026 · 847 records">${svg(I.download,13)}</button></td>
                </tr>
                <tr>
                  <td class="nm">Subscription Cohorts</td>
                  <td class="mut">Q1 2026</td>
                  <td class="mut">System</td>
                  <td class="mut tnum">Jun 25</td>
                  <td>${pill('muted','XLSX')}</td>
                  <td><button class="btn ghost" style="padding:4px 8px" data-act="download" data-arg="xlsx|Subscription Cohort Analysis|Q1 2026">${svg(I.download,13)}</button></td>
                </tr>
                <tr>
                  <td class="nm">Tax Liability Summary</td>
                  <td class="mut">May 2026</td>
                  <td class="mut">P. Anand</td>
                  <td class="mut tnum">Jun 20</td>
                  <td>${pill('muted','PDF')}</td>
                  <td><button class="btn ghost" style="padding:4px 8px" data-act="download" data-arg="xlsx|Tax Liability Summary|May 2026">${svg(I.download,13)}</button></td>
                </tr>
                <tr>
                  <td class="nm">Collections Risk Report</td>
                  <td class="mut">Jun 2026</td>
                  <td class="mut">D. Cho</td>
                  <td class="mut tnum">Jun 18</td>
                  <td>${pill('muted','XLSX')}</td>
                  <td><button class="btn ghost" style="padding:4px 8px" data-act="download" data-arg="xlsx|Collections Risk Report|Jun 2026 · 23 accounts">${svg(I.download,13)}</button></td>
                </tr>
                <tr>
                  <td class="nm">Cash Flow Forecast</td>
                  <td class="mut">H2 2026</td>
                  <td class="mut">M. Reyes</td>
                  <td class="mut tnum">Jun 15</td>
                  <td>${pill('muted','XLSX')}</td>
                  <td><button class="btn ghost" style="padding:4px 8px" data-act="download" data-arg="xlsx|Cash Flow Forecast|H2 2026 · 6 months">${svg(I.download,13)}</button></td>
                </tr>
                <tr>
                  <td class="nm">MRR Movement Bridge</td>
                  <td class="mut">May 2026</td>
                  <td class="mut">System</td>
                  <td class="mut tnum">Jun 01</td>
                  <td>${pill('muted','PDF')}</td>
                  <td><button class="btn ghost" style="padding:4px 8px" data-act="download" data-arg="xlsx|MRR Movement Bridge|May 2026">${svg(I.download,13)}</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>`));
};


/* ---------- Settings ---------- */
/* ---------- Consolidation ---------- */
