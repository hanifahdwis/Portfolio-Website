"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Reveal, { SectionHeading } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const items = projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => showAll || project.featured);
  const extra = projects.filter((p) => !p.featured).length;

  return (
    <section
      id="portfolio"
      className="grain layer scroll-mt-16 bg-dickens px-5 py-24 text-parchment sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Catalog" title="Projects I've Done" />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {items.map(({ project: p, index }, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
                className={`flex flex-col rounded-md border-l-4 bg-card p-6 text-ink shadow-lg transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                  p.kind === "docs" ? "border-shakespeare" : "border-tolstoy"
                }`}
              >
                <div className="flex items-center justify-between font-label text-[10px] uppercase tracking-wider text-ink/50">
                  <span>PRJ-{p.year}-{String(index + 1).padStart(2, "0")}</span>
                  <span>{p.kind === "docs" ? "Documentation" : "Source code"}</span>
                </div>
                <div className="my-4 h-px bg-ink/15" />

                <h3 className="font-display text-2xl font-semibold leading-tight">{p.title}</h3>
                <p className="mt-1 font-display text-base italic text-tolstoy">{p.subtitle}</p>
                <p className="mt-4 flex-1 text-sm leading-6 text-ink/75">{p.description}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-ink/20 px-2.5 py-0.5 font-label text-[10px]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                {(p.githubUrl || p.demoUrl) && (
                  <div className="mt-5 flex gap-4 border-t border-ink/10 pt-4 text-sm">
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 transition hover:text-tolstoy"
                      >
                        <FiGithub /> Code
                      </a>
                    )}
                    {p.demoUrl && (
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 transition hover:text-tolstoy"
                      >
                        <FiExternalLink /> Demo
                      </a>
                    )}
                  </div>
                )}
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