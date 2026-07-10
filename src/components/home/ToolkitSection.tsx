import React from 'react';
import Link from 'next/link';
import { Check, ChevronRight } from 'lucide-react';

export function ToolkitSection() {
  return (
    <div className="sec relative overflow-hidden py-24">
      {/* Background Ambient Glows */}
      <div className="neon-ambient w-[800px] h-[800px] top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" />
      
      <div className="mk relative z-10 max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Column - Video */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -inset-10 bg-[var(--neon)]/10 blur-[100px] rounded-full pointer-events-none z-0" />
            
            {/* Video Wrapper */}
            <div className="rounded-2xl p-[2px] bg-gradient-to-b from-[var(--neon)]/40 via-[var(--border)]/20 to-transparent shadow-[0_0_80px_rgba(163,230,53,0.15)] w-full relative hover:-translate-y-2 transition-transform duration-700 hover:shadow-[0_0_120px_rgba(163,230,53,0.25)] group z-10">
              <div className="absolute -inset-1 bg-[var(--neon)]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="bg-[#0f0f13] rounded-[20px] overflow-hidden relative z-10 border border-white/5 shadow-2xl">
                {/* Fake Mac Header */}
                <div className="h-6 md:h-8 w-full bg-[#1c1c22]/90 backdrop-blur border-b border-white/5 flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  <div className="absolute left-1/2 -translate-x-1/2 text-[9px] md:text-[10px] text-white/30 font-mono tracking-widest uppercase">
                    VeylanLabs Dashboard
                  </div>
                </div>
                
                {/* The Video */}
                <div className="relative aspect-video bg-black w-full overflow-hidden">
                  <video 
                    src="/generatea_video_of_the_trading.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <div className="badge-interactive mb-8">
              <span className="dotg" />
              TAKE BACK CONTROL
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight mb-6 leading-[1.1]">
              <span className="text-white drop-shadow-md">Trade with </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-400 drop-shadow-[0_0_15px_var(--neon-dim)] pb-2 pr-2 inline-block">Absolute Clarity</span>
            </h2>
            
            <p className="text-white text-xl md:text-2xl mb-5 leading-relaxed max-w-xl font-medium tracking-wide">
              Stop relying on noise and paid groups. Master the charts yourself.
            </p>
            
            <p className="text-[var(--text-2)] text-lg mb-10 leading-relaxed max-w-xl font-medium">
              Join an elite community of independent traders. We engineer the institutional-grade tools, you execute with precision.
            </p>

            <ul className="flex flex-col gap-5 mb-16 w-full max-w-md">
              {[
                "High-Probability Entry & Exit Signals",
                "Real-Time Institutional Market Context",
                "Complete A-to-Z Educational Ecosystem",
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-4 group">
                  <div className="w-7 h-7 rounded-full bg-[var(--neon)]/10 border border-[var(--neon)]/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(163,230,53,0.2)] group-hover:bg-[var(--neon)] group-hover:scale-110 transition-all duration-300">
                    <Check className="w-4 h-4 text-[var(--neon)] group-hover:text-black transition-colors" />
                  </div>
                  <span className="text-white/90 font-medium text-[16px] tracking-wide group-hover:text-white transition-colors">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/indicators" className="inline-block mt-4">
              <button className="btn btn-primary btn-lg shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_40px_rgba(163,230,53,0.5)] uppercase tracking-widest text-sm font-bold flex items-center gap-3">
                <span>Explore Indicators</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
