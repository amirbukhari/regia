# Enterprise Billing Features

Checkbox is checked once the UI for that feature is **100% mocked out** in Delonix.

---

## Core Billing Engine
- [x] Subscription management (create, modify, pause, resume, cancel)
- [x] One-time / ad hoc charges
- [x] Recurring billing (daily, weekly, monthly, quarterly, annual, custom cycles)
- [x] Prorated billing on mid-cycle changes
- [x] Metered / usage-based billing
- [x] Tiered pricing (graduated & volume)
- [x] Volume pricing
- [x] Flat-rate pricing
- [x] Per-seat / per-user pricing
- [x] Hybrid pricing models (base + usage)
- [x] Freemium plan support
- [x] Free trial management
- [x] Trial-to-paid conversion automation
- [x] Prepaid billing
- [x] Postpaid billing
- [x] Billing period alignment (first-of-month normalization)
- [x] Mid-cycle plan changes with immediate or deferred effect
- [x] Backdating charges
- [x] Billing anchors / custom billing dates
- [x] Minimum spend commitments
- [x] Overage handling

---

## Pricing & Plans
- [x] Plan catalog with versioning
- [x] Price books (multiple, per segment or region)
- [x] Geographic / regional pricing
- [x] Custom pricing per customer
- [x] Pricing rules engine
- [x] Volume discounts
- [x] Multi-year pricing tiers
- [x] Contractual price locks
- [x] Promotional / limited-time pricing
- [x] Discount management (percentage, fixed, duration-limited)
- [x] Coupons and redemption codes
- [x] Product bundling
- [x] Add-ons and extras
- [x] Entitlements per plan
- [x] Feature flags tied to plan level
- [x] Price localization (currency + format)
- [x] Standalone selling price (SSP) configuration

---

## Invoice Management
- [x] Automated invoice generation
- [x] Invoice templates (customizable branding)
- [x] Custom invoice numbering / sequencing
- [x] Invoice scheduling and batching
- [x] Consolidated invoices (multiple subscriptions → one invoice)
- [x] Invoice grouping by cost center or department
- [x] Credit notes / credit memos
- [x] Debit notes
- [x] Proforma invoices
- [x] Manual invoice creation
- [x] Invoice editing before finalization
- [x] Invoice voiding and reissue
- [x] Invoice approval workflows
- [x] Multi-language invoices
- [x] Invoice delivery (email, PDF, EDI 810, XML)
- [x] Invoice archiving with retention policies
- [x] Invoice history and audit trail
- [x] E-invoicing compliance (Peppol, ZUGFeRD, Factur-X, FatturaPA, etc.)
- [x] Invoice watermarking
- [x] Purchase order (PO) number capture and matching

---

## Payment Processing
- [x] Credit/debit card (Visa, Mastercard, Amex, Discover)
- [x] ACH / eCheck (US bank transfer)
- [x] Wire transfers
- [x] SEPA direct debit (EU)
- [x] BACS direct debit (UK)
- [x] Faster Payments (UK)
- [x] SPEI (Mexico)
- [x] PayPal, Venmo, Cash App Pay
- [x] Digital wallets (Apple Pay, Google Pay, Samsung Pay)
- [x] Buy Now Pay Later (Klarna, Afterpay, Affirm)
- [x] Cryptocurrency payments
- [x] Check / cheque payments
- [x] Net terms (Net 15, Net 30, Net 60, Net 90)
- [x] Payment links (one-click hosted checkout)
- [x] Hosted payment pages (white-labeled)
- [x] Payment on file (stored tokenized methods)
- [x] Multiple payment methods per customer
- [x] Payment splitting across methods
- [x] Auto-charge (card on file)
- [x] Payment retry on failure
- [x] Smart retry scheduling (ML-optimized timing)
- [x] 3D Secure (3DS2) / SCA compliance
- [x] Strong Customer Authentication (EU PSD2)
- [x] PCI DSS Level 1 compliance
- [x] Tokenization and vault management
- [x] Partial payments
- [x] Overpayment handling
- [x] Real-time payment confirmation

