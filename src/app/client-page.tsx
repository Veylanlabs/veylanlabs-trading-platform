"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  Globe,
  Play,
  ArrowRight
} from 'lucide-react';
import { FaTwitter, FaYoutube, FaDiscord, FaInstagram, FaTelegramPlane } from 'react-icons/fa';
import { useTheme } from "next-themes";
import { QuantLoader } from "@/components/quant-loader";
import { TradingViewWidget } from "@/components/tradingview-widget";
import { useUser, UserButton } from '@clerk/nextjs';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';





// --- Interactive 3D Tilt Component ---
const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <div style={{ transform: "translateZ(50px)" }}>{children}</div>
    </motion.div>
  );
};

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

const TESTIMONIALS = [
  { name: "Alex T.", role: "FULL-TIME TRADER", text1: "VeylanLabs indicators have completely transformed the way I trade. ", text2: "The edge is real." },
  { name: "Sarah M.", role: "PROP FIRM FUNDED", text1: "I've been trading for 5 years and nothing comes close to this. ", text2: "Absolute game changer." },
  { name: "Marcus L.", role: "SWING TRADER", text1: "The context alerts save me from taking bad setups every single day. ", text2: "Invaluable tool." },
  { name: "David R.", role: "DAY TRADER", text1: "I made back my yearly subscription fee in my first two trades. ", text2: "Highly recommend." },
  { name: "Elena V.", role: "CRYPTO TRADER", text1: "Finally, indicators that actually understand market structure and liquidity. ", text2: "Top tier stuff." },
  { name: "James B.", role: "FULL-TIME TRADER", text1: "The live daily session breakdowns are like a masterclass. ", text2: "I learn something new daily." },
  { name: "Michael C.", role: "SCALPER", text1: "Clean charts, zero lag, and ridiculously accurate levels. ", text2: "Can't trade without it." },
  { name: "Sophia K.", role: "PART-TIME TRADER", text1: "This isn't just an indicator suite, it's a complete trading system. ", text2: "It just works." },
  { name: "Ryan W.", role: "PROP FIRM FUNDED", text1: "I used to overtrade constantly. These tools gave me the patience to wait for ", text2: "the perfect setups." },
  { name: "Thomas N.", role: "SWING TRADER", text1: "The War Room community is the best group of traders I've ever been around. ", text2: "Pure alpha." },
  { name: "Oliver H.", role: "DAY TRADER", text1: "No more second-guessing my entries. The signals are ", text2: "crystal clear." },
  { name: "Emma D.", role: "FULL-TIME TRADER", text1: "Best investment I've made in my trading career. ", text2: "Period." },
];

// Trading video modules configuration with expanded content
const TRADING_MODULES = [
  {
    id: "structure",
    title: "Market Structure",
    badge: "Foundation",
    description: "Master the art of reading market structure — the foundation of all successful trading strategies.",
    details: [
      "Identify higher highs and lower lows with precision",
      "Understand trend shifts before they happen",
      "Spot accumulation and distribution patterns",
      "Learn to distinguish between retracements and reversals",
      "Build a framework for any market condition"
    ],
    videoPath: "/video_1.mp4",
    cta: "Explore Market Structure Indicators →"
  },
  {
    id: "liquidity",
    title: "Liquidity Sweeps",
    badge: "Advanced",
    description: "Learn to identify where institutional money is hiding and how to trade liquidity grabs with confidence.",
    details: [
      "Spot liquidity pools and stop hunts in real-time",
      "Understand the psychology behind liquidity sweeps",
      "Trade breakouts with institutional confirmation",
      "Identify false breaks and genuine momentum shifts",
      "Master the art of trading with smart money"
    ],
    videoPath: "/video_2.mp4",
    cta: "Explore Liquidity Indicators →"
  },
  {
    id: "supply_demand",
    title: "Supply & Demand",
    badge: "Core",
    description: "Understand the fundamental forces driving price action through supply and demand zone analysis.",
    details: [
      "Identify high-probability supply and demand zones",
      "Learn to distinguish between strong and weak zones",
      "Master zone entries with precise risk management",
      "Understand order flow and imbalance dynamics",
      "Combine zones with structure for optimal entries"
    ],
    videoPath: "/video_3.mp4",
    cta: "Explore Supply & Demand Tools →"
  },
  {
    id: "session_trading",
    title: "Session Trading",
    badge: "Practical",
    description: "Learn how to trade different market sessions effectively using session-specific strategies and tools.",
    details: [
      "Understand London, New York, and Asia session dynamics",
      "Identify session-specific opportunities and risks",
      "Learn optimal entry times for each session",
      "Master session overlap strategies",
      "Build a session-based trading routine"
    ],
    videoPath: "/video_4.mp4",
    cta: "Explore Session Trading Tools →"
  }
];

