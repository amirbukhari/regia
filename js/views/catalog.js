/* delonix — catalog.js */

VIEWS.catalog = (v)=>{
  const ck  = (ok)=> ok ? `<span style="color:var(--good)">${svg(I.check,14)}</span>` : `<span style="color:var(--text-3);opacity:.4">—</span>`;
  const lim = (s) => `<span style="font-size:12px;color:var(--text-2)">${s}</span>`;
  const feat = (t)=>`<li>${svg(I.check,14)}<span>${t}</span></li>`;
  const plans = [
    {name:'Starter',    price:'$79',   unit:'/mo',            badge:'muted', blab:'Self-serve', subs:694},
    {name:'Business',   price:'$199',  unit:'/mo',            badge:'muted', blab:'Popular',    subs:88},
    {name:'Business+',  price:'$349',  unit:'/mo',            badge:'info',  blab:'Growing',    subs:22},
    {name:'Enterprise', price:'Custom',unit:'/ negotiated',   badge:'ember', blab:'Most MRR',   subs:26},
    {name:'Enterprise+',price:'Custom',unit:'/ negotiated',   badge:'ember', blab:'Top tier',   subs:12},
  ];
  const planFeatures = [
    {name:'Starter',    users:'Up to 5',   api:'100k/mo',   storage:'10 GB',    sso:false, revrec:false, csmded:false, customdunning:false, multiCurr:false},
    {name:'Business',   users:'Up to 25',  api:'1M/mo',     storage:'100 GB',   sso:false, revrec:false, csmded:false, customdunning:false, multiCurr:false},
    {name:'Business+',  users:'Up to 100', api:'5M/mo',     storage:'500 GB',   sso:true,  revrec:false, csmded:false, customdunning:true,  multiCurr:false},
    {name:'Enterprise', users:'Unlimited', api:'Unlimited', storage:'2 TB',     sso:true,  revrec:true,  csmded:false, customdunning:true,  multiCurr:true},
    {name:'Enterprise+',users:'Unlimited', api:'Unlimited', storage:'Unlimited',sso:true,  revrec:true,  csmded:true,  customdunning:true,  multiCurr:true},
  ];
  const featureRows = [
    ['Included seats',         f=>lim(f.users)],
    ['API calls',              f=>lim(f.api)],
    ['Storage',                f=>lim(f.storage)],
    ['Single sign-on (SSO)',   f=>ck(f.sso)],
    ['Revenue recognition',    f=>ck(f.revrec)],
    ['Dedicated CSM',          f=>ck(f.csmded)],
    ['Custom dunning flows',   f=>ck(f.customdunning)],
    ['Multi-currency billing', f=>ck(f.multiCurr)],
    ['Priority support',       f=>ck(f.name!=='Starter')],
    ['99.99% SLA',             f=>ck(f.name==='Enterprise+')],
    ['Custom contracts / POs', f=>ck(f.name==='Enterprise'||f.name==='Enterprise+')],
    ['ACH & wire payments',    f=>ck(f.name==='Enterprise'||f.name==='Enterprise+')],
    ['Audit log export',       f=>ck(f.sso)],
    ['Usage metering',         f=>ck(f.name!=='Starter')],
    ['Advanced analytics',     f=>ck(f.revrec||f.name==='Business+')],
  ];
  v.appendChild(el(`<div class="view">
    ${pageHead('Products & Plans','Pricing catalog, plan packaging and feature entitlements across all tiers.',
      `<button class="btn ghost" data-act="pricebook">Manage price books</button><button class="btn primary" data-act="newplan">+ New plan</button>`)}
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-bottom:24px">
      ${plans.map((p,i)=>`<div class="card plan${i===3?' feat':''}">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:6px">
          <h4 style="margin:0;font-family:var(--display);font-size:14px;font-weight:700">${p.name}</h4>
          ${pill(p.badge,p.blab)}
        </div>
        <div class="price" style="font-size:22px;margin:10px 0 4px">${p.price}<small style="font-size:11px;color:var(--text-3);font-weight:400">${p.unit}</small></div>
        <div style="font-size:11.5px;color:var(--text-3);margin-bottom:12px">${p.subs.toLocaleString()} active subs</div>
        <ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:7px;font-size:12px;color:var(--text-2)">
          ${p.name==='Starter'    ? feat('5 users')+feat('100k API calls/mo')+feat('Email support')+feat('Card payments') : ''}
          ${p.name==='Business'   ? feat('25 users')+feat('1M API calls/mo')+feat('Chat + email support')+feat('Usage metering') : ''}
          ${p.name==='Business+'  ? feat('100 users')+feat('5M API calls/mo')+feat('SSO & audit log')+feat('Custom dunning flows') : ''}
          ${p.name==='Enterprise' ? feat('Unlimited users')+feat('Unlimited API')+feat('ACH, wire, multi-currency')+feat('Revenue recognition')+feat('Priority support SLA 99.9%') : ''}
          ${p.name==='Enterprise+'? feat('Everything in Enterprise')+feat('Dedicated CSM')+feat('99.99% SLA')+feat('Custom contracts & POs')+feat('Ramped & volume pricing') : ''}
        </ul>
        <button class="btn ${i===3?'primary':'ghost'}" style="justify-content:center;margin-top:auto;padding-top:10px" data-act="editplan" data-arg="${p.name}">Edit plan</button>
      </div>`).join('')}
    </div>
    <div class="sec-title">Feature comparison</div>
    <div class="table-wrap">
      <table style="min-width:700px">
        <thead><tr><th style="width:220px">Feature</th>${plans.map(p=>`<th style="text-align:center;color:var(--text-2)">${p.name}</th>`).join('')}</tr></thead>
        <tbody>
          ${featureRows.map(([label,fn])=>`<tr>
            <td style="color:var(--text-2);font-size:13px">${label}</td>
            ${planFeatures.map(f=>`<td style="text-align:center">${fn(f)}</td>`).join('')}
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`));
};

/* ---------- Invoices ---------- */
