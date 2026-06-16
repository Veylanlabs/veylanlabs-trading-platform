"use client";

import { useEffect } from "react";

export function RippleEffect() {
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Only attach ripples to clickable elements
      const rippleTarget = target.closest("button, .btn, a, .glass-premium, .card, tr") as HTMLElement;
      
      if (!rippleTarget) return;

      // Don't add multiple ripples if one is active to prevent lag, 
      // but Telegram allows multiple overlapping ripples. Let's allow it but cap them!
      
      const rect = rippleTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      const diameter = Math.max(rect.width, rect.height) * 1.5;
      
      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${x - diameter / 2}px`;
      ripple.style.top = `${y - diameter / 2}px`;
      
      ripple.className = "absolute rounded-full bg-[var(--neon)]/20 animate-ripple pointer-events-none mix-blend-plus-lighter";
      
      // Ensure target is relative and overflow hidden
      const computed = window.getComputedStyle(rippleTarget);
      if (computed.position === "static") rippleTarget.style.position = "relative";
      rippleTarget.style.overflow = "hidden";
      
      rippleTarget.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  return null;
}
