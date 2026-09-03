# Platform 9

A missed-connections board: post about a fleeting real-world encounter, let people claim it, and message once they do.

## Stack

- **React 19 + TypeScript + Vite** — UI and build tooling
- **Tailwind CSS v4** — styling, via the `@tailwindcss/vite` plugin (no separate PostCSS config needed)
- **Radix UI + class-variance-authority** (the shadcn/ui pattern) — accessible, unstyled primitives in
  `src/components/ui/` (`Dialog`, `Tabs`, `Avatar`, `Button`, ...) with our own brand skin applied via variants,
  rather than a black-box component library
- **Supabase** — Postgres database + realtime subscriptions. No auth yet (see below).
- **oxlint** + **Prettier** — linting and formatting

## Identity (no auth yet)

There's no login. Each browser mints itself one or more self-issued "identities" (`src/lib/identity.ts`), kept in
`localStorage` and mirrored into the `profiles` table so other viewers can see a name/avatar/bio. The **identities**
button in the header lets you save multiple identities in one browser, handy for testing both sides of a claim
without a second device.

This is a deliberate placeholder. Because there's no real user identity, the database's row-level security
policies are wide open (anyone can read/write). Before this goes further than friends testing it, swap in
[Supabase Auth](https://supabase.com/docs/guides/auth) (email magic link is the easiest fit) and tighten the RLS
policies in `supabase/migrations/0001_init.sql` to check `auth.uid()` instead.

## Getting started

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase SQL editor, run `supabase/migrations/0001_init.sql`.
3. Copy `.env.example` to `.env.local` and fill in your project's URL and anon key (Project Settings → API).
4. Install and run:

   ```bash
   npm install
   npm run dev
   ```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — typecheck and build for production
- `npm run lint` — run oxlint
- `npm run format` — run Prettier

## Project layout

```
src/
  components/   presentational + form components
  hooks/        Supabase-backed data hooks (usePosts, useClaims, useProfiles, useThread, useIdentity)
  lib/          supabase client, identity/localStorage helpers, image resizing, time formatting
  types.ts      shared domain types (Post, Claim, Profile, Thread, ...)
supabase/
  migrations/   SQL schema + RLS policies
```

## Roadmap

- Real auth (Supabase Auth, email magic link) to replace the identity hack
- Geo check-in: verify a poster was actually at an event/location before they can post about it
- Move avatar photos from inline base64 to Supabase Storage once there's enough volume to matter
