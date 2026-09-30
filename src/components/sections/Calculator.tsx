import { useMemo, useState } from 'react';
import { ArrowUpRight, Calculator as CalculatorIcon, Info } from 'lucide-react';
import { Donut, LineChart } from '../visuals/Charts';
import { Reveal } from '../ui/Reveal';
import './Calculator.css';

const currency = (n: number, decimals = 0) =>
  n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });

const SLIDERS = [
  {
    id: 'mrr',
    label: 'Current monthly recurring revenue',
    min: 5000,
    max: 500000,
    step: 5000,
    format: (v: number) => currency(v),
    hint: 'Recurring revenue billed every month',
  },
  {
    id: 'subscribers',
    label: 'Active subscribers',
    min: 100,
    max: 50000,
    step: 100,
    format: (v: number) => v.toLocaleString('en-US'),
    hint: 'Paying accounts on a recurring plan',
  },
  {
    id: 'failure',
    label: 'Renewals failing today',
    min: 2,
    max: 20,
    step: 1,
    format: (v: number) => `${v}%`,
    hint: 'Involuntary failures from expired or blocked cards',
  },
] as const;

/** Recovery assumptions modelled on Sublayer customer medians. */
const RECOVERY_LIFT = 0.41; // share of currently-failing revenue we recover
const EXPANSION_LIFT = 0.18; // net revenue retention improvement
const PLATFORM_RATE = 0.006; // volume fee on recovered renewals

