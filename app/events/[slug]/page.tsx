"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Flame, MapPin, Info, CheckCircle2, HelpCircle, ShieldAlert, ChevronDown, ChevronUp, ShieldCheck, Lock, Award, Flag } from "lucide-react"
import { EventTemplate, EventData, RelatedEvent } from "@/components/event-template"
import { EventComments } from "@/components/event-comments"
import { useMemo } from "react"

const expandableSections = [
  {
    title: "Cancellation Policy",
    content: "Free cancellation for 48 hours after booking. Following this period, a 50% refund is available up to 72 hours before the event. Cancellations within 72 hours are non-refundable."
  },
  {
    title: "House Rules",
    content: "• Strictly 21+ entry unless specified\n• No outside food or beverages\n• No professional photography without a press pass\n• Dress code strictly enforced based on event tags"
  },
  {
    title: "Safety & Property",
    content: "• Professional security onsite at all times\n• Mandatory security screening at entry checkpoints\n• Medical personnel available throughout the event\n• CCTV surveillance active in all public venue areas"
  },
  {
    title: "Entry Requirements",
    content: "Attendees must present a valid, physical government-issued ID matching their ticket name. Digital tickets must be scanned directly from the Hell Hive secure application (screenshots not accepted)."
  },
  {
    title: "Refund Policy",
    content: "All ticket sales are considered final. Refunds are only automatically processed if an event is unconditionally canceled by the host. Rescheduled events will automatically have tickets transferred."
  },
  {
    title: "FAQs",
    content: "Q: Is parking available?\nA: Parking varies immensely by venue. Check the explicit event details sent to ticket holders 48h prior.\n\nQ: Can I transfer my tickets?\nA: Yes, verified transfers are allowed up to 4 hours before doors open exclusively via our app."
  }
]

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
  const [openSection, setOpenSection] = useState<number | null>(null)

  useEffect(() => {
    if (params?.slug) {
      setSlug(params.slug as string)
    }
  }, [params])

  const relatedEvents: RelatedEvent[] = useMemo(() => {
    if (!slug) return []
    return Object.entries(eventDetailsDb)
      .filter(([key]) => key !== slug)
      .slice(0, 4)
      .map(([key, ev]: [string, any]) => ({
        slug: key,
        title: ev.title,
        date: ev.date,
        price: ev.price,
        image: ev.image,
        category: ev.category,
        location: ev.location,
      }))
  }, [slug])

  if (!slug) return <div className="min-h-screen bg-black" />

  const eventData = eventDetailsDb[slug] || {
    title: slug.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
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

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index)
  }

  return (
    <EventTemplate event={eventData as EventData} relatedEvents={relatedEvents}>
      {/* 1. About Section */}
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
          {eventData.description}
        </p>
      </motion.div>

      <hr className="border-white/10" />

      {/* 2. Lineup & Highlights Section */}
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
          {eventData.lineup.map((item: string, idx: number) => (
            <li key={idx} className="flex items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[var(--hive-orange)]/40 transition-colors group cursor-default">
              <CheckCircle2 className="w-5 h-5 text-[var(--hive-orange)] mr-3 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-white/90 group-hover:text-white transition-colors">{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <hr className="border-white/10" />

      {/* 3. Location Section */}
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
          <p className="font-bold text-lg mb-2 text-white">{eventData.location}</p>
          <p className="text-white/60 mb-6">{eventData.fullAddress}</p>

          <div className="w-full h-48 bg-[#0a0a0e] rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center group">
            <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=New+York,NY&zoom=14&size=800x400&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0x8ec3b9&style=feature:all|element:labels.text.stroke|color:0x1a3646&style=feature:all|element:labels.icon|visibility:off&style=feature:administrative.country|element:geometry.stroke|color:0x4b6878&style=feature:administrative.country|element:labels.text.fill|color:0x223541&style=feature:administrative.province|element:geometry.stroke|color:0x4b6878&style=feature:administrative.province|element:labels.text.fill|color:0x223541&style=feature:landscape|element:geometry|color:0x000000&style=feature:poi|element:geometry|color:0x1a3646&style=feature:road|element:geometry|color:0x263c4f&style=feature:road|element:geometry.stroke|color:0x223541&style=feature:transit|element:geometry|color:0x263c4f&style=feature:transit|element:geometry.stroke|color:0x223541&style=feature:water|element:geometry|color:0x0e1626')] bg-cover opacity-50 grayscale contrast-150 group-hover:scale-105 transition-transform duration-700" />
            <div className="relative z-10 w-12 h-12 bg-black/60 backdrop-blur-md rounded-full border border-[var(--hive-orange)] flex items-center justify-center shadow-[0_0_20px_rgba(255,106,0,0.5)]">
              <MapPin className="w-6 h-6 text-[var(--hive-orange)]" />
            </div>
          </div>
        </div>
      </motion.div>

      <hr className="border-white/10 mt-12 mb-12" />

      {/* 4. Host Transparency & Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
          {/* Host Transparency */}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-6 flex items-center text-white/90">
              <ShieldCheck className="w-6 h-6 mr-3 text-[var(--hive-orange)]" />
              Trusted Host
            </h2>
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 group hover:border-white/20 transition-colors">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--hive-orange)] to-[var(--hive-red)] flex items-center justify-center shadow-[0_0_15px_rgba(255,106,0,0.4)]">
                <Flame className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-lg leading-tight">Hosted by {eventData.host}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <p className="text-xs font-medium text-white/50">Joined 2024</p>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <p className="text-xs font-medium text-white/50">{Math.floor(Math.random() * 40) + 12} Events hosted</p>
                </div>
              </div>
            </div>
            <button className="mt-5 text-[11px] font-medium text-white/40 hover:text-[var(--hive-orange)] transition-colors flex items-center gap-2 focus:outline-none tracking-wide uppercase px-1">
              <Flag className="w-3.5 h-3.5" />
              Report this event
            </button>
          </div>

          {/* Safety Features */}
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-6 text-white/90">Safety & Security</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <ShieldCheck className="w-5 h-5 text-white/40 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white/90 text-sm">Verified Event</p>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">Host identity and venue authenticity strongly verified by the Hell Hive security team.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Lock className="w-5 h-5 text-white/40 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white/90 text-sm">Secure Payment</p>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">All transactions are heavily encrypted and 100% protected through our platform.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Award className="w-5 h-5 text-white/40 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white/90 text-sm">Trusted Selection</p>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">Top-rated organizers with historical verifiable positive attendee feedback.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      <hr className="border-white/10 mt-6 mb-12" />

      {/* 5. Expandable Information Sections (Policies & Rules) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="pb-12"
      >
        <h2 className="text-2xl font-bold mb-8 flex items-center text-white/90">
          <HelpCircle className="w-6 h-6 mr-3 text-[var(--hive-orange)]" />
          Important Information
        </h2>
        <div className="space-y-4">
          {expandableSections.map((section, idx) => (
            <div key={idx} className="border-b border-white/10 last:border-0 pb-1">
              <button
                onClick={() => toggleSection(idx)}
                className="w-full text-left py-4 flex items-center justify-between focus:outline-none group transition-colors"
              >
                <span className="font-bold text-lg text-white/80 group-hover:text-white transition-colors pr-4">{section.title}</span>
                {openSection === idx ? (
                  <ChevronUp className="w-5 h-5 text-[var(--hive-orange)] shrink-0 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white/30 group-hover:text-[var(--hive-orange)] shrink-0 transition-transform duration-300" />
                )}
              </button>
              <AnimatePresence>
                {openSection === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 text-white/60 text-sm leading-relaxed whitespace-pre-line text-pretty">
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>

      <hr className="border-white/10 mt-6 mb-12" />

      {/* 6. Community Comments */}
      <EventComments />

    </EventTemplate>
  )
}
