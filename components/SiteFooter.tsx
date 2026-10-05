import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-gold-500/15 bg-vineyard-900/60">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="vine-divider mb-6">
          <span className="text-lg">✦</span>
        </div>
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-display text-xl text-cream-100">
            &ldquo;Thy word is a lamp unto my feet, and a light unto my
            path.&rdquo;
          </p>
          <p className="text-sm text-sage-400">Psalm 119:105</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/" className="text-sage-300 hover:text-gold-300">
              Home
            </Link>
            <Link href="/search" className="text-sage-300 hover:text-gold-300">
              Search
            </Link>
            <Link href="/about" className="text-sage-300 hover:text-gold-300">
              About
            </Link>
            <a
              href="mailto:jnutt367@gmail.com"
              className="text-sage-300 hover:text-gold-300"
            >
              jnutt367@gmail.com
            </a>
          </div>
          <p className="mt-4 text-xs text-sage-500">
            A not-for-profit passion project by Jason Nutt · Scripture text
            (NIV) for reading &amp; study · Videos by{" "}
            <a
              href="https://bibleproject.com"
              className="underline hover:text-gold-300"
            >
              BibleProject
            </a>{" "}
            · Cross-references via{" "}
            <a
              href="https://www.openbible.info"
              className="underline hover:text-gold-300"
            >
              openbible.info
            </a>{" "}
            (CC-BY)
          </p>
        </div>
      </div>
    </footer>
  );
}
