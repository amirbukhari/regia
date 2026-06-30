/* delonix — customentities.js */

VIEWS.customentities = (v)=>{
  const ENTITIES = [
    {id:'CE-001',name:'Property',icon:'🏢',fields:14,records:312,system:false,desc:'Multi-unit residential or commercial property with units, owners and billing contacts'},
    {id:'CE-002',name:'Contract',icon:'📄',fields:11,records:847,system:false,desc:'Custom contract object linked to Account and Subscription with legal terms and obligations'},
    {id:'CE-003',name:'Ownership Group',icon:'👥',fields:8,records:94,system:false,desc:'Portfolio entity grouping multiple Properties and Accounts under a single billing hierarchy'},
    {id:'CE-004',name:'Cost Center',icon:'💰',fields:6,records:28,system:true,desc:'System-level GL cost allocation object — read-only from billing, write via GL sync'},
  ];
  const FIELDS = [
    {name:'property_id',type:'Text',required:true,indexed:true,system:true,display:'Property ID'},
    {name:'owner_name',type:'Text',required:true,indexed:false,system:false,display:'Owner name'},
    {name:'unit_count',type:'Number',required:true,indexed:false,system:false,display:'Unit count'},
    {name:'property_class',type:'Dropdown',required:false,indexed:true,system:false,display:'Property class',opts:'Class A,Class B,Class C,Mixed-use'},
    {name:'billing_contact',type:'Relation → Contact',required:false,indexed:false,system:false,display:'Billing contact'},
    {name:'management_company',type:'Relation → Account',required:false,indexed:true,system:false,display:'Management company'},
    {name:'go_live_date',type:'Date',required:false,indexed:false,system:false,display:'Go-live date'},
    {name:'annual_revenue',type:'Currency',required:false,indexed:false,system:false,display:'Annual revenue'},
    {name:'portal_enabled',type:'Boolean',required:false,indexed:false,system:false,display:'Portal enabled'},
  ];
  v.appendChild(el(`<div class="view">
  ${pageHead('Custom Entities','Define custom object types, fields and relationships to extend the billing data model',
    `<button class="btn primary" data-act="newentity">+ New entity</button>`
  )}
    <div style="display:grid;grid-template-columns:280px 1fr;gap:16px">
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <div style="font-size:12px;font-weight:700;color:var(--text-3);letter-spacing:.07em">ENTITY TYPES</div>
          <button class="btn ghost" style="font-size:11px;padding:3px 9px" data-act="newentity">+ New</button>
        </div>
        ${ENTITIES.map((e,i)=>`
          <div class="nav-item${i===0?' active':''}" style="margin-bottom:2px;cursor:pointer" data-act="toast" data-arg="Switched to ${e.name} entity">
            <span style="font-size:16px">${e.icon}</span>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:600">${e.name}</div>
              <div class="mut" style="font-size:11px">${e.fields} fields · ${e.records.toLocaleString()} records</div>
            </div>
            ${e.system?`<span class="pill muted" style="font-size:10px">system</span>`:''}
          </div>`).join('')}

        <div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--border)">
          <div style="font-size:11px;font-weight:700;color:var(--text-3);letter-spacing:.07em;margin-bottom:8px">STANDARD OBJECTS</div>
          ${['Account','Subscription','Invoice','Contact','Product','Payment'].map(o=>`
            <div style="padding:7px 10px;font-size:12.5px;color:var(--text-2);display:flex;align-items:center;gap:8px">
              <span class="pill muted" style="font-size:10px">read-only</span>${o}
            </div>`).join('')}
        </div>
      </div>

      <div>
        <div class="card panel" style="margin-bottom:14px">
          <div class="panel-head">
            <div><h3>🏢 Property</h3><div class="sub">Custom entity · ${FIELDS.length} fields · 312 records</div></div>
            <div class="right" style="gap:8px">
              <button class="btn ghost" style="font-size:12px" data-act="toast" data-arg="Exporting Property schema as JSON">Export schema</button>
              <button class="btn primary" style="font-size:12px" data-act="newfield">+ Add field</button>
            </div>
          </div>
          <div class="mut" style="font-size:13px;margin-bottom:14px">${ENTITIES[0].desc}</div>

          <table class="tbl" style="width:100%">
            <thead><tr><th>Field name</th><th>API key</th><th>Type</th><th>Required</th><th>Indexed</th><th></th></tr></thead>
            <tbody>
              ${FIELDS.map(f=>`
                <tr>
                  <td style="font-weight:600">${f.display}</td>
                  <td><code class="mono" style="font-size:11.5px;background:var(--surface);padding:2px 6px;border-radius:4px">${f.name}</code></td>
                  <td><span class="pill muted" style="font-size:11px">${f.type}</span></td>
                  <td>${f.required?`<span style="color:var(--ok)">${svg(I.check,13)}</span>`:'<span class="mut">—</span>'}</td>
                  <td>${f.indexed?`<span style="color:var(--ok)">${svg(I.check,13)}</span>`:'<span class="mut">—</span>'}</td>
                  <td>${f.system?'':`<button class="btn ghost" style="font-size:11px;padding:2px 8px" data-act="editfield" data-arg="${f.name}">Edit</button>`}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>

        <div class="card panel">
          <div class="panel-head"><h3>Relationships</h3><span class="sub">Property ↔ other objects</span></div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
            ${[
              {from:'Property',to:'Account',type:'Many → One',label:'Managed by',field:'management_company'},
              {from:'Property',to:'Subscription',type:'One → Many',label:'Has subscriptions',field:'(via account)'},
              {from:'Property',to:'Ownership Group',type:'Many → One',label:'Belongs to',field:'ownership_group_id'},
              {from:'Property',to:'Contact',type:'Many → One',label:'Billing contact',field:'billing_contact'},
              {from:'Property',to:'Invoice',type:'One → Many',label:'Billed on',field:'(via account)'},
              {from:'Property',to:'Cost Center',type:'Many → One',label:'GL allocation',field:'cost_center_id'},
            ].map(r=>`
              <div style="background:var(--surface);padding:10px;border-radius:7px;font-size:12px">
                <div style="font-weight:700;margin-bottom:4px">${r.label}</div>
                <div class="mut">${r.from} → ${r.to}</div>
                <div class="mut">${r.type}</div>
                <code class="mono" style="font-size:10.5px;color:var(--text-3)">${r.field}</code>
              </div>`).join('')}
          </div>
          <button class="btn ghost" style="margin-top:12px;font-size:12px" data-act="toast" data-arg="Add relationship dialog opened">+ Add relationship</button>
        </div>
      </div>
    </div>
  </div>`));
};
