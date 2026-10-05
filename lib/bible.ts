import { promises as fs } from "fs";
import path from "path";
import { BOOKS, bookBySlug, type BookMeta } from "@/data/books";

export interface Chapter {
  title: string;
  image: string;
  text: string;
}

interface RawChapter {
  title?: string;
  image?: string;
  description?: string;
}

function normalizeImage(src: string | undefined): string {
  const s = (src || "").trim();
  if (!s) return "";
  if (s.startsWith("http") || s.startsWith("/")) return s;
  return "/" + s;
}

export function getAllBooks(): BookMeta[] {
  return BOOKS;
}

export function getBook(slug: string): BookMeta | undefined {
  return bookBySlug(slug);
}

export async function getChapters(slug: string): Promise<Chapter[]> {
  const file = path.join(
    process.cwd(),
    "data",
    "chapters",
    `${slug}_data.json`
  );
  const raw = await fs.readFile(file, "utf-8");
  const data = JSON.parse(raw) as { books?: RawChapter[] };
  return (data.books || [])
    .filter((b) => (b.description || "").trim().length > 0)
    .map((b) => ({
      title: (b.title || "").trim(),
      image: normalizeImage(b.image),
      text: (b.description || "").trim(),
    }));
}

/** Chapter number for display: derive from title ("Chapter V: ...") or index. */
export function chapterLabel(chapter: Chapter, idx: number): string {
  return chapter.title || `Chapter ${idx + 1}`;
}

/** All slugs, for generateStaticParams. */
export function getAllSlugs(): string[] {
  return BOOKS.map((b) => b.slug);
}
