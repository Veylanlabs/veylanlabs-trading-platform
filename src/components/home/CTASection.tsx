import React from 'react';
import Link from 'next/link';
import { Check, ChevronRight } from 'lucide-react';

export function CTASection() {
  return (
    <div className="sec pb-12">
      <div className="mk">
        <div className="relative rounded-3xl overflow-hidden p-8 md:p-14 text-center border border-[var(--border)] flex flex-col items-center justify-center min-h-[320px] bg-[var(--surface)] shadow-[0_0_40px_rgba(16,185,129,0.08)] transition-all duration-700 hover:border-[var(--neon)] group">
          {/* Background gradient/textures */}
          <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('/showcase-1.png')" }} />
          <div className="bg-mesh opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--surface)] to-[var(--bg)] opacity-90" />

          <div className="relative z-10 max-w-3xl flex flex-col items-center">
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--neon)] bg-emerald-500/10 text-[var(--neon)] text-xs font-mono font-bold tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[var(--neon)] animate-pulse" />
              SYSTEM ONLINE
            </div>

            <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-4 leading-tight uppercase">
              Ready to elevate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-600 dark:to-emerald-400">your trading?</span>
            </h2>

            <p className="text-[var(--text-2)] text-base md:text-lg mb-8 max-w-xl leading-relaxed">
              Join VeylanLabs and get access to our complete suite of indicators and tools.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto mt-2">
              <Link href="#pricing" className="cursor-pointer inline-flex items-center justify-center w-full sm:w-auto group/btn">
                <button className="cursor-pointer relative overflow-hidden flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[var(--neon)] to-emerald-500 rounded-xl text-[var(--bg)] text-sm font-extrabold uppercase tracking-widest transition-all duration-300 group-hover/btn:-translate-y-1 group-hover/btn:shadow-[0_10px_40px_rgba(16,185,129,0.5)]">
                  <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[50%] transition-transform duration-1000 ease-out" />
                  Get Access Now
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" strokeWidth={3} />
                </button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 mt-8 text-[11px] text-[var(--text-3)] font-mono font-bold tracking-widest uppercase">
              <span className="flex items-center gap-2 text-[var(--neon)]"><Check className="w-3 h-3" /> Instant Access</span>
              <span className="w-1 h-1 rounded-full bg-[var(--border)]"></span>
              <span className="flex items-center gap-2"><Check className="w-3 h-3 text-[var(--text-3)]" /> Cancel Anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
