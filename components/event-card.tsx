"use client"

import { Calendar, MapPin, Users, ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

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
  const eventSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  return (
    <Link
      href={`/events/${eventSlug}`}
      className={`group cursor-pointer relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/10 transition-all duration-300 hover:border-[var(--hive-orange)]/40 hover:shadow-[0_0_30px_rgba(255,106,0,0.2)] hover:-translate-y-2 ${
        featured ? "md:col-span-2" : ""
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden w-full ${featured ? "h-40 sm:h-48 md:h-[18rem]" : "h-32 sm:h-40"}`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        {/* Category badge */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-xs font-medium text-white shadow-[0_0_10px_rgba(0,0,0,0.5)]">
          {category}
        </div>

        {/* Like button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsLiked(!isLiked)
          }}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors active:scale-90"
        >
          <Heart 
            className={`h-4 w-4 transition-colors ${
              isLiked ? "fill-[var(--hive-red)] text-[var(--hive-red)]" : "text-white/70"
            }`} 
          />
        </button>
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[var(--hive-orange)]/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className={`relative p-3 sm:p-4 ${featured ? "md:absolute md:bottom-0 md:left-0 md:right-0 md:p-5 lg:p-6" : ""}`}>
        <h3 className={`font-bold text-white mb-1.5 sm:mb-2 group-hover:text-white transition-all duration-300 line-clamp-2 ${
          featured ? "text-base sm:text-lg md:text-xl" : "text-sm sm:text-base"
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

        <span className="inline-flex items-center text-sm text-white/70 group-hover:text-white transition-all duration-300">
          View Event
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  )
}
