import { useEffect, useRef, useState } from 'react';

type Options = {
  /** Fraction of the element that must be visible to trigger. */
  threshold?: number;
  /** Root margin, tune to trigger slightly before entering view. */
  rootMargin?: string;
  /** Keep the revealed state once triggered. */
  once?: boolean;
};

/**
 * Reveals an element when it scrolls into view.
 * Respects `prefers-reduced-motion` by revealing immediately.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.14,
  rootMargin = '0px 0px -8% 0px',
  once = true,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, visible };
}
