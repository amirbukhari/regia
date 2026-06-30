/* delonix — catalog.js */

function custOpts(){return CUSTOMERS.map(c=>`<option>${c}</option>`).join('');}

function planOpts(){return PLANS.map(p=>`<option>${p}</option>`).join('');}

/* ── New Invoice ── */

function openPriceBook(){
  const books=[
    {name:'2026 Standard',desc:'Default list prices — all new accounts',accounts:189,active:true},
    {name:'Volume Discount',desc:'>10 seats — 15% discount applied',accounts:42,active:false},
    {name:'Enterprise Custom',desc:'Custom negotiated rates — requires approval',accounts:16,active:false},
  ];
  openDrawer('Price Book Management',`
    ${books.map(b=>`<div class="entity-card${b.active?' active':''}">
      <div style="flex:1">
        <div class="entity-name">${b.name}${b.active?` ${pill('good','Default')}`:''}</div>
        <div class="entity-meta">${b.desc} · ${b.accounts} accounts</div>
      </div>
      <div style="display:flex;gap:6px">
        <button class="btn ghost" style="font-size:11px;padding:4px 8px" data-act="editpricebook" data-arg="${b.id}">Edit</button>
        ${!b.active?`<button class="btn ghost" style="font-size:11px;padding:4px 8px" data-act="editpricebook" data-arg="${b.id}">Set default</button>`:''}
      </div>
    </div>`).join('')}
    <div class="form-footer">
      <button class="btn primary" data-act="newpricebook">+ New price book</button>
    </div>`);
}

/* ── Tax Config ── */

function openTaxConfig(){
  const nexus=[['California','CA','9.5%'],['New York','NY','8.875%'],['Texas','TX','6.25%'],
    ['Florida','FL','6%'],['Washington','WA','6.5%'],['Illinois','IL','6.25%'],
    ['Canada (GST)','CA','5%'],['EU VAT','EU','20%']];
  openDrawer('Tax Configuration',`
    <div class="form-section-title">Tax provider</div>
    <div class="radio-group" style="margin-bottom:16px">
      <label class="radio-opt selected"><input type="radio" name="taxp" checked style="accent-color:var(--ember)">
        <div><div style="font-size:13px;font-weight:600;color:var(--text)">Avalara</div><div style="font-size:11px;color:var(--pos)">Connected · auto-calculating</div></div></label>
      <label class="radio-opt"><input type="radio" name="taxp" style="accent-color:var(--ember)">
        <div><div style="font-size:13px;font-weight:600;color:var(--text)">TaxJar</div><div style="font-size:11px;color:var(--text-3)">Available — not connected</div></div></label>
      <label class="radio-opt"><input type="radio" name="taxp" style="accent-color:var(--ember)">
        <div><div style="font-size:13px;font-weight:600;color:var(--text)">Manual</div><div style="font-size:11px;color:var(--text-3)">Enter rates per jurisdiction</div></div></label>
    </div>
    <div class="form-section-title">Nexus jurisdictions</div>
    <div class="table-wrap" style="border:none;margin-bottom:12px"><table><thead><tr>
      <th>Jurisdiction</th><th>Code</th><th>Rate</th><th>Active</th></tr></thead><tbody>
      ${nexus.map(j=>`<tr><td class="nm">${j[0]}</td><td class="mut">${j[1]}</td><td class="tnum">${j[2]}</td>
        <td><div class="toggle on" data-act="toggle"><i></i></div></td></tr>`).join('')}
    </tbody></table></div>
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn primary" data-act="toast" data-arg="Tax configuration saved">Save configuration</button>
    </div>`);
}

/* ── Revenue Recognition Rules ── */

