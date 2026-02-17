# ReadyAll Hub

ReadyAll (`readyall.org`) is a community hub for the rowing world.

Its mission is simple:

**bring great rowing resources from across the internet and the world into one free, learnable, community-owned place.**

It is the front door for:
- open rowing resources and guides
- shared learning pathways for athletes, coaches, and enthusiasts
- transparent roadmap + feedback loops
- community participation and contribution

## What this site is for

ReadyAll is designed around one core idea:

**fewer top-level sections, deeper content per section.**

Instead of spreading information across many thin pages, we are consolidating around:
- `Home` for positioning and pathways
- `Docs` for structured, navigable knowledge
- `Community` for interaction and contribution loops
- `Apps` for ecosystem context and routing

## Community-first intent

ReadyAll is built in public.

- Reading docs, roadmap, and backlog is public.
- Participation actions (voting, prioritization, contribution workflows) are authenticated.
- Documentation depth is community-informed and expanded section-by-section.
- The goal is not just to publish content, but to help people build on what already exists.
- Good resources are curated, organized, and connected so people can learn freely.

## Documentation strategy

`/docs` is the primary knowledge architecture.

Current direction:
- keep a clear docs map
- show section maturity (`Live`, `Draft depth`, `Planned`)
- deepen core sections before creating new ones
- organize external references so they are practical, comparable, and easy to use

Current high-priority content tracks include:
- Rowing Workout Notation (RWN)
- Training zones and pacing
- Periodization / training concepts
- Training plans
- Physiology fundamentals
- Technique and injury prevention
- Coaching + team operations (planned expansion)
- ErgLink workflow documentation (planned expansion)

## Product relationship (scope boundaries)

ReadyAll is the **hub**, not the workout app itself.

- Logbook Companion handles workout logging, coaching workflows, templates, and analysis.
- ErgLink handles PM5-connected live floor workflows.
- ReadyAll provides open education, resource curation, and community governance around the broader rowing ecosystem.

## Design/IA principles for this repo

1. Prefer depth over breadth.
2. Keep global navigation minimal and stable.
3. Route topic depth through Docs.
4. Preserve continuity when simplifying IA (redirect legacy routes rather than breaking links).
5. Keep public reading open and participation intentionally gated.

## Contributing

When proposing changes, prioritize:
- clearer docs navigation
- better section depth and examples
- stronger community interaction loops
- less fragmentation across pages
- practical links to high-quality external rowing resources
- ways for enthusiasts to improve existing content, not just request new pages

If adding a new page, justify why the content cannot live as a deeper docs section first.

## Local development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Tech stack

- Next.js (App Router)
- TypeScript (strict)
- TailwindCSS
- Supabase client wiring for shared ecosystem integration

---

If this README and in-app IA ever diverge, treat the docs architecture in `src/app/docs` and `working-memory/activeContext.md` as the source of truth for current direction.
