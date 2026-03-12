"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${featured ? "h-80 md:h-full" : "h-48"}`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs font-medium text-foreground"
        >
          {category}
        </motion.div>
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className={`relative p-5 ${featured ? "md:absolute md:bottom-0 md:left-0 md:right-0 md:p-8" : ""}`}>
        <h3 className={`font-bold text-foreground mb-3 group-hover:text-primary transition-colors ${
          featured ? "text-2xl md:text-3xl" : "text-lg"
        }`}>
          {title}
        </h3>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-primary" />
            <span>{attendees} attending</span>
          </div>
        </div>

        <Button
          variant="ghost"
          className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent group/btn"
        >
          View Event
          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  )
}
