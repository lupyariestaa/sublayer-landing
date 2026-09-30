export type Step = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description: string;
};

export const steps: Step[] = [
  {
    id: 'connect',
    index: '01',
    eyebrow: 'Connect',
    title: 'Connect your storefront in one deploy',
    description:
      'Install the Sublayer SDK or connect your existing gateway. Products, prices and customers sync bi-directionally in both directions from day one — no CSV exports, no duplicate catalogues.',
  },
  {
    id: 'model',
    index: '02',
    eyebrow: 'Model',
    title: 'Model any plan structure you can sell',
    description:
      'Build prepaid boxes, pause-anytime memberships, usage tiers and seat-based contracts from the same primitive. Pricing changes ship without a release cycle.',
  },
  {
    id: 'recover',
    index: '03',
    eyebrow: 'Recover',
    title: 'Let dunning run in the background',
    description:
      'Smart retries, card updater and adaptive payment-method sequencing recover failed invoices automatically, with a full audit trail for every attempt.',
  },
  {
    id: 'forecast',
    index: '04',
    eyebrow: 'Forecast',
    title: 'Operate on numbers you can defend',
    description:
      'Cohort retention, MRR movement and LTV flow into one ledger your finance team can reconcile — exportable to your warehouse on an hourly cadence.',
  },
];
