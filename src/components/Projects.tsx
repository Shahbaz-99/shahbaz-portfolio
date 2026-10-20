import type { Project } from "@/types";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <Section id="projects" eyebrow="Portfolio" title="Projects">
      <div className="grid">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 100}>
            <div className="card">
              <h3>{p.title}</h3><p>{p.description}</p>
              <div className="tags">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
              {p.link && <a className="link" href={p.link} target="_blank" rel="noreferrer">View on GitHub →</a>}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
