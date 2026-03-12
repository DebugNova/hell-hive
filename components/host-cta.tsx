"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Users, DollarSign, Calendar, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const benefits = [
  { icon: Users, text: "Reach thousands of party-goers" },
  { icon: DollarSign, text: "Monetize your events easily" },
  { icon: Calendar, text: "Powerful event management" },
  { icon: Sparkles, text: "Premium host tools & analytics" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
}

export function HostCTA() {
  return (
    <section id="host" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Honeycomb pattern */}
      <div className="absolute inset-0 honeycomb-bg opacity-15" />
      
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-primary/10 blur-[128px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] rounded-full bg-accent/10 blur-[100px]"
        />
      </div>
      
      {/* Flame accents */}
      <div className="absolute bottom-20 left-8 w-5 h-10 gradient-flame rounded-full blur-sm opacity-40 animate-pulse" style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }} />
      <div className="absolute top-20 right-10 w-4 h-8 gradient-flame rounded-full blur-sm opacity-30 animate-pulse" style={{ animationDelay: "0.8s", borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
          {/* Glass card */}
          <div className="glass-strong p-6 sm:p-8 md:p-12 lg:p-16">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Content */}
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6"
                >
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Become a Host
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6"
                >
                  Ready to Throw the{" "}
                  <span className="text-glow text-primary">Ultimate Party?</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 text-pretty"
                >
                  Join thousands of hosts who are creating unforgettable experiences. 
                  Get the tools, exposure, and support you need to host legendary events.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <Button
                    size="lg"
                    className="gradient-primary text-primary-foreground font-semibold text-sm sm:text-base md:text-lg px-6 sm:px-8 py-5 sm:py-6 hover:opacity-90 transition-all hover:scale-[1.02] group shadow-xl shadow-primary/20"
                    asChild
                  >
                    <Link href="/host">
                      Start Hosting
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 border-border/50 hover:bg-secondary/50 hover:border-primary/30 transition-all"
                    asChild
                  >
                    <Link href="#learn">Learn More</Link>
                  </Button>
                </motion.div>
              </div>

              {/* Benefits */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
              >
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.text}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 sm:p-5 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg gradient-primary flex items-center justify-center mb-2 sm:mb-3">
                      <benefit.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <span className="text-sm sm:text-base text-foreground font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Border glow */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-primary/20 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
