import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { navItems, site } from '../../data/site';
import { useScrolled } from '../../hooks/useScrolled';
import { useScrollLock } from '../../hooks/useMediaQuery';
import './Navbar.css';

export function Navbar() {
  const scrolled = useScrolled(16);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useScrollLock(open);

  // Close the mobile sheet on resize to desktop.
  useEffect(() => {
    if (!open) return;
    const mql = window.matchMedia('(min-width: 921px)');
    const onChange = () => mql.matches && setOpen(false);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [open]);

  // Track which section is in view to highlight the nav link.
  useEffect(() => {
    const ids = navItems.map((n) => n.href.replace('#', ''));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="container navbar__inner">
        <a href="#top" className="navbar__brand" aria-label={`${site.name} home`} onClick={close}>
          <Logo size={28} />
        </a>

        <nav className="navbar__nav" aria-label="Primary">
          <ul className="navbar__list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  className={`navbar__link ${active === item.href ? 'is-active' : ''}`}
                  href={item.href}
                  aria-current={active === item.href ? 'true' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__actions">
          <a className="navbar__signin" href={site.demoUrl}>
            Sign in
          </a>
          <a className="btn btn--primary btn--sm navbar__cta" href="#pricing">
            Start free
          </a>
          <button
            type="button"
            className="navbar__toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`navbar__sheet ${open ? 'is-open' : ''}`}
        hidden={!open}
      >
        <nav aria-label="Mobile">
          <ul className="navbar__sheetList">
            {navItems.map((item, i) => (
              <li key={item.href} style={{ transitionDelay: `${i * 35}ms` }}>
                <a href={item.href} onClick={close}>
                  <span>{item.label}</span>
                  <ArrowUpRight size={16} strokeWidth={2.2} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="navbar__sheetFoot">
          <a className="btn btn--primary btn--full" href="#pricing" onClick={close}>
            Start free trial
          </a>
          <a className="btn btn--outline btn--full" href={site.salesUrl} onClick={close}>
            Book a demo
          </a>
        </div>
      </div>

      {open && <button type="button" className="navbar__scrim" aria-label="Close menu" onClick={close} />}
    </header>
  );
}
