"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { FiBookOpen, FiCalendar, FiMapPin, FiUser } from "react-icons/fi";
import FlipBook from "@/components/ui/FlipBook";
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
  const bookRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Buku terbuka mengikuti scroll: mulai saat bagian atas buku di 88% layar, penuh di 38%.
  const { scrollYProgress } = useScroll({
    target: bookRef,
    offset: ["start 88%", "start 38%"],
  });
  const spring = useSpring(scrollYProgress, { stiffness: 100, damping: 26, mass: 0.3 });
  const fullyOpen = useMotionValue(1);
  const progress = reduceMotion ? fullyOpen : spring;

  // Teks dan tombol muncul setelah buku hampir terbuka.
  const revealOpacity = useTransform(progress, [0.7, 1], [0, 1]);
  const revealY = useTransform(progress, [0.7, 1], [16, 0]);

  return (
    <section
      id="about"
      className="grain layer scroll-mt-16 bg-parchment px-5 py-20 text-ink sm:px-8 lg:flex lg:min-h-screen lg:items-center lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-12 border-b border-ink/15 pb-5">
          <p className="font-label text-[10px] uppercase tracking-[0.18em] text-ink/50">About</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">About Me</h2>
        </header>

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,38rem)_minmax(0,1fr)_11rem] lg:gap-12">
          <div ref={bookRef} className="min-w-0">
            <FlipBook
              progress={progress}
              flipped={tab === "edu"}
              monogram={site.initial}
              coverTitle={site.heroTitle}
              coverSubtitle="Software Engineering · ITS"
              photoSrc={site.photo}
              logoSrc={site.campusLogo}
              photoAlt={`Photo of ${biodata.name}`}
              logoAlt={`Logo of ${education.school}`}
            />
          </div>

          <motion.div
            className="min-w-0"
            aria-live="polite"
            style={{ opacity: revealOpacity, y: revealY }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
              >
                {tab === "bio" ? (
                  <>
                    <h3 className="wrap-break-words font-display text-3xl font-semibold sm:text-4xl xl:text-5xl">
                      {biodata.name}
                    </h3>

                    <p className="mt-4 flex items-center gap-2 text-sm text-ink/60">
                      <FiMapPin className="shrink-0 text-tolstoy" />
                      {biodata.location}
                    </p>

                    <div className="my-6 h-px bg-ink/15" />

                    <p className="text-lg leading-8 text-ink/80">{biodata.bio}</p>

                    <div className="mt-7">
                      <p className="font-label text-[10px] uppercase tracking-wider text-ink/50">
                        Areas of focus
                      </p>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-base">
                        {focusAreas.map((a) => (
                          <span key={a}>{a}</span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="wrap-break-words font-display text-3xl font-semibold sm:text-4xl xl:text-5xl">
                      {education.school}
                    </h3>

                    <p className="mt-4 text-lg leading-8 text-ink/75">{education.major}</p>

                    <div className="my-6 h-px bg-ink/15" />

                    <div className="space-y-5 text-base">
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
          </motion.div>

          <motion.nav
            aria-label="About information"
            className="flex gap-6 border-b border-ink/15 lg:flex-col lg:gap-0 lg:border-b-0"
            style={{ opacity: revealOpacity, y: revealY }}
          >
            {tabs.map(({ id, label, icon: Icon }) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTab(id)}
                  className={`relative flex flex-1 items-center gap-3 py-4 text-left transition-colors lg:border-b lg:border-ink/15 ${
                    active ? "text-ink" : "text-ink/45 hover:text-ink"
                  }`}
                >
                  <Icon size={18} className={active ? "text-tolstoy" : "text-current"} />
                  <span className="font-display text-xl">{label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 w-full origin-left bg-tolstoy transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </motion.nav>
        </div>
      </div>
    </section>
  );
}