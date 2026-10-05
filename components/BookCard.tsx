"use client";

import Link from "next/link";
import Image from "next/image";
import type { BookMeta } from "@/data/books";
import { useProgress } from "@/components/ProgressProvider";

export default function BookCard({ book }: { book: BookMeta }) {
  const { readOnPage } = useProgress();
  const read = readOnPage(book.slug).length;
  const pct =
    book.chapters > 0 ? Math.round((read / book.chapters) * 100) : 0;

  return (
    <Link
      href={`/book/${book.slug}`}
      className="group overflow-hidden rounded-xl border border-gold-500/15 bg-vineyard-900 transition-all hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        {book.image ? (
          <Image
            src={book.image}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-vineyard-700 to-vineyard-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-vineyard-950/90 via-transparent to-transparent" />
        {read > 0 && (
          <span className="absolute right-2 top-2 rounded-full bg-vineyard-950/80 px-2.5 py-1 text-[0.7rem] font-semibold text-gold-300 backdrop-blur">
            {pct}% read
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg text-cream-100 group-hover:text-gold-300">
          {book.title}
        </h3>
        <p className="mt-0.5 text-xs uppercase tracking-[0.12em] text-sage-400">
          {book.chapters} chapters
        </p>
        {read > 0 && (
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-vineyard-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        )}
      </div>
    </Link>
  );
}
