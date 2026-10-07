"use client";

import Image from "next/image";
import { useState } from "react";
import { profile } from "@/lib/data";
import { ResumeButton } from "./ResumeButton";

export function PortraitFlip() {
  const [portrait, setPortrait] = useState<"anime" | "real">("anime");

  return (
    <aside className="profile" data-portrait={portrait}>
      <button
        type="button"
        className="portrait-toggle"
        aria-label="Switch between illustrated and real portrait"
        title="Switch portrait"
        onClick={() => setPortrait(portrait === "anime" ? "real" : "anime")}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 7h11l-3-3M20 17H9l3 3" /></svg>
        <span>{portrait === "anime" ? "Anime" : "Real"}</span>
      </button>
      <div className="portrait-stack">
        <Image className="portrait-anime" src={profile.sketch} alt={`Illustrated portrait of ${profile.name}`} width={682} height={1024} sizes="(max-width: 560px) 80px, 210px" loading="eager" />
        <Image className="portrait-real" src={profile.photo} alt={`Photo of ${profile.name}`} width={853} height={1280} sizes="(max-width: 560px) 80px, 210px" />
      </div>
      <div className="social-links">
        <a href={`mailto:${profile.email}`}>Email</a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <ResumeButton variant="outline" />
      </div>
    </aside>
  );
}
