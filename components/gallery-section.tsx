"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { FireBackground } from "@/components/ui/fire-background"
import Image from "next/image"

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=75",
    alt: "Concert crowd",
    label: "Concert Vibes",
    size: "large",
  },
  {
    src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=75",
    alt: "DJ performance",
    label: "DJ Nights",
    size: "small",
  },
  {
    src: "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=75",
    alt: "Party lights",
    label: "Neon Glow",
    size: "small",
  },
  {
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=75",
    alt: "Festival crowd",
    label: "Festival Energy",
    size: "medium",
  },
  {
    src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=75",
    alt: "Night event",
    label: "Night Out",
    size: "small",
  },
  {
    src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=75",
    alt: "Party celebration",
    label: "Celebrations",
    size: "medium",
  },
  {
    src: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&q=75",
    alt: "Club scene",
    label: "Club Scene",
    size: "small",
  },
  {
    src: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&q=75",
    alt: "Live music",
    label: "Live Music",
    size: "large",
  },
]

export function GallerySection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section id="gallery" className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-black pointer-events-none" />
      <FireBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-white/50 text-sm font-semibold uppercase tracking-widest">Gallery</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mt-3 mb-6 tracking-tight drop-shadow-md">
            Moments That Matter
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto text-pretty">
            Relive the energy, the connections, and the unforgettable nights that define HellHive experiences.
          </p>
        </motion.div>

        {/* ===== MOBILE: Horizontal Scroll Carousel ===== */}
        <div className="block md:hidden">
          <div className="mt-4 p-3 rounded-[1.5rem] bg-[#0a0a0e]/60 border border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide relative z-10"
              style={{
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {galleryImages.map((image) => (
                <div
                  key={image.src}
                  className="relative flex-shrink-0 w-[70vw] max-w-[280px] aspect-[3/4] overflow-hidden rounded-2xl group cursor-pointer snap-start"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="70vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-base font-bold text-white drop-shadow-lg">
                      {image.label}
                    </span>
                  </div>

                  <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-white/30 text-xs mt-4 italic">
            Swipe to explore →
          </p>
        </div>

        {/* ===== DESKTOP: Masonry Gallery ===== */}
        <div className="hidden md:block mt-6 sm:mt-10 p-4 sm:p-6 md:p-8 lg:p-10 rounded-[2rem] bg-[#0a0a0e]/60 border border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="md:columns-2 lg:columns-3 gap-4 relative z-10 w-full">
            {galleryImages.map((image) => (
              <div
                key={image.src}
                className={`relative mb-4 overflow-hidden rounded-xl group cursor-pointer break-inside-avoid transition-transform duration-300 hover:scale-[1.02] ${
                  image.size === "large" ? "aspect-[4/5]" : image.size === "medium" ? "aspect-[4/3]" : "aspect-square"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-sm text-white font-medium">{image.alt}</span>
                </div>
  
                {/* Glow effect on hover */}
                <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-[var(--hive-red)]/40 transition-all duration-300 rounded-xl pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
