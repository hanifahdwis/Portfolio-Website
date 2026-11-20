import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import Reveal, { SectionHeading } from "@/components/ui/Reveal";
import { site } from "@/data/site";

const socials = [
  { href: site.github, label: "GitHub", icon: FiGithub },
  { href: site.linkedin, label: "LinkedIn", icon: FiLinkedin },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="grain lamp layer scroll-mt-16 bg-ink px-5 py-24 text-parchment sm:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="Contact" />

        <Reveal delay={0.1}>
          <p className="max-w-xl text-lg leading-8 text-parchment/75">
            Have a project, an opportunity, or just want to talk about software and events?
            My inbox is open.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-flex items-center gap-3 break-all font-display text-2xl underline decoration-gold/40 underline-offset-8 transition hover:decoration-gold sm:text-4xl"
          >
            <FiMail className="shrink-0 text-gold" />
            {site.email}
          </a>
          <div className="mt-8 flex gap-3">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-parchment/25 px-5 py-2 font-label text-xs uppercase tracking-widest transition hover:border-gold hover:text-gold"
              >
                <Icon /> {label}
              </a>
            ))}
          </div>
        </Reveal>

        <p className="mt-20 border-t border-parchment/15 pt-6 font-label text-[10px] uppercase tracking-widest text-parchment/40">
          © {new Date().getFullYear()} {site.fullName}
        </p>
      </div>
    </section>
  );
}