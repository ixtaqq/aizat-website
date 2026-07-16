import Image from "next/image";
import { profile, about } from "@/lib/data";
import { Reveal } from "./Reveal";
import { ResumeButton } from "./ResumeButton";

export function Hero() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-6xl scroll-mt-16 px-6 pb-24 pt-28 md:px-10 md:pt-36"
    >
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-10">
        {/* Left — content */}
        <div className="order-2 md:order-1 md:col-span-7">
          {/* Status pill */}
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              Available
            </div>
          </Reveal>

          {/* Name */}
          <Reveal delay={0.06}>
            <h1
              className="mt-6 font-bold leading-[1.0] tracking-tight text-white"
              style={{ fontSize: "clamp(2.8rem, 8vw, 5rem)" }}
            >
              {profile.firstName}
              <br />
              {profile.lastName}
            </h1>
          </Reveal>

          {/* Subtitle */}
          <Reveal delay={0.12}>
            <p className="mt-3 text-lg font-semibold text-accent">
              {profile.role}
            </p>
          </Reveal>

          {/* Tagline */}
          <Reveal delay={0.18}>
            <p className="mt-4 max-w-md text-muted leading-relaxed">
              {profile.tagline}
            </p>
          </Reveal>

          {/* Contact row */}
          <Reveal delay={0.24}>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {profile.location}
              </span>
              <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                {profile.email}
              </a>
              <a href={profile.phoneHref} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6z" />
                </svg>
                {profile.phone}
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                </svg>
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal delay={0.30}>
            <div className="mt-8 flex flex-wrap gap-3">
              <ResumeButton variant="primary" />
              <a
                href="#experience"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-white transition-all hover:border-accent hover:text-accent"
              >
                View My Journey
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right — photo */}
        <div className="order-1 md:order-2 md:col-span-5">
          <Reveal delay={0.15} className="relative mx-auto max-w-55 md:max-w-none">
            <div className="relative overflow-hidden rounded-full border-2 border-border aspect-square">
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width={480}
                height={480}
                priority
                sizes="(max-width: 768px) 220px, 38vw"
                className="h-full w-full object-cover object-top"
              />
            </div>
            {/* Glow */}
            <div
              className="pointer-events-none absolute -inset-4 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
            />
          </Reveal>
        </div>
      </div>

      {/* Divider + Bio */}
      <Reveal delay={0.40}>
        <div className="mt-16 border-t border-border pt-10">
          <div className="grid gap-5 text-muted leading-relaxed md:grid-cols-2 md:gap-10">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
