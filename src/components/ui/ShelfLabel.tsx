type Props = { text: string; href: string; x: number; y: number };

export default function ShelfLabel({ text, href, x, y }: Props) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
      <a
        href={href}
        className="block whitespace-nowrap rounded bg-card/90 px-3 py-1.5 font-label text-[10px] text-ink shadow-lg transition duration-200 hover:-translate-y-1 hover:scale-105 hover:bg-card hover:shadow-xl focus-visible:-translate-y-1 focus-visible:outline-2 focus-visible:outline-gold sm:text-xs lg:text-sm"
      >
        {text}
      </a>
    </div>
  );
}