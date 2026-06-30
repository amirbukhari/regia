# Enterprise Billing Features

Checkbox is checked once the UI for that feature is **100% mocked out** in Delonix.

---

## Core Billing Engine
- [x] Subscription management (create, modify, pause, resume, cancel)
- [x] One-time / ad hoc charges
- [x] Recurring billing (daily, weekly, monthly, quarterly, annual, custom cycles)
- [ ] Prorated billing on mid-cycle changes
- [x] Metered / usage-based billing
- [x] Tiered pricing (graduated & volume)
- [x] Volume pricing
- [x] Flat-rate pricing
- [x] Per-seat / per-user pricing
- [x] Hybrid pricing models (base + usage)
- [ ] Freemium plan support
- [ ] Free trial management
- [ ] Trial-to-paid conversion automation
- [ ] Prepaid billing
- [ ] Postpaid billing
- [ ] Billing period alignment (first-of-month normalization)
- [x] Mid-cycle plan changes with immediate or deferred effect
- [ ] Backdating charges
- [ ] Billing anchors / custom billing dates
- [x] Minimum spend commitments
- [x] Overage handling

---

## Pricing & Plans
- [x] Plan catalog with versioning
- [x] Price books (multiple, per segment or region)
- [ ] Geographic / regional pricing
- [ ] Custom pricing per customer
- [ ] Pricing rules engine
- [ ] Volume discounts
- [ ] Multi-year pricing tiers
- [ ] Contractual price locks
- [ ] Promotional / limited-time pricing
- [ ] Discount management (percentage, fixed, duration-limited)
- [ ] Coupons and redemption codes
- [ ] Product bundling
- [x] Add-ons and extras
- [x] Entitlements per plan
- [x] Feature flags tied to plan level
- [ ] Price localization (currency + format)
- [ ] Standalone selling price (SSP) configuration

---

## Invoice Management
- [x] Automated invoice generation
- [ ] Invoice templates (customizable branding)
- [ ] Custom invoice numbering / sequencing
- [ ] Invoice scheduling and batching
- [ ] Consolidated invoices (multiple subscriptions → one invoice)
- [x] Invoice grouping by cost center or department
- [x] Credit notes / credit memos
- [ ] Debit notes
- [ ] Proforma invoices
- [ ] Manual invoice creation
- [ ] Invoice editing before finalization
- [x] Invoice voiding and reissue
- [x] Invoice approval workflows
- [ ] Multi-language invoices
- [ ] Invoice delivery (email, PDF, EDI 810, XML)
- [ ] Invoice archiving with retention policies
- [x] Invoice history and audit trail
- [ ] E-invoicing compliance (Peppol, ZUGFeRD, Factur-X, FatturaPA, etc.)
- [ ] Invoice watermarking
- [ ] Purchase order (PO) number capture and matching

---

## Payment Processing
- [x] Credit/debit card (Visa, Mastercard, Amex, Discover)
- [x] ACH / eCheck (US bank transfer)
- [x] Wire transfers
- [ ] SEPA direct debit (EU)
- [ ] BACS direct debit (UK)
- [ ] Faster Payments (UK)
- [ ] SPEI (Mexico)
- [ ] PayPal, Venmo, Cash App Pay
- [ ] Digital wallets (Apple Pay, Google Pay, Samsung Pay)
- [ ] Buy Now Pay Later (Klarna, Afterpay, Affirm)
- [ ] Cryptocurrency payments
- [ ] Check / cheque payments
- [x] Net terms (Net 15, Net 30, Net 60, Net 90)
- [ ] Payment links (one-click hosted checkout)
- [ ] Hosted payment pages (white-labeled)
- [x] Payment on file (stored tokenized methods)
- [ ] Multiple payment methods per customer
- [ ] Payment splitting across methods
- [x] Auto-charge (card on file)
- [x] Payment retry on failure
- [ ] Smart retry scheduling (ML-optimized timing)
- [ ] 3D Secure (3DS2) / SCA compliance
- [ ] Strong Customer Authentication (EU PSD2)
- [ ] PCI DSS Level 1 compliance
- [ ] Tokenization and vault management
- [x] Partial payments
- [x] Overpayment handling
- [ ] Real-time payment confirmation

