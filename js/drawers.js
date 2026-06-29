/* delonix — drawer panel render functions */

/* ===========================================================

   DRAWER FUNCTIONS v2 — real panels, no stubs
   =========================================================== */

const CUSTOMERS=['Acme Corp','TechFlow Inc','Nexus Digital','Pinnacle SaaS','Streamline Co',
  'Orbit Labs','DataVault','CloudBase Inc','Meridian Tech','Apex Systems','Vertex IO',
  'Cascade Analytics','Summit Digital','Prism Networks','Zenith Cloud','NovaSpark',
  'Fulcrum Labs','Stellar Systems','Bridgepoint','Ironside Tech'];
const PLANS=['Starter','Business','Business+','Enterprise','Enterprise+'];

function custOpts(){return CUSTOMERS.map(c=>`<option>${c}</option>`).join('');}
function planOpts(){return PLANS.map(p=>`<option>${p}</option>`).join('');}

/* ── New Invoice ── */
function openNewInvoice(){
  openDrawer('New Invoice',`
    <div class="form-section">
      <div class="form-row"><div class="form-group"><label class="form-label">Customer</label>
        <select class="form-select"><option value="">— select —</option>${custOpts()}</select></div>
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
      <button class="btn ghost" data-act="toast" data-arg="Draft INV-2026-0849 saved to drafts">Save draft</button>
      <button class="btn primary" data-act="toast" data-arg="Invoice INV-2026-0849 sent to customer — $874.62 due Jul 28">Send invoice</button>
    </div>`);
}

/* ── Notifications panel ── */
function openNotifications(){
  const notifs=[
    {dot:'#e54949',msg:'Apex Systems — INV-2026-0831 overdue 14 days · $5,800',t:'2 min ago',act:'invoice',arg:'INV-2026-0831'},
    {dot:'#e54949',msg:'Summit Digital — PAY-2026-0412 failed · retry available',t:'18 min ago',act:'paydetail',arg:'PAY-2026-0412'},
    {dot:'#e54949',msg:'Stellar Systems — credit limit exceeded, subscription at risk',t:'1 hr ago',act:'account',arg:'Stellar Systems'},
    {dot:'#f5a623',msg:'Cascade Analytics — renewal due in 7 days · $2,950/mo',t:'3 hr ago',act:'subdetail',arg:'Cascade Analytics'},
    {dot:'#f5a623',msg:'Revenue recognition: 3 contracts pending manual review',t:'4 hr ago',act:'route',arg:'revrec'},
    {dot:'#f5a623',msg:'Financial close: 4 tasks pending CFO sign-off',t:'6 hr ago',act:'route',arg:'close'},
    {dot:'#4a9eff',msg:'Export ready: Q2 Board Pack — click to download',t:'Yesterday',act:'toast',arg:'Downloading Q2 Board Pack PDF…'},
    {dot:'#4a9eff',msg:'Stripe webhook: 2 failed deliveries in last hour',t:'Yesterday',act:'route',arg:'developers'},
  ];
  openDrawer('Notifications',`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <span style="font-size:12px;color:var(--text-3)">8 unread</span>
      <button class="btn ghost" style="padding:4px 10px;font-size:12px" data-act="toast" data-arg="All notifications marked as read">Mark all read</button>
    </div>
    <div class="notif-list">
      ${notifs.map(n=>`<button class="notif-item" data-act="${n.act}" data-arg="${n.arg}">
        <span class="notif-dot" style="background:${n.dot}"></span>
        <div class="notif-body"><div class="notif-msg">${n.msg}</div><div class="notif-time">${n.t}</div></div>
      </button>`).join('')}
    </div>`);
}

/* ── Entity switcher ── */
function openEntitySwitch(){
  const entities=[
    {flag:'🇺🇸',name:'Delonix Inc',sub:'North America · USD',subs:842,mrr:'$418,350',active:true},
    {flag:'🇪🇺',name:'Delonix EU',sub:'Europe · EUR',subs:214,mrr:'€127,400',active:false},
    {flag:'🇸🇬',name:'Delonix APAC',sub:'Asia-Pacific · SGD',subs:88,mrr:'S$54,200',active:false},
  ];
  openDrawer('Switch Workspace',`
    ${entities.map(e=>`<div class="entity-card${e.active?' active':''}" data-act="${e.active?'toast':'toast'}" data-arg="${e.active?'Already on '+e.name:'Switched to '+e.name}">
      <div class="entity-flag">${e.flag}</div>
      <div class="entity-info"><div class="entity-name">${e.name}</div>
        <div class="entity-meta">${e.sub} · ${e.subs} subscriptions · MRR ${e.mrr}</div></div>
      <span class="entity-check">✓</span>
    </div>`).join('')}
    <div class="form-footer" style="margin-top:8px">
      <button class="btn ghost" data-act="route" data-arg="bizunits">Manage entities</button>
      <button class="btn primary" data-act="newlegalentity">+ Add entity</button>
    </div>`);
}

/* ── Currency panel ── */
function openCurrencyPanel(){
  const currencies=[
    {flag:'🇺🇸',code:'USD',name:'US Dollar',rate:'1.0000',active:true},
    {flag:'🇪🇺',code:'EUR',name:'Euro',rate:'0.9242',active:false},
    {flag:'🇬🇧',code:'GBP',name:'British Pound',rate:'0.7874',active:false},
    {flag:'🇨🇦',code:'CAD',name:'Canadian Dollar',rate:'1.3621',active:false},
    {flag:'🇸🇬',code:'SGD',name:'Singapore Dollar',rate:'1.3498',active:false},
    {flag:'🇦🇺',code:'AUD',name:'Australian Dollar',rate:'1.5372',active:false},
  ];
  openDrawer('Display Currency',`
    <p style="font-size:12px;color:var(--text-3);margin-bottom:14px">Display only — invoices are billed in their contract currency.</p>
    ${currencies.map(c=>`<div class="entity-card${c.active?' active':''}" data-act="toast" data-arg="Display currency set to ${c.code}">
      <span style="font-size:20px">${c.flag}</span>
      <div class="entity-info"><div class="entity-name">${c.name}</div>
        <div class="entity-meta">${c.code} · 1 USD = ${c.rate} ${c.code}</div></div>
      ${c.active?'<span class="entity-check">✓</span>':''}
    </div>`).join('')}`);
}

/* ── New Quote ── */
function openNewQuote(){
  openDrawer('New Quote',`
    <div class="form-row"><div class="form-group"><label class="form-label">Customer</label>
      <select class="form-select"><option value="">— select —</option>${custOpts()}</select></div>
      <div class="form-group"><label class="form-label">Owner</label>
      <select class="form-select"><option>M. Reyes</option><option>P. Anand</option><option>D. Cho</option><option>Amir Bukhari</option></select></div></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Deal name</label>
      <input class="form-input" placeholder="e.g. Acme Corp Enterprise Renewal 2027"></div>
      <div class="form-group" style="max-width:140px"><label class="form-label">Expires</label>
      <input class="form-input" type="date" value="2026-07-28"></div></div>
    <div class="form-section">
      <div class="form-section-title">Line items</div>
      <div style="display:grid;grid-template-columns:1fr 60px 90px 70px 80px 28px;gap:8px;margin-bottom:6px">
        <span class="form-label">Product</span><span class="form-label">Qty</span>
        <span class="form-label">Unit price</span><span class="form-label">Disc %</span>
        <span class="form-label">Total</span><span></span></div>
      <div class="line-item-row" style="grid-template-columns:1fr 60px 90px 70px 80px 28px">
        <select class="form-select">${planOpts()}</select>
        <input class="form-input" type="number" value="1"><input class="form-input" type="number" value="8500">
        <input class="form-input" type="number" value="10"><span class="line-item-total">$7,650</span>
        <button class="li-del">×</button></div>
      <button class="btn ghost" style="margin-top:6px;font-size:12px" data-act="toast" data-arg="Line item added">+ Add line item</button>
    </div>
    <div class="form-row"><div class="form-group"><label class="form-label">Payment terms</label>
      <select class="form-select"><option>Net 30</option><option>Net 60</option><option>Annual prepay</option></select></div>
      <div class="form-group"><label class="form-label">Stage</label>
      <select class="form-select"><option>Discovery</option><option>Proposal</option><option>Negotiation</option></select></div></div>
    <div class="form-group"><label class="form-label">Notes</label>
      <textarea class="form-textarea" placeholder="Deal context, custom terms, internal notes…"></textarea></div>
    <div class="form-footer">
      <button class="btn ghost" data-act="toast" data-arg="Quote QT-2026-0094 saved as draft">Save draft</button>
      <button class="btn primary" data-act="toast" data-arg="Quote QT-2026-0094 sent for internal review">Send for review</button>
    </div>`);
}

/* ── New Customer ── */
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
function openNewSub(){
  openDrawer('New Subscription',`
    <div class="form-row"><div class="form-group"><label class="form-label">Customer</label>
      <select class="form-select"><option value="">— select customer —</option>${custOpts()}</select></div></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Plan</label>
      <select class="form-select">${planOpts()}</select></div>
      <div class="form-group"><label class="form-label">Billing cycle</label>
      <select class="form-select"><option>Monthly</option><option>Annual (save 20%)</option><option>Quarterly</option></select></div></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Seats</label>
      <input class="form-input" type="number" value="5" min="1"></div>
      <div class="form-group"><label class="form-label">Start date</label>
      <input class="form-input" type="date" value="2026-07-01"></div>
      <div class="form-group"><label class="form-label">Trial period</label>
      <select class="form-select"><option>No trial</option><option>7 days</option><option>14 days</option><option>30 days</option></select></div></div>
    <div class="form-group"><label class="form-label">Notes</label>
      <textarea class="form-textarea" placeholder="Internal notes…"></textarea></div>
    <div class="form-footer">
      <button class="btn ghost" data-act="toast" data-arg="Subscription draft cancelled">Cancel</button>
      <button class="btn primary" data-act="toast" data-arg="Subscription created — first invoice queued for Jul 1">Create subscription</button>
    </div>`);
}

