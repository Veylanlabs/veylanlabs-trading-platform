"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldAlert, Users, LogOut, ArrowLeft, BarChart3, Key, Settings, ChevronLeft, ChevronRight, Menu, Search } from 'lucide-react';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserButton, SignOutButton } from '@clerk/nextjs';
import { CommandPalette } from '@/components/command-palette';
import { motion, AnimatePresence } from 'framer-motion';

export function AdminClientLayout({ 
  children, 
  userEmail 
}: { 
  children: React.ReactNode;
  userEmail: string;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="h-[100dvh] bg-background text-foreground font-sans selection:bg-[var(--neon)] selection:text-background flex overflow-hidden">
      <CommandPalette />
      
      <div className="bg-mesh opacity-30 fixed inset-0 pointer-events-none" />

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
        <div className="h-20 flex items-center px-6 border-b border-[var(--neon)]/30 justify-between lg:justify-start">
          {!isCollapsed && (
            <div className="flex items-center">
              <Logo />
              <span className="ml-2 text-[9px] font-bold bg-red-500/20 text-red-500 px-1.5 py-0.5 rounded font-mono tracking-widest border border-red-500/30">ADMIN</span>
            </div>
          )}
          {isCollapsed && <div className="font-display text-3xl font-bold text-red-500 mx-auto tracking-widest pl-2">V</div>}
          <div className="ml-auto flex items-center gap-2">
            <button className="hidden lg:flex text-muted-foreground hover:text-red-500 transition-colors" onClick={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            <button className="lg:hidden text-muted-foreground hover:text-red-500 transition-colors" onClick={() => setIsSidebarOpen(false)}>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 py-6 px-4 flex flex-col gap-2 overflow-y-auto scrollbar-none">
          <Link href="/admin" className={`flex items-center gap-3 py-3 rounded-xl bg-red-500/10 text-red-500 font-bold transition-all border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)] ${isCollapsed ? 'justify-center px-0' : 'px-3'}`}>
            <Users className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>User Management</span>}
          </Link>
          
          <Link href="/dashboard" className={`flex items-center gap-3 py-3 rounded-xl text-muted-foreground hover:bg-muted font-medium transition-all group mt-auto border border-transparent ${isCollapsed ? 'justify-center px-0' : 'px-3'}`}>
            <ArrowLeft className="w-5 h-5 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
            {!isCollapsed && <span>Back to Dashboard</span>}
          </Link>

          <SignOutButton>
            <button className={`flex items-center w-full gap-3 py-3 rounded-xl text-red-500/80 hover:bg-red-500/10 hover:text-red-500 font-medium transition-all border border-transparent mt-1 text-left ${isCollapsed ? 'justify-center px-0' : 'px-3'}`}>
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>Sign Out</span>}
            </button>
          </SignOutButton>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full relative z-10 w-full overflow-hidden">
        <header className="h-20 flex-shrink-0 bg-background/50 backdrop-blur-md border-b border-border flex items-center justify-between px-4 sm:px-8 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-foreground bg-card border border-border hover:border-red-500/50 transition-colors p-2 rounded-lg" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <button 
              onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
              className="hidden md:flex items-center justify-between px-4 py-2 bg-card/50 backdrop-blur-md border border-border hover:border-red-500/50 transition-all rounded-xl text-sm w-72 text-muted-foreground group shadow-sm hover:shadow-[0_0_15px_rgba(239,68,68,0.1)]"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 group-hover:text-red-500 transition-colors" />
                <span className="group-hover:text-foreground transition-colors">Search commands...</span>
              </div>
              <kbd className="bg-background/50 px-2 py-0.5 rounded text-[10px] font-mono border border-border group-hover:border-red-500/30 group-hover:text-red-500 transition-colors font-bold tracking-widest shadow-sm">CTRL+K</kbd>
            </button>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <ThemeToggle />
            <div className="text-[10px] font-bold text-muted-foreground border border-border px-3 py-1.5 rounded-full bg-card hidden sm:block font-mono tracking-widest shadow-sm">
              ADMIN: <span className="text-foreground">{userEmail}</span>
            </div>
            <UserButton />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto scrollbar-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full h-full max-w-[1400px] mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
