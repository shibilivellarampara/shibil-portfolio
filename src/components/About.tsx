import { motion } from "framer-motion";
import Section from "./Section";
import { profile, skills } from "../data/portfolio";

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="A bit about me">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <p className="text-muted leading-relaxed text-base">
          I&apos;m a backend-focused engineer based in {profile.location},
          working mainly with Java and Spring Boot to build microservices
          that hold up in production. Day-to-day that means REST APIs,
          secure authentication, and deployments across AWS, Google Cloud
          Run, and DigitalOcean. Outside of client work I build side
          projects end-to-end — from a multi-tenant ERP to small utility
          bots — because shipping something real is still the fastest way
          to learn.
        </p>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="rounded-full border border-line bg-canvas-soft px-4 py-1.5 text-sm text-ink"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </Section>
  );
}
