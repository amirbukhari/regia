/* delonix — portal.js */

VIEWS.portal = (v)=>{
  const activity=[
    ['Acme Corp','invoice_viewed','INV-2026-1042 · $96,400','Jun 28, 14:02'],
    ['TechFlow Inc','payment_made','$1,800 via Visa ••4242','Jun 28, 11:47'],
    ['Pinnacle SaaS','invoice_downloaded','INV-2026-1038 (PDF)','Jun 28, 10:33'],
    ['CloudBase Inc','payment_method_updated','Added ACH ••7801','Jun 27, 16:22'],
    ['Streamline Co','support_ticket','Billing question — invoice dates','Jun 27, 14:08'],
    ['DataVault','subscription_viewed','Business+ plan details','Jun 27, 11:55'],
    ['Apex Systems','invoice_viewed','INV-2026-1035 · $5,800','Jun 26, 15:41'],
    ['Meridian Tech','payment_made','$1,450 via ACH ••2204','Jun 26, 13:28'],
    ['Zenith Cloud','invoice_downloaded','INV-2026-1031 (PDF)','Jun 25, 17:03'],
    ['NovaSpark','login','Portal session started','Jun 25, 09:44'],
    ['Fulcrum Labs','subscription_viewed','Business+ — 3 seats added','Jun 24, 16:19'],
    ['Bridgepoint','support_ticket','Payment failure query','Jun 24, 11:52'],
  ];
  const actionColor={'payment_made':'#49c46e','support_ticket':'#e8b23f','login':'#6aa6ff','invoice_viewed':'#b07cff','invoice_downloaded':'#b07cff','payment_method_updated':'#ff8a4c','subscription_viewed':'#2dd4bf'};
  v.appendChild(el(`<div class="view">
    ${pageHead('Customer portal','Self-service billing portal — activity, configuration and branding for your customers.',
      `<button class="btn ghost" data-act="toast" data-arg="Portal link copied to clipboard">${svg(I.send,15)} Copy portal link</button>
       <button class="btn primary" data-act="portaltheme">Customize portal</button>`)}
    <div class="grid kpis" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
      ${kpi('Portal logins (30d)','847','↑ 12% vs prior period',{trend:12})}
      ${kpi('Invoices viewed','1,204','across all customers',{accent:true})}
      ${kpi('Payments made','312','self-serve payments',{trend:8})}
      ${kpi('Support tickets','28','deflection rate 96.7%',{})}
    </div>
    <div class="row">
      <div>
        <div class="sec-title">Portal features</div>
        <div class="card panel">
          <div class="panel-head"><h3>Self-service toggles</h3><span class="sub">per-customer or global</span></div>
          ${
            [
              ['Invoice download','Customers can download PDF invoices directly','on'],
              ['Payment methods','Customers can add, update and remove payment methods','on'],
              ['Usage dashboard','Real-time usage and quota visualisation','on'],
              ['Subscription management','Plan upgrade/downgrade and seat changes','on'],
              ['Support chat','Embedded support widget (Intercom)','off'],
            ].map(t=>`<div class="set-row">
              <div><div class="t">${t[0]}</div><div class="d">${t[1]}</div></div>
              <div class="spacer"></div>
              <div class="toggle ${t[2]}" data-act="toggle"><i></i></div>
            </div>`).join('')
          }
        </div>
        <div class="sec-title">Portal customization</div>
        <div class="card panel">
          <div class="panel-head"><h3>Branding</h3><span class="sub">white-label configuration</span></div>
          <div class="set-row">
            <div><div class="t">Logo</div><div class="d">Shown in portal header and PDF invoices</div></div>
            <div class="spacer"></div>
            <button class="btn ghost" style="padding:6px 12px" data-act="logoupload">Upload</button>
          </div>
          <div class="set-row">
            <div><div class="t">Accent color</div><div class="d">Primary button and link color in the portal</div></div>
            <div class="spacer"></div>
            <div style="display:flex;gap:6px;align-items:center">
              ${['#ff5a1f','#635bff','#0abf53','#00a1e0','#e8b23f'].map(c=>`<span style="width:20px;height:20px;border-radius:50%;background:${c};cursor:pointer;display:inline-block;flex-shrink:0" data-act="toast" data-arg="Portal accent set to ${c}"></span>`).join('')}
            </div>
          </div>
          <div class="set-row">
            <div><div class="t">Custom domain</div><div class="d">billing.yourcompany.com (CNAME required)</div></div>
            <div class="spacer"></div>
            <button class="btn ghost" style="padding:6px 12px" data-act="customdomain">Configure</button>
          </div>
          <div class="set-row">
            <div><div class="t">Invoice footer text</div><div class="d">Legal text shown on every invoice</div></div>
            <div class="spacer"></div>
            <button class="btn ghost" style="padding:6px 12px" data-act="invoicefooter">Edit</button>
          </div>
        </div>
      </div>
      <div>
        <div class="sec-title">Recent portal activity</div>
        <div class="card" style="padding:0">
          <div class="table-wrap" style="border:none;margin:0">
            <table><thead><tr>
              <th>Customer</th><th>Action</th><th>Detail</th><th>Date</th>
            </tr></thead>
            <tbody>${activity.map(a=>{
              const col=actionColor[a[1]]||'#7f7264';
              const label=a[1].replace(/_/g,' ');
              return `<tr>
                <td class="nm">${a[0]}</td>
                <td><span style="font-size:11px;padding:2px 7px;border-radius:5px;background:${col}22;color:${col};font-weight:600;white-space:nowrap">${label}</span></td>
                <td class="mut" style="font-size:12px">${a[2]}</td>
                <td class="mut" style="font-size:11.5px;white-space:nowrap">${a[3]}</td>
              </tr>`;
            }).join('')}</tbody></table>
          </div>
        </div>
      </div>
    </div>
  </div>`));
};

/* ---------- Developers & API ---------- */
