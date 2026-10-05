import type { Metadata } from "next";
import SearchClient from "@/components/SearchClient";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
        Search
      </p>
      <h1 className="mt-2 font-display text-3xl text-cream-50 sm:text-4xl">
        Search every chapter
      </h1>
      <div className="mt-8">
        <SearchClient initialQuery={q || ""} />
      </div>
    </div>
  );
}
