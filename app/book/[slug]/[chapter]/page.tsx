import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getBook, getChapters } from "@/lib/bible";
import { parseVerses } from "@/lib/verses";
import { getCrossRefs, refsForChapter } from "@/lib/crossrefs";
import ReaderView from "@/components/ReaderView";

export function generateStaticParams() {
  const params: { slug: string; chapter: string }[] = [];
  for (const slug of getAllSlugs()) {
    // chapter count is data-driven; generate lazily at request time instead.
    // (Static export would enumerate here — see note below.)
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; chapter: string }>;
}): Promise<Metadata> {
  const { slug, chapter } = await params;
  const book = getBook(slug);
  const chapters = book ? await getChapters(slug) : [];
  const idx = parseInt(chapter, 10);
  const ch = chapters[idx];
  return {
    title: book && ch ? `${book.title} ${idx + 1}` : "Reading",
  };
}

export default async function ReaderPage({
  params,
}: {
  params: Promise<{ slug: string; chapter: string }>;
}) {
  const { slug, chapter } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  const chapters = await getChapters(slug);
  const idx = parseInt(chapter, 10);
  if (Number.isNaN(idx) || idx < 0 || idx >= chapters.length) notFound();
  const ch = chapters[idx];

  const verses = parseVerses(ch.text);
  const allRefs = await getCrossRefs();
  const crossRefs = refsForChapter(allRefs, book.title, idx + 1);

  return (
    <ReaderView
      slug={slug}
      bookTitle={book.title}
      chapterIdx={idx}
      chapterTitle={ch.title}
      image={ch.image}
      verses={verses}
      crossRefs={crossRefs}
      prevIdx={idx > 0 ? idx - 1 : null}
      nextIdx={idx < chapters.length - 1 ? idx + 1 : null}
    />
  );
}
