"use client";

import { useState } from 'react';
import { TrendingUp, Download, Flame, Maximize2, BarChart2 } from 'lucide-react';

const SYMBOLS = [
  { label: 'BTC/USD', tv: 'BINANCE:BTCUSDT' },
  { label: 'ETH/USD', tv: 'BINANCE:ETHUSDT' },
  { label: 'SOL/USD', tv: 'BINANCE:SOLUSDT' },
  { label: 'XRP/USD', tv: 'BINANCE:XRPUSDT' },
];

const liquidationZones = [
  { type: 'Short Liq.', range: '$68,500 – $68,800', value: '$450M', color: 'red', hot: true },
  { type: 'Long Liq.',  range: '$62,100 – $61,900', value: '$320M', color: 'neon', hot: true },
  { type: 'Cleared',    range: '$64,000',            value: 'Swept yesterday', color: 'muted', hot: false },
];

export default function LiquidityMapsPage() {
  const [activeSymbol, setActiveSymbol] = useState(SYMBOLS[0]);

  // TradingView depth-of-market / advanced chart — free embed, no key needed
  const tvSrc = `https://www.tradingview.com/widgetembed/?frameElementId=tv_liq&symbol=${encodeURIComponent(activeSymbol.tv)}&interval=60&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=000000&theme=dark&style=1&timezone=exchange&studies=%5B%22Volume%40tv-basicstudies%22%5D&show_popup_button=1&locale=en`;

  return (
    <>
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-1 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-[var(--neon)]" />
            Liquidity Maps
          </h1>
          <p className="text-muted-foreground">High-density liquidation zones and order block visualization.</p>
        </div>
        <button className="bg-background border border-border text-foreground px-4 py-2.5 rounded-xl font-bold hover:border-[var(--neon)] transition-all flex items-center gap-2 text-sm group">
          <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          Export Data
        </button>
      </div>

      {/* ── Symbol tabs ── */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        {SYMBOLS.map(sym => (
          <button
            key={sym.label}
            onClick={() => setActiveSymbol(sym)}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
              activeSymbol.label === sym.label
                ? 'bg-[var(--neon-dim)] border-[var(--neon)]/50 text-[var(--neon)]'
                : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground bg-background'
            }`}
          >
            {sym.label}
          </button>
        ))}
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

        {/* Live TradingView chart — col-span-2 */}
        <div className="xl:col-span-2 glass-premium rounded-3xl overflow-hidden flex flex-col min-h-[480px]">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <span className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--neon)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--neon)]" />
              </span>
              Live Chart — {activeSymbol.label}
            </span>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-red-500/30 border border-red-500/50 inline-block" />
                High Ask
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[var(--neon-dim)] border border-[var(--neon)]/50 inline-block" />
                High Bid
              </div>
              <a
                href={`https://www.tradingview.com/chart/?symbol=${activeSymbol.tv}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-muted transition-colors ml-1"
                title="Open full chart"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          <iframe
            key={activeSymbol.tv}
            src={tvSrc}
            title={`Liquidity Chart — ${activeSymbol.label}`}
            className="w-full border-0 flex-1"
            style={{ height: '440px' }}
            allow="fullscreen"
            loading="lazy"
          />
        </div>

        {/* Key Liquidation Zones sidebar */}
        <div className="glass-premium rounded-3xl p-6 flex flex-col">
          <h2 className="text-xl font-bold tracking-tight text-foreground mb-6 flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" />
            Key Liquidation Zones
          </h2>

          <div className="space-y-4">
            {liquidationZones.map((zone, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl bg-background relative overflow-hidden group cursor-pointer transition-all ${
                  zone.color === 'red'  ? 'border border-red-500/30 hover:border-red-500' :
                  zone.color === 'neon' ? 'border border-[var(--neon)]/30 hover:border-[var(--neon)]' :
                  'border border-border opacity-60'
                }`}
              >
                {zone.hot && (
                  <div className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l ${
                    zone.color === 'red' ? 'from-red-500/10' : 'from-[var(--neon)]/10'
                  } to-transparent`} />
                )}
                <div className={`text-xs font-bold mb-1 uppercase tracking-wider flex items-center gap-1 ${
                  zone.color === 'red' ? 'text-red-500' : zone.color === 'neon' ? 'text-[var(--neon)]' : 'text-muted-foreground'
                }`}>
                  {zone.type}
                  {zone.hot && <span className="text-[10px] ml-1 opacity-70">HOT</span>}
                </div>
                <div className={`text-xl font-extrabold mb-1 ${zone.color === 'muted' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {zone.range}
                </div>
                <div className="text-sm text-muted-foreground">{zone.value}</div>
              </div>
            ))}
          </div>

          {/* Depth of market mini-legend */}
          <div className="mt-auto pt-6">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Market Depth Legend</p>
            <div className="space-y-2">
              {[
                { label: 'Ultra-high density', color: 'bg-red-500' },
                { label: 'High density',       color: 'bg-amber-500' },
                { label: 'Medium density',     color: 'bg-yellow-400' },
                { label: 'Low density',        color: 'bg-[var(--neon)]' },
              ].map(row => (
                <div key={row.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className={`w-3 h-3 rounded ${row.color} flex-none`} />
                  {row.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Volume Profile note ── */}
      <div className="glass-premium rounded-2xl px-5 py-4 flex items-center gap-3">
        <BarChart2 className="w-5 h-5 text-[var(--neon)] flex-none" />
        <p className="text-sm text-muted-foreground">
          <span className="font-bold text-foreground">Pro tip:</span> Enable the <span className="font-mono text-xs bg-muted px-1 py-0.5 rounded">Volume Profile</span> study in TradingView to overlay visible range POC directly on the chart.
        </p>
      </div>
    </>
  );
}
