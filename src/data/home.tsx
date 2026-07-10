import React from "react";

export const FAQ = [
  [
    "Are these automatic buy/sell signals?",
    "No. VeylanLabs provides premium charting tools, real-time market analysis, and a supportive community. We do not automate your trades or make financial decisions on your behalf. Every trading decision is entirely yours, ensuring you remain fully in control of your risk."
  ],
  [
    "Do I need to know how to trade?", 
    "While having basic market knowledge is helpful, our ecosystem is designed to teach you. Our indicators provide clear context, and our community and educational resources will help you understand market structure, liquidity, and how to execute trades with confidence."
  ],
  [
    "Do your indicators repaint?",
    "Absolutely not. All VeylanLabs indicators operate strictly in real-time with zero repainting. We believe in complete transparency — the signals and levels you see on the chart are exactly what happened live, with no retroactive changes."
  ],
  [
    "Which markets and timeframes does this work on?",
    "Our tools work on any market supported by TradingView — including Forex, Crypto, Indices, Futures, and Stocks. While built around intraday session trading, the methodology scales perfectly across any timeframe from the 1-minute to the daily chart."
  ],
  [
    "Do I need to know how to code?", 
    "Not at all. Everything runs directly inside TradingView through your membership. There is no Pine Script to write, no complex software to install, and no APIs to configure."
  ],
  [
    "Can I cancel anytime?", 
    "Yes. We offer transparent subscriptions with no lock-in contracts. You can cancel your membership at any time, and you will retain full access to all tools and the community until the end of your current billing period."
  ],
];

export const SYMBOLS = [
  {
    id: "BTC",
    name: "Bitcoin",
    chartSymbol: "BITSTAMP:BTCUSD",
    gaugeSymbol: "BITSTAMP:BTCUSD",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=032",
    description: "Digital store of value. Trading 24/7 with massive liquidity sweeps.",
  },
  {
    id: "ETH",
    name: "Ethereum",
    chartSymbol: "BITSTAMP:ETHUSD",
    gaugeSymbol: "BITSTAMP:ETHUSD",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=032",
    description: "Smart contract platform. Highly reactive during London & NY sessions.",
  },
  {
    id: "SPX",
    name: "S&P 500",
    chartSymbol: "FOREXCOM:SPXUSD",
    gaugeSymbol: "FOREXCOM:SPXUSD",
    icon: (
      <svg className="w-4.5 h-4.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: "inline-block" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28m-5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    description: "Benchmark US stock index. The primary driver of session volume.",
  },
  {
    id: "EURUSD",
    name: "EUR/USD",
    chartSymbol: "FX_IDC:EURUSD",
    gaugeSymbol: "FX_IDC:EURUSD",
    icon: (
      <span className="font-bold text-xs text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded" style={{ display: "inline-block" }}>€/$</span>
    ),
    description: "Most liquid currency pair. Perfect for session range expansions.",
  },
  {
    id: "GOLD",
    name: "Gold",
    chartSymbol: "TVC:GOLD",
    gaugeSymbol: "TVC:GOLD",
    icon: (
      <span className="font-bold text-xs text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded" style={{ display: "inline-block" }}>Au</span>
    ),
    description: "Safe haven commodity. Shows explosive breakout patterns on news events.",
  },
];

export const TESTIMONIALS = [
  { name: "Alex T.", role: "FULL-TIME TRADER", text1: "VeylanLabs indicators have completely transformed the way I trade. ", text2: "The edge is real." },
  { name: "Sarah M.", role: "PROP FIRM FUNDED", text1: "I've been trading for 5 years and nothing comes close to this. ", text2: "Absolute game changer." },
  { name: "Marcus L.", role: "SWING TRADER", text1: "The context alerts save me from taking bad setups every single day. ", text2: "Invaluable tool." },
  { name: "David R.", role: "DAY TRADER", text1: "I made back my yearly subscription fee in my first two trades. ", text2: "Highly recommend." },
  { name: "Elena V.", role: "CRYPTO TRADER", text1: "Finally, indicators that actually understand market structure and liquidity. ", text2: "Top tier stuff." },
  { name: "James B.", role: "FULL-TIME TRADER", text1: "The live daily session breakdowns are like a masterclass. ", text2: "I learn something new daily." },
  { name: "Michael C.", role: "SCALPER", text1: "Clean charts, zero lag, and ridiculously accurate levels. ", text2: "Can't trade without it." },
  { name: "Sophia K.", role: "PART-TIME TRADER", text1: "This isn't just an indicator suite, it's a complete trading system. ", text2: "It just works." },
  { name: "Ryan W.", role: "PROP FIRM FUNDED", text1: "I used to overtrade constantly. These tools gave me the patience to wait for ", text2: "the perfect setups." },
  { name: "Thomas N.", role: "SWING TRADER", text1: "The War Room community is the best group of traders I've ever been around. ", text2: "Pure alpha." },
  { name: "Oliver H.", role: "DAY TRADER", text1: "No more second-guessing my entries. The signals are ", text2: "crystal clear." },
  { name: "Emma D.", role: "FULL-TIME TRADER", text1: "Best investment I've made in my trading career. ", text2: "Period." },
];

export const TRADING_MODULES = [
  {
    id: "VeylanLabs SR Screener",
    imagePath: "/indicator_new_1.png",
    title: "VeylanLabs SR Screener",
    badge: "Scanner",
    description: "Scan multiple symbols instantly using the first 15-minute session range. Identify active breakouts and directional bias across Tokyo, London, and New York.",
    details: [
      "Monitor dozens of symbols from one compact dashboard",
      "Track price position — Inside, Above, or Below the opening range",
      "Spot active breakout conditions with directional alignment",
      "Filter out inactive markets and focus on clean setups",
      "Compare multiple symbols without opening every chart manually"
    ],
    videoPath: "/video_1.mp4",
    cta: "Explore SR Screener"
  },
  {
    id: "VeylanLabs Aether SR",
    imagePath: "/indicator_new_2.png",
    title: "VeylanLabs Aether SR",
    badge: "Guidance",
    description: "Guided session range indicator for Tokyo, London, and New York opens. Know when the range is forming, when a breakout is clean, and when caution is needed.",
    details: [
      "Automatically map session ranges for Tokyo, London, and New York",
      "Read breakout quality — Clean, Caution, or Risk",
      "Use 15M for confirmation, 5M for entry refinement",
      "Get plain-language guidance through the Aether Mentor Panel",
      "Avoid chasing large candles and late-session entries"
    ],
    videoPath: "/video_3.mp4",
    cta: "Explore Aether SR"
  },
  {
    id: "VeylanLabs Aether AHL",
    imagePath: "/indicator_new_3.png",
    title: "VeylanLabs Aether AHL",
    badge: "Strategy",
    description: "Session-based market-structure indicator built around the Asian session high and low. Read sweeps, rejections, reclaims, and continuation with clarity.",
    details: [
      "Track Asia High, Asia Low, and Asia 50% midpoint levels",
      "Read multi-timeframe trend and power conditions",
      "Use Smart/Strict modes to filter breakout quality",
      "Session-aware guidance — active from Asia formation through quiet-zone protection",
      "Combine with Previous Day High/Low for additional context"
    ],
    videoPath: "/video_4.mp4",
    cta: "Explore Aether AHL"
  }
];