---

## Dunning Management
- [x] Automated payment failure sequences
- [x] Configurable dunning cadence (timing, channels)
- [ ] Soft vs. hard decline handling
- [ ] Card updater (automatic card number refresh via Visa/Mastercard)
- [ ] Smart retry using ML card success prediction
- [x] Grace period configuration
- [x] Account suspension / access revocation on non-payment
- [ ] Escalation rules (email → call → collections)
- [x] Reactivation workflows post-payment
- [x] Dunning email templates per failure stage
- [x] Dunning analytics (recovery rate, revenue recovered)
- [ ] Pause dunning for specific customers

---

## Revenue Recognition
- [x] ASC 606 compliance
- [ ] IFRS 15 compliance
- [x] Deferred revenue tracking and scheduling
- [x] Revenue schedules (ratable, event-based, milestone)
- [x] Performance obligation management
- [ ] Multi-element arrangement (MEA) handling
- [ ] Contract modification and re-evaluation
- [ ] Standalone selling price (SSP) calculation
- [x] Revenue waterfall reports
- [x] Recognized vs. deferred revenue split
- [x] Revenue accrual entries
- [ ] Variable consideration handling (refunds, discounts, rebates)
- [ ] Forecasted revenue recognition
- [x] Period-close controls

---

## Tax Management
- [x] Multi-jurisdiction tax calculation engine
- [ ] US sales tax (all 50 states + local jurisdictions)
- [ ] VAT (EU 27 member states, UK, Norway, Switzerland)
- [ ] GST/HST (Canada)
- [ ] GST (Australia, New Zealand, India, Singapore)
- [ ] JCT (Japan Consumption Tax)
- [ ] Digital Services Tax (DST)
- [ ] Withholding tax
- [ ] Reverse charge mechanism
- [x] Economic nexus tracking and alerts
- [ ] Tax exemptions (reseller, non-profit, government)
- [ ] Tax exemption certificate management
- [ ] Tax ID validation (VAT ID, EIN, ABN, GST, etc.)
- [ ] Automatic tax rate updates
- [ ] Tax override capability
- [ ] Tax-inclusive vs. tax-exclusive pricing
- [ ] Integration with Avalara, TaxJar, Vertex, Taxamo
- [ ] Tax reports by jurisdiction
- [ ] VAT return data export
- [ ] MTD (Making Tax Digital) compliance (UK)
- [ ] OSS / IOSS compliance (EU)

---

## Customer & Account Management
- [x] Customer profiles (individual and company)
- [x] Account hierarchy (parent → child / subsidiary accounts)
- [ ] Multiple contacts per account with roles
- [ ] Multiple billing addresses
- [ ] Shipping address management
- [ ] Custom fields on customer records
- [x] Customer segmentation and tagging
- [x] Customer notes and internal annotations
- [x] Communication history log
- [ ] Account merge / deduplication
- [ ] Bulk customer import / export
- [ ] Customer credit limit management
- [ ] Customer credit score / risk tier
- [x] Account health score
- [x] Customer lifecycle stage tracking

---

## Subscription Lifecycle Management
- [x] Upgrade and downgrade flows
- [ ] Immediate vs. end-of-period plan changes
- [ ] Subscription cloning / templating
- [ ] Bulk subscription operations
- [x] Subscription pausing (with optional billing pause)
- [x] Cancellation workflows with reason capture
- [ ] Cancellation surveys
- [ ] Win-back / re-engagement flows
- [x] Subscription reactivation
- [x] Subscription renewal management
- [x] Auto-renewal with configurable advance notice
- [ ] Renewal quote generation
- [ ] Co-term / alignment of multiple subscriptions
- [ ] Subscription transfer between accounts

---

## Contract Management
- [x] Contract creation and versioning
- [ ] Multi-year contracts
- [x] Contract terms and conditions capture
- [ ] Custom contract start / end dates
- [ ] Evergreen vs. fixed-term contracts
- [x] Auto-renewal with notification windows
- [ ] Contract amendments and addenda
- [x] Minimum commitment / floor ARR
- [x] Contract performance obligation tracking
- [ ] Electronic signature integration (DocuSign, Adobe Sign, HelloSign)
- [ ] Quote-to-contract flow
- [x] Contract repository and search
- [x] Renewal pipeline management
- [ ] Early termination fee calculation

