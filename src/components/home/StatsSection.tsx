import React from 'react';
import { Users, TrendingUp, Globe } from 'lucide-react';
import { CountUp } from '@/components/count-up';

export function StatsSection() {
  return (
    <div className="mk animate-fade-in-up delay-100" style={{ marginTop: "40px", marginBottom: "80px" }}>
      <div className="glass-premium" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", padding: "32px", borderRadius: "18px", textAlign: "center", border: "1px solid var(--border)", background: "var(--surface)" }}>
        <div className="flex flex-col items-center p-4 rounded-xl hover:bg-[var(--surface-2)] transition-colors group cursor-pointer">
          <div className="flex items-center justify-center gap-2 mb-2 text-accent group-hover:text-[var(--neon)] transition-colors">
            <Users className="w-8 h-8 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300" />
            <span className="text-4xl font-extrabold font-display drop-shadow-[0_0_15px_var(--neon-dim)]">
              <CountUp end={11} suffix="k+" />
            </span>
          </div>
          <div className="text-sm text-text-2 uppercase tracking-widest font-mono group-hover:text-foreground transition-colors">Active Traders</div>
        </div>

        <div className="flex flex-col items-center p-4 rounded-xl hover:bg-[var(--surface-2)] transition-colors group cursor-pointer relative">
          <div className="absolute inset-0 bg-[var(--neon)] opacity-0 group-hover:opacity-5 rounded-xl blur-xl transition-opacity duration-500" />
          <div className="flex items-center justify-center gap-2 mb-2 text-accent group-hover:text-[var(--neon)] transition-colors">
            <TrendingUp className="w-8 h-8 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300" />
            <span className="text-4xl font-extrabold font-display drop-shadow-[0_0_15px_var(--neon-dim)]">
              <CountUp end={10} suffix="M+" />
            </span>
          </div>
          <div className="text-sm text-text-2 uppercase tracking-widest font-mono group-hover:text-foreground transition-colors">Data Points Analyzed</div>
        </div>

        <div className="flex flex-col items-center p-4 rounded-xl hover:bg-[var(--surface-2)] transition-colors group cursor-pointer relative">
          <div className="absolute inset-0 bg-[var(--neon)] opacity-0 group-hover:opacity-5 rounded-xl blur-xl transition-opacity duration-500" />
          <div className="flex items-center justify-center gap-2 mb-2 text-accent group-hover:text-[var(--neon)] transition-colors">
            <Globe className="w-8 h-8 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300" />
            <span className="text-4xl font-extrabold font-display drop-shadow-[0_0_15px_var(--neon-dim)]">
              <CountUp end={150} suffix="+" duration={1500} />
            </span>
          </div>
          <div className="text-sm text-text-2 uppercase tracking-widest font-mono group-hover:text-foreground transition-colors">Countries</div>
        </div>
      </div>
    </div>
  );
}
