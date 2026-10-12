import { experience } from "../data/portfolio";
import Section from "./Section";
import Reveal from "./ui/Reveal";
import StatusDot from "./ui/StatusDot";
import Tag from "./ui/Tag";

export default function Experience() {
  return (
    <Section
      id="experience"
      index="01"
      eyebrow="experience"
      title="Where I've shipped production systems"
      description="Architectural responsibility, revenue-critical migrations, and containerized microservice delivery."
    >
      <ol className="ml-1 space-y-6 border-l border-line pl-6 sm:pl-8">
        {experience.map((job, i) => (
          <li key={job.company} className="relative">
            <span
              aria-hidden
              className={`absolute -left-[calc(1.5rem+5.5px)] top-7 h-2.5 w-2.5 rounded-full border-2 border-accent sm:-left-[calc(2rem+5.5px)] ${
                job.current ? "bg-accent" : "bg-canvas"
              }`}
            />
            <Reveal delay={i * 0.08}>
              <article className="grid grid-cols-1 gap-6 rounded-xl border border-line bg-card p-5 sm:p-6 lg:grid-cols-[1fr_16rem]">
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                    <div>
                      <h3 className="text-lg font-semibold text-ink">
                        {job.role}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-accent">
                        {job.company}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-md border border-line bg-canvas px-2.5 py-1 font-mono text-xs text-muted">
                      {job.current && <StatusDot />}
                      {job.period}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {job.summary}
                  </p>

                  <ul className="mt-5 space-y-4">
                    {job.highlights.map(({ icon: Icon, title, text }) => (
                      <li key={title} className="flex gap-3">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                          <Icon size={16} aria-hidden />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-ink">{title}</p>
                          <p className="mt-0.5 text-sm leading-relaxed text-muted">
                            {text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {job.stack.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                </div>

                <dl className="h-fit space-y-4 rounded-lg border border-line bg-canvas p-4 font-mono text-xs">
                  {job.metrics.map(({ label, value }) => (
                    <div key={label}>
                      <dt className="text-muted">{`// ${label}`}</dt>
                      <dd className="mt-1 text-sm font-medium text-ink">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
