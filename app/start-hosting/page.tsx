import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { GlassButton } from "@/components/ui/glass-button"
import { Sparkles, Calendar, DollarSign, Users, Shield, ArrowRight, Zap, Target } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Vast Network",
    description: "Get immediate access to a thriving community of party-goers looking for the next big event."
  },
  {
    icon: DollarSign,
    title: "Maximized Earnings",
    description: "Keep more of what you make with competitive platform fees and multiple monetization options."
  },
  {
    icon: Shield,
    title: "Secure & Safe",
    description: "Built-in ID verification, guest screening, and robust payment protection for total peace of mind."
  },
  {
    icon: Calendar,
    title: "Smart Management",
    description: "Powerful tools to manage RSVPs, track analytics, and communicate with your guests seamlessly."
  },
  {
    icon: Zap,
    title: "Marketing Boost",
    description: "Featured placements and algorithm optimization to help your event go viral."
  },
  {
    icon: Target,
    title: "Targeted Audience",
    description: "Reach the right crowd with advanced demographic and interest-based targeting."
  }
]

export default function StartHostingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-black pointer-events-none" />
        <FireBackground />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[var(--hive-orange)]/30 text-[var(--hive-orange)] shadow-[0_0_10px_rgba(255,106,0,0.2)] text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4 text-[var(--hive-gold)]" />
            Host with Hell Hive
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
            Turn Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--hive-orange)] to-[var(--hive-gold)] drop-shadow-[0_0_15px_rgba(255,106,0,0.6)]">Vision</span><br />
            Into an <span className="text-white">Experience</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-white/70 mb-10 text-pretty">
            Join the elite tier of event creators. Hell Hive gives you the platform, 
            tools, and audience to throw legendary parties and get paid for it.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlassButton variant="primary" className="!px-8 !py-4 text-lg w-full sm:w-auto group">
              Apply to Host
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </GlassButton>
            <GlassButton variant="secondary" className="!px-8 !py-4 text-lg w-full sm:w-auto" href="#benefits">
              View Benefits
            </GlassButton>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section id="benefits" className="py-24 relative z-10 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Host With Us?</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Everything you need to create, manage, and scale your events, all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#0a0a0e]/60 backdrop-blur-md border border-white/5 hover:border-[var(--hive-orange)]/30 transition-all group hover:shadow-[0_0_30px_rgba(255,106,0,0.1)]">
                <div className="w-12 h-12 rounded-xl bg-black border border-[var(--hive-orange)]/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,106,0,0.2)] group-hover:scale-110 transition-transform">
                  <benefit.icon className="h-6 w-6 text-[var(--hive-orange)]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-white/60 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Simplified */}
      <section className="py-24 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[var(--hive-orange)]/20 to-transparent p-[1px] rounded-[2.5rem]">
            <div className="bg-[#0a0a0e]/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Start?</h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Getting started is simple. Apply now to become a verified host and unlock your dashboard.
              </p>
              <GlassButton variant="primary" className="!px-10 !py-5 text-lg group">
                Create Your Host Account
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </GlassButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
