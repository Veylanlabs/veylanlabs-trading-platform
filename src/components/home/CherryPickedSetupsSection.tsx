"use client";

import React, { useState } from 'react';
import { TiltCard } from '@/components/tilt-card';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';

export function CherryPickedSetupsSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Helper to prevent scrolling when modal is open
  React.useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImage]);

  return (
    <div className="sec relative" id="setups">
      <div className="neon-ambient w-[700px] h-[700px] top-[10%] right-[-250px] opacity-[0.05]" />
      <div className="neon-ambient w-[600px] h-[600px] bottom-[10%] left-[-200px] opacity-[0.06]" />

      <div className="mk relative z-10">
        <div className="sec-head center mb-12">
          <div className="badge-interactive mx-auto mb-6">
            <span className="dotg" />
            PROVEN EDGE
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-tighter mt-3">
            <span className="text-white drop-shadow-md">Cherry Picked </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-400 drop-shadow-[0_0_15px_var(--neon-dim)]">Setups</span>
          </h2>
          
          <p className="text-[var(--text-2)] text-lg max-w-2xl mx-auto mt-6">
            A look at how our tools map out <span className="text-white font-medium">high-probability</span> market scenarios. <span className="text-[var(--neon)] font-medium">Precision at every level.</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          <TiltCard>
            <div className="card glass-premium p-0 h-full flex flex-col group overflow-hidden border border-[var(--border)] hover:border-[var(--neon)]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(163,230,53,0.15)]">
              <div 
                className="w-full aspect-video overflow-hidden relative border-b border-white/5 bg-black/40 flex items-center justify-center group/img cursor-pointer"
                onClick={() => setSelectedImage('/image2.png')}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-2)]/80 via-transparent to-transparent z-10 pointer-events-none" />
                
                {/* Expand Button (Top Right) */}
                <div 
                  className="absolute top-4 right-4 z-20 bg-black/80 border border-[var(--neon)]/30 p-3 rounded-full transform translate-y-[-10px] opacity-0 group-hover/img:translate-y-0 group-hover/img:opacity-100 transition-all duration-300 shadow-[0_0_20px_rgba(163,230,53,0.2)] group-hover/img:text-[var(--neon)]"
                >
                  <Maximize2 className="w-5 h-5" />
                </div>
                <img 
                  src="/image2.png" 
                  alt="Setup 1" 
                  className="w-full h-full object-cover object-top block transition-transform duration-700 group-hover:scale-[1.05]" 
                />
              </div>
              <div className="p-6 lg:p-8 bg-[var(--surface-2)]/50 relative z-20 flex-grow flex flex-col justify-start">
                <h4 className="text-xl font-bold font-display uppercase tracking-wider text-white mb-3 group-hover:text-[var(--neon)] transition-colors">Session Exhaustion</h4>
                <p className="text-[var(--text-2)] text-base leading-relaxed font-medium">
                  Clear visualization of momentum exhaustion and trend continuations utilizing the Aether Dashboard.
                </p>
              </div>
            </div>
          </TiltCard>

          <TiltCard>
            <div className="card glass-premium p-0 h-full flex flex-col group overflow-hidden border border-[var(--border)] hover:border-[var(--neon)]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(163,230,53,0.15)]">
              <div 
                className="w-full aspect-video overflow-hidden relative border-b border-white/5 bg-black/40 flex items-center justify-center group/img cursor-pointer"
                onClick={() => setSelectedImage('/image3.png')}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-2)]/80 via-transparent to-transparent z-10 pointer-events-none" />
                
                {/* Expand Button (Top Right) */}
                <div 
                  className="absolute top-4 right-4 z-20 bg-black/80 border border-[var(--neon)]/30 p-3 rounded-full transform translate-y-[-10px] opacity-0 group-hover/img:translate-y-0 group-hover/img:opacity-100 transition-all duration-300 shadow-[0_0_20px_rgba(163,230,53,0.2)] group-hover/img:text-[var(--neon)]"
                >
                  <Maximize2 className="w-5 h-5" />
                </div>
                <img 
                  src="/image3.png" 
                  alt="Setup 2" 
                  className="w-full h-full object-cover object-top block transition-transform duration-700 group-hover:scale-[1.05]" 
                />
              </div>
              <div className="p-6 lg:p-8 bg-[var(--surface-2)]/50 relative z-20 flex-grow flex flex-col justify-start">
                <h4 className="text-xl font-bold font-display uppercase tracking-wider text-white mb-3 group-hover:text-[var(--neon)] transition-colors">Clean Breakouts</h4>
                <p className="text-[var(--text-2)] text-base leading-relaxed font-medium">
                  Spotting clean session breaks and avoiding fake-outs with the Session Range 2.0 framework.
                </p>
              </div>
            </div>
          </TiltCard>

          <TiltCard>
            <div className="card glass-premium p-0 h-full flex flex-col group overflow-hidden border border-[var(--border)] hover:border-[var(--neon)]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(163,230,53,0.15)]">
              <div 
                className="w-full aspect-video overflow-hidden relative border-b border-white/5 bg-black/40 flex items-center justify-center group/img cursor-pointer"
                onClick={() => setSelectedImage('/image4.PNG')}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-2)]/80 via-transparent to-transparent z-10 pointer-events-none" />
                
                {/* Expand Button (Top Right) */}
                <div 
                  className="absolute top-4 right-4 z-20 bg-black/80 border border-[var(--neon)]/30 p-3 rounded-full transform translate-y-[-10px] opacity-0 group-hover/img:translate-y-0 group-hover/img:opacity-100 transition-all duration-300 shadow-[0_0_20px_rgba(163,230,53,0.2)] group-hover/img:text-[var(--neon)]"
                >
                  <Maximize2 className="w-5 h-5" />
                </div>
                <img 
                  src="/image4.PNG" 
                  alt="Setup 3" 
                  className="w-full h-full object-cover object-top block transition-transform duration-700 group-hover:scale-[1.05]" 
                />
              </div>
              <div className="p-6 lg:p-8 bg-[var(--surface-2)]/50 relative z-20 flex-grow flex flex-col justify-start">
                <h4 className="text-xl font-bold font-display uppercase tracking-wider text-white mb-3 group-hover:text-[var(--neon)] transition-colors">Precision Logic</h4>
                <p className="text-[var(--text-2)] text-base leading-relaxed font-medium">
                  High-probability buy and sell signals acting in confluence with deeper market structure shifts.
                </p>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative flex items-center justify-center w-full h-full" onClick={(e) => e.stopPropagation()}>
              <div className="relative group flex items-center justify-center max-w-[95vw] max-h-[90vh]">
                <button 
                  className="absolute -top-6 -right-6 p-4 bg-black border-2 border-[var(--neon)] text-white hover:text-black hover:bg-[var(--neon)] rounded-full transition-all duration-300 z-[100000] shadow-[0_0_30px_rgba(163,230,53,0.4)] hover:scale-110 hover:shadow-[0_0_50px_rgba(163,230,53,0.6)]"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-6 h-6" />
                </button>
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative p-[2px] rounded-3xl bg-gradient-to-br from-[var(--neon)] via-[var(--surface-2)] to-emerald-500 shadow-[0_0_80px_rgba(163,230,53,0.2)] inline-flex max-w-full max-h-full"
                >
                  <div className="rounded-[22px] bg-black flex items-center justify-center overflow-hidden max-w-full max-h-full">
                    <img 
                      src={selectedImage} 
                      alt="Expanded Setup"
                      className="block max-w-[90vw] max-h-[85vh] object-contain w-auto h-auto"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
