import React from 'react';
import Link from 'next/link';
import { Users, MessageSquare, Zap, ChevronRight, CheckCircle2 } from 'lucide-react';

export function CommunitySection() {
  return (
    <div className="sec relative overflow-hidden border-t border-black/5 dark:border-white/5" id="community" style={{ paddingBottom: 0, marginBottom: 0 }}>
      {/* Background Ambient Glows */}
      <div className="neon-ambient w-[1000px] h-[1000px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]" />

      <div className="mk relative z-10 max-w-5xl mx-auto px-4 text-center">

        <div className="badge-interactive mb-8 mx-auto">
          <Users className="w-4 h-4 text-[var(--neon)]" />
          THE INNER CIRCLE
        </div>

        <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold uppercase tracking-tight mb-8 leading-tight">
          <span className="text-white drop-shadow-md inline-block pb-2">Trade with the </span>
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-600 dark:to-emerald-400 drop-shadow-[0_0_15px_var(--neon-dim)] pb-4 pt-2 inline-block">1% Community</span>
        </h2>

        <div className="text-[var(--text-2)] text-xl md:text-2xl max-w-4xl mx-auto font-medium mb-12 leading-relaxed flex flex-col gap-2 text-center">
          <p>The indicators give you the edge. The community gives you the discipline.</p>
          <p>Join hundreds of funded, independent traders executing the same exact system, every single day.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-left max-w-4xl mx-auto">
          {/* List 1 */}
          <div className="glass-premium p-8 rounded-2xl border border-black/5 dark:border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-300">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wide border-b border-black/5 dark:border-white/5 pb-4">
              What You Master
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                "Session ranges",
                "Asia High / Low structure",
                "Long and short opportunities",
                "Risk management",
                "Discipline and consistency"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[var(--neon)] shrink-0" />
                  <span className="text-[var(--text-2)] font-medium text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* List 2 */}
          <div className="glass-premium p-8 rounded-2xl border border-black/5 dark:border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-300 bg-gradient-to-br from-[var(--neon)]/5 to-transparent">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wide border-b border-black/5 dark:border-white/5 pb-4">
              More Than Indicators
            </h4>
            <p className="text-[var(--text-2)] font-medium mb-4">Your membership includes:</p>
            <ul className="flex flex-col gap-4">
              {[
                "Full access to VeylanLabs indicators",
                "Private Telegram community",
                "Direct chat with the VeylanLabs team",
                "Daily market discussion & setup guidance",
                "Tutorials and ongoing education"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--neon)]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-[var(--neon)]" />
                  </div>
                  <span className="text-[var(--text-2)] font-medium text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Telegram CTA */}
        <div id="telegram" className="mt-20 glass-premium border border-[var(--neon)]/30 rounded-3xl p-8 md:p-12 overflow-hidden relative group scroll-mt-24">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon)]/5 to-transparent z-0 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center justify-center text-center">

            <div className="flex-1 flex flex-col items-center max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--neon)]/10 text-[var(--neon)] font-bold text-sm tracking-widest uppercase mb-6 border border-[var(--neon)]/20">
                <span className="w-2 h-2 rounded-full bg-[var(--neon)] animate-pulse" />
                Free Public Group
              </div>
              <h3 className="text-3xl md:text-5xl font-display font-bold uppercase text-slate-900 dark:text-white mb-4 drop-shadow-sm">Join the VeylanLabs Telegram</h3>
              <p className="text-[var(--text-2)] text-lg mb-10 max-w-xl">
                Get free weekly market updates, setup ideas, and see real results from our community before you commit.
              </p>
              <div className="mt-8 mb-12 relative group cursor-pointer">
                <div className="absolute -inset-4 bg-gradient-to-r from-[var(--neon)]/0 via-[var(--neon)]/20 to-[var(--neon)]/0 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-full pointer-events-none" />
                <img 
                  src="/image (64).png" 
                  alt="Telegram Community Snapshot" 
                  className="relative h-24 md:h-32 w-auto rounded-2xl border border-black/10 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.2)] object-contain mx-auto transform group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(163,230,53,0.2)] transition-all duration-500" 
                />
              </div>

              <Link href="https://telegram.me/Veylanlabs" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-4 bg-[var(--neon)] !text-black font-bold uppercase tracking-widest rounded-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(163,230,53,0.4)] transition-all duration-300 whitespace-nowrap text-sm md:text-base">
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z" /></svg>
                Join Free Telegram
              </Link>
            </div>

          </div>
        </div>



      </div>
    </div>
  );
}
