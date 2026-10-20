// EDIT HERE: all portfolio text lives in this file. No component changes needed.
import type { Profile, Stat, ProcessStep, Project, Experience, Education, SkillGroup } from "@/types";

export const profile: Profile = {
  name: "Shahbaz Ali",
  role: "Software Developer (SDE)",
  tagline: "Software developer building reliable REST APIs with Python and Django, and exploring AI systems like RAG, embeddings and NLP.",
  about: [
    "I'm a Computer Science Engineering student and SDE at Ethical Intelligence, working with Python, Django, Django REST Framework and MySQL to build and maintain reliable software systems.",
    "Alongside software engineering, I'm exploring AI systems like RAG, embeddings and NLP. I write clean, maintainable code using OOP and SOLID principles, and I follow Specification Driven Development, where clear requirements guide the implementation.",
  ],
  location: "Bhopal, Madhya Pradesh, India",
  email: "sahbaj.swn@gmail.com",
  github: "https://github.com/Shahbaz-99",
  linkedin: "https://www.linkedin.com/in/shahbaz-ali-tech/",
  resumeUrl: "/resume.pdf", // put your PDF at public/resume.pdf
  photoUrl: "/photo.jpg",
};

export const stats: Stat[] = [
  { value: "2027", label: "B.Tech Graduation" },
  { value: "1+ Yr", label: "At Ethical Intelligence" },
  { value: "3", label: "Projects Built" },
  { value: "RAG · NLP", label: "Exploring" },
];

export const process: ProcessStep[] = [
  { title: "Understand", description: "Clarify requirements and edge cases before writing code." },
  { title: "Design", description: "Plan models, endpoints and architecture." },
  { title: "Build", description: "Write tested, readable code following SOLID principles." },
  { title: "Ship", description: "Containerize with Docker and deploy." },
];

export const projects: Project[] = [
  { title: "Incident Management System", description: "Backend system for reporting, tracking and resolving incidents across roles. JWT authentication and role-based access control for Admins, POCs and Employees, with APIs for incident creation, assignment, status updates and resolution.", stack: ["Python", "Django", "DRF", "JWT", "SQLite"], link: "https://github.com/Shahbaz-99" },
  { title: "Game of Thrones NLP (Word2Vec)", description: "Word2Vec model trained on the Game of Thrones books. Preprocesses text, finds similar words and characters, detects odd words, and visualizes word vectors in 3D using PCA.", stack: ["Python", "NLTK", "Gensim", "Scikit-learn", "Plotly", "NumPy", "Pandas"], link: "https://github.com/Shahbaz-99" },
  { title: "Employee Management System", description: "CLI and web-based employee management applications with complete CRUD operations and MySQL integration.", stack: ["Python", "Django", "MySQL"], link: "https://github.com/Shahbaz-99" },
];

export const experience: Experience[] = [
  {
    role: "SDE", company: "Ethical Intelligence", location: "Bhopal", period: "Aug 2025 - Present",
    points: [
      "Developed and maintained REST APIs using Python, Django and Django REST Framework.",
      "Designed database models and optimized application performance.",
      "Containerized applications with Docker and deployed them on Linux-based VPS servers.",
      "Used Git and GitHub for version control; exposure to CI/CD workflows, Kubernetes fundamentals and Prometheus.",
    ],
  },
  {
    role: "SDE Intern", company: "Ethical Intelligence", location: "Bhopal", period: "Aug 2025 - Aug 2026",
    points: [
      "Implemented authentication and authorization mechanisms.",
      "Worked with MySQL databases and API integrations; tested APIs with Postman and Insomnia.",
      "Debugged issues, tested features and contributed to application enhancements.",
    ],
  },
  {
    role: "Software Development Trainee", company: "Ethical Intelligence", location: "Bhopal", period: "Jan 2025 - Jun 2025",
    points: [
      "Completed a six-month training program on backend development fundamentals and practical project implementation.",
      "Worked on Python, Django, DRF, REST API development, database fundamentals and Git & GitHub through training projects.",
    ],
  },
];

export const education: Education[] = [
  { institute: "All Saints College of Technology (RGPV University), Bhopal", degree: "Bachelor of Technology, Computer Science Engineering", period: "2023 - 2027", grade: "CGPA 7.2 / 10" },
];

export const skills: SkillGroup[] = [
  { group: "Languages", items: ["Python", "SQL", "JavaScript"] },
  { group: "Backend & APIs", items: ["Django", "Django REST Framework", "REST APIs", "OOP", "JWT", "Postman", "Insomnia"] },
  { group: "Infrastructure & Tools", items: ["Docker", "Kubernetes (Basics)", "Prometheus", "Linux", "Git", "MySQL"] },
  { group: "AI & Data", items: ["NLP", "Word2Vec (Gensim)", "NLTK", "Scikit-learn", "Plotly", "NumPy", "Pandas", "RAG & Embeddings (exploring)"] },
];