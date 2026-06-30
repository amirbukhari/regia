/* delonix — bizunits.js */

VIEWS.bizunits = (v)=>{
  const buColor = b => b.color||'#888';
  const statusPill = s => s==='active'?pill('good','Active'):s==='migration'?pill('warn','Migration'):pill('muted',s);

  /* GL mapping rows per BU */
  const GL_ROWS = [
    ['Subscription Revenue','4000 · SaaS Revenue','4000 · SaaS Revenue','4000 · SaaS Revenue','4000 · SaaS Revenue','N/A (legacy)'],
    ['Overage / Usage Revenue','4010 · Usage Revenue','4010 · Usage Revenue','4010 · Usage Revenue','4010 · Usage Revenue','N/A'],
    ['Deferred Revenue','2800 · Deferred Rev.','2800 · Deferred Rev.','2800 · Deferred Rev.','2800 · Deferred Rev.','N/A'],
    ['Accounts Receivable','1200 · AR Trade','1200 · AR Trade','1200 · AR Trade','1250 · EU AR','1200 · AR Trade'],
    ['Tax Payable','2100 · Sales Tax','2100 · Sales Tax','2100 · Sales Tax','2110 · EU VAT','2100 · Sales Tax'],
    ['Revenue Contra','4090 · Discounts','4090 · Discounts','4090 · Discounts','4090 · Discounts','N/A'],
  ];

  /* Product availability matrix */
  const PLANS = ['Enterprise Plus','Enterprise','Business+','Business','Starter'];
  const PLAN_AVAIL = [
    [true,true,true,true,false],   // BU-001 Residential
    [true,true,true,true,true],    // BU-002 Commercial
    [true,true,false,false,false], // BU-003 Enterprise Platform
    [true,true,true,false,false],  // BU-004 International
    [false,false,true,true,true],  // BU-005 PropTech (legacy plans only)
  ];

  v.appendChild(el(`<div class="view">
    ${pageHead('Business Units','5 units · 4 legal entities · $418,350 MRR',
      `<button class="btn ghost" data-act="glmapping" data-arg="BU-001">${svg(I.settings,14)} GL Mappings</button><button class="btn primary" data-act="newbizunit">+ New Business Unit</button>`)}

    <div class="grid kpis" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
      ${kpi('Active Business Units','4','1 in migration',{accent:true})}
      ${kpi('Legal Entities','4','3 currencies',{})}
      ${kpi('Total MRR','$418,350','across all BUs',{trend:5.2})}
      ${kpi('Active Subscriptions','689','in 4 BUs',{})}
    </div>

    <div class="val-banner info" style="margin-bottom:16px">${svg(I.bu,15)} <strong>Business Unit</strong> controls invoice branding, legal entity assignment, tax profile, GL export destination, product availability, and default invoice grouping. A single customer may span multiple Business Units.</div>

    <!-- BU Table -->
    <div class="card panel" style="margin-bottom:20px;padding:0;overflow:hidden">
      <div class="panel-head" style="border-bottom:1px solid var(--border)"><h3>All Business Units</h3></div>
      <div class="table-wrap" style="margin:0">
        <table>
          <thead><tr>
            <th>Business Unit</th><th>Brand Name</th><th>Legal Entity</th><th>Currency</th>
            <th>Tax Profile</th><th>GL Export</th><th>Template</th>
            <th class="num">MRR</th><th class="num">Subs</th><th>Status</th><th></th>
          </tr></thead>
          <tbody>${BUS.map(b=>`<tr data-act="bizunit" data-arg="${b.id}" style="cursor:pointer">
            <td><div style="display:flex;align-items:center;gap:8px">
              <span class="bu-dot" style="background:${buColor(b)};width:10px;height:10px;border-radius:50%;flex-shrink:0"></span>
              <strong style="font-size:13px">${b.name}</strong>
            </div></td>
            <td class="mut" style="font-size:12px">${b.brand}</td>
            <td style="font-size:12px">${b.entity}</td>
            <td class="mono mut" style="font-size:12px">${b.currency}</td>
            <td class="mut" style="font-size:11.5px">${b.taxProfile}</td>
            <td class="mut" style="font-size:11.5px">${b.glDest}</td>
            <td class="mut" style="font-size:11.5px">${b.template}</td>
            <td class="num tnum">${b.mrr?fmt(b.mrr):'—'}</td>
            <td class="num tnum">${b.subs}</td>
            <td>${statusPill(b.status)}</td>
            <td class="mut">${svg('<polyline points="9 18 15 12 9 6"/>',14)}</td>
          </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- GL Mapping Overview -->
    <div class="card panel" style="margin-bottom:20px;padding:0;overflow:hidden">
      <div class="panel-head" style="border-bottom:1px solid var(--border)">
        <h3>GL Account Mappings — All Business Units</h3>
        <button class="btn ghost" style="font-size:12px;padding:5px 10px" data-act="glmapping" data-arg="BU-001">Edit Mappings</button>
      </div>
      <div class="table-wrap" style="margin:0">
        <table>
          <thead><tr>
            <th>Revenue Category</th>
            ${BUS.map(b=>`<th><span class="bu-badge"><span class="bu-dot" style="background:${buColor(b)}"></span>${b.name}</span></th>`).join('')}
          </tr></thead>
          <tbody>${GL_ROWS.map(([cat,...accts])=>`<tr>
            <td style="font-size:12.5px;font-weight:600">${cat}</td>
            ${accts.map((a,i)=>`<td class="mono mut" style="font-size:11px;${a==='N/A'||a==='N/A (legacy)'?'color:var(--neg);opacity:.7':''}">${a}</td>`).join('')}
          </tr>`).join('')}</tbody>
        </table>
      </div>
      <div style="padding:10px 16px;border-top:1px solid var(--border);font-size:12px;color:var(--text-2)">
        ${svg(I.warning,13)} <span style="color:var(--warn)">BU-005 (PropTech)</span> has no active GL mappings — all charges route to manual review queue during migration.
      </div>
    </div>

    <!-- Product Availability Matrix -->
    <div class="card panel" style="margin-bottom:20px;padding:0;overflow:hidden">
      <div class="panel-head" style="border-bottom:1px solid var(--border)"><h3>Product Availability Matrix</h3><span class="mut" style="font-size:12px">Which plans are available to sell in each Business Unit</span></div>
      <div class="table-wrap" style="margin:0">
        <table>
          <thead><tr>
            <th>Plan</th>
            ${BUS.map(b=>`<th style="text-align:center"><span class="bu-badge"><span class="bu-dot" style="background:${buColor(b)}"></span>${b.name}</span></th>`).join('')}
          </tr></thead>
          <tbody>${PLANS.map((p,pi)=>`<tr>
            <td style="font-weight:600;font-size:13px">${p}</td>
            ${PLAN_AVAIL.map((buPlans,bi)=>`<td style="text-align:center;font-size:16px">${buPlans[pi]?'<span style="color:var(--pos)">✓</span>':'<span style="color:var(--border-2)">—</span>'}</td>`).join('')}
          </tr>`).join('')}</tbody>
        </table>
      </div>
    </div>

    <!-- Conflicts & Warnings -->
    <div class="card panel" style="padding:0;overflow:hidden">
      <div class="panel-head" style="border-bottom:1px solid var(--border)"><h3>Conflicts &amp; Warnings</h3></div>
      <div style="padding:14px 18px;display:flex;flex-direction:column;gap:10px">
        <div class="val-banner warn">${svg(I.warning,14)}
          <div><strong>BU-005 (PropTech/Acquired)</strong> still uses BuildStream invoice template. 8 customers have finalized invoices with legacy branding.
          <button class="btn ghost" style="margin-left:8px;padding:3px 8px;font-size:12px" data-act="migrationdetail" data-arg="SS-001">View migration status</button></div>
        </div>
        <div class="val-banner warn">${svg(I.warning,14)}
          <div><strong>BU-003 (Enterprise Platform)</strong> and <strong>BU-004 (International)</strong> have different legal entities. Accounts with subscriptions in both BUs require explicit invoice grouping policy or invoices will be split.
          <button class="btn ghost" style="margin-left:8px;padding:3px 8px;font-size:12px" data-act="invgrouping" data-arg="GP-001">Review policies</button></div>
        </div>
        <div class="val-banner info">${svg(I.check,14)} <div>BU-001 through BU-004 all have GL mappings and tax profiles configured. All active subscriptions will invoice normally at next billing cycle.</div></div>
      </div>
    </div>
  </div>`));
};
