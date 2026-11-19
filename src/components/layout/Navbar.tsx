"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { site } from "@/data/site";

const links = [
  { id: "about", label: "About" },
  { id: "portfolio", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...links.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-gold"
      />
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav className="flex items-center gap-1 rounded-full border border-parchment/15 bg-ink/70 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md">
          <a
            href="#top"
            aria-label="Kembali ke atas"
            className="grid h-9 w-9 place-items-center rounded-full bg-parchment font-display text-lg font-bold text-ink transition hover:bg-gold"
          >
            {site.initial}
          </a>
          <ul className="flex items-center">
            {links.map((l) => {
              const on = active === l.id;
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className={`relative block rounded-full px-3 py-2 font-label text-[11px] uppercase tracking-wider transition-colors sm:px-4 sm:text-xs ${
                      on ? "text-ink" : "text-parchment/70 hover:text-parchment"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-parchment"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </>
  );
}