import { memo, type ReactNode } from "react";
import type { TermLine } from "./types";

export function Prompt() {
  return (
    <span className="shrink-0 select-none">
      <span className="text-emerald-400">shibil@prod</span>
      <span className="text-slate-500">:</span>
      <span className="text-sky-400">~</span>
      <span className="text-slate-500">$</span>
    </span>
  );
}

const URL_RE = /(https?:\/\/[^\s]+)/g;

/** Turn bare URLs in terminal output into links. */
function linkify(text: string): ReactNode[] {
  return text.split(URL_RE).map((part, i) =>
    i % 2 === 1 ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noreferrer noopener"
        className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
      >
        {part}
      </a>
    ) : (
      part
    ),
  );
}

// "key": | "string" | true/false/null | number
const JSON_TOKEN =
  /("(?:[^"\\]|\\.)*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?)/g;

/** Syntax-highlight one line of pretty-printed JSON, jq style. */
function highlightJson(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(JSON_TOKEN)) {
    const at = m.index;
    if (at > last) parts.push(text.slice(last, at));
    const [, str, colon, literal, num] = m;
    if (str) {
      const tone = colon
        ? "text-sky-300"
        : str === '"UP"'
          ? "text-emerald-400"
          : "text-amber-200";
      parts.push(
        <span key={at} className={tone}>
          {str}
        </span>,
      );
      if (colon) parts.push(colon);
    } else if (literal) {
      parts.push(
        <span key={at} className="text-violet-300">
          {literal}
        </span>,
      );
    } else if (num) {
      parts.push(
        <span key={at} className="text-orange-300">
          {num}
        </span>,
      );
    }
    last = at + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

const TerminalLine = memo(function TerminalLine({ line }: { line: TermLine }) {
  switch (line.kind) {
    case "cmd":
      return (
        <div className="flex gap-2">
          <Prompt />
          <span className="min-w-0 break-all text-slate-100">{line.text}</span>
        </div>
      );
    case "kv": {
      const [key, ...rest] = line.text.split("\t");
      return (
        <div className="grid grid-cols-[16ch_minmax(0,1fr)] gap-x-3">
          <span className="text-sky-300">{key}</span>
          <span className="break-words text-slate-200">
            {linkify(rest.join("\t"))}
          </span>
        </div>
      );
    }
    case "json":
      return (
        <div className="whitespace-pre-wrap break-words text-slate-300">
          {highlightJson(line.text)}
        </div>
      );
    default: {
      const tone = {
        out: "text-slate-300",
        muted: "text-slate-500",
        ok: "text-emerald-400",
        error: "text-rose-400",
      }[line.kind];
      return <div className={`break-words ${tone}`}>{linkify(line.text)}</div>;
    }
  }
});

export default TerminalLine;
