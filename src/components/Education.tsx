import { GraduationCap } from "lucide-react";
import { education } from "../data/portfolio";
import Section from "./Section";
import Reveal from "./ui/Reveal";

export default function Education() {
  return (
    <Section
      id="education"
      index="05"
      eyebrow="education"
      title="Academic background"
      className="pt-0 sm:pt-0"
    >
      <div className="space-y-4">
        {education.map((edu, i) => (
          <Reveal key={edu.school} delay={i * 0.08}>
            <article className="flex gap-4 rounded-xl border border-line bg-card p-5 sm:p-6">
              <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent sm:flex">
                <GraduationCap size={20} aria-hidden />
              </span>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-base font-semibold text-ink">
                    {edu.degree}
                  </h3>
                  <span className="font-mono text-xs text-muted">
                    {edu.duration}
                  </span>
                </div>
                <p className="mt-0.5 text-sm font-medium text-accent">
                  {edu.school}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {edu.description}
                </p>
                {edu.bullets.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {edu.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1 w-1 shrink-0 rounded-sm bg-accent"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