---

## Dunning Management
- [x] Automated payment failure sequences
- [x] Configurable dunning cadence (timing, channels)
- [x] Soft vs. hard decline handling
- [x] Card updater (automatic card number refresh via Visa/Mastercard)
- [x] Smart retry using ML card success prediction
- [x] Grace period configuration
- [x] Account suspension / access revocation on non-payment
- [x] Escalation rules (email → call → collections)
- [x] Reactivation workflows post-payment
- [x] Dunning email templates per failure stage
- [x] Dunning analytics (recovery rate, revenue recovered)
- [x] Pause dunning for specific customers

---

## Revenue Recognition
- [x] ASC 606 compliance
- [x] IFRS 15 compliance
- [x] Deferred revenue tracking and scheduling
- [x] Revenue schedules (ratable, event-based, milestone)
- [x] Performance obligation management
- [x] Multi-element arrangement (MEA) handling
- [x] Contract modification and re-evaluation
- [x] Standalone selling price (SSP) calculation
- [x] Revenue waterfall reports
- [x] Recognized vs. deferred revenue split
- [x] Revenue accrual entries
- [x] Variable consideration handling (refunds, discounts, rebates)
- [x] Forecasted revenue recognition
- [x] Period-close controls

---

## Tax Management
- [x] Multi-jurisdiction tax calculation engine
- [x] US sales tax (all 50 states + local jurisdictions)
- [x] VAT (EU 27 member states, UK, Norway, Switzerland)
- [x] GST/HST (Canada)
- [x] GST (Australia, New Zealand, India, Singapore)
- [x] JCT (Japan Consumption Tax)
- [x] Digital Services Tax (DST)
- [x] Withholding tax
- [x] Reverse charge mechanism
- [x] Economic nexus tracking and alerts
- [x] Tax exemptions (reseller, non-profit, government)
- [x] Tax exemption certificate management
- [x] Tax ID validation (VAT ID, EIN, ABN, GST, etc.)
- [x] Automatic tax rate updates
- [x] Tax override capability
- [x] Tax-inclusive vs. tax-exclusive pricing
- [x] Integration with Avalara, TaxJar, Vertex, Taxamo
- [x] Tax reports by jurisdiction
- [x] VAT return data export
- [x] MTD (Making Tax Digital) compliance (UK)
- [x] OSS / IOSS compliance (EU)

---

## Customer & Account Management
- [x] Customer profiles (individual and company)
- [x] Account hierarchy (parent → child / subsidiary accounts)
- [x] Multiple contacts per account with roles
- [x] Multiple billing addresses
- [x] Shipping address management
- [x] Custom fields on customer records
- [x] Customer segmentation and tagging
- [x] Customer notes and internal annotations
- [x] Communication history log
- [x] Account merge / deduplication
- [x] Bulk customer import / export
- [x] Customer credit limit management
- [x] Customer credit score / risk tier
- [x] Account health score
- [x] Customer lifecycle stage tracking

---

## Subscription Lifecycle Management
- [x] Upgrade and downgrade flows
- [x] Immediate vs. end-of-period plan changes
- [x] Subscription cloning / templating
- [x] Bulk subscription operations
- [x] Subscription pausing (with optional billing pause)
- [x] Cancellation workflows with reason capture
- [x] Cancellation surveys
- [x] Win-back / re-engagement flows
- [x] Subscription reactivation
- [x] Subscription renewal management
- [x] Auto-renewal with configurable advance notice
- [x] Renewal quote generation
- [x] Co-term / alignment of multiple subscriptions
- [x] Subscription transfer between accounts

---

## Contract Management
- [x] Contract creation and versioning
- [x] Multi-year contracts
- [x] Contract terms and conditions capture
- [x] Custom contract start / end dates
- [x] Evergreen vs. fixed-term contracts
- [x] Auto-renewal with notification windows
- [x] Contract amendments and addenda
- [x] Minimum commitment / floor ARR
- [x] Contract performance obligation tracking
- [x] Electronic signature integration (DocuSign, Adobe Sign, HelloSign)
- [x] Quote-to-contract flow
- [x] Contract repository and search
- [x] Renewal pipeline management
- [x] Early termination fee calculation

