import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CalendarDays, Check, X } from 'lucide-react';
import './DemoModal.css';

type Props = {
  open: boolean;
  onClose: () => void;
  email: string;
};

const INTERESTS = ['Recovery & dunning', 'Ledger & tax', 'Pricing experiments', 'Migration'];

/**
 * Accessible demo-request dialog. Traps focus, closes on Escape or backdrop
 * click, and confirms inline rather than navigating away.
 */
export function DemoModal({ open, onClose, email }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [sent, setSent] = useState(false);
  const [interest, setInterest] = useState(INTERESTS[0]);
  const [form, setForm] = useState({ name: '', company: '', address: '' });
  const [error, setError] = useState('');

  // Reset when reopened.
  useEffect(() => {
    if (open) {
      setSent(false);
      setError('');
      setForm({ name: '', company: '', address: '' });
    }
  }, [open]);

  // Focus first field + lock scroll + Escape to close.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 40);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && dialogRef.current) {
        const nodes = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
        );
        if (!nodes.length) return;
        const list = Array.from(nodes);
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.address.trim())) {
      setError('Add your name and a valid work email.');
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <div className="dm" role="presentation">
      <button type="button" className="dm__scrim" aria-label="Close dialog" onClick={onClose} />

      <div
        className="dm__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dm-title"
        ref={dialogRef}
      >
        <button type="button" className="dm__close" aria-label="Close dialog" onClick={onClose}>
          <X size={18} strokeWidth={2.4} />
        </button>

        {sent ? (
          <div className="dm__done">
            <span className="dm__doneIcon">
              <Check size={26} strokeWidth={3} />
            </span>
            <h2 id="dm-title" className="dm__title">
              Request received
            </h2>
            <p className="dm__text">
              Thanks, {form.name.split(' ')[0] || 'there'}. A solutions engineer will email{' '}
              <strong>{form.address}</strong> within one business day with a recovery model for{' '}
              {form.company || 'your business'}.
            </p>
            <button type="button" className="btn btn--primary" onClick={onClose}>
              Back to site
            </button>
          </div>
        ) : (
          <>
            <span className="dm__badge">
              <CalendarDays size={13} strokeWidth={2.4} />
              30-minute working session
            </span>
            <h2 id="dm-title" className="dm__title">
              Bring your numbers, leave with a model
            </h2>
            <p className="dm__text">
              No slide deck. We will map your renewal failures, tax exposure and reporting gaps,
              then show what the platform would change.
            </p>

            <form className="dm__form" onSubmit={submit} noValidate>
              <fieldset className="dm__fieldset">
                <legend className="dm__legend">What should we focus on?</legend>
                <div className="dm__chips">
                  {INTERESTS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`dm__chip ${interest === item ? 'is-active' : ''}`}
                      aria-pressed={interest === item}
                      onClick={() => setInterest(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="dm__row">
                <label className="dm__field">
                  <span>Full name</span>
                  <input
                    ref={firstFieldRef}
                    type="text"
                    autoComplete="name"
                    placeholder="Alex Rivera"
                    value={form.name}
                    aria-invalid={Boolean(error) && !form.name.trim()}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  />
                </label>
                <label className="dm__field">
                  <span>Company</span>
                  <input
                    type="text"
                    autoComplete="organization"
                    placeholder="Northnook Supply"
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  />
                </label>
              </div>

              <label className="dm__field">
                <span>Work email</span>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="alex@company.com"
                  value={form.address}
                  aria-invalid={Boolean(error)}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                />
              </label>

              {error && (
                <p className="dm__error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="btn btn--brand btn--full btn--lg">
                Request the session
                <span className="btn__icon">
                  <ArrowRight size={15} strokeWidth={2.6} />
                </span>
              </button>

              <p className="dm__note">
                Prefer email? Reach us at <a href={`mailto:${email}`}>{email}</a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
