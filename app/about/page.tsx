import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
        About
      </p>
      <h1 className="mt-2 font-display text-3xl text-cream-50 sm:text-4xl">
        Why this reader exists
      </h1>

      <div className="mt-8 space-y-6 font-scripture text-lg leading-relaxed text-cream-100/90">
        <p>
          Word of God Risen is a simple Bible reader with a simple conviction:
          God wants us to know Him — &ldquo;this is eternal life, that they
          know you, the only true God, and Jesus Christ whom you have
          sent&rdquo; (John 17:3).
        </p>
        <p>
          Read full chapters with room to breathe. Follow the{" "}
          <span className="text-gold-300">✦ cross-references</span> wherever a
          verse echoes another. Mark chapters as read and watch your progress
          grow. Every book opens with an overview video from our friends at{" "}
          <a
            href="https://bibleproject.com"
            className="text-gold-300 underline"
          >
            BibleProject
          </a>
          .
        </p>
        <p>
          This is a not-for-profit passion project, crafted over years by a
          developer in his spare time — to show the hopeless that a man like
          me, or you, can be saved.
        </p>
      </div>

      <div className="vine-divider my-10" aria-hidden="true">
        <span>✦</span>
      </div>

      <div className="flex flex-col items-start gap-4 rounded-2xl border border-gold-500/15 bg-vineyard-900 p-6 sm:flex-row sm:items-center">
        <Image
          src="/images/truvine-emblem.png"
          alt="TruVINE emblem"
          width={56}
          height={56}
          className="h-14 w-14 object-contain"
        />
        <div>
          <p className="font-display text-xl text-cream-100">
            Made by Jason Nutt
          </p>
          <p className="mt-1 text-sm text-sage-400">
            Creator of{" "}
            <a
              href="https://www.youtube.com/@TruVINE365"
              className="text-gold-300 underline"
            >
              TruVINE
            </a>{" "}
            — centered on the King, not the crowds.
          </p>
          <div className="mt-3 flex gap-4 text-sm">
            <a
              href="mailto:jnutt367@gmail.com"
              className="text-sage-300 hover:text-gold-300"
            >
              Email
            </a>
            <a
              href="https://github.com/jnutt367"
              className="text-sage-300 hover:text-gold-300"
            >
              GitHub
            </a>
            <Link href="/" className="text-sage-300 hover:text-gold-300">
              Start reading →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
