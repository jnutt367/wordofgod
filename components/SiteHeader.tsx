import Link from "next/link";
import Image from "next/image";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search" },
  { href: "/#books", label: "Books" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold-500/15 bg-vineyard-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Word of God Risen — home">
          <Image
            src="/images/truvine-emblem.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <span className="font-display text-lg font-semibold tracking-wide text-cream-100">
            Word of God <span className="text-truvine-gradient">Risen</span>
          </span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-1 sm:gap-2">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-sage-300 transition-colors hover:bg-vineyard-800 hover:text-gold-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
