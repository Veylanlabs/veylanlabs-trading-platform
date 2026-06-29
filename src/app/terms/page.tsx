import Link from 'next/link';

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-400 drop-shadow-[0_0_15px_var(--neon-dim)]">
              VeylanLabs
            </span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mt-8 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-400 text-sm">
            Last Updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using VeylanLabs ("we," "our," or "us"), you agree to be bound by 
              these Terms & Conditions. If you do not agree with any part of these terms, you 
              may not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Services Description</h2>
            <p className="leading-relaxed">
              VeylanLabs provides educational trading tools, indicators, analysis, and community 
              features for informational purposes only. Our services include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>TradingView indicators and tools</li>
              <li>Educational content and tutorials</li>
              <li>Community access (Discord/Telegram)</li>
              <li>Live session breakdowns and analysis</li>
              <li>Real-time market data and alerts</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Risk Disclaimer</h2>
            <div className="p-4 bg-gray-200  border-l-4 border-red-500 rounded-lg" style={{color : "black"}}>
              <p className="font-bold ">IMPORTANT RISK WARNING</p>
              <p className="mt-2 leading-relaxed">
                Trading financial markets carries substantial risk and you can lose money. 
                Past performance does not guarantee future results. No indicator predicts 
                the market or guarantees profit.
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Trading involves risk of loss</li>
                <li>You should never trade with money you cannot afford to lose</li>
                <li>VeylanLabs is educational only - not financial advice</li>
                <li>You are solely responsible for your trading decisions</li>
                <li>Results vary by individual trader</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. User Accounts</h2>
            <h3 className="text-xl font-medium mt-4 mb-2" style={{ color: 'var(--neon)' }}>4.1 Account Creation</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must not share your account credentials</li>
              <li>You must be at least 18 years old to use our services</li>
            </ul>

            <h3 className="text-xl font-style={{ color: 'var(--neon)' }} medium  mt-4 mb-2">4.2 Account Termination</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>We reserve the right to suspend or terminate accounts</li>
              <li>Violations of these terms may result in termination</li>
              <li>You may cancel your subscription at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Subscription and Payments</h2>
            <h3 className="text-xl font-style={{ color: 'var(--neon)' }} medium  mt-4 mb-2">5.1 Pricing</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Subscription fees are clearly displayed on our pricing page</li>
              <li>Prices are subject to change with notice</li>
              <li>Founding member pricing is locked for life</li>
            </ul>

            <h3 className="text-xl font-style={{ color: 'var(--neon)' }} medium  mt-4 mb-2">5.2 Billing</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payments are processed through secure third-party providers</li>
              <li>Subscriptions are automatically renewed</li>
              <li>You can cancel anytime through your account settings</li>
              <li>No refunds for partial billing periods</li>
            </ul>

            <h3 className="text-xl font-style={{ color: 'var(--neon)' }} medium  mt-4 mb-2">5.3 Refund Policy</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>We offer a 7-day money-back guarantee for new subscribers</li>
              <li>Refund requests must be submitted within 7 days of purchase</li>
              <li>Refunds are processed to the original payment method</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Intellectual Property</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All indicators, tools, and content are proprietary to VeylanLabs</li>
              <li>You may not copy, distribute, or reverse-engineer our indicators</li>
              <li>Unauthorized sharing of login credentials is prohibited</li>
              <li>You retain rights to your own trading strategies</li>
              <li>Content may not be reproduced without explicit permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Community Guidelines</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respect other community members</li>
              <li>No harassment, discrimination, or hate speech</li>
              <li>No spamming or self-promotion</li>
              <li>No sharing of illegal or harmful content</li>
              <li>No impersonation of VeylanLabs staff</li>
              <li>No soliciting or selling within the community</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Limitation of Liability</h2>
            <div className="p-4 bg-gray-200 rounded-lg border border-gray-800" style={{color : "black"}}>
              <p className="leading-relaxed">
                VeylanLabs provides services "as is" without warranties of any kind. 
                We are not liable for:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Financial losses from trading decisions</li>
                <li>Technical issues or service interruptions</li>
                <li>Third-party service disruptions</li>
                <li>Data loss or inaccuracies</li>
                <li>Consequential or indirect damages</li>
              </ul>
              <p className="mt-3 text-sm ">
                Maximum liability is limited to the amount paid for the service in the 
                previous 12 months.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are solely responsible for your trading decisions</li>
              <li>You must comply with all applicable laws and regulations</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must not use the service for illegal purposes</li>
              <li>You must not attempt to manipulate or exploit the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Termination and Suspension</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We may suspend or terminate accounts for policy violations</li>
              <li>We reserve the right to discontinue any part of the service</li>
              <li>You may cancel your subscription at any time</li>
              <li>Termination does not affect prior rights and obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Modifications</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of 
              significant changes via email or through our platform. Continued use of the service 
              constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Governing Law</h2>
            <p className="leading-relaxed">
              These terms are governed by the laws of the jurisdiction in which VeylanLabs operates, 
              without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. Contact</h2>
            <div className="p-4 rounded-lg border border-gray-800">
              <p className="text-white">For questions about these terms, please contact:</p>
              <p style={{ color: 'var(--neon)' }} className=" mt-2">Email: legal@veylanlabs.com</p>
              <p className="text-gray-400 mt-1">Response time: 24-48 hours</p>
            </div>
          </section>
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm text-center">
            By using VeylanLabs, you agree to these Terms & Conditions and our 
            <Link href="/privacy" style={{ color: 'var(--neon)' }} className=" hover:text-[#7b2ff7] transition-colors mx-1">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}