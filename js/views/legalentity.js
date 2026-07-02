/* delonix — legalentity.js */

VIEWS.legalentity = (v)=>{
  /* Tax registrations per entity */
  const TAX_REGS = {
    'LE-001': [
      {jurisdiction:'US Federal',type:'EIN',id:'98-4821034',status:'Active'},
      {jurisdiction:'California',type:'CA SUT',id:'CA-482-103412',status:'Active'},
      {jurisdiction:'New York',type:'NY SUT',id:'NY-73841-9',status:'Active'},
      {jurisdiction:'Texas',type:'TX SUT',id:'TX-1102948-4',status:'Active'},
    ],
    'LE-002': [
      {jurisdiction:'US Federal',type:'EIN',id:'47-9012384',status:'Active'},
      {jurisdiction:'Delaware',type:'DE Franchise',id:'DE-7284012',status:'Active'},
    ],
    'LE-003': [
      {jurisdiction:'Netherlands',type:'VAT',id:'NL004821034B01',status:'Active'},
      {jurisdiction:'EU OSS',type:'VAT OSS',id:'EU-OSS-NL-2024',status:'Active'},
      {jurisdiction:'Germany',type:'DE VAT',id:'DE-482-104823',status:'Active'},
    ],
    'LE-004': [
      {jurisdiction:'England & Wales',type:'VAT',id:'GB 482 1034 82',status:'Inactive (legacy)'},
    ],
  };
  const GL_ACCTS = {
    'LE-001': [['4000','SaaS Revenue'],['2800','Deferred Revenue'],['1200','Accounts Receivable'],['2100','Sales Tax Payable']],
    'LE-002': [['4000','SaaS Revenue'],['2800','Deferred Revenue'],['1200','Accounts Receivable'],['2100','Sales Tax Payable']],
    'LE-003': [['4000','SaaS Revenue EUR'],['2800','Deferred Revenue EUR'],['1250','EU AR Trade'],['2110','EU VAT Payable']],
    'LE-004': [['Legacy','Mapped to BuildStream GL'],['—','Pending migration'],['—','—'],['—','—']],
  };
  v.appendChild(el(`<div class="view">
    ${pageHead('Legal Entities','4 entities · 3 currencies · GL systems: NetSuite, Xero, QuickBooks',
      `<button class="btn ghost" data-act="download" data-arg="xlsx|Tax Registrations|4 entities">${svg(I.download,14)} Export</button><button class="btn primary" data-act="newlegalentity">+ New Legal Entity</button>`)}
    <div class="grid kpis" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
      ${kpi('Legal Entities',''+(LEGAL_ENTITIES.length+db().added.legalentities.length),([...LEGAL_ENTITIES,...db().added.legalentities].filter(e=>e.status==='active').length)+' active · '+LEGAL_ENTITIES.filter(e=>e.status==='migration').length+' in migration',{accent:true})}
      ${kpi('Currencies',''+new Set(LEGAL_ENTITIES.map(e=>e.currency)).size,[...new Set(LEGAL_ENTITIES.map(e=>e.currency))].join(' · '),{})}
      ${kpi('GL Systems','3','NetSuite · Xero · QB',{})}
      ${kpi('Tax Jurisdictions','8','across all entities',{})}
    </div>
    <div class="val-banner warn" style="margin-bottom:18px">${svg(I.warning,15)} <strong>Invoices cannot mix charges from different legal entities.</strong> Accounts with subscriptions across multiple legal entities will generate split invoices unless an explicit cross-entity grouping policy is approved by Finance.</div>
    ${[...db().added.legalentities.map(x=>({id:x.id,name:x.name,short:x.name.split(' ')[0],country:x.country,flag:({US:'🇺🇸',NL:'🇳🇱',UK:'🇬🇧',DE:'🇩🇪'})[x.country]||'🏳️',taxId:'pending registration',currency:x.currency,vatId:'—',bUs:[],glSystem:x.glSystem,arAcct:'1200 · Accounts Receivable',deferredAcct:'2800 · Deferred Revenue',status:x.status})), ...LEGAL_ENTITIES].map(e=>`<div class="card panel" style="margin-bottom:16px;padding:0;overflow:hidden">
      <div class="panel-head" style="cursor:pointer;border-bottom:1px solid var(--border)" data-act="legalentity" data-arg="${e.id}">
        <span style="font-size:22px;margin-right:2px">${e.flag}</span>
        <div style="flex:1">
          <div style="font-weight:700;font-size:14px">${e.name}</div>
          <div class="mut" style="font-size:12px">${e.country} · Tax ID: <span class="mono">${e.taxId}</span>${e.vatId&&e.vatId!=='—'?' · VAT: <span class="mono">'+e.vatId+'</span>':''}</div>
        </div>
        <div style="display:flex;align-items:center;gap:12px">
          <div style="text-align:right"><div style="font-weight:600;font-size:13px">${e.currency}</div><div class="mut" style="font-size:11.5px">${e.glSystem}</div></div>
          ${e.status==='migration'?pill('warn','Migration'):e.status==='legacy'?pill('muted','Legacy'):pill('good','Active')}
          <span class="mut">${svg('<polyline points="9 18 15 12 9 6"/>',14)}</span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;border-bottom:1px solid var(--border)">
        <div style="padding:12px 18px;border-right:1px solid var(--border)">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-2);margin-bottom:8px">GL Accounts</div>
          ${(GL_ACCTS[e.id]||[]).map(([code,name])=>`<div style="display:flex;gap:8px;font-size:12px;margin-bottom:4px"><span class="mono mut" style="min-width:60px">${code}</span><span>${name}</span></div>`).join('')}
        </div>
        <div style="padding:12px 18px;border-right:1px solid var(--border)">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-2);margin-bottom:8px">Tax Registrations</div>
          ${(TAX_REGS[e.id]||[]).map(r=>`<div style="font-size:12px;margin-bottom:4px;display:flex;gap:6px;align-items:center">
            <span class="mono mut" style="font-size:11px;min-width:65px">${r.type}</span>
            <span>${r.jurisdiction}</span>
            ${r.status!=='Active'?'<span style="font-size:10.5px;color:var(--warn)">'+r.status+'</span>':''}
          </div>`).join('')}
        </div>
        <div style="padding:12px 18px">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-2);margin-bottom:8px">Active Business Units</div>
          ${e.bUs.map(id=>{const b=BUS.find(x=>x.id===id);return b?`<div class="bu-badge" style="margin-bottom:5px;display:inline-flex;cursor:pointer" data-act="bizunit" data-arg="${id}"><span class="bu-dot" style="background:${b.color}"></span>${b.name}</div> `:'';}).join('')}
          ${e.bUs.length===0?'<div class="mut" style="font-size:12px">No active BUs</div>':''}
          <div style="margin-top:8px">
            <div style="font-size:12px"><span class="mut">AR Account: </span><span class="mono">${e.arAcct}</span></div>
            <div style="font-size:12px;margin-top:3px"><span class="mut">Deferred Rev: </span><span class="mono">${e.deferredAcct}</span></div>
          </div>
        </div>
      </div>
      <div style="padding:10px 18px;display:flex;align-items:center;gap:10px">
        <button class="btn ghost" style="font-size:12px;padding:5px 10px" data-act="legalentity" data-arg="${e.id}">View details</button>
        <button class="btn ghost" style="font-size:12px;padding:5px 10px" data-act="glmapping" data-arg="BU-001">GL Mappings</button>
        ${e.status==='migration'?'<button class="btn ghost" style="font-size:12px;padding:5px 10px" data-act="migrationdetail" data-arg="SS-001">Migration status</button>':''}
        <span class="mut" style="font-size:11.5px;margin-left:auto">Remittance: ${e.remittance||e.name}</span>
      </div>
    </div>`).join('')}
    <div class="card panel" style="padding:0;overflow:hidden">
      <div class="panel-head" style="border-bottom:1px solid var(--border)"><h3>Cross-Entity Boundary Rules</h3></div>
      <div style="padding:14px 18px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
        <div style="padding:12px 14px;border:1px solid var(--border);border-radius:8px">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-2);margin-bottom:6px">Currency Mismatch</div>
          <div style="font-size:12.5px;color:var(--neg);font-weight:600">${svg(I.warning,13)} Blocked by default</div>
          <div class="mut" style="font-size:11.5px;margin-top:4px">USD and EUR cannot appear on the same invoice. Invoices split automatically by legal entity.</div>
        </div>
        <div style="padding:12px 14px;border:1px solid var(--border);border-radius:8px">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-2);margin-bottom:6px">Tax Profile Mismatch</div>
          <div style="font-size:12.5px;color:var(--warn);font-weight:600">${svg(I.warning,13)} Warning + split</div>
          <div class="mut" style="font-size:11.5px;margin-top:4px">US-Residential and EU-VAT cannot be mixed. Invoice splits with Finance warning.</div>
        </div>
        <div style="padding:12px 14px;border:1px solid var(--border);border-radius:8px">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-2);margin-bottom:6px">GL Export Conflict</div>
          <div style="font-size:12.5px;color:var(--warn);font-weight:600">${svg(I.warning,13)} Requires approval</div>
          <div class="mut" style="font-size:11.5px;margin-top:4px">Cross-GL invoices (NetSuite + QuickBooks) require Finance approval before export batch proceeds.</div>
        </div>
      </div>
    </div>
  </div>`));
};

/* ---------- Migration & Source Systems ---------- */
