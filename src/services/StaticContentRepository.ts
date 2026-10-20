import type { ContentRepository } from "@/types";
import * as data from "@/content/data";

/** Reads content from src/content/data.ts. Replace with a CMS/API class later if needed. */
export class StaticContentRepository implements ContentRepository {
  getProfile() { return data.profile; }
  getStats() { return data.stats; }
  getProcess() { return data.process; }
  getProjects() { return data.projects; }
  getExperience() { return data.experience; }
  getEducation() { return data.education; }
  getSkills() { return data.skills; }
}