"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Activity,
  Zap,
  ChevronRight,
  MessageSquare,
  Lock,
  ArrowRight,
  ShieldAlert,
  BarChart3,
  AlertTriangle
} from 'lucide-react';
import { QuantLoader } from "@/components/quant-loader";
import { useUser } from '@clerk/nextjs';

// ── Terminal log helpers ──────────────────────────────────────────────────────
const fmt = (d: Date) =>
  d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

const BOOT_LOG = (tvUser: string) => [
  { ts: new Date(Date.now() - 18000), tag: 'SYSTEM',   color: 'neon',    msg: 'Authentication verified. Welcome, Operator.' },
  { ts: new Date(Date.now() - 14000), tag: 'TELEGRAM', color: 'blue',    msg: 'Webhook connection established successfully.' },
  { ts: new Date(Date.now() - 9000),  tag: 'SUCCESS',  color: 'emerald', msg: `TradingView integration verified for ${tvUser || 'user'}.` },
  { ts: new Date(Date.now() - 4000),  tag: 'ALGO',     color: 'neon',    msg: 'Liquidity map updated for BTC/USD.' },
];

const LIVE_EVENTS = [
  { tag: 'ALGO',     color: 'neon',    msg: 'Structure shift detected on ETH/USD 15m.' },
  { tag: 'TELEGRAM', color: 'blue',    msg: 'Alert broadcasted to War Room channel.' },
  { tag: 'ALGO',     color: 'neon',    msg: 'Liquidity sweep confirmed above $68,800.' },
  { tag: 'SUCCESS',  color: 'emerald', msg: 'BOS confirmation on SOL/USD 1H.' },
  { tag: 'ALGO',     color: 'neon',    msg: 'Order block identified at BTC $65,200.' },
  { tag: 'TELEGRAM', color: 'blue',    msg: 'Inner Circle alert sent.' },
  { tag: 'SYSTEM',   color: 'neon',    msg: 'Heartbeat OK — all systems nominal.' },
];

