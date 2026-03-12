"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Calendar, MapPin, Users, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const featuredEvents = [
  {
    title: "Electric Dreams Festival",
    date: "April 15-17, 2026",
    location: "Las Vegas, NV",
    attendees: 5000,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80",
    description: "Three days of non-stop electronic music featuring world-renowned DJs and immersive art installations.",
    tags: ["Festival", "EDM", "Multi-day"],
  },
  {
    title: "Midnight Masquerade",
    date: "March 31, 2026",
    location: "The Grand Ballroom, NYC",
    attendees: 800,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80",
    description: "An exclusive masquerade ball with live orchestral performances and premium cocktails.",
    tags: ["Exclusive", "Black Tie", "Live Music"],
  },
  {
    title: "Sunset Yacht Party",
    date: "April 8, 2026",
    location: "Miami Harbor",
    attendees: 200,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80",
    description: "Sail into the sunset with Miami's best DJs, open bar, and unforgettable ocean views.",
    tags: ["VIP", "Yacht", "Sunset"],
  },
]

function FeaturedEventCard({ event, index }: { event: typeof featuredEvents[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  return (
    <motion.div
      ref={cardRef}
      style={{ y, scale }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group relative"
    >
      <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
        {/* Image */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden ${index % 2 === 1 ? "md:order-2" : ""}`}
        >
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          {/* Featured badge */}
          <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full glass">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Featured</span>
          </div>
          
          {/* Tags */}
          <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs font-medium text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Hover glow */}
          <div className="absolute inset-0 ring-2 ring-primary/0 group-hover:ring-primary/50 transition-all duration-500 rounded-3xl" />
        </motion.div>

        {/* Content */}
        <div className={`space-y-6 ${index % 2 === 1 ? "md:order-1" : ""}`}>
          <motion.h3
            initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-glow transition-all"
          >
            {event.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            {event.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-6 text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span>{event.attendees.toLocaleString()} attending</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Button
              size="lg"
              className="gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105 border-glow group/btn"
              asChild
            >
              <Link href="#">
                Get Tickets
                <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturedEvents() {
  return (
    <section className="py-24 relative">
      {/* Background accents */}
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[128px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Don't Miss Out</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Featured Experiences
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Hand-picked events that promise extraordinary moments and unforgettable memories.
          </p>
        </motion.div>

        {/* Featured Events */}
        <div className="space-y-24">
          {featuredEvents.map((event, index) => (
            <FeaturedEventCard key={event.title} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
