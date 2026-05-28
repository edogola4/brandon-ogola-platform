export type SkillGroup = {
  category: string
  items: string[]
}

export const SKILLS: SkillGroup[] = [
  { category: 'Languages', items: ['C#', 'TypeScript', 'JavaScript (ES6+)', 'Python', 'SQL', 'C'] },
  {
    category: 'Backend',
    items: [
      'ASP.NET Core (.NET 10+)',
      'Node.js',
      'Fastify',
      'Express.js',
      'Flask',
      'Entity Framework Core',
      'Prisma ORM',
      'RESTful APIs',
      'SignalR',
    ],
  },
  {
    category: 'Frontend',
    items: [
      'Next.js 14 (App Router)',
      'React.js',
      'Angular',
      'Blazor (Server & WebAssembly)',
      'Tailwind CSS',
      'Zustand',
      'Redux Toolkit',
      'Framer Motion',
      'HTML5',
      'CSS3',
    ],
  },
  { category: 'Databases', items: ['PostgreSQL (pgvector)', 'SQL Server', 'MySQL', 'MongoDB', 'Redis'] },
  {
    category: 'Cloud & DevOps',
    items: [
      'Azure (App Services, SQL Database, Redis Cache, Service Bus, Key Vault)',
      'AWS',
      'Railway',
      'Vercel',
      'Docker',
      'Kubernetes',
      'Terraform',
      'GitHub Actions',
      'Azure DevOps',
      'CI/CD Pipelines',
    ],
  },
  {
    category: 'AI & Integrations',
    items: [
      'Anthropic Claude API',
      'OpenAI Embeddings',
      'Semantic Search (pgvector)',
      'M-Pesa Daraja API',
      'Pesapal',
      'Shopify API',
      'WhatsApp Business API',
      "Africa's Talking SMS",
      'SendGrid',
      'Turborepo',
    ],
  },
  { category: 'Testing & Quality', items: ['TDD', 'xUnit', 'Jest', 'pytest', 'SonarQube', 'Unit & Integration Testing'] },
  {
    category: 'Practices',
    items: ['Clean Architecture', 'SOLID', 'Microservices', 'CQRS', 'Dependency Injection', 'JWT Authentication', 'Agile/Scrum', 'Peer Code Review', 'Technical Documentation'],
  },
]

export type ExperienceEntry = {
  title: string
  company: string
  location: string
  period: string
  achievements: string[]
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    title: 'Software Engineer',
    company: 'Cognativ Technology Limited',
    location: 'Nairobi, Kenya',
    period: 'November 2025 — January 2026',
    achievements: [
      'Designed and shipped RESTful APIs for the SmartSaaS™ enterprise cloud platform using ASP.NET Core and C#, serving clients across multiple industries',
      'Cut API response times by 35% by restructuring SQL Server queries, adding targeted indexes, and implementing Entity Framework Core migrations',
      'Built real-time frontend components in Blazor Server with SignalR-powered live data synchronisation, reducing client-reported latency complaints to near zero',
      'Drove test coverage to 80% via xUnit unit and integration tests; contributed to CI/CD pipeline setup and participated in architectural design reviews',
    ],
  },
  {
    title: 'Freelance Full-Stack Developer',
    company: 'Self-Employed',
    location: 'Remote',
    period: 'May 2025 — October 2025',
    achievements: [
      'Architected SmartSchedule Healthcare — an AI-powered SaaS platform on .NET 10+ and Azure using microservices, CQRS/Event Sourcing, and Terraform Infrastructure as Code',
      'Delivered a Blazor CRUD application with SignalR real-time notifications and 85% unit test coverage, following clean layered architecture throughout',
      'Contributed to open source projects on GitHub, shipping pull requests that improved code quality across distributed developer communities',
    ],
  },
  {
    title: 'Operations Intern',
    company: 'Alliance Bioversity International and CIAT',
    location: 'Nairobi, Kenya',
    period: 'November 2024 — April 2025',
    achievements: [
      'Built Python/Flask RESTful APIs that automated data workflows, cutting operational processing time by 20%',
      'Designed and deployed internal web applications used by a cross-functional team of 12, eliminating 40% of recurring manual tasks through process automation',
      'Integrated PostgreSQL with Python services, writing optimised queries and data validation pipelines to ensure accuracy across all operational reports',
      "Authored API specifications and system architecture diagrams that became the team's primary technical reference, reducing onboarding time for new staff",
    ],
  },
  {
    title: 'Freelance Full-Stack Developer',
    company: 'Self-Employed',
    location: 'Remote',
    period: 'October 2023 — October 2024',
    achievements: [
      'Built a mobile-first e-commerce platform (Riggs London Kenya) as a solo monorepo using Next.js 14, Fastify, PostgreSQL with pgvector, and Redis, integrated with M-Pesa STK Push and Pesapal for payments and an Anthropic Claude chatbot for AI-powered purchase guidance',
      "Implemented semantic product search using OpenAI text-embedding-3-small and pgvector, and delivered real-time order notifications via WhatsApp Business API, Africa's Talking, and SendGrid syncing Shopify as the inventory source of truth",
      'Built a real-time collaborative coding platform using TypeScript, Node.js, Socket.io, and Redis with WebSocket-powered multi-user synchronisation',
      'Deployed all projects on AWS/Railway/Vercel with GitHub Actions CI/CD pipelines for automated testing and zero-downtime releases',
    ],
  },
  {
    title: 'Software Developer Intern',
    company: 'REAL BIZ Digital',
    location: 'Nairobi, Kenya',
    period: 'June 2023 — September 2023',
    achievements: [
      'Delivered responsive web applications in React.js, TypeScript, and Node.js across 3 client projects, lifting user engagement by 25% through UX improvements and new feature development',
      'Designed Express.js REST APIs that reduced data processing time by 30% through backend optimisation and efficient query design',
      'Built reusable React component library with Redux Toolkit state management, adopted across all active client projects',
      'Achieved 75% test coverage with Jest unit and integration tests across all 3 projects, establishing a testing baseline for the team',
    ],
  },
]

