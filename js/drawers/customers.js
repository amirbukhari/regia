/* delonix — customers.js */

function openNewCustomer(){
  openDrawer('New Customer',`
    <div class="form-section-title">Company</div>
    <div class="form-row"><div class="form-group"><label class="form-label">Company name</label>
      <input class="form-input" placeholder="Acme Corporation"></div>
      <div class="form-group"><label class="form-label">Plan</label>
      <select class="form-select">${planOpts()}</select></div></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Industry</label>
      <select class="form-select"><option>SaaS</option><option>Fintech</option><option>Healthcare</option><option>E-commerce</option><option>Other</option></select></div>
      <div class="form-group"><label class="form-label">Country</label>
      <select class="form-select"><option>United States</option><option>Canada</option><option>United Kingdom</option><option>Germany</option><option>Other</option></select></div></div>
    <div class="form-section-title" style="margin-top:16px">Primary contact</div>
    <div class="form-row"><div class="form-group"><label class="form-label">Name</label>
      <input class="form-input" placeholder="Jane Smith"></div>
      <div class="form-group"><label class="form-label">Title</label>
      <input class="form-input" placeholder="CFO"></div></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Email</label>
      <input class="form-input" type="email" placeholder="jane@company.com"></div>
      <div class="form-group"><label class="form-label">Phone</label>
      <input class="form-input" type="tel" placeholder="+1 (555) 000-0000"></div></div>
    <div class="form-section-title" style="margin-top:16px">Billing</div>
    <div class="form-row"><div class="form-group"><label class="form-label">Payment method</label>
      <select class="form-select"><option>Credit card</option><option>ACH / Bank transfer</option><option>Wire</option><option>Invoice (Net 30)</option></select></div>
      <div class="form-group"><label class="form-label">Tax exempt</label>
      <div style="margin-top:8px"><div class="toggle" data-act="toggle"><i></i></div></div></div></div>
    <div class="form-footer">
      <button class="btn ghost" data-act="toast" data-arg="Customer draft saved">Cancel</button>
      <button class="btn primary" data-act="toast" data-arg="Customer account created — welcome email sent">Create account</button>
    </div>`);
}

/* ── New Subscription ── */

function openNewCredit(){
  openDrawer('New Credit Note',`
    <div class="form-row"><div class="form-group"><label class="form-label">Customer</label>
      <select class="form-select"><option value="">— select —</option>${custOpts()}</select></div></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Related invoice</label>
      <select class="form-select"><option>INV-2026-0831 · Apex Systems · $5,800</option>
        <option>INV-2026-0824 · Summit Digital · $6,400</option>
        <option>INV-2026-0819 · CloudBase Inc · $7,200</option>
        <option>Not linked to an invoice</option></select></div></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Reason</label>
      <select class="form-select"><option>Service outage</option><option>Billing error</option><option>Goodwill</option><option>Duplicate charge</option><option>Proration adjustment</option><option>Contract amendment</option></select></div>
      <div class="form-group" style="max-width:140px"><label class="form-label">Amount</label>
      <input class="form-input" type="number" placeholder="0.00"></div></div>
    <div class="form-group"><label class="form-label">Description</label>
      <input class="form-input" placeholder="Brief description for the customer"></div>
    <div class="form-group" style="margin-top:10px"><label class="form-label">Internal notes</label>
      <textarea class="form-textarea" placeholder="Internal context only, not shown to customer…"></textarea></div>
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn primary" data-act="toast" data-arg="Credit note CRD-2026-0041 issued — applied to open balance">Issue credit note</button>
    </div>`);
}

/* ── Approve Invoice ── */
