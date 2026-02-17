# Active Context — Train Better Hub

> Last updated: 2026-02-16

## Current State: Scaffolded + Brand/Positioning Pass Updated

The Hub repo is scaffolded with Next.js 16 (App Router), TypeScript strict, TailwindCSS, and page stubs for all IA sections. Brand/domain messaging has been updated for ReadyAll (`readyall.org`) and core platform positioning is now explicit across Home, Products, Docs, Community, and Roadmap.

### What Exists
- Next.js 16 App Router + TypeScript + TailwindCSS
- 10 routes: `/`, `/products`, `/athletes`, `/coaches`, `/community`, `/docs`, `/roadmap`, `/feedback`, `/support`, `/_not-found`
- Home, Products, Docs, Community, and Roadmap reflect ReadyAll positioning and transparency model
- Major component messaging now includes: Logbook Companion, ErgLink, Rowing Workout Notation (RWN), workout templates, and coaching + roster workflows
- Docs page now frames planned knowledge base focus: training plans, physiology, and technique
- Home now includes a prominent "RWN + documentation essentials" spotlight section with direct links
- Home now includes an explicit "Core platform pillars" prominence block: Logbook Companion, RWN, Coaching + Team Management, and Live Sessions (ErgLink)
- User-facing terminology updated from "Products" to "Apps" (navigation + page heading/metadata), while retaining `/products` route for URL continuity
- Docs now includes anchored sections for RWN, workout templates, training plans, physiology, and technique
- Docs content has been intentionally simplified to a scaffolded "building in public" baseline (current/next/contribute framing per section) to invite community involvement while fundamentals are established
- Docs page now includes an explicit visibility note that Hub Resources content is identical for logged-in and logged-out viewers (to reduce confusion with richer in-app authenticated surfaces)
- Added dedicated `/rwn` page to document implemented RWN parser/playground capabilities (syntax modes, structures, guidance parameters, validation/normalization, examples) and rewired key RWN links from Home/Docs/Nav/Footer to this standalone reference
- RWN reference examples are now grouped by playground categories (Basic, Pace, Advanced, Multi-Modal) with short descriptors to mirror validator UX
- Resources docs now include deeper training guidance: expanded zone intent/detail and a dedicated training concepts + periodization section (macro/meso/microcycle framing and load progression basics)
- Added a concrete 4-week build mesocycle example (with deload week) to make periodization guidance immediately actionable
- ReadyAll theme behavior now aligns with Logbook Companion style: light-first default (no OS auto dark switch) with optional dark mode via `html.dark`, plus harmonized accent tokens
- ReadyAll header now includes a live theme toggle wired to read/write `user_profiles.preferences.theme` (Supabase) for authenticated users, with local fallback storage and DB-preferred load precedence
- Docs sections are now filled with practical content extracted/synthesized from `LogbookCompanion/kb`
- Docs now cites source material for key topics (Pete Plan, Wolverine Plan, physiology/zones, technique, injury prevention)
- Training-plan citations on `/docs` now prefer external public sources (Pete Plan public page, Row2k Wolverine context, direct Wolverine Plan Scribd document, Concept2 plans index) instead of internal KB links
- Additional `/docs` citations for physiology, zones/pacing, technique, and injury sections now point to external public sources (Concept2 training references + peer-reviewed open-access physiology overview)
- Community page now includes practical contribution pathways and transparency commitments
- Access policy clarified across public surfaces: reading resources/roadmap/backlog is public; login gates participation actions (voting/prioritization)
- Navigation now labels `/docs` explicitly as "Docs" for clearer discoverability
- IA simplified for depth-first docs: top-level nav now removes Athletes/Coaches/RWN links, keeping Home + Apps + Docs + Community as primary discovery surfaces
- Home page now folds athlete/coach utility messaging into consolidated on-page sections instead of separate audience pages
- Docs page re-architected into a navigable documentation map with section depth/status tags (Live / Draft depth / Planned expansion)
- Added a shared "Docs depth dashboard" component on both Home and Docs to make section maturity visible at a glance and reinforce depth-over-breadth content strategy
- Added top-level `README.md` documenting ReadyAll's community-first purpose, depth-over-breadth IA direction, docs-centered architecture, and contribution guidance
- Refined messaging across README/Home/Community to emphasize ReadyAll as an open rowing resource commons: free learning, global resource curation, and enthusiast-led contribution on top of existing knowledge
- Updated Home page RWN pathway links to point directly to `/rwn` (readyall.org/rwn) instead of docs anchors for clearer user navigation
- Expanded `/rwn` into a more comprehensive reference aligned with Logbook Companion docs/playground patterns: deeper syntax/guidance sections, canonical naming behavior notes, common authoring mistakes, and a new interactive playground-style example explorer component
- Refactored `/docs` away from broad low-value card coverage into two depth-first sections: `RWN` (complete) and `Training & Physiology` (active expansion), with significantly richer pacing/zones/power-duration/periodization content and external detailed-plan links
- Split docs architecture into a concise `/docs` index plus dedicated `/training-physiology` page; updated Home/dashboard links to route to `/rwn` and `/training-physiology` rather than removed docs anchors
- Added a sticky in-page sub-navigation on `/training-physiology` (Zones, Pacing, Power-Duration, Planning) to improve long-form docs navigation
- Aligned ReadyAll theming behavior with LC model: added `system` theme preference, resolved-theme application with OS preference listener, and hardened DB persistence of `user_profiles.preferences.theme` via upsert
- Added Hub auth-status visibility after LC round-trip: new header `AuthStatus` component checks Supabase user and an `authState=signedIn` handoff hint, so the UI no longer remains static on "Sign In" after successful redirect flow
- Updated RWN validator CTA to deep-link into LC docs playground tab (`/docs?tab=rwn&rwnSubTab=playground`) once LC tab-linking support landed
- RWN is now positioned as a docs-domain topic (linked from Docs/Home docs pathways) rather than a primary global nav destination
- Legacy audience URLs `/athletes` and `/coaches` now redirect to Home to preserve continuity while reducing top-level IA complexity
- Roadmap now includes a "References" subsection linking to key KB and planning sources
- Unified auth verification pass completed before push: Hub LC fallback URLs normalized to `logbook.train-better.app` across CTA surfaces
- Final pre-push auth hardening: Hub auth fallback LC base now defaults to `https://logbook.readyall.org`; auth allowlist includes `https://logbook.readyall.org`; `.env.example` cross-app URLs aligned to readyall domains
- Global metadata/header/footer brand labels updated to ReadyAll
- Auth hub fallback URL now defaults to `https://readyall.org` with `readyall.org`/`www.readyall.org` in origin allowlist
- Unified auth entry route `/auth` redirects to LC login with validated `returnTo`
- Auth redirect allowlist includes new production domains and temporary legacy LC Vercel domain
- Loop protection in `/auth` via `authHop` threshold and unsafe auth-path guardrails
- Shared type convention: `src/lib/types/` (database, shared, supabase, barrel)
- Supabase client wired (needs `.env` with real keys)
- `.env.example` with all expected vars
- `.github/instructions/copilot-instructions.md`
- `working-memory/` docs

