/* delonix — local demo database
   All data users can "play with" lives here, persisted per-browser in
   localStorage. Nothing leaves the machine; Reset demo data (Settings)
   or clearing site data restores the seeds. */

const DLX_DB_KEY = 'dlx-db-v1';
const DEMO_TODAY = 'Jun 28';

function dbSeed(){
  return {
    v: 1,
    /* Invoices view ledger */
    invoices: [
      {id:'INV-2026-0847',acct:'Stellar Systems',   bu:'BU-002',buName:'Commercial',    amt:9200, issued:'Jun 01',due:'Jul 01',period:'Jun 2026',sl:'Paid',     status:'good', finalized:true,  validated:true},
      {id:'INV-2026-0846',acct:'Pinnacle SaaS',     bu:'BU-002',buName:'Commercial',    amt:8500, issued:'Jun 01',due:'Jul 01',period:'Jun 2026',sl:'Sent',     status:'muted',finalized:true,  validated:true},
      {id:'INV-2026-0845',acct:'CloudBase Inc',     bu:'BU-003',buName:'Ent. Platform', amt:7200, issued:'Jun 01',due:'Jul 01',period:'Jun 2026',sl:'Paid',     status:'good', finalized:true,  validated:true},
      {id:'INV-2026-0844',acct:'Summit Digital',    bu:'BU-001',buName:'Residential',   amt:6400, issued:'Jun 01',due:'Jul 01',period:'Jun 2026',sl:'Sent',     status:'muted',finalized:true,  validated:true},
      {id:'INV-2026-0843',acct:'Apex Systems',      bu:'BU-001',buName:'Residential',   amt:5800, issued:'Jun 01',due:'Jun 30',period:'Jun 2026',sl:'Overdue',  status:'neg',  finalized:true,  validated:true},
      {id:'INV-2026-0842',acct:'Zenith Cloud',      bu:'BU-001',buName:'Residential',   amt:4750, issued:'Jun 01',due:'Jul 01',period:'Jun 2026',sl:'Paid',     status:'good', finalized:true,  validated:true},
      {id:'INV-2026-0841',acct:'Acme Corp',         bu:'BU-001',buName:'Residential',   amt:4200, issued:'Jun 01',due:'Jul 01',period:'Jun 2026',sl:'Paid',     status:'good', finalized:true,  validated:true},
      {id:'INV-2026-0840',acct:'Fulcrum Labs',      bu:'BU-003',buName:'Ent. Platform', amt:3400, issued:'Jun 01',due:'Jun 30',period:'Jun 2026',sl:'Overdue',  status:'neg',  finalized:true,  validated:true},
      {id:'INV-2026-0839',acct:'DataVault',         bu:'BU-002',buName:'Commercial',    amt:3100, issued:'Jun 01',due:'Jul 01',period:'Jun 2026',sl:'Sent',     status:'muted',finalized:true,  validated:true},
      {id:'INV-2026-0838',acct:'Cascade Analytics', bu:'BU-001',buName:'Residential',   amt:2950, issued:'Jun 01',due:'Jul 01',period:'Jun 2026',sl:'Paid',     status:'good', finalized:true,  validated:true},
      {id:'INV-2026-0837',acct:'Streamline Co',     bu:'BU-001',buName:'Residential',   amt:2400, issued:'Jun 28',due:'—',     period:'Jun 2026',sl:'Draft',    status:'muted',finalized:false, validated:false},
      {id:'INV-2026-0836',acct:'Bridgepoint',       bu:'BU-002',buName:'Commercial',    amt:2150, issued:'May 28',due:'Jun 27',period:'May 2026',sl:'Overdue',  status:'neg',  finalized:true,  validated:true},
      {id:'INV-2026-0835',acct:'Ironside Tech',     bu:'BU-001',buName:'Residential',   amt:1650, issued:'Jun 01',due:'Jul 01',period:'Jun 2026',sl:'Paid',     status:'good', finalized:true,  validated:true},
      {id:'INV-2026-0834',acct:'TechFlow Inc',      bu:'BU-003',buName:'Ent. Platform', amt:1800, issued:'Jun 01',due:'Jul 01',period:'Jun 2026',sl:'Sent',     status:'muted',finalized:true,  validated:true},
      {id:'INV-2026-0833',acct:'Meridian Tech',     bu:'BU-002',buName:'Commercial',    amt:1450, issued:'May 15',due:'Jun 14',period:'May 2026',sl:'Void',     status:'muted',finalized:true,  validated:true},
      {id:'INV-2026-DRAFT-2',acct:'NovaSpark',      bu:'BU-001',buName:'Residential',   amt:3820, issued:'Jun 28',due:'—',     period:'Jun 2026',sl:'Draft',    status:'warn', finalized:false, validated:false,validationErrors:['Missing tax address','Missing invoice contact']},
      {id:'INV-2026-DRAFT-3',acct:'Orbit Labs',     bu:'BU-001',buName:'Residential',   amt:620,  issued:'Jun 28',due:'—',     period:'Jun 2026',sl:'Draft',    status:'muted',finalized:false, validated:true},
    ],
    /* Payments view ledger */
    payments: [
      {id:'PAY-94201', acct:'Stellar Systems',   amt:9200,  net:8993,  gw:'Stripe', method:'ACH ••7741',        date:'Jun 27',  status:'good',  sl:'Succeeded'},
      {id:'PAY-94200', acct:'Pinnacle SaaS',      amt:8500,  net:8308,  gw:'Adyen',  method:'Wire',              date:'Jun 27',  status:'muted', sl:'Pending'},
      {id:'PAY-94199', acct:'CloudBase Inc',      amt:7200,  net:7038,  gw:'Stripe', method:'ACH ••3302',        date:'Jun 26',  status:'good',  sl:'Succeeded'},
      {id:'PAY-94198', acct:'Summit Digital',     amt:6400,  net:6254,  gw:'Stripe', method:'Visa ••4121',       date:'Jun 26',  status:'good',  sl:'Succeeded'},
      {id:'PAY-94197', acct:'Apex Systems',       amt:5800,  net:5669,  gw:'Adyen',  method:'Mastercard ••8804', date:'Jun 25',  status:'neg',   sl:'Failed'},
      {id:'PAY-94196', acct:'Zenith Cloud',       amt:4750,  net:4641,  gw:'Stripe', method:'ACH ••2290',        date:'Jun 25',  status:'good',  sl:'Succeeded'},
      {id:'PAY-94195', acct:'Acme Corp',          amt:4200,  net:4103,  gw:'Stripe', method:'ACH ••1187',        date:'Jun 24',  status:'good',  sl:'Succeeded'},
      {id:'PAY-94194', acct:'Fulcrum Labs',       amt:3400,  net:3322,  gw:'Adyen',  method:'Visa ••5599',       date:'Jun 24',  status:'neg',   sl:'Failed'},
      {id:'PAY-94193', acct:'DataVault',          amt:3100,  net:3029,  gw:'Stripe', method:'ACH ••6612',        date:'Jun 23',  status:'good',  sl:'Succeeded'},
      {id:'PAY-94192', acct:'Cascade Analytics',  amt:2950,  net:2882,  gw:'Stripe', method:'Amex ••3391',       date:'Jun 23',  status:'good',  sl:'Succeeded'},
      {id:'PAY-94191', acct:'Ironside Tech',      amt:1650,  net:1612,  gw:'Stripe', method:'Visa ••0042',       date:'Jun 22',  status:'good',  sl:'Succeeded'},
      {id:'PAY-94190', acct:'TechFlow Inc',       amt:1800,  net:1759,  gw:'Adyen',  method:'Mastercard ••7712', date:'Jun 22',  status:'muted', sl:'Pending'},
      {id:'PAY-94189', acct:'Bridgepoint',        amt:2150,  net:2101,  gw:'Stripe', method:'ACH ••4430',        date:'Jun 21',  status:'good',  sl:'Succeeded'},
      {id:'PAY-94188', acct:'NovaSpark',          amt:780,   net:762,   gw:'Stripe', method:'Visa ••1123',       date:'Jun 20',  status:'good',  sl:'Succeeded'},
      {id:'PAY-94187', acct:'Prism Networks',     amt:1100,  net:1075,  gw:'Other',  method:'Bank transfer',     date:'Jun 20',  status:'good',  sl:'Succeeded'},
    ],
    /* Credits & refunds ledger */
    credits: [
      {id:'CN-2026-112',acct:'Apex Systems',     amt:4200, reason:'Service outage · Jun 14–15',       applied:'INV-2026-0843',date:'Jun 22',status:'good', sl:'Applied',  type:'service-credit',    finalized:true},
      {id:'CN-2026-111',acct:'Fulcrum Labs',     amt:2800, reason:'Billing error · duplicate charge',  applied:'INV-2026-0840',date:'Jun 21',status:'good', sl:'Applied',  type:'rebill-correction', finalized:true},
      {id:'CN-2026-110',acct:'CloudBase Inc',    amt:3600, reason:'Proration adjustment · downgrade',   applied:'INV-2026-0845',date:'Jun 20',status:'good', sl:'Applied',  type:'proration',         finalized:true},
      {id:'CN-2026-109',acct:'Bridgepoint',      amt:1200, reason:'Goodwill credit',                   applied:'INV-2026-0836',date:'Jun 18',status:'good', sl:'Applied',  type:'goodwill',          finalized:true},
      {id:'CN-2026-108',acct:'DataVault',        amt:3100, reason:'Service outage · Jun 10–11',        applied:'—',            date:'Jun 15',status:'muted',sl:'Outstanding',type:'service-credit',  finalized:false},
      {id:'CN-2026-107',acct:'TechFlow Inc',     amt:900,  reason:'Billing error · wrong tier billed', applied:'INV-2026-0834',date:'Jun 14',status:'good', sl:'Applied',  type:'rebill-correction', finalized:true},
      {id:'CN-2026-106',acct:'NovaSpark',        amt:620,  reason:'Tax reversal · address correction',  applied:'—',           date:'Jun 12',status:'warn', sl:'Pending Approval',type:'tax-reversal',finalized:false},
      {id:'CN-2026-105',acct:'Meridian Tech',    amt:1450, reason:'Full credit on void INV-2026-0833', applied:'INV-2026-0833',date:'May 15',status:'muted',sl:'Applied',  type:'full-credit',       finalized:true},
    ],
    /* Accounts view */
    customers: [
      {name:'Northwind Logistics', id:'AC-4821',bu:'BU-001',buName:'Residential',    plan:'Enterprise',  mrr:48200, status:'good', health:'green',  lastInv:'Jun 01', badge:'good', blab:'Active',  grouping:'Consolidated'},
      {name:'Helios Manufacturing',id:'AC-4795',bu:'BU-002',buName:'Commercial',     plan:'Enterprise',  mrr:34800, status:'good', health:'green',  lastInv:'Jun 01', badge:'good', blab:'Active',  grouping:'Split by BU'},
      {name:'Acme Corp',          id:'AC-4102', bu:'BU-001',buName:'Residential',    plan:'Enterprise',  mrr:4200,  status:'good', health:'green',  lastInv:'Jun 01', badge:'good', blab:'Active',  grouping:'Consolidated'},
      {name:'TechFlow Inc',       id:'AC-4103', bu:'BU-003',buName:'Enterprise Platform',plan:'Business',mrr:1800,  status:'good', health:'green',  lastInv:'Jun 01', badge:'good', blab:'Active',  grouping:'Consolidated'},
      {name:'Nexus Digital',      id:'AC-4104', bu:'BU-001',buName:'Residential',    plan:'Starter',     mrr:950,   status:'warn', health:'yellow', lastInv:'May 28', badge:'warn', blab:'At-risk', grouping:'Consolidated'},
      {name:'Pinnacle SaaS',      id:'AC-4105', bu:'BU-002',buName:'Commercial',     plan:'Enterprise+', mrr:8500,  status:'good', health:'green',  lastInv:'Jun 01', badge:'good', blab:'Active',  grouping:'Sectioned by BU'},
      {name:'Streamline Co',      id:'AC-4106', bu:'BU-001',buName:'Residential',    plan:'Business',    mrr:2400,  status:'good', health:'green',  lastInv:'Jun 03', badge:'good', blab:'Active',  grouping:'Consolidated'},
      {name:'CloudBase Inc',      id:'AC-4108', bu:'BU-003',buName:'Enterprise Platform',plan:'Enterprise',mrr:7200, status:'good', health:'green', lastInv:'Jun 01', badge:'good', blab:'Active',  grouping:'Consolidated'},
      {name:'Meridian Tech',      id:'AC-4109', bu:'BU-002',buName:'Commercial',     plan:'Business',    mrr:1450,  status:'warn', health:'yellow', lastInv:'Apr 30', badge:'crit', blab:'Overdue', grouping:'Consolidated'},
      {name:'Apex Systems',       id:'AC-4110', bu:'BU-001',buName:'Residential',    plan:'Enterprise',  mrr:5800,  status:'good', health:'green',  lastInv:'Jun 01', badge:'good', blab:'Active',  grouping:'Split by Ownership'},
      {name:'Cascade Analytics',  id:'AC-4111', bu:'BU-001',buName:'Residential',    plan:'Business',    mrr:2950,  status:'crit', health:'red',    lastInv:'Apr 01', badge:'crit', blab:'Churning',grouping:'Consolidated'},
      {name:'Stellar Systems',    id:'AC-4112', bu:'BU-002',buName:'Commercial',     plan:'Enterprise+', mrr:9200,  status:'good', health:'green',  lastInv:'Jun 01', badge:'good', blab:'Active',  grouping:'Split by BU'},
    ],
    /* Subscriptions view — recent changes feed */
    subChanges: [
      {cust:'Pinnacle SaaS',    type:'Upgrade',   oldPlan:'Enterprise',  newPlan:'Enterprise+', delta:+2300, date:'Jun 24'},
      {cust:'DataVault',        type:'Upgrade',   oldPlan:'Business',    newPlan:'Business+',   delta:+900,  date:'Jun 22'},
      {cust:'Streamline Co',    type:'New',       oldPlan:'—',      newPlan:'Business',    delta:+2400, date:'Jun 21'},
      {cust:'Cascade Analytics',type:'Downgrade', oldPlan:'Business+',   newPlan:'Business',    delta:-400,  date:'Jun 20'},
      {cust:'Orbit Labs',       type:'Churn',     oldPlan:'Starter',     newPlan:'—',      delta:-620,  date:'Jun 19'},
      {cust:'Meridian Tech',    type:'Upgrade',   oldPlan:'Starter',     newPlan:'Business',    delta:+830,  date:'Jun 17'},
      {cust:'Bridgepoint',      type:'New',       oldPlan:'—',      newPlan:'Business',    delta:+2150, date:'Jun 15'},
      {cust:'Ironside Tech',    type:'Downgrade', oldPlan:'Business+',   newPlan:'Business',    delta:-500,  date:'Jun 13'},
      {cust:'NovaSpark',        type:'New',       oldPlan:'—',      newPlan:'Starter',     delta:+780,  date:'Jun 10'},
      {cust:'Vertex IO',        type:'Churn',     oldPlan:'Starter',     newPlan:'—',      delta:-890,  date:'Jun 08'},
    ],
    contactLog: {},   // acct -> [{type,outcome,followup,note,when}]
    activity: [],     // [{who,what,when}] — shown in Settings audit log
    config: {},       // configKey -> saved control values / scalars
    counters: { inv: 849, cn: 113, pay: 94202, acct: 4113, qt: 96 },
  };
}

