import type { Profile } from "@/types";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Contact({ profile }: { profile: Profile }) {
  return (
    <Section id="contact" eyebrow="Contact" title="Let's work together">
      <Reveal>
        <div className="card wide center">
          <p>I am open to internships and entry-level backend roles.</p>
          <div className="btns">
            <a className="btn" href={`mailto:${profile.email}`}>Email Me</a>
            <a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="btn ghost" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
