"use client";

import { useState } from "react";
import { FiMapPin, FiRepeat } from "react-icons/fi";
import IdentificationCard from "@/components/ui/IdentificationCard";
import Reveal, { SectionHeading } from "@/components/ui/Reveal";
import { biodata, education } from "@/data/education";
import { site } from "@/data/site";

const focusAreas = ["Web Development", "Backend Systems", "Android Development"];

export default function About() {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((f) => !f);

  return (
    <section
      id="about"
      className="grain layer scroll-mt-16 bg-parchment px-5 py-24 text-ink sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Membership" title="About Me" />

      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,36rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <div onClick={toggle} className="cursor-pointer">
              <IdentificationCard
                flipped={flipped}
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
            </div>
            <button
              type="button"
              onClick={toggle}
              aria-pressed={flipped}
              className="mx-auto mt-5 flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 font-label text-[10px] uppercase tracking-widest transition hover:border-tolstoy hover:text-tolstoy"
            >
              <FiRepeat /> {flipped ? "Show front" : "Flip card"}
            </button>
          </div>

          <Reveal delay={0.15} className="min-w-0">
            <h3 className="font-display text-4xl font-semibold sm:text-5xl">{biodata.name}</h3>
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
                <li key={a} className="rounded-full border border-ink/20 px-4 py-1.5 text-sm">
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}