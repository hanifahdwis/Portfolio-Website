export type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  year: number;
  kind: "code" | "docs"; // "docs" = dokumentasi, tidak punya tombol GitHub
  featured: boolean; // true = tampil di carousel, false = lewat "Look for more"
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
};

export type Tech = {
  id: string;
  name: string;
  category: "Languages" | "Frameworks" | "Tools" | "Concepts" | "Learning";
};

export type Role = {
  id: string;
  title: string;
  org: string;
  period: string;
  description: string;
  points: string[];
};

export type Education = {
  school: string;
  major: string;
  period: string;
  description: string;
};

export type Biodata = {
  name: string;
  location: string;
  bio: string;
};

export type Entry = {
  label: string;
  title: string;
  description: string;
};