/* delonix — ui.js */

function openDrawer(titleOrHtml, body){
  const d=document.getElementById('drawer');
  if(body !== undefined){
    d.innerHTML = `<div class="drawer-head"><div style="font-size:18px;font-weight:650">${titleOrHtml}</div><button class="x" data-act="close" aria-label="Close drawer">✕</button></div><div class="drawer-body">${body}</div>`;
  } else {
    d.innerHTML = titleOrHtml;
  }
  d.classList.add('open'); document.getElementById('drawerBg').classList.add('open');
  // drawers with a persisted-config save button restore their saved values on open
  const sb = d.querySelector('[data-act="saveconfig"]');
  if(sb && typeof restoreDrawerConfig === 'function') restoreDrawerConfig((sb.dataset.arg||'').split('|')[0]);
}

function closeDrawer(){ document.getElementById('drawer').classList.remove('open'); document.getElementById('drawerBg').classList.remove('open'); }

function dpi(c){const r=window.devicePixelRatio||1;const w=c.clientWidth,h=c.height;c.width=w*r;c.height=h*r;const x=c.getContext('2d');x.scale(r,r);return{x,w,h};}

/* Theme colors read live from CSS vars, so canvas charts follow the active theme/accent. */
function themeColors(){
  const cs=getComputedStyle(document.documentElement);
  const v=n=>cs.getPropertyValue(n).trim();
  const rgba=(hex,a)=>{const h=(hex||'#ff6b3d').replace('#','');return `rgba(${parseInt(h.slice(0,2),16)},${parseInt(h.slice(2,4),16)},${parseInt(h.slice(4,6),16)},${a})`;};
  const ember=v('--ember')||'#ff6b3d';
  return {ember, emberSoft:v('--ember-soft')||ember, emberDeep:v('--ember-deep')||ember,
    pos:v('--pos')||'#34d399', neg:v('--neg')||'#f0626f', warn:v('--warn')||'#e0a93a',
    grid:v('--border')||'#2a313d', axis:v('--text-3')||'#5e6878', bg:v('--bg')||'#0b0d12', rgba};
}

function drawRevChart(){
  const c=document.getElementById('revChart'); if(!c)return;
  const {x,w,h}=dpi(c); const pad={l:44,r:12,t:16,b:26};
  const data=revenueSeries, prior=data.map((d,i)=>Math.round(d*(0.82-i*0.004))); // prior-year shadow
  const max=Math.max(...data)*1.12, min=170;
  const X=i=>pad.l+(w-pad.l-pad.r)*i/(data.length-1);
  const Y=val=>pad.t+(h-pad.t-pad.b)*(1-(val-min)/(max-min));
  const T=themeColors();
  // grid + axis
  x.font="500 10px 'Plus Jakarta Sans',ui-sans-serif";
  for(let g=0;g<=4;g++){
    const val=min+(max-min)*g/4; const y=Y(val);
    x.strokeStyle=T.rgba(T.grid,g===0?.9:.45);
    x.lineWidth=g===0?1:.7; x.beginPath();x.moveTo(pad.l,y);x.lineTo(w-pad.r,y);x.stroke();
    x.fillStyle=T.axis; x.fillText('$'+Math.round(val)+'k',4,y+3.5);
  }
  x.fillStyle=T.axis;
  months.forEach((m,i)=>{if(i%2===0)x.fillText(m,X(i)-8,h-7);});
  // prior-year dashed comparison
  x.save(); x.setLineDash([4,4]); x.beginPath();
  prior.forEach((d,i)=>{i?x.lineTo(X(i),Y(d)):x.moveTo(X(i),Y(d));});
  x.strokeStyle=T.rgba(T.axis,.5); x.lineWidth=1.4; x.stroke(); x.restore();
  // area
  const grad=x.createLinearGradient(0,pad.t,0,h-pad.b); grad.addColorStop(0,T.rgba(T.ember,.34)); grad.addColorStop(1,T.rgba(T.ember,0));
  x.beginPath(); x.moveTo(X(0),Y(data[0]));
  data.forEach((d,i)=>{if(i)x.lineTo(X(i),Y(d));});
  x.lineTo(X(data.length-1),h-pad.b); x.lineTo(X(0),h-pad.b); x.closePath(); x.fillStyle=grad; x.fill();
  // line with glow
  x.save(); x.shadowColor=T.rgba(T.ember,.55); x.shadowBlur=10;
  x.beginPath(); data.forEach((d,i)=>{i?x.lineTo(X(i),Y(d)):x.moveTo(X(i),Y(d));});
  x.strokeStyle=T.ember; x.lineWidth=2.6; x.lineJoin='round'; x.stroke(); x.restore();
  // endpoint
  const lx=X(data.length-1),ly=Y(data.at(-1));
  x.fillStyle=T.rgba(T.ember,.25); x.beginPath(); x.arc(lx,ly,8,0,7); x.fill();
  x.fillStyle=T.ember; x.beginPath(); x.arc(lx,ly,4.5,0,7); x.fill();
  x.fillStyle=T.bg; x.beginPath(); x.arc(lx,ly,2,0,7); x.fill();
}

