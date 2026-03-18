"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { EventCard } from "@/components/event-card"
import { BackButton } from "@/components/ui/back-button"
import { Heart, Search, LibraryBig } from "lucide-react"
import Link from "next/link"

const favoriteEvents = [
  {
    title: "Neon Nights: Electronic Music Festival",
    date: "Mar 28, 2026",
    location: "Downtown LA",
    attendees: 2500,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    category: "Music",
    featured: false,
  },
  {
    title: "Rooftop Sunset Social",
    date: "Mar 22, 2026",
    location: "Manhattan, NY",
    attendees: 150,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    category: "Social",
    featured: false,
  },
  {
    title: "Midnight Gaming Tournament",
    date: "Mar 30, 2026",
    location: "Austin, TX",
    attendees: 500,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    category: "Gaming",
    featured: false,
  }
]

export default function FavoritesPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <FireBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e] via-[#0a0a0e]/80 to-transparent" />
      </div>

      <div className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton label="Go Back" />
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 border-b border-white/10 pb-8"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--hive-red)]/20 border border-[var(--hive-red)]/30 text-[var(--hive-red)] text-xs font-bold uppercase tracking-widest mb-4">
                <Heart className="w-3.5 h-3.5 fill-[var(--hive-red)]" />
                <span>Your Collection</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase drop-shadow-[0_0_15px_rgba(255,42,42,0.3)]">
                Saved Events
              </h1>
              <p className="text-white/50 mt-3 max-w-xl text-lg">
                Your personal vault of favorited parties and elite networking events. Don't let them sell out!
              </p>
            </div>
            
            <Link href="/events" className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all flex items-center gap-2 backdrop-blur-md hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <LibraryBig className="w-4 h-4 text-white/70" />
              Browse More Events
            </Link>
          </div>
        </motion.div>

        {/* Content */}
        {favoriteEvents.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {favoriteEvents.map((event, index) => (
              <div key={event.title} className="relative group">
                {/* Wrap EventCard with a Link for continuity */}
                <Link href={`/events/${event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                  <div className="pointer-events-auto h-full w-full">
                    {/* EventCard internally has likes, but we'll use it as display */}
                    <EventCard {...event} index={index} />
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">No favorites yet</h3>
            <p className="text-white/50 max-w-md mx-auto mb-8">
              You haven't added any events to your collection. Explore the hive and save the ones that catch your eye.
            </p>
            <Link href="/events" className="px-8 py-3 rounded-full bg-[var(--hive-orange)] hover:bg-[var(--hive-red)] text-white font-bold transition-all shadow-[0_0_20px_rgba(255,106,0,0.4)]">
              Discover Events
            </Link>
          </div>
        )}
        
      </div>

      <Footer />
    </main>
  )
}
