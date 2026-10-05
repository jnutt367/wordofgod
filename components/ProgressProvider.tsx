"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  chapterKey,
  loadProgress,
  saveProgress,
  readOnPage,
  lastRead,
  type ProgressMap,
} from "@/lib/progress";

interface ProgressCtx {
  map: ProgressMap;
  isRead: (slug: string, idx: number) => boolean;
  toggle: (slug: string, idx: number, title: string) => boolean;
  readOnPage: (slug: string) => number[];
  totalRead: number;
  last: { slug: string; idx: number; title: string; at: number } | null;
}

const Ctx = createContext<ProgressCtx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [map, setMap] = useState<ProgressMap>({});

  useEffect(() => {
    setMap(loadProgress());
  }, []);

  const persist = useCallback((next: ProgressMap) => {
    setMap(next);
    saveProgress(next);
  }, []);

  const isRead = useCallback(
    (slug: string, idx: number) => Boolean(map[chapterKey(slug, idx)]),
    [map]
  );

  const toggle = useCallback(
    (slug: string, idx: number, title: string): boolean => {
      const key = chapterKey(slug, idx);
      const next = { ...map };
      let nowRead: boolean;
      if (next[key]) {
        delete next[key];
        nowRead = false;
      } else {
        next[key] = { title, at: Date.now() };
        nowRead = true;
      }
      persist(next);
      return nowRead;
    },
    [map, persist]
  );

  const value = useMemo<ProgressCtx>(
    () => ({
      map,
      isRead,
      toggle,
      readOnPage: (slug: string) => readOnPage(map, slug),
      totalRead: Object.keys(map).length,
      last: lastRead(map),
    }),
    [map, isRead, toggle]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProgress(): ProgressCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}