/* ── New Credit Note ── */
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
      <div class="confirm-title">⚠ This action cannot be undone</div>
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
function openCollectionDetail(acct){
  openDrawer((acct||'Apex Systems')+' — Collections',`
    <div class="grid kpis" style="grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:18px">
      <div class="card kpi" style="padding:12px 14px"><div class="lab">Outstanding</div><div class="val tnum" style="font-size:18px">$5,800</div><div class="sub" style="color:var(--neg)">14 days overdue</div></div>
      <div class="card kpi" style="padding:12px 14px"><div class="lab">Day in sequence</div><div class="val tnum" style="font-size:18px">14</div><div class="sub">Next: final notice</div></div>
      <div class="card kpi" style="padding:12px 14px"><div class="lab">Contact attempts</div><div class="val tnum" style="font-size:18px">3</div><div class="sub">Last: Jun 26 email</div></div>
    </div>
    <div class="form-section-title">Dunning timeline</div>
    <div class="timeline" style="margin-bottom:18px">
      <div class="tl-item"><div class="tl-dot done"></div><div class="tl-content"><div class="tl-title">Day 1 — Friendly reminder sent</div><div class="tl-sub">Jun 15 · Email opened (2 times)</div></div></div>
      <div class="tl-item"><div class="tl-dot done"></div><div class="tl-content"><div class="tl-title">Day 3 — Payment failed notice</div><div class="tl-sub">Jun 17 · Email delivered, not opened</div></div></div>
      <div class="tl-item"><div class="tl-dot done"></div><div class="tl-content"><div class="tl-title">Day 7 — Urgent notice (email + SMS)</div><div class="tl-sub">Jun 21 · Email opened · SMS delivered</div></div></div>
      <div class="tl-item"><div class="tl-dot active"></div><div class="tl-content"><div class="tl-title">Day 14 — Final notice + manual call task</div><div class="tl-sub">Jun 28 · Today — email sent, call pending</div></div></div>
      <div class="tl-item"><div class="tl-dot"></div><div class="tl-content"><div class="tl-title">Day 21 — Suspension warning</div><div class="tl-sub">Scheduled Jul 6</div></div></div>
      <div class="tl-item"><div class="tl-dot"></div><div class="tl-content"><div class="tl-title">Day 30 — Account suspend</div><div class="tl-sub">Scheduled Jul 15</div></div></div>
    </div>
    <div class="form-section-title">Log manual contact</div>
    <div class="form-row"><div class="form-group"><label class="form-label">Contact type</label>
      <select class="form-select"><option>Phone call</option><option>Email</option><option>SMS</option><option>Meeting</option></select></div>
      <div class="form-group"><label class="form-label">Outcome</label>
      <select class="form-select"><option>Promise to pay</option><option>Dispute raised</option><option>Voicemail</option><option>No answer</option><option>Paid</option></select></div></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Follow-up date</label>
      <input class="form-input" type="date" value="2026-07-01"></div>
      <div class="form-group"><label class="form-label">Notes</label>
      <input class="form-input" placeholder="Call notes…"></div></div>
    <div class="form-footer">
      <button class="btn ghost" style="color:var(--neg);border-color:var(--neg)" data-act="suspendaccount" data-arg="current">Suspend account</button>
      <button class="btn ghost" data-act="toast" data-arg="Contact logged for ${acct||'account'}">Log contact</button>
      <button class="btn primary" data-act="toast" data-arg="Manual payment link sent to ${acct||'customer'} billing contact">Send payment link</button>
    </div>`);
}

/* ── Dunning Config ── */
function openDunningConfig(){
  const steps=[
    {day:'Day 1',label:'Friendly reminder',ch:'Email',on:true},
    {day:'Day 3',label:'Payment failed notice',ch:'Email',on:true},
    {day:'Day 7',label:'Urgent notice',ch:'Email + SMS',on:true},
    {day:'Day 14',label:'Final notice + call task',ch:'Email + SMS + Task',on:true},
    {day:'Day 21',label:'Suspension warning',ch:'Email',on:true},
    {day:'Day 30',label:'Account suspend',ch:'Automated action',on:true},
  ];
  openDrawer('Dunning Sequence Config',`
    <p style="font-size:12px;color:var(--text-2);margin-bottom:16px">Configure the automated recovery sequence applied to all failed and overdue accounts.</p>
    ${steps.map(s=>`<div class="seq-step">
      <span class="seq-day">${s.day}</span>
      <span class="seq-label">${s.label}</span>
      <span class="seq-channel">${s.ch}</span>
      <div class="toggle${s.on?' on':''}" data-act="toggle"><i></i></div>
    </div>`).join('')}
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn primary" data-act="toast" data-arg="Dunning sequence saved and active">Save configuration</button>
    </div>`);
}

/* ── Approval Rules ── */
function openApprovalRules(){
  const rules=[
    {thr:'Invoice > $10,000',approvers:'CFO',sla:'24h',active:true},
    {thr:'Invoice > $50,000',approvers:'CEO + CFO',sla:'48h',active:true},
    {thr:'Refund > $1,000',approvers:'Revenue Manager',sla:'12h',active:true},
    {thr:'Credit note > $5,000',approvers:'VP Finance',sla:'24h',active:true},
  ];
  openDrawer('Approval Rules',`
    <div class="table-wrap" style="border:none;margin-bottom:16px"><table><thead><tr>
      <th>Threshold</th><th>Approvers</th><th>SLA</th><th>Active</th></tr></thead><tbody>
      ${rules.map(r=>`<tr><td>${r.thr}</td><td class="nm">${r.approvers}</td>
        <td class="mut">${r.sla}</td>
        <td><div class="toggle${r.active?' on':''}" data-act="toggle"><i></i></div></td></tr>`).join('')}
    </tbody></table></div>
    <button class="btn ghost" style="font-size:12px" data-act="toast" data-arg="New approval rule added">+ Add rule</button>
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn primary" data-act="toast" data-arg="Approval rules saved">Save rules</button>
    </div>`);
}

/* ── Post to GL ── */
function openPostJournals(){
  openDrawer('Post to General Ledger',`
    <div class="confirm-panel">
      <div class="confirm-title">⚠ Irreversible action</div>
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
      <button class="btn primary" data-act="toast" data-arg="June 2026 close signed off by CFO — period locked, audit trail recorded">Submit sign-off</button>
    </div>`);
}

/* ── Report Builder ── */
function openReportBuilder(){
  openDrawer('Report Builder',`
    <div class="form-section">
      <div class="form-section-title">1 — Report type</div>
      <div class="radio-group">
        ${[['Revenue Analytics','MRR, ARR, churn, expansion — with charts'],
           ['A/R Aging','Outstanding invoices by age bucket and customer'],
           ['Subscription Cohorts','Retention and expansion by signup cohort'],
           ['Cash Flow','Operating, investing, financing activities'],
           ['Executive Summary','One-page KPI snapshot for board meetings']
          ].map((r,i)=>`<label class="radio-opt${i===0?' selected':''}">
          <input type="radio" name="rtype" ${i===0?'checked':''} style="accent-color:var(--ember)">
          <div><div style="font-size:13px;font-weight:600;color:var(--text)">${r[0]}</div>
               <div style="font-size:11px;color:var(--text-3);margin-top:1px">${r[1]}</div></div>
        </label>`).join('')}
      </div>
    </div>
    <div class="form-section">
      <div class="form-section-title">2 — Date range</div>
      <div class="form-row"><div class="form-group"><label class="form-label">From</label>
        <input class="form-input" type="date" value="2026-06-01"></div>
        <div class="form-group"><label class="form-label">To</label>
        <input class="form-input" type="date" value="2026-06-28"></div></div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${['MTD','QTD','YTD','Last month','Last quarter'].map(l=>`<button class="btn ghost" style="font-size:11px;padding:4px 8px" data-act="toast" data-arg="Date range set to ${l}">${l}</button>`).join('')}
      </div>
    </div>
    <div class="form-section">
      <div class="form-section-title">3 — Output format</div>
      <div class="radio-group" style="flex-direction:row;gap:8px">
        ${['PDF','XLSX','CSV'].map((f,i)=>`<label class="radio-opt${i===0?' selected':''}" style="flex:1;justify-content:center">
          <input type="radio" name="rfmt" ${i===0?'checked':''} style="accent-color:var(--ember)">${f}</label>`).join('')}
      </div>
    </div>
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn ghost" data-act="schedulereport">Schedule delivery</button>
      <button class="btn primary" data-act="download" data-arg="xlsx|Custom Report|generating…">Generate report</button>
    </div>`);
}

/* ── Schedule Report ── */
function openScheduleReport(){
  openDrawer('Schedule Report Delivery',`
    <div class="form-row"><div class="form-group"><label class="form-label">Report</label>
      <select class="form-select"><option>Revenue Analytics</option><option>A/R Aging</option><option>Executive Summary</option><option>Subscription Cohorts</option></select></div>
      <div class="form-group"><label class="form-label">Format</label>
      <select class="form-select"><option>PDF</option><option>XLSX</option></select></div></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Frequency</label>
      <select class="form-select"><option>Weekly</option><option>Monthly</option><option>Quarterly</option></select></div>
      <div class="form-group"><label class="form-label">Deliver on</label>
      <select class="form-select"><option>1st of month</option><option>Last day of month</option><option>Monday</option><option>Friday</option></select></div></div>
    <div class="form-group"><label class="form-label">Recipients</label>
      <input class="form-input" placeholder="amir@delonix.com, cfo@delonix.com"></div>
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn primary" data-act="toast" data-arg="Scheduled report saved — first delivery on Jul 1">Save schedule</button>
    </div>`);
}

/* ── Invite User ── */
function openInviteUser(){
  openDrawer('Invite Team Member',`
    <div class="form-group"><label class="form-label">Email address</label>
      <input class="form-input" type="email" placeholder="colleague@company.com"></div>
    <div class="form-row" style="margin-top:12px"><div class="form-group"><label class="form-label">Role</label>
      <select class="form-select"><option>Admin</option><option>Revenue Manager</option><option>Collections</option><option>Sales Ops</option><option>Viewer (read-only)</option></select></div>
      <div class="form-group"><label class="form-label">Team</label>
      <select class="form-select"><option>Finance</option><option>Billing</option><option>Sales</option><option>Executive</option></select></div></div>
    <div class="form-group" style="margin-top:10px"><label class="form-label">Personal message (optional)</label>
      <textarea class="form-textarea" placeholder="Add a note to the invitation email…" style="min-height:56px"></textarea></div>
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn primary" data-act="toast" data-arg="Invitation sent — they will receive an email to set up their account">Send invitation</button>
    </div>`);
}

/* ── Price Book ── */
function openPriceBook(){
  const books=[
    {name:'2026 Standard',desc:'Default list prices — all new accounts',accounts:189,active:true},
    {name:'Volume Discount',desc:'>10 seats — 15% discount applied',accounts:42,active:false},
    {name:'Enterprise Custom',desc:'Custom negotiated rates — requires approval',accounts:16,active:false},
  ];
  openDrawer('Price Book Management',`
    ${books.map(b=>`<div class="entity-card${b.active?' active':''}">
      <div style="flex:1">
        <div class="entity-name">${b.name}${b.active?` ${pill('good','Default')}`:''}</div>
        <div class="entity-meta">${b.desc} · ${b.accounts} accounts</div>
      </div>
      <div style="display:flex;gap:6px">
        <button class="btn ghost" style="font-size:11px;padding:4px 8px" data-act="editpricebook" data-arg="${b.id}">Edit</button>
        ${!b.active?`<button class="btn ghost" style="font-size:11px;padding:4px 8px" data-act="editpricebook" data-arg="${b.id}">Set default</button>`:''}
      </div>
    </div>`).join('')}
    <div class="form-footer">
      <button class="btn primary" data-act="newpricebook">+ New price book</button>
    </div>`);
}

/* ── Tax Config ── */
function openTaxConfig(){
  const nexus=[['California','CA','9.5%'],['New York','NY','8.875%'],['Texas','TX','6.25%'],
    ['Florida','FL','6%'],['Washington','WA','6.5%'],['Illinois','IL','6.25%'],
    ['Canada (GST)','CA','5%'],['EU VAT','EU','20%']];
  openDrawer('Tax Configuration',`
    <div class="form-section-title">Tax provider</div>
    <div class="radio-group" style="margin-bottom:16px">
      <label class="radio-opt selected"><input type="radio" name="taxp" checked style="accent-color:var(--ember)">
        <div><div style="font-size:13px;font-weight:600;color:var(--text)">Avalara</div><div style="font-size:11px;color:var(--pos)">Connected · auto-calculating</div></div></label>
      <label class="radio-opt"><input type="radio" name="taxp" style="accent-color:var(--ember)">
        <div><div style="font-size:13px;font-weight:600;color:var(--text)">TaxJar</div><div style="font-size:11px;color:var(--text-3)">Available — not connected</div></div></label>
      <label class="radio-opt"><input type="radio" name="taxp" style="accent-color:var(--ember)">
        <div><div style="font-size:13px;font-weight:600;color:var(--text)">Manual</div><div style="font-size:11px;color:var(--text-3)">Enter rates per jurisdiction</div></div></label>
    </div>
    <div class="form-section-title">Nexus jurisdictions</div>
    <div class="table-wrap" style="border:none;margin-bottom:12px"><table><thead><tr>
      <th>Jurisdiction</th><th>Code</th><th>Rate</th><th>Active</th></tr></thead><tbody>
      ${nexus.map(j=>`<tr><td class="nm">${j[0]}</td><td class="mut">${j[1]}</td><td class="tnum">${j[2]}</td>
        <td><div class="toggle on" data-act="toggle"><i></i></div></td></tr>`).join('')}
    </tbody></table></div>
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn primary" data-act="toast" data-arg="Tax configuration saved">Save configuration</button>
    </div>`);
}

