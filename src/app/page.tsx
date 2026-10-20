import type { ContentRepository, NavLink } from "@/types";
import { StaticContentRepository } from "@/services/StaticContentRepository";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Section from "@/components/Section";
import CardGrid from "@/components/CardGrid";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

const NAV: NavLink[] = [
  { id: "home", label: "Home" }, { id: "about", label: "About" }, { id: "experience", label: "Experience" }, { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" }, { id: "process", label: "Process" }, { id: "education", label: "Education" }, { id: "contact", label: "Contact" },
];

export default function Page() {
  const repo: ContentRepository = new StaticContentRepository(); // depend on the interface
  const profile = repo.getProfile();
  return (
    <>
      <Navbar name={profile.name} links={NAV} />
      <main>
        <Hero profile={profile} stats={repo.getStats()} />
        <About profile={profile} />
        <Experience items={repo.getExperience()} />
        <Projects projects={repo.getProjects()} />
        <Skills groups={repo.getSkills()} />
        <Section id="process" eyebrow="Method" title="Work Process" alt><CardGrid items={repo.getProcess()} numbered /></Section>
        <Education items={repo.getEducation()} />
        <Contact profile={profile} />
      </main>
      <footer className="footer">© {new Date().getFullYear()} {profile.name}</footer>
    </>
  );
}