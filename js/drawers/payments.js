/* delonix — payments.js */

function openRetryPayment(id){
  openDrawer('Retry Payment',`
    <div class="card" style="margin-bottom:16px;padding:14px 16px">
      <div class="inv-sum-row"><span>Payment ref</span><span class="tnum" style="font-weight:600">${id||'PAY-2026-0412'}</span></div>
      <div class="inv-sum-row"><span>Customer</span><span>Summit Digital</span></div>
      <div class="inv-sum-row"><span>Amount</span><span class="tnum">$6,400.00</span></div>
      <div class="inv-sum-row"><span>Gateway</span><span>Stripe</span></div>
    </div>
    <div class="confirm-panel warn">
      <div class="confirm-title" style="color:var(--warn)">Last failure reason</div>
      <div class="confirm-body">Card declined — insufficient funds (Stripe code: card_declined / insufficient_funds). This occurred Jun 25, 2026 at 14:22 UTC.</div>
    </div>
    <div class="form-group" style="margin-top:16px"><label class="form-label">Payment method</label>
      <select class="form-select"><option>Visa ···· 4242 (on file)</option><option>Mastercard ···· 5555 (on file)</option><option>Request new payment method from customer</option></select></div>
    <div class="form-group" style="margin-top:10px"><label class="form-label">Retry time</label>
      <select class="form-select"><option>Immediately</option><option>In 24 hours</option><option>In 48 hours</option><option>Custom…</option></select></div>
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn primary" data-act="toast" data-arg="Payment retry queued — will attempt PAY-2026-0412 immediately">Retry now</button>
    </div>`);
}

/* ── Refund ── */

function openRefund(id){
  openDrawer('Issue Refund',`
    <div class="card" style="margin-bottom:16px;padding:14px 16px">
      <div class="inv-sum-row"><span>Original payment</span><span class="tnum" style="font-weight:600">${id||'PAY-2026-0387'}</span></div>
      <div class="inv-sum-row"><span>Collected</span><span class="tnum">$4,200.00</span></div>
      <div class="inv-sum-row"><span>Gateway</span><span>Stripe · Visa ···· 4242</span></div>
      <div class="inv-sum-row"><span>Max refundable</span><span class="tnum" style="color:var(--pos)">$4,200.00</span></div>
    </div>
    <div class="form-row"><div class="form-group"><label class="form-label">Refund type</label>
      <select class="form-select"><option>Full refund ($4,200.00)</option><option>Partial refund</option></select></div>
      <div class="form-group"><label class="form-label">Amount</label>
      <input class="form-input" type="number" value="4200.00"></div></div>
    <div class="form-group"><label class="form-label">Reason</label>
      <select class="form-select"><option>Customer requested cancellation</option><option>Service outage / SLA breach</option><option>Billing error</option><option>Duplicate charge</option><option>Goodwill</option></select></div>
    <div class="form-group" style="margin-top:10px"><label class="form-label">Internal notes</label>
      <textarea class="form-textarea" placeholder="Notes for audit trail…" style="min-height:56px"></textarea></div>
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn primary" style="background:var(--neg)" data-act="toast" data-arg="Refund of $4,200.00 queued — Stripe will process within 5–10 business days">Issue refund</button>
    </div>`);
}

/* ── Collection Detail ── */

function openManualPayment(acct){
  openDrawer('Record Manual Payment', `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Invoice</label><select class="finput"><option>INV-2026-0843 · Apex Systems · $5,800.00 overdue</option><option>INV-2026-0836 · Bridgepoint · $2,150.00 overdue</option><option>INV-2026-0840 · Fulcrum Labs · $3,400.00 overdue</option></select></div>
      <div class="fg"><label>Payment amount</label><input class="finput" type="number" placeholder="0.00"></div>
      <div class="fg"><label>Currency</label><select class="finput"><option>USD</option><option>EUR</option></select></div>
      <div class="fg"><label>Payment method</label><select class="finput"><option>Wire transfer</option><option>ACH</option><option>Check</option><option>Credit card (manual)</option><option>Other</option></select></div>
      <div class="fg"><label>Payment date</label><input class="finput" type="date" value="2026-06-28"></div>
      <div class="fg"><label>Reference / check number</label><input class="finput" placeholder="Wire ref, check #, etc."></div>
      <div class="fg" style="grid-column:1/-1"><label>Notes</label><textarea class="finput" rows="2" placeholder="Internal notes — not visible to customer"></textarea></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Manual payment recorded — invoice marked as paid">Record Payment</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openRefundPolicy(){
  openDrawer('Refund Policy Settings', `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg"><label>Default refund window</label><select class="finput"><option>7 days</option><option selected>30 days</option><option>60 days</option><option>No default</option></select></div>
      <div class="fg"><label>Approval threshold</label><input class="finput" type="number" value="1000"><span class="mut" style="font-size:12px;margin-top:4px">Refunds above this require Finance approval</span></div>
      <div class="fg"><label>Refund method</label><select class="finput"><option selected>Original payment method</option><option>Account credit</option><option>Wire transfer</option></select></div>
      <div class="fg"><label>Partial refunds</label><select class="finput"><option selected>Allowed</option><option>Not allowed</option></select></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Refund policy saved">Save Policy</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openManualMatch(ref){
  openDrawer(`Manual Payment Match — ${ref||'PMT-2026-0312'}`, `
    <div class="mut" style="font-size:12.5px;margin-bottom:16px">Match this unidentified payment to the correct invoice or account. Once matched, the AR balance updates and the payment is marked as reconciled.</div>
    <div style="padding:12px 14px;border:1px solid var(--border);border-radius:8px;margin-bottom:16px;background:var(--surface)">
      <div style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:8px">UNMATCHED PAYMENT</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px">
        <div><span class="mut">Reference: </span><span class="mono">${ref||'PMT-2026-0312'}</span></div>
        <div><span class="mut">Amount: </span><span class="tnum" style="font-weight:700">$2,800.00</span></div>
        <div><span class="mut">Received: </span>Jun 27, 2026</div>
        <div><span class="mut">Bank: </span>Wire · JPMorgan</div>
        <div style="grid-column:1/-1"><span class="mut">Remittance: </span>"June invoices Acme Corp"</div>
      </div>
    </div>
    <div class="form-grid" style="grid-template-columns:1fr">
      <div class="fg"><label>Match to invoice</label><select class="finput">
        <option value="">— Search invoice or account —</option>
        <option>INV-2026-0843 · Acme Corp · $2,800.00 · overdue</option>
        <option>INV-2026-0836 · Acme Corp · $1,400.00 · overdue</option>
        <option>INV-2026-0829 · Acme Corp · $2,800.00 · paid</option>
      </select></div>
      <div class="fg"><label>Match type</label><select class="finput">
        <option selected>Full payment — close invoice</option>
        <option>Partial payment — leave balance open</option>
        <option>Overpayment — apply excess as credit</option>
      </select></div>
      <div class="fg"><label>Reconciliation note</label><input class="finput" placeholder="Wire received Jun 27 — matched to June invoice"></div>
    </div>
    <div class="form-actions" style="margin-top:14px">
      <button class="btn primary" data-act="toast" data-arg="Payment ${ref||'PMT-2026-0312'} matched — AR updated, invoice marked paid">Apply Match</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

/* ===== AI / CALCULATOR / CUSTOM ENTITY DRAWERS ===== */
