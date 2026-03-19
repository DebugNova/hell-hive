import { Navbar } from "@/components/navbar"
import { BackButton } from "@/components/ui/back-button"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { Sparkles } from "lucide-react"

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "We collect information you provide directly, such as when you create an account, host or attend events, make purchases, or contact us for support.",
      "**Personal Information:** Name, email address, phone number, date of birth, profile photo, and payment information.",
      "**Event Data:** Events you create, attend, or bookmark. Your preferences, search queries, and interactions with the platform.",
      "**Device Information:** IP address, browser type, operating system, device identifiers, and general location data.",
      "**Usage Data:** Pages visited, features used, time spent on the platform, and interactions with other users.",
    ]
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "We use the information we collect to:",
      "• Provide, maintain, and improve the HellHive platform and services",
      "• Process transactions and send related information (confirmations, receipts, invoices)",
      "• Send promotional communications (with your consent) about events, features, and offers",
      "• Personalize your experience by showing relevant events and recommendations",
      "• Monitor and analyze trends, usage, and activities on the platform",
      "• Detect, investigate, and prevent fraudulent transactions and other illegal activities",
      "• Comply with legal obligations and enforce our Terms of Service",
    ]
  },
  {
    title: "3. Information Sharing",
    content: [
      "We do not sell your personal information. We may share your information in the following situations:",
      "• **With Hosts:** When you RSVP or purchase tickets, hosts receive your name and contact information for event coordination.",
      "• **With Service Providers:** Third-party vendors who perform services on our behalf (payment processing, email delivery, analytics).",
      "• **For Legal Reasons:** When required by law, legal process, or to protect the rights, property, or safety of HellHive, our users, or others.",
      "• **Business Transfers:** In connection with a merger, acquisition, or sale of assets, your information may be transferred.",
    ]
  },
  {
    title: "4. Data Security",
    content: [
      "We implement industry-standard security measures to protect your personal information:",
      "• End-to-end encryption for all payment transactions",
      "• Regular security audits and penetration testing",
      "• Secure data storage with access controls and monitoring",
      "• Two-factor authentication available for all accounts",
      "While we strive to protect your information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.",
    ]
  },
  {
    title: "5. Your Rights & Choices",
    content: [
      "You have the following rights regarding your personal information:",
      "• **Access:** Request a copy of the personal information we hold about you.",
      "• **Correction:** Request correction of inaccurate or incomplete personal information.",
      "• **Deletion:** Request deletion of your personal information (subject to legal requirements).",
      "• **Portability:** Request your data in a portable, machine-readable format.",
      "• **Opt-Out:** Unsubscribe from marketing emails at any time using the link in any email.",
      "To exercise any of these rights, contact us at privacy@hellhive.com.",
    ]
  },
  {
    title: "6. Data Retention",
    content: [
      "We retain your personal information for as long as your account is active or as needed to provide you services.",
      "We may retain certain information for legitimate business purposes or as required by law (e.g., tax records, transaction history).",
      "After account deletion, we will remove your personal data within 30 days, except where retention is required by law.",
    ]
  },
  {
    title: "7. Children's Privacy",
    content: [
      "HellHive is not intended for users under the age of 18. We do not knowingly collect personal information from minors.",
      "If we discover that we have collected information from a child under 18, we will promptly delete it.",
    ]
  },
  {
    title: "8. Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. We will notify you of any material changes by email or through a prominent notice on our platform.",
      "Your continued use of HellHive after changes take effect constitutes acceptance of the updated policy.",
    ]
  },
  {
    title: "9. Contact Us",
    content: [
      "If you have questions about this Privacy Policy or our data practices, contact us at:",
      "• **Email:** privacy@hellhive.com",
      "• **Address:** HellHive Inc., 123 Innovation Drive, New York, NY 10001",
      "• **Data Protection Officer:** dpo@hellhive.com",
    ]
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-12 lg:pt-44 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-black pointer-events-none" />
        <FireBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-left mb-4"><BackButton /></div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[var(--hive-orange)]/30 text-[var(--hive-orange)] shadow-[0_0_10px_rgba(255,106,0,0.2)] text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4 text-[var(--hive-gold)]" />
            Legal
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">Privacy Policy</h1>
          <p className="text-white/50 text-sm">Last updated: March 1, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="relative z-10 bg-black pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-5 sm:p-8 md:p-12 rounded-2xl bg-[#0a0a0e]/60 border border-white/5">
            <p className="text-white/60 leading-relaxed mb-10">
              At HellHive (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you use
              our platform and services. Please read this policy carefully.
            </p>

            {sections.map((section, i) => (
              <div key={i} className="mb-10 last:mb-0">
                <h2 className="text-xl font-bold mb-4 text-white">{section.title}</h2>
                <div className="space-y-3">
                  {section.content.map((paragraph, j) => (
                    <p key={j} className="text-white/60 leading-relaxed" dangerouslySetInnerHTML={{
                      __html: paragraph
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/80">$1</strong>')
                    }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
