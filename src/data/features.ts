export type Feature = {
  id: string;
  icon: string;
  title: string;
  description: string;
  /** Visual weight in the bento grid. */
  span?: 'wide' | 'tall' | 'normal';
  visual: 'plans' | 'dunning' | 'analytics' | 'checkout' | 'ledger' | 'portal' | 'api' | 'tax' | 'segments';
};

export const features: Feature[] = [
  {
    id: 'plan-builder',
    icon: 'Layers',
    title: 'Composable plan builder',
    description:
      'Mix intervals, trials, prepaid credits and add-ons into a single product record. Version pricing without forking your catalogue.',
    span: 'wide',
    visual: 'plans',
  },
  {
    id: 'churn-recovery',
    icon: 'HeartPulse',
    title: 'Involuntary churn recovery',
    description:
      'Adaptive retry windows, card account updater and network tokens cut recovery failure rates by up to 41%.',
    span: 'tall',
    visual: 'dunning',
  },
  {
    id: 'revenue-analytics',
    icon: 'ChartSpline',
    title: 'Revenue analytics',
    description:
      'MRR movement, cohort retention and expansion revenue in one dashboard — no spreadsheet reconciliation.',
    visual: 'analytics',
  },
  {
    id: 'checkout',
    icon: 'CreditCard',
    title: 'Conversion-tuned checkout',
    description:
      'Local payment methods, one-tap wallets and address autocomplete rendered by the SDK in under 40ms.',
    visual: 'checkout',
  },
  {
    id: 'ledger',
    icon: 'BookOpenCheck',
    title: 'Double-entry ledger',
    description:
      'Every subscription event posts an immutable ledger entry, so revenue recognition stops being a quarter-end project.',
    span: 'wide',
    visual: 'ledger',
  },
  {
    id: 'customer-portal',
    icon: 'Users',
    title: 'Customer portal',
    description:
      'Self-serve upgrades, pauses, and payment updates that reduce support tickets by a third.',
    visual: 'portal',
  },
  {
    id: 'developer-api',
    icon: 'Terminal',
    title: 'Typed API & webhooks',
    description:
      'Idempotent writes, signed webhooks and an OpenAPI spec you can generate clients from.',
    visual: 'api',
  },
  {
    id: 'tax',
    icon: 'Receipt',
    title: 'Global tax & VAT',
    description:
      'Calculated, collected and remitted across 40+ jurisdictions with invoice-grade audit trails.',
    visual: 'tax',
  },
  {
    id: 'segments',
    icon: 'Target',
    title: 'Lifecycle segments',
    description:
      'Build behavioural cohorts and trigger win-back, upgrade or save offers on subscription signals.',
    visual: 'segments',
  },
];
