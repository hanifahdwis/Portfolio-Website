"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

type Props = {
  progress: MotionValue<number>; // 0 = tertutup, 1 = terbuka penuh (mengikuti scroll)
  flipped: boolean; // false = foto, true = logo kampus
  monogram: string;
  coverTitle: string;
  coverSubtitle: string;
  photoSrc: string;
  logoSrc: string;
  photoAlt: string;
  logoAlt: string;
};

const LEAVES = 6; // jumlah lembar yang terbalik saat pindah tab
const Z = 2; // jarak antar lembar (px) supaya urutan tumpukannya benar
const FLIP_MS = 800;
const STAGGER_MS = 110; // jeda antar lembar, bikin efek kipas
const EASE = "cubic-bezier(0.45, 0.05, 0.25, 1)";
const COVER_Z_CLOSED = (LEAVES + 2) * Z;

const LINES = "repeating-linear-gradient(transparent 0 26px, rgba(88,55,47,0.16) 26px 27px)";
const SHADE_RIGHT = "linear-gradient(to right, rgba(0,0,0,0.22), transparent 14%)";
const SHADE_LEFT = "linear-gradient(to left, rgba(0,0,0,0.22), transparent 14%)";
const BOARD_SHADOW = "shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]";

const hidden = {
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
} as const;

function Picture({
  src,
  alt,
  fallback,
  contain,
}: {
  src: string;
  alt: string;
  fallback: string;
  contain?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-sm border-4 border-white bg-parchment/60 shadow-inner">
      {failed ? (
        <div className="grid h-full w-full place-items-center p-2 text-center font-label text-xs text-mahogany/70">
          {fallback}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 45vw, 320px"
          className={contain ? "object-contain p-6" : "object-cover object-top"}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export default function FlipBook({
  progress,
  flipped,
  monogram,
  coverTitle,
  coverSubtitle,
  photoSrc,
  logoSrc,
  photoAlt,
  logoAlt,
}: Props) {
  // Tertutup: hanya sampul yang terlihat, digeser ke tengah. Terbuka: kembali ke posisi asli.
  const x = useTransform(progress, [0, 0.85], ["-25%", "0%"]);
  const leftBoardOpacity = useTransform(progress, [0.4, 0.75], [0, 1]);
  const coverRotate = useTransform(progress, [0.12, 0.85], [0, -180]);
  // Sampul tetap di atas tumpukan sampai lewat 90 derajat, baru turun ke sisi kiri.
  const coverZ = useTransform(progress, [0, 0.5, 0.85], [COVER_Z_CLOSED, COVER_Z_CLOSED, -Z]);

  return (
    <motion.div
      className="relative mx-auto aspect-10/7 w-full"
      style={{ x, maxWidth: "min(100%, 38rem, calc((100vh - 18rem) * 1.43))" }}
    >
      {/* Papan belakang (hard cover) */}
      <div className={`absolute inset-y-0 right-0 w-1/2 rounded-r-lg bg-mahogany ${BOARD_SHADOW}`} />
      <motion.div
        className={`absolute inset-y-0 left-0 w-1/2 rounded-l-lg bg-mahogany ${BOARD_SHADOW}`}
        style={{ opacity: leftBoardOpacity }}
      />

      <div className="absolute inset-2.5 sm:inset-3.5" style={{ perspective: "2400px" }}>
        <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
          {/* Halaman kanan: bergaris */}
          <div
            className="absolute inset-y-0 right-0 w-1/2 rounded-r-sm bg-card"
            style={{ backgroundImage: `${SHADE_RIGHT}, ${LINES}` }}
          />

          {/* Lembar-lembar yang terbalik berurutan seperti kipas saat pindah tab */}
          {Array.from({ length: LEAVES }, (_, i) => {
            const isLast = i === LEAVES - 1;
            const z = flipped ? (i + 1) * Z : (LEAVES - i) * Z;
            return (
              <div
                key={i}
                className="absolute inset-y-0 right-0 w-1/2 motion-reduce:!transition-none!"
                style={{
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  transform: `translateZ(${z}px) rotateY(${flipped ? -180 : 0}deg)`,
                  transitionProperty: "transform",
                  transitionDuration: `${FLIP_MS}ms`,
                  transitionTimingFunction: EASE,
                  transitionDelay: `${(flipped ? i : LEAVES - 1 - i) * STAGGER_MS}ms`,
                  willChange: "transform",
                }}
              >
                <div
                  className="absolute inset-0 rounded-r-sm bg-card"
                  style={{ ...hidden, backgroundImage: `${SHADE_RIGHT}, ${LINES}` }}
                />
                <div
                  className="absolute inset-0 rounded-l-sm bg-card p-3 sm:p-5"
                  style={{
                    ...hidden,
                    transform: "rotateY(180deg)",
                    backgroundImage: isLast ? SHADE_LEFT : `${SHADE_LEFT}, ${LINES}`,
                  }}
                >
                  {isLast && (
                    <Picture
                      src={logoSrc}
                      alt={logoAlt}
                      fallback="Letakkan logo kampus di public/images"
                      contain
                    />
                  )}
                </div>
              </div>
            );
          })}

          {/* Sampul depan: terbuka mengikuti scroll */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2"
            style={{
              originX: 0,
              originY: 0.5,
              rotateY: coverRotate,
              z: coverZ,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Sisi luar */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-r-md bg-mahogany px-4 text-center text-parchment"
              style={{
                ...hidden,
                backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.4), transparent 10%)",
              }}
            >
              <div className="pointer-events-none absolute inset-3 rounded-sm border border-gold/50 sm:inset-5" />
              <span className="font-display text-4xl text-gold sm:text-5xl">{monogram}</span>
              <div className="my-4 h-px w-10 bg-gold/70 sm:my-5" />
              <h4 className="font-display text-xl leading-tight sm:text-3xl">{coverTitle}</h4>
              <p className="mt-3 font-label text-[9px] uppercase tracking-[0.2em] text-parchment/60 sm:text-[10px]">
                {coverSubtitle}
              </p>
            </div>

            {/* Sisi dalam: foto ikut berputar bersama sampul */}
            <div
              className="absolute inset-0 rounded-l-sm bg-card p-3 sm:p-5"
              style={{ ...hidden, transform: "rotateY(180deg)", backgroundImage: SHADE_LEFT }}
            >
              <Picture src={photoSrc} alt={photoAlt} fallback="Letakkan foto di public/images" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}