import { Donut, Sparkline } from './Charts';
import { Coffee, PackageCheck, RefreshCw, ShieldCheck, Snowflake, Zap, Globe, Braces } from 'lucide-react';
import './FeatureVisuals.css';

/* ==========================================================================
   Miniature product-UI visuals used inside the bento feature grid.
   Each one is a small, self-contained slice of real-looking software.
   ========================================================================== */

/** Composable plan builder — stacked plan rows with modifiers. */
export function PlansVisual() {
  const rows = [
    { name: 'Coffee Club', price: '$24.00', meta: 'Monthly · 4-week cadence', tag: 'Prepaid' },
    { name: 'Pro Membership', price: '$89.00', meta: 'Annual · 2 month free', tag: 'Trial 14d' },
    { name: 'Studio Seats', price: '$0.04', meta: 'Per seat · metered', tag: 'Usage' },
  ];
  return (
    <div className="fv fv--plans">
      <div className="fv__bar">
        <span className="fv__barTitle">Catalogue</span>
        <span className="fv__pill">
          <PackageCheck size={11} strokeWidth={2.6} /> 3 plan versions
        </span>
      </div>
      <div className="fv__list">
        {rows.map((r) => (
          <div key={r.name} className="fv__plan">
            <span className="fv__planName">{r.name}</span>
            <span className="fv__planMeta">{r.meta}</span>
            <span className="fv__planPrice">{r.price}</span>
            <span className="fv__tag">{r.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Dunning / recovery flow with retry ladder. */
export function DunningVisual() {
  return (
    <div className="fv fv--dunning">
      <div className="fv__bar">
        <span className="fv__barTitle">Recovery case</span>
        <span className="fv__pill fv__pill--amber">
          <RefreshCw size={11} strokeWidth={2.6} /> Retry 2 of 5
        </span>
      </div>
      <div className="fv__steps">
        {['Network token retry', 'Card account updater', 'Adaptive retry · day 6', 'Hosted update link'].map(
          (s, i) => (
            <div key={s} className={`fv__step ${i < 2 ? 'is-done' : i === 2 ? 'is-live' : ''}`}>
              <span className="fv__stepDot" />
              <span className="fv__stepLabel">{s}</span>
              <span className="fv__stepState">{i < 2 ? 'Passed' : i === 2 ? 'Running' : 'Queued'}</span>
            </div>
          ),
        )}
      </div>
      <div className="fv__recovered">
        <Donut value={87} size={62} stroke={7}>
          <span className="fv__donutNum">87%</span>
        </Donut>
        <div>
          <strong>1,284 recovered</strong>
          <small>this settlement window</small>
        </div>
      </div>
    </div>
  );
}

/** Revenue analytics with sparkline + cohort legend. */
export function AnalyticsVisual() {
  return (
    <div className="fv fv--analytics">
      <div className="fv__bar">
        <span className="fv__barTitle">Cohort retention</span>
        <span className="fv__pill">M6</span>
      </div>
      <div className="fv__sparkWrap">
        <div className="fv__spark">
          <strong>94.2%</strong>
          <small>gross retention</small>
        </div>
        <Sparkline values={[52, 60, 58, 71, 76, 74, 85, 92]} color="#4f56ff" width={104} height={34} />
      </div>
      <div className="fv__cohorts">
        {[
          ['Jan', 92],
          ['Feb', 88],
          ['Mar', 95],
        ].map(([m, v]) => (
          <div key={m as string} className="fv__cohort">
            <span>{m}</span>
            <span className="fv__cohortBar">
              <i style={{ width: `${v}%` }} />
            </span>
            <span className="fv__cohortVal">{v}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Checkout visual — local methods, wallet, address. */
export function CheckoutVisual() {
  return (
    <div className="fv fv--checkout">
      <div className="fv__bar">
        <span className="fv__barTitle">Checkout</span>
        <span className="fv__pill">
          <Zap size={11} strokeWidth={2.6} /> 38ms
        </span>
      </div>
      <div className="fv__methods">
        <span className="fv__method is-active">Card</span>
        <span className="fv__method">Apple Pay</span>
        <span className="fv__method">iDEAL</span>
        <span className="fv__method">SEPA</span>
      </div>
      <div className="fv__field">
        <span className="fv__fieldLabel">Card number</span>
        <span className="fv__fieldValue">•••• •••• •••• 4242</span>
      </div>
      <div className="fv__payBtn">Pay $89.00</div>
      <div className="fv__secure">
        <ShieldCheck size={12} strokeWidth={2.4} /> PCI DSS Level 1 · 3-D Secure
      </div>
    </div>
  );
}

/** Double-entry ledger with debit/credit postings. */
export function LedgerVisual() {
  const postings = [
    ['Cash / Stripe', 'Debit', '$24.00'],
    ['Deferred revenue', 'Credit', '$24.00'],
    ['Tax payable (NL)', 'Credit', '$4.32'],
    ['Revenue recognised', 'Credit', '$19.68'],
  ];
  return (
    <div className="fv fv--ledger">
      <div className="fv__ledgerHead">
        <span>Entry #SR-90142</span>
        <span className="fv__pill fv__pill--mint">Balanced</span>
      </div>
      <table className="fv__table">
        <tbody>
          {postings.map(([acct, side, amt]) => (
            <tr key={acct}>
              <td>{acct}</td>
              <td className={`fv__side fv__side--${side.toLowerCase()}`}>{side}</td>
              <td className="fv__amt">{amt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Customer portal actions. */
export function PortalVisual() {
  return (
    <div className="fv fv--portal">
      <div className="fv__bar">
        <span className="fv__barTitle">My subscription</span>
        <span className="fv__pill">Pro · monthly</span>
      </div>
      <div className="fv__portalActions">
        <button type="button" className="fv__action">
          <RefreshCw size={14} strokeWidth={2.2} /> Change plan
        </button>
        <button type="button" className="fv__action">
          <Snowflake size={14} strokeWidth={2.2} /> Pause for 2 months
        </button>
        <button type="button" className="fv__action">
          <PackageCheck size={14} strokeWidth={2.2} /> Update payment method
        </button>
      </div>
      <div className="fv__portalFoot">Next renewal · 14 Sept · $89.00</div>
    </div>
  );
}

/** Typed API / webhook code block. */
export function ApiVisual() {
  return (
    <div className="fv fv--api">
      <div className="fv__codeHead">
        <Braces size={12} strokeWidth={2.4} />
        <span>POST /v1/subscriptions</span>
      </div>
      <pre className="fv__code">
        <code>{`{
  "customer": "cus_9f2",
  "plan": "pro_monthly",
  "trial_days": 14,
  "tax": { "auto": true },
  "dunning": { "preset": "adaptive" }
}`}</code>
      </pre>
      <div className="fv__codeFoot">
        <span className="fv__http">201 Created</span>
        <span>signed webhook delivered</span>
      </div>
    </div>
  );
}

/** Global tax map-ish visual. */
export function TaxVisual() {
  return (
    <div className="fv fv--tax">
      <div className="fv__bar">
        <span className="fv__barTitle">
          <Globe size={15} strokeWidth={2.2} /> Tax engine
        </span>
        <span className="fv__pill fv__pill--mint">40+ regions</span>
      </div>
      <div className="fv__regions">
        {[
          ['Netherlands', '21% VAT'],
          ['United States', 'Nexus-aware'],
          ['Australia', '10% GST'],
          ['Japan', '10% CT'],
        ].map(([c, r]) => (
          <div key={c} className="fv__region">
            <span>{c}</span>
            <span className="fv__regionRate">{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Lifecycle segments with trigger chips. */
export function SegmentsVisual() {
  return (
    <div className="fv fv--segments">
      <div className="fv__bar">
        <span className="fv__barTitle">
          <Coffee size={15} strokeWidth={2.2} /> Segments
        </span>
        <span className="fv__pill">2 active flows</span>
      </div>
      <div className="fv__chips">
        {['Renewal failed 2×', 'Paused > 60d', 'Seats ≥ 90%', 'Trial ending'].map((c) => (
          <span key={c} className="fv__chip">
            {c}
          </span>
        ))}
      </div>
      <div className="fv__flow">
        <span className="fv__flowNode">Trigger</span>
        <span className="fv__flowLine" />
        <span className="fv__flowNode fv__flowNode--accent">Save offer</span>
        <span className="fv__flowLine" />
        <span className="fv__flowNode">Win-back email</span>
      </div>
    </div>
  );
}

export const featureVisuals = {
  plans: PlansVisual,
  dunning: DunningVisual,
  analytics: AnalyticsVisual,
  checkout: CheckoutVisual,
  ledger: LedgerVisual,
  portal: PortalVisual,
  api: ApiVisual,
  tax: TaxVisual,
  segments: SegmentsVisual,
} as const;
