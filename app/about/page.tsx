import { Navbar } from "@/components/navbar"
import { BackButton } from "@/components/ui/back-button"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { GlassButton } from "@/components/ui/glass-button"
import { Sparkles, ArrowRight, Heart, Eye, Rocket, Users, Globe, Zap, Shield, Star } from "lucide-react"

const values = [
  { icon: Heart, title: "Community First", description: "We build for the people who live for the night. Every feature serves the community." },
  { icon: Shield, title: "Safety Always", description: "ID verification, secure payments, and proactive moderation keep everyone protected." },
  { icon: Zap, title: "Relentless Innovation", description: "We push boundaries to create the best possible experience for hosts and guests." },
  { icon: Globe, title: "Inclusive by Design", description: "Everyone deserves a seat at the table — or a spot on the dance floor." },
]

const team = [
  { name: "Jordan Blake", role: "CEO & Co-Founder", emoji: "👤" },
  { name: "Maya Rodriguez", role: "CTO & Co-Founder", emoji: "👩‍💻" },
  { name: "Alex Kim", role: "Head of Design", emoji: "🎨" },
  { name: "Sam Patel", role: "Head of Growth", emoji: "📈" },
  { name: "Chris Nguyen", role: "Head of Safety", emoji: "🛡️" },
  { name: "Taylor Santos", role: "Head of Community", emoji: "🤝" },
]

const milestones = [
  { year: "2023", title: "The Spark", description: "HellHive was born from a simple idea: nightlife discovery should be effortless." },
  { year: "2024", title: "Ignition", description: "Launched in 5 cities with 500+ hosts. Closed our seed round with top-tier investors." },
  { year: "2025", title: "Expansion", description: "Scaled to 25 cities, 5,000+ hosts, and 50,000 monthly active users." },
  { year: "2026", title: "The Future", description: "Global expansion, AI-powered recommendations, and the next era of nightlife." },
]

export default function AboutPage() {
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
            Our Story
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8">
            We&apos;re{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--hive-orange)] to-[var(--hive-gold)] drop-shadow-[0_0_15px_rgba(255,106,0,0.6)]">
              Redefining
            </span>
            <br />
            Nightlife
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 mb-8 sm:mb-10 text-pretty">
            HellHive is the premium marketplace connecting party lovers with unforgettable experiences.
            We believe everyone deserves a legendary night out.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 relative z-10 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-6 sm:p-10 rounded-2xl bg-[#0a0a0e]/60 backdrop-blur-md border border-white/5 hover:border-[var(--hive-orange)]/20 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-black border border-[var(--hive-orange)]/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,106,0,0.2)]">
                <Rocket className="h-7 w-7 text-[var(--hive-orange)]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-white/60 text-lg leading-relaxed">
                To democratize nightlife by building the world&apos;s most trusted platform for
                discovering and hosting social experiences — making every night unforgettable
                for hosts and guests alike.
              </p>
            </div>

            <div className="p-6 sm:p-10 rounded-2xl bg-[#0a0a0e]/60 backdrop-blur-md border border-white/5 hover:border-[var(--hive-orange)]/20 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-black border border-[var(--hive-orange)]/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,106,0,0.2)]">
                <Eye className="h-7 w-7 text-[var(--hive-orange)]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-white/60 text-lg leading-relaxed">
                A world where anyone can find or create their perfect night out with a few taps.
                We&apos;re building the infrastructure for the $1 trillion global nightlife economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 relative z-10 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Our Journey</h2>

          <div className="space-y-12">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-4 sm:gap-8 items-start">
                <div className="flex-shrink-0 w-14 sm:w-20 text-right">
                  <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--hive-orange)] to-[var(--hive-gold)]">
                    {m.year}
                  </span>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-4 h-4 rounded-full bg-[var(--hive-orange)] shadow-[0_0_15px_rgba(255,106,0,0.5)]" />
                  {i < milestones.length - 1 && (
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[var(--hive-orange)]/40 to-transparent" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-bold mb-2">{m.title}</h3>
                  <p className="text-white/60 leading-relaxed">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 relative z-10 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">What We Stand For</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#0a0a0e]/60 border border-white/5 hover:border-[var(--hive-orange)]/20 transition-all text-center group">
                <div className="w-12 h-12 rounded-xl bg-black border border-[var(--hive-orange)]/30 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,106,0,0.2)]">
                  <v.icon className="h-6 w-6 text-[var(--hive-orange)]" />
                </div>
                <h3 className="text-lg font-bold mb-2">{v.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Meet the Team</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {team.map((t, i) => (
              <div key={i} className="text-center group">
                <div className="w-24 h-24 rounded-2xl bg-[#0a0a0e]/60 border border-white/5 group-hover:border-[var(--hive-orange)]/30 flex items-center justify-center mx-auto mb-4 text-4xl transition-all group-hover:shadow-[0_0_30px_rgba(255,106,0,0.1)]">
                  {t.emoji}
                </div>
                <h3 className="font-semibold text-sm">{t.name}</h3>
                <p className="text-xs text-white/40">{t.role}</p>
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
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Join the Movement</h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Be part of the nightlife revolution. Whether you&apos;re hosting or attending — we&apos;re building this for you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <GlassButton variant="primary" className="!px-10 !py-5 text-lg group" href="/discover">
                  Discover Events <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </GlassButton>
                <GlassButton variant="secondary" className="!px-10 !py-5 text-lg" href="/careers">
                  We&apos;re Hiring
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
