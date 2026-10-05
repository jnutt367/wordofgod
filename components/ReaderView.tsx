"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import VerseText from "@/components/VerseText";
import CrossRefPanel from "@/components/CrossRefPanel";
import { useProgress } from "@/components/ProgressProvider";
import type { Verse } from "@/lib/verses";

interface Props {
  slug: string;
  bookTitle: string;
  chapterIdx: number;
  chapterTitle: string;
  image: string;
  verses: Verse[];
  crossRefs: Record<number, string[]>;
  prevIdx: number | null;
  nextIdx: number | null;
}

export default function ReaderView({
  slug,
  bookTitle,
  chapterIdx,
  chapterTitle,
  image,
  verses,
  crossRefs,
  prevIdx,
  nextIdx,
}: Props) {
  const [lamp, setLamp] = useState(false);
  const [openRef, setOpenRef] = useState<{
    verseN: number;
    ref: string;
    targets: string[];
  } | null>(null);
  const { isRead, toggle } = useProgress();
  const read = isRead(slug, chapterIdx);

  return (
    <div className={`reader-theme ${lamp ? "lamp" : ""} min-h-screen bg-[var(--reader-bg)] transition-colors`}>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Top bar */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href={`/book/${slug}`}
            className="text-sm font-medium text-[var(--reader-muted)] hover:text-[var(--reader-verse-num)]"
          >
            ← {bookTitle}
          </Link>
          <button
            type="button"
            onClick={() => setLamp((v) => !v)}
            className="rounded-full border border-[var(--reader-line)] px-4 py-1.5 text-sm font-medium text-[var(--reader-muted)] transition-colors hover:text-[var(--reader-verse-num)]"
            aria-pressed={lamp}
          >
            {lamp ? "☾ Night" : "☀ Lamp"}
          </button>
        </div>

        {/* Chapter heading */}
        {image && (
          <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-2xl">
            <Image
              src={image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--reader-verse-num)]">
          {bookTitle}
        </p>
        <h1 className="mt-2 font-scripture text-3xl text-[var(--reader-ink)] sm:text-4xl">
          {chapterTitle || `Chapter ${chapterIdx + 1}`}
        </h1>
        <div className="vine-divider my-8" aria-hidden="true">
          <span>✦</span>
        </div>

        {/* Scripture */}
        <article>
          <VerseText
            verses={verses}
            bookTitle={bookTitle}
            chapterIdx={chapterIdx}
            crossRefs={crossRefs}
            onOpenRefs={(verseN, ref, targets) =>
              setOpenRef({ verseN, ref, targets })
            }
          />
        </article>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={() => toggle(slug, chapterIdx, chapterTitle)}
            className={`rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${
              read
                ? "bg-[var(--reader-verse-num)]/15 text-[var(--reader-verse-num)] border border-[var(--reader-verse-num)]/40"
                : "bg-[var(--reader-verse-num)] text-[var(--reader-bg)] hover:opacity-90"
            }`}
          >
            {read ? "✓ Read — tap to undo" : "✓ Mark as read"}
          </button>
          <nav
            className="flex w-full items-center justify-between gap-4"
            aria-label="Chapters"
          >
            {prevIdx !== null ? (
              <Link
                href={`/book/${slug}/${prevIdx}`}
                className="rounded-lg border border-[var(--reader-line)] px-4 py-2.5 text-sm font-medium text-[var(--reader-muted)] hover:text-[var(--reader-verse-num)]"
              >
                ← Previous
              </Link>
            ) : (
              <span />
            )}
            {nextIdx !== null ? (
              <Link
                href={`/book/${slug}/${nextIdx}`}
                className="rounded-lg border border-[var(--reader-line)] px-4 py-2.5 text-sm font-medium text-[var(--reader-muted)] hover:text-[var(--reader-verse-num)]"
              >
                Next →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </div>

      <CrossRefPanel openRef={openRef} onClose={() => setOpenRef(null)} />
    </div>
  );
}
