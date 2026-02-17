import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community — ReadyAll",
  description: "Roadmap, feature requests, and community resources.",
};

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-bold">Community</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        ReadyAll is for building a community of rowing enthusiasts who learn
        freely, share practical resources, and improve the knowledge base
        together over time.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        <a
          href="/roadmap"
          className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 hover:border-indigo-500 transition-colors"
        >
          <h3 className="text-lg font-semibold">Public Roadmap</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            See what&apos;s planned, in progress, and shipped with full transparency.
          </p>
        </a>
        <a
          href="/feedback"
          className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 hover:border-indigo-500 transition-colors"
        >
          <h3 className="text-lg font-semibold">Feature Requests</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Submit ideas and, when signed in, vote on what matters most.
          </p>
        </a>
        <a
          href="/docs"
          className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 hover:border-indigo-500 transition-colors"
        >
          <h3 className="text-lg font-semibold">Knowledge Base</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Use the public training docs for plans, zones, technique, and injury prevention.
          </p>
        </a>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <section className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
          <h2 className="text-lg font-semibold">How people can interact</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-400">
            <li>Vote on roadmap and backlog priorities that affect daily coaching/training work.</li>
            <li>Request or refine documentation sections with concrete examples.</li>
            <li>Contribute high-quality external resources and context on why they matter.</li>
            <li>Submit reproducible workflow reports: context, steps, expected outcome.</li>
            <li>Join community review loops for RWN, zones, and training progression guidance.</li>
          </ul>
        </section>

        <section className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
          <h2 className="text-lg font-semibold">Participation model</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-400">
            <li>Resources stay open for everyone to read and learn from.</li>
            <li>Roadmap and backlog stay public, regardless of login status.</li>
            <li>Voting and prioritization actions are authenticated to keep signal quality high.</li>
            <li>Docs sections grow through request volume + demonstrated user need.</li>
            <li>Implementation status and evolution remain visible through public issue tracking.</li>
          </ul>
        </section>
      </div>

      <section className="mt-8 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
        <h2 className="text-lg font-semibold">Suggested community program structure</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
            <h3 className="font-medium">Docs Guild</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Monthly focus: deepen one docs section (for example zones or periodization) with examples and edge cases.
            </p>
          </div>
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
            <h3 className="font-medium">Workflow Lab</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Structured feedback cycles on real coach/athlete flows: assignments, session execution, and review.
            </p>
          </div>
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
            <h3 className="font-medium">RWN Working Group</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Validate notation clarity, parser behavior, and practical examples before expanding syntax guidance.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <a
          href="https://github.com/sponsors/gamalamadingdong"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 hover:border-indigo-500 transition-colors"
        >
          <h3 className="text-lg font-semibold">Support Development</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            GitHub Sponsors keeps this project going.
          </p>
        </a>

        <a
          href="https://github.com/gamalamadingdong/logbook-companion/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 hover:border-indigo-500 transition-colors"
        >
          <h3 className="text-lg font-semibold">Issue Tracker</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Review active work, labels, and implementation status in public.
          </p>
        </a>

        <a
          href="/auth?returnTo=/community"
          className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 hover:border-indigo-500 transition-colors"
        >
          <h3 className="text-lg font-semibold">Sign In to Participate</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Sign in to vote, prioritize docs depth, and contribute to review loops.
          </p>
        </a>
      </div>
    </div>
  );
}
