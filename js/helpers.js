/* delonix — app boot, routing, nav builder, component helpers */

/* ============================================================

   App boot
   ============================================================ */
function enterApp(e){ if(e) e.preventDefault();
  document.getElementById('splash').classList.add('hide');
  const app=document.getElementById('app'); app.classList.add('show');
  buildNav(); route('dashboard');
}
function signOut(){ document.getElementById('app').classList.remove('show'); document.getElementById('splash').classList.remove('hide'); }

function buildNav(){
  const nav=document.getElementById('nav'); nav.innerHTML='';
  NAV.forEach(g=>{
    const grp=el(`<div class="nav-group"><h6>${g.group}</h6></div>`);
    g.items.forEach(it=>{
      const badge = it.badge?`<span class="badge ${it.muted?'muted':''}">${it.badge}</span>`:'';
      const a=el(`<a class="nav-item" data-id="${it.id}">${svg(I[it.icon])}<span>${it.label}</span>${badge}</a>`);
      a.onclick=()=>route(it.id);
      grp.appendChild(a);
    });
    nav.appendChild(grp);
  });
}

let current='dashboard';
function route(id){
  current=id;
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active', n.dataset.id===id));
  const label = NAV.flatMap(g=>g.items).find(i=>i.id===id)?.label || 'Dashboard';
  document.getElementById('crumb').textContent=label;
  const v=document.getElementById('view');
  v.innerHTML='';
  (VIEWS[id]||VIEWS.dashboard)(v);
  if(typeof appendFeatureCoverage === 'function') appendFeatureCoverage(v, id);
  v.scrollTop=0; window.scrollTo(0,0);
  closeCmd();
  document.getElementById('app')?.classList.remove('nav-open'); // dismiss mobile menu on navigate
}


/* ---- Business Units ---- */
const BUS = [
  {id:'BU-001',name:'Residential',brand:'delonix Residential',entity:'Delonix Holdings LLC',entityId:'LE-001',currency:'USD',taxProfile:'US-Residential',glDest:'NetSuite-US',template:'residential-v3',status:'active',mrr:218000,subs:624,color:'#ff5a1f'},
  {id:'BU-002',name:'Commercial',brand:'delonix Commercial',entity:'Delonix Holdings LLC',entityId:'LE-001',currency:'USD',taxProfile:'US-Commercial',glDest:'NetSuite-US',template:'commercial-v2',status:'active',mrr:156350,subs:218,color:'#4a9eff'},
  {id:'BU-003',name:'Enterprise Platform',brand:'delonix Enterprise',entity:'Delonix Platform Inc.',entityId:'LE-002',currency:'USD',taxProfile:'US-SaaS',glDest:'NetSuite-Platform',template:'enterprise-v4',status:'active',mrr:44000,subs:47,color:'#a855f7'},
  {id:'BU-004',name:'International',brand:'delonix International',entity:'Delonix EU B.V.',entityId:'LE-003',currency:'EUR',taxProfile:'EU-VAT',glDest:'Xero-EU',template:'international-v2',status:'active',mrr:0,subs:0,color:'#3fb950'},
  {id:'BU-005',name:'PropTech (Acquired)',brand:'BuildStream (legacy)',entity:'BuildStream Technologies Ltd.',entityId:'LE-004',currency:'USD',taxProfile:'US-PropTech-Legacy',glDest:'QuickBooks (legacy)',template:'buildstream-v1',status:'migration',mrr:0,subs:312,color:'#e3b341'},
];

/* ---- Legal Entities ---- */
const LEGAL_ENTITIES = [
  {id:'LE-001',name:'Delonix Holdings LLC',short:'Holdings',country:'US',flag:'🇺🇸',taxId:'98-4821034',currency:'USD',vatId:'—',bUs:['BU-001','BU-002'],glSystem:'NetSuite',arAcct:'1200 · Accounts Receivable',deferredAcct:'2800 · Deferred Revenue',status:'active'},
  {id:'LE-002',name:'Delonix Platform Inc.',short:'Platform',country:'US',flag:'🇺🇸',taxId:'82-9341028',currency:'USD',vatId:'—',bUs:['BU-003'],glSystem:'NetSuite',arAcct:'1200 · Accounts Receivable',deferredAcct:'2800 · Deferred Revenue',status:'active'},
  {id:'LE-003',name:'Delonix EU B.V.',short:'EU',country:'NL',flag:'🇳🇱',taxId:'NL004821034B01',currency:'EUR',vatId:'EU004821034',bUs:['BU-004'],glSystem:'Xero',arAcct:'1100 · Debiteuren',deferredAcct:'2700 · Uitgestelde omzet',status:'active'},
  {id:'LE-004',name:'BuildStream Technologies Ltd.',short:'BuildStream',country:'US',flag:'🇺🇸',taxId:'71-3340912',currency:'USD',vatId:'—',bUs:['BU-005'],glSystem:'QuickBooks (legacy)',arAcct:'legacy-AR',deferredAcct:'legacy-DEFERRED',status:'migration'},
];

