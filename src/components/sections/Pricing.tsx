import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { plans, pricingIncludes } from '../../data/pricing';
import { Reveal } from '../ui/Reveal';
import './Pricing.css';

type Cycle = 'monthly' | 'yearly';

export function Pricing() {
  const [cycle, setCycle] = useState<Cycle>('monthly');

  return (
    <section className="pricing section" id="pricing">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">
              <span className="eyebrow__dot">
                <Sparkles size={11} strokeWidth={2.6} />
              </span>
              Pricing
            </span>
            <h2>Priced against the revenue it protects</h2>
            <p>
              A flat platform fee based on your MRR band, plus volume processing on renewals. No
              implementation fee, no seat charges, no lock-in.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="pricing__toggleWrap">
            <div className="pricing__toggle" role="group" aria-label="Billing period">
              <button
                type="button"
                className={`pricing__toggleBtn ${cycle === 'monthly' ? 'is-active' : ''}`}
                aria-pressed={cycle === 'monthly'}
                onClick={() => setCycle('monthly')}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`pricing__toggleBtn ${cycle === 'yearly' ? 'is-active' : ''}`}
                aria-pressed={cycle === 'yearly'}
                onClick={() => setCycle('yearly')}
              >
                Yearly
                <span className="pricing__save">Save 20%</span>
              </button>
            </div>
            <p className="pricing__toggleNote" aria-live="polite">
              {cycle === 'yearly'
                ? 'Billed annually · two months free'
                : 'Billed monthly · cancel any time'}
            </p>
          </div>
        </Reveal>

        <ul className="pricing__grid">
          {plans.map((plan, i) => {
            const isCustom = plan.monthly === 0;
            const price = cycle === 'monthly' ? plan.monthly : plan.yearly;

            return (
              <Reveal
                as="li"
                key={plan.id}
                delay={i * 70}
                className={`pricing__card ${plan.featured ? 'is-featured' : ''}`}
              >
                {plan.featured && <span className="pricing__ribbon">Most popular</span>}

                <div className="pricing__cardTop">
                  <h3 className="pricing__name">{plan.name}</h3>
                  <p className="pricing__blurb">{plan.blurb}</p>
                </div>

                <div className="pricing__priceBlock">
                  {isCustom ? (
                    <span className="pricing__custom">Custom</span>
                  ) : (
                    <span className="pricing__price">
                      <span className="pricing__currency">$</span>
                      <span className="pricing__amount">{price.toLocaleString('en-US')}</span>
                      <span className="pricing__period">/mo</span>
                    </span>
                  )}
                  <span className="pricing__qualifier">{plan.qualifier}</span>
                </div>

                <a
                  href="#top"
                  className={`btn btn--full ${
                    plan.featured ? 'btn--inverse' : 'btn--outline'
                  }`}
                  aria-label={`${plan.cta} — ${plan.name} plan`}
                >
                  {plan.cta}
                </a>

                <ul className="pricing__features">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <Check
                        size={15}
                        strokeWidth={2.8}
                        aria-hidden="true"
                        className="pricing__check"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={120}>
          <ul className="pricing__includes">
            {pricingIncludes.map((item) => (
              <li key={item}>
                <Check size={14} strokeWidth={3} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <p className="pricing__footNote">
          Prices in USD, excluding tax. Yearly plans are billed for twelve months upfront at the
          discounted rate. Volume processing is charged monthly in arrears.
        </p>
      </div>
    </section>
  );
}