function drawUsageChart(){
  const c=document.getElementById('usageChart'); if(!c)return;
  const {x,w,h}=dpi(c); const pad={l:34,r:8,t:12,b:22};
  const data=[28,31,33,30,36,39,38,41,44,46,45,48]; const max=Math.max(...data)*1.15;
  const bw=(w-pad.l-pad.r)/data.length*0.6;
  const T=themeColors();
  x.fillStyle=T.axis; x.font="10px 'Plus Jakarta Sans',ui-sans-serif";
  for(let g=0;g<=3;g++){const y=pad.t+(h-pad.t-pad.b)*g/3;x.strokeStyle=T.rgba(T.grid,.5);x.beginPath();x.moveTo(pad.l,y);x.lineTo(w-pad.r,y);x.stroke();}
  data.forEach((d,i)=>{
    const cx=pad.l+(w-pad.l-pad.r)*(i+0.5)/data.length;
    const bh=(h-pad.t-pad.b)*(d/max); const y=h-pad.b-bh;
    const g=x.createLinearGradient(0,y,0,h-pad.b); g.addColorStop(0,T.emberSoft); g.addColorStop(1,T.emberDeep);
    x.fillStyle=i===data.length-1?T.ember:g; x.beginPath();
    if(x.roundRect)x.roundRect(cx-bw/2,y,bw,bh,4); else x.rect(cx-bw/2,y,bw,bh); x.fill();
    if(i%2===0){x.fillStyle=T.axis;x.fillText(months[i],cx-8,h-6);}
  });
}

function drawMrrChart(){
  const c=document.getElementById('mrrChart'); if(!c)return;
  const {x,w,h}=dpi(c); const pad={l:38,r:8,t:12,b:22};
  const groups=[[42,18,-6,-9],[38,22,-5,-11],[45,26,-7,-8],[40,30,-4,-12],[48,28,-6,-10],[52,34,-5,-9]];
  const labs=['Jan','Feb','Mar','Apr','May','Jun'];
  const T=themeColors();
  const cols=[T.pos,T.ember,T.warn,T.neg];
  const max=80, zero=pad.t+(h-pad.t-pad.b)*0.62;
  const scale=v=>(h-pad.t-pad.b)*0.62*(v/max);
  x.strokeStyle=T.rgba(T.grid,.7);x.beginPath();x.moveTo(pad.l,zero);x.lineTo(w-pad.r,zero);x.stroke();
  const gw=(w-pad.l-pad.r)/groups.length;
  groups.forEach((g,i)=>{
    const cx=pad.l+gw*(i+0.5);
    let yUp=zero;
    [g[0],g[1]].forEach((v,k)=>{const bh=scale(v);yUp-=bh;x.fillStyle=cols[k];if(x.roundRect&&k===1){x.beginPath();x.roundRect(cx-14,yUp,28,bh,[4,4,0,0]);x.fill();}else{x.fillRect(cx-14,yUp,28,bh);} });
    let yDn=zero;
    [g[2],g[3]].forEach((v,k)=>{const bh=scale(-v);x.fillStyle=cols[k+2];x.fillRect(cx-14,yDn,28,bh);yDn+=bh;});
    x.fillStyle=T.axis;x.font="10px 'Plus Jakarta Sans',ui-sans-serif";x.fillText(labs[i],cx-9,h-6);
  });
}

