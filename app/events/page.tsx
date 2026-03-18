import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AllEventsDisplay } from "@/components/all-events-display"

export default function EventsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />
      <div className="pt-24 pb-12 sm:pt-32 sm:pb-24">
        <AllEventsDisplay />
      </div>
      <Footer />
    </main>
  )
}
