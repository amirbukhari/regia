/* delonix — settings.js */

function openNotifications(){
  const notifs=[
    {dot:'#e54949',msg:'Apex Systems — INV-2026-0831 overdue 14 days · $5,800',t:'2 min ago',act:'invoice',arg:'INV-2026-0831'},
    {dot:'#e54949',msg:'Summit Digital — PAY-2026-0412 failed · retry available',t:'18 min ago',act:'paydetail',arg:'PAY-2026-0412'},
    {dot:'#e54949',msg:'Stellar Systems — credit limit exceeded, subscription at risk',t:'1 hr ago',act:'account',arg:'Stellar Systems'},
    {dot:'#f5a623',msg:'Cascade Analytics — renewal due in 7 days · $2,950/mo',t:'3 hr ago',act:'subdetail',arg:'Cascade Analytics'},
    {dot:'#f5a623',msg:'Revenue recognition: 3 contracts pending manual review',t:'4 hr ago',act:'route',arg:'revrec'},
    {dot:'#f5a623',msg:'Financial close: 4 tasks pending CFO sign-off',t:'6 hr ago',act:'route',arg:'close'},
    {dot:'#4a9eff',msg:'Export ready: Q2 Board Pack — click to download',t:'Yesterday',act:'toast',arg:'Downloading Q2 Board Pack PDF…'},
    {dot:'#4a9eff',msg:'Stripe webhook: 2 failed deliveries in last hour',t:'Yesterday',act:'route',arg:'developers'},
  ];
  openDrawer('Notifications',`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <span style="font-size:12px;color:var(--text-3)">8 unread</span>
      <button class="btn ghost" style="padding:4px 10px;font-size:12px" data-act="toast" data-arg="All notifications marked as read">Mark all read</button>
    </div>
    <div class="notif-list">
      ${notifs.map(n=>`<button class="notif-item" data-act="${n.act}" data-arg="${n.arg}">
        <span class="notif-dot" style="background:${n.dot}"></span>
        <div class="notif-body"><div class="notif-msg">${n.msg}</div><div class="notif-time">${n.t}</div></div>
      </button>`).join('')}
    </div>`);
}

/* ── Entity switcher ── */

function openCurrencyPanel(){
  const currencies=[
    {flag:'🇺🇸',code:'USD',name:'US Dollar',rate:'1.0000',active:true},
    {flag:'🇪🇺',code:'EUR',name:'Euro',rate:'0.9242',active:false},
    {flag:'🇬🇧',code:'GBP',name:'British Pound',rate:'0.7874',active:false},
    {flag:'🇨🇦',code:'CAD',name:'Canadian Dollar',rate:'1.3621',active:false},
    {flag:'🇸🇬',code:'SGD',name:'Singapore Dollar',rate:'1.3498',active:false},
    {flag:'🇦🇺',code:'AUD',name:'Australian Dollar',rate:'1.5372',active:false},
  ];
  openDrawer('Display Currency',`
    <p style="font-size:12px;color:var(--text-3);margin-bottom:14px">Display only — invoices are billed in their contract currency.</p>
    ${currencies.map(c=>`<div class="entity-card${c.active?' active':''}" data-act="toast" data-arg="Display currency set to ${c.code}">
      <span style="font-size:20px">${c.flag}</span>
      <div class="entity-info"><div class="entity-name">${c.name}</div>
        <div class="entity-meta">${c.code} · 1 USD = ${c.rate} ${c.code}</div></div>
      ${c.active?'<span class="entity-check">✓</span>':''}
    </div>`).join('')}`);
}

/* ── New Quote ── */

