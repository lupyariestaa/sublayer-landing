import './Reveal.css';
import type { ElementType, ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';

type Props = {
  children: ReactNode;
  /** Stagger delay in ms. */
  delay?: number;
  /** Direction of travel. */
  variant?: 'up' | 'fade' | 'scale';
  className?: string;
  as?: ElementType;
};

/**
 * Wraps content and fades/slides it into view on scroll.
 */
export function Reveal({
  children,
  delay = 0,
  variant = 'up',
  className = '',
  as: Tag = 'div',
}: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
