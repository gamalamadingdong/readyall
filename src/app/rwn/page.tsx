import type { Metadata } from "next";
import { RwnPlaygroundPreview } from "@/components/RwnPlaygroundPreview";

export const metadata: Metadata = {
  title: "RWN — ReadyAll",
  description:
    "Comprehensive Rowing Workout Notation reference with syntax, parser behavior, canonical naming guidance, and playground-style examples.",
};

type ExampleCategory = "Basic" | "Pace" | "Advanced" | "Multi-Modal";

const EXAMPLES: Array<{ label: string; value: string; desc: string; category: ExampleCategory }> = [
  { label: "Intervals", value: "4x500m/1:00r", desc: "Distance Sprints", category: "Basic" },
  { label: "Time Intervals", value: "8x1:00/1:00r", desc: "Time-based", category: "Basic" },
  { label: "Steady State", value: "10000m", desc: "Distance SS", category: "Basic" },
  { label: "Training Zone", value: "20:00@UT1", desc: "Zone pace", category: "Pace" },
  { label: "Relative Pace", value: "5000m@2k+10", desc: "PR + offset", category: "Pace" },
  { label: "Rate Range", value: "30:00@18..22spm", desc: "Rate band", category: "Pace" },
  { label: "Pace Range", value: "60:00@2:05..2:10", desc: "Split band", category: "Pace" },
  { label: "With W/U & C/D", value: "[w]10:00 + 5x500m/1:00r + [c]5:00", desc: "Full session", category: "Advanced" },
  { label: "Rate Pyramid", value: "[w]5:00 + 5:00@r20 + 5:00@r22 + 5:00@r24 + 5:00@r22 + [c]5:00", desc: "Rate steps", category: "Advanced" },
  { label: "Rate Shorthand", value: "30:00r20", desc: "30 min @ r20", category: "Advanced" },
  { label: "Variable", value: "(2000m+1000m+500m)/3:00r", desc: "Ladder/Pyramid", category: "Advanced" },
  { label: "Grouped", value: "3x(750m/3:00r + 500m/3:00r)", desc: "Nested blocks", category: "Advanced" },
  { label: "BikeErg", value: "Bike: 15000m", desc: "Single modality", category: "Multi-Modal" },
  { label: "SkiErg", value: "Ski: 8x500m/3:30r", desc: "Ski intervals", category: "Multi-Modal" },
  { label: "Circuit", value: "[w]Row: 5:00 + Row: 2000m + Bike: 5000m + Ski: 2000m + [c]Row: 5:00", desc: "Cross-training", category: "Multi-Modal" },
  { label: "Team Circuit", value: "[w]Row: 10:00 + 3x(Row: 2000m/2:00r + Bike: 5000m/2:00r + Run: 800m/2:00r) + [c]Row: 5:00", desc: "Full circuit", category: "Multi-Modal" },
];

const EXAMPLE_CATEGORIES: ExampleCategory[] = ["Basic", "Pace", "Advanced", "Multi-Modal"];

