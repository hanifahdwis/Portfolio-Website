import Reveal, { SectionHeading } from "@/components/ui/Reveal";
import { techStack } from "@/data/techStack";

const categories = ["Languages", "Frameworks", "Tools", "Concepts"] as const;

export default function TechStack() {
  return (
    <section
      id="skills"
      className="grain layer scroll-mt-16 bg-cream px-5 py-24 text-ink sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Skills" title="Tech Stack" />

        <Reveal>
          <p className="-mt-6 mb-10 max-w-xl leading-7 text-ink/75">
            Languages, frameworks, and tools I use to build things.
          </p>
        </Reveal>

        <div className="grid items-start gap-6 md:grid-cols-2">
          {categories.map((cat, ci) => (
            <Reveal key={cat} delay={ci * 0.08} y={18}>
              <span className="block w-fit rounded-t-md bg-mahogany px-4 py-1.5 font-label text-[10px] uppercase tracking-[0.18em] text-parchment">
                {cat}
              </span>
              <div className="rounded-b-md rounded-tr-md bg-card p-5 shadow-md ring-1 ring-ink/5">
                <ul className="flex flex-wrap gap-2">
                  {techStack
                    .filter((t) => t.category === cat)
                    .map((t) => (
                      <li
                        key={t.id}
                        className="cursor-default rounded-full border border-ink/15 bg-cream/60 px-3.5 py-1.5 text-sm transition-colors hover:border-tolstoy hover:text-tolstoy"
                      >
                        {t.name}
                      </li>
                    ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}