"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Calendar, Search, Sparkles, Users, Star, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"
import Image from "next/image"
import { Embers } from "./flame-effect"

const stats = [
  { value: "50K+", label: "Active Users", icon: Users },
  { value: "10K+", label: "Events Hosted", icon: Star },
  { value: "500+", label: "Cities", icon: TrendingUp },
]

const categories = [
  "All Events",
  "House Parties",
  "Music",
  "Networking",
  "Gaming",
  "Wellness",
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
}

// Honeycomb SVG path for clipping
function HoneycombMask() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      <defs>
        <clipPath id="honeycombClip" clipPathUnits="objectBoundingBox">
          <path d="M0.5,0.05 L0.85,0.2 L0.85,0.55 L0.5,0.7 L0.15,0.55 L0.15,0.2 Z" />
        </clipPath>
        <linearGradient id="honeycombGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff3366" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#ff6633" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffcc33" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState("All Events")
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    layoutEffect: false
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <section
      ref={containerRef}
      style={{ position: 'relative' }}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Dark background base */}
      <div className="absolute inset-0 bg-background z-0" />
      
      {/* Honeycomb pattern overlay */}
      <div className="absolute inset-0 honeycomb-bg opacity-30 z-[1]" />
      
      {/* Central Honeycomb with image */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 flex items-center justify-center z-[2]"
      >
        {/* Large honeycomb shape with image inside */}
        <div className="relative w-[80vw] h-[80vh] max-w-[900px] max-h-[700px]" style={{ position: 'relative' }}>
          {/* Honeycomb border glow */}
          <svg 
            className="absolute inset-0 w-full h-full" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="borderGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff3366" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ff6633" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ffcc33" stopOpacity="0.4" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Honeycomb outline */}
            <polygon 
              points="50,5 90,25 90,75 50,95 10,75 10,25" 
              fill="none" 
              stroke="url(#borderGradient)" 
              strokeWidth="0.5"
              filter="url(#glow)"
            />
          </svg>
          
          {/* Image clipped to honeycomb */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: "polygon(50% 5%, 90% 25%, 90% 75%, 50% 95%, 10% 75%, 10% 25%)",
            }}
          >
            <motion.div style={{ y: backgroundY }} className="w-full h-full">
              <Image
                src="/images/hero-bg.jpg"
                alt="Event atmosphere"
                fill
                className="object-cover object-center"
                priority
                quality={75}
              />
              {/* Inner gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/80" />
            </motion.div>
          </div>
          
          {/* Flame embers rising from bottom of honeycomb */}
          <Embers count={8} className="z-10" />
        </div>
      </motion.div>
      
      {/* Radial dark vignette from edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_var(--background)_70%)] z-[3]" />
      
      {/* Additional corner darkening */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-[3]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background z-[3]" />
      
      {/* Decorative flame accents on sides */}
      <div className="absolute left-4 sm:left-8 top-1/3 z-[4]">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 0.95, 1.05, 1],
            opacity: [0.3, 0.5, 0.3, 0.4, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 sm:w-8 sm:h-14 gradient-flame rounded-full blur-sm"
          style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }}
        />
      </div>
      <div className="absolute right-4 sm:right-8 top-1/2 z-[4]">
        <motion.div
          animate={{ 
            scale: [1, 0.95, 1.1, 1, 0.98],
            opacity: [0.25, 0.4, 0.3, 0.45, 0.25]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="w-5 h-8 sm:w-6 sm:h-12 gradient-flame rounded-full blur-sm"
          style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }}
        />
      </div>

      {/* Content */}
      <motion.div 
        style={{ y, opacity }} 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-24"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Eyebrow Badge */}
          <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-foreground/90 border border-primary/20"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Event Discovery Platform</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            </motion.span>
          </motion.div>

          {/* Brand Name - Script Font */}
          <motion.div
            variants={itemVariants}
            className="mb-4 sm:mb-6"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-script tracking-wide">
              <span className="text-foreground drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">Hell</span>
              <span className="text-flame drop-shadow-[0_0_40px_rgba(255,51,102,0.5)]">Hive</span>
            </h1>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.2] mb-6 sm:mb-8"
          >
            <span className="text-foreground/90">Find Your Next </span>
            <span className="text-primary text-glow">Unforgettable</span>
            <span className="text-foreground/90"> Experience</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4"
          >
            Discover exclusive events, connect with like-minded people, and create memories that last a lifetime.
          </motion.p>

          {/* Search Bar - Desktop */}
          <motion.div
            variants={itemVariants}
            className="hidden sm:block glass-strong rounded-2xl p-2 mb-8 max-w-3xl mx-auto border border-primary/10"
          >
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-3.5 rounded-xl bg-secondary/50 group focus-within:bg-secondary/80 focus-within:ring-2 focus-within:ring-primary/30 transition-all">
                <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search events, venues, or hosts..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
                />
              </div>
              <div className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors cursor-pointer">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm text-foreground/80">New York</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors cursor-pointer">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm text-foreground/80">This Week</span>
              </div>
              <Button
                size="lg"
                className="gradient-primary text-primary-foreground font-semibold px-8 py-6 hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-primary/25"
              >
                Search
              </Button>
            </div>
          </motion.div>

          {/* Search Bar - Mobile */}
          <motion.div
            variants={itemVariants}
            className="sm:hidden glass-strong rounded-2xl p-3 mb-6 mx-2 border border-primary/10"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-secondary/50">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-xs text-foreground/80">New York</span>
                </div>
                <div className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-secondary/50">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-xs text-foreground/80">This Week</span>
                </div>
              </div>
              <Button
                size="lg"
                className="w-full gradient-primary text-primary-foreground font-semibold py-5 hover:opacity-90 transition-all"
              >
                Search Events
              </Button>
            </div>
          </motion.div>

          {/* Category Pills */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12 px-2"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "gradient-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "glass text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
                style={{ transitionDelay: `${index * 30}ms` }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto gradient-primary text-primary-foreground font-semibold text-base px-8 py-6 hover:opacity-90 transition-all hover:scale-[1.02] group shadow-xl shadow-primary/20"
              asChild
            >
              <Link href="#discover">
                Explore Events
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base px-8 py-6 border-primary/30 bg-background/20 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/50 transition-all hover:scale-[1.02]"
              asChild
            >
              <Link href="#host">Host Your Event</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center p-3 sm:p-4 rounded-2xl glass hover:border-primary/30 transition-all cursor-default"
              >
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary mx-auto mb-2" />
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full gradient-flame"
            />
          </div>
        </motion.div>
      </motion.div>
      
      <HoneycombMask />
    </section>
  )
}
