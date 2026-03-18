"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Users, ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface EventCardProps {
  title: string
  date: string
  location: string
  attendees: number
  image: string
  category: string
  featured?: boolean
  index: number
}

export function EventCard({
  title,
  date,
  location,
  attendees,
  image,
  category,
  featured = false,
  index
}: EventCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const router = useRouter()
  const eventSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  return (
    <motion.div
      onClick={() => router.push(`/events/${eventSlug}`)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      whileHover={{ y: -8 }}
      className={`group cursor-pointer relative overflow-hidden rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 transition-all duration-500 hover:border-[var(--hive-orange)]/40 hover:shadow-[0_0_30px_rgba(255,106,0,0.2)] ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${featured ? "h-64 sm:h-80 md:h-full" : "h-48 sm:h-52"}`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className="absolute top-3 sm:top-4 left-3 sm:left-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-medium text-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        >
          {category}
        </motion.div>

        {/* Like button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation()
            setIsLiked(!isLiked)
          }}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors"
        >
          <Heart 
            className={`h-4 w-4 transition-colors ${
              isLiked ? "fill-[var(--hive-red)] text-[var(--hive-red)] drop-shadow-[0_0_8px_rgba(255,42,42,0.6)]" : "text-white/70"
            }`} 
          />
        </motion.button>
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[var(--hive-orange)]/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className={`relative p-4 sm:p-5 ${featured ? "md:absolute md:bottom-0 md:left-0 md:right-0 md:p-6 lg:p-8" : ""}`}>
        <h3 className={`font-bold text-white mb-2 sm:mb-3 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,106,0,0.6)] transition-all duration-300 line-clamp-2 ${
          featured ? "text-xl sm:text-2xl md:text-3xl" : "text-base sm:text-lg"
        }`}>
          {title}
        </h3>
        
        <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-white/60 mb-3 sm:mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/50" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/50" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/50" />
            <span>{attendees.toLocaleString()} attending</span>
          </div>
        </div>

        <Button
          variant="ghost"
          className="p-0 h-auto text-white/70 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,106,0,0.8)] hover:bg-transparent group/btn text-sm transition-all duration-300"
        >
          View Event
          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  )
}
