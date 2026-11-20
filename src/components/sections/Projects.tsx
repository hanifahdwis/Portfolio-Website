"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Reveal, { SectionHeading } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";

const ease = [0.22, 1, 0.36, 1] as const;
const COLLAPSED = 6; // 2 baris x 3 kolom

const sorted = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));

const iconLink =
  "grid h-9 w-9 place-items-center rounded-full border border-ink/15 transition hover:border-mahogany hover:bg-mahogany hover:text-parchment";

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const items = showAll ? sorted : sorted.slice(0, COLLAPSED);
  const extra = sorted.length - COLLAPSED;

  return (
    <section
      id="portfolio"
      className="grain layer scroll-mt-16 bg-dickens px-5 py-24 text-parchment sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Catalog" title="Projects I've Done" />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {items.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
                className="group relative flex flex-col overflow-hidden rounded-xl bg-card p-6 text-ink shadow-lg ring-1 ring-transparent transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-gold/70"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1.5 origin-left scale-x-[0.3] bg-gradient-to-r from-tolstoy via-gold to-shakespeare transition-transform duration-500 group-hover:scale-x-100"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 -top-5 z-0 font-display text-8xl font-bold text-ink/[0.05] transition-colors duration-300 group-hover:text-tolstoy/20"
                >
                  {p.year}
                </span>

                <div className="relative flex flex-1 flex-col">
                  <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-1 font-display text-base italic text-tolstoy">{p.subtitle}</p>
                  <p className="mt-4 flex-1 text-sm leading-6 text-ink/75">{p.description}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-tolstoy/10 px-2.5 py-0.5 font-label text-[10px] text-mahogany"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  {(p.githubUrl || p.demoUrl) && (
                    <div className="mt-5 flex items-center gap-2 border-t border-ink/10 pt-4">
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${p.title} on GitHub`}
                          className={iconLink}
                        >
                          <FiGithub />
                        </a>
                      )}
                      {p.demoUrl && (
                        <a
                          href={p.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${p.title} live demo`}
                          className={iconLink}
                        >
                          <FiExternalLink />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {extra > 0 && (
          <Reveal className="mt-10 flex justify-center">
            <button
              type="button"
              aria-expanded={showAll}
              onClick={() => setShowAll((v) => !v)}
              className="rounded-full border border-gold/60 px-6 py-2.5 font-label text-xs uppercase tracking-widest text-gold transition hover:bg-gold hover:text-ink"
            >
              {showAll ? "Show fewer" : `Look for more (${extra})`}
            </button>
          </Reveal>
        )}
      </div>
    </section>
  );
}