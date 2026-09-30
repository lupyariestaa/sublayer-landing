import { ShieldCheck, Lock, ScrollText } from 'lucide-react';
import { trustLogos } from '../../data/stats';
import { Reveal } from '../ui/Reveal';
import './Trust.css';

const assurances = [
  { Icon: ShieldCheck, label: 'SOC 2 Type II' },
  { Icon: Lock, label: 'PCI DSS Level 1' },
  { Icon: ScrollText, label: 'GDPR & CCPA' },
];

export function Trust() {
  return (
    <section className="trust section--tight" aria-label="Customers and compliance">
      <div className="container">
        <Reveal variant="fade">
          <p className="trust__label">
            Powering recurring revenue for 3,100+ commerce, membership and SaaS teams
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ul className="trust__logos">
            {trustLogos.map((logo) => (
              <li key={logo.id} className="trust__logo">
                <span className="trust__mark" aria-hidden="true">
                  {logo.mark}
                </span>
                <span className="trust__name">{logo.name}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={160}>
          <ul className="trust__certs">
            {assurances.map(({ Icon, label }) => (
              <li key={label}>
                <Icon size={15} strokeWidth={2.2} />
                {label}
              </li>
            ))}
            <li className="trust__certsNote">Audited annually by independent third parties</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
