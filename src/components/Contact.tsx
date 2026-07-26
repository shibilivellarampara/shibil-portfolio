import { motion } from "framer-motion";
import { FiMail, FiPhone, FiGithub, FiLinkedin } from "react-icons/fi";
import Section from "./Section";
import { profile } from "../data/portfolio";

const links = [
  { href: `mailto:${profile.email}`, label: profile.email, icon: FiMail },
  { href: `tel:${profile.phone}`, label: profile.phone, icon: FiPhone },
  { href: profile.social.github, label: "GitHub", icon: FiGithub },
  { href: profile.social.linkedin, label: "LinkedIn", icon: FiLinkedin },
];

export default function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let's talk">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-muted max-w-md mb-8"
      >
        Got a project, role, or idea you want to discuss? I&apos;m open to
        conversations — reach out through any of the channels below.
      </motion.p>

      <div className="flex flex-wrap gap-4">
        {links.map((link, i) => {
          const Icon = link.icon;
          return (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas-soft px-5 py-2.5 text-sm font-medium text-ink hover:border-accent hover:text-accent transition-colors"
            >
              <Icon /> {link.label}
            </motion.a>
          );
        })}
      </div>
    </Section>
  );
}