let DLX_DB_CACHE = null;
function db(){
  if(DLX_DB_CACHE) return DLX_DB_CACHE;
  try{
    const raw = localStorage.getItem(DLX_DB_KEY);
    if(raw){ const parsed = JSON.parse(raw); if(parsed && parsed.v === 1){ DLX_DB_CACHE = parsed; return DLX_DB_CACHE; } }
  }catch(e){}
  DLX_DB_CACHE = dbSeed();
  return DLX_DB_CACHE;
}
function dbSave(){ try{ localStorage.setItem(DLX_DB_KEY, JSON.stringify(db())); }catch(e){} }
function dbReset(){ try{ localStorage.removeItem(DLX_DB_KEY); }catch(e){} DLX_DB_CACHE = null; }
function dbNext(kind, prefix){ const n = db().counters[kind]++; return prefix + n; }
function dbActivity(what){
  db().activity.unshift({who:'Amir Bukhari', what, when:'just now'});
  db().activity = db().activity.slice(0, 8);
}
/* refresh the current view after a mutation */
function dbRefresh(msg){ dbSave(); route(current); if(msg) toast(msg); }

/* ---- drawer form helpers ---- */
function $dv(id, fallback=''){ const el = document.getElementById(id); return el ? (el.value || fallback) : fallback; }

