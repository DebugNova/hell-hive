# 🔥 HELLHIVE — Complete Website & Codebase Overview

> **"Enter The Hive. Burn The Night."**
> HellHive is a premium event discovery and hosting marketplace — a social platform where people list their parties, house events, birthday bashes, music nights, gaming tournaments, and all kinds of social gatherings, and other users can browse, join, and RSVP to these events.

---

## 📌 Table of Contents

> 1. [What Is HellHive?](#-what-is-hellhive)
> 2. [Core Purpose & Target Audience](#-core-purpose--target-audience)
> 3. [Website Sections — Page-by-Page Breakdown](#-website-sections--page-by-page-breakdown)
> 4. [Tech Stack](#-tech-stack)
> 5. [Design System & Visual Language](#-design-system--visual-language)
> 6. [Component Architecture](#-component-architecture)
> 7. [File & Folder Structure](#-file--folder-structure)
> 8. [Key UI Components — Deep Dive](#-key-ui-components--deep-dive)
> 9. [Animations & Interactivity](#-animations--interactivity)
> 10. [Custom Visual Effects](#-custom-visual-effects)
> 11. [Event Data Model](#-event-data-model)
> 12. [Navigation & Routing](#-navigation--routing)
> 13. [Currently Implemented vs. Planned Features](#-currently-implemented-vs-planned-features)
> 14. [Known Quirks & Development Notes](#-known-quirks--development-notes)

---

## 🎉 What Is HellHive?

> **HellHive** is a **social event marketplace** — think Eventbrite meets Instagram for underground/social parties. It's a single-page marketing website (currently, with routing stubs for future expansion) that:
> 
> - **Lets users discover** trending events in their area: raves, club nights, rooftop socials, gaming tournaments, art parties, startup meetups, birthday parties, house parties, yacht parties, and more.
> - **Lets hosts list and promote** their events, reaching thousands of local party-goers.
> - **Provides host tools** (described/planned): monetization, analytics, event management, and premium host profiles.
> - **Builds community** through a testimonials display, gallery of past events, and a social media presence.
> 
> The tagline **"Enter The Hive. Burn The Night."** sets the vibe perfectly — this is a platform for people who want to *experience* parties, not just scroll past them.

---

## 🎯 Core Purpose & Target Audience

### 👥 Who It's For

> | Persona | Role on Platform |
> |---|---|
> | 🎪 **Party-goers** | Browse, discover, RSVP, and attend events |
> | 🎛️ **Hosts / Organizers** | List events, sell tickets, get exposure |
> | 💼 **Business Hosts** | Corporate events, sponsored parties, brand activations |
> | 🎂 **Casual Users** | Birthday parties, house parties, small gatherings |

### 🎟️ What Kind of Events Are Listed

> Based on the category filters and demo event data in the code:
> - 🎵 **Music** — EDM festivals, electronic music nights, live bands
> - 🌙 **Nightlife** — Underground raves, club nights, tech house
> - 👥 **Social** — Rooftop socials, mixers, casual hangouts
> - 🎮 **Gaming** — Gaming tournaments, LAN parties, midnight gaming nights
> - 🎨 **Art** — Art Basel after-parties, gallery openings, creative events
> - 🤝 **Networking** — Startup founder mixers, professional socials
> - 🎂 **Birthday / House Parties** (core use case, mentioned explicitly by the product)

---

## 🌐 Website Sections — Page-by-Page Breakdown

> The entire website is a **single long-scrolling page** (`app/page.tsx`) composed of **8 sections** stacked vertically:
> 
> ```text
> ┌─────────────────────────────────────────────────┐
> │  1. NAVBAR         — Fixed top navigation bar    │
> ├─────────────────────────────────────────────────┤
> │  2. HERO           — Full-screen animated intro  │
> ├─────────────────────────────────────────────────┤
> │  3. EVENTS SECTION — "Trending Events" grid      │
> ├─────────────────────────────────────────────────┤
> │  4. FEATURED EVENTS— "Featured Experiences"       │
> ├─────────────────────────────────────────────────┤
> │  5. GALLERY        — "Moments That Matter"       │
> ├─────────────────────────────────────────────────┤
> │  6. HOW IT WORKS   — 3-step process explainer    │
> ├─────────────────────────────────────────────────┤
> │  7. TESTIMONIALS   — Scrolling user reviews      │
> ├─────────────────────────────────────────────────┤
> │  8. HOST CTA       — "Ready to Throw a Party?"   │
> ├─────────────────────────────────────────────────┤
> │  9. FOOTER         — Links + newsletter sign-up  │
> └─────────────────────────────────────────────────┘
> ```

<br>

### 🔷 Section 1: Navbar (`components/navbar.tsx`)

> **🎯 Purpose:** Fixed top navigation that becomes a glassmorphism blur-bar as the user scrolls.
> 
> **⚙️ Behavior:**
> - **Transparent** when at top of page (blends into hero)
> - **Frosted glass** (`.glass-strong`) once user scrolls down 50px
> - **Mobile:** Slides in a right-drawer menu with backdrop blur on mobile screen sizes
> 
> **🔗 Links:**
> | Link | Anchor |
> |---|---|
> | Discover Events | `#discover` |
> | Gallery | `#gallery` |
> | Testimonials | `#testimonials` |
> | About | `#about` |
> 
> **🖱️ CTA Button:** "Host a Party" → links to `#host`
> 
> **✨ Logo:** HELLHIVE wordmark with animated Flame icon (purple glowing, pulsing glow animation using Framer Motion)
> 
> **💻 Key Technical Details:**
> - Uses `useEffect` to listen to `window.scrollY` for scroll state
> - Mobile menu locks `body.style.overflow = "hidden"` to prevent background scroll
> - Uses `<AnimatePresence>` to animate Menu/X icon swap smoothly
> - Mobile menu slides in from right using spring animation

<br>

### 🔷 Section 2: Hero (`components/hellhive-hero.tsx`)

> **🎯 Purpose:** The jaw-dropping, full-screen hero section at the top of the page. Designed to immediately communicate the brand's dark, fiery, exclusive vibe.
> 
> **🥞 Visual Layers (stacked z-index order):**
> | Layer | Description |
> |---|---|
> | `z-0` | Solid black base background |
> | `z-0` | Radial vignette gradient (transparent center → black edges) |
> | `z-0` | **Interactive Honeycomb** canvas animation |
> | `z-0` | **Ember Particles** canvas animation |
> | `z-10` | Main text content (title, tagline, buttons) |
> | - | Bottom flame gradient line (1px orange) |
> 
> **📝 Content:**
> - Giant `HELLHIVE` title (up to `text-9xl` on large screens), bold, spaced lettering
> - Tagline: *"Enter The Hive. Burn The Night."*
> - Two CTA glass buttons: **"Discover Parties"** and **"Host a Party"**
> 
> **🧩 Sub-components in this file:**
> 
> **`InteractiveHoneycomb` (Canvas)**
> - Fills the entire hero with a hexagonal grid drawn on `<canvas>`
> - Each hexagon is 40px radius, drawn in a staggered offset grid pattern
> - **Mouse interaction:** Hexagons near the cursor (within 150px radius) glow golden (`#D4A017`) with `shadowBlur` glow effect
> - The glow **spreads** to neighboring hexagons (within 1.2× hex width)
> - Uses `requestAnimationFrame` animation loop
> - Responds to `window.resize` to rebuild the grid
> - This is a pure canvas drawing engine — no libraries
> 
> **`EmberParticles` (Canvas)**
> - 60 floating fire ember particles (`#FF6A00`, `#FF4500`, `#D4A017`, `#FF2A2A`, `#FFA500`)
> - Each ember rises from the bottom with a sine-wave horizontal drift
> - Rendered with radial gradients (glowing outer halo + solid core)
> - Lifetime-based opacity fade: each ember resets when it dies
> - Flickering effect using sine wave on opacity

<br>

### 🔷 Section 3: Events Section (`components/events-section.tsx`)

> **🎯 Purpose:** The main event discovery grid. Shows 6 "Trending Events" with category filter tabs.
> 
> **🎫 Demo Events (hardcoded):**
> 
> | Event | Date | Location | Attendees | Category |
> |---|---|---|---|---|
> | Neon Nights: Electronic Music Festival | Mar 28, 2026 | Downtown LA | 2,500 | Music ⭐ Featured |
> | Rooftop Sunset Social | Mar 22, 2026 | Manhattan, NY | 150 | Social |
> | Underground Tech House | Mar 25, 2026 | Brooklyn, NY | 300 | Nightlife |
> | Midnight Gaming Tournament | Mar 30, 2026 | Austin, TX | 500 | Gaming |
> | Art Basel After Party | Apr 2, 2026 | Miami Beach, FL | 800 | Art |
> | Startup Founders Mixer | Apr 5, 2026 | San Francisco, CA | 200 | Networking |
> 
> **🗂️ Category Filter Tabs:**
> `All` | `Music` | `Nightlife` | `Social` | `Gaming` | `Art` | `Networking`
> 
> - Active category glows red (`var(--hive-red)`) with a border glow effect
> - Filter tab state is local React state (`useState`) — note: **filtering is UI-only**, the grid doesn't actually filter yet (all events always show regardless of tab)
> 
> **📐 Layout:** Responsive CSS grid: 1-column → 2-column → 3-column. Vertical padding reduced for better mobile flow (`py-10 sm:py-16`). Section headers use `text-4xl` to `text-6xl`, `font-extrabold`, and `tracking-tight`.
> 
> **✨ Components:** Cards and filters are wrapped in a shared glassmorphism container with `rounded-[2rem]`, `backdrop-blur-md`, and a subtle `border-white/5`.

<br>

### 🔷 Section 4: Featured Events (`components/featured-events.tsx`)

> **🎯 Purpose:** Showcases 3 "hand-picked" premium/highlighted events in a stacked alternating layout (image left/right alternating).
> 
> **⭐ Demo Featured Events:**
> 
> | Event | Date | Location | Attendees | Tags |
> |---|---|---|---|---|
> | Electric Dreams Festival | Apr 15–17, 2026 | Las Vegas, NV | 5,000 | Festival, EDM, Multi-day |
> | Midnight Masquerade | Mar 31, 2026 | The Grand Ballroom, NYC | 800 | Exclusive, Black Tie, Live Music |
> | Sunset Yacht Party | Apr 8, 2026 | Miami Harbor | 200 | VIP, Yacht, Sunset |
> 
> **📐 Layout per Card:**
> - `md:grid-cols-2` even/odd alternating: odd indices flip image to the right
> - Optimized hero image height: `h-[200px] sm:h-[250px] md:h-[320px]` (Reduced from 500px for better mobile balance) with zoom-on-hover effect
> - "Featured" badge with gold sparkle icon
> - Orange-tinted tag pills (category labels)
> - Text block with title (`text-2xl` to `text-4xl`), description, date/location/attendees metadata
> - "Get Tickets" glass button
> 
> **✨ Parallax Effect:** Uses `framer-motion`'s `useScroll` + `useTransform` — card slightly moves up/down (±50px) and scales (0.95 → 1 → 0.95) as it enters and exits the viewport.

<br>

### 🔷 Section 5: Gallery (`components/gallery-section.tsx`)

> **🎯 Purpose:** Visual candy — a masonry photo gallery titled "Moments That Matter" that shows the energy and atmosphere of HellHive events.
> 
> **📸 8 images** from Unsplash, categorized by size:
> - `large` → `aspect-[4/5]` (portrait)
> - `medium` → `aspect-[4/3]` (landscape)
> - `small` → `aspect-square`
> 
> **📐 Layout:** CSS `columns-1 → columns-2 → columns-3` masonry (built-in browser masonry using CSS columns)
> 
> **🖱️ Hover Effects per Image:**
> - Scale up image (`group-hover:scale-110`)
> - Dark gradient overlay fades in from bottom
> - Caption text slides up
> - Red glow ring appears around the card (`var(--hive-red)`)

<br>

### 🔷 Section 6: How It Works (`components/how-it-works.tsx`)

> **🎯 Purpose:** Explains the platform in 3 simple steps. A common SaaS/marketplace onboarding pattern.
> 
> **🔢 3 Steps:**
> 
> | Step | Icon | Title | Description |
> |---|---|---|---|
> | 01 | `Search` | **Discover** | Browse thousands of curated events. Filter by category, date, or vibe. |
> | 02 | `Ticket` | **Join** | Reserve your spot instantly. No hassle, no waiting. Just tap and you're in. |
> | 03 | `PartyPopper` | **Experience** | Show up, connect with amazing people, create memories that last a lifetime. |
> 
> **📐 Layout:** 3-column grid on desktop, stacked vertically on mobile. Section padding reduced to `py-12 sm:py-20`.
> 
> **🔗 Connectors:** Animated horizontal lines between steps (desktop) / vertical lines (mobile) with orange gradient and arrow icons, grow in using `scaleX` / `scaleY` animation.

<br>

### 🔷 Section 7: Testimonials (`components/testimonials-section.tsx`)

> **🎯 Purpose:** Social proof section — "What our users say" — three columns of scrolling testimonial cards.
> 
> **📐 Layout:** 3 animated auto-scrolling columns (1 on mobile, 2 on tablet, 3 on desktop) with a top/bottom fade mask using CSS `mask-image: linear-gradient(...)`.
> 
> **📝 Data:** 9 testimonials split into 3 columns (3 each), auto-looped using Framer Motion's infinite `translateY` animation.
> 
> *⚠️ **Development Note:** The testimonial content currently uses generic ERP-style placeholder text ("This ERP revolutionized our operations..."). These testimonials **need to be replaced** with real HellHive party/event-related user reviews.*
> 
> **⏱️ Animation Speeds:**
> - Column 1: 15 seconds/cycle
> - Column 2: 19 seconds/cycle (slightly different to feel organic)
> - Column 3: 17 seconds/cycle

<br>

### 🔷 Section 8: Host CTA (`components/host-cta.tsx`)

> **🎯 Purpose:** The conversion section for hosts — "Ready to Throw the Ultimate Party?" A strong call-to-action persuading organizers to sign up as hosts.
> 
> **📝 Content:**
> - "Become a Host" badge with sparkle icon
> - Headline: "Ready to Throw the **Ultimate Party?**" (orange glow on "Ultimate Party")
> - Supporting text explaining host value
> - Two buttons: **"Start Hosting"** (→ `/host`) and **"Learn More"** (→ `#learn`)
> 
> **⚡ Benefits Grid (4 cards):**
> | Icon | Benefit |
> |---|---|
> | `Users` | Reach thousands of party-goers |
> | `DollarSign` | Monetize your events easily |
> | `Calendar` | Powerful event management |
> | `Sparkles` | Premium host tools & analytics |
> 
> **✨ Visual:** Glassmorphism card with backdrop blur, subtle orange border glow accent

<br>

### 🔷 Section 9: Footer (`components/footer.tsx`)

> **🎯 Purpose:** Standard marketing site footer with brand identity, links, social icons, and email newsletter signup.
> 
> **✉️ Newsletter CTA:**
> - Email input + Subscribe button (fire gradient: red → orange)
> - "Stay in the loop — Get the latest events and exclusive offers."
> 
> **🔗 Link Categories:**
> | Column | Links |
> |---|---|
> | Product | Discover Events, Host a Party, Pricing, For Business |
> | Company | About Us, Careers, Blog, Press Kit |
> | Resources | Help Center, Host Guide, Community, Safety |
> | Legal | Privacy Policy, Terms of Service, Cookie Policy |
> 
> **📱 Social Icons:** Twitter, Instagram, Facebook, YouTube (all `href="#"` — placeholder)
> 
> **©️ Copyright:** © 2026 HellHive. All rights reserved.

---

## 🛠️ Tech Stack

> | Technology | Role | Version |
> |---|---|---|
> | **Next.js** | React meta-framework, routing, SSR/SSG | 16.1.6 |
> | **React** | UI library | 19.2.4 |
> | **TypeScript** | Type safety throughout | 5.7.3 |
> | **Tailwind CSS v4** | Utility-first CSS framework | ^4.2.0 |
> | **Framer Motion** | All animations (scroll, hover, presence) | ^12.35.2 |
> | **shadcn/ui** | Radix primitives + styled components | ^4.0.0 |
> | **Radix UI** | Headless accessible UI primitives | various |
> | **Lucide React** | Icon library | ^0.564.0 |
> | **@vercel/analytics** | Page analytics (Vercel) | 1.6.1 |
> | **next-themes** | Theme management | ^0.4.6 |

---

## 🎨 Design System & Visual Language

### 🎨 Color Palette

The HellHive brand is built around a **dark nightlife aesthetic** — deep blacks with warm fire tones.

> | Variable | Hex | Usage |
> |---|---|---|
> | `--hive-midnight` | `#0B0B0F` | Base page background — deepest black |
> | `--hive-charcoal` | `#111117` | Card surfaces, slightly lighter dark |
> | `--hive-violet` | `#6A00FF` | Electric purple glow (navbar logo, button primary tint) |
> | `--hive-red` | `#FF2A2A` | Fire red — active states, like buttons, gallery hover |
> | `--hive-orange` | `#FF6A00` | Warm orange — primary accent, section headers, CTA glows |
> | `--hive-gold` | `#D4A017` | Golden amber — honeycomb grid, featured badges, step connectors |
> 
> **CSS Custom Properties** (shadcn compatible):
> - `--primary`: Electric Crimson `oklch(0.65 0.25 15)` → used for rings, buttons
> - `--accent`: Electric Purple `oklch(0.6 0.22 300)` → secondary accent
> - `--background`: Near-black `oklch(0.08 0 0)` → base body color

### 🔤 Typography

Three typefaces loaded from Google Fonts:

> | Font | Variable | Usage |
> |---|---|---|
> | **Inter** | `--font-inter` | Body text, UI labels (default `font-sans`) |
> | **Space Grotesk** | `--font-space-grotesk` | Monospace-flavored display text |
> | **Great Vibes** | `--font-script` | Script/cursive decorative text |

### 🪟 Glassmorphism

Two glass utility classes are defined in `globals.css`:
> - `.glass` — `bg: rgba dark 60% opacity + blur(20px) + 30% border`
> - `.glass-strong` — `bg: rgba dark 80% opacity + blur(30px) + 40% border`

### ✨ Custom Animations

> | Animation | Effect | Usage |
> |---|---|---|
> | `flame-flicker` | ScaleY/ScaleX wobble + brightness | Flame decorative elements |
> | `ember-float` | Float up + fade out | Particle effects |
> | `golden-sweep` | Horizontal shine sweep | GlassButton hover shine |
> | `marquee` | Infinite horizontal scroll | Marquee texts |
> | `marquee-vertical` | Infinite vertical scroll | Testimonials auto-scroll |

---

## 🏗️ Component Architecture

> ```text
> app/
> ├── layout.tsx          → Root layout: fonts, metadata, Analytics
> ├── page.tsx            → Home page: assembles all 8 sections
> └── globals.css         → Design tokens, utilities, keyframes
> 
> components/
> ├── navbar.tsx              → Fixed navigation bar
> ├── hellhive-hero.tsx       → Hero: honeycomb + embers + title + CTA
> ├── events-section.tsx      → Trending events grid + category filter
> ├── event-card.tsx          → Reusable card for each event listing
> ├── featured-events.tsx     → Hero-style alternating featured event cards
> ├── gallery-section.tsx     → Masonry photo gallery
> ├── how-it-works.tsx        → 3-step onboarding explainer
> ├── testimonials-section.tsx → Auto-scrolling testimonial columns
> ├── host-cta.tsx            → Host conversion CTA section
> ├── footer.tsx              → Footer: links, newsletter, socials
> ├── theme-provider.tsx      → next-themes ThemeProvider wrapper
> ├── flame-effect.tsx        → (standalone flame effect component)
> ├── hero.tsx                → (older/alternative hero version)
> ├── honeycomb-canvas.tsx    → (standalone honeycomb canvas component)
> └── ui/
>     ├── glass-button.tsx         → Custom glassmorphism CTA button
>     ├── fire-background.tsx      → Reusable fire ember bg overlay
>     ├── testimonials-columns-1.tsx → Animated scrolling testimonial column
>     ├── 3d-testimonails.tsx      → (alternative 3D testimonial card)
>     ├── button.tsx               → shadcn standard button
>     ├── card.tsx                 → shadcn card
>     ├── dialog.tsx               → shadcn modal dialog
>     ├── [40+ other shadcn UI components]
>     └── ...
> ```

---

## 📁 File & Folder Structure

> ```text
> hell-hive/
> ├── app/
> │   ├── globals.css       ← All CSS: variables, utilities, keyframes
> │   ├── layout.tsx         ← Root layout with fonts + analytics
> │   └── page.tsx           ← The homepage (only page currently)
> ├── components/
> │   ├── ui/               ← Reusable UI primitives (shadcn + custom)
> │   └── [feature components]
> ├── lib/
> │   └── utils.ts           ← `cn()` helper (cn = clsx + tailwind-merge)
> ├── hooks/                 ← (empty, for future custom hooks)
> ├── public/               ← Static assets (favicon, icons, images)
> ├── styles/               ← (additional style files if needed)
> ├── next.config.mjs       ← Next.js config (minimal)
> ├── tailwind.config       ← None — Tailwind v4 uses CSS config
> ├── postcss.config.mjs    ← PostCSS for Tailwind v4
> ├── tsconfig.json         ← TypeScript config with path alias `@/`
> ├── components.json       ← shadcn/ui config (style: "default")
> └── package.json          ← Dependencies and scripts
> ```

---

## 🔍 Key UI Components — Deep Dive

### `GlassButton` (`components/ui/glass-button.tsx`)

> The signature button style used across the entire site. Renders as a premium frosted-glass pill button.
> 
> **Variants:**
> - `primary` — Slight white fill + violet-to-gold inner gradient tint
> - `secondary` — Transparent fill + orange-to-red inner gradient tint
> 
> **Visual layers inside the button:**
> 1. Top highlight line (1px gradient line at very top)
> 2. Frosted glass upper reflection (half-height gradient from white)
> 3. Shine sweep animation on hover (diagonal white streak animates left → right)
> 4. Color tint overlay (violet/gold for primary, orange/red for secondary)
> 5. Text span (`z-10`, glows white on hover)
> 
> **Props:**
> - `variant: "primary" | "secondary"` — visual style
> - `asChild: boolean` — Radix `Slot` pattern (allows wrapping `<Link>` as child)

<br>

### `FireBackground` (`components/ui/fire-background.tsx`)

> A reusable full-section background overlay added to nearly every section. Creates ambient warmth.
> 
> **Renders:**
> - A large center orange radial blur (1000×600px, `blur-[120px]`)
> - A large bottom red radial blur (800×300px, `blur-[100px]`)
> - 25 floating flame-shaped particles that drift upward with Framer Motion
> 
> **Mounted guard:** Uses `useState` + `useEffect` to only render after mount, preventing SSR hydration mismatch (positions are randomized client-side).

<br>

### `EventCard` (`components/event-card.tsx`)

> Reusable card component for displaying events in the trending grid.
> 
> **Props:**
> ```typescript
> interface EventCardProps {
>   title: string      // Event name
>   date: string       // Display date string
>   location: string   // City, State
>   attendees: number  // Number of RSVPs
>   image: string      // Image URL (Unsplash)
>   category: string   // Category label (Music, Gaming, etc.)
>   featured?: boolean // If true, card spans wider in grid
>   index: number      // Used for staggered animation delay
> }
> ```
> 
> **Interactive features:**
> - **Like/Heart button** — togglable heart icon, red glow when active (client-side state only, no persistence)
> - **Hover lift** → card translates `-8px` on Y axis
> - **Image zoom** → `group-hover:scale-110` on inner image
> - **Orange glow border** → `hover:shadow-[0_0_30px_rgba(255,106,0,0.2)]`
> - **"View Event"** button with animated arrow (no actual routing yet)

<br>

### `TestimonialsColumn` (`components/ui/testimonials-columns-1.tsx`)

> A vertically auto-scrolling column of testimonial cards.
> 
> **Technique:** Renders testimonials **twice** (cloned array) and uses `translateY: "-50%"` animation — when the first copy scrolls fully out, the second copy seamlessly takes its place (infinite loop illusion).

---

## ✨ Animations & Interactivity

### 🎭 Framer Motion Patterns Used Throughout

> | Pattern | Where Used |
> |---|---|
> | `initial → animate` entry | Navbar links slide down, hero buttons fade in |
> | `whileInView` viewport trigger | Every section header + card fades up when scrolled into view |
> | `whileHover / whileTap` | Buttons, cards, social icons, navbar logo |
> | `AnimatePresence` | Mobile menu open/close icon swap |
> | `useScroll + useTransform` | Featured event cards parallax scroll effect |
> | `staggerChildren` | Events grid cards stagger in sequentially |
> | Spring physics | Mobile menu slide-in, navbar logo rotation |

### 🖱️ Global Interactions

> - **Smooth scroll** — `html { scroll-behavior: smooth }` for anchor link jumps
> - **Scroll-aware navbar** — transparent → glassmorphism on scroll past 50px
> - **Hero honeycomb** — mouse-reactive golden glow on hexagons
> - **Gallery hover** — image zoom, caption reveal, red ring glow

---

## 🎆 Custom Visual Effects

### 🍯 Interactive Honeycomb (Hero)
> - Pure Canvas2D API — no library
> - Grid: staggered hex rows, 40px hex radius
> - Mouse proximity glow: 150px influence radius
> - Neighbor spread: glow propagates to adjacent hexes at 40% strength
> - Lerp interpolation (`factor: 0.08`) for smooth glow transitions
> - Rebuilt on window resize

### 🔥 Ember Particles (Hero)
> - Pure Canvas2D API — no library
> - 60 particles, each with:
>   - Random warm color (`#FF6A00`, `#FF4500`, `#D4A017`, `#FF2A2A`, `#FFA500`)
>   - Upward velocity + sine-wave horizontal drift
>   - Radial gradient glow (outer halo + solid core)
>   - Lifetime-based opacity fade
>   - Flicker effect via sine wave modulation

### 🌋 Fire Background (All Sections)
> - Framer Motion div-based floating flame particles
> - Used as section background in: EventsSection, FeaturedEvents, GallerySection, HowItWorks, TestimonialsSection, HostCTA, Footer
> - Two ambient glow blobs (orange center + red bottom)
> - 25 flame-shaped particles with `easeIn` rise

### 🟦 CSS Honeycomb Pattern
> Two additional CSS-only honeycomb patterns are defined in `globals.css`:
> - `.honeycomb-bg` — SVG stroke honeycomb with orange glow
> - `.hero-honeycomb-grid` — Isometric 3D cube wireframe pattern

---

## 📊 Event Data Model

> Currently all event data is **hardcoded arrays** in component files. No database or API is connected. The implied event schema is:
> 
> ```typescript
> interface Event {
>   title: string          // "Neon Nights: Electronic Music Festival"
>   date: string           // "Mar 28, 2026"
>   location: string       // "Downtown LA"
>   attendees: number      // 2500
>   image: string          // Unsplash URL
>   category: string       // "Music" | "Nightlife" | "Social" | "Gaming" | "Art" | "Networking"
>   featured?: boolean     // flags as a promoted event
>   // FeaturedEvents also include:
>   description?: string   // longer event description
>   tags?: string[]        // ["Festival", "EDM", "Multi-day"]
> }
> ```

---

## 🔗 Navigation & Routing

> The site currently uses **anchor-based single-page navigation** via `href="#section-id"` links. The only real Next.js route is `/` (home page).
> 
> | Link | Destination |
> |---|---|
> | `#discover` | Events Section |
> | `#gallery` | Gallery Section |
> | `#testimonials` | Testimonials Section |
> | `#about` | How It Works Section |
> | `#host` | Host CTA Section |
> | `/host` | Host signup page (not built yet — stub route) |
> | `#learn` | Learn More anchor (stub) |
> | `#pricing`, `#careers`, etc. | All stubs/placeholders |

---

## ✅ Currently Implemented vs. 🚧 Planned Features

### ✅ Implemented (Front-End Only)

> - [x] Full responsive single-page website
> - [x] Animated navbar with scroll-aware glass effect + mobile menu
> - [x] Hero section with interactive canvas honeycomb + ember particles
> - [x] Trending events grid with category filter UI (visual only)
> - [x] Featured events with parallax scroll and optimized image heights
> - [x] Masonry photo gallery with hover effects
> - [x] How It Works 3-step explainer with reduced flame intensity
> - [x] Testimonials auto-scroll columns
> - [x] Host CTA with benefits grid
> - [x] Footer with newsletter input + social links
> - [x] Glassmorphism design system with consistent `rounded-[2rem]` section wrappers
> - [x] Full dark mode (enforced via `<html class="dark">`)
> - [x] Vercel Analytics integration
> - [x] Responsive design (mobile, tablet, desktop) with optimized spacing and typography

### 🚧 Not Yet Built (Stubs / Planned)

> - [ ] **Event filtering** — category tabs change UI state but no actual filter logic
> - [ ] **"View Event"** page — individual event detail page
> - [ ] **"View All Events"** page — paginated event listing
> - [ ] **Host dashboard** — `/host` route with event creation form
> - [ ] **User auth** — sign in / sign up (no auth system present)
> - [ ] **Ticket/RSVP system** — no booking flow
> - [ ] **Backend/Database** — no API, all data is static
> - [ ] **Newsletter form** — email input present, no submission handler
> - [ ] **Pricing page** — footer link, no route
> - [ ] **Real testimonials** — current ones are AI-generated ERP placeholder text
> - [ ] **Social media links** — all `href="#"` placeholders
> - [ ] **Search** — no search functionality

---

## ⚠️ Known Quirks & Development Notes

### 1️⃣ Testimonials Content Mismatch
> The testimonials are clearly **copied from an ERP product** ("This ERP revolutionized our operations..."). They need to be updated to reflect actual party/event platform user stories.

### 2️⃣ Category Filter is Visual-Only
> Clicking category tabs updates `activeCategory` state and changes button styling, but **all 6 events always render**. The filter logic needs to be implemented.

### 3️⃣ `like` / `heart` State Is Not Persistent
> The heart/like button on event cards is local React state — clicking `♥` only affects that render session and resets on page refresh.

### 4️⃣ All External Links Are Stubs
> Every link in the footer (Pricing, Careers, Blog, etc.) and social media buttons point to `"#"` — none of the sub-pages are built.

### 5️⃣ `hero.tsx` and `honeycomb-canvas.tsx` Are Unused
> There appear to be two older/alternative hero components (`hero.tsx`, `honeycomb-canvas.tsx`, `flame-effect.tsx`) in the components directory. These are **not imported in `page.tsx`** and represent earlier iterations.

### 6️⃣ `3d-testimonails.tsx` (Typo in Filename)
> The file is named `3d-testimonails.tsx` (typo: "testimonails" instead of "testimonials"). It exists in `/components/ui/` but is not used in the current main testimonials section.

### 7️⃣ PowerShell Execution Policy
> On this machine, `npm run dev` must be run via `cmd /c npm run dev` due to a PowerShell execution policy restriction that blocks `.ps1` scripts. The server runs fine once started through `cmd`.

### 8️⃣ Port Conflict
> Port 3000 is in use by another process. The Next.js dev server automatically uses **port 3005**. Access the site at `http://localhost:3005`.

---

## 🚀 Running Locally

> ```bash
> # Run the dev server (must use cmd not PowerShell directly)
> cmd /c npm run dev
> 
> # Available at:
> # http://localhost:3005  (or next available port)
> ```

---

<div align="center">
  <small><i>Documentation last updated: March 2026</i></small><br>
  <small><i>Codebase state: Next.js 16.1.6 + React 19 + Tailwind v4 + Framer Motion 12</i></small>
</div>