---

## CPQ (Configure, Price, Quote)
- [x] Product catalog for quoting
- [ ] Guided selling / product configuration wizard
- [ ] Rules-based pricing configuration
- [x] Quote generation with line items
- [ ] Tiered discount approval workflows
- [ ] Quote templates
- [ ] Quote expiry and versioning
- [ ] Quote PDF generation and delivery
- [ ] Quote-to-order / quote-to-subscription conversion
- [ ] Proposal generation
- [ ] Competitive pricing comparison
- [ ] Deal desk workflows
- [ ] Opportunity-to-billing sync (CRM integration)

---

## Accounts Receivable
- [x] Payment application to invoices
- [ ] Auto-application of payments
- [ ] Unapplied payment management
- [ ] Write-offs and bad debt
- [x] Dispute management and resolution tracking
- [x] Collections workflow management
- [x] AR aging reports (30/60/90/120+)
- [ ] Cash flow forecasting from AR
- [ ] Customer credit holds
- [ ] Balance forward invoices
- [x] Statement of account generation
- [ ] Integration with collections agencies
- [ ] Promise-to-pay tracking

---

## Refunds & Credits
- [x] Full refunds to original payment method
- [x] Partial refunds
- [x] Refund to credit balance
- [x] Account credit balance management
- [ ] Credit expiry rules
- [ ] Promotional credit issuance
- [x] Credit application to future invoices
- [ ] Prepaid credit / wallet management
- [ ] Balance rollover configuration
- [x] Refund reason tracking
- [ ] Refund approval workflows

---

## Self-Service Customer Portal
- [ ] View and search invoices
- [ ] Download invoices as PDF
- [ ] Pay invoices online
- [ ] Set up autopay
- [ ] Manage saved payment methods
- [ ] Update billing address and contact info
- [ ] View subscription details
- [ ] Self-service plan upgrade / downgrade
- [ ] Self-service cancellation
- [ ] View usage metrics and history
- [ ] Download usage reports
- [ ] Manage users / seats (add/remove)
- [ ] View transaction and payment history
- [ ] Raise billing disputes
- [ ] Request refunds
- [ ] Download tax documents
- [ ] Accept/decline quotes and contracts
- [ ] View and accept renewal quotes
- [x] Branded and embeddable portal (configuration UI)

---

## Reporting & Analytics
- [x] MRR (Monthly Recurring Revenue)
- [x] ARR (Annual Recurring Revenue)
- [x] Net Revenue Retention (NRR)
- [ ] Gross Revenue Retention (GRR)
- [ ] Net Dollar Retention (NDR)
- [ ] Customer Lifetime Value (LTV)
- [x] Average Revenue Per User (ARPU)
- [x] Churn rate (customer churn & revenue churn)
- [ ] Logo churn vs. revenue churn
- [ ] Expansion revenue
- [ ] Contraction revenue
- [ ] New business revenue
- [ ] Reactivation revenue
- [ ] Revenue by product / plan / segment / geo
- [ ] Cohort analysis (monthly cohorts)
- [ ] Trial conversion rates
- [ ] Subscriber counts (new, active, churned, net)
- [x] Cash flow reports
- [x] Deferred revenue balance
- [x] Revenue waterfall (beginning → end of period)
- [ ] Bookings vs. billings vs. revenue
- [x] Accounts receivable aging
- [ ] Collections effectiveness
- [ ] Payment success rates by method
- [ ] Dashboard builder (drag-and-drop)
- [ ] Custom report builder
- [ ] Scheduled report delivery (email, Slack)
- [ ] Report export (CSV, PDF, Excel, Google Sheets)
- [x] Real-time dashboards
- [ ] Benchmark comparisons (industry averages)
- [ ] Forecasting and projections

---

