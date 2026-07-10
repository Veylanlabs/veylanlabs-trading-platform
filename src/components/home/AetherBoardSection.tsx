import React from 'react';
import Link from 'next/link';
import { ArrowRight, Activity, Zap, Clock } from 'lucide-react';

export function AetherBoardSection() {
  return (
    <div className="sec relative" id="aether-board">
      {/* Ambient Glows */}
      <div className="neon-ambient w-[600px] h-[600px] top-[10%] left-[-200px] opacity-[0.05]" />
      <div className="neon-ambient w-[800px] h-[800px] bottom-[-200px] right-[-300px] opacity-[0.06]" />

      <div className="mk animate-fade-in-up delay-100 relative z-10">
        <div className="sec-head center mb-12">
          <span className="eyebrow">Aether Bot</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mt-2 text-center text-white drop-shadow-md">
            Real-time intelligence. <span className="text-[var(--neon)]">On your chart.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-text-2 text-center mt-4" style={{ fontSize: 16 }}>
            The Aether Dashboard sits directly on your TradingView chart, acting as your personal mentor to keep you aligned with trend, power, and session timing.
          </p>
          <div className="flex justify-center mt-6">
            <Link href="/aether-board" className="btn btn-soft btn-sm" style={{ padding: '8px 16px', height: 36, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span>View more</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="max-w-5xl mx-auto glass-premium rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.4)] relative">
          <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />

          <div className="p-6 md:p-8 relative z-10 flex flex-col lg:flex-row gap-8 items-center">
            {/* Aether Image Container */}
            <div className="flex-1 w-full bg-[var(--surface)] border border-border/50 rounded-xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--neon)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <img
                src="/atherbot.png"
                alt="Aether Bot Interface"
                className="w-full h-auto object-cover block"
                style={{ borderBottom: '1px solid var(--border)' }}
              />
            </div>

            {/* Feature Details Column */}
            <div className="w-full lg:w-80 flex flex-col gap-5">
              {/* Trend & Power Card */}
              <div className="glass-premium p-5 rounded-xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-[var(--neon)]" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Trend &amp; Power</h4>
                </div>
                <p className="text-[11px] text-text-2 leading-relaxed">
                  Monitor directional trend bias and momentum levels across 1H, 15M, and 5M timeframes simultaneously to ensure high-probability alignment.
                </p>
              </div>

              {/* Aether Mentor Card */}
              <div className="glass-premium p-5 rounded-xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Aether Advisor</h4>
                </div>
                <p className="text-[11px] text-text-2 leading-relaxed">
                  Provides plain-language guidance directly on your chart, preventing bad entries during dead zones and reminding you when to wait for fresh ranges.
                </p>
              </div>

              {/* Session countdown Card */}
              <div className="glass-premium p-5 rounded-xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Session Clock</h4>
                </div>
                <p className="text-[11px] text-text-2 leading-relaxed">
                  Track countdowns to upcoming sessions (e.g. Pre-London, London, New York opens) so you can prepare for opening range breakout strategies in advance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
