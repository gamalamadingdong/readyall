# Active Context — Train Better Hub

> Last updated: 2026-02-15

## Current State: Scaffolded + First Content Pass Complete

The Hub repo is scaffolded with Next.js 16 (App Router), TypeScript strict, TailwindCSS, and page stubs for all IA sections. First content pass is complete for Home, Products, and Coaches with improved value proposition copy and clearer CTAs. Build verified clean.

### What Exists
- Next.js 16 App Router + TypeScript + TailwindCSS
- 10 routes: `/`, `/products`, `/athletes`, `/coaches`, `/community`, `/docs`, `/roadmap`, `/feedback`, `/support`, `/_not-found`
- Home, Products, Coaches pages now have upgraded messaging + clearer CTA language
- Unified auth entry route `/auth` redirects to LC login with validated `returnTo`
- Auth redirect allowlist includes new production domains and temporary legacy LC Vercel domain
- Shared type convention: `src/lib/types/` (database, shared, supabase, barrel)
- Supabase client wired (needs `.env` with real keys)
- `.env.example` with all expected vars
- `.github/instructions/copilot-instructions.md`
- `working-memory/` docs

### What's Next
- [x] Scaffold Next.js App Router project (TypeScript, TailwindCSS)
- [x] Set up shared type convention (`src/lib/types/`)
- [x] Create page stubs for IA
- [ ] Configure Vercel deployment for `train-better.app`
- [ ] Wire up Supabase Auth (shared project) — add real env vars
- [ ] Flesh out remaining page content (Athletes, Community, Docs, Roadmap, Feedback, Support)
- [ ] Add baseline Hub analytics events for key CTAs (`open_logbook`, `open_erglink`, `open_docs`, `open_feedback`)
- [ ] Add `next/link` navigation (replace `<a>` tags for internal links)
- [ ] Mobile-responsive nav (hamburger menu)
- [x] Unified auth execution (Phase 1 foundation): Hub `/auth` route + LC `returnTo` contract
- [ ] Unified auth hardening: add loop protection and telemetry events

### Blockers
- None currently

### References
- Architecture planning: `LogbookCompanion/working-memory/train-better-site-architecture.md`
- Phased roadmap: `LogbookCompanion/working-memory/train-better-change-roadmap-spec.md`
- Domain rollout: `LogbookCompanion/working-memory/domain-rollout-plan.md`
- Unified auth plan: `working-memory/unified-auth-plan.md`
- GitHub issues: Epics #7-#11, Phase A #12-#19, Phase B #20-#29 (in `logbook-companion` repo)
