"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Event Enthusiast",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "HellHive completely changed how I discover events. Found the most amazing rooftop party last weekend!",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Party Host",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    content: "As a host, HellHive gives me the perfect platform to reach people who actually want to be at my events.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Music Lover",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content: "The underground music scene on HellHive is unmatched. I've discovered artists and venues I never knew existed.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Tech Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    content: "Met my co-founder at a startup mixer I found through the app. Can't recommend it enough!",
    rating: 5,
  },
  {
    name: "Luna Williams",
    role: "Social Butterfly",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    content: "Every weekend is an adventure now. HellHive curates experiences perfectly matched to my vibe.",
    rating: 5,
  },
  {
    name: "Alex Thompson",
    role: "Club Promoter",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "The quality of attendees we get through HellHive is incredible. Total game changer for our events.",
    rating: 5,
  },
]

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative p-5 sm:p-6 rounded-2xl glass border border-border hover:border-primary/30 transition-all duration-500 min-w-[280px] sm:min-w-[350px] max-w-[350px] sm:max-w-[400px] flex-shrink-0"
    >
      {/* Quote icon */}
      <Quote className="absolute top-3 sm:top-4 right-3 sm:right-4 h-6 w-6 sm:h-8 sm:w-8 text-primary/20" />
      
      {/* Rating */}
      <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-primary text-primary" />
        ))}
      </div>

      {/* Content */}
      <p className="text-sm sm:text-base text-foreground/90 leading-relaxed mb-4 sm:mb-6">
        {`"${testimonial.content}"`}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div className="font-semibold text-sm sm:text-base text-foreground">{testimonial.name}</div>
          <div className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</div>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5

    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed
        
        // Reset when reaching the middle (duplicate content point)
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0
        }
        
        scrollContainer.scrollLeft = scrollPosition
      }
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isPaused])

  return (
    <section id="testimonials" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 px-4"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-primary text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Testimonials
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Loved by Thousands
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto text-pretty">
            Join a community of event lovers who have transformed their social lives with HellHive.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 px-4 sm:px-8 overflow-x-hidden"
          >
            {/* Double the testimonials for seamless loop */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.name}-${index}`}
                testimonial={testimonial}
                index={index % testimonials.length}
              />
            ))}
          </div>
        </div>

        {/* Mobile scroll hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-muted-foreground mt-6 sm:hidden"
        >
          Tap to pause scrolling
        </motion.p>
      </div>
    </section>
  )
}
