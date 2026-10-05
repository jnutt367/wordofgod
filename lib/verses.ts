/* Verse parser: splits a chapter's running text into numbered verses.
 *
 * Chapter text looks like: "1 In the beginning God created... 2 Now the
 * earth was formless...". A number is treated as a verse boundary only when
 * it equals the next expected verse number (1, 2, 3, ...) — so numbers inside
 * the text itself ("40 days", "12 tribes") are never mistaken for verses.
 */
export interface Verse {
  n: number; // 0 = unnumbered block (fallback)
  text: string;
}

export function parseVerses(raw: string): Verse[] {
  const text = raw.replace(/\s+/g, " ").trim();
  if (!text) return [];

  const boundaries: { n: number; numStart: number; textStart: number }[] = [];
  const re = /(^|\s)(\d{1,3})\s/g;
  let m: RegExpExecArray | null;
  const candidates: { n: number; numStart: number; textStart: number }[] = [];
  while ((m = re.exec(text)) !== null && candidates.length < 500) {
    const n = parseInt(m[2], 10);
    const numStart = m.index + m[1].length;
    candidates.push({ n, numStart, textStart: numStart + m[2].length + 1 });
  }

  if (candidates.length === 0) return [{ n: 0, text }];

  // NIV-style text omits the "1": "In the beginning... 2 Now the earth..."
  // If there's no explicit verse 1 but the text leads into a "2",
  // the prologue IS verse 1.
  let expected: number;
  let startIdx = 0;
  const firstOne = candidates.findIndex((c) => c.n === 1);
  if (firstOne >= 0) {
    expected = 1;
    startIdx = firstOne;
  } else if (candidates[0].n === 2) {
    boundaries.push({ n: 1, numStart: 0, textStart: 0 });
    expected = 2;
  } else {
    return [{ n: 0, text }];
  }

  for (
    let i = startIdx;
    i < candidates.length && boundaries.length < 400;
    i++
  ) {
    if (candidates[i].n === expected) {
      boundaries.push(candidates[i]);
      expected++;
    }
  }

  if (boundaries.length === 0) return [{ n: 0, text }];

  const verses: Verse[] = [];
  for (let i = 0; i < boundaries.length; i++) {
    const b = boundaries[i];
    const end =
      i + 1 < boundaries.length ? boundaries[i + 1].numStart : text.length;
    let slice = text.slice(b.textStart, end).trim();
    // Any prologue before verse 1 belongs to verse 1.
    if (i === 0 && b.numStart > 0) {
      const prologue = text.slice(0, b.numStart).trim();
      if (prologue) slice = prologue + " " + slice;
    }
    verses.push({ n: b.n, text: slice });
  }
  return verses;
}

/** "Genesis 3:16" style reference for a verse. */
export function verseRef(bookTitle: string, chapterIdx: number, verseN: number): string {
  return `${bookTitle} ${chapterIdx + 1}:${verseN}`;
}
