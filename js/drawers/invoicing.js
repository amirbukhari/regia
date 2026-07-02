/* delonix — invoicing.js */

function openNewInvoice(){
  openDrawer('New Invoice',`
    <div class="form-section">
      <div class="form-row"><div class="form-group"><label class="form-label">Customer</label>
        <select class="form-select" id="ni_customer"><option value="">— select —</option>${custOpts()}</select></div>
        <div class="form-group" style="max-width:140px"><label class="form-label">Invoice date</label>
        <input class="form-input" type="date" value="2026-06-28"></div>
        <div class="form-group" style="max-width:140px"><label class="form-label">Due date</label>
        <input class="form-input" type="date" value="2026-07-28"></div></div>
      <div class="form-row"><div class="form-group"><label class="form-label">PO / Reference</label>
        <input class="form-input" placeholder="Optional"></div>
        <div class="form-group"><label class="form-label">Payment terms</label>
        <select class="form-select"><option>Net 30</option><option>Net 60</option><option>Net 90</option><option>Due on receipt</option></select></div></div>
    </div>
    <div class="form-section">
      <div class="form-section-title">Line items</div>
      <div style="display:grid;grid-template-columns:1fr 60px 90px 80px 28px;gap:8px;margin-bottom:6px">
        <span class="form-label">Description</span><span class="form-label">Qty</span>
        <span class="form-label">Unit price</span><span class="form-label">Total</span><span></span></div>
      <div id="lineItems">
        <div class="line-item-row"><input class="form-input" placeholder="Platform subscription — Business plan" value="Platform subscription — Business plan">
          <input class="form-input" type="number" value="1"><input class="form-input" type="number" value="199.00">
          <span class="line-item-total">$199.00</span><button class="li-del" data-act="toast" data-arg="Line item removed">×</button></div>
        <div class="line-item-row"><input class="form-input" placeholder="Additional seats (×5)" value="Additional seats (×5)">
          <input class="form-input" type="number" value="5"><input class="form-input" type="number" value="15.00">
          <span class="line-item-total">$75.00</span><button class="li-del" data-act="toast" data-arg="Line item removed">×</button></div>
        <div class="line-item-row"><input class="form-input" placeholder="Onboarding & setup fee" value="Onboarding & setup fee">
          <input class="form-input" type="number" value="1"><input class="form-input" type="number" value="500.00">
          <span class="line-item-total">$500.00</span><button class="li-del" data-act="toast" data-arg="Line item removed">×</button></div>
      </div>
      <button class="btn ghost" style="margin-top:6px;font-size:12px" data-act="toast" data-arg="Line item added">+ Add line item</button>
    </div>
    <div class="invoice-summary">
      <div class="inv-sum-row"><span>Subtotal</span><span class="tnum">$774.00</span></div>
      <div class="inv-sum-row"><span>Tax (HST 13%)</span><span class="tnum">$100.62</span></div>
      <div class="inv-sum-row"><span>Discount</span><span class="tnum">−$0.00</span></div>
      <div class="inv-sum-row total"><span>Total due</span><span class="tnum">$874.62</span></div>
    </div>
    <div class="form-group" style="margin-top:16px"><label class="form-label">Notes / memo</label>
      <textarea class="form-textarea" placeholder="Internal notes or customer-facing memo…"></textarea></div>
    <div class="form-footer">
      <button class="btn ghost" data-act="createinvoice" data-arg="draft">Save draft</button>
      <button class="btn primary" data-act="createinvoice" data-arg="send">Send invoice</button>
    </div>`);
}

/* ── Notifications panel ── */

function openApproveInvoice(id){
  openDrawer('Approve Invoice',`
    <div class="card" style="margin-bottom:16px;padding:14px 16px">
      <div class="form-label" style="margin-bottom:8px">Invoice summary</div>
      <div class="inv-sum-row"><span>Invoice</span><span class="tnum" style="font-weight:600">${id||'INV-2026-0847'}</span></div>
      <div class="inv-sum-row"><span>Customer</span><span>Acme Corp</span></div>
      <div class="inv-sum-row"><span>Amount</span><span class="tnum">$4,200.00</span></div>
      <div class="inv-sum-row"><span>Due date</span><span>Jul 15, 2026</span></div>
    </div>
    <div class="form-row"><div class="form-group"><label class="form-label">Approver</label>
      <select class="form-select"><option>Amir Bukhari (CFO)</option><option>M. Reyes (Revenue Manager)</option></select></div>
      <div class="form-group"><label class="form-label">Approval date</label>
      <input class="form-input" type="date" value="2026-06-28"></div></div>
    <div class="form-group"><label class="form-label">Approval notes (optional)</label>
      <textarea class="form-textarea" placeholder="Notes for audit trail…" style="min-height:56px"></textarea></div>
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn primary" data-act="toast" data-arg="Invoice approved — sent to customer for payment">Confirm approval</button>
    </div>`);
}

