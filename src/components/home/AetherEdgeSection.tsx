"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import { XCircle, CheckCircle2, Sun, Moon, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AetherEdgeSection() {
  const [activeTab, setActiveTab] = useState<'old' | 'new'>('new');
  const [chartTheme, setChartTheme] = useState<'dark' | 'light'>('dark');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  // Sync chart theme with global theme by default
  useEffect(() => {
    if (resolvedTheme === 'light' || resolvedTheme === 'dark') {
      setChartTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  const afterImageSrc = "/veylanlabsimage.png"; // User requested image
  const afterImageLightSrc = "/veylanlabsimagewhitetheme.png"; // Light theme chart
  const beforeImageSrc = "/clean_chart.png"; // AI cleaned version of the chart
  const beforeImageLightSrc = "/clean_chart_light.png"; // Light theme cleaned chart

  return (
    <div className="sec relative py-24 border-t border-black/5 dark:border-white/5" id="aether-edge">
      {/* Ambient Glows */}
      <div className="neon-ambient w-[800px] h-[800px] top-0 left-1/2 -translate-x-1/2 opacity-[0.05]" />

      <div className="mk animate-fade-in-up relative z-10 max-w-6xl mx-auto px-4">
        
        <div className="sec-head center mb-12 text-center flex flex-col items-center">
          {/* Section Separator */}
          <div className="w-full flex items-center justify-center gap-4 mb-16 opacity-60 relative z-10">
            <div className="h-[2px] w-24 md:w-48 bg-gradient-to-r from-transparent to-[var(--neon)]" />
            <Zap className="w-8 h-8 text-[var(--neon)]" />
            <div className="h-[2px] w-24 md:w-48 bg-gradient-to-l from-transparent to-[var(--neon)]" />
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight mb-8 leading-[1.05] relative z-10 text-white drop-shadow-xl">
            THE AETHER EDGE
          </h2>

          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[var(--neon)]/30 bg-[var(--neon)]/10 text-[var(--neon)] text-sm md:text-base font-mono font-bold tracking-widest mb-10 relative z-10 shadow-[0_0_15px_rgba(163,230,53,0.15)] backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--neon)] shadow-[0_0_8px_var(--neon)] animate-pulse" />
            SEE THE MARKET IN HIGH DEFINITION
          </div>
          
          <div className="w-32 h-1 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 mb-10 relative z-10" />

          <p className="text-slate-600 dark:text-slate-400 text-xl md:text-2xl font-medium leading-relaxed max-w-3xl text-balance relative z-10">
            Stop guessing. See exactly where liquidity rests, when the sessions shift, and where your invalidation lies.
          </p>
        </div>

        {/* Premium Tab Toggle */}
        <div className="flex justify-center mb-10">
          <div className="glass-premium p-1.5 rounded-full flex gap-1 sm:gap-2 border border-black/10 dark:border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] w-full max-w-[95vw] sm:max-w-fit mx-auto">
            <button 
              onClick={() => setActiveTab('new')}
              className={`px-2 sm:px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-300 flex items-center justify-center gap-1.5 md:gap-2 flex-1 sm:flex-none ${
                activeTab === 'new' 
                  ? 'bg-[var(--neon)]/10 text-[var(--neon)] border border-[var(--neon)]/30 shadow-[0_0_15px_rgba(163,230,53,0.2)]' 
                  : 'text-text-3 hover:text-slate-900 dark:hover:text-white border border-transparent hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
              <span><span className="hidden sm:inline">The </span>VeylanLabs Way</span>
            </button>
            <button 
              onClick={() => setActiveTab('old')}
              className={`px-2 sm:px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-300 flex items-center justify-center gap-1.5 md:gap-2 flex-1 sm:flex-none ${
                activeTab === 'old' 
                  ? 'bg-red-500/10 text-red-400 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                  : 'text-text-3 hover:text-slate-900 dark:hover:text-white border border-transparent hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <XCircle className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
              <span><span className="hidden sm:inline">The </span>Old Way</span>
            </button>
          </div>
        </div>

        {/* Image Display */}
        <div className="relative max-w-5xl mx-auto">
          {/* Dynamic Outer Glow */}
          <div className={`absolute -inset-1 rounded-2xl blur-2xl opacity-20 transition-colors duration-700 ${activeTab === 'new' ? 'bg-[var(--neon)]' : 'bg-red-500'}`} />
          
          <div className="relative w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            
            {/* Premium Window Frame */}
            <div className="h-10 w-full bg-slate-50 dark:bg-[#0a0a0a] border-b border-black/5 dark:border-white/5 flex items-center justify-between px-4 relative z-20">
              <div className="flex gap-1.5 w-16">

              </div>
              
              <div className="absolute left-1/2 -translate-x-1/2 text-[9px] md:text-[10px] text-slate-500 dark:text-white/30 font-mono tracking-widest uppercase">
                VeylanLabs Aether
              </div>
              
              <div className="w-16 flex justify-end">
                  <button 
                    onClick={() => setChartTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                    className="w-6 h-6 flex items-center justify-center rounded-md bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-black/5 dark:border-white/5 text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white"
                    title={`Switch to ${chartTheme === 'dark' ? 'light' : 'dark'} chart theme`}
                  >
                    {chartTheme === 'dark' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                  </button>
              </div>
            </div>

            {/* Chart Image */}
            <div className={`relative w-full aspect-[1280/580] overflow-hidden transition-colors duration-500 ${chartTheme === 'light' ? 'bg-white' : 'bg-[#000000]'}`}>
              {/* Subtle Inner Shadow only */}
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_100px_rgba(0,0,0,0.3)] z-10 pointer-events-none transition-opacity duration-500" />
              
              <AnimatePresence mode="wait">
                {activeTab === 'old' ? (
                  <motion.div
                    key="old"
                    initial={{ opacity: 0, filter: 'blur(4px)', scale: 1.02 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <img src={beforeImageSrc} alt="The Old Way" className={`w-full h-full object-contain opacity-80 ${chartTheme === 'light' ? 'invert hue-rotate-180' : ''}`} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="new"
                    initial={{ opacity: 0, filter: 'blur(4px)', scale: 1.02 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    {/* Base Chart */}
                    <img src={afterImageLightSrc} alt="The VeylanLabs Way" className={`w-full h-full object-contain ${chartTheme === 'dark' ? 'invert hue-rotate-180' : 'bg-white'}`} />
                    
                    {/* Dynamic AetherBot Panel Overlay */}
                    <img 
                      src="/atherbotnew.png" 
                      alt="AetherBot Panel" 
                      className={`absolute left-0 bottom-0 transition-all duration-500 ${chartTheme === 'light' ? 'invert hue-rotate-180 drop-shadow-xl' : 'drop-shadow-2xl'}`}
                      style={{ width: '38.28125%', height: 'auto' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Context Text Panel */}
            <div className="p-6 md:p-8 bg-slate-50 dark:bg-[#0a0a0a] border-t border-black/5 dark:border-white/5 relative z-20">
                {/* Subtle card glow based on tab */}
                <div className={`absolute top-0 left-0 w-1 h-full transition-colors duration-500 ${activeTab === 'new' ? 'bg-[var(--neon)]' : 'bg-red-500'}`} />
                
                <AnimatePresence mode="wait">
                  {activeTab === 'old' ? (
                    <motion.div
                      key="text-old"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col md:flex-row items-start md:items-center gap-5 text-red-600 dark:text-red-300/80"
                    >
                      <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.15)] relative">
                        <XCircle className="w-6 h-6 text-red-400 relative z-10" />
                        <div className="absolute inset-0 bg-red-500/20 blur-md rounded-xl" />
                      </div>
                      <p className="text-base md:text-lg font-medium leading-relaxed">
                        <strong className="text-red-400 font-bold uppercase tracking-widest text-xs md:text-sm mr-2 block md:inline-block mb-1 md:mb-0">Signal Only:</strong> 
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
                      className="flex flex-col md:flex-row items-start md:items-center gap-5 text-[var(--neon)]"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[var(--neon)]/10 border border-[var(--neon)]/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(163,230,53,0.15)] relative">
                        <CheckCircle2 className="w-6 h-6 text-[var(--neon)] relative z-10" />
                        <div className="absolute inset-0 bg-[var(--neon)]/20 blur-md rounded-xl" />
                      </div>
                      <p className="text-base md:text-lg font-medium leading-relaxed text-slate-800 dark:text-white/90">
                        <strong className="text-[var(--neon)] font-bold uppercase tracking-widest text-xs md:text-sm mr-2 block md:inline-block mb-1 md:mb-0 drop-shadow-[0_0_8px_rgba(163,230,53,0.5)]">Full Context:</strong> 
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
