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
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {/* Background Video */}
        {/* Background Video (Dark Mode Only) */}
        <div className="absolute inset-0 z-[0] pointer-events-none overflow-hidden hidden dark:block bg-black">
          <SeamlessVideoLoop src="/test_2.mp4" />

          {/* Dark overlays to hide video artifacts and ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050505_100%)]" />
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
          <div className="badge-interactive" style={{ margin: "0 auto 24px" }}>
            <span className="dotg" />
            PREMIUM TRADING ECOSYSTEM
          </div>

          <h1 className="font-display uppercase tracking-tighter text-slate-900 dark:text-white drop-shadow-md dark:drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]" style={{
            fontSize: "clamp(48px, 8vw, 80px)",
            lineHeight: 1.0,
            marginBottom: 24,
            fontWeight: 800,
            maxWidth: "900px",
            margin: "0 auto 24px",
            position: "relative"
          }}>
            Stop chasing signals.<br />
            Understand <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-600 dark:to-emerald-400 drop-shadow-[0_0_15px_var(--neon-dim)]">{heroWords[heroWordIdx]}</span>
          </h1>

          <p className="text-slate-600 dark:text-[var(--text-2)] drop-shadow-sm dark:drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]" style={{
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
            <a href="#aether-edge" className="btn btn-ghost w-full sm:w-auto text-center" style={{ padding: "14px 28px", fontSize: 16 }}>View features</a>
          </div>
        </div>
      </div>
    </div>
  );
}
