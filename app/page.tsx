import Image from "next/image";
import Link from "next/link";
import { getAllBooks } from "@/lib/bible";
import BookCard from "@/components/BookCard";
import VerseOfDay from "@/components/VerseOfDay";
import ContinueReading from "@/components/ContinueReading";

export default function Home() {
  const books = getAllBooks();
  const ot = books.filter((b) => b.testament === "old");
  const nt = books.filter((b) => b.testament === "new");
  const extra = books.filter((b) => b.testament === "extra");

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/wogr-hero-banner.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-vineyard-950/70 via-vineyard-950/55 to-vineyard-950" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-300">
            A Bible reader
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-cream-50 sm:text-6xl">
            The Word of God,{" "}
            <span className="text-truvine-gradient">Risen</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-scripture text-lg italic text-cream-100/90 sm:text-xl">
            &ldquo;I am the way, the truth, and the life.&rdquo;
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sage-300">
            Read full chapters, follow cross-references, and watch your
            reading grow — one chapter at a time.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#books"
              className="rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-vineyard-950 transition-colors hover:bg-gold-400"
            >
              Start reading
            </Link>
            <Link
              href="/search"
              className="rounded-lg border border-cream-100/25 px-6 py-3 text-sm font-semibold text-cream-100 transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              Search the Word
            </Link>
          </div>
        </div>
      </section>

      {/* Widgets */}
      <div className="mx-auto max-w-4xl space-y-5 px-4 py-10 sm:px-6">
        <VerseOfDay />
        <ContinueReading />
      </div>

      {/* Book grid */}
      <section id="books" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-20 sm:px-6">
        <div className="vine-divider mb-8" aria-hidden="true">
          <span className="font-display text-lg tracking-wide">✦</span>
        </div>

        <h2 className="font-display text-2xl text-cream-100 sm:text-3xl">
          Old Testament
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ot.map((b) => (
            <BookCard key={b.slug} book={b} />
          ))}
        </div>

        <h2 className="mt-14 font-display text-2xl text-cream-100 sm:text-3xl">
          New Testament
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {nt.map((b) => (
            <BookCard key={b.slug} book={b} />
          ))}
        </div>

        {extra.length > 0 && (
          <>
            <h2 className="mt-14 font-display text-2xl text-cream-100 sm:text-3xl">
              More to explore
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {extra.map((b) => (
                <BookCard key={b.slug} book={b} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
