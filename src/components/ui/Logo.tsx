import './Logo.css';

type Props = {
  /** Rendered height of the mark in px. */
  size?: number;
  /** Show the wordmark next to the mark. */
  withWordmark?: boolean;
  /** Colour scheme. */
  tone?: 'dark' | 'light';
  className?: string;
};

/**
 * Sublayer logomark — a stacked/layered "S" formed from three offset bars
 * inside a rounded square. Original geometry, works at favicon scale.
 */
export function Logo({ size = 30, withWordmark = true, tone = 'dark', className = '' }: Props) {
  return (
    <span className={`logo logo--${tone} ${className}`.trim()}>
      <svg
        className="logo__mark"
        width={size}
        height={size}
        viewBox="0 0 32 32"
        role="img"
        aria-label="Sublayer"
        focusable="false"
      >
        <defs>
          <linearGradient id="sl-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4f56ff" />
            <stop offset="60%" stopColor="#7a4df0" />
            <stop offset="100%" stopColor="#35cde8" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9.5" fill="url(#sl-mark)" />
        <g fill="#fff">
          <rect x="9.2" y="7.6" width="13.6" height="3.5" rx="1.75" opacity="0.55" />
          <rect x="7.4" y="13.4" width="17.2" height="3.6" rx="1.8" opacity="0.85" />
          <rect x="9.6" y="19.6" width="12.8" height="3.5" rx="1.75" opacity="0.5" />
        </g>
      </svg>
      {withWordmark && <span className="logo__word">Sublayer</span>}
    </span>
  );
}
