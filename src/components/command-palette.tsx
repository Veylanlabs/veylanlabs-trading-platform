"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { BarChart3, TrendingUp, ShieldAlert, Terminal, Settings, LogOut, Search } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { signOut } = useClerk();

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (action: () => void) => {
    setOpen(false);
    action();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh] bg-background/80 backdrop-blur-sm px-4">
      <div className="fixed inset-0" onClick={() => setOpen(false)} />
      
      <Command 
        className="relative w-full max-w-2xl bg-card border border-[var(--neon)]/30 rounded-2xl shadow-[0_0_40px_rgba(101,163,13,0.15)] overflow-hidden flex flex-col font-sans"
        label="Global Command Menu"
        loop
      >
        <div className="flex items-center px-4 py-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground mr-3" />
          <Command.Input 
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-foreground text-lg placeholder:text-muted-foreground font-mono" 
            placeholder="Search commands, modules, or press esc to close..." 
          />
          <div className="hidden sm:flex items-center gap-1">
            <kbd className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs font-mono border border-border">ESC</kbd>
          </div>
        </div>

        <Command.List className="max-h-[60vh] overflow-y-auto p-2 scrollbar-none">
          <Command.Empty className="py-10 text-center text-muted-foreground font-mono">No results found.</Command.Empty>

          <Command.Group heading="Core Modules" className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2 pt-4">
            <Command.Item 
              onSelect={() => handleSelect(() => router.push('/dashboard'))}
              className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer aria-selected:bg-[var(--neon-dim)] aria-selected:text-[var(--neon)] transition-colors group text-foreground font-medium"
            >
              <Terminal className="w-5 h-5" />
              Command Center
            </Command.Item>
            <Command.Item 
              onSelect={() => handleSelect(() => router.push('/dashboard/market-structure'))}
              className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer aria-selected:bg-[var(--neon-dim)] aria-selected:text-[var(--neon)] transition-colors group text-foreground font-medium"
            >
              <BarChart3 className="w-5 h-5" />
              Market Structure
            </Command.Item>
            <Command.Item 
              onSelect={() => handleSelect(() => router.push('/dashboard/liquidity-maps'))}
              className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer aria-selected:bg-[var(--neon-dim)] aria-selected:text-[var(--neon)] transition-colors group text-foreground font-medium"
            >
              <TrendingUp className="w-5 h-5" />
              Liquidity Maps
            </Command.Item>
            <Command.Item 
              onSelect={() => handleSelect(() => router.push('/dashboard/risk-protocols'))}
              className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer aria-selected:bg-[var(--neon-dim)] aria-selected:text-[var(--neon)] transition-colors group text-foreground font-medium"
            >
              <ShieldAlert className="w-5 h-5" />
              Risk Protocols
            </Command.Item>
          </Command.Group>

          <Command.Separator className="h-px bg-border my-2" />

          <Command.Group heading="System" className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2 pt-2">
            <Command.Item 
              onSelect={() => handleSelect(() => router.push('/dashboard/preferences'))}
              className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer aria-selected:bg-[var(--neon-dim)] aria-selected:text-[var(--neon)] transition-colors group text-foreground font-medium"
            >
              <Settings className="w-5 h-5" />
              Preferences
            </Command.Item>
            <Command.Item 
              onSelect={() => handleSelect(async () => {
                await signOut();
                router.push('/');
              })}
              className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer aria-selected:bg-red-500/10 aria-selected:text-red-500 transition-colors group text-red-500/80 font-medium"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
