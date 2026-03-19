"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { GlassButton } from "@/components/ui/glass-button"
import { Calendar, MapPin, Users, Clock, Flame, Ticket, Share2, Heart, ArrowLeft, Info, CheckCircle2 } from "lucide-react"
import { BackButton } from "@/components/ui/back-button"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const eventDetailsDb: Record<string, any> = {
  "neon-nights-electronic-music-festival": {
    title: "Neon Nights: Electronic Music Festival",
    date: "Mar 28, 2026",
    time: "10:00 PM - 6:00 AM",
    location: "Downtown LA",
    fullAddress: "The Warehouse, 1234 Neon Ave, Los Angeles, CA",
    attendees: 2500,
    price: "$85.00",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&q=80",
    category: "Music",
    description: "Get ready to experience the ultimate sensory overload at Neon Nights. Featuring world-renowned DJs, immersive laser shows, and a massive community of electronic music lovers. This 8-hour marathon will test your limits and keep you dancing until dawn under intense fire visuals and neon strobes. Prepare for the drop.",
    lineup: ["DJ Inferno", "Plasma Wave", "The Synthesizer", "Bass Drop Kingdom"],
    tags: ["EDM", "18+", "VIP Available", "Lasers"],
    host: "Hell Hive Originals"
  },
  "rooftop-sunset-social": {
    title: "Rooftop Sunset Social",
    date: "Mar 22, 2026",
    time: "5:00 PM - 11:00 PM",
    location: "Manhattan, NY",
    fullAddress: "Sky High Lounge, 55th Floor, New York, NY",
    attendees: 150,
    price: "$120.00",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&q=80",
    category: "Social",
    description: "Elevate your evening at the Rooftop Sunset Social. An exclusive gathering featuring premium cocktails, gourmet appetizers, and smooth deep house beats as the sun sets over the Manhattan skyline. Networking at its finest in a breathtaking high-rise atmosphere designed for the elite.",
    lineup: ["Acoustic Sunset Band", "DJ Chill House"],
    tags: ["Networking", "21+", "Cocktails", "Dress to Impress"],
    host: "Elite Networkers"
  },
  "electric-dreams-festival": {
    title: "Electric Dreams Festival",
    date: "April 15-17, 2026",
    time: "4:00 PM - 2:00 AM Daily",
    location: "Las Vegas, NV",
    fullAddress: "Las Vegas Motor Speedway, Las Vegas, NV",
    attendees: 5000,
    price: "$299.00",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&q=80",
    category: "Festival",
    description: "Three days of non-stop electronic music featuring world-renowned DJs, immersive art installations, and breathtaking pyrotechnics. Electric Dreams is more than a festival; it's a journey into sound and light under the electric sky.",
    lineup: ["Armin van Buren", "Tiësto", "Zedd", "Illenium", "Subtronics"],
    tags: ["Festival", "EDM", "Multi-day", "18+"],
    host: "Insomniac Events"
  },
  "midnight-masquerade": {
    title: "Midnight Masquerade",
    date: "March 31, 2026",
    time: "9:00 PM - 3:00 AM",
    location: "The Grand Ballroom, NYC",
    fullAddress: "The Plaza Hotel, 5th Avenue at Central Park South, New York, NY",
    attendees: 800,
    price: "$150.00",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&q=80",
    category: "Exclusive",
    description: "An exclusive masquerade ball with live orchestral performances, premium cocktails, and a strictly enforced black-tie dress code. Step into a world of elegance and mystery where identities are hidden and the night is yours.",
    lineup: ["New York Symphony Quartet", "DJ Phantom", "Live Jazz Ensemble"],
    tags: ["Exclusive", "Black Tie", "Live Music", "21+"],
    host: "Elite Soirées"
  },
  "sunset-yacht-party": {
    title: "Sunset Yacht Party",
    date: "April 8, 2026",
    time: "4:00 PM - 10:00 PM",
    location: "Miami Harbor",
    fullAddress: "Bayside Marketplace Marina, 401 Biscayne Blvd, Miami, FL",
    attendees: 200,
    price: "$250.00",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80",
    category: "VIP",
    description: "Sail into the sunset with Miami's best DJs, a premium open bar, and unforgettable ocean views aboard a multi-million dollar luxury yacht. Experience the ultimate VIP lifestyle, incredible music, and perfect vibes as day turns into night on the open water.",
    lineup: ["DJ Ocean Breeze", "Miami House Mafia", "Saxophone Live"],
    tags: ["VIP", "Yacht", "Sunset", "Open Bar", "21+"],
    host: "Miami Vice Events"
  }
}

