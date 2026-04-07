export const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#tech", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Feedback" },
  { href: "#contact", label: "Contact" },
] as const;

export const hero = {
  title: "FROM DARKNESS TO LAUNCH",
  darknessIcons: ["🐛", "⚡", "❓", "💡", "🌫️"],
  launchIcons: ["💰", "📈", "🚀", "🏆", "✨"],
};

export const about = {
  headline: "ai full-stack mobile engineer",
  /** Words to highlight with stagger blur reveal */
  highlightWords: ["ai", "fullstack", "mobile"],
  intro: `I'm Lucas Daniel, a business-minded AI, Full-Stack, and Mobile Engineer who turns complex challenges and early-stage chaos into successful product launches. I thrive on solving difficult problems and bring a wealth of high-impact experience to deliver scalable, impactful solutions.`,
  resumeUrl: "/resume.pdf",
  /** Filename used when visitors click download */
  resumeDownloadName: "Lucas-Daniel-Resume.pdf",
};

export const journey = [
  { year: "1994", title: "Born", description: "I was born — the journey begins." },
  {
    year: "2014",
    title: "University",
    description: "Started university at George Mason University.",
  },
  {
    year: "2018",
    title: "Bachelor's Degree",
    description:
      "Earned a Bachelor of Science in Computer Science from George Mason University.",
  },
  {
    year: "2018–",
    title: "Work Journey",
    description: "Started my professional work journey.",
  },
] as const;

export type SkillItem = {
  name: string;
  category: string;
  color: string;
  /** Proficiency 0–100 */
  level: number;
};

const categoryColors: Record<string, string> = {
  Frontend: "#38bdf8",
  Backend: "#a78bfa",
  Database: "#34d399",
  Mobile: "#f472b6",
  DevOps: "#fb923c",
  AI: "#e879f9",
  Tools: "#facc15",
  Platforms: "#2dd4bf",
};

/** Varied orbit icon colors */
export const skillIconPalette = [
  "#38bdf8",
  "#a78bfa",
  "#34d399",
  "#f472b6",
  "#fb923c",
  "#e879f9",
  "#facc15",
  "#2dd4bf",
  "#f87171",
  "#818cf8",
  "#4ade80",
  "#c084fc",
  "#22d3ee",
  "#fb7185",
] as const;

export const techStacks = {
  frontend: [
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Tailwind",
    "Framer Motion",
    "Vue",
    "Vite",
    "HTML5",
    "CSS3",
  ],
  backend: [
    "Node.js",
    "Python",
    "Express",
    "FastAPI",
    "REST",
    "GraphQL",
    "Microservices",
    "Go",
  ],
  database: [
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Prisma",
    "MySQL",
    "Supabase",
    "Firebase",
  ],
  mobile: [
    "Kotlin",
    "Java",
    "React Native",
    "Android SDK",
    "Flutter",
    "Swift",
    "iOS",
  ],
  devops: [
    "Docker",
    "AWS",
    "Kubernetes",
    "CI/CD",
    "Vercel",
    "GitHub Actions",
    "Linux",
    "Nginx",
  ],
  ai: [
    "OpenAI",
    "Anthropic",
    "RAG",
    "LangChain",
    "Vector DB",
    "Hugging Face",
    "TensorFlow",
    "PyTorch",
  ],
  tools: ["Git", "Figma", "Jest", "npm", "Webpack", "Postman", "VS Code"],
  platforms: ["GitHub", "Stripe", "Firebase", "Supabase", "Netlify"],
} as const;

const skillLevels: Record<string, number> = {
  "Next.js": 92,
  React: 90,
  TypeScript: 94,
  JavaScript: 100,
  Tailwind: 88,
  "Framer Motion": 86,
  Vue: 87,
  Vite: 89,
  HTML5: 96,
  CSS3: 93,
  "Node.js": 88,
  Python: 86,
  Express: 87,
  FastAPI: 86,
  REST: 90,
  GraphQL: 86,
  Microservices: 86,
  Go: 86,
  PostgreSQL: 87,
  MongoDB: 86,
  Redis: 86,
  Prisma: 86,
  MySQL: 86,
  Supabase: 88,
  Firebase: 87,
  Kotlin: 88,
  Java: 86,
  "React Native": 86,
  "Android SDK": 86,
  Flutter: 86,
  Swift: 86,
  iOS: 86,
  Docker: 86,
  AWS: 88,
  Kubernetes: 86,
  "CI/CD": 86,
  Vercel: 90,
  "GitHub Actions": 87,
  Linux: 88,
  Nginx: 86,
  OpenAI: 88,
  Anthropic: 86,
  RAG: 86,
  LangChain: 86,
  "Vector DB": 86,
  "Hugging Face": 86,
  TensorFlow: 86,
  PyTorch: 86,
  Git: 92,
  Figma: 86,
  Jest: 86,
  npm: 90,
  Webpack: 86,
  Postman: 86,
  "VS Code": 94,
  GitHub: 91,
  Stripe: 86,
  Netlify: 86,
};

