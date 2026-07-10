import React from 'react';
import Link from 'next/link';
import { Check, ChevronRight, Activity, Crosshair } from 'lucide-react';

export function ToolkitSection() {
  return (
    <div className="sec relative overflow-hidden py-24">
      {/* Background Ambient Glows */}
      <div className="neon-ambient w-[800px] h-[800px] top-0 left-[-300px] opacity-[0.04]" />
      
      <div className="mk relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column - Core Statements */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <div className="badge-interactive mb-8">
              <span className="dotg" />
              TAKE BACK CONTROL
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tighter mb-6 leading-[1.1]">
              <span className="text-white drop-shadow-md">Trade with </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-400 drop-shadow-[0_0_15px_var(--neon-dim)]">Absolute Clarity</span>
            </h2>
            
            <p className="text-white text-xl md:text-2xl mb-5 leading-relaxed max-w-xl font-medium tracking-wide">
              Stop relying on noise and paid groups. Master the charts yourself.
            </p>
            
            <p className="text-[var(--text-2)] text-lg mb-10 leading-relaxed max-w-xl font-medium">
              Join an elite community of independent traders. We engineer the institutional-grade tools, you execute with precision.
            </p>

            <ul className="flex flex-col gap-6 mb-12 w-full max-w-md">
              {[
                "High-Probability Entry & Exit Signals",
                "Real-Time Institutional Market Context",
                "Complete A-to-Z Educational Ecosystem",
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-5 group">
                  <div className="w-8 h-8 rounded-full bg-[var(--neon)]/10 border border-[var(--neon)]/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(163,230,53,0.2)] group-hover:bg-[var(--neon)] group-hover:scale-110 transition-all duration-300">
                    <Check className="w-4 h-4 text-[var(--neon)] group-hover:text-black transition-colors" />
                  </div>
                  <span className="text-white/90 font-medium text-lg tracking-wide group-hover:text-white transition-colors">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/indicators" className="inline-block">
              <div className="px-8 py-4 rounded-full bg-[var(--neon)]/10 border border-[var(--neon)]/30 text-[var(--neon)] font-bold uppercase tracking-widest hover:bg-[var(--neon)] hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(163,230,53,0.15)] hover:shadow-[0_0_40px_rgba(163,230,53,0.4)] flex items-center gap-3 group cursor-pointer">
                <span>Explore Indicators</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          {/* Right Column - The 2 Presentations */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8 relative">
             <div className="absolute -right-12 -top-12 w-96 h-96 bg-[var(--neon)]/5 blur-[100px] rounded-full pointer-events-none z-0" />
             
             {/* Card 1 */}
             <div className="glass-premium p-10 rounded-[2rem] border-2 border-[var(--border)] hover:border-[var(--neon)]/50 transition-all duration-500 shadow-2xl hover:shadow-[0_0_50px_rgba(163,230,53,0.15)] group relative overflow-hidden z-10 hover:-translate-y-2 cursor-default">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--neon)]/5 blur-[80px] -z-10 rounded-full group-hover:bg-[var(--neon)]/20 transition-all duration-700" />
                <div className="w-14 h-14 rounded-2xl bg-black/50 border border-[var(--neon)]/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(163,230,53,0.15)] group-hover:scale-110 group-hover:bg-[var(--neon)]/20 transition-all duration-300">
                  <Activity className="w-7 h-7 text-[var(--neon)]" />
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold font-display uppercase tracking-tight text-white mb-5 drop-shadow-sm group-hover:text-[var(--neon)] transition-colors duration-300">
                  The Session Range
                </h3>
                <p className="text-[var(--text-2)] text-lg leading-relaxed font-medium">
                  Automatically map Tokyo, London, and New York opening ranges. Instantly validate clean breakouts and avoid devastating fake-outs.
                </p>
             </div>

             {/* Card 2 */}
             <div className="glass-premium p-10 rounded-[2rem] border-2 border-[var(--border)] hover:border-[var(--neon)]/50 transition-all duration-500 shadow-2xl hover:shadow-[0_0_50px_rgba(163,230,53,0.15)] group relative overflow-hidden z-10 hover:-translate-y-2 cursor-default">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--neon)]/5 blur-[80px] -z-10 rounded-full group-hover:bg-[var(--neon)]/20 transition-all duration-700" />
                <div className="w-14 h-14 rounded-2xl bg-black/50 border border-[var(--neon)]/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(163,230,53,0.15)] group-hover:scale-110 group-hover:bg-[var(--neon)]/20 transition-all duration-300">
                  <Crosshair className="w-7 h-7 text-[var(--neon)]" />
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold font-display uppercase tracking-tight text-white mb-5 drop-shadow-sm group-hover:text-[var(--neon)] transition-colors duration-300">
                  The Asia High Low
                </h3>
                <p className="text-[var(--text-2)] text-lg leading-relaxed font-medium">
                  Our premier market structure framework. Read liquidity sweeps, spot market rejections, and ride trend continuations anchored to the Asian session boundaries.
                </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