/* Toggle that remembers its state. Use in place of a bare
   `<div class="toggle" data-act="toggle">` when the switch should persist. */
function tgl(key, defaultOn, extra=''){
  const saved = db().config['toggle:'+key];
  const on = saved === undefined ? defaultOn : !!saved;
  return `<div class="toggle${on?' on':''}" data-act="toggle" data-key="${key}" role="switch" aria-checked="${on}" tabindex="0" ${extra}><i></i></div>`;
}
function tglPersist(el){
  const on = el.classList.contains('on');
  el.setAttribute('aria-checked', on);
  if(el.dataset.key){ db().config['toggle:'+el.dataset.key] = on; dbSave(); }
}

/* ---- generic drawer configuration persistence ----
   Serializes every control in the open drawer under a config key, and
   restores them when the drawer next opens. Keyed by control order, which
   is stable because drawer markup is static. */
function drawerControls(){
  return [...document.querySelectorAll('#drawer .drawer-body input, #drawer .drawer-body select, #drawer .drawer-body textarea, #drawer .drawer-body .toggle')];
}
function saveDrawerConfig(arg){
  const [key, msg] = (arg||'').split('|');
  db().config[key] = drawerControls().map(c =>
    c.classList && c.classList.contains('toggle') ? c.classList.contains('on')
    : (c.type === 'radio' || c.type === 'checkbox') ? c.checked
    : c.value);
  dbActivity(`updated ${key.replace(/[:-]/g,' ')}`);
  dbSave(); closeDrawer(); toast(msg || 'Configuration saved');
}
function restoreDrawerConfig(key){
  const saved = db().config[key]; if(!saved) return;
  drawerControls().forEach((c,i)=>{
    if(i >= saved.length) return;
    const v = saved[i];
    if(c.classList && c.classList.contains('toggle')) c.classList.toggle('on', !!v);
    else if(c.type === 'radio' || c.type === 'checkbox') c.checked = !!v;
    else c.value = v;
  });
}
/* saved-config Save button */
function cfgSaveBtn(key, msg, label='Save configuration'){
  return `<button class="btn primary" data-act="saveconfig" data-arg="${key}|${msg}">${label}</button>`;
}

