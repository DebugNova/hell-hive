# 🐝 Hell Hive Project Roadmap & To-Do

Welcome to the central tracking point for the Hell Hive web development project. This document outlines the current state, upcoming features, and technical debt.

## 🚀 Immediate Next Steps (To-Do)

### 💬 Social & Community Enhancements
- [ ] **Backend for Comments**: Replace the mock state in `components/event-comments.tsx` with a database (Supabase/PostgreSQL) and real-time listeners.
- [ ] **Reaction System**: Add emoji reactions (Fire, Party, Rocket) to comments.
- [ ] **Image Sharing**: Allow users to upload "Moments" (photos) from past events to the community buzz.

### 💳 Ticketing & Booking Flow
- [ ] **Interactive Checkout**: Build the state machine for the booking modal — selecting ticket types (VIP vs General), adding quantity, and collecting attendee details.
- [ ] **Payment Integration**: Secure Stripe or Razorpay integration for the "Secure Ticket" flow.
- [ ] **PDF/Digital Tickets**: Generate unique ticket IDs and QR codes upon successful booking.

### 🗺️ Location & Maps
- [ ] **Interactive Map**: Replace the static map image in `app/events/[slug]/page.tsx` with a dynamic Google Maps or Mapbox component.
- [ ] **Directions API**: Add a "Get Directions" button that opens Google/Apple Maps.

### 👤 User Experience (UX)
- [ ] **Authentication**: Implement a login flow (NextAuth or Supabase Auth) so favorites and bookings are saved.
- [ ] **Personalized Hero**: Dynamic hero section content based on user's favorite genres (Techno, Social, VIP).

---

## ✅ Recently Completed
- [x] **Related Events Carousel**: Horizontal snap-scrolling "You Might Also Like" section.
- [x] **Community Buzz**: Minimal, premium comments section for social interaction.
- [x] **Event Page Refactor**: Optimized data flow using `useMemo` and fixed React Hook rules.
- [x] **UI Clean-up**: Removed urgency indicators to maintain a clean, premium aesthetic.
- [x] **Mobile Optimization**: Fixed sticky navigation and scrolling for all new components.

---

## 🛠️ Long-term Vision
- **Global Search**: Powerful search bar with category and date filters.
- **PWA Support**: Full Progressive Web App support for "Install to Home Screen".
- **Host Dashboard**: A standalone portal for organizers to manage their event listings and ticket sales.

---
*Last updated: 2026-03-20*
