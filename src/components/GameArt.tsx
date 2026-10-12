import type { Game } from "../data/portfolio";

/** Decorative board illustrations. Drawn with theme tokens so they follow light/dark mode. */
function SnakeBoard() {
  return (
    <>
      {/* a dead snake's corpse stays on the board as an obstacle */}
      <polyline
        points="40,40 40,72 88,72"
        className="fill-none stroke-muted/40"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="64,112 144,112 144,64 208,64 208,104 264,104"
        className="fill-none stroke-accent"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="264" cy="104" r="8" className="fill-accent" />
      <circle cx="262" cy="101" r="1.6" className="fill-canvas" />
      <circle cx="268" cy="101" r="1.6" className="fill-canvas" />
      <circle cx="280" cy="40" r="7" className="fill-rose-500" />
      <path d="M280 33q4-5 8-4" className="fill-none stroke-accent" strokeWidth="2" strokeLinecap="round" />
    </>
  );
}

function RaceTrack() {
  return (
    <>
      <rect x="28" y="20" width="264" height="104" rx="52" className="fill-none stroke-line" strokeWidth="2" />
      <rect x="88" y="56" width="144" height="32" rx="16" className="fill-none stroke-line" strokeWidth="2" />
      {/* start / finish line */}
      <line x1="160" y1="20" x2="160" y2="56" className="stroke-muted" strokeWidth="3" strokeDasharray="4 4" />
      {/* cars */}
      <g transform="translate(58 72) rotate(-90)">
        <rect x="-10" y="-6" width="20" height="12" rx="4" className="fill-accent" />
        <rect x="2" y="-4" width="5" height="8" rx="1.5" className="fill-canvas" />
      </g>
      <g transform="translate(238 38)">
        <rect x="-10" y="-6" width="20" height="12" rx="4" className="fill-sky-400" />
        <rect x="2" y="-4" width="5" height="8" rx="1.5" className="fill-canvas" />
      </g>
      <g transform="translate(262 100) rotate(60)">
        <rect x="-10" y="-6" width="20" height="12" rx="4" className="fill-amber-400" />
        <rect x="2" y="-4" width="5" height="8" rx="1.5" className="fill-canvas" />
      </g>
    </>
  );
}

export default function GameArt({ id }: { id: Game["id"] }) {
  return (
    <div className="relative overflow-hidden border-b border-line bg-canvas">
      <div aria-hidden className="bg-dots absolute inset-0 opacity-80" />
      <svg
        viewBox="0 0 320 144"
        className="relative h-40 w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {id === "snake" ? <SnakeBoard /> : <RaceTrack />}
      </svg>
    </div>
  );
}
