import type { Metadata } from "next";
import { LcEntryLink } from "@/components/LcEntryLink";

export const metadata: Metadata = {
  title: "Apps — ReadyAll",
  description: "ReadyAll apps and tools pillar: Logbook Companion, ErgLink, and shared systems linked to docs and standards.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-bold">Apps</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        This is the apps and tools pillar of ReadyAll. Logbook Companion and
        ErgLink connect with shared standards (RWN) and practical documentation
        so training workflows stay consistent across planning and execution.
      </p>

      <div className="mt-6 rounded-lg border border-neutral-200 dark:border-neutral-800 p-5">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Current emphasis: improve real-world utility first, then iterate with
          community feedback across all three ReadyAll pillars: knowledge,
          apps/tools, and standards.
        </p>
      </div>

      <div className="mt-12 grid gap-12">
        <section id="logbook-companion">
          <h2 className="text-2xl font-semibold">Logbook Companion</h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            A web-based workout logger built for rowers. Sync with Concept2,
            analyze your performance over time, use templates to categorize
            workouts, and access coaching + roster management workflows for team
            operations.
          </p>
          <ul className="mt-4 list-disc pl-6 text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
            <li>Concept2 workout sync and reconciliation</li>
            <li>Rowing Workout Notation (RWN) parsing and structured workout data</li>
            <li>Template-based workout categorization and repeatable programming</li>
            <li>Athlete + coach workflows with roster-aware team management</li>
          </ul>
          <LcEntryLink className="mt-4 inline-block rounded-md bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700">
            Open Logbook Companion →
          </LcEntryLink>
        </section>

        <section id="erglink">
          <h2 className="text-2xl font-semibold">ErgLink</h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            A mobile app that connects to your Concept2 PM5 via Bluetooth. Get
            live data on your phone, race friends in real-time, and program
            intervals straight to the erg.
          </p>
          <ul className="mt-4 list-disc pl-6 text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
            <li>PM5 Bluetooth connection workflows</li>
            <li>Live metrics for training and race sessions</li>
            <li>Interval setup for erg workouts</li>
          </ul>
          <a
            href={process.env.NEXT_PUBLIC_EL_URL || "https://erglink.train-better.app"}
            className="mt-4 inline-block rounded-md border border-neutral-300 dark:border-neutral-700 px-6 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            Open ErgLink →
          </a>
        </section>

        <section id="platform-components">
          <h2 className="text-2xl font-semibold">Shared Platform Components</h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Beyond app surfaces, ReadyAll includes common foundations used
            across training and coaching workflows.
          </p>
          <ul className="mt-4 list-disc pl-6 text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
            <li>Rowing Workout Notation (RWN) as a shared workout language</li>
            <li>Workout templates for repeatable sessions and progression</li>
            <li>Coaching + roster management for squad operations</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
