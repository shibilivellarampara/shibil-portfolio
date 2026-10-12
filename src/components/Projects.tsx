import { ArrowUpRight, ExternalLink } from "lucide-react";
import { flagship, projects } from "../data/portfolio";
import ArchitectureDiagram from "./ArchitectureDiagram";
import Section from "./Section";
import ButtonLink from "./ui/ButtonLink";
import { GithubIcon } from "./ui/BrandIcons";
import Reveal from "./ui/Reveal";
import StatusDot from "./ui/StatusDot";
import Tag from "./ui/Tag";

function Flagship() {
  return (
    <Reveal>
      <article className="relative overflow-hidden rounded-2xl border border-accent/30 bg-card">
        <div
          aria-hidden
          className="bg-dots pointer-events-none absolute inset-y-0 right-0 w-full opacity-60 lg:w-1/2"
        />

        <div className="relative grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_1fr]">
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-3">
              <Tag tone="accent">flagship</Tag>
              <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
                <StatusDot /> live in production
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {flagship.name}
            </h3>
            <p className="mt-3 leading-relaxed text-muted">
              {flagship.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {flagship.stack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3 lg:mt-auto lg:pt-6">
              {flagship.live && (
                <ButtonLink href={flagship.live} variant="primary">
                  Live app <ArrowUpRight size={16} aria-hidden />
                </ButtonLink>
              )}
              {flagship.website && (
                <ButtonLink href={flagship.website}>
                  <ExternalLink size={15} aria-hidden /> Website
                </ButtonLink>
              )}
            </div>
          </div>

          <ArchitectureDiagram />
        </div>

        <ul className="relative grid grid-cols-1 gap-px border-t border-line bg-line md:grid-cols-3">
          {flagship.callouts.map(({ icon: Icon, title, tag, text }) => (
            <li key={title} className="bg-card p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon size={18} aria-hidden />
                </span>
                <Tag tone="accent">{tag}</Tag>
              </div>
              <h4 className="mt-4 text-sm font-semibold text-ink">{title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      index="02"
      eyebrow="projects"
      title="Architecture case studies"
      description="A multi-tenant ERP running in production, plus the smaller systems I build to keep learning."
    >
      <Flagship />

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        {projects.map(({ icon: Icon, name, description, stack, github }, i) => (
          <Reveal key={name} delay={i * 0.07} className="h-full">
            <article className="flex h-full flex-col rounded-xl border border-line bg-card p-5 transition-colors hover:border-accent/40">
              <div className="flex items-center gap-3">
                {Icon && (
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon size={18} aria-hidden />
                  </span>
                )}
                <h3 className="text-base font-semibold text-ink">{name}</h3>
              </div>
              <p className="mt-3 grow text-sm leading-relaxed text-muted">
                {description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
                >
                  <GithubIcon size={15} /> Source
                  <ArrowUpRight size={14} aria-hidden />
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
