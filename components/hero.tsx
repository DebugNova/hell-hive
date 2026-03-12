"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Embers } from "./flame-effect"
import { HoneycombCanvas } from "./honeycomb-canvas"

export function Hero() {
  const [isHovering, setIsHovering] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return

    cancelAnimationFrame(rafRef.current)

    rafRef.current = requestAnimationFrame(() => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePos({ x, y })
      // Also update CSS vars for the radial glow layers
      containerRef.current.style.setProperty('--mouse-x', `${x}px`)
      containerRef.current.style.setProperty('--mouse-y', `${y}px`)
    })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [handleMouseMove])

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#050505] group"
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      } as React.CSSProperties}
    >
      {/* ===== LAYER 1: Base dark background ===== */}
      <div className="absolute inset-0 z-0 bg-[#050505] pointer-events-none" />

      {/* ===== LAYER 2: Canvas-based isometric honeycomb grid (cursor-reactive) ===== */}
      <HoneycombCanvas
        mouseX={mousePos.x}
        mouseY={mousePos.y}
        isHovering={isHovering}
      />

      {/* ===== LAYER 3: Warm amber radial glow following cursor ===== */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none mix-blend-screen"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255, 180, 0, 0.2) 0%, rgba(200, 130, 0, 0.08) 40%, transparent 100%)`,
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.7s ease-in-out',
        }}
      />

      {/* ===== LAYER 3b: Purple/magenta accent glow ===== */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none mix-blend-screen"
        style={{
          background: `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(160, 80, 220, 0.12) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)`,
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.7s ease-in-out',
        }}
      />

      {/* ===== LAYER 4: Dark vignette to keep focus central ===== */}
      <div className="absolute inset-0 z-[3] pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_10%,_#050505_80%)]" />

      {/* ===== LAYER 5: Flame embers ===== */}
      <div className="absolute inset-0 z-[4] pointer-events-none">
        <Embers count={80} className="w-full h-full opacity-80" />
      </div>

      {/* ===== LAYER 6: Hero content ===== */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-5xl mx-auto pt-20">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="relative mb-6"
        >
          <h1 
            className="text-[4rem] sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-sans font-black tracking-[0.1em] text-white leading-none uppercase"
            style={{ textShadow: "0 0 20px rgba(139,92,246,0.8), 0 0 40px rgba(139,92,246,0.4)" }}
          >
            HELLHIVE
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl font-light tracking-[0.05em] text-[#d4ccc0] mb-12 sm:mb-16"
        >
          Enter The Hive. Burn The Night.
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.5 }}
           className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto bg-[#1A1025]/80 hover:bg-[#2A1845]/90 border border-[#8B5CF6]/40 text-white font-medium text-sm sm:text-base px-10 py-7 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(139,92,246,0.15)] rounded-2xl backdrop-blur-sm"
            asChild
          >
            <Link href="#discover">Discover Parties</Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto bg-[#1A1025]/80 hover:bg-[#2A1845]/90 border border-[#8B5CF6]/40 text-white font-medium text-sm sm:text-base px-10 py-7 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(139,92,246,0.15)] rounded-2xl backdrop-blur-sm"
            asChild
          >
            <Link href="#host">Host a Party</Link>
          </Button>
        </motion.div>
      </div>
      
    </section>
  )
}
