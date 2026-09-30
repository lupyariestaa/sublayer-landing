import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import './NewsletterForm.css';

/**
 * Footer newsletter capture. Validates the address and shows an inline
 * confirmation state — a real interaction rather than a dead input.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'done'>('idle');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!valid) {
      setState('error');
      return;
    }
    setState('done');
  };

  if (state === 'done') {
    return (
      <p className="newsletter__done" role="status">
        <Check size={15} strokeWidth={3} />
        Subscribed. Churn benchmarks land in your inbox monthly.
      </p>
    );
  }

  return (
    <form className="newsletter" onSubmit={onSubmit} noValidate>
      <label className="newsletter__label" htmlFor="newsletter-email">
        Monthly churn &amp; retention benchmark report
      </label>
      <div className={`newsletter__row ${state === 'error' ? 'has-error' : ''}`}>
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          aria-invalid={state === 'error'}
          aria-describedby={state === 'error' ? 'newsletter-error' : undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === 'error') setState('idle');
          }}
        />
        <button type="submit" aria-label="Subscribe to the benchmark report">
          <ArrowRight size={17} strokeWidth={2.4} />
        </button>
      </div>
      {state === 'error' && (
        <span id="newsletter-error" className="newsletter__error" role="alert">
          Enter a valid email address.
        </span>
      )}
    </form>
  );
}
