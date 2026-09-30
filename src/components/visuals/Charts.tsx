import { useId } from 'react';
import './Charts.css';

/* ==========================================================================
   Reusable SVG chart primitives.
   All charts are pure SVG so they stay crisp, themeable and dependency-free.
   ========================================================================== */

type Series = { id: string; color: string; values: number[] };

type ChartProps = {
  series: Series[];
  /** Rendered height in px. */
  height?: number;
  /** Show faint horizontal grid lines. */
  grid?: boolean;
  /** Show the value axis labels. */
  axis?: boolean;
  className?: string;
  /** Accessible description. */
  label?: string;
};

function buildPath(values: number[], max: number, width: number, height: number, pad: number) {
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;
  const step = values.length > 1 ? innerW / (values.length - 1) : innerW;
  const points = values.map((v, i) => ({
    x: pad + i * step,
    y: pad + innerH - (v / max) * innerH,
  }));

  // Catmull-Rom → cubic bezier for a smooth, premium curve.
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return { d, points };
}

/** Multi-series smooth line chart with soft area fills. */
export function LineChart({
  series,
  height = 180,
  grid = true,
  axis = false,
  className = '',
  label = 'Revenue trend chart',
}: ChartProps) {
  const uid = useId().replace(/:/g, '');
  const width = 560;
  const pad = axis ? 22 : 8;
  const max = Math.max(...series.flatMap((s) => s.values)) * 1.15;

  return (
    <svg
      className={`chart ${className}`.trim()}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={label}
    >
      <defs>
        {series.map((s) => (
          <linearGradient key={s.id} id={`${uid}-${s.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>

      {grid &&
        [0.18, 0.46, 0.74, 1].map((t) => (
          <line
            key={t}
            x1={pad}
            x2={width - pad}
            y1={height * t}
            y2={height * t}
            className="chart__grid"
          />
        ))}

      {series.map((s) => {
        const { d, points } = buildPath(s.values, max, width, height, pad);
        const area = `${d} L ${points[points.length - 1].x} ${height - pad} L ${points[0].x} ${
          height - pad
        } Z`;
        return (
          <g key={s.id}>
            <path d={area} fill={`url(#${uid}-${s.id})`} />
            <path
              d={d}
              fill="none"
              stroke={s.color}
              strokeWidth="2.2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        );
      })}
    </svg>
  );
}

/** Vertical bar chart — used for MRR movement and volume visuals. */
export function BarChart({
  values,
  color = '#4f56ff',
  height = 140,
  className = '',
  label = 'Bar chart',
}: {
  values: number[];
  color?: string;
  height?: number;
  className?: string;
  label?: string;
}) {
  const max = Math.max(...values);
  return (
    <div
      className={`bars ${className}`.trim()}
      style={{ height }}
      role="img"
      aria-label={label}
    >
      {values.map((v, i) => (
        <span
          key={i}
          className="bars__bar"
          style={{ height: `${Math.max((v / max) * 100, 6)}%`, background: color }}
        />
      ))}
    </div>
  );
}

/** Minimal donut for retention/recovery share. */
export function Donut({
  value,
  size = 108,
  stroke = 11,
  color = '#4f56ff',
  track = '#eceef3',
  children,
  label,
}: {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
  children?: React.ReactNode;
  label?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const filled = Math.min(Math.max(value, 0), 100) / 100;

  return (
    <div className="donut" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={label ?? `${value}%`}
      >
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c * filled} ${c}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {children && <div className="donut__center">{children}</div>}
    </div>
  );
}

/** Compact sparkline for inline metric cards. */
export function Sparkline({
  values,
  color = '#4f56ff',
  width = 96,
  height = 30,
  label = 'Sparkline',
}: {
  values: number[];
  color?: string;
  width?: number;
  height?: number;
  label?: string;
}) {
  const max = Math.max(...values);
  const { d } = buildPath(values, max * 1.1, width, height, 3);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
