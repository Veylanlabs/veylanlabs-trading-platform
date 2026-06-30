"use client";

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
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
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-400">Policy</span>
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
              <span className="text-[var(--neon)] font-mono text-sm">01.</span> Introduction
            </h2>
            <p className="text-text-2 leading-relaxed">
              At VeylanLabs ("we," "our," or "us"), we respect your privacy and are committed to
              protecting the personal information you share with us. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when you use our
              website, indicators, and services.
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="glass-premium p-8 rounded-3xl border border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-500">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-[var(--neon)] font-mono text-sm">02.</span> Information We Collect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-[var(--neon)] mb-3">2.1 Personal Information</h3>
                <ul className="space-y-2 text-text-3">
                  {['Name and email address', 'TradingView username', 'Telegram username', 'Billing and payment information', 'Account credentials for platform access'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-4 h-[1px] bg-[var(--neon)]/50" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--neon)] mb-3">2.2 Usage Data</h3>
                <ul className="space-y-2 text-text-3">
                  {['IP address and device information', 'Browser type and version', 'Pages visited and time spent', 'Indicator usage patterns', 'Interaction with our community features'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-4 h-[1px] bg-[var(--neon)]/50" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="glass-premium p-8 rounded-3xl border border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-500">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-[var(--neon)] font-mono text-sm">03.</span> How We Use Your Information
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-text-3">
              {[
                'Provide, maintain, and improve our services',
                'Grant access to indicators and tools',
                'Send you updates and marketing communications',
                'Process transactions and manage subscriptions',
                'Respond to your inquiries and support requests',
                'Monitor and analyze usage patterns',
                'Detect and prevent fraud or security issues',
                'Comply with legal obligations'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--neon)] shadow-[0_0_5px_var(--neon)] mt-2 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section variants={itemVariants} className="glass-premium p-8 rounded-3xl border border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-500">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-[var(--neon)] font-mono text-sm">04.</span> Data Sharing and Disclosure
            </h2>
            <p className="text-text-2 leading-relaxed mb-4">
              We do not sell your personal information. We may share your data with:
            </p>
            <ul className="space-y-4 text-text-3">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--neon)]/50 mt-2 flex-shrink-0" />
                <span><strong className="text-white">Service Providers:</strong> Payment processors, email services, and platform hosting providers who assist in delivering our services</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--neon)]/50 mt-2 flex-shrink-0" />
                <span><strong className="text-white">Community Features:</strong> Your TradingView and Telegram usernames may be visible to other community members</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--neon)]/50 mt-2 flex-shrink-0" />
                <span><strong className="text-white">Legal Requirements:</strong> When required by law or to protect our rights</span>
              </li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-premium p-8 rounded-3xl border border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-500">
              <h2 className="text-xl font-bold text-white mb-3">05. Data Security</h2>
              <p className="text-text-3 text-sm leading-relaxed">
                We implement appropriate technical and organizational security measures to protect
                your personal information. However, no method of transmission over the internet or
                electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>
            <div className="glass-premium p-8 rounded-3xl border border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-500">
              <h2 className="text-xl font-bold text-white mb-3">06. Your Rights</h2>
              <ul className="space-y-1.5 text-text-3 text-sm">
                {['Access your personal information', 'Correct inaccurate data', 'Request deletion of your data', 'Opt-out of marketing communications', 'Data portability', 'Withdraw consent at any time'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-white/30" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="glass-premium p-8 rounded-3xl border border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h2 className="text-lg font-bold text-[var(--neon)] mb-3">07. Cookies</h2>
                <p className="text-text-3 text-sm leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your experience,
                  analyze usage, and deliver personalized content. You can control cookie preferences
                  through your browser settings.
                </p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-[var(--neon)] mb-3">08. Third-Party Links</h2>
                <p className="text-text-3 text-sm leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for
                  the privacy practices or content of these sites. We encourage you to review their
                  privacy policies.
                </p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-[var(--neon)] mb-3">09. Children's Privacy</h2>
                <p className="text-text-3 text-sm leading-relaxed">
                  Our services are not intended for individuals under 18 years of age. We do not
                  knowingly collect personal information from children. If you believe we have
                  inadvertently collected such information, please contact us.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="glass-premium p-8 rounded-3xl border border-white/5 hover:border-[var(--neon)]/30 transition-colors duration-500 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
            <p className="text-text-3 leading-relaxed max-w-2xl mx-auto">
              We may update this Privacy Policy from time to time. We will notify you of any
              material changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <div className="relative p-8 rounded-3xl border border-[var(--neon)]/30 bg-[var(--neon)]/5 backdrop-blur-xl overflow-hidden group text-center">
              <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2">11. Contact Us</h2>
                <p className="text-text-2 mb-6">If you have questions about this Privacy Policy, please reach out.</p>
                <a href="mailto:privacy@veylanlabs.com" className="mt-6 mb-6 inline-flex items-center justify-center px-8 py-4 bg-[var(--surface-2)] border border-[var(--neon)]/50 hover:bg-[var(--neon)] rounded-xl text-text hover:text-black font-bold tracking-widest transition-all duration-300 transform hover:-translate-y-1">
                  privacy@veylanlabs.com
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
            By using VeylanLabs, you agree to this Privacy Policy and our{" "}
            <Link href="/terms" className="!text-[#22c55e] hover:!text-[var(--neon)] transition-colors font-medium underline underline-offset-4 decoration-[#22c55e]/30 hover:decoration-[var(--neon)]/50">
              Terms & Conditions
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
