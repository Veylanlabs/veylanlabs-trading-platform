// app/indicators/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ChevronRight,
  Activity,
  BarChart3,
  TrendingUp,
  Check,
  X,
  Zap,
  Code2
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { TiltCard } from '@/components/tilt-card';
import { FaTwitter, FaYoutube, FaInstagram, FaTelegramPlane, FaFacebook } from 'react-icons/fa';


// Indicator data
const INDICATORS = [
  {
    image_path: "/indicator_1.png",
    id: 'veyran-sr-screener',
    name: 'VeylanLabs SR Screener',
    category: 'Screener',
    shortDescription: 'Multi-symbol dashboard built around the Session Range / ORB opening-range workflow. Monitors the first 15-minute candle of selected market sessions across Tokyo, London, and New York opens.',
    fullDescription: `VeylanLabs SR Screener is a compact multi-symbol dashboard built around the Session Range / ORB workflow.

It monitors the first 15-minute candle of selected market sessions (Tokyo, London, New York) and uses that opening range to read price location, bias, and breakouts across multiple symbols.

What It Does

The screener is designed for traders who want a cleaner way to scan several markets without opening every chart manually:

🟢 Find active opening-range breaks faster
🟢 Compare several symbols from one chart
🟢 Avoid wasting time on inactive markets
🟢 Stay focused on structured Session Range conditions

Dashboard Columns

Symbol
The selected market being monitored.

Bias
The current directional read:
🟢 Long = bullish conditions
🔴 Short = bearish conditions
🟡 Wait = mixed or unclear

Range
Price location vs. the 15M session range:
▲ Above = price is above opening range
▼ Below = price is below opening range
Inside = price is still inside the range

Break
Active opening range breaks:
✅ Up / Down = aligned breakout
❌ Up / Down = unaligned breakout direction
⚠ Up / Down = caution, mixed conditions
— = no active range break

How to Use It

Use the screener as a fast scanning tool. When a symbol shows an active range break, open that chart and review the full structure. It is designed to quickly identify which markets deserve closer review, not to replace full chart analysis.

Important Notes

This is a visual analysis tool for Session Range structure. It does not place trades or guarantee outcomes. Always use proper risk management and confirm the full chart setup before entering any trade.`,
    features: [
      'Multi-symbol dashboard',
      '15-minute opening range tracking',
      'Bias detection (Long/Short/Wait)',
      'Range position monitoring (Above/Below/Inside)',
      'Breakout condition alerts',
      'Tokyo, London, New York session support'
    ],
    icon: Activity,
    badge: 'Invite-only',
    status: 'Active',
    color: 'emerald'
  },
  {
    image_path: "/indicator_2.png",
    id: 'veyran-ahl-screener',
    name: 'VeylanLabs AHL Screener',
    category: 'Screener',
    shortDescription: 'Multi-symbol session scanner built around the Asia High / Low trading framework. Helps intraday traders identify which markets to watch during London and New York sessions.',
    fullDescription: `VeylanLabs AHL Screener is a multi-symbol session scanner built around the Asia High / Low trading framework. 

It helps intraday traders quickly filter multiple markets and identify which charts are worth opening during London and New York.

What Makes It Different

This is not a random signal table. It is a smart market-selection tool that combines Asian session range structure, multi-timeframe bias, break conditions, and session-aware filtering:

🟢 Asia-forming protection (ignores incomplete ranges)
🟢 Multi-timeframe bias model
🟢 Break condition filtering
🟢 Quiet-zone protection (ignores low liquidity)
🟢 Fast watchlist filtering for active sessions

Dashboard Columns

Symbol
The selected market being scanned.

Bias
The current multi-timeframe directional bias:
🟢 Long = bullish context
🔴 Short = bearish context
🟡 Mixed = conflicting or unready context

Asia
The current Asia range condition:
• Forming / Ready
• Inside / Above / Below
• Sweep H / Sweep L
• Quiet / No Range

Break
Active Asia High / Low break conditions:
✅ L = Long-side break
✅ S = Short-side break
⚠ Caution = Price is outside range, but context is unclean

Read
Practical action-style overview:
• Wait / Prep / Inside / Watch
• 🟢 Open Chart / 5M Entry
• ⚠ Caution / No Trade

Break Modes

Choose how aggressive or conservative the screener should be:
🔹 All = Shows all confirmed breaks
🔹 Smart = Filters out breaks that directly conflict with higher-timeframes
🔹 Strict = Only highlights breaks perfectly aligned with the higher-timeframe trend

How to Use It

Use the screener as a watchlist filter during London and New York. Look for symbols showing clean activity, and open the chart when it says "Open Chart" or "5M Entry". 

Important Notes

The AHL Screener is a decision-support tool, not a magic signal bot. It does not replace proper chart analysis or risk management. Always combine it with your own market understanding and trading plan.`,
    features: [
      'Asia High/Low range scanning',
      'Session-aware filtering',
      'Multi-timeframe bias model',
      'Three break modes (All/Smart/Strict)',
      '15M range-position reading',
      'Action-style read column'
    ],
    icon: BarChart3,
    badge: 'Invite-only',
    status: 'Active',
    color: 'blue'
  },
  {
    image_path: "/indicator_3.png",
    id: 'aether-asia-high-low',
    name: 'VeylanLabs Aether Asia High Low',
    category: 'Strategy',
    shortDescription: 'Session-based market-structure indicator built around the Asian session high and low. Combines session mapping, range context, and multi-timeframe trend reading.',
    fullDescription: `VeylanLabs Aether Asia H/L is a session-based market-structure indicator built around the Asian session high and low. 

It helps intraday traders read the completed Asian range, understand where price is trading in relation to that range, and execute London and New York session movements with structured precision.

What Makes It Different

This is not a simple session box or a random buy/sell signal tool. It combines session mapping, multi-timeframe trend reading, momentum/power conditions, previous-day levels, breakout/rejection logic, and a real-time guidance panel.

🟢 Automatic Asia range mapping
🟢 Multi-timeframe trend and power model
🟢 Range breakout and rejection states
🟢 Previous Day High / Low context
🟢 Real-time Aether Guidance Panel

How the Asia Range Is Built

During the Asian session, the script builds the session high and low. While Asia is forming, the indicator demands patience. After completion, it plots the key levels used for the rest of the day:
• Asia High & Low
• Asia 50% Midpoint & Range Fill
• Rest-of-session Projection
• Previous Day High & Low

Trend and Power Model

Aether includes a multi-timeframe view (4H, 1H, 15M) using moving-average alignment, slope, directional movement, and volatility to answer two questions:
1. Is the market direction clear?
2. Is the move strong enough to trust?

Aether Guidance Panel

The panel is the core decision-support tool. It reads the current market state and displays practical guidance, taking into account:
🔹 Price position relative to Asia H/L and 50%
🔹 Whether breakouts are weak, building, or active
🔹 Whether London or New York is active
🔹 Whether the market is in a quiet no-trade zone

Break Candles & Direction Markers

Visual markers appear only after a confirmed 15M candle closes outside the completed Asia range. 
✅ L = Confirmed long-side break
✅ S = Confirmed short-side break

Modes:
🔹 All = Shows all confirmed breaks
🔹 Smart = Filters out breaks directly against higher-timeframes
🔹 Strict = Only shows breaks aligned perfectly with the trend

Recommended Workflow

1. Use 15M for the main Asia range read.
2. Let Asia fully form first.
3. Watch how price reacts to Asia High/Low during London/NY.
4. Use the Aether panel for market-state guidance.
5. Use 5M only for entry detail after 15M structure is clear.

Important Risk Notice

Aether Asia H/L is a decision-support tool, not a magic bot. It does not replace proper chart analysis or risk management. Always combine it with your own trading plan.`,
    features: [
      'Asian session range mapping',
      'Multi-timeframe trend reading',
      'Power/strength analysis',
      'Real-time guidance panel',
      'Breakout and rejection states',
      'Previous Day High/Low context'
    ],
    icon: TrendingUp,
    badge: 'Invite-only',
    status: 'Active',
    color: 'purple'
  },
  {
    image_path: "/indicator_4.png",
    id: 'aether-session-range',
    name: 'VeylanLabs Aether Session Range',
    category: 'Indicator',
    shortDescription: 'Guided session range indicator built for traders who want more structure, patience, and clarity around Tokyo, London, and New York market opens.',
    fullDescription: `VeylanLabs Aether Session Range is a guided session range indicator built for traders who want more structure, patience, and clarity around the Tokyo, London, and New York market opens.

This tool is built around a clean session-opening workflow:
Build the range. Wait for confirmation. Use lower timeframes for entry detail. Avoid chasing poor breakouts.

What Aether Does

At each major session open, Aether builds a session range and tracks how price reacts around it. It answers key questions in real-time through a visual range system and a mentor-style panel:
• Is the session range ready?
• Has price closed outside the range?
• Is the breakout clean or risky?
• Is the move already late?
• Should I wait for a retest or protect profit?

Main Features

🟢 Session Range Mapping (Tokyo, London, New York)
🟢 Aether Mentor Panel for real-time market-state guidance
🟢 Trend and Power Overview (aligned, mixed, strong, weak)
🟢 Clean / Caution / Risk breakout markers

15M Confirms, 5M Refines

The system is built on this core rule: 15M confirms. 5M refines.
A wick outside the range is not enough. Aether demands a proper 15M candle close outside the range for confirmation. After confirmation, Aether guides you to move to the 5M chart to look for retests, pullbacks, holds, or cleaner entry structure.

Clean / Caution / Risk Markers

Aether classifies breakout conditions visually:
✅ Clean breakout = Supported with good structure.
⚠️ Caution = May need more confirmation or a cleaner retest.
❌ Risk = Lower quality or against active conditions.

Late Session & Trade Protection

When price has already moved and the session is getting late, Aether warns traders not to chase entries. It reminds you to protect profit, move to breakeven, or wait for the next clean setup to prevent giving back a good move.

Best Timeframes & Markets

🔹 Timeframes: 15M for confirmation, 5M for entry detail.
🔹 Markets: All liquid intraday markets (Forex, Gold, Crypto), but Indices are the best option.

Important Trading Reminder

Aether SR is not a magic buy/sell bot. It is a decision-support tool. The best trades come when structure, direction, timing, and risk all work together. Let the session range form. Wait for confirmation. Use 5M for cleaner entry detail.`,
    features: [
      'Session range mapping (Tokyo/London/NY)',
      'Aether mentor panel guidance',
      'Clean/Caution/Risk markers',
      '15M confirmation logic',
      '5M entry refinement',
      'Late session protection'
    ],
    icon: Zap,
    badge: 'Invite-only',
    status: 'Active',
    color: 'amber'
  }
];

