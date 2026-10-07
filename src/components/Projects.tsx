"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects, projectGroups, profile, type Project } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { ProjectPreview } from "./ProjectPreview";

const categories = [...new Set(projects.map((project) => project.category))];
const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  return (
    <dialog ref={dialogRef} className="lightbox" aria-labelledby="lightbox-caption" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <button type="button" className="lightbox-close" aria-label="Close image" onClick={onClose}>×</button>
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.preview!} alt={`${project.title} preview`} />
        <figcaption id="lightbox-caption">{project.title}</figcaption>
      </figure>
    </dialog>
  );
}

function ProjectEntry({ project, onPreview, onZoom }: { project: Project; onPreview: () => void; onZoom: () => void }) {
  const [open, setOpen] = useState(false);
  const id = `project-${slug(project.title)}`;

  return (
    <article className="paper" id={id}>
      <div className="paper-side">
        <span className="venue-badge">{project.category}</span>
        {project.preview ? (
          <button type="button" className="preview" aria-label={`Enlarge preview: ${project.title}`} onClick={onZoom}>
            <span className="preview-frame">
              <Image src={project.preview} alt={`${project.title} preview`} fill sizes="150px" />
            </span>
          </button>
        ) : (
          <div className="no-preview" aria-hidden="true">NO PREVIEW</div>
        )}
      </div>
      <div className="paper-content">
        <h4>{project.url ? <a href={project.url} target="_blank" rel="noopener noreferrer">{project.title}</a> : project.title}</h4>
        <p className="paper-summary">{project.description}</p>
        <p className="venue">{project.tech.slice(0, 5).join(" · ")}{project.tech.length > 5 && ` +${project.tech.length - 5}`}, <span className="year">{project.year}</span></p>
        {project.highlight && <p className="paper-note">{project.highlight}</p>}
        <div className="paper-actions">
          {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer">Live</a>}
          {project.url && <button type="button" onClick={onPreview}>Preview</button>}
          <button type="button" aria-expanded={open} aria-controls={`${id}-details`} onClick={() => setOpen(!open)}>Details</button>
          {project.github && (
            <a className="repo-badge" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code on GitHub`}>
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8Z" /></svg>
              Code
            </a>
          )}
        </div>
      </div>
      {open && (
        <div id={`${id}-details`} className="abstract">
          <strong>Stack:</strong> {project.tech.join(", ")}
          <ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
        </div>
      )}
    </article>
  );
}

export function Projects() {
  const [activePreview, setActivePreview] = useState<Project | null>(null);
  const [zoomed, setZoomed] = useState<Project | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [folded, setFolded] = useState<string[]>([]);
  const query = search.trim().toLowerCase();
  const visible = projects.filter((project) =>
    (selected.length === 0 || selected.includes(project.category)) &&
    `${project.title} ${project.description} ${project.tech.join(" ")}`.toLowerCase().includes(query)
  );
  const groups = projectGroups
    .map((group) => ({ ...group, items: visible.filter((project) => (group.years as readonly string[]).includes(project.year)) }))
    .filter((group) => group.items.length > 0);

  function toggleCategory(category: string) {
    setSelected(selected.includes(category) ? selected.filter((item) => item !== category) : [...selected, category]);
  }

  function toggleFold(period: string) {
    setFolded(folded.includes(period) ? folded.filter((item) => item !== period) : [...folded, period]);
  }

  return (
    <section id="projects" className="section">
      <SectionHeading title="Selected Projects">
        <a className="minor-link" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      </SectionHeading>
      <div className="project-toolbar">
        <details className="topic-options">
          <summary>Filter by category</summary>
          <div className="topic-checkboxes">
            {categories.map((category) => (
              <label key={category}>
                <input type="checkbox" checked={selected.includes(category)} onChange={() => toggleCategory(category)} /> {category}
              </label>
            ))}
          </div>
        </details>
        <div className="search">
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" /><path d="m12 12 5 5" stroke="currentColor" strokeWidth="1.5" /></svg>
          <input type="search" aria-label="Search projects" placeholder="Search projects" value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{visible.length} {visible.length === 1 ? "project" : "projects"} shown.</p>
      {groups.map((group, index) => {
        const isFolded = folded.includes(group.period);
        const bodyId = `group-${slug(group.period)}`;
        return (
          <section key={group.period} className={`pub-group ${index === groups.length - 1 ? "is-last" : ""}`} aria-label={group.title}>
            <div className="period"><span>{group.period}</span></div>
            <div className={`group-content ${isFolded ? "folded" : ""}`}>
              <button type="button" className="group-orb" aria-expanded={!isFolded} aria-controls={bodyId} aria-label={`${isFolded ? "Expand" : "Collapse"} ${group.title}`} title={isFolded ? "Show projects" : "Hide projects"} onClick={() => toggleFold(group.period)} />
              <h3 className="group-title"><button type="button" aria-expanded={!isFolded} aria-controls={bodyId} onClick={() => toggleFold(group.period)}>{group.title}</button></h3>
              <div className="group-body" id={bodyId}>
                <div className="group-body-inner">
                  {group.items.map((project) => (
                    <ProjectEntry key={project.title} project={project} onPreview={() => setActivePreview(project)} onZoom={() => setZoomed(project)} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}
      {groups.length === 0 && (
        <div className="empty-state">
          No projects match your search.
          <button type="button" onClick={() => { setSearch(""); setSelected([]); }}>Clear filters</button>
        </div>
      )}
      {zoomed && <Lightbox project={zoomed} onClose={() => setZoomed(null)} />}
      {activePreview && <ProjectPreview project={activePreview} onClose={() => setActivePreview(null)} />}
    </section>
  );
}
