import type { Metadata } from "next";
import Image from "next/image";
import TrainingZonesInteractive from "@/components/TrainingZonesInteractive";

export const metadata: Metadata = {
  title: "Training & Physiology — ReadyAll",
  description:
    "Training zones with pacing targets, power-duration profiling, and periodization guidance for rowers and coaches.",
};

/* ─── Expected anchor ratios (from LC power profile engine) ─────────────── */

const ANCHOR_RATIOS = [
  { key: "1:00",  label: "1:00 Test",     low: 1.45, high: 1.60, category: "sprint" },
  { key: "500m",  label: "500m",          low: 1.30, high: 1.40, category: "sprint" },
  { key: "1k",    label: "1,000m",        low: 1.15, high: 1.20, category: "sprint" },
  { key: "2k",    label: "2,000m",        low: 1.00, high: 1.00, category: "anchor" },
  { key: "5k",    label: "5,000m",        low: 0.80, high: 0.85, category: "threshold" },
  { key: "6k",    label: "6,000m",        low: 0.75, high: 0.80, category: "threshold" },
  { key: "30:00", label: "30:00 Test",    low: 0.72, high: 0.78, category: "aerobic" },
  { key: "10k",   label: "10,000m",       low: 0.70, high: 0.75, category: "aerobic" },
  { key: "HM",    label: "Half Marathon", low: 0.65, high: 0.70, category: "aerobic" },
] as const;

const PROFILE_TYPES = [
  { type: "Sprinter",       icon: "⚡", desc: "Short anchors (1:00, 500m, 1k) well above expected ratios. Long anchors trail. Training priority: more UT2/UT1 volume to build the aerobic base." },
  { type: "Diesel",         icon: "🛢️", desc: "Long anchors (10k, HM) at or above expected. Short anchors lag. Training priority: targeted AN/TR sprint work and higher stroke-rate exposure." },
  { type: "Threshold Gap",  icon: "📉", desc: "Sprint and endurance are reasonable, but 5k–6k anchors underperform. Training priority: threshold intervals (AT zone) and race-pace 2k work." },
  { type: "Balanced",       icon: "⚖️", desc: "All anchor ratios land within expected ranges. Training priority: maintain distribution and focus on weakest link for marginal gains." },
] as const;

