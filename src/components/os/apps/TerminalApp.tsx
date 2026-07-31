"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { APPS, DOCK_ORDER, type AppId, type Theme } from "../types";

type TLine = { id: number; cls?: string; content: ReactNode };

export function TerminalApp({
  theme,
  onOpenApp,
  onSetTheme,
  onToggleParty,
}: {
  theme: Theme;
  onOpenApp: (id: AppId) => void;
  onSetTheme: (t: Theme) => void;
  onToggleParty: () => void;
}) {
  const [lines, setLines] = useState<TLine[]>([
    { id: 0, cls: "sys", content: "AIZAT TERM v1.0 — type 'help' to begin. Or 'neofetch'. I dare you." },
  ]);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [, setHistPtr] = useState(0);
  const outRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = outRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function print(content: ReactNode, cls?: string) {
    setLines((prev) => [...prev, { id: idRef.current++, cls, content }]);
  }

  function neofetchInfo() {
    return [
      "aizat@aizatos",
      "------------------",
      `OS        AIZAT.OS 1.0 "Putrajaya" LTS`,
      "Host      Putrajaya, Malaysia (remote-friendly)",
      "Kernel    typescript-5.x",
      "Uptime    since 2022 (professionally)",
      "Shell     bash",
      "DE        AIZAT-WM (hand-rolled)",
      `Theme     ${theme} [brutalist]`,
      "CPU       Curiosity @ 3.2GHz (boost: deadlines)",
      "GPU       Imagination RTX ∞",
      "Memory    chess openings / market charts / ∞",
    ].join("\n");
  }

  function run(raw: string) {
    const c = raw.trim();
    if (c) {
      setHist((prev) => [...prev, c]);
      setHistPtr((prev) => prev + 1);
    }
    print(`aizat@aizatos:~$ ${raw}`, "cmd");
    if (!c) return;
    const low = c.toLowerCase();
    const parts = c.split(/\s+/);
    const base = parts[0].toLowerCase();

    if (low === "sudo hire-me") {
      print("AUTHENTICATING… ✓", "ok");
      print("CONTRACT GENERATED: 1× Aizat Taqqiyudin, ready to ship.", "ok");
      print("Opening contact.vcf to sign…", "sys");
      onOpenApp("contact");
      return;
    }

    switch (base) {
      case "help":
        print("available commands:", "sys");
        print(
          `  help  whoami  about  ls  open <app>  skills  projects  education\n  contact  resume  neofetch  theme [day|night]  party  clear  sudo hire-me`,
          "pre"
        );
        print(`try: open terminal, ls, .secrets`, "sys");
        break;
      case "whoami":
        print("aizat — software developer who ships clean, accessible interfaces.", "ok");
        break;
      case "about":
        print("opening README.txt…", "sys");
        onOpenApp("about");
        break;
      case "projects":
        print("opening projects/…", "sys");
        onOpenApp("projects");
        break;
      case "skills":
        print("opening skills.cfg…", "sys");
        onOpenApp("skills");
        break;
      case "education":
        print("opening education.log…", "sys");
        onOpenApp("education");
        break;
      case "contact":
        print("opening contact.vcf…", "sys");
        onOpenApp("contact");
        break;
      case "resume":
        print("opening resume.pdf…", "sys");
        onOpenApp("resume");
        break;
      case "ls":
        print("about/  experience/  projects/  skills/  education/  contact/  resume.pdf  .secrets/", "pre");
        break;
      case ".secrets":
        print("Nice try. The password is 'hunter2'.", "ok");
        print("(Just kidding. Or am I.)", "sys");
        break;
      case "open": {
        const t = (parts[1] || "").toLowerCase() as AppId;
        if (APPS[t]) {
          print(`opening ${t}…`, "sys");
          onOpenApp(t);
        } else {
          print(`open: ${parts[1] || "?"}: no such app. try: ${DOCK_ORDER.join(", ")}`, "err");
        }
        break;
      }
      case "theme":
        if (parts[1] === "night") {
          onSetTheme("night");
          print("theme → night 🌙", "ok");
        } else if (parts[1] === "day") {
          onSetTheme("day");
          print("theme → day ☀️", "ok");
        } else {
          print("usage: theme day | theme night", "err");
        }
        break;
      case "party":
        onToggleParty();
        print("party mode toggled 🎉", "ok");
        break;
      case "clear":
        setLines([]);
        break;
      case "neofetch":
        print(neofetchInfo(), "pre");
        break;
      case "rm":
        print("rm: refusing to delete portfolio. have you tried Ctrl+Z?", "err");
        break;
      case "exit":
        print("there is no escape from AIZAT.OS. (try Esc to close this window though.)", "err");
        break;
      case "hello":
      case "hi":
      case "hey":
        print("hey! 👋 glad you opened the terminal.", "ok");
        break;
      default:
        print(`command not found: ${base} — type 'help'.`, "err");
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    run(input);
    setInput("");
    setHistPtr(hist.length + 1);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistPtr((prev) => {
        const next = Math.max(0, prev - 1);
        setInput(hist[next] || "");
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistPtr((prev) => {
        const next = prev + 1;
        if (next < hist.length) {
          setInput(hist[next] || "");
          return next;
        }
        setInput("");
        return hist.length;
      });
    }
  }

  return (
    <div className="term">
      <div className="tout" ref={outRef}>
        {lines.map((l) => (
          <div className={`tline${l.cls ? ` ${l.cls}` : ""}`} key={l.id}>
            {l.content}
          </div>
        ))}
      </div>
      <form className="trow" onSubmit={handleSubmit}>
        <span className="tprompt">aizat@aizatos:~$</span>
        <input
          id="tin"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          aria-label="terminal input"
        />
      </form>
    </div>
  );
}
