"use client";

import { useEffect, useState } from "react";

const FALLBACK = {
  ref: "Jeremiah 29:11",
  text: "\u201cFor I know the plans I have for you,\u201d declares the Lord, \u201cplans to prosper you and not to harm you, plans to give you hope and a future.\u201d",
};

export default function VerseOfDay() {
  const [verse, setVerse] = useState<{ ref: string; text: string } | null>(
    null
  );

  useEffect(() => {
    const today = new Date().toDateString();
    try {
      const cached = JSON.parse(localStorage.getItem("wogr_votd") || "null");
      if (cached?.day === today && cached?.text) {
        setVerse({ ref: cached.ref, text: cached.text });
        return;
      }
    } catch {
      /* ignore */
    }
    fetch("https://bible-api.com/?random")
      .then((r) => r.json())
      .then((d) => {
        if (!d?.text) throw new Error("empty");
        const v = { ref: d.reference as string, text: (d.text as string).trim() };
        try {
          localStorage.setItem(
            "wogr_votd",
            JSON.stringify({ day: today, ...v })
          );
        } catch {
          /* ignore */
        }
        setVerse(v);
      })
      .catch(() => setVerse(FALLBACK));
  }, []);

  return (
    <section
      aria-label="Verse of the day"
      className="rounded-2xl border border-gold-500/25 bg-vineyard-900/80 p-6 text-center shadow-[0_10px_36px_rgba(0,0,0,0.35)] sm:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-400">
        Verse of the day
      </p>
      <blockquote className="mx-auto mt-4 max-w-2xl font-scripture text-xl leading-relaxed text-cream-100 sm:text-2xl">
        {verse ? `\u201c${verse.text}\u201d` : "Loading today\u2019s verse\u2026"}
      </blockquote>
      {verse && (
        <p className="mt-4 text-sm font-medium text-sage-300">
          — {verse.ref}
        </p>
      )}
    </section>
  );
}
