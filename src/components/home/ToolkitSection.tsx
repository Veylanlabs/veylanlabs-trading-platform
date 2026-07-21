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

          {/* Section Separator */}
          <div className="w-full flex items-center justify-center gap-4 mb-16 opacity-60 relative z-10">
            <div className="h-[2px] w-24 md:w-48 bg-gradient-to-r from-transparent to-[var(--neon)]" />
            <Target className="w-8 h-8 text-[var(--neon)]" />
            <div className="h-[2px] w-24 md:w-48 bg-gradient-to-l from-transparent to-[var(--neon)]" />
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight mb-8 leading-[1.05] relative z-10 text-white drop-shadow-xl">
            THE VEYLANLABS TOOLKIT
          </h2>

          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[var(--neon)]/30 bg-[var(--neon)]/10 text-[var(--neon)] text-sm md:text-base font-mono font-bold tracking-widest mb-10 relative z-10 shadow-[0_0_15px_rgba(163,230,53,0.15)] backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--neon)] shadow-[0_0_8px_var(--neon)] animate-pulse" />
            DECODE THE MARKET MATRIX
          </div>
          
          <div className="w-32 h-1 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 mb-10 relative z-10" />

          <p className="text-slate-600 dark:text-slate-400 text-xl md:text-2xl font-medium leading-relaxed max-w-3xl text-balance relative z-10">
            We stripped away the noise. What remains is a ruthless, institutional-grade framework designed to keep you on the right side of the trend, every single session.
          </p>
        </motion.div>

        {/* Feature 1: Session Range */}
        <div className="mb-32 relative">
          <div className="rounded-3xl md:rounded-[40px] border-2 md:border-[3px] border-[var(--neon)] p-5 md:p-10 lg:p-12 shadow-[0_0_40px_rgba(163,230,53,0.2)] bg-[#0A0A0A]/90 dark:bg-[#050505]/90 backdrop-blur-xl relative overflow-hidden w-full mx-auto max-w-full">
            {/* Ambient inner glow */}
            <div className="absolute top-0 left-1/4 w-1/2 h-full bg-[var(--neon)]/10 blur-[120px] pointer-events-none z-0" />
            
            <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 relative z-10 mb-12">
            {/* Video Left */}
            <div className="w-full lg:w-7/12 relative">
              <div className="absolute -inset-10 bg-[var(--neon)]/10 blur-[100px] rounded-full pointer-events-none z-0" />
              <div className="w-full relative hover:-translate-y-2 transition-transform duration-700 hover:shadow-[0_0_120px_rgba(163,230,53,0.25)] group z-10">
                <div className="bg-slate-50 dark:bg-[#0f0f13] rounded-2xl overflow-hidden relative z-10 border-2 border-[var(--neon)]/40 shadow-[0_20px_50px_rgba(163,230,53,0.15)] ring-1 ring-[var(--neon)]/20 transform-gpu">
                  <div className="h-6 md:h-8 w-full bg-slate-100/90 dark:bg-[#1c1c22]/90 backdrop-blur border-b border-[var(--neon)]/20 flex items-center px-4 gap-2 rounded-t-[14px]">

                    <div className="absolute left-1/2 -translate-x-1/2 text-[9px] md:text-[10px] text-slate-500 dark:text-white/30 font-mono tracking-widest uppercase">
                      Session Range 2.0
                    </div>
                  </div>
                  <div
                    className="relative bg-slate-100 dark:bg-black w-full overflow-hidden rounded-b-[14px] group cursor-pointer transform-gpu"
                    onClick={() => setActiveImage(mounted && resolvedTheme === 'light' ? '/sessionrange2_light.png' : '/sessionrange2.0.png')}
                  >
                    <img 
                      src={mounted && resolvedTheme === 'light' ? '/sessionrange2_light.png' : '/sessionrange2.0.png'} 
                      alt="Session Range Interface" 
                      className="w-full h-auto block rounded-b-[14px]" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-b-[14px]">
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
                <h3 className="text-3xl lg:text-4xl font-display font-bold uppercase tracking-tight text-white">
                  SESSION RANGE 2.0 INDICATOR
                </h3>
              </div>

              <p className="text-slate-300 text-lg leading-relaxed font-medium">
                The Session Range 2.0 indicator helps you trade the market with structure from day one. It marks the key opening ranges directly on your TradingView chart, gives live feedback as price breaks, rejects, or continues from those levels, and uses built-in Aether guidance to show the next logical step. Instead of guessing what to do, you get a clear framework for managing the trade yourself — then improve as your skill and screen time grow. Pure price action movement.
              </p>
            </div>
          </div>

          {/* Feature 1 Bullets Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/10 w-full relative z-10">
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
              <div key={i} className="flex flex-col items-start gap-2 group p-4 rounded-xl bg-[#111111]/80 dark:bg-[#111111]/80 border border-white/5 hover:border-[var(--neon)]/40 hover:bg-[#1a1a1a]/90 transition-all duration-300 relative z-10 shadow-lg cursor-pointer">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--neon)]/10 flex items-center justify-center border border-[var(--neon)]/30 shadow-[0_0_15px_rgba(163,230,53,0.15)] group-hover:scale-110 transition-transform">
                  <item.icon className="w-4 h-4 text-[var(--neon)]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold mb-1 text-sm md:text-base tracking-tight leading-snug">{item.title}</span>
                  <span className="text-slate-400 text-xs leading-relaxed">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>

        {/* Feature 2: Asia High Low */}
        <div className="relative">
          <div className="rounded-3xl md:rounded-[40px] border-2 md:border-[3px] border-[var(--neon)] p-5 md:p-10 lg:p-12 shadow-[0_0_40px_rgba(163,230,53,0.2)] bg-[#0A0A0A]/90 dark:bg-[#050505]/90 backdrop-blur-xl relative overflow-hidden w-full mx-auto max-w-full">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-1/4 w-1/2 h-full bg-[var(--neon)]/10 blur-[120px] pointer-events-none z-0" />
            
            <div className="flex flex-col-reverse lg:flex-row items-start gap-12 lg:gap-16 relative z-10 mb-12">

            {/* Content Left */}
            <div className="w-full lg:w-5/12 flex flex-col items-start text-left lg:pt-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[var(--neon)]/10 border border-[var(--neon)]/30 flex items-center justify-center text-[var(--neon)] shadow-[0_0_15px_rgba(163,230,53,0.2)]">
                  <Crosshair className="w-6 h-6" />
                </div>
                <h3 className="text-3xl lg:text-4xl font-display font-bold uppercase tracking-tight text-white">
                  AETHER AHL INDICATOR
                </h3>
              </div>

              <p className="text-slate-300 text-lg leading-relaxed font-medium mb-10">
                Aether AHL is built to show traders the active direction around the Asian session range. It marks the Asia High and Asia Low, tracks whether price is trading above, below, or inside the range, and gives clear long or short signals when the setup starts to develop with the intelligently built Aether engine.
                <br /><br />
                Instead of guessing which side to trade, Aether gives live feedback on the chart so you can see the current bias, follow the right direction, and manage the opportunity with your own risk rules. No more trading blindly.
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
              <div className="w-full relative hover:-translate-y-2 transition-transform duration-700 hover:shadow-[0_0_120px_rgba(163,230,53,0.25)] group z-10">
                <div className="bg-slate-50 dark:bg-[#0f0f13] rounded-2xl overflow-hidden relative z-10 border-2 border-[var(--neon)]/40 shadow-[0_20px_50px_rgba(163,230,53,0.15)] ring-1 ring-[var(--neon)]/20 transform-gpu">
                  <div className="h-6 md:h-8 w-full bg-slate-100/90 dark:bg-[#1c1c22]/90 backdrop-blur border-b border-[var(--neon)]/20 flex items-center px-4 gap-2 rounded-t-[14px]">

                    <div className="absolute left-1/2 -translate-x-1/2 text-[9px] md:text-[10px] text-slate-500 dark:text-white/30 font-mono tracking-widest uppercase">
                      Asia High Low Tracker
                    </div>
                  </div>
                  <div
                    className="relative bg-slate-100 dark:bg-black w-full overflow-hidden rounded-b-[14px] group cursor-pointer transform-gpu"
                    onClick={() => setActiveImage(mounted && resolvedTheme === 'light' ? '/asiahighrange_light.png' : '/asiahighrange.png')}
                  >
                    <img 
                      src={mounted && resolvedTheme === 'light' ? '/asiahighrange_light.png' : '/asiahighrange.png'} 
                      alt="Asia High Low Interface" 
                      className="w-full h-auto block transition-transform duration-500 group-hover:scale-105 rounded-b-[14px]" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-b-[14px]">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/10 w-full relative z-10">
            {[
              { 
                title: "Shows Directional Bias", 
                desc: "See if price is leaning long, short, or still waiting inside the Asia range.",
                icon: Target 
              },
              { 
                title: "Gives Long Or Short setups", 
                desc: "Highlights structured buy or sell opportunities when the setup starts to develop.",
                icon: Waves 
              },
              { 
                title: "Guides Trade Management", 
                desc: "Aether gives live feedback so you know when to follow, wait, or avoid the setup.",
                icon: ShieldX 
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-start gap-2 group p-4 rounded-xl bg-[#111111]/80 dark:bg-[#111111]/80 border border-white/5 hover:border-[var(--neon)]/40 hover:bg-[#1a1a1a]/90 transition-all duration-300 relative z-10 shadow-lg cursor-pointer">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--neon)]/10 flex items-center justify-center border border-[var(--neon)]/30 shadow-[0_0_15px_rgba(163,230,53,0.15)] group-hover:scale-110 transition-transform">
                  <item.icon className="w-4 h-4 text-[var(--neon)]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold mb-1 text-sm md:text-base tracking-tight leading-snug">{item.title}</span>
                  <span className="text-slate-400 text-xs leading-relaxed">{item.desc}</span>
                </div>
              </div>
            ))}
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
