"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import { XCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AetherEdgeSection() {
  const [activeTab, setActiveTab] = useState<'old' | 'new'>('new');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  const afterImageSrc = "/veylanlabsimage.png"; // User requested image
  const beforeImageSrc = "/clean_chart.png"; // AI cleaned version of the chart

  return (
    <div className="sec relative py-24 border-t border-white/5" id="aether-edge">
      {/* Ambient Glows */}
      <div className="neon-ambient w-[800px] h-[800px] top-0 left-1/2 -translate-x-1/2 opacity-[0.05]" />

      <div className="mk animate-fade-in-up relative z-10 max-w-6xl mx-auto px-4">
        
        <div className="sec-head center mb-12 text-center">
          <div className="badge-interactive mb-8 mx-auto">
            <span className="dotg" />
            THE AETHER EDGE
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-center text-white drop-shadow-md mb-6 leading-[1.1]">
            SEE THE MARKET IN <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-400 pb-2 inline-block">HIGH DEFINITION</span>
          </h2>
          <p className="max-w-3xl mx-auto text-[var(--text-2)] text-xl font-medium leading-relaxed">
            Stop guessing. See exactly where liquidity rests, when the sessions shift, and where your invalidation lies.
          </p>
        </div>

        {/* Premium Tab Toggle */}
        <div className="flex justify-center mb-10">
          <div className="glass-premium p-1.5 rounded-full flex gap-2 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <button 
              onClick={() => setActiveTab('old')}
              className={`px-6 md:px-8 py-3 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'old' 
                  ? 'bg-red-500/10 text-red-400 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                  : 'text-text-3 hover:text-white border border-transparent hover:bg-white/5'
              }`}
            >
              <XCircle className="w-4 h-4" />
              The Old Way
            </button>
            <button 
              onClick={() => setActiveTab('new')}
              className={`px-6 md:px-8 py-3 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'new' 
                  ? 'bg-[var(--neon)]/10 text-[var(--neon)] border border-[var(--neon)]/30 shadow-[0_0_15px_rgba(163,230,53,0.2)]' 
                  : 'text-text-3 hover:text-white border border-transparent hover:bg-white/5'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              The VeylanLabs Way
            </button>
          </div>
        </div>

        {/* Image Display */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative w-full rounded-2xl overflow-hidden glass-premium border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#050505]">
            
            {/* Chart Image */}
            <div className="relative w-full bg-[#050505] aspect-[1280/673] overflow-hidden rounded-t-xl">
              <AnimatePresence mode="wait">
                {activeTab === 'old' ? (
                  <motion.div
                    key="old"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <img src={beforeImageSrc} alt="The Old Way" className="w-full h-full object-cover opacity-80" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="new"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <img src={afterImageSrc} alt="The VeylanLabs Way" className="w-full h-full object-cover" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Context Text Panel */}
            <div className="p-6 md:p-8 bg-[#0a0a0a] border-t border-white/5 relative z-10">
              <AnimatePresence mode="wait">
                {activeTab === 'old' ? (
                  <motion.div
                    key="text-old"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col md:flex-row items-start md:items-center gap-4 text-red-300/80"
                  >
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                      <XCircle className="w-6 h-6 text-red-400" />
                    </div>
                    <p className="text-base md:text-lg font-medium leading-relaxed">
                      <strong className="text-red-400 font-bold uppercase tracking-widest text-sm mr-2 block md:inline-block mb-1 md:mb-0">Signal Only:</strong> 
                      One arrow. No context, no session, no invalidation — you're guessing why it fired and holding when it fails.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="text-new"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col md:flex-row items-start md:items-center gap-4 text-[var(--neon)]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--neon)]/10 border border-[var(--neon)]/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(163,230,53,0.15)]">
                      <CheckCircle2 className="w-6 h-6 text-[var(--neon)]" />
                    </div>
                    <p className="text-base md:text-lg font-medium leading-relaxed text-[var(--neon)]">
                      <strong className="font-bold uppercase tracking-widest text-sm mr-2 block md:inline-block mb-1 md:mb-0">Full Context:</strong> 
                      What the session is doing, where liquidity sits, the structure shift, your entry — and the level that says you're wrong.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
