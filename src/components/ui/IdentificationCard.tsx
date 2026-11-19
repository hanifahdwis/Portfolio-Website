"use client";

import Image from "next/image";
import { useState } from "react";
import type { MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type Props = {
  flipped: boolean;
  name: string;
  monogram: string;
  programme: string;
  institution: string;
  period: string;
  photoSrc: string;
  logoSrc: string;
  photoAlt: string;
  logoAlt: string;
};

const hidden = {
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
} as const;

function Pic({ src, alt, contain }: { src: string; alt: string; contain?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="grid h-full w-full place-items-center bg-parchment/60 text-[2cqw] text-mahogany/60">
        No image
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="160px"
      className={contain ? "object-contain p-[1.5cqw]" : "object-cover object-top"}
      onError={() => setFailed(true)}
    />
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-label text-[1.8cqw] uppercase tracking-wider text-ink/50">{label}</dt>
      <dd className="mt-[0.5cqw] font-display text-[3.1cqw] font-semibold leading-tight">{value}</dd>
    </div>
  );
}

// Barcode dekoratif, dibuat dari nama supaya selalu sama
function Barcode({ seed }: { seed: string }) {
  const widths = Array.from(
    { length: 52 },
    (_, i) => 1 + ((seed.charCodeAt(i % seed.length) * (i + 3)) % 3),
  );
  const gaps = widths.map((_, i) => 1 + ((i * 7) % 2));
  const xs = widths.map((_, i) =>
    widths.slice(0, i).reduce((sum, w, j) => sum + w + gaps[j], 0),
  );
  const total = xs[xs.length - 1] + widths[widths.length - 1];

  return (
    <svg
      viewBox={`0 0 ${total} 20`}
      preserveAspectRatio="none"
      className="h-[5.5cqw] w-full"
      aria-hidden
    >
      {widths.map((w, i) => (
        <rect key={i} x={xs[i]} y={0} width={w} height={20} fill="currentColor" />
      ))}
    </svg>
  );
}

export default function IdentificationCard({
  flipped,
  name,
  monogram,
  programme,
  institution,
  period,
  photoSrc,
  logoSrc,
  photoAlt,
  logoAlt,
}: Props) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 16 });
  const sry = useSpring(ry, { stiffness: 120, damping: 16 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  const face =
    "absolute inset-0 flex flex-col overflow-hidden rounded-[3cqw] bg-card text-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]";

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40, rotate: -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-120"
    >
      <div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="@container"
        style={{ perspective: "1400px" }}
      >
        <motion.div
          className="relative aspect-[1.586]"
          style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute inset-0 transition-transform duration-900 ease-[cubic-bezier(0.45,0.05,0.2,1)] motion-reduce:transition-none"
            style={{
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "none",
            }}
          >
            {/* Depan */}
            <div className={face} style={hidden}>
              <div className="flex items-center justify-between bg-mahogany px-[4cqw] py-[2.2cqw] text-parchment">
                <span className="font-label text-[2.2cqw] uppercase tracking-[0.25em]">Identification Card</span>
                <span className="grid h-[6cqw] w-[6cqw] place-items-center rounded-full bg-parchment font-display text-[3.4cqw] font-bold text-ink">
                  {monogram}
                </span>
              </div>
              <div className="flex flex-1 gap-[4cqw] p-[4cqw]">
                <div className="relative w-[28%] shrink-0 overflow-hidden rounded-sm border-[0.8cqw] border-white shadow-inner">
                  <Pic src={photoSrc} alt={photoAlt} />
                </div>
                <dl className="flex min-w-0 flex-1 flex-col justify-between">
                  <Field label="Member" value={name} />
                  <Field label="Programme" value={programme} />
                  <Field label="Institution" value={institution} />
                  <Field label="Valid" value={period} />
                </dl>
              </div>
              <div className="px-[4cqw] pb-[3cqw] text-mahogany/70">
                <Barcode seed={name} />
              </div>
            </div>

            {/* Belakang */}
            <div className={face} style={{ ...hidden, transform: "rotateY(180deg)" }}>
              <div className="mt-[5cqw] h-[10cqw] bg-ink" />
              <div className="flex flex-1 items-center gap-[4cqw] p-[4cqw]">
                <div className="relative aspect-square h-full shrink-0 overflow-hidden rounded-sm border-[0.8cqw] border-white bg-parchment/50">
                  <Pic src={logoSrc} alt={logoAlt} contain />
                </div>
                <dl className="flex min-w-0 flex-1 flex-col gap-[2.5cqw]">
                  <Field label="Institution" value={institution} />
                  <Field label="Programme" value={programme} />
                  <Field label="Period" value={period} />
                </dl>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}