import { useCallback, useEffect, useRef, useState } from "react";
import {
  COMPLETIONS,
  SUGGESTIONS,
  execute,
} from "./commands";
import { formatUptime, measureLatency, sessionSeconds } from "./health";
import TerminalLine, { Prompt } from "./TerminalLine";
import type { OutLine, TermLine } from "./types";

/** Commands that "run" automatically when the page loads. */
const BOOT_COMMANDS = [
  "shibil --status",
  "curl -s localhost:8080/actuator/health | jq",
];

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Live footer: session uptime ticks every second, latency is a real round trip. */
function StatusBar() {
  const [uptime, setUptime] = useState(sessionSeconds);
  const [latency, setLatency] = useState<number | null | undefined>(undefined);

  useEffect(() => {
    const tick = window.setInterval(() => setUptime(sessionSeconds()), 1000);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    let alive = true;
    const probe = () => {
      if (document.visibilityState === "visible") {
        void measureLatency().then((ms) => alive && setLatency(ms));
      }
    };
    probe();
    const poll = window.setInterval(probe, 30_000);
    return () => {
      alive = false;
      window.clearInterval(poll);
    };
  }, []);

  return (
    <div className="flex items-center gap-4 border-t border-term-line bg-term-bar px-4 py-2 text-[11px] text-slate-400">
      <span className="flex items-center gap-1.5 text-emerald-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
        UP
      </span>
      <span>
        uptime <span className="text-slate-200">{formatUptime(uptime)}</span>
      </span>
      <span>
        latency{" "}
        <span className="text-slate-200">
          {latency === undefined ? "…" : latency === null ? "n/a" : `${latency} ms`}
        </span>
      </span>
      <span className="ml-auto hidden sm:inline">localhost:8080</span>
    </div>
  );
}

export default function Terminal() {
  const [lines, setLines] = useState<TermLine[]>([]);
  const [typing, setTyping] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");

  const nextId = useRef(0);
  const history = useRef<string[]>([]);
  const historyPos = useRef(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const append = useCallback((out: (OutLine | Pick<TermLine, "kind" | "text">)[]) => {
    const added = out.map((line) => ({ id: nextId.current++, ...line }));
    setLines((prev) => [...prev, ...added]);
  }, []);

  // Boot sequence: type each command, then reveal its output line by line.
  useEffect(() => {
    let cancelled = false;
    const instant = prefersReducedMotion();
    const wait = (ms: number) => (instant ? Promise.resolve() : sleep(ms));

    async function boot() {
      setLines([]);
      append([
        { kind: "muted", text: `Last login: ${new Date().toDateString()} on ttys001` },
      ]);

      for (const cmd of BOOT_COMMANDS) {
        if (!instant) {
          for (let i = 1; i <= cmd.length; i++) {
            if (cancelled) return;
            setTyping(cmd.slice(0, i));
            await sleep(22);
          }
          await sleep(240);
        }
        if (cancelled) return;
        setTyping(null);
        append([{ kind: "cmd", text: cmd }]);

        const result = await execute(cmd);
        for (const line of result.lines) {
          if (cancelled) return;
          append([line]);
          await wait(28);
        }
        await wait(300);
      }
      if (!cancelled) setReady(true);
    }

    void boot();
    return () => {
      cancelled = true;
    };
  }, [append]);

  // Keep the newest output in view, scrolling only the terminal, never the page.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, typing, ready]);

  const run = useCallback(
    async (raw: string) => {
      const cmd = raw.trim();
      setInput("");
      historyPos.current = -1;
      append([{ kind: "cmd", text: raw }]);
      if (!cmd) return;

      history.current.push(cmd);
      if (cmd === "clear") {
        setLines([]);
        return;
      }

      setBusy(true);
      const result = await execute(cmd);
      append(result.lines);
      setBusy(false);

      if (result.navigate) {
        const target = result.navigate;
        window.setTimeout(() => {
          document.querySelector(target)?.scrollIntoView({
            behavior: prefersReducedMotion() ? "auto" : "smooth",
          });
        }, 350);
      }
    },
    [append],
  );

  const recall = (direction: 1 | -1) => {
    const entries = history.current;
    if (!entries.length) return;
    const pos = Math.min(Math.max(historyPos.current + direction, -1), entries.length - 1);
    historyPos.current = pos;
    setInput(pos === -1 ? "" : entries[entries.length - 1 - pos]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      recall(1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      recall(-1);
    } else if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setLines([]);
    } else if (e.key === "Tab" && input) {
      // Only swallow Tab when there is something to complete, so keyboard users can still tab out.
      const match = COMPLETIONS.find((c) => c.startsWith(input) && c !== input);
      if (match) {
        e.preventDefault();
        setInput(match);
      }
    }
  };

  const canRun = ready && !busy;

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent/25 via-transparent to-sky-500/10 opacity-70 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-xl border border-term-line bg-term font-mono transition-colors focus-within:border-emerald-500/50 text-[13px] leading-relaxed text-slate-300 shadow-2xl shadow-black/40">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-term-line bg-term-bar px-4 py-2.5">
          <div className="flex gap-2" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="mx-auto truncate pr-12 text-xs text-slate-500">
            shibil@prod: ~ — zsh
          </span>
        </div>

        {/* Output + prompt */}
        <div
          ref={scrollRef}
          role="log"
          aria-label="Terminal output"
          tabIndex={0}
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
          className="h-[22rem] overflow-y-auto px-4 py-3 sm:h-[26rem]"
        >
          {lines.map((line) => (
            <TerminalLine key={line.id} line={line} />
          ))}

          {typing !== null && (
            <div className="flex gap-2" aria-hidden>
              <Prompt />
              <span className="text-slate-100">
                {typing}
                <span className="animate-blink">▍</span>
              </span>
            </div>
          )}

          {ready && (
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (canRun) void run(input);
              }}
            >
              <Prompt />
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                readOnly={busy}
                aria-label="Terminal command"
                placeholder="type help"
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                className="min-w-0 flex-1 bg-transparent text-slate-100 caret-emerald-400 outline-none placeholder:text-slate-600 [@media(pointer:coarse)]:text-base"
              />
            </form>
          )}
        </div>

        {/* One-click commands (the input is also fully keyboard-driven) */}
        <div className="flex gap-2 overflow-x-auto border-t border-term-line px-4 py-2.5">
          {SUGGESTIONS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              disabled={!canRun}
              onClick={() => void run(cmd)}
              className="shrink-0 rounded-md border border-term-line bg-term-bar px-2.5 py-1 text-xs text-slate-400 transition-colors hover:border-emerald-500/50 hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {cmd}
            </button>
          ))}
        </div>

        <StatusBar />
      </div>
    </div>
  );
}
