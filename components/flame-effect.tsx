"use client"

import { motion } from "framer-motion"

interface FlameEffectProps {
  className?: string
  size?: "sm" | "md" | "lg"
  intensity?: "low" | "medium" | "high"
}

export function FlameEffect({ className = "", size = "md", intensity = "medium" }: FlameEffectProps) {
  const sizeClasses = {
    sm: "w-8 h-12",
    md: "w-12 h-20",
    lg: "w-20 h-32",
  }
  
  const opacityLevels = {
    low: 0.3,
    medium: 0.5,
    high: 0.7,
  }

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Core flame */}
      <motion.div
        animate={{
          scaleY: [1, 1.1, 0.9, 1.05, 1],
          scaleX: [1, 0.95, 1.05, 0.98, 1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 origin-bottom"
      >
        <svg viewBox="0 0 50 80" className="w-full h-full">
          <defs>
            <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ff3366" stopOpacity={opacityLevels[intensity]} />
              <stop offset="40%" stopColor="#ff6633" stopOpacity={opacityLevels[intensity] * 0.8} />
              <stop offset="80%" stopColor="#ffcc33" stopOpacity={opacityLevels[intensity] * 0.6} />
              <stop offset="100%" stopColor="#fff5cc" stopOpacity={opacityLevels[intensity] * 0.3} />
            </linearGradient>
            <filter id="flameBlur">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>
          <path
            d="M25 0 C35 20 45 35 45 50 C45 65 35 75 25 80 C15 75 5 65 5 50 C5 35 15 20 25 0"
            fill="url(#flameGradient)"
            filter="url(#flameBlur)"
          />
        </svg>
      </motion.div>
      
      {/* Inner flame glow */}
      <motion.div
        animate={{
          scaleY: [0.8, 0.95, 0.75, 0.9, 0.8],
          scaleX: [0.9, 0.8, 0.95, 0.85, 0.9],
          opacity: [0.6, 0.8, 0.5, 0.7, 0.6],
        }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.1,
        }}
        className="absolute inset-[20%] origin-bottom"
      >
        <svg viewBox="0 0 50 80" className="w-full h-full">
          <path
            d="M25 10 C32 25 38 38 38 48 C38 60 32 68 25 72 C18 68 12 60 12 48 C12 38 18 25 25 10"
            fill="#ffaa33"
            opacity="0.4"
          />
        </svg>
      </motion.div>
    </div>
  )
}

// Floating embers that rise from flames
export function Embers({ count = 5, className = "" }: { count?: number; className?: string }) {
  const embers = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: 20 + (i * 60 / count),
    delay: i * 0.3,
    duration: 2 + (i % 3) * 0.5,
  }))

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          initial={{ y: 0, x: 0, opacity: 0, scale: 1 }}
          animate={{
            y: [-20, -120],
            x: [0, (ember.id % 2 === 0 ? 1 : -1) * 30],
            opacity: [0, 1, 0],
            scale: [1, 0.5],
          }}
          transition={{
            duration: ember.duration,
            repeat: Infinity,
            delay: ember.delay,
            ease: "easeOut",
          }}
          className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-gradient-to-t from-primary to-orange-400"
          style={{ left: `${ember.left}%` }}
        />
      ))}
    </div>
  )
}
