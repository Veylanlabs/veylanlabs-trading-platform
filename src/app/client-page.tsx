"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from '@/components/logo';
import {
  ChevronRight,
  ChevronLeft,
  Quote,
  Menu,
  X,
  Star,
  User,
  ArrowUp
} from 'lucide-react';
import { FaYoutube, FaInstagram, FaFacebook, FaTelegramPlane } from 'react-icons/fa';
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from 'framer-motion';

import { HeroSection } from '@/components/home/HeroSection';
import { MethodologySection } from '@/components/home/MethodologySection';
import { ToolkitSection } from "@/components/home/ToolkitSection";
import { CommunitySection } from "@/components/home/CommunitySection";
import { AetherBoardSection } from '@/components/home/AetherBoardSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { AetherEdgeSection } from '@/components/home/AetherEdgeSection';
import { ComparisonSection } from '@/components/home/ComparisonSection';


import { PricingSection } from '@/components/home/PricingSection';
import { FAQSection } from '@/components/home/FAQSection';
import { StatsSection } from '@/components/home/StatsSection';
import { CTASection } from '@/components/home/CTASection';
import { StickyCTA } from '@/components/home/StickyCTA';

export default function LandingPageClient({ initialPrices }: { initialPrices: any }) {
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { theme, systemTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);



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
  }, []);



  useEffect(() => {
    const f = () => {
      setScrolled(window.scrollY > 16);
      setShowBackToTop(window.scrollY > 400);
      setShowStickyCTA(window.scrollY > (window.innerHeight * 1.2));
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



  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="vl overflow-x-clip">
        {/* Global background moved to hero section */}
        <div className={`topnav ${scrolled ? "scrolled" : ""}`}>
          <div className="nav-in">
            <Logo />
            <div className="nav-links">
              <a href="#aether-edge" className={activeSection === "aether-edge" ? "active" : ""}>Features</a>
              <Link href="/indicators" className={activeSection === "indicators" ? "active" : ""}>Indicators</Link>
              <a href="#testimonials" className={activeSection === "testimonials" ? "active" : ""}>Testimonials</a>
              <a href="#pricing" className={activeSection === "pricing" ? "active" : ""}>Pricing</a>
              <a href="#faq" className={activeSection === "faq" ? "active" : ""}>FAQ</a>
            </div>
            <div className="nav-right" style={{ gap: "16px" }}>

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
              <a href="#aether-edge" onClick={() => setMobileMenuOpen(false)} className={`text-sm font-semibold py-2 border-b border-border/50 ${activeSection === "aether-edge" ? "text-[var(--accent)]" : "text-muted-foreground hover:text-foreground"}`}>Features</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className={`text-sm font-semibold py-2 border-b border-border/50 ${activeSection === "pricing" ? "text-[var(--accent)]" : "text-muted-foreground hover:text-foreground"}`}>Pricing</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className={`text-sm font-semibold py-2 border-b border-border/50 ${activeSection === "faq" ? "text-[var(--accent)]" : "text-muted-foreground hover:text-foreground"}`}>FAQ</a>
            </div>
          )}
        </div>

        <section style={{ position: "relative", overflow: "hidden" }}>
          {/* Glow Effects */}
          <div className="glow-ambient" style={{ top: "-10%", left: "-10%" }} />
          <div className="glow-ambient" style={{ top: "30%", right: "-10%", opacity: 0.2 }} />
          <div className="bg-grid" />
          <div className="bg-mesh" />
          <div className="interactive-glow" />

          <HeroSection />

          <StatsSection />
          
          <MethodologySection />

          <AetherEdgeSection />

          <ToolkitSection />
          
          <CommunitySection />

          <AetherBoardSection />

          <HowItWorksSection />
          <ComparisonSection />

          <PricingSection />



          <FAQSection />

          {/* Testimonial Section */}
          <div className="sec">
            <div className="mk">
              <div className="glass-premium p-0 rounded-3xl overflow-hidden border border-[var(--border)] flex flex-col md:flex-row relative group hover:border-[var(--neon)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] min-h-[380px]">

                {/* Testimonial text block */}
                <div className="p-10 md:p-14 lg:p-16 flex-1 flex flex-col justify-center relative z-10 w-full md:w-[60%] lg:w-[55%] pr-4 md:pr-16 lg:pr-24">
                  {/* Decorative background quote */}
                  <Quote className="absolute top-6 left-6 md:top-10 md:left-10 w-32 h-32 text-[var(--neon)] opacity-[0.03] -z-10 -rotate-6" />
                  
                  <div className="flex items-center gap-1.5 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-[var(--neon)] fill-[var(--neon)] drop-shadow-[0_0_8px_rgba(163,230,53,0.4)]" />
                    ))}
                  </div>

                  <p className="text-xl md:text-2xl lg:text-[28px] font-medium mb-10 leading-snug tracking-tight text-[var(--text)]">
                    "VeylanLabs indicators have completely transformed the way I trade. <br className="hidden lg:block md:block" />
                    <span className="text-[var(--neon)] font-bold drop-shadow-[0_0_12px_rgba(163,230,53,0.3)]">The edge is real.</span>"
                  </p>

                  <div className="flex items-center gap-4 mt-2">
                    <div className="w-12 h-12 rounded-full bg-black border border-[var(--border)] flex items-center justify-center shadow-[0_0_20px_rgba(163,230,53,0.05)] relative overflow-hidden group-hover:border-[var(--neon)] group-hover:shadow-[0_0_25px_rgba(163,230,53,0.2)] transition-all duration-500">
                      <User className="w-5 h-5 text-[var(--text-2)] group-hover:text-[var(--neon)] transition-colors duration-500" />
                    </div>
                    <div>
                      <div className="font-bold text-lg tracking-wide text-slate-900 dark:text-white group-hover:text-[var(--neon)] transition-colors duration-500">Alex T.</div>
                      <div className="text-[var(--text-3)] text-xs font-mono tracking-widest uppercase mt-0.5">Full-time Trader</div>
                    </div>
                  </div>
                </div>

                {/* Hooded trader image block */}
                <div className="hidden md:block absolute top-0 right-0 bottom-0 w-1/2 lg:w-[50%] overflow-hidden rounded-r-3xl">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                    style={{ 
                      backgroundImage: "url('/hero-trader.png')",
                      maskImage: "linear-gradient(to right, transparent 0%, black 40%)",
                      WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 40%)"
                    }} 
                  />
                  {/* Subtle vignette on the bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50" />
                </div>
              </div>
            </div>
          </div>

          <CTASection />

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
              <Link href="/indicators">Indicators</Link>
              <Link href="/#pricing">Pricing</Link>
            </div>
            <div>
              <h5>Learn</h5>
              <Link href="#aether-edge">Features</Link>
              <Link href="#faq">FAQ</Link>
              {/* <Link href="#">Academy</Link> */}
            </div>
            <div>
              <h5>Company</h5>
              {/* <Link href="#">About</Link> */}
              {/* <Link href="#">Contact</Link> */}
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
            </div>
          </div>

          <div className="foot-bot flex flex-col md:flex-row justify-between items-center gap-6 mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left text-sm text-text-3">
              <span>© 2026 VeylanLabs</span>
              <span className="hidden md:inline">·</span>
              <span>Educational use only · Not financial advice · Trade at your own risk.</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative group flex items-center justify-center">
                <Link href="https://www.facebook.com/profile.php?id=61590814831781" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]" style={{ color: "var(--neon)" }}>
                  <FaFacebook className="w-6 h-6" />
                </Link>
                <div className="absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-[var(--surface)] text-[var(--neon)] text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-md border border-[var(--neon)]/40 shadow-[0_0_15px_rgba(163,230,53,0.3)] pointer-events-none whitespace-nowrap z-50 font-bold">
                  Facebook
                </div>
              </div>
              <div className="relative group flex items-center justify-center">
                <Link href="https://telegram.me/Veylanlabs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]" style={{ color: "var(--neon)" }}>
                  <FaTelegramPlane className="w-6 h-6" />
                </Link>
                <div className="absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-[var(--surface)] text-[var(--neon)] text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-md border border-[var(--neon)]/40 shadow-[0_0_15px_rgba(163,230,53,0.3)] pointer-events-none whitespace-nowrap z-50 font-bold">
                  Telegram
                </div>
              </div>
              <div className="relative group flex items-center justify-center">
                <Link href="https://www.youtube.com/@VeylanLabs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]" style={{ color: "var(--neon)" }}>
                  <FaYoutube className="w-6 h-6" />
                </Link>
                <div className="absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-[var(--surface)] text-[var(--neon)] text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-md border border-[var(--neon)]/40 shadow-[0_0_15px_rgba(163,230,53,0.3)] pointer-events-none whitespace-nowrap z-50 font-bold">
                  YouTube
                </div>
              </div>
              <div className="relative group flex items-center justify-center">
                <Link href="https://www.instagram.com/Veylanlabs/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]" style={{ color: "var(--neon)" }}>
                  <FaInstagram className="w-6 h-6" />
                </Link>
                <div className="absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-[var(--surface)] text-[var(--neon)] text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-md border border-[var(--neon)]/40 shadow-[0_0_15px_rgba(163,230,53,0.3)] pointer-events-none whitespace-nowrap z-50 font-bold">
                  Instagram
                </div>
              </div>
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

            <div className="relative w-full max-w-5xl aspect-[16/9] rounded-xl overflow-hidden border border-border shadow-[0_0_50px_rgba(16,185,129,0.2)] bg-[var(--surface)] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
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

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[var(--surface)]/80 backdrop-blur-xl border border-[var(--neon)]/30 text-[var(--neon)] hover:bg-[var(--neon)] hover:text-[var(--text)] shadow-[0_0_15px_rgba(163,230,53,0.15)] hover:shadow-[0_0_30px_rgba(163,230,53,0.4)] transition-all duration-300 hidden md:flex group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={3} />
            <span className="font-mono text-[11px] font-bold tracking-widest uppercase">Top</span>
          </motion.button>
        )}
      </AnimatePresence>

      <StickyCTA isVisible={showStickyCTA} />
    </>
  );
}