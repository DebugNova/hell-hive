"use client"

import { motion } from "framer-motion"
import { GlassButton } from "@/components/ui/glass-button"
import { ArrowRight, Sparkles, Users, DollarSign, Calendar } from "lucide-react"
import { FireBackground } from "@/components/ui/fire-background"

const benefits = [
  { icon: Users, text: "Reach thousands of party-goers" },
  { icon: DollarSign, text: "Monetize your events easily" },
  { icon: Calendar, text: "Powerful event management" },
  { icon: Sparkles, text: "Premium host tools & analytics" },
]

export function HostCTA() {
  return (
    <section id="host" className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-black pointer-events-none" />
      <FireBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] overflow-hidden">
          {/* Glass card */}
          <div className="bg-[#0a0a0e]/60 backdrop-blur-sm border border-white/5 p-5 sm:p-6 md:p-8 lg:p-10 shadow-2xl rounded-[2rem]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            
            {/* Single whileInView for entire container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center relative z-10"
            >
              {/* Content */}
              <div>
                <span
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/40 border border-[var(--hive-orange)]/30 text-[var(--hive-orange)] shadow-[0_0_10px_rgba(255,106,0,0.2)] text-xs sm:text-sm font-medium mb-4 sm:mb-6"
                >
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[var(--hive-gold)]" />
                  Become a Host
                </span>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight drop-shadow-md">
                  Ready to Throw the{" "}
                  <span className="text-[var(--hive-orange)] drop-shadow-[0_0_15px_rgba(255,106,0,0.6)]">Ultimate Party?</span>
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-white/60 mb-6 sm:mb-8 text-pretty">
                  Join thousands of hosts who are creating unforgettable experiences. 
                  Get the tools, exposure, and support you need to host legendary events.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
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
                </div>
              </div>

              {/* Benefits — CSS transitions instead of framer-motion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.text}
                    className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[var(--hive-orange)]/40 hover:shadow-[0_0_20px_rgba(255,106,0,0.15)] hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-black border border-[var(--hive-orange)]/30 flex items-center justify-center mb-2 sm:mb-3 shadow-[0_0_15px_rgba(255,106,0,0.2)]">
                      <benefit.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <span className="text-sm sm:text-base text-white font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
