"use client"

import { useEffect, useRef, useCallback } from "react"

// ============================================================
// TYPE: HexCell — represents one cell in the honeycomb grid
// ============================================================
interface HexCell {
  x: number        // column index
  y: number        // row index
  centerX: number  // pixel X center of the hexagon
  centerY: number  // pixel Y center of the hexagon
  glow: number     // current glow intensity (0–1)
  targetGlow: number // target glow intensity (smoothly interpolated)
}

// ============================================================
// COMPONENT: InteractiveHoneycomb
// A full-screen <canvas> that draws a hexagonal grid.
// Hexagons near the mouse cursor glow golden, with the glow
// spreading to neighboring cells.
// ============================================================
function InteractiveHoneycomb() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hexCellsRef = useRef<HexCell[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animationRef = useRef<number>(0)

  // Hexagon geometry constants
  const HEX_SIZE = 40                          // radius of each hexagon
  const HEX_WIDTH = HEX_SIZE * 2               // = 80px
  const HEX_HEIGHT = Math.sqrt(3) * HEX_SIZE   // ≈ 69.28px

  // --------------------------------------------------------
  // drawHexagon: renders a single hexagon at (x, y) with
  // a given glow intensity. Uses canvas shadowBlur for the
  // golden glow effect.
  // --------------------------------------------------------
  const drawHexagon = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, size: number, glow: number) => {
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6
      const hx = x + size * Math.cos(angle)
      const hy = y + size * Math.sin(angle)
      if (i === 0) {
        ctx.moveTo(hx, hy)
      } else {
        ctx.lineTo(hx, hy)
      }
    }
    ctx.closePath()

    // Base subtle stroke
    const baseAlpha = 0.03
    const glowAlpha = glow * 0.6

    if (glow > 0.01) {
      // Glow fill — translucent golden fill
      ctx.fillStyle = `rgba(212, 160, 23, ${glow * 0.15})`
      ctx.fill()

      // Glowing stroke — golden border with canvas shadow glow
      ctx.strokeStyle = `rgba(212, 160, 23, ${baseAlpha + glowAlpha})`
      ctx.lineWidth = 1 + glow * 2
      ctx.shadowColor = "#D4A017"
      ctx.shadowBlur = glow * 20
      ctx.stroke()
      ctx.shadowBlur = 0
    } else {
      // Nearly invisible base stroke when no glow
      ctx.strokeStyle = `rgba(212, 160, 23, ${baseAlpha})`
      ctx.lineWidth = 0.5
      ctx.stroke()
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // --------------------------------------------------------
    // resizeCanvas: sets canvas to full viewport and rebuilds
    // the hex grid. Hex rows are staggered (offset on odd rows).
    // --------------------------------------------------------
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      canvas.width = parent ? parent.clientWidth : window.innerWidth
      canvas.height = parent ? parent.clientHeight : window.innerHeight

      // Rebuild hex grid
      hexCellsRef.current = []
      const cols = Math.ceil(canvas.width / (HEX_WIDTH * 0.75)) + 2
      const rows = Math.ceil(canvas.height / HEX_HEIGHT) + 2

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const offsetX = row % 2 === 0 ? 0 : HEX_WIDTH * 0.375
          const centerX = col * HEX_WIDTH * 0.75 + offsetX
          const centerY = row * HEX_HEIGHT * 0.5

          hexCellsRef.current.push({
            x: col,
            y: row,
            centerX,
            centerY,
            glow: 0,
            targetGlow: 0,
          })
        }
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return
      const rect = canvasRef.current.getBoundingClientRect()
      mouseRef.current = { 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    // --------------------------------------------------------
    // ANIMATION LOOP
    // Every frame:
    //   1. Calculate distance from each cell to the mouse
    //   2. Set targetGlow based on proximity (150px radius)
    //   3. Smoothly interpolate glow → targetGlow (lerp factor: 0.08)
    //   4. Spread glow to neighboring cells (within 1.2× HEX_WIDTH)
    //   5. Draw each hexagon
    // --------------------------------------------------------
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { x: mouseX, y: mouseY } = mouseRef.current
      const GLOW_RADIUS = 150  // pixels — area of influence around cursor

      hexCellsRef.current.forEach((cell) => {
        // Calculate distance from mouse
        const dx = cell.centerX - mouseX
        const dy = cell.centerY - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Set target glow based on mouse proximity
        if (distance < GLOW_RADIUS) {
          cell.targetGlow = Math.max(cell.targetGlow, 1 - distance / GLOW_RADIUS)
        } else {
          cell.targetGlow = Math.max(0, cell.targetGlow - 0.02)
        }

        // Smoothly interpolate glow (lerp)
        cell.glow += (cell.targetGlow - cell.glow) * 0.08

        // Spread glow to neighbors
        if (cell.glow > 0.3) {
          hexCellsRef.current.forEach((neighbor) => {
            const ndx = neighbor.centerX - cell.centerX
            const ndy = neighbor.centerY - cell.centerY
            const nDist = Math.sqrt(ndx * ndx + ndy * ndy)
            if (nDist > 0 && nDist < HEX_WIDTH * 1.2) {
              neighbor.targetGlow = Math.max(neighbor.targetGlow, cell.glow * 0.4)
            }
          })
        }

        // Draw the hexagon
        drawHexagon(ctx, cell.centerX, cell.centerY, HEX_SIZE, cell.glow)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [drawHexagon, HEX_HEIGHT, HEX_WIDTH])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}



// ============================================================
// COMPONENT: EmberParticles
// Full-screen <canvas> that renders floating fire-like ember
// particles rising from the bottom of the screen.
// ============================================================
function EmberParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    interface Ember {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number
      flickerSpeed: number
      flickerPhase: number
      life: number
      maxLife: number
    }

    const embers: Ember[] = []

    // Ember colors — warm fire tones
    const emberColors = ["#FF6A00", "#FF4500", "#D4A017", "#FF2A2A", "#FFA500"]

    const createEmber = (): Ember => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: -(Math.random() * 1.2 + 0.4), // Moving upward
      color: emberColors[Math.floor(Math.random() * emberColors.length)],
      opacity: Math.random() * 0.6 + 0.3,
      flickerSpeed: Math.random() * 0.1 + 0.05,
      flickerPhase: Math.random() * Math.PI * 2,
      life: 0,
      maxLife: Math.random() * 400 + 200,
    })

    // Initialize 60 embers spread across the screen
    for (let i = 0; i < 60; i++) {
      const ember = createEmber()
      ember.y = Math.random() * canvas.height  // random starting Y
      ember.life = Math.random() * ember.maxLife // random starting life
      embers.push(ember)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      embers.forEach((ember, index) => {
        // Movement: drift horizontally with sine wave + move upward
        ember.x += ember.speedX + Math.sin(ember.life * 0.02) * 0.3
        ember.y += ember.speedY
        ember.life++

        // Flicker effect using sine wave
        const flicker = Math.sin(ember.life * ember.flickerSpeed + ember.flickerPhase) * 0.3 + 0.7
        const currentOpacity = ember.opacity * flicker * (1 - ember.life / ember.maxLife)

        // Reset ember when it dies or goes off screen
        if (ember.life >= ember.maxLife || ember.y < -20) {
          Object.assign(embers[index], createEmber())
        }

        // Draw ember with radial gradient glow
        ctx.save()
        ctx.globalAlpha = currentOpacity

        // Outer glow (4× the ember size)
        const gradient = ctx.createRadialGradient(
          ember.x, ember.y, 0,
          ember.x, ember.y, ember.size * 4
        )
        gradient.addColorStop(0, ember.color)
        gradient.addColorStop(0.5, `${ember.color}40`)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(ember.x, ember.y, ember.size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Core (solid color, small circle)
        ctx.fillStyle = ember.color
        ctx.beginPath()
        ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

// ============================================================
// COMPONENT: GlassButton
// A frosted-glass styled button with multiple layered effects:
//   - Backdrop blur + subtle white fill
//   - Top edge highlight (1px gradient)
//   - Inner light reflection
//   - Hover light sweep
//   - Violet or orange tint based on variant
// ============================================================
function GlassButton({
  children,
  variant = "primary",
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary"
}) {
  return (
    <button
      className={`
        relative px-10 py-4 rounded-full font-bold text-lg tracking-wide
        backdrop-blur-2xl border border-white/20
        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        hover:border-white/40 hover:bg-white/10
        hover:shadow-[0_8px_32px_rgba(0,0,0,0.5),_0_0_20px_rgba(255,255,255,0.1)]
        hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]
        group overflow-hidden
        ${
          variant === "primary"
            ? "bg-white/[0.05]"
            : "bg-transparent"
        }
      `}
      style={{
        boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.5), inset 0 -1px 0 0 rgba(255,255,255,0.1), inset 0 0 20px rgba(255,255,255,0.05), 0 8px 20px rgba(0,0,0,0.4)",
        textShadow: "0 2px 4px rgba(0,0,0,0.5)",
      }}
    >
      {/* Top subtle highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
      
      {/* Inner frosted glass top reflection */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent opacity-50 pointer-events-none" />
      
      {/* Shine sweep effect on hover */}
      <div 
        className="absolute top-0 -left-[150%] h-full w-[100%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:left-[150%] transition-all duration-[1s] ease-in-out pointer-events-none" 
      />
      
      {/* Subtle color tint */}
      <div 
        className={`absolute inset-0 opacity-40 pointer-events-none transition-opacity duration-500 group-hover:opacity-60 ${
          variant === "primary" 
            ? "bg-gradient-to-br from-[var(--hive-violet)]/40 via-transparent to-[var(--hive-gold)]/20" 
            : "bg-gradient-to-br from-[var(--hive-orange)]/40 via-transparent to-[var(--hive-red)]/20"
        }`}
      />
      
      <span className="relative z-10 text-white/95 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] transition-all duration-300">
        {children}
      </span>
    </button>
  )
}

// ============================================================
// MAIN EXPORT: HellHiveHero
// The complete hero section with all visual layers stacked
// using absolute positioning.
// ============================================================
export default function HellHiveHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[var(--hive-midnight)] flex items-center justify-center">
      {/* LAYER 1: Base dark background */}
      <div className="absolute inset-0 bg-black" />

      {/* LAYER 2: Subtle radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_80%)] pointer-events-none" />

      {/* LAYER 3: Interactive honeycomb pattern (canvas) */}
      <InteractiveHoneycomb />

      {/* LAYER 4: Floating ember particles (canvas) */}
      <EmberParticles />

      {/* LAYER 5: Content (highest z-index) */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        {/* Main title */}
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

        {/* Tagline */}
        <p
          className="text-xl sm:text-2xl md:text-3xl text-white/80 font-light tracking-widest mb-12 text-balance"
          style={{
            textShadow: "0 0 20px rgba(212, 160, 23, 0.3)",
          }}
        >
          Enter The Hive. Burn The Night.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <GlassButton variant="primary">Discover Parties</GlassButton>
          <GlassButton variant="secondary">Host a Party</GlassButton>
        </div>
      </div>

      {/* LAYER 8: Bottom flame gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--hive-orange)] to-transparent opacity-50" />
    </section>
  )
}
