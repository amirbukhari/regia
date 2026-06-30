/* delonix — controls.js */

VIEWS.controls = (v)=>{
  const soc2=[
    ['Security','CC1–CC9','47','50','good'],
    ['Availability','A1','9','9','good'],
    ['Processing Integrity','PI1','6','7','warn'],
    ['Confidentiality','C1–C2','8','8','good'],
    ['Privacy','P1–P8','11','11','good'],
  ];
  const auditLog=[
    ['2026-06-28 14:31:04','a.bukhari@delonix.com','invoice_approved','INV-2026-1042','104.21.88.14','good','Success'],
    ['2026-06-28 13:58:17','system','payment_captured','PAY-88241 · $96,400','—','good','Success'],
    ['2026-06-28 11:22:43','m.reyes@delonix.com','export_generated','AR aging report Q2','67.44.120.9','good','Success'],
    ['2026-06-28 10:05:31','d.cho@delonix.com','user_invited','sarah.kim@delonix.com','67.44.120.9','good','Success'],
    ['2026-06-27 16:44:12','a.bukhari@delonix.com','settings_changed','dunning.retry_schedule','104.21.88.14','warn','Changed'],
    ['2026-06-27 14:19:05','system','payment_captured','PAY-88240 · $48,200','—','good','Success'],
    ['2026-06-27 09:02:51','p.anand@delonix.com','login','console.delonix.com','185.42.11.87','good','Success'],
    ['2026-06-26 17:33:28','m.reyes@delonix.com','refund_issued','REF-2026-019 · $1,400','67.44.120.9','good','Success'],
    ['2026-06-26 15:10:02','d.cho@delonix.com','invoice_approved','INV-2026-1039','67.44.120.9','good','Success'],
    ['2026-06-26 12:44:17','system','export_generated','SOC 2 evidence pack','—','good','Success'],
    ['2026-06-25 18:08:54','a.bukhari@delonix.com','login','console.delonix.com','104.21.88.14','good','Success'],
    ['2026-06-25 11:31:22','p.anand@delonix.com','settings_changed','tax.nexus_states','185.42.11.87','warn','Changed'],
    ['2026-06-24 16:02:08','system','payment_captured','PAY-88236 · $41,300','—','good','Success'],
    ['2026-06-24 09:15:44','m.reyes@delonix.com','invoice_approved','INV-2026-1036','67.44.120.9','good','Success'],
    ['2026-06-23 14:27:33','d.cho@delonix.com','login','console.delonix.com','67.44.120.9','good','Success'],
  ];
  const findings=[
    ['High','Access review overdue — 4 stale user accounts not recertified since Q1','P. Anand','Jul 5, 2026','crit'],
    ['Medium','MFA not enforced for 2 API-only service accounts','D. Cho','Jul 15, 2026','warn'],
    ['Low','Webhook signing key rotation last performed 182 days ago (policy: 90d)','A. Bukhari','Jul 31, 2026','muted'],
  ];
  v.appendChild(el(`<div class="view">
    ${pageHead('Controls &amp; audit','SOC 2, access controls, and the immutable audit log — built for SOX compliance, external audit and due diligence.',
      `<button class="btn ghost" data-act="download" data-arg="zip|Evidence Pack|23 control documents · 847 transaction samples">${svg(I.download,15)} Evidence pack</button>
       <button class="btn primary" data-act="audithistory" data-arg="Controls:SOC2-2025-11">View certificates</button>`)}
    <div class="grid kpis" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
      ${kpi('Open issues','3','1 High · 1 Med · 1 Low',{accent:true})}
      ${kpi('Controls passing','47/50','94% effective rate',{trend:2})}
      ${kpi('Last audit','May 2026','SOC 2 Type II',{})}
      ${kpi('Risk score','Low','no critical findings',{})}
    </div>
    <div class="row">
      <div>
        <div class="sec-title">SOC 2 control categories</div>
        <div class="card" style="padding:0">
          <div class="table-wrap" style="border:none;margin:0">
            <table><thead><tr>
              <th>Category</th><th>Criteria</th>
              <th class="num">Passing</th><th class="num">Total</th><th>Status</th>
            </tr></thead>
            <tbody>${soc2.map(s=>{
              const pct=Math.round(parseInt(s[2])/parseInt(s[3])*100);
              return `<tr>
                <td class="nm">${s[0]}</td><td class="mono mut" style="font-size:11px">${s[1]}</td>
                <td class="num">${s[2]}</td><td class="num">${s[3]}</td>
                <td>${pill(s[4], pct===100?'Passing':'Review')}</td>
              </tr>`;
            }).join('')}</tbody></table>
          </div>
        </div>
        <div class="sec-title">Open findings</div>
        <div class="card" style="padding:0">
          <div class="table-wrap" style="border:none;margin:0">
            <table><thead><tr>
              <th>Severity</th><th>Description</th><th>Owner</th><th>Due</th>
            </tr></thead>
            <tbody>${findings.map(f=>`<tr>
              <td>${pill(f[4],f[0])}</td>
              <td style="max-width:280px;white-space:normal;line-height:1.45;font-size:12.5px">${f[1]}</td>
              <td class="mut">${f[2]}</td>
              <td class="mut">${f[3]}</td>
            </tr>`).join('')}</tbody></table>
          </div>
        </div>
      </div>
      <div>
        <div class="sec-title">Recent audit events</div>
        <div class="card" style="padding:0">
          <div class="table-wrap" style="border:none;margin:0">
            <table><thead><tr>
              <th>Timestamp</th><th>User</th><th>Action</th>
              <th>Resource</th><th>IP</th><th>Result</th>
            </tr></thead>
            <tbody>${auditLog.map(e=>`<tr>
              <td class="mono mut" style="font-size:11px;white-space:nowrap">${e[0]}</td>
              <td class="mut" style="font-size:11.5px;white-space:nowrap">${e[1]}</td>
              <td><span class="mono" style="font-size:11px;color:var(--text-2)">${e[2]}</span></td>
              <td class="mut" style="font-size:11.5px">${e[3]}</td>
              <td class="mono mut" style="font-size:10.5px">${e[4]}</td>
              <td>${pill(e[5],e[6])}</td>
            </tr>`).join('')}</tbody></table>
          </div>
        </div>
      </div>
    </div>
  </div>`));
};

/* ---------- A/R & Cash Application ---------- */
