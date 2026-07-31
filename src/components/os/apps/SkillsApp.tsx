import { skills } from "@/lib/data";

const COLORS = ["var(--yellow)", "var(--blue)", "var(--red)", "var(--teal)", "var(--orange)", "var(--green)", "var(--purple)"];

export function SkillsApp() {
  return (
    <div className="pad skills">
      <p className="cfg-note">{"/* grouped by category, updated as I go */"}</p>
      {skills.map((g, i) => (
        <div className="skillgroup" key={g.label}>
          <h3 className="sec" style={{ color: COLORS[i % COLORS.length] }}>
            {`// ${g.label}`}
          </h3>
          <div className="chips">
            {g.items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