function openRevRules(){
  openDrawer('Recognition Rules',`
    <div class="form-section">
      <div class="form-section-title">Recognition method</div>
      <div class="radio-group" style="margin-bottom:16px">
        <label class="radio-opt selected"><input type="radio" name="rmethod" checked style="accent-color:var(--ember)">
          <div><div style="font-size:13px;font-weight:600;color:var(--text)">Ratable (straight-line)</div>
               <div style="font-size:11px;color:var(--text-3)">Recognize evenly over the service period</div></div></label>
        <label class="radio-opt"><input type="radio" name="rmethod" style="accent-color:var(--ember)">
          <div><div style="font-size:13px;font-weight:600;color:var(--text)">Event-based</div>
               <div style="font-size:11px;color:var(--text-3)">Recognize on specific milestone events</div></div></label>
        <label class="radio-opt"><input type="radio" name="rmethod" style="accent-color:var(--ember)">
          <div><div style="font-size:13px;font-weight:600;color:var(--text)">Manual</div>
               <div style="font-size:11px;color:var(--text-3)">Override per contract</div></div></label>
      </div>
    </div>
    <div class="form-section-title">Performance obligations</div>
    ${[['Platform access','Ratable','Monthly'],['Implementation services','Event','On completion'],
       ['Training & onboarding','Event','On delivery'],['Support (premium)','Ratable','Monthly'],
       ['Professional services','Manual','Per SOW']
      ].map(o=>`<div class="seq-step"><span class="seq-label" style="width:auto;flex:1">${o[0]}</span>
        <span class="seq-channel">${o[1]}</span><span class="seq-channel" style="color:var(--ember-soft)">${o[2]}</span>
        <button class="btn ghost" style="font-size:11px;padding:3px 8px" data-act="editobligation" data-arg="${o[0]}">Edit</button>
      </div>`).join('')}
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn primary" data-act="toast" data-arg="Recognition rules saved and applied to new contracts">Save rules</button>
    </div>`);
}



/* ===== ENTERPRISE DRAWERS ===== */