/* ============================================================
   Mutations — invoices
   ============================================================ */
function dbFindInvoice(id){ return db().invoices.find(i=>i.id===id); }

function dbCreateInvoice(mode){
  const acct = $dv('ni_customer') || 'Acme Corp';
  const rows = [...document.querySelectorAll('#lineItems .line-item-row')];
  let amt = 0;
  rows.forEach(r=>{ const inp=r.querySelectorAll('input'); if(inp.length>=3) amt += (+inp[1].value||0)*(+inp[2].value||0); });
  amt = Math.round(amt*1.13); // + HST 13%, matching the summary block
  const send = mode === 'send';
  const inv = {
    id: dbNext('inv','INV-2026-0'), acct, bu:'BU-001', buName:'Residential',
    amt, issued: DEMO_TODAY, due: send ? 'Jul 28' : '—', period:'Jun 2026',
    sl: send ? 'Sent' : 'Draft', status:'muted', finalized: send, validated: true,
  };
  db().invoices.unshift(inv);
  dbActivity(`${send?'sent':'drafted'} invoice ${inv.id} · ${fmt(amt)} · ${acct}`);
  closeDrawer();
  dbRefresh(send ? `Invoice ${inv.id} sent to ${acct} — ${fmt(amt)} due Jul 28` : `Draft ${inv.id} saved — ${fmt(amt)}`);
}

