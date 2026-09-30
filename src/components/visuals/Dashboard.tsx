import { LineChart, BarChart } from './Charts';
import { ArrowUpRight, Bolt, Check } from 'lucide-react';
import './Dashboard.css';

/**
 * Sublayer console mockup — the primary product visual.
 * Built entirely from real DOM/SVG so it stays sharp at any scale
 * and reflows on small screens.
 */
export function BillingConsole({ compact = false }: { compact?: boolean }) {
  const mrrSeries = [42, 48, 45, 54, 61, 58, 69, 76, 82, 79, 91, 104];
  const churnSeries = [34, 31, 33, 28, 26, 27, 22, 21, 18, 19, 15, 13];
  const volume = [38, 52, 44, 61, 47, 72, 58, 81, 66, 94, 74, 88];

  return (
    <div className={`console ${compact ? 'console--compact' : ''}`.trim()}>
      <div className="console__chrome">
        <span className="console__dot" style={{ background: '#ff5f57' }} />
        <span className="console__dot" style={{ background: '#febc2e' }} />
        <span className="console__dot" style={{ background: '#28c840' }} />
        <span className="console__url">app.sublayer.io/revenue</span>
      </div>

      <div className="console__body">
        <aside className="console__rail" aria-hidden="true">
          <span className="console__railmark" />
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={`console__railitem ${i === 0 ? 'is-active' : ''}`} />
          ))}
        </aside>

        <div className="console__main">
          <header className="console__head">
            <div>
              <p className="console__eyebrow">Revenue overview</p>
              <div className="console__mrr">
                <span>$412,880</span>
                <span className="console__delta">
                  <ArrowUpRight size={12} strokeWidth={2.6} />
                  12.4%
                </span>
              </div>
            </div>
            <div className="console__range" aria-hidden="true">
              <span>30D</span>
              <span className="is-active">90D</span>
              <span>YTD</span>
            </div>
          </header>

          <div className="console__grid">
            <div className="console__card console__card--span">
              <div className="console__cardhead">
                <span>Net MRR movement</span>
                <span className="console__legend">
                  <i style={{ background: 'var(--brand-500)' }} /> New
                  <i style={{ background: 'var(--cyan-500)' }} /> Recovered
                </span>
              </div>
              <div className="console__chart">
                <LineChart
                  series={[
                    { id: 'mrr', color: '#4f56ff', values: mrrSeries },
                    { id: 'churn', color: '#35cde8', values: churnSeries },
                  ]}
                  height={168}
                  label="Net MRR movement over the last twelve periods"
                />
              </div>
            </div>

            <div className="console__card console__card--kpi">
              <span className="console__kpiLabel">Recovery rate</span>
              <strong className="console__kpiValue">87.3%</strong>
              <span className="console__kpibar">
                <i style={{ width: '87%' }} />
              </span>
              <span className="console__kpiFoot">
                <Check size={12} strokeWidth={3} /> 1,284 renewals recovered
              </span>
            </div>

            <div className="console__card console__card--kpi">
              <span className="console__kpiLabel">Involuntary churn</span>
              <strong className="console__kpiValue">1.8%</strong>
              <span className="console__kpibar console__kpibar--cyan">
                <i style={{ width: '26%' }} />
              </span>
              <span className="console__kpiFoot">Down 4.3pp since migration</span>
            </div>

            {!compact && (
              <div className="console__card console__card--span console__card--vol">
                <div className="console__cardhead">
                  <span>Renewal volume</span>
                  <span className="console__badge">
                    <Bolt size={11} strokeWidth={2.6} /> Auto-retry on
                  </span>
                </div>
                <div className="console__bars">
                  <BarChart values={volume} height={92} label="Renewal volume by period" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Small self-contained subscription row used inside feature cards. */
export function SubscriptionRow({
  name,
  plan,
  amount,
  status,
  initials,
  hue = 'indigo',
}: {
  name: string;
  plan: string;
  amount: string;
  status: 'Active' | 'Retrying' | 'Paused';
  initials: string;
  hue?: string;
}) {
  return (
    <div className="subrow">
      <span className={`subrow__avatar subrow__avatar--${hue}`}>{initials}</span>
      <span className="subrow__meta">
        <strong>{name}</strong>
        <small>{plan}</small>
      </span>
      <span className="subrow__amount">
        {amount}
        <small className={`subrow__status subrow__status--${status.toLowerCase()}`}>{status}</small>
      </span>
    </div>
  );
}
