import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { GlassButton } from "@/components/ui/glass-button"
import { ArrowRight, MapPin, Star, Flame, Users2 } from "lucide-react"

export default function LearnMorePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-black pointer-events-none" />
        <FireBackground />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-b border-white/10 pb-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
            The New Standard in <span className="text-[var(--hive-orange)] drop-shadow-[0_0_15px_rgba(255,106,0,0.6)]">Nightlife</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed text-pretty">
            Hell Hive isn't just an app—it's a movement. We are redefining how you discover 
            exclusive parties, connect with like-minded people, and experience nightlife 
            in your city. No more missing out, no more settling for average nights.
          </p>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-24 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--hive-orange)]/10 border border-[var(--hive-orange)]/30 mb-6 text-[var(--hive-orange)]">
                <Flame className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Curated Experiences</h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Every event on Hell Hive goes through a rigorous quality check. From underground 
                raves to luxury penthouse parties, we ensure every listing meets our standard for 
                an unforgettable night. Say goodbye to dud events and hello to premium entertainment.
              </p>
              <ul className="space-y-4 text-white/80">
                <li className="flex items-center gap-3"><Star className="w-5 h-5 text-[var(--hive-gold)]" /> Verified hosts and venues</li>
                <li className="flex items-center gap-3"><Star className="w-5 h-5 text-[var(--hive-gold)]" /> Transparent reviews and ratings</li>
                <li className="flex items-center gap-3"><Star className="w-5 h-5 text-[var(--hive-gold)]" /> High-quality production value</li>
              </ul>
            </div>
            <div className="order-1 md:order-2 h-[400px] rounded-2xl bg-gradient-to-br from-[#1a1a24] to-[#0a0a0e] border border-white/5 relative overflow-hidden group">
               {/* Decorative elements representing feature */}
               <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity transform group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop')" }} />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="h-[400px] rounded-2xl bg-gradient-to-br from-[#1a1a24] to-[#0a0a0e] border border-white/5 relative overflow-hidden group">
               {/* Decorative elements representing feature */}
               <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity transform group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop')" }} />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--hive-orange)]/10 border border-[var(--hive-orange)]/30 mb-6 text-[var(--hive-orange)]">
                <MapPin className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Seamless Discovery</h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Our intelligent discovery engine learns what you love. Whether you're into techno, 
                hip-hop, or intimate acoustic sets, Hell Hive recommends the best events matching 
                your vibe in your area.
              </p>
              <ul className="space-y-4 text-white/80">
                <li className="flex items-center gap-3"><Star className="w-5 h-5 text-[var(--hive-gold)]" /> Personalized event feed</li>
                <li className="flex items-center gap-3"><Star className="w-5 h-5 text-[var(--hive-gold)]" /> Real-time map view of nearby parties</li>
                <li className="flex items-center gap-3"><Star className="w-5 h-5 text-[var(--hive-gold)]" /> Smart notifications for drops</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Don't Miss Another Night</h2>
            <p className="text-xl text-white/70 mb-10">
              Join the hive today and unlock access to the city's most exclusive events.
            </p>
            <GlassButton variant="primary" className="!px-10 !py-5 text-lg group" href="/">
              Explore Events
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </GlassButton>
        </div>
      </section>

      <Footer />
    </main>
  )
}
