import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { profile, telemetry } from "../data/portfolio";
import ButtonLink from "./ui/ButtonLink";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import StatusDot from "./ui/StatusDot";
import Terminal from "./terminal/Terminal";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0" />
        <div className="bg-glow absolute inset-0" />
      </div>

      <Container className="relative pb-16 pt-14 sm:pt-20 lg:pt-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            <motion.div {...rise(0)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1.5 font-mono text-xs text-accent">
                <StatusDot />
                {profile.currentRole} @ {profile.currentCompany}
              </span>
            </motion.div>

            <motion.h1
              {...rise(0.07)}
              className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.35rem]"
            >
              Resilient, low-latency distributed systems,{" "}
              <span className="text-accent">engineered in Java.</span>
            </motion.h1>

            <motion.p
              {...rise(0.14)}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              <span className="font-medium text-ink">{profile.name}</span> is a
              senior Java backend engineer building {profile.tagline}
            </motion.p>

            <motion.div
              {...rise(0.21)}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <ButtonLink href="#contact" variant="primary">
                Get in touch <ArrowRight size={16} aria-hidden />
              </ButtonLink>
              <ButtonLink href={profile.resumeUrl} download>
                <Download size={16} aria-hidden /> Download CV
              </ButtonLink>
            </motion.div>
          </div>

          <motion.div {...rise(0.18)}>
            <Terminal />
          </motion.div>
        </div>

        <Reveal delay={0.1}>
          <ul className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {telemetry.map(({ icon: Icon, key, value, label }) => (
              <li
                key={key}
                className="rounded-xl border border-line bg-card/70 p-4 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <Icon size={16} className="shrink-0 text-accent" aria-hidden />
                  <span className="truncate font-mono text-[10px] uppercase tracking-wider text-muted">
                    {key}
                  </span>
                </div>
                <p className="mt-3 break-words font-mono text-lg font-semibold text-ink sm:text-xl xl:text-2xl">
                  {value}
                </p>
                <p className="mt-1 text-xs text-muted">{label}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
