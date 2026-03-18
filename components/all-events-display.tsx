"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FireBackground } from "@/components/ui/fire-background"
import { Search, SlidersHorizontal, CalendarDays, Calendar, MapPin, Users, Heart, ArrowRight, Flame } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/ui/back-button"

// Extended events data
const allEvents = [
  {
    title: "Neon Nights: Electronic Music Festival",
    date: "Mar 28, 2026",
    location: "Downtown LA",
    attendees: 2500,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    category: "Music",
    featured: true,
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
    title: "Underground Tech House",
    date: "Mar 25, 2026",
    location: "Brooklyn, NY",
    attendees: 300,
    image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&q=80",
    category: "Nightlife",
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
  },
  {
    title: "Art Basel After Party",
    date: "Apr 2, 2026",
    location: "Miami Beach, FL",
    attendees: 800,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    category: "Art",
    featured: false,
  },
  {
    title: "Startup Founders Mixer",
    date: "Apr 5, 2026",
    location: "San Francisco, CA",
    attendees: 200,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    category: "Networking",
    featured: false,
  },
  {
    title: "Midnight Masquerade",
    date: "Mar 31, 2026",
    location: "The Grand Ballroom, NYC",
    attendees: 800,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    category: "Social",
    featured: false,
  },
  {
    title: "Sunset Yacht Party",
    date: "Apr 8, 2026",
    location: "Miami Harbor",
    attendees: 200,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    category: "Social",
    featured: true,
  },
  {
    title: "Electric Dreams Festival",
    date: "Apr 15, 2026",
    location: "Las Vegas, NV",
    attendees: 5000,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    category: "Music",
    featured: true,
  },
  {
    title: "Indie Game Developers Showcase",
    date: "Apr 20, 2026",
    location: "Seattle, WA",
    attendees: 450,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80",
    category: "Gaming",
    featured: false,
  },
  {
    title: "Modern Art Exhibition",
    date: "May 2, 2026",
    location: "Chicago, IL",
    attendees: 600,
    image: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&q=80",
    category: "Art",
    featured: false,
  },
  {
    title: "Tech Investors Gala",
    date: "May 10, 2026",
    location: "Palo Alto, CA",
    attendees: 150,
    image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800&q=80",
    category: "Networking",
    featured: false,
  }
]

const categories = ["All", "Music", "Nightlife", "Social", "Gaming", "Art", "Networking"]

