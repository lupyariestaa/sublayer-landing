import { ArrowRight, Layers, RefreshCw, ReceiptText, LineChart } from 'lucide-react';
import { BillingConsole } from '../visuals/Dashboard';
import { Reveal } from '../ui/Reveal';
import './ProductValue.css';

const pillars = [
  {
    Icon: Layers,
    title: 'One plan model',
    body: 'Prepaid, pause, metered and seat-based plans built from the same primitive.',
  },
  {
    Icon: RefreshCw,
    title: 'Recovery built in',
    body: 'Adaptive retries and card updater recover revenue without manual chasing.',
  },
  {
    Icon: ReceiptText,
    title: 'Ledger & tax',
    body: 'Every event posts a balanced entry with tax lines your finance team reconciles.',
  },
  {
    Icon: LineChart,
    title: 'Defensible numbers',
    body: 'MRR movement, cohorts and LTV land in one warehouse-ready export.',
  },
];

export function ProductValue() {
  return (
    <section className="pv section" id="product">
      <div className="container">
        <div className="pv__head">
          <Reveal>
            <div className="section-head section-head--left pv__headText">
              <span className="eyebrow">
                <span className="eyebrow__dot">
                  <Layers size={11} strokeWidth={2.6} />
                </span>
                The platform
              </span>
              <h2>
                One revenue layer between
                <br />
                your product and <span className="grad-text">four processors</span>
              </h2>
              <p>
                Most teams stitch together a store app, a billing suite, a tax tool and a
                spreadsheet. {`Sublayer`} replaces that stack with a single subscription API that
                owns plan logic, renewal scheduling, recovery, tax and reporting end to end.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ul className="pv__pillars">
              {pillars.map(({ Icon, title, body }) => (
                <li key={title} className="pv__pillar">
                  <span className="pv__pillarIcon">
                    <Icon size={17} strokeWidth={2.2} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={120}>
          <div className="pv__stage">
            <BillingConsole />
            <a className="pv__link" href="#features">
              See every capability
              <ArrowRight size={15} strokeWidth={2.4} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
