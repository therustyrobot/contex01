import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "contex01",
  description: "Your self-hosted launchpad for project contexts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-border">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="font-mono text-sm tracking-tight text-zinc-100">
              contex<span className="text-accent">01</span>
            </Link>
            <a
              href="https://github.com/therustyrobot/contex01"
              className="chip hover:border-accent hover:text-accent"
            >
              star on github
            </a>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
