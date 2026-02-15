import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap — Train Better",
  description: "See what's planned, in progress, and shipped.",
};

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-bold">Roadmap</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        What we&apos;re building and where we&apos;re headed. This is a living document
        shaped by community feedback.
      </p>

      <div className="mt-12">
        <p className="text-neutral-500">
          Public roadmap board coming soon. In the meantime, check out the{" "}
          <a
            href="https://github.com/gamalamadingdong/logbook-companion/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            GitHub issues
          </a>{" "}
          for current work.
        </p>
      </div>
    </div>
  );
}
