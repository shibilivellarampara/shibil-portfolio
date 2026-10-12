/** Pulsing "service is up" indicator. The ping ring is dropped under reduced motion. */
export default function StatusDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative flex h-2 w-2 shrink-0 ${className}`} aria-hidden>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
    </span>
  );
}
