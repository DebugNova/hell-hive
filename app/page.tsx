import { Navbar } from "@/components/navbar"
import HellHiveHero from "@/components/hellhive-hero"
import dynamic from "next/dynamic"

// Lazy load below-fold sections for faster initial page load
const EventsSection = dynamic(() => import("@/components/events-section").then(m => ({ default: m.EventsSection })), {
  loading: () => <SectionSkeleton />,
})
const FeaturedEvents = dynamic(() => import("@/components/featured-events").then(m => ({ default: m.FeaturedEvents })), {
  loading: () => <SectionSkeleton />,
})
const GallerySection = dynamic(() => import("@/components/gallery-section").then(m => ({ default: m.GallerySection })), {
  loading: () => <SectionSkeleton />,
})
const HowItWorks = dynamic(() => import("@/components/how-it-works").then(m => ({ default: m.HowItWorks })), {
  loading: () => <SectionSkeleton />,
})
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section").then(m => ({ default: m.TestimonialsSection })), {
  loading: () => <SectionSkeleton />,
})
const HostCTA = dynamic(() => import("@/components/host-cta").then(m => ({ default: m.HostCTA })), {
  loading: () => <SectionSkeleton />,
})
const Footer = dynamic(() => import("@/components/footer").then(m => ({ default: m.Footer })), {
  loading: () => <SectionSkeleton height="h-48" />,
})

// Lightweight skeleton loader for lazy-loaded sections
function SectionSkeleton({ height = "h-96" }: { height?: string }) {
  return (
    <div className={`${height} flex items-center justify-center`}>
      <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
    </div>
  )
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />
      <HellHiveHero />
      <EventsSection />
      <FeaturedEvents />
      <GallerySection />
      <HowItWorks />
      <TestimonialsSection />
      <HostCTA />
      <Footer />
    </main>
  )
}
