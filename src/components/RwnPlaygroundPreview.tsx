'use client';

import { useMemo, useState } from 'react';

type ExampleCategory = 'Basic' | 'Pace' | 'Advanced' | 'Multi-Modal';

type PlaygroundExample = {
  label: string;
  value: string;
  desc: string;
  category: ExampleCategory;
  canonical: string;
  parsedAs: string;
};

const EXAMPLES: PlaygroundExample[] = [
  { label: 'Intervals', value: '4x500m/1:00r', desc: 'Distance sprints', category: 'Basic', canonical: '4x 500m', parsedAs: 'interval (distance work + timed rest)' },
  { label: 'Time Intervals', value: '8x1:00/1:00r', desc: 'Time-based work', category: 'Basic', canonical: '8x 1:00', parsedAs: 'interval (time work + timed rest)' },
  { label: 'Steady State', value: '10000m', desc: 'Simple distance piece', category: 'Basic', canonical: '10,000m', parsedAs: 'steady_state (distance)' },
  { label: 'Training Zone', value: '20:00@UT1', desc: 'Zone-targeted steady state', category: 'Pace', canonical: '20:00 UT1', parsedAs: 'steady_state + guidance target_pace=UT1' },
  { label: 'Relative Pace', value: '5000m@2k+10', desc: 'PR-relative pacing', category: 'Pace', canonical: '5,000m @2k+10', parsedAs: 'steady_state + relative pace guidance' },
  { label: 'Rate Range', value: '30:00@18..22spm', desc: 'Rate band control', category: 'Pace', canonical: '30:00 r18-22', parsedAs: 'steady_state + target_rate/target_rate_max' },
  { label: 'Pace Range', value: '60:00@2:05..2:10', desc: 'Split range control', category: 'Pace', canonical: '60:00 @2:05-2:10', parsedAs: 'steady_state + target_pace/target_pace_max' },
  { label: 'With W/U & C/D', value: '[w]10:00 + 5x500m/1:00r + [c]5:00', desc: 'Full session flow', category: 'Advanced', canonical: 'WU + 5x 500m + CD', parsedAs: 'variable with tagged segments + interval block' },
  { label: 'Rate Pyramid', value: '[w]5:00 + 5:00@r20 + 5:00@r22 + 5:00@r24 + 5:00@r22 + [c]5:00', desc: 'Rate progression', category: 'Advanced', canonical: 'Rate pyramid session', parsedAs: 'variable sequence with guidance per step' },
  { label: 'Rate Shorthand', value: '30:00r20', desc: 'Compact rate notation', category: 'Advanced', canonical: '30:00 @r20', parsedAs: 'steady_state + shorthand target rate' },
  { label: 'Variable', value: '(2000m+1000m+500m)/3:00r', desc: 'Ladder / pyramid', category: 'Advanced', canonical: '2k/1k/500 ladder', parsedAs: 'variable grouped chain + group rest' },
  { label: 'Grouped', value: '3x(750m/3:00r + 500m/3:00r)', desc: 'Nested grouped repeats', category: 'Advanced', canonical: '3x grouped set', parsedAs: 'repeat group unrolled to variable steps' },
  { label: 'BikeErg', value: 'Bike: 15000m', desc: 'Single modality', category: 'Multi-Modal', canonical: 'Bike 15,000m', parsedAs: 'steady_state with modality prefix' },
  { label: 'SkiErg', value: 'Ski: 8x500m/3:30r', desc: 'Ski intervals', category: 'Multi-Modal', canonical: 'Ski 8x 500m', parsedAs: 'interval with modality prefix' },
  { label: 'Circuit', value: '[w]Row: 5:00 + Row: 2000m + Bike: 5000m + Ski: 2000m + [c]Row: 5:00', desc: 'Cross-training blend', category: 'Multi-Modal', canonical: 'Row/Bike/Ski circuit', parsedAs: 'variable multi-modality sequence' },
  { label: 'Team Circuit', value: '[w]Row: 10:00 + 3x(Row: 2000m/2:00r + Bike: 5000m/2:00r + Run: 800m/2:00r) + [c]Row: 5:00', desc: 'Full team-style circuit', category: 'Multi-Modal', canonical: '3x multi-modality circuit', parsedAs: 'grouped repeat + multi-modality' },
];

const CATEGORIES: ExampleCategory[] = ['Basic', 'Pace', 'Advanced', 'Multi-Modal'];

export function RwnPlaygroundPreview() {
  const [selected, setSelected] = useState<PlaygroundExample>(EXAMPLES[0]);
  const [inputValue, setInputValue] = useState(EXAMPLES[0].value);
  const inputId = 'rwn-playground-input';

  const selectedCategoryExamples = useMemo(
    () => EXAMPLES.filter((example) => example.category === selected.category),
    [selected.category]
  );

  const handleSelectExample = (example: PlaygroundExample) => {
    setSelected(example);
    setInputValue(example.value);
  };

  return (
    <section className="tb-soft-card mt-8 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
      <h2 className="text-xl font-semibold">Playground-style Example Explorer</h2>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        This mirrors the Logbook Companion playground workflow for learning and authoring. Use examples,
        edit notation, then validate full parser behavior in-app.
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => {
              const firstInCategory = EXAMPLES.find((example) => example.category === category);
              if (firstInCategory) handleSelectExample(firstInCategory);
            }}
            className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ${
              selected.category === category
                ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                : 'border-neutral-300 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {selectedCategoryExamples.map((example) => (
          <button
            key={example.label}
            onClick={() => handleSelectExample(example)}
            className={`rounded-lg border p-4 text-left transition-colors ${
              selected.label === example.label
                ? 'border-emerald-600 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950/30'
                : 'border-neutral-300 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900'
            }`}
          >
            <p className="text-sm font-medium">{example.label}</p>
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">{example.desc}</p>
            <p className="mt-2 text-xs font-mono text-neutral-700 dark:text-neutral-300">{example.value}</p>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Notation Input
          </label>
          <textarea
            id={inputId}
            aria-label="RWN notation input"
            placeholder="e.g., 4x500m/1:00r"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="mt-2 h-36 w-full rounded-lg border border-neutral-300 bg-white p-3 font-mono text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
            spellCheck={false}
          />
          <p className="mt-2 text-xs text-neutral-500">
            Full parser validation, error diagnostics, and canonical generation are available in the Logbook Companion playground.
          </p>
        </div>

        <div className="space-y-3 rounded-lg border border-neutral-300 p-4 dark:border-neutral-700">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Parser Interpretation (Example Baseline)</p>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">{selected.parsedAs}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Canonical Name (Expected)</p>
            <p className="mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">{selected.canonical}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Selected Pattern</p>
            <p className="mt-1 text-xs font-mono text-neutral-700 dark:text-neutral-300">{selected.value}</p>
          </div>
          <a
            href={process.env.NEXT_PUBLIC_LC_URL || 'https://logbook.train-better.app'}
            className="inline-block rounded-md border border-neutral-300 px-3 py-2 text-xs font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
          >
            Open full validator in Logbook Companion
          </a>
        </div>
      </div>
    </section>
  );
}
