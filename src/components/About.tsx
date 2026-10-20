import type { Profile } from "@/types";
import Section from "./Section";
import Reveal from "./Reveal";

export default function About({ profile }: { profile: Profile }) {
  return (
    <Section id="about" eyebrow="About" title="Software developer who loves clean, maintainable code">
      <Reveal><div className="card wide">{profile.about.map((p) => <p key={p}>{p}</p>)}<p className="muted">{profile.location}</p></div></Reveal>
    </Section>
  );
}