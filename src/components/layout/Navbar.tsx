import { site } from "@/data/site";

const links = [
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#more", label: "More" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-parchment/10 bg-ink/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <a
          href="#top"
          aria-label="Kembali ke atas"
          className="grid h-9 w-9 place-items-center rounded-full bg-parchment font-display text-lg font-bold text-ink transition hover:bg-gold"
        >
          {site.initial}
        </a>
        <ul className="flex gap-5 font-display text-base text-parchment sm:gap-9 sm:text-lg">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition hover:text-gold">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}