/* ── Revenue Recognition Rules ── */
function openRevRules(){
  openDrawer('Recognition Rules',`
    <div class="form-section">
      <div class="form-section-title">Recognition method</div>
      <div class="radio-group" style="margin-bottom:16px">
        <label class="radio-opt selected"><input type="radio" name="rmethod" checked style="accent-color:var(--ember)">
          <div><div style="font-size:13px;font-weight:600;color:var(--text)">Ratable (straight-line)</div>
               <div style="font-size:11px;color:var(--text-3)">Recognize evenly over the service period</div></div></label>
        <label class="radio-opt"><input type="radio" name="rmethod" style="accent-color:var(--ember)">
          <div><div style="font-size:13px;font-weight:600;color:var(--text)">Event-based</div>
               <div style="font-size:11px;color:var(--text-3)">Recognize on specific milestone events</div></div></label>
        <label class="radio-opt"><input type="radio" name="rmethod" style="accent-color:var(--ember)">
          <div><div style="font-size:13px;font-weight:600;color:var(--text)">Manual</div>
               <div style="font-size:11px;color:var(--text-3)">Override per contract</div></div></label>
      </div>
    </div>
    <div class="form-section-title">Performance obligations</div>
    ${[['Platform access','Ratable','Monthly'],['Implementation services','Event','On completion'],
       ['Training & onboarding','Event','On delivery'],['Support (premium)','Ratable','Monthly'],
       ['Professional services','Manual','Per SOW']
      ].map(o=>`<div class="seq-step"><span class="seq-label" style="width:auto;flex:1">${o[0]}</span>
        <span class="seq-channel">${o[1]}</span><span class="seq-channel" style="color:var(--ember-soft)">${o[2]}</span>
        <button class="btn ghost" style="font-size:11px;padding:3px 8px" data-act="editobligation" data-arg="${o[0]}">Edit</button>
      </div>`).join('')}
    <div class="form-footer">
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
      <button class="btn primary" data-act="toast" data-arg="Recognition rules saved and applied to new contracts">Save rules</button>
    </div>`);
}



/* ===== ENTERPRISE DRAWERS ===== */

function openBizUnit(id){
  const b = BUS.find(x=>x.id===id) || BUS[0];
  const ent = LEGAL_ENTITIES.find(e=>e.id===b.entityId)||{};
  openDrawer(`Business Unit — ${b.name}`, `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
      <span class="bu-dot" style="width:16px;height:16px;background:${b.color};flex-shrink:0"></span>
      <div><div style="font-size:16px;font-weight:700">${b.name}</div><div class="mut" style="font-size:13px">${b.brand}</div></div>
      <span style="margin-left:auto">${b.status==='active'?pill('good','Active'):pill('warn','Migration')}</span>
    </div>
    <div class="drawer-tabs" id="buDrawerTabs">
      ${['Overview','Legal & Tax','GL Mappings','Invoice Grouping','Audit'].map((t,i)=>`<button class="${i===0?'on':''}" onclick="window._buTab('${t}',this)">${t}</button>`).join('')}
    </div>
    <div id="buDrawerBody" style="margin-top:16px"></div>
  `);
  const panels = {
    Overview:`
      <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-bottom:16px">
        <div class="fg"><label>Business Unit ID</label><div class="mono" style="font-size:13px">${b.id}</div></div>
        <div class="fg"><label>Brand Name</label><div>${b.brand}</div></div>
        <div class="fg"><label>Invoice Template</label><div>${b.template}</div></div>
        <div class="fg"><label>Legal Entity</label><div>${b.entity}</div></div>
        <div class="fg"><label>Currency</label><div class="mono">${b.currency}</div></div>
        <div class="fg"><label>Tax Profile</label><div>${b.taxProfile}</div></div>
        <div class="fg"><label>GL Export Destination</label><div>${b.glDest}</div></div>
        <div class="fg"><label>Active Subscriptions</label><div class="tnum">${b.subs}</div></div>
        <div class="fg"><label>MRR</label><div class="tnum">${b.mrr?'$'+b.mrr.toLocaleString():'—'}</div></div>
      </div>
      <div class="form-actions"><button class="btn primary" data-act="toast" data-arg="Business unit settings saved">Save Changes</button><button class="btn ghost" onclick="closeDrawer()">Cancel</button></div>`,
    'Legal & Tax':`
      <div style="margin-bottom:16px">
        <h4 style="font-size:13px;font-weight:700;margin-bottom:10px">Legal Entity</h4>
        <div class="entity-card" data-act="legalentity" data-arg="${ent.id||''}" style="cursor:pointer">
          <div class="entity-card-head"><span style="font-size:20px">${ent.flag||'🏢'}</span><div><div style="font-weight:700">${ent.name||b.entity}</div><div class="mut" style="font-size:12px">${ent.country||''} · Tax ID: ${ent.taxId||'—'}</div></div></div>
        </div>
      </div>
      <div style="margin-bottom:16px">
        <h4 style="font-size:13px;font-weight:700;margin-bottom:10px">Tax Profile: ${b.taxProfile}</h4>
        <div class="form-grid" style="grid-template-columns:1fr 1fr">
          <div class="fg"><label>Tax Basis</label><div>Net of discounts</div></div>
          <div class="fg"><label>Tax Rounding</label><div>Line-level</div></div>
          <div class="fg"><label>Default Tax Rate</label><div>8.25% (US-Standard)</div></div>
          <div class="fg"><label>VAT Registered</label><div>${ent.vatId&&ent.vatId!=='—'?ent.vatId:'No'}</div></div>
        </div>
      </div>
      <div class="val-banner warn">${svg(I.warning,14)} Tax profile changes affect all future invoices in this Business Unit. Retroactive changes require credit/rebill.</div>`,
    'GL Mappings':`
      <div class="table-wrap"><table>
        <thead><tr><th>Revenue Category</th><th>GL Account</th><th>Department</th></tr></thead>
        <tbody>
          <tr><td>Subscription Revenue</td><td class="mono">4000 · SaaS Revenue</td><td>—</td></tr>
          <tr><td>Overage Revenue</td><td class="mono">4010 · Usage Revenue</td><td>—</td></tr>
          <tr><td>Deferred Revenue (current)</td><td class="mono">2800 · Deferred Rev.</td><td>—</td></tr>
          <tr><td>Accounts Receivable</td><td class="mono">1200 · AR</td><td>—</td></tr>
          <tr><td>Discounts</td><td class="mono">4090 · Revenue Contra</td><td>—</td></tr>
          <tr><td>Tax Payable</td><td class="mono">2100 · Tax Payable</td><td>—</td></tr>
        </tbody>
      </table></div>
      <div class="form-actions" style="margin-top:12px"><button class="btn ghost" data-act="glmapping" data-arg="BU-001">Edit Mappings</button></div>`,
    'Invoice Grouping':`
      <div style="margin-bottom:16px">
        <h4 style="font-size:13px;font-weight:700;margin-bottom:4px">Default Policy</h4>
        <div class="mut" style="font-size:12px;margin-bottom:12px">Applied to all customers in this Business Unit unless overridden at account or subscription level.</div>
        <div class="grouping-inherit">
          <div class="grouping-level active"><span class="grouping-level-name">BU Default</span><span class="grouping-level-value">Consolidated invoice</span><span class="grouping-level-source">Active — applies to ${b.subs} subs</span></div>
          <div class="grouping-level"><span class="grouping-level-name">Account Override</span><span class="grouping-level-value">3 accounts use Split by BU</span><span class="grouping-level-source">Inherited from account settings</span></div>
          <div class="grouping-level"><span class="grouping-level-name">Subscription Override</span><span class="grouping-level-value">No overrides</span><span class="grouping-level-source">Uses account default</span></div>
        </div>
      </div>
      <div>
        <h4 style="font-size:13px;font-weight:700;margin-bottom:8px">Client-Selectable Options</h4>
        ${GROUPING_POLICIES.filter(p=>p.clientVisible).map(p=>`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)"><div style="flex:1"><div style="font-size:13px;font-weight:600">${p.name}</div><div class="mut" style="font-size:12px">${p.desc}</div></div>${p.requiresApproval?pill('warn','Approval required'):pill('good','Self-service')}</div>`).join('')}
      </div>`,
    Audit:`
      <div>
        <div class="audit-row"><span class="audit-ts">Jun 28 · 09:14</span><span class="audit-user">Sarah K.</span><span class="audit-action">Updated GL mapping — 4000 · SaaS Revenue</span><span class="audit-change"></span></div>
        <div class="audit-row"><span class="audit-ts">Jun 15 · 14:22</span><span class="audit-user">Finance Bot</span><span class="audit-action">Tax profile changed from US-Standard to US-${b.name.slice(0,5)}</span><span class="audit-change"><span style="color:var(--neg)">Before: US-Standard</span></span></div>
        <div class="audit-row"><span class="audit-ts">May 01 · 10:00</span><span class="audit-user">Admin</span><span class="audit-action">Business unit created</span><span class="audit-change"></span></div>
      </div>`,
  };
  window._buTab = (t,btn) => {
    document.querySelectorAll('#buDrawerTabs button').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    document.getElementById('buDrawerBody').innerHTML=panels[t]||'';
  };
  document.getElementById('buDrawerBody').innerHTML=panels.Overview;
}

function openLegalEntity(id){
  const e = LEGAL_ENTITIES.find(x=>x.id===id)||LEGAL_ENTITIES[0];
  openDrawer(`Legal Entity — ${e.name}`, `
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px">
      <span style="font-size:28px">${e.flag}</span>
      <div><div style="font-size:16px;font-weight:700">${e.name}</div><div class="mut">${e.country} · ${e.currency} · ${e.glSystem}</div></div>
      ${pill('good','Active')}
    </div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-bottom:18px">
      <div class="fg"><label>Legal Name</label><div>${e.name}</div></div>
      <div class="fg"><label>Country</label><div>${e.country}</div></div>
      <div class="fg"><label>Tax ID / EIN</label><div class="mono">${e.taxId}</div></div>
      <div class="fg"><label>VAT Number</label><div class="mono">${e.vatId}</div></div>
      <div class="fg"><label>Reporting Currency</label><div class="mono">${e.currency}</div></div>
      <div class="fg"><label>GL System</label><div>${e.glSystem}</div></div>
      <div class="fg"><label>AR Account</label><div class="mono" style="font-size:12px">${e.arAcct}</div></div>
      <div class="fg"><label>Deferred Revenue</label><div class="mono" style="font-size:12px">${e.deferredAcct}</div></div>
    </div>
    <h4 style="font-size:13px;font-weight:700;margin-bottom:10px">Active Business Units</h4>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px">
      ${e.bUs.map(id=>{const b=BUS.find(x=>x.id===id);return b?`<span class="bu-badge" data-act="bizunit" data-arg="${b.id}" style="cursor:pointer"><span class="bu-dot" style="background:${b.color}"></span>${b.name}</span>`:'';}).join('')}
    </div>
    <div class="val-banner info">${svg(I.entity,14)} Invoices from different legal entities require explicit grouping policies. Tax registrations and remittance details are managed per entity.</div>
    <div class="form-actions" style="margin-top:16px"><button class="btn primary" data-act="toast" data-arg="Legal entity saved">Save Changes</button><button class="btn ghost" onclick="closeDrawer()">Cancel</button></div>
  `);
}

function openInvoiceGroupingPolicy(accountId){
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
      ${GROUPING_POLICIES.map((p,i)=>`<label style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border:1.5px solid ${i===1?'var(--ember)':'var(--border)'};border-radius:8px;cursor:pointer;background:${i===1?'var(--ember-glow)':'var(--surface)'}">
        <input type="radio" name="gp_radio" ${i===1?'checked':''} style="margin-top:2px">
        <div style="flex:1"><div style="font-weight:600;font-size:13px">${p.name}${p.requiresApproval?' <span style="font-size:11px;color:var(--warn)">(requires approval)</span>':''}</div><div class="mut" style="font-size:12px;margin-top:2px">${p.desc}</div></div>
        ${p.clientVisible?pill('muted','Client-visible'):''}
      </label>`).join('')}
    </div>
    <div class="val-banner warn">${svg(I.warning,14)} Changes apply to the entire open billing period (June 2026). After finalization, grouping changes require a credit/rebill correction.</div>
    <div class="form-actions" style="margin-top:16px"><button class="btn primary" data-act="toast" data-arg="Invoice grouping policy updated — applying to Jun 2026 open period">Apply Change</button><button class="btn ghost" onclick="closeDrawer()">Cancel</button></div>
  `);
}