function openApprovalRules(){
  const rules=[
    {thr:'Invoice > $10,000',approvers:'CFO',sla:'24h',active:true},
    {thr:'Invoice > $50,000',approvers:'CEO + CFO',sla:'48h',active:true},
    {thr:'Refund > $1,000',approvers:'Revenue Manager',sla:'12h',active:true},
    {thr:'Credit note > $5,000',approvers:'VP Finance',sla:'24h',active:true},
  ];
  openDrawer('Approval Rules',`
    <div class="table-wrap" style="border:none;margin-bottom:16px"><table><thead><tr>
      <th>Threshold</th><th>Approvers</th><th>SLA</th><th>Active</th></tr></thead><tbody>
      ${rules.map(r=>`<tr><td>${r.thr}</td><td class="nm">${r.approvers}</td>
        <td class="mut">${r.sla}</td>
        <td><div class="toggle${r.active?' on':''}" data-act="toggle"><i></i></div></td></tr>`).join('')}
    </tbody></table></div>
    <button class="btn ghost" style="font-size:12px" data-act="toast" data-arg="New approval rule added">+ Add rule</button>
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      ${cfgSaveBtn('approval-rules','Approval rules saved','Save rules')}
    </div>`);
}

/* ── Post to GL ── */

function openInviteUser(){
  openDrawer('Invite Team Member',`
    <div class="form-group"><label class="form-label">Email address</label>
      <input class="form-input" type="email" placeholder="colleague@company.com"></div>
    <div class="form-row" style="margin-top:12px"><div class="form-group"><label class="form-label">Role</label>
      <select class="form-select"><option>Admin</option><option>Revenue Manager</option><option>Collections</option><option>Sales Ops</option><option>Viewer (read-only)</option></select></div>
      <div class="form-group"><label class="form-label">Team</label>
      <select class="form-select"><option>Finance</option><option>Billing</option><option>Sales</option><option>Executive</option></select></div></div>
    <div class="form-group" style="margin-top:10px"><label class="form-label">Personal message (optional)</label>
      <textarea class="form-textarea" placeholder="Add a note to the invitation email…" style="min-height:56px"></textarea></div>
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn primary" data-act="toast" data-arg="Invitation sent — they will receive an email to set up their account">Send invitation</button>
    </div>`);
}

/* ── Price Book ── */

function openAuditHistory(arg){
  const parts = (arg||'').split(':');
  const objType = parts[0]||'Invoice', objId = parts[1]||'INV-2026-0847';
  const auditData = [
    {ts:'Jun 28 · 14:33',user:'Finance Bot',role:'System',action:'Invoice finalized — sent to customer',change:'Status: Draft → Finalized'},
    {ts:'Jun 28 · 14:32',user:'Sarah K.',role:'Finance',action:'Draft reviewed and approved',change:'Approval ref: APR-2026-0114'},
    {ts:'Jun 28 · 09:14',user:'Finance Bot',role:'System',action:'Draft invoice generated from billing run',change:'Amount: $9,200.00'},
    {ts:'Jun 22 · 11:20',user:'Admin',role:'Admin',action:'Invoice grouping policy updated',change:'Consolidated → Split by BU'},
    {ts:'Jun 01 · 00:01',user:'System',role:'System',action:'Billing period opened — June 2026',change:''},
  ];
  openDrawer(`Audit History — ${objType} ${objId}`, `
    <div class="toolbar" style="margin-bottom:12px">
      <span class="chip">${svg(I.filter,13)} Action type</span>
      <span class="chip">${svg(I.filter,13)} User</span>
      <div class="spacer"></div>
      <button class="btn ghost" style="font-size:12px;padding:5px 10px" data-act="toast" data-arg="Audit log exported">Export Log</button>
    </div>
    <div>${auditData.map(a=>`<div class="audit-row">
      <span class="audit-ts">${a.ts}</span>
      <span class="audit-user">${a.user}<br><span style="font-weight:400;font-size:11px;color:var(--text-3)">${a.role}</span></span>
      <span class="audit-action">${a.action}</span>
      <span class="audit-change" style="color:var(--text-3)">${a.change}</span>
    </div>`).join('')}</div>
  `);
}

