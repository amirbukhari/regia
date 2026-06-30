/* delonix — thememanager.js */

VIEWS.thememanager = (v)=>{
  const themes=[
    {id:'dark',label:'Midnight',desc:'Default dark · ember accents',bg:'#0b0a08',acc:'#ff5a1f',active:true},
    {id:'dawn',label:'Dawn',desc:'Light mode · warm neutrals',bg:'#f7f4f0',acc:'#e84e0f',active:false},
    {id:'slate',label:'Slate',desc:'Cool dark · blue-grey tones',bg:'#0f1117',acc:'#638cff',active:false},
    {id:'forest',label:'Forest',desc:'Dark green · earthy palette',bg:'#0b110d',acc:'#3fb950',active:false},
  ];
  const fonts=[
    {id:'inter',label:'Inter',preview:'The quick brown fox',note:'Default — clean, legible'},
    {id:'dm',label:'DM Sans',preview:'The quick brown fox',note:'Geometric, modern'},
    {id:'mono',label:'JetBrains Mono',preview:'The quick brown fox',note:'Monospace · data-dense'},
  ];
  v.appendChild(el(`<div class="view">
    ${pageHead('Theme & Branding','Customise the visual identity of the delonix platform',`
      <button class="btn ghost" data-act="toast" data-arg="Theme reset to defaults">Reset defaults</button>
      <button class="btn primary" data-act="applytheme">Apply changes</button>
    `)}

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div>
        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-title" style="margin-bottom:14px">Theme preset</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${themes.map(t=>`
              <div data-act="switchtheme" data-arg="${t.id}" style="cursor:pointer;border:1px solid ${t.active?'var(--ember)':'var(--border)'};border-radius:var(--r-sm);padding:12px;transition:.15s;${t.active?'background:rgba(255,90,31,.06)':''}">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                  <div style="width:18px;height:18px;border-radius:50%;background:${t.bg};border:2px solid ${t.acc}"></div>
                  <span style="font-weight:650;font-size:12px">${t.label}</span>
                  ${t.active?'<span class="pill good" style="font-size:10px;margin-left:auto">Active</span>':''}
                </div>
                <div class="mut" style="font-size:11px">${t.desc}</div>
              </div>`).join('')}
          </div>
        </div>

        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-title" style="margin-bottom:14px">Brand colours</div>
          <div style="display:flex;flex-direction:column;gap:12px">
            <div style="display:flex;align-items:center;justify-content:space-between">
              <div><div style="font-size:13px;font-weight:600">Accent colour</div><div class="mut" style="font-size:11px">CTAs, active states, highlights</div></div>
              <div style="display:flex;align-items:center;gap:6px">
                ${['#ff5a1f','#635bff','#0abf53','#e8b23f','#00a1e0','#b07cff'].map(c=>`<div data-act="toast" data-arg="Accent set to ${c}" style="width:22px;height:22px;border-radius:50%;background:${c};cursor:pointer;border:2px solid ${c==='#ff5a1f'?'white':'transparent'}" title="${c}"></div>`).join('')}
                <input type="color" value="#ff5a1f" style="width:28px;height:28px;border:none;background:none;cursor:pointer;border-radius:4px" data-act="toast" data-arg="Custom colour picked">
              </div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between">
              <div><div style="font-size:13px;font-weight:600">Secondary colour</div><div class="mut" style="font-size:11px">Charts, secondary badges</div></div>
              <div style="display:flex;align-items:center;gap:6px">
                ${['#5aa9ff','#3fb950','#e3b341','#b07cff','#ff6b9d'].map(c=>`<div data-act="toast" data-arg="Secondary set to ${c}" style="width:22px;height:22px;border-radius:50%;background:${c};cursor:pointer" title="${c}"></div>`).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="card panel">
          <div class="panel-title" style="margin-bottom:14px">Typography</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${fonts.map(f=>`
              <div style="display:flex;align-items:center;gap:10px;padding:8px;border-radius:var(--r-sm);border:1px solid var(--border);cursor:pointer" data-act="toast" data-arg="Font set to ${f.label}">
                <div style="width:34px;height:34px;border-radius:50%;background:var(--surface-2);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700">Aa</div>
                <div style="flex:1"><div style="font-weight:600;font-size:12px">${f.label}</div><div class="mut" style="font-size:11px">${f.note}</div></div>
                <span class="mut" style="font-size:12px;font-style:italic">${f.preview}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>

      <div>
        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-title" style="margin-bottom:14px">Logo & wordmark</div>
          <div style="display:flex;gap:12px;margin-bottom:14px">
            <div style="flex:1;border:1px dashed var(--border);border-radius:var(--r-sm);padding:20px;text-align:center;cursor:pointer" data-act="toast" data-arg="Logo upload dialog">
              <div style="font-size:24px;margin-bottom:4px">⬆</div>
              <div style="font-size:12px;font-weight:600">Upload logo</div>
              <div class="mut" style="font-size:11px">SVG, PNG · max 512KB</div>
            </div>
            <div style="flex:1;border:1px dashed var(--border);border-radius:var(--r-sm);padding:20px;text-align:center;cursor:pointer" data-act="toast" data-arg="Favicon upload dialog">
              <div style="font-size:24px;margin-bottom:4px">⬆</div>
              <div style="font-size:12px;font-weight:600">Upload favicon</div>
              <div class="mut" style="font-size:11px">ICO, PNG 32×32</div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Company name</label><input class="input" value="Delonix Inc" style="width:100%"></div>
            <div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Tagline (optional)</label><input class="input" value="Revenue operations platform" style="width:100%"></div>
          </div>
        </div>

        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-title" style="margin-bottom:14px">Customer portal branding</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Portal URL</label><input class="input" value="billing.delonix.io" style="width:100%"></div>
            <div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Support email</label><input class="input" value="billing@delonix.com" style="width:100%"></div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-top:1px solid var(--border);margin-top:4px">
              <span style="font-size:12px;font-weight:600">Remove "Powered by delonix" footer</span>
              <div style="width:36px;height:20px;background:var(--good);border-radius:10px;cursor:pointer;position:relative"><div style="width:16px;height:16px;background:white;border-radius:50%;position:absolute;right:2px;top:2px"></div></div>
            </div>
          </div>
        </div>

        <div class="card panel">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
            <div class="panel-title">Custom CSS</div>
            <span class="pill warn" style="font-size:10px">Enterprise only</span>
          </div>
          <textarea class="input" style="width:100%;height:90px;font-family:monospace;font-size:11px;resize:vertical" placeholder=":root { --ember: #ff5a1f; }&#10;.sidebar { width: 220px; }"></textarea>
          <div class="mut" style="font-size:11px;margin-top:6px">CSS applies to the main app and customer portal. Changes are validated before deployment.</div>
        </div>
      </div>
    </div>
  </div>`));
};

/* ============================================================
   Drawers (detail panels)
   ============================================================ */
