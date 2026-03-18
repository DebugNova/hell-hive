"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  href?: string
  // Kept for backward compatibility to prevent type errors from old usage
  asChild?: boolean 
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = "primary", href, asChild, children, ...props }, ref) => {
    // Determine the style logic
    const isPrimary = variant === "primary"
    
    // Core structural and visual classes for the button - removing the tangy colors for a soft, ultra-modern monochrome glass look
    const defaultClasses = `
      group relative inline-flex items-center justify-center overflow-hidden rounded-full
      px-8 py-3.5 font-semibold text-white tracking-wide cursor-pointer
      transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
      hover:scale-[1.04] active:scale-[0.96] hover:-translate-y-1
      ${
        isPrimary 
          ? "bg-white/[0.05] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 hover:border-white/30 hover:bg-white/[0.12] hover:shadow-[0_16px_40px_rgba(255,255,255,0.1)]" 
          : "bg-transparent backdrop-blur-md border border-transparent hover:bg-white/[0.03] hover:border-white/10 shadow-none hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      }
    `
    // Merge user classes using cn string builder paradigm
    const finalClasses = cn(defaultClasses, className)

    // The inner content structure
    const content = (
      <>
        {/* Subtle top edge highlight to mimic physical glass/button */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Inner frosted glass top reflection for 3D depth */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        {/* Soft bottom glow pulse on hover */}
        <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 pointer-events-none" />
        
        {/* Sweeping liquid shine effect across the button on group-hover */}
        <div 
          className="absolute top-0 -left-[150%] h-full w-[150%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-[150%] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none" 
        />
        
        {/* Text and Icon Elements Layer */}
        <span className="relative flex items-center justify-center gap-2 z-10 text-white/80 group-hover:text-white transition-all duration-500">
          {children}
        </span>
      </>
    )

    // If an href is supplied, we return an anchor via Next.js Link
    if (href) {
      return (
        <Link href={href} className={finalClasses} {...(props as any)}>
          {content}
        </Link>
      )
    }

    // Otherwise, we return a standard button
    return (
      <button ref={ref} className={finalClasses} {...props}>
        {content}
      </button>
    )
  }
)
GlassButton.displayName = "GlassButton"

export { GlassButton }
