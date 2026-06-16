"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { PricingButton } from '@/components/pricing-button';
import { Candles } from '@/components/charts';
import { Ico, Check } from '@/components/icons';
import { Logo } from '@/components/logo';
import { 
  Activity,
  Zap,
  ChevronRight,
  ChevronLeft,
  Search,

  ShieldAlert,
  BarChart3,
  Quote,
  Menu, 
  X, 
  Users, 
  Clock,
  Star,
  User,
  Magnet,
  Compass,
  MessageSquare,
  BellRing,
  Code2,
  TrendingUp,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { FaTwitter, FaYoutube, FaDiscord, FaInstagram, FaTelegramPlane } from 'react-icons/fa';
import { useTheme } from "next-themes";
import { QuantLoader } from "@/components/quant-loader";
import { TradingViewWidget } from "@/components/tradingview-widget";
import { useUser, UserButton } from '@clerk/nextjs';

// Reusable CountUp Component for the Stats Bar
const CountUp = ({ end, duration = 2000, suffix = "", prefix = "", decimals = 0 }: { end: number, duration?: number, suffix?: string, prefix?: string, decimals?: number }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted) {
        setHasStarted(true);
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      // easeOutExpo for a premium snapping effect that slows down
      const easePercent = percent === 1 ? 1 : 1 - Math.pow(2, -10 * percent);
      
      setCount(end * easePercent);
      
      if (percent < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, end, duration]);

  return <span ref={ref}>{prefix}{count.toFixed(decimals)}{suffix}</span>;
};

const FAQ = [
  ["Do I need to know how to code?", "No. Everything runs inside TradingView through your membership — no Pine Script, no installs."],
  ["Which markets and timeframes?", "Any market TradingView has data for — FX, indices, futures, crypto, stocks. Built around intraday session trading but reads across timeframes."],
  ["Is this financial advice?", "No. VeylanLabs provides educational tools, analysis and a community. Every decision and every risk is yours."],
  ["Can I cancel anytime?", "Yes — subscriptions with no lock-in. You keep access through the end of your billing period."],
];

const PRICES = {
  member: { m: ["$49", "Billed monthly"], q: ["$42", "$126 billed quarterly"], y: ["$34", "$408 billed yearly"] },
  inner: { m: ["$89", "Billed monthly"], q: ["$76", "$228 billed quarterly"], y: ["$66", "$792 billed yearly"] },
};