---

## CPQ (Configure, Price, Quote)
- [x] Product catalog for quoting
- [x] Guided selling / product configuration wizard
- [x] Rules-based pricing configuration
- [x] Quote generation with line items
- [x] Tiered discount approval workflows
- [x] Quote templates
- [x] Quote expiry and versioning
- [x] Quote PDF generation and delivery
- [x] Quote-to-order / quote-to-subscription conversion
- [x] Proposal generation
- [x] Competitive pricing comparison
- [x] Deal desk workflows
- [x] Opportunity-to-billing sync (CRM integration)

---

## Accounts Receivable
- [x] Payment application to invoices
- [x] Auto-application of payments
- [x] Unapplied payment management
- [x] Write-offs and bad debt
- [x] Dispute management and resolution tracking
- [x] Collections workflow management
- [x] AR aging reports (30/60/90/120+)
- [x] Cash flow forecasting from AR
- [x] Customer credit holds
- [x] Balance forward invoices
- [x] Statement of account generation
- [x] Integration with collections agencies
- [x] Promise-to-pay tracking

---

## Refunds & Credits
- [x] Full refunds to original payment method
- [x] Partial refunds
- [x] Refund to credit balance
- [x] Account credit balance management
- [x] Credit expiry rules
- [x] Promotional credit issuance
- [x] Credit application to future invoices
- [x] Prepaid credit / wallet management
- [x] Balance rollover configuration
- [x] Refund reason tracking
- [x] Refund approval workflows

---

## Self-Service Customer Portal
- [x] View and search invoices
- [x] Download invoices as PDF
- [x] Pay invoices online
- [x] Set up autopay
- [x] Manage saved payment methods
- [x] Update billing address and contact info
- [x] View subscription details
- [x] Self-service plan upgrade / downgrade
- [x] Self-service cancellation
- [x] View usage metrics and history
- [x] Download usage reports
- [x] Manage users / seats (add/remove)
- [x] View transaction and payment history
- [x] Raise billing disputes
- [x] Request refunds
- [x] Download tax documents
- [x] Accept/decline quotes and contracts
- [x] View and accept renewal quotes
- [x] Branded and embeddable portal (configuration UI)

---

## Reporting & Analytics
- [x] MRR (Monthly Recurring Revenue)
- [x] ARR (Annual Recurring Revenue)
- [x] Net Revenue Retention (NRR)
- [x] Gross Revenue Retention (GRR)
- [x] Net Dollar Retention (NDR)
- [x] Customer Lifetime Value (LTV)
- [x] Average Revenue Per User (ARPU)
- [x] Churn rate (customer churn & revenue churn)
- [x] Logo churn vs. revenue churn
- [x] Expansion revenue
- [x] Contraction revenue
- [x] New business revenue
- [x] Reactivation revenue
- [x] Revenue by product / plan / segment / geo
- [x] Cohort analysis (monthly cohorts)
- [x] Trial conversion rates
- [x] Subscriber counts (new, active, churned, net)
- [x] Cash flow reports
- [x] Deferred revenue balance
- [x] Revenue waterfall (beginning → end of period)
- [x] Bookings vs. billings vs. revenue
- [x] Accounts receivable aging
- [x] Collections effectiveness
- [x] Payment success rates by method
- [x] Dashboard builder (drag-and-drop)
- [x] Custom report builder
- [x] Scheduled report delivery (email, Slack)
- [x] Report export (CSV, PDF, Excel, Google Sheets)
- [x] Real-time dashboards
- [x] Benchmark comparisons (industry averages)
- [x] Forecasting and projections

---

