export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    id: 'what',
    question: 'What exactly is Sublayer?',
    answer:
      'Sublayer is the billing and revenue layer that sits between your product and your payment processors. It owns plan logic, renewal scheduling, dunning, tax, ledger postings and analytics, so your application only ever talks to one subscription API instead of five integrations.',
  },
  {
    id: 'who',
    question: 'Who is Sublayer built for?',
    answer:
      'Commerce and product teams running recurring revenue — subscription boxes, memberships, digital products and hybrid usage-based software. Most customers move to Sublayer somewhere between $30k and $2m in monthly recurring revenue, when spreadsheets and store-native tools stop being enough.',
  },
  {
    id: 'onboarding',
    question: 'How long does implementation actually take?',
    answer:
      'A standard storefront integration is live in one working day: install the SDK, map your products, and run a sandbox renewal cycle. Migrations with live subscribers typically take two to three weeks including parallel running, and every plan includes a migration engineer.',
  },
  {
    id: 'trial',
    question: 'Is there a free trial?',
    answer:
      'Yes. Every plan has a 14-day trial with full feature access and no card required. Sandbox environments are free forever, including simulated renewals, dunning cycles and webhook delivery, so you can validate behaviour before going live.',
  },
  {
    id: 'billing',
    question: 'How is Sublayer priced?',
    answer:
      'A flat platform fee based on your monthly recurring revenue band, plus volume processing on renewals at 0.6%. There is no implementation fee, no per-seat charge and no charge on first-order revenue — only on subscriptions Sublayer manages.',
  },
  {
    id: 'cancel',
    question: 'Can I cancel or export my data?',
    answer:
      'Month-to-month on every self-serve plan — cancel and you keep access until the end of the period. Your full subscription, ledger, customer and event history is exportable as JSON or CSV at any time, and we will provision a read-only replica for 30 days after cancellation.',
  },
  {
    id: 'integrations',
    question: 'Which platforms and processors do you support?',
    answer:
      'Native adapters for Shopify, Stripe, Adyen, Braintree, Chargebee migrations and Recharge migrations, plus webhooks for anything else. A typed OpenAPI client is generated for TypeScript, Python, Go and PHP.',
  },
  {
    id: 'security',
    question: 'How is my data protected?',
    answer:
      'SOC 2 Type II audited, PCI DSS Level 1 via our processors, GDPR and CCPA compliant with a configurable data residency region. Card data never touches Sublayer servers — we use network tokens and processor-side vaulting only.',
  },
  {
    id: 'collaboration',
    question: 'Can finance, support and engineering work in one place?',
    answer:
      'Yes. Role-based access control lets finance see ledger and reconciliation views, support see subscriber timelines with safe actions like pausing or retrying a charge, and engineering see API logs and webhook replays. SSO/SAML and audit logging are available from the Scale plan.',
  },
  {
    id: 'cards',
    question: 'What happens when a renewal fails?',
    answer:
      'Sublayer opens a recovery case, immediately attempts a network-token retry, then schedules adaptive retries timed to each issuer across the following 21 days. Customers receive a hosted update-payment link, and support sees the full attempt history inline.',
  },
];
