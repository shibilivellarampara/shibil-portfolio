import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import Section from "./Section";
import { projects } from "../data/portfolio";

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've built"
      className="bg-canvas-soft/50"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="border border-line bg-canvas p-6 flex flex-col hover:border-accent/50 transition-colors"
          >
            <h3 className="text-lg font-medium text-ink">{project.name}</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed grow">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono bg-canvas-soft border border-line px-2 py-1 text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent transition-colors"
                >
                  <FiGithub /> Code
                </a>
              )}
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent transition-colors"
                >
                  <FiExternalLink /> Website
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent transition-colors"
                >
                  <FiExternalLink /> Live App
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
