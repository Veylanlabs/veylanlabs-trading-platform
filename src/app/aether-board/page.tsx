"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Activity,
  Clock,
  Zap,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sliders,
  PlayCircle
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { FaTwitter, FaYoutube, FaDiscord, FaInstagram, FaTelegramPlane } from 'react-icons/fa';


export default function AetherBoardPage() {

  return (
    <div className="vl">
      {/* Background Glows */}
      <div className="fixed inset-0 z-[-2] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/80 to-[var(--bg)]" />
        <div className="absolute inset-0 bg-mesh opacity-20" />
      </div>

      {/* Navigation */}
      <div className="topnav scrolled">
        <div className="nav-in">
          <Logo />
          <div className="nav-links">
            <Link href="/#features">Features</Link>
            <Link href="/indicators">Indicators</Link>
            <Link href="/#pricing">Pricing</Link>
            <Link href="/#faq">FAQ</Link>
          </div>
          <div className="nav-right" style={{ gap: '16px' }}>
            <ThemeToggle />

          </div>
        </div>
      </div>

      <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '100px', paddingBottom: '80px' }}>
        <div className="mk animate-fade-in-up">

          {/* Back Navigation */}
          <div className="max-w-5xl mx-auto mb-6">
            <Link href="/" className="inline-flex items-center gap-2 text-text-3 hover:text-[var(--neon)] transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="sec-head center mb-12">
            <span className="eyebrow">Aether Suite</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight mt-2 text-white">
              Aether <span className="text-[var(--neon)]">SR</span>
            </h1>
            <p className="text-[var(--text-2)] text-lg max-w-2xl mx-auto mt-4">
              VeylanLabs Aether Session Range is a guided structure indicator built to enforce discipline and patience during Tokyo, London, and New York market opens.
            </p>
          </div>

          {/* Main Visual Display */}
          <div className="max-w-5xl mx-auto rainbow-border mb-16">
            <div className="bg-[var(--bg)] rounded-[14px] overflow-hidden relative p-4 md:p-8">
              <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-full bg-[var(--surface)] border border-border/50 rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src="/aether.png"
                    alt="Aether Bot Interface Detail"
                    className="w-full h-auto object-cover block"
                  />
                </div>
                <div className="mt-4 text-xs font-mono text-text-3 uppercase tracking-widest">
                  Live TradingView Interface Mockup
                </div>
              </div>
            </div>
          </div>

          {/* Core Philosophy Banner */}
          <div className="max-w-5xl mx-auto mb-16 p-6 rounded-2xl border border-border/50 bg-[var(--surface)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon)]/5 to-transparent pointer-events-none" />
            <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono mb-2">Structure Over Prediction</h3>
            <p className="text-xs text-text-2 leading-relaxed">
              Aether SR is not a magical forecasting bot or a simple arrow signal. It is a programmed, session-based rule engine. Instead of printing static alerts, it reads price reaction around key openings in real time and acts as your on-chart mentor, advising you when to trade, when to wait, and when to protect capital.
            </p>
          </div>

          {/* Breakdown Section */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

            {/* Left: Component Details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold uppercase tracking-tight text-white font-display border-b border-border/50 pb-3">
                Interface Breakdown
              </h2>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--neon)]/10 border border-[var(--neon)]/30 flex items-center justify-center text-[var(--neon)]">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-mono uppercase">Multi-Timeframe Trend Board</h3>
                    <p className="text-[11px] text-text-2 mt-1 leading-relaxed">
                      Tracks high-timeframe (1H), intermediate (15M), and trigger (5M) trend directions simultaneously (e.g. Bullish vs Bearish), helping you ensure directional alignment before committing to a setup.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-mono uppercase">Multi-Timeframe Power Rating</h3>
                    <p className="text-[11px] text-text-2 mt-1 leading-relaxed">
                      Evaluates market power and volatility (High, Medium, Low) across the same timeframes. Highlights whether volume is expanding to support a breakout or dying off inside quiet zones.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-mono uppercase">Aether Plain-Language Advisor</h3>
                    <p className="text-[11px] text-text-2 mt-1 leading-relaxed">
                      Instead of ambiguous lines, Aether prints clear instructions based on session dynamics, such as:
                      <span className="block mt-2 font-mono text-[var(--neon)] bg-white/5 border border-white/10 p-2 rounded text-[10px]">
                        "No active session range is valid right now. Wait for a fresh opening range."
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-mono uppercase">Pre-Session Countdown Clock</h3>
                    <p className="text-[11px] text-text-2 mt-1 leading-relaxed">
                      Displays upcoming session transitions (e.g. Pre-London countdowns) so you can get to your charts before key ranges begin to form.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Methodology & Benefits */}
            <div className="glass-premium p-6 md:p-8 rounded-2xl border border-border/50 bg-[var(--surface)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-6 h-6 text-[var(--neon)]" />
                  <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display">
                    Built For Discipline
                  </h2>
                </div>

                <p className="text-[11px] text-text-2 leading-relaxed mb-4">
                  The primary cause of retail trading losses is overtrading during low-liquidity zones or forcing trades when no structured session ranges are valid.
                </p>
                <p className="text-[11px] text-text-2 leading-relaxed mb-4">
                  Aether Bot  directly corrects this behavior. By combining multi-timeframe trends with a literal rule-engine interface on-chart, it enforces discipline and keeps you patient.
                </p>

                <div className="border-t border-border/30 pt-4 mt-6">
                  <h4 className="text-[11px] font-mono text-text-3 font-bold uppercase tracking-wider mb-2">Key Rule Enforcement</h4>
                  <ul className="space-y-2 text-xs text-text-2 font-mono">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--neon)]">✓</span> No fresh range = no session range trade
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--neon)]">✓</span> Old ranges are invalidated before session opens
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--neon)]">✓</span> 15M confirms setups, 5M refines entries
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-border/30">
                <Link href="/#pricing" className="btn btn-primary btn-block justify-center py-3 text-sm">
                  Get access inside membership
                </Link>
              </div>
            </div>

          </div>

          {/* Workflow Methodology */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-white font-display border-b border-border/50 pb-3 mb-8 text-center">
              The Execution Workflow: 15M Confirms, 5M Refines
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-premium p-6 rounded-xl border border-border/50 bg-[var(--surface)] text-center relative">
                <div className="w-10 h-10 rounded-full bg-[var(--neon)]/10 border border-[var(--neon)]/30 flex items-center justify-center text-[var(--neon)] font-mono font-bold text-sm mx-auto mb-4">
                  01
                </div>
                <h3 className="text-sm font-bold text-white uppercase font-mono mb-2">15M Confirmation</h3>
                <p className="text-[11px] text-text-2 leading-relaxed">
                  Avoid false breakouts and wicks. Aether requires a solid 15-minute candle close outside the Range High/Low boundaries to confirm a valid breakout area.
                </p>
              </div>

              <div className="glass-premium p-6 rounded-xl border border-border/50 bg-[var(--surface)] text-center relative">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-bold text-sm mx-auto mb-4">
                  02
                </div>
                <h3 className="text-sm font-bold text-white uppercase font-mono mb-2">5M Entry Refinement</h3>
                <p className="text-[11px] text-text-2 leading-relaxed">
                  Move to the 5M chart to look for retests, pullbacks, and candle support. This protects you from chasing extended breakout wicks on the higher timeframes.
                </p>
              </div>

              <div className="glass-premium p-6 rounded-xl border border-border/50 bg-[var(--surface)] text-center relative">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm mx-auto mb-4">
                  03
                </div>
                <h3 className="text-sm font-bold text-white uppercase font-mono mb-2">Aether Guidance</h3>
                <p className="text-[11px] text-text-2 leading-relaxed">
                  Observe the panel warnings. If the session gets too late or price fails back inside the range, Aether alerts you to protect profits and avoid overtrading.
                </p>
              </div>
            </div>
          </div>

          {/* Breakout Quality Classification */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-white font-display border-b border-border/50 pb-3 mb-8">
              Breakout Quality Classifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-premium p-5 rounded-xl border border-border/50 bg-[var(--surface)] flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-mono">Clean Breakout</h4>
                  <p className="text-[10px] text-text-2 mt-1 leading-relaxed">
                    The breakout candle is well-supported by multi-timeframe trends, offering high-probability setup conditions.
                  </p>
                </div>
              </div>

              <div className="glass-premium p-5 rounded-xl border border-border/50 bg-[var(--surface)] flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-mono">Caution Required</h4>
                  <p className="text-[10px] text-text-2 mt-1 leading-relaxed">
                    Potential liquidity sweep or weak candle expansion. Demands additional confirmation or a cleaner retest before entering.
                  </p>
                </div>
              </div>

              <div className="glass-premium p-5 rounded-xl border border-border/50 bg-[var(--surface)] flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-mono">Risk / Trapped Zone</h4>
                  <p className="text-[10px] text-text-2 mt-1 leading-relaxed">
                    Breakout against current higher timeframe bias or failed break returning inside range. The panel guides you to stand aside.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications & Release Notes Grid */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left: Recommended Markets */}
            <div className="glass-premium p-6 rounded-2xl border border-border/50 bg-[var(--surface)]">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono mb-4">Supported Environment</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-white font-mono uppercase mb-1">Recommended Timeframes</h4>
                  <p className="text-[11px] text-text-2 leading-relaxed">
                    Aether SR functions best with a **15-minute chart** for range breakout confirmations, and a **5-minute chart** to refine your pullback entries.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white font-mono uppercase mb-1">Best Trading Markets</h4>
                  <p className="text-[11px] text-text-2 leading-relaxed">
                    Highly compatible with all liquid intraday instruments (Forex, Gold, major Cryptos). However, **Indices (S&amp;P 500, Nasdaq, DAX)** offer the absolute highest alignment and cleanest session setups.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Release Notes */}
            <div className="glass-premium p-6 rounded-2xl border border-border/50 bg-[var(--surface)]">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono mb-4">Recent Release Notes</h3>

              <div className="space-y-4">
                <div className="border-b border-border/30 pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-white font-mono uppercase">Session Clock Mode Update</span>
                    <span className="text-[10px] font-mono text-text-3">May 22</span>
                  </div>
                  <p className="text-[10px] text-text-2 leading-relaxed">
                    Added settings toggle: **Live** (real-time session clock alignment) and **Backtest/Replay** (matches chart candle timestamps for accurate historical guidance).
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-white font-mono uppercase">Session Selection Logic Fix</span>
                    <span className="text-[10px] font-mono text-text-3">May 23</span>
                  </div>
                  <p className="text-[10px] text-text-2 leading-relaxed">
                    Tokyo, London, and New York sessions now run independently. Turning off individual sessions works correctly without affecting enabled ranges, and calculated bounds detect the true 15M start timestamps.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="foot">
          <div className="fb">
            <Logo />
            <p>See the structure. Discipline, structure, execution — and a community that trades it live.</p>
          </div>
          <div>
            <h5>Product</h5>
            <Link href="/indicators">Indicators</Link>
            <Link href="/#pricing">Pricing</Link>
            <Link href="/login">Log in</Link>
          </div>
          <div>
            <h5>Learn</h5>
            <Link href="/#features">Features</Link>
            <Link href="/#faq">FAQ</Link>
            <Link href="#">Academy</Link>
          </div>
          <div>
            <h5>Company</h5>
            <Link href="#">About</Link>
            <Link href="#">Contact</Link>
            <Link href="#">Terms & Privacy</Link>
          </div>
        </div>

        <div className="foot-bot flex flex-col md:flex-row justify-between items-center gap-6 mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left text-sm text-text-3">
            <span>© 2026 VeylanLabs</span>
            <span className="hidden md:inline">·</span>
            <span>Educational use only · Not financial advice · Trade at your own risk.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]" style={{ color: "var(--neon)" }}>
              <FaTwitter className="w-6 h-6" />
            </Link>
            <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]" style={{ color: "var(--neon)" }}>
              <FaYoutube className="w-6 h-6" />
            </Link>
            <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]" style={{ color: "var(--neon)" }}>
              <FaDiscord className="w-6 h-6" />
            </Link>
            <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]" style={{ color: "var(--neon)" }}>
              <FaInstagram className="w-6 h-6" />
            </Link>
            <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]" style={{ color: "var(--neon)" }}>
              <FaTelegramPlane className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