export default function LandingPageClient({ initialPrices }: { initialPrices: any }) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [cycle, setCycle] = useState("m");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeScreener, setActiveScreener] = useState("sfx");
  const [activeModule, setActiveModule] = useState(0);

  const { theme, systemTheme } = useTheme();
  const { isSignedIn } = useUser();
  const [mounted, setMounted] = useState(false);
  const [selectedSymbolIdx, setSelectedSymbolIdx] = useState(0);

  const heroWords = ["Structure.", "Liquidity.", "the Trend.", "the Market."];
  const [heroWordIdx, setHeroWordIdx] = useState(0);

  const [dynamicPrices, setDynamicPrices] = useState<any>(initialPrices);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  // Global Mouse Glow Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  let displayPrice: React.ReactNode = "";
  let displaySuffix = "";
  let displaySub: React.ReactNode = null;

  const getNum = (str: string) => parseInt(str.replace(/[^0-9]/g, "")) || 0;

  const monthlyAmountStr = dynamicPrices?.m?.amount || "$49";
  const monthlyNum = getNum(monthlyAmountStr);

  if (cycle === "m") {
    displayPrice = monthlyAmountStr;
    displaySuffix = "/mo";
    displaySub = "Billed monthly";
  } else if (cycle === "q") {
    const qAmountStr = dynamicPrices?.q?.amount || "$129";
    const qNum = getNum(qAmountStr);
    const originalQ = monthlyNum * 3;

    displayPrice = `$${Math.round(qNum / 3)}`;
    displaySuffix = "/mo";
    const percentQ = Math.round((1 - qNum / originalQ) * 100);

    displaySub = (
      <>
        <span className="line-through text-muted-foreground mr-1 opacity-70">${originalQ}</span>
        {qAmountStr} billed quarterly <span className="text-[var(--neon)] ml-1 font-bold">({percentQ}% off)</span>
      </>
    );
  } else if (cycle === "y") {
    const yAmountStr = dynamicPrices?.y?.amount || "$499";
    const yNum = getNum(yAmountStr);
    const originalY = monthlyNum * 12;

    displayPrice = `$${Math.round(yNum / 12)}`;
    displaySuffix = "/mo";
    const percentY = Math.round((1 - yNum / originalY) * 100);

    displaySub = (
      <>
        <span className="line-through text-muted-foreground mr-1 opacity-70">${originalY}</span>
        {yAmountStr} billed yearly <span className="text-[var(--neon)] ml-1 font-bold">({percentY}% off)</span>
      </>
    );
  }

  const m = [displayPrice, displaySub, displaySuffix];

  // Helper to map cycle to Stripe Price IDs from dynamic prices or fallback to env vars
  const getPriceId = (period: string) => {
    if (dynamicPrices && dynamicPrices[period] && dynamicPrices[period].id) {
      return dynamicPrices[period].id;
    }
    if (period === "m") return process.env.NEXT_PUBLIC_STRIPE_PRICE_MEMBER_MONTHLY || "";
    if (period === "q") return process.env.NEXT_PUBLIC_STRIPE_PRICE_MEMBER_QUARTERLY || "";
    return process.env.NEXT_PUBLIC_STRIPE_PRICE_MEMBER_ANNUAL || "";
  };

  const handleModuleClick = (moduleId: string) => {
    router.push('/indicators');
  };

  return (
    <>
      <div className="vl">
        {/* Global background moved to hero section */}
        <div className={`topnav ${scrolled ? "scrolled" : ""}`}>
          <div className="nav-in">
            <Logo />
            <div className="nav-links">
              <a href="#features" className={activeSection === "features" ? "active" : ""}>Features</a>
              <Link href="/indicators" className={activeSection === "indicators" ? "active" : ""}>Indicators</Link>
              <a href="#pricing" className={activeSection === "pricing" ? "active" : ""}>Pricing</a>
              <a href="#faq" className={activeSection === "faq" ? "active" : ""}>FAQ</a>
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
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className={`text-sm font-semibold py-2 border-b border-border/50 ${activeSection === "features" ? "text-[var(--accent)]" : "text-muted-foreground hover:text-foreground"}`}>Features</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className={`text-sm font-semibold py-2 border-b border-border/50 ${activeSection === "pricing" ? "text-[var(--accent)]" : "text-muted-foreground hover:text-foreground"}`}>Pricing</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className={`text-sm font-semibold py-2 border-b border-border/50 ${activeSection === "faq" ? "text-[var(--accent)]" : "text-muted-foreground hover:text-foreground"}`}>FAQ</a>
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

          <div className="mk animate-fade-in-up" style={{
            margin: 0,
            padding: 0,
            width: "100%",
            maxWidth: "100%"
          }}>
            <div className="hero" style={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              minHeight: "100vh",
              margin: 0,
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {/* Background Video */}
              <div className="absolute inset-0 z-[0] pointer-events-none overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/test.mp4"
                />

                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/10" />

                {/* Gradients to blend it smoothly into the black page */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg)]/60 to-[var(--bg)]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)]/80 via-transparent to-[var(--bg)]/80" />
              </div>

              {/* Content */}
              <div style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                maxWidth: "1200px", // Keeps content readable
                padding: "40px 20px",
                margin: "0 auto",
                textAlign: "center"
              }}>
                <div className="badge-interactive" style={{ margin: "0 auto 24px" }}>
                  <span className="dotg" />
                  PREMIUM TRADING ECOSYSTEM
                </div>

                <h1 style={{
                  fontSize: "clamp(38px, 6vw, 64px)",
                  lineHeight: 1.12,
                  marginBottom: 24,
                  fontWeight: 800,
                  maxWidth: "800px",
                  margin: "0 auto 24px",
                  position: "relative",
                  color: "var(--text)"
                }}>
                  Stop chasing signals.<br />
                  Understand <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-400 drop-shadow-[0_0_15px_var(--neon-dim)]" style={{ display: "inline-block", minWidth: "280px", textAlign: "left" }}>{heroWords[heroWordIdx]}</span>
                </h1>

                <p style={{
                  fontSize: "19px",
                  color: "var(--text-2)",
                  marginBottom: 36,
                  maxWidth: "600px",
                  margin: "0 auto 36px",
                  lineHeight: 1.6
                }}>
                  VeylanLabs reads the session for you in real-time — structure, liquidity sweeps, and high-probability entries — so you can trade with institutional precision.
                </p>

                <div className="hero-cta" style={{ justifyContent: "center", display: "flex", gap: "16px" }}>
                  <a href="#pricing" className="btn btn-primary hover-pulse-glow" style={{ padding: "14px 28px", fontSize: 16 }}>Start trading smarter</a>
                  <a href="#features" className="btn btn-ghost" style={{ padding: "14px 28px", fontSize: 16 }}>View features</a>
                </div>
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
                    <CountUp end={11} suffix="k+" />
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
                <TiltCard>
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
                </TiltCard>
                <TiltCard>
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
                </TiltCard>
              </div>


              {/* Tools Built For Structure. Liquidity. Precision. — Image 3 Layout */}
              <div className="vl-tools-section">
                {/* Row 1: Left Title Area + Right Aether Card */}
                <div className="vl-tools-row-1">
                  {/* Floating Title Area on the left */}
                  <div className="vl-tools-title-area">
                    <span className="eyebrow mb-3" style={{ display: 'inline-block' }}>POWERFUL INDICATORS</span>
                    <h2>Tools Built For<br /><span style={{ color: 'var(--accent)' }}>Structure. Liquidity.<br />Precision.</span></h2>
                    <p>Each VeylanLabs indicator is built around a real trading methodology, designed to give you clarity, confirmation, and confidence in every market session.</p>
                    <Link href="/indicators" className="btn btn-primary" style={{ width: 'fit-content', padding: '12px 24px' }}>
                      View all indicators →
                    </Link>
                  </div>

                  {/* Wide Aether Card on the right */}
                  <Link href="/indicators" className="vl-tools-card-wide" style={{ textDecoration: 'none' }}>
                    <div className="vl-tools-card-content">
                      <div className="vl-indicator-card-eyebrow">
                        <div className="vl-indicator-card-icon"><Zap /></div>
                        <span className="vl-indicator-card-label">Aether Session Range</span>
                      </div>
                      <h3 style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.15, marginBottom: 12, color: 'var(--text)' }}>
                        Master The Sessions.<br />Trade With Structure.
                      </h3>
                      <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55, marginBottom: 16 }}>
                        Aether Session Range highlights key session ranges, liquidity levels, and market structure in real-time.
                      </p>
                      <ul className="vl-indicator-card-features">
                        <li><span style={{ width: 14, height: 14, color: 'var(--accent)', flexShrink: 0, marginTop: 3, display: 'inline-flex' }}><Check w={14} /></span>London &amp; New York session ranges</li>
                        <li><span style={{ width: 14, height: 14, color: 'var(--accent)', flexShrink: 0, marginTop: 3, display: 'inline-flex' }}><Check w={14} /></span>High probability breakout zones</li>
                        <li><span style={{ width: 14, height: 14, color: 'var(--accent)', flexShrink: 0, marginTop: 3, display: 'inline-flex' }}><Check w={14} /></span>Market structure &amp; CHoCH detection</li>
                        <li><span style={{ width: 14, height: 14, color: 'var(--accent)', flexShrink: 0, marginTop: 3, display: 'inline-flex' }}><Check w={14} /></span>Buy &amp; sell confirmations on chart</li>
                      </ul>
                      <span className="vl-indicator-card-link" style={{ marginTop: 'auto' }}>Learn more <ChevronRight /></span>
                    </div>

                    {/* Right side of Aether Card: Chart Mockup */}
                    <div className="vl-tools-hero-right" style={{ borderLeft: '1px solid rgba(163,230,53,0.1)' }}>
                      <div className="vl-aether-chart-mock">
                        <div className="vl-chart-header">
                          <span className="vl-chart-pill gray">Aether Session Range · EURUSD 15m</span>
                        </div>
                        <div className="vl-session-labels">
                          <span className="vl-session-label">ASIA<br /><span style={{ fontSize: 8, color: '#475569' }}>00:00 – 09:00</span></span>
                          <span className="vl-session-label active">LONDON<br /><span style={{ fontSize: 8, color: '#475569' }}>08:00 – 16:00</span></span>
                          <span className="vl-session-label">NEW YORK<br /><span style={{ fontSize: 8, color: '#475569' }}>13:00 – 21:00</span></span>
                        </div>
                        <div className="vl-chart-candles" style={{ flex: 1, minHeight: 220, position: 'relative' }}>
                          <svg viewBox="0 0 400 200" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                            <rect x="0" y="0" width="133" height="200" fill="rgba(163,230,53,0.03)" />
                            <rect x="133" y="0" width="134" height="200" fill="rgba(163,230,53,0.06)" />
                            <rect x="267" y="0" width="133" height="200" fill="rgba(163,230,53,0.02)" />
                            <line x1="133" y1="68" x2="267" y2="68" stroke="#a3e635" strokeWidth="1" strokeDasharray="4,3" opacity="0.7" />
                            <line x1="133" y1="130" x2="267" y2="130" stroke="#a3e635" strokeWidth="1" strokeDasharray="4,3" opacity="0.4" />
                            <text x="138" y="63" fill="#a3e635" fontSize="7" fontFamily="monospace" fontWeight="700">SESSION HIGH</text>
                            <text x="138" y="142" fill="#64748b" fontSize="7" fontFamily="monospace">SESSION LOW</text>
                            {[
                              [20, 90, 80, 100, 75], [30, 85, 72, 90, 68], [40, 88, 76, 92, 70], [50, 80, 70, 85, 65],
                              [60, 75, 65, 80, 62], [70, 72, 62, 76, 58], [80, 78, 68, 82, 64], [90, 82, 72, 86, 68],
                              [100, 75, 80, 72, 84], [110, 82, 88, 76, 92], [120, 88, 95, 82, 98],
                              [133, 95, 106, 90, 110], [143, 106, 118, 101, 122], [153, 118, 128, 113, 132],
                              [163, 128, 122, 132, 118], [173, 122, 130, 116, 134], [183, 130, 138, 125, 142],
                              [193, 138, 148, 133, 152], [203, 148, 158, 143, 162], [213, 158, 152, 162, 148],
                              [223, 155, 162, 150, 166], [233, 162, 158, 166, 152], [243, 158, 164, 154, 170],
                              [267, 164, 170, 160, 175], [277, 170, 165, 174, 160], [287, 165, 160, 170, 155],
                              [297, 162, 168, 157, 173], [307, 168, 163, 172, 158], [317, 163, 158, 167, 153],
                              [327, 160, 165, 156, 170], [337, 165, 162, 170, 158], [347, 162, 168, 158, 173],
                              [357, 168, 165, 173, 160], [367, 165, 161, 170, 157], [377, 162, 158, 166, 154]
                            ].map(([x, o, c, l, h], i) => {
                              const isBull = c > o;
                              const color = isBull ? '#a3e635' : '#ff3366';
                              const top = Math.min(o, c); const bot = Math.max(o, c);
                              return (
                                <g key={i}>
                                  <line x1={x + 3} y1={l} x2={x + 3} y2={h} stroke={color} strokeWidth="0.8" opacity="0.8" />
                                  <rect x={x} y={top} width={6} height={Math.max(bot - top, 1)} fill={color} opacity="0.9" rx="0.5" />
                                </g>
                              );
                            })}
                            <rect x="280" y="130" width="80" height="16" rx="3" fill="rgba(163,230,53,0.2)" stroke="rgba(163,230,53,0.5)" strokeWidth="0.8" />
                            <text x="320" y="141" fill="#a3e635" fontSize="8" fontFamily="monospace" fontWeight="700" textAnchor="middle">BUY CONFIRMATION</text>
                            <rect x="10" y="54" width="75" height="16" rx="3" fill="rgba(255,51,102,0.15)" stroke="rgba(255,51,102,0.4)" strokeWidth="0.8" />
                            <text x="47" y="65" fill="#ff3366" fontSize="8" fontFamily="monospace" fontWeight="700" textAnchor="middle">SELL CONFIRMATION</text>
                          </svg>
                          <div className="vl-aether-panel">
                            <div className="vl-aether-panel-title">Aether Session Range</div>
                            <div className="vl-aether-row"><span className="k">State</span><span className="v green">BREAKOUT CONFIRMED</span></div>
                            <div className="vl-aether-row"><span className="k">Trend</span><span className="v white">1H Bullish</span></div>
                            <div className="vl-aether-row"><span className="k">Power</span><span className="v yellow">1H High</span></div>
                            <div className="vl-aether-row"><span className="k">Aether</span><span className="v green">Momentum: Strong</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Row 2: Bottom Cards */}
                <div className="vl-tools-row-2">
                  {/* Card: Asia High Low */}
                  <Link href="/indicators" className="vl-indicator-card" style={{ textDecoration: 'none' }}>
                    <div className="vl-indicator-card-img" style={{ height: 200 }}>
                      <img src="/sc-1.png" alt="VeylanLabs AHL Screener" style={{ objectPosition: 'center 20%' }} />
                      <div className="vl-indicator-card-img-overlay" />
                    </div>
                    <div className="vl-indicator-card-body">
                      <div className="vl-indicator-card-eyebrow">
                        <div className="vl-indicator-card-icon"><BarChart3 /></div>
                        <span className="vl-indicator-card-label">Asia High Low</span>
                      </div>
                      <h3>See The Asian Range.<br />Trade The Reaction.</h3>
                      <p>Track and visualize the Asia session highs and lows to anticipate key market reactions in London and New York.</p>
                      <ul className="vl-indicator-card-features">
                        <li><span style={{ width: 14, height: 14, color: 'var(--accent)', flexShrink: 0, marginTop: 3, display: 'inline-flex' }}><Check w={14} /></span>Automatic Asia high &amp; low mapping</li>
                        <li><span style={{ width: 14, height: 14, color: 'var(--accent)', flexShrink: 0, marginTop: 3, display: 'inline-flex' }}><Check w={14} /></span>Range breakout &amp; sweep detection</li>
                        <li><span style={{ width: 14, height: 14, color: 'var(--accent)', flexShrink: 0, marginTop: 3, display: 'inline-flex' }}><Check w={14} /></span>Multi-timeframe bias model</li>
                        <li><span style={{ width: 14, height: 14, color: 'var(--accent)', flexShrink: 0, marginTop: 3, display: 'inline-flex' }}><Check w={14} /></span>Perfect for London/NY setups</li>
                      </ul>
                      <span className="vl-indicator-card-link">Learn more <ChevronRight /></span>
                    </div>
                  </Link>

                  {/* Card: Pair Screener */}
                  <Link href="/indicators" className="vl-indicator-card" style={{ textDecoration: 'none' }}>
                    <div className="vl-indicator-card-img" style={{ background: '#020804', height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div className="vl-pair-screener" style={{ margin: 12, borderRadius: 8 }}>
                        <div className="vl-pair-screener-header">
                          <span className="vl-pair-screener-title">VeylanLabs Pair Screener</span>
                          <span className="vl-pair-screener-live"><span />LIVE</span>
                        </div>
                        <div className="vl-pair-screener-cols">
                          <span>PAIR</span><span>TREND</span><span>SETUP</span><span>STRENGTH</span><span>SIGNAL</span>
                        </div>
                        {[
                          { pair: 'EURUSD', bull: true, setup: 'BUY SETUP', str: 5 },
                          { pair: 'GBPUSD', bull: true, setup: 'BUY SETUP', str: 4 },
                          { pair: 'XAUUSD', bull: true, setup: 'BUY SETUP', str: 5 },
                          { pair: 'AUDUSD', bull: false, setup: 'SELL SETUP', str: 3 },
                          { pair: 'USDJPY', bull: false, setup: 'SELL SETUP', str: 4 },
                        ].map((r, i) => (
                          <div key={i} className="vl-pair-screener-row">
                            <span className="vl-pair-row-pair">{r.pair}</span>
                            <span className={r.bull ? 'vl-pair-row-trend-up' : 'vl-pair-row-trend-dn'}>{r.bull ? '↑' : '↓'}</span>
                            <span className={r.bull ? 'vl-pair-row-setup-buy' : 'vl-pair-row-setup-sell'}>{r.setup}</span>
                            <div className="vl-pair-strength">
                              {[1, 2, 3, 4, 5].map(d => (
                                <div key={d} className="vl-pair-strength-dot" style={{ background: d <= r.str ? (r.bull ? '#a3e635' : '#ff3366') : 'rgba(255,255,255,0.08)' }} />
                              ))}
                            </div>
                            <span className={r.bull ? 'vl-pair-signal-buy' : 'vl-pair-signal-sell'}>{r.bull ? 'BUY' : 'SELL'}</span>
                          </div>
                        ))}
                      </div>
                      <div className="vl-indicator-card-img-overlay" />
                    </div>
                    <div className="vl-indicator-card-body">
                      <div className="vl-indicator-card-eyebrow">
                        <div className="vl-indicator-card-icon"><Search /></div>
                        <span className="vl-indicator-card-label">Pair Screener</span>
                      </div>
                      <h3>Find Setups Faster.<br />Less Work. More Focus.</h3>
                      <p>The VeylanLabs Pair Screener scans multiple pairs in real-time and shows you only the best setups.</p>
                      <ul className="vl-indicator-card-features">
                        <li><span style={{ width: 14, height: 14, color: 'var(--accent)', flexShrink: 0, marginTop: 3, display: 'inline-flex' }}><Check w={14} /></span>Real-time setup scanning</li>
                        <li><span style={{ width: 14, height: 14, color: 'var(--accent)', flexShrink: 0, marginTop: 3, display: 'inline-flex' }}><Check w={14} /></span>Filters for sessions &amp; strategies</li>
                        <li><span style={{ width: 14, height: 14, color: 'var(--accent)', flexShrink: 0, marginTop: 3, display: 'inline-flex' }}><Check w={14} /></span>Saves you hours of chart watching</li>
                      </ul>
                      <span className="vl-indicator-card-link">Learn more <ChevronRight /></span>
                    </div>
                  </Link>
                </div>
              </div>


              {/* 3 benefit strips */}
              <div className="vl-benefits-strip">
                <div className="vl-benefit">
                  <div className="vl-benefit-icon"><Activity /></div>
                  <div><h4>Real Confirmations</h4><p>Get buy and sell confirmations directly on the chart based on real market structure and liquidity behavior.</p></div>
                </div>
                <div className="vl-benefit">
                  <div className="vl-benefit-icon"><TrendingUp /></div>
                  <div><h4>Learn To Trade</h4><p>Our tools are built to help you understand the markets better and become a more consistent, disciplined trader.</p></div>
                </div>
                <div className="vl-benefit">
                  <div className="vl-benefit-icon"><Clock /></div>
                  <div><h4>Save Time</h4><p>Stop watching endless charts. Let the data show you where the best opportunities are right now.</p></div>
                </div>
              </div>

              {/* CTA band */}
              <div className="vl-cta-band">
                <div>
                  <h3>All Indicators. <span style={{ color: 'var(--accent)' }}>One System.</span> Endless Possibilities.</h3>
                  <p>Built for traders who want clarity, consistency, and a real edge in every session.</p>
                </div>
                <Link href="/indicators" className="btn btn-primary" style={{ whiteSpace: 'nowrap', flexShrink: 0, padding: '12px 24px' }}>
                  Explore all indicators →
                </Link>
              </div>
            </div>
          </div>


          <div className="sec">
            <div className="mk animate-fade-in-up">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                  <span className="eyebrow mb-4">THE INDICATORS</span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mb-6">
                    Next generation <span className="text-[var(--neon)]">trading toolkit</span>
                  </h2>
                  <p className="text-[var(--text-2)] text-lg mb-8 leading-relaxed max-w-xl">
                    Trade with confidence using our comprehensive suite of advanced indicators. Built for modern markets to help you spot institutional footprints.
                  </p>
                  <ul className="flex flex-col gap-4 mb-10 w-full max-w-md">
                    {[
                      "SFX Advanced Support & Resistance",
                      "Supply & Demand Imbalance Zones",
                      "Dynamic Liquidity Pools",
                      "Trend Structure Break Alerts"
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[var(--glow)] border border-[var(--accent)] flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-[var(--neon)]" />
                        </div>
                        <span className="text-text font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/indicators" className="block mt-4">
                    <div className="screener-tab hover:border-[var(--neon)] transition-all duration-300 group cursor-pointer">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full border-2 border-[var(--neon)] flex items-center justify-center">
                            <span className="text-[10px] font-bold text-[var(--neon)]">+</span>
                          </div>
                          <span className="text-[var(--neon)] font-medium">Show More Indicators</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[var(--neon)] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Dark UI Graphic Replica */}
                <div className="w-full lg:w-1/2 relative mt-10 lg:mt-0">
                  <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />
                  <div className="glass-premium rounded-2xl border border-zinc-800/80 bg-[#0a0a0a]/95 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative z-10">
                    <div className="bg-[#111] border-b border-zinc-800/30 px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <div className="text-xs font-mono text-zinc-500 font-semibold tracking-widest">VEYLANLABS SETTINGS</div>
                      <div className="w-16" />
                    </div>
                    <div className="p-6 md:p-8">
                      <div className="mb-8 flex items-center justify-between bg-[#1a1a1a] p-4 rounded-xl border border-zinc-800/40">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[#a3e635]/10 flex items-center justify-center border border-[#a3e635]/30">
                            <Activity className="w-5 h-5 text-[#a3e635]" />
                          </div>
                          <span className="font-semibold text-white text-base">VeylanLabs Master Suite</span>
                        </div>
                        <div className="w-12 h-6 bg-[#a3e635]/20 rounded-full flex items-center p-1 border border-[#a3e635]/30">
                          <div className="w-4 h-4 bg-[#a3e635] rounded-full translate-x-6 shadow-[0_0_8px_#a3e635]" />
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider mb-3">Display Settings</div>
                        {[
                          { name: "Show Liquidity Grabs", active: true },
                          { name: "Market Structure Shifts", active: true },
                          { name: "Order Block Zones", active: false },
                          { name: "Fair Value Gaps", active: true }
                        ].map((setting, idx) => (
                          <div key={idx} className="flex items-center justify-between px-2 py-1">
                            <span className="text-sm font-medium text-zinc-300">{setting.name}</span>
                            <div className={`w-9 h-5 rounded-full flex items-center p-0.5 transition-colors ${setting.active ? 'bg-[#a3e635]' : 'bg-zinc-800'}`}>
                              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${setting.active ? 'translate-x-4 shadow-sm' : ''}`} />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 pt-5 border-t border-zinc-800/40">
                        <div className="flex justify-end gap-3">
                          <button className="px-5 py-2.5 text-sm font-bold rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors">Cancel</button>
                          <button className="px-5 py-2.5 text-sm font-bold rounded-lg bg-[#a3e635] text-black shadow-[0_0_10px_rgba(163,230,53,0.2)] hover:bg-[#bef264] transition-colors">Apply changes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Floating elements for aesthetic */}
                  <div className="absolute -right-6 -bottom-6 w-40 h-40 bg-[var(--ring)] blur-3xl rounded-full pointer-events-none z-0" />
                  <div className="absolute -left-6 -top-6 w-40 h-40 bg-[var(--ring)] blur-3xl rounded-full pointer-events-none z-0" />
                </div>
              </div>
            </div>
          </div>

          {/* Trading Modules Section with Video Backgrounds and Expanded Content */}
          <div className="sec">
            <div className="mk animate-fade-in-up delay-100">
              <div className="sec-head center mb-12">
                <span className="eyebrow">Trading Modules</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mt-2">
                  VeylanLabs <span className="text-[var(--neon)]">Indicators</span>
                </h2>
                <p className="text-[var(--text-2)] text-lg max-w-2xl mx-auto mt-4">
                  Click any module to explore our comprehensive indicator suite for that trading concept.
                </p>
              </div>

              {/* Module Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {TRADING_MODULES.map((module, index) => (
                  <div
                    key={module.id}
                    onClick={() => handleModuleClick(module.id)}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer border border-border/50 hover:border-[var(--neon)] transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] bg-[var(--surface)]"
                  >
                    {/* Video Background - Smaller and contained */}
                    <div className="relative h-48 overflow-hidden">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      >
                        <source src={module.videoPath} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/70 to-transparent" />

                      {/* Play Button Overlay */}
                      {/* <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[var(--neon)]/20 backdrop-blur-sm flex items-center justify-center border border-[var(--neon)]/30 group-hover:bg-[var(--neon)]/40 group-hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                        <Play className="w-8 h-8 text-[var(--neon)] group-hover:text-white transition-colors duration-300" fill="currentColor" />
                      </div>
                    </div> */}

                      {/* Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[var(--neon)]/20 backdrop-blur-sm border border-[var(--neon)]/30 text-[var(--neon)] text-xs font-bold font-mono tracking-wider">
                        {module.badge}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-text mb-2 group-hover:text-[var(--neon)] transition-colors duration-300">
                        {module.title}
                      </h3>

                      <p className="text-text-2 text-sm mb-4 leading-relaxed">
                        {module.description}
                      </p>

                      {/* Expanded Details List */}
                      <ul className="space-y-2 mb-6">
                        {module.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-text-2">
                            <Check className="w-4 h-4 text-[var(--neon)] flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-[var(--neon)] font-medium text-sm group-hover:gap-3 transition-all duration-300">
                        <span>{module.cta}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart Graphics Update */}
          <div className="sec">
            <div className="mk animate-fade-in-up delay-100">
              <div className="sec-head center mb-12">
                <span className="eyebrow">Visual Clarity</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mt-2">
                  See the market <span className="text-[var(--neon)]">clearly.</span>
                </h2>
              </div>

              <div className="max-w-5xl mx-auto rainbow-border ">
                <div className="bg-[var(--bg)] rounded-[14px] overflow-hidden relative">
                  <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />

                  <div className="p-4 md:p-8 relative z-10 flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-1 w-full bg-[var(--surface)] border border-border/50 rounded-xl p-4 shadow-2xl relative">
                      {/* Simulated Chart UI */}
                      <div className="flex items-center justify-between mb-4 border-b border-border/30 pb-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="font-bold text-lg text-text font-mono">BTCUSD</div>
                          <div className="text-sm text-text-2">15m</div>
                          <div className="px-2 py-0.5 rounded bg-[var(--glow)] text-[var(--neon)] text-[10px] sm:text-xs font-bold border border-[var(--accent)]/30">
                            STRONG BULLISH
                          </div>
                        </div>
                        <div className="flex items-center gap-4 hidden sm:flex">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[var(--neon)] shadow-[0_0_8px_var(--neon)] animate-pulse" />
                            <span className="text-xs text-text-3 uppercase font-mono font-bold tracking-widest">Live</span>
                          </div>
                        </div>
                      </div>

                      <div className="h-[250px] md:h-[350px] flex items-center justify-center w-full relative overflow-hidden">
                        <Candles c={c} n={40} vol={25} seed={42} tr={0.7} w={700} h={300} />

                        {/* Floating Trendlines & Badges */}
                        <div className="absolute top-[20%] right-[15%] px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold font-mono rounded shadow-[0_0_15px_rgba(239,68,68,0.2)] backdrop-blur-md">
                          SELL SIGNAL
                        </div>
                        <div className="absolute bottom-[30%] left-[25%] px-3 py-1 bg-[var(--glow)] border border-[var(--accent)]/30 text-[var(--neon)] text-xs font-bold font-mono rounded shadow-[0_0_15px_var(--ring)] backdrop-blur-md">
                          BUY SIGNAL
                        </div>
                      </div>
                    </div>

                    {/* Bull/Bear Percentage Bar */}
                    <div className="w-full md:w-64 flex flex-col gap-4">
                      <div className="glass-premium p-5 rounded-xl border border-border/50 bg-[var(--surface)] text-center">
                        <h4 className="text-sm font-mono text-text-3 font-bold tracking-widest uppercase mb-4">Trend Strength</h4>
                        <div className="relative h-4 rounded-full bg-surface-3 overflow-hidden mb-2">
                          <div className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-emerald-500 to-[var(--neon)] w-[75%] transition-all duration-1000" />
                          <div className="absolute top-0 right-0 bottom-0 bg-gradient-to-l from-red-500 to-rose-500 w-[25%] transition-all duration-1000" />
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold font-mono mt-3">
                          <span className="text-emerald-500">75% BULL</span>
                          <span className="text-red-500">25% BEAR</span>
                        </div>
                      </div>

                      <div className="glass-premium p-5 rounded-xl border border-border/50 bg-[var(--surface)]">
                        <h4 className="text-sm font-mono text-text-3 font-bold tracking-widest uppercase mb-4 text-center">Key Levels</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-text-2">Resistance</span>
                            <span className="text-xs font-bold text-red-400">64,250.00</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-text-2">Support</span>
                            <span className="text-xs font-bold text-emerald-400">62,800.00</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-text-2">Target</span>
                            <span className="text-xs font-bold text-[var(--neon)]">65,100.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
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

          {/* Feature Comparison Section — Pill Badge Style */}
          <div className="sec">
            <div className="mk animate-fade-in-up">
              <div className="sec-head center mb-12">
                <span className="eyebrow">Why VeylanLabs?</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mt-2">
                  What <span className="text-[var(--neon)]">we bring.</span> What they miss.
                </h2>
                <p className="text-[var(--text-2)] text-lg mt-4 max-w-xl mx-auto">Every detail in VeylanLabs was designed intentionally. Here's how we compare.</p>
              </div>

              <div className="max-w-4xl mx-auto glass-premium rounded-2xl overflow-hidden border border-border/50 shadow-2xl relative z-10">
                <div className="overflow-x-auto">
                  <table className="vl-compare-table">
                    <thead>
                      <tr style={{ background: 'var(--surface-2)' }}>
                        <th>Feature</th>
                        <th className="col-ours">
                          <span className="vl-compare-col-label">VeylanLabs</span>
                          <span className="vl-compare-col-sub">PREMIUM SUITE</span>
                        </th>
                        <th className="col-theirs">Typical Indicators</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { f: 'Signal Repaint', v: '✓ Zero Repaint', t: '✗ Repaints' },
                        { f: 'Session Structure Logic', v: '✓ Built-In', t: '✗ None' },
                        { f: 'Development Time', v: '✓ 2 Years R&D', t: '✗ Unknown' },
                        { f: '3rd Party Back-Testing', v: '✓ Verified', t: '✗ Unverified' },
                        { f: 'Markets Supported', v: '✓ All Markets', t: '✗ 1–2 Only' },
                        { f: 'Asia H/L Framework', v: '✓ Dedicated Tool', t: '✗ None' },
                        { f: 'Pair Screener', v: '✓ Multi-Symbol', t: '✗ Not Included' },
                        { f: 'Named, Accountable Creators', v: '✓ Public Team', t: '✗ Anonymous' },
                        { f: 'Community & Support', v: '✓ Active Discord', t: '✗ None' },
                        { f: 'Platform', v: '✓ TradingView', t: 'Varies' },
                      ].map((row, i) => (
                        <tr key={i} className="body-row">
                          <td>{row.f}</td>
                          <td className="col-ours">
                            <span className="vl-pill-yes">{row.v}</span>
                          </td>
                          <td className="col-theirs">
                            {row.t.startsWith('✗')
                              ? <span className="vl-pill-no">{row.t}</span>
                              : <span className="vl-pill-neutral">{row.t}</span>
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                {[["m", "Monthly"], ["q", "Quarterly"], ["y", "Yearly"]].map(b => (
                  <button key={b[0]} className={`cursor-pointer ${cycle === b[0] ? "active" : ""}`} onClick={() => setCycle(b[0])}>{b[1]}</button>
                ))}
              </div>
            </div>
            <div className="mk" style={{ position: "relative", zIndex: 1 }}>
              <div className="plans" style={{ display: "flex", justifyContent: "center" }}>
                <div className="plan pop glass-premium popular-pulse-card delay-100" style={{ maxWidth: "420px", width: "100%" }}>
                  <div className="pn grn">VeylanLabs Membership</div>
                  <div className="pp">{m[0]}<span>{m[2] as string}</span></div>
                  <div className="pb">{m[1]}</div>
                  <ul>
                    {["Full indicator suite", "Private Telegram community", "Full academy & tutorials", "Context alerts", "Live daily session breakdowns", "The Assistant at launch"].map((x, i) => <li key={i}><Check />{x}</li>)}
                  </ul>
                  <PricingButton priceId={getPriceId(cycle)} className="btn btn-primary btn-block mt-4 hover-pulse-glow" style={{ padding: "12px" }}>
                    Get Access Now
                  </PricingButton>
                </div>
              </div>
              <p style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--text-3)", margin: "24px 0 90px" }}>
                <span className="grn">◆ Founding Member pricing</span> — locked for life while we build.
              </p>
            </div>
          </div>

          <div className="sec">
            <div className="mk">
              <div className="sec-head center mb-12">
                <span className="eyebrow">WALL OF LOVE</span>
                <h2>Don't just take our word for it.</h2>
              </div>
            </div>

            <div className="marquee-container mt-8 py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="marquee-content" style={{ animationDuration: '40s' }}>
                {/* Double the array for seamless infinite looping */}
                {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                  <div key={i} className="glass-premium border border-border/50 rounded-2xl p-8 flex flex-col justify-between" style={{ minWidth: '400px', maxWidth: '450px', whiteSpace: 'normal', backgroundColor: 'var(--surface)' }}>
                    <div>
                      <div className="flex gap-1 mb-6 text-[var(--neon)]">
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                      </div>
                      <p className="text-[17px] leading-relaxed text-foreground/90 font-medium tracking-wide">
                        "{t.text1}
                        <span className="text-[var(--neon)] font-bold">{t.text2}</span>"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-8">
                      <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center bg-[var(--surface-2)] overflow-hidden shadow-[0_0_15px_rgba(163,230,53,0.1)]">
                        <Users className="w-5 h-5 text-[var(--neon)] opacity-80" />
                      </div>
                      <div>
                        <div className="text-foreground font-bold text-[15px]">{t.name}</div>
                        <div className="font-mono text-[10px] tracking-widest text-[var(--neon)] opacity-80 mt-1 uppercase">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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