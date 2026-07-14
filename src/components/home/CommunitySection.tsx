import React from 'react';
import Link from 'next/link';
import { Users, MessageSquare, Zap, ChevronRight } from 'lucide-react';

export function CommunitySection() {
  return (
    <div className="sec relative overflow-hidden py-24 border-t border-black/5 dark:border-white/5" id="community">
      {/* Background Ambient Glows */}
      <div className="neon-ambient w-[1000px] h-[1000px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]" />

      <div className="mk relative z-10 max-w-5xl mx-auto px-4 text-center">

        <div className="badge-interactive mb-8 mx-auto">
          <Users className="w-4 h-4 text-[var(--neon)]" />
          THE INNER CIRCLE
        </div>

        <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold uppercase tracking-tight mb-8 leading-tight">
          <span className="text-slate-900 dark:text-white drop-shadow-md">Trade with the </span>
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-600 dark:to-emerald-400 drop-shadow-[0_0_15px_var(--neon-dim)] pb-4 pt-2 inline-block">1% Community</span>
        </h2>

        <div className="text-[var(--text-2)] text-xl md:text-2xl max-w-4xl mx-auto font-medium mb-16 leading-relaxed flex flex-col gap-2 text-center">
          <p>The indicators give you the edge. The community gives you the discipline.</p>
          <p>Join hundreds of funded, independent traders executing the same exact system, every single day.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-left">
          <div className="glass-premium p-8 rounded-2xl border border-black/5 dark:border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-300">
            <MessageSquare className="w-8 h-8 text-[var(--neon)] mb-6" />
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">Buy / Sell Signals</h4>
            <p className="text-[var(--text-2)] font-medium">Real-time market commentary, session mapping, and precise setup callouts delivered straight to you.</p>
          </div>

          <div className="glass-premium p-8 rounded-2xl border border-black/5 dark:border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-300">
            <Zap className="w-8 h-8 text-[var(--neon)] mb-6" />
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">Mentoring - Full Guidance</h4>
            <p className="text-[var(--text-2)] font-medium">Access to the creators and veteran traders. Ask questions, get your charts reviewed, and fix your mistakes.</p>
          </div>

          <div className="glass-premium p-8 rounded-2xl border border-black/5 dark:border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-300">
            <Users className="w-8 h-8 text-[var(--neon)] mb-6" />
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">A-to-Z Education</h4>
            <p className="text-[var(--text-2)] font-medium">A massive library of video guides, recorded live sessions, and written documentation to master the system.</p>
          </div>
        </div>

        {/* Telegram CTA */}
        <div className="mt-20 glass-premium border border-[var(--neon)]/30 rounded-3xl p-8 md:p-12 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon)]/5 to-transparent z-0 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center justify-center text-center">

            <div className="flex-1 flex flex-col items-center max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--neon)]/10 text-[var(--neon)] font-bold text-sm tracking-widest uppercase mb-6 border border-[var(--neon)]/20">
                <span className="w-2 h-2 rounded-full bg-[var(--neon)] animate-pulse" />
                Free Public Group
              </div>
              <h3 className="text-3xl md:text-5xl font-display font-bold uppercase text-slate-900 dark:text-white mb-4 drop-shadow-sm">Join the VeylanLabs Telegram</h3>
              <p className="text-[var(--text-2)] text-lg mb-20 max-w-xl">
                Get free weekly market updates, setup ideas, and see real results from our community before you commit.
              </p>

              <Link href="https://telegram.me/Veylanlabs" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--neon)] !text-black font-bold uppercase tracking-widest rounded-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(163,230,53,0.4)] transition-all duration-300">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z" /></svg>
                Join Free Telegram
              </Link>
            </div>

          </div>
        </div>



      </div>
    </div>
  );
}
