"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { projects } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Project = (typeof projects)[number];

function PreviewModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
        style={{ height: "min(85vh, 720px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Browser chrome header */}
        <div className="flex shrink-0 items-center gap-3 border-b border-border bg-base px-4 py-3">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onClose}
              className="h-3 w-3 rounded-full bg-red-500 transition-opacity hover:opacity-80"
              aria-label="Close"
            />
            <span className="h-3 w-3 rounded-full bg-yellow-500 opacity-50" />
            <span className="h-3 w-3 rounded-full bg-green-500 opacity-50" />
          </div>
          {/* URL bar */}
          <div className="flex flex-1 items-center gap-2 rounded-md bg-surface border border-border px-3 py-1.5">
            <svg className="h-3.5 w-3.5 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <span className="truncate text-xs text-muted">{project.url}</span>
          </div>
          {/* Open in new tab */}
          <a
            href={project.url!}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-md p-1.5 text-muted transition-colors hover:text-white"
            aria-label="Open in new tab"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>

        {/* iframe */}
        <div className="relative flex-1">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center gap-2 text-sm text-muted">
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Loading…
            </div>
          )}
          <iframe
            src={project.url!}
            title={`${project.title} live preview`}
            className="h-full w-full border-0"
            onLoad={() => setLoaded(true)}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  onPreview,
}: {
  project: Project;
  onPreview: (p: Project) => void;
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-transform duration-300 hover:-translate-y-1">
      {/* Preview banner — clickable if live URL exists */}
      <div
        className={`relative flex h-44 items-end justify-between overflow-hidden bg-linear-to-br from-[#0f1e2e] to-base p-4 ${project.url ? "cursor-pointer" : ""}`}
        onClick={() => project.url && onPreview(project)}
        role={project.url ? "button" : undefined}
        aria-label={project.url ? `Open live preview of ${project.title}` : undefined}
      >
        {project.preview ? (
          <Image
            src={project.preview}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top opacity-80 transition-opacity duration-300 group-hover:opacity-60"
          />
        ) : (
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        )}
        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        {/* Play button shown on hover when live URL exists */}
        {project.url && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
              Live Preview
            </div>
          </div>
        )}

        <span className="relative z-10 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent border border-accent/30 backdrop-blur-sm">
          {project.category}
        </span>
        <span className="relative z-10 text-xs text-muted font-mono">{project.year}</span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-white">{project.title}</h3>

        <p className="mt-3 text-sm text-muted leading-relaxed">{project.description}</p>

        <ul className="mt-4 space-y-1.5 flex-1">
          {project.details.map((d, j) => (
            <li key={j} className="flex gap-2.5 text-sm text-muted">
              <span className="mt-0.5 text-accent shrink-0" aria-hidden="true">▸</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>

        {/* Footer: tech tags + links */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="pill">{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {project.url && (
              <button
                onClick={() => onPreview(project)}
                className="flex items-center gap-1.5 text-xs text-accent transition-colors hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
                Preview
              </button>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-white"
                aria-label="View source on GitHub"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                </svg>
                GitHub
              </a>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-white"
                aria-label="View live site"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
                Live
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [activePreview, setActivePreview] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:px-10 md:py-32"
    >
      <SectionHeading
        title="Projects"
        subtitle="Side projects and applications built with passion."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.08}>
            <ProjectCard project={project} onPreview={setActivePreview} />
          </Reveal>
        ))}
      </div>

      {activePreview && (
        <PreviewModal project={activePreview} onClose={() => setActivePreview(null)} />
      )}
    </section>
  );
}
