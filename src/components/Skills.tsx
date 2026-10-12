import { skillGroups } from "../data/portfolio";
import Section from "./Section";
import Reveal from "./ui/Reveal";

export default function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      eyebrow="skills"
      title="Skills matrix"
      description="Day-to-day work spans REST API design, authentication and authorization, and cloud deployment across AWS, Google Cloud Run, and DigitalOcean."
      className="border-y border-line bg-card/30"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map(({ icon: Icon, title, path, items }, i) => (
          <Reveal key={title} delay={i * 0.06} className="h-full">
            <section
              aria-labelledby={`skills-${path}`}
              className="h-full rounded-xl border border-line bg-card p-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon size={18} aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3
                    id={`skills-${path}`}
                    className="text-sm font-semibold text-ink"
                  >
                    {title}
                  </h3>
                  <p className="truncate font-mono text-[11px] text-muted">
                    {path}
                  </p>
                </div>
              </div>

              <ul className="mt-5 space-y-2.5 border-t border-line pt-4">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 font-mono text-[13px] text-ink"
                  >
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 shrink-0 rounded-sm bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
