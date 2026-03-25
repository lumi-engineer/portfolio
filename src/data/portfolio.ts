export const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#tech", label: "Tech" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

export const hero = {
  title: "FROM DARKNESS TO LAUNCH",
  stormWords: [
    "bugs",
    "complexity",
    "uncertainty",
    "challenges",
    "ideas",
  ],
};

export const about = {
  punchline: "I bridge engineering and business outcomes",
  intro: `I am a Results-driven Software Engineer with 7+ years of experience developing and maintaining scalable applications across web and mobile platforms. Experienced in Android development with Kotlin, REST API integration, debugging, and working with existing production codebases. Skilled in writing clean, maintainable code and implementing unit/UI testing to improve application reliability and performance. Strong background collaborating with distributed teams and delivering high-quality solutions for startups and enterprise clients in healthcare, banking, energy, and retail industries.`,
  brand: "BUSINESS-MINDED ENGINEER",
};

export const journey = [
  { year: "1998", title: "Born", description: "I was born — the journey begins." },
  { year: "2015", title: "University", description: "Started university." },
  {
    year: "2023",
    title: "Bachelor's Degree",
    description: "Bachelor degree of Computer Science.",
  },
  {
    year: "2023–",
    title: "Work Journey",
    description: "Started my professional work journey.",
  },
] as const;

export const techStacks = {
  frontend: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"],
  backend: ["Node.js", "Python", "REST", "GraphQL", "Microservices"],
  database: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
  mobile: ["Kotlin", "Java", "React Native", "Android SDK"],
} as const;

export type Project = {
  id: string;
  title: string;
  category: string;
  summary: string;
  detail: string;
  whatIDid: string[];
  tech: string[];
  beforeLabel: string;
  afterLabel: string;
};

export const projects: Project[] = [
  {
    id: "healthcare-platform",
    title: "Healthcare Patient Portal",
    category: "Enterprise · Web & Mobile",
    summary:
      "HIPAA-aware portal connecting patients, clinicians, and real-time vitals.",
    detail:
      "Led full-stack delivery for a distributed healthcare team — from legacy monolith migration to a modular Next.js + Kotlin mobile stack with observability baked in.",
    whatIDid: [
      "Architected API gateway and role-based access",
      "Shipped React Native companion app with offline queue",
      "Cut page load 40% via edge caching and image pipeline",
    ],
    tech: ["Next.js", "Kotlin", "PostgreSQL", "Redis"],
    beforeLabel: "Legacy monolith · slow releases",
    afterLabel: "Modular platform · weekly deploys",
  },
  {
    id: "fintech-dashboard",
    title: "Banking Analytics Dashboard",
    category: "FinTech · Data Viz",
    summary:
      "Real-time risk and portfolio insights for institutional clients.",
    detail:
      "Built interactive dashboards with GSAP-driven transitions, WebSocket feeds, and audit-grade logging for a tier-1 banking partner.",
    whatIDid: [
      "Designed component library with accessibility in mind",
      "Integrated Python ML scoring service",
      "Implemented comprehensive E2E test suite",
    ],
    tech: ["React", "Python", "PostgreSQL", "D3"],
    beforeLabel: "Static reports · batch only",
    afterLabel: "Live dashboards · sub-second refresh",
  },
  {
    id: "energy-iot",
    title: "Energy IoT Command Center",
    category: "IoT · Real-time",
    summary:
      "Fleet monitoring for renewable assets with predictive maintenance alerts.",
    detail:
      "End-to-end IoT pipeline from edge sensors to Three.js 3D site maps — empowering operators to act before downtime.",
    whatIDid: [
      "Node.js ingestion layer at 50k events/sec",
      "Three.js facility visualization",
      "Mobile alerts via React Native",
    ],
    tech: ["Node.js", "Three.js", "MQTT", "MongoDB"],
    beforeLabel: "Reactive maintenance",
    afterLabel: "Predictive ops · 22% less downtime",
  },
];

export const contact = {
  email: "hello@engineer.dev",
  headline: "Let's build something ambitious.",
  subtext: "Open to full-time, contract, and advisory roles.",
};
