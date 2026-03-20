"use client"

import { useEffect, useState, memo } from "react"

/**
 * FireBackground — Performance Optimized
 * 
 * Replaces 25 framer-motion animated elements with pure CSS animations.
 * Renders 12 embers on desktop, 6 on mobile, 0 on low-end devices.
 * Uses will-change: transform, opacity for GPU compositing.
 */

interface FireEmber {
  id: number
  left: number
  delay: number
  duration: number
  sizeClass: string
  xDrift: number
}

function FireBackgroundInner() {
  const [embers, setEmbers] = useState<FireEmber[]>([])

  useEffect(() => {
    // Determine device tier without hook (this is a simple check)
    const isMobile = window.innerWidth < 768
    const cores = navigator.hardwareConcurrency || 4
    const memory = (navigator as any).deviceMemory
    const isLowEnd = cores <= 2 || (memory !== undefined && memory <= 2)

    if (isLowEnd) {
      // No embers on low-end devices — just show static glow
      setEmbers([])
      return
    }

    const count = isMobile ? 6 : 12
    const newEmbers: FireEmber[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 6,
      sizeClass: Math.random() > 0.5 ? 'fire-ember-lg' : 'fire-ember-sm',
      xDrift: (Math.random() - 0.5) * 80,
    }))
    setEmbers(newEmbers)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base warm glow — static, no animation cost */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[600px] bg-[var(--hive-orange)]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-[var(--hive-red)]/10 rounded-full blur-[100px]" />
      
      {/* CSS-animated embers — GPU-accelerated via transform + opacity */}
      {embers.map((el) => (
        <div
          key={el.id}
          className={`absolute ${el.sizeClass} rounded-full gradient-flame`}
          style={{
            left: `${el.left}%`,
            bottom: "-10%",
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            animation: `fire-ember-rise ${el.duration}s ease-in ${el.delay}s infinite`,
            willChange: "transform, opacity",
            ["--x-drift" as any]: `${el.xDrift}px`,
          }}
        />
      ))}
    </div>
  )
}

export const FireBackground = memo(FireBackgroundInner)