function openRatingDetail(lineId){
  openDrawer('Rating Detail — ' + (lineId||'INV-2026-0847'), `
    <div class="mut" style="font-size:12px;margin-bottom:16px">Shows how each line item was calculated from the subscription, price rule, and usage data.</div>
    <div style="margin-bottom:16px">
      <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-bottom:0">
        <div class="fg"><label>Subscription</label><div class="mono" style="font-size:12px">SUB-2026-0821</div></div>
        <div class="fg"><label>Product Version</label><div class="mut" style="font-size:12px">Enterprise Plan v4.2</div></div>
        <div class="fg"><label>Price Rule</label><div class="mono" style="font-size:12px">PR-ENT-MONTHLY-2026</div></div>
        <div class="fg"><label>Billing Period</label><div class="mut" style="font-size:12px">Jun 1–30, 2026</div></div>
        <div class="fg"><label>GL Account</label><div class="mono" style="font-size:12px">4000 · SaaS Revenue</div></div>
        <div class="fg"><label>Tax Profile</label><div class="mut" style="font-size:12px">US-Standard · 8.25%</div></div>
      </div>
    </div>
    <h4 style="font-size:13px;font-weight:700;margin-bottom:10px">Charge Calculation</h4>
    <div>
      <div class="rating-line"><span class="rating-line-label">Base subscription charge</span><span class="rating-line-note">$9,200 / month</span><span class="rating-line-amt">$9,200.00</span></div>
      <div class="rating-line"><span class="rating-line-label">Proration (30/30 days)</span><span class="rating-line-note">Full month · no proration</span><span class="rating-line-amt" style="color:var(--text-3)">× 1.0000</span></div>
      <div class="rating-line"><span class="rating-line-label">Volume tier discount</span><span class="rating-line-note">Tier 3 · &gt;3000 seats · −5%</span><span class="rating-line-amt" style="color:var(--neg)">−$460.00</span></div>
      <div class="rating-line"><span class="rating-line-label">Contracted discount</span><span class="rating-line-note">Annual commitment discount</span><span class="rating-line-amt" style="color:var(--neg)">−$0.00</span></div>
      <div class="rating-line"><span class="rating-line-label">Subtotal (pre-tax)</span><span class="rating-line-note"></span><span class="rating-line-amt">$8,740.00</span></div>
      <div class="rating-line"><span class="rating-line-label">Tax</span><span class="rating-line-note">US-Standard · 8.25% on $8,740</span><span class="rating-line-amt">$721.05</span></div>
      <div class="rating-total"><span>Final charge</span><span>$9,461.05</span></div>
    </div>
    <div style="margin-top:16px">
      <div class="val-banner info" style="margin-bottom:0">${svg(I.rating,14)} This calculation is based on the price rule snapshot at billing generation time. The source rule version is locked to the invoice and cannot be retroactively changed.</div>
    </div>
  `);
}

function openAuditHistory(arg){
  const parts = (arg||'').split(':');
  const objType = parts[0]||'Invoice', objId = parts[1]||'INV-2026-0847';
  const auditData = [
    {ts:'Jun 28 · 14:33',user:'Finance Bot',role:'System',action:'Invoice finalized — sent to customer',change:'Status: Draft → Finalized'},
    {ts:'Jun 28 · 14:32',user:'Sarah K.',role:'Finance',action:'Draft reviewed and approved',change:'Approval ref: APR-2026-0114'},
    {ts:'Jun 28 · 09:14',user:'Finance Bot',role:'System',action:'Draft invoice generated from billing run',change:'Amount: $9,200.00'},
    {ts:'Jun 22 · 11:20',user:'Admin',role:'Admin',action:'Invoice grouping policy updated',change:'Consolidated → Split by BU'},
    {ts:'Jun 01 · 00:01',user:'System',role:'System',action:'Billing period opened — June 2026',change:''},
  ];
  openDrawer(`Audit History — ${objType} ${objId}`, `
    <div class="toolbar" style="margin-bottom:12px">
      <span class="chip">${svg(I.filter,13)} Action type</span>
      <span class="chip">${svg(I.filter,13)} User</span>
      <div class="spacer"></div>
      <button class="btn ghost" style="font-size:12px;padding:5px 10px" data-act="toast" data-arg="Audit log exported">Export Log</button>
    </div>
    <div>${auditData.map(a=>`<div class="audit-row">
      <span class="audit-ts">${a.ts}</span>
      <span class="audit-user">${a.user}<br><span style="font-weight:400;font-size:11px;color:var(--text-3)">${a.role}</span></span>
      <span class="audit-action">${a.action}</span>
      <span class="audit-change" style="color:var(--text-3)">${a.change}</span>
    </div>`).join('')}</div>
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
    <div class="form-actions"><button class="btn primary" data-act="toast" data-arg="Credit/rebill submitted for Finance approval — APR-2026-0115">Submit for Approval</button><button class="btn ghost" onclick="closeDrawer()">Cancel</button></div>
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
    <div class="form-actions" style="margin-top:16px"><button class="btn primary" data-act="toast" data-arg="Validation re-run started">Re-run Validation</button><button class="btn ghost" onclick="closeDrawer()">Close</button></div>
  `);
}

function openUsageEvent(id){
  const evts = {
    'EVT-8821042':{src:'BuildStream-API',srcId:'bs_evt_4821042',idempotency:'bsv2-4821042',eventTs:'Jun 28 2026 14:32:01 UTC',receivedTs:'Jun 28 2026 14:32:02 UTC',acct:'AC-4821',acctName:'Northwind Logistics',product:'API Calls',qty:'14,200',unit:'calls',status:'accepted',tier:'Business+',overage:200,invoiced:'INV-2026-DRAFT-4',ratingStatus:'rated'},
    'EVT-8820991':{src:'BuildStream-API',srcId:'bs_evt_4820991',idempotency:'bsv2-4820991',eventTs:'Jun 28 2026 13:48:20 UTC',receivedTs:'Jun 28 2026 13:48:21 UTC',acct:'AC-UNKNOWN',acctName:'Unknown',product:'API Calls',qty:'200',unit:'calls',status:'rejected',rejectionReason:'No account mapping — source ID "AC-UNKNOWN" not found in account registry.',invoiced:null,ratingStatus:'not rated'},
  };
  const e = evts[id]||evts['EVT-8821042'];
  openDrawer(`Usage Event — ${id}`, `
    <div style="margin-bottom:16px">${e.status==='accepted'?pill('good','Accepted'):e.status==='rejected'?pill('neg','Rejected'):pill('warn',e.status)}</div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-bottom:16px">
      <div class="fg"><label>Event ID</label><div class="mono" style="font-size:12px">${id}</div></div>
      <div class="fg"><label>Source System</label><div>${e.src}</div></div>
      <div class="fg"><label>Source Event ID</label><div class="mono" style="font-size:12px">${e.srcId}</div></div>
      <div class="fg"><label>Idempotency Key</label><div class="mono" style="font-size:12px">${e.idempotency||'—'}</div></div>
      <div class="fg"><label>Event Timestamp</label><div class="tnum" style="font-size:12px">${e.eventTs}</div></div>
      <div class="fg"><label>Received</label><div class="tnum" style="font-size:12px">${e.receivedTs}</div></div>
      <div class="fg"><label>Account</label><div>${e.acctName} <span class="mono mut" style="font-size:11px">${e.acct}</span></div></div>
      <div class="fg"><label>Product</label><div>${e.product}</div></div>
      <div class="fg"><label>Quantity</label><div class="tnum">${e.qty} ${e.unit}</div></div>
      <div class="fg"><label>Applied to Invoice</label><div class="mono" style="font-size:12px">${e.invoiced||'—'}</div></div>
    </div>
    ${e.rejectionReason?`<div class="val-banner error">${svg(I.warning,14)} <div><strong>Rejection reason:</strong> ${e.rejectionReason}</div></div>`:''}
    ${e.status==='accepted'?`<button class="btn ghost" style="font-size:12px" data-act="ratingdetail" data-arg="${id}">View rating detail</button>`:`<button class="btn primary" style="font-size:12px" data-act="migrationdetail" data-arg="${id}">Fix Mapping &amp; Replay</button>`}
  `);
}

function openMigrationDetail(id){
  openDrawer('Migration Detail — ' + id, `
    <div class="val-banner warn" style="margin-bottom:16px">${svg(I.migration,15)} <strong>BuildStream acquisition migration in progress.</strong> This customer requires manual mapping before billing can proceed.</div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-bottom:16px">
      <div class="fg"><label>Legacy Customer ID</label><div class="mono">${id}</div></div>
      <div class="fg"><label>Legacy Name</label><div>Riverfront Properties</div></div>
      <div class="fg"><label>Legacy Product</label><div>BuildStream Pro</div></div>
      <div class="fg"><label>Legacy MRR</label><div class="tnum">$4,800</div></div>
      <div class="fg"><label>Migration Batch</label><div>BATCH-2026-06</div></div>
      <div class="fg"><label>Reconciliation Status</label><div>${pill('warn','Pending')}</div></div>
    </div>
    <h4 style="font-size:13px;font-weight:700;margin-bottom:10px">Map to delonix</h4>
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg"><label>delonix Customer</label><select class="finput"><option>— create new —</option><option>Northwind Logistics</option><option>Acme Corp</option></select></div>
      <div class="fg"><label>Business Unit</label><select class="finput"><option>BU-001 · Residential</option><option>BU-002 · Commercial</option></select></div>
      <div class="fg"><label>Map to Product</label><select class="finput"><option>— select —</option><option>Enterprise Plan</option><option>Business Plan</option></select></div>
      <div class="fg"><label>Mapping Confidence</label><div>${pill('warn','Manual — low confidence')}</div></div>
    </div>
    <div class="form-actions" style="margin-top:16px"><button class="btn primary" data-act="toast" data-arg="Migration mapping saved — customer mapped to BU-001">Save Mapping</button><button class="btn ghost" onclick="closeDrawer()">Cancel</button></div>
  `);
}

