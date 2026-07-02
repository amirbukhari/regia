/* delonix — finance.js */

function openPostJournals(){
  openDrawer('Post to General Ledger',`
    <div class="confirm-panel">
      <div class="confirm-title">${svg(I.warning,14)} Irreversible action</div>
      <div class="confirm-body">This will post <b>847 journal entries</b> to NetSuite for the June 2026 period. Once posted, entries cannot be reversed without a manual correcting journal.</div>
    </div>
    <div class="card" style="margin:16px 0;padding:14px 16px">
      <div class="inv-sum-row"><span>Revenue recognition entries</span><span class="tnum">412</span></div>
      <div class="inv-sum-row"><span>Deferred revenue releases</span><span class="tnum">218</span></div>
      <div class="inv-sum-row"><span>Accounts receivable</span><span class="tnum">187</span></div>
      <div class="inv-sum-row"><span>Manual adjustments</span><span class="tnum">30</span></div>
      <div class="inv-sum-row total"><span>Total journal entries</span><span class="tnum">847</span></div>
    </div>
    <div class="form-group"><label class="form-label">GL period</label>
      <select class="form-select"><option>June 2026 (current)</option></select></div>
    <div style="margin-top:12px;display:flex;align-items:flex-start;gap:8px">
      <input type="checkbox" id="glConfirm" style="margin-top:3px;accent-color:var(--ember)">
      <label for="glConfirm" style="font-size:12px;color:var(--text-2);cursor:pointer">I confirm that all reconciliations are complete and I am authorized to post to the general ledger for June 2026.</label>
    </div>
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn primary" style="background:var(--neg)" data-act="acctexport" data-arg="BATCH-2026-06-28">Post to GL</button>
    </div>`);
}

/* ── Close Sign-off ── */

function openSignOff(){
  openDrawer('Sign Off — June 2026 Close',`
    <div class="card" style="margin-bottom:16px;padding:14px 16px">
      <div class="inv-sum-row"><span>Tasks complete</span><span class="tnum" style="color:var(--pos);font-weight:700">20 / 20</span></div>
      <div class="inv-sum-row"><span>Controller sign-off</span><span>${pill('good','Approved')} <span class="mut" style="font-size:11px">Jun 27 · R. Chen</span></span></div>
      <div class="inv-sum-row"><span>CFO sign-off</span><span>${pill('warn','Pending')}</span></div>
      <div class="inv-sum-row"><span>Journals posted</span><span>${pill('good','847 entries')}</span></div>
    </div>
    <div class="form-section-title">Confirm the following before signing</div>
    <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:18px">
      <label style="display:flex;gap:8px;align-items:flex-start;cursor:pointer;font-size:13px;color:var(--text-2)">
        <input type="checkbox" style="margin-top:2px;accent-color:var(--ember)">
        All invoices for the period have been reviewed and approved</label>
      <label style="display:flex;gap:8px;align-items:flex-start;cursor:pointer;font-size:13px;color:var(--text-2)">
        <input type="checkbox" style="margin-top:2px;accent-color:var(--ember)">
        Revenue recognition schedule has been validated against contracts</label>
      <label style="display:flex;gap:8px;align-items:flex-start;cursor:pointer;font-size:13px;color:var(--text-2)">
        <input type="checkbox" style="margin-top:2px;accent-color:var(--ember)">
        Bank reconciliation is complete and cash position is confirmed</label>
    </div>
    <div class="form-group"><label class="form-label">Your name (e-signature)</label>
      <input class="form-input" placeholder="Type your full name to sign"></div>
    <div class="form-group" style="margin-top:10px"><label class="form-label">Sign-off date</label>
      <input class="form-input" type="date" value="2026-06-28"></div>
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn primary" data-act="finalizeperiod">Submit sign-off</button>
    </div>`);
}

/* ── Report Builder ── */

