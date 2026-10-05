"use client";

import Link from "next/link";
import { useProgress } from "@/components/ProgressProvider";
import { bookBySlug } from "@/data/books";

export default function ContinueReading() {
  const { last, totalRead } = useProgress();

  if (!last) return null;
  const book = bookBySlug(last.slug);
  const label = book ? book.title : last.slug;

  return (
    <section
      aria-label="Continue reading"
      className="flex flex-col items-center gap-3 rounded-2xl border border-gold-500/25 bg-gradient-to-br from-vineyard-800 to-vineyard-900 p-6 text-center sm:flex-row sm:justify-between sm:text-left"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-400">
          Continue reading
        </p>
        <p className="mt-2 font-display text-xl text-cream-100">
          {label}
          {last.title ? <span className="text-sage-300"> — {last.title}</span> : null}
        </p>
        <p className="mt-1 text-sm text-sage-400">
          You&rsquo;ve read {totalRead} chapter{totalRead === 1 ? "" : "s"} so
          far. Keep going.
        </p>
      </div>
      <Link
        href={`/book/${last.slug}/${last.idx}`}
        className="shrink-0 rounded-lg bg-gold-500 px-5 py-3 text-sm font-semibold text-vineyard-950 transition-colors hover:bg-gold-400"
      >
        Pick up where you left off →
      </Link>
    </section>
  );
}