function dbValidateDraft(id){
  const targets = id==='all' ? db().invoices.filter(i=>i.sl==='Draft') : [dbFindInvoice(id)].filter(Boolean);
  let fixed = 0;
  targets.forEach(i=>{ if(!i.validated || i.validationErrors){ i.validated = true; delete i.validationErrors; if(i.status==='warn') i.status='muted'; fixed++; } });
  dbActivity(`validated ${fixed||targets.length} draft invoice(s)`);
  closeDrawer();
  dbRefresh(fixed ? `Validation passed — ${fixed} draft${fixed>1?'s':''} cleared for finalization` : 'Validation re-run — no outstanding issues');
}

function dbSubmitCreditRebill(invId){
  const inv = dbFindInvoice(invId);
  const cn = {
    id: dbNext('cn','CN-2026-'), acct: inv ? inv.acct : (invId||'').startsWith('CN-') ? (db().credits.find(c=>c.id===invId)||{}).acct||'Account' : 'Account',
    amt: inv ? inv.amt : 1000,
    reason: 'Credit/rebill correction', applied: inv ? inv.id : '—',
    date: DEMO_TODAY, status:'warn', sl:'Pending Approval', type:'rebill-correction', finalized:false,
  };
  db().credits.unshift(cn);
  dbActivity(`submitted credit/rebill ${cn.id} for ${cn.acct}`);
  closeDrawer();
  dbRefresh(`Credit/rebill ${cn.id} submitted for Finance approval — ${fmt(cn.amt)}`);
}

