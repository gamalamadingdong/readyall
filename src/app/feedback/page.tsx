import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback — Train Better",
  description: "Tell us what you need. Feature requests, bug reports, and ideas.",
};

export default function FeedbackPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-bold">Feedback</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        We build what matters to you. Send us your ideas, report bugs, or request
        features.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <a
          href="https://github.com/gamalamadingdong/logbook-companion/issues/new"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 hover:border-indigo-500 transition-colors"
        >
          <h3 className="text-lg font-semibold">Report a Bug</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Found something broken? Let us know on GitHub.
          </p>
        </a>
        <a
          href="https://github.com/gamalamadingdong/logbook-companion/issues/new"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 hover:border-indigo-500 transition-colors"
        >
          <h3 className="text-lg font-semibold">Request a Feature</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Have an idea that would make training better? Tell us.
          </p>
        </a>
      </div>
    </div>
  );
}
