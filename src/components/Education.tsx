import { education, extracurricular } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Education() {
  return (
    <section
      id="education"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:px-10 md:py-32"
    >
      <SectionHeading
        title="Education"
        subtitle="Academic foundations and continuous learning."
      />

      <div className="flex flex-col gap-4">
        {education.map((item, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white leading-snug">{item.degree}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {item.school} · {item.period}
                  </p>
                  {item.award && (
                    <div className="mt-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 px-3 py-1 text-xs font-medium text-[var(--color-accent)]">
                        🏅 {item.award}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Extracurricular */}
      <Reveal delay={0.25}>
        <div className="mt-10">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted">
            Extracurricular
          </h3>
          <div className="flex flex-wrap gap-2">
            {extracurricular.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm text-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
