import type { Experience as Exp } from "@/types";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Experience({ items }: { items: Exp[] }) {
  return (
    <Section id="experience" eyebrow="Career" title="Experience">
      {items.map((e) => (
        <Reveal key={e.role + e.company}>
          <div className="card wide">
            <h3>{e.role}</h3>
            <p className="muted">{e.company}, {e.location} · {e.period}</p>
            <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </Reveal>
      ))}
    </Section>
  );
}
