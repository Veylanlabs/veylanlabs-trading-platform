// app/indicators/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronRight, 
  Activity, 
  BarChart3, 
  TrendingUp,
  Check,
  X,
  Zap
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { FaTwitter, FaYoutube, FaDiscord, FaInstagram, FaTelegramPlane } from 'react-icons/fa';


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
    emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    blue: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
    purple: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
    amber: 'border-amber-500/30 bg-amber-500/10 text-amber-400'
  };

  return (
    <div className="vl">
      {/* Background */}
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
            <Link href="/indicators" style={{ color: 'var(--neon)', fontWeight: 'bold' }}>Indicators</Link>
            <Link href="/#pricing">Pricing</Link>
            <Link href="/#faq">FAQ</Link>
          </div>
          <div className="nav-right" style={{ gap: '16px' }}>
            <ThemeToggle />

          </div>
        </div>
      </div>

      <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '80px' }}>
        <div className="mk animate-fade-in-up">
          {/* Header */}
          <div className="sec-head center mb-16">
            {/* <Link href="/" className="inline-flex items-center gap-2 text-text-3 hover:text-[var(--neon)] transition-colors mb-6 text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link> */}
            <span className="eyebrow">Indicators & Strategies</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight mt-2">
              VeylanLabs <span className="text-[var(--neon)]">Toolkit</span>
            </h1>
            <p className="text-[var(--text-2)] text-lg max-w-2xl mx-auto mt-4">
              Professional-grade indicators and screeners designed for structured, session-based trading.
            </p>
          </div>

          {/* List View */}
          <div className="max-w-5xl mx-auto space-y-8">
            {INDICATORS.map((indicator, index) => {
              const Icon = indicator.icon;
              const isImageLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={indicator.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`glass-premium rounded-2xl border border-border/50 p-6 hover:border-[var(--neon)] transition-all duration-500 cursor-pointer group relative overflow-hidden`}
                  onClick={() => setSelectedIndicator(indicator)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon)]/0 via-[var(--neon)]/0 to-[var(--neon)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                  
                  <div className={`flex flex-col md:flex-row ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-start`}>
                    {/* Image */}
                    <div className="md:w-2/5 flex-shrink-0">
                      <div className="relative rounded-xl overflow-hidden border border-border/30 bg-[var(--surface-2)] aspect-[16/10]">
                        <Image
                          src={indicator.image_path}
                          alt={indicator.name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            // Fallback if image doesn't exist
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        {/* Fallback gradient if image fails */}
                        {/* <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface-2)] to-[var(--surface-3)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-text-3 text-sm font-mono">Chart Preview</span>
                        </div> */}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:w-3/5 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl border ${colorMap[indicator.color]} backdrop-blur-sm`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-text group-hover:text-[var(--neon)] transition-colors">
                              {indicator.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-mono text-text-3">{indicator.category}</span>
                              <span className="w-1 h-1 rounded-full bg-text-3" />
                              <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-border/50 bg-[var(--surface-2)] text-text-3">
                                {indicator.badge}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-text-2 text-sm leading-relaxed mb-4 flex-grow">
                        {indicator.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {indicator.features.slice(0, 3).map((feature, i) => (
                          <span key={i} className="text-[10px] font-mono font-medium px-2 py-1 rounded-full bg-[var(--surface-2)] border border-border/30 text-text-3">
                            {feature}
                          </span>
                        ))}
                        {indicator.features.length > 3 && (
                          <span className="text-[10px] font-mono font-medium px-2 py-1 rounded-full bg-[var(--surface-2)] border border-border/30 text-text-3">
                            +{indicator.features.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border/30 mt-auto">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-xs font-mono text-text-3">{indicator.status}</span>
                        </div>
                        <button className="text-sm font-bold text-[var(--neon)] flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Premium CTA Section */}
          <div className="mt-24 mb-32 relative">
            <div className="absolute inset-0 bg-[var(--neon)] opacity-[0.03] blur-3xl rounded-[3rem]" />
            <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center border border-border/50 flex flex-col items-center justify-center bg-[var(--surface)] shadow-[0_0_50px_rgba(16,185,129,0.1)] transition-all duration-700 hover:border-[var(--neon)] group">
              
              {/* Background gradient/textures */}
              <div className="absolute inset-0 bg-mesh opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg)]/50 to-[var(--bg)] opacity-80" />

              <div className="relative z-10 max-w-3xl flex flex-col items-center">
                <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--neon)]/50 bg-[var(--neon)]/10 text-[var(--neon)] text-xs font-mono font-bold tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-[var(--neon)] shadow-[0_0_8px_var(--neon)] animate-pulse" />
                  FULL SUITE ACCESS
                </div>

                <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight mb-5 leading-tight uppercase">
                  Ready to trade with <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-400">these tools?</span>
                </h2>

                <p className="text-[var(--text-2)] text-base md:text-lg mb-10 max-w-xl leading-relaxed">
                  Join VeylanLabs today to unlock the complete indicator suite, real-time alerts, and start trading with professional-grade structure.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
                  <Link href="/#pricing" className="w-full sm:w-auto group/btn">
                    <button className="relative overflow-hidden w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-[var(--neon)] to-emerald-500 rounded-xl text-[var(--bg)] text-sm font-extrabold uppercase tracking-widest transition-all duration-300 group-hover/btn:-translate-y-1 group-hover/btn:shadow-[0_10px_40px_rgba(16,185,129,0.5)]">
                      <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[50%] transition-transform duration-1000 ease-out" />
                      Get Access Now
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" strokeWidth={3} />
                    </button>
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-6 mt-8 text-[11px] text-[var(--text-3)] font-mono font-bold tracking-widest uppercase">
                  <span className="flex items-center gap-2 text-[var(--neon)]"><Check className="w-3 h-3" /> Instant Access</span>
                  <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
                  <span className="flex items-center gap-2"><Check className="w-3 h-3 text-[var(--text-3)]" /> All Indicators Included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="foot">
          <div className="fb">
            <Logo />
            <p>See the structure. Discipline, structure, execution — and a community that trades it live.</p>
          </div>
          <div>
            <h5>Product</h5>
            <Link href="#features">Indicators</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="/login">Log in</Link>
          </div>
          <div>
            <h5>Learn</h5>
            <Link href="#features">Features</Link>
            <Link href="#faq">FAQ</Link>
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

      {/* Detail Modal */}
      {selectedIndicator && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300 overflow-y-auto" onClick={() => setSelectedIndicator(null)}>
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-premium rounded-2xl border border-border/50 bg-[var(--bg)] p-6 md:p-10" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 text-text-3 hover:text-[var(--neon)] transition-colors p-2"
              onClick={() => setSelectedIndicator(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className={`p-3 rounded-xl border ${colorMap[selectedIndicator.color]} backdrop-blur-sm flex-shrink-0`}>
                {React.createElement(selectedIndicator.icon, { className: "w-6 h-6" })}
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-text">{selectedIndicator.name}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs font-mono text-text-3">{selectedIndicator.category}</span>
                  <span className="w-1 h-1 rounded-full bg-text-3" />
                  <span className="text-xs font-mono text-text-3">{selectedIndicator.badge}</span>
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-text-2 text-sm leading-relaxed">
                {selectedIndicator.fullDescription}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/30">
              <h4 className="font-bold text-text mb-4">Key Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedIndicator.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-text-2 text-sm">
                    <Check className="w-4 h-4 text-[var(--neon)] flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/#pricing" className="flex-1">
                <button className="btn btn-primary w-full py-3">
                  Get Access to This Indicator
                </button>
              </Link>
              <button 
                className="btn btn-ghost px-6 py-3"
                onClick={() => setSelectedIndicator(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}