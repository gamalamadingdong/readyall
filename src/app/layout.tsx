import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Train Better — Rowing Tools for Athletes & Coaches",
  description:
    "The hub for Logbook Companion and ErgLink. Track workouts, analyze performance, connect ergs, and manage your team.",
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
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="text-xl font-bold">
          Train Better
        </a>
        <div className="flex items-center gap-6 text-sm">
          <a href="/products" className="hover:underline">
            Products
          </a>
          <a href="/athletes" className="hover:underline">
            Athletes
          </a>
          <a href="/coaches" className="hover:underline">
            Coaches
          </a>
          <a href="/community" className="hover:underline">
            Community
          </a>
          <a href="/docs" className="hover:underline">
            Docs
          </a>
          <a
            href={process.env.NEXT_PUBLIC_LC_URL || "https://log.train-better.app"}
            className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
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
    <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8">
      <div className="mx-auto max-w-7xl px-6 text-center text-sm text-neutral-500">
        <p>© {new Date().getFullYear()} Train Better. Community-supported open source.</p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="/roadmap" className="hover:underline">
            Roadmap
          </a>
          <a href="/feedback" className="hover:underline">
            Feedback
          </a>
          <a href="/support" className="hover:underline">
            Support
          </a>
          <a
            href="https://github.com/gamalamadingdong"
            className="hover:underline"
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
