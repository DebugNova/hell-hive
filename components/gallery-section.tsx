"use client"

import { motion } from "framer-motion"
import { FireBackground } from "@/components/ui/fire-background"
import Image from "next/image"

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    alt: "Concert crowd",
    size: "large",
  },
  {
    src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80",
    alt: "DJ performance",
    size: "small",
  },
  {
    src: "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=80",
    alt: "Party lights",
    size: "small",
  },
  {
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    alt: "Festival crowd",
    size: "medium",
  },
  {
    src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    alt: "Night event",
    size: "small",
  },
  {
    src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
    alt: "Party celebration",
    size: "medium",
  },
  {
    src: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&q=80",
    alt: "Club scene",
    size: "small",
  },
  {
    src: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&q=80",
    alt: "Live music",
    size: "large",
  },
]

export function GallerySection() {
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
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-white/50 text-sm font-semibold uppercase tracking-widest">Gallery</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mt-3 mb-6 tracking-tight drop-shadow-md">
            Moments That Matter
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto text-pretty">
            Relive the energy, the connections, and the unforgettable nights that define HellHive experiences.
          </p>
        </motion.div>

        {/* Masonry Gallery Wrapper */}
        <div className="mt-6 sm:mt-10 p-4 sm:p-6 md:p-8 lg:p-10 rounded-[2rem] bg-[#0a0a0e]/60 border border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 relative z-10 w-full">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`relative mb-4 overflow-hidden rounded-xl group cursor-pointer break-inside-avoid ${
                  image.size === "large" ? "aspect-[4/5]" : image.size === "medium" ? "aspect-[4/3]" : "aspect-square"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Hover content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500"
                >
                  <span className="text-sm text-white font-medium">{image.alt}</span>
                </motion.div>
  
                {/* Glow effect on hover */}
                <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-[var(--hive-red)]/40 group-hover:shadow-[0_0_20px_rgba(255,42,42,0.3)] transition-all duration-500 rounded-xl pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
