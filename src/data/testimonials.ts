export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  /** Tailwind-free accent hue for the avatar. */
  hue: 'indigo' | 'cyan' | 'violet' | 'mint' | 'amber';
  metric: { value: string; label: string };
};

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'We migrated 38,000 active subscriptions over a weekend. The recovery engine alone paid for the platform in six weeks — failed renewals dropped from 9.4% to 5.1%.',
    name: 'Marisa Feldman',
    role: 'VP Revenue Operations',
    company: 'Northnook Supply',
    initials: 'MF',
    hue: 'indigo',
    metric: { value: '−4.3pp', label: 'involuntary churn' },
  },
  {
    id: 't2',
    quote:
      'Finance used to close the month with three spreadsheets and a prayer. The ledger export lands in our warehouse hourly, so revenue recognition is now a review, not a rebuild.',
    name: 'Daniel Okonkwo',
    role: 'Controller',
    company: 'Ravel Health',
    initials: 'DO',
    hue: 'cyan',
    metric: { value: '11 days', label: 'faster monthly close' },
  },
  {
    id: 't3',
    quote:
      'Our team shipped four pricing experiments in a single quarter without touching the core checkout. That used to be a two-sprint project per test.',
    name: 'Priya Raghunathan',
    role: 'Director of Product',
    company: 'Tessellate',
    initials: 'PR',
    hue: 'violet',
    metric: { value: '4× ', label: 'pricing experiments per quarter' },
  },
  {
    id: 't4',
    quote:
      'Support tickets about billing fell off a cliff once customers could pause, swap payment methods and downgrade themselves. Our CSAT moved with it.',
    name: 'Lucas Meyer',
    role: 'Head of Customer Experience',
    company: 'Bellhouse Coffee',
    initials: 'LM',
    hue: 'mint',
    metric: { value: '−34%', label: 'billing support tickets' },
  },
];
