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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium text-accent mb-4"
        >
          Hi, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight text-ink max-w-2xl"
        >
          {profile.name}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 text-xl md:text-2xl text-muted max-w-xl"
        >
          {profile.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-5 text-base text-muted max-w-md leading-relaxed"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-5 py-2.5 text-sm font-medium hover:opacity-85 transition-opacity"
          >
            Get in touch
          </a>
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink hover:bg-canvas-soft transition-colors"
          >
            <FiDownload /> Download CV
          </a>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted animate-bounce"
        aria-label="Scroll to about section"
      >
        <FiArrowDown size={20} />
      </a>
    </section>
  );
}
