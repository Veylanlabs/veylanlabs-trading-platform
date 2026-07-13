import React from 'react';
import Link from 'next/link';
import { Users, MessageSquare, Zap, ChevronRight } from 'lucide-react';

export function CommunitySection() {
  return (
    <div className="sec relative overflow-hidden py-24 border-t border-white/5" id="community">
      {/* Background Ambient Glows */}
      <div className="neon-ambient w-[1000px] h-[1000px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]" />
      
      <div className="mk relative z-10 max-w-5xl mx-auto px-4 text-center">
        
        <div className="badge-interactive mb-8 mx-auto">
          <Users className="w-4 h-4 text-[var(--neon)]" />
          THE INNER CIRCLE
        </div>
        
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold uppercase tracking-tight mb-8 leading-tight">
          <span className="text-white drop-shadow-md">Trade with the </span>
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-400 drop-shadow-[0_0_15px_var(--neon-dim)] pb-4 pt-2 inline-block">1% Community</span>
        </h2>
        
        <div className="text-[var(--text-2)] text-xl md:text-2xl max-w-4xl mx-auto font-medium mb-16 leading-relaxed flex flex-col gap-2 text-center">
          <p>The indicators give you the edge. The community gives you the discipline.</p>
          <p>Join hundreds of funded, independent traders executing the same exact system, every single day.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-left">
          <div className="glass-premium p-8 rounded-2xl border border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-300">
            <MessageSquare className="w-8 h-8 text-[var(--neon)] mb-6" />
            <h4 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">Live Trading Floor</h4>
            <p className="text-[var(--text-2)] font-medium">Real-time market commentary, session mapping, and setup callouts during London and NY sessions.</p>
          </div>
          
          <div className="glass-premium p-8 rounded-2xl border border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-300">
            <Zap className="w-8 h-8 text-[var(--neon)] mb-6" />
            <h4 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">Direct Mentorship</h4>
            <p className="text-[var(--text-2)] font-medium">Access to the creators and veteran traders. Ask questions, get your charts reviewed, and fix your mistakes.</p>
          </div>

          <div className="glass-premium p-8 rounded-2xl border border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-300">
            <Users className="w-8 h-8 text-[var(--neon)] mb-6" />
            <h4 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">A-to-Z Education</h4>
            <p className="text-[var(--text-2)] font-medium">A massive library of video guides, recorded live sessions, and written documentation to master the system.</p>
          </div>
        </div>


        
      </div>
    </div>
  );
}