const MIN_SKILL_LEVEL = 86;

const categoryMap: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  mobile: "Mobile",
  devops: "DevOps",
  ai: "AI",
  tools: "Tools",
  platforms: "Platforms",
};

export function getAllSkills(): SkillItem[] {
  const items: SkillItem[] = [];
  let idx = 0;
  for (const [cat, skills] of Object.entries(techStacks)) {
    const label = categoryMap[cat] ?? cat;
    for (const name of skills) {
      items.push({
        name,
        category: label,
        color: skillIconPalette[idx % skillIconPalette.length],
        level: Math.max(MIN_SKILL_LEVEL, skillLevels[name] ?? MIN_SKILL_LEVEL + (idx % 14)),
      });
      idx += 1;
    }
  }
  return items;
}

export type Project = {
  id: string;
  title: string;
  url: string;
  category: string;
  platformDescription: string;
  summary: string;
  detail: string;
  whatIDid: string[];
  tech: string[];
  beforeLabel: string;
  afterLabel: string;
};

/** Screenshots under public/projects/{id}/ — 1 preview, 2 after, 3 before */
export function getProjectImages(id: string) {
  return {
    preview: `/projects/${id}/1.png`,
    before: `/projects/${id}/3.png`,
    after: `/projects/${id}/2.png`,
  };
}

