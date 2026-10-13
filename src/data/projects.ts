import type { Project } from "@/types";

const GH = "https://github.com/hanifahdwis"; 

export const projects: Project[] = [
  {
    title: "DoneIt",
    subtitle: "Gamified Campus Quest Platform",
    description:
      "Full-stack web app where students complete quests to earn XP. Includes 15 REST endpoints, 8 pages, JWT authentication, photo-proof submissions, an admin approval flow, and XP progression across 3 levels.",
    tags: ["FastAPI", "SQLAlchemy", "Streamlit", "JWT"],
    year: 2026,
    kind: "code",
    featured: true,
    githubUrl: GH,
  },
  {
    title: "Event Ticketing & Booking System",
    subtitle: "Backend application",
    description:
      "Backend covering 6 workflows: ticket categories, booking, payment, check-in, refunds, and sales reporting, with automated tests in Jest.",
    tags: ["TypeScript", "NestJS", "PostgreSQL", "Jest"],
    year: 2026,
    kind: "code",
    featured: true,
    githubUrl: GH,
  },
  {
    title: "ReadMark",
    subtitle: "Book Review Web Application",
    description:
      "Web app for managing personal book reviews with 4 core features: authentication, book categories, reviews, and review history.",
    tags: ["Python", "Django", "SQLite"],
    year: 2026,
    kind: "code",
    featured: true,
    githubUrl: GH,
  },
  {
    title: "EquaLife",
    subtitle: "AI-Powered Lifestyle and Task App",
    description:
      "Android app with 5 core features: onboarding, profile setup, lifestyle inputs, task management, and an AI assistant powered by the Groq API.",
    tags: ["Java", "Android Studio", "Retrofit", "Groq API"],
    year: 2025,
    kind: "code",
    featured: true,
    githubUrl: GH,
  },
  {
    title: "Bus Jatim",
    subtitle: "Intercity Bus Route Finder",
    description:
      "Python and Pygame app using graph algorithms for routes across East Java, with route exploration, distances, and fare estimation.",
    tags: ["Python", "Pygame", "Graph Algorithms"],
    year: 2025,
    kind: "code",
    featured: true,
    githubUrl: GH,
  },
  {
    title: "KENDIRASA",
    subtitle: "Mood Journal Web Application",
    description:
      "Full-stack mood journal with authentication, custom moods, and a visual mood tracker.",
    tags: ["Node.js", "Express", "SQLite", "JavaScript"],
    year: 2025,
    kind: "code",
    featured: true,
    githubUrl: GH,
  },
  {
    title: "PujaServe",
    subtitle: "Food Court Management System Design",
    description:
      "Authored the SKPL and DPPL for a proposed web-based system, covering architecture, database design, interfaces, and workflows.",
    tags: ["SKPL", "DPPL", "System Design"],
    year: 2026,
    kind: "docs",
    featured: false,
  },
  {
    title: "2D Platformer Game",
    subtitle: "Game Development Project",
    description:
      "Built with C# and Windows Forms in a team, applying OOP concepts to game logic and core gameplay systems.",
    tags: ["C#", "OOP", "Windows Forms"],
    year: 2025,
    kind: "code",
    featured: false,
    githubUrl: GH,
  },
  {
    title: "Library Management System",
    subtitle: "Data Structures Project",
    description:
      "Used linked list, queue, and stack for stock, borrowing, and history features.",
    tags: ["C#", "Data Structures"],
    year: 2025,
    kind: "code",
    featured: false,
    githubUrl: GH,
  },
];