function dbFinalizePeriod(){
  const drafts = db().invoices.filter(i=>i.sl==='Draft');
  const ready = drafts.filter(i=>i.validated && !i.validationErrors);
  ready.forEach(i=>{ i.sl='Sent'; i.finalized=true; i.due='Jul 28'; i.issued=DEMO_TODAY; });
  const blocked = drafts.length - ready.length;
  dbActivity(`finalized June 2026 period — ${ready.length} invoices sent`);
  closeDrawer();
  dbRefresh(`June 2026 period signed off — ${ready.length} draft${ready.length===1?'':'s'} finalized and sent${blocked?` · ${blocked} blocked on validation`:''}`);
}

/* ============================================================
   Mutations — payments
   ============================================================ */
function dbFindPayment(id){ return db().payments.find(p=>p.id===id); }

function dbRetryPayment(id){
  const p = dbFindPayment(id);
  if(p){ p.sl='Succeeded'; p.status='good'; p.date=DEMO_TODAY; p.net=Math.round(p.amt*0.9775); }
  dbActivity(`retried payment ${id} — succeeded`);
  closeDrawer();
  dbRefresh(p ? `Payment ${p.id} retried — ${fmt(p.amt)} collected from ${p.acct}` : 'Payment retry queued');
}

function dbRefundPayment(id){
  const p = dbFindPayment(id);
  const amt = +$dv('rf_amount', p ? p.amt : 0) || (p ? p.amt : 0);
  if(p){ p.sl='Refunded'; p.status='warn'; }
  dbActivity(`refunded ${fmt(amt)} on ${id}`);
  closeDrawer();
  dbRefresh(p ? `Refund of ${fmt(amt)} issued to ${p.acct} — 5–10 business days` : 'Refund queued');
}