function openAccountingExport(batchId){
  openDrawer('Accounting Export — ' + (batchId||'BATCH-2026-06-28'), `
    <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-bottom:16px">
      <div class="fg"><label>Batch ID</label><div class="mono">BATCH-2026-06-28</div></div>
      <div class="fg"><label>Accounting System</label><div>NetSuite-US</div></div>
      <div class="fg"><label>Legal Entity</label><div>Delonix Holdings LLC</div></div>
      <div class="fg"><label>Billing Period</label><div>June 2026</div></div>
      <div class="fg"><label>Status</label><div>${pill('good','Exported')}</div></div>
      <div class="fg"><label>Exported At</label><div class="tnum">Jun 28 · 02:14 AM</div></div>
    </div>
    <div class="table-wrap" style="margin-bottom:16px"><table>
      <thead><tr><th>Type</th><th class="num">Count</th><th class="num">Total</th><th>GL Journal</th></tr></thead>
      <tbody>
        <tr><td>Invoices</td><td class="num tnum">14</td><td class="num tnum">$487,200</td><td class="mono mut" style="font-size:11.5px">JNL-2026-0614</td></tr>
        <tr><td>Credits</td><td class="num tnum">3</td><td class="num tnum">−$8,500</td><td class="mono mut" style="font-size:11.5px">JNL-2026-0615</td></tr>
        <tr><td>Payments</td><td class="num tnum">11</td><td class="num tnum">$312,450</td><td class="mono mut" style="font-size:11.5px">JNL-2026-0616</td></tr>
      </tbody>
    </table></div>
    <div style="font-size:13px;font-weight:700;margin-bottom:8px">Journal Summary</div>
    <div class="diff-pair">
      <div class="diff-col after"><div class="diff-col-label">Total debits</div><div style="font-size:15px;font-weight:700">$799,650</div></div>
      <div class="diff-col before"><div class="diff-col-label">Total credits</div><div style="font-size:15px;font-weight:700">$799,650</div></div>
    </div>
    <div class="mut" style="font-size:12px;margin-top:10px">Balanced ✓ — no reconciliation errors</div>
    <div class="form-actions" style="margin-top:16px"><button class="btn ghost" data-act="download" data-arg="xlsx|Accounting Export|BATCH-2026-06-28">Download Journal</button><button class="btn ghost" onclick="closeDrawer()">Close</button></div>
  `);
}




/* ===== STUB-FREE DRAWERS PHASE 2 ===== */

