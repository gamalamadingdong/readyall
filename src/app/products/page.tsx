import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — Train Better",
  description: "Logbook Companion and ErgLink — tools for rowers and coaches.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-bold">Products</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        Two tools, one mission: help you train better.
      </p>

      <div className="mt-12 grid gap-12">
        <section id="logbook-companion">
          <h2 className="text-2xl font-semibold">Logbook Companion</h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            A web-based workout logger built for rowers. Sync with Concept2,
            analyze your performance over time, use templates to categorize
            workouts, and access a full coaching module for team management.
          </p>
          <a
            href={process.env.NEXT_PUBLIC_LC_URL || "https://log.train-better.app"}
            className="mt-4 inline-block rounded-md bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
          >
            Open App →
          </a>
        </section>

        <section id="erglink">
          <h2 className="text-2xl font-semibold">ErgLink</h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            A mobile app that connects to your Concept2 PM5 via Bluetooth. Get
            live data on your phone, race friends in real-time, and program
            intervals straight to the erg.
          </p>
          <p className="mt-4 text-sm text-neutral-500">
            Coming soon to iOS and Android.
          </p>
        </section>
      </div>
    </div>
  );
}
