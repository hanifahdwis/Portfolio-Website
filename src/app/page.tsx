import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import AboutMe from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import MoreAbout from "@/components/sections/MoreAbout";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutMe />
        <Projects />
        <TechStack />
        <MoreAbout />
        <Contact />
      </main>
    </>
  );
}