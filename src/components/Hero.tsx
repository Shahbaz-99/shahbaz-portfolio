import type { Profile, Stat } from "@/types";
import Image from "next/image";
import Reveal from "./Reveal";

export default function Hero({ profile, stats }: { profile: Profile; stats: Stat[] }) {
  const initials = profile.name.split(" ").map((w) => w[0]).join("");
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <Reveal>
          <p className="eyebrow">{profile.role}</p>
          <h1>Hello, I&apos;m <span className="accent">{profile.name}</span></h1>
          <p className="lead">{profile.tagline}</p>
          <div className="btns">
            <a className="btn" href="#contact">Say Hello!</a>
            <a className="btn ghost" href={profile.resumeUrl} download>Download CV</a>
          </div>
          <div className="stats">{stats.map((s) => <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}</div>
        </Reveal>
        <Reveal delay={150}>
          <div className="photo">{profile.photoUrl ? <Image src={profile.photoUrl} alt={profile.name} fill sizes="(max-width: 768px) 100vw, 50vw" /> : <span>{initials}</span>}</div>
        </Reveal>
      </div>
    </section>
  );
}
