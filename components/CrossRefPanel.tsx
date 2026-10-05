"use client";

import { useEffect, useState } from "react";

interface Props {
  /** null = closed */
  openRef: { verseN: number; ref: string; targets: string[] } | null;
  onClose: () => void;
}

interface Fetched {
  ref: string;
  text: string;
}

const cache = new Map<string, Promise<Fetched>>();

function fetchPassage(ref: string): Promise<Fetched> {
  const key = ref.toLowerCase();
  if (!cache.has(key)) {
    cache.set(
      key,
      fetch(`https://bible-api.com/${encodeURIComponent(ref)}`)
        .then((r) => {
          if (!r.ok) throw new Error("not found");
          return r.json();
        })
        .then((d) => ({
          ref: d.reference as string,
          text: (d.text as string).trim(),
        }))
        .catch(() => ({ ref, text: "" }))
    );
  }
  return cache.get(key)!;
}

/**
 * Bottom sheet showing cross-referenced passages for a verse.
 * Passage text loads from bible-api.com (cached in-memory).
 */
export default function CrossRefPanel({ openRef, onClose }: Props) {
  const [items, setItems] = useState<Fetched[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!openRef) return;
    setLoading(true);
    setItems([]);
    let cancelled = false;
    Promise.all(openRef.targets.map(fetchPassage)).then((results) => {
      if (!cancelled) {
        setItems(results);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [openRef]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!openRef) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label={`Cross-references for ${openRef.ref}`}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-t-2xl border-t border-gold-500/30 bg-vineyard-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-gold-500/15 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-400">
              Cross-references
            </p>
            <h3 className="font-display text-xl text-cream-100">
              {openRef.ref}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-2xl leading-none text-sage-300 hover:bg-vineyard-800 hover:text-gold-300"
            aria-label="Close cross-references"
          >
            ×
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto px-5 py-4">
          {loading && (
            <p className="py-6 text-center text-sm text-sage-400">
              Gathering passages…
            </p>
          )}
          {!loading &&
            items.map((item, i) => (
              <div
                key={`${item.ref}-${i}`}
                className="border-b border-gold-500/10 py-4 last:border-0"
              >
                <p className="mb-1 text-sm font-semibold text-gold-300">
                  {item.ref}
                </p>
                {item.text ? (
                  <p className="font-scripture text-[1.05rem] leading-relaxed text-cream-100">
                    {item.text}
                  </p>
                ) : (
                  <p className="text-sm italic text-sage-400">
                    Text unavailable — look it up in your Bible.
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
