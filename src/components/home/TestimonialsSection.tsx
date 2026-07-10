import React from 'react';
import { Star, Users } from 'lucide-react';
import { TESTIMONIALS } from '@/data/home';

export function TestimonialsSection() {
  return (
    <div className="sec" id="testimonials">
      <div className="mk">
        <div className="sec-head center mb-12 flex flex-col items-center">
          <span className="eyebrow inline-block">WALL OF LOVE</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight mt-4">
            Don't just take <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[var(--neon)] to-emerald-400 animate-gradient-x drop-shadow-[0_0_15px_rgba(163,230,53,0.3)]">our word</span> for it.
          </h2>
        </div>
      </div>

      <div className="marquee-container mt-8 py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee-content" style={{ animationDuration: '40s' }}>
          {/* Double the array for seamless infinite looping */}
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={i} className="glass-premium border border-border/50 rounded-2xl p-8 flex flex-col justify-between" style={{ minWidth: '400px', maxWidth: '450px', whiteSpace: 'normal', backgroundColor: 'var(--surface)' }}>
              <div>
                <div className="flex gap-1 mb-6 text-[var(--neon)]">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-[17px] leading-relaxed text-foreground/90 font-medium tracking-wide">
                  "{t.text1}
                  <span className="text-[var(--neon)] font-bold">{t.text2}</span>"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center bg-[var(--surface-2)] overflow-hidden shadow-[0_0_15px_rgba(163,230,53,0.1)]">
                  <Users className="w-5 h-5 text-[var(--neon)] opacity-80" />
                </div>
                <div>
                  <div className="text-foreground font-bold text-[15px]">{t.name}</div>
                  <div className="font-mono text-[10px] tracking-widest text-[var(--neon)] opacity-80 mt-1 uppercase">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
