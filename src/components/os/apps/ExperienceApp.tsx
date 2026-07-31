import { experience } from "@/lib/data";

export function ExperienceApp() {
  return (
    <div className="pad">
      {experience.map((e, i) => (
        <div className="entry reveal" style={{ ["--d" as string]: `${i * 0.08}s` }} key={e.company + e.role}>
          <span className="ver">[{e.period}]</span>
          <h3>
            {e.role} · {e.company}
          </h3>
          <p className="loc">
            {e.location} · {e.duration} · {e.badge}
          </p>
          <ul>
            {e.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