function openMigrationDetail(id){
  openDrawer('Migration Detail — ' + id, `
    <div class="val-banner warn" style="margin-bottom:16px">${svg(I.migration,15)} <strong>BuildStream acquisition migration in progress.</strong> This customer requires manual mapping before billing can proceed.</div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-bottom:16px">
      <div class="fg"><label>Legacy Customer ID</label><div class="mono">${id}</div></div>
      <div class="fg"><label>Legacy Name</label><div>Riverfront Properties</div></div>
      <div class="fg"><label>Legacy Product</label><div>BuildStream Pro</div></div>
      <div class="fg"><label>Legacy MRR</label><div class="tnum">$4,800</div></div>
      <div class="fg"><label>Migration Batch</label><div>BATCH-2026-06</div></div>
      <div class="fg"><label>Reconciliation Status</label><div>${pill('warn','Pending')}</div></div>
    </div>
    <h4 style="font-size:13px;font-weight:700;margin-bottom:10px">Map to delonix</h4>
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg"><label>delonix Customer</label><select class="finput"><option>— create new —</option><option>Northwind Logistics</option><option>Acme Corp</option></select></div>
      <div class="fg"><label>Business Unit</label><select class="finput"><option>BU-001 · Residential</option><option>BU-002 · Commercial</option></select></div>
      <div class="fg"><label>Map to Product</label><select class="finput"><option>— select —</option><option>Enterprise Plan</option><option>Business Plan</option></select></div>
      <div class="fg"><label>Mapping Confidence</label><div>${pill('warn','Manual — low confidence')}</div></div>
    </div>
    <div class="form-actions" style="margin-top:16px"><button class="btn primary" data-act="toast" data-arg="Migration mapping saved — customer mapped to BU-001">Save Mapping</button><button class="btn ghost" onclick="closeDrawer()">Cancel</button></div>
  `);
}