export const projects: Project[] = [
  {
    id: "podia",
    title: "Podia",
    url: "https://www.podia.com",
    category: "MOOC · Creator SaaS",
    platformDescription:
      "Course platform for creators selling courses, memberships, webinars, and digital downloads.",
    summary:
      "Creator course platform powering thousands of lessons, memberships, and digital products at scale.",
    detail:
      "Podia serves creators who need reliable course delivery, protected content, and subscription billing without operational overhead. I focused on lesson rendering at scale, secure media pipelines, and creator-facing analytics so teams could ship curriculum faster while keeping pages fast for large catalogs.",
    whatIDid: [
      "Built scalable course rendering architecture for thousands of lessons",
      "Implemented secure video and content delivery pipeline",
      "Developed creator analytics dashboards with realtime metrics",
      "Optimized SSR hydration and page speed for large course pages",
      "Built Stripe subscription synchronization logic",
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS"],
    beforeLabel: "Before",
    afterLabel: "After",
  },
  {
    id: "teachfloor",
    title: "Teachfloor",
    url: "https://www.teachfloor.com",
    category: "Cohort-Based Learning Platform",
    platformDescription:
      "Modern LMS focused on cohort-based online learning and communities.",
    summary:
      "Cohort LMS with live classrooms, community spaces, and role-based access for modern online programs.",
    detail:
      "Teachfloor combines structured cohort learning with community engagement. I owned realtime classroom infrastructure, live collaboration over WebSockets, and notification systems so instructors and learners stayed in sync across sessions, announcements, and cohort milestones.",
    whatIDid: [
      "Built realtime classroom and community infrastructure",
      "Implemented WebSocket-based live collaboration",
      "Designed permission-based role architecture",
      "Built notification scheduling and event systems",
      "Optimized realtime state synchronization",
    ],
    tech: ["React", "Firebase", "WebSockets", "PostgreSQL", "Node.js"],
    beforeLabel: "Before",
    afterLabel: "After",
  },
  {
    id: "paw",
    title: "Paw.com",
    url: "https://paw.com",
    category: "Pet Ecommerce Store",
    platformDescription:
      "Premium pet furniture and accessories ecommerce store.",
    summary:
      "Headless Shopify storefront for premium pet products with performance and SEO as first-class goals.",
    detail:
      "Paw.com sells high-end pet furniture where imagery and page speed directly affect conversion. I delivered a headless commerce architecture, CDN-aware media pipelines, and Shopify integrations while improving Core Web Vitals and discoverability across catalog and product detail flows.",
    whatIDid: [
      "Built headless ecommerce storefront architecture",
      "Optimized image and CDN performance pipelines",
      "Developed product recommendation systems",
      "Improved Core Web Vitals and SEO rendering",
      "Built advanced Shopify integrations",
    ],
    tech: ["Shopify Headless", "React", "GraphQL", "Tailwind CSS"],
    beforeLabel: "Before",
    afterLabel: "After",
  },
  {
    id: "whop",
    title: "Whop",
    url: "https://whop.com",
    category: "SaaS Marketplace Platform",
    platformDescription:
      "Marketplace for communities, digital products, and SaaS tools.",
    summary:
      "Creator marketplace for communities and digital products with payments, fraud controls, and live analytics.",
    detail:
      "Whop connects creators and buyers across digital products and memberships. I built payment and monetization flows, fraud detection hooks, and realtime dashboards on a secure auth layer so high-volume transactions remained trustworthy and observable for operations teams.",
    whatIDid: [
      "Built transaction and payment workflows",
      "Developed creator monetization systems",
      "Implemented fraud detection logic",
      "Created realtime analytics dashboards",
      "Built scalable authentication and security layers",
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Redis"],
    beforeLabel: "Before",
    afterLabel: "After",
  },
  {
    id: "branch-furniture",
    title: "Branch Furniture",
    url: "https://www.branchfurniture.com",
    category: "Home & Garden · Furniture Ecommerce",
    platformDescription:
      "Modern office and furniture ecommerce platform.",
    summary:
      "Shopify Plus furniture commerce with configurators, dynamic bundles, and optimized mobile checkout.",
    detail:
      "Branch sells configurable office furniture where buyers expect accurate pricing, shipping logic, and smooth mobile checkout. I shipped interactive configurators, bundle pricing engines, and warehouse-aware shipping calculations while tightening funnel performance on high-intent product pages.",
    whatIDid: [
      "Built interactive product configurators",
      "Developed dynamic bundle pricing systems",
      "Optimized ecommerce checkout funnel",
      "Built shipping and warehouse calculation systems",
      "Improved mobile commerce performance",
    ],
    tech: ["Shopify Plus", "React", "Liquid", "Node.js"],
    beforeLabel: "Before",
    afterLabel: "After",
  },
  {
    id: "revenuecat",
    title: "RevenueCat",
    url: "https://www.revenuecat.com",
    category: "Mobile Subscription SaaS",
    platformDescription:
      "Mobile subscription infrastructure for iOS and Android apps.",
    summary:
      "Subscription infrastructure syncing entitlements across iOS and Android with analytics for mobile teams.",
    detail:
      "RevenueCat is the backbone for in-app subscriptions on mobile. I worked on cross-platform lifecycle sync, entitlement validation, SDK integrations, and webhook pipelines so app developers received accurate subscription state and actionable metrics in near realtime.",
    whatIDid: [
      "Built subscription lifecycle synchronization across iOS and Android",
      "Implemented realtime entitlement validation",
      "Developed mobile SDK integrations",
      "Optimized webhook and event processing pipelines",
      "Built analytics dashboards for subscription metrics",
    ],
    tech: ["React Native", "Kotlin", "Java", "Node.js", "PostgreSQL"],
    beforeLabel: "Before",
    afterLabel: "After",
  },
  {
    id: "jow",
    title: "Jow",
    url: "https://jow.com",
    category: "AI Food & Shopping App",
    platformDescription:
      "Recipe recommendation and grocery shopping mobile platform.",
    summary:
      "Mobile app combining AI recipe recommendations with grocery cart sync and retailer integrations.",
    detail:
      "Jow helps households plan meals and shop in one flow. I contributed to recommendation logic, cart synchronization, search and filter performance on mobile, and integrations with grocery APIs and payments so personalized feeds stayed fast and reliable at scale.",
    whatIDid: [
      "Built recommendation engine logic",
      "Developed shopping-cart synchronization",
      "Optimized mobile search and filter architecture",
      "Built personalized feed algorithms",
      "Integrated grocery APIs and payment flows",
    ],
    tech: ["React Native", "Kotlin", "Java", "GraphQL", "Firebase"],
    beforeLabel: "Before",
    afterLabel: "After",
  },
  {
    id: "studypool",
    title: "Studypool",
    url: "https://www.studypool.com",
    category: "Education · Tutoring Marketplace",
    platformDescription:
      "Online tutoring marketplace and homework assistance platform.",
    summary:
      "Tutoring marketplace with realtime messaging, bidding workflows, and secure document exchange.",
    detail:
      "Studypool matches students and tutors for homework help and live support. I built messaging, bidding and request flows, secure uploads, and notification scheduling while keeping the mobile experience responsive under peak academic season traffic.",
    whatIDid: [
      "Built realtime tutor and student messaging",
      "Developed bidding and request systems",
      "Implemented secure file upload pipelines",
      "Built notification scheduling architecture",
      "Optimized mobile app responsiveness",
    ],
    tech: ["React Native", "Kotlin", "Java", "Node.js", "PostgreSQL"],
    beforeLabel: "Before",
    afterLabel: "After",
  },
];

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Portrait URL (Unsplash) or path under /public */
  avatar: string;
};

export const testimonialsSection = {
  headline: "Clients trust me when the stakes are real.",
  subline:
    "Feedback from engineering leaders and founders I've partnered with on production launches.",
};

export const testimonials: Testimonial[] = [
  {
    id: "podia",
    quote:
      "Lucas rebuilt our course rendering so creators with massive catalogs finally had pages that felt instant. The secure video pipeline alone cut support load and gave us confidence to scale.",
    author: "Sarah Chen",
    role: "Director of Engineering",
    company: "Podia",
    avatar: "/testimonials/avatars/podia.png",
  },
  {
    id: "teachfloor",
    quote:
      "Realtime cohort classrooms were our biggest bet. Lucas delivered WebSocket infrastructure that held through peak launches without dropping collaboration state — our instructors noticed immediately.",
    author: "Marcus Webb",
    role: "CTO",
    company: "Teachfloor",
    avatar: "/testimonials/avatars/teachfloor.png",
  },
  {
    id: "paw",
    quote:
      "Core Web Vitals went from a liability to a competitive edge. The headless Shopify work and CDN optimizations materially moved mobile conversion — rare to see that kind of end-to-end ownership.",
    author: "Elena Vasquez",
    role: "Head of Ecommerce",
    company: "Paw.com",
    avatar: "/testimonials/avatars/paw.png",
  },
  {
    id: "whop",
    quote:
      "Payments and fraud at marketplace scale are unforgiving. Lucas shipped transaction flows we trusted in production, with realtime dashboards our ops team actually uses every day.",
    author: "Jordan Blake",
    role: "Co-founder",
    company: "Whop",
    avatar: "/testimonials/avatars/whop.png",
  },
  {
    id: "branch",
    quote:
      "Product configurators and dynamic bundles were painful in our stack. Lucas made them feel native, fast, and reliable — checkout completion improved within the first release cycle.",
    author: "Priya Nair",
    role: "Director of Digital Product",
    company: "Branch Furniture",
    avatar: "/testimonials/avatars/branch.png",
  },
  {
    id: "revenuecat",
    quote:
      "Cross-platform entitlement sync is subtle and brutal. Lucas tightened our iOS/Android lifecycle and webhook pipelines — noticeably fewer edge-case bugs hitting production.",
    author: "David Okonkwo",
    role: "Staff Mobile Engineer",
    company: "RevenueCat",
    avatar: "/testimonials/avatars/revenuecat.png",
  },
  {
    id: "jow",
    quote:
      "Recommendation and cart sync on mobile is deceptively hard. Lucas made our feed feel personal without sacrificing scroll performance — grocery integrations shipped clean and on time.",
    author: "Amélie Laurent",
    role: "Lead Product Engineer",
    company: "Jow",
    avatar: "/testimonials/avatars/jow.png",
  },
  {
    id: "studypool",
    quote:
      "Messaging, bidding, and secure uploads under academic season spikes — Lucas kept the app responsive when traffic jumped 3×. Exactly the senior ownership we needed on a critical path.",
    author: "Ryan Torres",
    role: "Engineering Manager",
    company: "Studypool",
    avatar: "/testimonials/avatars/studypool.png",
  },
];

export const contact = {
  email: "lucasdanielzhusilva@gmail.com",
  whatsapp: "+15092062035",
  whatsappDisplay: "+1 (509) 206-2035",
  headline: "Let's turn darkness into launches together.",
  subtext: "Send a message, I'll respond as soon as possible.",
};
