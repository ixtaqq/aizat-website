import { certifications, education, extracurricular } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section id="education" className="section">
      <SectionHeading title="Education & Certifications">
        <span className="minor-link">scroll for more</span>
      </SectionHeading>
      <div className="talk-list" tabIndex={0} aria-label="Education and certifications, scrollable">
        {certifications.map((cert) => (
          <div key={cert.name} className="talk">
            <time>{cert.year}</time>
            <div>
              <a href={cert.file} target="_blank" rel="noopener noreferrer">{cert.name}</a>
              <span>{cert.issuer} · certificate of completion</span>
            </div>
          </div>
        ))}
        {education.map((item) => (
          <div key={item.degree} className="talk">
            <time>{item.period}</time>
            <div>
              {item.degree}
              <span>{item.school}{item.award && ` · ${item.award}`}</span>
            </div>
          </div>
        ))}
        {extracurricular.map((item) => (
          <div key={item} className="talk">
            <time>activity</time>
            <div>{item}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
