import type { ReactNode } from "react";

/** Mono pill for stack names, system tags, and telemetry labels. */
export default function Tag({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent";
}) {
  const tones = {
    neutral: "border-line bg-canvas text-muted",
    accent: "border-accent/30 bg-accent-soft text-accent",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-1 font-mono text-xs ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
