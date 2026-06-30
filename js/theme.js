/* delonix — theme & accent system */

/* ===== THEME MANAGER v2 ===== */
const THEMES=[
  {id:'ember',   name:'Ember',    dot:'#ff5a1f', bg:'#0b0d12', desc:'Warm dark'},
  {id:'midnight',name:'Midnight', dot:'#4a9eff', bg:'#07090f', desc:'Ocean blue'},
  {id:'slate',   name:'Slate',    dot:'#22d3ee', bg:'#0d1117', desc:'Cool cyan'},
  {id:'forge',   name:'Forge',    dot:'#ffaa00', bg:'#100a02', desc:'Molten amber'},
  {id:'forest',  name:'Forest',   dot:'#3ecf7f', bg:'#0a120c', desc:'Deep green'},
  {id:'obsidian',name:'Obsidian', dot:'#a855f7', bg:'#09090f', desc:'Violet shadow'},
  {id:'rose',    name:'Rose',     dot:'#fb5c7d', bg:'#140a0f', desc:'Plum & rose'},
  {id:'nord',    name:'Nord',     dot:'#88c0d0', bg:'#2e3440', desc:'Arctic frost'},
  {id:'dawn',    name:'Dawn',     dot:'#e0440f', bg:'#f8f6f3', desc:'Light · warm'},
  {id:'paper',   name:'Paper',    dot:'#4f46e5', bg:'#f5f6f8', desc:'Light · indigo'},
];

function setTheme(id){
  const t=THEMES.find(x=>x.id===id)||THEMES[0];
  const root=document.documentElement;
  root.dataset.theme=t.id;
  localStorage.setItem('dlx-theme',t.id);
  // Picking a theme preset clears any custom accent override so the theme shows as designed
  ['--ember','--ember-soft','--ember-deep','--ember-glow'].forEach(p=>root.style.removeProperty(p));
  localStorage.removeItem('dlx-accent');
  document.querySelectorAll('.accent-swatch').forEach(s=>s.classList.remove('active'));
  // Sync all pickers (topbar popover + theme-manager page)
  document.querySelectorAll('.theme-chip,.tp-chip,[data-act="theme"]').forEach(c=>{
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
  repaintCharts();
}

/* Canvas charts read CSS vars once at draw time, so re-render the current view's
   charts after a theme/accent change to recolor them. */
function repaintCharts(){
  requestAnimationFrame(()=>{
    try{ if(typeof current!=='undefined' && typeof route==='function'){ route(current); } }
    catch(e){}
  });
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
  // Color comes from the theme preset — no separate accent picker.
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
  // Clear any legacy custom-accent override — color now comes solely from the theme
  ['--ember','--ember-soft','--ember-deep','--ember-glow'].forEach(p=>document.documentElement.style.removeProperty(p));
  localStorage.removeItem('dlx-accent');
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
