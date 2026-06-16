"use client";

import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  Settings,
  Activity,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  ShieldCheck,
  User,
  CreditCard,
  Bell,
  Copy,
  Check,
} from 'lucide-react';
import { QuantLoader } from "@/components/quant-loader";

// ─── Telegram SVG icon ───────────────────────────────────────────────────────
function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ connected }: { connected: boolean }) {
  return connected ? (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--neon)] bg-[var(--neon-dim)] border border-[var(--neon)]/30 px-2.5 py-1 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon)] shadow-[0_0_6px_var(--neon)]" />
      LINKED
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground bg-muted border border-border px-2.5 py-1 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
      NOT LINKED
    </span>
  );
}

// ─── Copy button ──────────────────────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="text-muted-foreground hover:text-[var(--neon)] transition-colors p-1 rounded" title="Copy">
      {copied ? <Check className="w-3.5 h-3.5 text-[var(--neon)]" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function PreferencesPage() {
  const { user } = useUser();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Field state
  const [tvUser, setTvUser] = useState('');
  const [tgUser, setTgUser] = useState('');

  // Save states (separate per section)
  const [savingIntegrations, setSavingIntegrations] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [tgInviteLink, setTgInviteLink] = useState<string | null>(null);

  // Fetch profile
  const fetchProfile = useCallback(() => {
    setLoading(true);
    fetch('/api/user/profile')
      .then(r => r.json())
      .then(data => {
        setProfile(data);
        setTvUser(data.tradingview_username || '');
        setTgUser(data.telegram_username || '');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  // Save integrations
  const handleSaveIntegrations = async () => {
    setSavingIntegrations(true);
    setSaveError('');
    setSaveSuccess(false);
    setTgInviteLink(null);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tradingview_username: tvUser.trim(), telegram_username: tgUser.trim() }),
      });
      if (!res.ok) {
        const text = await res.text();
        setSaveError(text || 'Failed to save.');
        return;
      }
      const data = await res.json();
      setProfile((p: any) => ({ ...p, tradingview_username: tvUser.trim(), telegram_username: tgUser.trim() }));
      setSaveSuccess(true);
      if (data.tgInviteLink) setTgInviteLink(data.tgInviteLink);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch {
      setSaveError('Network error. Please try again.');
    } finally {
      setSavingIntegrations(false);
    }
  };

  // Open Stripe portal
  const handlePortal = async () => {
    try {
      const res = await fetch('/api/portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setSaveError('Failed to open billing portal.');
    }
  };

  const isActive = profile?.subscription_status === 'active' || profile?.subscription_status === 'trialing';
  const hasChanges =
    tvUser.trim() !== (profile?.tradingview_username || '') ||
    tgUser.trim() !== (profile?.telegram_username || '');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <QuantLoader className="w-8 h-8 text-[var(--neon)]" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in-up">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[var(--neon-dim)] border border-[var(--neon)]/20 flex items-center justify-center">
            <Settings className="w-5 h-5 text-[var(--neon)]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Preferences</h1>
            <p className="text-sm text-muted-foreground">Manage your account, integrations and billing</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">

        {/* ── Account Overview Card ──────────────────────────────────────────── */}
        <div className="glass-premium rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <User className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Account</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--neon)] to-blue-500 p-0.5 flex-none">
              <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                <span className="text-lg font-bold">
                  {user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || '?'}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-foreground truncate">
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user?.emailAddresses?.[0]?.emailAddress || 'Operator'}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {user?.emailAddresses?.[0]?.emailAddress}
              </p>
            </div>
            <div className="flex-none">
              {isActive ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--neon)] bg-[var(--neon-dim)] border border-[var(--neon)]/30 px-3 py-1.5 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--neon)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--neon)]" />
                  </span>
                  ACTIVE
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-full">
                  NO LICENSE
                </span>
              )}
            </div>
          </div>

          {profile?.subscription_status && (
            <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-0.5">Plan</p>
                <p className="font-semibold capitalize text-foreground">{profile.subscription_status}</p>
              </div>
              {profile.stripe_subscription_id && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-0.5">Subscription ID</p>
                  <div className="flex items-center gap-1">
                    <p className="font-mono text-xs text-foreground truncate max-w-[120px]">{profile.stripe_subscription_id}</p>
                    <CopyButton text={profile.stripe_subscription_id} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Integration Settings ───────────────────────────────────────────── */}
        <div className="glass-premium rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Integrations</h2>
            </div>
            <button
              onClick={fetchProfile}
              className="text-muted-foreground hover:text-[var(--neon)] transition-colors p-1.5 rounded-lg hover:bg-[var(--neon-dim)]"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-5">

            {/* TradingView */}
            <div className="p-4 rounded-xl bg-background border border-border hover:border-emerald-500/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-none">
                    <Activity className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">TradingView</p>
                    <p className="text-xs text-muted-foreground">Script whitelist access</p>
                  </div>
                </div>
                <StatusBadge connected={!!profile?.tradingview_username} />
              </div>

              <div>
                <label htmlFor="tv-username" className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <input
                    id="tv-username"
                    type="text"
                    value={tvUser}
                    onChange={e => setTvUser(e.target.value)}
                    placeholder="e.g. VeylanTrader"
                    className="w-full bg-card border border-border rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all placeholder:text-muted-foreground/50"
                  />
                  {profile?.tradingview_username && (
                    <a
                      href={`https://www.tradingview.com/u/${profile.tradingview_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-emerald-500 transition-colors"
                      title="View profile"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Telegram */}
            <div className="p-4 rounded-xl bg-background border border-border hover:border-blue-500/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-none">
                    <TelegramIcon className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">Telegram</p>
                    <p className="text-xs text-muted-foreground">War Room access & alerts</p>
                  </div>
                </div>
                <StatusBadge connected={!!profile?.telegram_username} />
              </div>

              <div>
                <label htmlFor="tg-username" className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm select-none">@</span>
                  <input
                    id="tg-username"
                    type="text"
                    value={tgUser.replace('@', '')}
                    onChange={e => setTgUser(e.target.value.replace('@', ''))}
                    placeholder="username"
                    className="w-full bg-card border border-border rounded-xl py-2.5 pl-8 pr-4 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>

              {/* Bot link CTA */}
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <span>Haven't linked yet?</span>
                <a
                  href={`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || 'VeylanLabsBot'}?start=${user?.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 font-semibold flex items-center gap-1 transition-colors"
                >
                  Open Bot <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Save feedback */}
          {saveError && (
            <div className="mt-4 flex items-center gap-2 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 flex-none" />
              {saveError}
            </div>
          )}
          {saveSuccess && (
            <div className="mt-4 flex items-center gap-2 text-sm text-[var(--neon)] bg-[var(--neon-dim)] border border-[var(--neon)]/20 rounded-xl px-4 py-3">
              <CheckCircle2 className="w-4 h-4 flex-none" />
              Integration settings saved successfully!
            </div>
          )}

          {/* Telegram invite link */}
          {tgInviteLink && (
            <div className="mt-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2">🎉 Your War Room Invite Link</p>
              <div className="flex items-center gap-2">
                <a
                  href={tgInviteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:text-blue-300 underline truncate flex-1 transition-colors"
                >
                  {tgInviteLink}
                </a>
                <CopyButton text={tgInviteLink} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">⚠️ Single-use link — join immediately!</p>
            </div>
          )}

          {/* Save button */}
          <button
            id="save-integrations-btn"
            onClick={handleSaveIntegrations}
            disabled={savingIntegrations || !hasChanges}
            className="mt-5 w-full bg-[var(--neon)] text-background py-3 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-[var(--neon-dim)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 text-sm"
          >
            {savingIntegrations ? (
              <>
                <QuantLoader className="w-4 h-4" />
                Saving…
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Saved!
              </>
            ) : (
              'Save Integrations'
            )}
          </button>
        </div>

        {/* ── Billing Card ──────────────────────────────────────────────────── */}
        <div className="glass-premium rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <CreditCard className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Billing</h2>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-foreground mb-1">Stripe Customer Portal</p>
              <p className="text-sm text-muted-foreground">
                Update payment method, view invoices, or cancel your subscription.
              </p>
            </div>
            <button
              id="billing-portal-btn"
              onClick={handlePortal}
              className="flex-none flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-border hover:border-foreground/40 text-sm font-bold transition-all hover:bg-card whitespace-nowrap"
            >
              <CreditCard className="w-4 h-4" />
              Manage
            </button>
          </div>
        </div>

        {/* ── Security Card ─────────────────────────────────────────────────── */}
        <div className="glass-premium rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <ShieldCheck className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Security</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-semibold text-sm text-foreground">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground mt-0.5">Managed via your Clerk account settings</p>
              </div>
              <a
                href="https://accounts.clerk.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-[var(--neon)] hover:brightness-110 transition-all"
              >
                Configure <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="border-t border-border pt-3 flex items-center justify-between py-2">
              <div>
                <p className="font-semibold text-sm text-foreground">Notifications</p>
                <p className="text-xs text-muted-foreground mt-0.5">Signal alerts delivered via Telegram Bot</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-[var(--neon)]" />
                <span className="text-xs font-bold text-[var(--neon)]">
                  {profile?.telegram_username ? 'Active' : 'Not set'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Danger Zone ───────────────────────────────────────────────────── */}
        <div className="rounded-2xl p-6 border border-red-500/20 bg-red-500/5">
          <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4">Danger Zone</p>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-sm text-foreground">Cancel Subscription</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                This will revoke your access to all VeylanLabs systems and remove you from all groups.
              </p>
            </div>
            <button
              onClick={handlePortal}
              className="flex-none px-4 py-2.5 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 text-sm font-bold transition-all whitespace-nowrap"
            >
              Cancel Plan
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
