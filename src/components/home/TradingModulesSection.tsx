"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Check, ArrowRight } from 'lucide-react';
import { TRADING_MODULES } from '@/data/home';

export function TradingModulesSection() {
  const router = useRouter();

  const handleModuleClick = (moduleId: string) => {
    router.push('/indicators');
  };

  return (
    <div className="sec relative">
      {/* Ambient Glows */}
      <div className="neon-ambient w-[600px] h-[600px] top-0 left-[-200px]" />
      <div className="neon-ambient w-[800px] h-[800px] bottom-[-200px] right-[-300px] opacity-[0.08]" />
      
      <div className="mk animate-fade-in-up delay-100 relative z-10">
        <div className="sec-head center mb-12">
          <span className="eyebrow">Trading Modules</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mt-2 drop-shadow-md">
            VeylanLabs <span className="text-[var(--neon)]">Indicators And Screener</span>
          </h2>
          <p className="text-[var(--text-2)] text-lg max-w-2xl mx-auto mt-4">
            Click any module to explore our comprehensive indicator suite for that trading concept.
          </p>
        </div>
        
        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {TRADING_MODULES.map((module, index) => (
            <div
              key={module.id}
              onClick={() => handleModuleClick(module.id)}
              className={`group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer glass-premium ${index === 2 ? 'md:col-span-2' : ''}`}
            >
              {/* Image Background - Smaller and contained */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={module.imagePath}
                  alt={module.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/5 to-transparent" />
              </div>
              
              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
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
                <div className="mt-auto flex justify-end items-center gap-2 text-[var(--neon)] font-medium text-sm group-hover:gap-3 transition-all duration-300">
                  <span>{module.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
