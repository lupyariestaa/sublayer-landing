import { Github, Linkedin, Rss, Twitter } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { footerNav, site } from '../../data/site';
import { NewsletterForm } from '../ui/NewsletterForm';
import './Footer.css';

const socials = [
  { label: `${site.name} on X`, href: 'https://x.com', Icon: Twitter },
  { label: `${site.name} on LinkedIn`, href: 'https://linkedin.com', Icon: Linkedin },
  { label: `${site.name} on GitHub`, href: 'https://github.com', Icon: Github },
  { label: `${site.name} changelog feed`, href: '#faq', Icon: Rss },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brandCol">
            <Logo size={30} />
            <p className="footer__blurb">
              The billing and revenue layer for recurring businesses. Own your plan logic,
              recovery and revenue reporting in one platform.
            </p>
            <NewsletterForm />
            <ul className="footer__socials">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} aria-label={label} rel="noreferrer">
                    <Icon size={17} strokeWidth={2} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            {footerNav.map((group) => (
              <div key={group.title} className="footer__col">
                <h3 className="footer__colTitle">{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} {site.name}, Inc. All rights reserved. Fictional product created as a
            design demonstration.
          </p>
          <ul className="footer__legal">
            <li>
              <a href="#footer">Privacy</a>
            </li>
            <li>
              <a href="#footer">Terms</a>
            </li>
            <li>
              <a href="#footer">DPA</a>
            </li>
            <li>
              <a href="#footer">Security</a>
            </li>
            <li>
              <a href="#footer">Sub-processors</a>
            </li>
          </ul>
        </div>

        <div className="footer__wordmark" aria-hidden="true">
          {site.name}
        </div>
      </div>
    </footer>
  );
}
