import type { ReactNode } from "react";
import { motion } from "framer-motion";

export default function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-24 px-6 ${className}`}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-accent mb-2">{eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink mb-10">
            {title}
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
