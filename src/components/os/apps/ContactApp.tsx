"use client";

import { profile } from "@/lib/data";

export function ContactApp({
  onCopy,
  beep,
}: {
  onCopy: (msg: string) => void;
  beep: (freq?: number, dur?: number, type?: OscillatorType, vol?: number) => void;
}) {
  const githubHandle = profile.github.replace(/^https?:\/\/github\.com\//, "");
  const linkedinHandle = profile.linkedin.match(/\/in\/([^/]+)/)?.[1] ?? "";

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      onCopy("Email copied — talk soon ✌️");
      beep(880, 0.06, "square");
    } catch {
      onCopy(`Copy failed — it's ${profile.email}`);
    }
  }

  return (
    <div className="pad contact">
      <span className="avail reveal" style={{ ["--d" as string]: "0s" }}>
        <span className="dot" /> Open to new opportunities
      </span>
      <h2 className="reveal" style={{ ["--d" as string]: ".06s" }}>
        Let&apos;s build
        <br />
        something useful.
      </h2>
      <div className="email-row reveal" style={{ ["--d" as string]: ".12s" }}>
        <code>{profile.email}</code>
        <button className="copybtn" onClick={copyEmail}>
          ⧉ copy
        </button>
      </div>
      <a
        className="btn-mail reveal"
        style={{ ["--d" as string]: ".18s" }}
        href={`mailto:${profile.email}?subject=Let%27s%20build%20something`}
      >
        ✉ Compose email
      </a>
      <ul className="socials reveal" style={{ ["--d" as string]: ".24s" }}>
        <li>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub <span className="ar">@{githubHandle}</span>
          </a>
          <span className="ar">↗</span>
        </li>
        <li>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <span className="ar">/in/{linkedinHandle}</span>
          </a>
          <span className="ar">↗</span>
        </li>
        <li>
          <a href={profile.phoneHref}>
            Phone <span className="ar">{profile.phone}</span>
          </a>
          <span className="ar">↗</span>
        </li>
      </ul>
      <p className="pgp reveal" style={{ ["--d" as string]: ".3s" }}>
        Also fluent in: chess openings &amp; spreadsheet formulas.
      </p>
    </div>
  );
}
