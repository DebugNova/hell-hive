"use client"

import { useEffect, useRef } from "react"

interface HoneycombCanvasProps {
  mouseX: number
  mouseY: number
  isHovering: boolean
}

export function HoneycombCanvas({ mouseX, mouseY, isHovering }: HoneycombCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const currentOpacity = useRef(0)
  const mousePosRef = useRef({ x: mouseX, y: mouseY })
  const isHoveringRef = useRef(isHovering)

  // Update refs without re-running the effect
  mousePosRef.current = { x: mouseX, y: mouseY }
  isHoveringRef.current = isHovering

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let running = true

    const drawIsometricGrid = (w: number, h: number, mx: number, my: number, opacity: number) => {
      ctx.save()
      ctx.clearRect(0, 0, w, h)
      if (opacity <= 0.01) { ctx.restore(); return }

      // Isometric cube dimensions
      const cubeW = 60
      const cubeH = 35
      const cubeDepth = 34

      // Glow radius
      const glowRadius = 400
      const outerRadius = 600

      const startCol = -2
      const endCol = Math.ceil(w / cubeW) + 2
      const startRow = -2
      const endRow = Math.ceil(h / cubeH) + 4

      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          const offsetX = (((row % 2) + 2) % 2 !== 0) ? cubeW / 2 : 0
          const cx = col * cubeW + offsetX
          const cy = row * cubeH

          const cubeCenterX = cx
          const cubeCenterY = cy + cubeDepth / 2
          const dx = cubeCenterX - mx
          const dy = cubeCenterY - my
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist > outerRadius) continue

          // Intensity falloff
          let intensity: number
          if (dist < glowRadius) {
            intensity = 1 - (dist / glowRadius) * 0.65
          } else {
            intensity = Math.max(0, 1 - (dist / outerRadius)) * 0.35
          }
          intensity *= opacity

          if (intensity < 0.02) continue

          const topY = cy
          const leftX = cx - cubeW / 2
          const rightX = cx + cubeW / 2

          const baseAlpha = intensity * 0.75
          const glowAlpha = intensity * 0.35

          // Glow layer (thicker, softer)
          ctx.strokeStyle = `rgba(220, 165, 30, ${glowAlpha})`
          ctx.lineWidth = 3
          ctx.lineJoin = 'round'

          // Top face glow
          ctx.beginPath()
          ctx.moveTo(cx, topY)
          ctx.lineTo(rightX, topY + cubeH)
          ctx.lineTo(cx, topY + cubeH * 2)
          ctx.lineTo(leftX, topY + cubeH)
          ctx.closePath()
          ctx.stroke()

          // Left face glow
          ctx.beginPath()
          ctx.moveTo(cx, topY + cubeH * 2)
          ctx.lineTo(leftX, topY + cubeH)
          ctx.lineTo(leftX, topY + cubeH + cubeDepth)
          ctx.lineTo(cx, topY + cubeH * 2 + cubeDepth)
          ctx.closePath()
          ctx.stroke()

          // Right face glow
          ctx.beginPath()
          ctx.moveTo(cx, topY + cubeH * 2)
          ctx.lineTo(rightX, topY + cubeH)
          ctx.lineTo(rightX, topY + cubeH + cubeDepth)
          ctx.lineTo(cx, topY + cubeH * 2 + cubeDepth)
          ctx.closePath()
          ctx.stroke()

          // Crisp lines on top
          ctx.lineWidth = 1
          ctx.strokeStyle = `rgba(200, 150, 30, ${baseAlpha})`

          // Top face (diamond)
          ctx.beginPath()
          ctx.moveTo(cx, topY)
          ctx.lineTo(rightX, topY + cubeH)
          ctx.lineTo(cx, topY + cubeH * 2)
          ctx.lineTo(leftX, topY + cubeH)
          ctx.closePath()
          ctx.stroke()

          // Left face
          ctx.beginPath()
          ctx.moveTo(cx, topY + cubeH * 2)
          ctx.lineTo(leftX, topY + cubeH)
          ctx.lineTo(leftX, topY + cubeH + cubeDepth)
          ctx.lineTo(cx, topY + cubeH * 2 + cubeDepth)
          ctx.closePath()
          ctx.stroke()

          // Right face
          ctx.beginPath()
          ctx.moveTo(cx, topY + cubeH * 2)
          ctx.lineTo(rightX, topY + cubeH)
          ctx.lineTo(rightX, topY + cubeH + cubeDepth)
          ctx.lineTo(cx, topY + cubeH * 2 + cubeDepth)
          ctx.closePath()
          ctx.stroke()

          // Vertical center line for depth
          ctx.beginPath()
          ctx.moveTo(cx, topY + cubeH * 2)
          ctx.lineTo(cx, topY + cubeH * 2 + cubeDepth)
          ctx.stroke()

          // Extra hot glow on closest cubes
          if (dist < glowRadius * 0.4 && intensity > 0.3) {
            const hot = (1 - dist / (glowRadius * 0.4)) * intensity * 0.2
            ctx.strokeStyle = `rgba(255, 210, 70, ${hot})`
            ctx.lineWidth = 4

            ctx.beginPath()
            ctx.moveTo(cx, topY)
            ctx.lineTo(rightX, topY + cubeH)
            ctx.lineTo(cx, topY + cubeH * 2)
            ctx.lineTo(leftX, topY + cubeH)
            ctx.closePath()
            ctx.stroke()

            // Left and right faces hot glow
            ctx.lineWidth = 2.5
            ctx.beginPath()
            ctx.moveTo(cx, topY + cubeH * 2)
            ctx.lineTo(leftX, topY + cubeH)
            ctx.lineTo(leftX, topY + cubeH + cubeDepth)
            ctx.lineTo(cx, topY + cubeH * 2 + cubeDepth)
            ctx.closePath()
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(cx, topY + cubeH * 2)
            ctx.lineTo(rightX, topY + cubeH)
            ctx.lineTo(rightX, topY + cubeH + cubeDepth)
            ctx.lineTo(cx, topY + cubeH * 2 + cubeDepth)
            ctx.closePath()
            ctx.stroke()
          }
        }
      }
      ctx.restore()
    }

    const animate = () => {
      if (!running) return

      // Smooth opacity transition
      const targetOpacity = isHoveringRef.current ? 1 : 0
      const diff = targetOpacity - currentOpacity.current
      currentOpacity.current += diff * 0.06

      if (Math.abs(diff) < 0.005) {
        currentOpacity.current = targetOpacity
      }

      // Resize canvas to match display size (handle DPR)
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const displayW = Math.round(rect.width)
      const displayH = Math.round(rect.height)
      const canvasW = displayW * dpr
      const canvasH = displayH * dpr

      if (canvas.width !== canvasW || canvas.height !== canvasH) {
        canvas.width = canvasW
        canvas.height = canvasH
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }

      const { x, y } = mousePosRef.current
      drawIsometricGrid(displayW, displayH, x, y, currentOpacity.current)

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      running = false
      cancelAnimationFrame(animFrameRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Run once — reads from refs

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
