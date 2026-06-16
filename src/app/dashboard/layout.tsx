"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  BarChart3, 
  Terminal, 
  Settings, 
  Bell, 
  Search, 
  TrendingUp, 
  ShieldAlert, 
  Activity,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Send,
  Cpu,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { QuantLoader } from "@/components/quant-loader";
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from '@/components/logo';
import { useClerk, useUser } from '@clerk/nextjs';
import { CommandPalette } from '@/components/command-palette';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tvUser, setTvUser] = useState('');
  const [tgUser, setTgUser] = useState('');
  const [saveError, setSaveError] = useState('');
  const [initComplete, setInitComplete] = useState(false);
  const [inviteLink, setInviteLink] = useState('');

  useEffect(() => {
    fetch('/api/user/profile')
      .then(res => res.json())
      .then(data => {
        if (data.isAdmin) {
          setIsAdmin(true);
        }
        setProfile(data);
        setTvUser(data.tradingview_username || '');
        setTgUser(data.telegram_username || '');
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  const handleSave = async () => {
    const cleanTvUser = tvUser.trim();
    const cleanTgUser = tgUser.trim().replace(/^@/, '');

    if (cleanTvUser.length < 3 || !/^[a-zA-Z0-9_-]+$/.test(cleanTvUser)) {
      setSaveError('Invalid TradingView username format.');
      return;
    }
    if (cleanTgUser.length < 5 || !/^[a-zA-Z0-9_]+$/.test(cleanTgUser)) {
      setSaveError('Invalid Telegram username format.');
      return;
    }

    setSaving(true);
    setSaveError('');
    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tradingview_username: cleanTvUser, telegram_username: cleanTgUser })
      });
      if (!res.ok) {
        const text = await res.text();
        setSaveError(text || 'Failed to save');
        return;
      }
      const data = await res.json();
      
      if (data.tgInviteLink) {
        setInviteLink(data.tgInviteLink);
        setInitComplete(true);
      }
      
      setProfile({ 
        ...profile, 
        tradingview_username: cleanTvUser, 
        telegram_username: cleanTgUser,
        tgInviteLink: data.tgInviteLink 
      });
    } catch {
      setSaveError('An error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const initials = user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || '?';

  // Helper for active link styling
  const isActive = (path: string) => pathname === path;
  const linkClass = (path: string) => `flex items-center gap-3 py-2.5 rounded-xl font-medium transition-all duration-300 group ${
    isActive(path) 
      ? 'bg-[var(--neon-dim)] text-[var(--neon)] border border-[var(--neon)]/30 shadow-[0_0_15px_rgba(101,163,13,0.1)]' 
      : 'text-muted-foreground hover:bg-[var(--neon-dim)] hover:text-[var(--neon)] border border-transparent hover:border-[var(--neon)]/30'
  } ${isCollapsed ? 'justify-center px-0' : 'px-3'}`;

  // Early returns for loading and non-active users
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
         <QuantLoader className="w-8 h-8 text-[var(--neon)]" />
      </div>
    );
  }

  const isLocked = (!profile || (profile.subscription_status !== 'active' && profile.subscription_status !== 'trialing')) && !isAdmin;
  const needsInit = profile && (!profile.tradingview_username || !profile.telegram_username) && !isAdmin;

  if (isLocked || needsInit || initComplete) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[var(--neon)] selection:text-white flex flex-col relative">
        <div className="bg-mesh opacity-30 fixed inset-0 pointer-events-none" />
        
        {/* Minimal Header */}
        <header className="h-20 border-b border-border bg-background/50 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between z-10 relative">
          <Logo />
          <div className="flex items-center gap-4">
             <ThemeToggle />
             <button onClick={handleSignOut} className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors text-sm font-medium">
               <LogOut className="w-4 h-4" />
               <span className="hidden sm:inline">Sign Out</span>
             </button>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4 relative z-10">
          {isLocked ? (
            <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto">
              <ShieldAlert className="w-16 h-16 text-red-500 mb-6" />
              <h2 className="text-3xl font-bold mb-4 font-display tracking-wide">No Active License</h2>
              <p className="text-muted-foreground mb-8">You need an active subscription to access the Command Center and VeylanLabs systems.</p>
              <Link href="/#pricing" className="bg-[var(--neon)] text-background px-8 py-3.5 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-[var(--neon-dim)] uppercase tracking-wider font-mono text-sm">
                Acquire Access
              </Link>
            </div>
          ) : initComplete ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl w-full mx-auto relative group text-center"
            >
              <div className="relative p-8 sm:p-10 rounded-[2rem] overflow-hidden glass-premium border border-[var(--neon)]/30 backdrop-blur-xl">
                <div className="w-16 h-16 rounded-full bg-[var(--neon)]/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(101,163,13,0.3)]">
                  <CheckCircle2 className="w-8 h-8 text-[var(--neon)]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display mb-4 text-foreground">Systems Deployed</h2>
                <p className="text-muted-foreground mb-8 text-sm">
                  Your TradingView and Telegram accounts have been successfully linked.
                  Please join the Telegram War Room to start receiving alerts.
                </p>
                {inviteLink && (
                  <div className="mb-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-left">
                    <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2 flex items-center gap-2">🎉 Your Invite Link</p>
                    <a href={inviteLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:text-blue-300 underline break-all font-mono block mb-2">{inviteLink}</a>
                    <p className="text-xs text-muted-foreground">This is a single-use link. Please join immediately.</p>
                  </div>
                )}
                <button
                  onClick={() => setInitComplete(false)}
                  className="relative w-full group overflow-hidden bg-[var(--neon)] text-black py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(101,163,13,0.4)] flex items-center justify-center gap-2 uppercase tracking-widest font-mono text-sm"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center gap-2">
                    Enter Command Center <ChevronRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl w-full mx-auto relative group"
            >
              {/* Decorative background glows */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--neon)] via-emerald-500 to-blue-500 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/40 rounded-[2rem] backdrop-blur-xl border border-border/50 dark:border-white/10" />
              
              <div className="relative p-8 sm:p-10 rounded-[2rem] overflow-hidden">
                {/* Subtle top glare */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--neon)] to-transparent opacity-50" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--neon)]/10 border border-[var(--neon)]/30 flex items-center justify-center shadow-[0_0_20px_rgba(101,163,13,0.2)]">
                    <Cpu className="w-6 h-6 text-[var(--neon)]" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-wide bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">System Init</h2>
                    <p className="text-[var(--neon)] font-mono text-xs sm:text-sm uppercase tracking-widest mt-1 opacity-80">Awaiting configuration</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                  Establish a secure uplink by providing your operational handles. This will connect the VeylanLabs neural suite directly to your trading environments.
                </p>
                
                <div className="space-y-6">
                  <div className="group/input">
                    <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 font-mono group-focus-within/input:text-[var(--neon)] transition-colors">
                      <Activity className="w-4 h-4" /> TradingView Alias
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={tvUser}
                        onChange={(e) => setTvUser(e.target.value)}
                        className="w-full bg-foreground/5 dark:bg-black/40 border border-border/50 dark:border-white/10 rounded-xl py-3.5 pl-4 pr-10 text-sm focus:outline-none focus:border-[var(--neon)] focus:bg-foreground/10 dark:focus:bg-black/60 focus:ring-1 focus:ring-[var(--neon)]/50 transition-all font-mono placeholder:text-muted-foreground/50 shadow-inner"
                        placeholder="e.g. VeylanTrader"
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                         <span className={`w-2 h-2 rounded-full transition-all duration-300 ${tvUser ? 'bg-[var(--neon)] shadow-[0_0_10px_var(--neon)]' : 'bg-foreground/10 dark:bg-white/10 group-focus-within/input:bg-[var(--neon)]/50'}`} />
                      </div>
                    </div>
                  </div>

                  <div className="group/input">
                    <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 font-mono group-focus-within/input:text-[var(--neon)] transition-colors">
                      <Send className="w-4 h-4" /> Telegram Identifier
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={tgUser}
                        onChange={(e) => setTgUser(e.target.value)}
                        className="w-full bg-foreground/5 dark:bg-black/40 border border-border/50 dark:border-white/10 rounded-xl py-3.5 pl-4 pr-10 text-sm focus:outline-none focus:border-[var(--neon)] focus:bg-foreground/10 dark:focus:bg-black/60 focus:ring-1 focus:ring-[var(--neon)]/50 transition-all font-mono placeholder:text-muted-foreground/50 shadow-inner"
                        placeholder="@username"
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                         <span className={`w-2 h-2 rounded-full transition-all duration-300 ${tgUser ? 'bg-[var(--neon)] shadow-[0_0_10px_var(--neon)]' : 'bg-foreground/10 dark:bg-white/10 group-focus-within/input:bg-[var(--neon)]/50'}`} />
                      </div>
                    </div>
                  </div>

                  {saveError && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 font-mono flex items-center gap-2"
                    >
                      <ShieldAlert className="w-4 h-4" /> {saveError}
                    </motion.p>
                  )}
                  
                  <button 
                    onClick={handleSave}
                    disabled={saving || !tvUser || !tgUser}
                    className="relative w-full group overflow-hidden bg-[var(--neon)] text-black py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(101,163,13,0.4)] disabled:opacity-50 disabled:hover:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-widest font-mono text-sm mt-8"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="relative z-10 flex items-center gap-2">
                      {saving ? <QuantLoader className="w-4 h-4 text-black" /> : <Zap className="w-4 h-4" />}
                      {saving ? 'Initializing...' : 'Deploy Systems'}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    );
  }

  // Normal Layout
  return (
    <div className="h-[100dvh] bg-background text-foreground font-sans selection:bg-[var(--neon)] selection:text-background flex overflow-hidden">
      
      <CommandPalette />
      
      {/* Animated Mesh Gradient Background */}
      <div className="bg-mesh opacity-30 fixed inset-0 pointer-events-none" />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 h-[100dvh] left-0 z-50 glass-premium border-r border-border flex flex-col transition-all duration-300 ease-in-out overflow-hidden
        ${isSidebarOpen ? 'translate-x-0 w-72' : `-translate-x-full lg:translate-x-0 ${isCollapsed ? 'w-[88px]' : 'w-72'}`}
      `}>
        <div className="h-20 flex items-center px-6 border-b border-border justify-between lg:justify-start">
          {!isCollapsed && <Logo />}
          {isCollapsed && <div className="font-display text-3xl font-bold text-[var(--neon)] mx-auto tracking-widest pl-2">V</div>}
          <div className="ml-auto flex items-center gap-2">
            <button className="hidden lg:flex text-muted-foreground hover:text-[var(--neon)] transition-colors" onClick={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            <button className="lg:hidden text-muted-foreground hover:text-[var(--neon)] transition-colors" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1 scrollbar-none">
          {!isCollapsed && <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-2 font-mono">Core Modules</div>}
          
          <Link href="/dashboard" className={linkClass('/dashboard')}>
            <Terminal className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
            {!isCollapsed && <span>Command Center</span>}
          </Link>


          
          <Link href="/dashboard/market-structure" className={linkClass('/dashboard/market-structure')}>
            <BarChart3 className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
            {!isCollapsed && <span>Market Structure</span>}
          </Link>
          
          <Link href="/dashboard/liquidity-maps" className={linkClass('/dashboard/liquidity-maps')}>
            <TrendingUp className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
            {!isCollapsed && <span>Liquidity Maps</span>}
          </Link>
          
          <Link href="/dashboard/risk-protocols" className={linkClass('/dashboard/risk-protocols')}>
            <ShieldAlert className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
            {!isCollapsed && <span>Risk Protocols</span>}
          </Link>

          <div className="mt-8 mb-2">
            {!isCollapsed && <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 font-mono">Integrations</div>}
          </div>
          
          <Link href="/dashboard/preferences" className={`flex items-center gap-3 py-2.5 rounded-xl font-medium transition-all duration-300 group ${isActive('/dashboard/preferences') ? 'bg-[var(--neon-dim)] text-[var(--neon)] border border-[var(--neon)]/30' : 'text-muted-foreground hover:bg-[var(--neon-dim)] hover:text-[var(--neon)] border border-transparent hover:border-[var(--neon)]/30'} ${isCollapsed ? 'justify-center px-0' : 'px-3 justify-between'}`}>
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0 group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
              {!isCollapsed && <span>Telegram</span>}
            </div>
            {!isCollapsed && profile?.telegram_username && (
              <span className="w-2 h-2 rounded-full bg-[var(--neon)] shadow-[0_0_8px_var(--neon)] group-hover:scale-125 transition-transform"></span>
            )}
          </Link>
          
          <Link href="/dashboard/preferences" className={`flex items-center gap-3 py-2.5 rounded-xl font-medium transition-all duration-300 group ${isActive('/dashboard/preferences') ? 'bg-[var(--neon-dim)] text-[var(--neon)] border border-[var(--neon)]/30' : 'text-muted-foreground hover:bg-[var(--neon-dim)] hover:text-[var(--neon)] border border-transparent hover:border-[var(--neon)]/30'} ${isCollapsed ? 'justify-center px-0' : 'px-3 justify-between'}`}>
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
              {!isCollapsed && <span>TradingView</span>}
            </div>
            {!isCollapsed && (profile?.tradingview_username ? (
              <span className="text-[9px] font-bold bg-[var(--neon-dim)] text-[var(--neon)] px-1.5 py-0.5 rounded border border-[var(--neon)]/30 group-hover:bg-[var(--neon)] group-hover:text-black transition-colors font-mono tracking-widest">LINKED</span>
            ) : (
              <span className="text-[9px] font-bold bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-mono tracking-widest">CONNECT</span>
            ))}
          </Link>
        </div>

        <div className="p-4 border-t border-border mt-auto">
          {isAdmin && (
            <Link href="/admin" className={`flex items-center gap-3 py-2.5 rounded-xl font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 transition-all mb-2 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)] ${isCollapsed ? 'justify-center px-0' : 'px-3'}`}>
              <ShieldAlert className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
              {!isCollapsed && <span>Admin Panel</span>}
            </Link>
          )}
          <Link href="/dashboard/preferences" className={`flex items-center gap-3 py-2.5 rounded-xl font-medium transition-all duration-300 group text-muted-foreground hover:bg-[var(--neon-dim)] hover:text-[var(--neon)] border border-transparent hover:border-[var(--neon)]/30 ${isCollapsed ? 'justify-center px-0' : 'px-3'}`}>
            <Settings className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
            {!isCollapsed && <span>Preferences</span>}
          </Link>
          <button
            onClick={handleSignOut}
            className={`w-full flex items-center gap-3 py-2.5 rounded-xl text-red-500/80 hover:bg-red-500/10 hover:text-red-500 font-medium transition-colors mt-1 border border-transparent hover:border-red-500/30 ${isCollapsed ? 'justify-center px-0' : 'px-3'}`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative z-10 w-full overflow-hidden">
        
        {/* Header */}
        <header className="h-20 flex-shrink-0 bg-background/50 backdrop-blur-md border-b border-border flex items-center justify-between px-4 sm:px-8 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-foreground bg-card border border-border hover:border-[var(--neon)]/50 transition-colors p-2 rounded-lg" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <button 
              onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
              className="hidden md:flex items-center justify-between px-4 py-2 bg-card/50 backdrop-blur-md border border-border hover:border-[var(--neon)]/50 transition-all rounded-xl text-sm w-72 text-muted-foreground group shadow-sm hover:shadow-[0_0_15px_rgba(101,163,13,0.1)]"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 group-hover:text-[var(--neon)] transition-colors" />
                <span className="group-hover:text-foreground transition-colors">Search commands...</span>
              </div>
              <kbd className="bg-background/50 px-2 py-0.5 rounded text-[10px] font-mono border border-border group-hover:border-[var(--neon)]/30 group-hover:text-[var(--neon)] transition-colors font-bold tracking-widest shadow-sm">CTRL+K</kbd>
            </button>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            {profile?.subscription_status === 'active' || profile?.subscription_status === 'trialing' ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--neon)]/30 bg-[var(--neon-dim)] hidden sm:flex shadow-[0_0_10px_rgba(101,163,13,0.1)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--neon)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--neon)]"></span>
                </span>
                <span className="text-[10px] font-bold text-[var(--neon)] uppercase tracking-widest font-mono">Active</span>
              </div>
            ) : null}
            
            <button className="text-muted-foreground hover:text-[var(--neon)] transition-colors relative hover-pulse-glow rounded-full p-1">
              <Bell className="w-5 h-5" />
            </button>
            
            <ThemeToggle />
            
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--neon)] to-blue-500 p-[2px] cursor-pointer shadow-[0_0_15px_rgba(101,163,13,0.2)] hover:shadow-[0_0_20px_rgba(101,163,13,0.4)] transition-shadow">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <span className="text-xs font-bold font-mono text-foreground">{initials}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto scrollbar-none">
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <QuantLoader className="w-8 h-8 text-[var(--neon)]" />
            </div>
          }>
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
