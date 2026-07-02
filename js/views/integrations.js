/* delonix — integrations.js */

VIEWS.integrations = (v)=>{
  const integrations={
    'Payments':[
      ['Stripe','#635bff','Connected · primary gateway','847 invoices synced · 2 min ago','good','Connected'],
      ['Adyen','#0abf53','Connected · EU &amp; APAC','312 transactions · 4 min ago','good','Connected'],
      ['PayPal','#003087','Not connected','—','muted','Connect'],
      ['GoCardless','#2c4ecf','Not connected','—','muted','Connect'],
    ],
    'Accounting':[
      ['NetSuite','#2dbd63','Connected · GL sync nightly','2,841 journal entries · 12 min ago','good','Connected'],
      ['QuickBooks','#2ca01c','Not connected','—','muted','Connect'],
      ['Xero','#13b5ea','Not connected','—','muted','Connect'],
      ['Sage','#00b050','Not connected','—','muted','Connect'],
    ],
    'CRM':[
      ['Salesforce','#00a1e0','Connected · bi-directional','418 accounts synced · 8 min ago','good','Connected'],
      ['HubSpot','#ff7a59','Not connected','—','muted','Connect'],
      ['Pipedrive','#e74c3c','Not connected','—','muted','Connect'],
    ],
    'Banking':[
      ['Plaid','#00d064','Connected · bank verification','20 accounts linked · 1 hr ago','good','Connected'],
      ['Open Banking EU','#0085ff','Connected · PSD2','14 mandates active · 3 hr ago','good','Connected'],
    ],
  };
  const dataFlow=[
    ['Customer master','Salesforce (CRM)','delonix','Salesforce','1,204','2 min ago'],
    ['Subscription state','delonix','NetSuite (GL)','delonix','2,841','12 min ago'],
    ['Payment events','Stripe','delonix','Stripe','3,622','Real-time'],
    ['Invoice ledger','delonix','NetSuite (GL)','delonix','487','12 min ago'],
    ['Bank accounts','Plaid','delonix','Plaid','20','1 hr ago'],
    ['Product catalog','delonix','Salesforce (CRM)','delonix','94','30 min ago'],
  ];
  const bgFor=name=>({
    Stripe:'#635bff',Adyen:'#0abf53',PayPal:'#003087',GoCardless:'#2c4ecf',
    NetSuite:'#2dbd63',QuickBooks:'#2ca01c',Xero:'#13b5ea',Sage:'#00b050',
    Salesforce:'#00a1e0',HubSpot:'#ff7a59',Pipedrive:'#e74c3c',
    Plaid:'#00d064','Open Banking EU':'#0085ff',
  }[name]||'#7f7264');
  v.appendChild(el(`<div class="view">
    ${pageHead('Integrations','Pre-built connectors keeping billing, CRM, GL and banking in sync.',
      `<button class="btn ghost" data-act="integeventlogs">View logs</button>
       <button class="btn primary" data-act="toast" data-arg="Marketplace — 13 connectors available, 6 installed">Browse marketplace</button>`)}
    <div class="grid kpis" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
      ${kpi('Active connectors','6','of 13 installed',{accent:true})}
      ${kpi('Records synced (24h)','48,621','across 6 integrations',{trend:6})}
      ${kpi('Sync health','100%','no failures in 30d',{})}
      ${kpi('Last sync','2 min ago','Stripe · Salesforce',{})}
    </div>
    ${Object.entries(integrations).map(([cat,items])=>`
      <div class="sec-title">${cat}</div>
      <div class="grid cards-3" style="margin-bottom:4px">
        ${items.map(g=>{
          const color=bgFor(g[0]);
          const isConn=g[5]==='Connected';
          return `<div class="card gw">
            <div class="gi" style="background:${color}22;color:${color};font-size:13px;font-weight:800;letter-spacing:-.3px">${g[0].substring(0,2).toUpperCase()}</div>
            <div style="flex:1;min-width:0">
              <div class="nm">${g[0]}</div>
              <div class="mut" style="font-size:11.5px">${isConn?g[2]:'Not connected'}</div>
              ${isConn?`<div style="font-size:10.5px;color:var(--good);margin-top:2px">${g[3]}</div>`:''}
            </div>
            ${isConn
              ? `<div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px">${pill(g[4],'Active')}<button class="btn ghost" style="padding:4px 10px;font-size:12px" data-act="connectintegration" data-arg="${g[0]}">Manage</button></div>`
              : `<button class="btn ghost" style="padding:5px 11px;font-size:12px" data-act="connectintegration" data-arg="${g[0]}">Connect</button>`
            }
          </div>`;
        }).join('')}
      </div>
    `).join('')}
    <div class="sec-title">Data flow &amp; source of truth</div>
    <div class="card" style="padding:0">
      <div class="table-wrap" style="border:none;margin:0">
        <table><thead><tr>
          <th>Data type</th><th>Source system</th><th>Destination</th>
          <th>Source of truth</th><th class="num">Records</th><th>Last sync</th>
        </tr></thead>
        <tbody>${dataFlow.map(d=>`<tr>
          <td class="nm">${d[0]}</td>
          <td class="mut">${d[1]}</td>
          <td class="mut">${d[2]}</td>
          <td><span style="font-size:11.5px;font-weight:600;color:var(--ember-soft)">${d[3]}</span></td>
          <td class="num tnum">${d[4]}</td>
          <td class="mut" style="font-size:11.5px">${d[5]}</td>
        </tr>`).join('')}</tbody></table>
      </div>
    </div>
  </div>`));
};


/* ---------- Business Units ---------- */