function openGLMappingEditor(buId){
  const bu = BUS.find(b=>b.id===buId)||BUS[0];
  openDrawer(`GL Mappings — ${bu.name}`, `
    <div class="mut" style="font-size:12.5px;margin-bottom:16px">GL account assignments control how revenue, AR, and tax entries are posted to ${bu.glDest}. Changes apply to new transactions only.</div>
    <div class="table-wrap"><table>
      <thead><tr><th>Revenue Category</th><th>GL Account</th><th>Department</th><th>Project Code</th></tr></thead>
      <tbody>
        ${[
          ['Subscription Revenue','4000 · SaaS Revenue','—','—'],
          ['Overage / Usage Revenue','4010 · Usage Revenue','—','—'],
          ['Professional Services','4020 · Services Revenue','PS Dept','—'],
          ['Deferred Revenue (current)','2800 · Deferred Rev.','—','—'],
          ['Deferred Revenue (long-term)','2810 · LT Deferred Rev.','—','—'],
          ['Accounts Receivable','1200 · AR Trade','—','—'],
          ['Revenue Contra (discounts)','4090 · Revenue Contra','—','—'],
          ['Tax Payable','2100 · Sales Tax Payable','—','—'],
          ['Intercompany AR','1250 · IC Receivable','—','—'],
        ].map(([cat,gl,dept,proj])=>`<tr>
          <td style="font-size:13px">${cat}</td>
          <td><input class="finput" value="${gl}" style="font-size:12px;font-family:monospace;padding:4px 8px"></td>
          <td><input class="finput" value="${dept}" style="font-size:12px;padding:4px 8px"></td>
          <td><input class="finput" value="${proj}" style="font-size:12px;padding:4px 8px"></td>
        </tr>`).join('')}
      </tbody>
    </table></div>
    <div class="form-actions" style="margin-top:12px">
      <button class="btn primary" data-act="toast" data-arg="GL mappings saved — effective for next export batch">Save Mappings</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openTreasurySweep(arg){
  const parts=(arg||'EUR|314000|1.0842').split('|');
  const currency=parts[0], amount=parts[1]||'314000', rate=parts[2]||'1.0842';
  const usd = Math.round(parseFloat(amount)*parseFloat(rate)).toLocaleString();
  openDrawer(`FX Sweep — ${currency} → USD`, `
    <div class="grid" style="grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px">
      ${kpi('Amount','€'+parseInt(amount).toLocaleString(),'to convert',{accent:true})}
      ${kpi('FX Rate',rate,'EUR/USD mid-market',{})}
      ${kpi('USD Equivalent','$'+usd,'estimated proceeds',{})}
    </div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg"><label>From account</label><select class="finput"><option>Delonix EU B.V. · EUR Operating</option></select></div>
      <div class="fg"><label>To account</label><select class="finput"><option>Delonix Holdings LLC · USD Operating</option></select></div>
      <div class="fg"><label>Amount</label><input class="finput" value="${parseInt(amount).toLocaleString()}" type="number"></div>
      <div class="fg"><label>Value date</label><select class="finput"><option selected>T+1 (next business day)</option><option>T+2</option><option>Spot</option></select></div>
    </div>
    <div class="val-banner warn" style="margin-top:12px">${svg(I.warning,14)} FX rate is indicative. The executed rate will be confirmed by your banking partner at the time of settlement. Rate lock expires in 4 hours.</div>
    <div class="form-actions" style="margin-top:14px">
      <button class="btn primary" data-act="toast" data-arg="FX sweep initiated — €${parseInt(amount).toLocaleString()} converting at ${rate} · settles T+1">Initiate Sweep</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openICEliminations(){
  openDrawer('Intercompany Eliminations — June 2026', `
    <div class="val-banner info" style="margin-bottom:14px">${svg(I.globe,14)} Intercompany eliminations remove transactions between entities that would double-count revenue or expenses in consolidated statements.</div>
    <div class="table-wrap" style="margin-bottom:16px"><table>
      <thead><tr><th>Entity (Dr)</th><th>Entity (Cr)</th><th>Account</th><th class="num">Amount</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td>Holdings LLC</td><td>Platform Inc.</td><td class="mono mut" style="font-size:11.5px">1250 · IC Receivable</td><td class="num tnum">$48,200</td><td>${pill('good','Matched')}</td></tr>
        <tr><td>Holdings LLC</td><td>EU B.V.</td><td class="mono mut" style="font-size:11.5px">1250 · IC Receivable</td><td class="num tnum">$36,000</td><td>${pill('good','Matched')}</td></tr>
        <tr><td>Platform Inc.</td><td>Holdings LLC</td><td class="mono mut" style="font-size:11.5px">2150 · IC Payable</td><td class="num tnum">$48,200</td><td>${pill('good','Matched')}</td></tr>
        <tr><td>EU B.V. (EUR)</td><td>Holdings LLC</td><td class="mono mut" style="font-size:11.5px">2150 · IC Payable</td><td class="num tnum">$36,000</td><td>${pill('warn','FX adj. pending')}</td></tr>
      </tbody>
    </table></div>
    <div style="padding:10px 14px;border:1px solid var(--border);border-radius:8px;font-size:13px">
      <div style="font-weight:700;margin-bottom:4px">Net elimination: −$84,200</div>
      <div class="mut" style="font-size:12px">Applied to consolidated revenue before external reporting. FX adjustment for EU B.V. will post after rate confirmation.</div>
    </div>
    <div class="form-actions" style="margin-top:14px">
      <button class="btn primary" data-act="toast" data-arg="Intercompany eliminations posted — $84,200 eliminated across 3 entity pairs">Post Eliminations</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openConsolidationRun(){
  openDrawer('Run Consolidation — June 2026', `
    <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-bottom:14px">
      <div class="fg"><label>Period</label><select class="finput"><option selected>June 2026</option><option>May 2026</option><option>Q2 2026</option></select></div>
      <div class="fg"><label>Scope</label><select class="finput"><option selected>All entities (4)</option><option>US only (2)</option><option>EU only (1)</option></select></div>
      <div class="fg"><label>FX rates</label><select class="finput"><option selected>ECB closing rates · Jun 28</option><option>Average rates · June 2026</option><option>Custom override</option></select></div>
      <div class="fg"><label>Include IC eliminations</label><select class="finput"><option selected>Yes — auto-detect</option><option>Yes — manual review first</option><option>No</option></select></div>
    </div>
    <div style="padding:12px 14px;border:1px solid var(--border);border-radius:8px;margin-bottom:14px">
      <div style="font-size:12px;font-weight:700;margin-bottom:8px;color:var(--text-2)">PRE-FLIGHT CHECKS</div>
      <div style="display:flex;flex-direction:column;gap:5px;font-size:12.5px">
        <div style="color:var(--pos)">${svg(I.check,13)} All 4 entities have June 2026 trial balances</div>
        <div style="color:var(--pos)">${svg(I.check,13)} Intercompany transactions matched ($84,200)</div>
        <div style="color:var(--pos)">${svg(I.check,13)} EUR/USD rate loaded (1.0842 · ECB Jun 28)</div>
        <div style="color:var(--warn)">${svg(I.warning,13)} EU B.V. FX adjustment not yet confirmed — will use indicative rate</div>
      </div>
    </div>
    <div class="form-actions">
      <button class="btn primary" data-act="toast" data-arg="Consolidation run started — estimated 2 minutes · 4 entities">Run Consolidation</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}
