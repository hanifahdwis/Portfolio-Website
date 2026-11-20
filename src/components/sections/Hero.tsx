"use client";

import { motion, useReducedMotion } from "framer-motion";
import Bookshelf from "@/components/illustrations/Bookshelf";
import ShelfLabel from "@/components/ui/ShelfLabel";
import { site, shelfLabels } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number, y = 18) => ({
    initial: reduce ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section
      id="top"
      className="grain lamp layer flex min-h-screen flex-col items-center justify-center bg-ink px-4 pb-10 pt-24 text-parchment"
    >
      <motion.h1
        {...fade(0.1)}
        className="text-center font-display text-5xl font-medium sm:text-7xl"
      >
        {site.heroTitle}
      </motion.h1>

      <motion.div {...fade(0.4)} className="mt-6 flex flex-wrap justify-center gap-3">
        <a
          href="#portfolio"
          className="rounded-full bg-gold px-6 py-2.5 font-label text-xs uppercase tracking-widest text-ink transition hover:bg-parchment"
        >
          View projects
        </a>
        <a
          href="#contact"
          className="rounded-full border border-parchment/30 px-6 py-2.5 font-label text-xs uppercase tracking-widest transition hover:border-gold hover:text-gold"
        >
          Get in touch
        </a>
      </motion.div>

      {/* Rak buku: muncul sekali, setelah itu tiap buku bergerak sendiri */}
      <motion.div
        {...fade(0.3, 40)}
        className="relative mt-8 w-full"
        style={{ maxWidth: "min(64rem, calc((100vh - 240px) * 1.95))" }}
      >
        <Bookshelf />
        {shelfLabels.map((label, i) => (
          <motion.div
            key={label.text}
            className="pointer-events-none absolute inset-0"
            {...fade(0.7 + i * 0.08, 8)}
          >
            <div className="pointer-events-auto">
              <ShelfLabel {...label} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}