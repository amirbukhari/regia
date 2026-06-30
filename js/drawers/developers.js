/* delonix — developers.js */

function openIntegrationDetail(name){
  const configs = {
    Stripe:{color:'#635bff',status:'Connected',lastSync:'2 min ago',records:'847 payments synced',webhookUrl:'https://api.delonix.io/webhooks/stripe',desc:'Primary payment gateway. Processes card and ACH payments, syncs settlement data.'},
    QuickBooks:{color:'#2ca01c',status:'Connected',lastSync:'14 min ago',records:'312 GL entries exported',webhookUrl:'https://api.delonix.io/webhooks/quickbooks',desc:'Legacy GL export for BuildStream entity. Scheduled for migration to NetSuite.'},
    Salesforce:{color:'#0176d3',status:'Sync paused',lastSync:'2h ago',records:'Last sync: 124 accounts',webhookUrl:'https://api.delonix.io/webhooks/salesforce',desc:'CRM sync — accounts, contacts, and opportunities.'},
    NetSuite:{color:'#009edb',status:'Connected',lastSync:'2 min ago',records:'1,189 journal entries',webhookUrl:'https://api.delonix.io/webhooks/netsuite',desc:'Primary GL system for US entities. Receives invoice, payment, and credit journal entries.'},
  };
  const c = configs[name]||{color:'#888',status:'Unknown',lastSync:'—',records:'—',webhookUrl:'—',desc:'Integration configuration.'};
  openDrawer(`Integration — ${name}`, `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px">
      <div style="width:40px;height:40px;border-radius:8px;background:${c.color};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:16px">${name[0]}</div>
      <div><div style="font-weight:700;font-size:15px">${name}</div><div class="mut" style="font-size:12px">${c.desc}</div></div>
      ${c.status==='Connected'?pill('good',c.status):pill('warn',c.status)}
    </div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-bottom:16px">
      <div class="fg"><label>Status</label><div style="color:${c.status==='Connected'?'var(--pos)':'var(--warn)'}">${c.status}</div></div>
      <div class="fg"><label>Last sync</label><div>${c.lastSync}</div></div>
      <div class="fg"><label>Records</label><div class="mut" style="font-size:12px">${c.records}</div></div>
      <div class="fg"><label>Webhook URL</label><div class="mono mut" style="font-size:11px;word-break:break-all">${c.webhookUrl}</div></div>
    </div>
    <div style="margin-bottom:16px">
      <h4 style="font-size:13px;font-weight:700;margin-bottom:8px">Recent Events</h4>
      <div class="table-wrap"><table><thead><tr><th>Event</th><th>Time</th><th>Status</th></tr></thead><tbody>
        <tr><td style="font-size:12px">payment.succeeded</td><td class="mut tnum" style="font-size:11.5px">2 min ago</td><td>${pill('good','OK')}</td></tr>
        <tr><td style="font-size:12px">invoice.finalized</td><td class="mut tnum" style="font-size:11.5px">14 min ago</td><td>${pill('good','OK')}</td></tr>
        <tr><td style="font-size:12px">customer.updated</td><td class="mut tnum" style="font-size:11.5px">1h ago</td><td>${pill('good','OK')}</td></tr>
      </tbody></table></div>
    </div>
    <div class="form-actions">
      <button class="btn primary" data-act="toast" data-arg="${name} sync triggered manually">Sync Now</button>
      <button class="btn ghost" data-act="integeventlogs">View Event Log</button>
      <button class="btn ghost" onclick="closeDrawer()">Close</button>
    </div>
  `);
}