function openGroupingPolicy(id){
  openInvoiceGroupingPolicy(id);
}

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

function openDownloadPanel(arg){
  const parts=(arg||'pdf|Document|').split('|');
  const fmt=parts[0]||'pdf', title=parts[1]||'Document', detail=parts[2]||'';
  const fmtIcon = fmt==='pdf'?'📄':fmt==='xlsx'?'📊':fmt==='csv'?'📋':'📦';
  const fmtLabel = fmt.toUpperCase();
  openDrawer(`Export — ${title}`, `
    <div style="text-align:center;padding:24px 0 16px">
      <div style="font-size:48px;margin-bottom:12px">${fmtIcon}</div>
      <div style="font-weight:700;font-size:17px;margin-bottom:4px">${title}</div>
      <div class="mut" style="font-size:13px">${detail}</div>
    </div>
    <div style="padding:16px 14px;border:1px solid var(--border);border-radius:8px;margin-bottom:16px">
      <div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:8px">
        <span class="mut">Format</span><span class="mono" style="font-weight:600">${fmtLabel}</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:8px">
        <span class="mut">Generated</span><span>Jun 28 2026 · just now</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:12.5px">
        <span class="mut">Status</span><span style="color:var(--pos);font-weight:600">${svg(I.check,13)} Ready</span>
      </div>
    </div>
    <div class="form-actions">
      <button class="btn primary" onclick="toast('${fmtLabel} downloaded — check your Downloads folder');closeDrawer()">${svg(I.download,14)} Download ${fmtLabel}</button>
      <button class="btn ghost" onclick="toast('Link copied to clipboard')">Copy link</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openNewPlan(){
  openDrawer('New Plan', `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Plan name</label><input class="finput" placeholder="e.g. Enterprise Plus" autofocus></div>
      <div class="fg"><label>Business Unit</label><select class="finput">${BUS.map(b=>`<option value="${b.id}">${b.name}</option>`).join('')}</select></div>
      <div class="fg"><label>Billing interval</label><select class="finput"><option>Monthly</option><option>Annual</option><option>Usage-based</option><option>Custom</option></select></div>
      <div class="fg"><label>Base price</label><input class="finput" type="number" placeholder="0.00"></div>
      <div class="fg"><label>Currency</label><select class="finput"><option>USD</option><option>EUR</option><option>GBP</option></select></div>
      <div class="fg"><label>Trial days</label><input class="finput" type="number" placeholder="0" value="0"></div>
      <div class="fg"><label>Status</label><select class="finput"><option>Draft</option><option>Active</option></select></div>
      <div class="fg" style="grid-column:1/-1"><label>Description</label><textarea class="finput" rows="2" placeholder="Customer-facing description shown on invoices and portal"></textarea></div>
    </div>
    <h4 style="font-size:13px;font-weight:700;margin:14px 0 10px">Entitlements</h4>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
      <div style="display:grid;grid-template-columns:1fr 1fr 80px;gap:8px;align-items:center">
        <input class="finput" placeholder="Feature / meter name" value="API Calls">
        <input class="finput" placeholder="Limit or Unlimited" value="1,000,000 / mo">
        <button class="btn ghost" style="padding:6px 10px;font-size:12px" data-act="toast" data-arg="Line item removed">✕</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 80px;gap:8px;align-items:center">
        <input class="finput" placeholder="Feature / meter name" value="Storage">
        <input class="finput" placeholder="Limit or Unlimited" value="100 GB">
        <button class="btn ghost" style="padding:6px 10px;font-size:12px" data-act="toast" data-arg="Line item removed">✕</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 80px;gap:8px;align-items:center">
        <input class="finput" placeholder="Feature / meter name" value="Seats">
        <input class="finput" placeholder="Limit or Unlimited" value="Unlimited">
        <button class="btn ghost" style="padding:6px 10px;font-size:12px" data-act="toast" data-arg="Line item removed">✕</button>
      </div>
    </div>
    <button class="btn ghost" style="font-size:12px;width:100%" data-act="toast" data-arg="Line item added">+ Add entitlement</button>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="New plan saved as draft">Save Draft</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openEditPlan(name){
  openDrawer(`Edit Plan — ${name||'Enterprise'}`, `
    <div class="val-banner warn" style="margin-bottom:14px">${svg(I.warning,14)} Changes to a published plan apply to <strong>new subscriptions only</strong>. Existing subscriptions retain the current terms until renewal or manual update.</div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Plan name</label><input class="finput" value="${name||'Enterprise'}"></div>
      <div class="fg"><label>Base price</label><input class="finput" type="number" value="9200"></div>
      <div class="fg"><label>Billing interval</label><select class="finput"><option selected>Monthly</option><option>Annual</option></select></div>
      <div class="fg"><label>Status</label><select class="finput"><option selected>Active</option><option>Draft</option><option>Archived</option></select></div>
      <div class="fg"><label>Affected subscriptions</label><div class="tnum mut">47 active</div></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Plan changes saved — applying to new subscriptions">Save Changes</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openNewPricebook(){
  openDrawer('New Price Book', `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Price book name</label><input class="finput" placeholder="e.g. Enterprise Q3 2026" autofocus></div>
      <div class="fg"><label>Business Unit</label><select class="finput">${BUS.map(b=>`<option>${b.name}</option>`).join('')}</select></div>
      <div class="fg"><label>Currency</label><select class="finput"><option>USD</option><option>EUR</option></select></div>
      <div class="fg"><label>Effective from</label><input class="finput" type="date" value="2026-07-01"></div>
      <div class="fg"><label>Status</label><select class="finput"><option>Draft</option><option>Active</option></select></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Price book created as draft">Create Price Book</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openEditPricebook(nameOrId){
  const name = nameOrId||'Standard Q2 2026';
  const plans = ['Enterprise Plus','Enterprise','Business+','Business','Starter'];
  const prices = [12000,9200,4200,1800,650];
  openDrawer(`Price Book — ${name}`, `
    <div style="display:flex;gap:10px;margin-bottom:16px;align-items:center">
      ${pill('good','Active')}
      <span class="mut" style="font-size:12px">Effective: Jan 1, 2026 – present</span>
      <span style="margin-left:auto"><button class="btn ghost" style="font-size:12px;padding:5px 10px" data-act="toast" data-arg="Price book archived">Archive</button></span>
    </div>
    <div class="table-wrap"><table>
      <thead><tr><th>Plan</th><th>List Price</th><th>Min. Commitment</th><th>Overage Rate</th><th></th></tr></thead>
      <tbody>${plans.map((p,i)=>`<tr>
        <td style="font-weight:600">${p}</td>
        <td class="tnum">$${prices[i].toLocaleString()}/mo</td>
        <td class="tnum mut">${i<2?'$'+prices[i].toLocaleString()+'/yr':'—'}</td>
        <td class="tnum mut">${i<3?'$0.002 / API call':'—'}</td>
        <td><button class="btn ghost" style="padding:4px 8px;font-size:11px" data-act="toast" data-arg="Editing ${p} pricing">Edit</button></td>
      </tr>`).join('')}</tbody>
    </table></div>
    <div class="form-actions" style="margin-top:12px">
      <button class="btn primary" data-act="toast" data-arg="Price book saved">Save Changes</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openEditObligation(name){
  openDrawer(`Edit Obligation — ${name||'Subscription Revenue'}`, `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Obligation name</label><input class="finput" value="${name||'Subscription Revenue'}"></div>
      <div class="fg"><label>Recognition method</label><select class="finput"><option selected>Straight-line over term</option><option>Percentage of completion</option><option>Usage-based</option><option>Point-in-time</option></select></div>
      <div class="fg"><label>Performance obligation type</label><select class="finput"><option selected>Stand-alone service</option><option>Bundle component</option><option>One-time setup</option></select></div>
      <div class="fg"><label>SSP method</label><select class="finput"><option selected>Adjusted market approach</option><option>Expected cost + margin</option><option>Residual approach</option></select></div>
      <div class="fg"><label>Revenue GL account</label><input class="finput" value="4000 · SaaS Revenue"></div>
      <div class="fg"><label>Deferred GL account</label><input class="finput" value="2800 · Deferred Revenue"></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Obligation saved">Save Obligation</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openNewMeter(){
  openDrawer('New Usage Meter', `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Meter name</label><input class="finput" placeholder="e.g. API Calls" autofocus></div>
      <div class="fg"><label>Meter ID / slug</label><input class="finput" placeholder="api_calls" style="font-family:monospace"></div>
      <div class="fg"><label>Unit of measure</label><input class="finput" placeholder="calls, GB, users, unit-nights…"></div>
      <div class="fg"><label>Aggregation</label><select class="finput"><option>Sum</option><option>Max</option><option>Count distinct</option><option>Last value</option></select></div>
      <div class="fg"><label>Reset interval</label><select class="finput"><option>Monthly</option><option>Annually</option><option>Never (cumulative)</option></select></div>
      <div class="fg"><label>Idempotency</label><select class="finput"><option selected>Required (recommended)</option><option>Optional</option><option>Disabled</option></select></div>
      <div class="fg" style="grid-column:1/-1"><label>Source system filter</label><input class="finput" placeholder="Leave blank to accept from all sources"></div>
    </div>
    <div class="val-banner info" style="margin-top:12px">${svg(I.rating,14)} Meter ID is immutable after creation. Events must include this ID as the meter reference to be counted.</div>
    <div class="form-actions" style="margin-top:14px">
      <button class="btn primary" data-act="toast" data-arg="New meter created — begin sending events to start tracking">Create Meter</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openUsageImport(){
  openDrawer('Import Usage Events', `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1">
        <label>Upload CSV or JSONL</label>
        <div style="border:2px dashed var(--border-2);border-radius:8px;padding:28px;text-align:center;color:var(--text-3);cursor:pointer" onclick="toast('File picker opened')">
          <div style="font-size:24px;margin-bottom:8px">📂</div>
          <div style="font-size:13px">Drop file here or click to browse</div>
          <div class="mut" style="font-size:11.5px;margin-top:4px">CSV or JSONL · max 100 MB · up to 1M events</div>
        </div>
      </div>
      <div class="fg"><label>Source system</label><select class="finput"><option>BuildStream-API</option><option>Meter-v2</option><option>Legacy-CSV</option><option>Manual</option></select></div>
      <div class="fg"><label>Deduplication</label><select class="finput"><option selected>Skip duplicates (idempotency key)</option><option>Allow duplicates</option><option>Error on duplicates</option></select></div>
      <div class="fg"><label>Billing period override</label><input class="finput" placeholder="Leave blank to use event timestamp"></div>
      <div class="fg"><label>Validation mode</label><select class="finput"><option selected>Validate then import</option><option>Import with warnings</option></select></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Usage import queued — validating 0 events">Start Import</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

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

function openChangePlan(acct){
  openDrawer(`Change Plan — ${acct||'Account'}`, `
    <div class="mut" style="font-size:12.5px;margin-bottom:16px">Plan changes take effect at the next billing cycle unless immediate activation is selected. Proration will apply for mid-cycle changes.</div>
    <div style="margin-bottom:16px">
      <div style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:6px">CURRENT PLAN</div>
      <div style="padding:10px 14px;border:1px solid var(--ember);border-radius:8px;background:var(--ember-glow)">${pill('ember','Enterprise')} <span style="margin-left:8px;font-size:13px;font-weight:600">$9,200 / month</span></div>
    </div>
    <div>
      <div style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:8px">SELECT NEW PLAN</div>
      <div style="display:flex;flex-direction:column;gap:7px">
        ${[['Enterprise+','$12,000','Unlimited API · Priority support'],['Enterprise','$9,200','Current plan'],['Business+','$4,200','5M API · 500GB storage'],['Business','$1,800','1M API · 100GB storage']].map((p,i)=>`<label style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1.5px solid ${i===1?'var(--ember)':'var(--border)'};border-radius:8px;cursor:pointer">
          <input type="radio" name="planchange" ${i===1?'checked':''}> <div style="flex:1"><div style="font-weight:600;font-size:13px">${p[0]}</div><div class="mut" style="font-size:12px">${p[2]}</div></div><span class="tnum" style="font-weight:700">${p[1]}/mo</span>
        </label>`).join('')}
      </div>
    </div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-top:12px">
      <div class="fg"><label>Effective date</label><select class="finput"><option selected>Next billing cycle (Jul 1)</option><option>Immediately (prorated)</option></select></div>
      <div class="fg"><label>Reason</label><select class="finput"><option>Customer request</option><option>Sales negotiation</option><option>Auto-upgrade</option></select></div>
    </div>
    <div class="form-actions" style="margin-top:14px">
      <button class="btn primary" data-act="toast" data-arg="Plan change scheduled — effective Jul 1">Confirm Change</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openDateRangePicker(context){
  openDrawer('Select Date Range', `
    <div style="margin-bottom:14px">
      <div style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:8px">QUICK RANGES</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
        ${[['This month','Jun 1 – Jun 28, 2026'],['Last month','May 1 – May 31, 2026'],['This quarter','Apr 1 – Jun 30, 2026'],['Last quarter','Jan 1 – Mar 31, 2026'],['YTD','Jan 1 – Jun 28, 2026'],['Last 12 months','Jul 2025 – Jun 2026']].map(([l,d])=>`<button class="btn ghost" style="text-align:left;font-size:12px;padding:8px 12px" data-act="toast" data-arg="Date range set to ${l}"><div style="font-weight:600">${l}</div><div class="mut" style="font-size:11px">${d}</div></button>`).join('')}
      </div>
    </div>
    <div style="margin-bottom:14px">
      <div style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:8px">CUSTOM RANGE</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div class="fg" style="margin:0"><label>From</label><input class="finput" type="date" value="2026-06-01"></div>
        <div class="fg" style="margin:0"><label>To</label><input class="finput" type="date" value="2026-06-28"></div>
      </div>
    </div>
    <div class="form-actions">
      <button class="btn primary" data-act="toast" data-arg="Date range set to custom Jun 1–28">Apply Range</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
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
      <button class="btn primary" data-act="toast" data-arg="Invoice footer saved — applies to new invoices">Save Footer</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openLogoUpload(){
  openDrawer('Brand Logo', `
    <div class="mut" style="font-size:12.5px;margin-bottom:14px">Logo appears on invoices, the customer portal, and email notifications. Separate logos can be set per Business Unit.</div>
    <div style="border:2px dashed var(--border-2);border-radius:8px;padding:28px;text-align:center;cursor:pointer;margin-bottom:14px" onclick="toast('File picker opened')">
      <div style="font-size:36px;margin-bottom:8px">🖼</div>
      <div style="font-size:13px;font-weight:600">Upload logo</div>
      <div class="mut" style="font-size:12px;margin-top:4px">PNG or SVG · 200×200px minimum · transparent background recommended</div>
    </div>
    <div style="margin-bottom:14px">
      <div style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:8px">BUSINESS UNIT OVERRIDES</div>
      ${BUS.slice(0,3).map(b=>`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)"><span class="bu-badge"><span class="bu-dot" style="background:${b.color}"></span>${b.name}</span><span class="mut" style="font-size:12px;flex:1">Using default logo</span><button class="btn ghost" style="font-size:11px;padding:3px 8px" data-act="toast" data-arg="Logo upload for ${b.name}">Upload</button></div>`).join('')}
    </div>
    <div class="form-actions"><button class="btn primary" data-act="toast" data-arg="Logo uploaded and saved">Save</button><button class="btn ghost" onclick="closeDrawer()">Cancel</button></div>
  `);
}

function openPortalThemeEditor(){
  openDrawer('Customer Portal Theme', `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg"><label>Primary accent color</label><div style="display:flex;gap:8px;align-items:center"><input class="finput" value="#ff5a1f" style="max-width:110px;font-family:monospace"><div style="width:28px;height:28px;border-radius:6px;background:#ff5a1f;flex-shrink:0"></div></div></div>
      <div class="fg"><label>Font family</label><select class="finput"><option selected>Inter (default)</option><option>System UI</option><option>DM Sans</option><option>Roboto</option></select></div>
      <div class="fg"><label>Border radius</label><select class="finput"><option>Sharp (0px)</option><option selected>Rounded (6px)</option><option>Pill (12px)</option></select></div>
      <div class="fg"><label>Logo position</label><select class="finput"><option selected>Top left</option><option>Top center</option></select></div>
    </div>
    <div style="margin-top:14px">
      <div style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:8px">PORTAL PREVIEW</div>
      <div style="padding:16px;border:1px solid var(--border);border-radius:8px;background:var(--bg-2)">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
          <div style="width:24px;height:24px;border-radius:4px;background:#ff5a1f"></div>
          <span style="font-weight:700;font-size:14px">delonix Billing</span>
        </div>
        <div style="font-size:12px;color:var(--text-2);margin-bottom:8px">Your invoices</div>
        <div style="padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:12px;background:var(--surface)">INV-2026-0847 · Jun 2026 · $9,200.00 · ${pill('good','Paid')}</div>
      </div>
    </div>
    <div class="form-actions" style="margin-top:14px">
      <button class="btn primary" data-act="toast" data-arg="Portal theme saved and published">Save & Publish</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openRenewalQuote(acct){
  openDrawer(`Renewal Quote — ${acct||'Account'}`, `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg"><label>Contract end date</label><div class="tnum">Jun 30, 2026</div></div>
      <div class="fg"><label>Current ARR</label><div class="tnum">$110,400</div></div>
      <div class="fg"><label>Renewal term</label><select class="finput"><option selected>12 months</option><option>24 months</option><option>36 months</option></select></div>
      <div class="fg"><label>Renewal type</label><select class="finput"><option selected>Auto-renew at current pricing</option><option>Price increase (CPI + 3%)</option><option>Custom pricing</option><option>Do not renew</option></select></div>
      <div class="fg"><label>Renewal ARR</label><input class="finput" type="number" value="110400"></div>
      <div class="fg"><label>Discount</label><input class="finput" type="number" placeholder="0" value="0">%</div>
    </div>
    <div class="form-actions" style="margin-top:14px">
      <button class="btn primary" data-act="toast" data-arg="Renewal quote QT-2026-0095 created and sent for review">Create Renewal Quote</button>
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

function openReportArchive(){
  openDrawer('Report Archive', `
    <div class="toolbar" style="margin-bottom:12px">
      <span class="chip">${svg(I.filter,13)} Report type</span>
      <span class="chip">${svg(I.filter,13)} Period</span>
      <div class="spacer"></div>
    </div>
    <div class="table-wrap"><table>
      <thead><tr><th>Report</th><th>Period</th><th>Generated</th><th>Format</th><th></th></tr></thead>
      <tbody>
        ${[['Revenue Analytics','May 2026','Jun 1 · 09:00','PDF'],['A/R Aging Detail','May 2026','Jun 1 · 09:05','XLSX'],['Board Pack','Q1 2026','Apr 2 · 08:00','PDF'],['MRR Movement Bridge','Q1 2026','Apr 2 · 08:05','XLSX'],['Tax Liability Summary','Q1 2026','Apr 15 · 12:00','XLSX'],['Collections Risk Report','Apr 2026','May 1 · 09:10','XLSX']].map(([n,p,g,f])=>`<tr>
          <td style="font-weight:600;font-size:13px">${n}</td>
          <td class="mut">${p}</td>
          <td class="mut tnum" style="font-size:11.5px">${g}</td>
          <td class="mono mut" style="font-size:11.5px">${f}</td>
          <td><button class="btn ghost" style="padding:4px 8px;font-size:11px" data-act="download" data-arg="${f.toLowerCase()}|${n}|${p}">Download</button></td>
        </tr>`).join('')}
      </tbody>
    </table></div>
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

function openCollectionsSweep(){
  const accounts = [
    {name:'Meridian Tech',  overdue:'$1,450', days:59, action:'Email + phone'},
    {name:'Bridgepoint',    overdue:'$2,150', days:31, action:'Email reminder'},
    {name:'Apex Systems',   overdue:'$5,800', days:28, action:'Email reminder'},
    {name:'Fulcrum Labs',   overdue:'$3,400', days:28, action:'Email reminder'},
    {name:'Cascade Analytics',overdue:'$2,950', days:87, action:'Final notice + legal hold'},
  ];
  openDrawer('Collections Sweep — June 28, 2026', `
    <div class="val-banner warn" style="margin-bottom:14px">${svg(I.dunning,14)} <strong>${accounts.length} accounts</strong> have overdue balances totalling <strong>$15,750</strong>. This sweep will send reminders and log collection attempts.</div>
    <div class="table-wrap" style="margin-bottom:14px"><table>
      <thead><tr><th>Account</th><th class="num">Overdue</th><th>Days past due</th><th>Planned action</th></tr></thead>
      <tbody>${accounts.map(a=>`<tr>
        <td style="font-weight:600">${a.name}</td>
        <td class="num tnum" style="color:var(--neg)">${a.overdue}</td>
        <td class="tnum" style="color:${a.days>60?'var(--neg)':a.days>30?'var(--warn)':'var(--text-2)'}">${a.days}d</td>
        <td style="font-size:12px">${a.action}</td>
      </tr>`).join('')}
      </tbody>
    </table></div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg"><label>From email</label><input class="finput" value="ar@delonix.io"></div>
      <div class="fg"><label>CC Finance</label><input class="finput" value="finance@delonix.io"></div>
    </div>
    <div class="form-actions" style="margin-top:12px">
      <button class="btn primary" data-act="toast" data-arg="Collections sweep complete — 5 reminders sent · 5 attempts logged">Run Sweep</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openSuspendAccount(acct){
  openDrawer(`Suspend Account — ${acct||'Account'}`, `
    <div class="val-banner error" style="margin-bottom:16px">${svg(I.warning,15)} <strong>Account suspension immediately revokes the customer's access.</strong> This action is reversible but will interrupt the customer's service.</div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg"><label>Reason</label><select class="finput"><option selected>Non-payment</option><option>Fraud suspicion</option><option>Terms violation</option><option>Customer request</option></select></div>
      <div class="fg"><label>Notify customer</label><select class="finput"><option selected>Yes — send suspension email</option><option>No — silent suspension</option></select></div>
      <div class="fg" style="grid-column:1/-1"><label>Internal note</label><textarea class="finput" rows="2" placeholder="Reason for suspension — visible in audit log"></textarea></div>
    </div>
    <div class="form-actions" style="margin-top:14px">
      <button class="btn" style="background:var(--neg);color:#fff;padding:9px 18px;border-radius:8px;border:none;cursor:pointer;font-weight:600" data-act="toast" data-arg="Account suspended — customer notified">Suspend Account</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
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

function openNewBizUnit(){
  openDrawer('New Business Unit', `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Business Unit name</label><input class="finput" placeholder="e.g. Healthcare" autofocus></div>
      <div class="fg" style="grid-column:1/-1"><label>Brand display name</label><input class="finput" placeholder="e.g. delonix Healthcare — shown on invoices"></div>
      <div class="fg"><label>Legal Entity</label><select class="finput">${LEGAL_ENTITIES.map(e=>`<option value="${e.id}">${e.flag} ${e.name}</option>`).join('')}</select></div>
      <div class="fg"><label>Currency</label><select class="finput"><option selected>USD</option><option>EUR</option><option>GBP</option></select></div>
      <div class="fg"><label>Tax profile</label><select class="finput"><option>US-Residential</option><option>US-Commercial</option><option>EU-VAT</option><option>CA-GST</option></select></div>
      <div class="fg"><label>GL export destination</label><select class="finput"><option>NetSuite-US</option><option>NetSuite-EU</option><option>QuickBooks</option><option>Xero</option></select></div>
      <div class="fg"><label>Invoice template</label><select class="finput"><option>Default</option><option>Minimal</option><option>Branded</option></select></div>
      <div class="fg"><label>Invoice grouping default</label><select class="finput"><option>One invoice per account</option><option>One per subscription</option><option>One per contract</option></select></div>
      <div class="fg"><label>Brand accent color</label><div style="display:flex;gap:8px;align-items:center"><input class="finput" placeholder="#ff5a1f" style="font-family:monospace;max-width:110px"><div style="width:28px;height:28px;border-radius:6px;background:#888"></div></div></div>
      <div class="fg"><label>Status</label><select class="finput"><option>Active</option><option>Draft</option></select></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="New Business Unit created — configure GL mappings and invoice template next">Create Business Unit</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openNewLegalEntity(){
  openDrawer('New Legal Entity', `
    <div class="val-banner info" style="margin-bottom:14px">${svg(I.entity,14)} A Legal Entity is a registered company with its own tax registrations, bank accounts, and GL system. Business Units are assigned to a Legal Entity.</div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Entity legal name</label><input class="finput" placeholder="e.g. Acme Corp Ltd." autofocus></div>
      <div class="fg"><label>Country of incorporation</label><select class="finput"><option>🇺🇸 United States</option><option>🇳🇱 Netherlands</option><option>🇬🇧 United Kingdom</option><option>🇨🇦 Canada</option><option>🇦🇺 Australia</option><option>🇸🇬 Singapore</option></select></div>
      <div class="fg"><label>Functional currency</label><select class="finput"><option>USD</option><option>EUR</option><option>GBP</option><option>CAD</option></select></div>
      <div class="fg"><label>Tax registration number</label><input class="finput" placeholder="EIN, VAT ID, etc." style="font-family:monospace"></div>
      <div class="fg"><label>VAT / GST registered</label><select class="finput"><option>No</option><option>Yes</option></select></div>
      <div class="fg"><label>GL system</label><select class="finput"><option>NetSuite</option><option>QuickBooks</option><option>Xero</option><option>SAP</option><option>Manual</option></select></div>
      <div class="fg"><label>AR GL account</label><input class="finput" placeholder="1200 · Accounts Receivable" value="1200 · Accounts Receivable"></div>
      <div class="fg"><label>Deferred revenue GL</label><input class="finput" placeholder="2800 · Deferred Revenue" value="2800 · Deferred Revenue"></div>
      <div class="fg" style="grid-column:1/-1"><label>Registered address</label><textarea class="finput" rows="2" placeholder="Full registered address for invoice headers"></textarea></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Legal entity created — assign Business Units and configure tax registrations next">Create Legal Entity</button>
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

function openAIQuery(q){
  openDrawer('Ember AI — Query Results', `
    <div style="background:var(--surface);border-radius:8px;padding:12px 14px;margin-bottom:16px;font-size:13px;display:flex;align-items:flex-start;gap:10px">
      ${svg(I.ai,15)}<span class="mut">${q||'Which cohorts have net retention above 110%?'}</span>
    </div>
    <div style="font-size:13px;line-height:1.7;margin-bottom:16px">
      <p><strong>3 cohorts</strong> show net revenue retention above 110% in the trailing 12 months:</p>
      <table class="tbl" style="width:100%;margin-top:8px">
        <thead><tr><th>Cohort</th><th>NRR</th><th>Accounts</th><th>Avg MRR</th><th>Trend</th></tr></thead>
        <tbody>
          <tr><td>Q1 2023 · Enterprise</td><td style="color:var(--ok);font-weight:700">118%</td><td>24</td><td>$9,200</td><td style="color:var(--ok)">↑ +2pp QoQ</td></tr>
          <tr><td>Q3 2023 · Enterprise+</td><td style="color:var(--ok);font-weight:700">115%</td><td>12</td><td>$14,800</td><td style="color:var(--ok)">↑ +1pp QoQ</td></tr>
          <tr><td>Q2 2022 · Business+</td><td style="color:var(--ok);font-weight:700">112%</td><td>38</td><td>$3,900</td><td class="mut">→ flat</td></tr>
        </tbody>
      </table>
      <p style="margin-top:12px" class="mut">Expansion revenue is the primary driver in all three cohorts. Q1 2023 Enterprise shows the highest seat expansion rate (avg 1.4 seats/account/quarter).</p>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">
      ${['Show expansion breakdown','Chart over time','Export to CSV','Add to report'].map(s=>`
        <button class="btn ghost" style="font-size:12px" data-act="toast" data-arg="${s} — ${q||'NRR query'}">${s}</button>`).join('')}
    </div>
    <div class="form-actions">
      <button class="btn primary" data-act="toast" data-arg="Report created from AI query">Save as report</button>
      <button class="btn ghost" onclick="closeDrawer()">Close</button>
    </div>
  `);
}

function openNewCalculator(){
  openDrawer('New Pricing Calculator', `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Calculator name</label><input class="finput" placeholder="e.g. Enterprise ROI Calculator" autofocus></div>
      <div class="fg"><label>Template</label><select class="finput">
        <option>ROI / Payback calculator</option>
        <option>Seat-based pricing estimator</option>
        <option>Usage-based estimator</option>
        <option>TCO comparison</option>
        <option>Blank canvas</option>
      </select></div>
      <div class="fg"><label>Audience</label><select class="finput"><option>Public (website)</option><option>Sales-only (internal)</option><option>Customer portal</option></select></div>
      <div class="fg"><label>Currency</label><select class="finput"><option>USD $</option><option>EUR €</option><option>GBP £</option><option>CAD $</option></select></div>
      <div class="fg"><label>Lead capture</label><select class="finput"><option>Email gate before results</option><option>Optional — shown after results</option><option>None</option></select></div>
      <div class="fg" style="grid-column:1/-1"><label>Description</label><textarea class="finput" rows="2" placeholder="Internal description — not shown to users"></textarea></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Calculator created — opening builder">Create & open builder</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openEditCalculator(id){
  openDrawer(`Calculator — ${id||'CALC-001'}`, `
    <div class="val-banner info" style="margin-bottom:14px">${svg(I.calc,14)} Live edits are saved automatically. Publish when ready to push to the embed URL.</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
      ${[['Views (30d)','1,284'],['Leads captured','87'],['Conversion rate','6.8%'],['Avg time on page','4m 12s']].map(([l,v])=>`
        <div style="background:var(--surface);padding:10px;border-radius:7px"><div class="mut" style="font-size:11px">${l}</div><div style="font-size:18px;font-weight:700">${v}</div></div>`).join('')}
    </div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Name</label><input class="finput" value="Enterprise ROI Calculator"></div>
      <div class="fg"><label>Status</label><select class="finput"><option selected>Published</option><option>Draft</option><option>Archived</option></select></div>
      <div class="fg"><label>Lead capture</label><select class="finput"><option selected>Email gate before results</option><option>Optional</option><option>None</option></select></div>
      <div class="fg" style="grid-column:1/-1"><label>Embed URL</label><div style="display:flex;gap:8px"><input class="finput mono" value="calc.delonix.io/enterprise-roi" style="flex:1"><button class="btn ghost" data-act="toast" data-arg="Copied embed snippet">Copy embed</button></div></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Calculator changes published">Publish changes</button>
      <button class="btn ghost" data-act="toast" data-arg="Opening full builder editor">Open full editor</button>
      <button class="btn ghost" onclick="closeDrawer()">Close</button>
    </div>
  `);
}

function openNewEntity(){
  openDrawer('New Custom Entity', `
    <div class="val-banner info" style="margin-bottom:14px">${svg(I.entity2,14)} Custom entities extend the billing data model. They can be linked to Accounts, Subscriptions, and other objects via relation fields.</div>
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Entity name (singular)</label><input class="finput" placeholder="e.g. Property" autofocus></div>
      <div class="fg"><label>API name</label><input class="finput" placeholder="property" class="mono" style="font-family:monospace"></div>
      <div class="fg"><label>Plural label</label><input class="finput" placeholder="Properties"></div>
      <div class="fg"><label>Icon</label><input class="finput" placeholder="🏢" maxlength="2"></div>
      <div class="fg" style="grid-column:1/-1"><label>Description</label><textarea class="finput" rows="2" placeholder="What does this entity represent?"></textarea></div>
      <div class="fg"><label>Linked to</label><select class="finput" multiple style="height:80px">
        <option selected>Account</option><option>Subscription</option><option>Invoice</option><option>Contact</option>
      </select></div>
      <div class="fg"><label>Record ID prefix</label><input class="finput" placeholder="PROP" style="font-family:monospace;max-width:100px"></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Custom entity created — add fields to get started">Create entity</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openNewField(){
  openDrawer('Add Field — Property', `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Display name</label><input class="finput" placeholder="e.g. Property class" autofocus></div>
      <div class="fg"><label>API key</label><input class="finput" placeholder="property_class" style="font-family:monospace"></div>
      <div class="fg"><label>Field type</label><select class="finput" id="fieldTypeSelect">
        <option>Text</option><option>Number</option><option>Currency</option><option>Date</option>
        <option>Boolean</option><option>Dropdown</option><option>Relation</option><option>Formula</option>
      </select></div>
      <div class="fg"><label>Required</label><select class="finput"><option>No</option><option>Yes</option></select></div>
      <div class="fg"><label>Indexed (searchable)</label><select class="finput"><option>No</option><option>Yes</option></select></div>
      <div class="fg"><label>Show in list view</label><select class="finput"><option>Yes</option><option>No</option></select></div>
      <div class="fg" style="grid-column:1/-1"><label>Description / help text</label><input class="finput" placeholder="Shown to users when filling in this field"></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Field added to Property entity">Add field</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openEditField(name){
  openDrawer(`Edit Field — ${name||'property_class'}`, `
    <div class="form-grid" style="grid-template-columns:1fr 1fr">
      <div class="fg" style="grid-column:1/-1"><label>Display name</label><input class="finput" value="Property class" autofocus></div>
      <div class="fg"><label>API key</label><input class="finput mono" value="${name||'property_class'}" style="font-family:monospace"></div>
      <div class="fg"><label>Field type</label><select class="finput"><option selected>Dropdown</option><option>Text</option></select></div>
      <div class="fg"><label>Required</label><select class="finput"><option selected>No</option><option>Yes</option></select></div>
      <div class="fg" style="grid-column:1/-1"><label>Dropdown options (one per line)</label><textarea class="finput" rows="4">Class A\nClass B\nClass C\nMixed-use</textarea></div>
      <div class="fg"><label>Default value</label><input class="finput" placeholder="Leave blank for no default"></div>
      <div class="fg"><label>Indexed</label><select class="finput"><option selected>Yes</option><option>No</option></select></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn primary" data-act="toast" data-arg="Field ${name||'property_class'} updated">Save changes</button>
      <button class="btn crit" style="margin-left:auto" data-act="toast" data-arg="Field deletion requires confirmation — ${name} will be removed from all records">Delete field</button>
      <button class="btn ghost" onclick="closeDrawer()">Cancel</button>
    </div>
  `);
}

function openEditRole(name){
  openDrawer('Edit Role — '+name,`
    <div style="display:flex;flex-direction:column;gap:14px">
      <div><label class="lbl">Role name</label><input class="input" value="${name}" style="width:100%"></div>
      <div><label class="lbl">Description</label><textarea class="input" style="width:100%;height:60px;resize:none">${name==='Super Admin'?'Full platform access':'Role with customised permissions'}</textarea></div>
      <div><label class="lbl">Inherits from</label><select class="input" style="width:100%"><option>— none —</option><option>Viewer</option><option>Revenue Ops</option><option>Finance Manager</option></select></div>
      <div><label class="lbl">Permissions</label>
        <div style="display:flex;flex-direction:column;gap:6px;margin-top:6px">
          ${['Customers','Subscriptions','Invoicing','Payments','Reports','Settings','API'].map(p=>`
            <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 10px;background:var(--surface-2);border-radius:var(--r-sm)">
              <span style="font-size:13px">${p}</span>
              <select class="input" style="width:120px;height:28px;font-size:11px"><option>Full access</option><option>Read-only</option><option>No access</option></select>
            </div>`).join('')}
        </div>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:4px">
        <button class="btn ghost" data-act="close">Cancel</button>
        <button class="btn primary" data-act="toast" data-arg="Role '${name}' updated">Save changes</button>
      </div>
    </div>
  `);
}

function openEditMember(name){
  openDrawer('Edit Member — '+name,`
    <div style="display:flex;flex-direction:column;gap:14px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div><label class="lbl">Name</label><input class="input" value="${name}" style="width:100%"></div>
        <div><label class="lbl">Email</label><input class="input" value="${name.toLowerCase().replace(' ','.')}@delonix.com" style="width:100%"></div>
      </div>
      <div><label class="lbl">Role</label><select class="input" style="width:100%"><option>Super Admin</option><option>Admin</option><option selected>Finance Manager</option><option>Revenue Ops</option><option>Viewer</option><option>API Service Account</option></select></div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-2);border-radius:var(--r-sm)">
          <span style="font-size:13px">Require MFA</span>
          <div style="width:36px;height:20px;background:var(--good);border-radius:10px;cursor:pointer;position:relative"><div style="width:16px;height:16px;background:white;border-radius:50%;position:absolute;right:2px;top:2px"></div></div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-2);border-radius:var(--r-sm)">
          <span style="font-size:13px">API access</span>
          <div style="width:36px;height:20px;background:var(--border);border-radius:10px;cursor:pointer;position:relative"><div style="width:16px;height:16px;background:white;border-radius:50%;position:absolute;left:2px;top:2px"></div></div>
        </div>
      </div>
      <div style="display:flex;gap:8px;justify-content:space-between;margin-top:4px">
        <button class="btn ghost" style="color:var(--crit)" data-act="toast" data-arg="Removed ${name} from team">Remove member</button>
        <div style="display:flex;gap:8px">
          <button class="btn ghost" data-act="close">Cancel</button>
          <button class="btn primary" data-act="toast" data-arg="Member '${name}' updated">Save</button>
        </div>
      </div>
    </div>
  `);
}

function openAuditDetail(eventType){
  openDrawer('Audit event — '+eventType,`
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="kv-grid" style="display:grid;grid-template-columns:130px 1fr;gap:6px 14px">
        <span class="mut">Event type</span><span style="font-weight:600">${eventType}</span>
        <span class="mut">Timestamp</span><span class="mono">2026-06-28 10:41:03 UTC</span>
        <span class="mut">Actor</span><span>A. Bukhari (abukhari@delonix.com)</span>
        <span class="mut">Session ID</span><span class="mono" style="font-size:11px">sess_01Jx4mQpR9v2Kn7cP</span>
        <span class="mut">IP address</span><span class="mono">10.0.0.1 (internal)</span>
        <span class="mut">User agent</span><span style="font-size:12px">Chrome 126 · macOS 14.5</span>
        <span class="mut">Resource</span><span>D. Cho — role change</span>
        <span class="mut">Severity</span><span>${pill('warn','HIGH')}</span>
      </div>
      <div style="border-top:1px solid var(--border);padding-top:12px">
        <div style="font-weight:600;margin-bottom:8px;font-size:13px">Event payload</div>
        <pre class="mono" style="font-size:11px;background:var(--surface-2);padding:12px;border-radius:var(--r-sm);overflow-x:auto;white-space:pre-wrap">{
  "event": "${eventType}",
  "actor": "user_ABK001",
  "target": "user_DC042",
  "before": { "role": "revenue_ops" },
  "after":  { "role": "finance_manager" },
  "reason": "promotion",
  "approved_by": "user_ABK001"
}</pre>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button class="btn ghost" data-act="toast" data-arg="Audit event exported">Export JSON</button>
        <button class="btn ghost" data-act="close">Close</button>
      </div>
    </div>
  `);
}

function openApplyTheme(){
  openDrawer('Apply theme changes',`
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="val-banner info">${svg(I.warning,15)} Theme changes apply immediately for all users in your organisation.</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-2);border-radius:var(--r-sm)">
          <span style="font-size:13px">Apply to main app</span>
          <div style="width:36px;height:20px;background:var(--good);border-radius:10px;cursor:pointer;position:relative"><div style="width:16px;height:16px;background:white;border-radius:50%;position:absolute;right:2px;top:2px"></div></div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-2);border-radius:var(--r-sm)">
          <span style="font-size:13px">Apply to customer portal</span>
          <div style="width:36px;height:20px;background:var(--good);border-radius:10px;cursor:pointer;position:relative"><div style="width:16px;height:16px;background:white;border-radius:50%;position:absolute;right:2px;top:2px"></div></div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-2);border-radius:var(--r-sm)">
          <span style="font-size:13px">Apply to email templates</span>
          <div style="width:36px;height:20px;background:var(--border);border-radius:10px;cursor:pointer;position:relative"><div style="width:16px;height:16px;background:white;border-radius:50%;position:absolute;left:2px;top:2px"></div></div>
        </div>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button class="btn ghost" data-act="close">Cancel</button>
        <button class="btn primary" data-act="toast" data-arg="Theme changes applied to all surfaces">Apply now</button>
      </div>
    </div>
  `);
}

function doSwitchTheme(id){
  document.documentElement.setAttribute('data-theme', id==='dark'?'':id);
  showToast('Theme switched to '+id.charAt(0).toUpperCase()+id.slice(1));
}

function openPublishCalc(name){
  openDrawer('Publish calculator',`
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="val-banner info">${svg(I.check,15)} Calculator will be live at <strong>calc.delonix.io/${(name||'enterprise-roi').toLowerCase().replace(/\s+/g,'-')}</strong></div>
      <div><label class="lbl">Publish URL slug</label><input class="input" value="${(name||'enterprise-roi').toLowerCase().replace(/\s+/g,'-')}" style="width:100%"></div>
      <div><label class="lbl">Access</label><select class="input" style="width:100%"><option>Public</option><option>Password protected</option><option>Gated (lead capture required)</option></select></div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-2);border-radius:var(--r-sm)">
        <span style="font-size:13px">Notify sales on each lead</span>
        <div style="width:36px;height:20px;background:var(--good);border-radius:10px;cursor:pointer;position:relative"><div style="width:16px;height:16px;background:white;border-radius:50%;position:absolute;right:2px;top:2px"></div></div>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button class="btn ghost" data-act="close">Cancel</button>
        <button class="btn primary" data-act="toast" data-arg="Calculator published">Publish</button>
      </div>
    </div>
  `);
}

function openEditFormulas(){
  openDrawer('Formula editor',`
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="mut" style="font-size:12px">Define how output metrics are calculated from inputs. Use variable names from the Inputs panel.</div>
      <div>
        <label class="lbl">Annual savings formula</label>
        <textarea class="input" style="width:100%;height:52px;font-family:monospace;font-size:12px;resize:none">units * avg_rent * (current_cost_pct - target_cost_pct) * 12</textarea>
      </div>
      <div>
        <label class="lbl">ROI formula</label>
        <textarea class="input" style="width:100%;height:52px;font-family:monospace;font-size:12px;resize:none">(annual_savings / platform_cost) * 100</textarea>
      </div>
      <div>
        <label class="lbl">Payback period (months)</label>
        <textarea class="input" style="width:100%;height:52px;font-family:monospace;font-size:12px;resize:none">platform_cost / (annual_savings / 12)</textarea>
      </div>
      <div class="val-banner" style="background:rgba(var(--good-rgb,63,185,80),.08);border:1px solid rgba(63,185,80,.2);padding:8px 10px;border-radius:var(--r-sm)">
        ${svg(I.check,14)} <span style="font-size:12px">All formulas validated — no errors</span>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button class="btn ghost" data-act="close">Cancel</button>
        <button class="btn primary" data-act="toast" data-arg="Formulas saved">Save formulas</button>
      </div>
    </div>
  `);
}

function openAddCalcField(){
  openDrawer('Add input field',`
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div><label class="lbl">Field label</label><input class="input" placeholder="e.g. Number of units" style="width:100%"></div>
        <div><label class="lbl">Variable name</label><input class="input" placeholder="e.g. units" class="mono" style="width:100%;font-family:monospace"></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div><label class="lbl">Input type</label><select class="input" style="width:100%"><option>Slider</option><option>Number</option><option>Dropdown</option><option>Currency</option><option>Percentage</option></select></div>
        <div><label class="lbl">Default value</label><input class="input" type="number" placeholder="100" style="width:100%"></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div><label class="lbl">Min</label><input class="input" type="number" placeholder="1" style="width:100%"></div>
        <div><label class="lbl">Max</label><input class="input" type="number" placeholder="10000" style="width:100%"></div>
      </div>
      <div><label class="lbl">Tooltip help text</label><input class="input" placeholder="Explain what this field means…" style="width:100%"></div>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button class="btn ghost" data-act="close">Cancel</button>
        <button class="btn primary" data-act="toast" data-arg="Input field added">Add field</button>
      </div>
    </div>
  `);
}

function openScheduleDigest(){
  openDrawer('Schedule AI digest',`
    <div style="display:flex;flex-direction:column;gap:12px">
      <div class="mut" style="font-size:13px">Ember AI will analyse your revenue data and send a digest to selected recipients.</div>
      <div><label class="lbl">Frequency</label><select class="input" style="width:100%"><option>Weekly (every Monday 8am)</option><option>Daily (every day 8am)</option><option>Bi-weekly</option><option>Monthly (1st of month)</option></select></div>
      <div><label class="lbl">Recipients</label><input class="input" value="abukhari@delonix.com" style="width:100%"></div>
      <div><label class="lbl">Include sections</label>
        <div style="display:flex;flex-direction:column;gap:6px;margin-top:6px">
          ${['Revenue anomalies','MRR movement','Top accounts at risk','Forecast vs actual','AI recommendations'].map(s=>`
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px">
              <input type="checkbox" checked style="accent-color:var(--ember)"> ${s}
            </label>`).join('')}
        </div>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button class="btn ghost" data-act="close">Cancel</button>
        <button class="btn primary" data-act="toast" data-arg="AI digest scheduled">Save schedule</button>
      </div>
    </div>
  `);
}