import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import AboutMe from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

const placeholders = [
  { id: "roles", title: "Role & Tech Stack", style: "bg-shakespeare text-ink" },
  { id: "more", title: "More About Me", style: "bg-mahogany text-parchment" },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutMe />
        <Projects />

        {placeholders.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className={`grain layer flex min-h-screen scroll-mt-16 items-center justify-center ${s.style}`}
          >
            <h2 className="font-display text-4xl">{s.title}</h2>
          </section>
        ))}

        <Contact />
      </main>
    </>
  );
}