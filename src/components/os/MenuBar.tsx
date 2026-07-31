"use client";

import { useEffect, useRef, useState } from "react";
import { ALL_APP_IDS, APPS, type AppId, type Theme } from "./types";

type MenuKey = "apps" | "view" | "help";

export function MenuBar({
  theme,
  soundOn,
  onOpenApp,
  onSetTheme,
  onToggleSound,
  onToggleParty,
}: {
  theme: Theme;
  soundOn: boolean;
  onOpenApp: (id: AppId) => void;
  onSetTheme: (t: Theme) => void;
  onToggleSound: () => void;
  onToggleParty: () => void;
}) {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [clock, setClock] = useState("--:--");
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function tick() {
      const d = new Date();
      const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const mon = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setClock(`${days[d.getDay()]} ${mon[d.getMonth()]} ${d.getDate()} · ${hh}:${mm}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && e.target instanceof Node && rootRef.current.contains(e.target)) return;
      setOpenMenu(null);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  function toggleMenu(e: React.MouseEvent, key: MenuKey) {
    e.stopPropagation();
    setOpenMenu((prev) => (prev === key ? null : key));
  }

  return (
    <header id="menubar" ref={rootRef}>
      <div className="brand">
        <span className="mark">A</span>
        <span className="nm">AIZAT.OS</span>
        <span className="ver">v1.0</span>
      </div>
      <nav className="menus">
        <div className={`menu${openMenu === "apps" ? " open" : ""}`}>
          <button className="mtoggle" onClick={(e) => toggleMenu(e, "apps")}>
            Apps
          </button>
          <div className="drop">
            {ALL_APP_IDS.map((id) => (
              <button
                key={id}
                onClick={() => {
                  setOpenMenu(null);
                  onOpenApp(id);
                }}
              >
                <span>{APPS[id].icon}</span> {APPS[id].title}
              </button>
            ))}
          </div>
        </div>
        <div className={`menu hide-sm${openMenu === "view" ? " open" : ""}`}>
          <button className="mtoggle" onClick={(e) => toggleMenu(e, "view")}>
            View
          </button>
          <div className="drop">
            <button
              onClick={() => {
                setOpenMenu(null);
                onSetTheme("day");
              }}
            >
              ☀️&nbsp; Day mode
            </button>
            <button
              onClick={() => {
                setOpenMenu(null);
                onSetTheme("night");
              }}
            >
              🌙&nbsp; Night mode
            </button>
            <button
              onClick={() => {
                setOpenMenu(null);
                onToggleParty();
              }}
            >
              🎉&nbsp; Party mode
            </button>
            <div className="sep" />
            <button
              onClick={() => {
                setOpenMenu(null);
                onToggleSound();
              }}
            >
              🔊&nbsp; Sound: {soundOn ? "on" : "off"}
            </button>
          </div>
        </div>
        <div className={`menu hide-sm${openMenu === "help" ? " open" : ""}`}>
          <button className="mtoggle" onClick={(e) => toggleMenu(e, "help")}>
            Help
          </button>
          <div className="drop">
            <button
              onClick={() => {
                setOpenMenu(null);
                onOpenApp("tips");
              }}
            >
              💡&nbsp; Tips &amp; shortcuts
            </button>
            <button
              onClick={() => {
                setOpenMenu(null);
                onOpenApp("about");
              }}
            >
              ❓&nbsp; About this machine
            </button>
          </div>
        </div>
      </nav>
      <div className="spacer" />
      <div className="mb-right">
        <button className="mb-btn" aria-label="Toggle sound" title="Sound" onClick={onToggleSound}>
          {soundOn ? "🔊" : "🔇"}
        </button>
        <button
          className="mb-btn"
          aria-label="Toggle theme"
          title="Theme"
          onClick={() => onSetTheme(theme === "night" ? "day" : "night")}
        >
          🌓
        </button>
        <span id="clock">{clock}</span>
      </div>
    </header>
  );
}
