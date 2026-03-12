"use client"

import { motion } from "framer-motion"
import { EventCard } from "./event-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Filter } from "lucide-react"

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

export function EventsSection() {
  return (
    <section id="discover" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[128px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Discover</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Trending Events
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            From underground raves to rooftop socials, find the perfect event that matches your vibe.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                category === "All"
                  ? "gradient-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
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
            className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all"
          >
            <Filter className="h-5 w-5" />
          </motion.button>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard key={event.title} {...event} index={index} />
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-border hover:bg-secondary/50 transition-all hover:scale-105 group"
          >
            View All Events
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
