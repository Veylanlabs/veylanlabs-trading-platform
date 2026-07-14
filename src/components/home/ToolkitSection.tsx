"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, Activity, Crosshair, Check, Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ToolkitSection() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="sec relative overflow-hidden py-24" id="indicators">
      {/* Background Ambient Glows */}
      <div className="neon-ambient w-[800px] h-[800px] top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" />
      
      <div className="mk relative z-10 max-w-7xl mx-auto px-4">
        <div className="sec-head center mb-20">
          <div className="badge-interactive mb-8 mx-auto">
            <span className="dotg" />
            BUY / SELL PRECISION
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight mb-6 leading-[1.1]">
            <span className="text-slate-900 dark:text-white drop-shadow-md">Trade with </span>
            <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-600 dark:to-emerald-400 drop-shadow-[0_0_15px_var(--neon-dim)] pb-2 pr-2 inline-block">Absolute Clarity</span>
          </h2>
          <p className="text-[var(--text-2)] text-lg max-w-2xl mx-auto font-medium">
            Stop guessing. Our institutional-grade indicators give you the exact framework to execute trades confidently, live on your chart.
          </p>
        </div>

        {/* Feature 1: Session Range */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-32">
          {/* Video Left */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -inset-10 bg-[var(--neon)]/10 blur-[100px] rounded-full pointer-events-none z-0" />
            <div className="rounded-2xl p-[2px] bg-gradient-to-b from-[var(--neon)]/40 via-[var(--border)]/20 to-transparent shadow-[0_0_80px_rgba(163,230,53,0.15)] w-full relative hover:-translate-y-2 transition-transform duration-700 hover:shadow-[0_0_120px_rgba(163,230,53,0.25)] group z-10">
              <div className="bg-slate-50 dark:bg-[#0f0f13] rounded-[20px] overflow-hidden relative z-10 border border-black/5 dark:border-white/5">
                <div className="h-6 md:h-8 w-full bg-slate-100/90 dark:bg-[#1c1c22]/90 backdrop-blur border-b border-black/5 dark:border-white/5 flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  <div className="absolute left-1/2 -translate-x-1/2 text-[9px] md:text-[10px] text-slate-500 dark:text-white/30 font-mono tracking-widest uppercase">
                    Session Range 2.0
                  </div>
                </div>
                <div 
                  className="relative aspect-video bg-white w-full overflow-hidden group cursor-pointer"
                  onClick={() => setActiveImage('/indicator_1.png')}
                >
                  <img src="/indicator_1.png" alt="Session Range Interface" className="w-full h-full object-contain block p-2 transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[var(--neon)]/20 text-[var(--neon)] flex items-center justify-center border border-[var(--neon)]/30 scale-50 group-hover:scale-100 transition-all duration-300 shadow-[0_0_20px_rgba(163,230,53,0.3)]">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Right */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[var(--neon)]/10 border border-[var(--neon)]/30 flex items-center justify-center text-[var(--neon)] shadow-[0_0_15px_rgba(163,230,53,0.2)]">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-display font-bold uppercase tracking-tight text-slate-900 dark:text-white">
                The Session Range
              </h3>
            </div>
            
            <p className="text-[var(--text-2)] text-xl leading-relaxed font-medium mb-8">
              Automatically map Tokyo, London, and New York opening ranges. Instantly validate clean breakouts and avoid devastating fake-outs.
            </p>
            
            <div className="space-y-4 mb-8 w-full max-w-md">
              {[
                "Visualizes session traps live",
                "Filters out market noise",
                "Clear continuation signals"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-[var(--neon)]/30 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-300 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--neon)]/10 flex items-center justify-center border border-[var(--neon)]/20 shadow-[0_0_10px_rgba(163,230,53,0.1)] group-hover:scale-110 transition-transform">
                    <Check className="w-4 h-4 text-[var(--neon)]" />
                  </div>
                  <span className="text-slate-800 dark:text-white/90 font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature 2: Asia High Low */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Content Left */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[var(--neon)]/10 border border-[var(--neon)]/30 flex items-center justify-center text-[var(--neon)] shadow-[0_0_15px_rgba(163,230,53,0.2)]">
                <Crosshair className="w-6 h-6" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-display font-bold uppercase tracking-tight text-slate-900 dark:text-white">
                The Asia High Low
              </h3>
            </div>
            
            <p className="text-[var(--text-2)] text-xl leading-relaxed font-medium mb-8">
              Our premier market structure framework. Read liquidity sweeps, spot market rejections, and ride trend continuations anchored to the Asian session boundaries.
            </p>
            
            <div className="space-y-4 mb-10 w-full max-w-md">
              {[
                "Highly accurate Buy/Sell zones",
                "Identifies major liquidity sweeps",
                "Precise stop-loss invalidation"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-[var(--neon)]/30 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-300 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--neon)]/10 flex items-center justify-center border border-[var(--neon)]/20 shadow-[0_0_10px_rgba(163,230,53,0.1)] group-hover:scale-110 transition-transform">
                    <Check className="w-4 h-4 text-[var(--neon)]" />
                  </div>
                  <span className="text-slate-800 dark:text-white/90 font-medium">{text}</span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', '#pricing');
              }}
              className="btn btn-primary btn-lg shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_40px_rgba(163,230,53,0.5)] uppercase tracking-widest text-sm font-bold flex items-center gap-3 inline-block"
            >
              <span>Get Instant Access</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Video Right */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -inset-10 bg-[var(--neon)]/10 blur-[100px] rounded-full pointer-events-none z-0" />
            <div className="rounded-2xl p-[2px] bg-gradient-to-b from-[var(--neon)]/40 via-[var(--border)]/20 to-transparent shadow-[0_0_80px_rgba(163,230,53,0.15)] w-full relative hover:-translate-y-2 transition-transform duration-700 hover:shadow-[0_0_120px_rgba(163,230,53,0.25)] group z-10">
              <div className="bg-slate-50 dark:bg-[#0f0f13] rounded-[20px] overflow-hidden relative z-10 border border-black/5 dark:border-white/5">
                <div className="h-6 md:h-8 w-full bg-slate-100/90 dark:bg-[#1c1c22]/90 backdrop-blur border-b border-black/5 dark:border-white/5 flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  <div className="absolute left-1/2 -translate-x-1/2 text-[9px] md:text-[10px] text-slate-500 dark:text-white/30 font-mono tracking-widest uppercase">
                    Asia High Low Tracker
                  </div>
                </div>
                <div 
                  className="relative aspect-video bg-white w-full overflow-hidden group cursor-pointer"
                  onClick={() => setActiveImage('/indicator_2.png')}
                >
                  <img src="/indicator_2.png" alt="Asia High Low Interface" className="w-full h-full object-contain block p-2 transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[var(--neon)]/20 text-[var(--neon)] flex items-center justify-center border border-[var(--neon)]/30 scale-50 group-hover:scale-100 transition-all duration-300 shadow-[0_0_20px_rgba(163,230,53,0.3)]">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Image Lightbox Modal */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
              onClick={() => setActiveImage(null)}
            >
              <button 
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-[110]"
                onClick={() => setActiveImage(null)}
              >
                <X className="w-6 h-6" />
              </button>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-[95vw] max-h-[95vh] rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 dark:border-white/10 bg-white"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={activeImage} alt="Expanded View" className="w-full h-full object-contain max-h-[95vh]" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
