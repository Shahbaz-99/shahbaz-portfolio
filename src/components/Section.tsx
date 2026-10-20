import type { ReactNode } from "react";
import Reveal from "./Reveal";

/** Shared layout for every section: id (for nav), eyebrow, title, content. */
export default function Section({ id, eyebrow, title, alt = false, children }: { id: string; eyebrow: string; title: string; alt?: boolean; children: ReactNode }) {
  return (
    <section id={id} className={`section${alt ? " alt" : ""}`}>
      <div className="container">
        <Reveal><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></Reveal>
        {children}
      </div>
    </section>
  );
}
