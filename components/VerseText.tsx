"use client";

import { verseRef, type Verse } from "@/lib/verses";

interface Props {
  verses: Verse[];
  bookTitle: string;
  chapterIdx: number;
  /** verse number -> list of "Book C:V" strings */
  crossRefs: Record<number, string[]>;
  onOpenRefs: (verseN: number, ref: string, targets: string[]) => void;
}

/**
 * Renders a chapter as individual verses with gold verse numbers.
 * Verses that have cross-references get a ✦ marker that opens the
 * reference panel.
 */
export default function VerseText({
  verses,
  bookTitle,
  chapterIdx,
  crossRefs,
  onOpenRefs,
}: Props) {
  return (
    <div className="font-scripture text-[1.18rem] leading-[1.9] text-[var(--reader-ink)]">
      {verses.map((v) => {
        const ref = v.n > 0 ? verseRef(bookTitle, chapterIdx, v.n) : null;
        const targets = v.n > 0 ? crossRefs[v.n] : undefined;
        return (
          <p key={v.n} className="mb-5">
            {v.n > 0 && (
              <sup className="mr-2 font-body text-[0.72em] font-semibold text-[var(--reader-verse-num)]">
                {v.n}
              </sup>
            )}
            <span>{v.text}</span>
            {ref && targets && targets.length > 0 && (
              <button
                type="button"
                onClick={() => onOpenRefs(v.n, ref, targets)}
                className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--reader-verse-num)]/50 align-middle font-body text-[0.7rem] text-[var(--reader-verse-num)] transition-colors hover:bg-[var(--reader-verse-num)] hover:text-[var(--reader-bg)]"
                aria-label={`Cross-references for ${ref}`}
                title={`Cross-references for ${ref}`}
              >
                ✦
              </button>
            )}
          </p>
        );
      })}
    </div>
  );
}