## Usage & Metering
- [x] Real-time usage event ingestion (REST API)
- [x] High-throughput event pipeline (millions of events/day)
- [x] Usage aggregation (sum, max, unique count, percentile)
- [x] Multiple concurrent usage meters per subscription
- [x] Usage-based overages (hard cap vs. overage billing)
- [x] Usage alerts and threshold notifications
- [x] Usage caps / hard limits
- [x] Rollover unused units to next period
- [x] Usage history per customer
- [x] Usage rating engine
- [x] Idempotent event deduplication
- [x] Usage report per invoice
- [x] Usage debugging and audit log
- [x] Proration of usage within a billing period

---

## Multi-entity & Multi-tenancy
- [x] Multiple legal entity support
- [x] Inter-company billing
- [x] Subsidiary management
- [x] Multi-brand billing (different logos/names per entity)
- [x] Multi-currency at entity level
- [x] Consolidated cross-entity reporting
- [x] Entity-level chart of accounts
- [x] Separate GL per entity
- [x] Shared customer database across entities

---

## Financial Controls & General Ledger
- [x] GL account mapping per product / revenue type
- [x] Chart of accounts management
- [x] Journal entry generation (automated + manual)
- [x] Revenue accrual entries
- [x] Period-close controls (lock closed periods)
- [x] Audit trail on all financial transactions
- [x] Approval limits by amount or type
- [x] Segregation of duties enforcement
- [x] Intercompany eliminations
- [x] Foreign currency revaluation
- [x] Realized / unrealized FX gain/loss tracking

---

## Multi-currency & Localization
- [x] 150+ currencies
- [x] Real-time exchange rates (daily feed)
- [x] Fixed / locked exchange rates per contract
- [x] Customer-facing currency vs. reporting currency
- [x] Currency rounding rules (per jurisdiction)
- [x] Functional currency for reporting
- [x] Currency conversion at billing time
- [x] Localized invoice date/number formats
- [x] Localized tax labels
- [x] Multi-language email templates and invoices
- [x] Right-to-left (RTL) language support

---

## Integrations
- [x] Salesforce CRM
- [x] HubSpot CRM
- [x] Microsoft Dynamics 365 CRM
- [x] Zoho CRM
- [x] Pipedrive CRM
- [x] SAP ERP
- [x] Oracle ERP Cloud
- [x] NetSuite ERP
- [x] Microsoft Dynamics Finance
- [x] Xero accounting
- [x] QuickBooks Online
- [x] Freshbooks
- [x] Stripe payment gateway
- [x] Adyen payment gateway
- [x] Braintree payment gateway
- [x] PayPal payment gateway
- [x] Square
- [x] Authorize.Net
- [x] Checkout.com
- [x] Worldpay
- [x] Cybersource
- [x] Avalara tax engine
- [x] TaxJar tax engine
- [x] Vertex tax engine
- [x] DocuSign e-signature
- [x] Adobe Sign e-signature
- [x] HelloSign
- [x] Zendesk help desk
- [x] Freshdesk help desk
- [x] Intercom
- [x] ServiceNow
- [x] Looker BI
- [x] Tableau BI
- [x] Power BI
- [x] Snowflake data warehouse
- [x] BigQuery data warehouse
- [x] Amazon Redshift
- [x] Okta SSO
- [x] Auth0
- [x] Azure Active Directory
- [x] Google Workspace SSO
- [x] Twilio SMS
- [x] SendGrid email
- [x] Mailchimp
- [x] Zapier
- [x] Make (Integromat)
- [x] Workato
- [x] Boomi
- [x] Mulesoft
- [x] Webhooks (configurable per event type with retry and signature verification)
- [x] REST API (versioned, with full OpenAPI spec)
- [x] GraphQL API
- [x] Bulk data export (S3, GCS, SFTP)

---

## Developer Platform
- [x] Versioned REST API
- [x] GraphQL API
- [x] Webhooks with retry, dead-letter queue, and HMAC signatures
- [x] Event catalog (full list of subscribable events)
- [x] API sandbox / test mode with test clock
- [x] API keys with scoped permissions
- [x] OAuth 2.0 support
- [x] Official SDKs (Node.js, Python, Ruby, Java, PHP, Go, .NET)
- [x] SDK documentation view
- [x] Postman / Insomnia collections
- [x] API reference docs
- [x] Changelog and deprecation policy
- [x] API usage monitoring and rate limit dashboards
- [x] IP allowlisting for API access
- [x] Idempotency keys

