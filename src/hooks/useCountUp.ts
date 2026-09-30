import { useEffect, useRef, useState } from 'react';

type Options = {
  /** Final value to count up to. */
  to: number;
  /** Duration in ms. */
  duration?: number;
  /** Start animating. */
  active?: boolean;
  decimals?: number;
};

/**
 * Animates a number from 0 to `to` once `active` becomes true.
 * Uses easeOutExpo for a premium settle. Skips animation for
 * reduced-motion users.
 */
export function useCountUp({ to, duration = 1300, active = true, decimals = 0 }: Options) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setValue(to);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      setValue(Number((to * eased).toFixed(decimals)));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
      else setValue(to);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [to, duration, active, decimals]);

  return value;
}
