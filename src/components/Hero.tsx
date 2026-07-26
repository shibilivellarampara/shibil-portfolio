import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { FiArrowDown, FiDownload } from "react-icons/fi";
import { profile } from "../data/portfolio";

const FloatingShapes = lazy(() => import("../three/FloatingShapes"));

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 -z-0">
        <Suspense fallback={null}>
          <FloatingShapes />
        </Suspense>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 w-full">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-accent mb-5 tracking-wide uppercase"
        >
          Senior Java Backend Developer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-ink max-w-2xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-5 text-base text-muted max-w-lg leading-relaxed"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-ink text-canvas px-5 py-2.5 text-sm font-medium hover:opacity-85 transition-opacity"
          >
            Get in touch
          </a>
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 border border-line px-5 py-2.5 text-sm font-medium text-ink hover:border-accent hover:text-accent transition-colors"
          >
            <FiDownload size={14} /> Download CV
          </a>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-ink transition-colors"
        aria-label="Scroll to about section"
      >
        <FiArrowDown size={18} />
      </a>
    </section>
  );
}
