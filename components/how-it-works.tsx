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

export function HowItWorks() {
  return (
    <section id="about" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[128px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Three Steps to Your <br className="hidden sm:block" />
            <span className="text-glow-accent text-accent">Next Adventure</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 -translate-x-1/2">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                    className="h-full bg-gradient-to-r from-border via-primary/30 to-border origin-left"
                  />
                  <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                </div>
              )}

              {/* Card */}
              <motion.div
                whileHover={{ y: -8 }}
                className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 h-full"
              >
                {/* Step number */}
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-muted-foreground">
                  0{index + 1}
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`w-16 h-16 rounded-2xl ${
                    step.color === "primary" ? "gradient-primary" : "gradient-accent"
                  } flex items-center justify-center mb-6 shadow-lg ${
                    step.color === "primary" ? "shadow-primary/20" : "shadow-accent/20"
                  }`}
                >
                  <step.icon className="h-8 w-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
