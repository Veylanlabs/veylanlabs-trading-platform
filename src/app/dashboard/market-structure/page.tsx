"use client";

import { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Filter,
  RefreshCw,
  Clock,
  Maximize2,
} from 'lucide-react';

const TIMEFRAMES: Record<string, string> = {
  '15M': '15',
  '1H':  '60',
  '4H':  '240',
  '1D':  'D',
};

const SYMBOLS = ['BTCUSD', 'ETHUSD', 'SOLUSD', 'XRPUSD'];

const mockAssets = [
  { symbol: 'BTC/USD', trend: 'Bullish',  timeframe: '1H', structure: 'HH, HL',       bias: 'LONG',  shift: '12 mins ago' },
  { symbol: 'ETH/USD', trend: 'Bearish',  timeframe: '1H', structure: 'LH, LL',       bias: 'SHORT', shift: '45 mins ago' },
  { symbol: 'SOL/USD', trend: 'Neutral',  timeframe: '1H', structure: 'Consolidation', bias: 'WAIT',  shift: '2 hrs ago'   },
  { symbol: 'XRP/USD', trend: 'Bullish',  timeframe: '1H', structure: 'HH, HL',       bias: 'LONG',  shift: '1 hr ago'    },
];

export default function MarketStructurePage() {
  const [activeTimeframe, setActiveTimeframe] = useState('1H');
  const [activeSymbol, setActiveSymbol]       = useState('BTCUSD');

  const tvInterval = TIMEFRAMES[activeTimeframe] || '60';

  // TradingView Advanced Chart — free, no API key needed
  const tvSrc = `https://www.tradingview.com/widgetembed/?frameElementId=tv_chart&symbol=BINANCE%3A${activeSymbol}&interval=${tvInterval}&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=000000&theme=dark&style=1&timezone=exchange&studies=%5B%5D&show_popup_button=1&popup_width=1000&popup_height=650&locale=en`;

  return (
    <>
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-1 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-[var(--neon)]" />
            Market Structure
          </h1>
          <p className="text-muted-foreground">Multi-timeframe structural analysis and bias confirmation.</p>
        </div>

        {/* Timeframe switcher */}
        <div className="flex items-center gap-2 glass-panel p-1 rounded-xl">
          {Object.keys(TIMEFRAMES).map(tf => (
            <button
              key={tf}
              onClick={() => setActiveTimeframe(tf)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTimeframe === tf
                  ? 'bg-[var(--neon)] text-background shadow-[0_0_10px_var(--neon)]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* ── Symbol tabs ── */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        {SYMBOLS.map(sym => (
          <button
            key={sym}
            onClick={() => setActiveSymbol(sym)}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
              activeSymbol === sym
                ? 'bg-[var(--neon-dim)] border-[var(--neon)]/50 text-[var(--neon)]'
                : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground bg-background'
            }`}
          >
            {sym.replace('USD', '/USD')}
          </button>
        ))}
      </div>

      {/* ── Live TradingView Chart ── */}
      <div className="glass-premium rounded-3xl overflow-hidden mb-6 relative">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <span className="text-sm font-bold text-foreground flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--neon)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--neon)]" />
            </span>
            Live Chart — {activeSymbol.replace('USD', '/USD')} · {activeTimeframe}
          </span>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Powered by TradingView</span>
            <a
              href={`https://www.tradingview.com/chart/?symbol=BINANCE:${activeSymbol}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
              title="Open in TradingView"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
        <iframe
          key={`${activeSymbol}-${activeTimeframe}`}
          src={tvSrc}
          title={`TradingView Chart — ${activeSymbol}`}
          className="w-full border-0 block"
          style={{ height: '520px' }}
          allow="fullscreen"
          loading="lazy"
        />
      </div>

      {/* ── Bottom row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Macro Bias card */}
        <div className="glass-premium rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--neon)] opacity-5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-15 transition-opacity duration-500" />
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Macro Bias (BTC)</h3>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-4xl font-extrabold text-[var(--neon)]">BULLISH</span>
            <TrendingUp className="w-7 h-7 text-[var(--neon)] mb-1" />
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Price is maintaining a series of Higher Highs (HH) and Higher Lows (HL) on the Daily timeframe.
            Key structural support at $62,400 holding firm.
          </p>
        </div>

        {/* Structure shifts — col-span-2 */}
        <div className="lg:col-span-2 glass-premium rounded-3xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold tracking-tight text-foreground">Recent Structure Shifts (CHoCH)</h2>
            <button className="text-muted-foreground hover:text-[var(--neon)] transition-colors p-2 glass-panel rounded-lg">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-background border border-[var(--neon)]/30 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--neon)] shadow-[0_0_10px_var(--neon)]" />
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--neon-dim)] flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-[var(--neon)]" />
                </div>
                <div>
                  <div className="font-bold">ETH/USD <span className="text-xs text-muted-foreground font-normal ml-2">15m Timeframe</span></div>
                  <div className="text-sm text-foreground/80">Bearish Change of Character detected at $3,450.</div>
                </div>
              </div>
              <div className="text-right hidden sm:block flex-none">
                <div className="text-xs text-muted-foreground flex items-center justify-end gap-1 mb-1"><Clock className="w-3 h-3" /> 2 mins ago</div>
                <div className="text-xs font-bold bg-[var(--neon-dim)] text-[var(--neon)] px-2 py-1 rounded">ACTION REQUIRED</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/50" />
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <div className="font-bold">SOL/USD <span className="text-xs text-muted-foreground font-normal ml-2">1H Timeframe</span></div>
                  <div className="text-sm text-foreground/80">Bullish Break of Structure (BOS) confirmed above $145.</div>
                </div>
              </div>
              <div className="text-right hidden sm:block flex-none">
                <div className="text-xs text-muted-foreground flex items-center justify-end gap-1 mb-1"><Clock className="w-3 h-3" /> 45 mins ago</div>
                <div className="text-xs font-bold bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded">LOGGED</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Active Scanners Table ── */}
      <div className="glass-premium rounded-3xl p-6 mt-6 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Active Market Scanners</h2>
          <button className="p-2 text-muted-foreground hover:text-[var(--neon)] transition-colors glass-panel rounded-lg">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <th className="pb-4 pl-4">Asset</th>
                <th className="pb-4">Current Trend</th>
                <th className="pb-4">Structure</th>
                <th className="pb-4">System Bias</th>
                <th className="pb-4 text-right pr-4">Last Shift</th>
              </tr>
            </thead>
            <tbody>
              {mockAssets.map((asset, i) => (
                <tr
                  key={i}
                  onClick={() => setActiveSymbol(asset.symbol.replace('/', '').replace(' ', ''))}
                  className="border-b border-border/50 hover:bg-background/50 transition-colors cursor-pointer group"
                >
                  <td className="py-4 pl-4 font-bold text-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[var(--neon)] shadow-[0_0_5px_var(--neon)]" />
                      {asset.symbol}
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      asset.trend === 'Bullish' ? 'bg-[var(--neon-dim)] text-[var(--neon)] border border-[var(--neon)]/30' :
                      asset.trend === 'Bearish' ? 'bg-red-500/10 text-red-500 border border-red-500/30' :
                      'bg-muted text-muted-foreground border border-border'
                    }`}>
                      {asset.trend}
                    </span>
                  </td>
                  <td className="py-4 font-mono text-sm">{asset.structure}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-1 font-bold">
                      {asset.bias === 'LONG'  && <ArrowRight className="w-4 h-4 text-[var(--neon)] -rotate-45" />}
                      {asset.bias === 'SHORT' && <ArrowRight className="w-4 h-4 text-red-500 rotate-45" />}
                      {asset.bias === 'WAIT'  && <ArrowRight className="w-4 h-4 text-muted-foreground" />}
                      <span className={
                        asset.bias === 'LONG'  ? 'text-[var(--neon)]' :
                        asset.bias === 'SHORT' ? 'text-red-500' :
                        'text-muted-foreground'
                      }>{asset.bias}</span>
                    </div>
                  </td>
                  <td className="py-4 text-right pr-4 text-sm text-muted-foreground">{asset.shift}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">Click any row to load its chart above</p>
      </div>
    </>
  );
}
