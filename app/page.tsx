import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { EventsSection } from "@/components/events-section"
import { FeaturedEvents } from "@/components/featured-events"
import { GallerySection } from "@/components/gallery-section"
import { HowItWorks } from "@/components/how-it-works"
import { TestimonialsSection } from "@/components/testimonials-section"
import { HostCTA } from "@/components/host-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
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