function openNewPlan(){
  openDrawer('New Plan', `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Plan name</label><input class="finput" placeholder="e.g. Enterprise Plus" autofocus></div>
      <div class="fg"><label>Business Unit</label><select class="finput">${BUS.map(b=>`<option value="${b.id}">${b.name}</option>`).join('')}</select></div>
      <div class="fg"><label>Billing interval</label><select class="finput"><option>Monthly</option><option>Annual</option><option>Usage-based</option><option>Custom</option></select></div>
      <div class="fg"><label>Base price</label><input class="finput" type="number" placeholder="0.00"></div>
      <div class="fg"><label>Currency</label><select class="finput"><option>USD</option><option>EUR</option><option>GBP</option></select></div>
      <div class="fg"><label>Trial days</label><input class="finput" type="number" placeholder="0" value="0"></div>
      <div class="fg"><label>Status</label><select class="finput"><option>Draft</option><option>Active</option></select></div>
      <div class="fg" style="grid-column:1/-1"><label>Description</label><textarea class="finput" rows="2" placeholder="Customer-facing description shown on invoices and portal"></textarea></div>
    </div>
    <h4 style="font-size:13px;font-weight:700;margin:14px 0 10px">Entitlements</h4>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
      <div style="display:grid;grid-template-columns:1fr 1fr 80px;gap:8px;align-items:center">
        <input class="finput" placeholder="Feature / meter name" value="API Calls">
        <input class="finput" placeholder="Limit or Unlimited" value="1,000,000 / mo">
        <button class="btn ghost" style="padding:6px 10px;font-size:12px" data-act="toast" data-arg="Line item removed">✕</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 80px;gap:8px;align-items:center">
        <input class="finput" placeholder="Feature / meter name" value="Storage">
        <input class="finput" placeholder="Limit or Unlimited" value="100 GB">
        <button class="btn ghost" style="padding:6px 10px;font-size:12px" data-act="toast" data-arg="Line item removed">✕</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 80px;gap:8px;align-items:center">
        <input class="finput" placeholder="Feature / meter name" value="Seats">
        <input class="finput" placeholder="Limit or Unlimited" value="Unlimited">
        <button class="btn ghost" style="padding:6px 10px;font-size:12px" data-act="toast" data-arg="Line item removed">✕</button>
      </div>
    </div>
    <button class="btn ghost" style="font-size:12px;width:100%" data-act="toast" data-arg="Line item added">+ Add entitlement</button>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="New plan saved as draft">Save Draft</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openEditPlan(name){
  openDrawer(`Edit Plan — ${name||'Enterprise'}`, `
    <div class="val-banner warn" style="margin-bottom:14px">${svg(I.warning,14)} Changes to a published plan apply to <strong>new subscriptions only</strong>. Existing subscriptions retain the current terms until renewal or manual update.</div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Plan name</label><input class="finput" value="${name||'Enterprise'}"></div>
      <div class="fg"><label>Base price</label><input class="finput" type="number" value="9200"></div>
      <div class="fg"><label>Billing interval</label><select class="finput"><option selected>Monthly</option><option>Annual</option></select></div>
      <div class="fg"><label>Status</label><select class="finput"><option selected>Active</option><option>Draft</option><option>Archived</option></select></div>
      <div class="fg"><label>Affected subscriptions</label><div class="tnum mut">47 active</div></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Plan changes saved — applying to new subscriptions">Save Changes</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openNewPricebook(){
  openDrawer('New Price Book', `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Price book name</label><input class="finput" placeholder="e.g. Enterprise Q3 2026" autofocus></div>
      <div class="fg"><label>Business Unit</label><select class="finput">${BUS.map(b=>`<option>${b.name}</option>`).join('')}</select></div>
      <div class="fg"><label>Currency</label><select class="finput"><option>USD</option><option>EUR</option></select></div>
      <div class="fg"><label>Effective from</label><input class="finput" type="date" value="2026-07-01"></div>
      <div class="fg"><label>Status</label><select class="finput"><option>Draft</option><option>Active</option></select></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Price book created as draft">Create Price Book</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openEditPricebook(nameOrId){
  const name = nameOrId||'Standard Q2 2026';
  const plans = ['Enterprise Plus','Enterprise','Business+','Business','Starter'];
  const prices = [12000,9200,4200,1800,650];
  openDrawer(`Price Book — ${name}`, `
    <div style="display:flex;gap:10px;margin-bottom:16px;align-items:center">
      ${pill('good','Active')}
      <span class="mut" style="font-size:12px">Effective: Jan 1, 2026 – present</span>
      <span style="margin-left:auto"><button class="btn ghost" style="font-size:12px;padding:5px 10px" data-act="toast" data-arg="Price book archived">Archive</button></span>
    </div>
    <div class="table-wrap"><table>
      <thead><tr><th>Plan</th><th>List Price</th><th>Min. Commitment</th><th>Overage Rate</th><th></th></tr></thead>
      <tbody>${plans.map((p,i)=>`<tr>
        <td style="font-weight:600">${p}</td>
        <td class="tnum">$${prices[i].toLocaleString()}/mo</td>
        <td class="tnum mut">${i<2?'$'+prices[i].toLocaleString()+'/yr':'—'}</td>
        <td class="tnum mut">${i<3?'$0.002 / API call':'—'}</td>
        <td><button class="btn ghost" style="padding:4px 8px;font-size:11px" data-act="toast" data-arg="Editing ${p} pricing">Edit</button></td>
      </tr>`).join('')}</tbody>
    </table></div>
    <div class="form-actions" style="margin-top:12px">
      <button class="btn primary" data-act="toast" data-arg="Price book saved">Save Changes</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openEditObligation(name){
  openDrawer(`Edit Obligation — ${name||'Subscription Revenue'}`, `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Obligation name</label><input class="finput" value="${name||'Subscription Revenue'}"></div>
      <div class="fg"><label>Recognition method</label><select class="finput"><option selected>Straight-line over term</option><option>Percentage of completion</option><option>Usage-based</option><option>Point-in-time</option></select></div>
      <div class="fg"><label>Performance obligation type</label><select class="finput"><option selected>Stand-alone service</option><option>Bundle component</option><option>One-time setup</option></select></div>
      <div class="fg"><label>SSP method</label><select class="finput"><option selected>Adjusted market approach</option><option>Expected cost + margin</option><option>Residual approach</option></select></div>
      <div class="fg"><label>Revenue GL account</label><input class="finput" value="4000 · SaaS Revenue"></div>
      <div class="fg"><label>Deferred GL account</label><input class="finput" value="2800 · Deferred Revenue"></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Obligation saved">Save Obligation</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}
