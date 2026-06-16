"use client";

import { useState } from 'react';
import {
  ShieldAlert,
  ToggleRight,
  ToggleLeft,
  Save,
  Lock,
  AlertOctagon,
  Percent,
  CheckCircle2,
  AlertCircle,
  Activity,
  Zap,
} from 'lucide-react';
import { QuantLoader } from "@/components/quant-loader";

export default function RiskProtocolsPage() {
  const [autoKill,      setAutoKill]      = useState(true);
  const [maxDrawdown,   setMaxDrawdown]   = useState('2.5');
  const [riskPerTrade,  setRiskPerTrade]  = useState('1.0');
  const [pyramiding,    setPyramiding]    = useState(false);
  const [saving,        setSaving]        = useState(false);
  const [saved,         setSaved]         = useState(false);
  const [saveError,     setSaveError]     = useState('');

  // Persist to localStorage (or swap for an API call when a backend route exists)
  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setSaveError('');

    // Validate inputs
    const dd = parseFloat(maxDrawdown);
    const rpt = parseFloat(riskPerTrade);
    if (isNaN(dd) || dd <= 0 || dd > 100) {
      setSaveError('Max drawdown must be a number between 0 and 100.');
      setSaving(false);
      return;
    }
    if (isNaN(rpt) || rpt <= 0 || rpt > 10) {
      setSaveError('Risk per trade must be a number between 0.1 and 10.');
      setSaving(false);
      return;
    }

    // Simulate async save (replace with fetch('/api/user/risk-settings', ...) when ready)
    await new Promise(r => setTimeout(r, 800));

    try {
      localStorage.setItem('vl_risk_settings', JSON.stringify({
        autoKill,
        maxDrawdown: dd,
        riskPerTrade: rpt,
        pyramiding,
        updatedAt: new Date().toISOString(),
      }));
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    } catch {
      setSaveError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-1 flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-[var(--neon)]" />
            Risk Protocols
          </h1>
          <p className="text-muted-foreground">Configure automated risk management rules and safety limits.</p>
        </div>

        <button
          id="save-risk-btn"
          onClick={handleSave}
          disabled={saving}
          className="bg-[var(--neon)] text-background px-6 py-2.5 rounded-xl font-bold hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-[var(--neon-dim)] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? (
            <><QuantLoader className="w-4 h-4" /> Saving…</>
          ) : saved ? (
            <><CheckCircle2 className="w-4 h-4" /> Saved!</>
          ) : (
            <><Save className="w-4 h-4" /> Save Protocols</>
          )}
        </button>
      </div>

      {/* Save feedback banners */}
      {saveError && (
        <div className="mb-6 flex items-center gap-2 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 flex-none" /> {saveError}
        </div>
      )}
      {saved && (
        <div className="mb-6 flex items-center gap-2 text-sm text-[var(--neon)] bg-[var(--neon-dim)] border border-[var(--neon)]/20 rounded-xl px-4 py-3">
          <CheckCircle2 className="w-4 h-4 flex-none" /> Risk protocols saved successfully.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* ── Capital Preservation ── */}
        <div className="glass-premium rounded-3xl p-8">
          <h2 className="text-xl font-bold tracking-tight text-foreground mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-[var(--neon)]" />
            Capital Preservation
          </h2>

          <div className="space-y-4">

            {/* Max drawdown */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border hover:border-[var(--neon)]/30 transition-colors">
              <div className="flex-1 mr-4">
                <h3 className="font-bold text-foreground mb-1">Max Daily Drawdown (Killswitch)</h3>
                <p className="text-xs text-muted-foreground">Automatically halt all trading if equity drops below this % in a single day.</p>
              </div>
              <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg border border-border focus-within:border-[var(--neon)] transition-colors w-24 flex-none">
                <input
                  type="number"
                  min="0.1" max="100" step="0.1"
                  value={maxDrawdown}
                  onChange={e => setMaxDrawdown(e.target.value)}
                  className="bg-transparent border-none outline-none w-full text-right font-bold text-sm"
                />
                <Percent className="w-4 h-4 text-muted-foreground flex-none" />
              </div>
            </div>

            {/* Risk per trade */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border hover:border-[var(--neon)]/30 transition-colors">
              <div className="flex-1 mr-4">
                <h3 className="font-bold text-foreground mb-1">Max Risk Per Trade</h3>
                <p className="text-xs text-muted-foreground">Enforced hard limit on position sizing relative to total equity.</p>
              </div>
              <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg border border-border focus-within:border-[var(--neon)] transition-colors w-24 flex-none">
                <input
                  type="number"
                  min="0.1" max="10" step="0.1"
                  value={riskPerTrade}
                  onChange={e => setRiskPerTrade(e.target.value)}
                  className="bg-transparent border-none outline-none w-full text-right font-bold text-sm"
                />
                <Percent className="w-4 h-4 text-muted-foreground flex-none" />
              </div>
            </div>

            {/* Auto-kill */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-background border border-[var(--neon)]/20 hover:border-[var(--neon)]/40 transition-colors">
              <div className="flex-1 mr-4">
                <h3 className="font-bold text-[var(--neon)] mb-1">Auto-Kill Positions</h3>
                <p className="text-xs text-muted-foreground">Allow algorithms to automatically close positions if structural bias changes negatively.</p>
              </div>
              <button onClick={() => setAutoKill(v => !v)} className="hover:scale-110 transition-transform flex-none">
                {autoKill
                  ? <ToggleRight className="w-10 h-10 text-[var(--neon)]" />
                  : <ToggleLeft  className="w-10 h-10 text-muted-foreground" />}
              </button>
            </div>

            {/* Pyramiding */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border hover:border-amber-500/30 transition-colors">
              <div className="flex-1 mr-4">
                <h3 className="font-bold text-foreground mb-1">Allow Pyramiding</h3>
                <p className="text-xs text-muted-foreground">Permit adding to winning positions. Disabled by default for capital safety.</p>
              </div>
              <button onClick={() => setPyramiding(v => !v)} className="hover:scale-110 transition-transform flex-none">
                {pyramiding
                  ? <ToggleRight className="w-10 h-10 text-amber-500" />
                  : <ToggleLeft  className="w-10 h-10 text-muted-foreground" />}
              </button>
            </div>

          </div>
        </div>

        {/* ── Audit Log ── */}
        <div className="glass-premium rounded-3xl p-8 flex flex-col">
          <h2 className="text-xl font-bold tracking-tight text-foreground mb-6 flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-red-500" />
            Security Audit Log
          </h2>

          <div className="flex-1 bg-black/50 rounded-2xl border border-border p-4 overflow-y-auto space-y-3 font-mono text-xs">
            {saved && (
              <div className="p-3 rounded-xl bg-[var(--neon-dim)] border border-[var(--neon)]/20 flex gap-3 text-[var(--neon)] animate-fade-in-up">
                <span className="opacity-60">{new Date().toLocaleTimeString()}</span>
                <span>Protocol settings updated — <span className="font-bold">DD: {maxDrawdown}% · RPT: {riskPerTrade}% · AutoKill: {autoKill ? 'ON' : 'OFF'}</span></span>
              </div>
            )}

            <div className="p-3 rounded-xl bg-background border border-border flex gap-3 opacity-50">
              <span className="text-muted-foreground">Yesterday</span>
              <span>Protocol <span className="font-bold">Max Drawdown</span> updated to 2.5%</span>
            </div>
            <div className="p-3 rounded-xl bg-background border border-border flex gap-3 opacity-50">
              <span className="text-muted-foreground">Last Week</span>
              <span>Account linked to Telegram successfully.</span>
            </div>
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex gap-3 text-red-500">
              <span>Oct 12</span>
              <span>Killswitch triggered. Max daily drawdown (2.5%) reached. Trading halted.</span>
            </div>
          </div>

          {/* Live R:R calculator */}
          <div className="mt-5 p-4 rounded-2xl bg-background border border-border">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Quick R:R Calculator</p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {['1:1', '1:2', '1:3'].map(ratio => {
                const [r, rr] = ratio.split(':').map(Number);
                const winRate = Math.round((1 / (1 + rr / r)) * 100);
                return (
                  <div key={ratio} className="rounded-xl bg-muted p-3">
                    <div className="text-lg font-extrabold text-foreground">{ratio}</div>
                    <div className="text-xs text-muted-foreground">Break-even</div>
                    <div className="text-xs font-bold text-[var(--neon)] mt-1">{winRate}% WR</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
