import { ArrowRight, CalendarDays, Sparkles } from 'lucide-react';
import { BillingConsole } from '../visuals/Dashboard';
import { SubscriptionRow } from '../visuals/Dashboard';
import { heroStats } from '../../data/stats';
import { site } from '../../data/site';
import { useReveal } from '../../hooks/useReveal';
import { useCountUp } from '../../hooks/useCountUp';
import './Hero.css';

function StatCard({ stat, active }: { stat: (typeof heroStats)[number]; active: boolean }) {
  const value = useCountUp({
    to: stat.value,
    decimals: stat.decimals ?? 0,
    active,
  });

  return (
    <div className="hero__stat">
      <span className="hero__statValue">
        {stat.prefix}
        {value.toFixed(stat.decimals ?? 0)}
        {stat.suffix}
      </span>
      <span className="hero__statLabel">{stat.label}</span>
      <span className="hero__statDetail">{stat.detail}</span>
    </div>
  );
}

export function Hero() {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero__backdrop" aria-hidden="true">
        <span className="hero__orb hero__orb--a" />
        <span className="hero__orb hero__orb--b" />
        <span className="hero__grid" />
      </div>

      <div className="container hero__inner">
        <div className={`hero__copy ${visible ? 'is-visible' : ''}`}>
          <span className="eyebrow hero__eyebrow">
            <span className="eyebrow__dot">
              <Sparkles size={11} strokeWidth={2.6} />
            </span>
            {site.name} Billing Core · v4 now live
          </span>

          <h1 className="hero__title">
            Stop losing revenue
            <br />
            to <span className="grad-text">failed renewals</span>
          </h1>

          <p className="hero__lead lead">
            {site.name} is the subscription revenue platform that owns your plan logic, renewal
            recovery, tax and ledger — so commerce and product teams can grow recurring revenue
            without maintaining billing infrastructure.
          </p>

          <div className="btn-row hero__actions">
            <a className="btn btn--brand btn--lg" href="#pricing">
              Start 14-day trial
              <span className="btn__icon">
                <ArrowRight size={15} strokeWidth={2.6} />
              </span>
            </a>
            <a className="btn btn--outline btn--lg" href={site.demoUrl}>
              <CalendarDays size={17} strokeWidth={2.2} />
              Book a demo
            </a>
          </div>

          <p className="hero__note">
            No card required · Sandbox free forever · Live in one working day
          </p>
        </div>

        <div className={`hero__stage ${visible ? 'is-visible' : ''}`}>
          <div className="hero__consoleWrap">
            <BillingConsole />
          </div>

          <div className="hero__float hero__float--recovery" aria-hidden="true">
            <span className="hero__floatDot hero__floatDot--mint" />
            <div>
              <strong>Payment recovered</strong>
              <small>Network token retry · $89.00</small>
            </div>
          </div>

          <div className="hero__float hero__float--subscribers" aria-hidden="true">
            <div className="hero__floatStack">
              <span className="hero__floatAvatar" style={{ background: '#4f56ff' }}>
                MF
              </span>
              <span className="hero__floatAvatar" style={{ background: '#35cde8' }}>
                DO
              </span>
              <span className="hero__floatAvatar" style={{ background: '#7a4df0' }}>
                PR
              </span>
            </div>
            <div>
              <strong>+1,284</strong>
              <small>renewals recovered this month</small>
            </div>
          </div>

          <div className="hero__float hero__float--row" aria-hidden="true">
            <SubscriptionRow
              name="Ines Bakker"
              plan="Pro · annual"
              amount="$89.00"
              status="Active"
              initials="IB"
              hue="indigo"
            />
            <SubscriptionRow
              name="Tomas Kraus"
              plan="Studio · metered"
              amount="$412.60"
              status="Retrying"
              initials="TK"
              hue="amber"
            />
          </div>
        </div>

        <div className={`hero__stats ${visible ? 'is-visible' : ''}`}>
          {heroStats.map((stat) => (
            <StatCard key={stat.id} stat={stat} active={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
