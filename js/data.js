/* delonix — navigation model & mock data */

/* ---- navigation model ---- */
const NAV = [
  {group:'Overview', items:[
    {id:'dashboard', label:'Dashboard', icon:'dash'},
    {id:'reports', label:'Reports & Analytics', icon:'reports'},
    {id:'aiinsights', label:'AI Insights', icon:'ai'},
    {id:'featurematrix', label:'Feature Workbench', icon:'reports', badge:'459'},
  ]},
  {group:'Revenue', items:[
    {id:'accounts', label:'Customers', icon:'accounts'},
    {id:'subscriptions', label:'Subscriptions', icon:'subs'},
    {id:'catalog', label:'Products & Plans', icon:'catalog'},
    {id:'calculator', label:'Pricing Calculator', icon:'calc'},
    {id:'quotes', label:'Quotes & Contracts', icon:'quotes', badge:'4', muted:true},
    {id:'usage', label:'Usage & Metering', icon:'usage'},
  ]},
  {group:'Accounts Receivable', items:[
    {id:'invoices', label:'Invoices', icon:'invoices'},
    {id:'payments', label:'Payments', icon:'payments'},
    {id:'credits', label:'Credits & Refunds', icon:'credits'},
    {id:'ar', label:'A/R & Cash Application', icon:'ar'},
    {id:'dunning', label:'Dunning & Collections', icon:'dunning', badge:'7'},
  ]},
  {group:'Finance & Controls', items:[
    {id:'statements', label:'Financial Statements', icon:'ledger'},
    {id:'consolidation', label:'Consolidation', icon:'globe'},
    {id:'revrec', label:'Revenue Recognition', icon:'revrec'},
    {id:'cashflow', label:'Cash & Treasury', icon:'cash'},
    {id:'close', label:'Financial Close', icon:'close', badge:'5', muted:true},
    {id:'tax', label:'Tax & Compliance', icon:'tax'},
    {id:'controls', label:'Controls & Audit', icon:'shield'},
  ]},
  {group:'Organization', items:[
    {id:'bizunits',    label:'Business Units',        icon:'bu'},
    {id:'legalentity', label:'Legal Entities',         icon:'entity'},
    {id:'customentities', label:'Custom Entities',     icon:'entity2'},
    {id:'migration',   label:'Migration & Source Systems', icon:'migration'},
  ]},
  {group:'Platform', items:[
    {id:'portal',      label:'Customer Portal',       icon:'portal'},
    {id:'developers',  label:'Developers & API',      icon:'api'},
    {id:'integrations',label:'Integrations',          icon:'plug'},
    {id:'permissions', label:'Roles & Permissions',   icon:'shield'},
    {id:'auditlog',    label:'Audit Log',              icon:'audit'},
    {id:'thememanager',label:'Theme & Branding',        icon:'brush'},
    {id:'settings',    label:'Settings',              icon:'settings'},
  ]},
];

/* ---- demo data ---- */
const COLORS=['#ff5a1f','#5aa9ff','#3fb950','#e3b341','#b07cff','#ff6b9d','#2dd4bf','#f0492f'];
const accounts = [
  {id:'AC-4821', name:'Northwind Logistics', plan:'Enterprise', seats:1450, mrr:48200, region:'US', terms:'Net 30', status:'good', owner:'M. Reyes', since:'2021', health:96, ar:0},
  {id:'AC-4795', name:'Helios Manufacturing', plan:'Enterprise', seats:980, mrr:39750, region:'EU', terms:'Net 45', status:'warn', owner:'D. Cho', since:'2020', health:71, ar:39750},
  {id:'AC-5102', name:'Aurora Health Group', plan:'Enterprise+', seats:3120, mrr:96400, region:'US', terms:'Net 60', status:'good', owner:'M. Reyes', since:'2019', health:91, ar:0},
  {id:'AC-5340', name:'Meridian Bank', plan:'Enterprise+', seats:5400, mrr:142000, region:'UK', terms:'Net 30', status:'good', owner:'P. Anand', since:'2018', health:88, ar:0},
  {id:'AC-5512', name:'Cobalt Robotics', plan:'Growth', seats:240, mrr:9800, region:'US', terms:'Net 15', status:'crit', owner:'D. Cho', since:'2022', health:42, ar:19600},
  {id:'AC-5618', name:'Vega Retail', plan:'Enterprise', seats:1120, mrr:41300, region:'APAC', terms:'Net 30', status:'good', owner:'P. Anand', since:'2021', health:84, ar:0},
  {id:'AC-5701', name:'Tundra Energy', plan:'Enterprise', seats:760, mrr:33500, region:'CA', terms:'Net 45', status:'warn', owner:'M. Reyes', since:'2020', health:68, ar:33500},
  {id:'AC-5844', name:'Solstice Media', plan:'Growth', seats:180, mrr:7400, region:'US', terms:'Net 30', status:'good', owner:'D. Cho', since:'2023', health:79, ar:0},
];
const initials = n => n.split(' ').slice(0,2).map(w=>w[0]).join('');
const colorFor = (s)=>COLORS[[...s].reduce((a,c)=>a+c.charCodeAt(0),0)%COLORS.length];

