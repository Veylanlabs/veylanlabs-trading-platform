"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, Activity, Crosshair, Maximize2, X, Scan, Compass, ArrowRightLeft, Target, Waves, ShieldX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

export function ToolkitSection() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="sec relative overflow-hidden py-24" id="indicators">
      {/* Background Ambient Glows */}
      <div className="neon-ambient w-[800px] h-[800px] top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" />

      <div className="mk relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto mb-28 relative"
        >
          {/* Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-[radial-gradient(ellipse_at_center,var(--neon)_0%,transparent_50%)] opacity-[0.03] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/5 dark:border-white/5 bg-slate-100/50 dark:bg-white/5 backdrop-blur-md shadow-sm mb-8 relative z-10">
            <span className="w-2 h-2 rounded-full bg-[var(--neon)] shadow-[0_0_8px_var(--neon)] animate-pulse" />
            <span className="text-xs md:text-sm font-mono font-bold tracking-widest text-slate-700 dark:text-slate-300">
              THE VEYLANLABS TOOLKIT
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold uppercase tracking-tight mb-8 leading-[1.05] relative z-10">
            <span className="text-slate-900 dark:text-white">Decode the </span>
            <span className="relative inline-block mt-2 md:mt-0">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] via-emerald-400 to-[var(--neon)]">Market Matrix</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[var(--neon)] via-emerald-400 to-[var(--neon)] blur-2xl opacity-20 dark:opacity-30 mix-blend-plus-lighter" />
            </span>
          </h2>

          <div className="w-24 h-1 rounded-full bg-gradient-to-r from-transparent via-[var(--neon)] to-transparent opacity-50 mb-8 relative z-10" />

          <p className="text-slate-600 dark:text-slate-400 text-xl md:text-2xl font-medium leading-relaxed max-w-3xl text-balance relative z-10">
            We stripped away the noise. What remains is a ruthless, institutional-grade framework designed to keep you on the right side of the trend, every single session.
          </p>
        </motion.div>

        {/* Feature 1: Session Range */}
        <div className="mb-32">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 mb-12">
            {/* Video Left */}
            <div className="w-full lg:w-7/12 relative">
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
                    className="relative bg-slate-100 dark:bg-black w-full overflow-hidden group cursor-pointer"
                    onClick={() => setActiveImage('/sessionrange2.0.png')}
                  >
                    <img src="/sessionrange2.0.png" alt="Session Range Interface" className="w-full h-auto block transition-transform duration-500 group-hover:scale-105 invert dark:invert-0 hue-rotate-180 dark:hue-rotate-0" />
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
            <div className="w-full lg:w-5/12 flex flex-col items-start text-left lg:pt-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full border border-[var(--neon)]/40 flex items-center justify-center text-[var(--neon)] shadow-[0_0_15px_rgba(163,230,53,0.15)] bg-[var(--neon)]/5">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-3xl lg:text-4xl font-display font-bold uppercase tracking-tight text-slate-900 dark:text-white">
                  SESSION RANGE 2.0 INDICATOR
                </h3>
              </div>

              <p className="text-[var(--text-2)] text-lg leading-relaxed font-medium">
                The Session Range 2.0 indicator helps you trade the market with structure from day one. It marks the key opening ranges directly on your TradingView chart, gives live feedback as price breaks, rejects, or continues from those levels, and uses built-in Aether guidance to show the next logical step. Instead of guessing what to do, you get a clear framework for managing the trade yourself — then improve as your skill and screen time grow. Pure price action movement.
              </p>
            </div>
          </div>

          {/* Feature 1 Bullets Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-black/5 dark:border-white/5 w-full">
            {[
              {
                title: "Marks the chart for you",
                desc: "Automatically maps the opening range, key highs, lows, and breakout areas.",
                icon: Scan
              },
              {
                title: "Guides you through each session",
                desc: "Aether gives you live feedback as the session develops on what to do.",
                icon: Compass
              },
              {
                title: "Shows structured long/short indications",
                desc: "Helps you manage your buy or sell opportunities with your own risk rules.",
                icon: ArrowRightLeft
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-start gap-4 group p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-[var(--neon)]/30 hover:bg-[var(--neon)]/5 transition-all duration-300">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--neon)]/10 flex items-center justify-center border border-[var(--neon)]/30 shadow-[0_0_15px_rgba(163,230,53,0.15)] group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5 text-[var(--neon)]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-900 dark:text-white font-bold mb-2 text-lg tracking-tight">{item.title}</span>
                  <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature 2: Asia High Low */}
        <div className="mb-32">
          <div className="flex flex-col-reverse lg:flex-row items-start gap-12 lg:gap-16 mb-12">

            {/* Content Left */}
            <div className="w-full lg:w-5/12 flex flex-col items-start text-left lg:pt-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[var(--neon)]/10 border border-[var(--neon)]/30 flex items-center justify-center text-[var(--neon)] shadow-[0_0_15px_rgba(163,230,53,0.2)]">
                  <Crosshair className="w-6 h-6" />
                </div>
                <h3 className="text-3xl lg:text-4xl font-display font-bold uppercase tracking-tight text-slate-900 dark:text-white">
                  The Asia High Low
                </h3>
              </div>

              <p className="text-[var(--text-2)] text-xl leading-relaxed font-medium mb-10">
                Our premier market structure framework. Read liquidity sweeps, spot market rejections, and ride trend continuations anchored to the Asian session boundaries.
              </p>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  window.history.pushState(null, '', '#pricing');
                }}
                className="mt-4 btn btn-primary btn-lg shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_40px_rgba(163,230,53,0.5)] uppercase tracking-widest text-sm font-bold flex items-center gap-3 inline-block"
              >
                <span>Get Instant Access</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Video Right */}
            <div className="w-full lg:w-7/12 relative">
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
                    className="relative bg-slate-100 dark:bg-black w-full overflow-hidden group cursor-pointer"
                    onClick={() => setActiveImage('/asiahighrange.png')}
                  >
                    <img src="/asiahighrange.png" alt="Asia High Low Interface" className="w-full h-auto block transition-transform duration-500 group-hover:scale-105 invert dark:invert-0 hue-rotate-180 dark:hue-rotate-0" />
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

          {/* Feature 2 Bullets Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-black/5 dark:border-white/5 w-full">
            {[
              { text: "Highly accurate Buy/Sell zones", icon: Target },
              { text: "Identifies major liquidity sweeps", icon: Waves },
              { text: "Precise stop-loss invalidation", icon: ShieldX }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-[var(--neon)]/30 hover:bg-[var(--neon)]/5 transition-all duration-300">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--neon)]/10 flex items-center justify-center border border-[var(--neon)]/30 shadow-[0_0_15px_rgba(163,230,53,0.15)] group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5 text-[var(--neon)]" />
                </div>
                <span className="text-slate-900 dark:text-white font-bold text-lg tracking-tight">{item.text}</span>
              </div>
            ))}
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
                <img src={activeImage} alt="Expanded View" className="w-full h-full object-contain max-h-[95vh] invert dark:invert-0 hue-rotate-180 dark:hue-rotate-0" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
