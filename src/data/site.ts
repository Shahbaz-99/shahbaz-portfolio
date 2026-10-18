// Single source of truth. Edit here; every page reads from this file.
export const site = {
  name: 'Shahbaz Ali',
  role: 'Backend Developer Intern',
  headline: 'Software Developer Intern @ Ethical Intelligence | API Development, Docker, AI Enthusiast',
  description:
    'Computer Science Engineering student with hands-on experience in Python, Django, and Django REST Framework. Skilled in developing REST APIs, working with databases, and deploying applications using Docker.',
  location: 'Bhopal, India',
  city: 'Bhopal',
  timezone: 'Asia/Kolkata',
  tzLabel: 'IST',
  photo: '/me.jpg', // put a square image in /public; empty shows initials
  initials: 'SA',
  email: 'sahbaj.swn@gmail.com',
  github: 'https://github.com/Shahbaz-99',
  githubUser: 'Shahbaz-99',
  linkedin: 'https://www.linkedin.com/in/shahbaz-ali-tech/',
  resumeUrl: '', // e.g. '/resume.pdf' after adding the file to /public
  openTo: 'internships and full-time backend roles',
};

export type Project = {
  slug: string;
  title: string;
  tagline?: string;
  year?: string;
  summary: string;
  stack: string[];
  repo?: string;
  demo?: string;
  problem?: string;
  roles?: string[];
  highlights?: { title: string; text: string }[];
  flow?: { title: string; text: string }[];
  decisions?: string[];
};

export const projects: Project[] = [
  {
    slug: 'incident-management',
    title: 'Incident Management System',
    year: '2025',
    repo: 'https://github.com/Shahbaz-99/IMS-Incident-Management-System-',
    summary: 'Designed and developed a backend system for reporting, tracking, and resolving incidents across organizational roles.',
    stack: ['Python', 'Django', 'Django REST Framework', 'JWT', 'SQLite'],
    problem:
      'Designed and developed a backend system for reporting, tracking, and resolving incidents across organizational roles. Implemented JWT-based authentication and role-based authorization to ensure secure access control for Admins, POCs, and Employees. Built APIs for incident creation, assignment, status updates, and resolution workflows. Focused on designing a maintainable API structure and enforcing permissions at the application level to support different user responsibilities.',
    roles: ['Admin', 'POC', 'Employee'],
    highlights: [
      { title: 'JWT Authentication', text: 'JWT-based authentication for secure access.' },
      { title: 'Role-Based Access Control (RBAC)', text: 'Role-based authorization for Admins, POCs, and Employees.' },
      { title: 'Incident Lifecycle Management', text: 'APIs for incident creation, assignment, status updates, and resolution workflows.' },
      { title: 'RESTful API Design', text: 'A maintainable API structure.' },
      { title: 'Secure Authorization Flow', text: 'Permissions enforced at the application level to support different user responsibilities.' },
    ],
    flow: [
      { title: 'Create', text: 'An incident is reported.' },
      { title: 'Assign', text: 'It is assigned to the right person.' },
      { title: 'Update', text: 'Status is updated as work progresses.' },
      { title: 'Resolve', text: 'The incident is resolved.' },
    ],
    decisions: [
      'JWT-based authentication for secure access to the APIs.',
      'Role-based authorization enforced at the application level for Admins, POCs, and Employees.',
      'A maintainable API structure organized around the incident workflow.',
    ],
  },
  {
    slug: 'menumint',
    title: 'MenuMint QR Code Generator',
    year: '2025',
    repo: 'https://github.com/Shahbaz-99/MenuMint-QR-Code-Generator',
    tagline: 'Download crisp, print-ready QR codes \u2014 perfect for standees, table cards, and menus.',
    summary: 'Built a web application that generates downloadable QR codes linked to restaurant menu URLs.',
    stack: ['Python', 'Django', 'QRCode Library'],
    problem:
      'Built a web application that generates downloadable QR codes linked to restaurant menu URLs. Designed the backend logic for QR generation and data handling while keeping the workflow simple and efficient. The application enables restaurants to create QR codes that can be printed and used for contactless menu access.',
    highlights: [
      { title: 'QR Code Generation', text: 'Generates QR codes linked to restaurant menu URLs.' },
      { title: 'URL Validation', text: 'Validates the menu URL before a code is generated.' },
      { title: 'Downloadable QR Images', text: 'Print-ready images for standees, table cards, and menus.' },
      { title: 'Lightweight Application Design', text: 'Backend logic for QR generation and data handling, kept simple and efficient.' },
    ],
    flow: [
      { title: 'Enter URL', text: 'Paste the restaurant menu link.' },
      { title: 'Validate', text: 'The URL is checked.' },
      { title: 'Generate', text: 'The backend creates the QR code.' },
      { title: 'Download', text: 'Save the image and print it.' },
    ],
    decisions: [
      'Keep the workflow simple and efficient.',
      'Handle QR generation and data handling in the backend.',
      'Enable restaurants to print the code for contactless menu access.',
    ],
  },
  {
    slug: 'employee-management',
    title: 'Employee Management System',
    year: '2025',
    repo: 'https://github.com/Shahbaz-99/Employee-Management-System',
    summary: 'Developed CLI and web-based employee management applications with complete CRUD operations and MySQL integration.',
    stack: ['Python', 'Django', 'MySQL', 'DRF'],
    problem:
      'Developed CLI and web-based employee management applications with complete CRUD operations and MySQL integration.',
    highlights: [
      { title: 'Complete CRUD Operations', text: 'Create, view, update, and delete employee records.' },
      { title: 'CLI and Web-Based Applications', text: 'The same idea built as a command-line app and as a web app.' },
      { title: 'MySQL Integration', text: 'Records stored in a MySQL database.' },
    ],
  },
];

