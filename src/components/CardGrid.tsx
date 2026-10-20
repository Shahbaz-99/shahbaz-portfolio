import Reveal from "./Reveal";

export interface CardItem { title: string; description: string }

/** Reusable numbered/plain card grid used by the work process section. */
export default function CardGrid({ items, numbered = false }: { items: CardItem[]; numbered?: boolean }) {
  return (
    <div className="grid">
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 100}>
          <div className="card">
            {numbered && <span className="num">{String(i + 1).padStart(2, "0")}</span>}
            <h3>{it.title}</h3><p>{it.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
