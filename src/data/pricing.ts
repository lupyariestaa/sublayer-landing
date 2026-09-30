export type Plan = {
  id: string;
  name: string;
  blurb: string;
  /** Monthly price in USD. */
  monthly: number;
  /** Yearly price in USD per month (billed annually). */
  yearly: number;
  cta: string;
  featured?: boolean;
  /** Revenue threshold shown as a qualifier. */
  qualifier: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: 'launch',
    name: 'Launch',
    blurb: 'For first-time subscription programs finding product-market fit.',
    monthly: 79,
    yearly: 63,
    cta: 'Start 14-day trial',
    qualifier: 'Up to $25k monthly recurring revenue',
    features: [
      'Composable plan builder',
      'Hosted checkout & customer portal',
      'Standard dunning (3 retries)',
      'MRR & churn dashboard',
      'Email support, 1 business day',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    blurb: 'For scaling programs that need recovery and forecasting to be automatic.',
    monthly: 329,
    yearly: 263,
    cta: 'Start 14-day trial',
    featured: true,
    qualifier: 'Up to $250k monthly recurring revenue',
    features: [
      'Everything in Launch',
      'Adaptive dunning + card account updater',
      'Cohort retention & LTV cohorts',
      'Lifecycle segments & win-back flows',
      'Double-entry ledger export',
      'Priority support, 4-hour response',
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    blurb: 'For multi-region businesses with finance and platform requirements.',
    monthly: 899,
    yearly: 719,
    cta: 'Start 14-day trial',
    qualifier: 'Up to $1.5m monthly recurring revenue',
    features: [
      'Everything in Growth',
      'Global tax, VAT and invoice compliance',
      'Warehouse sync (hourly) + reverse ETL',
      'Multi-entity consolidation',
      'SSO/SAML & granular RBAC',
      'Named implementation engineer',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    blurb: 'For high-volume businesses with custom commercial and security terms.',
    monthly: 0,
    yearly: 0,
    cta: 'Talk to sales',
    qualifier: 'Unlimited revenue, custom terms',
    features: [
      'Everything in Scale',
      'Custom contracts & committed volume pricing',
      'Dedicated infrastructure or private cloud',
      '99.99% uptime SLA with credits',
      'Security review & DPA support',
      'Quarterly business reviews',
    ],
  },
];

export const pricingIncludes = [
  'No implementation fee — launch in a day',
  'Usage-based 0.6% of processed renewal volume',
  'Unlimited seats on every plan',
  'Cancel any time, export everything',
];
