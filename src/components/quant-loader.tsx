"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function QuantLoader({ className = "w-8 h-8 text-[var(--neon)]", ...props }: any) {
  return (
    <motion.svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Outer glowing track */}
      <motion.circle 
        cx="50" cy="50" r="46" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeOpacity="0.15" 
        className="drop-shadow-[0_0_8px_currentColor]"
      />

      {/* Main complex spinning track */}
      <motion.circle 
        cx="50" cy="50" r="40" 
        stroke="currentColor" 
        strokeWidth="3.5" 
        strokeDasharray="15 15 40 10" 
        strokeLinecap="round" 
        className="origin-center drop-shadow-[0_0_5px_currentColor]"
        animate={{ rotate: 360 }}
        transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
      />

      {/* Secondary reverse-spinning track */}
      <motion.circle 
        cx="50" cy="50" r="28" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeDasharray="30 40" 
        strokeLinecap="round" 
        className="origin-center opacity-80"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
      />

      {/* Inner pulsating core */}
      <motion.circle 
        cx="50" cy="50" r="10" 
        fill="currentColor" 
        className="origin-center drop-shadow-[0_0_12px_currentColor]"
        animate={{ 
          scale: [0.6, 1.3, 0.6],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
      />
      
      {/* Radar scanning line effect */}
      <motion.line
        x1="50" y1="50" x2="50" y2="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="origin-center opacity-60"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
      />
      
      {/* Extra floating data particles */}
      <motion.circle
        cx="50" cy="14" r="3"
        fill="currentColor"
        className="origin-center drop-shadow-[0_0_8px_currentColor]"
        animate={{ rotate: 360, scale: [1, 1.5, 1] }}
        transition={{ 
          rotate: { duration: 2, ease: "linear", repeat: Infinity },
          scale: { duration: 1, ease: "easeInOut", repeat: Infinity }
        }}
      />
    </motion.svg>
  );
}