### What's Next
- [x] Scaffold Next.js App Router project (TypeScript, TailwindCSS)
- [x] Set up shared type convention (`src/lib/types/`)
- [x] Create page stubs for IA
- [ ] Configure Vercel deployment for `readyall.org`
- [ ] Wire up Supabase Auth (shared project) — add real env vars
- [ ] Continue refining remaining page depth (Athletes, Feedback, Support)
- [ ] Add baseline Hub analytics events for key CTAs (`open_logbook`, `open_erglink`, `open_docs`, `open_feedback`)
- [ ] Add `next/link` navigation (replace `<a>` tags for internal links)
- [ ] Mobile-responsive nav (hamburger menu)
- [x] Unified auth execution (Phase 1 foundation): Hub `/auth` route + LC `returnTo` contract
- [x] Unified auth hardening: loop protection + redirect metadata propagation
- [ ] Unified auth observability dashboarding (wire telemetry events into analytics sink)

### Blockers
- Subdomain/domain alignment still pending for remaining app endpoints (LC/EL), currently still on legacy hostnames

### References
- Architecture planning: `LogbookCompanion/working-memory/train-better-site-architecture.md`
- Phased roadmap: `LogbookCompanion/working-memory/train-better-change-roadmap-spec.md`
- Domain rollout: `LogbookCompanion/working-memory/domain-rollout-plan.md`
- Unified auth plan: `working-memory/unified-auth-plan.md`
- GitHub issues: Epics #7-#11, Phase A #12-#19, Phase B #20-#29 (in `logbook-companion` repo)