function openDownloadPanel(arg){
  const parts=(arg||'pdf|Document|').split('|');
  const fmt=parts[0]||'pdf', title=parts[1]||'Document', detail=parts[2]||'';
  const fmtIcon = `<span style="display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;border-radius:14px;background:var(--ember-glow);color:var(--ember)">${svg(fmt==='xlsx'||fmt==='csv'?I.reports:I.invoices,30)}</span>`;
  const fmtLabel = fmt.toUpperCase();
  openDrawer(`Export — ${title}`, `
    <div style="text-align:center;padding:24px 0 16px">
      <div style="margin-bottom:12px">${fmtIcon}</div>
      <div style="font-weight:700;font-size:17px;margin-bottom:4px">${title}</div>
      <div class="mut" style="font-size:13px">${detail}</div>
    </div>
    <div style="padding:16px 14px;border:1px solid var(--border);border-radius:8px;margin-bottom:16px">
      <div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:8px">
        <span class="mut">Format</span><span class="mono" style="font-weight:600">${fmtLabel}</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:8px">
        <span class="mut">Generated</span><span>Jun 28 2026 · just now</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:12.5px">
        <span class="mut">Status</span><span style="color:var(--pos);font-weight:600">${svg(I.check,13)} Ready</span>
      </div>
    </div>
    <div class="form-actions">
      <button class="btn primary" onclick="toast('${fmtLabel} downloaded — check your Downloads folder');closeDrawer()">${svg(I.download,14)} Download ${fmtLabel}</button>
      <button class="btn ghost" onclick="toast('Link copied to clipboard')">Copy link</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openLogoUpload(){
  openDrawer('Brand Logo', `
    <div class="mut" style="font-size:12.5px;margin-bottom:14px">Logo appears on invoices, the customer portal, and email notifications. Separate logos can be set per Business Unit.</div>
    <div style="border:2px dashed var(--border-2);border-radius:8px;padding:28px;text-align:center;cursor:pointer;margin-bottom:14px" onclick="toast('File picker opened')">
      <div style="font-size:36px;margin-bottom:8px">🖼</div>
      <div style="font-size:13px;font-weight:600">Upload logo</div>
      <div class="mut" style="font-size:12px;margin-top:4px">PNG or SVG · 200×200px minimum · transparent background recommended</div>
    </div>
    <div style="margin-bottom:14px">
      <div style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:8px">BUSINESS UNIT OVERRIDES</div>
      ${BUS.slice(0,3).map(b=>`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)"><span class="bu-badge"><span class="bu-dot" style="background:${b.color}"></span>${b.name}</span><span class="mut" style="font-size:12px;flex:1">Using default logo</span><button class="btn ghost" style="font-size:11px;padding:3px 8px" data-act="toast" data-arg="Logo upload for ${b.name}">Upload</button></div>`).join('')}
    </div>
    <div class="form-actions"><button class="btn primary" data-act="toast" data-arg="Logo uploaded and saved">Save</button><button class="btn ghost" onclick="closeDrawer()">Cancel</button></div>
  `);
}

function openPortalThemeEditor(){
  openDrawer('Customer Portal Theme', `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg"><label>Primary accent color</label><div style="display:flex;gap:8px;align-items:center"><input class="finput" value="#2563eb" style="max-width:110px;font-family:monospace"><div style="width:28px;height:28px;border-radius:6px;background:#2563eb;flex-shrink:0"></div></div></div>
      <div class="fg"><label>Font family</label><select class="finput"><option selected>Inter (default)</option><option>System UI</option><option>DM Sans</option><option>Roboto</option></select></div>
      <div class="fg"><label>Border radius</label><select class="finput"><option>Sharp (0px)</option><option selected>Rounded (6px)</option><option>Pill (12px)</option></select></div>
      <div class="fg"><label>Logo position</label><select class="finput"><option selected>Top left</option><option>Top center</option></select></div>
    </div>
    <div style="margin-top:14px">
      <div style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:8px">PORTAL PREVIEW</div>
      <div style="padding:16px;border:1px solid var(--border);border-radius:8px;background:var(--bg-2)">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
          <div style="width:24px;height:24px;border-radius:4px;background:#2563eb"></div>
          <span style="font-weight:700;font-size:14px">delonix Billing</span>
        </div>
        <div style="font-size:12px;color:var(--text-2);margin-bottom:8px">Your invoices</div>
        <div style="padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:12px;background:var(--surface)">INV-2026-0847 · Jun 2026 · $9,200.00 · ${pill('good','Paid')}</div>
      </div>
    </div>
    <div class="form-actions" style="margin-top:14px">
      ${cfgSaveBtn('portal-theme','Portal theme saved and published','Save & Publish')}
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openEditRole(name){
  openDrawer('Edit Role — '+name,`
    <div style="display:flex;flex-direction:column;gap:14px">
      <div><label class="lbl">Role name</label><input class="input" value="${name}" style="width:100%"></div>
      <div><label class="lbl">Description</label><textarea class="input" style="width:100%;height:60px;resize:none">${name==='Super Admin'?'Full platform access':'Role with customised permissions'}</textarea></div>
      <div><label class="lbl">Inherits from</label><select class="input" style="width:100%"><option>— none —</option><option>Viewer</option><option>Revenue Ops</option><option>Finance Manager</option></select></div>
      <div><label class="lbl">Permissions</label>
        <div style="display:flex;flex-direction:column;gap:6px;margin-top:6px">
          ${['Customers','Subscriptions','Invoicing','Payments','Reports','Settings','API'].map(p=>`
            <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 10px;background:var(--surface-2);border-radius:var(--r-sm)">
              <span style="font-size:13px">${p}</span>
              <select class="input" style="width:120px;height:28px;font-size:11px"><option>Full access</option><option>Read-only</option><option>No access</option></select>
            </div>`).join('')}
        </div>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:4px">
        <button class="btn ghost" data-act="close">Cancel</button>
        ${cfgSaveBtn('role-'+name,`Role '${name}' updated`,'Save changes')}
      </div>
    </div>
  `);
}

function openEditMember(name){
  openDrawer('Edit Member — '+name,`
    <div style="display:flex;flex-direction:column;gap:14px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div><label class="lbl">Name</label><input class="input" value="${name}" style="width:100%"></div>
        <div><label class="lbl">Email</label><input class="input" value="${name.toLowerCase().replace(' ','.')}@delonix.com" style="width:100%"></div>
      </div>
      <div><label class="lbl">Role</label><select class="input" style="width:100%"><option>Super Admin</option><option>Admin</option><option selected>Finance Manager</option><option>Revenue Ops</option><option>Viewer</option><option>API Service Account</option></select></div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-2);border-radius:var(--r-sm)">
          <span style="font-size:13px">Require MFA</span>
          <div style="width:36px;height:20px;background:var(--good);border-radius:10px;cursor:pointer;position:relative"><div style="width:16px;height:16px;background:white;border-radius:50%;position:absolute;right:2px;top:2px"></div></div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-2);border-radius:var(--r-sm)">
          <span style="font-size:13px">API access</span>
          <div style="width:36px;height:20px;background:var(--border);border-radius:10px;cursor:pointer;position:relative"><div style="width:16px;height:16px;background:white;border-radius:50%;position:absolute;left:2px;top:2px"></div></div>
        </div>
      </div>
      <div style="display:flex;gap:8px;justify-content:space-between;margin-top:4px">
        <button class="btn ghost" style="color:var(--crit)" data-act="toast" data-arg="Removed ${name} from team">Remove member</button>
        <div style="display:flex;gap:8px">
          <button class="btn ghost" data-act="close">Cancel</button>
          <button class="btn primary" data-act="toast" data-arg="Member '${name}' updated">Save</button>
        </div>
      </div>
    </div>
  `);
}

function openAuditDetail(eventType){
  openDrawer('Audit event — '+eventType,`
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="kv-grid" style="display:grid;grid-template-columns:130px 1fr;gap:6px 14px">
        <span class="mut">Event type</span><span style="font-weight:600">${eventType}</span>
        <span class="mut">Timestamp</span><span class="mono">2026-06-28 10:41:03 UTC</span>
        <span class="mut">Actor</span><span>A. Bukhari (abukhari@delonix.com)</span>
        <span class="mut">Session ID</span><span class="mono" style="font-size:11px">sess_01Jx4mQpR9v2Kn7cP</span>
        <span class="mut">IP address</span><span class="mono">10.0.0.1 (internal)</span>
        <span class="mut">User agent</span><span style="font-size:12px">Chrome 126 · macOS 14.5</span>
        <span class="mut">Resource</span><span>D. Cho — role change</span>
        <span class="mut">Severity</span><span>${pill('warn','HIGH')}</span>
      </div>
      <div style="border-top:1px solid var(--border);padding-top:12px">
        <div style="font-weight:600;margin-bottom:8px;font-size:13px">Event payload</div>
        <pre class="mono" style="font-size:11px;background:var(--surface-2);padding:12px;border-radius:var(--r-sm);overflow-x:auto;white-space:pre-wrap">{
  "event": "${eventType}",
  "actor": "user_ABK001",
  "target": "user_DC042",
  "before": { "role": "revenue_ops" },
  "after":  { "role": "finance_manager" },
  "reason": "promotion",
  "approved_by": "user_ABK001"
}</pre>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button class="btn ghost" data-act="toast" data-arg="Audit event exported">Export JSON</button>
        <button class="btn ghost" data-act="close">Close</button>
      </div>
    </div>
  `);
}

function openApplyTheme(){
  openDrawer('Apply theme changes',`
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="val-banner info">${svg(I.warning,15)} Theme changes apply immediately for all users in your organisation.</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-2);border-radius:var(--r-sm)">
          <span style="font-size:13px">Apply to main app</span>
          <div style="width:36px;height:20px;background:var(--good);border-radius:10px;cursor:pointer;position:relative"><div style="width:16px;height:16px;background:white;border-radius:50%;position:absolute;right:2px;top:2px"></div></div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-2);border-radius:var(--r-sm)">
          <span style="font-size:13px">Apply to customer portal</span>
          <div style="width:36px;height:20px;background:var(--good);border-radius:10px;cursor:pointer;position:relative"><div style="width:16px;height:16px;background:white;border-radius:50%;position:absolute;right:2px;top:2px"></div></div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-2);border-radius:var(--r-sm)">
          <span style="font-size:13px">Apply to email templates</span>
          <div style="width:36px;height:20px;background:var(--border);border-radius:10px;cursor:pointer;position:relative"><div style="width:16px;height:16px;background:white;border-radius:50%;position:absolute;left:2px;top:2px"></div></div>
        </div>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button class="btn ghost" data-act="close">Cancel</button>
        <button class="btn primary" data-act="toast" data-arg="Theme changes applied to all surfaces">Apply now</button>
      </div>
    </div>
  `);
}

function doSwitchTheme(id){
  document.documentElement.setAttribute('data-theme', id==='dark'?'':id);
  showToast('Theme switched to '+id.charAt(0).toUpperCase()+id.slice(1));
}
