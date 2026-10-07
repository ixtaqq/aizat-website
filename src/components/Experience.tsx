"use client";

import { useState } from "react";
import { experience, type Experience as Job } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

function ExperienceRow({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const id = `job-${job.period.replace(/[^0-9]+/g, "-")}`;

  return (
    <div className="experience-row">
      <span className="experience-date">{job.period}</span>
      <div>
        <h3>{job.company}</h3>
        <p>{job.role}</p>
        <button type="button" className="row-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>Highlights</button>
        {open && <ul id={id} className="abstract">{job.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}
      </div>
      <span className="location">{job.location}</span>
    </div>
  );
}

export function Experience() {
  const recent = experience.filter((job) => job.badge !== "Internship");
  const internships = experience.filter((job) => job.badge === "Internship");

  return (
    <section id="experience" className="section">
      <SectionHeading title="Experience" />
      {recent.map((job) => <ExperienceRow key={`${job.company}-${job.role}`} job={job} />)}
      {internships.length > 0 && (
        <details className="earlier">
          <summary>Earlier experience</summary>
          {internships.map((job) => <ExperienceRow key={`${job.company}-${job.role}`} job={job} />)}
        </details>
      )}
    </section>
  );
}