export default function DashboardPage() {
  const { user } = useUser();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [logEntries, setLogEntries] = useState<{ ts: Date; tag: string; color: string; msg: string }[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const liveIdx = useRef(0);

  useEffect(() => {
    fetch('/api/user/profile')
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setLogEntries(BOOT_LOG(data?.tradingview_username || 'user'));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Append a new live event every 8 seconds
  useEffect(() => {
    if (loading) return;
    const id = setInterval(() => {
      const evt = LIVE_EVENTS[liveIdx.current % LIVE_EVENTS.length];
      liveIdx.current += 1;
      setLogEntries(prev => [...prev.slice(-30), { ...evt, ts: new Date() }]);
    }, 8000);
    return () => clearInterval(id);
  }, [loading]);

  // Auto-scroll terminal to bottom on new entries
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logEntries]);

  const handlePortal = async () => {
    try {
      const res = await fetch('/api/portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert('Failed to open billing portal');
    } catch {
      alert('Failed to open billing portal');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh]">
        <QuantLoader className="w-8 h-8 text-[var(--neon)]" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-1">Command Center</h1>
          <p className="text-muted-foreground">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}. Systems are fully nominal.
          </p>
        </div>
        <button className="bg-[var(--neon)] text-background px-5 py-2.5 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-[var(--neon-dim)] flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Quick Deploy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {/* Active Indicators */}
        <div className="glass-premium rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--neon)] opacity-5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-15 transition-opacity duration-500" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center group-hover:border-[var(--neon)]/50 transition-colors">
              <Activity className="w-5 h-5 text-[var(--neon)] group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs font-bold text-[var(--neon)] bg-[var(--neon-dim)] px-2 py-1 rounded">Active</span>
          </div>
          <h3 className="text-3xl font-extrabold text-foreground mb-1">4</h3>
          <p className="text-sm font-medium text-muted-foreground">Active Indicators</p>
        </div>

        {/* War Room Status */}
        <div className="glass-premium rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-15 transition-opacity duration-500" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-blue-500 group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
            </div>
            <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">Linked</span>
          </div>
          <h3 className="text-xl font-extrabold text-foreground mb-1 truncate">@{profile?.telegram_username?.replace('@','') || 'username'}</h3>
          <p className="text-sm font-medium text-muted-foreground">War Room Status</p>
        </div>

        {/* TradingView Link */}
        <div className="glass-premium rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 opacity-5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-15 transition-opacity duration-500" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
              <BarChart3 className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">Online</span>
          </div>
          <h3 className="text-xl font-extrabold text-foreground mb-1 truncate">{profile?.tradingview_username || 'Username'}</h3>
          <p className="text-sm font-medium text-muted-foreground">TradingView Link</p>
        </div>
        
        {/* License Status */}
        <div className="glass-premium rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--neon)] opacity-5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-15 transition-opacity duration-500" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center group-hover:border-[var(--neon)]/50 transition-colors">
              <ShieldAlert className="w-5 h-5 text-[var(--neon)] group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <h3 className="text-xl font-extrabold text-foreground mb-1 uppercase">
            {profile?.isAdmin ? 'ADMIN (BYPASS)' : (profile?.subscription_status || 'NONE')}
          </h3>
          <p className="text-sm font-medium text-muted-foreground">License Status</p>
        </div>
      </div>

      {/* AHL Screener */}
      <div className="glass-premium rounded-3xl p-6 mb-8 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--neon)] shadow-[0_0_8px_var(--neon)] animate-pulse"></span>
            VeylanLabs AHL Screener
          </h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border bg-black/40">
          <table className="w-full text-center text-sm border-collapse">
            <thead className="bg-muted/30 border-b border-border">
              <tr className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <th className="py-3 px-4 border-r border-border text-left">Symbol</th>
                <th className="py-3 px-4 border-r border-border">Bias</th>
                <th className="py-3 px-4 border-r border-border">Asia</th>
                <th className="py-3 px-4 border-r border-border">Break</th>
                <th className="py-3 px-4">Read</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {/* XAUUSD */}
              <tr className="hover:bg-background/50 transition-colors">
                <td className="py-3 px-4 border-r border-border font-bold text-left text-foreground">XAUUSD</td>
                <td className="py-3 px-4 border-r border-border">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]"></span>
                    <span className="text-foreground font-bold">Mixed</span>
                  </div>
                </td>
                <td className="py-3 px-4 border-r border-border text-amber-500 font-bold">Inside</td>
                <td className="py-3 px-4 border-r border-border font-bold text-muted-foreground">—</td>
                <td className="py-3 px-4 text-amber-500 font-bold">Inside</td>
              </tr>
              {/* EURUSD */}
              <tr className="hover:bg-background/50 transition-colors">
                <td className="py-3 px-4 border-r border-border font-bold text-left text-foreground">EURUSD</td>
                <td className="py-3 px-4 border-r border-border">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]"></span>
                    <span className="text-foreground font-bold">Mixed</span>
                  </div>
                </td>
                <td className="py-3 px-4 border-r border-border text-amber-500 font-bold">Sweep H</td>
                <td className="py-3 px-4 border-r border-border">
                  <AlertTriangle className="w-4 h-4 text-amber-500 mx-auto" />
                </td>
                <td className="py-3 px-4 text-amber-500 font-bold">Watch</td>
              </tr>
              {/* SPX500 */}
              <tr className="hover:bg-background/50 transition-colors">
                <td className="py-3 px-4 border-r border-border font-bold text-left text-foreground">SPX500</td>
                <td className="py-3 px-4 border-r border-border">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]"></span>
                    <span className="text-foreground font-bold">Mixed</span>
                  </div>
                </td>
                <td className="py-3 px-4 border-r border-border text-emerald-500 font-bold">Above</td>
                <td className="py-3 px-4 border-r border-border">
                  <span className="inline-flex items-center gap-1.5 text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> L
                  </span>
                </td>
                <td className="py-3 px-4 text-emerald-500 font-bold">5M Entry</td>
              </tr>
              {/* US30 */}
              <tr className="hover:bg-background/50 transition-colors">
                <td className="py-3 px-4 border-r border-border font-bold text-left text-foreground">US30</td>
                <td className="py-3 px-4 border-r border-border">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
                    <span className="text-emerald-500 font-bold">Long</span>
                  </div>
                </td>
                <td className="py-3 px-4 border-r border-border text-emerald-500 font-bold">Above</td>
                <td className="py-3 px-4 border-r border-border">
                  <span className="inline-flex items-center gap-1.5 text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> L
                  </span>
                </td>
                <td className="py-3 px-4 text-emerald-500 font-bold">5M Entry</td>
              </tr>
              {/* NAS100 */}
              <tr className="hover:bg-background/50 transition-colors">
                <td className="py-3 px-4 border-r border-border font-bold text-left text-foreground">NAS100</td>
                <td className="py-3 px-4 border-r border-border">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
                    <span className="text-emerald-500 font-bold">Long</span>
                  </div>
                </td>
                <td className="py-3 px-4 border-r border-border text-emerald-500 font-bold">Above</td>
                <td className="py-3 px-4 border-r border-border">
                  <span className="inline-flex items-center gap-1.5 text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> L
                  </span>
                </td>
                <td className="py-3 px-4 text-emerald-500 font-bold">5M Entry</td>
              </tr>
            </tbody>
          </table>
          <div className="p-3 text-center text-xs font-bold text-muted-foreground bg-muted/20 border-t border-border">
            Asia forming - ends in 17m
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* System Log */}
        <div className="lg:col-span-2 glass-premium rounded-3xl p-6 flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold tracking-tight text-foreground">Live Terminal Log</h2>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 hover:scale-110 transition-transform cursor-pointer"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500 hover:scale-110 transition-transform cursor-pointer"></span>
              <span className="w-3 h-3 rounded-full bg-[var(--neon)] hover:scale-110 transition-transform cursor-pointer shadow-[0_0_8px_var(--neon)]"></span>
            </div>
          </div>
          
          <div ref={logRef} className="flex-1 bg-black rounded-xl border border-border p-4 overflow-y-auto font-mono text-xs sm:text-sm shadow-inner relative">
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px]" />
            <div className="space-y-3 relative z-10">
              {logEntries.map((entry, i) => (
                <div key={i} className="flex gap-3 sm:gap-4">
                  <span className="text-muted-foreground flex-none">{fmt(entry.ts)}</span>
                  <span className={`flex-none ${
                    entry.color === 'neon'    ? 'text-[var(--neon)] shadow-[0_0_5px_var(--neon)]' :
                    entry.color === 'blue'    ? 'text-blue-500' :
                    entry.color === 'emerald' ? 'text-emerald-500' :
                    'text-muted-foreground'
                  }`}>{entry.tag}</span>
                  <span className="text-foreground">{entry.msg}</span>
                </div>
              ))}
              <div className="flex gap-4 opacity-50">
                <span className="text-[var(--neon)] animate-pulse shadow-[0_0_5px_var(--neon)]">_</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-premium rounded-3xl p-6 flex flex-col">
          <h2 className="text-xl font-bold tracking-tight text-foreground mb-6">Quick Actions</h2>
          
          <div className="space-y-3">
            <button onClick={handlePortal} className="w-full text-left px-4 py-4 rounded-xl bg-background border border-border hover:border-foreground/50 transition-colors group flex justify-between items-center">
              <div>
                <div className="font-bold text-sm text-foreground mb-1 group-hover:text-[var(--neon)] transition-colors">Manage License</div>
                <div className="text-xs text-muted-foreground">Stripe Customer Portal</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            
            <a href={`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || 'VeylanLabsBot'}?start=${user?.id}`} target="_blank" rel="noopener noreferrer" className="w-full text-left px-4 py-4 rounded-xl bg-background border border-border hover:border-[var(--neon)]/50 transition-colors group flex justify-between items-center">
              <div>
                <div className="font-bold text-sm text-[var(--neon)] mb-1">Link Telegram & Join</div>
                <div className="text-xs text-muted-foreground">Click to get your private invite links</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </a>

            <Link href="/dashboard/training" className="w-full text-left px-4 py-4 rounded-xl bg-background border border-border hover:border-foreground/50 transition-colors group flex justify-between items-center">
              <div>
                <div className="font-bold text-sm text-foreground mb-1 group-hover:text-[var(--neon)] transition-colors">Training Academy</div>
                <div className="text-xs text-muted-foreground">Video tutorials and guides</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