export type EducationEntry = {
  degree: string
  institution: string
  location: string
  period: string
  detail: string
}

export const EDUCATION: EducationEntry[] = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of Nairobi',
    location: 'Nairobi, Kenya',
    period: '2021 — 2025',
    detail: 'Relevant coursework: Data Structures & Algorithms, Database Management Systems, Software Engineering, Operating Systems, Computer Networks & Security, Distributed Systems',
  },
  {
    degree: 'ALX Software Engineering Program',
    institution: 'ALX Africa',
    location: 'Remote',
    period: '2023 — 2024',
    detail: 'Intensive programme covering CS fundamentals, low-level programming in C, system design, and software architecture. Built 15+ projects spanning RESTful APIs, full-stack applications, and system utilities.',
  },
  {
    degree: 'Software Development Bootcamp',
    institution: 'Moringa School',
    location: 'Nairobi, Kenya',
    period: 'June 2022 — December 2022',
    detail: '24-week full-stack programme covering JavaScript, TypeScript, React, Node.js, Python, and database management. Delivered 8+ production-ready applications using agile methodologies, TDD, and pair programming.',
  },
]

export type Project = {
  name: string
  /** Array of individual technology names — rendered as separate Tag components */
  stack: string[]
  period: string
  /** Specific repo URL, or empty string if no public repo exists yet */
  url: string
  highlights: string[]
}

export const PROJECTS: Project[] = [
  {
    name: 'SmartSchedule Healthcare',
    stack: ['.NET 10', 'C#', 'ASP.NET Core', 'Blazor WebAssembly', 'Azure', 'Terraform'],
    period: 'MVP Q2 2026',
    url: 'https://github.com/edogola4/smartschedule-healthcare',
    highlights: [
      'Enterprise appointment scheduling SaaS targeting 40% no-show reduction and 50% administrative efficiency gains',
      'Cloud-native microservices architecture with CQRS/Event Sourcing on Azure',
    ],
  },
  {
    name: 'Riggs London Kenya',
    stack: ['Next.js 14', 'Fastify', 'PostgreSQL', 'pgvector', 'Redis', 'Prisma', 'Turborepo'],
    period: 'In Progress',
    url: '',
    highlights: [
      'Mobile-first e-commerce platform with M-Pesa STK Push, Pesapal, AI Scent Advisor (Claude 3.5 Haiku), and semantic search via pgvector',
      'Deployed on Railway + Vercel at ~$108/month',
    ],
  },
  {
    name: 'Microservices Platform with Full CI/CD',
    stack: ['Docker', 'Kubernetes', 'GitHub Actions', 'AWS'],
    period: '',
    url: '',
    highlights: [
      'Containerised microservices on AWS orchestrated with Kubernetes',
      'GitHub Actions CI/CD with multi-stage testing and zero-downtime rolling deployments',
    ],
  },
  {
    name: 'AI-Powered Customer Support Chatbot',
    stack: ['Python', 'TensorFlow', 'NLP', 'REST APIs'],
    period: '',
    url: '',
    highlights: [
      '95% intent recognition accuracy using NLP and TensorFlow',
      'Reduced customer support response time by 40% through automated query handling',
    ],
  },
]

export const CERTIFICATIONS: string[] = [
  'ALX Software Engineering Program — Full-stack development, algorithms, system design (2023–2024)',
  'Moringa School Software Development Bootcamp — Full-stack development (2022)',
]

export const PROFESSIONAL_SUMMARY =
  'Software Engineer with 2+ years of hands-on experience delivering full-stack applications across fintech, healthcare, and SaaS domains. Proven ability to ship production-grade systems end-to-end — from RESTful API design and database optimisation to cloud deployment and CI/CD automation. Built and integrated real-world payment systems (M-Pesa, Pesapal), AI-powered features (Anthropic Claude, OpenAI embeddings), and scalable infrastructure on Azure and AWS.'

// UI labels
export const PAGE_TITLE = 'Resume'
export const HEADING_SUMMARY = 'Summary'
export const HEADING_TECHNICAL = 'Technical skills'
export const HEADING_EXPERIENCE = 'Experience'
export const HEADING_EDUCATION = 'Education'
export const HEADING_PROJECTS = 'Projects'
export const HEADING_CERTIFICATIONS = 'Certifications'
