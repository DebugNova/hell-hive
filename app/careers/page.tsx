import { Navbar } from "@/components/navbar"
import { BackButton } from "@/components/ui/back-button"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { GlassButton } from "@/components/ui/glass-button"
import {
  Sparkles, ArrowRight, MapPin, Briefcase, Clock, Heart,
  Coffee, Gamepad2, Plane, DollarSign, Zap, Users
} from "lucide-react"

const perks = [
  { icon: DollarSign, label: "Competitive Salary" },
  { icon: Heart, label: "Health & Dental" },
  { icon: Plane, label: "Unlimited PTO" },
  { icon: Coffee, label: "Free Snacks & Drinks" },
  { icon: Gamepad2, label: "Game Room" },
  { icon: Zap, label: "Learning Budget" },
  { icon: Users, label: "Team Events" },
  { icon: MapPin, label: "Remote Friendly" },
]

const jobs = [
  {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote / NYC",
    type: "Full-time",
    description: "Build beautiful, performant UIs that power the nightlife experience for millions.",
  },
  {
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote / NYC",
    type: "Full-time",
    description: "Design and scale the infrastructure behind real-time event management and payments.",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Craft pixel-perfect experiences that make discovering and hosting events effortless.",
  },
  {
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "NYC",
    type: "Full-time",
    description: "Drive user acquisition and retention through data-driven marketing strategies.",
  },
  {
    title: "Community Manager",
    department: "Operations",
    location: "Remote / LA",
    type: "Full-time",
    description: "Build and nurture our host community, creating engagement programs and support systems.",
  },
  {
    title: "Data Analyst",
    department: "Data",
    location: "Remote",
    type: "Full-time",
    description: "Uncover insights from event data to shape product decisions and business strategy.",
  },
]

const cultureValues = [
  { title: "Ship Fast", description: "We move quickly, iterate often, and learn from every release." },
  { title: "Think Big", description: "We dream about a world-changing product and work backwards to build it." },
  { title: "Stay Humble", description: "Ego has no place here. The best ideas win, no matter who shares them." },
  { title: "Party Hard", description: "We test our own product. Monthly team events are non-negotiable." },
]

export default function CareersPage() {
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
            Join the Hive
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8">
            Build the Future of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--hive-orange)] to-[var(--hive-gold)] drop-shadow-[0_0_15px_rgba(255,106,0,0.6)]">
              Nightlife
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 mb-8 sm:mb-10 text-pretty">
            We&apos;re a fast-growing team of builders, dreamers, and party people on a mission to
            transform how the world experiences nightlife.
          </p>

          <GlassButton variant="primary" className="!px-8 !py-4 text-lg group" href="#openings">
            View Open Positions <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </GlassButton>
        </div>
      </section>

      {/* Culture */}
      <section className="py-24 relative z-10 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Our Culture</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cultureValues.map((v, i) => (
              <div key={i} className="p-5 sm:p-8 rounded-2xl bg-[#0a0a0e]/60 border border-white/5 hover:border-[var(--hive-orange)]/20 transition-all group">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[var(--hive-orange)]/40 to-transparent mb-4">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold mb-2">{v.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-24 relative z-10 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Perks & Benefits</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {perks.map((p, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#0a0a0e]/60 border border-white/5 flex flex-col items-center text-center gap-3 hover:border-[var(--hive-orange)]/20 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-black border border-[var(--hive-orange)]/30 flex items-center justify-center shadow-[0_0_15px_rgba(255,106,0,0.2)] group-hover:scale-110 transition-transform">
                  <p.icon className="h-5 w-5 text-[var(--hive-orange)]" />
                </div>
                <span className="text-sm font-medium text-white/80">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-24 relative z-10 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">Open Positions</h2>
          <p className="text-white/60 text-center mb-12">
            {jobs.length} roles open across {new Set(jobs.map(j => j.department)).size} teams
          </p>

          <div className="space-y-4">
            {jobs.map((job, i) => (
              <div key={i} className="p-5 sm:p-6 rounded-2xl bg-[#0a0a0e]/60 border border-white/5 hover:border-[var(--hive-orange)]/30 transition-all group cursor-pointer hover:shadow-[0_0_30px_rgba(255,106,0,0.08)]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold group-hover:text-[var(--hive-orange)] transition-colors mb-1">{job.title}</h3>
                    <p className="text-sm text-white/50 mb-2">{job.description}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-white/40">
                      <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {job.department}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {job.type}</span>
                    </div>
                  </div>
                  <GlassButton variant="secondary" className="!px-5 !py-2.5 text-sm flex-shrink-0">
                    Apply <ArrowRight className="ml-1 h-4 w-4" />
                  </GlassButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[var(--hive-orange)]/20 to-transparent p-[1px] rounded-2xl sm:rounded-[2.5rem]">
            <div className="bg-[#0a0a0e]/80 backdrop-blur-xl rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-16 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Don&apos;t See Your Role?</h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                We&apos;re always looking for exceptional people. Send us your resume and we&apos;ll keep you in mind.
              </p>
              <GlassButton variant="primary" className="!px-10 !py-5 text-lg group">
                Send Your Resume <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </GlassButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