const invoices = [
  {id:'INV-2026-1042', acct:'Aurora Health Group', amt:96400, status:'good', slabel:'Paid', issued:'Jun 01', due:'Aug 01', method:'ACH'},
  {id:'INV-2026-1041', acct:'Meridian Bank', amt:142000, status:'info', slabel:'Open', issued:'Jun 01', due:'Jul 01', method:'Wire'},
  {id:'INV-2026-1040', acct:'Helios Manufacturing', amt:39750, status:'crit', slabel:'Overdue', issued:'May 01', due:'Jun 15', method:'Card'},
  {id:'INV-2026-1039', acct:'Cobalt Robotics', amt:19600, status:'crit', slabel:'Overdue', issued:'Apr 15', due:'Apr 30', method:'Card'},
  {id:'INV-2026-1038', acct:'Northwind Logistics', amt:48200, status:'good', slabel:'Paid', issued:'Jun 01', due:'Jul 01', method:'ACH'},
  {id:'INV-2026-1037', acct:'Tundra Energy', amt:33500, status:'crit', slabel:'Overdue', issued:'May 01', due:'Jun 15', method:'Wire'},
  {id:'INV-2026-1036', acct:'Vega Retail', amt:41300, status:'info', slabel:'Open', issued:'Jun 01', due:'Jul 01', method:'ACH'},
  {id:'INV-2026-1035', acct:'Solstice Media', amt:7400, status:'muted', slabel:'Draft', issued:'—', due:'—', method:'Card'},
  {id:'INV-2026-1034', acct:'Aurora Health Group', amt:8800, status:'ember', slabel:'Processing', issued:'Jun 20', due:'Jul 20', method:'ACH'},
];

const subs = [
  {acct:'Meridian Bank', plan:'Enterprise+ (annual)', model:'Per-seat + usage', seats:5400, mrr:142000, renew:'2027-01-15', status:'good', sl:'Active'},
  {acct:'Aurora Health Group', plan:'Enterprise+ (annual)', model:'Per-seat', seats:3120, mrr:96400, renew:'2026-09-01', status:'good', sl:'Active'},
  {acct:'Northwind Logistics', plan:'Enterprise (annual)', model:'Tiered seats', seats:1450, mrr:48200, renew:'2026-08-12', status:'ember', sl:'Renewing'},
  {acct:'Vega Retail', plan:'Enterprise (monthly)', model:'Per-seat', seats:1120, mrr:41300, renew:'2026-07-01', status:'good', sl:'Active'},
  {acct:'Helios Manufacturing', plan:'Enterprise (annual)', model:'Per-seat + usage', seats:980, mrr:39750, renew:'2026-10-01', status:'warn', sl:'Past due'},
  {acct:'Tundra Energy', plan:'Enterprise (annual)', model:'Flat + usage', seats:760, mrr:33500, renew:'2026-11-01', status:'warn', sl:'Past due'},
  {acct:'Cobalt Robotics', plan:'Growth (monthly)', model:'Per-seat', seats:240, mrr:9800, renew:'2026-07-01', status:'crit', sl:'Suspended'},
  {acct:'Solstice Media', plan:'Growth (monthly)', model:'Flat', seats:180, mrr:7400, renew:'2026-07-01', status:'good', sl:'Active'},
];

const payments = [
  {id:'PAY-88241', acct:'Aurora Health Group', amt:96400, method:'ACH •6620', gw:'Stripe', status:'good', sl:'Succeeded', when:'Jun 26 · 14:02'},
  {id:'PAY-88240', acct:'Northwind Logistics', amt:48200, method:'ACH •1180', gw:'Stripe', status:'good', sl:'Succeeded', when:'Jun 26 · 09:41'},
  {id:'PAY-88239', acct:'Cobalt Robotics', amt:9800, method:'Visa •4242', gw:'Adyen', status:'crit', sl:'Failed', when:'Jun 25 · 22:13'},
  {id:'PAY-88238', acct:'Meridian Bank', amt:142000, method:'Wire', gw:'Bank', status:'ember', sl:'Pending', when:'Jun 25 · 16:50'},
  {id:'PAY-88237', acct:'Helios Manufacturing', amt:39750, method:'Mastercard •8801', gw:'Adyen', status:'crit', sl:'Failed', when:'Jun 24 · 11:20'},
  {id:'PAY-88236', acct:'Vega Retail', amt:41300, method:'ACH •2204', gw:'Stripe', status:'good', sl:'Succeeded', when:'Jun 24 · 08:05'},
  {id:'PAY-88235', acct:'Solstice Media', amt:7400, method:'Amex •3007', gw:'Stripe', status:'good', sl:'Succeeded', when:'Jun 23 · 19:30'},
];

const revenueSeries = [218,232,241,238,256,270,265,284,301,312,308,329]; // monthly net revenue ($k)
const months = ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'];
