/* delonix — theme & accent system */

/* ===== THEME MANAGER v2 ===== */
const THEMES=[
  {id:'ember',   name:'Ember',    dot:'#ff5a1f', desc:'Warm dark'},
  {id:'midnight',name:'Midnight', dot:'#4a9eff', desc:'Ocean blue'},
  {id:'forge',   name:'Forge',    dot:'#ffaa00', desc:'Molten amber'},
  {id:'obsidian',name:'Obsidian', dot:'#a855f7', desc:'Violet shadow'},
  {id:'dawn',    name:'Dawn',     dot:'#e0440f', desc:'Light mode'},
];
const ACCENT_PRESETS=[
  {hex:'#ff5a1f',label:'Ember'},
  {hex:'#4a9eff',label:'Midnight'},
  {hex:'#ffaa00',label:'Forge'},
  {hex:'#a855f7',label:'Obsidian'},
  {hex:'#00c896',label:'Teal'},
  {hex:'#f43f5e',label:'Rose'},
  {hex:'#84cc16',label:'Lime'},
];

function setTheme(id){
  const t=THEMES.find(x=>x.id===id)||THEMES[0];
  document.documentElement.dataset.theme=t.id;
  localStorage.setItem('dlx-theme',t.id);
  // Sync all pickers
  document.querySelectorAll('.theme-chip,.tp-chip').forEach(c=>{
    c.classList.toggle('active',c.dataset.arg===t.id);
  });
  const dot=document.getElementById('themeBtnDot');
  const lbl=document.getElementById('themeBtnLabel');
  if(dot)dot.style.background=t.dot;
  if(lbl)lbl.textContent=t.name;
  // Sync check marks
  document.querySelectorAll('.tp-check').forEach(c=>c.style.opacity='0');
  const active=document.querySelector(`.tp-chip[data-arg="${t.id}"] .tp-check`);
  if(active)active.style.opacity='1';
  closeThemePopover();
}

function setAccentColor(hex){
  const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
  const soft=`#${Math.min(255,r+50).toString(16).padStart(2,'0')}${Math.min(255,g+50).toString(16).padStart(2,'0')}${Math.min(255,b+50).toString(16).padStart(2,'0')}`;
  const deep=`#${Math.max(0,r-50).toString(16).padStart(2,'0')}${Math.max(0,g-50).toString(16).padStart(2,'0')}${Math.max(0,b-50).toString(16).padStart(2,'0')}`;
  const root=document.documentElement;
  root.style.setProperty('--ember',hex);
  root.style.setProperty('--ember-soft',soft);
  root.style.setProperty('--ember-deep',deep);
  root.style.setProperty('--ember-glow',`rgba(${r},${g},${b},.18)`);
  localStorage.setItem('dlx-accent',hex);
  // Sync swatches
  document.querySelectorAll('.accent-swatch').forEach(s=>s.classList.toggle('active',s.dataset.hex===hex));
  const dot=document.getElementById('themeBtnDot');
  if(dot)dot.style.background=hex;
}

function setDensity(val){
  document.documentElement.dataset.density=val==='default'?'':val;
  localStorage.setItem('dlx-density',val);
  document.querySelectorAll('.d-btn').forEach(b=>b.classList.toggle('active',b.dataset.arg===val));
  // Sync settings panel if open
  document.querySelectorAll('.settings-d-btn').forEach(b=>b.classList.toggle('active',b.dataset.arg===val));
}

function openThemePopover(){
  const pop=document.getElementById('themePopover');
  if(!pop)return;
  buildThemePopover(pop);
  pop.classList.add('open');
  setTimeout(()=>document.addEventListener('click',closeThemePopoverOutside,{once:true}),0);
}
function closeThemePopover(){
  const pop=document.getElementById('themePopover');
  if(pop)pop.classList.remove('open');
}
function closeThemePopoverOutside(e){
  const btn=document.getElementById('themeBtn');
  if(btn&&!btn.contains(e.target))closeThemePopover();
  else if(document.getElementById('themePopover')?.classList.contains('open'))
    document.addEventListener('click',closeThemePopoverOutside,{once:true});
}

