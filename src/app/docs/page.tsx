import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation — Train Better",
  description: "Guides, tutorials, and API reference for Train Better products.",
};

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-bold">Documentation</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        Guides and reference for Logbook Companion and ErgLink.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
          <h2 className="text-xl font-semibold">Getting Started</h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Create an account, connect Concept2, and log your first workout.
          </p>
          <p className="mt-4 text-sm text-neutral-400 italic">Coming soon</p>
        </div>
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
          <h2 className="text-xl font-semibold">Coaching Guide</h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Set up your team, manage rosters, track scores, and create boatings.
          </p>
          <p className="mt-4 text-sm text-neutral-400 italic">Coming soon</p>
        </div>
      </div>
    </div>
  );
}