## Usage & Metering
- [x] Real-time usage event ingestion (REST API)
- [ ] High-throughput event pipeline (millions of events/day)
- [x] Usage aggregation (sum, max, unique count, percentile)
- [x] Multiple concurrent usage meters per subscription
- [x] Usage-based overages (hard cap vs. overage billing)
- [x] Usage alerts and threshold notifications
- [x] Usage caps / hard limits
- [ ] Rollover unused units to next period
- [x] Usage history per customer
- [ ] Usage rating engine
- [ ] Idempotent event deduplication
- [x] Usage report per invoice
- [x] Usage debugging and audit log
- [ ] Proration of usage within a billing period

---

## Multi-entity & Multi-tenancy
- [x] Multiple legal entity support
- [x] Inter-company billing
- [x] Subsidiary management
- [ ] Multi-brand billing (different logos/names per entity)
- [ ] Multi-currency at entity level
- [x] Consolidated cross-entity reporting
- [x] Entity-level chart of accounts
- [x] Separate GL per entity
- [ ] Shared customer database across entities

---

## Financial Controls & General Ledger
- [x] GL account mapping per product / revenue type
- [x] Chart of accounts management
- [x] Journal entry generation (automated + manual)
- [x] Revenue accrual entries
- [x] Period-close controls (lock closed periods)
- [x] Audit trail on all financial transactions
- [ ] Approval limits by amount or type
- [ ] Segregation of duties enforcement
- [x] Intercompany eliminations
- [ ] Foreign currency revaluation
- [ ] Realized / unrealized FX gain/loss tracking

---

## Multi-currency & Localization
- [ ] 150+ currencies
- [ ] Real-time exchange rates (daily feed)
- [ ] Fixed / locked exchange rates per contract
- [ ] Customer-facing currency vs. reporting currency
- [ ] Currency rounding rules (per jurisdiction)
- [ ] Functional currency for reporting
- [ ] Currency conversion at billing time
- [ ] Localized invoice date/number formats
- [ ] Localized tax labels
- [ ] Multi-language email templates and invoices
- [ ] Right-to-left (RTL) language support

---

## Integrations
- [x] Salesforce CRM
- [ ] HubSpot CRM
- [ ] Microsoft Dynamics 365 CRM
- [ ] Zoho CRM
- [ ] Pipedrive CRM
- [ ] SAP ERP
- [ ] Oracle ERP Cloud
- [x] NetSuite ERP
- [ ] Microsoft Dynamics Finance
- [x] Xero accounting
- [ ] QuickBooks Online
- [ ] Freshbooks
- [x] Stripe payment gateway
- [x] Adyen payment gateway
- [ ] Braintree payment gateway
- [ ] PayPal payment gateway
- [ ] Square
- [ ] Authorize.Net
- [ ] Checkout.com
- [ ] Worldpay
- [ ] Cybersource
- [ ] Avalara tax engine
- [ ] TaxJar tax engine
- [ ] Vertex tax engine
- [ ] DocuSign e-signature
- [ ] Adobe Sign e-signature
- [ ] HelloSign
- [ ] Zendesk help desk
- [ ] Freshdesk help desk
- [ ] Intercom
- [ ] ServiceNow
- [ ] Looker BI
- [ ] Tableau BI
- [ ] Power BI
- [ ] Snowflake data warehouse
- [ ] BigQuery data warehouse
- [ ] Amazon Redshift
- [ ] Okta SSO
- [ ] Auth0
- [ ] Azure Active Directory
- [ ] Google Workspace SSO
- [ ] Twilio SMS
- [ ] SendGrid email
- [ ] Mailchimp
- [ ] Zapier
- [ ] Make (Integromat)
- [ ] Workato
- [ ] Boomi
- [ ] Mulesoft
- [x] Webhooks (configurable per event type with retry and signature verification)
- [x] REST API (versioned, with full OpenAPI spec)
- [ ] GraphQL API
- [ ] Bulk data export (S3, GCS, SFTP)

---

## Developer Platform
- [x] Versioned REST API
- [ ] GraphQL API
- [x] Webhooks with retry, dead-letter queue, and HMAC signatures
- [ ] Event catalog (full list of subscribable events)
- [ ] API sandbox / test mode with test clock
- [x] API keys with scoped permissions
- [ ] OAuth 2.0 support
- [ ] Official SDKs (Node.js, Python, Ruby, Java, PHP, Go, .NET)
- [x] SDK documentation view
- [ ] Postman / Insomnia collections
- [ ] API reference docs
- [ ] Changelog and deprecation policy
- [ ] API usage monitoring and rate limit dashboards
- [ ] IP allowlisting for API access
- [ ] Idempotency keys

