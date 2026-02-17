import type { Metadata } from "next";
import { DocsDepthDashboard } from "@/components/DocsDepthDashboard";

export const metadata: Metadata = {
  title: "Resources — ReadyAll",
  description:
    "ReadyAll documentation index focused on two deep sections: RWN (complete) and Training & Physiology (active expansion).",
};

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Resources</h1>
      <p className="mt-4 max-w-4xl text-neutral-600 dark:text-neutral-400">
        This index intentionally stays focused. We are building one deep section at a time rather than shipping many shallow pages.
      </p>

      <div className="mt-6 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Public reading is open. RWN is complete; Training & Physiology is the active build track.
        </p>
      </div>

      <div className="mt-8">
        <DocsDepthDashboard
          title="Documentation Progress"
          description="Track what is complete now and where the next deep documentation work is being built."
        />
      </div>

      <section className="tb-soft-card mt-10 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="text-xl font-semibold">Current Tracks</h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Each track is intentionally broad enough to stay useful now, but structured for future deep pages underneath.
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-neutral-300 p-5 dark:border-neutral-700">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">RWN Reference</p>
              <span className="rounded-full border border-emerald-700/40 bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                Complete
              </span>
            </div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Complete syntax, parser behavior, canonical naming, and playground-style examples.
            </p>
            <a href="/rwn" className="mt-3 inline-block text-sm font-medium hover:underline">
              Open RWN →
            </a>
          </article>

          <article className="rounded-lg border border-neutral-300 p-5 dark:border-neutral-700">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">Training & Physiology</p>
              <span className="rounded-full border border-amber-700/40 bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                In Progress
              </span>
            </div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Zones, pacing systems, power-duration concepts, and periodized planning guidance.
            </p>
            <a href="/training-physiology" className="mt-3 inline-block text-sm font-medium hover:underline">
              Open Training & Physiology →
            </a>
          </article>
        </div>
      </section>

      <section className="tb-soft-card mt-8 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="text-xl font-semibold">Future Expansion Model</h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          New sections will be added only after depth justifies them. Until then, content expands inside existing tracks.
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-300">
          <li>Promote subsections into standalone pages only when examples, methods, and edge cases are ready.</li>
          <li>Keep index navigation stable while deep pages evolve underneath each track.</li>
          <li>Use community demand and contribution quality as the trigger for new documentation tracks.</li>
        </ul>
      </section>

      <section className="tb-soft-card mt-8 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="text-xl font-semibold">Contribute to Documentation</h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          If a topic feels thin, request depth or submit practical examples so we can improve signal, not just page count.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="/feedback" className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900">
            Request coverage
          </a>
          <a href="/community" className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900">
            Join docs discussion
          </a>
        </div>
      </section>
    </div>
  );
}
