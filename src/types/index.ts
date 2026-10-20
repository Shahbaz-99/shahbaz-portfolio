export interface Profile { name: string; role: string; tagline: string; about: string[]; location: string; email: string; github: string; linkedin: string; resumeUrl: string; photoUrl?: string }
export interface Stat { value: string; label: string }
export interface ProcessStep { title: string; description: string }
export interface Project { title: string; description: string; stack: string[]; link?: string }
export interface Experience { role: string; company: string; location: string; period: string; points: string[] }
export interface Education { institute: string; degree: string; period: string; grade: string }
export interface SkillGroup { group: string; items: string[] }
export interface NavLink { id: string; label: string }

/** Contract the UI depends on (Dependency Inversion). Swap the source without touching components. */
export interface ContentRepository {
  getProfile(): Profile;
  getStats(): Stat[];
  getProcess(): ProcessStep[];
  getProjects(): Project[];
  getExperience(): Experience[];
  getEducation(): Education[];
  getSkills(): SkillGroup[];
}