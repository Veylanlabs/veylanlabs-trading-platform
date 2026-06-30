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
import { FaTwitter, FaYoutube, FaDiscord, FaInstagram, FaTelegramPlane, FaFacebook } from 'react-icons/fa';


// Indicator data
const INDICATORS = [
  {
    image_path : "/indicator_1.png",
    id: 'veyran-sr-screener',
    name: 'VeylanLabs SR Screener',
    category: 'Screener',
    shortDescription: 'Multi-symbol dashboard built around the Session Range / ORB opening-range workflow. Monitors the first 15-minute candle of selected market sessions across Tokyo, London, and New York opens.',
    fullDescription: `VeylanLabs SR Screener is a compact multi-symbol dashboard built around the Session Range / ORB opening-range workflow.

The screener monitors the first 15-minute candle of selected market sessions and uses that opening range as the main structure for reading price location, directional bias, and breakout behaviour across multiple symbols.

It is designed for traders who want a cleaner way to scan several markets without opening every chart manually.

What VeylanLabs SR Screener Does

The screener helps traders monitor selected symbols around the active session opening range.

It tracks whether price is trading inside, above, or below the first 15-minute session range and highlights when price is breaking out from that range.

The goal is simple:

• Help traders find active opening-range breaks faster
• Help traders compare several symbols from one chart
• Help traders avoid wasting time on inactive markets
• Help traders stay focused on structured Session Range conditions

Opening Range / ORB Logic

The screener is built around the first 15-minute candle of a session.

Once that opening range is formed, the dashboard watches how price behaves around the range high and range low.

The main focus is on:

• Price holding inside the range
• Price moving above the range
• Price moving below the range
• Upside breakout conditions
• Downside breakout conditions
• Directional alignment around the breakout

This makes the screener useful during active market opens such as Tokyo, London, and New York.

Dashboard Columns

Symbol
Shows the selected market or pair being monitored.

Bias
Shows the current directional read.

Long = bullish conditions
Short = bearish conditions
Wait = mixed or unclear conditions

Range
Shows where price is trading compared to the first 15-minute session range.

Above = price is above the opening range
Below = price is below the opening range
Inside = price is still inside the opening range

Break
Shows whether price is breaking the opening range.

Up = upside range break with bullish alignment
Down = downside range break with bearish alignment

How to Use It

Use the screener as a fast scanning tool.

When a symbol shows an active range break, open that chart and review the full structure before making any trading decision.

The screener is not meant to replace full chart analysis. It is designed to help traders quickly identify which markets may deserve closer review during active session openings.

Important Notes

This indicator does not place trades, does not provide financial advice, and does not guarantee any trading outcome.

It is a visual analysis tool for Session Range structure, first 15-minute opening range behaviour, breakout monitoring, and directional context.

Always use proper risk management and confirm the full chart setup before entering any trade.`,
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
//   {
//     image_path : "/indicator_2.png",
//     id: 'veyran-ahl-screener',
//     name: 'VeylanLabs AHL Screener',
//     category: 'Screener',
//     shortDescription: 'Multi-symbol session scanner built around the Asia High / Low trading framework. Helps intraday traders identify which markets to watch during London and New York sessions.',
//     fullDescription: `VeylanLabs AHL Screener is a multi-symbol session scanner built around the Asia High / Low trading framework. The purpose of the script is to help intraday traders quickly identify which markets are worth opening during the London and New York trading sessions.

// This screener is not a random signal table. It is a market-selection tool that combines Asian session range structure, multi-timeframe bias, break conditions, and session-aware filtering into one compact panel.

// Core Concept

// Many intraday traders use the Asian session high and low as key reference levels. After the Asian range is complete, price often reacts around those levels during London and New York. Some markets stay inside the range, some break cleanly, some sweep one side and return, and some move during poor liquidity where no trade should be taken.

// The screener is designed to answer one practical question:

// Which chart deserves attention right now?

// Instead of manually checking every symbol, the trader can use the screener to filter a watchlist and focus on the cleanest markets first.

// How the Screener Works

// The screener checks selected symbols and reads each market through a fixed Asia High / Low structure. It tracks whether the Asian range is still forming, completed, inside, broken, swept, or inactive.

// For each symbol, the table displays:

// Symbol
// Directional bias
// Asia range status
// Break condition
// Current read

// The goal is to show whether a market is waiting, preparing, active, breaking, reacting, or in a no-trade state.

// Asia Range Logic

// During the Asian session, the screener allows the range to form. It does not display breakout setups while the range is still building.

// After the range is complete, the screener compares current 15M price action against the completed Asia High and Asia Low. This allows the table to show whether price is trading inside the range, above the range, below the range, or reacting near the boundaries.

// This helps traders avoid treating an incomplete Asia range as a valid trade structure.

// Session-Aware Behavior

// The screener changes behavior depending on the market session.

// During Asia, the screener focuses on range formation and shows a wait condition.

// Before London, the screener can show preparation status after the range is complete.

// During London and New York, the screener becomes active and looks for symbols reacting to the completed Asia range.

// After New York closes, the screener moves into quiet-zone behavior. This is used to avoid low-liquidity conditions where Asia High / Low setups are no longer active.

// This session filter is important because the same Asia range condition should not be treated the same during active market hours and low-liquidity periods.

// Bias Model

// The screener does not read an Asia break in isolation. It also checks directional context across multiple timeframes.

// The bias model uses higher-timeframe and intraday structure to decide whether a market is leaning long, short, mixed, or not ready. The model is based on trend alignment, price position, directional movement, and strength conditions.

// This helps prevent the screener from treating every break above Asia High or below Asia Low as equal.

// For example, a break above Asia High is not treated the same when higher timeframes are bullish, mixed, or bearish.

// Main Columns

// Symbol
// Shows the selected market being scanned.

// Bias
// Shows whether the market context is leaning long, short, mixed, or pulling against the higher-timeframe direction.

// Asia
// Shows the current Asia range condition. Examples include Forming, Ready, Inside, Above, Below, Sweep H, Sweep L, Quiet, or No Range.

// Break
// Shows whether the market has an active Asia High / Low break condition. Long-side breaks are shown with L, short-side breaks are shown with S, and caution conditions can be shown when price is outside the range but the full context is not clean.

// Read
// Gives the trader a practical action-style overview. Examples include Wait, Prep, Inside, Watch, Open Chart, 5M Entry, Caution, and No Trade.

// The Read column is designed to help the trader decide whether the symbol deserves deeper chart analysis.

// Break Modes

// The screener includes three break modes:

// All
// Shows all confirmed Asia High / Low break conditions.

// Smart
// Filters out breaks that directly conflict with stronger higher-timeframe context. This is designed to reduce lower-quality reads.

// Strict
// Only highlights breaks that align with the higher-timeframe direction. This is the most selective mode.

// These modes allow traders to choose how aggressive or conservative they want the screener to be.`,
//     features: [
//       'Asia High/Low range scanning',
//       'Session-aware filtering',
//       'Multi-timeframe bias model',
//       'Three break modes (All/Smart/Strict)',
//       '15M range-position reading',
//       'Action-style read column'
//     ],
//     icon: BarChart3,
//     badge: 'Invite-only',
//     status: 'Active',
//     color: 'blue'
//   },
  {
    image_path : "/indicator_3.png",
    id: 'aether-asia-high-low',
    name: 'VeylanLabs Aether Asia High Low',
    category: 'Strategy',
    shortDescription: 'Session-based market-structure indicator built around the Asian session high and low. Combines session mapping, range context, and multi-timeframe trend reading.',
    fullDescription: `VeylanLabs Aether Asia H/L is a session-based market-structure indicator built around the Asian session high and low. The purpose of the script is to help intraday traders read the completed Asian range, understand where price is trading in relation to that range, and use London and New York session movement with more structure.

This indicator is not a simple session box and it is not a random buy/sell signal tool. It combines session mapping, range context, multi-timeframe trend reading, momentum/power conditions, previous-day levels, breakout/rejection logic, and a real-time guidance panel into one chart framework.

Core Concept

Many intraday traders use the Asian session as a reference range. After Asia is complete, the high and low of that range often become important decision areas during London and New York. Price can take liquidity above Asia High, take liquidity below Asia Low, break and hold outside the range, reject back inside the range, reclaim the middle of the range, fail a breakout attempt, or continue in the direction of higher-timeframe trend.

Aether Asia H/L is built to organize those conditions visually and give the trader a cleaner read of the session.

How the Asia Range Is Built

During the Asian session, the script builds the session high and session low from price action. While Asia is forming, the indicator does not produce breakout guidance. During this phase, the correct behavior is patience. The trader should let the range form first.

After Asia is complete, the script displays the key levels used for the rest of the trading day:

Asia High
Asia Low
Asia 50% midpoint
Asia range fill
Rest-of-session range projection
Previous Day High
Previous Day Low

These levels become the main decision zones for London and New York.

Session-Aware Behavior

The indicator changes its guidance depending on where the market is in the trading day.

During Asia, the script only shows that the range is forming. No Asia High / Low setup is active yet. Before London, the completed range is prepared and the trader can start watching the important levels. During London, the script reads how price reacts to Asia High, Asia Low, and Asia 50%. During New York, the script continues to use the same completed Asia range to read continuation, rejection, reclaim, or range-bound behavior. After New York, the script switches into quiet-zone behavior and warns that there is no active Asia H/L setup.

This prevents the indicator from pushing setup language during the wrong market conditions.

Trend and Power Model

Aether Asia H/L includes a multi-timeframe trend and power view using 4H, 1H, and 15M context. The internal direction model uses a combination of moving-average alignment, slope, directional movement, volatility expansion, and trend-following confirmation.

The goal of the model is to answer two questions:

Is the market direction clear?
Is the move strong enough to trust, or is the market still mixed/ranging?

The trend row gives a bullish, bearish, or neutral read across the key timeframes. The power row shows whether the market is displaying high, medium, or low strength. This helps traders avoid forcing trades when the range has no clean direction or when the higher timeframes are conflicting.

Aether Guidance Panel

The Aether panel is the main decision-support part of the indicator. It reads the current market state and displays practical guidance based on:

Price position relative to Asia High
Price position relative to Asia Low
Price position relative to Asia 50%
Whether price is inside or outside the Asia range
Whether Asia High or Asia Low has been swept
Whether price has reclaimed the range
Whether price has accepted above or below the range
Whether a breakout is weak, building, or active
Whether London or New York is active
Whether the market is in a quiet no-trade zone
Whether Previous Day High or Previous Day Low is nearby
Whether higher-timeframe bias supports or conflicts with the current move

The panel is designed to guide the trader without forcing a decision. It does not replace judgment. It gives the trader a structured read of the current session state.

Break Candles and Direction Markers

The script includes optional visual direction markers. These markers are designed to appear only after a confirmed 15M candle closes outside the completed Asia range.

A yellow candle can mark the first confirmed 15M break candle outside Asia High or Asia Low. The optional direction markers are:

L for long-side break
S for short-side break

The markers are not active while Asia is forming. They are not intended to appear during quiet-zone conditions. Their purpose is to highlight confirmed range expansion after the Asia range is complete.

Direction Marker Modes

The script includes three marker modes:

All
Shows confirmed Asia High / Low breaks without additional higher-timeframe filtering.

Smart
Filters out breaks that are directly against both higher timeframes.

Strict
Only shows breaks that align with the higher-timeframe direction.

These modes allow traders to choose how selective they want the indicator to be.`,
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
    image_path : "/indicator_4.png",
    id: 'aether-session-range',
    name: 'VeylanLabs Aether Session Range',
    category: 'Indicator',
    shortDescription: 'Guided session range indicator built for traders who want more structure, patience, and clarity around Tokyo, London, and New York market opens.',
    fullDescription: `VeylanLabs Aether Session Range is a guided session range indicator built for traders who want more structure, patience, and clarity around the Tokyo, London, and New York market opens.

Aether is not a random AI buy/sell bot. It is a real trading strategy programmed into session structure, price movement, and real-time chart guidance.

Instead of only showing levels or printing signals, Aether explains what is happening around the session range directly on the chart. The goal is to help traders understand when the range is forming, when a breakout has quality, when caution is needed, and when it is better to wait for a cleaner setup.

This tool is built around a clean session-opening workflow:

Build the range. Wait for confirmation. Use lower timeframes for entry detail. Avoid chasing poor breakouts.

Aether is designed to support decision-making, not replace it. It gives the trader a structured process to follow during the most important intraday trading windows.

Real Trading Strategy, Programmed Into Real-Time Guidance

VeylanLabs Aether SR is based on a structured session range trading approach.

The system watches how price behaves around the opening range and translates that behavior into clear chart guidance. It helps the trader follow the same kind of process a disciplined session trader would use:
wait for the session range to form
avoid trading too early inside the range
wait for a real candle close outside the range
check whether the breakout has quality
avoid chasing large emotional candles
move to 5M for entry detail after confirmation
wait for retests, pullbacks, holds, or continuation
protect trades when the session becomes late
avoid forcing trades when the setup is no longer fresh

Aether is not designed to predict every market move. It is designed to help traders read the session better, stay patient, and make more structured decisions.

What Aether Does

At each major session open, Aether builds a session range and tracks how price reacts around it.

The range becomes the main structure for the session. Price can remain inside the range, break above it, break below it, reject one side, return back inside, or expand away from it.

Aether helps the trader understand these conditions in real time through a visual range system and a mentor-style panel.

The indicator helps answer key questions:

Is the session range ready?
Is price still inside the range?
Has price closed outside the range?
Is the breakout clean or risky?
Is the breakout too weak?
Is the move already late?
Should I wait for a retest?
Should I move to 5M for entry detail?
Has price failed back inside the range?
Is the session becoming stale?
Should I protect profit instead of chasing more?

The purpose is to reduce emotional trading and give the trader a clear session-based process.

Main Features

Session Range Mapping

Aether automatically maps the opening range for the major sessions:

Tokyo
London
New York

The session range gives the trader a clean structure to work from during the active trading window.

Range High, Range Low

Aether marks the main levels of the session range:

Range High
Range Low

These levels help traders identify breakout areas, retests, failed breaks, intraday support, resistance, and important reaction zones.

The goal is not to trade every touch of a level. The goal is to understand how price reacts around the range.

Aether Mentor Panel

The Aether panel is the main guidance tool.

It explains the current market state in simple trading language. The panel can show when the range is forming, when price is inside the range, when a breakout is clean, when caution is needed, and when the session range is no longer fresh.

The panel is designed to make traders stop, read the situation, and follow a structured process before taking action.

Trend and Power Overview

Aether includes a simple trend and power overview to help traders understand the active market environment.

This helps show whether the market is aligned, mixed, strong, weak, or not ready yet.

Instead of forcing trades, Aether encourages traders to wait until direction, timing, and range structure work together.

Clean / Caution / Risk Markers

Aether uses simple visual markers to help classify breakout conditions:

Clean breakout
The breakout is supported and has better structure.

Caution
The breakout may need more confirmation, better acceptance, or a cleaner retest.

Risk / wrong-side breakout
The breakout is lower quality or against the active conditions.

These markers are not meant to replace trader judgment. They are designed to help traders quickly understand breakout quality.

15M Confirmation

The 15-minute chart is the main confirmation timeframe for the session range.

Aether is built around the idea that the session breakout should be confirmed by a proper 15M candle close outside the range.

A wick outside the range is not enough.

This helps traders avoid reacting too early to false breaks, liquidity grabs, or weak candle closes.

The core rule:

15M confirms the breakout.

5M Entry Detail

After a confirmed 15M breakout, Aether guides traders to move to 5M for entry detail.

The 5M chart can be used to look for:

retests
pullbacks
holds
continuation
acceptance outside the range
cleaner entry structure

This is an important part of the system.

Aether is not designed for blind entries directly on a large 15M candle close. A clean 15M breakout shows the area. The 5M chart helps refine the entry.

The core rule:

15M confirms. 5M refines.

Avoid Chasing Large Candles

Large breakout candles can look strong, but they often give poor entries if the trader enters too late.

Aether can warn traders when the breakout candle is large or when the first move may already be extended.

The idea is simple:

Do not chase the first emotional candle. Wait for a pullback, retest, hold, or cleaner continuation before entering.

This helps traders avoid entering at the worst part of the move.

Failed Breaks and Liquidity Grabs

Not every break outside the range is a clean breakout.

Sometimes price breaks one side of the range, traps traders, and then returns back inside. This can create a failed breakout or liquidity grab.

Aether helps identify when price has returned back inside the range or when both sides of the range have been broken.

When the range loses clean control, the setup becomes higher risk.

In those conditions, Aether may guide the trader to wait for a new clean setup instead of forcing a trade.

Late Session Guidance

Aether also helps identify when the session range is becoming less useful.

If price has already expanded, stalled, or the range is no longer fresh, the panel can warn traders not to chase late entries.

This is useful because many traders enter too late, after the best part of the move has already happened.

Aether encourages patience and helps traders recognize when it may be better to wait for the next session.

Trade Protection Notes

When price has already moved and the session is getting late, Aether can remind traders to protect profit.

This can help traders avoid giving back a good move.

The panel may guide the trader to consider:

protecting the position
moving to breakeven
taking partial profit
avoiding late-session overtrading
waiting for the next clean setup

Aether is built to support discipline, not overtrading.

How to Use Aether SR

Open the chart on 15M to track the session range.
Wait for the session range to form.
Avoid trading inside the range unless you have your own separate plan.
Wait for a candle close outside the range.
Read the Aether panel before taking action.
If the breakout is clean, move to 5M for entry detail.
Look for a retest, pullback, hold, or continuation.
Avoid chasing large breakout candles.
If price returns inside the range, wait for a fresh setup.
If the session is late, protect profit or wait for the next session.

The simplest workflow:

15M confirms. 5M refines. Aether guides.

Best Timeframes

Recommended use:

15M for session range confirmation
5M for entry detail
1M only for extra precision if experienced

Higher timeframes can be useful for market context, but they are not intended for session range entry confirmation.

Best Markets

Aether SR can be used on all liquid intraday markets such as:

Forex pairs
Gold
Indices
Crypto
Major liquid instruments

But Indicies is the best option

And It is especially suited for traders who focus on:

session opens and intraday trading
breakout and retest setups
intraday structure
liquidity reactions
continuation after confirmation

What This Indicator Is Not

Aether SR is not a magic buy/sell bot.

It is not designed to guarantee profitable trades or remove the need for trader skill.

It does not replace risk management, position sizing, stop-loss planning, or execution discipline.

Aether is a structure and decision-support tool. It helps the trader read the session, but the trader is still responsible for every trade decision.

Important Trading Reminder

The best trades usually come when structure, direction, timing, and risk all work together.

Aether is designed to help traders wait for those conditions instead of forcing entries too early.

Use the panel as a guide. Let the session range form. Wait for confirmation. Use 5M for cleaner entry detail. Protect profits when the session becomes late.`,
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
            <p className="text-text-2 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Institutional-grade indicators and screeners designed for structural, session-based precision trading.
            </p>
          </motion.div>

          {/* Premium Grid Layout for Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

                <p className="text-text-2 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed font-medium">
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
            <Link href="https://www.facebook.com/profile.php?id=61590814831781" target="_blank" className="text-text-3 hover:text-[var(--neon)] transition-all hover:scale-110">
              <FaFacebook className="w-5 h-5" />
            </Link>
            <Link href="https://www.youtube.com/@VeylanLabs" target="_blank" className="text-text-3 hover:text-[var(--neon)] transition-all hover:scale-110">
              <FaYoutube className="w-5 h-5" />
            </Link>
            <Link href="https://www.instagram.com/Veylanlabs/" target="_blank" className="text-text-3 hover:text-[var(--neon)] transition-all hover:scale-110">
              <FaInstagram className="w-5 h-5" />
            </Link>
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