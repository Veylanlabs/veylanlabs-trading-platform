"use client";

import { useState } from "react";
import { QuantLoader } from "@/components/quant-loader";

interface PricingButtonProps {
  priceId: string;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function PricingButton({ priceId, className, children, style }: PricingButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!priceId) {
      alert("Configuration Error: Stripe Price ID is missing.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to start checkout");
      }
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error("Checkout fetch error:", error);
      alert(`Server Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
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
