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
      <span style="font-size:12px;color:var(--text-3)" id="notifUnread">8 unread</span>
      <button class="btn ghost" style="padding:4px 10px;font-size:12px" data-act="readall">Mark all read</button>
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
    ${currencies.map(c=>`<div class="entity-card${c.active?' active':''}" data-act="setcurrency" data-arg="${c.code}">
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
    <button class="btn ghost" style="font-size:12px" data-act="addrule">+ Add rule</button>
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      ${cfgSaveBtn('approval-rules','Approval rules saved','Save rules')}
    </div>`);
}

/* ── Post to GL ── */

function openInviteUser(){
  openDrawer('Invite Team Member',`
    <div class="form-group"><label class="form-label">Email address</label>
      <input class="form-input" id="iv_email" type="email" placeholder="colleague@company.com"></div>
    <div class="form-row" style="margin-top:12px"><div class="form-group"><label class="form-label">Role</label>
      <select class="form-select" id="iv_role"><option>Admin</option><option>Revenue Manager</option><option>Collections</option><option>Sales Ops</option><option>Viewer (read-only)</option></select></div>
      <div class="form-group"><label class="form-label">Team</label>
      <select class="form-select"><option>Finance</option><option>Billing</option><option>Sales</option><option>Executive</option></select></div></div>
    <div class="form-group" style="margin-top:10px"><label class="form-label">Personal message (optional)</label>
      <textarea class="form-textarea" placeholder="Add a note to the invitation email…" style="min-height:56px"></textarea></div>
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn primary" data-act="invitemember">Send invitation</button>
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
      <div class="spacer"></div>
      <button class="btn ghost" style="font-size:12px;padding:5px 10px" data-act="download" data-arg="csv|Audit History ${objId}|${auditData.length} events">Export Log</button>
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
  const ss = (typeof SOURCE_SYSTEMS!=='undefined') && SOURCE_SYSTEMS.find(s=>s.id===id);
  if(ss){
    const acquired = ss.type==='acquired';
    openDrawer(`Source System — ${ss.name} <span class="mono mut" style="font-size:12px;font-weight:400">${ss.id}</span>`, `
      <div class="val-banner ${acquired?'warn':'info'}" style="margin-bottom:16px">${svg(I.migration,15)} <strong>${acquired?'Acquisition migration in progress.':'Accounting export connection.'}</strong> ${acquired?'Legacy customers are being mapped into delonix accounts.':'Journal entries export on a scheduled sync.'}</div>
      <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-bottom:16px">
        <div class="fg"><label>System</label><div>${ss.name}</div></div>
        <div class="fg"><label>Type</label><div>${ss.type}</div></div>
        ${acquired?`<div class="fg"><label>Legacy customers</label><div class="tnum">${ss.legacyCustomers}</div></div>
        <div class="fg"><label>Mapped</label><div class="tnum">${ss.mapped} · ${ss.unresolved} unresolved</div></div>
        <div class="fg"><label>Invoice total (legacy)</label><div class="tnum">${fmt(ss.invoiceTotal)}</div></div>
        <div class="fg"><label>Variance</label><div class="tnum" style="color:var(--warn)">${fmt(ss.delta)} — within tolerance</div></div>`
        :`<div class="fg"><label>Connection</label><div>${pill('good','Active')}</div></div>
        <div class="fg"><label>Last sync</label><div class="tnum">${ss.lastSync}</div></div>
        <div class="fg"><label>Records exported</label><div class="tnum">${ss.recordsExported}</div></div>
        <div class="fg"><label>Status</label><div>${pill('good','Healthy')}</div></div>`}
      </div>
      <div class="form-actions" style="margin-top:16px">${acquired?`<button class="btn primary" data-act="route" data-arg="migration">Open mapping queue</button>`:`<button class="btn primary" data-act="demoact" data-arg="${ss.name} sync triggered — run logged in the activity feed">Sync now</button>`}<button class="btn ghost" onclick="closeDrawer()">Close</button></div>`);
    return;
  }
  if(id==='bulk'){
    openDrawer('Bulk Mapping — unresolved customers', `
      <div class="val-banner warn" style="margin-bottom:16px">${svg(I.migration,15)} <strong>23 legacy customers need manual mapping.</strong> Suggested matches are ranked by name and billing-address similarity.</div>
      <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-bottom:16px">
        <div class="fg"><label>Match strategy</label><select class="finput"><option>Name + address similarity</option><option>Tax ID exact match</option><option>Manual only</option></select></div>
        <div class="fg"><label>Auto-accept threshold</label><select class="finput"><option>95% confidence</option><option>90% confidence</option><option>Manual review all</option></select></div>
      </div>
      <div class="form-actions" style="margin-top:16px"><button class="btn primary" data-act="demoact" data-arg="Bulk mapping started — 23 customers queued for review">Run bulk mapping</button><button class="btn ghost" onclick="closeDrawer()">Cancel</button></div>`);
    return;
  }
  const legacyName = dlxPick(id,['Riverfront Properties','Harborline Estates','Crestview Property Group','Lakeshore Rentals','Summit Property Co']);
  openDrawer('Migration Detail — ' + id, `
    <div class="val-banner warn" style="margin-bottom:16px">${svg(I.migration,15)} <strong>BuildStream acquisition migration in progress.</strong> This customer requires manual mapping before billing can proceed.</div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-bottom:16px">
      <div class="fg"><label>Legacy Customer ID</label><div class="mono">${id}</div></div>
      <div class="fg"><label>Legacy Name</label><div>${legacyName}</div></div>
      <div class="fg"><label>Legacy Product</label><div>BuildStream ${dlxPick(id+'p',['Pro','Standard','Enterprise'])}</div></div>
      <div class="fg"><label>Legacy MRR</label><div class="tnum">${fmt(dlxRange(id,800,6200))}</div></div>
      <div class="fg"><label>Migration Batch</label><div>BATCH-2026-0${dlxRange(id+'b',4,6)}</div></div>
      <div class="fg"><label>Reconciliation Status</label><div>${pill('warn','Pending')}</div></div>
    </div>
    <h4 style="font-size:13px;font-weight:700;margin-bottom:10px">Map to delonix</h4>
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg"><label>delonix Customer</label><select class="finput"><option>— create new —</option><option>Northwind Logistics</option><option>Acme Corp</option></select></div>
      <div class="fg"><label>Business Unit</label><select class="finput"><option>BU-001 · Residential</option><option>BU-002 · Commercial</option></select></div>
      <div class="fg"><label>Map to Product</label><select class="finput"><option>— select —</option><option>Enterprise Plan</option><option>Business Plan</option></select></div>
      <div class="fg"><label>Mapping Confidence</label><div>${pill('warn','Manual — low confidence')}</div></div>
    </div>
    <div class="form-actions" style="margin-top:16px"><button class="btn primary" data-act="demoact" data-arg="Migration mapping saved — customer mapped to BU-001">Save Mapping</button><button class="btn ghost" onclick="closeDrawer()">Cancel</button></div>
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
      <div style="margin-bottom:8px">${svg(I.brush,28)}</div>
      <div style="font-size:13px;font-weight:600">Upload logo</div>
      <div class="mut" style="font-size:12px;margin-top:4px">PNG or SVG · 200×200px minimum · transparent background recommended</div>
    </div>
    <div style="margin-bottom:14px">
      <div style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:8px">BUSINESS UNIT OVERRIDES</div>
      ${BUS.slice(0,3).map(b=>`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)"><span class="bu-badge"><span class="bu-dot" style="background:${b.color}"></span>${b.name}</span><span class="mut" style="font-size:12px;flex:1">Using default logo</span><button class="btn ghost" style="font-size:11px;padding:3px 8px" data-act="toast" data-arg="File uploads are disabled in this demo build">Upload</button></div>`).join('')}
    </div>
    <div class="val-banner info" style="margin:2px 0 12px">${svg(I.warning,14)} File uploads are disabled in this demo build — logo changes require the production asset pipeline.</div>
    <div class="form-actions"><button class="btn primary" disabled style="opacity:.45;cursor:not-allowed" aria-disabled="true" title="Uploads are disabled in the demo">Save</button><button class="btn ghost" onclick="closeDrawer()">Close</button></div>
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
  const MEMBER_INFO = {
    'Amir Bukhari':{email:'abukhari@delonix.com',role:'Super Admin',mfa:true,api:true},
    'M. Reyes':{email:'mreyes@delonix.com',role:'Finance Manager',mfa:true,api:false},
    'D. Cho':{email:'dcho@delonix.com',role:'Revenue Ops',mfa:true,api:false},
    'P. Anand':{email:'panand@delonix.com',role:'Revenue Ops',mfa:false,api:false},
    'L. Torres':{email:'ltorres@delonix.com',role:'Viewer',mfa:true,api:false},
    'CI/CD Bot':{email:'cicd-bot@delonix.com',role:'API Service Account',mfa:false,api:true},
  };
  const m = MEMBER_INFO[name] || {email:(name||'user').toLowerCase().replace(/[^a-z0-9]+/g,'.')+'@delonix.com',role:'Viewer',mfa:false,api:false};
  openDrawer('Edit Member — '+name,`
    <div style="display:flex;flex-direction:column;gap:14px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div><label class="lbl">Name</label><input class="input" value="${name}" style="width:100%"></div>
        <div><label class="lbl">Email</label><input class="input" value="${m.email}" style="width:100%"></div>
      </div>
      <div><label class="lbl">Role</label><select class="input" style="width:100%">${['Super Admin','Admin','Finance Manager','Revenue Ops','Viewer','API Service Account'].map(r=>`<option${r===m.role?' selected':''}>${r}</option>`).join('')}</select></div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-2);border-radius:var(--r-sm)">
          <span style="font-size:13px">Require MFA</span>
          ${tgl('member-'+name+'-mfa', m.mfa, `aria-label="Require MFA for ${name}"`)}
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-2);border-radius:var(--r-sm)">
          <span style="font-size:13px">API access</span>
          ${tgl('member-'+name+'-api', m.api, `aria-label="API access for ${name}"`)}
        </div>
      </div>
      <div style="display:flex;gap:8px;justify-content:space-between;margin-top:4px">
        <button class="btn ghost" style="color:var(--crit)" data-act="removemember" data-arg="${name}">Remove member</button>
        <div style="display:flex;gap:8px">
          <button class="btn ghost" data-act="close">Cancel</button>
          ${cfgSaveBtn('member-'+name,`Member '${name}' updated`,'Save')}
        </div>
      </div>
    </div>
  `);
}

function openAuditDetail(eventType){
  const et = eventType||'Event';
  const actor = dlxPick(et,['A. Bukhari (abukhari@delonix.com)','M. Reyes (mreyes@delonix.com)','D. Cho (dcho@delonix.com)','Finance Bot (system)']);
  const sev = /delete|permission|role|export|key/i.test(et) ? pill('warn','HIGH') : /modif|void|credit/i.test(et) ? pill('ember','MEDIUM') : pill('muted','ROUTINE');
  const target = /invoice/i.test(et) ? 'INV-2026-08'+dlxRange(et,10,47) : /price/i.test(et) ? '2026 Standard price book' : /permission|role/i.test(et) ? 'D. Cho — role change' : /export/i.test(et) ? 'Customer export (247 rows)' : 'Billing object '+dlxRange(et,100,999);
  const ts = `2026-06-${dlxRange(et+'d',21,28)} ${String(dlxRange(et+'h',8,18)).padStart(2,'0')}:${String(dlxRange(et+'m',10,59))}:0${dlxRange(et+'s',1,9)} UTC`;
  openDrawer('Audit event — '+et,`
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="kv-grid" style="display:grid;grid-template-columns:130px 1fr;gap:6px 14px">
        <span class="mut">Event type</span><span style="font-weight:600">${eventType}</span>
        <span class="mut">Timestamp</span><span class="mono">${ts}</span>
        <span class="mut">Actor</span><span>${actor}</span>
        <span class="mut">Session ID</span><span class="mono" style="font-size:11px">sess_${dlxHash(et).toString(36)}Qp${dlxHash(et+"x").toString(36).slice(0,6)}</span>
        <span class="mut">IP address</span><span class="mono">10.0.0.1 (internal)</span>
        <span class="mut">User agent</span><span style="font-size:12px">Chrome 126 · macOS 14.5</span>
        <span class="mut">Resource</span><span>${target}</span>
        <span class="mut">Severity</span><span>${sev}</span>
      </div>
      <div style="border-top:1px solid var(--border);padding-top:12px">
        <div style="font-weight:600;margin-bottom:8px;font-size:13px">Event payload</div>
        <pre class="mono" style="font-size:11px;background:var(--surface-2);padding:12px;border-radius:var(--r-sm);overflow-x:auto;white-space:pre-wrap">{
  "event": "${et.toLowerCase().replace(/[^a-z0-9]+/g,'_')}",
  "actor": "${actor.split(' (')[0]}",
  "target": "${target}",
  "recorded_at": "${ts}",
  "immutable": true
}</pre>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button class="btn ghost" data-act="download" data-arg="json|Audit Event|full payload · immutable record">Export JSON</button>
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
        <button class="btn primary" data-act="demoact" data-arg="Theme changes applied to all surfaces">Apply now</button>
      </div>
    </div>
  `);
}

function doSwitchTheme(id){
  document.documentElement.setAttribute('data-theme', id==='dark'?'':id);
  showToast('Theme switched to '+id.charAt(0).toUpperCase()+id.slice(1));
}
