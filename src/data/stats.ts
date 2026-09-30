export type Stat = {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  detail: string;
};

export const heroStats: Stat[] = [
  {
    id: 'mrr',
    value: 4.1,
    prefix: '$',
    suffix: 'B',
    decimals: 1,
    label: 'Recurring volume processed',
    detail: 'Across 3,100 merchants in 41 countries',
  },
  {
    id: 'recovery',
    value: 41,
    suffix: '%',
    label: 'Fewer failed renewals',
    detail: 'Median improvement after switching to adaptive dunning',
  },
  {
    id: 'uptime',
    value: 99.99,
    suffix: '%',
    decimals: 2,
    label: 'Billing API uptime',
    detail: 'Trailing twelve months, independently monitored',
  },
  {
    id: 'latency',
    value: 38,
    suffix: 'ms',
    label: 'Median checkout render',
    detail: 'p95 across hosted and embedded surfaces',
  },
];

export type Outcome = {
  id: string;
  metric: string;
  metricLabel: string;
  title: string;
  description: string;
  visual: 'retention' | 'mrr' | 'recovery' | 'time';
};

export const outcomes: Outcome[] = [
  {
    id: 'retention',
    metric: '+18%',
    metricLabel: 'net revenue retention',
    title: 'Keep the subscribers you already paid to acquire',
    description:
      'Pause triggers, save offers and involuntary-churn recovery run on the same lifecycle engine, so a failed card becomes a retry instead of a cancellation.',
    visual: 'retention',
  },
  {
    id: 'mrr',
    metric: '2.4×',
    metricLabel: 'expansion revenue per subscriber',
    title: 'Grow accounts without re-acquiring them',
    description:
      'Usage thresholds and seat signals trigger upgrade prompts at the moment of highest intent, priced against the plan the customer actually uses.',
    visual: 'mrr',
  },
  {
    id: 'recovery',
    metric: '−11 days',
    metricLabel: 'time to reconciled revenue',
    title: 'Close the month without a spreadsheet rebuild',
    description:
      'Double-entry postings, tax lines and processor settlements land in one export, so finance reviews numbers instead of reconstructing them.',
    visual: 'recovery',
  },
  {
    id: 'time',
    metric: '6.5 hrs',
    metricLabel: 'saved per engineer per week',
    title: 'Stop maintaining billing infrastructure',
    description:
      'Proration, mid-cycle changes, tax rules and retry logic are platform concerns. Your team ships product again.',
    visual: 'time',
  },
];

export type TrustBadge = { id: string; name: string; mark: string };

export const trustLogos: TrustBadge[] = [
  { id: 'northnook', name: 'Northnook', mark: 'N' },
  { id: 'ravel', name: 'Ravel Health', mark: 'R' },
  { id: 'tessellate', name: 'Tessellate', mark: 'T' },
  { id: 'bellhouse', name: 'Bellhouse', mark: 'B' },
  { id: 'lumen', name: 'Lumen Row', mark: 'L' },
  { id: 'arcway', name: 'Arcway', mark: 'A' },
];

export type ComparisonRow = {
  id: string;
  label: string;
  sublayer: string | boolean;
  storeNative: string | boolean;
  legacyBilling: string | boolean;
  spreadsheets: string | boolean;
};

/** Honest capability comparison — factual, not disparaging. */
export const comparisonColumns = [
  { id: 'sublayer', label: 'Sublayer', highlight: true },
  { id: 'storeNative', label: 'Store-native tools', highlight: false },
  { id: 'legacyBilling', label: 'Legacy billing suites', highlight: false },
  { id: 'spreadsheets', label: 'Spreadsheets + processor', highlight: false },
] as const;

export const comparisonRows: ComparisonRow[] = [
  {
    id: 'plans',
    label: 'Composable plan structures (prepaid, pause, usage, seats)',
    sublayer: true,
    storeNative: 'Partial',
    legacyBilling: true,
    spreadsheets: false,
  },
  {
    id: 'dunning',
    label: 'Adaptive dunning with network-token retries',
    sublayer: true,
    storeNative: 'Basic',
    legacyBilling: 'Configurable',
    spreadsheets: false,
  },
  {
    id: 'ledger',
    label: 'Immutable double-entry revenue ledger',
    sublayer: true,
    storeNative: false,
    legacyBilling: true,
    spreadsheets: 'Manual',
  },
  {
    id: 'tax',
    label: 'Global tax, VAT & invoice compliance',
    sublayer: '40+ regions',
    storeNative: 'Partial',
    legacyBilling: 'Add-on module',
    spreadsheets: false,
  },
  {
    id: 'warehouse',
    label: 'Hourly warehouse sync for finance & BI',
    sublayer: true,
    storeNative: false,
    legacyBilling: 'Daily batch',
    spreadsheets: false,
  },
  {
    id: 'time',
    label: 'Time to launch a new pricing model',
    sublayer: 'Same day',
    storeNative: 'Weeks',
    legacyBilling: '1–2 quarters',
    spreadsheets: 'Ongoing',
  },
  {
    id: 'ownership',
    label: 'Engineering effort to maintain',
    sublayer: 'None — managed',
    storeNative: 'Low',
    legacyBilling: 'High',
    spreadsheets: 'Very high',
  },
];
