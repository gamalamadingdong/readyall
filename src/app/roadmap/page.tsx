import type { Metadata } from "next";
import { StrategicRoadmap } from "@/components/StrategicRoadmap";

export const metadata: Metadata = {
  title: "Roadmap — ReadyAll",
  description: "See what is planned, in progress, and shipped across ReadyAll's knowledge, apps/tools, and standards pillars.",
};

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-bold">Roadmap</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        This roadmap shows what we&apos;re building across ReadyAll&apos;s three pillars:
        data and knowledge resources, apps and tools, and shared standards like RWN.
        The roadmap and backlog stay public and are shaped by community input.
      </p>

      <div className="mt-12">
        <p className="text-neutral-500">
          Roadmap prioritization is moving to a ReadyAll-native model so athletes
          and coaches can weigh in without a coding workflow. Engineering execution
          can still be mirrored publicly when needed in the{" "}
          <a
            href="https://github.com/gamalamadingdong/readyall/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            GitHub issue tracker
          </a>{" "}
          for implementation transparency.
        </p>
      </div>

      <StrategicRoadmap />

      <section className="tb-soft-card mt-10 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="text-xl font-semibold">References</h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          The roadmap is informed by published training knowledge and practical
          implementation notes from the ReadyAll ecosystem.
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-400">
          <li>
            <a
              href="https://github.com/gamalamadingdong/logbook-companion/blob/main/kb/training-plans/pete-plan.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Pete Plan source notes
            </a>
          </li>
          <li>
            <a
              href="https://github.com/gamalamadingdong/logbook-companion/blob/main/kb/training-plans/Wolverine%20Plan.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Wolverine Plan source notes
            </a>
          </li>
          <li>
            <a
              href="https://github.com/gamalamadingdong/logbook-companion/blob/main/kb/physiology/zones-and-pacing.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Training zones and pacing reference
            </a>
          </li>
          <li>
            <a
              href="https://github.com/gamalamadingdong/logbook-companion/blob/main/kb/technique/tech-overview.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Technique guide
            </a>
          </li>
          <li>
            <a
              href="https://github.com/gamalamadingdong/logbook-companion/blob/main/kb/injury-prevention/injury-prevention.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Injury prevention guidance
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
