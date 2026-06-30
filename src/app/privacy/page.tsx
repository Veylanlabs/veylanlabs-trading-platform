import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold text-transparent bg-clip-text text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon)] to-emerald-400 drop-shadow-[0_0_15px_var(--neon-dim)]">
              VeylanLabs
            </span>
          </Link>
          <h1  className="text-4xl sm:text-5xl font-bold mt-8 mb-4">
            Privacy Policy
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
            <h2 className="text-2xl font-semibold text-white mb-4" >1. Introduction</h2>
            <p className="leading-relaxed">
              At VeylanLabs ("we," "our," or "us"), we respect your privacy and are committed to 
              protecting the personal information you share with us. This Privacy Policy explains 
              how we collect, use, disclose, and safeguard your information when you use our 
              website, indicators, and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4" >2. Information We Collect</h2>
            <h3 className="text-xl font-medium mt-4 mb-2" style={{ color: 'var(--neon)' }}>2.1 Personal Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and email address</li>
              <li>TradingView username</li>
              <li>Telegram username</li>
              <li>Billing and payment information (processed securely through our payment provider)</li>
              <li>Account credentials for platform access</li>
            </ul>

            <h3 className="text-xl font-medium mt-4 mb-2 " style={{ color: 'var(--neon)' }}>2.2 Usage Data</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Indicator usage patterns</li>
              <li>Interaction with our community features</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4" >3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Grant access to indicators and tools</li>
              <li>Send you updates, newsletters, and marketing communications</li>
              <li>Process transactions and manage subscriptions</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Monitor and analyze usage patterns</li>
              <li>Detect and prevent fraud or security issues</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4" >4. Data Sharing and Disclosure</h2>
            <p className="leading-relaxed">
              We do not sell your personal information. We may share your data with:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong className="text-white">Service Providers:</strong> Payment processors, 
                email services, and platform hosting providers who assist in delivering our services
              </li>
              <li>
                <strong className="text-white">Community Features:</strong> Your TradingView and 
                Telegram usernames may be visible to other community members
              </li>
              <li>
                <strong className="text-white">Legal Requirements:</strong> When required by law 
                or to protect our rights
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4" >5. Data Security</h2>
            <p className="leading-relaxed">
              We implement appropriate technical and organizational security measures to protect 
              your personal information. However, no method of transmission over the internet or 
              electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4" >6. Your Rights</h2>
            <p className="leading-relaxed">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4" >7. Cookies and Tracking</h2>
            <p className="leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience, 
              analyze usage, and deliver personalized content. You can control cookie preferences 
              through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4" >8. Third-Party Links</h2>
            <p className="leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for 
              the privacy practices or content of these sites. We encourage you to review their 
              privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4" >9. Children's Privacy</h2>
            <p className="leading-relaxed">
              Our services are not intended for individuals under 18 years of age. We do not 
              knowingly collect personal information from children. If you believe we have 
              inadvertently collected such information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4" >10. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any 
              material changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4" >11. Contact Us</h2>
            <p className="leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-3 p-4 rounded-lg border border-gray-800">
              <p className="text-white" style={{ color: 'var(--neon)' }}>Email: privacy@veylanlabs.com</p>
              <p className="text-gray-400 mt-1">Response time: 24-48 hours</p>
            </div>
          </section>
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm text-center">
            By using VeylanLabs, you agree to this Privacy Policy and our 
            <Link href="/terms" style={{ color: 'var(--neon)' }} className=" transition-colors mx-1">
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}