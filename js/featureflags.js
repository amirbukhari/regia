/* delonix — client-side feature flags for surfaced modules */
const FEATURE_FLAGS_KEY = 'dlx-feature-flags-v1';
const FEATURE_FLAGS = {
  core: {
    label: 'Core enterprise billing',
    locked: true,
    enabled: true,
    description: 'Always-on production navigation for the CEO-safe billing console.',
    routes: ['dashboard','reports','accounts','subscriptions','catalog','billingruns','usage','invoices','credits','payments','ar','dunning','statements','revrec','tax','controls','auditlog','permissions','portal','developers','integrations','settings']
  },
  advancedOperations: {
    label: 'Advanced operations modules',
    enabled: true,
    description: 'Deeper operational consoles for policies, invoice ops, payment ops, tax ops, GL controls, localization and data operations.',
    routes: ['analyticsops','customerops','subscriptionops','pricebooks','billingpolicies','usageops','invoiceops','paymentops','revaccounting','localization','taxops','glops','security','dataops','developerconsole','integrationops']
  },
  dealDesk: {
    label: 'Deal desk & contracts',
    enabled: true,
    description: 'CPQ, contract operations, quotes and pricing calculator surfaces.',
    routes: ['calculator','quotes','contractops','cpqdesk']
  },
  automationAndComms: {
    label: 'Automation & communications',
    enabled: true,
    description: 'Notifications and workflow automation. Keep enabled only when the routed actions are being reviewed.',
    routes: ['notifications','workflows']
  },
  orgAndEntityOps: {
    label: 'Organization & entity operations',
    enabled: true,
    description: 'Business units, legal entities, custom entities and migration/source-system operations.',
    routes: ['bizunits','legalentity','customentities','migration']
  },
  partnerAndAi: {
    label: 'Partner billing & AI',
    enabled: true,
    description: 'Partner billing and AI insight surfaces for optional executive demos.',
    routes: ['partnerbilling','aiinsights']
  },
  legacyFeatureWorkbench: {
    label: 'Legacy feature workbench',
    enabled: false,
    description: 'Preserved for audit/discovery only; hidden by default so it does not pollute the production billing experience.',
    routes: ['featurematrix']
  }
};

function readFeatureFlags(){
  let saved={};
  try{ saved=JSON.parse(localStorage.getItem(FEATURE_FLAGS_KEY)||'{}')||{}; }catch(e){ saved={}; }
  return Object.fromEntries(Object.entries(FEATURE_FLAGS).map(([key,flag])=>[key, flag.locked ? true : (saved[key] ?? flag.enabled)]));
}
function writeFeatureFlag(key, enabled){
  const current=readFeatureFlags();
  current[key]=!!enabled;
  localStorage.setItem(FEATURE_FLAGS_KEY, JSON.stringify(current));
}
function resetFeatureFlags(){ localStorage.removeItem(FEATURE_FLAGS_KEY); }
function flagForRoute(routeId){
  return Object.entries(FEATURE_FLAGS).find(([,flag])=>flag.routes.includes(routeId))?.[0] || 'core';
}
function isRouteEnabled(routeId){
  const flags=readFeatureFlags();
  const key=flagForRoute(routeId);
  return flags[key] !== false;
}
function enabledNavGroups(){
  return NAV.map(group=>({...group, items:group.items.filter(item=>isRouteEnabled(item.id))})).filter(group=>group.items.length);
}
function enabledRoutes(){ return new Set(enabledNavGroups().flatMap(g=>g.items.map(i=>i.id))); }
function toggleFeatureFlag(key, el){
  const flag=FEATURE_FLAGS[key];
  if(!flag || flag.locked) return;
  const next=!el.classList.contains('on');
  writeFeatureFlag(key,next);
  el.classList.toggle('on',next);
  buildNav();
  if(typeof buildCmd==='function') closeCmd();
  if(typeof current!=='undefined' && !isRouteEnabled(current)) route('dashboard');
  toast(`${flag.label} ${next?'enabled':'hidden'}`);
}
function resetFeatureFlagUI(){
  resetFeatureFlags();
  buildNav();
  if(typeof current!=='undefined' && !isRouteEnabled(current)) route('dashboard');
  route('settings');
  toast('Feature flags reset to defaults');
}
function featureFlagRows(){
  const flags=readFeatureFlags();
  return Object.entries(FEATURE_FLAGS).map(([key,flag])=>{
    const enabled=flags[key]!==false;
    const locked=flag.locked;
    return `<div class="set-row feature-flag-row">
      <div><div class="t">${flag.label}${locked?' · required':''}</div><div class="d">${flag.description}</div><div class="flag-routes">${flag.routes.map(r=>`<code>${r}</code>`).join('')}</div></div>
      <div class="spacer"></div>
      <div class="toggle ${enabled?'on':''} ${locked?'locked':''}" data-act="${locked?'toast':'featureflag'}" data-arg="${locked?'Core billing cannot be hidden':key}" aria-label="Toggle ${flag.label}"><i></i></div>
    </div>`;
  }).join('');
}
