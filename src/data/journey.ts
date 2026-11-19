import type { Entry } from "@/types";

// photo & photoAlt opsional. Contoh:
// photo: "/images/journey/schematics.jpg", photoAlt: "Schematics BST team"
export type JourneyEntry = Entry & { photo?: string; photoAlt?: string };

export const journey: JourneyEntry[] = [
  {
    label: "Oct 2023 – Jan 2024",
    title: "Research Club",
    description:
      "Facilitator at KIR, guiding new members in research methods and scientific writing.",
  },
  {
    label: "Aug 2024",
    title: "Started at ITS",
    description: "Began studying Software Engineering.",
  },
  {
    label: "2025",
    title: "First Projects",
    description:
      "Built a library system, a 2D game, a mood journal, a route finder, and an Android app.",
  },
  {
    label: "Jun – Aug 2025",
    title: "Community & Campus",
    description: "Volunteered at Socare and served as operational staff at OKKBK.",
  },
  {
    label: "2026",
    title: "Into Backend",
    description: "Built projects with NestJS, Django, and FastAPI.",
  },
  {
    label: "Apr – May 2026",
    title: "Kiddio",
    description:
      "Designed the UI and built the frontend of an AI parenting companion web app with Next.js, React, and Tailwind CSS.",
  },
  {
    label: "May – Sep 2026",
    title: "Schematics BST",
    description: "Expert Staff for a bootcamp with 300+ participants.",
  },
];