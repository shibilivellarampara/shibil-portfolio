import { motion } from "framer-motion";
import Section from "./Section";
import { profile, skills } from "../data/portfolio";

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Background">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <p className="text-muted leading-relaxed text-base">
          Backend-focused engineer based in {profile.location}, working
          primarily in Java and Spring Boot to build microservices that
          hold up in production. Day-to-day work spans REST API design,
          authentication and authorization, and cloud deployment across
          AWS, Google Cloud Run, and DigitalOcean. Outside client work,
          builds side projects end-to-end — from a multi-tenant ERP
          platform to smaller backend utilities.
        </p>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              className="border border-line bg-canvas-soft px-3 py-1.5 text-xs font-mono text-muted"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </Section>
  );
}
