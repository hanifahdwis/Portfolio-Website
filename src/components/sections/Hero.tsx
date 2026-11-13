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

  // Pecah nama jadi kata -> huruf, simpan nomor urut huruf untuk ritme animasinya
  let n = 0;
  const words = site.heroTitle.split(" ").map((word) => ({
    word,
    letters: word.split("").map((char) => ({ char, i: n++ })),
  }));

  return (
    <section
      id="top"
      className="grain lamp layer flex min-h-screen flex-col items-center justify-center bg-ink px-4 pb-10 pt-24 text-parchment"
    >
      {/* Nama: huruf terbalik berurutan seperti halaman buku, berulang pelan */}
      <h1
        aria-label={site.heroTitle}
        className="flex flex-wrap justify-center gap-x-[0.3em] text-center font-display text-5xl font-medium sm:text-7xl"
      >
        {words.map(({ word, letters }) => (
          <span key={word} aria-hidden className="inline-block whitespace-nowrap">
            {letters.map(({ char, i }) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={reduce ? false : { opacity: 0, y: 14, rotateX: -45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.04, ease }}
                style={{ transformPerspective: 600 }}
              >
                <motion.span
                  className="inline-block"
                  style={{ transformPerspective: 600 }}
                  animate={reduce ? { rotateY: 0 } : { rotateY: [0, -65, 0] }}
                  transition={{
                    duration: reduce ? 0 : 0.9,
                    delay: 1.4 + i * 0.07,
                    repeat: reduce ? 0 : Infinity,
                    repeatDelay: 3.5,
                    ease: "easeInOut",
                  }}
                >
                  {char}
                </motion.span>
              </motion.span>
            ))}
          </span>
        ))}
      </h1>

      <motion.div {...fade(0.9)} className="mt-6 flex flex-wrap justify-center gap-3">
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
        {...fade(0.5, 40)}
        className="relative mt-8 w-full"
        style={{ maxWidth: "min(64rem, calc((100vh - 240px) * 1.95))" }}
      >
        <Bookshelf />
        {shelfLabels.map((label, i) => (
          <motion.div
            key={label.text}
            className="pointer-events-none absolute inset-0"
            {...fade(1 + i * 0.08, 8)}
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