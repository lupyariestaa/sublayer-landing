export const site = {
  name: 'Sublayer',
  tagline: 'Subscription revenue infrastructure',
  description:
    'Sublayer is the subscription revenue platform for modern commerce and product teams.',
  email: 'hello@sublayer.io',
  salesEmail: 'sales@sublayer.io',
  demoUrl: 'mailto:sales@sublayer.io?subject=Sublayer%20demo%20request',
  salesUrl: 'mailto:sales@sublayer.io?subject=Talk%20to%20Sublayer%20sales',
} as const;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: 'Product', href: '#product' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Product',
    items: [
      { label: 'Overview', href: '#product' },
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Features', href: '#features' },
      { label: 'Revenue calculator', href: '#calculator' },
      { label: 'Outcomes', href: '#outcomes' },
    ],
  },
  {
    title: 'Solutions',
    items: [
      { label: 'Ecommerce subscriptions', href: '#features' },
      { label: 'SaaS billing', href: '#features' },
      { label: 'Membership programs', href: '#features' },
      { label: 'Recharge migration', href: '#comparison' },
      { label: 'Enterprise', href: '#pricing' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Documentation', href: '#faq' },
      { label: 'API reference', href: '#faq' },
      { label: 'Churn benchmark report', href: '#calculator' },
      { label: 'Customer stories', href: '#testimonials' },
      { label: 'Changelog', href: '#faq' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: '#footer' },
      { label: 'Careers', href: '#footer' },
      { label: 'Partners', href: '#footer' },
      { label: 'Contact sales', href: 'mailto:sales@sublayer.io' },
      { label: 'Press kit', href: '#footer' },
    ],
  },
];
