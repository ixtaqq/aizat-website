"use client";

import { useRef, type ReactNode } from "react";
import type { AppId } from "./types";

export function Desktop({
  onOpenApp,
  children,
}: {
  onOpenApp: (id: AppId) => void;
  children: ReactNode;
}) {
  const shapesRef = useRef<HTMLDivElement | null>(null);

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = shapesRef.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const py = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.setProperty("--px", px.toFixed(2));
    el.style.setProperty("--py", py.toFixed(2));
  }

  return (
    <main id="desktop" onMouseMove={onMouseMove}>
      <div id="shapes" ref={shapesRef}>
        <div className="sw" style={{ top: "14%", left: "8%" }}>
          <div className="shape sh-ring" />
        </div>
        <div className="sw" style={{ top: "60%", left: "30%" }}>
          <div className="shape sh-tri" style={{ animationDuration: "9s" }} />
        </div>
        <div className="sw" style={{ top: "24%", left: "62%" }}>
          <div className="shape sh-cross" style={{ animationDuration: "13s" }} />
        </div>
        <div className="sw" style={{ top: "70%", left: "74%" }}>
          <svg className="shape sh-squig" viewBox="0 0 120 46" style={{ animationDuration: "10s" }}>
            <path
              d="M4 23 Q19 2 34 23 T64 23 T94 23 T124 23"
              fill="none"
              stroke="#ffd400"
              strokeWidth="9"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="sw" style={{ top: "42%", left: "48%" }}>
          <div className="shape sh-dots" style={{ animationDuration: "12s" }} />
        </div>
      </div>

      <div className="deskicons">
        <button className="dicon" onClick={() => onOpenApp("resume")}>
          <div className="ic">📎</div>
          <div className="lb">resume.pdf</div>
        </button>
        <button className="dicon" onClick={() => onOpenApp("trash")}>
          <div className="ic">🗑️</div>
          <div className="lb">Trash</div>
        </button>
      </div>

      <aside className="widget np">
        <div className="vinyl" />
        <div className="npinfo">
          <span className="nplabel">NOW PLAYING</span>
          <b>Sicilian Defense</b>
          <span>chess.mp3 — deep focus</span>
          <div className="eq">
            <i /><i /><i /><i /><i />
          </div>
        </div>
      </aside>

      <aside className="widget note">
        <span className="tape" />
        <b>REMINDERS.txt</b>
        – ship &gt; perfect<br />
        – hydrate, you legend<br />
        – <s>fix bug #412</s> it was a typo<br />
        – these windows are draggable. go on.
      </aside>

      {children}
    </main>
  );
}
