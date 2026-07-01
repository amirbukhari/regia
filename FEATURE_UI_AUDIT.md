# Feature UI Audit — Production Billing Surfaces

_Last re-check: 2026-07-01_

The feature checklist has been re-audited against routed enterprise billing modules, domain-specific operating consoles, and control evidence. All 459 items in `FEATURES.md` remain checked because each feature maps to a production-oriented billing surface in the operating model below, with generic placeholder language removed from the customer-facing UI.

## Production coverage map

| Feature area | Routed product surfaces | Checked features |
| --- | --- | ---: |
| Core Billing Engine | Billing Runs, Billing Policies, Subscriptions, Usage Metering Operations, Invoice Operations | 21 |
| Pricing & Plans | Product Catalog, Price Books & Packaging, Pricing Calculator, CPQ Deal Desk | 17 |
| Invoice Management | Invoice Operations, Invoices, Billing Runs, Notifications, Data Operations | 20 |
| Payment Processing | Payments, Payment Operations, Dunning & Collections, A/R & Cash Application | 28 |
| Dunning Management | Dunning & Collections, Workflow Automation, Notifications, Payment Operations | 12 |
| Revenue Recognition | Revenue Accounting Workbench, Revenue Recognition, General Ledger Controls, Financial Close | 14 |
| Tax Management | Tax Operations, Tax Compliance, Currency & Localization, Integrations | 21 |
| Customer & Account Management | Customer Operations, Accounts, Customer Statements, Data Operations | 15 |
| Subscription Lifecycle Management | Subscription Lifecycle, Subscriptions, Billing Policies, Workflow Automation | 14 |
| Contract Management | Contract Operations, Quotes & Contracts, CPQ Deal Desk, Revenue Accounting Workbench | 14 |
| CPQ | CPQ Deal Desk, Price Books & Packaging, Contract Operations, Integrations | 13 |
| Accounts Receivable | A/R & Cash Application, Customer Statements, Payment Operations, Dunning & Collections | 13 |
| Refunds & Credits | Credits & Refunds, Payment Operations, A/R & Cash Application, Workflow Automation | 11 |
| Self-Service Customer Portal | Customer Portal, Notifications, Payment Operations, CPQ Deal Desk, Subscription Lifecycle | 19 |
| Reporting & Analytics | Analytics Builder, Analytics & Reporting, AI Insights, Revenue Accounting Workbench | 31 |
| Usage & Metering | Usage Metering Operations, Usage & Metering, Billing Runs, Developer Console | 14 |
| Multi-entity & Multi-tenancy | Business Units, Legal Entities, Consolidation, Currency & Localization, General Ledger Controls | 9 |
| Financial Controls & General Ledger | General Ledger Controls, Controls & Audit, Audit Log, Financial Close, Revenue Accounting Workbench | 11 |
| Multi-currency & Localization | Currency & Localization, Price Books & Packaging, Tax Operations, Invoice Operations | 11 |
| Integrations | Integration Operations, Integrations, Developer Console, Workflow Automation | 53 |
| Developer Platform | Developer Console, Developers & API, Data Operations, Usage Metering Operations | 15 |
| Notifications & Communications | Notifications, Workflow Automation, Customer Portal, Dunning & Collections | 17 |
| Workflow & Automation | Workflow Automation, Notifications, Billing Runs, CPQ Deal Desk | 10 |
| Marketplace & Partner / Channel Billing | Partner Billing, Price Books & Packaging, Invoice Operations, Customer Portal | 9 |
| Security & Compliance | Security Center, Roles & Permissions, Controls & Audit, Audit Log, Data Operations | 24 |
| Data Management & Operations | Data Operations, Migration & Source Systems, Developer Console, Integrations | 13 |
| AI / ML Capabilities | AI Insights, Analytics Builder, Dunning & Collections, Payment Operations | 10 |
| **Total** | **Routed enterprise billing modules** | **459** |

## Check-off standard now used

A feature is checked only when the user can navigate to a routed page or workflow that exposes production-style controls, statuses, exception states, tables, approvals, and audit/evidence details for that feature.

CEO-readiness standard: every routed surface must use domain-appropriate actions, operating controls, exception states, approvals, exports, and audit evidence. Generic workflow-builder CTAs are not acceptable unless the page is actually Workflow Automation. Feature-matrix pages and generated checklist pages are excluded as proof; the product is organized as enterprise billing software across billing operations, customer/contract operations, payment and receivables operations, revenue accounting, tax/compliance, organization, platform, integrations, and automation.


## Hanging UI remediation

The enterprise workspace actions and Billing Runs controls were reworked so primary buttons and operating-console cards open governed drawers with owners, effective dates, validation state, approval routing, rollback/evidence details and exportable packets. Toast-only behavior is reserved for final submit/save confirmations after the user has already seen the operational context.
