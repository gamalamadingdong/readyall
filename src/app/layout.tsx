import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AuthStatus } from "@/components/AuthStatus";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReadyAll — Rowing Hub for Athletes, Coaches, and Community",
  description:
    "The hub at readyall.org for Logbook Companion, ErgLink, rowing workout notation, templates, coaching workflows, and community transparency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200/80 bg-white/85 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="h-2 w-2 rounded-full tb-accent-chip" aria-hidden />
          <span>ReadyAll</span>
        </a>
        <div className="flex items-center gap-5 text-sm text-neutral-600 dark:text-neutral-300">
          <a href="/products" className="hover:text-neutral-950 dark:hover:text-white">
            Apps
          </a>
          <a href="/community" className="hover:text-neutral-950 dark:hover:text-white">
            Community
          </a>
          <a href="/docs" className="hover:text-neutral-950 dark:hover:text-white">
            Docs
          </a>
          <AuthStatus />
          <ThemeToggle />
          <a
            href={process.env.NEXT_PUBLIC_LC_URL || "https://logbook.train-better.app"}
            className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-neutral-900 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            Open App
          </a>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 py-10">
      <div className="mx-auto max-w-7xl px-6 text-center text-sm text-neutral-500">
        <p>© {new Date().getFullYear()} ReadyAll. Community-supported open source.</p>
        <div className="mt-3 flex justify-center gap-5">
          <a href="/docs" className="hover:text-neutral-800 dark:hover:text-neutral-200">
            Docs
          </a>
          <a href="/community" className="hover:text-neutral-800 dark:hover:text-neutral-200">
            Community
          </a>
          <a href="/roadmap" className="hover:text-neutral-800 dark:hover:text-neutral-200">
            Roadmap
          </a>
          <a href="/feedback" className="hover:text-neutral-800 dark:hover:text-neutral-200">
            Feedback
          </a>
          <a href="/support" className="hover:text-neutral-800 dark:hover:text-neutral-200">
            Support
          </a>
          <a
            href="https://github.com/gamalamadingdong"
            className="tb-accent-text hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
