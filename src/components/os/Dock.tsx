"use client";

import { forwardRef } from "react";
import { APPS, DOCK_ORDER, type AppId, type WinState } from "./types";

export const Dock = forwardRef<HTMLElement, {
  windows: Partial<Record<AppId, WinState>>;
  focusedId: AppId | null;
  onClick: (id: AppId) => void;
}>(function Dock({ windows, focusedId, onClick }, ref) {
  return (
    <nav id="dock" aria-label="App dock" ref={ref}>
      {DOCK_ORDER.map((id) => {
        const rec = windows[id];
        const meta = APPS[id];
        const open = !!rec;
        const active = focusedId === id && open && !rec?.min;
        const faded = open && !!rec?.min;
        return (
          <button
            key={id}
            className={`tile${open ? " open" : ""}${active ? " active" : ""}${faded ? " faded" : ""}`}
            data-tip={meta.title}
            style={{ background: meta.color }}
            onClick={() => onClick(id)}
          >
            <span>{meta.icon}</span>
            <span className="dot" />
          </button>
        );
      })}
    </nav>
  );
});
