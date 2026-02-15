import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community — Train Better",
  description: "Roadmap, feature requests, and community resources.",
};

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-bold">Community</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        Train Better is community-supported open source software. Here&apos;s how to
        get involved.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        <a
          href="/roadmap"
          className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 hover:border-indigo-500 transition-colors"
        >
          <h3 className="text-lg font-semibold">Public Roadmap</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            See what&apos;s planned, in progress, and shipped.
          </p>
        </a>
        <a
          href="/feedback"
          className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 hover:border-indigo-500 transition-colors"
        >
          <h3 className="text-lg font-semibold">Feature Requests</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Tell us what you want. Vote on what matters.
          </p>
        </a>
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
      </div>
    </div>
  );
}
