"use client";

import Link from "next/link";
import Image from "next/image";
import { useProgress } from "@/components/ProgressProvider";
import type { Chapter } from "@/lib/bible";

interface Props {
  slug: string;
  chapters: Chapter[];
}

export default function ChapterGrid({ slug, chapters }: Props) {
  const { isRead } = useProgress();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {chapters.map((ch, i) => {
        const read = isRead(slug, i);
        return (
          <Link
            key={i}
            href={`/book/${slug}/${i}`}
            className="group relative overflow-hidden rounded-xl border border-gold-500/15 bg-vineyard-900 transition-all hover:-translate-y-1 hover:border-gold-500/40"
          >
            {ch.image && (
              <div className="relative aspect-[16/8] overflow-hidden">
                <Image
                  src={ch.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vineyard-950/85 via-transparent to-transparent" />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-display text-base leading-snug text-cream-100 group-hover:text-gold-300">
                {ch.title || `Chapter ${i + 1}`}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-sage-400">
                {ch.text.slice(0, 120)}…
              </p>
            </div>
            {read && (
              <span className="absolute right-2 top-2 rounded-full bg-vineyard-950/80 px-2.5 py-1 text-[0.7rem] font-semibold text-gold-300 backdrop-blur">
                ✓ Read
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
