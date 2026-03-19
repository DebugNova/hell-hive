"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { BackButton } from "@/components/ui/back-button"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { GlassButton } from "@/components/ui/glass-button"
import { Sparkles, ArrowRight, Clock, User, Tag, ChevronRight } from "lucide-react"
import Link from "next/link"

const categories = ["All", "Industry News", "Host Tips", "Community Stories", "Product Updates", "Nightlife Culture"]

const articles = [
  {
    id: 1,
    title: "10 Tips to Make Your House Party Legendary",
    excerpt: "From playlist curation to lighting design — here's how top hosts create unforgettable experiences on HellHive.",
    category: "Host Tips",
    author: "Jordan Blake",
    date: "Mar 15, 2026",
    readTime: "6 min read",
    featured: true,
  },
  {
    id: 2,
    title: "The State of Nightlife in 2026",
    excerpt: "A deep dive into how technology is reshaping the $1 trillion nightlife industry — and where it's headed next.",
    category: "Industry News",
    author: "Maya Rodriguez",
    date: "Mar 12, 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 3,
    title: "How DJ Marcus Grew His Following 10x with HellHive",
    excerpt: "From bedroom DJ to sold-out events — the story of how one creator leveraged HellHive to build a movement.",
    category: "Community Stories",
    author: "Taylor Santos",
    date: "Mar 8, 2026",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: 4,
    title: "Introducing: Smart Event Recommendations",
    excerpt: "Our new AI-powered recommendation engine learns your vibe and surfaces events you'll actually love.",
    category: "Product Updates",
    author: "Alex Kim",
    date: "Mar 5, 2026",
    readTime: "4 min read",
    featured: false,
  },
  {
    id: 5,
    title: "The Psychology of the Perfect Night Out",
    excerpt: "What neuroscience tells us about why certain events feel magical — and how to engineer that feeling.",
    category: "Nightlife Culture",
    author: "Sam Patel",
    date: "Mar 1, 2026",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 6,
    title: "Safety First: Our New Verification System",
    excerpt: "How we're using advanced ID verification and real-time monitoring to make every event safer.",
    category: "Product Updates",
    author: "Chris Nguyen",
    date: "Feb 25, 2026",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: 7,
    title: "5 Event Themes That Always Sell Out",
    excerpt: "Based on data from 10,000+ events on HellHive, these themes consistently attract the most attendees.",
    category: "Host Tips",
    author: "Taylor Santos",
    date: "Feb 20, 2026",
    readTime: "4 min read",
    featured: false,
  },
  {
    id: 8,
    title: "From NYC to LA: HellHive's Expansion Story",
    excerpt: "A behind-the-scenes look at how we scaled from one city to 25 in just two years.",
    category: "Community Stories",
    author: "Jordan Blake",
    date: "Feb 15, 2026",
    readTime: "6 min read",
    featured: false,
  },
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredArticles = articles.filter(
    (a) => activeCategory === "All" || a.category === activeCategory
  )
  const featuredArticles = filteredArticles.filter((a) => a.featured)
  const regularArticles = filteredArticles.filter((a) => !a.featured)

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-black pointer-events-none" />
        <FireBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-left mb-4"><BackButton /></div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[var(--hive-orange)]/30 text-[var(--hive-orange)] shadow-[0_0_10px_rgba(255,106,0,0.2)] text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4 text-[var(--hive-gold)]" />
            The Hive Blog
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Stories,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--hive-orange)] to-[var(--hive-gold)] drop-shadow-[0_0_15px_rgba(255,106,0,0.6)]">
              Tips
            </span>
            {" "}& Trends
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70">
            Insights on nightlife culture, hosting tips, product updates, and community stories.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="relative z-10 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[var(--hive-red)] to-[var(--hive-orange)] text-white shadow-[0_0_15px_rgba(255,42,42,0.3)]"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="relative z-10 bg-black pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.map((article) => (
                <Link key={article.id} href={`/blog/${article.id}`} className="group block">
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--hive-orange)]/10 to-[var(--hive-violet)]/10 border border-white/5 hover:border-[var(--hive-orange)]/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,106,0,0.1)]">
                    <div className="h-48 bg-gradient-to-br from-[var(--hive-orange)]/20 to-[var(--hive-violet)]/20 flex items-center justify-center">
                      <span className="text-6xl opacity-50">📝</span>
                    </div>
                    <div className="p-5 sm:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-[var(--hive-orange)]/10 text-[var(--hive-orange)] text-xs font-medium">{article.category}</span>
                        <span className="text-xs text-white/40">{article.date}</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-[var(--hive-orange)] transition-colors">{article.title}</h2>
                      <p className="text-white/60 leading-relaxed mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-white/40">
                          <User className="h-3.5 w-3.5" /> {article.author}
                          <span>·</span>
                          <Clock className="h-3.5 w-3.5" /> {article.readTime}
                        </div>
                        <ChevronRight className="h-5 w-5 text-white/20 group-hover:text-[var(--hive-orange)] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Articles */}
      <section className="relative z-10 bg-black pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <Link key={article.id} href={`/blog/${article.id}`} className="group block">
                <div className="rounded-2xl bg-[#0a0a0e]/60 border border-white/5 hover:border-[var(--hive-orange)]/30 transition-all duration-500 overflow-hidden hover:shadow-[0_0_30px_rgba(255,106,0,0.08)]">
                  <div className="h-36 bg-gradient-to-br from-[var(--hive-orange)]/10 to-[var(--hive-violet)]/10 flex items-center justify-center">
                    <span className="text-4xl opacity-30">📄</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-[var(--hive-orange)]/10 text-[var(--hive-orange)] text-xs font-medium">{article.category}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--hive-orange)] transition-colors line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-white/50 mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-white/30">
                      <User className="h-3 w-3" /> {article.author}
                      <span>·</span>
                      <Clock className="h-3 w-3" /> {article.readTime}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <GlassButton variant="secondary" className="!px-10 !py-4 text-base">
              Load More Articles
            </GlassButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
