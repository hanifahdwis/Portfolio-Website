"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FiCheckSquare, FiFileText, FiUsers } from "react-icons/fi";
import Reveal, { SectionHeading } from "@/components/ui/Reveal";
import { interests } from "@/data/interests";
import { journey } from "@/data/journey";

const focus = [
  "Software Engineering",
  "Frontend",
  "Backend",
  "Full-stack",
  "Mobile",
  "Technical Project Coordination",
];

const principles = [
  {
    icon: FiFileText,
    title: "Understand first",
    text: "I like to get requirements and design clear before building. For PujaServe, I wrote the requirements (SKPL) and design (DPPL) documents covering architecture, database, and workflows.",
  },
  {
    icon: FiCheckSquare,
    title: "Verify the work",
    text: "I back what I build with automated tests where I can, like the Jest tests for the event ticketing backend.",
  },
  {
    icon: FiUsers,
    title: "Keep the team aligned",
    text: "I plan timelines, guidelines, and documents so everyone knows what is next, as I did with a 20-member team for  bootcamp for 300+ participants.",
  },
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

function Photo({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <div className="mt-4 inline-block -rotate-2 rounded-sm bg-card p-1.5 shadow-lg transition-transform duration-300 hover:rotate-0">
      <Image
        src={src}
        alt={alt}
        width={320}
        height={200}
        className="h-40 w-64 object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export default function MoreAbout() {
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
          <div className="grid gap-8 rounded-md border border-gold/30 bg-ink/30 p-7 sm:p-9 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="flex items-center gap-2.5 font-label text-[10px] uppercase tracking-[0.2em] text-gold">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60 motion-reduce:animate-none" />
                  <span className="relative h-2 w-2 rounded-full bg-gold" />
                </span>
                Currently
              </p>
              <h3 className="mt-3 font-display text-3xl leading-snug sm:text-4xl">
                Looking for an internship in software engineering.
              </h3>
              <p className="mt-3 leading-7 text-parchment/75">
                Software Engineering student at ITS, building web and mobile projects and
                coordinating campus tech events.
              </p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {focus.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-parchment/25 px-3.5 py-1.5 text-sm"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Interests */}
        <div className="mt-20">
          <Sub eyebrow="Focus" title="Interests" />
          <ul className="grid gap-x-12 border-b border-parchment/15 sm:grid-cols-2">
            {interests.map((it, i) => (
              <li key={it.title}>
                <Reveal delay={i * 0.06} y={12}>
                  <div className="group border-t border-parchment/15 py-5">
                    <h4 className="font-display text-xl font-semibold transition-colors duration-300 group-hover:text-gold">
                      {it.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-6 text-parchment/70">
                      {it.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* How I work */}
        <div className="mt-20">
          <Sub eyebrow="Approach" title="How I Work" />
          <ul className="grid gap-5 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <Reveal delay={i * 0.1} y={16} className="h-full">
                  <div className="h-full rounded-md border border-parchment/15 bg-ink/25 p-6 transition-colors duration-300 hover:border-gold/50">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-gold/15 text-gold">
                      <Icon size={18} />
                    </span>
                    <h4 className="mt-4 font-display text-xl font-semibold">{title}</h4>
                    <p className="mt-2 text-sm leading-6 text-parchment/70">{text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* Journey */}
        <div className="mt-20">
          <Sub eyebrow="Timeline" title="Journey" />
          <ol ref={listRef} className="relative">
            <span
              aria-hidden
              className="absolute left-1.75 top-2 h-[calc(100%-1rem)] w-px bg-parchment/20 md:left-43.75"
            />
            <motion.span
              aria-hidden
              style={{ scaleY: fill }}
              className="absolute left-1.75 top-2 h-[calc(100%-1rem)] w-px origin-top bg-gold md:left-43.75"
            />

            {journey.map((j, i) => (
              <li key={j.label + j.title} className="relative pb-12 pl-8 last:pb-0 md:pl-54">
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-gold bg-mahogany md:left-42"
                />
                <p className="font-label text-xs uppercase tracking-wider text-gold md:absolute md:left-0 md:top-1.5 md:w-40 md:text-right">
                  {j.label}
                </p>
                <Reveal delay={0.05} y={16}>
                  <p className="mt-2 font-label text-[10px] uppercase tracking-[0.2em] text-parchment/50 md:mt-0">
                    Chapter {String(i + 1).padStart(2, "0")}
                  </p>
                  <h4 className="mt-1 font-display text-2xl font-semibold">{j.title}</h4>
                  <p className="mt-1.5 max-w-xl text-sm leading-6 text-parchment/70">
                    {j.description}
                  </p>
                  {j.photo && <Photo src={j.photo} alt={j.photoAlt ?? j.title} />}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}