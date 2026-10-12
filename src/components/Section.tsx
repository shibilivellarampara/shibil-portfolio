import type { ReactNode } from "react";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";

export default function Section({
  id,
  index,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-20 sm:py-24 ${className}`}>
      <Container>
        <Reveal className="mb-10 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-accent">
            <span className="text-muted">{index} /</span> {eyebrow}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {title}
          </h2>
          {description && (
            <p className="mt-3 leading-relaxed text-muted">{description}</p>
          )}
        </Reveal>
        {children}
      </Container>
    </section>
  );
}
