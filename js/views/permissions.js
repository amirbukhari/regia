/* delonix — permissions.js */

VIEWS.permissions = (v)=>{
  const roles=[
    {name:'Super Admin',desc:'Full platform access including billing & security',members:1,color:'#2563eb'},
    {name:'Admin',desc:'Full access except security settings & audit config',members:3,color:'#635bff'},
    {name:'Finance Manager',desc:'Revenue, invoicing, reports, GL export',members:5,color:'#0abf53'},
    {name:'Revenue Ops',desc:'Subscriptions, quotes, customers, usage',members:8,color:'#00a1e0'},
    {name:'Viewer',desc:'Read-only across all modules',members:12,color:'#888'},
    {name:'API Service Account',desc:'Scoped programmatic access',members:4,color:'#e8b23f'},
  ];
  const perms=[
    {cat:'Customers',     sa:2,ad:2,fm:1,ro:2,vw:0,api:1},
    {cat:'Subscriptions', sa:2,ad:2,fm:1,ro:2,vw:0,api:1},
    {cat:'Invoicing',     sa:2,ad:2,fm:2,ro:1,vw:0,api:2},
    {cat:'Payments',      sa:2,ad:2,fm:2,ro:0,vw:0,api:1},
    {cat:'Reports',       sa:2,ad:2,fm:2,ro:1,vw:1,api:1},
    {cat:'Quotes',        sa:2,ad:2,fm:1,ro:2,vw:0,api:0},
    {cat:'Revenue Rec.',  sa:2,ad:1,fm:2,ro:0,vw:0,api:0},
    {cat:'GL & Finance',  sa:2,ad:1,fm:2,ro:0,vw:0,api:0},
    {cat:'Settings',      sa:2,ad:1,fm:0,ro:0,vw:0,api:0},
    {cat:'Audit Log',     sa:2,ad:1,fm:1,ro:0,vw:0,api:0},
    {cat:'API & Webhooks',sa:2,ad:2,fm:0,ro:0,vw:0,api:2},
    {cat:'User Mgmt',     sa:2,ad:1,fm:0,ro:0,vw:0,api:0},
  ];
  const team=[
    {name:'Amir Bukhari',email:'abukhari@delonix.com',role:'Super Admin',status:'active',last:'Just now',mfa:true},
    {name:'M. Reyes',email:'mreyes@delonix.com',role:'Revenue Ops',status:'active',last:'2h ago',mfa:true},
    {name:'D. Cho',email:'dcho@delonix.com',role:'Finance Manager',status:'active',last:'1d ago',mfa:true},
    {name:'P. Anand',email:'panand@delonix.com',role:'Admin',status:'active',last:'3d ago',mfa:false},
    {name:'L. Torres',email:'ltorres@delonix.com',role:'Viewer',status:'pending',last:'—',mfa:false},
    {name:'CI/CD Bot',email:'ci-bot@delonix.com',role:'API Service Account',status:'active',last:'5m ago',mfa:false},
  ];
  const pCell=v=>{
    if(v===2) return `<span style="color:var(--good);font-size:14px" title="Full">●</span>`;
    if(v===1) return `<span style="color:var(--ember-soft);font-size:14px" title="Read-only">◑</span>`;
    return `<span style="color:var(--border);font-size:14px" title="None">○</span>`;
  };
  v.appendChild(el(`<div class="view">
    ${pageHead('Roles & Permissions','Team access control, role definitions, permission matrix',`
      <button class="btn ghost" data-act="toast" data-arg="SCIM provisioning settings">${svg(I.plug,15)} SCIM/SSO</button>
      <button class="btn primary" data-act="inviteusr">${svg(I.team,15)} Invite member</button>
    `)}

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px">
      ${roles.map(r=>`
        <div class="card panel" style="cursor:pointer;border-left:3px solid ${r.color}" data-act="editrole" data-arg="${r.name}">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
            <span style="font-weight:650;font-size:13px">${r.name}</span>
            <span class="pill muted">${r.members} ${r.name==='API Service Account'?'keys':'members'}</span>
          </div>
          <div class="mut" style="font-size:12px;line-height:1.5">${r.desc}</div>
        </div>`).join('')}
    </div>

    <div class="card panel" style="margin-bottom:24px;padding:0;overflow:hidden">
      <div style="padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <span style="font-weight:650;font-size:13px">Permission Matrix</span>
        <span class="mut" style="font-size:11px">● Full &nbsp;◑ Read-only &nbsp;○ None</span>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table" style="min-width:700px">
          <thead><tr>
            <th style="width:160px">Module</th>
            <th style="text-align:center">Super Admin</th>
            <th style="text-align:center">Admin</th>
            <th style="text-align:center">Finance Mgr</th>
            <th style="text-align:center">Revenue Ops</th>
            <th style="text-align:center">Viewer</th>
            <th style="text-align:center">API</th>
          </tr></thead>
          <tbody>
            ${perms.map(p=>`<tr>
              <td style="font-weight:500;font-size:12px">${p.cat}</td>
              <td style="text-align:center">${pCell(p.sa)}</td>
              <td style="text-align:center">${pCell(p.ad)}</td>
              <td style="text-align:center">${pCell(p.fm)}</td>
              <td style="text-align:center">${pCell(p.ro)}</td>
              <td style="text-align:center">${pCell(p.vw)}</td>
              <td style="text-align:center">${pCell(p.api)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="card panel" style="padding:0;overflow:hidden">
      <div style="padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <span style="font-weight:650;font-size:13px">Team Members</span>
        <div style="display:flex;gap:8px">
          <span class="mut" style="font-size:12px;align-self:center">6 members · 1 pending</span>
          <button class="btn ghost" style="font-size:12px" data-act="toast" data-arg="Export team roster">Export</button>
        </div>
      </div>
      <table class="data-table">
        <thead><tr>
          <th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Last active</th><th>MFA</th><th></th>
        </tr></thead>
        <tbody>
          ${team.map(m=>`<tr>
            <td style="font-weight:600">${m.name}</td>
            <td class="mono mut" style="font-size:12px">${m.email}</td>
            <td>${pill(m.role==='Super Admin'?'crit':m.role==='API Service Account'?'warn':'good',m.role)}</td>
            <td>${pill(m.status==='pending'?'warn':'good',m.status)}</td>
            <td class="mut" style="font-size:12px">${m.last}</td>
            <td style="font-size:12px">${m.mfa?'<span style="color:var(--good)">✓ enabled</span>':'<span style="color:var(--crit)">✗ off</span>'}</td>
            <td style="text-align:right"><button class="btn ghost" style="font-size:11px;padding:3px 8px" data-act="editmember" data-arg="${m.name}">Edit</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`));
};
