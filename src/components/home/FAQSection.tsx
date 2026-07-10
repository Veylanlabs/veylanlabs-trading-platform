"use client";
import React, { useState } from 'react';
import { FAQ } from '@/data/home';

export function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="sec" id="faq">
      <div className="mk">
        <div className="max-w-[720px] mx-auto w-full">
          <div className="flex flex-col items-start text-left mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-[2px] bg-[var(--neon)]"></div>
              <span className="text-[var(--neon)] font-mono text-xs md:text-sm tracking-[0.25em] font-bold uppercase"> QUESTIONS</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-display font-extrabold tracking-tight uppercase leading-[1.1]">
              FREQUENTLY ASKED <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[var(--neon)] to-emerald-400 animate-gradient-x inline-block">QUESTIONS</span>
            </h2>
            <div className="w-16 h-[2px] bg-[var(--neon)] mt-8"></div>
          </div>
          <div className="faq flex flex-col gap-4">
          {FAQ.map((q, i) => (
            <div className={`glass-premium rounded-2xl border ${openFaq === i ? 'border-[var(--neon)] bg-[var(--surface-2)] shadow-[0_0_20px_rgba(16,185,129,0.05)]' : 'border-border hover:border-border-hover'} transition-all duration-300 overflow-hidden`} key={i}>
              <button
                className="cursor-pointer w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className={`font-medium text-lg transition-colors duration-300 ${openFaq === i ? 'text-[var(--neon)]' : 'group-hover:text-[var(--neon)]'}`}>
                  {q[0]}
                </span>

                {/* Animated +/- Icon */}
                <div className="relative w-5 h-5 flex items-center justify-center flex-shrink-0 ml-4">
                  {/* Horizontal line (always visible) */}
                  <div className={`absolute w-full h-[2px] transition-all duration-500 rounded-full ${openFaq === i ? 'bg-[var(--neon)] rotate-180' : 'bg-muted-foreground group-hover:bg-[var(--neon)]'}`} />
                  {/* Vertical line (disappears/rotates when open) */}
                  <div className={`absolute h-full w-[2px] transition-all duration-500 rounded-full ${openFaq === i ? 'bg-[var(--neon)] rotate-90 opacity-0' : 'bg-muted-foreground group-hover:bg-[var(--neon)]'}`} />
                </div>
              </button>

              {/* Animated Answer Body */}
              <div
                className="transition-all duration-500 ease-in-out px-6"
                style={{
                  maxHeight: openFaq === i ? "300px" : "0px",
                  opacity: openFaq === i ? 1 : 0,
                  paddingBottom: openFaq === i ? "20px" : "0px"
                }}
              >
                <p className="text-[var(--text-2)] leading-relaxed text-base pt-2">
                  {q[1]}
                </p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
