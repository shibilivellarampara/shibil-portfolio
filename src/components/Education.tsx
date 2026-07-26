import { motion } from "framer-motion";
import Section from "./Section";
import { education } from "../data/portfolio";

export default function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="Academic background"
      className="bg-canvas-soft/50"
    >
      <div className="space-y-8">
        {education.map((edu, i) => (
          <motion.div
            key={edu.school}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-2xl border border-line bg-canvas p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-medium text-ink">{edu.degree}</h3>
              <span className="text-sm text-muted">{edu.duration}</span>
            </div>
            <p className="mt-1 text-sm font-medium text-accent">
              {edu.school}
            </p>
            <p className="mt-3 text-muted text-sm leading-relaxed">
              {edu.description}
            </p>
            {edu.bullets.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {edu.bullets.map((b) => (
                  <li
                    key={b}
                    className="text-sm text-muted flex items-start gap-2"
                  >
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
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
