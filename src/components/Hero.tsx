import { Fragment } from "react";
import { profile, about } from "@/lib/data";
import { HeroBanner } from "./HeroBanner";
import { PortraitFlip } from "./PortraitFlip";

function withLinks(paragraph: string) {
  const parts: React.ReactNode[] = [paragraph];
  for (const link of about.links) {
    const index = parts.findIndex((part) => typeof part === "string" && part.includes(link.text));
    if (index === -1) continue;
    const [before, ...rest] = (parts[index] as string).split(link.text);
    parts.splice(index, 1, before, <a key={link.text} href={link.href} target="_blank" rel="noopener noreferrer">{link.text}</a>, rest.join(link.text));
  }
  return parts.map((part, index) => <Fragment key={index}>{part}</Fragment>);
}

export function Hero() {
  return (
    <>
      <HeroBanner />
      <section id="about" className="about">
        <h1>{profile.firstName} <span>{profile.lastName}</span></h1>
        <p className="subtitle">
          {profile.role} · <a href="#contact"><span className="open-dot" aria-hidden="true" />open to work</a>
        </p>
        <div className="about-body">
          <div className="biography">
            {about.paragraphs.map((paragraph) => <p key={paragraph}>{withLinks(paragraph)}</p>)}
            <p>{profile.tagline}</p>
          </div>
          <PortraitFlip />
        </div>
      </section>
    </>
  );
}
