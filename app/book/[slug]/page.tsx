import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllSlugs, getBook, getChapters } from "@/lib/bible";
import ChapterGrid from "@/components/ChapterGrid";
import VideoEmbed from "@/components/VideoEmbed";
import BookProgress from "@/components/BookProgress";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  return { title: book ? book.title : "Book" };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();
  const chapters = await getChapters(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/#books"
        className="text-sm font-medium text-sage-400 hover:text-gold-300"
      >
        ← All books
      </Link>

      <div className="mt-6 overflow-hidden rounded-2xl border border-gold-500/15 bg-vineyard-900">
        {book.image && (
          <div className="relative aspect-[21/9] sm:aspect-[28/9]">
            <Image
              src={book.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vineyard-950 via-vineyard-950/30 to-transparent" />
          </div>
        )}
        <div className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
            {book.testament === "old"
              ? "Old Testament"
              : book.testament === "new"
                ? "New Testament"
                : "Collection"}
          </p>
          <h1 className="mt-2 font-display text-3xl text-cream-50 sm:text-4xl">
            {book.title}
          </h1>
          {book.description && (
            <p className="mt-3 max-w-2xl font-scripture text-lg italic leading-relaxed text-sage-300">
              {book.description}
            </p>
          )}
          <div className="mt-5">
            <BookProgress slug={slug} total={chapters.length} />
          </div>
        </div>
      </div>

      {book.videoId && (
        <div className="mt-8">
          <h2 className="mb-4 font-display text-xl text-cream-100">
            Watch an overview
          </h2>
          <VideoEmbed
            videoId={book.videoId}
            title={`${book.title} overview video`}
          />
        </div>
      )}

      <h2 className="mb-5 mt-10 font-display text-2xl text-cream-100">
        Chapters
      </h2>
      <ChapterGrid slug={slug} chapters={chapters} />
    </div>
  );
}
