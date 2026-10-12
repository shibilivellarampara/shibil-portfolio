import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Terminal, X } from "lucide-react";
import { navLinks } from "../data/portfolio";
import Container from "./ui/Container";
import ThemeToggle from "./ThemeToggle";

/** Terminal-style call to action, shared by the desktop bar and the mobile menu. */
function HireButton({
  onClick,
  className = "",
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <a
      href="#contact"
      onClick={onClick}
      className={`items-center gap-1.5 rounded-md border border-accent/40 bg-accent-soft px-3 py-1.5 font-mono text-xs text-accent transition-colors hover:bg-accent hover:text-on-accent ${className}`}
    >
      <span className="opacity-60">$</span> hire_engineer.sh
    </a>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/75 backdrop-blur-md">
      <Container>
        <nav
          aria-label="Primary"
          className="flex h-16 items-center justify-between gap-4"
        >
          <a
            href="#top"
            className="flex items-center gap-2 font-mono text-sm font-medium tracking-tight text-ink"
          >
            <Terminal size={16} className="text-accent" aria-hidden />
            <span>
              shibil<span className="text-accent">.</span>dev
            </span>
          </a>

          <ul className="hidden items-center gap-7 text-sm text-muted md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <HireButton className="hidden sm:inline-flex" />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="rounded-md p-2 text-ink transition-colors hover:bg-card md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-canvas md:hidden"
          >
            <Container className="py-3">
              <ul>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 text-sm text-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <HireButton
                onClick={() => setOpen(false)}
                className="mb-2 mt-2 inline-flex sm:hidden"
              />
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
