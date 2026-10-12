import type { ReactNode } from "react";
import {
  ArrowDown,
  Boxes,
  Container,
  Database,
  Globe,
  type LucideIcon,
} from "lucide-react";

function Node({
  icon: Icon,
  title,
  sub,
  children,
}: {
  icon: LucideIcon;
  title: string;
  sub: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-line bg-card p-3">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent">
          <Icon size={16} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-medium text-ink">{title}</p>
          <p className="truncate text-[11px] text-muted">{sub}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Hop({ label }: { label: string }) {
  return (
    <div
      className="flex items-center justify-center gap-2 py-1.5 text-[10px] uppercase tracking-wider text-muted"
      aria-hidden
    >
      <span className="h-px w-6 bg-line" />
      <ArrowDown size={12} className="text-accent" />
      {label}
      <span className="h-px w-6 bg-line" />
    </div>
  );
}

/** Request path through Qelvix ERP, drawn from the real stack: Angular, Spring Boot, schema-per-tenant PostgreSQL. */
export default function ArchitectureDiagram() {
  return (
    <figure
      className="rounded-xl border border-line bg-canvas/80 p-4 font-mono sm:p-5"
      aria-label="Qelvix ERP architecture: Angular client calls Spring Boot services, which route to a PostgreSQL schema per tenant"
    >
      <figcaption className="mb-3 text-[11px] text-muted">
        {"// request path"}
      </figcaption>

      <Node icon={Globe} title="Angular client" sub="tenant user session" />
      <Hop label="REST / JSON" />
      <Node icon={Boxes} title="Spring Boot services" sub="microservices core" />
      <Hop label="schema routing" />
      <Node icon={Database} title="PostgreSQL" sub="schema-per-tenant isolation">
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["tenant_a", "tenant_b", "tenant_n"].map((schema) => (
            <span
              key={schema}
              className="rounded border border-accent/30 bg-accent-soft px-1.5 py-0.5 text-[11px] text-accent"
            >
              {schema}
            </span>
          ))}
        </div>
      </Node>

      <div className="mt-4 flex items-center gap-2 border-t border-dashed border-line pt-3 text-[11px] text-muted">
        <Container size={14} className="shrink-0 text-accent" aria-hidden />
        <span className="truncate">git push → CI build → Docker image → deploy</span>
      </div>
    </figure>
  );
}
