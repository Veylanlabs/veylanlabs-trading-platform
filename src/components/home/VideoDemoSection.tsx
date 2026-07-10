import React from 'react';

export function VideoDemoSection() {
  return (
    <div className="sec relative py-12 md:py-24 z-20" id="demo">
      <div className="neon-ambient w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" />
      
      <div className="mk relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="sec-head center mb-12">
          <div className="badge-interactive mx-auto mb-6">
            <span className="dotg" />
            LIVE DEMO
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight text-white mb-4">
            See the system <span className="text-[var(--neon)]">in action</span>
          </h2>
          <p className="text-[var(--text-2)] text-lg max-w-2xl mx-auto">
            Watch how our custom institutional toolkit operates natively inside TradingView in real-time.
          </p>
        </div>

        {/* Beautiful Mac-like wrapper */}
        <div className="rounded-2xl p-[2px] bg-gradient-to-b from-[var(--neon)]/40 via-[var(--border)]/20 to-transparent shadow-[0_0_80px_rgba(163,230,53,0.15)] mx-auto relative hover:-translate-y-2 transition-transform duration-700 hover:shadow-[0_0_100px_rgba(163,230,53,0.25)] group max-w-5xl">
          <div className="absolute -inset-1 bg-[var(--neon)]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="bg-[#0f0f13] rounded-[20px] overflow-hidden relative z-10 border border-white/5 shadow-2xl">
            {/* Fake Mac Header */}
            <div className="h-8 md:h-10 w-full bg-[#1c1c22]/80 backdrop-blur border-b border-white/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <div className="absolute left-1/2 -translate-x-1/2 text-[10px] md:text-xs text-white/30 font-mono tracking-widest uppercase">
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
    </div>
  );
}
