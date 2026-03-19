import { Navbar } from "@/components/navbar"
import { BackButton } from "@/components/ui/back-button"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { GlassButton } from "@/components/ui/glass-button"
import {
  Sparkles, ArrowRight, Users, DollarSign, Shield, Calendar,
  Zap, Target, BarChart3, Megaphone, CheckCircle2, Star
} from "lucide-react"

const benefits = [
  { icon: Users, title: "Massive Reach", description: "Tap into thousands of verified party-goers actively searching for their next experience." },
  { icon: DollarSign, title: "Earn More", description: "Keep up to 90% of ticket revenue with the most competitive fees in the industry." },
  { icon: Shield, title: "Full Protection", description: "ID verification, secure payments, and damage coverage give you peace of mind." },
  { icon: Calendar, title: "Easy Management", description: "Powerful tools for RSVPs, guest lists, waitlists, and real-time event analytics." },
  { icon: Megaphone, title: "Built-in Marketing", description: "Featured listings, social sharing tools, and algorithm-driven exposure for your events." },
  { icon: BarChart3, title: "Data Insights", description: "Track attendance trends, revenue analytics, and audience demographics in real time." },
]

const steps = [
  { step: "01", title: "Create Your Profile", description: "Sign up, verify your identity, and set up your host profile in under 5 minutes." },
  { step: "02", title: "Design Your Event", description: "Add details, set pricing tiers, upload photos, and define your event's unique vibe." },
  { step: "03", title: "Publish & Promote", description: "Go live on HellHive and leverage our marketing tools to fill every spot." },
  { step: "04", title: "Host & Earn", description: "Deliver an unforgettable experience and get paid within 48 hours." },
]

const testimonials = [
  { name: "DJ Marcus", role: "Event Creator", quote: "HellHive doubled my event attendance in the first month. The platform is a game-changer.", rating: 5 },
  { name: "Sarah Chen", role: "Venue Owner", quote: "Finally a platform that understands nightlife. Our bookings increased 3x since joining.", rating: 5 },
  { name: "Alex Rivera", role: "Party Host", quote: "The tools are incredible. From ticketing to guest management, everything just works.", rating: 5 },
]

export default function HostAPartyPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-black pointer-events-none" />
        <FireBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-left mb-4"><BackButton /></div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[var(--hive-orange)]/30 text-[var(--hive-orange)] shadow-[0_0_10px_rgba(255,106,0,0.2)] text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4 text-[var(--hive-gold)]" />
            Become a Host
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8">
            Your Party,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--hive-orange)] to-[var(--hive-gold)] drop-shadow-[0_0_15px_rgba(255,106,0,0.6)]">
              Your Rules
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 mb-8 sm:mb-10 text-pretty">
            Turn your vision into reality. HellHive gives you everything you need to
            create, promote, and monetize legendary events.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlassButton variant="primary" className="!px-8 !py-4 text-lg w-full sm:w-auto group">
              Create Event <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </GlassButton>
            <GlassButton variant="secondary" className="!px-8 !py-4 text-lg w-full sm:w-auto" href="#how-it-works">
              How It Works
            </GlassButton>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 relative z-10 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Host on HellHive?</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Everything you need to throw the event of a lifetime — tools, audience, and support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="p-6 sm:p-8 rounded-2xl bg-[#0a0a0e]/60 backdrop-blur-md border border-white/5 hover:border-[var(--hive-orange)]/30 transition-all duration-500 group hover:shadow-[0_0_30px_rgba(255,106,0,0.1)]">
                <div className="w-12 h-12 rounded-xl bg-black border border-[var(--hive-orange)]/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,106,0,0.2)] group-hover:scale-110 transition-transform">
                  <b.icon className="h-6 w-6 text-[var(--hive-orange)]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{b.title}</h3>
                <p className="text-white/60 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              From idea to sold-out event in four simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center group">
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[var(--hive-orange)]/30 to-transparent mb-6">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.description}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8">
                    <ArrowRight className="h-5 w-5 text-[var(--hive-orange)]/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative z-10 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Loved by Hosts</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#0a0a0e]/60 backdrop-blur-md border border-white/5 hover:border-[var(--hive-orange)]/20 transition-all">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-[var(--hive-gold)] text-[var(--hive-gold)]" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-white/40">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[var(--hive-orange)]/20 to-transparent p-[1px] rounded-2xl sm:rounded-[2.5rem]">
            <div className="bg-[#0a0a0e]/80 backdrop-blur-xl rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-16 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Create Something Epic?</h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Join thousands of hosts already making waves on HellHive. Your next legendary event starts here.
              </p>
              <GlassButton variant="primary" className="!px-10 !py-5 text-lg group">
                Create Your Event <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </GlassButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