function dbRecordManualPayment(){
  const sel = $dv('mp_invoice');
  const invId = (sel.match(/INV-\S+/)||[])[0];
  const inv = invId ? dbFindInvoice(invId) : null;
  const amt = +$dv('mp_amount', inv ? inv.amt : 0) || (inv ? inv.amt : 0);
  const method = $dv('mp_method','Wire transfer');
  const pay = { id: dbNext('pay','PAY-'), acct: inv ? inv.acct : 'Manual entry', amt, net: amt,
    gw:'Other', method, date: DEMO_TODAY, status:'good', sl:'Succeeded' };
  db().payments.unshift(pay);
  if(inv){ inv.sl='Paid'; inv.status='good'; }
  dbActivity(`recorded manual payment ${pay.id} · ${fmt(amt)}`);
  closeDrawer();
  dbRefresh(`Manual payment recorded — ${fmt(amt)}${inv?` · ${inv.id} marked paid`:''}`);
}

/* ============================================================
   Mutations — customers / subscriptions / credits / collections
   ============================================================ */
function dbCreateCustomer(){
  const name = $dv('nc_name') || 'New Customer Inc';
  const plan = $dv('nc_plan','Business');
  const mrrByPlan = {'Enterprise+':9000,'Enterprise':5500,'Business+':2800,'Business':1800,'Starter':800};
  const c = { name, id: dbNext('acct','AC-'), bu:'BU-001', buName:'Residential', plan,
    mrr: mrrByPlan[plan]||1800, status:'good', health:'green', lastInv:'—',
    badge:'info', blab:'New', grouping:'Consolidated' };
  db().customers.unshift(c);
  dbActivity(`created customer ${name} (${c.id})`);
  closeDrawer();
  if(current!=='accounts') route('accounts');
  dbRefresh(`Customer ${name} created — welcome email sent`);
}

function dbCreateSub(){
  const cust = $dv('ns_customer') || 'Acme Corp';
  const plan = $dv('ns_plan','Business');
  const mrrByPlan = {'Enterprise+':12000,'Enterprise':9200,'Business+':4200,'Business':1800,'Starter':650};
  const delta = mrrByPlan[plan]||1800;
  db().subChanges.unshift({cust, type:'New', oldPlan:'—', newPlan:plan, delta, date:DEMO_TODAY});
  dbActivity(`created subscription — ${cust} on ${plan}`);
  closeDrawer();
  if(current!=='subscriptions') route('subscriptions');
  dbRefresh(`Subscription created — ${cust} on ${plan} · first invoice queued for Jul 1`);
}

function dbChangePlan(acct){
  const sel = document.querySelector('#drawer input[name="planchange"]:checked');
  const label = sel ? sel.closest('label') : null;
  // div > div scopes to the plan-name node; 'div div' also matches the outer
  // wrapper (ancestors outside the query root count in selector matching)
  const newPlan = label ? label.querySelector('div > div').textContent.trim() : 'Business+';
  const prices = {'Enterprise+':12000,'Enterprise':9200,'Business+':4200,'Business':1800};
  const oldMrr = prices['Enterprise'], newMrr = prices[newPlan] ?? oldMrr;
  if(newMrr === oldMrr){ closeDrawer(); toast('No plan change — already on Enterprise'); return; }
  db().subChanges.unshift({cust: acct, type: newMrr>oldMrr?'Upgrade':'Downgrade',
    oldPlan:'Enterprise', newPlan, delta:newMrr-oldMrr, date:DEMO_TODAY});
  dbActivity(`plan change for ${acct}: Enterprise → ${newPlan}`);
  closeDrawer();
  if(current!=='subscriptions') route('subscriptions');
  dbRefresh(`Plan change scheduled for ${acct} — Enterprise → ${newPlan}, effective Jul 1`);
}

