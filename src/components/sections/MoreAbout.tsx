"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Reveal, { SectionHeading } from "@/components/ui/Reveal";
import { journey } from "@/data/journey";

const ease = [0.22, 1, 0.36, 1] as const;

const focus = [
  "Software Engineering",
  "Frontend",
  "Backend",
  "Full-stack",
  "Mobile",
  "Technical Project Coordination",
];

function Sub({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal>
      <p className="font-label text-[10px] uppercase tracking-[0.2em] text-parchment/60">
        {eyebrow}
      </p>
      <h3 className="mb-7 mt-2 font-display text-3xl">{title}</h3>
    </Reveal>
  );
}

// Foto muncul dari kanan saat di-scroll; saat di-hover lurus, naik, dan gambarnya zoom
function Photo({ src, alt }: { src: string; alt: string }) {
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, x: 40, rotate: 5 }}
      whileInView={{ opacity: 1, x: 0, rotate: 2 }}
      whileHover={
        reduce
          ? undefined
          : {
              rotate: 0,
              scale: 1.05,
              y: -6,
              transition: { type: "spring", stiffness: 300, damping: 18 },
            }
      }
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease }}
      className="group relative mt-5 w-full max-w-80 rounded-sm bg-card p-2 shadow-xl transition-shadow duration-300 hover:shadow-2xl lg:mt-0"
    >
      <div className="overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={640}
          height={440}
          className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => setFailed(true)}
        />
      </div>
    </motion.figure>
  );
}

export default function MoreAbout() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section
      id="more"
      className="grain layer scroll-mt-16 bg-mahogany px-5 py-24 text-parchment sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Beyond the resume" title="More About Me" />

        {/* Currently */}
        <Reveal>
          <motion.div
            animate={
              reduce
                ? undefined
                : {
                    boxShadow: [
                      "0 0 0 0 rgba(197,163,106,0)",
                      "0 0 30px 0 rgba(197,163,106,0.22)",
                      "0 0 0 0 rgba(197,163,106,0)",
                    ],
                  }
            }
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative grid gap-8 overflow-hidden rounded-md border border-gold/30 bg-ink/30 p-7 sm:p-9 lg:grid-cols-[1.2fr_1fr] lg:items-center"
          >
            {/* Kilau yang menyapu pelan */}
            {!reduce && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-gold/10 to-transparent"
                animate={{ x: ["0%", "450%"] }}
                transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
              />
            )}

            <div className="relative">
              <p className="flex items-center gap-2.5 font-label text-[10px] uppercase tracking-[0.2em] text-gold">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60 motion-reduce:animate-none" />
                  <span className="relative h-2 w-2 rounded-full bg-gold" />
                </span>
                Currently
              </p>
              <h3 className="mt-3 font-display text-3xl leading-snug sm:text-4xl">
                Looking for an{" "}
                <span className="relative inline-block text-gold">
                  internship
                  <motion.span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-gold"
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.5, ease }}
                  />
                </span>{" "}
                in software engineering.
              </h3>
              <p className="mt-3 leading-7 text-parchment/75">
                Software Engineering student at ITS, building web and mobile projects and
                coordinating campus tech events.
              </p>
            </div>

            <ul className="relative flex flex-wrap gap-2">
              {focus.map((f, i) => (
                <motion.li
                  key={f}
                  initial={reduce ? false : { opacity: 0, scale: 0.7 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    transition: { delay: 0.2 + i * 0.08, type: "spring", stiffness: 300, damping: 16 },
                  }}
                  animate={
                    reduce
                      ? undefined
                      : {
                          y: [0, -4, 0],
                          transition: {
                            duration: 3 + (i % 3) * 0.6,
                            delay: i * 0.25,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }
                  }
                  whileHover={{
                    scale: 1.12,
                    transition: { type: "spring", stiffness: 500, damping: 10 },
                  }}
                  viewport={{ once: true }}
                  className="cursor-default rounded-full border border-parchment/25 px-3.5 py-1.5 text-sm transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-ink"
                >
                  {f}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </Reveal>

        {/* Journey */}
        <div className="mt-20">
          <Sub eyebrow="Timeline" title="Journey" />
          <ol ref={listRef} className="relative">
            {/* Garis dasar: selalu terlihat, tidak ada bagian yang tampak putus */}
            <span
              aria-hidden
              className="absolute left-1.5 top-2 h-[calc(100%-1rem)] w-0.5 bg-gold/30 md:left-[calc(10.5rem+6px)]"
            />
            <motion.span
              aria-hidden
              style={{ scaleY: fill }}
              className="absolute left-1.5 top-2 h-[calc(100%-1rem)] w-0.5 origin-top bg-gold shadow-[0_0_10px_rgba(197,163,106,0.6)] md:left-[calc(10.5rem+6px)]"
            />

            {journey.map((j, i) => (
              <li
                key={j.label + j.title}
                className="relative pb-14 pl-8 last:pb-0 md:pl-[13.5rem]"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-gold bg-mahogany md:left-[10.5rem]"
                />
                <p className="font-label text-xs uppercase tracking-wider text-gold md:absolute md:left-0 md:top-1.5 md:w-40 md:text-right">
                  {j.label}
                </p>

                <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-8">
                  <Reveal delay={0.05} y={16}>
                    <p className="mt-2 font-label text-[10px] uppercase tracking-[0.2em] text-parchment/50 md:mt-0">
                      Chapter {String(i + 1).padStart(2, "0")}
                    </p>
                    <h4 className="mt-1 font-display text-2xl font-semibold">{j.title}</h4>
                    <p className="mt-1.5 max-w-xl text-sm leading-6 text-parchment/70">
                      {j.description}
                    </p>
                  </Reveal>
                  {j.photo && <Photo src={j.photo} alt={j.photoAlt ?? j.title} />}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}