function openWebhookDetail(endpoint){
  openDrawer(`Webhook — ${endpoint||'/hooks/billing'}`, `
    <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-bottom:16px">
      <div class="fg" style="grid-column:1/-1"><label>Endpoint URL</label><input class="finput" value="${endpoint||'https://example.com/hooks/billing'}" style="font-family:monospace"></div>
      <div class="fg"><label>Status</label>${pill('good','Active')}</div>
      <div class="fg"><label>Created</label><div class="mut">Jan 15, 2026</div></div>
      <div class="fg"><label>Secret</label><div class="mono mut" style="font-size:12px">whsec_••••••••••••••••</div><button class="btn ghost" style="font-size:11px;margin-top:4px;padding:3px 7px" data-act="rotatekey" data-arg="${endpoint}">Rotate</button></div>
      <div class="fg"><label>Last delivery</label><div class="tnum">2 min ago · 200 OK</div></div>
    </div>
    <h4 style="font-size:13px;font-weight:700;margin-bottom:8px">Subscribed Events</h4>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:16px">
      ${['invoice.finalized','invoice.sent','payment.succeeded','payment.failed','subscription.created','subscription.cancelled','credit.issued','dunning.started'].map(e=>`<label style="display:flex;align-items:center;gap:8px;font-size:12.5px;cursor:pointer"><input type="checkbox" checked> ${e}</label>`).join('')}
    </div>
    <div class="form-actions">
      <button class="btn primary" data-act="toast" data-arg="Webhook saved">Save</button>
      <button class="btn ghost" data-act="toast" data-arg="Test event sent to endpoint">Send Test</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openSDKDocs(lang){
  openDrawer(`${lang||'Node.js'} SDK Documentation`, `
    <div class="val-banner info" style="margin-bottom:14px">${svg(I.api,14)} Documentation opens in a new tab. The SDK reference is hosted at docs.delonix.io.</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${['Node.js / TypeScript','Python','Ruby','PHP','Go','REST API Reference'].map((s,i)=>`<div style="display:flex;align-items:center;gap:12px;padding:10px 12px;border:1px solid var(--border);border-radius:8px;cursor:pointer;background:var(--surface)${lang===s?' border-color:var(--ember);background:var(--ember-glow)':''}" data-act="toast" data-arg="Opening ${s} docs">
        <span style="font-size:18px">${['🟢','🐍','💎','🐘','🔵','📖'][i]}</span>
        <div><div style="font-weight:600;font-size:13px">${s}</div><div class="mut" style="font-size:11.5px">docs.delonix.io/sdk/${s.toLowerCase().replace(/[^a-z]/g,'-')}</div></div>
        <span class="mut" style="margin-left:auto">${svg('<polyline points="9 18 15 12 9 6"/>',14)}</span>
      </div>`).join('')}
    </div>
  `);
}

function openAPIDocs(){
  openSDKDocs('REST API Reference');
}

function openCustomDomain(){
  openDrawer('Custom Domain', `
    <div class="form-grid" style="grid-template-columns:1fr">
      <div class="fg"><label>Custom domain</label><input class="finput" value="billing.yourcompany.com" placeholder="billing.yourcompany.com"></div>
    </div>
    <div style="padding:12px 14px;border:1px solid var(--border);border-radius:8px;margin-top:4px;margin-bottom:14px">
      <div style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:8px">DNS CONFIGURATION REQUIRED</div>
      <div style="display:flex;flex-direction:column;gap:6px;font-size:12px;font-family:monospace">
        <div><span class="mut">Type: </span>CNAME</div>
        <div><span class="mut">Name: </span>billing</div>
        <div><span class="mut">Value: </span>portal.delonix.io</div>
        <div><span class="mut">TTL: </span>3600</div>
      </div>
    </div>
    <div class="val-banner info">${svg(I.check,14)} SSL certificate will be automatically provisioned via Let's Encrypt after DNS propagation (typically 24–48h).</div>
    <div class="form-actions" style="margin-top:14px">
      <button class="btn primary" data-act="toast" data-arg="Custom domain saved — verifying DNS propagation">Save & Verify</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openIntegrationEventLogs(){
  openDrawer('Integration Event Logs', `
    <div class="toolbar" style="margin-bottom:12px">
      <span class="chip">${svg(I.filter,13)} Integration</span>
      <span class="chip">${svg(I.filter,13)} Status</span>
      <div class="spacer"></div>
      <button class="btn ghost" style="font-size:12px" data-act="download" data-arg="csv|Integration Event Log|last 500 events">Export</button>
    </div>
    <div class="table-wrap"><table>
      <thead><tr><th>Event</th><th>Integration</th><th>Time</th><th>HTTP</th><th>Duration</th></tr></thead>
      <tbody>
        ${[['invoice.finalized','NetSuite','2 min ago','200 OK','142ms'],['payment.succeeded','Stripe','4 min ago','200 OK','89ms'],['customer.updated','Salesforce','1h ago','200 OK','210ms'],['invoice.sent','Mailgun','1h ago','200 OK','55ms'],['payment.failed','Stripe','3h ago','200 OK','91ms'],['subscription.created','Salesforce','Jun 27','500 Error','timeout']].map(([e,integ,time,http,dur])=>`<tr>
          <td style="font-size:12px;font-family:monospace">${e}</td>
          <td style="font-size:12.5px">${integ}</td>
          <td class="mut tnum" style="font-size:11.5px">${time}</td>
          <td style="font-size:12px;font-weight:600;color:${http.startsWith('2')?'var(--pos)':'var(--neg)'}">${http}</td>
          <td class="mut tnum" style="font-size:11.5px">${dur}</td>
        </tr>`).join('')}
      </tbody>
    </table></div>
  `);
}

function openAPIKeyCreator(){
  openDrawer('Create API Key', `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Key name</label><input class="finput" placeholder="e.g. Production · Billing Integration" autofocus></div>
      <div class="fg"><label>Access level</label><select class="finput"><option>Read-only</option><option selected>Read + Write</option><option>Admin</option></select></div>
      <div class="fg"><label>Expiry</label><select class="finput"><option>Never</option><option>30 days</option><option selected>1 year</option><option>Custom</option></select></div>
      <div class="fg" style="grid-column:1/-1"><label>Allowed IP ranges (optional)</label><input class="finput" placeholder="e.g. 192.168.1.0/24 — leave blank for any"></div>
    </div>
    <div class="val-banner info" style="margin-top:12px">${svg(I.api,14)} The secret key will only be shown once. Copy it immediately after creation — it cannot be retrieved again.</div>
    <div class="form-actions" style="margin-top:14px">
      <button class="btn primary" data-act="toast" data-arg="API key created — copy it now, it won't be shown again">Create Key</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openRotateKey(keyId){
  openDrawer(`Rotate API Key — ${keyId||'sk_live_••••••'}`, `
    <div class="val-banner error" style="margin-bottom:16px">${svg(I.warning,15)} <strong>Key rotation immediately invalidates the old key.</strong> Update your systems before rotating to avoid downtime.</div>
    <div style="font-size:13px;margin-bottom:14px">A new secret key will be generated. The current key <span class="mono" style="font-size:12px">${keyId||'sk_live_••••••'}</span> will stop working immediately after rotation.</div>
    <div class="form-actions">
      <button class="btn" style="background:var(--warn);color:#1a0e00;padding:9px 18px;border-radius:8px;border:none;cursor:pointer;font-weight:600" data-act="toast" data-arg="API key rotated — new key ready, old key invalidated">Rotate Key</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}




/* ===== STUB-FREE DRAWERS PHASE 3 ===== */
