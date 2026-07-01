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
          <div class="set-row"><div><div class="t">Auto-collection</div><div class="d">Automatically charge saved payment methods on due date</div></div><div class="spacer"></div><div class="toggle on" data-act="toggle"><i></i></div></div>
          <div class="set-row"><div><div class="t">Smart dunning retries</div><div class="d">ML-optimized retry timing for failed payments</div></div><div class="spacer"></div><div class="toggle on" data-act="toggle"><i></i></div></div>
          <div class="set-row"><div><div class="t">Proration</div><div class="d">Prorate mid-cycle upgrades and downgrades</div></div><div class="spacer"></div><div class="toggle on" data-act="toggle"><i></i></div></div>
          <div class="set-row"><div><div class="t">Multi-currency invoicing</div><div class="d">Invoice in customer's local currency</div></div><div class="spacer"></div><div class="toggle on" data-act="toggle"><i></i></div></div>
          <div class="set-row"><div><div class="t">Revenue recognition (ASC 606)</div><div class="d">Generate deferred revenue schedules</div></div><div class="spacer"></div><div class="toggle on" data-act="toggle"><i></i></div></div>
        </div>
        <div class="card panel">
          <div class="panel-head"><h3>Team & permissions</h3><div class="right"><button class="btn ghost" style="padding:5px 10px" data-act="inviteusr">+ Invite</button></div></div>
          <div class="table-wrap" style="border:none"><table style="min-width:0"><thead><tr><th>Member</th><th>Role</th><th>Access</th></tr></thead>
          <tbody>${[['Amir Bukhari','Admin','Full'],['M. Reyes','Revenue Manager','Billing, A/R'],['D. Cho','Collections','A/R, Dunning'],['P. Anand','Sales Ops','Quotes'],['Auditor (read-only)','Viewer','Reports']]
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
        <div class="card panel">
          <div class="panel-head"><h3>Audit log</h3><span class="sub">immutable</span></div>
          <div class="activity">
            ${[['Amir Bukhari','enabled smart dunning retries','2m'],['M. Reyes','voided INV-2026-1033','1h'],['System','closed May period','2d'],['D. Cho','refunded $400 to Solstice Media','3d'],['P. Anand','approved Q-2026-315','4d']]
              .map(r=>`<div class="act"><div class="ai">${svg(I.settings,15)}</div><div><div class="at">${r[0]}</div><div class="am">${r[1]}</div></div><time>${r[2]}</time></div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`));
};

/* ============================================================
   AI Insights view
   ============================================================ */