---

## Notifications & Communications
- [ ] Invoice delivery via email (configurable triggers)
- [ ] Payment confirmation receipts
- [ ] Upcoming renewal notifications
- [ ] Failed payment notifications
- [ ] Payment retry notifications
- [ ] Expiring payment method alerts
- [ ] Trial expiration warnings
- [ ] Account suspension notices
- [ ] Custom email templates (HTML + plain text)
- [ ] Brand theming per template
- [ ] Multi-language notification templates
- [ ] SMS notifications
- [ ] In-app notification feed
- [ ] Slack / Teams webhook notifications
- [ ] Communication delivery log and audit
- [ ] Notification preference management (per customer)
- [ ] Unsubscribe handling

---

## Workflow & Automation
- [ ] Event-driven trigger engine
- [ ] No-code workflow builder (if/then rules)
- [ ] Billing lifecycle hooks (pre/post billing)
- [x] Approval workflows (quotes, discounts, write-offs)
- [ ] Escalation rules
- [ ] Scheduled tasks (e.g., aging review, renewal campaigns)
- [ ] Automated onboarding billing sequences
- [ ] Win-back campaign automation
- [ ] Payment reminder sequence builder
- [ ] Integration action triggers (sync to CRM on event)

---

## Marketplace & Partner / Channel Billing
- [ ] Reseller / channel partner management
- [ ] Tiered partner pricing
- [ ] Partner commission tracking
- [ ] Revenue share calculation and payout
- [ ] White-label billing (partner-branded)
- [ ] Sub-tenant provisioning
- [ ] Marketplace usage billing pass-through
- [ ] Partner self-service portal
- [ ] Co-sell billing flows

---

## Security & Compliance
- [ ] PCI DSS Level 1 certification
- [ ] SOC 2 Type II report
- [ ] ISO 27001 certification
- [ ] GDPR compliance (data processing agreements, consent, erasure)
- [ ] CCPA compliance
- [ ] HIPAA-eligible configuration (BAA available)
- [x] Role-based access control (RBAC) with custom roles
- [ ] Attribute-based access control (ABAC)
- [ ] Multi-factor authentication (MFA / TOTP / hardware keys)
- [ ] SSO via SAML 2.0 and OIDC
- [ ] SCIM provisioning (auto user sync from IdP)
- [ ] Field-level encryption for sensitive data
- [ ] Data encryption at rest (AES-256) and in transit (TLS 1.2+)
- [ ] Customer-managed encryption keys (CMEK / BYOK)
- [ ] Data residency options (US, EU, APAC)
- [ ] Right to erasure / anonymization
- [ ] Data portability export
- [x] Audit logs (immutable, exportable)
- [ ] Session management (timeout, concurrent sessions)
- [ ] IP allowlisting / blocklisting
- [ ] Anomaly detection on user activity
- [ ] Penetration testing (annual third-party)
- [ ] Bug bounty program
- [ ] Vulnerability disclosure policy

---

## Data Management & Operations
- [ ] Bulk import (CSV, JSON, API)
- [ ] Bulk export
- [x] Data migration tooling and services
- [ ] Sandbox environments (per team)
- [ ] Test clock (simulate time travel for testing)
- [ ] Data archiving and retention policies
- [ ] Data anonymization for non-production
- [ ] Soft deletes with recovery window
- [ ] Schema / API versioning
- [ ] Idempotent API operations
- [ ] Disaster recovery (RPO/RTO SLAs)
- [ ] 99.99% uptime SLA
- [ ] Status page

---

## AI / ML Capabilities
- [ ] Churn prediction scoring
- [ ] Expansion revenue propensity scoring
- [ ] Smart dunning retry optimization (card success prediction)
- [ ] Revenue anomaly detection and alerts
- [ ] Pricing optimization recommendations
- [ ] Revenue forecasting models
- [ ] Natural language query interface ("What was NRR last quarter?")
- [ ] Automated invoice anomaly flagging
- [ ] Customer health score modeling
- [ ] AI-assisted collections prioritization
