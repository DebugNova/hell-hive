"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Flame, ArrowRight, Heart, User } from "lucide-react"
import { GlassButton } from "@/components/ui/glass-button"
import Link from "next/link"

const navLinks = [
  { href: "#discover", label: "Discover Events" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#about", label: "About" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "glass-strong py-3 shadow-lg shadow-background/50" 
            : "py-4 sm:py-5 bg-gradient-to-b from-background/80 to-transparent"
        }`}
        style={{ willChange: "backdrop-filter" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2 group"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <div className="relative">
                <Flame className="h-7 w-7 sm:h-8 sm:w-8 text-white drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                {/* CSS animated glow instead of framer-motion infinite loop */}
                <div 
                  className="absolute inset-0 blur-[15px] bg-[#8B5CF6]/50 -z-10 rounded-full animate-pulse"
                />
              </div>
              <span className="text-xl sm:text-2xl font-sans font-black tracking-[0.1em] text-white uppercase drop-shadow-[0_0_10px_rgba(139,92,246,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300">
                HELLHIVE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 lg:px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors relative group rounded-lg hover:bg-secondary/50"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full group-hover:w-3/4 transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center justify-end gap-1 sm:gap-4">
              {/* Action Icons */}
              <div className="flex items-center gap-1">
                <Link href="/favorites" className="p-2 text-white/70 hover:text-[var(--hive-orange)] hover:bg-white/10 rounded-full transition-all duration-300">
                  <Heart className="h-5 w-5" />
                </Link>
                <Link href="/profile" className="p-2 text-white/70 hover:text-[var(--hive-orange)] hover:bg-white/10 rounded-full transition-all duration-300">
                  <User className="h-5 w-5" />
                </Link>
              </div>

              {/* CTA Button */}
              <div className="hidden md:block">
                <GlassButton
                  variant="primary"
                  className="px-6 py-2 text-sm !h-auto hover:scale-105 active:scale-95 transition-transform"
                  href="#host"
                >
                  Host a Party
                </GlassButton>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-foreground rounded-lg hover:bg-secondary/50 transition-colors active:scale-90"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm glass-strong md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border/50">
                  <Link 
                    href="/" 
                    className="flex items-center gap-2" 
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      if (window.location.pathname === "/") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                  >
                    <Flame className="h-7 w-7 text-white drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                    <span className="text-xl font-sans font-black tracking-[0.1em] text-white uppercase drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                      HELLHIVE
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-foreground rounded-lg hover:bg-secondary/50 active:scale-90"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                {/* Nav Links */}
                <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between text-lg text-foreground/80 hover:text-foreground transition-colors py-4 px-4 rounded-xl hover:bg-secondary/50 group"
                    >
                      {link.label}
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
                
                {/* CTA */}
                <div className="p-4 border-t border-border/50">
                  <GlassButton
                    variant="primary"
                    className="w-full text-base !py-3"
                    href="#host"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Host a Party
                  </GlassButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
