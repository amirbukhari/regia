/* delonix — payments.js */

VIEWS.payments = (v)=>{
  const PAY_DATA = [
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
  ];
  const gwColors = {Stripe:'#635bff', Adyen:'#0abf53', Other:'#0891b2'};
  const gwShare = [{gw:'Stripe',pct:72,vol:'$237,170',status:'Healthy',s:'good'},{gw:'Adyen',pct:22,vol:'$72,468',status:'Operational',s:'good'},{gw:'Other',pct:6,vol:'$19,762',status:'Manual',s:'muted'}];

  v.appendChild(el(`<div class="view">
    ${pageHead('Payments','Payment ledger — gateway receipts, fee netting and status across processors.',
      `<button class="btn ghost" data-act="download" data-arg="csv|Payment Ledger|312 payments · $329,400">${svg(I.download,14)} Export</button><button class="btn primary" data-act="manualpayment" data-arg="new">+ Record Payment</button>`)}

    <div class="grid kpis" style="grid-template-columns:repeat(4,1fr)">
      ${kpi('Collected MTD','$329,400','net of processing fees',{accent:true,trend:7})}
      ${kpi('Pending Settlement','$28,400','2–3 business days',{})}
      ${kpi('Failed Payments','$12,100','2 retries queued',{})}
      ${kpi('Refunds Issued','$4,200','MTD · 3 transactions',{})}
    </div>

    <div class="card" style="padding:16px 18px;margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <span style="font-size:12px;text-transform:uppercase;letter-spacing:.07em;color:var(--mut)">Gateway split · June 2026</span>
        <span style="font-size:12px;color:var(--mut)">$329,400 settled</span>
      </div>
      <div style="display:flex;gap:12px">
        ${gwShare.map(g=>`<div style="flex:${g.pct};background:${gwColors[g.gw]}18;border:1px solid ${gwColors[g.gw]}44;border-radius:6px;padding:12px 14px;min-width:0">`+
          `<div style="font-size:18px;font-weight:700;color:${gwColors[g.gw]};font-variant-numeric:tabular-nums">${g.pct}%</div>`+
          `<div style="font-size:13px;font-weight:600;margin:2px 0">${g.gw}</div>`+
          `<div style="font-size:12px;color:var(--mut)">${g.vol} · ${g.status}</div>`+
          `</div>`).join('')}
      </div>
    </div>

    <div class="card" style="padding:0;overflow:hidden">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid var(--border)">
        <span style="font-size:13px;font-weight:600">All Payments</span>
        <div style="display:flex;gap:8px">
          <span class="chip">${svg(I.filter,13)} Gateway</span>
          <span class="chip">${svg(I.filter,13)} Status</span>
        </div>
      </div>
      <div class="table-wrap" style="border:none">
        <table>
          <thead><tr>
            <th style="width:120px">Reference</th>
            <th>Customer</th>
            <th class="num">Amount</th>
            <th class="num">Net</th>
            <th>Gateway</th>
            <th>Method</th>
            <th>Date</th>
            <th>Status</th>
          </tr></thead>
          <tbody>${PAY_DATA.map(p=>`<tr style="cursor:pointer" data-act="paydetail" data-arg="${p.id}">`+
            `<td class="mono">${p.id}</td>`+
            `<td class="nm">${p.acct}</td>`+
            `<td class="num tnum">${fmt(p.amt)}</td>`+
            `<td class="num tnum" style="color:var(--mut)">${fmt(p.net)}</td>`+
            `<td><span style="font-size:12px;font-weight:600;color:${gwColors[p.gw]}">${p.gw}</span></td>`+
            `<td class="mono mut" style="font-size:12px">${p.method}</td>`+
            `<td class="mut">${p.date}</td>`+
            `<td>${pill(p.status,p.sl)}</td>`+
            `</tr>`).join('')}</tbody>
        </table>
      </div>
    </div>
  </div>`));
};

/* ---------- Credits & Refunds ---------- */