/* ---- Invoice Grouping Policies ---- */
const GROUPING_POLICIES = [
  {id:'IGP-001',name:'Consolidated (system default)',level:'system',type:'consolidated',clientVisible:true,instantApply:true,requiresApproval:false,desc:'All charges on one invoice regardless of Business Unit'},
  {id:'IGP-002',name:'Split by Business Unit',level:'bu',type:'split-bu',clientVisible:true,instantApply:false,requiresApproval:true,desc:'One invoice per Business Unit; same legal entity only'},
  {id:'IGP-003',name:'Split by Ownership Group',level:'account',type:'split-ownership',clientVisible:true,instantApply:false,requiresApproval:false,desc:'One invoice per Ownership Group or portfolio segment'},
  {id:'IGP-004',name:'Sectioned by BU (blended)',level:'bu',type:'sectioned',clientVisible:true,instantApply:true,requiresApproval:false,desc:'Single invoice with sub-sections per Business Unit'},
  {id:'IGP-005',name:'Custom grouping',level:'custom',type:'custom',clientVisible:false,instantApply:false,requiresApproval:true,desc:'Finance-configured; not available for client self-service'},
];

/* ---- Source Systems ---- */
const SOURCE_SYSTEMS = [
  {id:'SS-001',name:'BuildStream',type:'acquired',legacyCustomers:312,mapped:289,unresolved:23,invoiceTotal:1847200,newInvoiceTotal:1846850,delta:-350,status:'in-progress'},
  {id:'SS-002',name:'NetSuite (GL export)',type:'accounting',connection:'active',lastSync:'2 min ago',recordsExported:847,status:'healthy'},
  {id:'SS-003',name:'Xero (EU GL)',type:'accounting',connection:'active',lastSync:'4 min ago',recordsExported:142,status:'healthy'},
];

/* ---- command palette (functional global search) ---- */
function cmdItems(){ return NAV.flatMap(g=>g.items.map(it=>({...it, group:g.group}))); }
function buildCmd(q=''){
  const menu=document.getElementById('cmdMenu'); if(!menu) return;
  const ql=q.trim().toLowerCase();
  const list=cmdItems().filter(it=>!ql || it.label.toLowerCase().includes(ql) || it.group.toLowerCase().includes(ql) || it.id.includes(ql));
  menu.innerHTML = list.length
    ? list.map((it,i)=>`<div class="cmd-item${i===0?' sel':''}" data-act="route" data-arg="${it.id}">${svg(I[it.icon],16)}<span>${it.label}</span><span class="grp">${it.group}</span></div>`).join('')
    : `<div class="cmd-empty">No matches for "${q}"</div>`;
  menu.classList.add('open');
}
function closeCmd(){ const m=document.getElementById('cmdMenu'); if(m) m.classList.remove('open'); }

/* ---- small builders ---- */
function pill(status,label){return `<span class="pill ${status}">${label}</span>`;}
function pageHead(title,sub,actions=''){return `<div class="page-head"><div><h1>${title}</h1><p>${sub}</p></div><div class="actions">${actions}</div></div>`;}
function kpi(lab,val,sub,opts={}){
  const trend = opts.trend!=null?`<span class="trend ${opts.trend>=0?'up':'down'}">${opts.trend>=0?'↑':'↓'} ${Math.abs(opts.trend)}%</span>`:'';
  const featured = opts.featured ? 'kpi-featured' : '';
  return `<div class="card kpi ${opts.accent?'accent':''} ${featured}">
    <div class="lab">${lab}</div>
    <div class="val tnum" data-val="${val}">${val}</div>
    <div class="sub">${trend}${trend&&sub?' · ':''}${sub}</div>
    ${opts.spark?`<canvas class="spark${opts.featured?' spark-wide':''}" width="320" height="${opts.featured?64:54}" data-spark="${opts.spark}"></canvas>`:''}
  </div>`;
}

/* ============================================================
   VIEWS
   ============================================================ */