/* ── Void Invoice ── */

function openVoidInvoice(id){
  openDrawer('Void Invoice',`
    <div class="confirm-panel">
      <div class="confirm-title">${svg(I.warning,14)} This action cannot be undone</div>
      <div class="confirm-body">Voiding ${id||'this invoice'} will permanently cancel it. A credit note will be created if payment has already been collected. The invoice number will be retained in the audit log.</div>
    </div>
    <div class="form-group" style="margin-top:16px"><label class="form-label">Reason for voiding</label>
      <select class="form-select"><option>Duplicate invoice</option><option>Billing error</option><option>Customer request</option><option>Contract cancelled</option><option>Test / sandbox entry</option></select></div>
    <div class="form-group" style="margin-top:10px"><label class="form-label">Notes</label>
      <textarea class="form-textarea" placeholder="Additional context for audit trail…"></textarea></div>
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Keep invoice</button>
      <button class="btn primary" style="background:var(--neg)" data-act="toast" data-arg="Invoice voided — credit note CRD-2026-0042 created">Void invoice</button>
    </div>`);
}

/* ── Send Payment Reminder ── */

function openSendReminder(id){
  openDrawer('Send Payment Reminder',`
    <div class="form-section-title">Email preview</div>
    <div class="card" style="padding:16px;margin-bottom:16px;border-radius:8px">
      <div style="font-size:12px;color:var(--text-3);margin-bottom:8px">To: billing@acmecorp.com</div>
      <div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:10px">Friendly reminder: Invoice ${id||'INV-2026-0831'} is overdue</div>
      <div style="font-size:13px;color:var(--text-2);line-height:1.6">Hi Jane,<br><br>
        This is a friendly reminder that invoice <b>${id||'INV-2026-0831'}</b> for <b>$5,800.00</b> was due on Jun 14, 2026 and remains outstanding.<br><br>
        Please arrange payment at your earliest convenience. If you have any questions, reply to this email.<br><br>
        <a style="color:var(--ember)">Pay invoice →</a></div>
    </div>
    <div class="form-row"><div class="form-group"><label class="form-label">Send to</label>
      <input class="form-input" value="billing@acmecorp.com"></div>
      <div class="form-group"><label class="form-label">CC</label>
      <input class="form-input" placeholder="Optional"></div></div>
    <div class="form-group"><label class="form-label">Add personal note</label>
      <textarea class="form-textarea" placeholder="Appended to the standard reminder template…" style="min-height:56px"></textarea></div>
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn primary" data-act="toast" data-arg="Payment reminder sent to billing@acmecorp.com">Send reminder</button>
    </div>`);
}

/* ── Retry Payment ── */

function openInvoiceGroupingPolicy(accountId){
  const gpSaved = db().config['grouping:'+accountId] ?? 1;
  openDrawer('Invoice Grouping — ' + (accountId||'Account'), `
    <div class="val-banner info" style="margin-bottom:16px">${svg(I.grouping,15)} <div><strong>Invoice grouping controls how charges are bundled into invoices.</strong> Client-selectable options apply immediately; custom policies require Finance approval and apply to the full open billing period.</div></div>
    <h4 style="font-size:13px;font-weight:700;margin-bottom:8px">Effective Policy (Inheritance)</h4>
    <div class="grouping-inherit" style="margin-bottom:20px">
      <div class="grouping-level"><span class="grouping-level-name">System Default</span><span class="grouping-level-value" style="color:var(--text-3)">Consolidated invoice</span><span class="grouping-level-source">Fallback</span></div>
      <div class="grouping-level"><span class="grouping-level-name">BU Default</span><span class="grouping-level-value" style="color:var(--text-3)">Consolidated invoice</span><span class="grouping-level-source">BU-001 Residential</span></div>
      <div class="grouping-level active"><span class="grouping-level-name">Account</span><span class="grouping-level-value">Split by Business Unit</span><span class="grouping-level-source">${pill('warn','Active override')}</span></div>
      <div class="grouping-level"><span class="grouping-level-name">Subscription</span><span class="grouping-level-value" style="color:var(--text-3)">No override</span><span class="grouping-level-source">Inherits account</span></div>
    </div>
    <h4 style="font-size:13px;font-weight:700;margin-bottom:10px">Change Grouping</h4>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:18px">
      ${GROUPING_POLICIES.map((p,i)=>`<label style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border:1.5px solid ${i===gpSaved?'var(--ember)':'var(--border)'};border-radius:8px;cursor:pointer;background:${i===gpSaved?'var(--ember-glow)':'var(--surface)'}">
        <input type="radio" name="gp_radio" ${i===gpSaved?'checked':''} style="margin-top:2px">
        <div style="flex:1"><div style="font-weight:600;font-size:13px">${p.name}${p.requiresApproval?' <span style="font-size:11px;color:var(--warn)">(requires approval)</span>':''}</div><div class="mut" style="font-size:12px;margin-top:2px">${p.desc}</div></div>
        ${p.clientVisible?pill('muted','Client-visible'):''}
      </label>`).join('')}
    </div>
    <div class="val-banner warn">${svg(I.warning,14)} Changes apply to the entire open billing period (June 2026). After finalization, grouping changes require a credit/rebill correction.</div>
    <div class="form-actions" style="margin-top:16px"><button class="btn primary" data-act="applygrouping" data-arg="${accountId||''}">Apply Change</button><button class="btn ghost" onclick="closeDrawer()">Cancel</button></div>
  `);
}