---

## Notifications & Communications
- [x] Invoice delivery via email (configurable triggers)
- [x] Payment confirmation receipts
- [x] Upcoming renewal notifications
- [x] Failed payment notifications
- [x] Payment retry notifications
- [x] Expiring payment method alerts
- [x] Trial expiration warnings
- [x] Account suspension notices
- [x] Custom email templates (HTML + plain text)
- [x] Brand theming per template
- [x] Multi-language notification templates
- [x] SMS notifications
- [x] In-app notification feed
- [x] Slack / Teams webhook notifications
- [x] Communication delivery log and audit
- [x] Notification preference management (per customer)
- [x] Unsubscribe handling

---

## Workflow & Automation
- [x] Event-driven trigger engine
- [x] No-code workflow builder (if/then rules)
- [x] Billing lifecycle hooks (pre/post billing)
- [x] Approval workflows (quotes, discounts, write-offs)
- [x] Escalation rules
- [x] Scheduled tasks (e.g., aging review, renewal campaigns)
- [x] Automated onboarding billing sequences
- [x] Win-back campaign automation
- [x] Payment reminder sequence builder
- [x] Integration action triggers (sync to CRM on event)

---

## Marketplace & Partner / Channel Billing
- [x] Reseller / channel partner management
- [x] Tiered partner pricing
- [x] Partner commission tracking
- [x] Revenue share calculation and payout
- [x] White-label billing (partner-branded)
- [x] Sub-tenant provisioning
- [x] Marketplace usage billing pass-through
- [x] Partner self-service portal
- [x] Co-sell billing flows

---

## Security & Compliance
- [x] PCI DSS Level 1 certification
- [x] SOC 2 Type II report
- [x] ISO 27001 certification
- [x] GDPR compliance (data processing agreements, consent, erasure)
- [x] CCPA compliance
- [x] HIPAA-eligible configuration (BAA available)
- [x] Role-based access control (RBAC) with custom roles
- [x] Attribute-based access control (ABAC)
- [x] Multi-factor authentication (MFA / TOTP / hardware keys)
- [x] SSO via SAML 2.0 and OIDC
- [x] SCIM provisioning (auto user sync from IdP)
- [x] Field-level encryption for sensitive data
- [x] Data encryption at rest (AES-256) and in transit (TLS 1.2+)
- [x] Customer-managed encryption keys (CMEK / BYOK)
- [x] Data residency options (US, EU, APAC)
- [x] Right to erasure / anonymization
- [x] Data portability export
- [x] Audit logs (immutable, exportable)
- [x] Session management (timeout, concurrent sessions)
- [x] IP allowlisting / blocklisting
- [x] Anomaly detection on user activity
- [x] Penetration testing (annual third-party)
- [x] Bug bounty program
- [x] Vulnerability disclosure policy

---

## Data Management & Operations
- [x] Bulk import (CSV, JSON, API)
- [x] Bulk export
- [x] Data migration tooling and services
- [x] Sandbox environments (per team)
- [x] Test clock (simulate time travel for testing)
- [x] Data archiving and retention policies
- [x] Data anonymization for non-production
- [x] Soft deletes with recovery window
- [x] Schema / API versioning
- [x] Idempotent API operations
- [x] Disaster recovery (RPO/RTO SLAs)
- [x] 99.99% uptime SLA
- [x] Status page

---

## AI / ML Capabilities
- [x] Churn prediction scoring
- [x] Expansion revenue propensity scoring
- [x] Smart dunning retry optimization (card success prediction)
- [x] Revenue anomaly detection and alerts
- [x] Pricing optimization recommendations
- [x] Revenue forecasting models
- [x] Natural language query interface ("What was NRR last quarter?")
- [x] Automated invoice anomaly flagging
- [x] Customer health score modeling
- [x] AI-assisted collections prioritization
