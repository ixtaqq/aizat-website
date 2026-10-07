"use client";

import { useState } from "react";
import { nav } from "@/lib/data";
import { ResumeButton } from "./ResumeButton";

export function Nav() {
  const [dark, setDark] = useState(false);

  function toggleTheme() {
    const next = !dark;
    document.documentElement.dataset.theme = next ? "dark" : "light";
    setDark(next);
  }

  return (
    <header className="site-header">
      <nav aria-label="Main navigation">
        <a href="#about" className="brand" aria-label="Aizat Taqqiyudin — back to top">at</a>
        <div className="nav-links">
          {nav.map((item) => <a key={item.href} href={item.href}>{item.label.toLowerCase()}</a>)}
          <ResumeButton variant="nav" />
          <button type="button" className="theme-toggle" aria-label="Toggle dark mode" aria-pressed={dark} onClick={toggleTheme}>
            {dark ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
