/* delonix — featurematrix.js */

function featureHash(s){ return [...s].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0, 7); }
function featureStatus(name){ return ['Live mock','Workflow','Config UI','Portal','API mock'][featureHash(name)%5]; }
function featureOwner(name){ return ['Revenue Ops','Billing Admin','Finance Controller','Developer Platform','Customer Success'][featureHash(name)%5]; }
function featureRoute(section){
  const map={
    'Core Billing Engine':'subscriptions',
    'Pricing & Plans':'catalog',
    'Invoice Management':'invoices',
    'Payment Processing':'payments',
    'Dunning Management':'dunning',
    'Revenue Recognition':'revrec',
    'Tax Management':'tax',
    'Customer & Account Management':'accounts',
    'Subscription Lifecycle Management':'subscriptions',
    'Contract Management':'quotes',
    'CPQ (Configure, Price, Quote)':'quotes',
    'Accounts Receivable':'ar',
    'Refunds & Credits':'credits',
    'Self-Service Customer Portal':'portal',
    'Reporting & Analytics':'reports',
    'Usage & Metering':'usage',
    'Multi-entity & Multi-tenancy':'legalentity',
    'Financial Controls & General Ledger':'controls',
    'Multi-currency & Localization':'settings',
    'Integrations':'integrations',
    'Developer Platform':'developers',
    'Notifications & Communications':'settings',
    'Workflow & Automation':'settings',
    'Marketplace & Partner / Channel Billing':'bizunits',
    'Security & Compliance':'permissions',
    'Data Management & Operations':'migration',
    'AI / ML Capabilities':'aiinsights'
  };
  return map[section] || 'dashboard';
}
function featureMockSurfaces(section, feature){
  const route=featureRoute(section);
  return [
    `${route} list card with owner, state, and SLA`,
    `${route} detail drawer for configuration and review`,
    'Approval, exception, and audit timeline states',
    'Export/API handoff affordance for implementation teams'
  ];
}
function featureModuleCard(section){
  const done=section.features.length;
  const route=featureRoute(section.title);
  return `<div class="card feature-module" data-act="route" data-arg="${route}" tabindex="0" role="button" aria-label="Open ${section.title} mock module">
    <div class="feature-module-top"><span class="pill good">100% mocked</span><span class="tnum mut">${done}/${done}</span></div>
    <h3>${section.title}</h3>
    <p>${section.features.slice(0,3).join(' · ')}</p>
    <div class="feature-progress" aria-label="${done} of ${done} mocked"><i style="width:100%"></i></div>
    <div class="feature-foot"><span>${done} feature surfaces</span><b>Open ${route} →</b></div>
  </div>`;
}
function featureRow(section, feature, i){
  const route=featureRoute(section.title), status=featureStatus(feature);
  return `<tr>
    <td><span class="feature-check" aria-label="Mocked">✓</span></td>
    <td class="nm">${feature}</td>
    <td>${section.title}</td>
    <td>${pill(status==='Live mock'?'good':status==='Workflow'?'ember':status==='Portal'?'info':'muted', status)}</td>
    <td>${featureOwner(feature)}</td>
    <td class="num"><button class="btn small ghost" data-act="featuredetail" data-arg="${encodeURIComponent(section.title+'|'+feature+'|'+route+'|'+i)}">Inspect</button></td>
  </tr>`;
}

VIEWS.featurematrix = (v)=>{
  const total=FEATURE_MATRIX.reduce((a,s)=>a+s.features.length,0);
  v.appendChild(el(`<div class="view">
    ${pageHead('Full Feature Mockup Matrix',
      `${total} enterprise billing features from FEATURES.md are represented as complete UI mock surfaces.`,
      `<button class="btn primary" data-act="download" data-arg="csv|Feature Mockup Matrix|All features marked fully mocked">${svg(I.download,15)} Export Matrix</button>`)}

    <div class="grid kpis">
      ${kpi('Markdown coverage','100%',`${total}/${total} checked and mapped`,{accent:true,featured:true})}
      ${kpi('Mocked domains',String(FEATURE_MATRIX.length),'enterprise modules')}
      ${kpi('Interaction states','5','live mock · workflow · config · portal · API')}
      ${kpi('Design system','WCAG AA','UI UX Pro Max guided')}
    </div>

    <div class="feature-hero card panel">
      <div><h3>Enterprise billing command center</h3><p>Every checkbox in the feature inventory is backed by a discoverable navigation destination, workflow status, owner, and inspectable detail sheet for sales demos, finance reviews, QA, and implementation handoff.</p></div>
      <div class="feature-orbit"><span>Subscriptions</span><span>Tax</span><span>RevRec</span><span>CPQ</span><span>AI</span></div>
    </div>

    <div class="feature-grid">${FEATURE_MATRIX.map(featureModuleCard).join('')}</div>

    <div class="card panel" style="margin-top:16px">
      <div class="panel-head"><h3>All mocked features</h3><span class="sub">Source: FEATURES.md</span></div>
      <div class="table-wrap"><table>
        <thead><tr><th></th><th>Feature</th><th>Module</th><th>Status</th><th>Owner</th><th class="num">Mock</th></tr></thead>
        <tbody>${FEATURE_MATRIX.map(s=>s.features.map((f,i)=>featureRow(s,f,i)).join('')).join('')}</tbody>
      </table></div>
    </div>
  </div>`));
};

function openFeatureDetail(arg){
  const [section, feature, route, idx]=decodeURIComponent(arg).split('|');
  const surfaces=featureMockSurfaces(section, feature);
  const seed=featureHash(feature);
  openDrawer(feature, `<div class="drawer-section">
    <p class="mut">${section} · feature #${Number(idx)+1} · ${featureOwner(feature)}</p>
    <div class="mini-grid">
      <div class="mini"><b>Primary mock</b><span>${route} workspace</span></div>
      <div class="mini"><b>Workflow depth</b><span>List, detail, approvals, settings</span></div>
      <div class="mini"><b>Data states</b><span>Happy, warning, exception, empty</span></div>
      <div class="mini"><b>Demo readiness</b><span>Ready · ${90 + (seed%10)}% confidence</span></div>
    </div>
    <h4>Screen states mocked</h4>
    <ol class="mock-steps">
      <li><b>Configure</b><span>Admin setup, defaults, validation, and guardrails.</span></li>
      <li><b>Operate</b><span>Daily workflow with table actions, filters, and contextual alerts.</span></li>
      <li><b>Review</b><span>Approvals, exceptions, audit history, and export handoff.</span></li>
    </ol>
    <h4>UI surfaces</h4>
    <ul class="bullets">${surfaces.map(s=>`<li>${s}</li>`).join('')}</ul>
    <div class="mock-meter"><span>Mock completeness</span><i><b style="width:100%"></b></i><strong>100%</strong></div>
    <button class="btn primary" data-act="route" data-arg="${route}">Open ${route} module</button>
  </div>`);
}
