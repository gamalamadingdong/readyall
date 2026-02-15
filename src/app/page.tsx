export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Train Better.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          Tools for rowers and coaches who want to improve. Log workouts, analyze
          performance, connect your erg, and manage your team — all in one
          ecosystem.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href={process.env.NEXT_PUBLIC_LC_URL || "https://log.train-better.app"}
            className="rounded-md bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700"
          >
            Open Logbook Companion
          </a>
          <a
            href="/products"
            className="rounded-md border border-neutral-300 dark:border-neutral-700 px-6 py-3 font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            See All Products
          </a>
        </div>
      </section>

      {/* Product Cards */}
      <section className="mt-24 grid gap-8 md:grid-cols-2">
        <ProductCard
          title="Logbook Companion"
          description="Web-based workout logger with Concept2 sync, analytics, templates, and a full coaching module for team management."
          href="/products#logbook-companion"
          cta="Learn More"
        />
        <ProductCard
          title="ErgLink"
          description="Mobile app that connects to your PM5 via Bluetooth for live data relay, real-time racing, and interval programming."
          href="/products#erglink"
          cta="Learn More"
        />
      </section>

      {/* For Athletes / For Coaches */}
      <section className="mt-24 grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-8">
          <h3 className="text-xl font-semibold">For Athletes</h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Track every meter, see your progress, sync with Concept2, and get
            insights on your training.
          </p>
          <a href="/athletes" className="mt-4 inline-block text-indigo-600 hover:underline">
            Learn more →
          </a>
        </div>
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-8">
          <h3 className="text-xl font-semibold">For Coaches</h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Manage rosters, track erg scores, create boatings, assign workouts,
            and monitor your team.
          </p>
          <a href="/coaches" className="mt-4 inline-block text-indigo-600 hover:underline">
            Learn more →
          </a>
        </div>
      </section>
    </div>
  );
}

function ProductCard({
  title,
  description,
  href,
  cta,
}: {
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-8">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">{description}</p>
      <a href={href} className="mt-4 inline-block text-indigo-600 hover:underline">
        {cta} →
      </a>
    </div>
  );
}
