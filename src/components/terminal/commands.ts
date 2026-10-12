import {
  flagship,
  games,
  profile,
  projects,
  skillGroups,
} from "../../data/portfolio";
import {
  buildHealth,
  formatUptime,
  measureLatency,
  pretty,
  sessionSeconds,
} from "./health";
import type { ExecResult, OutLine } from "./types";

const out = (text: string, kind: OutLine["kind"] = "out"): OutLine => ({
  kind,
  text,
});
const kv = (key: string, value: string): OutLine => ({
  kind: "kv",
  text: `${key}\t${value}`,
});
const done = (...lines: OutLine[]): ExecResult => ({ lines });
const fail = (message: string): ExecResult => done(out(message, "error"));

const jsonLines = (value: unknown): OutLine[] =>
  pretty(value)
    .split("\n")
    .map((text) => ({ kind: "json", text }));

const HEALTH_CURL =
  /^curl (?:-sS? )?(?:http:\/\/)?localhost:8080\/actuator\/health\/?$/;
const HIRE_SCRIPT = /^(?:\.\/|bash |sh )?hire_engineer\.sh$/;
const JQ = /^jq(?: (-r))?(?: ['"]?([^'"]*)['"]?)?$/;
const JQ_PATH = /^\.(?:[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*)?$/;

/** The only jq filters supported: `.` or a dot path such as `.components.postgres`. */
function applyFilter(data: unknown, filter: string) {
  if (!JQ_PATH.test(filter)) return { ok: false as const };
  let value: unknown = data;
  for (const key of filter.split(".").filter(Boolean)) {
    value =
      value && typeof value === "object"
        ? (value as Record<string, unknown>)[key]
        : null;
  }
  return { ok: true as const, value: value ?? null };
}

async function runHealth(head: string, pipes: string[]): Promise<ExecResult> {
  const health = buildHealth(await measureLatency());

  if (pipes.length === 0) {
    // Bare curl prints compact JSON; the `health` alias pretty-prints like `| jq`.
    return head === "health"
      ? done(...jsonLines(health))
      : done(out(JSON.stringify(health), "json"));
  }
  if (pipes.length > 1) return fail("zsh: only a single `| jq` stage is supported");

  const match = JQ.exec(pipes[0]);
  if (!match) {
    return fail(`zsh: command not found: ${pipes[0].split(" ")[0]} (try: | jq)`);
  }
  const raw = Boolean(match[1]);
  const filter = (match[2] ?? ".").trim() || ".";
  const result = applyFilter(health, filter);
  if (!result.ok) {
    return fail(
      `jq: unsupported filter "${filter}" (try .status or .components.postgres)`,
    );
  }
  if (raw && typeof result.value === "string") return done(out(result.value));
  return done(...jsonLines(result.value));
}

export async function execute(input: string): Promise<ExecResult> {
  const cmd = input.trim().replace(/\s+/g, " ");
  const [head, ...pipes] = cmd.split("|").map((part) => part.trim());

  if (head === "health" || HEALTH_CURL.test(head)) {
    return runHealth(head, pipes);
  }
  if (pipes.length) {
    return fail("zsh: pipes are only supported after the health check");
  }
  if (HIRE_SCRIPT.test(cmd)) {
    return {
      lines: [out("✔ exit 0: opening the contact section…", "ok")],
      navigate: "#contact",
    };
  }

  switch (cmd) {
    case "help":
      return done(
        out("Available commands", "muted"),
        kv("status", "role, stack, and availability (alias: shibil --status)"),
        kv("health", "actuator health check (alias: curl … | jq)"),
        kv("skills", "tech stack by category"),
        kv("projects", "flagship and side projects"),
        kv("games", "playable multiplayer demos"),
        kv("uptime", "how long this page has been up"),
        kv("contact", "how to reach me"),
        kv("hire_engineer.sh", "jump to the contact section"),
        kv("clear", "clear the screen"),
        out("Tip: try  health | jq .components.postgres", "muted"),
      );

    case "shibil --status":
    case "status":
      return done(
        kv("role", profile.currentRole),
        kv("company", profile.currentCompany),
        kv("since", "Mar 2025"),
        kv("stack", "Java 17/21 · Spring Boot · PostgreSQL"),
        kv("cloud", "AWS · Cloud Run · DigitalOcean"),
        kv("location", profile.location),
        out("✔ available for conversations", "ok"),
      );

    case "whoami":
      return done(out(`${profile.name}: ${profile.title}`));

    case "skills":
      return done(
        ...skillGroups.map((g) =>
          kv(g.path.replace("/", ""), g.items.join(" · ")),
        ),
      );

    case "projects":
      return done(
        kv("qelvix-erp", `flagship · ${flagship.stack.join(" · ")}`),
        ...projects.map((p) =>
          kv(p.name.toLowerCase(), p.stack.join(" · ")),
        ),
      );

    case "games":
      return done(...games.map((g) => kv(g.name.toLowerCase().replace(" ", "-"), g.live)));

    case "uptime":
      return done(out(`up ${formatUptime(sessionSeconds())} (this session)`));

    case "contact":
      return done(
        kv("email", profile.email),
        kv("github", profile.social.github),
        kv("linkedin", profile.social.linkedin),
      );

    default:
      return fail(`zsh: command not found: ${cmd.split(" ")[0]}. Try \`help\`.`);
  }
}

/** Commands offered as one-click chips under the prompt. */
export const SUGGESTIONS = [
  "help",
  "shibil --status",
  "health",
  "skills",
  "projects",
  "games",
];

/** Commands used for Tab completion. */
export const COMPLETIONS = [
  "help",
  "shibil --status",
  "status",
  "health",
  "skills",
  "projects",
  "games",
  "uptime",
  "contact",
  "whoami",
  "hire_engineer.sh",
  "clear",
];
