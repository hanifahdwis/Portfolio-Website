
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import AboutMe from "@/components/sections/About";

const sections = [
  {
    id: "portfolio",
    title: "Projects I've Done",
    style: "bg-dickens text-parchment",
  },
  {
    id: "roles",
    title: "Role & Tech Stack",
    style: "bg-shakespeare text-ink",
  },
  {
    id: "more",
    title: "More About Me",
    style: "bg-mahogany text-parchment",
  },
  {
    id: "contact",
    title: "Contact",
    style: "bg-ink text-parchment",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        {/* About Me section */}
        <AboutMe />

        {/* Other sections — developed later */}
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={`grain layer flex min-h-screen scroll-mt-16 items-center justify-center ${section.style}`}
          >
            <h2 className="font-display text-4xl">
              {section.title}
            </h2>
          </section>
        ))}
      </main>
    </>
  );
}
