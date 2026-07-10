import React from 'react';
import { TiltCard } from '@/components/tilt-card';

export function FeaturesSection() {
  return (
    <div className="sec relative" id="features">
      {/* Ambient Glows */}
      <div className="neon-ambient w-[700px] h-[700px] top-[10%] left-[-250px] opacity-[0.05]" />
      <div className="neon-ambient w-[600px] h-[600px] bottom-[10%] right-[-200px] opacity-[0.06]" />

      <div className="mk relative z-10">
        <div className="sec-head center">
          <span className="eyebrow">The Aether Edge</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mt-2 drop-shadow-md">See the Market in High Definition</h2>
          <p className="text-[var(--text-2)] text-lg max-w-2xl mx-auto mt-4">Stop guessing. See exactly where liquidity rests, when the sessions shift, and where your invalidation lies.</p>
        </div>
        
        <div className="ba">
          <TiltCard>
            <div className="card card-old-way glass-premium animate-fade-in-up delay-100">
              <div className="h">
                <span className="badge-comparison badge-old-way">The Old Way</span>
                <span>SIGNAL ONLY</span>
              </div>
              <div className="ch" style={{ padding: 0, height: "220px", overflow: "hidden" }}>
                <img 
                  src="/image3_old_way.png" 
                  alt="Without Context" 
                  className="indicator-card-img" 
                  style={{ marginTop: 0, borderRadius: 0, border: "none", width: "100%", height: "100%", objectFit: "cover", objectPosition: "left 52%" }} 
                />
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
                  src="/image3.png" 
                  alt="VeylanLabs Full Chart Context" 
                  className="indicator-card-img" 
                  style={{ marginTop: 0, borderRadius: 0, border: "none", width: "100%", height: "100%", objectFit: "cover", objectPosition: "left 52%" }} 
                />
              </div>
              <div className="f">What the session is doing, where liquidity sits, the structure shift, your entry — and the level that says you're wrong.</div>
            </div>
          </TiltCard>
        </div>
      </div>
    </div>
  );
}
