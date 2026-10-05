import { promises as fs } from "fs";
import path from "path";

/** "Genesis 1:1" -> ["John 1:1", ...]. Built by the cross-ref dataset job. */
let cache: Record<string, string[]> | null = null;

export async function getCrossRefs(): Promise<Record<string, string[]>> {
  if (cache) return cache;
  try {
    const raw = await fs.readFile(
      path.join(process.cwd(), "data", "cross-refs.json"),
      "utf-8"
    );
    cache = JSON.parse(raw) as Record<string, string[]>;
  } catch {
    cache = {};
  }
  return cache;
}

/** Narrow the full map to one chapter: verse number -> targets. */
export function refsForChapter(
  all: Record<string, string[]>,
  bookTitle: string,
  chapterNum: number
): Record<number, string[]> {
  const out: Record<number, string[]> = {};
  const prefix = `${bookTitle} ${chapterNum}:`;
  for (const k of Object.keys(all)) {
    if (k.startsWith(prefix)) {
      const verseN = parseInt(k.slice(prefix.length), 10);
      if (!Number.isNaN(verseN) && verseN > 0) out[verseN] = all[k];
    }
  }
  return out;
}
