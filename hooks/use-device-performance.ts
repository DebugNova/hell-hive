"use client"

import { useState, useEffect } from "react"

export type PerformanceTier = "high" | "medium" | "low"

/**
 * Detects device performance capability and returns a tier.
 * Uses hardware concurrency, device memory, screen size, and connection type.
 */
export function useDevicePerformance(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>("high")

  useEffect(() => {
    let score = 0

    // CPU cores
    const cores = navigator.hardwareConcurrency || 4
    if (cores <= 2) score += 3
    else if (cores <= 4) score += 1

    // Device memory (Chrome only)
    const memory = (navigator as any).deviceMemory
    if (memory !== undefined) {
      if (memory <= 2) score += 3
      else if (memory <= 4) score += 1
    }

    // Screen size as a proxy for mobile
    const isSmallScreen = window.innerWidth < 768
    if (isSmallScreen) score += 2

    // Connection type
    const connection = (navigator as any).connection
    if (connection) {
      const effectiveType = connection.effectiveType
      if (effectiveType === "slow-2g" || effectiveType === "2g") score += 3
      else if (effectiveType === "3g") score += 1
    }

    // Determine tier
    if (score >= 5) setTier("low")
    else if (score >= 2) setTier("medium")
    else setTier("high")
  }, [])

  return tier
}

/**
 * Simple check without hooks — for use in non-component contexts.
 * Returns true if device is likely low-end.
 */
export function isLowEndDevice(): boolean {
  if (typeof window === "undefined") return false
  const cores = navigator.hardwareConcurrency || 4
  const memory = (navigator as any).deviceMemory
  const isSmall = window.innerWidth < 768
  return cores <= 2 || (memory !== undefined && memory <= 2) || (isSmall && cores <= 4)
}

/**
 * Returns true if we're on a mobile-sized screen.
 */
export function isMobileScreen(): boolean {
  if (typeof window === "undefined") return false
  return window.innerWidth < 768
}
