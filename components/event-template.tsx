"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { GlassButton } from "@/components/ui/glass-button"
import { Calendar, MapPin, Users, Flame, Share2, Heart, ArrowLeft, ChevronDown, Ticket } from "lucide-react"
import { BackButton } from "@/components/ui/back-button"
import Image from "next/image"
import Link from "next/link"

export interface EventData {
  title: string
  date: string
  time: string
  location: string
  fullAddress: string
  attendees: number
  price: string
  image: string
  category: string
  description: string
  lineup: string[]
  tags: string[]
  host: string
}

export interface RelatedEvent {
  slug: string
  title: string
  date: string
  price: string
  image: string
  category: string
  location: string
}

interface EventTemplateProps {
  event: EventData
  relatedEvents?: RelatedEvent[]
  children?: React.ReactNode
}


function RelatedEventCard({ event, index }: { event: RelatedEvent; index: number }) {
  return (
    <Link href={`/events/${event.slug}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative flex-shrink-0 w-[280px] sm:w-[300px] rounded-2xl bg-[#111116]/80 border border-white/10 overflow-hidden hover:border-[var(--hive-orange)]/30 transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_40px_rgba(255,106,0,0.1)]"
      >
        <div className="relative h-[180px] overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="300px"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-transparent" />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white/80 uppercase tracking-wider">
            {event.category}
          </div>
        </div>
        <div className="p-5 space-y-3">
          <h3 className="text-base font-bold text-white truncate group-hover:text-[var(--hive-orange)] transition-colors duration-300">
            {event.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-white/50">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-white/30" />
              <span className="font-medium">{event.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-white/30" />
              <span className="font-medium truncate max-w-[100px]">{event.location}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="flex items-center gap-1.5">
              <Ticket className="w-4 h-4 text-[var(--hive-orange)]" />
              <span className="text-sm font-bold text-white">{event.price}</span>
            </div>
            <span className="text-[10px] font-bold text-[var(--hive-orange)] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">View →</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export function EventTemplate({ event, relatedEvents, children }: EventTemplateProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null)

  useEffect(() => {
    let targetDate = new Date(event.date).getTime()
    if (isNaN(targetDate) || targetDate <= Date.now()) {
      targetDate = Date.now() + 14 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000
    }

    const tick = () => {
      const distance = targetDate - Date.now()
      if (distance < 0) return
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [event.date])

  const basePrice = parseFloat(event.price.replace(/[^0-9.]/g, '')) || 0;
  const serviceFee = basePrice * 0.15;
  const totalPrice = basePrice + serviceFee;

  return (
    <main className="relative min-h-screen bg-black text-white pb-24 lg:pb-0">
      <Navbar />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <FireBackground />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 pt-24 pb-20">

        {/* Top Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackButton label="Back to All Events" />

          <div className="relative w-full h-[40vh] md:h-[60vh] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(255,106,0,0.15)] group">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />

            {/* Glowing Fire border on hover */}
            <div className="absolute inset-0 border border-[var(--hive-orange)]/0 group-hover:border-[var(--hive-orange)]/40 rounded-[2rem] transition-colors duration-700 pointer-events-none" />

            {/* Top Left: Live Countdown */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 flex items-center bg-black/60 backdrop-blur-md border border-[var(--hive-orange)]/40 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 flex-shrink-0 shadow-[0_0_20px_rgba(255,106,0,0.15)] pointer-events-none">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--hive-red)] animate-pulse mr-2 sm:mr-2.5 shadow-[0_0_10px_rgba(255,42,42,0.9)]" />
              <div className="text-[var(--hive-orange)] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
                {timeLeft ? (
                  `${String(timeLeft.days).padStart(2, '0')}D : ${String(timeLeft.hours).padStart(2, '0')}H : ${String(timeLeft.minutes).padStart(2, '0')}M : ${String(timeLeft.seconds).padStart(2, '0')}S`
                ) : "00D : 00H : 00M : 00S"}
              </div>
            </div>

            {/* Top Right: Actions */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex items-center gap-2 sm:gap-3 z-20">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-[var(--hive-red)] text-[var(--hive-red)]' : 'text-white'}`} />
              </button>
              <button className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Share2 className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="px-3 py-1 rounded-full bg-[var(--hive-orange)]/20 border border-[var(--hive-orange)]/40 text-[var(--hive-orange)] text-xs font-bold uppercase tracking-wider flex items-center shadow-[0_0_15px_rgba(255,106,0,0.4)]">
                    <Flame className="w-3.5 h-3.5 mr-1" />
                    {event.category}
                  </div>
                  {event.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 text-xs font-medium uppercase">
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-7xl font-sans font-black text-white uppercase tracking-tight mb-4 drop-shadow-[0_0_20px_rgba(255,106,0,0.5)] leading-tight">
                  {event.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-white/80 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[var(--hive-orange)]" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[var(--hive-orange)]" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[var(--hive-orange)]" />
                    {event.attendees.toLocaleString()} attending
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left Column: Details (Customizable Content) */}
            <div className="lg:col-span-2 space-y-12">
              {children}
            </div>

            {/* Right Column: Desktop Sticky Ticket Box */}
            <div className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="rounded-[2rem] bg-[#111116]/80 backdrop-blur-xl border border-white/10 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--hive-red)] to-transparent" />

                  <div className="flex justify-between items-baseline mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl text-white/40 line-through font-semibold">${(basePrice * 1.2).toFixed(2)}</span>
                      <span className="text-3xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">${basePrice.toFixed(2)}</span>
                      <span className="text-sm text-white/50 uppercase tracking-wider font-semibold">/ ticket</span>
                    </div>
                  </div>

                  <div className="border border-white/20 rounded-xl mb-6 overflow-hidden bg-black/40">
                    <div className="flex border-b border-white/20">
                      <div className="p-3 w-1/2 border-r border-white/20 hover:bg-white/5 transition-colors cursor-pointer">
                        <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1">Date</p>
                        <p className="text-sm text-white/90 font-medium truncate">{event.date.split(',')[0]}</p>
                      </div>
                      <div className="p-3 w-1/2 hover:bg-white/5 transition-colors cursor-pointer">
                        <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1">Time</p>
                        <p className="text-sm text-white/90 font-medium truncate">{event.time.split(' - ')[0]}</p>
                      </div>
                    </div>
                    <div className="p-3 w-full relative hover:bg-white/5 transition-colors">
                      <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1">Tickets</p>
                      <select className="w-full bg-transparent text-white/90 text-sm font-medium outline-none appearance-none cursor-pointer pr-8 z-10 relative">
                        <option value="1" className="bg-[#111116]">1 Ticket</option>
                        <option value="2" className="bg-[#111116]">2 Tickets</option>
                        <option value="3" className="bg-[#111116]">3 Tickets</option>
                        <option value="4" className="bg-[#111116]">4 Tickets</option>
                        <option value="5" className="bg-[#111116]">5 Tickets</option>
                      </select>
                      <div className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 pointer-events-none text-white/50">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <GlassButton className="w-full text-lg py-4 mb-4 flex justify-center items-center shadow-[0_0_20px_rgba(255,42,42,0.3)] font-bold transition-transform active:scale-95">
                    Secure Ticket Now
                  </GlassButton>

                  <p className="text-center text-sm text-white/50 mb-6 font-medium">
                    You won't be charged yet
                  </p>

                  <div className="space-y-4 text-sm text-white/70 mb-6 border-b border-white/10 pb-6">
                    <div className="flex justify-between items-center group">
                      <span className="underline decoration-white/30 underline-offset-4 hover:text-white transition-colors cursor-pointer">${basePrice.toFixed(2)} x 1 ticket</span>
                      <span className="font-medium">${basePrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center group">
                      <span className="underline decoration-white/30 underline-offset-4 hover:text-white transition-colors cursor-pointer">Service fee</span>
                      <span className="font-medium">${serviceFee.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-white font-bold text-xl pt-2">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* Related Events Section */}
      {relatedEvents && relatedEvents.length > 0 && (
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[var(--hive-orange)] text-xs font-bold uppercase tracking-widest mb-2">Discover More</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">You Might Also Like</h2>
              </div>
              <Link href="/events" className="hidden sm:flex items-center gap-2 text-sm font-medium text-white/50 hover:text-[var(--hive-orange)] transition-colors">
                View All Events
                <span className="text-lg">→</span>
              </Link>
            </div>

            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 sm:-mx-0 sm:px-0">
              {relatedEvents.map((relatedEvent, idx) => (
                <div key={relatedEvent.slug} className="snap-start">
                  <RelatedEventCard event={relatedEvent} index={idx} />
                </div>
              ))}
            </div>

            <div className="sm:hidden mt-6 text-center">
              <Link href="/events" className="text-sm font-medium text-white/50 hover:text-[var(--hive-orange)] transition-colors">
                View All Events →
              </Link>
            </div>
          </motion.div>
        </section>
      )}

      <Footer />

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#111116]/95 backdrop-blur-xl border-t border-white/10 p-4 pb-6 sm:px-6 flex items-center justify-between shadow-[0_-20px_40px_rgba(0,0,0,0.8)]">
        <div>
          <p className="text-lg font-bold text-white mb-0.5 flex flex-wrap items-center">
            <span className="line-through text-white/40 text-[13px] font-normal mr-2">${(basePrice * 1.2).toFixed(2)}</span>
            ${basePrice.toFixed(2)}
          </p>
          <p className="text-white/60 text-xs font-medium">For 1 ticket • {event.date.split(',')[0]}</p>
        </div>
        <GlassButton className="px-8 py-3.5 text-sm sm:text-base font-bold shadow-[0_0_15px_rgba(255,42,42,0.3)] hover:scale-105 active:scale-95 transition-transform">
          Secure Ticket
        </GlassButton>
      </div>
    </main>
  )
}
