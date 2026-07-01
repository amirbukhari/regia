/* delonix — entities.js */

function openEntitySwitch(){
  const entities=[
    {flag:'🇺🇸',name:'Delonix Inc',sub:'North America · USD',subs:842,mrr:'$418,350',active:true},
    {flag:'🇪🇺',name:'Delonix EU',sub:'Europe · EUR',subs:214,mrr:'€127,400',active:false},
    {flag:'🇸🇬',name:'Delonix APAC',sub:'Asia-Pacific · SGD',subs:88,mrr:'S$54,200',active:false},
  ];
  openDrawer('Switch Workspace',`
    ${entities.map(e=>`<div class="entity-card${e.active?' active':''}" data-act="${e.active?'toast':'toast'}" data-arg="${e.active?'Already on '+e.name:'Switched to '+e.name}">
      <div class="entity-flag">${e.flag}</div>
      <div class="entity-info"><div class="entity-name">${e.name}</div>
        <div class="entity-meta">${e.sub} · ${e.subs} subscriptions · MRR ${e.mrr}</div></div>
      <span class="entity-check">✓</span>
    </div>`).join('')}
    <div class="form-footer" style="margin-top:8px">
      <button class="btn ghost" data-act="route" data-arg="bizunits">Manage entities</button>
      <button class="btn primary" data-act="newlegalentity">+ Add entity</button>
    </div>`);
}

/* ── Currency panel ── */

