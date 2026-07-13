import React from 'react';
import Link from 'next/link';
import { ArrowRight, Activity, Zap, Clock } from 'lucide-react';

export function AetherBoardSection() {
  return (
    <div className="sec relative py-24 border-t border-white/5" id="aether-board">
      {/* Ambient Glows */}
      <div className="neon-ambient w-[800px] h-[800px] top-0 left-1/2 -translate-x-1/2 opacity-[0.05]" />

      <div className="mk animate-fade-in-up delay-100 relative z-10 max-w-6xl mx-auto px-4">
        
        <div className="sec-head center mb-20 text-center">
          <div className="badge-interactive mb-8 mx-auto">
            <Zap className="w-4 h-4 text-[var(--neon)]" />
            AETHER BOT
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold uppercase tracking-tight text-center text-white drop-shadow-md mb-8 leading-[1.1]">
            Real-time intelligence. <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-400 pb-2 inline-block">On your chart.</span>
          </h2>
          <p className="max-w-3xl mx-auto text-[var(--text-2)] text-xl md:text-2xl font-medium leading-relaxed text-balance">
            The Aether Dashboard sits directly on your TradingView chart, acting as your personal mentor to keep you aligned with trend, power, and session timing.
          </p>
        </div>

        {/* Centerpiece Image Showcase */}
        <div className="relative w-full max-w-3xl mx-auto mb-24 group">
          <div className="absolute -inset-4 bg-gradient-to-b from-[var(--neon)]/20 to-transparent rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#0a0a0a] transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_30px_60px_rgba(163,230,53,0.15)] ring-1 ring-white/5 flex items-center justify-center p-2">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />
            <img
              src="/atherbot.png"
              alt="Aether Bot Interface"
              className="w-full h-auto object-cover block relative z-0 rounded-xl"
            />
          </div>
        </div>

        {/* 3-Column Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Trend & Power Card */}
          <div className="glass-premium p-8 rounded-2xl border border-white/5 hover:border-[var(--neon)]/30 transition-all duration-300 hover:-translate-y-2 group">
            <div className="w-14 h-14 rounded-xl bg-[var(--neon)]/10 flex items-center justify-center mb-6 border border-[var(--neon)]/20 shadow-[0_0_20px_rgba(163,230,53,0.15)] group-hover:bg-[var(--neon)]/20 transition-all duration-300 group-hover:scale-110">
              <Activity className="w-7 h-7 text-[var(--neon)]" />
            </div>
            <h4 className="text-xl font-bold text-white uppercase tracking-wide font-display mb-4">Trend &amp; Power</h4>
            <p className="text-[var(--text-2)] font-medium leading-relaxed">
              Live multi-timeframe bias and momentum tracking for high-probability trade alignment.
            </p>
          </div>

          {/* Aether Mentor Card */}
          <div className="glass-premium p-8 rounded-2xl border border-white/5 hover:border-[var(--neon)]/30 transition-all duration-300 hover:-translate-y-2 group">
            <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)] group-hover:bg-purple-500/20 transition-all duration-300 group-hover:scale-110">
              <Zap className="w-7 h-7 text-purple-400" />
            </div>
            <h4 className="text-xl font-bold text-white uppercase tracking-wide font-display mb-4">Aether Advisor</h4>
            <p className="text-[var(--text-2)] font-medium leading-relaxed">
              Plain-language guidance directly on your chart. Avoid dead zones and filter out bad entries.
            </p>
          </div>

          {/* Session countdown Card */}
          <div className="glass-premium p-8 rounded-2xl border border-white/5 hover:border-[var(--neon)]/30 transition-all duration-300 hover:-translate-y-2 group">
            <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)] group-hover:bg-emerald-500/20 transition-all duration-300 group-hover:scale-110">
              <Clock className="w-7 h-7 text-emerald-400" />
            </div>
            <h4 className="text-xl font-bold text-white uppercase tracking-wide font-display mb-4">Session Clock</h4>
            <p className="text-[var(--text-2)] font-medium leading-relaxed">
              Live countdowns to major session opens to help you prepare for opening range breakouts.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
