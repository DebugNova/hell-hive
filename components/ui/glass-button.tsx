"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  asChild?: boolean
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = "primary", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        ref={ref}
        className={`
          relative px-10 py-4 rounded-full font-bold text-lg tracking-wide
          backdrop-blur-2xl border border-white/20
          transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
          hover:border-white/40 hover:bg-white/10
          hover:shadow-[0_8px_32px_rgba(0,0,0,0.5),_0_0_20px_rgba(255,255,255,0.1)]
          hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]
          group overflow-hidden flex items-center justify-center cursor-pointer
          ${
            variant === "primary"
              ? "bg-white/[0.05]"
              : "bg-transparent"
          }
          ${className || ""}
        `}
        style={{
          boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.5), inset 0 -1px 0 0 rgba(255,255,255,0.1), inset 0 0 20px rgba(255,255,255,0.05), 0 8px 20px rgba(0,0,0,0.4)",
          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
        }}
        {...props}
      >
        {/* We wrap children to apply the inner styles properly if it's a Slot, 
            but if asChild is true, Slot replaces the <Comp> and its children.
            To keep these absolute elements functioning, we can't cleanly use asChild 
            with complex internal sibling divs without breaking semantic HTML 
            or Link routing. Wait, if it's a Slot, the standard way is:
            <Slot><Link>...</Link></Slot>, but the complex DOM elements will be lost 
            if we put them alongside children inside Slot.
            Actually, let's keep it simple: if asChild is used, the developer has 
            to place the visual children inside. Better yet, we just render a regular 
            button, and if users need routing they wrap it in <Link> normally or pass onClick.
            Let's revert to a standard render to preserve the complex glass UI layers. */}
        {asChild ? (
          <Slot>
            {React.isValidElement<{className?: string}>(children) ? React.cloneElement(children, {
              className: `relative z-10 text-white/95 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] transition-all duration-300 ${children.props.className || ''}` 
            }) : children}
          </Slot>
        ) : (
          <>
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
            
            <span className="relative z-10 text-white/95 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] transition-all duration-300 flex items-center justify-center w-full h-full">
              {children}
            </span>
          </>
        )}
      </Comp>
    )
  }
)
GlassButton.displayName = "GlassButton"

export { GlassButton }