function openCreditRebill(invoiceId){
  const inv = invoiceId && invoiceId!=='new' ? invoiceId : 'INV-2026-0843';
  openDrawer(`Credit / Rebill — ${inv}`, `
    <div class="val-banner error" style="margin-bottom:16px">${svg(I.warning,15)} <strong>Finalized invoices cannot be directly edited.</strong> Use credit/rebill to correct billing errors on finalized invoices. This creates an audit trail and triggers accounting entries.</div>
    <h4 style="font-size:13px;font-weight:700;margin-bottom:12px">Correction Type</h4>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:18px">
      <label style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border:1.5px solid var(--ember);border-radius:8px;cursor:pointer;background:var(--ember-glow)"><input type="radio" name="crt" checked style="margin-top:2px"><div><div style="font-weight:600;font-size:13px">Full invoice credit</div><div class="mut" style="font-size:12px;margin-top:2px">Credit the entire invoice amount. Optionally issue a corrected replacement invoice.</div></div></label>
      <label style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border:1.5px solid var(--border);border-radius:8px;cursor:pointer"><input type="radio" name="crt" style="margin-top:2px"><div><div style="font-weight:600;font-size:13px">Partial credit</div><div class="mut" style="font-size:12px;margin-top:2px">Credit a specific dollar amount against the invoice.</div></div></label>
      <label style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border:1.5px solid var(--border);border-radius:8px;cursor:pointer"><input type="radio" name="crt" style="margin-top:2px"><div><div style="font-weight:600;font-size:13px">Line-level credit</div><div class="mut" style="font-size:12px;margin-top:2px">Credit specific line items. Useful for service outage credits or pricing corrections.</div></div></label>
    </div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg"><label>Reason code</label><select class="finput"><option>Billing error</option><option>Service outage</option><option>Proration adjustment</option><option>Tax reversal</option><option>Goodwill</option></select></div>
      <div class="fg"><label>Internal notes</label><input class="finput" placeholder="Optional — shown in audit trail"></div>
    </div>
    <div style="padding:12px 14px;border:1px solid var(--border);border-radius:8px;margin-top:12px;margin-bottom:16px">
      <div style="font-size:12px;font-weight:700;margin-bottom:8px;color:var(--text-2)">Accounting Impact Preview</div>
      <div class="diff-pair">
        <div class="diff-col before"><div class="diff-col-label">Will debit</div><div class="mono" style="font-size:12px">4000 · Revenue</div><div style="font-size:13px;font-weight:600;color:var(--neg);margin-top:2px">$5,800.00</div></div>
        <div class="diff-col after"><div class="diff-col-label">Will credit</div><div class="mono" style="font-size:12px">1200 · Accounts Receivable</div><div style="font-size:13px;font-weight:600;color:var(--pos);margin-top:2px">$5,800.00</div></div>
      </div>
      <div class="mut" style="font-size:11.5px;margin-top:8px">Tax reversal: −$478.50 will be credited against 2100 · Tax Payable</div>
    </div>
    <div class="val-banner warn">${svg(I.warning,14)} This correction requires Finance approval (amount &gt; $1,000). It will be queued for approval before the credit note is issued.</div>
    <div class="form-actions"><button class="btn primary" data-act="submitcredit" data-arg="${inv}">Submit for Approval</button><button class="btn ghost" onclick="closeDrawer()">Cancel</button></div>
  `);
}

