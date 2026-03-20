"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "orange"
  href?: string
  // Kept for backward compatibility to prevent type errors from old usage
  asChild?: boolean 
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = "primary", href, asChild, children, ...props }, ref) => {
    // Determine the style logic
    const isPrimary = variant === "primary"
    const isOrange = variant === "orange"
    
    const defaultClasses = `
      group relative inline-flex items-center justify-center overflow-hidden rounded-full
      px-8 py-3.5 font-semibold tracking-wide cursor-pointer
      transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
      hover:scale-[1.04] active:scale-[0.96] hover:-translate-y-1
      ${
        isOrange 
          ? "bg-gradient-to-r from-[var(--hive-orange)] via-[#ff3a00] to-[var(--hive-orange)] bg-[length:200%_auto] text-white shadow-[0_0_20px_rgba(255,106,0,0.5)] border border-white/20 hover:border-white/40 hover:shadow-[0_0_40px_rgba(255,106,0,0.8)]"
          : isPrimary
          ? "bg-white/[0.05] text-white backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 hover:border-white/30 hover:bg-white/[0.12] hover:shadow-[0_16px_40px_rgba(255,255,255,0.1)]" 
          : "bg-transparent text-white backdrop-blur-md border border-transparent hover:bg-white/[0.03] hover:border-white/10 shadow-none hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      }
    `
    // Merge user classes using cn string builder paradigm
    const finalClasses = cn(defaultClasses, className)

    // The inner content structure
    const content = (
      <>
        {isOrange && (
          <style>{`
            @keyframes pan-bg {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes glow-breathe {
              0%, 100% { box-shadow: 0 0 20px rgba(255,106,0,0.4); }
              50% { box-shadow: 0 0 40px rgba(255,106,0,0.8); }
            }
            .animate-fancy-orange {
              animation: pan-bg 3s ease infinite, glow-breathe 2.5s ease-in-out infinite;
            }
          `}</style>
        )}
        
        {/* Subtle top edge highlight to mimic physical glass/button */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Inner frosted glass top reflection for 3D depth */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        {/* Soft bottom glow pulse on hover */}
        <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 pointer-events-none" />
        
        {/* Sweeping liquid shine effect across the button on group-hover */}
        <div 
          className="absolute top-0 -left-[150%] h-full w-[150%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[150%] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none" 
        />
        
        {/* Text and Icon Elements Layer */}
        <span className="relative flex items-center justify-center gap-2 z-10 text-white/90 group-hover:text-white transition-all duration-500">
          {children}
        </span>
      </>
    )

    // Apply the fancy animation conditionally
    const combinedClasses = isOrange ? cn(finalClasses, "animate-fancy-orange") : finalClasses

    // If an href is supplied, we return an anchor via Next.js Link
    if (href) {
      return (
        <Link href={href} className={combinedClasses} {...(props as any)}>
          {content}
        </Link>
      )
    }

    // Otherwise, we return a standard button
    return (
      <button ref={ref} className={combinedClasses} {...props}>
        {content}
      </button>
    )
  }
)
GlassButton.displayName = "GlassButton"

export { GlassButton }
