import React from 'react';

export function HowItWorksSection() {
  return (
    <div className="sec py-24 border-t border-black/5 dark:border-white/5 relative overflow-hidden">
      <div className="mk max-w-6xl mx-auto px-4 relative z-10">
        
        <div className="sec-head center mb-24 text-center">
          <span className="eyebrow mb-4 block text-[var(--neon)] tracking-widest text-sm font-bold">HOW IT WORKS</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-slate-900 dark:text-white drop-shadow-md">
            Set up in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-600 dark:to-emerald-400">minutes.</span>
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Main Horizontal Line (Desktop) */}
          <div className="hidden md:block absolute top-[24px] left-[12%] right-[12%] h-[2px] bg-black/5 dark:bg-white/5 z-0">
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[var(--neon)] to-transparent opacity-40 shadow-[0_0_10px_rgba(163,230,53,0.5)]" />
          </div>

          {/* Timeline Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4 relative z-10">
            {[
              ["01", "Choose your plan", "Pick a membership and check out securely."],
              ["02", "Connect accounts", "Add your TradingView and Telegram usernames."],
              ["03", "Access granted", "Indicators unlock, group invite lands."],
              ["04", "Trade live with us", "Read the market together, every session."]
            ].map((s, i) => (
              <div className="flex flex-col items-center text-center group cursor-pointer" key={i}>
                {/* Node Circle */}
                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-[#050505] border-2 border-black/10 dark:border-white/10 group-hover:border-[var(--neon)] group-hover:shadow-[0_0_20px_rgba(163,230,53,0.3)] flex items-center justify-center mb-6 transition-all duration-300 relative z-10 group-hover:scale-110">
                  <span className="font-mono text-sm font-bold text-[var(--text-2)] group-hover:text-[var(--neon)] transition-colors">{s[0]}</span>
                </div>
                
                {/* Content */}
                <h4 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider font-display mb-3 group-hover:text-[var(--neon)] transition-colors duration-300">{s[1]}</h4>
                <p className="text-[var(--text-2)] text-sm md:text-base font-medium leading-relaxed max-w-[220px]">
                  {s[2]}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
