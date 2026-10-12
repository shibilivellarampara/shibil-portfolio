export type LineKind =
  | "cmd"
  | "out"
  | "muted"
  | "ok"
  | "error"
  | "kv"
  | "json";

/** A line produced by a command, before it is given an id and appended to the screen. */
export type OutLine = { kind: Exclude<LineKind, "cmd">; text: string };

export type TermLine = { id: number; kind: LineKind; text: string };

export type ExecResult = {
  lines: OutLine[];
  /** CSS selector to scroll to once the output has been shown. */
  navigate?: string;
};