function drawWaterfall(){
  const wrap=document.getElementById('waterfall'); if(!wrap)return;
  const data=[398,372,341,318,296,271,255,232,210,188,166,142];
  const max=Math.max(...data);
  wrap.innerHTML=data.map((d,i)=>{
    const hpct=(d/max)*100;
    return `<div class="mb"><div class="stack" style="height:${hpct}%"><i style="height:100%;background:linear-gradient(180deg,var(--ember-soft),var(--ember-deep))"></i></div><small>${months[i]}</small></div>`;
  }).join('');
}

function drawSparks(){
  const seeds={
    mrr:[6,7,7,8,8,9,10,11,12],
    arr:[5,5,6,7,7,8,9,10,11],
    rev:[5,6,7,8,7,9,10,11,12],
    nrr:[9,10,10,11,11,12,12,12,12],
    subs:[6,7,7,8,9,9,10,11,12],
    churn:[12,11,11,10,10,9,9,8,7]
  };
  document.querySelectorAll('canvas[data-spark]').forEach(c=>{
    const data=seeds[c.dataset.spark]||[5,6,7,6,8,9];
    const isDown=c.dataset.spark==='churn';
    const {x,w,h}=dpi(c); const max=Math.max(...data),min=Math.min(...data);
    // full-bleed footer: line lives in the lower band, fill grounds the card bottom
    const top=Math.round(h*0.34), X=i=>w*i/(data.length-1), Y=v=>top+(h-top-3)*(1-(v-min)/(max-min||1));
    // accent follows the live theme; semantic rose for a declining metric
    const css=getComputedStyle(document.documentElement);
    const ember=(css.getPropertyValue('--ember')||'#ff6b3d').trim();
    const neg=(css.getPropertyValue('--neg')||'#f0626f').trim();
    const stroke=isDown?neg:ember;
    const hex=stroke.replace('#',''); const r=parseInt(hex.slice(0,2),16),g=parseInt(hex.slice(2,4),16),b=parseInt(hex.slice(4,6),16);
    // area fill — subtle, stronger toward the baseline so the card feels grounded
    const grad=x.createLinearGradient(0,top,0,h);
    grad.addColorStop(0,`rgba(${r},${g},${b},.04)`);
    grad.addColorStop(1,`rgba(${r},${g},${b},.20)`);
    x.beginPath();x.moveTo(X(0),Y(data[0]));
    data.forEach((d,i)=>{if(i)x.lineTo(X(i),Y(d));});
    x.lineTo(X(data.length-1),h);x.lineTo(X(0),h);x.closePath();x.fillStyle=grad;x.fill();
    // line
    x.beginPath();data.forEach((d,i)=>{i?x.lineTo(X(i),Y(d)):x.moveTo(X(i),Y(d));});
    x.strokeStyle=stroke;x.globalAlpha=.85;x.lineWidth=1.75;x.lineJoin='round';x.lineCap='round';x.stroke();x.globalAlpha=1;
    // emphasized endpoint
    x.fillStyle=stroke;
    x.beginPath();x.arc(X(data.length-1),Y(data.at(-1)),2.6,0,7);x.fill();
  });
}

/* ---- toast ---- */
let toastT;

function toast(msg){
  const t=document.getElementById('toast'); document.getElementById('toastMsg').textContent=msg;
  t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('show'),2400);
}
