import type { ReactNode } from "react";

const COLORS = ["#B76F61", "#C5A36A", "#6F9187", "#D98B6F", "#D8C6A8", "#713E3B", "#C5A36A", "#6F9187"];
const BANDS = ["#D8C6A8", "#713E3B", "#6F9187"];

const f = (n: number) => Number(n.toFixed(2));

function makeRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

type Band = { top: number; h: number; color: string };
type Item =
  | { kind: "stack" }
  | { kind: "book"; w: number; h: number; color: string; ex: number; band: Band | null };

function Book({
  x, y, w, h, color, band,
}: { x: number; y: number; w: number; h: number; color: string; band: Band | null }) {
  return (
    <g>
      <rect x={f(x)} y={f(y - h)} width={f(w)} height={f(h)} rx={1} fill={color} />
      <rect x={f(x + w - 2.5)} y={f(y - h)} width={2.5} height={f(h)} fill="#000" opacity={0.13} />
      {band && (
        <rect
          x={f(x)}
          y={f(y - h + h * band.top)}
          width={f(w)}
          height={f(band.h)}
          fill={band.color}
          opacity={0.85}
        />
      )}
    </g>
  );
}

function Stack({ x, y }: { x: number; y: number }) {
  const layers = [
    [68, "#B76F61"],
    [62, "#D8C6A8"],
    [58, "#713E3B"],
    [52, "#6F9187"],
  ] as const;
  let cur = y;
  return (
    <g>
      {layers.map(([w, c], i) => {
        const top = cur - 11;
        cur -= 11.5;
        return <rect key={i} x={f(x + (68 - w) / 2)} y={f(top)} width={w} height={11} rx={1} fill={c} />;
      })}
    </g>
  );
}

function buildRow(
  rnd: () => number,
  y: number,
  tiltIdx: number,
  tiltAng: number,
  stackIdx: number,
  prefix: string
): ReactNode[] {
  const span = 512;
  const items: Item[] = [];
  let flex = 0;
  let fixed = 0;
  let i = 0;

  while (flex + fixed < span) {
    if (i === stackIdx) {
      items.push({ kind: "stack" });
      fixed += 76;
    } else {
      const w = 9 + rnd() * 8;
      const h = 58 + rnd() * 30;
      const color = COLORS[Math.floor(rnd() * COLORS.length)];
      const band: Band | null =
        rnd() > 0.4
          ? { top: 0.2 + rnd() * 0.5, h: 3 + rnd() * 4, color: BANDS[Math.floor(rnd() * BANDS.length)] }
          : null;
      const ex = i === tiltIdx ? h * 0.28 : 0;
      items.push({ kind: "book", w, h, color, ex, band });
      flex += w + 1;
      fixed += ex;
    }
    i++;
  }

  const k = (span - fixed) / flex;
  let x = 68;
  const out: ReactNode[] = [];

  items.forEach((it, j) => {
    const key = `${prefix}-${j}`;
    if (it.kind === "stack") {
      out.push(<Stack key={key} x={x + 2} y={y} />);
      x += 76;
      return;
    }
    const w = it.w * k;
    const book = <Book x={x} y={y} w={w} h={it.h} color={it.color} band={it.band} />;
    if (j === tiltIdx) {
      out.push(
        <g key={key} transform={`rotate(${tiltAng} ${f(x)} ${y})`}>
          {book}
        </g>
      );
      x += w + 1 + it.ex;
    } else {
      out.push(<g key={key}>{book}</g>);
      x += w + k;
    }
  });

  return out;
}

function Board({ y }: { y: number }) {
  return (
    <g>
      <rect x={60} y={y} width={528} height={7} fill="#A85F3A" />
      <rect x={60} y={y} width={528} height={1.5} fill="#C5A36A" opacity={0.5} />
      <rect x={60} y={y + 7} width={528} height={2.5} fill="#713E3B" />
    </g>
  );
}

export default function Bookshelf() {
  const rnd = makeRng(5);
  const top = buildRow(rnd, 148, 16, 17, -1, "t");
  const bottom = buildRow(rnd, 248, 28, 10, 10, "b");

  return (
    <svg viewBox="0 0 645 330" className="pointer-events-none block h-auto w-full select-none" aria-hidden="true">
      <defs>
        <filter id="shelf-blur">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <polygon
        points="38,78 578,78 560,300 12,300 12,262 52,262 52,150 38,150"
        fill="#000"
        opacity={0.28}
        filter="url(#shelf-blur)"
      />
      {top}
      <Board y={148} />
      {bottom}
      <Board y={248} />
    </svg>
  );
}