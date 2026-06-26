"use client";

import { useState } from "react";
import { QuantLoader } from "@/components/quant-loader";

interface PricingButtonProps {
  checkoutUrl?: string;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function PricingButton({ checkoutUrl, className, children, style }: PricingButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setLoading(true);
    // Use the provided Whop URL if no specific checkoutUrl is passed
    const targetUrl = checkoutUrl || "https://whop.com/veylanlabs/veylanlabs-58/";
    window.open(targetUrl, "_blank", "noopener,noreferrer");
    
    // Reset loading state since they remain on the current page
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`${className} flex items-center justify-center gap-2`}
      style={style}
    >
      {loading && <QuantLoader className="w-4 h-4" />}
      {children}
    </button>
  );
}
