"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiBookOpen, FiCalendar, FiMapPin, FiUser } from "react-icons/fi";
import IdentificationCard from "@/components/ui/IdentificationCard";
import Reveal, { SectionHeading } from "@/components/ui/Reveal";
import { biodata, education } from "@/data/education";
import { site } from "@/data/site";

type Tab = "bio" | "edu";

const tabs = [
  { id: "bio" as const, label: "Biodata", icon: FiUser },
  { id: "edu" as const, label: "Education", icon: FiBookOpen },
];

const focusAreas = ["Web Development", "Backend Systems", "Android Development"];

export default function About() {
  const [tab, setTab] = useState<Tab>("bio");

  return (
    <section
      id="about"
      className="grain layer scroll-mt-16 bg-parchment px-5 py-24 text-ink sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Membership" title="About Me" />

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:gap-16">
          <IdentificationCard
            flipped={tab === "edu"}
            name={biodata.name}
            monogram={site.initial}
            programme={education.major}
            institution={education.school}
            period={education.period}
            photoSrc={site.photo}
            logoSrc={site.campusLogo}
            photoAlt={`Photo of ${biodata.name}`}
            logoAlt={`Logo of ${education.school}`}
          />

          <Reveal delay={0.15} className="min-w-0">
            <div
              role="tablist"
              aria-label="About information"
              className="inline-flex rounded-full border border-ink/15 bg-card/70 p-1"
            >
              {tabs.map(({ id, label, icon: Icon }) => {
                const active = tab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(id)}
                    className="relative rounded-full px-5 py-2 font-label text-xs uppercase tracking-wider"
                  >
                    {active && (
                      <motion.span
                        layoutId="about-tab"
                        className="absolute inset-0 rounded-full bg-mahogany"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span
                      className={`relative flex items-center gap-2 transition-colors ${
                        active ? "text-parchment" : "text-ink/60 hover:text-ink"
                      }`}
                    >
                      <Icon size={14} />
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={tab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  {tab === "bio" ? (
                    <>
                      <h3 className="font-display text-4xl font-semibold sm:text-5xl">
                        {biodata.name}
                      </h3>
                      <p className="mt-4 flex items-center gap-2 text-sm text-ink/60">
                        <FiMapPin className="shrink-0 text-tolstoy" />
                        {biodata.location}
                      </p>
                      <div className="my-6 h-px bg-ink/15" />
                      <p className="text-lg leading-8 text-ink/80">{biodata.bio}</p>
                      <p className="mt-8 font-label text-[10px] uppercase tracking-wider text-ink/50">
                        Areas of focus
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {focusAreas.map((a) => (
                          <li
                            key={a}
                            className="rounded-full border border-ink/20 px-4 py-1.5 text-sm"
                          >
                            {a}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>
                      <h3 className="font-display text-4xl font-semibold sm:text-5xl">
                        {education.school}
                      </h3>
                      <p className="mt-4 text-lg leading-8 text-ink/75">{education.major}</p>
                      <div className="my-6 h-px bg-ink/15" />
                      <div className="space-y-5">
                        <div className="flex gap-3">
                          <FiCalendar className="mt-1 shrink-0 text-tolstoy" />
                          <div>
                            <p className="font-label text-[10px] uppercase tracking-wider text-ink/50">
                              Study period
                            </p>
                            <p className="mt-1">{education.period}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <FiMapPin className="mt-1 shrink-0 text-tolstoy" />
                          <div>
                            <p className="font-label text-[10px] uppercase tracking-wider text-ink/50">
                              Location
                            </p>
                            <p className="mt-1">{education.description}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.article>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}