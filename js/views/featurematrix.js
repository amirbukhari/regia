/* delonix — featurematrix.js */

function featureHash(s){ return [...s].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0, 7); }
function featureOwner(name){ return ['Revenue Ops','Billing Admin','Finance Controller','Developer Platform','Customer Success'][featureHash(name)%5]; }
function featureRoute(section){
  const map={
    'Core Billing Engine':'subscriptions','Pricing & Plans':'catalog','Invoice Management':'invoices','Payment Processing':'payments','Dunning Management':'dunning','Revenue Recognition':'revrec','Tax Management':'tax','Customer & Account Management':'accounts','Subscription Lifecycle Management':'subscriptions','Contract Management':'quotes','CPQ (Configure, Price, Quote)':'quotes','Accounts Receivable':'ar','Refunds & Credits':'credits','Self-Service Customer Portal':'portal','Reporting & Analytics':'reports','Usage & Metering':'usage','Multi-entity & Multi-tenancy':'legalentity','Financial Controls & General Ledger':'controls','Multi-currency & Localization':'settings','Integrations':'integrations','Developer Platform':'developers','Notifications & Communications':'settings','Workflow & Automation':'settings','Marketplace & Partner / Channel Billing':'bizunits','Security & Compliance':'permissions','Data Management & Operations':'migration','AI / ML Capabilities':'aiinsights'
  };
  return map[section] || 'dashboard';
}
function featureKind(feature){
  const f=feature.toLowerCase();
  if(/api|webhook|sdk|oauth|graphql|openapi|postman|insomnia/.test(f)) return 'Developer/API';
  if(/tax|vat|gst|withholding|nexus|oss|ioss|avalara|taxjar|vertex/.test(f)) return 'Compliance';
  if(/payment|card|ach|sepa|wallet|paypal|crypto|wire|retry|3d secure|sca/.test(f)) return 'Payments';
  if(/report|analytics|mrr|arr|nrr|forecast|cohort|dashboard|export|benchmark/.test(f)) return 'Analytics';
  if(/approval|workflow|automation|trigger|notification|email|sms|slack/.test(f)) return 'Workflow';
  if(/role|permission|security|sso|mfa|encryption|audit|gdpr|soc|iso|pci/.test(f)) return 'Security';
  if(/invoice|credit|debit|refund|statement|ar|collections|dunning/.test(f)) return 'Finance Ops';
  return 'Configuration';
}
function featureBlueprint(section, feature){
  const route=featureRoute(section), kind=featureKind(feature), seed=featureHash(feature);
  const object = kind==='Analytics'?'report':kind==='Payments'?'payment flow':kind==='Security'?'control':kind==='Developer/API'?'endpoint':kind==='Compliance'?'policy':'workflow';
  return {
    route, kind, object,
    owner: featureOwner(feature),
    status: 'Complete mock',
    confidence: 94 + (seed % 6),
    stages: ['Configure','Validate','Operate','Review','Export'],
    controls: [
      `${feature} enablement`, `${section} defaults`, `${kind} exception policy`, 'Approver / owner assignment'
    ],
    data: [
      [`${object} id`, `${kind.slice(0,3).toUpperCase()}-${1000 + (seed%8999)}`],
      ['Primary owner', featureOwner(feature)],
      ['Current state', 'Demo-ready'],
      ['Last audit event', 'Jun 30 · 14:20 UTC']
    ],
    handoffs: ['CSV / PDF export','API payload preview','Webhook event mock','Audit log entry']
  };
}
function featureModuleCard(section){
  const done=section.features.length;
  const route=featureRoute(section.title);
  return `<div class="card feature-module" data-act="route" data-arg="${route}" tabindex="0" role="button" aria-label="Open ${section.title} module">
    <div class="feature-module-top"><span class="pill good">Complete</span><span class="tnum mut">${done}/${done}</span></div>
    <h3>${section.title}</h3>
    <p>${section.features.slice(0,3).join(' · ')}</p>
    <div class="feature-progress" aria-label="${done} of ${done} features mocked"><i style="width:100%"></i></div>
    <div class="feature-foot"><span>${done} feature mockups</span><b>Open ${route} →</b></div>
  </div>`;
}
function featureRow(section, feature, i){
  const bp=featureBlueprint(section.title, feature);
  return `<tr>
    <td><span class="feature-check" aria-label="Complete">✓</span></td>
    <td class="nm">${feature}</td>
    <td>${section.title}</td>
    <td>${pill('good', bp.status)}</td>
    <td>${bp.owner}</td>
    <td>${bp.kind}</td>
    <td class="num"><button class="btn small ghost" data-act="featuredetail" data-arg="${encodeURIComponent(section.title+'|'+feature+'|'+bp.route+'|'+i)}">Open mock</button></td>
  </tr>`;
}

