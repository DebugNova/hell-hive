import { Navbar } from "@/components/navbar"
import { BackButton } from "@/components/ui/back-button"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { GlassButton } from "@/components/ui/glass-button"
import { Sparkles, Download, ArrowRight, Palette, FileText, Image, Type, Mail } from "lucide-react"

const brandAssets = [
  {
    icon: Image,
    title: "Logo Pack",
    description: "Primary logo in SVG, PNG, and EPS formats. Light and dark variants included.",
    format: "ZIP — 2.4 MB",
  },
  {
    icon: Palette,
    title: "Brand Colors",
    description: "Complete color palette with hex, RGB, and OKLCH values. Primary, secondary, and accent colors.",
    format: "PDF — 420 KB",
  },
  {
    icon: Type,
    title: "Typography Kit",
    description: "Brand fonts (Inter, Space Grotesk) with usage guidelines and web font files.",
    format: "ZIP — 1.8 MB",
  },
  {
    icon: FileText,
    title: "Brand Guidelines",
    description: "Comprehensive brand book covering logo usage, spacing, color, tone, and examples.",
    format: "PDF — 5.2 MB",
  },
  {
    icon: Image,
    title: "Product Screenshots",
    description: "High-res screenshots of the HellHive platform for press and editorial use.",
    format: "ZIP — 12 MB",
  },
  {
    icon: FileText,
    title: "Fact Sheet",
    description: "Key company stats, founding date, headquarters, and leadership bios.",
    format: "PDF — 180 KB",
  },
]

const companyFacts = [
  { label: "Founded", value: "2023" },
  { label: "Headquarters", value: "New York, NY" },
  { label: "Employees", value: "50+" },
  { label: "Cities", value: "25+" },
  { label: "Hosts", value: "5,000+" },
  { label: "Monthly Users", value: "50K+" },
]

export default function PressKitPage() {
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
            For the Press
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8">
            Press{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--hive-orange)] to-[var(--hive-gold)] drop-shadow-[0_0_15px_rgba(255,106,0,0.6)]">
              Kit
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 mb-8 sm:mb-10 text-pretty">
            Everything you need to tell the HellHive story. Download logos, brand assets, and company information.
          </p>

          <GlassButton variant="primary" className="!px-8 !py-4 text-lg group">
            <Download className="mr-2 h-5 w-5" /> Download All Assets
          </GlassButton>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-24 relative z-10 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About HellHive</h2>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                HellHive is the premium event marketplace for discovering and hosting nightlife experiences.
                Founded in 2023, HellHive connects party lovers with unforgettable events — from house parties
                to music festivals — across 25+ cities. Our mission is to democratize nightlife and make every
                night unforgettable.
              </p>
              <p className="text-white/60 text-lg leading-relaxed">
                The platform provides hosts with professional tools for event creation, ticketing, guest
                management, and marketing — while giving attendees a curated discovery experience powered
                by AI recommendation.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {companyFacts.map((fact, i) => (
                <div key={i} className="p-5 rounded-2xl bg-[#0a0a0e]/60 border border-white/5">
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-1">{fact.label}</div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--hive-orange)] to-[var(--hive-gold)]">
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="py-24 relative z-10 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Brand Assets</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandAssets.map((asset, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#0a0a0e]/60 border border-white/5 hover:border-[var(--hive-orange)]/30 transition-all duration-500 group hover:shadow-[0_0_30px_rgba(255,106,0,0.08)] flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-black border border-[var(--hive-orange)]/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,106,0,0.2)] group-hover:scale-110 transition-transform">
                  <asset.icon className="h-6 w-6 text-[var(--hive-orange)]" />
                </div>
                <h3 className="text-lg font-bold mb-2">{asset.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">{asset.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xs text-white/30">{asset.format}</span>
                  <button className="flex items-center gap-1 text-sm text-[var(--hive-orange)] hover:text-white transition-colors">
                    <Download className="h-4 w-4" /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-24 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[var(--hive-orange)]/20 to-transparent p-[1px] rounded-[2.5rem]">
            <div className="bg-[#0a0a0e]/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Media Inquiries</h2>
              <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">
                For press inquiries, interviews, or partnership requests — reach out to our media team.
              </p>
              <p className="flex items-center justify-center gap-2 text-[var(--hive-orange)] text-lg mb-10">
                <Mail className="h-5 w-5" /> press@hellhive.com
              </p>
              <GlassButton variant="primary" className="!px-10 !py-5 text-lg group">
                Contact Press Team <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </GlassButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
