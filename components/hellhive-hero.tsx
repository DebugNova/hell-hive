"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import Link from "next/link"
import { useDevicePerformance, isMobileScreen } from "@/hooks/use-device-performance"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

// ============================================================
// TYPE: HexCell — represents one cell in the honeycomb grid
// ============================================================
interface HexCell {
  x: number
  y: number
  centerX: number
  centerY: number
  glow: number
  targetGlow: number
}

// ============================================================
// COMPONENT: InteractiveHoneycomb (Performance Optimized)
// ============================================================
function InteractiveHoneycomb() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hexCellsRef = useRef<HexCell[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animationRef = useRef<number>(0)
  const frameCount = useRef(0)
  const tier = useDevicePerformance()
  const prefersReduced = useReducedMotion()

  // Larger hexagons = fewer cells = better performance
  const HEX_SIZE = tier === "high" ? 50 : 70
  const HEX_WIDTH = HEX_SIZE * 2
  const HEX_HEIGHT = Math.sqrt(3) * HEX_SIZE

  useEffect(() => {
    // Skip on mobile or low-end devices
    if (tier === "low" || prefersReduced || isMobileScreen()) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      canvas.width = parent ? parent.clientWidth : window.innerWidth
      canvas.height = parent ? parent.clientHeight : window.innerHeight

      hexCellsRef.current = []
      const cols = Math.ceil(canvas.width / (HEX_WIDTH * 0.75)) + 2
      const rows = Math.ceil(canvas.height / HEX_HEIGHT) + 2

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const offsetX = row % 2 === 0 ? 0 : HEX_WIDTH * 0.375
          hexCellsRef.current.push({
            x: col,
            y: row,
            centerX: col * HEX_WIDTH * 0.75 + offsetX,
            centerY: row * HEX_HEIGHT * 0.5,
            glow: 0,
            targetGlow: 0,
          })
        }
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas, { passive: true })

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return
      const rect = canvasRef.current.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    const drawHexagon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, glow: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6
        const hx = x + size * Math.cos(angle)
        const hy = y + size * Math.sin(angle)
        if (i === 0) ctx.moveTo(hx, hy)
        else ctx.lineTo(hx, hy)
      }
      ctx.closePath()

      const baseAlpha = 0.03
      if (glow > 0.01) {
        ctx.fillStyle = `rgba(212, 160, 23, ${glow * 0.12})`
        ctx.fill()
        ctx.strokeStyle = `rgba(212, 160, 23, ${baseAlpha + glow * 0.5})`
        ctx.lineWidth = 1 + glow * 1.5
        // No shadowBlur — too expensive
        ctx.stroke()
      } else {
        ctx.strokeStyle = `rgba(212, 160, 23, ${baseAlpha})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }

    const GLOW_RADIUS = 150
    const targetFps = tier === "high" ? 60 : 30
    const frameSkip = 60 / targetFps

    const animate = () => {
      frameCount.current++
      // Frame skipping for lower-tier devices
      if (frameCount.current % frameSkip !== 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mouseX, y: mouseY } = mouseRef.current

      hexCellsRef.current.forEach((cell) => {
        const dx = cell.centerX - mouseX
        const dy = cell.centerY - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < GLOW_RADIUS) {
          cell.targetGlow = Math.max(cell.targetGlow, 1 - distance / GLOW_RADIUS)
        } else {
          cell.targetGlow = Math.max(0, cell.targetGlow - 0.03)
        }

        cell.glow += (cell.targetGlow - cell.glow) * 0.1

        // Simplified neighbor spreading — only for high-glow cells, limited to nearby
        if (cell.glow > 0.4 && tier === "high") {
          const spreadRadius = HEX_WIDTH * 1.2
          for (let j = 0; j < hexCellsRef.current.length; j++) {
            const neighbor = hexCellsRef.current[j]
            const ndx = neighbor.centerX - cell.centerX
            const ndy = neighbor.centerY - cell.centerY
            // Quick rejection
            if (Math.abs(ndx) > spreadRadius || Math.abs(ndy) > spreadRadius) continue
            const nDist = Math.sqrt(ndx * ndx + ndy * ndy)
            if (nDist > 0 && nDist < spreadRadius) {
              neighbor.targetGlow = Math.max(neighbor.targetGlow, cell.glow * 0.3)
            }
          }
        }

        drawHexagon(ctx, cell.centerX, cell.centerY, HEX_SIZE, cell.glow)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [tier, prefersReduced, HEX_HEIGHT, HEX_WIDTH, HEX_SIZE])

  // Don't render canvas on mobile or low-end
  if (tier === "low" || prefersReduced || isMobileScreen()) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

// ============================================================
// COMPONENT: EmberParticles (Performance Optimized)
// ============================================================
function EmberParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const frameCount = useRef(0)
  const tier = useDevicePerformance()
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (tier === "low" || prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas, { passive: true })

    interface Ember {
      x: number; y: number; size: number
      speedX: number; speedY: number
      color: string; opacity: number
      life: number; maxLife: number
    }

    const emberColors = ["#FF6A00", "#FF4500", "#D4A017", "#FF2A2A", "#FFA500"]
    
    // Reduced particle count based on device tier
    const particleCount = isMobileScreen() ? 10 : (tier === "high" ? 30 : 15)

    const createEmber = (): Ember => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: -(Math.random() * 1 + 0.3),
      color: emberColors[Math.floor(Math.random() * emberColors.length)],
      opacity: Math.random() * 0.5 + 0.2,
      life: 0,
      maxLife: Math.random() * 300 + 150,
    })

    const embers: Ember[] = []
    for (let i = 0; i < particleCount; i++) {
      const ember = createEmber()
      ember.y = Math.random() * canvas.height
      ember.life = Math.random() * ember.maxLife
      embers.push(ember)
    }

    const animate = () => {
      frameCount.current++
      // 30fps for medium, 60fps for high
      if (tier === "medium" && frameCount.current % 2 !== 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      embers.forEach((ember, index) => {
        ember.x += ember.speedX + Math.sin(ember.life * 0.02) * 0.2
        ember.y += ember.speedY
        ember.life++

        const currentOpacity = ember.opacity * (1 - ember.life / ember.maxLife)

        if (ember.life >= ember.maxLife || ember.y < -20) {
          Object.assign(embers[index], createEmber())
          return
        }

        // Simple circle instead of expensive radial gradient
        ctx.globalAlpha = currentOpacity
        ctx.fillStyle = ember.color
        ctx.beginPath()
        ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [tier, prefersReduced])

  if (tier === "low" || prefersReduced) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

// ============================================================
// COMPONENT: HeroAnimatedButton
// ============================================================
function HeroAnimatedButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <div className="group relative inline-flex w-full sm:w-auto">
      {/* Diffuse glow on hover */}
      <div className="absolute -inset-1 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />
      
      {/* Animated border wrapper */}
      <div className="relative inline-flex w-full sm:w-auto overflow-hidden rounded-full p-[1px] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {/* Spinning conic gradient — uses CSS animation (GPU-accelerated transform) */}
        <span 
          className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] opacity-50 group-hover:opacity-90 transition-opacity duration-500"
          style={{ 
            background: "conic-gradient(from 0deg, transparent 70%, rgba(255,255,255,0.8) 100%)",
            willChange: "transform",
          }}
        />
        
        {/* Inner Button Content */}
        <Link
          href={href}
          className="relative inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 rounded-full bg-[#0a0a0e]/95 backdrop-blur-sm text-white font-semibold tracking-wide transition-all duration-500 hover:bg-white/[0.05] hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-30 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />
          
          <span className="relative z-10 text-white/90 group-hover:text-white transition-colors duration-500 flex items-center justify-center gap-2">
            {children}
          </span>
        </Link>
      </div>
    </div>
  )
}

// ============================================================
// MAIN EXPORT: HellHiveHero
// ============================================================
export default function HellHiveHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[var(--hive-midnight)] flex items-center justify-center">
      {/* LAYER 1: Base dark background */}
      <div className="absolute inset-0 bg-black" />

      {/* LAYER 2: Subtle radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_80%)] pointer-events-none" />

      {/* LAYER 3: Interactive honeycomb (skipped on mobile/low-end) */}
      <InteractiveHoneycomb />

      {/* LAYER 4: Ember particles (reduced on mobile, skipped on low-end) */}
      <EmberParticles />

      {/* LAYER 5: Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        <h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.2em] text-white mb-6"
          style={{
            textShadow: "0 0 30px rgba(255, 255, 255, 0.1)",
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "0.15em",
          }}
        >
          HELLHIVE
        </h1>

        <p
          className="text-xl sm:text-2xl md:text-3xl text-white/80 font-light tracking-widest mb-12 text-balance"
          style={{
            textShadow: "0 0 20px rgba(212, 160, 23, 0.3)",
          }}
        >
          Enter The Hive. Burn The Night.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 relative z-20">
          <HeroAnimatedButton href="#discover">Discover Parties</HeroAnimatedButton>
          <HeroAnimatedButton href="#host">Host a Party</HeroAnimatedButton>
        </div>
      </div>

      {/* Bottom flame gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--hive-orange)] to-transparent opacity-50" />
    </section>
  )
}
