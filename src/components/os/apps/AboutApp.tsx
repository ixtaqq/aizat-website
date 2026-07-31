import Image from "next/image";
import { profile, about } from "@/lib/data";

const MARQUEE_TAGS = ["Next.js", "React", "TypeScript", "UI/UX", "Django", "Chess", "Market research", "Clean code"];

export function AboutApp() {
  return (
    <>
      <div className="pad about">
        <div className="about-top">
          <figure className="avatar reveal" style={{ ["--d" as string]: "0s" }}>
            <Image src={profile.photo} alt={`Portrait of ${profile.name}`} width={150} height={150} />
            <span className="stamp">
              SHIPPING
              <br />
              SINCE &apos;22
            </span>
          </figure>
          <div className="about-id reveal" style={{ ["--d" as string]: ".08s" }}>
            <h2 className="name">{profile.name}</h2>
            <p className="role">{profile.role}</p>
            <p className="bio">{about.paragraphs[0]}</p>
            <ul className="facts">
              <li>
                <span>📍 Based in</span>
                <b>{profile.location}</b>
              </li>
              <li>
                <span>🧪 Experience</span>
                <b>2+ years</b>
              </li>
              <li>
                <span>🎓 Degree</span>
                <b>BSc Software Eng.</b>
              </li>
              <li>
                <span>📈 Also into</span>
                <b>Financial markets &amp; investing</b>
              </li>
            </ul>
          </div>
        </div>
        <h3 className="sec reveal" style={{ ["--d" as string]: ".16s" }}>
          {"// currently"}
        </h3>
        <p className="now reveal" style={{ ["--d" as string]: ".2s" }}>
          {about.paragraphs[1]}
        </p>
      </div>
      <div className="marquee">
        <div className="track">
          {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((tag, i) => (
            <span key={i}>{tag}</span>
          ))}
        </div>
      </div>
    </>
  );
}
