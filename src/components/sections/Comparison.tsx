import { Check, Minus, Scale } from 'lucide-react';
import {
  comparisonColumns,
  comparisonRows,
  type ComparisonRow,
} from '../../data/stats';
import { Reveal } from '../ui/Reveal';
import './Comparison.css';

function Cell({ value, highlight }: { value: ComparisonRow[keyof Omit<ComparisonRow, 'id' | 'label'>]; highlight: boolean }) {
  if (value === true) {
    return (
      <span className={`cmp__cell cmp__cell--yes ${highlight ? 'is-brand' : ''}`}>
        <Check size={15} strokeWidth={3} aria-hidden="true" />
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="cmp__cell cmp__cell--no">
        <Minus size={15} strokeWidth={3} aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </span>
    );
  }
  return (
    <span className={`cmp__cell cmp__cell--text ${highlight ? 'is-brand' : ''}`}>{value}</span>
  );
}

export function Comparison() {
  return (
    <section className="cmp section" id="comparison">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">
              <span className="eyebrow__dot">
                <Scale size={11} strokeWidth={2.6} />
              </span>
              Comparison
            </span>
            <h2>How the platform compares to the usual alternatives</h2>
            <p>
              A factual look at capabilities. Store-native tools are excellent for simple plans,
              legacy suites are thorough but slow — this table sets out exactly where each option
              lands.
            </p>
          </div>
        </Reveal>

        <Reveal variant="scale">
          <div className="cmp__scroller" tabIndex={0} role="region" aria-label="Capability comparison table">
            <table className="cmp__table">
              <caption className="sr-only">
                Capability comparison between Sublayer, store-native tools, legacy billing and
                spreadsheets
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="cmp__corner">
                    Capability
                  </th>
                  {comparisonColumns.map((col) => (
                    <th
                      key={col.id}
                      scope="col"
                      className={`cmp__colHead ${col.highlight ? 'is-brand' : ''}`}
                    >
                      {col.highlight && <span className="cmp__badge">Recommended</span>}
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.id}>
                    <th scope="row" className="cmp__rowHead">
                      {row.label}
                    </th>
                    <td className="cmp__brandCol">
                      <Cell value={row.sublayer} highlight />
                    </td>
                    <td>
                      <Cell value={row.storeNative} highlight={false} />
                    </td>
                    <td>
                      <Cell value={row.legacyBilling} highlight={false} />
                    </td>
                    <td>
                      <Cell value={row.spreadsheets} highlight={false} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="cmp__note">
            Capability summary based on published documentation for each category as of this
            release. Competitor capability labels describe the typical configuration, not every
            vendor.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
