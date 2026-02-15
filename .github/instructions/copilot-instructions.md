---
applyTo: '**'
---

# Train Better Hub — AI Instructions

## 0. Working Memory

**Read `working-memory/activeContext.md` BEFORE doing anything.** Update it AFTER making changes.

| File | Purpose | When |
|---|---|---|
| `activeContext.md` | Current focus, next steps, blockers | Read/write EVERY session |
| `systemPatterns.md` | Architecture, coding standards, patterns | Read before implementation |
| `projectBrief.md` | Core mission, non-negotiable requirements | Reference as needed |
| `techContext.md` | Tech stack, deployment, env vars | Reference as needed |

---

## 1. App Ecosystem

This project is part of a **multi-app workspace**. All three apps share a single Supabase backend and auth.

### Workspace Directory Map

| Directory | Shorthand | Repo | Tech Stack | Deployment | Role |
|---|---|---|---|---|---|
| `LogbookCompanion/` | **LC** | `gamalamadingdong/logbook-companion` | React + Vite SPA, TypeScript, TailwindCSS | Vercel (`log.train-better.app`) | Workout logging, RWN, templates, C2 sync, analytics, coaching module |
| `erg-link/` | **EL** | `gamalamadingdong/erg-link` | Capacitor + React, TypeScript, TailwindCSS | App Store / Play Store | Mobile app — PM5 Bluetooth relay, live racing, interval programming |
| `train-better-hub/` | **Hub** | `gamalamadingdong/train-better-hub` | Next.js (App Router), TypeScript, TailwindCSS | Vercel (`train-better.app`) | Umbrella site — docs, community, roadmap, feedback, auth landing, product routing |

### Shared Infrastructure

- **Supabase**: Single project serving all 3 apps — shared auth, shared schema, app-specific RLS
- **Type convention**: All repos use `src/lib/types/` with `database.ts` (Supabase generated), `shared.ts` (manual cross-app types), `supabase.ts` (typed client), `index.ts` (barrel export)
- **Domain**: `train-better.app` (hub), `log.train-better.app` (LC), `erg.train-better.app` (EL)

### Working Memory

Each app has its own `working-memory/` directory — **always read the correct one based on which app is being discussed**.

---

## 2. What This App Is

**Train Better Hub** is the umbrella marketing/docs/community site for the Train Better ecosystem. It is NOT the workout app — that's LC. It is NOT the mobile app — that's EL.

### Hub Responsibilities
- **Product marketing**: Home page, product detail pages for LC and EL
- **Documentation**: User guides, API docs, getting started
- **Community**: Roadmap, feature requests, feedback forms
- **Auth landing**: Shared auth flows (signup, login, password reset) that route users to the correct app
- **Product routing**: CTAs that send users to `log.train-better.app` or app store links

### Hub Does NOT
- Contain workout logic, RWN parsing, or C2 sync
- Have its own database tables (reads from shared Supabase for auth only)
- Duplicate functionality from LC or EL

---

## 3. Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS
- **Deployment**: Vercel
- **Domain**: `train-better.app`
- **Auth**: Supabase Auth (shared with LC and EL)

---

## 4. Tool Selection

### Prefer MCP Servers Over CLI
| Use Case | Avoid | Prefer |
|---|---|---|
| Supabase | `supabase` CLI | Supabase MCP server |
| GitHub | `gh` CLI | GitHub MCP server |
| Vercel | `vercel` CLI | Vercel MCP server |

---

## 5. Code Quality

- **Strict TypeScript**: No `any` unless absolutely necessary
- **YAGNI**: Don't add "future-proofing"
- **Data-first**: Define data structures before implementation
- Always check `working-memory/systemPatterns.md` before implementing
