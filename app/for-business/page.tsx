import { Navbar } from "@/components/navbar"
import { BackButton } from "@/components/ui/back-button"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { GlassButton } from "@/components/ui/glass-button"
import {
  Sparkles, ArrowRight, Building2, Megaphone, Handshake, TrendingUp,
  Globe, BarChart3, Users, Target, Star, CheckCircle2
} from "lucide-react"

const solutions = [
  {
    icon: Building2,
    title: "Venue Partnerships",
    description: "List your venue on HellHive and get matched with top event creators seeking premium spaces.",
    features: ["Automated booking system", "Revenue optimization", "Calendar management", "Guest capacity tools"]
  },
  {
    icon: Megaphone,
    title: "Brand Promotions",
    description: "Sponsor events, launch branded experiences, and reach a highly engaged nightlife audience.",
    features: ["Sponsored event placements", "Custom brand activations", "Influencer partnerships", "ROI tracking dashboard"]
  },
  {
    icon: Handshake,
    title: "Corporate Events",
    description: "Plan team outings, launch parties, and client entertainment through our concierge service.",
    features: ["Dedicated event planner", "Custom packages", "Volume discounts", "White-glove service"]
  },
]

const stats = [
  { value: "50K+", label: "Monthly Active Users" },
  { value: "2,500+", label: "Events Hosted" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "$5M+", label: "Revenue Generated" },
]

const partners = [
  "Premium Nightclubs", "Rooftop Venues", "Music Labels", "Beverage Brands",
  "Fashion Houses", "Tech Companies", "Hospitality Groups", "Media Outlets"
]

export default function ForBusinessPage() {
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
            HellHive for Business
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8">
            Power Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--hive-orange)] to-[var(--hive-gold)] drop-shadow-[0_0_15px_rgba(255,106,0,0.6)]">
              Business
            </span>
            <br />
            With Nightlife
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 mb-8 sm:mb-10 text-pretty">
            Partner with the fastest-growing nightlife platform. Reach thousands of engaged
            party-goers, promote your venue, or sponsor unforgettable experiences.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlassButton variant="primary" className="!px-8 !py-4 text-lg w-full sm:w-auto group">
              Become a Partner <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </GlassButton>
            <GlassButton variant="secondary" className="!px-8 !py-4 text-lg w-full sm:w-auto">
              Download Media Kit
            </GlassButton>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--hive-orange)] to-[var(--hive-gold)] mb-2">
                  {s.value}
                </div>
                <div className="text-sm text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-24 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Business Solutions</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Tailored solutions for venues, brands, and enterprises looking to tap into the nightlife economy.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {solutions.map((sol, i) => (
              <div key={i} className="p-6 sm:p-8 rounded-2xl bg-[#0a0a0e]/60 backdrop-blur-md border border-white/5 hover:border-[var(--hive-orange)]/30 transition-all duration-500 group hover:shadow-[0_0_30px_rgba(255,106,0,0.1)]">
                <div className="w-14 h-14 rounded-2xl bg-black border border-[var(--hive-orange)]/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,106,0,0.2)] group-hover:scale-110 transition-transform">
                  <sol.icon className="h-7 w-7 text-[var(--hive-orange)]" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{sol.title}</h3>
                <p className="text-white/60 leading-relaxed mb-6">{sol.description}</p>
                <ul className="space-y-2">
                  {sol.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle2 className="h-4 w-4 text-[var(--hive-orange)] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-24 relative z-10 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Trusted By Industry Leaders</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              We work with top-tier businesses across the nightlife and entertainment industry.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {partners.map((p, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#0a0a0e]/40 border border-white/5 text-center text-white/50 hover:text-white hover:border-[var(--hive-orange)]/20 transition-all">
                <span className="text-sm font-medium">{p}</span>
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
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Let&apos;s Build Something Together</h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Whether you&apos;re a venue, brand, or enterprise — we&apos;ll craft the perfect partnership.
              </p>
              <GlassButton variant="primary" className="!px-10 !py-5 text-lg group">
                Schedule a Call <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </GlassButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
