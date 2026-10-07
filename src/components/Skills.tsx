import { skills } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading title="Skills" />
      <dl>
        {skills.map((group) => (
          <div key={group.label} className="skill-row">
            <dt>{group.label}</dt>
            <dd>{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