export function Calculator() {
  const [mrr, setMrr] = useState(120000);
  const [subscribers, setSubscribers] = useState(4200);
  const [failure, setFailure] = useState(9);
  const [months, setMonths] = useState(12);

  const values: Record<string, number> = { mrr, subscribers, failure };
  const setters: Record<string, (v: number) => void> = {
    mrr: setMrr,
    subscribers: setSubscribers,
    failure: setFailure,
  };

  const result = useMemo(() => {
    const failureRate = failure / 100;
    const monthlyAtRisk = mrr * failureRate;
    const recoveredMonthly = monthlyAtRisk * RECOVERY_LIFT;
    const expansionMonthly = mrr * EXPANSION_LIFT * 0.25;

    const recoveredOverTerm = recoveredMonthly * months;
    const expansionOverTerm = expansionMonthly * months;
    const platformFee = recoveredOverTerm * PLATFORM_RATE;
    const netGain = recoveredOverTerm + expansionOverTerm - platformFee;

    // Projected MRR path with vs without the platform.
    const withPlatform: number[] = [];
    const without: number[] = [];
    for (let i = 0; i <= months; i += 1) {
      const baseline = mrr * Math.pow(1.012, i);
      without.push(baseline);
      withPlatform.push(baseline + recoveredMonthly * i * 1.04 + expansionMonthly * i * 0.5);
    }

    const recovering = Math.round((subscribers * failureRate * RECOVERY_LIFT) / 1) * 1;
    const recoveryRate = Math.round((1 - failureRate + failureRate * RECOVERY_LIFT) * 1000) / 10;

    return {
      monthlyAtRisk,
      recoveredMonthly,
      recoveredOverTerm,
      expansionOverTerm,
      platformFee,
      netGain,
      withPlatform,
      without,
      recovering,
      recoveryRate,
      roi: platformFee > 0 ? netGain / platformFee : 0,
    };
  }, [mrr, subscribers, failure, months]);

  return (
    <section className="calc section" id="calculator">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">
              <span className="eyebrow__dot">
                <CalculatorIcon size={11} strokeWidth={2.6} />
              </span>
              Revenue calculator
            </span>
            <h2>See what failed renewals are costing you</h2>
            <p>
              Adjust the inputs to your business. We apply recovery and expansion rates observed
              across {`3,100`} merchants running on {`Sublayer`} — no sales call required.
            </p>
          </div>
        </Reveal>

        <Reveal variant="scale">
          <div className="calc__shell">
            {/* ---- Controls ---- */}
            <div className="calc__controls">
              <h3 className="calc__panelTitle">Your business today</h3>

              <div className="calc__sliders">
                {SLIDERS.map((s) => {
                  const val = values[s.id];
                  const pct = ((val - s.min) / (s.max - s.min)) * 100;
                  return (
                    <div className="calc__field" key={s.id}>
                      <div className="calc__fieldTop">
                        <label htmlFor={`slider-${s.id}`}>{s.label}</label>
                        <output htmlFor={`slider-${s.id}`} className="calc__value">
                          {s.format(val)}
                        </output>
                      </div>
                      <input
                        id={`slider-${s.id}`}
                        className="calc__range"
                        type="range"
                        min={s.min}
                        max={s.max}
                        step={s.step}
                        value={val}
                        aria-describedby={`hint-${s.id}`}
                        onChange={(e) => setters[s.id](Number(e.target.value))}
                        style={{ '--pct': `${pct}%` } as React.CSSProperties}
                      />
                      <p id={`hint-${s.id}`} className="calc__hint">
                        {s.hint}
                      </p>
                    </div>
                  );
                })}

                <div className="calc__field">
                  <div className="calc__fieldTop">
                    <label htmlFor="slider-months">Forecast horizon</label>
                    <output htmlFor="slider-months" className="calc__value">
                      {months} months
                    </output>
                  </div>
                  <input
                    id="slider-months"
                    className="calc__range"
                    type="range"
                    min={3}
                    max={36}
                    step={3}
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    style={{ '--pct': `${((months - 3) / 33) * 100}%` } as React.CSSProperties}
                  />
                </div>
              </div>

              <p className="calc__disclaimer">
                <Info size={13} strokeWidth={2.4} />
                Modelled on median outcomes. Actual results vary with issuer mix and plan type.
              </p>
            </div>

            {/* ---- Results ---- */}
            <div className="calc__results" aria-live="polite">
              <div className="calc__hero">
                <div>
                  <span className="calc__heroLabel">
                    Recoverable in {months} months
                  </span>
                  <strong className="calc__heroValue">{currency(result.netGain)}</strong>
                  <span className="calc__heroSub">
                    net of {currency(result.platformFee)} platform fees
                  </span>
                </div>
                <Donut value={Math.min(result.roi * 12, 100)} size={92} stroke={9}>
                  <span className="calc__donutNum">{result.roi.toFixed(1)}×</span>
                  <span className="calc__donutLabel">ROI</span>
                </Donut>
              </div>

              <div className="calc__metrics">
                <div className="calc__metric">
                  <span className="calc__metricLabel">Revenue at risk / month</span>
                  <strong>{currency(result.monthlyAtRisk)}</strong>
                </div>
                <div className="calc__metric">
                  <span className="calc__metricLabel">Recovered / month</span>
                  <strong className="calc__metricPos">{currency(result.recoveredMonthly)}</strong>
                </div>
                <div className="calc__metric">
                  <span className="calc__metricLabel">Subscribers saved</span>
                  <strong className="calc__metricPos">
                    {result.recovering.toLocaleString('en-US')}
                  </strong>
                </div>
                <div className="calc__metric">
                  <span className="calc__metricLabel">Effective recovery rate</span>
                  <strong>{result.recoveryRate}%</strong>
                </div>
              </div>

              <div className="calc__chart">
                <div className="calc__chartHead">
                  <span>Projected MRR · {months} months</span>
                  <span className="calc__legend">
                    <i style={{ background: '#4f56ff' }} /> With {`Sublayer`}
                    <i style={{ background: '#b3b3bf' }} /> Current trajectory
                  </span>
                </div>
                <div className="calc__chartBody">
                  <LineChart
                    series={[
                      { id: 'with', color: '#4f56ff', values: result.withPlatform },
                      { id: 'without', color: '#b3b3bf', values: result.without },
                    ]}
                    height={176}
                    label="Projected MRR with and without Sublayer"
                  />
                </div>
              </div>

              <a className="calc__cta" href="#pricing">
                Start recovering this revenue
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