const SYMBOLS = [
  {
    id: "BTC",
    name: "Bitcoin",
    chartSymbol: "BITSTAMP:BTCUSD",
    gaugeSymbol: "BITSTAMP:BTCUSD",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=032",
    description: "Digital store of value. Trading 24/7 with massive liquidity sweeps.",
  },
  {
    id: "ETH",
    name: "Ethereum",
    chartSymbol: "BITSTAMP:ETHUSD",
    gaugeSymbol: "BITSTAMP:ETHUSD",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=032",
    description: "Smart contract platform. Highly reactive during London & NY sessions.",
  },
  {
    id: "SPX",
    name: "S&P 500",
    chartSymbol: "FOREXCOM:SPXUSD",
    gaugeSymbol: "FOREXCOM:SPXUSD",
    icon: (
      <svg className="w-4.5 h-4.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: "inline-block" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28m-5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    description: "Benchmark US stock index. The primary driver of session volume.",
  },
  {
    id: "EURUSD",
    name: "EUR/USD",
    chartSymbol: "FX_IDC:EURUSD",
    gaugeSymbol: "FX_IDC:EURUSD",
    icon: (
      <span className="font-bold text-xs text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded" style={{ display: "inline-block" }}>€/$</span>
    ),
    description: "Most liquid currency pair. Perfect for session range expansions.",
  },
  {
    id: "GOLD",
    name: "Gold",
    chartSymbol: "TVC:GOLD",
    gaugeSymbol: "TVC:GOLD",
    icon: (
      <span className="font-bold text-xs text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded" style={{ display: "inline-block" }}>Au</span>
    ),
    description: "Safe haven commodity. Shows explosive breakout patterns on news events.",
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [cycle, setCycle] = useState("m");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { theme, systemTheme } = useTheme();
  const { isSignedIn } = useUser();
  const [mounted, setMounted] = useState(false);
  const [selectedSymbolIdx, setSelectedSymbolIdx] = useState(0);

  const heroWords = ["Structure.", "Liquidity.", "the Trend.", "the Market."];
  const [heroWordIdx, setHeroWordIdx] = useState(0);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galleryImages = [
    { src: "/sc-1.png", title: "Market Cap BTC Dominance" },
    { src: "/sc-2.png", title: "Technicals Gauge" },
    { src: "/sc-3.png", title: "Performance Metrics" },
    { src: "/sc-4.png", title: "Seasonals Chart" }
  ];

  useEffect(() => {
    setMounted(true);
    // Rotating word effect for hero
    const wordInterval = setInterval(() => {
      setHeroWordIdx((prev) => (prev + 1) % heroWords.length);
    }, 2500);
    return () => clearInterval(wordInterval);
  }, [heroWords.length]);

  const resolvedTheme = mounted 
    ? (theme === "system" ? systemTheme : theme) 
    : "dark";

  const activeSymbol = SYMBOLS[selectedSymbolIdx];

  // The prototype handles colors dynamically based on theme. 
  // We'll use CSS variables provided by Next-themes / globals.css for these.
  const c = { 
    up: "var(--up)", 
    dn: "var(--red)", 
    accent: "var(--accent)", 
    grid: "var(--border)", 
    bar: "var(--surface-3)", 
    t3: "var(--text-3)" 
  };

  useEffect(() => { 
    const f = () => {
      setScrolled(window.scrollY > 16);
      if (window.scrollY < 100) setActiveSection("");
    };
    window.addEventListener("scroll", f); 
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: "-30% 0px -70% 0px" });

    const sections = document.querySelectorAll("div.sec[id]");
    sections.forEach((s) => observer.observe(s));
    
    return () => {
      window.removeEventListener("scroll", f); 
      sections.forEach((s) => observer.unobserve(s));
    };
  }, []);

  const m = PRICES.member[cycle as keyof typeof PRICES.member];
  const n = PRICES.inner[cycle as keyof typeof PRICES.inner];

  // Helper to map cycle to Stripe Price IDs from environment variables
  const getPriceId = (tier: "member" | "inner", period: string) => {
    if (tier === "member") {
      if (period === "m") return process.env.NEXT_PUBLIC_STRIPE_PRICE_MEMBER_MONTHLY || "";
      if (period === "q") return process.env.NEXT_PUBLIC_STRIPE_PRICE_MEMBER_QUARTERLY || "";
      return process.env.NEXT_PUBLIC_STRIPE_PRICE_MEMBER_ANNUAL || "";
    } else {
      if (period === "m") return process.env.NEXT_PUBLIC_STRIPE_PRICE_INNER_MONTHLY || "";
      if (period === "q") return process.env.NEXT_PUBLIC_STRIPE_PRICE_INNER_QUARTERLY || "";
      return process.env.NEXT_PUBLIC_STRIPE_PRICE_INNER_ANNUAL || "";
    }
  };

  return (
    <>
      <div className="vl">
      {/* Seamless Mayhem Background */}
      <div className="fixed inset-0 z-[-2] pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-top bg-no-repeat opacity-30 mix-blend-luminosity" 
          style={{ backgroundImage: "url('/showcase-1.png')" }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/50 to-[var(--bg)]" />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className={`topnav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-in">
          <Logo />
          <div className="nav-links">
            <Link href="#features" className={activeSection === "features" ? "active" : ""}>Features</Link>
            <Link href="#pricing" className={activeSection === "pricing" ? "active" : ""}>Pricing</Link>
            <Link href="#faq" className={activeSection === "faq" ? "active" : ""}>FAQ</Link>
          </div>
          <div className="nav-right" style={{ gap: "16px" }}>
            <ThemeToggle />
            {isSignedIn ? (
              <>
                <Link href="/dashboard" className="btn btn-soft btn-sm hidden sm:inline-flex" style={{ padding: "6px 14px", height: 36 }}>Dashboard</Link>
                <div className="flex items-center" style={{ height: 36 }}>
                  <UserButton />
                </div>
              </>
            ) : (
              <Link href="/login" className="btn btn-soft btn-sm hidden sm:inline-flex" style={{ padding: "6px 14px", height: 36 }}>Log in</Link>
            )}
            <button 
              className="md:hidden text-foreground p-2 focus:outline-none hover:bg-surface-2 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-[var(--bg)] px-6 py-6 flex flex-col gap-4">
            <Link href="#features" onClick={() => setMobileMenuOpen(false)} className={`text-sm font-semibold py-2 border-b border-border/50 ${activeSection === "features" ? "text-[var(--accent)]" : "text-muted-foreground hover:text-foreground"}`}>Features</Link>
            <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className={`text-sm font-semibold py-2 border-b border-border/50 ${activeSection === "pricing" ? "text-[var(--accent)]" : "text-muted-foreground hover:text-foreground"}`}>Pricing</Link>
            <Link href="#faq" onClick={() => setMobileMenuOpen(false)} className={`text-sm font-semibold py-2 border-b border-border/50 ${activeSection === "faq" ? "text-[var(--accent)]" : "text-muted-foreground hover:text-foreground"}`}>FAQ</Link>
            {isSignedIn ? (
              <>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="btn btn-soft btn-block justify-center py-3">Dashboard</Link>
                <div className="flex justify-center py-2">
                  <UserButton />
                </div>
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-soft btn-block justify-center py-3">Log in</Link>
            )}
          </div>
        )}
      </div>

      <section style={{ position: "relative", overflow: "hidden" }}>
        {/* Glow Effects */}
        <div className="glow-ambient" style={{ top: "-10%", left: "-10%" }} />
        <div className="glow-ambient" style={{ top: "30%", right: "-10%", opacity: 0.2 }} />
        <div className="bg-grid" />
        <div className="bg-mesh" />

        <div className="mk animate-fade-in-up">
          <div className="hero">
            <div className="badge-interactive" style={{ margin: "0 auto 24px" }}>
              <span className="dotg" />
              PREMIUM TRADING ECOSYSTEM
            </div>
            <h1 style={{ fontSize: "clamp(38px, 6vw, 64px)", lineHeight: 1.12, marginBottom: 24, fontWeight: 800, maxWidth: "800px", margin: "0 auto 24px", position: "relative" }}>
              Stop chasing signals.<br />
              Understand <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-400 drop-shadow-[0_0_15px_var(--neon-dim)]" style={{ display: "inline-block", minWidth: "280px", textAlign: "left" }}>{heroWords[heroWordIdx]}</span>
            </h1>
            <p style={{ fontSize: "19px", color: "var(--text-2)", marginBottom: 36, maxWidth: "600px", margin: "0 auto 36px", lineHeight: 1.6 }}>
              VeylanLabs reads the session for you in real-time — structure, liquidity sweeps, and high-probability entries — so you can trade with institutional precision.
            </p>
            <div className="hero-cta" style={{ justifyContent: "center" }}>
              <Link href="#pricing" className="btn btn-primary hover-pulse-glow" style={{ padding: "14px 28px", fontSize: 16 }}>Start trading smarter</Link>
              <Link href="#features" className="btn btn-ghost" style={{ padding: "14px 28px", fontSize: 16 }}>View features</Link>
            </div>
          </div>
        </div>

        {/* Statistics / Trust Bar */}
        <div className="mk animate-fade-in-up delay-100" style={{ marginTop: "40px", marginBottom: "80px" }}>
          <div className="glass-premium" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", padding: "32px", borderRadius: "18px", textAlign: "center", border: "1px solid var(--border)", background: "var(--surface)" }}>
            <div className="flex flex-col items-center p-4 rounded-xl hover:bg-[var(--surface-2)] transition-colors group cursor-default">
              <div className="flex items-center justify-center gap-2 mb-2 text-accent group-hover:text-[var(--neon)] transition-colors">
                <Users className="w-8 h-8 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300" />
                <span className="text-4xl font-extrabold font-display drop-shadow-[0_0_15px_var(--neon-dim)]">
                  <CountUp end={25} suffix="K+" />
                </span>
              </div>
              <div className="text-sm text-text-2 uppercase tracking-widest font-mono group-hover:text-foreground transition-colors">Active Traders</div>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-xl hover:bg-[var(--surface-2)] transition-colors group cursor-default relative">
              <div className="absolute inset-0 bg-[var(--neon)] opacity-0 group-hover:opacity-5 rounded-xl blur-xl transition-opacity duration-500" />
              <div className="flex items-center justify-center gap-2 mb-2 text-accent group-hover:text-[var(--neon)] transition-colors">
                <TrendingUp className="w-8 h-8 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300" />
                <span className="text-4xl font-extrabold font-display drop-shadow-[0_0_15px_var(--neon-dim)]">
                  <CountUp end={10} suffix="M+" />
                </span>
              </div>
              <div className="text-sm text-text-2 uppercase tracking-widest font-mono group-hover:text-foreground transition-colors">Data Points Analyzed</div>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-xl hover:bg-[var(--surface-2)] transition-colors group cursor-default relative">
              <div className="absolute inset-0 bg-[var(--neon)] opacity-0 group-hover:opacity-5 rounded-xl blur-xl transition-opacity duration-500" />
              <div className="flex items-center justify-center gap-2 mb-2 text-accent group-hover:text-[var(--neon)] transition-colors">
                <ShieldCheck className="w-8 h-8 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300" />
                <span className="text-4xl font-extrabold font-display drop-shadow-[0_0_15px_var(--neon-dim)]">
                  <CountUp end={99.9} decimals={1} suffix="%" duration={2500} />
                </span>
              </div>
              <div className="text-sm text-text-2 uppercase tracking-widest font-mono group-hover:text-foreground transition-colors">Backtest Accuracy</div>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-xl hover:bg-[var(--surface-2)] transition-colors group cursor-default relative">
              <div className="absolute inset-0 bg-[var(--neon)] opacity-0 group-hover:opacity-5 rounded-xl blur-xl transition-opacity duration-500" />
              <div className="flex items-center justify-center gap-2 mb-2 text-accent group-hover:text-[var(--neon)] transition-colors">
                <Globe className="w-8 h-8 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300" />
                <span className="text-4xl font-extrabold font-display drop-shadow-[0_0_15px_var(--neon-dim)]">
                  <CountUp end={150} suffix="+" duration={1500} />
                </span>
              </div>
              <div className="text-sm text-text-2 uppercase tracking-widest font-mono group-hover:text-foreground transition-colors">Countries</div>
            </div>
          </div>
        </div>



        <div className="sec" id="features">
          <div className="mk">
            <div className="sec-head center">
              <span className="eyebrow">The Difference</span>
              <h2>An arrow tells you nothing.</h2>
              <p>Most indicators fire a signal and leave. We put the entire read on your chart — in plain language.</p>
            </div>
            
            <div className="ba">
              <div className="card card-old-way glass-premium animate-fade-in-up delay-100">
                <div className="h">
                  <span className="badge-comparison badge-old-way">The Old Way</span>
                  <span>SIGNAL ONLY</span>
                </div>
                <div className="ch" style={{ height: "220px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Candles c={c} n={24} vol={20} seed={5} tr={0.5} w={460} h={180} />
                  <div className="lonebuy">BUY</div>
                </div>
                <div className="f">One arrow. No context, no session, no invalidation — you're guessing why it fired and holding when it fails.</div>
              </div>
              <div className="card card-new-way glass-premium moving-border animate-fade-in-up delay-200">
                <div className="h">
                  <span className="badge-comparison badge-new-way">The VeylanLabs Way</span>
                  <span>FULL CONTEXT</span>
                </div>
                <div className="ch" style={{ padding: 0, height: "220px", overflow: "hidden" }}>
                  <img 
                    src={resolvedTheme === "light" ? "/chart-vway-light.png" : "/chart-vway-dark.png"} 
                    alt="VeylanLabs Full Chart Context" 
                    className="indicator-card-img" 
                    style={{ marginTop: 0, borderRadius: 0, border: "none", width: "100%", height: "100%", objectFit: "cover", objectPosition: "left 52%" }} 
                  />
                </div>
                <div className="f">What the session is doing, where liquidity sits, the structure shift, your entry — and the level that says you're wrong.</div>
              </div>
            </div>
            

          </div>
        </div>



        <div className="sec">
          <div className="mk animate-fade-in-up">
            <div className="sec-head center mb-16">
              <span className="eyebrow">The Indicators</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mt-2">
                Designed for <span className="text-[var(--neon)]">Performance.</span>
              </h2>
            </div>
            
            {/* Feature / Info Cards matching mockup */}
            <div className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-premium p-8 rounded-2xl flex flex-col items-start transition-all duration-300 hover:border-accent group">
                  <div className="w-12 h-12 rounded-xl bg-surface-2 border border-border flex items-center justify-center mb-5 text-accent group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-display uppercase tracking-wide mb-2">High Performance</h4>
                  <p className="text-text-2 text-sm">Optimized for speed and accuracy in all market conditions.</p>
                </div>
                <div className="glass-premium p-8 rounded-2xl flex flex-col items-start transition-all duration-300 hover:border-accent group">
                  <div className="w-12 h-12 rounded-xl bg-surface-2 border border-border flex items-center justify-center mb-5 text-accent group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-display uppercase tracking-wide mb-2">Risk Management</h4>
                  <p className="text-text-2 text-sm">Advanced risk tools to help you protect capital and stay consistent.</p>
                </div>
                <div className="glass-premium p-8 rounded-2xl flex flex-col items-start transition-all duration-300 hover:border-accent group">
                  <div className="w-12 h-12 rounded-xl bg-surface-2 border border-border flex items-center justify-center mb-5 text-accent group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-display uppercase tracking-wide mb-2">Data Driven</h4>
                  <p className="text-text-2 text-sm">Backtested strategies and real market data power everything we build.</p>
                </div>
                <div className="glass-premium p-8 rounded-2xl flex flex-col items-start transition-all duration-300 hover:border-accent group">
                  <div className="w-12 h-12 rounded-xl bg-surface-2 border border-border flex items-center justify-center mb-5 text-accent group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-display uppercase tracking-wide mb-2">Trader Focused</h4>
                  <p className="text-text-2 text-sm">Built by traders, for traders. We understand what really matters.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sec">
          <div className="mk">
            <div className="sec-head center"><span className="eyebrow">How it works</span><h2>Set up in minutes.</h2></div>
            <div className="timeline-container">
              <div className="timeline-line" />
              {[
                ["01", "Choose your plan", "Pick a membership and check out securely."], 
                ["02", "Connect accounts", "Add your TradingView and Telegram usernames."], 
                ["03", "Access granted", "Indicators unlock, group invite lands."], 
                ["04", "Trade live with us", "Read the market together, every session."]
              ].map((s, i) => (
                <div className="timeline-step" key={i}>
                  <div className="timeline-node-wrapper">
                    <span>{s[0]}</span>
                  </div>
                  <h4>{s[1]}</h4>
                  <p>{s[2]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sec animate-fade-in-up" id="pricing">
          <div className="hero mk" style={{ paddingBottom: 30, paddingTop: 0 }}>
            <span className="eyebrow">Membership</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight mt-2 mb-6">
              Pricing that respects<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[var(--neon)] to-emerald-400 animate-gradient-x inline-block">
                serious traders.
              </span>
            </h2>
            <p className="text-[var(--text-2)] text-lg">One ecosystem — indicators, academy, and a live community. Cancel anytime.</p>
            <div className="bill" style={{ marginTop: 34 }}>
              {[["m", "Monthly"], ["q", "Quarterly −15%"], ["y", "Yearly −35%"]].map(b => (
                <button key={b[0]} className={`cursor-pointer ${cycle === b[0] ? "active" : ""}`} onClick={() => setCycle(b[0])}>{b[1]}</button>
              ))}
            </div>
          </div>
          <div className="mk" style={{ position: "relative", zIndex: 1 }}>
            <div className="plans">
              <div className="plan glass-premium delay-100">
                <div className="pn">Member</div>
                <div className="pp">{m[0]}<span>/mo</span></div>
                <div className="pb">{m[1]}</div>
                <ul>
                  {["Full indicator suite", "Private Telegram community", "Full academy & tutorials", "Context alerts"].map((x, i) => <li key={i}><Check />{x}</li>)}
                </ul>
                <PricingButton priceId={getPriceId("member", cycle)} className="btn btn-ghost btn-block mt-4 hover-pulse-glow" style={{ padding: "12px" }}>
                  Choose Member
                </PricingButton>
              </div>
              <div className="plan pop glass-premium popular-pulse-card delay-200">
                <div className="pop-b shadow-[0_0_10px_var(--neon)]">MOST POPULAR</div>
                <div className="pn grn">Inner Circle</div>
                <div className="pp">{n[0]}<span>/mo</span></div>
                <div className="pb">{n[1]}</div>
                <ul>
                  {["Everything in Member", "Live daily session breakdowns", "Early access to new indicators", "The Assistant at launch"].map((x, i) => <li key={i}><Check />{x}</li>)}
                </ul>
                <PricingButton priceId={getPriceId("inner", cycle)} className="btn btn-primary btn-block mt-4 hover-pulse-glow" style={{ padding: "12px" }}>
                  Choose Inner Circle
                </PricingButton>
              </div>
            </div>
            <div className="cmp">
              <table>
                <tbody>
                  <tr><th>Compare</th><th>Member</th><th>Inner Circle</th></tr>
                  {[
                    ["Indicator suite", 1, 1], 
                    ["Telegram community", 1, 1], 
                    ["Live session breakdowns", 0, 1], 
                    ["The Assistant", 0, 1]
                  ].map((r, i) => (
                    <tr key={i}>
                      <td>{r[0]}</td>
                      <td>{r[1] ? <Check /> : <span className="dim">—</span>}</td>
                      <td>{r[2] ? <Check /> : <span className="dim">—</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--text-3)", margin: "24px 0 90px" }}>
              <span className="grn">◆ Founding Member pricing</span> — locked for life while we build.
            </p>
          </div>
        </div>

        <div className="sec" id="faq">
          <div className="mk">
            <div className="sec-head center"><span className="eyebrow">FAQ</span><h2>Good questions.</h2></div>
            <div className="faq max-w-3xl mx-auto flex flex-col gap-4 mt-12">
              {FAQ.map((q, i) => (
                <div className={`glass-premium rounded-2xl border ${openFaq === i ? 'border-[var(--neon)] bg-[var(--surface-2)] shadow-[0_0_20px_rgba(16,185,129,0.05)]' : 'border-border hover:border-border-hover'} transition-all duration-300 overflow-hidden`} key={i}>
                  <button 
                    className="cursor-pointer w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group" 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className={`font-medium text-lg transition-colors duration-300 ${openFaq === i ? 'text-[var(--neon)]' : 'group-hover:text-[var(--neon)]'}`}>
                      {q[0]}
                    </span>
                    
                    {/* Animated +/- Icon */}
                    <div className="relative w-5 h-5 flex items-center justify-center flex-shrink-0 ml-4">
                      {/* Horizontal line (always visible) */}
                      <div className={`absolute w-full h-[2px] transition-all duration-500 rounded-full ${openFaq === i ? 'bg-[var(--neon)] rotate-180' : 'bg-muted-foreground group-hover:bg-[var(--neon)]'}`} />
                      {/* Vertical line (disappears/rotates when open) */}
                      <div className={`absolute h-full w-[2px] transition-all duration-500 rounded-full ${openFaq === i ? 'bg-[var(--neon)] rotate-90 opacity-0' : 'bg-muted-foreground group-hover:bg-[var(--neon)]'}`} />
                    </div>
                  </button>
                  
                  {/* Animated Answer Body */}
                  <div 
                    className="transition-all duration-500 ease-in-out px-6" 
                    style={{ 
                      maxHeight: openFaq === i ? "300px" : "0px",
                      opacity: openFaq === i ? 1 : 0,
                      paddingBottom: openFaq === i ? "20px" : "0px"
                    }}
                  >
                    <p className="text-[var(--text-2)] leading-relaxed text-base pt-2">
                      {q[1]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="sec">
          <div className="mk">
            <div className="glass-premium p-0 rounded-3xl overflow-hidden border border-[var(--border)] flex flex-col md:flex-row relative group hover:border-[var(--neon)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] min-h-[380px]">
              
              {/* Testimonial text block */}
              <div className="p-10 md:p-14 lg:p-16 flex-1 flex flex-col justify-center relative z-10 w-full md:w-3/5 lg:w-[60%]">
                <div className="flex items-center gap-1.5 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-emerald-500 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl lg:text-3xl font-medium mb-8 leading-normal tracking-tight text-[var(--text)]">
                  "VeylanLabs indicators have completely transformed the way I trade. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-400 font-bold">The edge is real.</span>"
                </p>
                
                <div className="flex items-center gap-4 mt-2">
                  <div className="w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.15)] relative overflow-hidden group-hover:border-[var(--neon)] transition-colors duration-500">
                    <User className="w-5 h-5 text-[var(--text-2)] group-hover:text-[var(--neon)] transition-colors duration-500" />
                  </div>
                  <div>
                    <div className="font-bold text-lg tracking-wide text-[var(--text)]">Alex T.</div>
                    <div className="text-[var(--text-3)] text-xs font-mono tracking-widest uppercase mt-0.5">Full-time Trader</div>
                  </div>
                </div>
              </div>
              
              {/* Hooded trader image block */}
              <div className="hidden md:block absolute top-0 right-0 bottom-0 w-2/5 lg:w-[45%]">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/hero-trader.png')" }} />
                {/* Horizontal fade into the black text area using app's true bg color */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-80" />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="sec pb-12">
          <div className="mk">
            <div className="relative rounded-3xl overflow-hidden p-8 md:p-14 text-center border border-[var(--border)] flex flex-col items-center justify-center min-h-[320px] bg-[var(--surface)] shadow-[0_0_40px_rgba(16,185,129,0.08)] transition-all duration-700 hover:border-[var(--neon)] group">
              {/* Background gradient/textures */}
              <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('/showcase-1.png')" }} />
              <div className="bg-mesh opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--surface)] to-[var(--bg)] opacity-90" />
              
              <div className="relative z-10 max-w-3xl flex flex-col items-center">
                <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--neon)] bg-emerald-500/10 text-[var(--neon)] text-xs font-mono font-bold tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-[var(--neon)] animate-pulse" />
                  SYSTEM ONLINE
                </div>
                
                <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-4 leading-tight uppercase">
                  Ready to elevate <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-400">your trading?</span>
                </h2>
                
                <p className="text-[var(--text-2)] text-base md:text-lg mb-8 max-w-xl leading-relaxed">
                  Join VeylanLabs and get access to our complete suite of indicators and tools.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto mt-2">
                  <Link href="#pricing" className="cursor-pointer inline-flex items-center justify-center w-full sm:w-auto group/btn">
                    <button className="cursor-pointer relative overflow-hidden flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[var(--neon)] to-emerald-500 rounded-xl text-[var(--bg)] text-sm font-extrabold uppercase tracking-widest transition-all duration-300 group-hover/btn:-translate-y-1 group-hover/btn:shadow-[0_10px_40px_rgba(16,185,129,0.5)]">
                      <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[50%] transition-transform duration-1000 ease-out" />
                      Get Access Now
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" strokeWidth={3} />
                    </button>
                  </Link>
                </div>
                
                <div className="flex items-center justify-center gap-6 mt-8 text-[11px] text-[var(--text-3)] font-mono font-bold tracking-widest uppercase">
                  <span className="flex items-center gap-2 text-[var(--neon)]"><Check className="w-3 h-3" /> Instant Access</span>
                  <span className="w-1 h-1 rounded-full bg-[var(--border)]"></span>
                  <span className="flex items-center gap-2"><Check className="w-3 h-3 text-[var(--text-3)]" /> Cancel Anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sec" style={{ border: "none" }}>
          <div className="mk">
            <div className="disc">
              <div className="h">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></svg>
                Risk Disclaimer
              </div>
              <p>VeylanLabs provides indicators, education and community for informational purposes only. Nothing here is financial advice. Trading carries substantial risk and you can lose money — past performance does not guarantee future results. No indicator predicts the market or guarantees profit. Manage your risk and never trade with money you can't afford to lose.</p>
            </div>
          </div>
        </div>

      </section>

      <footer className="footer">
        <div className="foot">
          <div className="fb">
            <Logo />
            <p>See the structure. Discipline, structure, execution — and a community that trades it live.</p>
          </div>
          <div>
            <h5>Product</h5>
            <Link href="#features">Indicators</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="/login">Log in</Link>
          </div>
          <div>
            <h5>Learn</h5>
            <Link href="#features">Features</Link>
            <Link href="#faq">FAQ</Link>
            <Link href="#">Academy</Link>
          </div>
          <div>
            <h5>Company</h5>
            <Link href="#">About</Link>
            <Link href="#">Contact</Link>
            <Link href="#">Terms & Privacy</Link>
          </div>
        </div>

        <div className="foot-bot flex flex-col md:flex-row justify-between items-center gap-6 mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left text-sm text-text-3">
            <span>© 2026 VeylanLabs</span>
            <span className="hidden md:inline">·</span>
            <span>Educational use only · Not financial advice · Trade at your own risk.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]" style={{ color: "var(--neon)" }}>
              <FaTwitter className="w-6 h-6" />
            </Link>
            <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]" style={{ color: "var(--neon)" }}>
              <FaYoutube className="w-6 h-6" />
            </Link>
            <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]" style={{ color: "var(--neon)" }}>
              <FaDiscord className="w-6 h-6" />
            </Link>
            <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]" style={{ color: "var(--neon)" }}>
              <FaInstagram className="w-6 h-6" />
            </Link>
            <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]" style={{ color: "var(--neon)" }}>
              <FaTelegramPlane className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </footer>
      
      {/* Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300" onClick={() => setLightboxIndex(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-[var(--neon)] transition-colors z-[110]" onClick={() => setLightboxIndex(null)}>
            <X className="w-8 h-8" />
          </button>
          
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[var(--neon)] transition-colors p-2 z-[110]" onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length); }}>
            <ChevronLeft className="w-10 h-10 drop-shadow-md" />
          </button>
          
          <div className="relative w-full max-w-5xl aspect-[16/9] rounded-xl overflow-hidden border border-border shadow-[0_0_50px_rgba(16,185,129,0.2)] bg-[#0a0a0a] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img src={galleryImages[lightboxIndex].src} alt={galleryImages[lightboxIndex].title} className="w-full h-full object-scale-down p-4" />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-12 text-center pointer-events-none">
              <h3 className="text-white font-bold text-xl tracking-wide">{galleryImages[lightboxIndex].title}</h3>
            </div>
          </div>
          
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[var(--neon)] transition-colors p-2 z-[110]" onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % galleryImages.length); }}>
            <ChevronRight className="w-10 h-10 drop-shadow-md" />
          </button>
        </div>
      )}
    </div>
    </>
  );
}
