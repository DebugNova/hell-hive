"use client"

import { motion } from "framer-motion"
import { Search, Ticket, PartyPopper, ArrowRight } from "lucide-react"

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
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
}

export function HowItWorks() {
  return (
    <section id="about" className="py-16 sm:py-24 relative overflow-hidden">
      
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-accent/5 rounded-full blur-[128px]" />
      
      {/* Flame accents on both sides */}
      <div className="absolute top-1/3 left-4 w-3 h-6 gradient-flame rounded-full blur-sm opacity-25 animate-pulse" style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }} />
      <div className="absolute top-1/2 right-6 w-4 h-8 gradient-flame rounded-full blur-sm opacity-30 animate-pulse" style={{ animationDelay: "0.7s", borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }} />
      
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
            className="inline-block text-primary text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3"
          >
            How It Works
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 px-4">
            Three Steps to Your <br className="hidden sm:block" />
            <span className="text-glow-accent text-accent">Next Adventure</span>
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
                    className="h-full bg-gradient-to-r from-border via-primary/30 to-border origin-left"
                  />
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + index * 0.2 }}
                  >
                    <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
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
                    className="h-full bg-gradient-to-b from-primary/30 to-border origin-top"
                  />
                </div>
              )}

              {/* Card */}
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 h-full"
              >
                {/* Step number */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center text-xs sm:text-sm font-bold text-muted-foreground"
                >
                  0{index + 1}
                </motion.div>

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${
                    step.color === "primary" ? "gradient-primary" : "gradient-accent"
                  } flex items-center justify-center mb-5 sm:mb-6 shadow-lg ${
                    step.color === "primary" ? "shadow-primary/20" : "shadow-accent/20"
                  }`}
                >
                  <step.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
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
