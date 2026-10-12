/** Seconds since this page was opened (time origin = navigation start). */
export function sessionSeconds(): number {
  return Math.floor(performance.now() / 1000);
}

export function formatUptime(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

/**
 * Real round-trip time to this site's own origin, measured with a HEAD request
 * for a tiny static asset. Returns null if the request fails (e.g. offline).
 */
export async function measureLatency(): Promise<number | null> {
  try {
    const start = performance.now();
    await fetch(`/favicon.svg?probe=${Date.now()}`, {
      method: "HEAD",
      cache: "no-store",
    });
    return Math.round(performance.now() - start);
  } catch {
    return null;
  }
}

export function buildHealth(latencyMs: number | null) {
  return {
    status: "UP",
    engineer: "Shibil Muhamed V",
    checkedAt: new Date().toISOString(),
    uptime: formatUptime(sessionSeconds()),
    latencyMs,
    components: {
      java: { status: "UP", versions: ["8", "17", "21"] },
      springBoot: { status: "UP" },
      postgres: { status: "UP", tenancy: "schema-per-tenant" },
      docker: { status: "UP" },
      cloud: { status: "UP", targets: ["aws", "cloud-run", "digitalocean"] },
    },
  };
}

/** `jq`-style pretty printer: 2-space objects, arrays of primitives kept inline. */
export function pretty(value: unknown, depth = 0): string {
  const pad = "  ".repeat(depth);
  if (Array.isArray(value)) {
    return `[${value.map((v) => JSON.stringify(v)).join(", ")}]`;
  }
  if (value && typeof value === "object") {
    const rows = Object.entries(value).map(
      ([k, v]) => `${pad}  ${JSON.stringify(k)}: ${pretty(v, depth + 1)}`,
    );
    return `{\n${rows.join(",\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}
