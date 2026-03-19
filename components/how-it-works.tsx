"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Search, Ticket, PartyPopper } from "lucide-react"
import { FireBackground } from "@/components/ui/fire-background"

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Find the vibe. Browse curated events and secure your spot on the guestlist.",
    color: "from-[var(--hive-gold)] to-[var(--hive-orange)]",
  },
  {
    icon: Ticket,
    title: "Book",
    description: "Secure your access instantly. No waiting. Just one tap and you're in.",
    color: "from-[var(--hive-orange)] to-[var(--hive-red)]",
  },
  {
    icon: PartyPopper,
    title: "Party",
    description: "Show up, skip the line, and experience nightlife exactly how it should be.",
    color: "from-[var(--hive-red)] to-[var(--hive-violet)]",
  },
]

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  // The glowing line grows as we scroll down
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="about" className="py-16 sm:py-20 relative overflow-hidden bg-black">
      {/* Background Flames */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0 mix-blend-screen">
        <FireBackground />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-left mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block text-[var(--hive-gold)] text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-3 drop-shadow-[0_0_8px_rgba(212,160,23,0.8)]"
            >
              The Journey
            </motion.span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]">
              How It <br className="hidden sm:block md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--hive-orange)] to-[var(--hive-gold)] drop-shadow-[0_0_15px_rgba(255,106,0,0.4)] ml-2 md:ml-0">
                Unfolds
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative mx-auto md:ml-4">
          {/* Background Track */}
          <div className="absolute left-[19px] md:left-[23px] top-4 bottom-[-20px] w-[2px] bg-white/10" />
          
          {/* Animated Glowing Line */}
          <motion.div 
            className="absolute left-[19px] md:left-[23px] top-4 w-[2px] bg-gradient-to-b from-[var(--hive-gold)] via-[var(--hive-orange)] to-[var(--hive-red)] shadow-[0_0_10px_rgba(255,106,0,0.8)] origin-top z-10 rounded-full"
            style={{ height: lineHeight }}
          />

          {/* Steps */}
          <div className="flex flex-col gap-12 md:gap-16 relative z-20">
            {steps.map((step, index) => (
              <StepItem key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StepItem({ step, index }: { step: typeof steps[0], index: number }) {
  const numberText = `0${index + 1}`
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-start gap-6 md:gap-10 group"
    >
      {/* Number Silhouette Background (Awwwards style) */}
      <div 
        className="absolute -top-6 -right-2 md:-top-10 md:-right-6 text-[6rem] md:text-[10rem] font-black text-transparent select-none z-0 tracking-tighter transition-all duration-700 opacity-20 group-hover:opacity-40 group-hover:scale-105 pointer-events-none"
        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
      >
        {numberText}
      </div>

      {/* Floating Dot/Icon on the timeline */}
      <div className="relative z-20 flex flex-col items-center shrink-0 mt-1 md:mt-2">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-black border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.4)] group-hover:border-transparent group-hover:bg-gradient-to-br ${step.color} transition-all duration-500 z-10 backdrop-blur-md`}
        >
          <step.icon className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all" />
        </motion.div>
        
        {/* Ambient Glow behind the icon */}
        <div className={`absolute inset-0 bg-gradient-to-br ${step.color} blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none`} />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-1 md:pt-2 max-w-lg">
        <motion.h3 
          className="text-2xl md:text-3xl font-extrabold text-white mb-2 md:mb-3 tracking-tight drop-shadow-md group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-300"
        >
          {step.title}
        </motion.h3>
        <p className="text-base md:text-lg text-white/50 font-medium leading-relaxed group-hover:text-white/80 transition-colors duration-500">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}