function EventListItem({ event, index }: { event: any, index: number }) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      className="group relative flex flex-col sm:flex-row overflow-hidden rounded-2xl bg-[#111116]/80 backdrop-blur-xl border border-white/5 transition-all duration-500 hover:border-[var(--hive-orange)]/50 hover:bg-[#1a1a24]/90 hover:shadow-[0_0_40px_rgba(255,106,0,0.15)] mb-4"
    >
      {/* Dynamic fire edge glow */}
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[var(--hive-orange)] to-[var(--hive-red)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Image Container */}
      <div className="relative w-full sm:w-64 md:w-80 shrink-0 h-48 sm:h-auto overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#111116] via-[#111116]/40 to-transparent sm:via-transparent" />
        
        {/* Category badge */}
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[var(--hive-orange)]/30 text-[10px] uppercase font-bold text-white shadow-[0_0_10px_rgba(255,106,0,0.2)] tracking-wider flex items-center gap-1.5 group-hover:bg-[var(--hive-orange)]/20 transition-colors">
          <Flame className="w-3 h-3 text-[var(--hive-orange)]" />
          {event.category}
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col justify-between p-5 sm:p-6 w-full gap-4">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-bold text-white text-xl md:text-2xl mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[var(--hive-orange)] transition-all duration-300">
              {event.title}
            </h3>
            
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/50">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[var(--hive-orange)]/70" />
                <span className="font-medium">{event.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[var(--hive-orange)]/70" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          {/* Like button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="shrink-0 p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <Heart 
              className={`h-5 w-5 transition-all duration-300 ${
                isLiked ? "fill-[var(--hive-red)] text-[var(--hive-red)] scale-110 drop-shadow-[0_0_8px_rgba(255,42,42,0.6)]" : "text-white/40 hover:text-white"
              }`} 
            />
          </button>
        </div>

        <div className="flex items-center justify-between w-full mt-2 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 border border-neutral-800" />
              ))}
            </div>
            <span className="text-xs font-medium text-white/40 ml-2">
              <span className="text-white/70">{event.attendees.toLocaleString()}</span> attending
            </span>
          </div>

          <Link href={`/events/${event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
            <Button
              variant="ghost"
              className="h-auto p-0 text-[var(--hive-orange)] hover:text-white hover:bg-transparent group/btn transition-colors text-sm font-semibold tracking-wide"
            >
              Access Event
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export function AllEventsDisplay() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEvents = allEvents.filter(event => {
    const matchesCategory = activeCategory === "All" || event.category === activeCategory
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section className="relative w-full">
      {/* Intensified Fire Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0e] via-[#110500] to-[#0a0a0e] -z-10" />
      <div className="opacity-60 -z-0">
        <FireBackground />
      </div>
      
      {/* Stronger ambient upper glow */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[var(--hive-orange)]/10 via-transparent to-transparent blur-3xl -z-10 pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <BackButton label="Go Back" />
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-10"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[var(--hive-orange)] text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-[0_0_20px_rgba(255,106,0,0.15)] backdrop-blur-md"
          >
            <Flame className="w-3.5 h-3.5 fill-[var(--hive-orange)]" />
            <span>Full Roster</span>
            <Flame className="w-3.5 h-3.5 fill-[var(--hive-orange)]" />
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight font-sans drop-shadow-[0_0_25px_rgba(255,106,0,0.6)]">
            Explore All Events
          </h1>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto text-pretty font-medium opacity-80 line-clamp-2">
            Discover the most exclusive parties, intense networking setups, and vibrant music festivals all around the hell-hive community.
          </p>
        </motion.div>

        {/* 
          1-Line Filters and Search Container 
          (Perfectly aligned single row wrapper with horizontal scrolling on smaller screens)
        */}
        <div className="sticky top-24 z-20 mb-8 p-2 rounded-full bg-[#0a0a0e]/80 border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.8),0_0_30px_rgba(255,106,0,0.1)] backdrop-blur-xl group hover:border-[var(--hive-orange)]/30 transition-colors duration-500">
          {/* Subtle gradient border trace effect */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--hive-orange)]/60 to-transparent group-hover:via-[var(--hive-orange)] transition-colors duration-500" />
          
          <div className="flex flex-row flex-nowrap items-center w-full gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            
            {/* Search Bar (flex-grow so it takes up available space nicely, but maintains min width) */}
            <div className="relative shrink-0 min-w-[200px] w-full sm:w-auto sm:flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-white/40 group-focus-within:text-[var(--hive-orange)] transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2.5 bg-transparent border-none text-white placeholder-white/40 focus:ring-0 sm:text-sm outline-none font-medium h-full"
                placeholder="Search events, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-white/10 shrink-0 mx-1 hidden sm:block"></div>

            {/* Category Filter */}
            <div className="flex flex-row flex-nowrap items-center gap-2 shrink-0 pr-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 whitespace-nowrap ${
                    category === activeCategory
                      ? "bg-gradient-to-r from-[var(--hive-orange)] to-[var(--hive-red)] text-white shadow-[0_0_15px_rgba(255,106,0,0.4)]"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
              <button
                className="shrink-0 ml-1 p-2 rounded-full bg-white/5 text-white/60 hover:bg-[var(--hive-orange)]/20 hover:text-[var(--hive-orange)] transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Events LINE-BY-LINE List With Animation */}
        <div className="mt-8 pb-32">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredEvents.length > 0 ? (
              <div className="flex flex-col gap-1 w-full relative">
                {/* Glowing vertical line guiding the list (theme accent) */}
                <div className="hidden lg:block absolute left-[-40px] top-4 bottom-12 w-px bg-gradient-to-b from-[var(--hive-orange)]/50 via-[var(--hive-red)]/20 to-transparent" />
                
                {filteredEvents.map((event, index) => (
                  <div key={event.title} className="relative">
                    {/* Small dot connecting to vertical line */}
                    <div className="hidden lg:block absolute left-[-44px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--hive-orange)] shadow-[0_0_10px_rgba(255,106,0,0.8)]" />
                    
                    <EventListItem event={event} index={index} />
                  </div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center text-center py-24 px-4 w-full bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-md"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--hive-red)]/10 border border-[var(--hive-red)]/30 mb-6 shadow-[0_0_30px_rgba(255,42,42,0.15)]"
                >
                  <Search className="h-8 w-8 text-[var(--hive-red)]" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">No events found</h3>
                <p className="text-white/50 text-base max-w-md mx-auto mb-8 leading-relaxed">
                  We couldn't track down any events matching your current search or category filter inside the hive.
                </p>
                <button 
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                  className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-all backdrop-blur-sm border border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
