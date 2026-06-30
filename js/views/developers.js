/* delonix — developers.js */

VIEWS.developers = (v)=>{
  const apiKeys=[
    ['Live · publishable','pk_live_••••7Qx2','Read-only','Jun 28, 14:31','good','Active'],
    ['Live · secret','sk_live_••••a9Fd','Full access','Jun 28, 14:31','good','Active'],
    ['Test · secret','sk_test_••••0Tz1','Sandbox','Jun 25, 09:44','muted','Sandbox'],
  ];
  const webhooks=[
    ['https://hooks.acme••••.com/billing','invoice.*, payment.*','Jun 28, 14:32','good','Healthy'],
    ['https://api.techfl••••.io/webhooks','subscription.*, usage.*','Jun 28, 11:47','good','Healthy'],
    ['https://crm.salesfo••••.com/inbound','customer.*','Jun 27, 16:22','good','Healthy'],
    ['https://staging.yourco••••.com/test','invoice.*','Jun 20, 10:05','muted','Disabled'],
  ];
  const requests=[
    ['POST','/v1/subscriptions','201','138ms','Jun 28, 14:31','good'],
    ['POST','/v1/usage_records','200','41ms','Jun 28, 14:30','good'],
    ['GET','/v1/invoices','200','58ms','Jun 28, 14:29','good'],
    ['GET','/v1/customers/AC-4821','200','32ms','Jun 28, 14:28','good'],
    ['POST','/v1/payment_intents','402','224ms','Jun 28, 14:22','warn'],
    ['POST','/v1/customers','201','117ms','Jun 28, 13:58','good'],
    ['GET','/v1/subscriptions','200','63ms','Jun 28, 13:51','good'],
    ['PUT','/v1/subscriptions/sub_8821','200','88ms','Jun 28, 13:44','good'],
    ['POST','/v1/invoices/INV-1042/pay','200','191ms','Jun 28, 13:33','good'],
    ['DELETE','/v1/payment_methods/pm_4829','204','44ms','Jun 28, 13:21','good'],
  ];
  const methPill={'POST':'ember','GET':'info','PUT':'warn','DELETE':'crit','PATCH':'muted'};
  v.appendChild(el(`<div class="view">
    ${pageHead('Developers &amp; API','REST API, webhooks, SDKs and sandbox — with idempotency, versioning and live request logging.',
      `<button class="btn ghost" data-act="apidocs">API docs</button>
       <button class="btn primary" data-act="apikey">+ Create key</button>`)}
    <div class="grid kpis" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
      ${kpi('API calls (24h)','42,847','+9% vs 7-day avg',{trend:9,accent:true})}
      ${kpi('Webhooks delivered','1,204','99.7% delivery rate',{trend:0.2})}
      ${kpi('Error rate','0.3%','p4xx + p5xx',{trend:-0.1})}
      ${kpi('Avg latency','124ms','p50 across all endpoints',{trend:-6})}
    </div>
    <div class="sec-title">API keys</div>
    <div class="card" style="padding:0;margin-bottom:0">
      <div class="table-wrap" style="border:none;margin:0">
        <table><thead><tr>
          <th>Label</th><th>Token</th><th>Permissions</th><th>Last used</th><th>Status</th><th></th>
        </tr></thead>
        <tbody>${apiKeys.map(k=>`<tr>
          <td class="nm">${k[0]}</td>
          <td class="mono mut" style="font-size:12px">${k[1]}</td>
          <td class="mut">${k[2]}</td>
          <td class="mut" style="font-size:11.5px">${k[3]}</td>
          <td>${pill(k[4],k[5])}</td>
          <td style="text-align:right"><a class="chip" data-act="rotatekey" data-arg="${k[1]}">Rotate</a></td>
        </tr>`).join('')}</tbody></table>
      </div>
    </div>
    <div class="row" style="margin-top:0">
      <div>
        <div class="sec-title">Webhook endpoints</div>
        <div class="card" style="padding:0">
          <div class="table-wrap" style="border:none;margin:0">
            <table><thead><tr>
              <th>URL</th><th>Events</th><th>Last delivery</th><th>Status</th><th></th>
            </tr></thead>
            <tbody>${webhooks.map(w=>`<tr>
              <td class="mono mut" style="font-size:11px">${w[0]}</td>
              <td class="mut" style="font-size:11.5px">${w[1]}</td>
              <td class="mut" style="font-size:11.5px">${w[2]}</td>
              <td>${pill(w[3],w[4])}</td>
              <td style="text-align:right"><a class="chip" data-act="webhookdetail" data-arg="${w[0]}">Edit</a></td>
            </tr>`).join('')}</tbody></table>
          </div>
        </div>
        <div class="sec-title">SDKs &amp; libraries</div>
        <div class="card" style="padding:14px 16px">
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            ${['Node.js','Python','Go','Ruby','Java','PHP','Swift','.NET'].map(s=>`<span class="chip" data-act="sdkdocs" data-arg="${s}">${s}</span>`).join('')}
          </div>
          <div class="note info" style="margin-top:14px">${svg(I.api,15)}<div>All write calls accept an <b>Idempotency-Key</b> header for safe retries. Pin the API version with <code>delonix-Version: 2026-06-01</code>. Use <code>sk_test_</code> keys for sandbox testing with no side-effects.</div></div>
        </div>
      </div>
      <div>
        <div class="sec-title">Recent API requests</div>
        <div class="card" style="padding:0">
          <div class="table-wrap" style="border:none;margin:0">
            <table><thead><tr>
              <th>Method</th><th>Endpoint</th>
              <th class="num">Status</th><th class="num">Latency</th><th>Time</th>
            </tr></thead>
            <tbody>${requests.map(r=>`<tr>
              <td><span class="pill ${methPill[r[0]]||'muted'}">${r[0]}</span></td>
              <td class="mono mut" style="font-size:11.5px">${r[1]}</td>
              <td class="num"><span style="color:${r[2].startsWith('2')?'var(--good)':r[2].startsWith('4')?'var(--warn)':'var(--crit)'};font-weight:600">${r[2]}</span></td>
              <td class="num">${r[3]}</td>
              <td class="mut" style="font-size:11px;white-space:nowrap">${r[4]}</td>
            </tr>`).join('')}</tbody></table>
          </div>
        </div>
      </div>
    </div>
  </div>`));
};

/* ---------- Integrations ---------- */
