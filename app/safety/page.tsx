import { Navbar } from "@/components/navbar"
import { BackButton } from "@/components/ui/back-button"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { GlassButton } from "@/components/ui/glass-button"
import {
  Sparkles, Shield, AlertTriangle, UserCheck, Eye, Phone,
  Lock, CheckCircle2, ArrowRight, Flag, HeartHandshake, Scale
} from "lucide-react"

const safetyFeatures = [
  {
    icon: UserCheck,
    title: "ID Verification",
    description: "Every host goes through a multi-step identity verification process before they can publish events."
  },
  {
    icon: Eye,
    title: "24/7 Monitoring",
    description: "Our safety team actively monitors events in real-time through our platform, responding instantly to any concerns."
  },
  {
    icon: Lock,
    title: "Secure Payments",
    description: "All transactions are encrypted end-to-end. We never share your financial information with hosts or third parties."
  },
  {
    icon: Shield,
    title: "Guest Screening",
    description: "Hosts can enable guest verification, require RSVPs, and set approval requirements for added security."
  },
  {
    icon: Phone,
    title: "Emergency Support",
    description: "One-tap emergency button during any event connects you to our safety team and local emergency services."
  },
  {
    icon: Scale,
    title: "Zero Tolerance Policy",
    description: "We enforce strict policies against harassment, discrimination, and unsafe behavior. Violations lead to immediate bans."
  },
]

const guidelines = [
  {
    title: "For Guests",
    rules: [
      "Respect all venue rules and the host's guidelines",
      "Never share event addresses or access codes publicly",
      "Report any suspicious or unsafe behavior immediately",
      "Drink responsibly and plan safe transportation home",
      "Respect personal boundaries and consent at all times",
      "Follow local noise ordinances and be considerate of neighbors",
    ]
  },
  {
    title: "For Hosts",
    rules: [
      "Verify your venue meets all local safety requirements",
      "Maintain a safe guest-to-space ratio — never overcrowd",
      "Have a clear emergency plan and share it with your team",
      "Provide adequate lighting, ventilation, and emergency exits",
      "Never serve alcohol to minors or visibly intoxicated guests",
      "Designate a sober point of contact for safety throughout the event",
    ]
  },
]

const reportingSteps = [
  { step: "1", title: "Open the Report", description: "Use the flag icon on any event page, user profile, or in-app during an event." },
  { step: "2", title: "Describe the Issue", description: "Select the type of concern and provide as many details as possible." },
  { step: "3", title: "Submit & Track", description: "Our safety team reviews all reports within 1 hour. You'll receive updates in-app." },
  { step: "4", title: "Resolution", description: "We take action based on our investigation, including warnings, suspensions, or bans." },
]

export default function SafetyPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-black pointer-events-none" />
        <FireBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-left mb-4"><BackButton /></div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[var(--hive-orange)]/30 text-[var(--hive-orange)] shadow-[0_0_10px_rgba(255,106,0,0.2)] text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4 text-[var(--hive-gold)]" />
            Your Safety Matters
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8">
            Safety at{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--hive-orange)] to-[var(--hive-gold)] drop-shadow-[0_0_15px_rgba(255,106,0,0.6)]">
              HellHive
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 mb-8 sm:mb-10 text-pretty">
            We&apos;re committed to creating a safe, inclusive, and trustworthy platform for every host and guest.
            Here&apos;s how we protect our community.
          </p>

          <GlassButton variant="primary" className="!px-8 !py-4 text-lg group" href="#guidelines">
            <Shield className="mr-2 h-5 w-5" /> View Guidelines
          </GlassButton>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-24 relative z-10 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">How We Keep You Safe</h2>
          <p className="text-white/60 text-lg text-center max-w-2xl mx-auto mb-16">
            Multiple layers of safety built into every aspect of the HellHive experience.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyFeatures.map((f, i) => (
              <div key={i} className="p-5 sm:p-8 rounded-2xl bg-[#0a0a0e]/60 border border-white/5 hover:border-[var(--hive-orange)]/20 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-black border border-[var(--hive-orange)]/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,106,0,0.2)] group-hover:scale-110 transition-transform">
                  <f.icon className="h-6 w-6 text-[var(--hive-orange)]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-white/60 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section id="guidelines" className="py-24 relative z-10 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Community Guidelines</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {guidelines.map((g, i) => (
              <div key={i} className="p-5 sm:p-8 rounded-2xl bg-[#0a0a0e]/60 border border-white/5">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <HeartHandshake className="h-6 w-6 text-[var(--hive-orange)]" />
                  {g.title}
                </h3>
                <ul className="space-y-3">
                  {g.rules.map((rule, j) => (
                    <li key={j} className="flex items-start gap-3 text-white/60">
                      <CheckCircle2 className="h-5 w-5 text-[var(--hive-orange)]/60 flex-shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reporting System */}
      <section className="py-24 relative z-10 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">Reporting System</h2>
          <p className="text-white/60 text-lg text-center max-w-2xl mx-auto mb-16">
            See something? Say something. Our reporting process is simple, fast, and confidential.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {reportingSteps.map((step, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#0a0a0e]/60 border border-white/5 flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[var(--hive-red)] to-[var(--hive-orange)] flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-[0_0_15px_rgba(255,42,42,0.3)]">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-bold mb-1">{step.title}</h3>
                  <p className="text-sm text-white/60">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-24 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[var(--hive-red)]/20 to-transparent p-[1px] rounded-2xl sm:rounded-[2.5rem]">
            <div className="bg-[#0a0a0e]/80 backdrop-blur-xl rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-16 text-center">
              <AlertTriangle className="h-12 w-12 text-[var(--hive-orange)] mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Need Immediate Help?</h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                If you&apos;re in danger, call your local emergency services immediately.
                For non-emergency safety concerns, reach out to our 24/7 safety team.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <GlassButton variant="primary" className="!px-10 !py-5 text-lg">
                  <Flag className="mr-2 h-5 w-5" /> Report an Incident
                </GlassButton>
                <GlassButton variant="secondary" className="!px-10 !py-5 text-lg">
                  <Phone className="mr-2 h-5 w-5" /> Contact Safety Team
                </GlassButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
