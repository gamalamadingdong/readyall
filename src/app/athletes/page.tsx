import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Athletes — Train Better",
  description: "Track every meter, sync with Concept2, and see your progress.",
};

export default function AthletesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-bold">For Athletes</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        Whether you&apos;re training for a 2k test or logging steady state, Train
        Better gives you the tools to track progress and improve.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <FeatureCard
          title="Concept2 Sync"
          description="Connect your Concept2 logbook and pull in all your erg workouts automatically."
        />
        <FeatureCard
          title="Workout Analytics"
          description="See trends, splits, power profiles, and training volume over time."
        />
        <FeatureCard
          title="Templates & Categories"
          description="Organize workouts by type — steady state, intervals, tests — and see what works."
        />
        <FeatureCard
          title="ErgLink Connection"
          description="Connect your phone to the PM5 for live data, racing, and interval programming."
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
    </div>
  );
}
