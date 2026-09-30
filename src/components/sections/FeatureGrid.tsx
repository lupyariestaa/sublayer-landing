import {
  BookOpenCheck,
  ChartSpline,
  CreditCard,
  HeartPulse,
  Layers,
  Receipt,
  Target,
  Terminal,
  Users,
  type LucideIcon,
  Sparkles,
} from 'lucide-react';
import { features, type Feature } from '../../data/features';
import { featureVisuals } from '../visuals/FeatureVisuals';
import { Reveal } from '../ui/Reveal';
import './FeatureGrid.css';

const iconMap: Record<string, LucideIcon> = {
  Layers,
  HeartPulse,
  ChartSpline,
  CreditCard,
  BookOpenCheck,
  Users,
  Terminal,
  Receipt,
  Target,
};

function FeatureCard({ feature, delay }: { feature: Feature; delay: number }) {
  const Icon = iconMap[feature.icon] ?? Sparkles;
  const Visual = featureVisuals[feature.visual];
  const span = feature.span ?? 'normal';

  return (
    <Reveal
      as="li"
      delay={delay}
      className={`fg__cell fg__cell--${span}`}
    >
      <article className="fg__card">
        <div className="fg__copy">
          <span className="fg__icon">
            <Icon size={18} strokeWidth={2.2} />
          </span>
          <h3 className="fg__title">{feature.title}</h3>
          <p className="fg__desc">{feature.description}</p>
        </div>
        <div className="fg__visual">
          <Visual />
        </div>
      </article>
    </Reveal>
  );
}

export function FeatureGrid() {
  return (
    <section className="fg section section--tint" id="features">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">
              <span className="eyebrow__dot">
                <Sparkles size={11} strokeWidth={2.6} />
              </span>
              Capabilities
            </span>
            <h2>Everything recurring revenue needs, in one console</h2>
            <p>
              Nine building blocks that replace the billing suite, the dunning cron jobs, the tax
              spreadsheet and the revenue report nobody trusts.
            </p>
          </div>
        </Reveal>

        <ul className="fg__grid">
          {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} delay={(i % 3) * 70} />
          ))}
        </ul>
      </div>
    </section>
  );
}
