"use client";
import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { PricingButton } from '@/components/pricing-button';

export interface Plan {
  id: string;
  billing_period: number;
  renewal_price: number;
  purchase_url: string;
  currency: string;
  product: {
    id: string;
    title: string;
  };
  company: {
    id: string;
    title: string;
  };
}

export interface PlansResponse {
  data: Plan[];
  page_info: {
    start_cursor: string;
    end_cursor: string;
    has_next_page: boolean;
    has_previous_page: boolean;
  };
}

export function PricingSection() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [cycle, setCycle] = useState<"m" | "q" | "y">("y");

  // Fetch plans from API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/plans');
        if (!response.ok) {
          throw new Error('Failed to fetch plans');
        }
        
        const data: PlansResponse = await response.json();
        setPlans(data.data);
      } catch (err) {
        console.error('Error fetching plans:', err);
      }
    };

    fetchPlans();
  }, []);

  // Get plan by billing period
  const getPlanByPeriod = (days: number): Plan | undefined => {
    return plans.find(p => p.billing_period === days);
  };

  // Get checkout URL for selected cycle
  const getCheckoutUrl = (period: string): string => {
    const periodMap = {
      'm': 30,
      'q': 90,
      'y': 365
    };
    
    const plan = getPlanByPeriod(periodMap[period as keyof typeof periodMap]);
    return plan?.purchase_url || '#';
  };

  // Format price
  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Get pricing display data
  const getPricingData = () => {
    const periodMap = {
      'm': 30,
      'q': 90,
      'y': 365
    };
    const monthlyPlan = getPlanByPeriod(periodMap["m"])  
    const originalMonthlyPrice  = monthlyPlan?.renewal_price || 49
    const plan = getPlanByPeriod(periodMap[cycle]);
    
    if (!plan) {
      return {
        displayPrice: 'loading...',
        displaySuffix: '',
        displaySub: null,
        monthlyPrice: 0,
        totalPrice: 0,
        savingsPercent: 0
      };
    }

    const monthlyPrice = plan.renewal_price / (plan.billing_period / 30);
    const totalPrice = plan.renewal_price;
    const originalPrice = originalMonthlyPrice * (plan.billing_period / 30);
    const savingsPercent = Math.round((1 - totalPrice / originalPrice) * 100);

    const displayPrice = formatPrice(monthlyPrice, plan.currency);
    let displaySuffix = '';
    let displaySub = null;

    if (cycle === 'm') {
      displaySuffix = '/mo';
      displaySub = <span className="text-[var(--neon)]">Billed monthly</span>;
    } else if (cycle === 'q') {
      displaySuffix = '/mo';
      displaySub = (
        <>
         {!!(formatPrice(originalMonthlyPrice * 3) !== formatPrice(totalPrice)) &&  <span className="line-through text-muted-foreground mr-1 opacity-70">
            {formatPrice(originalMonthlyPrice * 3, plan.currency)}
          </span>}
          <span className="text-[var(--neon)] drop-shadow-[0_0_8px_rgba(163,230,53,0.3)] font-medium">{formatPrice(totalPrice, plan.currency)} billed quarterly</span>{' '}
          {!!savingsPercent && <span className="text-[var(--neon)] ml-1 font-bold">({savingsPercent}% off)</span>}
        </>
      );
    } else if (cycle === 'y') {
      
      displaySuffix = '/mo';
      displaySub = (
        <>
         {!!(formatPrice(originalMonthlyPrice * 12) !== formatPrice(totalPrice)) && <span className="line-through text-muted-foreground mr-1 opacity-70">
            { formatPrice(originalMonthlyPrice * 12, plan.currency)}
          </span>}
          <span className="text-[var(--neon)] drop-shadow-[0_0_8px_rgba(163,230,53,0.3)] font-medium">{formatPrice(totalPrice, plan.currency)} billed yearly</span>{' '}
         {!!savingsPercent &&  <span className="text-[var(--neon)] ml-1 font-bold">({savingsPercent}% off)</span>}
        </>
      );
    }

    return {
      displayPrice,
      displaySuffix,
      displaySub,
      monthlyPrice,
      totalPrice,
      savingsPercent
    };
  };

  const pricingData = getPricingData();
  const m = [pricingData.displayPrice, pricingData.displaySub, pricingData.displaySuffix];

  return (
    <div className="sec animate-fade-in-up" id="pricing" style={{ paddingBottom: '2rem' }}>
      <div className="hero mk" style={{ paddingBottom: 30, paddingTop: 0 }}>
        <span className="eyebrow">Membership</span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight mt-2 mb-4 md:mb-6 leading-tight">
          Pricing that respects<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 dark:from-emerald-400 via-[var(--neon)] to-emerald-600 dark:to-emerald-400 animate-gradient-x inline-block">
            serious traders.
          </span>
        </h2>
        <p className="text-[var(--text-2)] text-base md:text-lg max-w-md mx-auto">One ecosystem — indicators, academy, and a live community. Cancel anytime.</p>
        <div className="bill" style={{ marginTop: 34 }}>
          {[["m", "Monthly"], ["q", "Quarterly"], ["y", "Yearly"]].map(b => {
            const periodMap = { m: 30, q: 90, y: 365 };
            const hasPlan = plans.some(p => p.billing_period === periodMap[b[0] as keyof typeof periodMap]);
            return (
              <button 
                key={b[0]} 
                className={`cursor-pointer flex items-center ${cycle === b[0] ? "active" : ""} ${!hasPlan ? "opacity-50 cursor-not-allowed" : ""}`} 
                onClick={() => hasPlan && setCycle(b[0] as "m" | "q" | "y")}
                disabled={!hasPlan}
              >
                {b[1]}
                {b[0] === "y" && (
                  <span className={`ml-2 text-[10px] uppercase tracking-wider font-bold ${cycle === 'y' ? 'text-[var(--accent-ink)] opacity-80' : 'text-[var(--neon)] drop-shadow-[0_0_8px_rgba(163,230,53,0.4)]'}`}>
                    (Best Value)
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mk" style={{ position: "relative", zIndex: 1 }}>
        <div className="plans" style={{ display: "flex", justifyContent: "center" }}>
          <div className="plan pop glass-premium popular-pulse-card delay-100" style={{ maxWidth: "420px", width: "100%" }}>
            <div className="pn !text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 dark:from-emerald-400 via-[var(--neon)] to-emerald-600 dark:to-emerald-400 animate-gradient-x inline-block mb-1">VeylanLabs Membership</div>
            <div className="pp">{m[0]}<span>{m[2] as string}</span></div>
            <div className="pb">{m[1]}</div>
            <ul>
              {["Full indicator suite", "Private Telegram community", "Full academy & tutorials", "Context alerts", "Live daily session breakdowns", "The Assistant at launch"].map((x, i) => <li key={i}><Check />{x}</li>)}
            </ul>
            <PricingButton checkoutUrl={getCheckoutUrl(cycle)} className="btn btn-primary btn-block mt-4 hover-pulse-glow" style={{ padding: "12px" }}>
              Get Access Now
            </PricingButton>
          </div>
        </div>
        <p style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--text-3)", margin: "24px 0 0" }}>
          <span className="grn">◆ Founding Member pricing</span> — locked for life while we build.
        </p>
      </div>
    </div>
  );
}
