"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { BackButton } from "@/components/ui/back-button"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { GlassButton } from "@/components/ui/glass-button"
import { Search, MapPin, Music, DollarSign, Calendar, Clock, Users, Star, Filter, ChevronDown, Flame, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const categories = ["All", "House Party", "Club Night", "Rooftop", "Pool Party", "Music Festival", "Private Dinner", "Gaming Night"]

const events = [
  {
    id: 1,
    title: "Neon Nights Underground",
    location: "Brooklyn, NY",
    date: "Mar 28, 2026",
    time: "10 PM – 4 AM",
    price: "$45",
    attendees: 234,
    rating: 4.9,
    category: "Club Night",
    image: "🎵",
    hot: true,
  },
  {
    id: 2,
    title: "Sunset Rooftop Vibes",
    location: "Miami, FL",
    date: "Apr 2, 2026",
    time: "6 PM – 12 AM",
    price: "$35",
    attendees: 186,
    rating: 4.8,
    category: "Rooftop",
    image: "🌅",
    hot: false,
  },
  {
    id: 3,
    title: "Bass Drop Pool Party",
    location: "Las Vegas, NV",
    date: "Apr 5, 2026",
    time: "2 PM – 10 PM",
    price: "$60",
    attendees: 412,
    rating: 4.9,
    category: "Pool Party",
    image: "🏊",
    hot: true,
  },
  {
    id: 4,
    title: "Vinyl & Cocktails",
    location: "Austin, TX",
    date: "Apr 8, 2026",
    time: "8 PM – 2 AM",
    price: "$25",
    attendees: 92,
    rating: 4.7,
    category: "House Party",
    image: "🍸",
    hot: false,
  },
  {
    id: 5,
    title: "Techno Warehouse Rave",
    location: "Detroit, MI",
    date: "Apr 12, 2026",
    time: "11 PM – 6 AM",
    price: "$40",
    attendees: 567,
    rating: 5.0,
    category: "Club Night",
    image: "🔊",
    hot: true,
  },
  {
    id: 6,
    title: "Chef's Table After Dark",
    location: "San Francisco, CA",
    date: "Apr 15, 2026",
    time: "7 PM – 11 PM",
    price: "$85",
    attendees: 48,
    rating: 4.9,
    category: "Private Dinner",
    image: "🍽️",
    hot: false,
  },
  {
    id: 7,
    title: "Retro Gaming Marathon",
    location: "Portland, OR",
    date: "Apr 18, 2026",
    time: "4 PM – 12 AM",
    price: "$15",
    attendees: 120,
    rating: 4.6,
    category: "Gaming Night",
    image: "🎮",
    hot: false,
  },
  {
    id: 8,
    title: "Inferno Music Festival",
    location: "Coachella Valley, CA",
    date: "Apr 22, 2026",
    time: "12 PM – 2 AM",
    price: "$150",
    attendees: 2840,
    rating: 4.8,
    category: "Music Festival",
    image: "🔥",
    hot: true,
  },
]

export default function DiscoverPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEvents = events.filter((event) => {
    const matchesCategory = activeCategory === "All" || event.category === activeCategory
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-black pointer-events-none" />
        <FireBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-left mb-4"><BackButton /></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[var(--hive-orange)]/30 text-[var(--hive-orange)] shadow-[0_0_10px_rgba(255,106,0,0.2)] text-sm font-medium mb-6"
          >
            <Sparkles className="h-4 w-4 text-[var(--hive-gold)]" />
            Explore the Scene
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Discover{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--hive-orange)] to-[var(--hive-gold)] drop-shadow-[0_0_15px_rgba(255,106,0,0.6)]">
              Unforgettable
            </span>
            <br />
            Experiences
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 mb-10"
          >
            Find the hottest parties, exclusive events, and unforgettable nights near you.
            Filter by vibe, location, or price — your next epic night awaits.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative flex items-center bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <Search className="h-5 w-5 text-white/40 ml-4" />
              <input
                type="text"
                placeholder="Search events, venues, or cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm sm:text-base px-4 py-3 focus:outline-none"
              />
              <GlassButton variant="primary" className="!px-6 !py-2.5 text-sm">
                Search
              </GlassButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Category Bar */}
      <section className="relative z-10 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-[var(--hive-red)] to-[var(--hive-orange)] text-white shadow-[0_0_15px_rgba(255,42,42,0.3)]"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto w-full">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all">
                <MapPin className="h-4 w-4" /> Location <ChevronDown className="h-3 w-3" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all">
                <DollarSign className="h-4 w-4" /> Price <ChevronDown className="h-3 w-3" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all">
                <Calendar className="h-4 w-4" /> Date <ChevronDown className="h-3 w-3" />
              </button>
            </div>
          </div>

          <p className="text-sm text-white/40">{filteredEvents.length} events found</p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="relative z-10 bg-black pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="wait">
              {filteredEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link href={`/events/${event.id}`} className="block group">
                    <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0e]/60 backdrop-blur-md border border-white/5 hover:border-[var(--hive-orange)]/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,106,0,0.1)] hover:-translate-y-1">
                      {/* Image placeholder */}
                      <div className="relative h-48 bg-gradient-to-br from-[var(--hive-orange)]/20 to-[var(--hive-violet)]/20 flex items-center justify-center text-5xl">
                        {event.image}
                        {event.hot && (
                          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-[var(--hive-red)] to-[var(--hive-orange)] text-xs font-semibold">
                            <Flame className="h-3 w-3" /> HOT
                          </div>
                        )}
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs">
                          <Star className="h-3 w-3 text-[var(--hive-gold)]" /> {event.rating}
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--hive-orange)] transition-colors">{event.title}</h3>
                        <div className="flex items-center gap-2 text-white/50 text-sm mb-3">
                          <MapPin className="h-3.5 w-3.5" /> {event.location}
                        </div>
                        <div className="flex items-center gap-4 text-white/50 text-xs mb-4">
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {event.date}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {event.time}</span>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <span className="text-lg font-bold text-[var(--hive-orange)]">{event.price}</span>
                          <span className="flex items-center gap-1 text-xs text-white/40">
                            <Users className="h-3 w-3" /> {event.attendees} going
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More */}
          <div className="text-center mt-16">
            <GlassButton variant="secondary" className="!px-10 !py-4 text-base">
              Load More Events
            </GlassButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
