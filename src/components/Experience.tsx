import { motion } from "framer-motion";
import Section from "./Section";
import { experience } from "../data/portfolio";

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <div className="relative border-l border-line pl-8 space-y-10">
        {experience.map((job, i) => (
          <motion.div
            key={job.company}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="relative"
          >
            <span className="absolute -left-[calc(2rem+4px)] top-1.5 h-2 w-2 bg-accent" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-medium text-ink">{job.role}</h3>
              <span className="text-sm text-muted">{job.duration}</span>
            </div>
            <p className="mt-1 text-sm font-medium text-accent">
              {job.company}
            </p>
            <p className="mt-3 text-muted text-sm leading-relaxed">
              {job.description}
            </p>
            {job.bullets.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {job.bullets.map((b) => (
                  <li
                    key={b}
                    className="text-sm text-muted flex items-start gap-2"
                  >
                    <span className="mt-2 h-1 w-1 bg-accent shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
