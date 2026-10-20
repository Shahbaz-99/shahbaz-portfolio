import type { Education as Edu } from "@/types";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Education({ items }: { items: Edu[] }) {
  return (
    <Section id="education" eyebrow="Learning" title="Education">
      {items.map((e) => (
        <Reveal key={e.institute}>
          <div className="card wide"><h3>{e.institute}</h3><p>{e.degree}</p><p className="muted">{e.period} · {e.grade}</p></div>
        </Reveal>
      ))}
    </Section>
  );
}
