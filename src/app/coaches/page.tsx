import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Coaches — Train Better",
  description: "Manage your team, track erg scores, create boatings, and assign workouts.",
};

export default function CoachesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-bold">For Coaches</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        The coaching module in Logbook Companion gives you everything you need to
        manage a rowing program — from roster to results.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <FeatureCard
          title="Team Management"
          description="Manage your roster with squads, experience levels, and athlete details."
        />
        <FeatureCard
          title="Erg Score Tracking"
          description="Log and compare erg scores across your team. Filter by squad, date, or athlete."
        />
        <FeatureCard
          title="Boatings & Lineups"
          description="Create boat lineups with drag-and-drop seats, side preferences, and swap tools."
        />
        <FeatureCard
          title="Workout Assignments"
          description="Assign templates to squads, track completion, and enter quick scores from the roster."
        />
      </div>

      <div className="mt-12">
        <a
          href={process.env.NEXT_PUBLIC_LC_URL || "https://log.train-better.app"}
          className="rounded-md bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700"
        >
          Get Started →
        </a>
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
