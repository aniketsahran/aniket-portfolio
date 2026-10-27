// Single source of truth for all site content. Sourced from Aniket's résumé.
// No invented facts, metrics, employers, or projects.

export const profile = {
  name: 'Aniket Sahran',
  location: 'Bengaluru, India',
  tagline:
    "I turn hard systems problems into reliable software — and I'll happily learn whatever the next one needs.",
  heroEyebrow: 'ANIKET SAHRAN · BENGALURU',
  heroHeadline: 'I build the infrastructure that AI agents run on.',
  heroSubline:
    'Software Engineer at Cloudera — Kubernetes operators, agent sandboxes, and the plumbing that makes complex systems quietly reliable.',
  email: 'aniketsahran3@gmail.com',
  phone: '+91-8700161082',
  links: {
    linkedin: 'https://www.linkedin.com/in/aniket-sahran-453586201/',
    github: 'https://github.com/aniketsahran',
  },
  resumePath: '/Aniket_Resume.pdf',
}

export const about = {
  paragraphs: [
    "I'm a software engineer at Cloudera, where I spend my days deep in Kubernetes, Go, and the infrastructure that lets AI agents run safely at scale. I like the hard, unglamorous problems — the operators, the upgrade paths, the versioning systems — because getting them right is what makes everything above them feel effortless.",
    "What I care about most, though, is staying curious. I came up through full-stack and cloud work and keep widening the circle: whatever the next problem needs, I'll learn it. I also try to show up as more than an engineer — leading student societies, volunteering, and generally leaving things a little better than I found them.",
  ],
  education: [
    {
      degree: 'B.E. in Computer Science and Business Systems',
      place: 'Thapar Institute of Engineering and Technology, Patiala',
      period: '2020 – 2024',
      detail: 'CGPA 9.39',
    },
    {
      degree: 'Senior Secondary Schooling (XII)',
      place: 'Salwan Public School, Gurugram',
      period: '2020',
      detail: '95.6%',
    },
  ],
}

export const experience = [
  {
    company: 'Cloudera, Inc.',
    role: 'Software Developer - II',
    period: 'July 2024 – Present',
    location: 'Bengaluru',
    bullets: [
      'Integrated kubernetes-sigs/agent-sandbox into Cloudera’s AI agent platform by onboarding 7 container images across 3 registries, authoring 6 Helm templates and 15 RBAC rules, and enabling CRD-driven sandbox isolation for secure agent tool execution.',
      'Built a Kubernetes operator in Go that reconciles 2 custom resource types across 12 reconciliation paths, managing up to 10 K8s resources per workload — with sandbox-aware session lifecycle including automated SandboxClaim cleanup to prevent orphaned warm-pool pods.',
      'Architected and delivered Git-style versioning for Agentic Workflows in Cloudera Agent Studio, introducing branching, workflow persistence patterns, and end-to-end audit logging, enabling reproducible workflow management and full change traceability.',
      'Co-designed backup/restore upgrade infrastructure in Cadence with rollback mechanisms, feature flags, and preflight validations, ensuring 100% zero-regression compatibility across diverse Azure and AWS environments.',
      'Led end-to-end design and onboarding of complex AI Workbench upgrade workflows to Uber Cadence, achieving 100% on-schedule delivery and reducing quarterly customer escalations through robust resource management.',
      'Designed and launched a dedicated Go/JavaScript microservice for User/Team synchronization, successfully reducing user sync escalations from 3 per quarter down to 0.',
      'Built an automated Helm chart generation system using Consul Templates across Commercial and FedRAMP environments, eliminating manual chart edits and reducing human configuration errors to 0.',
      'Automated CML Helm configuration generation and validation via GitHub Actions and Jenkins, implementing schema snapshot management and version increment detection to eliminate manual steps and prevent version tracking errors.',
    ],
  },
  {
    company: 'Cloudera, Inc.',
    role: 'Software Development Intern',
    period: 'January 2024 – June 2024',
    location: 'Bengaluru',
    bullets: [
      'Developed and implemented an idempotent workflow within deployed EKS/AKS clusters to efficiently check access to internet-hosted endpoints, reducing chart installation failures by 60% and providing diagnostic alerts for inaccessible endpoints.',
      'Orchestrated the migration of a micro-service CRUD application to automated Helm chart generation using Consul and Gonsul templates, streamlining deployment across diverse environment configurations for enhanced scalability and deployment efficiency.',
      'Engineered a micro-service to capture user-generated events within the cloud application, enabling team visibility and facilitating application reviews — leveraging gRPC to communicate with a server and storing events in a structured database for detailed analysis.',
    ],
  },
]

