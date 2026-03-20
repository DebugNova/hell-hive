"use client"

import { Flame, Twitter, Instagram, Facebook, Youtube, Mail, Send } from "lucide-react"
import Link from "next/link"

const footerLinks = {
  product: [
    { label: "Discover Events", href: "/discover" },
    { label: "Host a Party", href: "/host-a-party" },
    { label: "Pricing", href: "/pricing" },
    { label: "For Business", href: "/for-business" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Press Kit", href: "/press-kit" },
  ],
  resources: [
    { label: "Help Center", href: "/help-center" },
    { label: "Host Guide", href: "/host-guide" },
    { label: "Community", href: "/community" },
    { label: "Safety", href: "/safety" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
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
      
      {/* Removed FireBackground — footer is below viewport, rarely seen during initial load */}
      {/* Static subtle glow instead */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[600px] bg-[var(--hive-orange)]/3 rounded-full blur-[120px]" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 mb-10 sm:mb-16 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
            <div className="mb-4 md:mb-0">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-1">Stay in the loop</h4>
              <p className="text-xs sm:text-sm text-white/60">Get the latest events and exclusive offers delivered to your inbox.</p>
            </div>
            <div className="flex gap-2 sm:gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                />
              </div>
              <button
                className="w-[42px] sm:w-auto h-[42px] sm:h-auto px-0 sm:px-6 flex items-center justify-center bg-gradient-to-r from-[var(--hive-red)] to-[var(--hive-orange)] shadow-[0_0_15px_rgba(255,42,42,0.4)] text-white font-semibold text-sm rounded-lg hover:opacity-90 transition-all shrink-0 active:scale-95"
              >
                <span className="hidden sm:inline">Subscribe</span>
                <Send className="h-[18px] w-[18px] sm:h-4 sm:w-4 sm:hidden sm:mr-[-4px]" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 lg:gap-12 mb-10 sm:mb-16">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 md:col-span-2 flex flex-col items-center text-center sm:block sm:text-left">
            <Link href="/" className="flex items-center justify-center sm:justify-start gap-2 group mb-4 sm:mb-6">
              <div className="relative">
                <Flame className="h-7 w-7 sm:h-8 sm:w-8 text-[var(--hive-orange)]" />
                <div className="absolute inset-0 blur-lg bg-[var(--hive-orange)]/50 -z-10 animate-pulse" />
              </div>
              <span className="text-xl sm:text-2xl font-sans font-black tracking-[0.1em] text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300">
                <span className="text-white">HELL</span>
                <span className="text-white">HIVE</span>
              </span>
            </Link>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-xs mx-auto sm:mx-0">
              The premium event marketplace for discovering and hosting unforgettable experiences.
            </p>
            
            {/* Social Links — plain links with CSS transitions */}
            <div className="flex justify-center sm:justify-start gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:scale-110 hover:-translate-y-0.5 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center text-center sm:block sm:text-left">
            <h4 className="font-semibold text-white text-sm sm:text-base mb-3 sm:mb-4">Product</h4>
            <ul className="flex flex-col items-center sm:block space-y-2 sm:space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center text-center sm:block sm:text-left">
            <h4 className="font-semibold text-white text-sm sm:text-base mb-3 sm:mb-4">Company</h4>
            <ul className="flex flex-col items-center sm:block space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden sm:block">
            <h4 className="font-semibold text-white text-sm sm:text-base mb-3 sm:mb-4">Resources</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:block">
            <h4 className="font-semibold text-white text-sm sm:text-base mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-border mt-2 sm:mt-0">
          <p className="text-xs sm:text-sm text-white/60 text-center sm:text-left">
            © 2026 HellHive. All rights reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-xs sm:text-sm text-white/60 text-center">Made with passion for party lovers</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
