"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { SignUp } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';
import { Logo } from '@/components/logo';

export default function SignUpPage() {
  const { theme, systemTheme } = useTheme();
  
  // Determine if we should render dark mode for Clerk
  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-500 font-sans selection:bg-[var(--neon)] selection:text-white relative overflow-hidden">
      
      {/* Animated Mesh Gradient Background */}
      <div className="bg-mesh"></div>

      {/* Floating Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        
        {/* Back Link */}
        <Link href="/" className="absolute top-8 left-8 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Return</span>
        </Link>

        {/* Login Card */}
        <div className="w-full max-w-md glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl shadow-[var(--neon-dim)] group mt-10">
          {/* Subtle top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[var(--neon)] to-transparent opacity-50"></div>
          
          <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-6">
              <Logo />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground">Create Account</h1>
            <p className="text-muted-foreground font-medium text-sm">Join the VeylanLabs platform.</p>
          </div>

          <div className="flex justify-center w-full">
            <SignUp 
              routing="hash"
              forceRedirectUrl="/dashboard"
              appearance={{
                baseTheme: isDark ? dark : undefined,
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none w-full p-0 flex flex-col gap-4",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "border border-border bg-background hover:bg-muted text-foreground transition-all rounded-xl py-3",
                  socialButtonsBlockButtonText: "font-bold text-sm",
                  dividerLine: "bg-border",
                  dividerText: "text-muted-foreground text-xs font-bold",
                  formFieldLabel: "text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1 mb-1",
                  formFieldInput: "w-full bg-background border border-border rounded-xl py-3 px-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-[var(--neon)] focus:ring-1 focus:ring-[var(--neon)] transition-all shadow-sm",
                  formButtonPrimary: "w-full py-3.5 rounded-xl bg-[var(--neon)] text-background font-bold hover:brightness-110 transition-all mt-2 shadow-lg",
                  footerActionText: "text-muted-foreground text-xs",
                  footerActionLink: "text-[var(--neon)] hover:brightness-110 transition-colors font-medium text-xs",
                  identityPreviewText: "text-foreground font-medium",
                  identityPreviewEditButtonIcon: "text-[var(--neon)]",
                  formFieldWarningText: "text-amber-500 text-xs",
                  formFieldErrorText: "text-red-500 text-xs",
                  alertText: "text-foreground text-sm",
                }
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
