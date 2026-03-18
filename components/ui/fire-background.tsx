"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function FireBackground() {
  const [mounted, setMounted] = useState(false)
  const [elements, setElements] = useState<{
    id: number;
    left: number;
    delay: number;
    duration: number;
    size: string;
    xOffset: number;
  }[]>([])
  
  useEffect(() => {
    setMounted(true)
    const newElements = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 7,
      size: Math.random() > 0.5 ? 'w-2 h-6 md:w-3 md:h-8' : 'w-1 h-3 md:w-2 md:h-5',
      xOffset: (Math.random() - 0.5) * 150
    }))
    setElements(newElements)
  }, [])
  
  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[600px] bg-[var(--hive-orange)]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-[var(--hive-red)]/10 rounded-full blur-[100px]" />
      
      {/* Floating embers */}
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className={`absolute ${el.size} rounded-full gradient-flame blur-[1px]`}
          style={{
            left: `${el.left}%`,
            bottom: "-10%",
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%"
          }}
          animate={{
            y: [0, -1200],
            x: [0, el.xOffset],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.2],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  )
}
