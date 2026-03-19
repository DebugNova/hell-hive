import { Navbar } from "@/components/navbar"
import { BackButton } from "@/components/ui/back-button"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { GlassButton } from "@/components/ui/glass-button"
import {
  Sparkles, ArrowRight, CheckCircle2, Lightbulb, Camera, Users,
  DollarSign, Calendar, MapPin, Shield, BarChart3, Megaphone, Star
} from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Users,
    title: "Create Your Host Profile",
    description: "Sign up, verify your identity, and set up your host profile. Add a bio, profile photo, and your social links to build credibility.",
    tips: ["Use a professional photo", "Write a compelling bio", "Link your social media accounts"]
  },
  {
    number: "02",
    icon: Calendar,
    title: "Plan Your Event",
    description: "Define the type of event, date, time, and guest capacity. Think about your theme, vibe, and what makes your event unique.",
    tips: ["Choose a date at least 2 weeks out", "Keep capacity realistic", "Plan a unique theme or angle"]
  },
  {
    number: "03",
    icon: MapPin,
    title: "Choose Your Venue",
    description: "Select from HellHive's partner venues or use your own space. Make sure to include clear address details and any parking/transport info.",
    tips: ["Add photos of the venue", "Include directions & parking info", "Check noise regulations"]
  },
  {
    number: "04",
    icon: DollarSign,
    title: "Set Your Pricing",
    description: "Create ticket tiers (Early Bird, General, VIP). Set prices that reflect the value of your event while staying competitive.",
    tips: ["Offer an Early Bird discount", "Create VIP packages", "Consider group pricing"]
  },
  {
    number: "05",
    icon: Camera,
    title: "Create Your Event Page",
    description: "Upload high-quality photos, write a compelling description, and list all the details attendees need to know.",
    tips: ["Use high-res images", "Highlight what's included", "Add a clear schedule of events"]
  },
  {
    number: "06",
    icon: Megaphone,
    title: "Promote & Market",
    description: "Leverage HellHive's marketing tools, share on social media, and consider boosting your listing for maximum visibility.",
    tips: ["Share the event link on social media", "Use the HellHive boost feature", "Reach out to local influencers"]
  },
  {
    number: "07",
    icon: Shield,
    title: "Prepare for the Day",
    description: "Finalize your guest list, coordinate with vendors, and review your check-in process. Safety plans and backup contacts should be ready.",
    tips: ["Download the guest list for check-in", "Have a backup plan for weather", "Brief any staff or volunteers"]
  },
  {
    number: "08",
    icon: BarChart3,
    title: "Host & Collect Feedback",
    description: "Deliver an amazing experience, then review your analytics and guest feedback to continuously improve.",
    tips: ["Be present and engaged with guests", "Collect ratings and reviews", "Analyze your event analytics"]
  },
]

const proTips = [
  { icon: Lightbulb, tip: "Start small — your first event doesn't need to be huge. Focus on quality over quantity." },
  { icon: Star, tip: "Engage with every guest. Personal touches make events memorable and earn 5-star reviews." },
  { icon: Camera, tip: "Document everything. Great photos from your events become marketing gold for future listings." },
  { icon: BarChart3, tip: "Study your analytics after every event. Data-driven hosts grow 3x faster on HellHive." },
]

export default function HostGuidePage() {
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
            Host Guide
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8">
            The Complete{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--hive-orange)] to-[var(--hive-gold)] drop-shadow-[0_0_15px_rgba(255,106,0,0.6)]">
              Host Guide
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 mb-8 sm:mb-10 text-pretty">
            Everything you need to know to host legendary events on HellHive — from your first listing to sell-out success.
          </p>

          <GlassButton variant="primary" className="!px-8 !py-4 text-lg group" href="#steps">
            Start the Guide <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </GlassButton>
        </div>
      </section>

      {/* Steps */}
      <section id="steps" className="py-24 relative z-10 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Step by Step</h2>

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="p-5 sm:p-8 rounded-2xl bg-[#0a0a0e]/60 border border-white/5 hover:border-[var(--hive-orange)]/20 transition-all group">
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-black border border-[var(--hive-orange)]/30 flex items-center justify-center shadow-[0_0_15px_rgba(255,106,0,0.2)] group-hover:scale-110 transition-transform">
                        <step.icon className="h-5 w-5 sm:h-7 sm:w-7 text-[var(--hive-orange)]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-[var(--hive-orange)]">Step {step.number}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{step.title}</h3>
                      <p className="text-white/60 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">{step.description}</p>
                      <div className="space-y-2">
                        {step.tips.map((tip, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm text-white/50">
                            <CheckCircle2 className="h-4 w-4 text-[var(--hive-orange)]/60 flex-shrink-0" />
                            {tip}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute -bottom-4 left-11 w-px h-8 bg-gradient-to-b from-[var(--hive-orange)]/30 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Tips */}
      <section className="py-24 relative z-10 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Pro Tips</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {proTips.map((tip, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#0a0a0e]/60 border border-white/5 flex items-start gap-4 hover:border-[var(--hive-orange)]/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[var(--hive-orange)]/10 flex items-center justify-center flex-shrink-0">
                  <tip.icon className="h-5 w-5 text-[var(--hive-orange)]" />
                </div>
                <p className="text-white/70 leading-relaxed">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[var(--hive-orange)]/20 to-transparent p-[1px] rounded-2xl sm:rounded-[2.5rem]">
            <div className="bg-[#0a0a0e]/80 backdrop-blur-xl rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-16 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Host?</h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                You&apos;ve got the knowledge. Now it&apos;s time to create something legendary.
              </p>
              <GlassButton variant="primary" className="!px-10 !py-5 text-lg group" href="/host-a-party">
                Create Your First Event <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </GlassButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
