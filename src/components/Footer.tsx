import { ArrowUp } from "lucide-react";
import { profile } from "../data/portfolio";
import Container from "./ui/Container";
import StatusDot from "./ui/StatusDot";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <Container className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="flex items-center gap-2 font-mono text-xs">
          <StatusDot /> all systems operational
        </p>
        <p className="flex items-center gap-4">
          <span className="hidden font-mono text-xs sm:inline">
            React · TypeScript · Tailwind
          </span>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"
          >
            Back to top <ArrowUp size={14} aria-hidden />
          </a>
        </p>
      </Container>
    </footer>
  );
}
