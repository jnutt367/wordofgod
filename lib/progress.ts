/* Reading progress: persisted per-chapter read state in localStorage.
 * Keyed by "slug::chapterIndex" so it survives content edits.
 */
export interface ProgressEntry {
  title: string;
  at: number;
}

export type ProgressMap = Record<string, ProgressEntry>;

const STORE_KEY = "wogr_progress_v2";

export const chapterKey = (slug: string, idx: number) => `${slug}::${idx}`;

export function loadProgress(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveProgress(map: ProgressMap): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(map));
  } catch {
    /* storage unavailable — progress just won't persist */
  }
}

export function readOnPage(map: ProgressMap, slug: string): number[] {
  const prefix = `${slug}::`;
  return Object.keys(map)
    .filter((k) => k.startsWith(prefix))
    .map((k) => parseInt(k.slice(prefix.length), 10))
    .filter((n) => !Number.isNaN(n))
    .sort((a, b) => a - b);
}

export function lastRead(map: ProgressMap): {
  slug: string;
  idx: number;
  title: string;
  at: number;
} | null {
  let best: { slug: string; idx: number; title: string; at: number } | null =
    null;
  for (const k of Object.keys(map)) {
    const sep = k.lastIndexOf("::");
    if (sep < 0) continue;
    const entry = map[k];
    if (!best || (entry.at || 0) > best.at) {
      best = {
        slug: k.slice(0, sep),
        idx: parseInt(k.slice(sep + 2), 10),
        title: entry.title || "",
        at: entry.at || 0,
      };
    }
  }
  return best;
}
