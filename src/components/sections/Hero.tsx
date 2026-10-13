import Bookshelf from "@/components/illustrations/Bookshelf";
import ShelfLabel from "@/components/ui/ShelfLabel";
import { site, shelfLabels } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="top"
      className="grain lamp layer flex min-h-screen flex-col items-center justify-center bg-ink px-4 pb-16 pt-28 text-parchment"
    >
      <h1 className="text-center font-display text-5xl font-medium sm:text-7xl">{site.heroTitle}</h1>
      <p className="mt-2 text-center font-display text-xl opacity-80 sm:text-2xl">{site.tagline}</p>

      <div className="relative mt-10 w-full"style={{ maxWidth: "min(64rem, calc((100vh - 280px) * 1.95))" }}>
        <Bookshelf />
        {shelfLabels.map((l) => (
          <ShelfLabel key={l.text} {...l} />
        ))}
      </div>
    </section>
  );
}