let _tpBuilt=false;
function buildThemePopover(pop){
  if(_tpBuilt)return;_tpBuilt=true;
  const cur=document.documentElement.dataset.theme||'ember';
  const list=document.getElementById('tpList');
  if(list){
    THEMES.forEach(t=>{
      const btn=document.createElement('button');
      btn.className='tp-chip'+(t.id===cur?' active':'');
      btn.dataset.act='theme';btn.dataset.arg=t.id;
      btn.innerHTML=`<span class="tp-dot" style="background:${t.dot}"></span>${t.name}<span style="font-size:11px;opacity:.55;margin-left:4px">${t.desc}</span><span class="tp-check">✓</span>`;
      if(t.id===cur)btn.querySelector('.tp-check').style.opacity='1';
      list.appendChild(btn);
    });
  }
  const accentRow=document.getElementById('accentRow');
  if(accentRow){
    const curAccent=localStorage.getItem('dlx-accent')||'';
    ACCENT_PRESETS.forEach(a=>{
      const sw=document.createElement('span');
      sw.className='accent-swatch'+(curAccent===a.hex?' active':'');
      sw.title=a.label;sw.dataset.hex=a.hex;
      sw.style.background=a.hex;
      sw.addEventListener('click',e=>{e.stopPropagation();setAccentColor(a.hex);});
      accentRow.appendChild(sw);
    });
    // Custom color picker
    const custom=document.createElement('span');
    custom.className='accent-custom';custom.title='Custom color';
    custom.innerHTML='<input type="color" title="Custom accent" value="#ff5a1f">';
    custom.querySelector('input').addEventListener('input',e=>{e.stopPropagation();setAccentColor(e.target.value);});
    custom.addEventListener('click',e=>e.stopPropagation());
    accentRow.appendChild(custom);
  }
  // Sync density buttons
  const saved=localStorage.getItem('dlx-density')||'default';
  document.querySelectorAll('.d-btn').forEach(b=>b.classList.toggle('active',b.dataset.arg===saved));
}

function buildThemePicker(container){
  if(!container||container.dataset.built)return;
  container.dataset.built='1';
  const cur=document.documentElement.dataset.theme||'ember';
  THEMES.forEach(t=>{
    const chip=document.createElement('button');
    chip.className='theme-chip'+(t.id===cur?' active':'');
    chip.dataset.act='theme';chip.dataset.arg=t.id;
    chip.innerHTML=`<span class="tdot" style="background:${t.dot}"></span>${t.name}<span style="font-weight:400;opacity:.55;margin-left:2px;font-size:11px">${t.desc}</span>`;
    container.appendChild(chip);
  });
}

// Wire the topbar theme button click
document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.getElementById('themeBtn');
  if(btn){
    btn.addEventListener('click',e=>{
      const pop=document.getElementById('themePopover');
      if(pop?.classList.contains('open')){closeThemePopover();}
      else{openThemePopover();}
      e.stopPropagation();
    });
    btn.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')openThemePopover();});
  }
  // Restore accent
  const savedAccent=localStorage.getItem('dlx-accent');
  if(savedAccent)setAccentColor(savedAccent);
  // Restore density
  const savedDensity=localStorage.getItem('dlx-density')||'default';
  if(savedDensity&&savedDensity!=='default'){setDensity(savedDensity);}
  // Update topbar button label
  const cur=document.documentElement.dataset.theme||'ember';
  const t=THEMES.find(x=>x.id===cur)||THEMES[0];
  const dot=document.getElementById('themeBtnDot');
  const lbl=document.getElementById('themeBtnLabel');
  if(dot)dot.style.background=t.dot;
  if(lbl)lbl.textContent=t.name;
});
// Apply saved theme immediately
(()=>{document.documentElement.dataset.theme=localStorage.getItem('dlx-theme')||'ember';})();