export default function RwnPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Rowing Workout Notation (RWN)</h1>
      <p className="mt-4 max-w-4xl text-neutral-600 dark:text-neutral-400">
        RWN is a shared language for writing workouts clearly, reusing them consistently,
        and preserving intent across athletes, coaches, and tools. This reference mirrors
        the depth of the Logbook Companion documentation + playground workflow.
      </p>

      <section className="tb-soft-card mt-8 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="text-xl font-semibold">Why RWN Exists</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-600 dark:text-neutral-300">
          <li>Write once, interpret consistently across planning and execution contexts.</li>
          <li>Reduce ambiguity in sessions (especially rest, pace, and rate guidance).</li>
          <li>Enable canonical naming, parsing, and reusable template workflows.</li>
          <li>Keep workouts human-readable while still machine-parseable.</li>
        </ul>
      </section>

      <section className="tb-soft-card mt-8 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="text-xl font-semibold">Syntax Modes</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-600 dark:text-neutral-300">
          <li>Preferred block tags: <span className="font-mono">[w]</span> warmup, <span className="font-mono">[c]</span> cooldown, <span className="font-mono">[t]</span> test.</li>
          <li>Legacy inline tags still supported: <span className="font-mono">#warmup</span>, <span className="font-mono">#cooldown</span>, <span className="font-mono">#test</span>.</li>
          <li>Standard separators: <span className="font-mono">+</span> for chained segments, <span className="font-mono">/</span> for rest pairing, and <span className="font-mono">x</span> for repeats.</li>
          <li>Guidance marker: <span className="font-mono">@</span> for pace/rate/zone targets and ranges.</li>
        </ul>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h2 className="text-xl font-semibold">Unit Forms</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-600 dark:text-neutral-300">
            <li>Distance: <span className="font-mono">2000m</span></li>
            <li>Time: <span className="font-mono">30:00</span> (or second-based parser inputs)</li>
            <li>Calories: <span className="font-mono">500cal</span> or <span className="font-mono">500c</span></li>
            <li>Rest suffix: <span className="font-mono">1:00r</span></li>
          </ul>
        </div>

        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h2 className="text-xl font-semibold">Guidance Forms</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-600 dark:text-neutral-300">
            <li>Rate: <span className="font-mono">@r20</span> or <span className="font-mono">@20spm</span></li>
            <li>Rate range: <span className="font-mono">@18..22spm</span> or <span className="font-mono">@r20-24</span></li>
            <li>Pace: <span className="font-mono">@2:05</span></li>
            <li>Pace range: <span className="font-mono">@2:05..2:10</span></li>
            <li>Relative pace: <span className="font-mono">@2k+10</span>, <span className="font-mono">@5k-2</span></li>
            <li>Zones: <span className="font-mono">@UT2</span>, <span className="font-mono">@UT1</span>, <span className="font-mono">@AT</span>, <span className="font-mono">@TR</span>, <span className="font-mono">@AN</span></li>
          </ul>
        </div>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h2 className="text-xl font-semibold">Core Structures</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-600 dark:text-neutral-300">
            <li>Steady state components: distance, time, calories.</li>
            <li>Intervals: repeated work/rest structures.</li>
            <li>Variable sessions: mixed segment chains and ladders.</li>
            <li>Grouped repeats: nested block structures with optional group rest.</li>
            <li>Modality prefixes: Row, Bike, Ski, Run, Other.</li>
          </ul>
        </div>

        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h2 className="text-xl font-semibold">Guidance Parameters</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-600 dark:text-neutral-300">
            <li>Stroke rate targets and ranges (e.g. <span className="font-mono">@r20</span>, <span className="font-mono">@18..22spm</span>).</li>
            <li>Absolute split targets and ranges (e.g. <span className="font-mono">@2:05</span>, <span className="font-mono">@2:05..2:10</span>).</li>
            <li>Relative pacing (e.g. <span className="font-mono">@2k+10</span>, <span className="font-mono">@5k-2</span>).</li>
            <li>Training zone abbreviations (UT2, UT1, AT, TR, AN).</li>
            <li>Rate shorthand support (e.g. <span className="font-mono">30:00r20</span>).</li>
          </ul>
        </div>
      </section>

      <section className="tb-soft-card mt-8 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="text-xl font-semibold">Validation and Normalization</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-600 dark:text-neutral-300">
          <li>Parser-backed syntax validation with structured error feedback.</li>
          <li>Canonical workout naming from parsed interval structures.</li>
          <li>Duration and work estimation for supported component types.</li>
          <li>Legacy compatibility where possible while standardizing forward syntax.</li>
          <li>Grouped-repeat parsing and unrolling behavior for nested set patterns.</li>
        </ul>
      </section>

      <section className="tb-soft-card mt-8 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="text-xl font-semibold">Canonical Naming Behavior</h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Canonical names provide a deterministic label for parsed workouts so repeated structures
          can be matched and analyzed consistently over time.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-600 dark:text-neutral-300">
          <li><span className="font-mono">4x500m/1:00r</span> normalizes into a repeat-style canonical interval label.</li>
          <li>Grouped structures preserve intent while still producing stable naming outputs.</li>
          <li>Legacy notation can be interpreted, but block-tag style is preferred for forward consistency.</li>
          <li>Guidance targets (rate/pace/zone) are preserved as execution metadata, not just display text.</li>
        </ul>
      </section>

      <RwnPlaygroundPreview />

      <section className="tb-soft-card mt-8 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="text-xl font-semibold">Reference Examples</h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Practical examples aligned with the current playground/validator set.
        </p>
        <div className="mt-4 space-y-4">
          {EXAMPLE_CATEGORIES.map((category) => (
            <div key={category}>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {category}
              </p>
              <div className="mt-2 grid gap-3 md:grid-cols-2">
                {EXAMPLES.filter((example) => example.category === category).map((example) => (
                  <div key={example.label} className="rounded-lg border border-neutral-300 p-4 dark:border-neutral-700">
                    <p className="text-sm font-medium">{example.label}</p>
                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{example.desc}</p>
                    <p className="mt-2 text-xs font-mono text-neutral-600 dark:text-neutral-300">{example.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="tb-soft-card mt-8 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="text-xl font-semibold">Common Authoring Mistakes</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-600 dark:text-neutral-300">
          <li>Mixing separators incorrectly (for example malformed repeats or rest delimiters).</li>
          <li>Using inconsistent modality prefixes across one circuit expression.</li>
          <li>Writing ambiguous pace/rate guidance that should be explicit ranges.</li>
          <li>Relying on legacy inline tags where block tags provide clearer structure.</li>
        </ul>
      </section>

      <div className="tb-soft-card mt-10 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="text-xl font-semibold">Build with us</h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Help prioritize the next RWN improvements: edge-case clarifications,
          richer modality guidance, and additional parser behavior documentation.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="/feedback" className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900">
            Request RWN coverage
          </a>
          <a href="/roadmap" className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900">
            View roadmap
          </a>
          <a
            href={process.env.NEXT_PUBLIC_LC_URL || "https://logbook.train-better.app"}
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
          >
            Open Logbook Companion
          </a>
        </div>
      </div>
    </div>
  );
}
