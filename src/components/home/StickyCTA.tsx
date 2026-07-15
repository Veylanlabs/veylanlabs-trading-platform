import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function StickyCTA({ isVisible = true }: { isVisible?: boolean }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-[40] w-full"
        >
          {/* Subtle glow above the banner */}
          <div className="absolute -top-4 left-0 right-0 h-4 bg-gradient-to-t from-[var(--neon)]/20 to-transparent pointer-events-none" />
          
          <Link href="/#pricing" className="block w-full">
            <div className="w-full bg-[var(--neon)] text-black font-semibold text-sm hover:brightness-110 transition-all duration-300 py-3 px-4 shadow-[0_-5px_30px_rgba(163,230,53,0.3)] border-t border-[var(--neon)] flex items-center justify-center group overflow-hidden relative">
              
              {/* Shine animation effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 relative z-10 text-center">
                <span className="tracking-wide flex items-center gap-2">
                  <Sparkles className="w-4 h-4 hidden sm:block" />
                  <strong className="font-bold">VeylanLabs is Now Live</strong> <span className="hidden sm:inline">•</span> <span className="sm:hidden"> </span> Join the Early Access
                </span>
                <span className="opacity-40 hidden sm:inline">|</span>
                <span className="flex items-center gap-1 font-bold group-hover:gap-2 transition-all duration-300 mt-1 sm:mt-0">
                  Get Instant Access <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
