"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

interface Entry {
  p: string;
  i: number;
  t: string;
  x: string;
}

function bookLabel(page: string): string {
  return page
    .replace(/\.html$/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[c];
  });
}

function highlight(text: string, q: string): string {
  const safe = esc(text);
  if (!q) return safe;
  const qi = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  try {
    return safe.replace(new RegExp(`(${qi})`, "ig"), "<mark>$1</mark>");
  } catch {
    return safe;
  }
}

function searchIndex(index: Entry[], q: string): Entry[] {
  const query = q.trim().toLowerCase();
  if (query.length < 2) return [];
  const titleHits: Entry[] = [];
  const textHits: Entry[] = [];
  for (const e of index) {
    if (e.t.toLowerCase().includes(query)) titleHits.push(e);
    else if (e.x.toLowerCase().includes(query)) textHits.push(e);
    if (titleHits.length + textHits.length >= 40) break;
  }
  return [...titleHits, ...textHits].slice(0, 40);
}

export default function SearchClient({ initialQuery }: { initialQuery: string }) {
  const [index, setIndex] = useState<Entry[] | null>(null);
  const [q, setQ] = useState(initialQuery);

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((d) => setIndex(d))
      .catch(() => setIndex([]));
  }, []);

  const hits = useMemo(
    () => (index ? searchIndex(index, q) : []),
    [index, q]
  );

  return (
    <div>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search every chapter… (try “mustard seed”)"
        aria-label="Search chapters"
        autoFocus
        className="w-full rounded-xl border-2 border-vineyard-700 bg-vineyard-900 px-5 py-4 text-lg text-cream-100 placeholder:text-sage-500 focus:border-gold-500 focus:outline-none"
      />
      <p className="mt-3 text-sm text-sage-400">
        {q.trim().length < 2
          ? index
            ? `Type at least 2 letters to search ${index.length} chapters.`
            : "Loading the search index…"
          : `${hits.length} result${hits.length === 1 ? "" : "s"}`}
      </p>
      <ul className="mt-4 space-y-1">
        {hits.map((e) => {
          const page = e.p.replace(/\.html$/, "");
          return (
            <li key={`${e.p}-${e.i}`}>
              <Link
                href={`/book/${page}/${e.i}`}
                className="block rounded-xl border border-transparent p-4 transition-colors hover:border-gold-500/30 hover:bg-vineyard-900"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-400">
                  {bookLabel(e.p)}
                </span>
                <span
                  className="mt-1 block font-display text-lg text-cream-100 [&_mark]:rounded [&_mark]:bg-gold-500/40 [&_mark]:px-0.5"
                  dangerouslySetInnerHTML={{
                    __html: highlight(e.t, q.trim()),
                  }}
                />
                <span
                  className="mt-1 block text-sm leading-relaxed text-sage-400 [&_mark]:rounded [&_mark]:bg-gold-500/40 [&_mark]:px-0.5"
                  dangerouslySetInnerHTML={{
                    __html: highlight(e.x, q.trim()) + "…",
                  }}
                />
              </Link>
            </li>
          );
        })}
      </ul>
      {q.trim().length >= 2 && index && hits.length === 0 && (
        <p className="py-10 text-center text-sage-400">
          No chapters found for &ldquo;{q.trim()}&rdquo;.
        </p>
      )}
    </div>
  );
}
