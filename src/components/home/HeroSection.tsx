import React, { useState, useEffect } from 'react';
import { SeamlessVideoLoop } from '@/components/seamless-video-loop';

export function HeroSection() {
  const heroWords = ["Structure.", "Liquidity.", "the Trend.", "the Market."];
  const [heroWordIdx, setHeroWordIdx] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setHeroWordIdx((prev) => (prev + 1) % heroWords.length);
    }, 2500);
    return () => clearInterval(wordInterval);
  }, []);

  return (
    <div className="mk animate-fade-in-up" style={{
      margin: 0,
      padding: 0,
      width: "100%",
      maxWidth: "100%"
    }}>
      <div className="hero" style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        minHeight: "100svh",
        margin: 0,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {/* Background Video */}
        <div className="absolute inset-0 z-[0] pointer-events-none overflow-hidden block bg-[#F8FAFC] dark:bg-[#050505]">
          <div className="absolute inset-0 block dark:hidden">
            <SeamlessVideoLoop src="/World_map_animation_data_waves_202607221221.mp4" />
          </div>
          <div className="absolute inset-0 hidden dark:block">
            <SeamlessVideoLoop src="/World_map_animation_data_waves_202607221221.mp4" />
          </div>

          {/* Overlays to hide video artifacts and ensure text readability */}
          <div className="absolute inset-0 bg-white/20 dark:bg-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F8FAFC]/30 to-[#F8FAFC] dark:from-transparent dark:via-[#050505]/60 dark:to-[#050505]" />

          {/* Central soft white glow specifically behind the text to ensure perfect contrast without washing out the whole video */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[1000px] h-[50svh] bg-white/70 blur-[100px] rounded-[50%] pointer-events-none dark:hidden" />

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#F8FAFC_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_40%,#050505_100%)]" />
        </div>

        {/* Content */}
        <div style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1200px",
          padding: "40px 20px",
          margin: "0 auto",
          textAlign: "center"
        }}>
          <div className="badge-interactive text-slate-900 font-semibold border-black/15 bg-white/60 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.05)] dark:bg-transparent dark:shadow-none dark:font-normal dark:text-white/90 dark:border-white/20" style={{ margin: "0 auto 24px" }}>
            <span className="dotg" />
            PREMIUM TRADING ECOSYSTEM
          </div>



          <h1 className="font-display uppercase tracking-tighter text-slate-900 drop-shadow-none dark:text-white dark:drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]" style={{
            fontSize: "clamp(48px, 8vw, 80px)",
            lineHeight: 1.0,
            marginBottom: 24,
            fontWeight: 800,
            maxWidth: "900px",
            margin: "0 auto 24px",
            position: "relative"
          }}>
            Stop chasing signals.<br />
            Understand <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-[#00ffcc] drop-shadow-none dark:drop-shadow-[0_0_20px_rgba(163,230,53,0.3)]">{heroWords[heroWordIdx]}</span>
          </h1>

          <p className="text-slate-800 font-medium drop-shadow-none dark:font-normal dark:text-slate-200 dark:drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]" style={{
            fontSize: "19px",
            marginBottom: 36,
            maxWidth: "600px",
            margin: "0 auto 36px",
            lineHeight: 1.6
          }}>
            VeylanLabs is built around a real human trading method, programmed directly into TradingView to help traders find cleaner setups, better timing, and more disciplined execution.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#pricing" className="btn btn-primary hover-pulse-glow w-full sm:w-auto text-center" style={{ padding: "14px 28px", fontSize: 16 }}>Start trading smarter</a>
            <a href="#aether-edge" className="btn btn-ghost w-full sm:w-auto text-center text-slate-900 font-semibold bg-white/50 backdrop-blur-md border-black/15 shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:bg-white/80 dark:bg-transparent dark:shadow-none dark:font-normal dark:text-white dark:border-white/20 dark:hover:bg-white/10" style={{ padding: "14px 28px", fontSize: 16 }}>View features</a>
          </div>
        </div>
      </div>
    </div>
  );
}
