"use client"

import { motion, useAnimationControls } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Event Enthusiast",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "HellHive completely changed how I discover events. Found the most amazing rooftop party last weekend — met incredible people and danced until sunrise!",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Party Host",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    content: "As a host, HellHive gives me the perfect platform to reach people who actually want to be at my events. My parties went from 20 guests to 200!",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Music Lover",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content: "The underground music scene on HellHive is unmatched. I've discovered artists and venues I never knew existed. This app is a game-changer.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Tech Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    content: "The networking events on HellHive are next level. Met my co-founder at a startup mixer I found through the app. Can't recommend it enough!",
    rating: 5,
  },
  {
    name: "Luna Williams",
    role: "Social Butterfly",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    content: "Every weekend is an adventure now. HellHive curates experiences perfectly matched to my vibe. It's like having a best friend who always knows the best spots.",
    rating: 5,
  },
  {
    name: "Alex Thompson",
    role: "Club Promoter",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "The quality of attendees we get through HellHive is incredible. People who come actually want to party and have a great time. Total game changer.",
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
      className="relative p-6 rounded-2xl glass border border-border hover:border-primary/30 transition-all duration-500 min-w-[350px] max-w-[400px] flex-shrink-0"
    >
      {/* Quote icon */}
      <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
      
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
        ))}
      </div>

      {/* Content */}
      <p className="text-foreground/90 leading-relaxed mb-6">
        {`"${testimonial.content}"`}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div className="font-semibold text-foreground">{testimonial.name}</div>
          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimationControls()

  useEffect(() => {
    const animate = async () => {
      if (!isHovered) {
        await controls.start({
          x: [0, -1400],
          transition: {
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }
        })
      } else {
        controls.stop()
      }
    }
    animate()
  }, [isHovered, controls])

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 px-4"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Loved by Thousands
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Join a community of event lovers who have transformed their social lives with HellHive.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <motion.div
            animate={controls}
            className="flex gap-6 px-8"
          >
            {/* Double the testimonials for seamless loop */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.name}-${index}`}
                testimonial={testimonial}
                index={index % testimonials.length}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
