import { Target } from 'lucide-react';
import { outcomes, type Outcome } from '../../data/stats';
import { Reveal } from '../ui/Reveal';
import { LineChart, BarChart, Donut, Sparkline } from '../visuals/Charts';
import './Outcomes.css';

function OutcomeVisual({ visual }: { visual: Outcome['visual'] }) {
  if (visual === 'retention') {
    return (
      <div className="oc__viz">
        <div className="oc__vizHead">
          <span>Net revenue retention</span>
          <span className="oc__vizTag">+18%</span>
        </div>
        <div className="oc__vizChart">
          <LineChart
            series={[
              { id: 'nrr', color: '#4f56ff', values: [100, 104, 103, 109, 114, 112, 120, 127] },
            ]}
            height={120}
            label="Net revenue retention trend"
          />
        </div>
      </div>
    );
  }
  if (visual === 'mrr') {
    return (
      <div className="oc__viz">
        <div className="oc__vizHead">
          <span>Expansion per account</span>
          <span className="oc__vizTag">2.4×</span>
        </div>
        <BarChart
          values={[20, 28, 34, 41, 55, 62, 74, 88]}
          color="#7a4df0"
          height={110}
          label="Expansion revenue bars"
        />
      </div>
    );
  }
  if (visual === 'recovery') {
    return (
      <div className="oc__viz oc__viz--donut">
        <Donut value={72} size={112} stroke={10} color="#12b8d6">
          <span className="oc__donutBig">11d</span>
          <span className="oc__donutSmall">faster</span>
        </Donut>
        <div className="oc__donutMeta">
          <span>Time to reconciled revenue</span>
          <Sparkline values={[22, 19, 17, 14, 12, 11]} color="#12b8d6" width={110} height={30} />
        </div>
      </div>
    );
  }
  return (
    <div className="oc__viz">
      <div className="oc__vizHead">
        <span>Engineering hours reclaimed</span>
        <span className="oc__vizTag">6.5 hrs</span>
      </div>
      <div className="oc__sprints">
        {['Proration', 'Retry logic', 'Tax rules', 'Reconciliation', 'Pricing changes'].map((t) => (
          <span key={t} className="oc__sprint">
            <span className="oc__sprintDot" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Outcomes() {
  return (
    <section className="oc section" id="outcomes">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">
              <span className="eyebrow__dot">
                <Target size={11} strokeWidth={2.6} />
              </span>
              Outcomes
            </span>
            <h2>Measurable change, not platform theatre</h2>
            <p>
              These are the numbers customers report after moving recurring revenue onto
              {` Sublayer`} — measured against their own baselines over the first two quarters.
            </p>
          </div>
        </Reveal>

        <ul className="oc__grid">
          {outcomes.map((o, i) => (
            <Reveal as="li" key={o.id} delay={(i % 2) * 80} className="oc__card">
              <div className="oc__metric">
                <span className="oc__metricValue">{o.metric}</span>
                <span className="oc__metricLabel">{o.metricLabel}</span>
              </div>
              <h3 className="oc__title">{o.title}</h3>
              <p className="oc__desc">{o.description}</p>
              <OutcomeVisual visual={o.visual} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
