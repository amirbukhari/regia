/* delonix — settings.js */

VIEWS.settings = (v)=>{
  requestAnimationFrame(()=>{
    const p=document.getElementById('themePicker');if(p)buildThemePicker(p);
    // Sync density buttons
    const saved=localStorage.getItem('dlx-density')||'default';
    document.querySelectorAll('.settings-d-btn').forEach(b=>b.classList.toggle('active',b.dataset.arg===saved));
  });
  v.appendChild(el(`<div class="view">
    ${pageHead('Settings','Billing configuration, payment gateways, team access and audit trail.','')}
        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-head"><h3>Feature flags</h3><div class="right"><button class="btn ghost" style="padding:5px 10px" data-act="resetflags">Reset defaults</button></div></div>
          <div class="feature-flag-note">Hide unfinished, optional, or discovery surfaces without deleting them. Hidden modules stay in the codebase, stay auditable, and can be toggled back on for review.</div>
          ${(typeof featureFlagRows === 'function') ? featureFlagRows() : ''}
        </div>
            <div class="card panel" style="margin-bottom:16px">
          <div class="panel-head"><h3>Appearance</h3></div>
          <div style="padding:0 18px 18px">
            <div style="font-size:11px;letter-spacing:.6px;text-transform:uppercase;color:var(--text-3);font-weight:700;padding:12px 0 8px">Color theme</div>
            <div class="theme-picker-grid" id="themePicker"></div>
            <div style="font-size:11px;letter-spacing:.6px;text-transform:uppercase;color:var(--text-3);font-weight:700;padding:18px 0 8px">Data density</div>
            <div style="display:flex;gap:8px">
              <button class="d-btn settings-d-btn" data-act="density" data-arg="compact" style="flex:1;padding:8px 0;border-radius:6px;border:1px solid var(--border-2);background:var(--surface-2);cursor:pointer;font-size:12px;color:var(--text-2);font-weight:600">Compact</button>
              <button class="d-btn settings-d-btn active" data-act="density" data-arg="default" style="flex:1;padding:8px 0;border-radius:6px;border:1px solid var(--border-2);background:var(--surface-2);cursor:pointer;font-size:12px;color:var(--text-2);font-weight:600">Default</button>
              <button class="d-btn settings-d-btn" data-act="density" data-arg="spacious" style="flex:1;padding:8px 0;border-radius:6px;border:1px solid var(--border-2);background:var(--surface-2);cursor:pointer;font-size:12px;color:var(--text-2);font-weight:600">Spacious</button>
            </div>
          </div>
        </div>
    <div class="two-col">
      <div>
        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-head"><h3>Billing configuration</h3></div>
          ${[['Auto-collection','Automatically charge saved payment methods on due date'],
             ['Smart dunning retries','ML-optimized retry timing for failed payments'],
             ['Proration','Prorate mid-cycle upgrades and downgrades'],
             ['Multi-currency invoicing',"Invoice in customer's local currency"],
             ['Revenue recognition (ASC 606)','Generate deferred revenue schedules']]
            .map(([t,d])=>`<div class="set-row"><div><div class="t">${t}</div><div class="d">${d}</div></div><div class="spacer"></div>${tgl('settings-'+t.toLowerCase().replace(/[^a-z0-9]+/g,'-'), true, `aria-label="Toggle ${t}"`)}</div>`).join('')}
        </div>
        <div class="card panel">
          <div class="panel-head"><h3>Team & permissions</h3><div class="right"><button class="btn ghost" style="padding:5px 10px" data-act="inviteusr">+ Invite</button></div></div>
          <div class="table-wrap" style="border:none"><table style="min-width:0"><thead><tr><th>Member</th><th>Role</th><th>Access</th></tr></thead>
          <tbody>${[...db().added.members.map(m=>[m.name,m.role,'Invited · pending']), ['Amir Bukhari','Admin','Full'],['M. Reyes','Revenue Manager','Billing, A/R'],['D. Cho','Collections','A/R, Dunning'],['P. Anand','Sales Ops','Quotes'],['Auditor (read-only)','Viewer','Reports']]
            .map(r=>`<tr><td class="nm">${r[0]}</td><td>${pill(r[1]==='Admin'?'ember':'muted',r[1])}</td><td class="mut">${r[2]}</td></tr>`).join('')}</tbody></table></div>
        </div>
      </div>
      <div>
        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-head"><h3>Payment gateways</h3></div>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${[['Stripe','#635bff','Connected · primary','good','Live'],['Adyen','#0abf53','Connected · EU/APAC','good','Live'],['PayPal','#003087','Not connected','muted','Off'],['NetSuite (GL sync)','#1f7a3d','Syncing nightly','good','Live']]
              .map(g=>`<div class="gw"><div class="gi" style="background:${g[1]}22;color:${g[1]}">${g[0][0]}</div><div style="flex:1"><div class="nm">${g[0]}</div><div class="mut">${g[2]}</div></div>${pill(g[3],g[4])}</div>`).join('')}
          </div>
        </div>
        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-head"><h3>Demo data</h3><div class="right"><button class="btn ghost" style="padding:5px 10px" data-act="resetdemo">Reset demo data</button></div></div>
          <div class="feature-flag-note">Everything you change in this mock — invoices, payments, customers, contact logs and configuration — is stored locally in your browser (localStorage). Nothing leaves your machine. Reset restores the original sample data.</div>
        </div>
        <div class="card panel">
          <div class="panel-head"><h3>Audit log</h3><span class="sub">immutable</span></div>
          <div class="activity">
            ${[...db().activity.map(a=>[a.who,a.what,a.when]),
               ['M. Reyes','voided INV-2026-1033','1h'],['System','closed May period','2d'],['D. Cho','refunded $400 to Solstice Media','3d'],['P. Anand','approved Q-2026-315','4d']]
              .slice(0,8).map(r=>`<div class="act"><div class="ai">${svg(I.settings,15)}</div><div><div class="at">${r[0]}</div><div class="am">${r[1]}</div></div><time>${r[2]}</time></div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`));
};

/* ============================================================
   AI Insights view
   ============================================================ */
