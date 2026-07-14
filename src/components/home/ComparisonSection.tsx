import React from 'react';

export function ComparisonSection() {
  return (
    <div className="sec">
      <div className="mk animate-fade-in-up">
        <div className="sec-head center mb-12">
          <span className="eyebrow border border-[var(--neon)]/30 bg-[var(--neon)]/5">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[var(--neon)] to-emerald-400 animate-gradient-x">Why VeylanLabs?</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mt-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[var(--neon)] to-emerald-400 animate-gradient-x inline-block">What we bring. What they miss.</span>
          </h2>
          <p className="text-[var(--text-2)] text-lg mt-4 max-w-xl mx-auto">Every detail in VeylanLabs was designed intentionally. Here's how we compare.</p>
        </div>

        <div className="max-w-4xl mx-auto glass-premium rounded-2xl overflow-hidden border border-border/50 shadow-2xl relative z-10">
          <div className="overflow-x-auto">
            <table className="vl-compare-table">
              <thead>
                <tr style={{ background: 'var(--surface-2)' }}>
                  <th>Feature</th>
                  <th className="col-ours">
                    <span className="vl-compare-col-label">VeylanLabs</span>
                    <span className="vl-compare-col-sub">PREMIUM SUITE</span>
                  </th>
                  <th className="col-theirs">Typical Indicators</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { f: 'Signal Repaint', v: '✓ Zero Repaint', t: '✗ Repaints' },
                  { f: 'Session Structure Logic', v: '✓ Built-In', t: '✗ None' },
                  { f: 'Development Time', v: '✓ 2 Years R&D', t: '✗ Unknown' },
                  { f: '3rd Party Back-Testing', v: '✓ Verified', t: '✗ Unverified' },
                  { f: 'Markets Supported', v: '✓ All Markets', t: '✗ 1–2 Only' },
                  { f: 'Asia H/L Framework', v: '✓ Dedicated Tool', t: '✗ None' },
                  { f: 'Pair Screener', v: '✓ Multi-Symbol', t: '✗ Not Included' },
                  { f: 'Named, Accountable Creators', v: '✓ Public Team', t: '✗ Anonymous' },
                  { f: 'Community & Support', v: '✓ Active Telegram', t: '✗ None' },
                  { f: 'Platform', v: '✓ TradingView', t: 'Varies' },
                ].map((row, i) => (
                  <tr key={i} className="body-row">
                    <td>{row.f}</td>
                    <td className="col-ours">
                      <span className="vl-pill-yes">{row.v}</span>
                    </td>
                    <td className="col-theirs">
                      {row.t.startsWith('✗')
                        ? <span className="vl-pill-no">{row.t}</span>
                        : <span className="vl-pill-neutral">{row.t}</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