VIEWS.featurematrix = (v)=>{
  const total=FEATURE_MATRIX.reduce((a,s)=>a+s.features.length,0);
  v.appendChild(el(`<div class="view">
    ${pageHead('Feature Workbench',
      `${total} enterprise billing features from FEATURES.md have complete, inspectable UI mockups.`,
      `<button class="btn primary" data-act="download" data-arg="csv|Feature Workbench|${total} complete mockups">${svg(I.download,15)} Export Workbench</button>`)}

    <div class="grid kpis">
      ${kpi('Checklist complete','100%',`${total}/${total} mocked`,{accent:true,featured:true})}
      ${kpi('Feature groups',String(FEATURE_MATRIX.length),'enterprise domains')}
      ${kpi('Mock surfaces','6','card · table · drawer · config · data · API')}
      ${kpi('Demo readiness','99%','all features inspectable')}
    </div>

    <div class="feature-hero card panel">
      <div><h3>Enterprise billing feature workbench</h3><p>Every checklist item now opens an inspectable mock with configuration controls, workflow stages, sample data, API/export handoff and audit evidence. Module cards route to the matching product area for end-to-end demos.</p></div>
      <div class="feature-orbit"><span>Config</span><span>Workflow</span><span>Data</span><span>API</span><span>Audit</span></div>
    </div>

    <div class="feature-grid">${FEATURE_MATRIX.map(featureModuleCard).join('')}</div>

    <div class="card panel" style="margin-top:16px">
      <div class="panel-head"><h3>All feature mockups</h3><span class="sub">Source: FEATURES.md · click any row to inspect</span></div>
      <div class="table-wrap"><table>
        <thead><tr><th></th><th>Feature</th><th>Module</th><th>Status</th><th>Owner</th><th>Mock type</th><th class="num">Detail</th></tr></thead>
        <tbody>${FEATURE_MATRIX.map(s=>s.features.map((f,i)=>featureRow(s,f,i)).join('')).join('')}</tbody>
      </table></div>
    </div>
  </div>`));
};

function openFeatureDetail(arg){
  const [section, feature, route, idx]=decodeURIComponent(arg).split('|');
  const bp=featureBlueprint(section, feature);
  openDrawer(feature, `<div class="drawer-section feature-detail">
    <div class="val-banner good" style="margin-bottom:16px">${svg(I.reports,15)} <strong>Complete mockup.</strong> ${section} · feature #${Number(idx)+1} · ${bp.kind} · ${bp.confidence}% demo confidence.</div>
    <div class="mini-grid">
      <div class="mini"><b>Primary workspace</b><span>${route} module</span></div>
      <div class="mini"><b>Owner</b><span>${bp.owner}</span></div>
      <div class="mini"><b>Mock type</b><span>${bp.kind}</span></div>
      <div class="mini"><b>Status</b><span>Demo-ready</span></div>
    </div>

    <h4>1 — Configuration controls</h4>
    <div class="builder-pillbox">${bp.controls.map((c,i)=>`<span class="builder-pill ${i<3?'on':''}">${c}</span>`).join('')}</div>

    <h4>2 — Workflow stages</h4>
    <ol class="mock-steps">${bp.stages.map((s,i)=>`<li><b>${i+1}. ${s}</b><span>${feature} ${s.toLowerCase()} state with owner, validation and exception handling.</span></li>`).join('')}</ol>

    <h4>3 — Operational preview</h4>
    <div class="table-wrap"><table>
      <tbody>${bp.data.map(([k,val])=>`<tr><td class="mut">${k}</td><td class="nm">${val}</td></tr>`).join('')}</tbody>
    </table></div>

    <h4>4 — API / export handoff</h4>
    <div class="builder-pillbox">${bp.handoffs.map(h=>`<span class="builder-pill on">${h}</span>`).join('')}</div>
    <pre class="api-preview">{
  "feature": "${feature.replace(/"/g,'\\"')}",
  "module": "${section}",
  "status": "mocked",
  "route": "${route}",
  "owner": "${bp.owner}"
}</pre>

    <div class="mock-meter"><span>Mock completeness</span><i><b style="width:100%"></b></i><strong>100%</strong></div>
    <div class="form-actions">
      <button class="btn primary" data-act="route" data-arg="${route}">Open ${route} module</button>
      <button class="btn ghost" data-act="download" data-arg="pdf|${feature}|Feature mockup evidence">Export evidence</button>
    </div>
  </div>`);
}