export default function TrainingPhysiologyPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Training & Physiology</h1>
      <p className="mt-4 max-w-4xl text-neutral-600 dark:text-neutral-400">
        Zone-based training with integrated pacing targets, power-duration profiling for
        identifying strengths and weaknesses, and periodized planning guidance.
      </p>

      {/* ─── Sticky subnav ───────────────────────────────────────────────── */}
      <nav className="sticky top-20 z-10 mt-6 rounded-lg border border-neutral-200 bg-white/95 p-3 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95">
        <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
          <a href="#zones" className="rounded-md border border-neutral-300 px-3 py-1.5 font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900">Zones &amp; Pacing</a>
          <a href="#physiology" className="rounded-md border border-neutral-300 px-3 py-1.5 font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900">Physiology</a>
          <a href="#power-profile" className="rounded-md border border-neutral-300 px-3 py-1.5 font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900">Power Profile</a>
          <a href="#planning" className="rounded-md border border-neutral-300 px-3 py-1.5 font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900">Planning</a>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1 — TRAINING ZONES WITH PACING (interactive client component)
      ═══════════════════════════════════════════════════════════════════ */}
      <TrainingZonesInteractive />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1b — ENERGY SYSTEMS & PHYSIOLOGY (server-rendered context)
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="physiology" className="mt-12 space-y-6">
        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h2 className="text-xl font-semibold">Energy Systems in Rowing</h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Rowing is a hybrid endurance-power sport. Every stroke taps all three energy systems — but the
            <strong> proportion</strong> each contributes depends entirely on the duration and intensity of the piece.
            Understanding this is the foundation for understanding <em>why</em> the zone system works.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {/* Phosphagen */}
            <div className="rounded-lg border border-red-200 bg-red-50/50 p-4 dark:border-red-800/40 dark:bg-red-950/20">
              <h4 className="text-sm font-bold text-red-700 dark:text-red-400">Phosphagen (ATP-PC)</h4>
              <p className="mt-1 text-[11px] font-medium text-red-600/80 dark:text-red-400/70">~10–30 seconds of maximal output</p>
              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                Immediate fuel — stored ATP and phosphocreatine in muscle. Extremely powerful but depletes
                within seconds. Powers race starts, sprint finishes, and 100m bursts. Cannot be sustained and
                requires 2–3 minutes to fully recharge.
              </p>
            </div>
            {/* Glycolytic */}
            <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-800/40 dark:bg-amber-950/20">
              <h4 className="text-sm font-bold text-amber-700 dark:text-amber-400">Glycolytic (Anaerobic Lactic)</h4>
              <p className="mt-1 text-[11px] font-medium text-amber-600/80 dark:text-amber-400/70">~1–3 minutes at high intensity</p>
              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                Rapid glucose breakdown without oxygen. Produces ATP quickly but generates lactate and hydrogen
                ions that accumulate and cause the &ldquo;burn.&rdquo; Bridges the gap between the instant phosphagen
                system and the slower aerobic engine. Dominant in 500m sprints and race surges.
              </p>
            </div>
            {/* Aerobic */}
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-800/40 dark:bg-emerald-950/20">
              <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Oxidative (Aerobic)</h4>
              <p className="mt-1 text-[11px] font-medium text-emerald-600/80 dark:text-emerald-400/70">Unlimited duration, rate-limited</p>
              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                Burns carbohydrate and fat with oxygen in mitochondria. Produces ATP more slowly but in vastly
                greater quantities and can continue indefinitely. Dominant from ~3 minutes onward. A 2k race
                is ~80–85% aerobic; a 6k is ~90%+. This is why most training volume targets the aerobic system.
              </p>
            </div>
          </div>

          {/* Energy mix by distance */}
          <div className="mt-5 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/60">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Approximate Energy System Contribution by Distance</p>
            <div className="mt-3 space-y-2">
              {[
                { dist: "500m sprint", aero: 30, glyco: 45, phos: 25, time: "~1:30" },
                { dist: "1,000m", aero: 50, glyco: 35, phos: 15, time: "~3:15" },
                { dist: "2,000m race", aero: 83, glyco: 10, phos: 7, time: "~6:30" },
                { dist: "6,000m test", aero: 93, glyco: 5, phos: 2, time: "~20:00" },
                { dist: "Steady-state 60 min", aero: 99, glyco: 1, phos: 0, time: "~60:00" },
              ].map((row) => (
                <div key={row.dist} className="flex items-center gap-3 text-xs">
                  <span className="w-36 text-right font-medium text-neutral-600 dark:text-neutral-300">{row.dist}</span>
                  <div className="flex h-4 flex-1 overflow-hidden rounded-full">
                    <div className="bg-emerald-500" style={{ width: `${row.aero}%` }} title={`Aerobic: ${row.aero}%`} />
                    <div className="bg-amber-500" style={{ width: `${row.glyco}%` }} title={`Glycolytic: ${row.glyco}%`} />
                    <div className="bg-red-500" style={{ width: `${row.phos}%` }} title={`Phosphagen: ${row.phos}%`} />
                  </div>
                  <span className="w-12 text-right font-mono text-neutral-400">{row.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-4 text-[10px] text-neutral-400">
              <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-emerald-500" /> Aerobic</span>
              <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-amber-500" /> Glycolytic</span>
              <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-red-500" /> Phosphagen</span>
            </div>
          </div>

          <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
            The key takeaway: <strong>no one can sprint 2000m</strong>. Even a world-class rower sustains
            near-maximal oxygen uptake for the full 6 minutes. The aerobic system carries the load, which is
            why ~80% of training volume targets aerobic development. The anaerobic systems contribute mainly
            at the start (to rapidly accelerate) and at the finish sprint — but their capacity is limited by
            acid buildup and energy store depletion.
          </p>
        </div>

        {/* ─── Why Zones Work (physiological adaptations) ─────────────── */}
        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h2 className="text-xl font-semibold">Why the Zones Work: Physiological Adaptations</h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Each zone triggers specific adaptations. Training at the wrong intensity produces the wrong
            adaptations — or worse, accumulated fatigue without useful gain. Understanding <em>what each zone
            does to your body</em> helps you commit to staying in the right zone.
          </p>

          <div className="mt-5 space-y-4">
            {/* UT2 adaptations */}
            <div className="rounded-lg border border-emerald-200 p-4 dark:border-emerald-800/40">
              <div className="flex items-center gap-2">
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">UT2</span>
                <h4 className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Aerobic Base Building</h4>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-neutral-600 dark:text-neutral-400">
                <li><strong>Mitochondrial density</strong> — muscle fibers grow more mitochondria, increasing aerobic ATP production capacity</li>
                <li><strong>Capillarization</strong> — new capillaries grow around muscle fibers, improving oxygen delivery and waste removal</li>
                <li><strong>Cardiac remodeling</strong> — heart chambers enlarge (eccentric hypertrophy), increasing stroke volume and lowering resting heart rate</li>
                <li><strong>Fat oxidation</strong> — the body upregulates fat-burning enzymes, sparing glycogen for higher intensities</li>
                <li><strong>Recovery cost: minimal</strong> — this is why you can (and should) do a lot of it. Low-intensity volume allows training again the next day without accumulated ANS fatigue</li>
              </ul>
            </div>

            {/* UT1 adaptations */}
            <div className="rounded-lg border border-teal-200 p-4 dark:border-teal-800/40">
              <div className="flex items-center gap-2">
                <span className="rounded bg-teal-100 px-2 py-0.5 text-xs font-bold text-teal-800 dark:bg-teal-900/40 dark:text-teal-300">UT1</span>
                <h4 className="text-sm font-semibold text-teal-700 dark:text-teal-400">Cardiovascular Efficiency</h4>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-neutral-600 dark:text-neutral-400">
                <li><strong>Higher cardiac output</strong> at submax efforts — the heart adapts to pump more blood per beat during steady pressure</li>
                <li><strong>Lactate clearance begins</strong> — small amounts of lactate produced are rapidly cleared by oxidative fibers, training the lactate shuttle</li>
                <li><strong>Aerobic efficiency</strong> — work output per unit effort improves; the same watts feel easier over time</li>
                <li><strong>Muscular endurance</strong> — sustained moderate force builds slow-twitch fiber endurance and glycogen storage capacity</li>
              </ul>
            </div>

            {/* AT adaptations */}
            <div className="rounded-lg border border-amber-200 p-4 dark:border-amber-800/40">
              <div className="flex items-center gap-2">
                <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">AT</span>
                <h4 className="text-sm font-semibold text-amber-700 dark:text-amber-400">Threshold Expansion</h4>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-neutral-600 dark:text-neutral-400">
                <li><strong>Raises lactate threshold (LT2)</strong> — muscles increase MCT transporters that shuttle lactate to mitochondria to burn as fuel</li>
                <li><strong>Oxidative enzyme activity increases</strong> in fast-twitch (Type IIa) fibers, making them more fatigue-resistant</li>
                <li><strong>Higher % VO₂max sustained</strong> — you can hold a bigger fraction of your ceiling before acidosis kicks in</li>
                <li><strong>Mental toughness</strong> — learning to sustain &ldquo;comfortably hard&rdquo; for 20–40 minutes builds race-day confidence</li>
              </ul>
            </div>

            {/* TR adaptations */}
            <div className="rounded-lg border border-orange-200 p-4 dark:border-orange-800/40">
              <div className="flex items-center gap-2">
                <span className="rounded bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-800 dark:bg-orange-900/40 dark:text-orange-300">TR</span>
                <h4 className="text-sm font-semibold text-orange-700 dark:text-orange-400">VO₂max & Central Capacity</h4>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-neutral-600 dark:text-neutral-400">
                <li><strong>Maximal cardiac output</strong> — very high heart rates drive left ventricle hypertrophy, increasing the ceiling of blood the heart can pump</li>
                <li><strong>Fast-twitch fiber recruitment</strong> — Type II fibers are forced to work and develop oxidative capacity, broadening the usable muscle pool</li>
                <li><strong>VO₂max increase</strong> — sustained near-maximal O₂ uptake for 3–6 minute reps is the most potent VO₂max stimulus</li>
                <li><strong>Buffering capacity</strong> — exposure to moderate acid levels trains intracellular buffering systems</li>
              </ul>
            </div>

            {/* AN adaptations */}
            <div className="rounded-lg border border-red-200 p-4 dark:border-red-800/40">
              <div className="flex items-center gap-2">
                <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-800 dark:bg-red-900/40 dark:text-red-300">AN</span>
                <h4 className="text-sm font-semibold text-red-700 dark:text-red-400">Anaerobic Power & Sprint Capacity</h4>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-neutral-600 dark:text-neutral-400">
                <li><strong>Neural recruitment</strong> — maximum motor unit activation patterns; the nervous system learns to fire more fibers simultaneously</li>
                <li><strong>Glycolytic enzyme activity</strong> — increases in phosphorylase, PFK, and LDH enable faster anaerobic ATP production</li>
                <li><strong>Acid tolerance</strong> — repeated exposure to extreme lactate (12–18 mmol/L) increases buffering proteins and bicarbonate reserves</li>
                <li><strong>ATP-PCr stores</strong> — muscle stores of immediate anaerobic fuel increase, powering stronger starts and sprints</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ─── Lactate Threshold Concept ──────────────────────────────── */}
        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h2 className="text-xl font-semibold">The Lactate Threshold: Why It Matters Most</h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            If VO₂max sets the <em>ceiling</em> of your aerobic engine, lactate threshold determines
            how much of that ceiling you can actually <em>use</em>. Two rowers with identical VO₂max can
            differ hugely in performance if one can sustain 90% of VO₂max while the other fades at 80%.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
              <h4 className="text-sm font-bold">LT1 — Aerobic Threshold</h4>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">~2 mmol/L blood lactate</p>
              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                The intensity where lactate first rises above resting levels. Below LT1, effort is purely
                aerobic and fat-supported. This marks the upper boundary of UT2 — staying below it ensures
                genuine base training with minimal recovery cost.
              </p>
            </div>
            <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
              <h4 className="text-sm font-bold">LT2 — Anaerobic Threshold (MLSS)</h4>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">~4 mmol/L blood lactate</p>
              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                The maximal intensity where lactate production and clearance are in equilibrium. Above LT2,
                lactate accumulates exponentially and fatigue sets in within 10–30 minutes. The power
                (or pace) at 4 mmol/L correlates with 2k performance at r = 0.85–0.96 in research — making it
                the single strongest physiological predictor of rowing speed.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-800/40 dark:bg-emerald-950/20">
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              <strong>The practical takeaway:</strong> Training that raises your lactate threshold lets you row
              faster without flooding your muscles with acid. A shift from holding 300W to 330W at 4 mmol/L
              directly translates to a faster 2k — typically 5–10 seconds depending on bodyweight and efficiency.
              This is why AT-zone work (2k+0 to +10 split) and high-volume UT2 (which builds the aerobic
              infrastructure that supports threshold) are the two most impactful training zones.
            </p>
          </div>
        </div>

        {/* ─── Why Easy Must Be Easy ─────────────────────────────────── */}
        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h3 className="text-lg font-semibold">Why Easy Must Be Easy</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            One of the most common training mistakes is spending too much time in the &ldquo;gray zone&rdquo; —
            too hard for UT2, too easy for AT. British Rowing science notes that{" "}
            <em>&ldquo;the main advantage of low intensity is the small amount of time required to recover from it…
            while too much moderate intensity causes delayed recovery of the autonomic nervous system, glycogen
            depletion, fatigue, and even overtraining.&rdquo;</em>
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-red-200 bg-red-50/50 p-4 dark:border-red-800/40 dark:bg-red-950/20">
              <h4 className="text-sm font-semibold text-red-600 dark:text-red-400">Gray Zone Training</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-neutral-600 dark:text-neutral-400">
                <li>Feels &ldquo;productive&rdquo; but delivers poor adaptation per unit fatigue</li>
                <li>Too hard to recover from daily — erodes training consistency</li>
                <li>Not hard enough to trigger threshold or VO₂max adaptations</li>
                <li>Accumulates ANS stress and glycogen depletion over weeks</li>
              </ul>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-800/40 dark:bg-emerald-950/20">
              <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Polarized Approach</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-neutral-600 dark:text-neutral-400">
                <li>~80% at UT2/UT1 builds the aerobic engine with minimal fatigue</li>
                <li>~20% at AT/TR/AN provides targeted stimulus for threshold and power</li>
                <li>Easy days are truly easy → you can train again tomorrow</li>
                <li>Hard days are truly hard → maximum adaptation per session</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
            Use HR + split/power + RPE together to stay in zone. If HR drifts upward during long UT2 rows
            but RPE and power remain easy, stay easy — HR drift is common and normal during long pieces.
            If you find yourself consistently above your UT2 HR cap, slow down. The aerobic base grows from
            consistency and hours, not from pushing pace on easy days.
          </p>
        </div>

        {/* ─── Testing & Calibration ─────────────────────────────────── */}
        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h2 className="text-xl font-semibold">Testing & Zone Calibration</h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            The zone offsets above are starting points derived from coaching literature. For more precise
            zones, calibrate from test results:
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
              <h4 className="text-sm font-bold">2k Erg Test</h4>
              <p className="mt-1 text-[11px] font-medium text-neutral-500">Primary baseline</p>
              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                All-out 2,000m. This anchors every zone offset and is the standard measure of rowing fitness.
                Retest every 6–8 weeks and update your baseline — as fitness changes, zone targets shift.
              </p>
            </div>
            <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
              <h4 className="text-sm font-bold">6k / 30:00 Test</h4>
              <p className="mt-1 text-[11px] font-medium text-neutral-500">Threshold indicator</p>
              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                A 20+ minute test piece measures aerobic capacity and lactate threshold. Your 6k split
                typically falls ~10s/500m slower than 2k, landing roughly at the UT1/AT boundary. If it&apos;s
                much worse, aerobic base needs work.
              </p>
            </div>
            <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
              <h4 className="text-sm font-bold">Lactate Step Test</h4>
              <p className="mt-1 text-[11px] font-medium text-neutral-500">Gold standard</p>
              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                Incremental 4-minute stages with blood lactate samples. Identifies your individual
                LT1 and LT2 points precisely. Power at 4 mmol/L correlates at r = 0.85–0.96 with 2k
                performance. If available, use this to override generic offset bands.
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
            Without lab testing, use a recent 2k as your baseline and combine the offset bands above with
            RPE and HR to stay in the right zone. The offsets are deliberately liberal — they cover a range
            of fitness levels and programs. If you have both a 2k and 6k time, you can cross-reference:
            the KB provides 6k-relative offsets too (e.g., UT2 ≈ 6k+8 to +30 s/500m).
          </p>
        </div>

        {/* ─── Cardiovascular Adaptations ─────────────────────────────── */}
        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h3 className="text-lg font-semibold">The Rower&apos;s Engine: Cardiovascular Adaptations</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Rowers develop some of the most powerful cardiovascular systems in sport. Consistent training
            yields adaptations that compound over years:
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="flex gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-700">
              <span className="text-xl">❤️</span>
              <div>
                <h4 className="text-xs font-bold">Cardiac Hypertrophy</h4>
                <p className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-400">
                  Left ventricle enlarges and thickens. Each beat pumps more blood, lowering resting HR and
                  raising maximal cardiac output.
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-700">
              <span className="text-xl">🫁</span>
              <div>
                <h4 className="text-xs font-bold">VO₂max</h4>
                <p className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-400">
                  Elite heavyweight men reach 60–70+ ml/kg/min (6+ L/min absolute). Driven by both
                  central (heart/blood) and peripheral (muscle) adaptations.
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-700">
              <span className="text-xl">🩸</span>
              <div>
                <h4 className="text-xs font-bold">Plasma Volume Expansion</h4>
                <p className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-400">
                  Total blood volume increases, aiding thermoregulation and stroke volume. More red blood
                  cells carry more oxygen to working muscles.
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-700">
              <span className="text-xl">💪</span>
              <div>
                <h4 className="text-xs font-bold">Muscular Adaptations</h4>
                <p className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-400">
                  Unlike most endurance athletes, rowers build hypertrophied slow-twitch fibers — strong muscles
                  that can sustain aerobic work for extended periods. Type IIx fibers shift toward oxidative IIa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2 — POWER PROFILE / POWER-DURATION
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="power-profile" className="mt-12 space-y-6">
        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h2 className="text-xl font-semibold">Power Profile &amp; Power-Duration Analysis</h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Your power profile is the single most informative tool for understanding <em>what kind of athlete you are</em> and
            <em> where your training should focus</em>. It answers questions that zone percentages alone cannot:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-neutral-600 dark:text-neutral-300">
            <li>Am I sprint-biased, endurance-biased, or balanced?</li>
            <li>Is my 5k underperforming relative to my 2k — and what does that mean?</li>
            <li>Which energy system is limiting my race performance?</li>
            <li>Am I improving in the right areas, or just getting better at what I&apos;m already good at?</li>
          </ul>
        </div>

        {/* What is it */}
        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h3 className="text-lg font-semibold">What Is a Power Curve?</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            A power curve plots your <strong>best average watts</strong> at every distance or duration you&apos;ve tested. Short pieces produce
            high watts (anaerobic energy); long pieces produce lower watts (aerobic energy). The shape of the curve — how steeply it drops
            and where it flattens — reveals your physiological profile.
          </p>
          <div className="mt-4 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
            <Image
              src="/images/powerprofile.png"
              alt="Power profile from Logbook Companion showing power curve, strengths & weaknesses radar chart, and deviation from expected bar chart"
              width={1232}
              height={580}
              className="w-full h-auto"
              priority={false}
            />
          </div>
          <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
            <strong>Above:</strong> A real power profile from Logbook Companion. The <em>power curve</em> (top) plots best watts at every
            distance. The <em>strengths &amp; weaknesses</em> radar (bottom-left) compares your anchor ratios against expected ranges.
            The <em>deviation chart</em> (bottom-right) highlights exactly where you&apos;re above or below expected.
            All of this is built automatically from synced workout data.
          </p>
        </div>

        {/* Anchor distances */}
        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h3 className="text-lg font-semibold">Standard Anchor Distances</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Not every workout contributes equally. The system uses <strong>anchor distances</strong> — standard test pieces that,
            taken together, span the full energy system spectrum. Each anchor has an <em>expected ratio</em> relative to your 2k watts.
          </p>

          <div className="mt-4 overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-neutral-50 dark:bg-neutral-900/60">
                <tr>
                  <th className="px-3 py-2 font-semibold">Anchor</th>
                  <th className="px-3 py-2 font-semibold">Expected % of 2k Watts</th>
                  <th className="px-3 py-2 font-semibold">Energy System</th>
                  <th className="px-3 py-2 font-semibold">What It Tests</th>
                </tr>
              </thead>
              <tbody>
                {ANCHOR_RATIOS.map((a) => (
                  <tr key={a.key} className="border-t border-neutral-200 dark:border-neutral-800">
                    <td className="px-3 py-2 font-medium">{a.label}</td>
                    <td className="px-3 py-2 font-mono">{a.key === "2k" ? "100%" : `${(a.low * 100).toFixed(0)}–${(a.high * 100).toFixed(0)}%`}</td>
                    <td className={`px-3 py-2 ${a.category === "sprint" ? "text-orange-600 dark:text-orange-400" : a.category === "anchor" ? "text-neutral-700 dark:text-neutral-300" : a.category === "threshold" ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                      {a.category === "sprint" ? "Anaerobic" : a.category === "anchor" ? "Reference" : a.category === "threshold" ? "Threshold" : "Aerobic"}
                    </td>
                    <td className="px-3 py-2 text-neutral-600 dark:text-neutral-400">
                      {a.key === "1:00" && "Peak anaerobic power and neuromuscular recruitment"}
                      {a.key === "500m" && "Sprint capacity and lactate tolerance"}
                      {a.key === "1k" && "Anaerobic endurance and pacing under load"}
                      {a.key === "2k" && "Primary baseline — all zones and ratios anchor here"}
                      {a.key === "5k" && "Threshold sustainability and aerobic contribution"}
                      {a.key === "6k" && "Extended threshold — common selection test distance"}
                      {a.key === "30:00" && "Classical aerobic power benchmark (C2 standard)"}
                      {a.key === "10k" && "Aerobic endurance ceiling and pacing efficiency"}
                      {a.key === "HM" && "Deep aerobic base and fuel economy"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Strengths & Weaknesses / Profile Types */}
        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h3 className="text-lg font-semibold">Strengths &amp; Weaknesses: Profile Types</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            By comparing your actual anchor ratios against expected ranges, the system classifies your profile
            and identifies where targeted training will have the most impact. Think of it as a radar chart of your fitness —
            spikes show strengths, dips show opportunities.
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {PROFILE_TYPES.map((p) => (
              <div key={p.type} className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{p.icon}</span>
                  <h4 className="text-sm font-semibold">{p.type}</h4>
                </div>
                <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deviation analysis */}
        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h3 className="text-lg font-semibold">Deviation from Expected</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            For each anchor, the system computes how far your actual ratio sits from the expected midpoint.
            This turns into a simple bar chart that makes imbalances instantly visible:
          </p>

          <div className="mt-4 space-y-2">
            {[
              { label: "1:00 Test", dev: 8,   status: "above" as const },
              { label: "500m",     dev: 5,   status: "above" as const },
              { label: "1,000m",   dev: 2,   status: "within" as const },
              { label: "5,000m",   dev: -3,  status: "within" as const },
              { label: "6,000m",   dev: -8,  status: "below" as const },
              { label: "30:00",    dev: -5,  status: "below" as const },
              { label: "10,000m",  dev: -12, status: "below" as const },
              { label: "HM",       dev: -15, status: "below" as const },
            ].map((d) => {
              const barColor = d.status === "below" ? "bg-red-400" : d.status === "above" ? "bg-orange-400" : "bg-emerald-400";
              const barWidth = Math.min(Math.abs(d.dev) * 3, 100);
              return (
                <div key={d.label} className="flex items-center gap-3 text-xs">
                  <span className="w-20 text-right font-medium text-neutral-600 dark:text-neutral-300">{d.label}</span>
                  <div className="relative flex h-4 flex-1 items-center">
                    <div className="absolute left-1/2 h-full w-px bg-neutral-300 dark:bg-neutral-600" />
                    {d.dev >= 0 ? (
                      <div className={`absolute left-1/2 h-3 rounded-r ${barColor}`} style={{ width: `${barWidth}%` }} />
                    ) : (
                      <div className={`absolute h-3 rounded-l ${barColor}`} style={{ width: `${barWidth}%`, right: "50%" }} />
                    )}
                  </div>
                  <span className={`w-10 text-right font-mono ${d.status === "below" ? "text-red-500" : d.status === "above" ? "text-orange-500" : "text-emerald-500"}`}>
                    {d.dev > 0 ? "+" : ""}{d.dev}%
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-[10px] text-neutral-400">
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-red-400" /> Below expected</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-orange-400" /> Above expected</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-emerald-400" /> Within range</span>
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            This example illustrates a <strong>sprinter profile</strong>: short anchors are above expected while long anchors trail.
            The clear training response would be more UT2/UT1 volume to build the aerobic base.
          </p>
        </div>

        {/* How to use it */}
        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h3 className="text-lg font-semibold">How to Build Your Power Profile</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-sm font-bold dark:bg-neutral-800">1</div>
              <h4 className="mt-2 text-sm font-semibold">Establish Your 2k</h4>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                Row a proper 2k test and sync it. This becomes the reference point for all ratio calculations and zone targets.
              </p>
            </div>
            <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-sm font-bold dark:bg-neutral-800">2</div>
              <h4 className="mt-2 text-sm font-semibold">Test Anchor Distances</h4>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                Over weeks, row standalone pieces at key distances (500m, 1k, 5k, 6k, 30:00, 10k). Each one fills in a spoke of your radar.
              </p>
            </div>
            <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-sm font-bold dark:bg-neutral-800">3</div>
              <h4 className="mt-2 text-sm font-semibold">Read Your Profile</h4>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                Check the radar chart, deviation bars, and profile type. Train the weakest link first — that&apos;s where the biggest gains live.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
            In Logbook Companion, all of this happens automatically: synced workouts are matched to anchor distances, ratios are
            computed, and the profile type, radar chart, power curve, and training prescriptions update in real time.
          </p>
        </div>

        {/* Why it matters */}
        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h3 className="text-lg font-semibold">Why This Matters for Training Decisions</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                <h4 className="text-sm font-semibold text-orange-600 dark:text-orange-400">Without a power profile</h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-neutral-600 dark:text-neutral-400">
                  <li>Training is based on feel or arbitrary plans</li>
                  <li>Weaknesses are invisible until race day</li>
                  <li>Hard to know if a session is too easy or too hard</li>
                  <li>Season planning is guesswork</li>
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">With a power profile</h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-neutral-600 dark:text-neutral-400">
                  <li>Zone targets are personalized and data-driven</li>
                  <li>You can see exactly which energy system is lagging</li>
                  <li>Training prescriptions are specific, not generic</li>
                  <li>Progress is measurable across the entire curve</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3 — PLANNING & PERIODIZATION
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="planning" className="mt-12 space-y-6">
        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h2 className="text-xl font-semibold">Training Planning &amp; Periodization</h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Periodization structures training over weeks and months to balance overload and recovery — ensuring
            you peak when it counts. Rowing typically follows a traditional model: build a broad base, then
            sharpen, then rest.
          </p>
        </div>

        {/* Phases */}
        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h3 className="text-lg font-semibold">Training Phases</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-800/40 dark:bg-emerald-950/20">
              <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400">1. Base (General Prep)</h4>
              <p className="mt-1 text-[11px] text-neutral-500">Typically 8–16 weeks</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-neutral-600 dark:text-neutral-400">
                <li>High volume UT2/UT1 (build aerobic engine)</li>
                <li>General strength work (hypertrophy, max strength)</li>
                <li>Progressive distance increase (5–10%/week)</li>
                <li>Minimal high-intensity work</li>
              </ul>
            </div>
            <div className="rounded-lg border border-teal-200 bg-teal-50/50 p-4 dark:border-teal-800/40 dark:bg-teal-950/20">
              <h4 className="text-sm font-bold text-teal-700 dark:text-teal-400">2. Build (Specific Prep)</h4>
              <p className="mt-1 text-[11px] text-neutral-500">Typically 6–10 weeks</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-neutral-600 dark:text-neutral-400">
                <li>Maintain volume, add AT &amp; TR intervals</li>
                <li>Threshold pieces (3×10&apos;, 4×8&apos;, 6k tests)</li>
                <li>VO₂max sessions (8×500m, 5×1000m)</li>
                <li>Explosive lifts replace hypertrophy work</li>
              </ul>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-800/40 dark:bg-amber-950/20">
              <h4 className="text-sm font-bold text-amber-700 dark:text-amber-400">3. Peak (Competition)</h4>
              <p className="mt-1 text-[11px] text-neutral-500">2–4 weeks before target race</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-neutral-600 dark:text-neutral-400">
                <li>Reduce volume 40–60% (taper)</li>
                <li>Maintain intensity — keep short, sharp sessions</li>
                <li>AN sharpening (race starts, sprint pieces)</li>
                <li>Focus on freshness and race-day readiness</li>
              </ul>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-neutral-50/50 p-4 dark:border-neutral-700/40 dark:bg-neutral-950/20">
              <h4 className="text-sm font-bold text-neutral-700 dark:text-neutral-400">4. Transition (Off-Season)</h4>
              <p className="mt-1 text-[11px] text-neutral-500">2–4 weeks</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-neutral-600 dark:text-neutral-400">
                <li>Active recovery — light cross-training</li>
                <li>Address injuries and imbalances</li>
                <li>Mental refresh (variety, fun activities)</li>
                <li>Prepare for next training cycle</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
            Research shows elite rowers transition from a <strong>pyramidal</strong> intensity distribution in base phase (lots
            of low, some medium, little high) toward a <strong>polarized</strong> distribution in competition phase (lots of
            low, almost no medium, more high). Both approaches outperform &ldquo;threshold-heavy&rdquo; training where 30–40% of
            volume is spent at moderate intensity.
          </p>
        </div>

        {/* Microcycle structure */}
        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h3 className="text-lg font-semibold">Weekly Microcycle Structure</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            A well-structured week buffers quality (hard) sessions with sufficient recovery. Here&apos;s an example
            build-phase microcycle for a sculler training 6–7 sessions per week:
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 dark:bg-neutral-900/60">
                <tr>
                  <th className="px-3 py-2 font-semibold">Day</th>
                  <th className="px-3 py-2 font-semibold">Session</th>
                  <th className="px-3 py-2 font-semibold">Zone</th>
                  <th className="px-3 py-2 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { day: "Mon AM", session: "16km steady-state", zone: "UT2", purpose: "Base volume + technique" },
                  { day: "Mon PM", session: "Weights (strength)", zone: "—", purpose: "Strength maintenance" },
                  { day: "Tue", session: "3×10:00 / 3:00r", zone: "AT", purpose: "Threshold development" },
                  { day: "Wed", session: "20km steady-state", zone: "UT1", purpose: "Moderate aerobic pressure" },
                  { day: "Thu", session: "5×4:00 / 4:00r", zone: "TR", purpose: "VO₂max intervals" },
                  { day: "Fri", session: "12km easy or rest", zone: "UT2 / Off", purpose: "Recovery" },
                  { day: "Sat", session: "2×1500m race-pace", zone: "AN/TR", purpose: "Speed sharpening" },
                  { day: "Sun", session: "20–30km long row", zone: "UT2", purpose: "Aerobic base" },
                ].map((row) => (
                  <tr key={row.day} className="border-t border-neutral-200 dark:border-neutral-800">
                    <td className="px-3 py-2 font-medium">{row.day}</td>
                    <td className="px-3 py-2 font-mono">{row.session}</td>
                    <td className={`px-3 py-2 font-bold ${
                      row.zone.includes("UT2") ? "text-emerald-600 dark:text-emerald-400" :
                      row.zone.includes("UT1") ? "text-teal-600 dark:text-teal-400" :
                      row.zone.includes("AT") ? "text-amber-600 dark:text-amber-400" :
                      row.zone.includes("TR") || row.zone.includes("AN") ? "text-orange-600 dark:text-orange-400" :
                      "text-neutral-400"
                    }`}>{row.zone}</td>
                    <td className="px-3 py-2 text-neutral-600 dark:text-neutral-400">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-neutral-500">
            <span><strong>Key principle:</strong> never schedule two hard days back-to-back.</span>
            <span><strong>Progression gate:</strong> if quality session splits drop repeatedly, reduce load before continuing.</span>
          </div>
        </div>

        {/* Pete Plan & Wolverine Plan */}
        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h3 className="text-lg font-semibold">Popular Training Plans &amp; Zone Mapping</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Two widely-followed erg plans illustrate how the zone system is applied in practice:
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
              <h4 className="text-sm font-bold">The Pete Plan</h4>
              <p className="mt-1 text-[11px] text-neutral-500">Pete Marston, 24-week program</p>
              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                Follows a naturally polarized model — long steady-state days at UT2/UT1 interspersed with
                interval days that push to AT and above. Does not explicitly redefine zones but prescribes
                workouts by distance with target paces anchored to your 2k. The infamous 8×500m session
                lands at 2k pace or faster (AN/TR), while 5k pieces sit around UT1.
              </p>
            </div>
            <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
              <h4 className="text-sm font-bold">The Wolverine Plan</h4>
              <p className="mt-1 text-[11px] text-neutral-500">Mike Caviston (Univ. of Michigan)</p>
              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                Defines 4 explicit intensity levels that map to zones: <strong>L4</strong> (UT2/UT1 — low-rate
                steady state), <strong>L3</strong> (UT1/AT — hard continuous 60-min pieces),{" "}
                <strong>L2</strong> (AT/TR — threshold intervals ~5k pace), <strong>L1</strong> (TR/AN — speed
                intervals at 2k pace+). Typical week: 3–4× L4 + 1–2× L1–L3. Caviston provides detailed
                pace tables tied directly to 2k power.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 className="text-sm font-semibold">Plan Resources</h4>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <a href="https://thepeteplan.wordpress.com/the-pete-plan/" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-neutral-300 p-3 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900">The Pete Plan (official)</a>
              <a href="https://www.concept2.com/training/plans" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-neutral-300 p-3 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900">Concept2 Training Plans</a>
              <a href="https://www.row2k.com/features/391/mike-caviston-training-with-the-wolverine-plan-and-working-with-navy-seals/" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-neutral-300 p-3 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900">Wolverine Plan Context (row2k)</a>
              <a href="https://www.scribd.com/document/64124021/Wolverine-Plan" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-neutral-300 p-3 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900">Wolverine Plan Reference</a>
            </div>
          </div>
        </div>

        {/* Fatigue Management */}
        <div className="tb-soft-card rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h3 className="text-lg font-semibold">Fatigue Management &amp; Recovery</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Successful programs treat recovery as equally important as training. As the adage goes:
            <em> &ldquo;It&apos;s better to be 5% undertrained than 1% overtrained on race day.&rdquo;</em>
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Recovery Sessions", desc: "After hard interval days, next session is UT2 or rest. The high volume of UT2 doubles as active recovery — promoting blood flow and metabolite clearance with minimal additional stress." },
              { title: "Recovery Weeks", desc: "Cut volume ~30% every 3–4 weeks. No extremely hard sessions — hardest is mild AT. Allows supercompensation: the body rebuilds stronger after prior overload." },
              { title: "Taper Before Racing", desc: "Reduce volume 40–60% in the final 1–2 weeks while keeping some intensity. Ensures full recovery without detraining." },
              { title: "Monitoring Tools", desc: "Track morning resting HR and HRV, use session RPE × duration for load scoring, watch for elevated HR at standard paces. A 5-10 bpm resting HR spike flags incomplete recovery." },
              { title: "Overtraining Signs", desc: "Persistent fatigue, poor sleep, elevated resting HR, irritability, worsening splits at same RPE, appetite loss. Back off immediately — 3–5 days very easy before resuming." },
              { title: "Nutrition & Sleep", desc: "Replenish glycogen after sessions (rowing burns enormous fuel), target 8–10 hours sleep. Poor nutrition or sleep rapidly compounds fatigue." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-neutral-200 p-3 dark:border-neutral-700">
                <h4 className="text-xs font-bold">{item.title}</h4>
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
