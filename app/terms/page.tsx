import { Navbar } from "@/components/navbar"
import { BackButton } from "@/components/ui/back-button"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { Sparkles } from "lucide-react"

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using the HellHive platform (\"Service\"), you agree to be bound by these Terms of Service (\"Terms\"). If you do not agree, do not use the Service.",
      "These Terms constitute a legally binding agreement between you and HellHive Inc. (\"HellHive,\" \"we,\" \"us,\" or \"our\").",
      "We reserve the right to modify these Terms at any time. Continued use of the Service after changes constitutes acceptance."
    ]
  },
  {
    title: "2. Eligibility",
    content: [
      "You must be at least 18 years old to use HellHive.",
      "By using the Service, you represent that you meet this age requirement and have the legal capacity to enter into a binding agreement.",
      "Accounts registered by bots or automated methods are not authorized and will be terminated."
    ]
  },
  {
    title: "3. Account Registration",
    content: [
      "You must create an account to access certain features. You agree to provide accurate, current, and complete information.",
      "You are responsible for maintaining the security of your account credentials. You agree to notify us immediately of any unauthorized access.",
      "You may not use another person's account without permission. One person may not maintain multiple accounts.",
      "We reserve the right to suspend or terminate accounts that violate these Terms."
    ]
  },
  {
    title: "4. Events & Hosting",
    content: [
      "**For Hosts:** By hosting events on HellHive, you agree to:",
      "• Provide accurate event information (date, time, location, pricing)",
      "• Comply with all local laws, regulations, permits, and venue requirements",
      "• Maintain a safe environment for all attendees",
      "• Honor all ticket purchases and refund policies as stated on your event page",
      "• Not discriminate against any attendee based on race, gender, orientation, or disability",
      "**For Attendees:** By attending events found on HellHive, you agree to:",
      "• Follow all event rules and venue guidelines",
      "• Conduct yourself in a respectful and lawful manner",
      "• Accept that events are run by independent hosts, not by HellHive"
    ]
  },
  {
    title: "5. Payments & Fees",
    content: [
      "HellHive facilitates payments between attendees and hosts. By using our payment services, you agree to:",
      "• Pay all applicable fees as described at the time of purchase",
      "• Authorize HellHive to charge your selected payment method",
      "• Accept that platform fees vary by host plan tier (Starter: 10%, Pro: 5%, Empire: 2%)",
      "Host earnings are deposited within 48 hours after an event concludes. HellHive deducts applicable platform fees before payout.",
      "Refund policies are set by individual hosts and displayed on each event page. HellHive may mediate disputes but is not responsible for refund decisions."
    ]
  },
  {
    title: "6. Prohibited Conduct",
    content: [
      "You agree not to:",
      "• Use the Service for any illegal purpose or in violation of any laws",
      "• Harass, abuse, or threaten other users",
      "• Post false, misleading, or fraudulent event listings",
      "• Scrape, crawl, or use automated means to access the Service",
      "• Attempt to circumvent security features or access unauthorized areas",
      "• Upload viruses, malware, or other malicious code",
      "• Impersonate any person or entity",
      "• Use the Service to distribute spam or unsolicited advertising",
      "Violations may result in immediate account suspension or termination."
    ]
  },
  {
    title: "7. Intellectual Property",
    content: [
      "All content, features, and functionality of HellHive (including logos, designs, text, and software) are owned by HellHive Inc. and protected by intellectual property laws.",
      "You retain ownership of content you create (event descriptions, photos, etc.), but grant HellHive a non-exclusive, worldwide license to use, display, and promote your content on the platform.",
      "You may not use HellHive's trademarks, logos, or branding without prior written permission."
    ]
  },
  {
    title: "8. Limitation of Liability",
    content: [
      "HellHive is a marketplace platform that connects hosts and attendees. We are not the organizer of events listed on our platform.",
      "**HellHive is not liable for:** injuries, losses, or damages that occur at third-party events; the actions or omissions of hosts or attendees; event cancellations or changes made by hosts; the quality or safety of any event.",
      "To the maximum extent permitted by law, HellHive's total liability to you shall not exceed the amount you paid to HellHive in the 12 months preceding the claim."
    ]
  },
  {
    title: "9. Dispute Resolution",
    content: [
      "Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.",
      "Arbitration shall take place in New York, NY. You agree to waive any right to a jury trial or to participate in a class action.",
      "For disputes under $10,000, arbitration may be conducted online or by phone."
    ]
  },
  {
    title: "10. Termination",
    content: [
      "We may suspend or terminate your account at any time, with or without cause, and with or without notice.",
      "Upon termination, your right to use the Service ceases immediately. Provisions that by their nature should survive termination (indemnification, limitation of liability, dispute resolution) will remain in effect.",
      "You may delete your account at any time through your account settings."
    ]
  },
  {
    title: "11. Governing Law",
    content: [
      "These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to conflict of law principles.",
      "Any legal proceedings not subject to arbitration shall be brought in the courts of New York County, New York."
    ]
  },
  {
    title: "12. Contact",
    content: [
      "For questions about these Terms of Service, contact us at:",
      "• **Email:** legal@hellhive.com",
      "• **Address:** HellHive Inc., 123 Innovation Drive, New York, NY 10001"
    ]
  },
]

export default function TermsOfServicePage() {
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

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">Terms of Service</h1>
          <p className="text-white/50 text-sm">Last updated: March 1, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="relative z-10 bg-black pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-5 sm:p-8 md:p-12 rounded-2xl bg-[#0a0a0e]/60 border border-white/5">
            <p className="text-white/60 leading-relaxed mb-10">
              Welcome to HellHive. Please read these Terms of Service carefully before using our platform.
              These Terms govern your access to and use of HellHive&apos;s website, mobile applications, and services.
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
