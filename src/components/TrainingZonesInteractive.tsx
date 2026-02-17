"use client";

import { useState, useMemo, useCallback } from "react";

/* ─── C2 power curve math ──────────────────────────────────────────────── */

/** Watts from pace (seconds per 500m) */
function wattsFromPace(paceSeconds: number): number {
  return 2.80 / Math.pow(paceSeconds / 500, 3);
}

/** Pace (seconds per 500m) from watts */
function paceFromWatts(watts: number): number {
  return 500 * Math.cbrt(2.80 / watts);
}

/** Format seconds as m:ss.s */
function formatPace(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds - mins * 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs.toFixed(1)}`;
}

/** Parse "m:ss" or "m:ss.s" → seconds, or null */
function parsePace(input: string): number | null {
  const trimmed = input.trim();
  // Match m:ss or m:ss.s
  const match = trimmed.match(/^(\d{1,2}):(\d{2}(?:\.\d{1,2})?)$/);
  if (!match) return null;
  const mins = parseInt(match[1], 10);
  const secs = parseFloat(match[2]);
  if (secs >= 60) return null;
  const total = mins * 60 + secs;
  if (total <= 0 || total > 600) return null; // sanity bounds
  return total;
}

/* ─── Zone definitions ─────────────────────────────────────────────────── */

/**
 * Zones are defined as seconds offset from 2k split, matching the KB
 * (zones-and-pacing.md) liberal bands derived from Pete/Wolverine plans
 * and coaching literature. Positive = slower than 2k, negative = faster.
 */
interface ZoneDef {
  name: string;
  label: string;
  /** Seconds added to 2k split for the SLOW (easier) boundary */
  offsetSlow: number;
  /** Seconds added to 2k split for the FAST (harder) boundary */
  offsetFast: number;
  /** Approximate HR % of max */
  hrRange: string;
  rateGuide: string;
  color: string;
  intent: string;
  sessions: string[];
  weeklyShare: string;
}

const ZONES: ZoneDef[] = [
  {
    name: "UT2",
    label: "Utilization 2",
    offsetSlow: 30,
    offsetFast: 18,
    hrRange: "55–75% HRmax",
    rateGuide: "16–20 spm",
    color: "emerald",
    intent:
      "Aerobic base building. The bread-and-butter of high-volume programs. Should feel conversational — you could hold a full sentence between strokes. HR drift is common on long pieces; use RPE and split, not just HR.",
    sessions: ["60–90 min steady state", "2–3× per week minimum", "10k+ continuous pieces"],
    weeklyShare: "60–70%",
  },
  {
    name: "UT1",
    label: "Utilization 1",
    offsetSlow: 18,
    offsetFast: 10,
    hrRange: "70–85% HRmax",
    rateGuide: "18–24 spm",
    color: "teal",
    intent:
      "Firm steady aerobic pressure. Develops lactate clearance and cardiac stroke volume. Broken conversation — a few words per breath, talking is work.",
    sessions: ["40–60 min steady state", "3×20:00 with light rest", "8k–10k at pressure"],
    weeklyShare: "15–20%",
  },
  {
    name: "AT",
    label: "Anaerobic Threshold",
    offsetSlow: 10,
    offsetFast: 0,
    hrRange: "80–90% HRmax",
    rateGuide: "22–28 spm",
    color: "amber",
    intent:
      "Threshold development — near lactate turnpoint (LT2). \"Comfortably hard\" — sustainable for 20–40 minutes in trained athletes. Good for raising lactate threshold.",
    sessions: ["4×2000m / 3:00r", "3×10:00 / 3:00r", "6k test piece"],
    weeklyShare: "10–15%",
  },
  {
    name: "TR",
    label: "Transport",
    offsetSlow: 0,
    offsetFast: -6,
    hrRange: "85–97% HRmax",
    rateGuide: "26–32 spm",
    color: "orange",
    intent:
      "VO₂max intervals — very hard, 3–6 min reps with quality rest. HR may not peak until after the rep; rely on power/split and RPE, not just heart rate.",
    sessions: ["8×500m / 3:30r", "5×1000m / 5:00r", "2k race-pace intervals"],
    weeklyShare: "5–10%",
  },
  {
    name: "AN",
    label: "Anaerobic",
    offsetSlow: -6,
    offsetFast: -20,
    hrRange: "≥95% HRmax",
    rateGuide: "32+ spm",
    color: "red",
    intent:
      "All-out sprint power and finishing speed. Max effort, very short duration. HR lags heavily — use power/RPE only. Requires long recovery between reps.",
    sessions: ["10×100m starts", "6×250m / full rest", "Race-day finishing 500m"],
    weeklyShare: "< 5%",
  },
];

/* ─── Color styles ─────────────────────────────────────────────────────── */

const ZONE_STYLES: Record<
  string,
  { border: string; bg: string; text: string; badge: string }
> = {
  emerald: {
    border: "border-emerald-600/40",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-400",
    badge:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  teal: {
    border: "border-teal-600/40",
    bg: "bg-teal-50 dark:bg-teal-950/30",
    text: "text-teal-700 dark:text-teal-400",
    badge:
      "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300",
  },
  amber: {
    border: "border-amber-600/40",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-700 dark:text-amber-400",
    badge:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  },
  orange: {
    border: "border-orange-600/40",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    text: "text-orange-700 dark:text-orange-400",
    badge:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  },
  red: {
    border: "border-red-600/40",
    bg: "bg-red-50 dark:bg-red-950/30",
    text: "text-red-700 dark:text-red-400",
    badge:
      "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  },
};

/* ─── Preset baselines ─────────────────────────────────────────────────── */

const PRESETS = [
  { label: "1:45", seconds: 105 },
  { label: "1:50", seconds: 110 },
  { label: "1:55", seconds: 115 },
  { label: "2:00", seconds: 120 },
  { label: "2:05", seconds: 125 },
  { label: "2:10", seconds: 130 },
  { label: "2:15", seconds: 135 },
  { label: "2:20", seconds: 140 },
];

/* ═════════════════════════════════════════════════════════════════════════
   Component
   ═════════════════════════════════════════════════════════════════════ */

export default function TrainingZonesInteractive() {
  const [rawInput, setRawInput] = useState("2:00");
  const [baselineSeconds, setBaselineSeconds] = useState(120);

  const baselineWatts = useMemo(() => wattsFromPace(baselineSeconds), [baselineSeconds]);

  /** Compute pace range for a zone using offset model */
  const zonePaces = useCallback(
    (zone: ZoneDef) => {
      const paceSlow = baselineSeconds + zone.offsetSlow;
      const paceFast = baselineSeconds + zone.offsetFast;
      const wattsSlow = wattsFromPace(paceSlow);
      const wattsFast = wattsFromPace(paceFast);
      return { paceSlow, paceFast, wattsSlow, wattsFast };
    },
    [baselineSeconds],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRawInput(val);
    const parsed = parsePace(val);
    if (parsed) setBaselineSeconds(parsed);
  };

  const handlePreset = (seconds: number, label: string) => {
    setBaselineSeconds(seconds);
    setRawInput(label);
  };

  const inputValid = parsePace(rawInput) !== null;

  return (
    <section id="zones" className="mt-8 space-y-4">
      {/* ─── Header + Input ────────────────────────────────────────── */}
      <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="text-xl font-semibold">Training Zones &amp; Pacing Targets</h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Every zone is calculated from your <strong>2k baseline split</strong>. Enter your 2k
          pace below and all zone ranges update instantly.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div>
            <label
              htmlFor="baseline-input"
              className="block text-xs font-semibold text-neutral-500 dark:text-neutral-400"
            >
              Your 2k Split (per 500m)
            </label>
            <div className="relative mt-1">
              <input
                id="baseline-input"
                type="text"
                inputMode="numeric"
                value={rawInput}
                onChange={handleInputChange}
                placeholder="2:00"
                className={`w-32 rounded-lg border px-3 py-2 font-mono text-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 dark:bg-neutral-900 ${
                  inputValid
                    ? "border-neutral-300 focus:border-emerald-500 focus:ring-emerald-500/30 dark:border-neutral-700"
                    : "border-red-400 focus:border-red-500 focus:ring-red-500/30"
                }`}
              />
              {inputValid && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400">
                  {Math.round(baselineWatts)}W
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => handlePreset(p.seconds, p.label)}
                className={`rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  baselineSeconds === p.seconds
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                    : "border-neutral-300 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Zone Cards ────────────────────────────────────────────── */}
      {ZONES.map((zone) => {
        const s = ZONE_STYLES[zone.color];
        const { paceSlow, paceFast, wattsSlow, wattsFast } = zonePaces(zone);

        // "2k+18 to 2k+30" style label
        const offsetLabel = (() => {
          if (zone.name === "AN") return `2k${zone.offsetSlow} and faster`;
          const fmtOff = (v: number) => (v >= 0 ? `2k+${v}` : `2k${v}`);
          return `${fmtOff(zone.offsetFast)} to ${fmtOff(zone.offsetSlow)}`;
        })();

        const paceLabel =
          zone.name === "AN"
            ? `< ${formatPace(paceSlow)}`
            : `${formatPace(paceFast)} – ${formatPace(paceSlow)}`;
        const wattsLabel =
          zone.name === "AN"
            ? `> ${Math.round(wattsFast)}W`
            : `${Math.round(wattsSlow)}–${Math.round(wattsFast)}W`;

        return (
          <div key={zone.name} className={`rounded-xl border ${s.border} ${s.bg} p-5`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={`rounded-lg px-3 py-1.5 text-lg font-bold ${s.badge}`}>
                  {zone.name}
                </span>
                <div>
                  <p className={`text-sm font-semibold ${s.text}`}>{zone.label}</p>
                  <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    {offsetLabel}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className={`rounded-full px-2.5 py-1 font-mono font-medium ${s.badge}`}>
                  {paceLabel}
                </span>
                <span className={`rounded-full px-2.5 py-1 font-mono font-medium ${s.badge}`}>
                  {wattsLabel}
                </span>
                <span className={`rounded-full px-2.5 py-1 font-medium ${s.badge}`}>
                  {zone.rateGuide}
                </span>
                <span className={`rounded-full px-2.5 py-1 font-medium ${s.badge}`}>
                  {zone.hrRange}
                </span>
                <span className="rounded-full border border-neutral-300 px-2.5 py-1 font-medium dark:border-neutral-600">
                  {zone.weeklyShare} of volume
                </span>
              </div>
            </div>

            <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-300">{zone.intent}</p>

            <div className="mt-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Example Sessions
              </p>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {zone.sessions.map((session) => (
                  <span
                    key={session}
                    className="rounded-md border border-neutral-300 bg-white/60 px-2.5 py-1 text-xs font-mono dark:border-neutral-700 dark:bg-neutral-900/40"
                  >
                    {session}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* ─── Distribution bar ──────────────────────────────────────── */}
      <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
        <h3 className="text-sm font-semibold">Weekly Distribution (80/20 Rule)</h3>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Most successful endurance programs follow a <strong>polarized distribution</strong>:
          roughly 80% of volume at low intensity (UT2/UT1) and 20% at high intensity (AT/TR/AN).
          The middle zones are where fatigue accumulates fastest relative to adaptation — avoid
          spending too much training time there without purpose.
        </p>
        <div className="mt-4 flex h-5 overflow-hidden rounded-full">
          <div className="bg-emerald-500" style={{ width: "65%" }} title="UT2" />
          <div className="bg-teal-500" style={{ width: "17%" }} title="UT1" />
          <div className="bg-amber-500" style={{ width: "10%" }} title="AT" />
          <div className="bg-orange-500" style={{ width: "5%" }} title="TR" />
          <div className="bg-red-500" style={{ width: "3%" }} title="AN" />
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-medium text-neutral-500">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" /> UT2
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-teal-500" /> UT1
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-500" /> AT
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-orange-500" /> TR
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-red-500" /> AN
          </span>
        </div>
      </div>

      {/* ─── Derivation callout ────────────────────────────────────── */}
      <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
        <h3 className="text-sm font-semibold">How Pacing Targets Are Derived</h3>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Zone boundaries are defined as <strong>seconds offset from your 2k split</strong>, matching
          how coaches and rowers actually think about pacing. For example, UT2 is 2k+18 to 2k+30
          — meaning 18 to 30 seconds per 500m slower than race pace. The watts shown on each zone
          badge are computed via the standard C2 power curve:
        </p>
        <p className="mt-2 text-center font-mono text-sm text-neutral-700 dark:text-neutral-300">
          Watts = 2.80 / (pace/500)³ &nbsp;&nbsp;|&nbsp;&nbsp; Pace = 500 × (2.80 /
          Watts)
          <sup>1/3</sup>
        </p>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
          Because watts and pace have a cubic relationship, small pace changes produce disproportionately
          large watt changes at higher powers. This is why zone boundaries are defined in pace (seconds),
          not watts — a +20s offset means roughly the same physiological intensity regardless of the
          athlete&apos;s baseline.
        </p>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          In Logbook Companion, RWN guidance parameters like{" "}
          <span className="font-mono text-xs">@UT2</span> or{" "}
          <span className="font-mono text-xs">@2k+10</span> resolve to your personal zone
          pace in real time.
        </p>
      </div>
    </section>
  );
}