function openDraftValidation(invoiceId){
  const isAll = invoiceId==='all';
  openDrawer(isAll?'Draft Validation — June 2026':'Draft Validation — '+(invoiceId||'INV-2026-DRAFT-2'), `
    <div class="mut" style="font-size:12.5px;margin-bottom:16px">Issues must be resolved before invoices can be finalized. Warnings will not block finalization but should be reviewed.</div>
    ${isAll?`<div style="display:flex;align-items:center;gap:10px;padding:9px 14px;border-radius:8px;background:rgba(229,73,73,.07);border:1px solid rgba(229,73,73,.25);margin-bottom:14px;font-size:13px"><strong style="color:var(--neg)">3 invoices have blocking issues</strong><span class="mut">· 2 warnings on 2 other drafts</span><span style="margin-left:auto;color:var(--text-3);font-size:12px">June 2026 period</span></div>`:''}
    <div style="display:flex;flex-direction:column;gap:10px">
      <div style="padding:12px 14px;border:1px solid rgba(229,73,73,.3);border-radius:8px;background:rgba(229,73,73,.05)">
        <div style="font-weight:700;font-size:13px;color:var(--neg);margin-bottom:6px">${isAll?'INV-2026-DRAFT-2 · NovaSpark · ':''}Blocking — Missing tax address</div>
        <div class="mut" style="font-size:12.5px;margin-bottom:8px">Account NovaSpark has no billing address with a valid tax jurisdiction. Tax cannot be calculated until a verified address is added.</div>
        <button class="btn ghost" style="font-size:12px;padding:4px 9px" data-act="account" data-arg="NovaSpark">Fix: Open account</button>
      </div>
      <div style="padding:12px 14px;border:1px solid rgba(229,73,73,.3);border-radius:8px;background:rgba(229,73,73,.05)">
        <div style="font-weight:700;font-size:13px;color:var(--neg);margin-bottom:6px">${isAll?'INV-2026-DRAFT-2 · NovaSpark · ':''}Blocking — Missing invoice contact</div>
        <div class="mut" style="font-size:12.5px;margin-bottom:8px">No billing contact email is configured for NovaSpark. Invoice cannot be sent without a valid billing contact.</div>
        <button class="btn ghost" style="font-size:12px;padding:4px 9px" data-act="account" data-arg="NovaSpark">Fix: Open account</button>
      </div>
      <div style="padding:12px 14px;border:1px solid rgba(245,166,35,.3);border-radius:8px;background:rgba(245,166,35,.05)">
        <div style="font-weight:700;font-size:13px;color:var(--warn);margin-bottom:6px">Warning — Usage anomaly detected</div>
        <div class="mut" style="font-size:12.5px;margin-bottom:8px">API call usage for Orbit Labs is 340% above the prior 3-month average. Review before finalizing to ensure this is not a metering error.</div>
        <button class="btn ghost" style="font-size:12px;padding:4px 9px" data-act="usageevent" data-arg="EVT-8821042">Review usage events</button>
      </div>
      <div style="padding:12px 14px;border:1px solid rgba(74,158,255,.25);border-radius:8px;background:rgba(74,158,255,.05)">
        <div style="font-weight:700;font-size:13px;color:#4a9eff;margin-bottom:6px">Info — GL mapping not verified for 2 line items</div>
        <div class="mut" style="font-size:12.5px">2 product lines do not have confirmed GL account assignments for the Commercial BU. Invoices will export without GL codes until mappings are added.</div>
      </div>
    </div>
    <div class="form-actions" style="margin-top:16px"><button class="btn primary" data-act="revalidate" data-arg="${invoiceId||'all'}">Re-run Validation</button><button class="btn ghost" onclick="closeDrawer()">Close</button></div>
  `);
}

function openGroupingPolicy(id){
  openInvoiceGroupingPolicy(id);
}

function openInvoiceFooterEditor(){
  openDrawer('Invoice Footer Editor', `
    <div class="form-grid" style="grid-template-columns:1fr">
      <div class="fg"><label>Footer text (all Business Units)</label><textarea class="finput" rows="4">Payment is due within 30 days of the invoice date. Late payments may incur a 1.5% monthly fee. For billing questions, contact billing@delonix.io or call +1 (888) 555-0100.</textarea></div>
    </div>
    <div style="margin-top:12px">
      <div style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:8px">BUSINESS UNIT OVERRIDES</div>
      ${BUS.slice(0,3).map(b=>`<div class="fg" style="margin-bottom:8px"><label>${b.name}</label><textarea class="finput" rows="2" placeholder="Leave blank to use default footer"></textarea></div>`).join('')}
    </div>
    <div class="form-actions" style="margin-top:14px">
      ${cfgSaveBtn('invoice-footer','Invoice footer saved — applies to new invoices','Save Footer')}
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}
