import { education, extracurricular } from "@/lib/data";

export function EducationApp() {
  return (
    <div className="pad">
      {education.map((e, i) => (
        <div className="edu-entry reveal" style={{ ["--d" as string]: `${i * 0.08}s` }} key={e.degree}>
          <h3>{e.degree}</h3>
          <p className="loc">
            {e.school} · {e.period}
          </p>
          {e.award && <span className="edu-award">🏆 {e.award}</span>}
        </div>
      ))}
      <h3 className="sec">{"// extracurricular"}</h3>
      <ul className="extralist">
        {extracurricular.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}