export default function IndicatorsPage() {

  const [selectedIndicator, setSelectedIndicator] = useState<typeof INDICATORS[0] | null>(null);

  const colorMap: Record<string, string> = {
    emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]',
    blue: 'border-blue-500/30 bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]',
    purple: 'border-purple-500/30 bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    amber: 'border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
  };

  return (
    <div className="vl min-h-screen bg-[var(--bg)] text-text selection:bg-[var(--neon)]/30">
      {/* Dynamic Backgrounds */}
      <div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/90 to-[var(--bg)]" />
        <div className="absolute inset-0 bg-mesh opacity-20" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--neon)]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--neon)]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      </div>

      {/* Navigation */}
      <div className="topnav scrolled border-b border-white/5 backdrop-blur-xl bg-[var(--bg)]/80">
        <div className="nav-in max-w-7xl mx-auto px-6">
          <Logo />
          <div className="nav-links hidden md:flex items-center gap-8">
            <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/indicators" className="active">Indicators</Link>
            <Link href="/#testimonials" className="hover:text-white transition-colors">Testimonials</Link>
            <Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link>
          </div>
          <div className="nav-right flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>

      <main className="relative pt-32 pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">

          {/* Enhanced Hero Section */}
          {/* Enhanced Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-24 relative"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--neon)]/30 bg-[var(--neon)]/10 text-[var(--neon)] text-xs font-mono font-bold tracking-widest mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[var(--neon)] shadow-[0_0_8px_var(--neon)] animate-pulse" />
              PROFESSIONAL SUITE
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold uppercase tracking-tight leading-[1.1] mb-6">
              VeylanLabs <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-400 drop-shadow-sm">Toolkit</span>
            </h1>

            {/* Subtitle with controlled line breaks */}
            <div className="max-w-3xl mx-auto">
              <p className="text-text-2 text-center text-lg md:text-xl font-medium leading-relaxed">
                Institutional-grade indicators and screeners
                <br className="hidden sm:block" />
                designed for structural, session-based precision trading.
              </p>
            </div>
          </motion.div>
          {/* Premium Grid Layout for Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {INDICATORS.map((indicator, index) => {
              const Icon = indicator.icon;

              return (
                <TiltCard key={indicator.id} className="h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="h-full group cursor-pointer relative rounded-2xl glass-premium border border-border/40 hover:border-[var(--neon)]/60 transition-all duration-500 overflow-hidden bg-[var(--surface)] hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.15)] flex flex-col"
                    onClick={() => setSelectedIndicator(indicator)}
                  >
                    {/* Hover Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon)]/0 via-[var(--neon)]/0 to-[var(--neon)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    {/* Image Header with Gradient Mask */}
                    <div className="relative h-56 w-full overflow-hidden bg-[#050505]">
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent z-10" />
                      <Image
                        src={indicator.image_path}
                        alt={indicator.name}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      {/* Top Badges */}
                      <div className="absolute top-4 right-4 z-20 flex gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-border/50 bg-black/60 backdrop-blur-md text-text-3">
                          {indicator.category}
                        </span>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-[var(--neon)]/40 bg-[var(--neon)]/10 text-[var(--neon)] backdrop-blur-md">
                          {indicator.badge}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow relative z-20">
                      <div className="flex items-center gap-4 mb-4 min-h-[64px]">
                        <div className={`p-3 rounded-xl border ${colorMap[indicator.color]} backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-text group-hover:text-[var(--neon)] transition-colors leading-tight">
                          {indicator.name}
                        </h3>
                      </div>

                      <p className="text-text-2 text-sm leading-relaxed mb-6 flex-grow">
                        {indicator.shortDescription}
                      </p>

                      <div className="flex items-center justify-between pt-5 border-t border-border/30 mt-auto">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                          <span className="text-xs font-mono font-medium text-text-3">{indicator.status}</span>
                        </div>
                        <span className="text-sm font-bold text-[var(--neon)] flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              );
            })}
          </div>

          {/* Enhanced CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-32 relative max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 bg-[var(--neon)] opacity-[0.04] blur-[100px] rounded-[4rem]" />
            <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center border border-[var(--neon)]/30 bg-[var(--surface)] shadow-[0_0_80px_rgba(16,185,129,0.15)] group">

              {/* Pulsing glow line at top */}
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--neon)] to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

              <div className="absolute inset-0 bg-mesh opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg)]/60 to-[var(--bg)] opacity-90" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--neon)]/50 bg-[var(--neon)]/15 text-[var(--neon)] text-xs font-mono font-bold tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--neon)] shadow-[0_0_8px_var(--neon)] animate-pulse" />
                  COMPLETE ACCESS
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight mb-6 leading-tight uppercase">
                  Ready to trade with <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-400 drop-shadow-sm">these tools?</span>
                </h2>

                <p className="text-text-2 text-center text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                  Join VeylanLabs today to unlock the complete indicator suite, real-time alerts, and start trading with professional-grade structure.
                </p>

                <Link href="/#pricing" className="group/btn relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[var(--neon)] to-emerald-500 rounded-xl blur opacity-30 group-hover/btn:opacity-60 transition duration-500" />
                  <button className="mt-10 relative flex items-center justify-center gap-3 px-12 py-5 bg-[var(--surface-2)] border border-[var(--neon)]/50 hover:bg-[var(--neon)] hover:border-[var(--neon)] rounded-xl text-text hover:text-black text-base font-extrabold uppercase tracking-widest transition-all duration-300 transform group-hover/btn:-translate-y-1">
                    Get Access Now
                    <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={3} />
                  </button>
                </Link>

                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mt-10 text-xs text-[var(--text-3)] font-mono font-bold tracking-widest uppercase">
                  <span className="flex items-center gap-2 text-[var(--neon)] drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]"><Check className="w-4 h-4" /> Instant Access</span>
                  <span className="hidden sm:block w-1 h-1 rounded-full bg-[var(--border)]" />
                  <span className="flex items-center gap-2"><Check className="w-4 h-4" /> All Indicators</span>
                  <span className="hidden sm:block w-1 h-1 rounded-full bg-[var(--border)]" />
                  <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Live Community</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="footer relative z-10 bg-[#050505]">
        <div className="foot max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="fb md:col-span-2">
            <Logo />
            <p className="mt-6 max-w-md text-text-3 leading-relaxed">See the structure. Discipline, structure, execution — and a community that trades it live.</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6 tracking-wide">Product</h5>
            <div className="flex flex-col gap-4">
              <Link href="/#pricing" className="text-text-3 hover:text-[var(--neon)] transition-colors">Pricing</Link>
            </div>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6 tracking-wide">Company</h5>
            <div className="flex flex-col gap-4">
              <Link href="/terms" className="text-text-3 hover:text-[var(--neon)] transition-colors">Terms</Link>
              <Link href="/privacy" className="text-text-3 hover:text-[var(--neon)] transition-colors">Privacy</Link>
            </div>
          </div>
        </div>

        <div className="foot-bot max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left text-sm text-text-3">
            <span>© 2026 VeylanLabs</span>
            <span className="hidden md:inline">·</span>
            <span>Educational use only · Not financial advice</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group flex items-center justify-center">
              <Link href="https://www.facebook.com/profile.php?id=61590814831781" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]" style={{ color: "var(--neon)" }}>
                <FaFacebook className="w-6 h-6" />
              </Link>
              <div className="absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-[#0a0a0a] text-[var(--neon)] text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-md border border-[var(--neon)]/40 shadow-[0_0_15px_rgba(163,230,53,0.3)] pointer-events-none whitespace-nowrap z-50 font-bold">
                Facebook
              </div>
            </div>
            <div className="relative group flex items-center justify-center">
              <Link href="https://t.me/Veylanlabs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]" style={{ color: "var(--neon)" }}>
                <FaTelegramPlane className="w-6 h-6" />
              </Link>
              <div className="absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-[#0a0a0a] text-[var(--neon)] text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-md border border-[var(--neon)]/40 shadow-[0_0_15px_rgba(163,230,53,0.3)] pointer-events-none whitespace-nowrap z-50 font-bold">
                Telegram
              </div>
            </div>
            <div className="relative group flex items-center justify-center">
              <Link href="https://www.youtube.com/@VeylanLabs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]" style={{ color: "var(--neon)" }}>
                <FaYoutube className="w-6 h-6" />
              </Link>
              <div className="absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-[#0a0a0a] text-[var(--neon)] text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-md border border-[var(--neon)]/40 shadow-[0_0_15px_rgba(163,230,53,0.3)] pointer-events-none whitespace-nowrap z-50 font-bold">
                YouTube
              </div>
            </div>
            <div className="relative group flex items-center justify-center">
              <Link href="https://www.instagram.com/Veylanlabs/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]" style={{ color: "var(--neon)" }}>
                <FaInstagram className="w-6 h-6" />
              </Link>
              <div className="absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-[#0a0a0a] text-[var(--neon)] text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-md border border-[var(--neon)]/40 shadow-[0_0_15px_rgba(163,230,53,0.3)] pointer-events-none whitespace-nowrap z-50 font-bold">
                Instagram
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Slide-over Detail Panel */}
      <AnimatePresence>
        {selectedIndicator && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm cursor-pointer"
              onClick={() => setSelectedIndicator(null)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[100] w-full md:w-[600px] bg-[#080808] border-l border-border/20 shadow-2xl flex flex-col h-full overflow-hidden"
            >
              {/* Panel Header */}
              <div className="flex items-start justify-between p-6 md:p-8 border-b border-border/10 bg-[#050505]/80 backdrop-blur-xl relative z-10">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl border ${colorMap[selectedIndicator.color]} backdrop-blur-sm shadow-lg`}>
                    {React.createElement(selectedIndicator.icon, { className: "w-6 h-6" })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white leading-tight">{selectedIndicator.name}</h2>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs font-mono font-medium text-[var(--neon)]">{selectedIndicator.category}</span>
                      <span className="w-1 h-1 rounded-full bg-text-3" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-text-3">{selectedIndicator.badge}</span>
                    </div>
                  </div>
                </div>
                <button
                  className="p-2 rounded-full hover:bg-white/5 text-text-3 hover:text-white transition-colors"
                  onClick={() => setSelectedIndicator(null)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Panel Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">

                {/* Image Preview inside panel */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border/20 mb-8 bg-[#030303]">
                  <Image
                    src={selectedIndicator.image_path}
                    alt={selectedIndicator.name}
                    fill
                    className="object-cover opacity-90"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent opacity-80" />
                </div>

                {/* Key Features Inline List */}
                <div className="mb-10">
                  <h4 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--neon)] mb-5 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> Core Capabilities
                  </h4>
                  <div className="flex flex-col gap-3">
                    {selectedIndicator.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="mt-0.5 w-4 h-4 rounded-full bg-[var(--neon)]/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-[var(--neon)]" />
                        </div>
                        <span className="text-text-2 text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Description */}
                <div>
                  <h4 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--neon)] mb-4 flex items-center gap-2">
                    <Code2 className="w-4 h-4" /> Deep Dive
                  </h4>
                  <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-p:text-text-3 prose-strong:text-white prose-strong:font-bold">
                    <div className="whitespace-pre-wrap">
                      {selectedIndicator.fullDescription}
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel Footer */}
              <div className="p-6 md:p-8 border-t border-border/10 bg-[#050505] flex gap-4">
                <Link href="/#pricing" className="flex-1">
                  <button className="w-full relative overflow-hidden group flex items-center justify-center gap-2 py-4 bg-[var(--neon)] hover:bg-emerald-400 text-black font-extrabold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                    Unlock Access
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}