import { Navbar } from "@/components/navbar"
import { BackButton } from "@/components/ui/back-button"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { GlassButton } from "@/components/ui/glass-button"
import { Sparkles, Check, X, ArrowRight, Zap, Crown, Flame } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for first-time hosts testing the waters.",
    icon: Zap,
    popular: false,
    features: [
      { name: "Up to 50 guests per event", included: true },
      { name: "Basic event page", included: true },
      { name: "Email support", included: true },
      { name: "Standard listing", included: true },
      { name: "Basic analytics", included: true },
      { name: "10% platform fee", included: true },
      { name: "Custom branding", included: false },
      { name: "Priority support", included: false },
      { name: "Featured placement", included: false },
      { name: "API access", included: false },
    ],
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For serious hosts who want to grow their events.",
    icon: Flame,
    popular: true,
    features: [
      { name: "Unlimited guests", included: true },
      { name: "Premium event pages", included: true },
      { name: "Priority support", included: true },
      { name: "Featured listing boost", included: true },
      { name: "Advanced analytics", included: true },
      { name: "5% platform fee", included: true },
      { name: "Custom branding", included: true },
      { name: "Multiple ticket tiers", included: true },
      { name: "API access", included: false },
      { name: "Dedicated account manager", included: false },
    ],
    cta: "Start Pro Trial",
  },
  {
    name: "Empire",
    price: "$99",
    period: "/month",
    description: "For venues, promoters, and professional event companies.",
    icon: Crown,
    popular: false,
    features: [
      { name: "Unlimited everything", included: true },
      { name: "White-label event pages", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "Top-tier placement", included: true },
      { name: "Full analytics suite", included: true },
      { name: "2% platform fee", included: true },
      { name: "Full custom branding", included: true },
      { name: "Unlimited ticket tiers", included: true },
      { name: "API & webhooks", included: true },
      { name: "Multi-user team access", included: true },
    ],
    cta: "Contact Sales",
  },
]

const faqs = [
  { q: "Can I switch plans anytime?", a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle." },
  { q: "Is there a free trial for paid plans?", a: "Absolutely. Both Pro and Empire plans come with a 14-day free trial. No credit card required to start." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans." },
  { q: "How does the platform fee work?", a: "The platform fee is a small percentage deducted from each ticket sale. The rate depends on your plan tier." },
]

export default function PricingPage() {
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
            Simple Pricing
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Plans That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--hive-orange)] to-[var(--hive-gold)] drop-shadow-[0_0_15px_rgba(255,106,0,0.6)]">
              Scale
            </span>{" "}
            With You
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 mb-6">
            Start free, upgrade as you grow. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 bg-black pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-5 sm:p-8 transition-all duration-500 ${
                  plan.popular
                    ? "bg-gradient-to-b from-[var(--hive-orange)]/10 to-[#0a0a0e]/80 border-2 border-[var(--hive-orange)]/40 shadow-[0_0_60px_rgba(255,106,0,0.15)] scale-[1.02]"
                    : "bg-[#0a0a0e]/60 backdrop-blur-md border border-white/5 hover:border-[var(--hive-orange)]/20"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[var(--hive-red)] to-[var(--hive-orange)] text-sm font-semibold shadow-[0_0_20px_rgba(255,42,42,0.4)]">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.popular ? "bg-[var(--hive-orange)]/20" : "bg-white/5"}`}>
                    <plan.icon className={`h-5 w-5 ${plan.popular ? "text-[var(--hive-orange)]" : "text-white/60"}`} />
                  </div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                </div>

                <div className="mb-4">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-white/40 text-sm">{plan.period}</span>
                </div>

                <p className="text-white/60 text-sm mb-8">{plan.description}</p>

                <GlassButton
                  variant={plan.popular ? "primary" : "secondary"}
                  className={`w-full !py-3.5 text-sm mb-8 ${plan.popular ? "!bg-gradient-to-r !from-[var(--hive-red)] !to-[var(--hive-orange)] !border-none shadow-[0_0_15px_rgba(255,42,42,0.3)]" : ""}`}
                >
                  {plan.cta}
                </GlassButton>

                <ul className="space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      {f.included ? (
                        <Check className="h-4 w-4 text-[var(--hive-orange)] flex-shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-white/20 flex-shrink-0" />
                      )}
                      <span className={f.included ? "text-white/80" : "text-white/30"}>{f.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 relative z-10 bg-[#050505] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#0a0a0e]/60 border border-white/5">
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-white/60 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[var(--hive-orange)]/20 to-transparent p-[1px] rounded-2xl sm:rounded-[2.5rem]">
            <div className="bg-[#0a0a0e]/80 backdrop-blur-xl rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-16 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Still Have Questions?</h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Our team is here to help you find the perfect plan for your events.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <GlassButton variant="primary" className="!px-10 !py-5 text-lg group">
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </GlassButton>
                <GlassButton variant="secondary" className="!px-10 !py-5 text-lg">
                  Talk to Sales
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
