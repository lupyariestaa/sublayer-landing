import { useId, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs } from '../../data/faq';
import { site } from '../../data/site';
import { Reveal } from '../ui/Reveal';
import './Faq.css';

function FaqRow({
  item,
  open,
  onToggle,
}: {
  item: (typeof faqs)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const btnId = useId();

  return (
    <li className={`faq__item ${open ? 'is-open' : ''}`}>
      <h3 className="faq__heading">
        <button
          type="button"
          id={btnId}
          className="faq__trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="faq__question">{item.question}</span>
          <span className="faq__chevron" aria-hidden="true">
            <ChevronDown size={17} strokeWidth={2.4} />
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={btnId} className="faq__panel">
        <div className="faq__panelInner">
          <p className="faq__answer">{item.answer}</p>
        </div>
      </div>
    </li>
  );
}

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section className="faq section" id="faq">
      <div className="container">
        <div className="faq__layout">
          <Reveal className="faq__aside">
            <span className="eyebrow">
              <span className="eyebrow__dot">
                <HelpCircle size={11} strokeWidth={2.6} />
              </span>
              FAQ
            </span>
            <h2 className="faq__title">Questions, answered directly</h2>
            <p className="faq__lead lead">
              Everything teams ask before moving recurring revenue onto the platform. Still unsure?
              Talk to the implementation team.
            </p>
            <a className="btn btn--outline" href={site.salesUrl}>
              Ask the team a question
            </a>
          </Reveal>

          <Reveal delay={80} className="faq__listWrap">
            <ul className="faq__list">
              {faqs.map((item) => (
                <FaqRow
                  key={item.id}
                  item={item}
                  open={openId === item.id}
                  onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
                />
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