function dbCreateCredit(){
  const acct = $dv('ncr_customer') || 'Acme Corp';
  const amt = +$dv('ncr_amount', 0) || 500;
  const reason = $dv('ncr_reason','Goodwill');
  const applied = ($dv('ncr_invoice').match(/INV-\S+/)||['—'])[0];
  const cn = { id: dbNext('cn','CN-2026-'), acct, amt, reason, applied,
    date: DEMO_TODAY, status: amt>1000?'warn':'good', sl: amt>1000?'Pending Approval':'Applied',
    type:'goodwill', finalized: amt<=1000 };
  db().credits.unshift(cn);
  dbActivity(`issued credit note ${cn.id} · ${fmt(amt)} · ${acct}`);
  closeDrawer();
  if(current!=='credits') route('credits');
  dbRefresh(`Credit note ${cn.id} issued — ${fmt(amt)}${cn.sl==='Pending Approval'?' · queued for Finance approval':' · applied to open balance'}`);
}

function dbLogContact(acct){
  const entry = { type:$dv('lc_type','Phone call'), outcome:$dv('lc_outcome','Promise to pay'),
    followup:$dv('lc_followup','2026-07-01'), note:$dv('lc_note',''), when:DEMO_TODAY };
  (db().contactLog[acct] = db().contactLog[acct] || []).unshift(entry);
  dbActivity(`logged ${entry.type.toLowerCase()} with ${acct} — ${entry.outcome.toLowerCase()}`);
  dbSave();
  openCollectionDetail(acct); // re-render the drawer so the timeline shows the entry
  toast(`${entry.type} logged for ${acct} — ${entry.outcome}`);
}

function dbSuspendAccount(acct){
  const c = db().customers.find(x=>x.name===acct);
  if(c){ c.badge='crit'; c.blab='Suspended'; c.status='crit'; c.health='red'; }
  dbActivity(`suspended account ${acct}`);
  closeDrawer();
  dbRefresh(`${acct} suspended — customer notified, access revoked`);
}

function dbSetDefaultPricebook(name){
  db().config['pricebook-default'] = name;
  dbActivity(`set default price book to ${name}`);
  dbSave();
  openPriceBook(); // re-render so the Default pill moves
  toast(`${name} is now the default price book`);
}

function dbApplyGrouping(acctId){
  const radios = [...document.querySelectorAll('#drawer input[name="gp_radio"]')];
  const idx = radios.findIndex(r=>r.checked);
  const pol = (typeof GROUPING_POLICIES!=='undefined' && GROUPING_POLICIES[idx]) || null;
  const short = !pol ? 'Consolidated'
    : pol.type==='split-bu' ? 'Split by BU'
    : pol.type==='split-ownership' ? 'Split by Ownership'
    : pol.type==='sectioned' ? 'Sectioned by BU'
    : pol.type==='custom' ? 'Custom' : 'Consolidated';
  const c = db().customers.find(x=>x.id===acctId);
  if(c) c.grouping = short;
  db().config['grouping:'+acctId] = idx;
  dbActivity(`updated invoice grouping for ${c?c.name:acctId} → ${short}`);
  closeDrawer();
  dbRefresh(pol && pol.requiresApproval
    ? `Invoice grouping set to ${pol.name} — queued for Finance approval`
    : `Invoice grouping set to ${pol?pol.name:short} — applies to Jun 2026 open period`);
}

function dbResetDemo(){
  dbReset();
  toast('Demo data reset to defaults');
  route(current);
}
