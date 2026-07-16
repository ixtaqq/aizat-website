"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { experience } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Experience() {
  const [expanded, setExpanded] = useState<number>(0);

  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:px-10 md:py-32"
    >
      <SectionHeading
        title="Experience"
        subtitle="A path spanning UI/UX design and software engineering."
      />

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 h-full w-px bg-[var(--color-border)] md:left-6" />

        <div className="flex flex-col gap-0">
          {experience.map((job, i) => {
            const isOpen = expanded === i;
            return (
              <Reveal key={i} delay={i * 0.06}>
                <div className="relative pl-12 md:pl-16">
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-3 top-6 h-3 w-3 rounded-full border-2 transition-colors duration-300 md:left-[18px] ${
                      isOpen
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
                        : "border-[var(--color-border)] bg-[var(--color-surface)]"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? -1 : i)}
                    className="w-full text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start justify-between gap-4 border-t border-[var(--color-border)] py-6">
                      <div>
                        <p className="text-sm text-muted">
                          {job.location} · {job.period}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold text-white">
                          {job.company}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0 mt-1">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                            job.badge === "Internship"
                              ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                              : "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                          }`}
                        >
                          {job.badge}
                        </span>
                        <svg
                          className={`h-4 w-4 text-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8">
                          <div className="mb-4">
                            <p className="font-semibold text-[var(--color-accent)]">{job.role}</p>
                            <p className="mt-0.5 text-xs text-muted font-mono">{job.period} · {job.duration}</p>
                          </div>
                          <ul className="space-y-2.5">
                            {job.highlights.map((h, j) => (
                              <li key={j} className="flex gap-3 text-sm text-muted">
                                <span className="mt-0.5 text-[var(--color-accent)] flex-shrink-0" aria-hidden="true">▸</span>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
