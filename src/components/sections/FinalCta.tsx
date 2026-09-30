import { useState } from 'react';
import { ArrowRight, CalendarDays, Rocket } from 'lucide-react';
import { site } from '../../data/site';
import { Reveal } from '../ui/Reveal';
import { DemoModal } from '../ui/DemoModal';
import { LineChart } from '../visuals/Charts';
import './FinalCta.css';

export function FinalCta() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section className="cta section" id="cta">
      <div className="container">
        <Reveal variant="scale">
          <div className="cta__panel">
            <div className="cta__glow" aria-hidden="true" />

            <div className="cta__copy">
              <span className="eyebrow cta__eyebrow">
                <span className="eyebrow__dot">
                  <Rocket size={11} strokeWidth={2.6} />
                </span>
                Launch in one working day
              </span>
              <h2 className="cta__title">
                Recover the revenue you are already
                <br />
                earning
              </h2>
              <p className="cta__lead">
                Start a 14-day trial with full feature access and a free sandbox forever. Or bring
                your current MRR numbers to a 30-minute working session and leave with a recovery
                model for your business.
              </p>

              <div className="btn-row cta__actions">
                <a className="btn btn--inverse btn--lg" href="#pricing">
                  Start 14-day trial
                  <span className="btn__icon">
                    <ArrowRight size={15} strokeWidth={2.6} />
                  </span>
                </a>
                <button
                  type="button"
                  className="btn btn--inverse-outline btn--lg"
                  onClick={() => setDemoOpen(true)}
                >
                  <CalendarDays size={17} strokeWidth={2.2} />
                  Book a working session
                </button>
              </div>

              <p className="cta__foot">
                No card required · Export everything · Cancel any time
              </p>
            </div>

            <div className="cta__visual" aria-hidden="true">
              <div className="cta__card">
                <div className="cta__cardHead">
                  <span>Recovery projection</span>
                  <span className="cta__cardTag">+41%</span>
                </div>
                <div className="cta__chart">
                  <LineChart
                    series={[{ id: 'rec', color: '#7fdef2', values: [18, 24, 21, 33, 38, 47, 55, 68, 79, 94] }]}
                    height={140}
                    label="Recovery projection"
                  />
                </div>
                <div className="cta__cardFoot">
                  <span>
                    <strong>1,284</strong> renewals recovered
                  </span>
                  <span>
                    <strong>$184k</strong> retained
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} email={site.salesEmail} />
    </section>
  );
}
