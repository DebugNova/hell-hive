"use client"

import { motion } from "framer-motion"
import { Flame, Twitter, Instagram, Facebook, Youtube, Mail, Send } from "lucide-react"
import Link from "next/link"

const footerLinks = {
  product: [
    { label: "Discover Events", href: "#discover" },
    { label: "Host a Party", href: "#host" },
    { label: "Pricing", href: "#" },
    { label: "For Business", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
  resources: [
    { label: "Help Center", href: "#" },
    { label: "Host Guide", href: "#" },
    { label: "Community", href: "#" },
    { label: "Safety", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "Youtube" },
]

export function Footer() {
  return (
    <footer className="relative pt-16 sm:pt-24 pb-8 sm:pb-12 border-t border-border">
      {/* Honeycomb pattern */}
      <div className="absolute inset-0 honeycomb-bg opacity-10" />
      
      {/* Background gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[800px] h-[200px] sm:h-[400px] bg-primary/5 rounded-full blur-[128px]" />
      
      {/* Flame accents */}
      <div className="absolute top-20 right-10 w-3 h-6 gradient-flame rounded-full blur-sm opacity-20 animate-pulse" style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter - Mobile first placement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-5 sm:p-6 md:p-8 mb-10 sm:mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
            <div className="mb-4 md:mb-0">
              <h4 className="text-base sm:text-lg font-semibold text-foreground mb-1">Stay in the loop</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">Get the latest events and exclusive offers delivered to your inbox.</p>
            </div>
            <div className="flex gap-2 sm:gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 sm:px-6 py-2.5 sm:py-3 gradient-primary text-primary-foreground font-semibold text-sm rounded-lg hover:opacity-90 transition-all flex items-center gap-2"
              >
                <span className="hidden sm:inline">Subscribe</span>
                <Send className="h-4 w-4 sm:hidden" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 lg:gap-12 mb-10 sm:mb-16">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4 sm:mb-6">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative"
              >
                <Flame className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                <motion.div 
                  className="absolute inset-0 blur-lg bg-primary/50 -z-10"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <span className="text-xl sm:text-2xl font-script tracking-wide group-hover:text-glow transition-all">
                <span className="text-foreground">Hell</span>
                <span className="text-flame">Hive</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-xs">
              The premium event marketplace for discovering and hosting unforgettable experiences.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground text-sm sm:text-base mb-3 sm:mb-4">Product</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground text-sm sm:text-base mb-3 sm:mb-4">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden sm:block">
            <h4 className="font-semibold text-foreground text-sm sm:text-base mb-3 sm:mb-4">Resources</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:block">
            <h4 className="font-semibold text-foreground text-sm sm:text-base mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-border">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © 2026 HellHive. All rights reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-xs sm:text-sm text-muted-foreground text-center">Made with passion for party lovers</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
