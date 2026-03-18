"use client"

import { motion } from "framer-motion"
import { GlassButton } from "@/components/ui/glass-button"
import { ArrowRight, Sparkles, Users, DollarSign, Calendar, CheckCircle2 } from "lucide-react"
import { FireBackground } from "@/components/ui/fire-background"
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
      ease: "easeOut" as any,
    },
  },
}

export function HostCTA() {
  return (
    <section id="host" className="py-16 sm:py-24 relative overflow-hidden">
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-black pointer-events-none" />
      <FireBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] overflow-hidden">
          {/* Glass card */}
          <div className="bg-[#0a0a0e]/60 backdrop-blur-md border border-white/5 p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center relative z-10">
              {/* Content */}
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/40 backdrop-blur-md border border-[var(--hive-orange)]/30 text-[var(--hive-orange)] shadow-[0_0_10px_rgba(255,106,0,0.2)] text-xs sm:text-sm font-medium mb-4 sm:mb-6"
                >
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[var(--hive-gold)]" />
                  Become a Host
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6"
                >
                  Ready to Throw the{" "}
                  <span className="text-[var(--hive-orange)] drop-shadow-[0_0_15px_rgba(255,106,0,0.6)]">Ultimate Party?</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg text-white/60 mb-6 sm:mb-8 text-pretty"
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
                  <GlassButton
                    variant="primary"
                    className="text-sm sm:text-base md:text-lg !px-8 !py-4 group"
                    href="/start-hosting"
                  >
                    Start Hosting
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </GlassButton>
                  <GlassButton
                    variant="secondary"
                    className="text-sm sm:text-base !px-8 !py-4"
                    href="/learn-more"
                  >
                    Learn More
                  </GlassButton>
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
                    className="p-4 sm:p-5 rounded-xl bg-white/[0.02] backdrop-blur-md border border-white/10 hover:border-[var(--hive-orange)]/40 hover:shadow-[0_0_20px_rgba(255,106,0,0.15)] transition-all"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-black border border-[var(--hive-orange)]/30 flex items-center justify-center mb-2 sm:mb-3 shadow-[0_0_15px_rgba(255,106,0,0.2)]">
                      <benefit.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <span className="text-sm sm:text-base text-white font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Border glow / no extra ring to match other cards */}
          <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
