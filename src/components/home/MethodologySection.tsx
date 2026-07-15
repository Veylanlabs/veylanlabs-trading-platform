"use client";

import React from 'react';
import { Crosshair, Search, Globe, Target, ShieldCheck, Zap } from 'lucide-react';

export function MethodologySection() {
  const features = [
    { 
      title: "Confirmations",
      text: "Buy and sell confirmations directly on the chart", 
      icon: <Crosshair className="w-6 h-6" /> 
    },
    { 
      title: "Pair Screener",
      text: "You do not need to sit and watch every pair manually", 
      icon: <Search className="w-6 h-6" /> 
    },
    { 
      title: "Session Structure",
      text: "FULL Session structure for London and New York", 
      icon: <Globe className="w-6 h-6" /> 
    },
    { 
      title: "Asia High / Low",
      text: "Precise mapping for cleaner setups", 
      icon: <Target className="w-6 h-6" /> 
    },
    { 
      title: "Real-time Guidance",
      text: "Help with patience, timing, and confirmation", 
      icon: <ShieldCheck className="w-6 h-6" /> 
    },
    { 
      title: "Pure Clarity",
      text: "Less noise, less guesswork, less wasted time", 
      icon: <Zap className="w-6 h-6" /> 
    }
  ];

  return (
    <div className="sec relative py-24 border-t border-black/5 dark:border-white/5" id="methodology">
      <div className="neon-ambient w-[800px] h-[800px] top-0 left-1/2 -translate-x-1/2 opacity-0 dark:opacity-[0.06]" />
      
      <div className="mk relative z-10 max-w-7xl mx-auto px-4">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-interactive mb-6 mx-auto">
            <span className="dotg" />
            MORE THAN INDICATORS
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-slate-900 dark:text-white leading-[1.1] drop-shadow-md mb-6">
            Built for <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-600 dark:to-emerald-400">Structure & Clarity</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-[var(--text-2)] font-medium leading-relaxed mb-4">
            Get ready for Aether Session Range and Asia High Low — built for traders who want real progression.
          </p>
          <div className="flex flex-col items-center justify-center gap-1 mt-2 text-lg text-slate-800 dark:text-white/90 font-semibold">
            <span>This is not just another indicator.</span>
            <span className="text-slate-500 dark:text-[var(--text-3)] font-medium">And it is definitely not another blind signal service.</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="glass-premium p-8 rounded-2xl border border-black/5 dark:border-white/5 bg-slate-50/80 dark:bg-[#050505]/50 hover:bg-slate-100 dark:hover:bg-[#0a0a0a] hover:border-[var(--neon)]/30 hover:shadow-[0_0_30px_rgba(163,230,53,0.1)] transition-all duration-300 group flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--neon)]/10 flex items-center justify-center text-[var(--neon)] mb-6 border border-[var(--neon)]/20 shadow-[0_0_15px_rgba(163,230,53,0.1)] group-hover:scale-110 group-hover:bg-[var(--neon)]/20 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wide group-hover:text-[var(--neon)] transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-white/70 font-medium leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                {feature.text}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Highlight */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-[1px] rounded-3xl bg-gradient-to-b from-[var(--neon)]/40 via-transparent to-transparent shadow-[0_20px_50px_rgba(163,230,53,0.1)]">
            <div className="bg-white dark:bg-[#050505] p-8 md:p-12 rounded-3xl text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-emerald-500/5 dark:bg-[var(--neon)]/5 blur-[50px] rounded-full pointer-events-none" />
              <p className="relative z-10 text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                VeylanLabs is built around a real human trading method.
                <br className="hidden md:block" />
                <span className="text-emerald-600 dark:text-[var(--neon)] mt-4 inline-block drop-shadow-sm">
                  The real value is bigger than just signals.<br/>
                  This is built to help you actually learn to trade.
                </span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
