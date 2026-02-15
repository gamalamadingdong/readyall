import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support — Train Better",
  description: "Get help with Train Better products.",
};

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-bold">Support</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        Need help? Here are the best ways to get support.
      </p>

      <div className="mt-12 grid gap-8">
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
          <h3 className="text-lg font-semibold">Documentation</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Check the{" "}
            <a href="/docs" className="text-indigo-600 hover:underline">
              docs
            </a>{" "}
            for guides and how-tos.
          </p>
        </div>
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
          <h3 className="text-lg font-semibold">GitHub Issues</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Report bugs or ask questions on{" "}
            <a
              href="https://github.com/gamalamadingdong/logbook-companion/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