export const experience = [
  {
    slug: 'backend-intern',
    org: 'Ethical Intelligence',
    url: 'https://www.ethicalint.com/',
    mono: 'EI',
    role: 'Backend Developer Intern',
    type: 'Internship',
    when: 'Aug 2025 - Present',
    place: 'Bhopal, India (on-site)',
    summary: 'Contributing to backend development and API implementation using Python, Django, and Django REST Framework.',
    overview:
      'During my internship at Ethical Intelligence, I worked on backend development using Python, Django, and Django REST Framework. I developed and maintained REST APIs, designed database models, and optimized application performance. I also containerized applications using Docker, deployed them on Linux-based VPS servers, and used Git and GitHub for version control. Additionally, I gained exposure to CI/CD workflows and Kubernetes fundamentals while working in a collaborative development environment.',
    points: [
      'Worked on backend development using Python, Django, and Django REST Framework.',
      'Developed and maintained REST APIs.',
      'Implemented authentication and authorization mechanisms.',
      'Designed database models and optimized application performance.',
      'Containerized applications using Docker and deployed them on Linux-based VPS servers.',
      'Used Git and GitHub for version control.',
      'Gained exposure to CI/CD workflows and Kubernetes fundamentals while working in a collaborative development environment.',
    ],
    skills: ['Python', 'Django', 'Django REST Framework', 'Docker', 'Git', 'Postman'],
  },
  {
    slug: 'software-trainee',
    org: 'Ethical Intelligence',
    url: 'https://www.ethicalint.com/',
    mono: 'EI',
    role: 'Software Development Trainee',
    type: 'Part-time',
    when: 'Jan 2025 - Jun 2025',
    place: 'Bhopal, India (on-site)',
    summary:
      'Completed a six-month Software Development Training Program focused on backend development fundamentals and practical project implementation.',
    points: [
      'Completed a six-month Software Development Training Program.',
      'Focused on backend development fundamentals and practical project implementation.',
    ],
    skills: ['Python', 'Django', 'Django REST Framework', 'MySQL'],
  },
];

export const education = [
  {
    name: "All Saints' College of Technology",
    mono: 'AS',
    degree: 'Bachelor of Technology, Computer Science Engineering',
    when: '2023 - 2027',
    text: 'RGPV University, Bhopal. Expected to graduate in June 2027. Dedicated to mastering backend development, database management, and system design concepts, while actively enhancing knowledge of data structures, algorithms, operating systems, and computer networks to build scalable, real-world applications.',
  },
];

export type Research = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  kind: string;
  org: string;
  url: string;
  repo?: string;
  tags: string[];
  stats: { value: string; label: string }[];
  toneError: { a: number; b: number };
  buckets: { label: string; n: number; tone: 'good' | 'neutral' | 'bad' }[];
  formula: string;
  sections: { id?: string; title: string; paras?: string[]; items?: { term: string; text: string }[] }[];
  refs: { cite: string; title: string }[];
};

