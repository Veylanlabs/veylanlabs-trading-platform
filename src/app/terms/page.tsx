"use client";

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function TermsConditions() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, damping: 25, stiffness: 100 }
    }
  };

  return (
    <div className="vl min-h-screen bg-[#0a0f17] text-text relative overflow-hidden selection:bg-[var(--neon)]/30">

      {/* Dynamic Interactive Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f17] via-[#091512] to-[#0a0f17]" />
        <div className="absolute inset-0 bg-mesh opacity-[0.25]" />

        {/* Animated Glows */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--neon)]/5 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] translate-y-1/3 -translate-x-1/3"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center flex flex-col items-center relative"
        >
          <Link href="/" className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 text-text-2 hover:text-white transition-colors">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:bg-[var(--neon)]/20 hover:border-[var(--neon)]/50 hover:text-[var(--neon)] transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest font-bold">Back</span>
          </Link>
          <div className="mb-8">
            <Logo />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--neon)]/30 bg-[var(--neon)]/10 text-[var(--neon)] text-xs font-mono font-bold tracking-widest mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[var(--neon)] shadow-[0_0_8px_var(--neon)] animate-pulse" />
            LEGAL
          </div>
          <h1 className="text-5xl sm:text-6xl font-display font-extrabold uppercase tracking-tight mb-6 text-white drop-shadow-lg">
            Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-400">Conditions</span>
          </h1>
          <p className="text-text-2 text-sm font-mono tracking-widest uppercase">
            Last Updated: <span className="text-[var(--neon)]">{new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.section variants={itemVariants} className="glass-premium p-8 rounded-3xl border border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-500">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-[var(--neon)] font-mono text-sm">01.</span> Acceptance of Terms
            </h2>
            <p className="text-text-2 leading-relaxed">
              By accessing and using VeylanLabs ("we," "our," or "us"), you agree to be bound by
              these Terms & Conditions. If you do not agree with any part of these terms, you
              may not use our services.
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="glass-premium p-8 rounded-3xl border border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-500">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-[var(--neon)] font-mono text-sm">02.</span> Services Description
            </h2>
            <p className="text-text-2 leading-relaxed mb-4">
              VeylanLabs provides educational trading tools, indicators, analysis, and community
              features for informational purposes only. Our services include:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-text-3">
              {['TradingView indicators and tools', 'Educational content and tutorials', 'Community access (Discord/Telegram)', 'Live session breakdowns and analysis', 'Real-time market data and alerts'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--neon)] shadow-[0_0_5px_var(--neon)]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section variants={itemVariants}>
            <div className="relative p-8 rounded-3xl border border-red-500/30 bg-red-500/5 backdrop-blur-xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                  <span className="text-red-400 font-mono text-sm">03.</span> Risk Disclaimer
                </h2>
                <p className="font-bold text-red-400 uppercase tracking-widest text-xs mb-4">Important Risk Warning</p>
                <p className="text-text-2 leading-relaxed mb-6">
                  Trading financial markets carries substantial risk and you can lose money.
                  Past performance does not guarantee future results. No indicator predicts
                  the market or guarantees profit.
                </p>
                <ul className="space-y-3 text-text-3">
                  {[
                    'Trading involves risk of loss',
                    'You should never trade with money you cannot afford to lose',
                    'VeylanLabs is educational only - not financial advice',
                    'You are solely responsible for your trading decisions',
                    'Results vary by individual trader'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="glass-premium p-8 rounded-3xl border border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-500">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-[var(--neon)] font-mono text-sm">04.</span> User Accounts
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-[var(--neon)] mb-3">4.1 Account Creation</h3>
                <ul className="space-y-2 text-text-3">
                  {['You must provide accurate and complete information', 'You are responsible for maintaining account security', 'You must not share your account credentials', 'You must be at least 18 years old to use our services'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-4 h-[1px] bg-white/20" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--neon)] mb-3">4.2 Account Termination</h3>
                <ul className="space-y-2 text-text-3">
                  {['We reserve the right to suspend or terminate accounts', 'Violations of these terms may result in termination', 'You may cancel your subscription at any time'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-4 h-[1px] bg-white/20" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="glass-premium p-8 rounded-3xl border border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-500">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-[var(--neon)] font-mono text-sm">05.</span> Subscription and Payments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-[var(--neon)] mb-3">5.1 Pricing & Billing</h3>
                <ul className="space-y-2 text-text-3">
                  {['Subscription fees are clearly displayed on our pricing page', 'Prices are subject to change with notice', 'Founding member pricing is locked for life', 'Payments are processed through secure third-party providers', 'Subscriptions are automatically renewed'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--neon)]/50 mt-2 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--neon)] mb-3">5.2 Refunds & Cancellation</h3>
                <ul className="space-y-2 text-text-3">
                  {['You can cancel anytime through your account settings', 'No refunds for partial billing periods', 'We offer a 7-day money-back guarantee for new subscribers', 'Refund requests must be submitted within 7 days of purchase', 'Refunds are processed to the original payment method'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--neon)]/50 mt-2 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="glass-premium p-8 rounded-3xl border border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-500">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-[var(--neon)] font-mono text-sm">06.</span> Intellectual Property
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-text-3">
              {[
                'All indicators, tools, and content are proprietary to VeylanLabs',
                'You may not copy, distribute, or reverse-engineer our indicators',
                'Unauthorized sharing of login credentials is prohibited',
                'You retain rights to your own trading strategies',
                'Content may not be reproduced without explicit permission'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--neon)] shadow-[0_0_5px_var(--neon)] mt-2 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section variants={itemVariants} className="glass-premium p-8 rounded-3xl border border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-500">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-[var(--neon)] font-mono text-sm">07.</span> Community Guidelines
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                'Respect other community members',
                'No harassment, discrimination, or hate speech',
                'No spamming or self-promotion',
                'No sharing of illegal or harmful content',
                'No impersonation of VeylanLabs staff',
                'No soliciting or selling within the community'
              ].map((item, i) => (
                <span key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-text-2">
                  {item}
                </span>
              ))}
            </div>
          </motion.section>

          <motion.section variants={itemVariants}>
            <div className="relative p-8 rounded-3xl border border-white/10 bg-[#0d1317] backdrop-blur-xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-[var(--neon)] font-mono text-sm">08.</span> Limitation of Liability
                </h2>
                <p className="text-text-2 leading-relaxed mb-4">
                  VeylanLabs provides services "as is" without warranties of any kind.
                  We are not liable for:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-text-3 mb-6">
                  {['Financial losses from trading decisions', 'Technical issues or service interruptions', 'Third-party service disruptions', 'Data loss or inaccuracies', 'Consequential or indirect damages'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="inline-block px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-text-3 font-mono">
                  Maximum liability is limited to the amount paid for the service in the previous 12 months.
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="glass-premium p-8 rounded-3xl border border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-[var(--neon)] font-mono text-sm">09.</span> User Responsibilities
                </h2>
                <ul className="space-y-2 text-text-3">
                  {['You are solely responsible for your trading decisions', 'You must comply with all applicable laws and regulations', 'You are responsible for maintaining account security', 'You must not use the service for illegal purposes', 'You must not attempt to manipulate or exploit the service'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-4 h-[1px] bg-[var(--neon)]/50 mt-2.5 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-[var(--neon)] font-mono text-sm">10.</span> Termination
                </h2>
                <ul className="space-y-2 text-text-3">
                  {['We may suspend or terminate accounts for policy violations', 'We reserve the right to discontinue any part of the service', 'You may cancel your subscription at any time', 'Termination does not affect prior rights and obligations'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-4 h-[1px] bg-[var(--neon)]/50 mt-2.5 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-premium p-8 rounded-3xl border border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-500">
              <h2 className="text-xl font-bold text-white mb-3">11. Modifications</h2>
              <p className="text-text-3 text-sm leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of
                significant changes via email or through our platform. Continued use of the service
                constitutes acceptance of the updated terms.
              </p>
            </div>
            <div className="glass-premium p-8 rounded-3xl border border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-500">
              <h2 className="text-xl font-bold text-white mb-3">12. Governing Law</h2>
              <p className="text-text-3 text-sm leading-relaxed">
                These terms are governed by the laws of the jurisdiction in which VeylanLabs operates,
                without regard to conflict of law principles.
              </p>
            </div>
          </motion.section>

          <motion.section variants={itemVariants}>
            <div className="relative p-8 rounded-3xl border border-[var(--neon)]/30 bg-[var(--neon)]/5 backdrop-blur-xl overflow-hidden group text-center">
              <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2">13. Contact</h2>
                <p className="text-text-2 mb-6">For questions about these terms, please reach out.</p>
                <a href="mailto:legal@veylanlabs.com" className="mt-6 mb-6 inline-flex items-center justify-center px-8 py-4 bg-[var(--surface-2)] border border-[var(--neon)]/50 hover:bg-[var(--neon)] rounded-xl text-text hover:text-black font-bold tracking-widest transition-all duration-300 transform hover:-translate-y-1">
                  legal@veylanlabs.com
                </a>
                <p className="text-[10px] font-mono text-text-3 uppercase tracking-widest mt-6">Response time: 24-48 hours</p>
              </div>
            </div>
          </motion.section>
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/10 text-center"
        >
          <p className="text-text-3 text-sm">
            By using VeylanLabs, you agree to these Terms & Conditions and our{" "}
            <Link href="/privacy" className="!text-[#22c55e] hover:!text-[var(--neon)] transition-colors font-medium underline underline-offset-4 decoration-[#22c55e]/30 hover:decoration-[var(--neon)]/50">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
