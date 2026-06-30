/* delonix — close.js */

VIEWS.close = (v)=>{
  v.appendChild(el(`<div class="view">
    ${pageHead('Period Close',
      'Month-end close · June 2026 · Delonix Inc',
      `<button class="btn ghost" data-act="postjournals">${svg(I.settings,15)} Close calendar</button>
      <button class="btn primary" data-act="signoffclose">${svg(I.check,15)} Sign Off Period</button>`
    )}

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-bottom:24px">
      ${kpi('Tasks Complete','17 / 20','June 2026',{accent:true})}
      ${kpi('Period','Jun 2026','closes Jun 30',{})}
      ${kpi('Days Remaining','2','until hard close',{trend:-2})}
      ${kpi('Open Issues','3','blocking sign-off',{})}
    </div>

    <div style="margin-bottom:16px">
      <div class="card panel">
        <div class="panel-head"><h3>Close progress</h3><span class="sub">June 2026 · 17 of 20 tasks complete</span></div>
        <div style="height:8px;border-radius:4px;background:var(--surface-3);overflow:hidden;margin-bottom:6px">
          <div style="height:100%;width:85%;border-radius:4px;background:var(--good)"></div>
        </div>
        <div style="font-size:11px;color:var(--text-3);letter-spacing:.03em;margin-bottom:16px">85% complete — 3 tasks outstanding</div>
        <div class="table-wrap" style="border:none">
          <table>
            <thead><tr><th>#</th><th>Task</th><th>Owner</th><th>Due</th><th>Status</th><th>Notes</th></tr></thead>
            <tbody>
              <tr>
                <td class="mut tnum">01</td>
                <td class="nm">Lock AR sub-ledger</td>
                <td class="mut">D. Cho</td>
                <td class="mut tnum">Jun 28</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">Completed Jun 28 09:14</td>
              </tr>
              <tr>
                <td class="mut tnum">02</td>
                <td class="nm">Post cash receipts</td>
                <td class="mut">D. Cho</td>
                <td class="mut tnum">Jun 28</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">172 receipts posted</td>
              </tr>
              <tr>
                <td class="mut tnum">03</td>
                <td class="nm">Revenue recognition run</td>
                <td class="mut">System</td>
                <td class="mut tnum">Jun 28</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">ASC 606 automated</td>
              </tr>
              <tr>
                <td class="mut tnum">04</td>
                <td class="nm">Deferred revenue schedule</td>
                <td class="mut">M. Reyes</td>
                <td class="mut tnum">Jun 28</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">$218,400 deferred</td>
              </tr>
              <tr>
                <td class="mut tnum">05</td>
                <td class="nm">Bank reconciliation — USD</td>
                <td class="mut">P. Anand</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">Matched Jun 27 stmt</td>
              </tr>
              <tr>
                <td class="mut tnum">06</td>
                <td class="nm">Bank reconciliation — EUR</td>
                <td class="mut">P. Anand</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">€42,100 reconciled</td>
              </tr>
              <tr>
                <td class="mut tnum">07</td>
                <td class="nm">Bank reconciliation — SGD</td>
                <td class="mut">P. Anand</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('warn','In progress')}</td>
                <td class="mut" style="font-size:11px">Awaiting Jun 27 stmt</td>
              </tr>
              <tr>
                <td class="mut tnum">08</td>
                <td class="nm">Intercompany eliminations</td>
                <td class="mut">M. Reyes</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">3 entities reconciled</td>
              </tr>
              <tr>
                <td class="mut tnum">09</td>
                <td class="nm">Prepaid expense amortization</td>
                <td class="mut">P. Anand</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">$14,200 amortized</td>
              </tr>
              <tr>
                <td class="mut tnum">10</td>
                <td class="nm">Fixed asset depreciation</td>
                <td class="mut">System</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">Auto-posted</td>
              </tr>
              <tr>
                <td class="mut tnum">11</td>
                <td class="nm">Accrued liabilities review</td>
                <td class="mut">M. Reyes</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">$87,300 accrued</td>
              </tr>
              <tr>
                <td class="mut tnum">12</td>
                <td class="nm">Payroll accrual</td>
                <td class="mut">P. Anand</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">Jun 16–30 accrued</td>
              </tr>
              <tr>
                <td class="mut tnum">13</td>
                <td class="nm">Commission accrual</td>
                <td class="mut">M. Reyes</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">$22,400 accrued</td>
              </tr>
              <tr>
                <td class="mut tnum">14</td>
                <td class="nm">Tax provision — federal</td>
                <td class="mut">P. Anand</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('warn','In progress')}</td>
                <td class="mut" style="font-size:11px">Pending Q2 calc</td>
              </tr>
              <tr>
                <td class="mut tnum">15</td>
                <td class="nm">Sales tax filing — US</td>
                <td class="mut">System</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">Auto-filed via Avalara</td>
              </tr>
              <tr>
                <td class="mut tnum">16</td>
                <td class="nm">VAT return — EU</td>
                <td class="mut">P. Anand</td>
                <td class="mut tnum">Jun 29</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">Filed Jun 27</td>
              </tr>
              <tr>
                <td class="mut tnum">17</td>
                <td class="nm">GL trial balance review</td>
                <td class="mut">M. Reyes</td>
                <td class="mut tnum">Jun 30</td>
                <td>${pill('good','Done')}</td>
                <td class="mut" style="font-size:11px">Zero difference</td>
              </tr>
              <tr>
                <td class="mut tnum">18</td>
                <td class="nm">Financial statements draft</td>
                <td class="mut">M. Reyes</td>
                <td class="mut tnum">Jun 30</td>
                <td>${pill('crit','Blocked')}</td>
                <td class="mut" style="font-size:11px">Awaiting tasks 07, 14</td>
              </tr>
              <tr>
                <td class="mut tnum">19</td>
                <td class="nm">CFO review &amp; sign-off</td>
                <td class="mut">S. Chen</td>
                <td class="mut tnum">Jun 30</td>
                <td>${pill('muted','Pending')}</td>
                <td class="mut" style="font-size:11px">Not started</td>
              </tr>
              <tr>
                <td class="mut tnum">20</td>
                <td class="nm">Period lock &amp; archive</td>
                <td class="mut">System</td>
                <td class="mut tnum">Jun 30</td>
                <td>${pill('muted','Pending')}</td>
                <td class="mut" style="font-size:11px">Auto on CFO sign-off</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="two-col" style="margin-bottom:16px;align-items:start">
      <div>
        <div class="card panel">
          <div class="panel-head"><h3>GL reconciliation summary</h3><span class="sub">Key account balances · June 28, 2026</span></div>
          <div class="table-wrap" style="border:none">
            <table>
              <thead><tr><th>Account</th><th class="num">GL Balance</th><th class="num">Sub-ledger</th><th class="num">Difference</th><th>Status</th></tr></thead>
              <tbody>
                <tr>
                  <td class="nm">Cash &amp; equivalents</td>
                  <td class="num tnum">$1,842,300</td>
                  <td class="num tnum">$1,842,300</td>
                  <td class="num tnum" style="color:var(--good)">$0</td>
                  <td>${pill('good','Reconciled')}</td>
                </tr>
                <tr>
                  <td class="nm">Accounts receivable</td>
                  <td class="num tnum">$157,800</td>
                  <td class="num tnum">$157,800</td>
                  <td class="num tnum" style="color:var(--good)">$0</td>
                  <td>${pill('good','Reconciled')}</td>
                </tr>
                <tr>
                  <td class="nm">Deferred revenue</td>
                  <td class="num tnum">$218,400</td>
                  <td class="num tnum">$218,400</td>
                  <td class="num tnum" style="color:var(--good)">$0</td>
                  <td>${pill('good','Reconciled')}</td>
                </tr>
                <tr>
                  <td class="nm">Prepaid expenses</td>
                  <td class="num tnum">$62,100</td>
                  <td class="num tnum">$62,100</td>
                  <td class="num tnum" style="color:var(--good)">$0</td>
                  <td>${pill('good','Reconciled')}</td>
                </tr>
                <tr>
                  <td class="nm">Accrued liabilities</td>
                  <td class="num tnum">$87,300</td>
                  <td class="num tnum">$87,300</td>
                  <td class="num tnum" style="color:var(--good)">$0</td>
                  <td>${pill('good','Reconciled')}</td>
                </tr>
                <tr>
                  <td class="nm">SGD bank account</td>
                  <td class="num tnum">S$84,200</td>
                  <td class="num tnum">—</td>
                  <td class="num tnum" style="color:var(--warn)">Pending</td>
                  <td>${pill('warn','In progress')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-head"><h3>Sign-off chain</h3><span class="sub">Required approvers for June 2026</span></div>
          <div style="display:flex;flex-direction:column;gap:12px;padding:4px 0">
            <div style="display:flex;align-items:center;gap:12px">
              <div style="width:32px;height:32px;border-radius:50%;background:var(--good);display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700;flex-shrink:0">DA</div>
              <div style="flex:1">
                <div style="font-weight:600;font-size:13px;color:var(--text-1)">D. Cho — AR Lead</div>
                <div style="font-size:11px;color:var(--text-3)">AR sub-ledger locked · Jun 28 09:14</div>
              </div>
              ${pill('good','Signed')}
            </div>
            <div style="display:flex;align-items:center;gap:12px">
              <div style="width:32px;height:32px;border-radius:50%;background:var(--good);display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700;flex-shrink:0">PA</div>
              <div style="flex:1">
                <div style="font-weight:600;font-size:13px;color:var(--text-1)">P. Anand — Controller</div>
                <div style="font-size:11px;color:var(--text-3)">Bank recs &amp; tax filings complete (1 pending)</div>
              </div>
              ${pill('warn','Partial')}
            </div>
            <div style="display:flex;align-items:center;gap:12px">
              <div style="width:32px;height:32px;border-radius:50%;background:var(--good);display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700;flex-shrink:0">MR</div>
              <div style="flex:1">
                <div style="font-weight:600;font-size:13px;color:var(--text-1)">M. Reyes — Finance Director</div>
                <div style="font-size:11px;color:var(--text-3)">GL review done · financial statements pending</div>
              </div>
              ${pill('warn','Partial')}
            </div>
            <div style="display:flex;align-items:center;gap:12px">
              <div style="width:32px;height:32px;border-radius:50%;background:var(--surface-3);display:flex;align-items:center;justify-content:center;color:var(--text-3);font-size:12px;font-weight:700;flex-shrink:0">SC</div>
              <div style="flex:1">
                <div style="font-weight:600;font-size:13px;color:var(--text-1)">S. Chen — CFO</div>
                <div style="font-size:11px;color:var(--text-3)">Awaiting financials draft from M. Reyes</div>
              </div>
              ${pill('muted','Pending')}
            </div>
          </div>
        </div>

        <div class="card panel">
          <div class="panel-head"><h3>Open issues</h3><span class="sub">Blocking close completion</span></div>
          <div style="display:flex;flex-direction:column;gap:10px;padding:4px 0">
            <div style="padding:10px 12px;border-radius:8px;background:var(--surface-2);border-left:3px solid var(--warn)">
              <div style="font-weight:600;font-size:12px;color:var(--text-1);margin-bottom:3px">SGD bank statement not received</div>
              <div style="font-size:11px;color:var(--text-3)">DBS Bank Singapore · Expected Jun 27 · Owner: P. Anand</div>
            </div>
            <div style="padding:10px 12px;border-radius:8px;background:var(--surface-2);border-left:3px solid var(--warn)">
              <div style="font-weight:600;font-size:12px;color:var(--text-1);margin-bottom:3px">Q2 federal tax provision pending</div>
              <div style="font-size:11px;color:var(--text-3)">Awaiting external tax advisor estimate · Owner: P. Anand</div>
            </div>
            <div style="padding:10px 12px;border-radius:8px;background:var(--surface-2);border-left:3px solid var(--crit)">
              <div style="font-weight:600;font-size:12px;color:var(--text-1);margin-bottom:3px">Financial statements draft blocked</div>
              <div style="font-size:11px;color:var(--text-3)">Depends on SGD bank rec &amp; tax provision · Owner: M. Reyes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`));
};


/* ---------- Controls & Audit ---------- */
