import { useEffect, useRef, useState } from 'react';

/**
 * Tracks whether a media query currently matches.
 * SSR/test safe — defaults to false when matchMedia is unavailable.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

/** Locks body scroll while `locked` is true (used by the mobile nav). */
export function useScrollLock(locked: boolean) {
  const previous = useRef<string>('');

  useEffect(() => {
    if (!locked) return;
    previous.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('nav-open');
    return () => {
      document.body.style.overflow = previous.current;
      document.body.classList.remove('nav-open');
    };
  }, [locked]);
}
