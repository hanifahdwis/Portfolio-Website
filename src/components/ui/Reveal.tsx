"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <Reveal className="mb-12">
      {eyebrow && (
        <p className="font-label text-[10px] uppercase tracking-[0.2em] opacity-60">{eyebrow}</p>
      )}
      <h2 className={`${eyebrow ? "mt-3" : ""} font-display text-4xl font-medium sm:text-5xl`}>
        {title}
      </h2>
      <div className="mt-5 h-px w-full bg-current opacity-20" />
    </Reveal>
  );
}