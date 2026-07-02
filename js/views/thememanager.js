/* delonix — thememanager.js */

VIEWS.thememanager = (v)=>{
  const cur=document.documentElement.dataset.theme||'ember';
  // Real themes from theme.js — clicking one actually switches the whole UI live.
  const themes=THEMES.map(t=>({id:t.id,label:t.name,desc:t.desc,bg:t.bg,acc:t.dot,active:t.id===cur}));
  const fonts=[
    {id:'inter',label:'Inter',preview:'The quick brown fox',note:'Default — clean, legible'},
    {id:'dm',label:'DM Sans',preview:'The quick brown fox',note:'Geometric, modern'},
    {id:'mono',label:'JetBrains Mono',preview:'The quick brown fox',note:'Monospace · data-dense'},
  ];
  v.appendChild(el(`<div class="view">
    ${pageHead('Theme & Branding','Customise the visual identity of the delonix platform',`
      <button class="btn ghost" data-act="theme" data-arg="ember">Reset to default</button>
      <button class="btn primary" data-act="demoact" data-arg="Theme preferences saved for the organization">Save preferences</button>
    `)}

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div>
        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-title" style="margin-bottom:14px">Theme preset <span class="mut" style="font-weight:400;font-size:11px">· ${themes.length} themes · click to apply</span></div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px">
            ${themes.map(t=>`
              <div class="theme-preset${t.active?' active':''}" data-act="theme" data-arg="${t.id}" style="cursor:pointer;border:1px solid ${t.active?'var(--ember)':'var(--border)'};border-radius:var(--r-sm);padding:12px;transition:border-color .15s,background .15s;${t.active?'background:color-mix(in srgb,var(--ember) 8%,transparent)':''}">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                  <div style="width:18px;height:18px;border-radius:50%;background:${t.bg};border:2px solid ${t.acc};flex:none"></div>
                  <span style="font-weight:650;font-size:12px">${t.label}</span>
                  ${t.active?'<span class="pill good" style="font-size:10px;margin-left:auto">Active</span>':''}
                </div>
                <div class="mut" style="font-size:11px">${t.desc}</div>
              </div>`).join('')}
          </div>
        </div>

        <div class="card panel">
          <div class="panel-title" style="margin-bottom:14px">Typography</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${fonts.map(f=>`
              <div style="display:flex;align-items:center;gap:10px;padding:8px;border-radius:var(--r-sm);border:1px solid var(--border);cursor:pointer" data-act="toast" data-arg="${f.label} ships with the production font pack — the demo uses Plus Jakarta Sans">
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
            <div style="flex:1;border:1px dashed var(--border);border-radius:var(--r-sm);padding:20px;text-align:center;cursor:pointer" data-act="toast" data-arg="File uploads are disabled in this demo build">
              <div style="font-size:24px;margin-bottom:4px">⬆</div>
              <div style="font-size:12px;font-weight:600">Upload logo</div>
              <div class="mut" style="font-size:11px">SVG, PNG · max 512KB</div>
            </div>
            <div style="flex:1;border:1px dashed var(--border);border-radius:var(--r-sm);padding:20px;text-align:center;cursor:pointer" data-act="toast" data-arg="File uploads are disabled in this demo build">
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
          <textarea class="input" style="width:100%;height:90px;font-family:monospace;font-size:11px;resize:vertical" placeholder=":root { --ember: #2563eb; }&#10;.sidebar { width: 220px; }"></textarea>
          <div class="mut" style="font-size:11px;margin-top:6px">CSS applies to the main app and customer portal. Changes are validated before deployment.</div>
        </div>
      </div>
    </div>
  </div>`));
};

/* ============================================================
   Drawers (detail panels)
   ============================================================ */
