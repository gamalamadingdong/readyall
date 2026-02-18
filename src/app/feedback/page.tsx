import type { Metadata } from "next";
import { CommunityFeedbackBoard } from "@/components/CommunityFeedbackBoard";

export const metadata: Metadata = {
  title: "Feedback — ReadyAll",
  description: "Tell us what you need across ReadyAll's knowledge, apps/tools, and standards contribution flows.",
};

export default function FeedbackPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-bold">Feedback</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        We build what matters to you. Share ideas, bug reports, and improvement
        requests across all three ReadyAll pillars: data and knowledge, apps and
        tools, and standards like RWN. Reading is public; writing actions require
        sign-in.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <section className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
          <h3 className="text-lg font-semibold">Report a Bug</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Submit reproducible workflow issues so triage can be moderated and
            prioritized across docs, app flows, and standards tooling.
          </p>
        </section>
        <section className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
          <h3 className="text-lg font-semibold">Request a Feature</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Propose changes to apps, docs depth, standards coverage, or roadmap
            direction with clear context and expected outcome.
          </p>
        </section>
      </div>

      <div className="mt-8 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
        <h2 className="text-lg font-semibold">Transition in progress</h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          ReadyAll-native submission and voting flows are being rolled out. During transition,
          implementation work may still be mirrored to GitHub for public execution tracking.
        </p>
        <a href="/community/moderation" className="mt-3 inline-block text-sm font-medium hover:underline">
          Open moderator queue →
        </a>
      </div>

      <CommunityFeedbackBoard />
    </div>
  );
}
