"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Users, DollarSign, Calendar } from "lucide-react"
import Link from "next/link"

const benefits = [
  { icon: Users, text: "Reach thousands of party-goers" },
  { icon: DollarSign, text: "Monetize your events easily" },
  { icon: Calendar, text: "Powerful event management" },
  { icon: Sparkles, text: "Premium host tools & analytics" },
]

export function HostCTA() {
  return (
    <section id="host" className="py-24 relative overflow-hidden">
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
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[128px]"
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
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Glass card */}
          <div className="glass-strong p-8 md:p-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
                >
                  <Sparkles className="h-4 w-4" />
                  Become a Host
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl font-bold text-foreground mb-6"
                >
                  Ready to Throw the{" "}
                  <span className="text-glow text-primary">Ultimate Party?</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-muted-foreground mb-8 text-pretty"
                >
                  Join thousands of hosts who are creating unforgettable experiences. 
                  Get the tools, exposure, and support you need to host legendary events.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    size="lg"
                    className="gradient-primary text-primary-foreground font-semibold text-lg px-8 py-6 hover:opacity-90 transition-all hover:scale-105 border-glow group"
                    asChild
                  >
                    <Link href="/host">
                      Start Hosting
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.text}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-5 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-3">
                      <benefit.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-foreground font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Border glow */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-primary/20 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
