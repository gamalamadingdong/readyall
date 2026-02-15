# System Patterns — Train Better Hub

## Architecture
- **Type**: Full-stack site (SSR + static pages)
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS
- **Deployment**: Vercel

## Shared Type Convention
All apps in the ecosystem use the same type structure at `src/lib/types/`:
- `database.ts` — Supabase generated types (`npx supabase gen types typescript`)
- `shared.ts` — Manual cross-app types (kept in sync across repos)
- `supabase.ts` — Typed Supabase client
- `index.ts` — Barrel export

## Design Patterns
- **App Router**: Use `app/` directory with layouts, pages, loading/error boundaries
- **Server Components**: Default to RSC; use `'use client'` only when needed (interactivity, hooks)
- **Static where possible**: Marketing pages should be statically generated (`generateStaticParams`)
- **Dynamic for auth**: Auth-dependent pages use server-side rendering or client components

## Coding Standards
- **Strict TypeScript**: No `any`
- **Functional Components**: React FC with hooks
- **Environment Variables**: Use `process.env` (Next.js convention), prefix public vars with `NEXT_PUBLIC_`
- **Imports**: Use `@/` path alias for `src/`

## Relationship to Other Apps
- Hub links TO LC (`log.train-better.app`) and EL (app store links) — never embeds their functionality
- Hub reads from Supabase only for auth — no app-specific tables
- Feedback/roadmap data may get its own Supabase tables in future