export const research: Research[] = [
  {
    slug: 'model-drift-supcon',
    title: 'One input, two models: seeing drift live',
    tagline: 'A controlled comparison of a baseline and a lifecycle-tuned model, made visible in embedding space.',
    summary:
      'A model-comparison environment that places a baseline and a lifecycle-tuned model side by side, making systematic drift and its contrastive correction visible.',
    kind: 'Internal demo',
    org: 'Ethical Intelligence',
    url: 'https://www.ethicalint.com/',
    repo: 'https://github.com/Shahbaz-99/contrastive-lifecycle-tuning',
    tags: ['Side-by-side comparison', 'Contrastive loss', 'Lifecycle fine-tuning'],
    stats: [
      { value: '51% to 41%', label: 'Tone error on the full pool of novel candidates, baseline versus tuned model' },
      { value: '880', label: 'Novel candidates screened, from which 20 queries were curated' },
      { value: '\u03bb 0.3, \u03c4 0.1', label: 'Weight of the contrastive term and softmax temperature' },
    ],
    toneError: { a: 51, b: 41 },
    buckets: [
      { label: 'Baseline wrong, tuned right', n: 15, tone: 'good' },
      { label: 'Both right', n: 3, tone: 'neutral' },
      { label: 'Both wrong', n: 2, tone: 'bad' },
    ],
    formula: 'L_i = -1/|P(i)| \u00b7 \u03a3_{p \u2208 P(i)} log [ exp(z_i \u00b7 z_p / \u03c4) / \u03a3_{a \u2260 i} exp(z_i \u00b7 z_a / \u03c4) ]',
    sections: [
      {
        title: 'How systematic drift appears',
        paras: [
          'The baseline, Model A, is trained on standard phrasing only. Drift text, meaning slang, emoji and sarcasm that carry the same sentiment, lands away from its standard counterpart in embedding space, and tone accuracy drops.',
        ],
      },
      {
        id: 'compare',
        title: 'Same input, two models',
        paras: [
          'Twenty queries were curated from 880 novel candidates: new subjects and templates, deduplicated against the training data, including held-out sarcasm structures. Every query is answered by both models side by side.',
          'Example: for "the yoga class is straight cringe", the standard-only model replied with cheerful praise, which is the wrong tone. The drift-aware model (drift plus supervised contrastive learning) responded with sympathy, which is the right tone.',
        ],
      },
      {
        title: 'Contrastive lifecycle: anchor, positives, negatives',
        paras: [
          'Each text acts as an anchor. Texts with the same sentiment label are its positives, whether standard or drift phrasing. Texts with the opposite label are its negatives.',
          'Across epochs, with epoch 0 being the baseline, positives are pulled together and negatives pushed apart, so slang and emoji end up next to the standard phrasing of the same sentiment.',
        ],
      },
      {
        id: 'math',
        title: 'The math: how SupCon pulls and pushes',
        paras: [
          'Encoder output is mean-pooled and L2-normalized, so every text becomes a point on a unit hypersphere. The total loss is L = L_gen + \u03bb \u00b7 L_SupCon, with \u03bb = 0.3 and temperature \u03c4 = 0.1. For each anchor i, the supervised contrastive loss is:',
        ],
        items: [
          { term: 'Pull', text: 'The numerator holds the positives, so the loss drops as the anchor gets closer to them.' },
          { term: 'Push', text: 'The denominator also holds the negatives, so the loss drops as their similarity shrinks.' },
          { term: 'Temperature', text: 'A small \u03c4 sharpens the softmax, so the hardest, closest negatives get the biggest push.' },
        ],
      },
      {
        title: 'How it is measured',
        paras: [
          'All plots share one 2-D frame: the sentiment axis (the difference between class centroids) and the top principal component orthogonal to it, fit once on Model A using standard reference points only.',
        ],
        items: [
          { term: 'Cluster quality', text: 'Silhouette score and intra-class versus inter-class cosine.' },
          { term: 'Cross-style alignment', text: 'Cosine between the standard and drift centroids of the same class.' },
          { term: 'Alignment and uniformity', text: 'Geometry of the embedding space, following Wang and Isola (2020).' },
          { term: 'kNN standard to drift', text: 'Whether the standard-style geometry can classify drift points.' },
        ],
      },
    ],
    refs: [
      { cite: 'Khosla et al., 2020', title: 'Supervised Contrastive Learning' },
      { cite: 'Wang and Isola, 2020', title: 'Understanding Contrastive Representation Learning through Alignment and Uniformity on the Hypersphere' },
      { cite: 'Gao et al., 2021', title: 'SimCSE: Simple Contrastive Learning of Sentence Embeddings' },
      { cite: 'Cha et al., 2021', title: 'Co2L: Contrastive Continual Learning' },
    ],
  },
];

export const skills = [
  { group: 'Backend', items: ['Python', 'Django', 'Django REST Framework', 'REST APIs', 'OOP'] },
  { group: 'Data', items: ['MySQL'] },
  { group: 'Delivery', items: ['Docker', 'Linux', 'Git & GitHub', 'Kubernetes (Basics)', 'Prometheus'] },
  { group: 'Testing', items: ['Postman'] },
];

// Extra AI projects (optional); shown under Research when present.
export const aiWork: { title: string; summary: string; href?: string }[] = [];
