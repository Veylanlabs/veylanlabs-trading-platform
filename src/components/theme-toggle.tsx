"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2.5 rounded-xl bg-black/[0.03] hover:bg-black/[0.08] dark:bg-white/[0.05] dark:hover:bg-white/[0.1] border border-black/5 dark:border-white/10 text-slate-700 dark:text-slate-300 transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="w-5 h-5 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
