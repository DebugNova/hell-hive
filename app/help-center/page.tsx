"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { BackButton } from "@/components/ui/back-button"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { GlassButton } from "@/components/ui/glass-button"
import {
  Sparkles, Search, ChevronDown, ChevronUp, MessageCircle, Mail,
  HelpCircle, Ticket, CreditCard, Shield, Users, Settings
} from "lucide-react"

const faqCategories = [
  { icon: Ticket, label: "Events & Tickets" },
  { icon: Users, label: "Hosting" },
  { icon: CreditCard, label: "Payments" },
  { icon: Shield, label: "Safety & Trust" },
  { icon: Settings, label: "Account" },
  { icon: HelpCircle, label: "General" },
]

const faqs = [
  {
    category: "Events & Tickets",
    items: [
      { q: "How do I buy tickets to an event?", a: "Browse events on the Discover page, select an event, and click 'Get Tickets.' You can pay with credit/debit card or PayPal. Once purchased, your tickets will appear in your profile." },
      { q: "Can I get a refund on my ticket?", a: "Refund policies are set by individual hosts. You can find the refund policy on each event page. If you need help, contact the host through the event page or reach out to our support team." },
      { q: "How do I find events near me?", a: "Use the Discover page and enable location services, or manually search by city. You can filter by category, date, and price range to find exactly what you're looking for." },
      { q: "Can I transfer my ticket to someone else?", a: "Yes! Go to your tickets in your profile, select the ticket you want to transfer, and enter the recipient's email address. They'll receive an email with the transferred ticket." },
    ]
  },
  {
    category: "Hosting",
    items: [
      { q: "How do I become a host?", a: "Click 'Host a Party' in the navigation bar, fill out the host application, and verify your identity. Once approved (usually within 24 hours), you can start creating events immediately." },
      { q: "What are the platform fees for hosts?", a: "Platform fees vary by plan: Starter (free) has a 10% fee, Pro ($29/mo) has a 5% fee, and Empire ($99/mo) has just 2%. Visit our Pricing page for full details." },
      { q: "How do I manage my guest list?", a: "Your host dashboard has a built-in guest management system. Track RSVPs, send messages to guests, manage check-ins, and export guest lists at any time." },
    ]
  },
  {
    category: "Payments",
    items: [
      { q: "When do I receive my earnings?", a: "Earnings are deposited to your linked bank account within 48 hours after your event ends. You can track all payment statuses in your host dashboard." },
      { q: "What payment methods are accepted?", a: "We accept all major credit/debit cards, PayPal, Apple Pay, and Google Pay. For host payouts, we support direct bank transfers and PayPal." },
    ]
  },
  {
    category: "Safety & Trust",
    items: [
      { q: "How does HellHive verify hosts?", a: "All hosts go through ID verification, phone number verification, and a review of their profile. We also have a community rating system and 24/7 safety monitoring." },
      { q: "What should I do if I feel unsafe at an event?", a: "Use the in-app emergency button to contact our safety team immediately. You can also call local emergency services. Our team is available 24/7 during all events." },
    ]
  },
  {
    category: "Account",
    items: [
      { q: "How do I delete my account?", a: "Go to Settings > Account > Delete Account. Note that this action is irreversible. All your data, tickets, and event history will be permanently removed." },
      { q: "How do I change my email or password?", a: "Go to Settings > Profile to update your email, or Settings > Security to change your password. You'll need to verify your identity for security reasons." },
    ]
  },
]

export default function HelpCenterPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = useState("")

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const filteredFaqs = faqs.map(cat => ({
    ...cat,
    items: cat.items.filter(
      item => searchQuery === "" ||
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0)

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-black pointer-events-none" />
        <FireBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-left mb-4"><BackButton /></div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[var(--hive-orange)]/30 text-[var(--hive-orange)] shadow-[0_0_10px_rgba(255,106,0,0.2)] text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4 text-[var(--hive-gold)]" />
            Help Center
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            How Can We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--hive-orange)] to-[var(--hive-gold)] drop-shadow-[0_0_15px_rgba(255,106,0,0.6)]">
              Help
            </span>?
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 mb-8 sm:mb-10">
            Find answers to common questions or reach out to our support team.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <Search className="h-5 w-5 text-white/40 ml-4" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm sm:text-base px-4 py-3 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="relative z-10 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {faqCategories.map((cat, i) => (
              <button
                key={i}
                className="p-4 rounded-2xl bg-[#0a0a0e]/60 border border-white/5 hover:border-[var(--hive-orange)]/30 transition-all flex flex-col items-center gap-3 group"
              >
                <cat.icon className="h-6 w-6 text-[var(--hive-orange)] group-hover:scale-110 transition-transform" />
                <span className="text-sm text-white/60 group-hover:text-white transition-colors">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="pb-24 relative z-10 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFaqs.map((category, catIdx) => (
            <div key={catIdx} className="mb-10">
              <h2 className="text-xl font-bold mb-4 text-[var(--hive-orange)]">{category.category}</h2>
              <div className="space-y-3">
                {category.items.map((item, itemIdx) => {
                  const key = `${catIdx}-${itemIdx}`
                  const isOpen = openItems[key]
                  return (
                    <div
                      key={key}
                      className="rounded-2xl bg-[#0a0a0e]/60 border border-white/5 overflow-hidden hover:border-[var(--hive-orange)]/20 transition-all"
                    >
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between p-5 text-left"
                      >
                        <span className="font-semibold pr-4">{item.q}</span>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-[var(--hive-orange)] flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-white/40 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-white/60 leading-relaxed border-t border-white/5 pt-4">
                          {item.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[var(--hive-orange)]/20 to-transparent p-[1px] rounded-2xl sm:rounded-[2.5rem]">
            <div className="bg-[#0a0a0e]/80 backdrop-blur-xl rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-16 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Still Need Help?</h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Our support team is available 24/7 to assist you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <GlassButton variant="primary" className="!px-10 !py-5 text-lg">
                  <MessageCircle className="mr-2 h-5 w-5" /> Live Chat
                </GlassButton>
                <GlassButton variant="secondary" className="!px-10 !py-5 text-lg">
                  <Mail className="mr-2 h-5 w-5" /> Email Support
                </GlassButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
