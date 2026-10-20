import type { SkillGroup } from "@/types";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <Section id="skills" eyebrow="Toolbox" title="Technical Skills">
      <div className="grid">
        {groups.map((g, i) => (
          <Reveal key={g.group} delay={i * 100}>
            <div className="card"><h3>{g.group}</h3><div className="tags">{g.items.map((s) => <span key={s}>{s}</span>)}</div></div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
