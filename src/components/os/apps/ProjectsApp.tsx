import Image from "next/image";
import { projects } from "@/lib/data";

export function ProjectsApp() {
  return (
    <div className="pad projgrid">
      {projects.map((p, i) => (
        <article className={`pcard${i === 0 ? " big" : ""} reveal`} style={{ ["--d" as string]: `${i * 0.08}s` }} key={p.title}>
          <div className="pmedia">
            {p.preview ? (
              <Image
                src={p.preview}
                alt={`${p.title} preview`}
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "grid",
                  placeItems: "center",
                  color: "#556",
                  fontFamily: "var(--fm)",
                  fontSize: 12,
                }}
              >
                no preview
              </div>
            )}
            <span className="pyear">{p.year}</span>
          </div>
          <div className="pinfo">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="ptags">
              {p.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            {(p.url || p.github) && (
              <div className="plinks">
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    ↗ live demo
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer">
                    ⌥ source
                  </a>
                )}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