export default function EventDetailPage() {
  const params = useParams()
  const [slug, setSlug] = useState<string>("")
  const [isLiked, setIsLiked] = useState(false)
  
  // Resolve params safely for Next.js 14+ async params checking if necessary
  useEffect(() => {
    if (params?.slug) {
      setSlug(params.slug as string)
    }
  }, [params])

  if (!slug) return <div className="min-h-screen bg-black" />

  const event = eventDetailsDb[slug] || {
    title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    date: "Date TBA",
    time: "Time TBA",
    location: "Secret Location",
    fullAddress: "Details sent exclusively to ticket holders 48h before event.",
    attendees: Math.floor(Math.random() * 800) + 100,
    price: "$50.00",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80",
    category: "Event",
    description: "A mysterious Hell Hive event. Prepare yourself for an unforgettable experience with intense vibes and a massive community. Not for the faint of heart. Secure your spot before it sells out.",
    lineup: ["Special Guests TBA", "Local Support"],
    tags: ["Hell Hive", "Exclusive", "Secret"],
    host: "Hell Hive Community"
  }

  return (
    <main className="relative min-h-screen bg-black text-white">
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
            
            <div className="absolute top-6 right-6 flex items-center gap-3">
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
            
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-12">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Info className="w-6 h-6 mr-3 text-[var(--hive-orange)]" />
                  About This Event
                </h2>
                <p className="text-white/70 text-lg leading-relaxed text-pretty">
                  {event.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 w-full sm:w-auto">
                    <div className="w-12 h-12 rounded-full bg-[var(--hive-red)]/20 flex items-center justify-center">
                      <Flame className="w-6 h-6 text-[var(--hive-red)]" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Hosted By</p>
                      <p className="font-bold text-white text-lg">{event.host}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <hr className="border-white/10" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Flame className="w-6 h-6 mr-3 text-[var(--hive-orange)]" />
                  Lineup & Highlights
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.lineup.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[var(--hive-orange)]/40 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-[var(--hive-orange)] mr-3" />
                      <span className="font-medium text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <hr className="border-white/10" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-[var(--hive-orange)]" />
                  Location
                </h2>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <p className="font-bold text-lg mb-2 text-white">{event.location}</p>
                  <p className="text-white/60 mb-6">{event.fullAddress}</p>
                  
                  {/* Mock Map View */}
                  <div className="w-full h-48 bg-[#0a0a0e] rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center group">
                    <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=New+York,NY&zoom=14&size=800x400&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0x8ec3b9&style=feature:all|element:labels.text.stroke|color:0x1a3646&style=feature:all|element:labels.icon|visibility:off&style=feature:administrative.country|element:geometry.stroke|color:0x4b6878&style=feature:administrative.country|element:labels.text.fill|color:0x223541&style=feature:administrative.province|element:geometry.stroke|color:0x4b6878&style=feature:administrative.province|element:labels.text.fill|color:0x223541&style=feature:landscape|element:geometry|color:0x000000&style=feature:poi|element:geometry|color:0x1a3646&style=feature:road|element:geometry|color:0x263c4f&style=feature:road|element:geometry.stroke|color:0x223541&style=feature:transit|element:geometry|color:0x263c4f&style=feature:transit|element:geometry.stroke|color:0x223541&style=feature:water|element:geometry|color:0x0e1626')] bg-cover opacity-50 grayscale contrast-150 group-hover:scale-105 transition-transform duration-700" />
                    <div className="relative z-10 w-12 h-12 bg-black/60 backdrop-blur-md rounded-full border border-[var(--hive-orange)] flex items-center justify-center shadow-[0_0_20px_rgba(255,106,0,0.5)]">
                      <MapPin className="w-6 h-6 text-[var(--hive-orange)]" />
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Right Column: Ticket / RSVP Sticky Box */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="rounded-[2rem] bg-[#111116]/80 backdrop-blur-xl border border-white/10 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative overflow-hidden"
                >
                  {/* Subtle top red glow */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--hive-red)] to-transparent" />
                  
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <p className="text-white/50 text-sm font-semibold uppercase tracking-wider mb-1">General Admission</p>
                      <p className="text-4xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{event.price}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-white/70">
                      <Calendar className="w-5 h-5 text-white/40" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <Clock className="w-5 h-5 text-white/40" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <Ticket className="w-5 h-5 text-white/40" />
                      <span>Digital Ticket Transferable</span>
                    </div>
                  </div>

                  <GlassButton className="w-full text-lg py-6 mb-4 flex justify-center items-center shadow-[0_0_20px_rgba(255,42,42,0.3)]">
                    Secure Ticket Now
                  </GlassButton>
                  
                  <p className="text-center text-xs text-white/40 font-medium px-4">
                    All sales final. Tickets processed via Hell Hive Secure Pay. 100% Buyer Protection.
                  </p>
                </motion.div>
              </div>
            </div>

          </div>
        </section>

      </div>

      <Footer />
    </main>
  )
}
