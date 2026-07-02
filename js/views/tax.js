/* delonix — tax.js */

VIEWS.tax = (v)=>{
  const jurisdictions=[
    ['California','Sales Tax','9.5%','$6,840','$11,640',  'Jul 20','good','Compliant'],
    ['New York','Sales Tax','8.875%','$5,220','$10,890',  'Jul 20','good','Compliant'],
    ['Texas','Sales Tax','6.25%','$3,980','$7,460',      'Jul 20','good','Compliant'],
    ['Florida','Sales Tax','6.0%','$2,870','$5,400',     'Jul 20','good','Compliant'],
    ['Washington','Sales Tax','10.25%','$1,940','$3,210','Jul 20','warn','Review'],
    ['Illinois','Sales Tax','6.25%','$1,620','$2,840',   'Jul 20','good','Compliant'],
    ['Massachusetts','Sales Tax','6.25%','$1,240','$2,080','Jul 20','good','Compliant'],
    ['Colorado','Sales Tax','2.9%','$980','$1,600',      'Jul 20','good','Compliant'],
    ['EU (OSS)','VAT','20.0%','$14,200','$28,400',       'Jul 31','warn','Filing due'],
    ['United Kingdom','VAT','20.0%','$6,800','$13,600',  'Aug 7','good','Compliant'],
    ['Canada','GST','5.0%','$4,100','$8,200',            'Jul 31','warn','Filing due'],
    ['Australia','GST','10.0%','$2,400','$4,800',        'Aug 21','good','Compliant'],
  ];
  const filings=[
    ['California (multi-county)','Sales Tax','Jul 20, 2026','$6,840','warn','Due in 22 days'],
    ['EU VAT OSS','VAT (OSS)','Jul 31, 2026','$14,200','warn','Due in 33 days'],
    ['Canada GST/HST','GST/HST','Jul 31, 2026','$4,100','warn','Due in 33 days'],
    ['New York State','Sales Tax','Jul 20, 2026','$5,220','warn','Due in 22 days'],
    ['United Kingdom','VAT','Aug 7, 2026','$6,800','muted','Due in 40 days'],
    ['Australia','GST','Aug 21, 2026','$2,400','muted','Due in 54 days'],
  ];
  const exemptions=[
    ['Acme Corp','Reseller certificate','CAL-4821-RES','Dec 2026','good','Valid'],
    ['Pinnacle SaaS','501(c)(3) nonprofit','EXT-5512-NP','Apr 2027','good','Valid'],
    ['CloudBase Inc','Government entity','GOV-7208-CA','Permanent','good','Valid'],
    ['Stellar Systems','Reseller certificate','TX-9931-RES','Aug 2026','warn','Expiring'],
    ['Summit Digital','Edu institution','EDU-3347-NY','Jun 2027','good','Valid'],
    ['DataVault','Government contract','GOV-4481-US','Permanent','good','Valid'],
    ['Apex Systems','Reseller certificate','WA-2204-RES','Nov 2026','good','Valid'],
    ['Fulcrum Labs','Exempt — SaaS B2B EU','EU-VAT-REG','Ongoing','good','Valid'],
  ];
  v.appendChild(el(`<div class="view">
    ${pageHead('Tax &amp; compliance','Automated tax determination, nexus tracking, exemption management and filing calendar.',
      `<button class="btn ghost" data-act="taxconfig">${svg(I.settings,15)} Tax settings</button>
       <button class="btn primary" data-act="download" data-arg="zip|Tax Filing Package|Q2 2026 · 3 entities">${svg(I.download,15)} Export filings</button>`)}
    <div class="grid kpis" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
      ${kpi('Tax collected (MTD)','$38,400',jurisdictions.length+' jurisdictions active',{accent:true,trend:4.2})}
      ${kpi('Jurisdictions',''+jurisdictions.length,'US · EU · UK · CA · AU',{})}
      ${kpi('Nexus states','8','economic nexus triggered',{})}
      ${kpi('Next filing','Jul 20','CA + NY sales tax',{})}
    </div>
    <div class="sec-title">Tax by jurisdiction</div>
    <div class="card" style="padding:0">
      <div class="table-wrap" style="border:none;margin:0">
        <table><thead><tr>
          <th>Jurisdiction</th><th>Tax type</th><th class="num">Rate</th>
          <th class="num">Taxable rev.</th><th class="num">Tax amount</th>
          <th>Next filing</th><th>Status</th>
        </tr></thead>
        <tbody>${jurisdictions.map(r=>`<tr>
          <td class="nm">${r[0]}</td><td>${r[1]}</td><td class="num">${r[2]}</td>
          <td class="num">${r[3]}</td><td class="num tnum">${r[4]}</td>
          <td class="mut">${r[5]}</td><td>${pill(r[6],r[7])}</td>
        </tr>`).join('')}</tbody></table>
      </div>
    </div>
    <div class="row" style="margin-top:0">
      <div>
        <div class="sec-title">Upcoming filings</div>
        <div class="card" style="padding:0">
          <div class="table-wrap" style="border:none;margin:0">
            <table><thead><tr>
              <th>Jurisdiction</th><th>Type</th><th>Due</th>
              <th class="num">Est. amount</th><th>Status</th>
            </tr></thead>
            <tbody>${filings.map(f=>`<tr>
              <td class="nm">${f[0]}</td><td class="mut">${f[1]}</td>
              <td class="mut">${f[2]}</td><td class="num tnum">${f[3]}</td>
              <td>${pill(f[4],f[5])}</td>
            </tr>`).join('')}</tbody></table>
          </div>
        </div>
      </div>
      <div>
        <div class="sec-title">Exemption certificates</div>
        <div class="card" style="padding:0">
          <div class="table-wrap" style="border:none;margin:0">
            <table><thead><tr>
              <th>Customer</th><th>Type</th><th>Certificate #</th>
              <th>Expires</th><th>Status</th>
            </tr></thead>
            <tbody>${exemptions.map(e=>`<tr>
              <td class="nm">${e[0]}</td><td class="mut">${e[1]}</td>
              <td class="mono mut" style="font-size:11px">${e[2]}</td>
              <td class="mut">${e[3]}</td><td>${pill(e[4],e[5])}</td>
            </tr>`).join('')}</tbody></table>
          </div>
        </div>
        <div class="note info" style="margin-top:12px">${svg(I.tax,15)}<div>E-invoicing mandates (Italy SdI, India IRP, France PPF) are generated and cleared automatically per jurisdiction. Certificates are validated against state databases on upload.</div></div>
      </div>
    </div>
  </div>`));
};

/* ---------- Reports ---------- */
