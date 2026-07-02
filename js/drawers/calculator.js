/* delonix — calculator.js */

function openNewCalculator(){
  openDrawer('New Pricing Calculator', `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Calculator name</label><input class="finput" placeholder="e.g. Enterprise ROI Calculator" autofocus></div>
      <div class="fg"><label>Template</label><select class="finput">
        <option>ROI / Payback calculator</option>
        <option>Seat-based pricing estimator</option>
        <option>Usage-based estimator</option>
        <option>TCO comparison</option>
        <option>Blank canvas</option>
      </select></div>
      <div class="fg"><label>Audience</label><select class="finput"><option>Public (website)</option><option>Sales-only (internal)</option><option>Customer portal</option></select></div>
      <div class="fg"><label>Currency</label><select class="finput"><option>USD $</option><option>EUR €</option><option>GBP £</option><option>CAD $</option></select></div>
      <div class="fg"><label>Lead capture</label><select class="finput"><option>Email gate before results</option><option>Optional — shown after results</option><option>None</option></select></div>
      <div class="fg" style="grid-column:1/-1"><label>Description</label><textarea class="finput" rows="2" placeholder="Internal description — not shown to users"></textarea></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Calculator created — opening builder">Create & open builder</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openEditCalculator(id){
  const CALCS = {
    'CALC-001':{name:'Enterprise ROI Calculator',status:'Published',views:1284,leads:87,url:'calc.delonix.io/enterprise-roi'},
    'CALC-002':{name:'API Pricing Estimator',status:'Published',views:632,leads:41,url:'calc.delonix.io/api-pricing'},
    'CALC-003':{name:'TCO vs Legacy System',status:'Draft',views:0,leads:0,url:'—'},
    'CALC-004':{name:'Multi-Site Property Manager',status:'Published',views:319,leads:22,url:'calc.delonix.io/property'},
  };
  const c = CALCS[id] || {name:'Calculator',status:'Draft',views:0,leads:0,url:'—'};
  const conv = c.views ? (c.leads/c.views*100).toFixed(1)+'%' : '—';
  const avgT = c.views ? `${dlxRange(id,2,5)}m ${dlxRange(id+'s',5,55)}s` : '—';
  openDrawer(`Calculator — ${id||'CALC-001'}`, `
    <div class="val-banner info" style="margin-bottom:14px">${svg(I.calc,14)} Live edits are saved automatically. Publish when ready to push to the embed URL.</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
      ${[['Views (30d)',c.views.toLocaleString()],['Leads captured',String(c.leads)],['Conversion rate',conv],['Avg time on page',avgT]].map(([l,v])=>`
        <div style="background:var(--surface);padding:10px;border-radius:7px"><div class="mut" style="font-size:11px">${l}</div><div style="font-size:18px;font-weight:700">${v}</div></div>`).join('')}
    </div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Name</label><input class="finput" value="${c.name}"></div>
      <div class="fg"><label>Status</label><select class="finput">${['Published','Draft','Archived'].map(s=>`<option${s===c.status?' selected':''}>${s}</option>`).join('')}</select></div>
      <div class="fg"><label>Lead capture</label><select class="finput"><option selected>Email gate before results</option><option>Optional</option><option>None</option></select></div>
      <div class="fg" style="grid-column:1/-1"><label>Embed URL</label><div style="display:flex;gap:8px"><input class="finput mono" value="${c.url}" style="flex:1"><button class="btn ghost" data-act="toast" data-arg="Copied embed snippet">Copy embed</button></div></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Calculator changes published">Publish changes</button>
      <button class="btn ghost" data-act="toast" data-arg="Opening full builder editor">Open full editor</button>
      <button class="btn ghost" onclick="closeDrawer()">Close</button>
    </div>
  `);
}

function openPublishCalc(name){
  openDrawer('Publish calculator',`
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="val-banner info">${svg(I.check,15)} Calculator will be live at <strong>calc.delonix.io/${(name||'enterprise-roi').toLowerCase().replace(/\s+/g,'-')}</strong></div>
      <div><label class="lbl">Publish URL slug</label><input class="input" value="${(name||'enterprise-roi').toLowerCase().replace(/\s+/g,'-')}" style="width:100%"></div>
      <div><label class="lbl">Access</label><select class="input" style="width:100%"><option>Public</option><option>Password protected</option><option>Gated (lead capture required)</option></select></div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-2);border-radius:var(--r-sm)">
        <span style="font-size:13px">Notify sales on each lead</span>
        <div style="width:36px;height:20px;background:var(--good);border-radius:10px;cursor:pointer;position:relative"><div style="width:16px;height:16px;background:white;border-radius:50%;position:absolute;right:2px;top:2px"></div></div>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button class="btn ghost" data-act="close">Cancel</button>
        <button class="btn primary" data-act="toast" data-arg="Calculator published">Publish</button>
      </div>
    </div>
  `);
}

function openEditFormulas(){
  openDrawer('Formula editor',`
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="mut" style="font-size:12px">Define how output metrics are calculated from inputs. Use variable names from the Inputs panel.</div>
      <div>
        <label class="lbl">Annual savings formula</label>
        <textarea class="input" style="width:100%;height:52px;font-family:monospace;font-size:12px;resize:none">units * avg_rent * (current_cost_pct - target_cost_pct) * 12</textarea>
      </div>
      <div>
        <label class="lbl">ROI formula</label>
        <textarea class="input" style="width:100%;height:52px;font-family:monospace;font-size:12px;resize:none">(annual_savings / platform_cost) * 100</textarea>
      </div>
      <div>
        <label class="lbl">Payback period (months)</label>
        <textarea class="input" style="width:100%;height:52px;font-family:monospace;font-size:12px;resize:none">platform_cost / (annual_savings / 12)</textarea>
      </div>
      <div class="val-banner" style="background:rgba(var(--good-rgb,63,185,80),.08);border:1px solid rgba(63,185,80,.2);padding:8px 10px;border-radius:var(--r-sm)">
        ${svg(I.check,14)} <span style="font-size:12px">All formulas validated — no errors</span>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button class="btn ghost" data-act="close">Cancel</button>
        <button class="btn primary" data-act="toast" data-arg="Formulas saved">Save formulas</button>
      </div>
    </div>
  `);
}
