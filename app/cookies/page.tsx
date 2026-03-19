import { Navbar } from "@/components/navbar"
import { BackButton } from "@/components/ui/back-button"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { GlassButton } from "@/components/ui/glass-button"
import { Sparkles, Cookie, Settings } from "lucide-react"

const sections = [
  {
    title: "1. What Are Cookies?",
    content: [
      "Cookies are small text files placed on your device when you visit a website. They help us recognize your browser, remember your preferences, and improve your experience.",
      "Cookies can be \"session\" cookies (deleted when you close your browser) or \"persistent\" cookies (stored until they expire or you delete them).",
      "We also use similar technologies like web beacons, pixels, and local storage, which function similarly to cookies."
    ]
  },
  {
    title: "2. How We Use Cookies",
    content: [
      "We use cookies for the following purposes:",
      "**Essential Cookies:** Required for the platform to function. These handle authentication, security, and basic navigation. You cannot opt out of these.",
      "**Functional Cookies:** Remember your preferences, language settings, and login status to enhance your experience.",
      "**Analytics Cookies:** Help us understand how visitors interact with our platform. We use this data to improve features, fix bugs, and optimize performance.",
      "**Marketing Cookies:** Used to deliver relevant advertising and track the effectiveness of our marketing campaigns. These may be set by third-party partners."
    ]
  },
  {
    title: "3. Cookies We Use",
    content: [
      "| Cookie | Type | Duration | Purpose |",
      "|--------|------|----------|---------|",
      "| `hh_session` | Essential | Session | Maintains your login session |",
      "| `hh_csrf` | Essential | Session | Prevents cross-site request forgery |",
      "| `hh_prefs` | Functional | 1 year | Stores your display preferences |",
      "| `hh_locale` | Functional | 1 year | Remembers your language preference |",
      "| `_ga` | Analytics | 2 years | Google Analytics tracking |",
      "| `_gid` | Analytics | 24 hours | Google Analytics session tracking |",
      "| `_fbp` | Marketing | 3 months | Facebook advertising pixel |",
      "| `hh_consent` | Essential | 1 year | Stores your cookie consent choices |"
    ]
  },
  {
    title: "4. Third-Party Cookies",
    content: [
      "Some cookies are placed by third-party services that appear on our pages. We do not control these cookies. Third parties include:",
      "• **Google Analytics** — Website analytics and performance measurement",
      "• **Stripe** — Payment processing and fraud prevention",
      "• **Meta (Facebook)** — Advertising and remarketing",
      "• **Vercel Analytics** — Performance monitoring and web vitals",
      "Please refer to these third parties' privacy policies for more information about their cookie practices."
    ]
  },
  {
    title: "5. Managing Your Cookie Preferences",
    content: [
      "You can control cookies in several ways:",
      "**Browser Settings:** Most browsers allow you to view, manage, and delete cookies. Check your browser's help section for instructions.",
      "**Our Cookie Settings:** Use the 'Cookie Settings' button at the bottom of this page to manage your preferences on HellHive.",
      "**Opt-Out Tools:** You can opt out of interest-based advertising through the Digital Advertising Alliance (https://optout.aboutads.info) or the Network Advertising Initiative (https://optout.networkadvertising.org).",
      "Note: Disabling certain cookies may affect the functionality of the platform."
    ]
  },
  {
    title: "6. Do Not Track",
    content: [
      "Some browsers offer a \"Do Not Track\" (DNT) feature. HellHive currently does not respond to DNT signals.",
      "We recommend using the cookie management options described above to control tracking preferences."
    ]
  },
  {
    title: "7. Updates to This Policy",
    content: [
      "We may update this Cookie Policy periodically to reflect changes in technology, legislation, or our business practices.",
      "Material changes will be communicated through a prominent notice on the platform. The \"Last Updated\" date at the top of this page indicates when the policy was last revised."
    ]
  },
  {
    title: "8. Contact Us",
    content: [
      "If you have questions about our use of cookies, contact us at:",
      "• **Email:** privacy@hellhive.com",
      "• **Address:** HellHive Inc., 123 Innovation Drive, New York, NY 10001"
    ]
  },
]

export default function CookiePolicyPage() {
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

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">Cookie Policy</h1>
          <p className="text-white/50 text-sm">Last updated: March 1, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="relative z-10 bg-black pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-5 sm:p-8 md:p-12 rounded-2xl bg-[#0a0a0e]/60 border border-white/5">
            <p className="text-white/60 leading-relaxed mb-10">
              This Cookie Policy explains how HellHive (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses cookies and
              similar tracking technologies when you visit or use our platform.
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

            {/* Cookie Settings CTA */}
            <div className="mt-12 pt-8 border-t border-white/5 text-center">
              <GlassButton variant="primary" className="!px-8 !py-4 text-base">
                <Settings className="mr-2 h-5 w-5" /> Manage Cookie Settings
              </GlassButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
