# 🔥 HELLHIVE — Complete Backend Architecture (Supabase)

> **Backend Provider:** [Supabase](https://supabase.com) (Postgres + Auth + Storage + Edge Functions + Realtime)
> **Frontend:** Next.js 16 + React 19 + TypeScript
> **Integration:** `@supabase/supabase-js` + `@supabase/ssr` (for Next.js server components & middleware)

---

## 📌 Table of Contents

> 1. [Architecture Overview](#-architecture-overview)
> 2. [Authentication Flow](#-authentication-flow)
> 3. [User Roles & Permissions](#-user-roles--permissions)
> 4. [Database Schema](#-database-schema)
> 5. [Row Level Security (RLS) Policies](#-row-level-security-rls-policies)
> 6. [KYC Verification System](#-kyc-verification-system)
> 7. [Supabase Storage](#-supabase-storage)
> 8. [Edge Functions](#-edge-functions)
> 9. [Realtime Subscriptions](#-realtime-subscriptions)
> 10. [Admin Panel & Super Admin Controls](#-admin-panel--super-admin-controls)
> 11. [API Routes (Next.js)](#-api-routes-nextjs)
> 12. [Environment Variables](#-environment-variables)
> 13. [Security Checklist](#-security-checklist)
> 14. [Deployment & Infrastructure](#-deployment--infrastructure)

---

## 🏗️ Architecture Overview

```text
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js 16)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────┐   │
│  │  Pages   │  │Components│  │  Hooks   │  │  Middleware    │   │
│  │ (SSR/CSR)│  │ (React)  │  │(useAuth) │  │(auth guard)   │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬────────┘   │
│       └──────────────┴─────────────┴───────────────┘            │
│                           │                                      │
│                    @supabase/ssr                                  │
│                    @supabase/supabase-js                          │
└───────────────────────────┬──────────────────────────────────────┘
                            │ HTTPS
┌───────────────────────────▼──────────────────────────────────────┐
│                      SUPABASE CLOUD                              │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │   Auth       │  │  Database    │  │  Storage               │  │
│  │  (GoTrue)    │  │ (PostgreSQL) │  │  (S3-compatible)       │  │
│  │              │  │              │  │                         │  │
│  │ • Google     │  │ • profiles   │  │ • avatars/             │  │
│  │   OAuth      │  │ • events     │  │ • event-images/        │  │
│  │ • Phone OTP  │  │ • rsvps      │  │ • kyc-documents/       │  │
│  │ • Email      │  │ • reviews    │  │ • gallery/             │  │
│  │   Magic Link │  │ • kyc_docs   │  │                         │  │
│  │ • JWT tokens │  │ • admin_logs │  │                         │  │
│  └──────────────┘  │ • RLS ✅     │  └───────────────────────┘  │
│                    └──────────────┘                               │
│  ┌──────────────┐  ┌──────────────┐                              │
│  │Edge Functions│  │  Realtime    │                              │
│  │ (Deno)       │  │ (WebSocket) │                              │
│  │              │  │              │                              │
│  │ • KYC review │  │ • Event      │                              │
│  │ • Notifs     │  │   updates    │                              │
│  │ • Webhooks   │  │ • RSVP count │                              │
│  └──────────────┘  └──────────────┘                              │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication Flow

HellHive uses a **multi-step authentication** system. Users sign in via Google OAuth, then must verify their phone number, and optionally complete KYC for hosting privileges.

### Step 1: Google OAuth Sign-In (Primary)

```text
User clicks "Sign In with Google"
        │
        ▼
supabase.auth.signInWithOAuth({ provider: 'google' })
        │
        ▼
Google OAuth consent screen → redirect back to HellHive
        │
        ▼
Supabase creates user in auth.users
        │
        ▼
Database trigger → creates row in public.profiles
        │
        ▼
Check: is phone verified? → NO → redirect to /verify-phone
                            YES → check KYC → proceed to app
```

**Supabase Dashboard Config:**
- **Authentication → Providers → Google:** Enable, add Client ID & Client Secret from Google Cloud Console
- **Redirect URL:** `https://yourdomain.com/auth/callback`
- **Allowed redirect URLs:** `http://localhost:3005/auth/callback` (dev), `https://hellhive.com/auth/callback` (prod)

**Next.js Auth Callback Route** (`app/auth/callback/route.ts`):
```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Check if phone is verified
      const { data: { user } } = await supabase.auth.getUser()
      if (!user?.phone_confirmed_at) {
        return NextResponse.redirect(`${origin}/verify-phone`)
      }
      return NextResponse.redirect(`${origin}${next}`)
    }
  }
  return NextResponse.redirect(`${origin}/auth/error`)
}
```

### Step 2: Phone Verification (Required After Google Sign-In)

```text
User enters phone number
        │
        ▼
supabase.auth.updateUser({ phone: '+91XXXXXXXXXX' })
        │
        ▼
Supabase sends OTP via SMS (Twilio / MessageBird)
        │
        ▼
User enters 6-digit OTP
        │
        ▼
supabase.auth.verifyOtp({ phone, token, type: 'phone_change' })
        │
        ▼
phone_confirmed_at is set in auth.users
        │
        ▼
Profile updated: phone_verified = true
```

**Supabase Dashboard Config:**
- **Authentication → Phone Auth:** Enable
- **SMS Provider:** Twilio (recommended) — configure Account SID, Auth Token, Messaging Service SID
- **OTP Length:** 6 digits
- **OTP Expiry:** 60 seconds

### Step 3: Email Verification (Auto from Google OAuth)

Since users sign in via Google, their email is **automatically verified** by Google. Supabase marks `email_confirmed_at` upon OAuth completion. No extra step needed.

### Authentication State Diagram

```text
┌──────────┐    Google     ┌──────────────┐   Phone OTP   ┌───────────────┐
│  GUEST   │───OAuth──────▶│ EMAIL_ONLY   │──verified────▶│  FULLY_VERIFIED│
│(no auth) │               │(no phone yet)│               │  (user/host)   │
└──────────┘               └──────────────┘               └───────┬───────┘
                                                                  │
                                                           Submit KYC docs
                                                                  │
                                                          ┌───────▼───────┐
                                                          │  KYC_PENDING  │
                                                          │(awaiting admin)│
                                                          └───────┬───────┘
                                                                  │
                                                        Admin approves/rejects
                                                                  │
                                                 ┌────────────────┼────────────────┐
                                                 ▼                                 ▼
                                          ┌─────────────┐                  ┌──────────────┐
                                          │ KYC_APPROVED│                  │ KYC_REJECTED │
                                          │ (can host)  │                  │ (resubmit)   │
                                          └─────────────┘                  └──────────────┘
```

---

## 👥 User Roles & Permissions

### Three Core Roles

| Role | Description | Privileges |
|---|---|---|
| **`user`** | Default role after signup + phone verification | Browse events, RSVP, leave reviews, save favorites, manage own profile |
| **`host`** | Upgraded after KYC approval | All user privileges + create/edit/delete own events, view event analytics, manage attendees |
| **`admin`** | Manually assigned by super admin (you) | Full platform control — approve/reject KYC, ban/suspend users/hosts, edit/delete any event, view all data, manage roles |

### Super Admin

> **You** are the **super admin**. Your Google account email is hardcoded as the initial admin. You can promote any other Gmail to admin via the admin panel.

**How super admin is set:**
```sql
-- Run ONCE after your first Google sign-in to make yourself admin
UPDATE public.profiles
SET role = 'admin', is_super_admin = true
WHERE email = 'YOUR_EMAIL@gmail.com';
```

### Role Hierarchy & Inheritance

```text
super_admin (you)
    │
    ├── Can do EVERYTHING
    ├── Can create/remove other admins
    ├── Can ban/suspend any user or host
    ├── Can approve/reject any KYC
    ├── Can delete any event
    └── Cannot be demoted (protected)

admin
    │
    ├── Can approve/reject KYC applications
    ├── Can ban/suspend users and hosts
    ├── Can edit/remove any event
    ├── Can view all platform data & analytics
    └── Cannot create other admins (only super_admin can)

host (KYC approved)
    │
    ├── Can create, edit, delete OWN events
    ├── Can view analytics for OWN events
    ├── Can manage attendees for OWN events
    └── All user privileges

user (phone verified)
    │
    ├── Can browse & search events
    ├── Can RSVP / buy tickets
    ├── Can leave reviews
    ├── Can save favorites
    └── Can manage own profile
```

---

## 🗄️ Database Schema

### Entity Relationship Diagram

```text
auth.users (Supabase managed)
    │
    │ 1:1
    ▼
┌──────────────────┐       ┌──────────────────┐
│    profiles       │       │   kyc_documents   │
│──────────────────│       │──────────────────│
│ id (FK→auth.users)│◄─────│ user_id (FK)      │
│ email             │  1:N  │ document_type     │
│ full_name         │       │ document_url      │
│ phone             │       │ status            │
│ avatar_url        │       │ reviewed_by       │
│ role              │       └──────────────────┘
│ phone_verified    │
│ kyc_status        │       ┌──────────────────┐
│ is_banned         │       │   events          │
│ is_super_admin    │       │──────────────────│
│ bio               │  1:N  │ id                │
│ created_at        │◄──────│ host_id (FK)      │
│ updated_at        │       │ title             │
└──────────────────┘       │ description       │
         │                  │ category          │
         │                  │ date_start        │
         │                  │ date_end          │
         │                  │ location          │
         │                  │ coordinates       │
         │                  │ max_attendees     │
         │                  │ ticket_price      │
         │                  │ cover_image_url   │
         │                  │ gallery_urls[]    │
         │                  │ tags[]            │
         │                  │ status            │
         │                  │ is_featured       │
         │                  │ created_at        │
         │                  └────────┬─────────┘
         │                           │
         │      ┌────────────────────┼────────────────────┐
         │      │                    │                     │
         │      ▼                    ▼                     ▼
         │ ┌──────────┐    ┌──────────────┐    ┌──────────────┐
         │ │  rsvps    │    │   reviews     │    │ event_images │
         │ │──────────│    │──────────────│    │──────────────│
         └▶│ user_id   │    │ user_id (FK) │    │ event_id(FK) │
           │ event_id  │    │ event_id(FK) │    │ image_url    │
           │ status    │    │ rating       │    │ caption      │
           │ ticket_qty│    │ comment      │    │ sort_order   │
           │ created_at│    │ created_at   │    │ created_at   │
           └──────────┘    └──────────────┘    └──────────────┘

         ┌──────────────────┐    ┌──────────────────┐
         │   favorites       │    │   admin_logs      │
         │──────────────────│    │──────────────────│
         │ user_id (FK)      │    │ admin_id (FK)     │
         │ event_id (FK)     │    │ action            │
         │ created_at        │    │ target_type       │
         └──────────────────┘    │ target_id         │
                                  │ details (JSONB)   │
         ┌──────────────────┐    │ created_at        │
         │  notifications    │    └──────────────────┘
         │──────────────────│
         │ user_id (FK)      │
         │ type              │
         │ title             │
         │ message           │
         │ is_read           │
         │ data (JSONB)      │
         │ created_at        │
         └──────────────────┘
```

### Complete SQL Schema

```sql
-- ============================================================
-- 1. PROFILES (extends auth.users)
-- ============================================================
CREATE TABLE public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT UNIQUE NOT NULL,
  full_name     TEXT,
  phone         TEXT,
  avatar_url    TEXT,
  bio           TEXT,
  role          TEXT NOT NULL DEFAULT 'user'
                CHECK (role IN ('user', 'host', 'admin')),
  phone_verified BOOLEAN DEFAULT FALSE,
  kyc_status    TEXT DEFAULT 'none'
                CHECK (kyc_status IN ('none', 'pending', 'approved', 'rejected')),
  is_banned     BOOLEAN DEFAULT FALSE,
  ban_reason    TEXT,
  banned_by     UUID REFERENCES public.profiles(id),
  banned_at     TIMESTAMPTZ,
  is_super_admin BOOLEAN DEFAULT FALSE,
  last_seen     TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- 2. EVENTS
-- ============================================================
CREATE TABLE public.events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT,
  category        TEXT NOT NULL
                  CHECK (category IN (
                    'music', 'nightlife', 'social', 'gaming',
                    'art', 'networking', 'birthday', 'house_party', 'other'
                  )),
  date_start      TIMESTAMPTZ NOT NULL,
  date_end        TIMESTAMPTZ,
  location_name   TEXT NOT NULL,
  location_address TEXT,
  city            TEXT NOT NULL,
  state           TEXT,
  country         TEXT DEFAULT 'India',
  latitude        DOUBLE PRECISION,
  longitude       DOUBLE PRECISION,
  max_attendees   INTEGER,
  current_attendees INTEGER DEFAULT 0,
  ticket_price    DECIMAL(10,2) DEFAULT 0.00,
  currency        TEXT DEFAULT 'INR',
  cover_image_url TEXT,
  gallery_urls    TEXT[] DEFAULT '{}',
  tags            TEXT[] DEFAULT '{}',
  status          TEXT DEFAULT 'draft'
                  CHECK (status IN ('draft', 'published', 'cancelled', 'completed', 'suspended')),
  is_featured     BOOLEAN DEFAULT FALSE,
  is_private      BOOLEAN DEFAULT FALSE,
  min_age         INTEGER DEFAULT 18,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Index for common queries
CREATE INDEX idx_events_category ON public.events(category);
CREATE INDEX idx_events_city ON public.events(city);
CREATE INDEX idx_events_date ON public.events(date_start);
CREATE INDEX idx_events_status ON public.events(status);
CREATE INDEX idx_events_host ON public.events(host_id);

-- ============================================================
-- 3. RSVPs / TICKET BOOKINGS
-- ============================================================
CREATE TABLE public.rsvps (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_id    UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  status      TEXT DEFAULT 'confirmed'
              CHECK (status IN ('confirmed', 'cancelled', 'waitlisted', 'attended')),
  ticket_qty  INTEGER DEFAULT 1,
  total_paid  DECIMAL(10,2) DEFAULT 0.00,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, event_id)
);

-- Auto-increment attendee count
CREATE OR REPLACE FUNCTION public.update_attendee_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'confirmed' THEN
    UPDATE public.events SET current_attendees = current_attendees + NEW.ticket_qty
    WHERE id = NEW.event_id;
  ELSIF TG_OP = 'UPDATE' AND OLD.status = 'confirmed' AND NEW.status = 'cancelled' THEN
    UPDATE public.events SET current_attendees = current_attendees - OLD.ticket_qty
    WHERE id = NEW.event_id;
  ELSIF TG_OP = 'DELETE' AND OLD.status = 'confirmed' THEN
    UPDATE public.events SET current_attendees = current_attendees - OLD.ticket_qty
    WHERE id = OLD.event_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER rsvp_attendee_count
  AFTER INSERT OR UPDATE OR DELETE ON public.rsvps
  FOR EACH ROW
  EXECUTE FUNCTION public.update_attendee_count();

-- ============================================================
-- 4. REVIEWS
-- ============================================================
CREATE TABLE public.reviews (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_id    UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  rating      INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment     TEXT,
  is_hidden   BOOLEAN DEFAULT FALSE,    -- admin can hide inappropriate reviews
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, event_id)
);

-- ============================================================
-- 5. FAVORITES / SAVED EVENTS
-- ============================================================
CREATE TABLE public.favorites (
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_id    UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, event_id)
);

-- ============================================================
-- 6. KYC DOCUMENTS
-- ============================================================
CREATE TABLE public.kyc_documents (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  document_type   TEXT NOT NULL
                  CHECK (document_type IN (
                    'aadhaar', 'pan_card', 'passport', 'drivers_license',
                    'voter_id', 'selfie_with_id', 'other'
                  )),
  document_url    TEXT NOT NULL,           -- Supabase Storage URL (private bucket)
  status          TEXT DEFAULT 'pending'
                  CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  reviewed_by     UUID REFERENCES public.profiles(id),
  reviewed_at     TIMESTAMPTZ,
  submitted_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 7. NOTIFICATIONS
-- ============================================================
CREATE TABLE public.notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type        TEXT NOT NULL
              CHECK (type IN (
                'rsvp_confirmed', 'event_reminder', 'event_cancelled',
                'kyc_approved', 'kyc_rejected', 'account_banned',
                'role_changed', 'new_review', 'system', 'admin_message'
              )),
  title       TEXT NOT NULL,
  message     TEXT,
  is_read     BOOLEAN DEFAULT FALSE,
  data        JSONB DEFAULT '{}',          -- flexible metadata
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON public.notifications(user_id, is_read);

-- ============================================================
-- 8. ADMIN AUDIT LOG
-- ============================================================
CREATE TABLE public.admin_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id    UUID NOT NULL REFERENCES public.profiles(id),
  action      TEXT NOT NULL,               -- 'ban_user', 'approve_kyc', 'delete_event', etc.
  target_type TEXT NOT NULL,               -- 'user', 'event', 'review', 'kyc'
  target_id   UUID NOT NULL,
  details     JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_admin_logs_admin ON public.admin_logs(admin_id);
CREATE INDEX idx_admin_logs_action ON public.admin_logs(action);

-- ============================================================
-- 9. NEWSLETTER SUBSCRIBERS
-- ============================================================
CREATE TABLE public.newsletter_subscribers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  subscribed  BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🛡️ Row Level Security (RLS) Policies

> **Every table has RLS enabled.** No data is accessible without a valid policy.

```sql
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- HELPER: Check if current user is admin
-- ============================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin' AND is_banned = FALSE
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- HELPER: Check if current user is super admin
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_super_admin = TRUE AND is_banned = FALSE
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ============================================================
-- PROFILES POLICIES
-- ============================================================
-- Anyone can view non-banned profiles (public info)
CREATE POLICY "Public profiles are viewable"
  ON public.profiles FOR SELECT
  USING (is_banned = FALSE OR id = auth.uid() OR public.is_admin());

-- Users can update their own profile (except role, is_banned, is_super_admin)
CREATE POLICY "Users update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
    AND is_banned = (SELECT is_banned FROM public.profiles WHERE id = auth.uid())
    AND is_super_admin = (SELECT is_super_admin FROM public.profiles WHERE id = auth.uid())
  );

-- Admins can update any profile (ban, role changes, etc.)
CREATE POLICY "Admins manage all profiles"
  ON public.profiles FOR UPDATE
  USING (public.is_admin());

-- ============================================================
-- EVENTS POLICIES
-- ============================================================
-- Published events visible to everyone
CREATE POLICY "Published events are public"
  ON public.events FOR SELECT
  USING (status = 'published' OR host_id = auth.uid() OR public.is_admin());

-- Hosts can create events (only if role = 'host' or 'admin')
CREATE POLICY "Hosts create events"
  ON public.events FOR INSERT
  WITH CHECK (
    auth.uid() = host_id
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND role IN ('host', 'admin')
      AND is_banned = FALSE
      AND phone_verified = TRUE
    )
  );

-- Hosts can update/delete their own events
CREATE POLICY "Hosts manage own events"
  ON public.events FOR UPDATE
  USING (host_id = auth.uid() OR public.is_admin());

CREATE POLICY "Hosts delete own events"
  ON public.events FOR DELETE
  USING (host_id = auth.uid() OR public.is_admin());

-- ============================================================
-- RSVPs POLICIES
-- ============================================================
CREATE POLICY "Users view own RSVPs"
  ON public.rsvps FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin()
    OR EXISTS (SELECT 1 FROM public.events WHERE id = event_id AND host_id = auth.uid()));

CREATE POLICY "Verified users can RSVP"
  ON public.rsvps FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND phone_verified = TRUE AND is_banned = FALSE
    )
  );

CREATE POLICY "Users cancel own RSVPs"
  ON public.rsvps FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users delete own RSVPs"
  ON public.rsvps FOR DELETE
  USING (user_id = auth.uid() OR public.is_admin());

-- ============================================================
-- REVIEWS POLICIES
-- ============================================================
CREATE POLICY "Reviews are public"
  ON public.reviews FOR SELECT
  USING (is_hidden = FALSE OR user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Verified users write reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id AND EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND phone_verified = TRUE AND is_banned = FALSE
  ));

CREATE POLICY "Users edit own reviews"
  ON public.reviews FOR UPDATE
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Users delete own reviews"
  ON public.reviews FOR DELETE
  USING (user_id = auth.uid() OR public.is_admin());

-- ============================================================
-- FAVORITES POLICIES
-- ============================================================
CREATE POLICY "Users manage own favorites"
  ON public.favorites FOR ALL
  USING (user_id = auth.uid());

-- ============================================================
-- KYC DOCUMENTS POLICIES
-- ============================================================
-- Users can see their own KYC docs; admins can see all
CREATE POLICY "Users view own KYC"
  ON public.kyc_documents FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Users submit KYC"
  ON public.kyc_documents FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Only admins can update KYC status (approve/reject)
CREATE POLICY "Admins review KYC"
  ON public.kyc_documents FOR UPDATE
  USING (public.is_admin());

-- ============================================================
-- NOTIFICATIONS POLICIES
-- ============================================================
CREATE POLICY "Users view own notifications"
  ON public.notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users mark own notifications read"
  ON public.notifications FOR UPDATE
  USING (user_id = auth.uid());

-- ============================================================
-- ADMIN LOGS POLICIES
-- ============================================================
CREATE POLICY "Only admins view logs"
  ON public.admin_logs FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins insert logs"
  ON public.admin_logs FOR INSERT
  WITH CHECK (public.is_admin());

-- ============================================================
-- NEWSLETTER POLICIES
-- ============================================================
CREATE POLICY "Anyone can subscribe"
  ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Admins view subscribers"
  ON public.newsletter_subscribers FOR SELECT
  USING (public.is_admin());
```

---

## 📋 KYC Verification System

### Flow

```text
1. User requests to become a host → navigates to /become-host
2. User uploads government ID (Aadhaar/PAN/Passport) + selfie with ID
3. Documents stored in private Supabase Storage bucket: kyc-documents/
4. KYC record created with status = 'pending'
5. Profile kyc_status updated to 'pending'
6. Admin receives notification in admin panel
7. Admin reviews documents manually
8. Admin approves → profile.role = 'host', profile.kyc_status = 'approved'
   Admin rejects → profile.kyc_status = 'rejected', rejection_reason set
9. User receives notification of result
10. If rejected, user can resubmit with new documents
```

### Required KYC Documents

| Document | Required | Description |
|---|---|---|
| Government ID | ✅ Yes | Aadhaar, PAN, Passport, Voter ID, or Driver's License |
| Selfie with ID | ✅ Yes | Photo of user holding their government ID |

### Admin KYC Review (Edge Function)

```typescript
// supabase/functions/review-kyc/index.ts
import { createClient } from '@supabase/supabase-js'

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!  // service role for admin ops
  )

  const { kyc_id, action, reason, admin_id } = await req.json()

  // Verify admin role
  const { data: admin } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', admin_id)
    .single()

  if (admin?.role !== 'admin') {
    return new Response('Unauthorized', { status: 403 })
  }

  const { data: kyc } = await supabase
    .from('kyc_documents')
    .select('user_id')
    .eq('id', kyc_id)
    .single()

  if (action === 'approve') {
    // Update KYC status
    await supabase.from('kyc_documents').update({
      status: 'approved', reviewed_by: admin_id, reviewed_at: new Date().toISOString()
    }).eq('id', kyc_id)

    // Upgrade user to host
    await supabase.from('profiles').update({
      role: 'host', kyc_status: 'approved'
    }).eq('id', kyc!.user_id)

    // Send notification
    await supabase.from('notifications').insert({
      user_id: kyc!.user_id,
      type: 'kyc_approved',
      title: '🎉 KYC Approved!',
      message: 'Your identity has been verified. You can now host events on HellHive!'
    })
  } else if (action === 'reject') {
    await supabase.from('kyc_documents').update({
      status: 'rejected', rejection_reason: reason,
      reviewed_by: admin_id, reviewed_at: new Date().toISOString()
    }).eq('id', kyc_id)

    await supabase.from('profiles').update({ kyc_status: 'rejected' }).eq('id', kyc!.user_id)

    await supabase.from('notifications').insert({
      user_id: kyc!.user_id,
      type: 'kyc_rejected',
      title: 'KYC Not Approved',
      message: `Your KYC was not approved. Reason: ${reason}. Please resubmit.`
    })
  }

  // Log admin action
  await supabase.from('admin_logs').insert({
    admin_id, action: `kyc_${action}`, target_type: 'kyc', target_id: kyc_id,
    details: { reason }
  })

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
```

---

## 📦 Supabase Storage

### Bucket Configuration

| Bucket | Access | Purpose |
|---|---|---|
| `avatars` | **Public** | User profile pictures |
| `event-images` | **Public** | Event cover images & gallery photos |
| `kyc-documents` | **Private** | KYC identity documents (admin-only access) |
| `gallery` | **Public** | Platform gallery / marketing images |

### Storage Policies (SQL)

```sql
-- AVATARS: Users upload their own avatar
CREATE POLICY "Users upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Avatars are public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- EVENT IMAGES: Hosts upload images into their event folder
CREATE POLICY "Hosts upload event images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'event-images'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('host', 'admin')
    )
  );

CREATE POLICY "Event images are public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'event-images');

-- KYC DOCUMENTS: Only the uploader and admins can see
CREATE POLICY "Users upload own KYC docs"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'kyc-documents'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "KYC docs viewable by owner and admins"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'kyc-documents'
    AND (
      (storage.foldername(name))[1] = auth.uid()::text
      OR public.is_admin()
    )
  );
```

---

## ⚡ Edge Functions

| Function | Trigger | Purpose |
|---|---|---|
| `review-kyc` | Admin action | Approve/reject KYC, update roles, send notification |
| `send-notification` | Database trigger | Send push/email notifications to users |
| `event-reminder` | Cron (daily) | Send reminders 24h before events to RSVP'd users |
| `ban-user` | Admin action | Ban user, cancel their RSVPs, suspend their events |
| `promote-admin` | Super admin action | Promote a user to admin role (super admin only) |
| `newsletter-subscribe` | Public form | Handle newsletter email submissions |

---

## 📡 Realtime Subscriptions

Enable realtime on key tables for live updates:

```sql
-- Enable realtime for these tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.rsvps;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
```

**Frontend Usage:**
```typescript
// Live RSVP count on event page
supabase
  .channel('event-rsvps')
  .on('postgres_changes', {
    event: '*', schema: 'public', table: 'rsvps',
    filter: `event_id=eq.${eventId}`
  }, (payload) => {
    // Update UI with new RSVP data
  })
  .subscribe()

// Live notifications
supabase
  .channel('user-notifications')
  .on('postgres_changes', {
    event: 'INSERT', schema: 'public', table: 'notifications',
    filter: `user_id=eq.${userId}`
  }, (payload) => {
    showToast(payload.new.title)
  })
  .subscribe()
```

---

## 🔧 Admin Panel & Super Admin Controls

### Admin Dashboard Pages

| Route | Purpose |
|---|---|
| `/admin` | Dashboard overview — total users, events, revenue, pending KYCs |
| `/admin/users` | All users list — search, filter, ban/unban, change roles |
| `/admin/events` | All events — approve, feature, suspend, delete any event |
| `/admin/kyc` | Pending KYC queue — review documents, approve/reject |
| `/admin/logs` | Audit log — all admin actions with timestamps |
| `/admin/settings` | Platform settings — categories, featured events, etc. |

### Super Admin Exclusive Actions

| Action | Who Can Do It | Description |
|---|---|---|
| Promote to Admin | Super Admin only | Add another Gmail as admin |
| Remove Admin | Super Admin only | Demote admin back to user |
| Delete any data | Super Admin only | Ultimate override on everything |
| View audit logs | All admins | Full transparency |
| Platform settings | Super Admin only | System-wide config changes |

### Ban User Flow

```text
Admin clicks "Ban User" → Edge Function:
  1. Set profiles.is_banned = TRUE, ban_reason, banned_by, banned_at
  2. Cancel all active RSVPs for this user
  3. If user is a host → suspend all their events (status = 'suspended')
  4. Revoke active sessions (supabase.auth.admin.signOut(userId))
  5. Send notification to user
  6. Log action in admin_logs
```

---

## 🌐 API Routes (Next.js)

### Supabase Client Setup

```
lib/
└── supabase/
    ├── client.ts       ← Browser client (useClient)
    ├── server.ts       ← Server component client (cookies-based)
    └── middleware.ts    ← Middleware client (for auth guards)
```

**`lib/supabase/client.ts`:**
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**`lib/supabase/server.ts`:**
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

**`middleware.ts`** (root — protects routes):
```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Protected routes
  const protectedPaths = ['/dashboard', '/host', '/admin', '/become-host', '/profile']
  const adminPaths = ['/admin']

  const isProtected = protectedPaths.some(p => request.nextUrl.pathname.startsWith(p))
  const isAdmin = adminPaths.some(p => request.nextUrl.pathname.startsWith(p))

  if (isProtected && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAdmin && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
}
```

---

## 🔑 Environment Variables

```env
# .env.local

# Supabase (from Dashboard → Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...  # public anon key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...       # NEVER expose to client

# Google OAuth (from Google Cloud Console)
# → Configure in Supabase Dashboard, NOT in .env
# Supabase Dashboard → Auth → Providers → Google

# Twilio SMS (for phone OTP)
# → Configure in Supabase Dashboard → Auth → Phone → Twilio
```

> [!CAUTION]
> **NEVER expose `SUPABASE_SERVICE_ROLE_KEY`** on the client side. It bypasses ALL RLS. Use it ONLY in server-side code and Edge Functions.

---

## ✅ Security Checklist

| # | Security Measure | Status |
|---|---|---|
| 1 | RLS enabled on **all** tables | 🔴 Must Do |
| 2 | Service role key used only server-side | 🔴 Must Do |
| 3 | Google OAuth with email verification | 🔴 Must Do |
| 4 | Phone OTP verification required | 🔴 Must Do |
| 5 | KYC required before hosting | 🔴 Must Do |
| 6 | KYC documents in **private** storage bucket | 🔴 Must Do |
| 7 | Admin audit log for all admin actions | 🔴 Must Do |
| 8 | Super admin cannot be demoted (DB constraint) | 🔴 Must Do |
| 9 | Banned users can't access protected routes (middleware) | 🔴 Must Do |
| 10 | Rate limiting on auth endpoints (Supabase built-in) | ✅ Automatic |
| 11 | CORS configured to only allow your domain | 🔴 Must Do |
| 12 | Input validation with Zod on all forms | 🔴 Must Do |
| 13 | SQL injection prevention (parameterized queries via Supabase SDK) | ✅ Automatic |
| 14 | XSS prevention (React auto-escapes, CSP headers) | ✅ Automatic |
| 15 | HTTPS enforced (Vercel + Supabase) | ✅ Automatic |

---

## 🚀 Deployment & Infrastructure

| Component | Provider | Purpose |
|---|---|---|
| **Frontend** | Vercel | Next.js 16 hosting, edge middleware |
| **Backend** | Supabase (cloud) | Database, Auth, Storage, Edge Functions |
| **SMS** | Twilio (via Supabase) | Phone OTP verification |
| **Email** | Supabase built-in | Auth emails, magic links |
| **CDN** | Vercel Edge Network | Static assets, images |
| **Analytics** | Vercel Analytics | Page views, web vitals |
| **Domain** | Custom domain | hellhive.com (or similar) |

### Supabase Project Setup Steps

1. Create project at [supabase.com](https://supabase.com)
2. Run the complete SQL schema (from Section 4 above) in SQL Editor
3. Run all RLS policies (from Section 5 above) in SQL Editor
4. **Auth → Providers → Google**: Enable, paste Client ID & Secret
5. **Auth → Phone**: Enable, configure Twilio credentials
6. **Storage**: Create buckets (`avatars`, `event-images`, `kyc-documents`, `gallery`)
7. **Storage Policies**: Run storage RLS SQL (from Section 7 above)
8. Copy `SUPABASE_URL` and keys to `.env.local`
9. Run the super admin SQL update for your email
10. Deploy Edge Functions: `supabase functions deploy`

---

<div align="center">
  <small><i>Backend Architecture Document — Last Updated: March 2026</i></small><br>
  <small><i>Stack: Supabase (PostgreSQL + GoTrue + Storage + Edge Functions) + Next.js 16 + Vercel</i></small>
</div>
