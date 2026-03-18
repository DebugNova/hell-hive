"use client"

import { motion } from "framer-motion"
import { EventCard } from "./event-card"
import { Button } from "@/components/ui/button"
import { GlassButton } from "@/components/ui/glass-button"
import { ArrowRight, Filter, SlidersHorizontal } from "lucide-react"
import { FireBackground } from "@/components/ui/fire-background"
import { useState } from "react"

const events = [
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
]

const categories = ["All", "Music", "Nightlife", "Social", "Gaming", "Art", "Networking"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function EventsSection() {
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <section id="discover" className="py-16 sm:py-24 relative">
      
      <FireBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-white/50 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Discover
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Trending Events
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto text-pretty px-4">
            From underground raves to rooftop socials, find the perfect event that matches your vibe.
          </p>
        </motion.div>

        {/* Events Content Wrapper */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-8 md:p-12 lg:p-16 rounded-[2.5rem] bg-[#0a0a0e]/60 border border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="relative z-10 w-full overflow-hidden sm:overflow-visible">
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    category === activeCategory
                      ? "bg-[var(--hive-red)]/20 text-white shadow-[0_0_15px_rgba(255,42,42,0.4)] border border-[var(--hive-red)]/50"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-transparent backdrop-blur-sm"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 sm:p-2.5 rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white backdrop-blur-sm transition-all border border-transparent hover:border-white/10"
              >
                <SlidersHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.button>
            </motion.div>
    
            {/* Events Grid */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {events.map((event, index) => (
                <EventCard key={event.title} {...event} index={index} />
              ))}
            </motion.div>
    
            {/* Load More */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-10 sm:mt-12"
            >
              <GlassButton
                variant="primary"
                className="group px-8 sm:px-10 py-4 sm:py-5 border border-[var(--hive-orange)]/50 shadow-[0_0_30px_rgba(255,106,0,0.4)] hover:shadow-[0_0_50px_rgba(255,106,0,0.8)] bg-gradient-to-r from-[var(--hive-orange)]/20 via-transparent to-[var(--hive-orange)]/20 hover:border-[var(--hive-orange)] transition-all duration-500"
                href="/events"
              >
                <span className="flex items-center text-white drop-shadow-[0_0_10px_rgba(255,106,0,0.8)] font-bold tracking-wider">
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 text-[var(--hive-orange)] group-hover:translate-x-1 transition-transform" />
                </span>
              </GlassButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
