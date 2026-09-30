import { Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import { Reveal } from '../ui/Reveal';
import './Testimonials.css';

export function Testimonials() {
  return (
    <section className="tm section section--tint" id="testimonials">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">
              <span className="eyebrow__dot">
                <Quote size={11} strokeWidth={2.6} />
              </span>
              Customer stories
            </span>
            <h2>Teams running recurring revenue on {`Sublayer`}</h2>
            <p>
              Operators across commerce, health, software and consumer brands on what changed after
              the migration.
            </p>
          </div>
        </Reveal>

        <ul className="tm__grid">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.id} delay={i * 70} className="tm__card">
              <div className="tm__metric">
                <strong>{t.metric.value}</strong>
                <span>{t.metric.label}</span>
              </div>
              <blockquote className="tm__quote">
                <Quote size={18} strokeWidth={2.4} className="tm__quoteMark" aria-hidden="true" />
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="tm__author">
                <span className={`tm__avatar tm__avatar--${t.hue}`} aria-hidden="true">
                  {t.initials}
                </span>
                <span className="tm__authorMeta">
                  <strong>{t.name}</strong>
                  <small>
                    {t.role} · {t.company}
                  </small>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
