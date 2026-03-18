"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FireBackground } from "@/components/ui/fire-background"
import { GlassButton } from "@/components/ui/glass-button"
import { BackButton } from "@/components/ui/back-button"
import { User, Settings, Ticket, Flame, Bell, LogOut, Mail, MapPin, Edit3, Shield, Key } from "lucide-react"
import Image from "next/image"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")

  // Mock User Data
  const user = {
    name: "Alex Mercer",
    handle: "@alex_inferno",
    bio: "Nightlife enthusiast and tech founder. Always looking for the next underground rave or exclusive networking event.",
    location: "Los Angeles, CA",
    joined: "Member since Oct 2025",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
    stats: {
      attended: 14,
      hosted: 2,
      favorites: 3
    }
  }

  const navItems = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "tickets", label: "My Tickets", icon: Ticket },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <main className="relative min-h-screen bg-[#0a0a0e] text-white">
      <Navbar />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <FireBackground />
        <div className="absolute inset-0 bg-[#0a0a0e]/90" />
      </div>

      <div className="relative z-10 pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton label="Go Back" />
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-80 shrink-0 space-y-6"
          >
            {/* Mini Profile Card */}
            <div className="rounded-[2rem] bg-[#111116]/80 backdrop-blur-xl border border-white/5 p-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--hive-orange)]/10 blur-3xl rounded-full" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--hive-orange)]/50 shadow-[0_0_15px_rgba(255,106,0,0.3)]">
                  <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white">{user.name}</h2>
                  <p className="text-[var(--hive-orange)] text-sm font-medium">{user.handle}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-white/10 mb-2">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{user.stats.attended}</div>
                  <div className="text-[10px] uppercase text-white/50 tracking-wider">Attended</div>
                </div>
                <div className="text-center border-x border-white/10">
                  <div className="text-xl font-bold text-white">{user.stats.hosted}</div>
                  <div className="text-[10px] uppercase text-white/50 tracking-wider">Hosted</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{user.stats.favorites}</div>
                  <div className="text-[10px] uppercase text-white/50 tracking-wider">Favorites</div>
                </div>
              </div>
            </div>

            {/* Navigation Sidebar */}
            <div className="rounded-3xl bg-[#111116]/80 backdrop-blur-xl border border-white/5 p-3 shadow-xl">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 w-full p-4 rounded-2xl transition-all duration-300 ${
                      activeTab === item.id 
                        ? "bg-white/10 text-white shadow-inner font-semibold border border-white/5" 
                        : "text-white/60 hover:bg-white/5 hover:text-white border border-transparent"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${activeTab === item.id ? "text-[var(--hive-orange)]" : ""}`} />
                    {item.label}
                    {item.id === "notifications" && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-[var(--hive-red)] shadow-[0_0_8px_rgba(255,42,42,0.8)]" />
                    )}
                  </button>
                ))}
                
                <hr className="my-2 border-white/10" />
                
                <button className="flex items-center gap-3 w-full p-4 rounded-2xl text-[var(--hive-red)] hover:bg-[var(--hive-red)]/10 transition-colors font-medium border border-transparent mt-1">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </nav>
            </div>
          </motion.div>

          {/* Right Content Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            <div className="rounded-[2.5rem] bg-[#111116]/80 backdrop-blur-xl border border-white/5 p-6 sm:p-10 shadow-2xl min-h-[600px] relative overflow-hidden">
              
              {/* Subtle top amber glow */}
              <div className="absolute right-0 top-0 w-96 h-96 bg-[var(--hive-orange)]/5 blur-[120px] rounded-full pointer-events-none" />

              <AnimatePresence mode="wait">
                
                {/* PROFILE TAB */}
                {activeTab === "profile" && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col"
                  >
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-3xl font-bold flex items-center gap-3">
                        <User className="w-8 h-8 text-[var(--hive-orange)]" />
                        Public Profile
                      </h2>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-medium">
                        <Edit3 className="w-4 h-4" /> Edit Profile
                      </button>
                    </div>

                    <div className="space-y-8">
                      {/* Bio Section */}
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-3">About Me</h3>
                        <p className="text-white/80 leading-relaxed text-lg">
                          {user.bio}
                        </p>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[var(--hive-orange)]/10 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-[var(--hive-orange)]" />
                          </div>
                          <div>
                            <p className="text-white/50 text-xs font-semibold uppercase">Location</p>
                            <p className="text-white font-medium">{user.location}</p>
                          </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[var(--hive-red)]/10 flex items-center justify-center">
                            <Flame className="w-5 h-5 text-[var(--hive-red)]" />
                          </div>
                          <div>
                            <p className="text-white/50 text-xs font-semibold uppercase">Member Since</p>
                            <p className="text-white font-medium">{user.joined}</p>
                          </div>
                        </div>
                      </div>

                      {/* Contact Settings */}
                      <div className="p-6 rounded-2xl bg-[#0a0a0e]/50 border border-white/5 mt-auto">
                        <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">Contact Info</h3>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                            <Mail className="w-5 h-5 text-white/50" />
                          </div>
                          <div>
                            <p className="text-white font-medium">alex.mercer@example.com</p>
                            <p className="text-white/40 text-xs mt-1">Verified primary email</p>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </motion.div>
                )}

                {/* OTHER TABS (Placeholder Layout) */}
                {activeTab !== "profile" && (
                  <motion.div
                    key="others"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col items-center justify-center text-center py-20"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                      {activeTab === "tickets" && <Ticket className="w-8 h-8 text-[var(--hive-orange)]/50" />}
                      {activeTab === "notifications" && <Bell className="w-8 h-8 text-[var(--hive-orange)]/50" />}
                      {activeTab === "security" && <Shield className="w-8 h-8 text-[var(--hive-orange)]/50" />}
                      {activeTab === "settings" && <Settings className="w-8 h-8 text-[var(--hive-orange)]/50" />}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 capitalize text-white">{activeTab.replace("-", " ")}</h3>
                    <p className="text-white/40 max-w-sm mx-auto mb-8">
                      This section is currently under construction. Check back soon for full functionality!
                    </p>
                    <GlassButton href="/events" className="px-8 !py-3">
                      Go to Events
                    </GlassButton>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
          
        </div>
      </div>

      <Footer />
    </main>
  )
}