export const projects = [
  {
    slug: 'filmpire',
    name: 'Filmpire',
    kind: 'Movie Recommendation System',
    summary:
      'A movie discovery app with personalized recommendations, genre browsing, and fast search — built on a rich movie API.',
    tech: ['JavaScript', 'Node.js', 'React.js', 'Express.js', 'The Movie Database API'],
    highlights: [
      'Built the frontend in React.js for an engaging, user-friendly interface.',
      'Integrated The Movie Database API for a vast catalog with detailed info, ratings, and cast details.',
      'Delivered personalized recommendations with separate genre tabs and efficient movie search.',
    ],
    repoUrl: 'https://github.com/aniketsahran',
    images: ['/assets/projects/filmpire-1.svg', '/assets/projects/filmpire-2.svg'],
  },
  {
    slug: 'student-management-system',
    name: 'Student Management System',
    kind: 'Backend Database Server',
    summary:
      'A backend API server for storing and modifying a student database, containerized for zero downtime and easy deployment.',
    tech: ['Golang', 'Mockgen', 'PostgreSQL', 'Docker', 'Kubernetes', 'Helm'],
    highlights: [
      'Developed a backend API server to store and modify a student database on request.',
      'Used Docker and Kubernetes for zero downtime and a persistent database.',
      'Implemented Helm for easy, repeatable deployment of the application.',
    ],
    repoUrl: '#',
    images: ['/assets/projects/sms-1.svg', '/assets/projects/sms-2.svg'],
  },
  {
    slug: 'noterrrr',
    name: 'Noterrrr',
    kind: 'Note-Making Application',
    summary:
      'An intuitive note-taking web app with secure login, letting users create, organize, and manage notes.',
    tech: ['JavaScript', 'Node.js', 'Express.js', 'React.js', 'MongoDB'],
    highlights: [
      'Created an intuitive web app for creating and managing notes.',
      'Implemented robust login functionality for data security and user privacy.',
      'Organized and stored user notes behind a clean, user-friendly interface.',
    ],
    repoUrl: 'https://github.com/aniketsahran',
    images: ['/assets/projects/noterrrr-1.svg', '/assets/projects/noterrrr-2.svg'],
  },
]

export const skills = [
  { group: 'Languages', items: ['C', 'C++', 'Python', 'Golang', 'JavaScript', 'HTML', 'CSS'] },
  {
    group: 'Frameworks',
    items: ['Node.js', 'Express.js', 'React.js', 'Protobuf', 'Uber Cadence', 'Mockgen'],
  },
  { group: 'Deployment', items: ['Docker', 'Kubernetes', 'Helm'] },
  {
    group: 'Developer Tools',
    items: ['Command Line', 'Git & Version Control', 'Postman', 'VS Code', 'Mongoose', 'Sanity'],
  },
  {
    group: 'Cloud/Databases',
    items: ['AWS Basics', 'Azure Basics', 'MySQL', 'Oracle LiveSQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    group: 'Coursework',
    items: ['Object Oriented Programming', 'Data Structures', 'Operating Systems', 'Computer Networks'],
  },
]

// Tools with brand logos (Simple Icons slugs vendored to /assets/logos/).
// slug: null => render as a text-only chip (no brand icon available).
export const tools = [
  {
    group: 'Languages',
    items: [
      { name: 'C', slug: 'c' },
      { name: 'C++', slug: 'cplusplus' },
      { name: 'Python', slug: 'python' },
      { name: 'Golang', slug: 'go' },
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'HTML', slug: 'html5' },
      { name: 'CSS', slug: 'css' },
    ],
  },
  {
    group: 'Frameworks',
    items: [
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'Express.js', slug: 'express' },
      { name: 'React.js', slug: 'react' },
      { name: 'Protobuf', slug: null },
      { name: 'Uber Cadence', slug: null },
      { name: 'Mockgen', slug: null },
    ],
  },
  {
    group: 'Deployment',
    items: [
      { name: 'Docker', slug: 'docker' },
      { name: 'Kubernetes', slug: 'kubernetes' },
      { name: 'Helm', slug: 'helm' },
    ],
  },
  {
    group: 'Developer Tools',
    items: [
      { name: 'Git', slug: 'git' },
      { name: 'Postman', slug: 'postman' },
      { name: 'Mongoose', slug: 'mongoose' },
      { name: 'Sanity', slug: 'sanity' },
      { name: 'Command Line', slug: null },
      { name: 'VS Code', slug: null },
    ],
  },
  {
    group: 'Cloud / Databases',
    items: [
      { name: 'AWS', slug: 'amazonwebservices' },
      { name: 'Azure', slug: null },
      { name: 'MySQL', slug: 'mysql' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'MongoDB', slug: 'mongodb' },
      { name: 'Oracle LiveSQL', slug: 'oracle' },
    ],
  },
]

export const beyondCode = {
  volunteering: {
    org: 'Cloudera Cares',
    role: 'Volunteer',
    period: '2024 – Present',
    items: [
      'Created braille cards to support visually impaired individuals.',
      'Volunteered in painting a government school to improve the learning environment.',
      'Crafted handmade card wishes for underprivileged children.',
    ],
    images: [
      '/assets/beyond/volunteer-1.svg',
      '/assets/beyond/volunteer-2.svg',
      '/assets/beyond/volunteer-3.svg',
    ],
  },
  leadership: {
    org: 'Indian Society for Technical Education, Thapar Chapter',
    role: 'General Secretary',
    period: 'September 2020 – May 2023',
    items: [
      'Implemented two technical projects with teams of about 30 members each.',
      'Organized three inter-college events — Colloquium, Hackonix, and Quest of the Curious.',
      'Designed graphic posts for social media handles and helped manage two events.',
    ],
  },
}

export const achievements = [
  { title: 'Merit Award for securing the first position in my program', year: '2024' },
  { title: 'Academic Scholarship from college for being in the top 5% of students', year: '2024' },
  { title: 'Kubernetes SIGs contributions to the agent-sandbox project', year: '2026' },
]

const content = { profile, about, experience, projects, skills, tools, beyondCode, achievements }

export default content
