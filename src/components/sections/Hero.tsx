"use client";

import { motion, useReducedMotion } from "framer-motion";
import Bookshelf from "@/components/illustrations/Bookshelf";
import ShelfLabel from "@/components/ui/ShelfLabel";
import { site, shelfLabels } from "@/data/site";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const words = site.tagline.split(" ");

  return (
    <section
      id="top"
      className="grain lamp layer flex min-h-screen flex-col items-center justify-center bg-ink px-4 pb-16 pt-28 text-parchment"
    >
      {/* Title */}
      <motion.h1
        className="text-center font-display text-5xl font-medium sm:text-7xl"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.65 }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {site.heroTitle}
      </motion.h1>

      {/* tagline */}
      <motion.p
        className="mt-2 flex flex-wrap justify-center font-display text-xl opacity-80 sm:text-2xl"
        style={{ perspective: 800 }}
        aria-label={site.tagline}
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="mr-[0.25em] inline-block"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 12, rotateX: -35 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
              rotateX: 0,
            }}
            viewport={{ once: false, amount: 0.65 }}
            transition={{
              duration: 0.45,
              delay: index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.span
              className="inline-block"
              style={{ transformOrigin: "50% 50%" }}
              animate={
                reduceMotion
                  ? { rotateY: 0 }
                  : { rotateY: [0, -18, 0] }
              }
              transition={{
                duration: reduceMotion ? 0 : 1.1,
                delay: index * 0.16,
                repeat: reduceMotion ? 0 : Infinity,
                repeatDelay: 4.2,
                ease: "easeInOut",
              }}
            >
              {word}
            </motion.span>
          </motion.span>
        ))}
      </motion.p>

      {/* Bookshelf */}
      <motion.div
        className="relative mt-10 w-full"
        style={{
          maxWidth: "min(64rem, calc((100vh - 280px) * 1.95))",
          transformOrigin: "50% 85%",
        }}
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 42,
                scaleY: 0.82,
                scaleX: 0.96,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
          scaleY: 1,
          scaleX: 1,
        }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{
          duration: 0.9,
          delay: 0.12,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, scale: 0.96 }
          }
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{
            duration: 0.75,
            delay: 0.18,
          }}
        >
          <Bookshelf />
        </motion.div>

        {/* Shelf labels */}
        {shelfLabels.map((label, index) => (
          <motion.div
            key={label.text}
            className="pointer-events-none absolute inset-0"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 8, scale: 0.92 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{
              duration: 0.42,
              delay: 0.35 + index * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
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
