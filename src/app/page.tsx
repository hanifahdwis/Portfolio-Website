const sections = [
  { id: "top", title: "Hero", style: "bg-ink text-parchment lamp" },
  { id: "about", title: "About Me", style: "bg-parchment text-ink" },
  { id: "portfolio", title: "Project I've Done", style: "bg-dickens text-parchment" },
  { id: "roles", title: "Role & Tech Stack", style: "bg-shakespeare text-ink" },
  { id: "more", title: "More About Me", style: "bg-mahogany text-parchment" },
  { id: "contact", title: "Contact", style: "bg-ink text-parchment" },
];

export default function Home() {
  return (
    <main>
      {sections.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className={`grain layer flex min-h-screen scroll-mt-16 items-center justify-center ${s.style}`}
        >
          <h2 className="font-display text-4xl">{s.title}</h2>
        </section>
      ))}
    </main>
  );
}