function openBizUnit(id){
  const b = BUS.find(x=>x.id===id) || BUS[0];
  const ent = LEGAL_ENTITIES.find(e=>e.id===b.entityId)||{};
  openDrawer(`Business Unit — ${b.name}`, `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
      <span class="bu-dot" style="width:16px;height:16px;background:${b.color};flex-shrink:0"></span>
      <div><div style="font-size:16px;font-weight:700">${b.name}</div><div class="mut" style="font-size:13px">${b.brand}</div></div>
      <span style="margin-left:auto">${b.status==='active'?pill('good','Active'):pill('warn','Migration')}</span>
    </div>
    <div class="drawer-tabs" id="buDrawerTabs">
      ${['Overview','Legal & Tax','GL Mappings','Invoice Grouping','Audit'].map((t,i)=>`<button class="${i===0?'on':''}" onclick="window._buTab('${t}',this)">${t}</button>`).join('')}
    </div>
    <div id="buDrawerBody" style="margin-top:16px"></div>
  `);
  const panels = {
    Overview:`
      <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-bottom:16px">
        <div class="fg"><label>Business Unit ID</label><div class="mono" style="font-size:13px">${b.id}</div></div>
        <div class="fg"><label>Brand Name</label><div>${b.brand}</div></div>
        <div class="fg"><label>Invoice Template</label><div>${b.template}</div></div>
        <div class="fg"><label>Legal Entity</label><div>${b.entity}</div></div>
        <div class="fg"><label>Currency</label><div class="mono">${b.currency}</div></div>
        <div class="fg"><label>Tax Profile</label><div>${b.taxProfile}</div></div>
        <div class="fg"><label>GL Export Destination</label><div>${b.glDest}</div></div>
        <div class="fg"><label>Active Subscriptions</label><div class="tnum">${b.subs}</div></div>
        <div class="fg"><label>MRR</label><div class="tnum">${b.mrr?'$'+b.mrr.toLocaleString():'—'}</div></div>
      </div>
      <div class="form-actions"><button class="btn primary" data-act="toast" data-arg="Business unit settings saved">Save Changes</button><button class="btn ghost" onclick="closeDrawer()">Cancel</button></div>`,
    'Legal & Tax':`
      <div style="margin-bottom:16px">
        <h4 style="font-size:13px;font-weight:700;margin-bottom:10px">Legal Entity</h4>
        <div class="entity-card" data-act="legalentity" data-arg="${ent.id||''}" style="cursor:pointer">
          <div class="entity-card-head"><span style="font-size:20px">${ent.flag||'🏢'}</span><div><div style="font-weight:700">${ent.name||b.entity}</div><div class="mut" style="font-size:12px">${ent.country||''} · Tax ID: ${ent.taxId||'—'}</div></div></div>
        </div>
      </div>
      <div style="margin-bottom:16px">
        <h4 style="font-size:13px;font-weight:700;margin-bottom:10px">Tax Profile: ${b.taxProfile}</h4>
        <div class="form-grid" style="grid-template-columns:1fr 1fr">
          <div class="fg"><label>Tax Basis</label><div>Net of discounts</div></div>
          <div class="fg"><label>Tax Rounding</label><div>Line-level</div></div>
          <div class="fg"><label>Default Tax Rate</label><div>8.25% (US-Standard)</div></div>
          <div class="fg"><label>VAT Registered</label><div>${ent.vatId&&ent.vatId!=='—'?ent.vatId:'No'}</div></div>
        </div>
      </div>
      <div class="val-banner warn">${svg(I.warning,14)} Tax profile changes affect all future invoices in this Business Unit. Retroactive changes require credit/rebill.</div>`,
    'GL Mappings':`
      <div class="table-wrap"><table>
        <thead><tr><th>Revenue Category</th><th>GL Account</th><th>Department</th></tr></thead>
        <tbody>
          <tr><td>Subscription Revenue</td><td class="mono">4000 · SaaS Revenue</td><td>—</td></tr>
          <tr><td>Overage Revenue</td><td class="mono">4010 · Usage Revenue</td><td>—</td></tr>
          <tr><td>Deferred Revenue (current)</td><td class="mono">2800 · Deferred Rev.</td><td>—</td></tr>
          <tr><td>Accounts Receivable</td><td class="mono">1200 · AR</td><td>—</td></tr>
          <tr><td>Discounts</td><td class="mono">4090 · Revenue Contra</td><td>—</td></tr>
          <tr><td>Tax Payable</td><td class="mono">2100 · Tax Payable</td><td>—</td></tr>
        </tbody>
      </table></div>
      <div class="form-actions" style="margin-top:12px"><button class="btn ghost" data-act="glmapping" data-arg="BU-001">Edit Mappings</button></div>`,
    'Invoice Grouping':`
      <div style="margin-bottom:16px">
        <h4 style="font-size:13px;font-weight:700;margin-bottom:4px">Default Policy</h4>
        <div class="mut" style="font-size:12px;margin-bottom:12px">Applied to all customers in this Business Unit unless overridden at account or subscription level.</div>
        <div class="grouping-inherit">
          <div class="grouping-level active"><span class="grouping-level-name">BU Default</span><span class="grouping-level-value">Consolidated invoice</span><span class="grouping-level-source">Active — applies to ${b.subs} subs</span></div>
          <div class="grouping-level"><span class="grouping-level-name">Account Override</span><span class="grouping-level-value">3 accounts use Split by BU</span><span class="grouping-level-source">Inherited from account settings</span></div>
          <div class="grouping-level"><span class="grouping-level-name">Subscription Override</span><span class="grouping-level-value">No overrides</span><span class="grouping-level-source">Uses account default</span></div>
        </div>
      </div>
      <div>
        <h4 style="font-size:13px;font-weight:700;margin-bottom:8px">Client-Selectable Options</h4>
        ${GROUPING_POLICIES.filter(p=>p.clientVisible).map(p=>`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)"><div style="flex:1"><div style="font-size:13px;font-weight:600">${p.name}</div><div class="mut" style="font-size:12px">${p.desc}</div></div>${p.requiresApproval?pill('warn','Approval required'):pill('good','Self-service')}</div>`).join('')}
      </div>`,
    Audit:`
      <div>
        <div class="audit-row"><span class="audit-ts">Jun 28 · 09:14</span><span class="audit-user">Sarah K.</span><span class="audit-action">Updated GL mapping — 4000 · SaaS Revenue</span><span class="audit-change"></span></div>
        <div class="audit-row"><span class="audit-ts">Jun 15 · 14:22</span><span class="audit-user">Finance Bot</span><span class="audit-action">Tax profile changed from US-Standard to US-${b.name.slice(0,5)}</span><span class="audit-change"><span style="color:var(--neg)">Before: US-Standard</span></span></div>
        <div class="audit-row"><span class="audit-ts">May 01 · 10:00</span><span class="audit-user">Admin</span><span class="audit-action">Business unit created</span><span class="audit-change"></span></div>
      </div>`,
  };
  window._buTab = (t,btn) => {
    document.querySelectorAll('#buDrawerTabs button').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    document.getElementById('buDrawerBody').innerHTML=panels[t]||'';
  };
  document.getElementById('buDrawerBody').innerHTML=panels.Overview;
}

function openLegalEntity(id){
  const e = LEGAL_ENTITIES.find(x=>x.id===id)||LEGAL_ENTITIES[0];
  openDrawer(`Legal Entity — ${e.name}`, `
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px">
      <span style="font-size:28px">${e.flag}</span>
      <div><div style="font-size:16px;font-weight:700">${e.name}</div><div class="mut">${e.country} · ${e.currency} · ${e.glSystem}</div></div>
      ${pill('good','Active')}
    </div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-bottom:18px">
      <div class="fg"><label>Legal Name</label><div>${e.name}</div></div>
      <div class="fg"><label>Country</label><div>${e.country}</div></div>
      <div class="fg"><label>Tax ID / EIN</label><div class="mono">${e.taxId}</div></div>
      <div class="fg"><label>VAT Number</label><div class="mono">${e.vatId}</div></div>
      <div class="fg"><label>Reporting Currency</label><div class="mono">${e.currency}</div></div>
      <div class="fg"><label>GL System</label><div>${e.glSystem}</div></div>
      <div class="fg"><label>AR Account</label><div class="mono" style="font-size:12px">${e.arAcct}</div></div>
      <div class="fg"><label>Deferred Revenue</label><div class="mono" style="font-size:12px">${e.deferredAcct}</div></div>
    </div>
    <h4 style="font-size:13px;font-weight:700;margin-bottom:10px">Active Business Units</h4>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px">
      ${e.bUs.map(id=>{const b=BUS.find(x=>x.id===id);return b?`<span class="bu-badge" data-act="bizunit" data-arg="${b.id}" style="cursor:pointer"><span class="bu-dot" style="background:${b.color}"></span>${b.name}</span>`:'';}).join('')}
    </div>
    <div class="val-banner info">${svg(I.entity,14)} Invoices from different legal entities require explicit grouping policies. Tax registrations and remittance details are managed per entity.</div>
    <div class="form-actions" style="margin-top:16px"><button class="btn primary" data-act="toast" data-arg="Legal entity saved">Save Changes</button><button class="btn ghost" onclick="closeDrawer()">Cancel</button></div>
  `);
}

function openNewBizUnit(){
  openDrawer('New Business Unit', `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Business Unit name</label><input class="finput" placeholder="e.g. Healthcare" autofocus></div>
      <div class="fg" style="grid-column:1/-1"><label>Brand display name</label><input class="finput" placeholder="e.g. delonix Healthcare — shown on invoices"></div>
      <div class="fg"><label>Legal Entity</label><select class="finput">${LEGAL_ENTITIES.map(e=>`<option value="${e.id}">${e.flag} ${e.name}</option>`).join('')}</select></div>
      <div class="fg"><label>Currency</label><select class="finput"><option selected>USD</option><option>EUR</option><option>GBP</option></select></div>
      <div class="fg"><label>Tax profile</label><select class="finput"><option>US-Residential</option><option>US-Commercial</option><option>EU-VAT</option><option>CA-GST</option></select></div>
      <div class="fg"><label>GL export destination</label><select class="finput"><option>NetSuite-US</option><option>NetSuite-EU</option><option>QuickBooks</option><option>Xero</option></select></div>
      <div class="fg"><label>Invoice template</label><select class="finput"><option>Default</option><option>Minimal</option><option>Branded</option></select></div>
      <div class="fg"><label>Invoice grouping default</label><select class="finput"><option>One invoice per account</option><option>One per subscription</option><option>One per contract</option></select></div>
      <div class="fg"><label>Brand accent color</label><div style="display:flex;gap:8px;align-items:center"><input class="finput" placeholder="#2563eb" style="font-family:monospace;max-width:110px"><div style="width:28px;height:28px;border-radius:6px;background:#888"></div></div></div>
      <div class="fg"><label>Status</label><select class="finput"><option>Active</option><option>Draft</option></select></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="New Business Unit created — configure GL mappings and invoice template next">Create Business Unit</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openNewLegalEntity(){
  openDrawer('New Legal Entity', `
    <div class="val-banner info" style="margin-bottom:14px">${svg(I.entity,14)} A Legal Entity is a registered company with its own tax registrations, bank accounts, and GL system. Business Units are assigned to a Legal Entity.</div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Entity legal name</label><input class="finput" placeholder="e.g. Acme Corp Ltd." autofocus></div>
      <div class="fg"><label>Country of incorporation</label><select class="finput"><option>🇺🇸 United States</option><option>🇳🇱 Netherlands</option><option>🇬🇧 United Kingdom</option><option>🇨🇦 Canada</option><option>🇦🇺 Australia</option><option>🇸🇬 Singapore</option></select></div>
      <div class="fg"><label>Functional currency</label><select class="finput"><option>USD</option><option>EUR</option><option>GBP</option><option>CAD</option></select></div>
      <div class="fg"><label>Tax registration number</label><input class="finput" placeholder="EIN, VAT ID, etc." style="font-family:monospace"></div>
      <div class="fg"><label>VAT / GST registered</label><select class="finput"><option>No</option><option>Yes</option></select></div>
      <div class="fg"><label>GL system</label><select class="finput"><option>NetSuite</option><option>QuickBooks</option><option>Xero</option><option>SAP</option><option>Manual</option></select></div>
      <div class="fg"><label>AR GL account</label><input class="finput" placeholder="1200 · Accounts Receivable" value="1200 · Accounts Receivable"></div>
      <div class="fg"><label>Deferred revenue GL</label><input class="finput" placeholder="2800 · Deferred Revenue" value="2800 · Deferred Revenue"></div>
      <div class="fg" style="grid-column:1/-1"><label>Registered address</label><textarea class="finput" rows="2" placeholder="Full registered address for invoice headers"></textarea></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Legal entity created — assign Business Units and configure tax registrations next">Create Legal Entity</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openNewEntity(){
  openDrawer('New Custom Entity', `
    <div class="val-banner info" style="margin-bottom:14px">${svg(I.entity2,14)} Custom entities extend the billing data model. They can be linked to Accounts, Subscriptions, and other objects via relation fields.</div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Entity name (singular)</label><input class="finput" placeholder="e.g. Property" autofocus></div>
      <div class="fg"><label>API name</label><input class="finput" placeholder="property" class="mono" style="font-family:monospace"></div>
      <div class="fg"><label>Plural label</label><input class="finput" placeholder="Properties"></div>
      <div class="fg"><label>Icon</label><input class="finput" placeholder="🏢" maxlength="2"></div>
      <div class="fg" style="grid-column:1/-1"><label>Description</label><textarea class="finput" rows="2" placeholder="What does this entity represent?"></textarea></div>
      <div class="fg"><label>Linked to</label><select class="finput" multiple style="height:80px">
        <option selected>Account</option><option>Subscription</option><option>Invoice</option><option>Contact</option>
      </select></div>
      <div class="fg"><label>Record ID prefix</label><input class="finput" placeholder="PROP" style="font-family:monospace;max-width:100px"></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Custom entity created — add fields to get started">Create entity</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openNewField(){
  openDrawer('Add Field — Property', `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Display name</label><input class="finput" placeholder="e.g. Property class" autofocus></div>
      <div class="fg"><label>API key</label><input class="finput" placeholder="property_class" style="font-family:monospace"></div>
      <div class="fg"><label>Field type</label><select class="finput" id="fieldTypeSelect">
        <option>Text</option><option>Number</option><option>Currency</option><option>Date</option>
        <option>Boolean</option><option>Dropdown</option><option>Relation</option><option>Formula</option>
      </select></div>
      <div class="fg"><label>Required</label><select class="finput"><option>No</option><option>Yes</option></select></div>
      <div class="fg"><label>Indexed (searchable)</label><select class="finput"><option>No</option><option>Yes</option></select></div>
      <div class="fg"><label>Show in list view</label><select class="finput"><option>Yes</option><option>No</option></select></div>
      <div class="fg" style="grid-column:1/-1"><label>Description / help text</label><input class="finput" placeholder="Shown to users when filling in this field"></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Field added to Property entity">Add field</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openEditField(name){
  openDrawer(`Edit Field — ${name||'property_class'}`, `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Display name</label><input class="finput" value="Property class" autofocus></div>
      <div class="fg"><label>API key</label><input class="finput mono" value="${name||'property_class'}" style="font-family:monospace"></div>
      <div class="fg"><label>Field type</label><select class="finput"><option selected>Dropdown</option><option>Text</option></select></div>
      <div class="fg"><label>Required</label><select class="finput"><option selected>No</option><option>Yes</option></select></div>
      <div class="fg" style="grid-column:1/-1"><label>Dropdown options (one per line)</label><textarea class="finput" rows="4">Class A\nClass B\nClass C\nMixed-use</textarea></div>
      <div class="fg"><label>Default value</label><input class="finput" placeholder="Leave blank for no default"></div>
      <div class="fg"><label>Indexed</label><select class="finput"><option selected>Yes</option><option>No</option></select></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Field ${name||'property_class'} updated">Save changes</button>
      <button class="btn crit" style="margin-left:auto" data-act="toast" data-arg="Field deletion requires confirmation — ${name} will be removed from all records">Delete field</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openAddCalcField(){
  openDrawer('Add input field',`
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div><label class="lbl">Field label</label><input class="input" placeholder="e.g. Number of units" style="width:100%"></div>
        <div><label class="lbl">Variable name</label><input class="input" placeholder="e.g. units" class="mono" style="width:100%;font-family:monospace"></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div><label class="lbl">Input type</label><select class="input" style="width:100%"><option>Slider</option><option>Number</option><option>Dropdown</option><option>Currency</option><option>Percentage</option></select></div>
        <div><label class="lbl">Default value</label><input class="input" type="number" placeholder="100" style="width:100%"></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div><label class="lbl">Min</label><input class="input" type="number" placeholder="1" style="width:100%"></div>
        <div><label class="lbl">Max</label><input class="input" type="number" placeholder="10000" style="width:100%"></div>
      </div>
      <div><label class="lbl">Tooltip help text</label><input class="input" placeholder="Explain what this field means…" style="width:100%"></div>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button class="btn ghost" data-act="close">Cancel</button>
        <button class="btn primary" data-act="toast" data-arg="Input field added">Add field</button>
      </div>
    </div>
  `);
}
