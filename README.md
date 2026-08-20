# Prop Value

A property valuation platform for DHA Multan, built with Next.js (App Router), Prisma, PostgreSQL, and NextAuth. Users can estimate the market value of plots, houses, and commercial properties based on configurable sector/property pricing rules managed through an admin panel.

## Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 (CSS-first `@theme` config in `app/globals.css`), shadcn/Base UI components in `components/ui/`
- **Database**: PostgreSQL via Prisma ORM
- **Auth**: NextAuth (Google OAuth + email/password credentials)
- **Media uploads**: Cloudinary (profile photos)

## Getting started

### 1. Environment variables

Create a `.env` file in the project root with:

```bash
DATABASE_URL=          # PostgreSQL connection string
NEXTAUTH_URL=          # e.g. http://localhost:3000 in development
NEXTAUTH_SECRET=       # random string, e.g. `openssl rand -base64 32`
GOOGLE_CLIENT_ID=      # Google OAuth client ID
GOOGLE_CLIENT_SECRET=  # Google OAuth client secret

# Required for profile photo uploads — without these, uploads return a 503
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database

Apply migrations and seed reference pricing data (market rates, luxury/road rate multipliers, amenity values):

```bash
npx prisma migrate deploy   # apply pending migrations
npx prisma db seed          # seed MarketRate / LuxuryRate / RoadRate / AmenityRate
```

The seed script and the estimate form both source their sector/property-type/size/amenity/luxury options from `lib/propertyOptions.ts` — this is the single source of truth. If you add a new property type or size, update it there (and add matching priced rows in `prisma/seed.ts`) so the estimate form never offers a combination that isn't priced.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `app/(auth)/` — login/register pages (route group, not part of the URL path)
- `app/dashboard/` — authenticated user area (estimate form, history, compare, market insights, profile, settings)
- `app/admin/` — admin panel (users, estimates, market/luxury/road rates, amenities, settings) — gated by `role: "ADMIN"`
- `app/api/` — REST-style API routes (estimate creation, profile, auth)
- `lib/valuation.ts` — the pricing engine: looks up a base `MarketRate` and applies plot-feature, luxury, and amenity multipliers
- `lib/propertyOptions.ts` — canonical sector/property-type/size/amenity/luxury option lists
- `lib/auth/guards.ts` — `requireAdmin()` / `requireUser()` helpers used by Server Actions and API routes
- `prisma/schema.prisma` — data model
- `prisma/seed.ts` — reference pricing data

## Notes

- Admin Server Actions (`app/admin/*/actions.ts`) are guarded server-side via `requireAdmin()` — the UI-level redirect in `app/admin/layout.tsx` is not sufficient on its own since Server Actions are independently callable endpoints.
- Rate limiting on `/api/auth/register`, `/api/estimate`, and `/api/profile/upload` is in-memory and per-process — fine for a single instance, but won't coordinate across multiple serverless instances without adding a shared store (e.g. Redis/Upstash).
