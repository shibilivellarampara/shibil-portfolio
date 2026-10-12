import { ArrowUpRight, Check, Play } from "lucide-react";
import { games } from "../data/portfolio";
import GameArt from "./GameArt";
import Section from "./Section";
import ButtonLink from "./ui/ButtonLink";
import { GithubIcon } from "./ui/BrandIcons";
import Reveal from "./ui/Reveal";
import Tag from "./ui/Tag";

export default function Playground() {
  return (
    <Section
      id="playground"
      index="04"
      eyebrow="playground"
      title="Games I've built"
      description="Multiplayer games that run peer-to-peer over WebRTC: no backend, no accounts. They're a fun way to practice the same distributed-systems thinking I use at work, like authoritative state and keeping clients in sync."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {games.map((game, i) => {
          const Icon = game.icon;
          return (
            <Reveal key={game.id} delay={i * 0.08} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card transition-colors hover:border-accent/40">
                <GameArt id={game.id} />

                <div className="flex grow flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                        <Icon size={18} aria-hidden />
                      </span>
                      <h3 className="text-lg font-semibold text-ink">
                        {game.name}
                      </h3>
                    </div>
                    <Tag tone="accent">{game.kind}</Tag>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {game.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {game.engineering.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-muted"
                      >
                        <Check
                          size={15}
                          className="mt-0.5 shrink-0 text-accent"
                          aria-hidden
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {game.stack.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3 pt-0 sm:mt-auto sm:pt-6">
                    <ButtonLink href={game.live} variant="primary">
                      <Play size={15} aria-hidden /> Play {game.name}
                      <ArrowUpRight size={15} aria-hidden />
                    </ButtonLink>
                    <ButtonLink href={game.github}>
                      <GithubIcon size={15} /> Source
                    </ButtonLink>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
