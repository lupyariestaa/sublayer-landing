import { Cable, SlidersHorizontal, RefreshCcw, TrendingUp } from 'lucide-react';
import { steps } from '../../data/steps';
import { Reveal } from '../ui/Reveal';
import { Donut, BarChart } from '../visuals/Charts';
import './HowItWorks.css';

const stepIcons = [Cable, SlidersHorizontal, RefreshCcw, TrendingUp];

/** Small per-step illustration so every card carries its own character. */
function StepVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="hiw__viz hiw__viz--connect" aria-hidden="true">
        <div className="hiw__node">
          <span className="hiw__nodeDot" /> Storefront
        </div>
        <span className="hiw__wire" />
        <div className="hiw__node hiw__node--brand">
          <span className="hiw__nodeDot hiw__nodeDot--brand" /> Sublayer
        </div>
        <span className="hiw__wire" />
        <div className="hiw__node">
          <span className="hiw__nodeDot" /> Stripe
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="hiw__viz hiw__viz--model" aria-hidden="true">
        <div className="hiw__planRow">
          <span>Prepaid box</span>
          <span className="hiw__chip">4-week</span>
        </div>
        <div className="hiw__planRow">
          <span>Pause anytime</span>
          <span className="hiw__chip">30d</span>
        </div>
        <div className="hiw__planRow">
          <span>Metered seats</span>
          <span className="hiw__chip">$0.04</span>
        </div>
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="hiw__viz hiw__viz--recover" aria-hidden="true">
        <Donut value={87} size={70} stroke={8}>
          <span className="hiw__donut">87%</span>
        </Donut>
        <div className="hiw__recoverMeta">
          <strong>1,284</strong>
          <small>renewals recovered</small>
          <span className="hiw__recoverBar">
            <i style={{ width: '87%' }} />
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="hiw__viz hiw__viz--forecast" aria-hidden="true">
      <div className="hiw__forecastHead">
        <span>MRR forecast</span>
        <span className="hiw__chip hiw__chip--brand">+12.4%</span>
      </div>
      <BarChart
        values={[38, 46, 42, 55, 51, 63, 68, 74, 81, 88]}
        color="#4f56ff"
        height={56}
        label="Forecast MRR bars"
      />
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="hiw section" id="how-it-works">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">
              <span className="eyebrow__dot">
                <Cable size={11} strokeWidth={2.6} />
              </span>
              Implementation
            </span>
            <h2>From existing stack to live in four moves</h2>
            <p>
              No rip-and-replace migration. Connect what you already run, model the plans you want
              to sell, then let the platform handle recovery and reporting in the background.
            </p>
          </div>
        </Reveal>

        <ol className="hiw__list">
          {steps.map((step, i) => {
            const Icon = stepIcons[i] ?? Cable;
            return (
              <Reveal as="li" key={step.id} delay={i * 90} className="hiw__item">
                <div className="hiw__card">
                  <div className="hiw__cardHead">
                    <span className="hiw__index">{step.index}</span>
                    <span className="hiw__icon">
                      <Icon size={18} strokeWidth={2.2} />
                    </span>
                  </div>
                  <p className="hiw__eyebrow">{step.eyebrow}</p>
                  <h3 className="hiw__title">{step.title}</h3>
                  <p className="hiw__body">{step.description}</p>
                </div>
                <StepVisual index={i} />
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
