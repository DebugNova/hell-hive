"use client"

import { motion } from "framer-motion"
import { Search, Ticket, PartyPopper, ArrowRight } from "lucide-react"
import { FireBackground } from "@/components/ui/fire-background"

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Browse through thousands of curated events happening around you. Filter by category, date, or vibe.",
    color: "primary",
  },
  {
    icon: Ticket,
    title: "Join",
    description: "Reserve your spot instantly. No hassle, no waiting. Just tap and you're in.",
    color: "accent",
  },
  {
    icon: PartyPopper,
    title: "Experience",
    description: "Show up, connect with amazing people, and create memories that last a lifetime.",
    color: "primary",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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
      ease: "easeOut",
    },
  },
}

export function HowItWorks() {
  return (
    <section id="about" className="py-16 sm:py-24 relative overflow-hidden">
      
      <FireBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-[var(--hive-gold)] text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3 drop-shadow-[0_0_8px_rgba(212,160,23,0.8)]"
          >
            How It Works
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 px-4">
            Three Steps to Your <br className="hidden sm:block" />
            <span className="text-[var(--hive-orange)] drop-shadow-[0_0_15px_rgba(255,106,0,0.6)]">Next Adventure</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="relative group"
            >
              {/* Connector line - Desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 sm:top-16 left-full w-full h-0.5 -translate-x-1/2 overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                    className="h-full bg-gradient-to-r from-white/10 via-[var(--hive-orange)]/50 to-white/10 origin-left"
                  />
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + index * 0.2 }}
                  >
                    <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--hive-orange)]/50" />
                  </motion.div>
                </div>
              )}

              {/* Connector line - Mobile */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute -bottom-3 left-1/2 -translate-x-1/2 w-0.5 h-6">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                    className="h-full bg-gradient-to-b from-[var(--hive-orange)]/50 to-white/10 origin-top"
                  />
                </div>
              )}

              {/* Card */}
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[var(--hive-gold)]/40 hover:shadow-[0_0_30px_rgba(212,160,23,0.15)] transition-all duration-500 h-full"
              >
                {/* Step number */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black border border-[var(--hive-orange)]/30 flex items-center justify-center text-xs sm:text-sm font-bold text-[var(--hive-orange)] shadow-[0_0_10px_rgba(255,106,0,0.2)]"
                >
                  0{index + 1}
                </motion.div>

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${
                    step.color === "primary" ? "bg-gradient-to-br from-[var(--hive-gold)]/20 to-[var(--hive-orange)]/20 border-[var(--hive-orange)]/30" : "bg-gradient-to-br from-[var(--hive-violet)]/20 to-[var(--hive-red)]/20 border-[var(--hive-red)]/30"
                  } border flex items-center justify-center mb-5 sm:mb-6 shadow-lg ${
                    step.color === "primary" ? "shadow-[0_0_15px_rgba(212,160,23,0.2)]" : "shadow-[0_0_15px_rgba(255,42,42,0.2)]"
                  }`}
                >
                  <step.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-[var(--hive-gold)] group-hover:drop-shadow-[0_0_10px_rgba(212,160,23,0.6)] transition-all">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
