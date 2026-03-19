import { Navbar } from "@/components/navbar"
import { BackButton } from "@/components/ui/back-button"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { GlassButton } from "@/components/ui/glass-button"
import {
  Sparkles, ArrowRight, Twitter, Instagram, Youtube, MessageCircle,
  Users, Heart, Trophy, Calendar, Zap, Star, Globe
} from "lucide-react"

const socialChannels = [
  { icon: Twitter, name: "Twitter / X", handle: "@HellHive", followers: "24.5K", description: "Real-time updates, event highlights, and community banter.", color: "hover:border-blue-400/30" },
  { icon: Instagram, name: "Instagram", handle: "@hellhive", followers: "89.2K", description: "Event photography, behind-the-scenes, and host spotlights.", color: "hover:border-pink-400/30" },
  { icon: Youtube, name: "YouTube", handle: "HellHive", followers: "12.8K", description: "Event recaps, hosting tutorials, and nightlife documentaries.", color: "hover:border-red-400/30" },
  { icon: MessageCircle, name: "Discord", handle: "HellHive Community", followers: "18.3K", description: "Chat with hosts, find event buddies, and get exclusive tips.", color: "hover:border-indigo-400/30" },
]

const communityStats = [
  { value: "50K+", label: "Community Members" },
  { value: "5,000+", label: "Active Hosts" },
  { value: "2,500+", label: "Events Monthly" },
  { value: "150+", label: "Cities Worldwide" },
]

const engagementFeatures = [
  {
    icon: Trophy,
    title: "Host Leaderboard",
    description: "Compete with other hosts for top ratings, highest attendance, and most creative events. Top hosts earn exclusive badges."
  },
  {
    icon: Star,
    title: "HellHive Ambassador",
    description: "Our most active community members can apply to become Ambassadors — earning perks, early access, and influencer status."
  },
  {
    icon: Calendar,
    title: "Meetups & Mixers",
    description: "We host regular community events where hosts and attendees can network, share tips, and have a great time."
  },
  {
    icon: Heart,
    title: "Referral Rewards",
    description: "Invite friends to HellHive and earn credits when they attend or host their first event. Build your network, get rewarded."
  },
  {
    icon: Globe,
    title: "Global Events",
    description: "Join live-streamed community events, virtual mixers, and global watch parties — no matter where you are."
  },
  {
    icon: Zap,
    title: "Creator Fund",
    description: "Exceptional hosts can apply for our Creator Fund — financial support to produce larger, more ambitious events."
  },
]

export default function CommunityPage() {
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
            The HellHive{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--hive-orange)] to-[var(--hive-gold)] drop-shadow-[0_0_15px_rgba(255,106,0,0.6)]">
              Community
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 mb-8 sm:mb-10 text-pretty">
            Connect with like-minded party lovers, event creators, and nightlife enthusiasts from around the world.
          </p>

          <GlassButton variant="primary" className="!px-8 !py-4 text-lg group">
            <MessageCircle className="mr-2 h-5 w-5" /> Join Discord
          </GlassButton>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {communityStats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--hive-orange)] to-[var(--hive-gold)] mb-2">
                  {s.value}
                </div>
                <div className="text-sm text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Channels */}
      <section className="py-24 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Connect With Us</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {socialChannels.map((ch, i) => (
              <div key={i} className={`p-5 sm:p-8 rounded-2xl bg-[#0a0a0e]/60 border border-white/5 ${ch.color} transition-all duration-500 group hover:shadow-[0_0_30px_rgba(255,106,0,0.08)] cursor-pointer`}>
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ch.icon className="h-7 w-7 text-white/80" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-bold">{ch.name}</h3>
                      <span className="text-sm text-[var(--hive-orange)]">{ch.followers}</span>
                    </div>
                    <p className="text-sm text-white/40 mb-2">{ch.handle}</p>
                    <p className="text-white/60 text-sm leading-relaxed">{ch.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Features */}
      <section className="py-24 relative z-10 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">Get Involved</h2>
          <p className="text-white/60 text-lg text-center max-w-2xl mx-auto mb-16">
            More than a platform — HellHive is a movement. Here&apos;s how to level up your involvement.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engagementFeatures.map((f, i) => (
              <div key={i} className="p-5 sm:p-8 rounded-2xl bg-[#0a0a0e]/60 border border-white/5 hover:border-[var(--hive-orange)]/20 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-black border border-[var(--hive-orange)]/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,106,0,0.2)] group-hover:scale-110 transition-transform">
                  <f.icon className="h-6 w-6 text-[var(--hive-orange)]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{f.description}</p>
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
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Join the Hive?</h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Thousands are already part of the community. Don&apos;t miss out on the action.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <GlassButton variant="primary" className="!px-10 !py-5 text-lg group">
                  <Users className="mr-2 h-5 w-5" /> Join Community
                </GlassButton>
                <GlassButton variant="secondary" className="!px-10 !py-5 text-lg" href="/discover">
                  Explore Events <ArrowRight className="ml-2 h-5 w-5" />
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
