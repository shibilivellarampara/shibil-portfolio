import {
  Blocks,
  Boxes,
  Bot,
  CalendarClock,
  Car,
  Cloud,
  Container,
  Database,
  Globe,
  Layers,
  Network,
  ShieldCheck,
  TrendingUp,
  Trophy,
  Wallet,
  Workflow,
  Worm,
  type LucideIcon,
} from "lucide-react";

export const profile = {
  name: "Shibil Muhamed V",
  title: "Senior Java Backend Developer",
  currentRole: "Senior Java Developer",
  currentCompany: "Allianz Technology",
  tagline:
    "Spring Boot microservices, multi-tenant platforms, and cloud-native deployments that hold up in production.",
  location: "Kerala, India",
  email: "ShibilVellarampara@gmail.com",
  phone: "+91-9947919201",
  resumeUrl: "/cv/Java_developer_CV_Apr2025.pdf",
  social: {
    github: "https://github.com/shibilivellarampara",
    linkedin: "https://www.linkedin.com/in/shibil-muhamed-v-b51b55100/",
    facebook: "https://www.facebook.com/profile.php?id=100008176482284",
  },
};

export const navLinks = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#playground", label: "Games" },
  { href: "#contact", label: "Contact" },
];

export type Telemetry = {
  icon: LucideIcon;
  key: string;
  value: string;
  label: string;
};

export const telemetry: Telemetry[] = [
  {
    icon: CalendarClock,
    key: "experience.years",
    value: "4+",
    label: "Years Experience",
  },
  {
    icon: Layers,
    key: "framework.core",
    value: "Spring Boot",
    label: "Core Framework",
  },
  {
    icon: Network,
    key: "tenancy.mode",
    value: "Multi-Tenant",
    label: "Production",
  },
  {
    icon: Cloud,
    key: "deploy.targets",
    value: "AWS & Cloud Run",
    label: "Cloud Platforms",
  },
];

export type SkillGroup = {
  icon: LucideIcon;
  title: string;
  path: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    icon: Layers,
    title: "Core Backend",
    path: "core_backend/",
    items: [
      "Java 17/21",
      "Spring Boot",
      "Microservices",
      "Spring Security",
      "REST APIs",
      "JUnit / Mockito",
    ],
  },
  {
    icon: Database,
    title: "Data & Persistence",
    path: "data_persistence/",
    items: [
      "PostgreSQL",
      "JPA / Hibernate",
      "Schema Isolation",
      "Index Tuning",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    path: "cloud_devops/",
    items: [
      "Docker",
      "Google Cloud Run",
      "AWS",
      "DigitalOcean",
      "Maven",
      "CI/CD",
      "Git",
    ],
  },
  {
    icon: Globe,
    title: "Web & Interface",
    path: "web_interface/",
    items: ["Angular", "React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
];

export const education = [
  {
    school: "MEA Engineering College, Perinthalmanna",
    degree: "B.Tech in Computer Science and Engineering",
    duration: "August 2017 – July 2021",
    description:
      "Completed degree with practical exposure in AI/ML, MEAN stack, and system design.",
    bullets: [
      "MEAN stack certified by ICT Academy (70% scholarship)",
      "Volunteered in IEEE and IEDC for startup initiatives",
    ],
  },
];

export type Highlight = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export type Job = {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  summary: string;
  /** Short key/value callouts shown beside the card, like telemetry badges. */
  metrics: { label: string; value: string }[];
  highlights: Highlight[];
  stack: string[];
};

export const experience: Job[] = [
  {
    role: "Senior Java Developer",
    company: "Allianz Technology",
    period: "Mar 2025 – Present",
    current: true,
    summary:
      "Senior backend engineer owning the design, delivery, and cloud deployment of Spring Boot microservices.",
    metrics: [
      { label: "scope", value: "Design → production" },
      { label: "delivery", value: "Containerized services" },
    ],
    highlights: [
      {
        icon: Blocks,
        title: "Architectural ownership",
        text: "Owns service boundaries, API contracts, and data models for the microservices I deliver, from design through release.",
      },
      {
        icon: Container,
        title: "Containerized deployments",
        text: "Packages services with Docker and ships them to cloud environments so builds stay reproducible and releases stay repeatable.",
      },
      {
        icon: ShieldCheck,
        title: "Secure, tested APIs",
        text: "Builds REST APIs secured with Spring Security and backed by JUnit and Mockito test suites.",
      },
    ],
    stack: ["Java 17/21", "Spring Boot", "Microservices", "Docker", "REST"],
  },
  {
    role: "Software Engineer",
    company: "SunTec Business Solutions",
    period: "Jan 2021 – Oct 2024",
    summary:
      "Backend engineer on Java 8/17 and Spring Boot microservices, integrating with the Xelerate platform.",
    metrics: [
      { label: "migration", value: "TBMS → Xelerate 2.4" },
      { label: "outcome", value: "Revenue loss reduced" },
    ],
    highlights: [
      {
        icon: TrendingUp,
        title: "Revenue-protecting migration",
        text: "Migrated the product from TBMS to Xelerate 2.4, reducing revenue loss and improving performance.",
      },
      {
        icon: Workflow,
        title: "APIs & validation layer",
        text: "Developed APIs and custom validations, and extended backend services with catalog integration.",
      },
      {
        icon: Layers,
        title: "Java modernization",
        text: "Worked across Java 8 and Java 17 Spring Boot codebases, keeping services consistent through the upgrade path.",
      },
    ],
    stack: ["Java 8/17", "Spring Boot", "Microservices", "Xelerate", "REST"],
  },
];

export type Callout = {
  icon: LucideIcon;
  title: string;
  tag: string;
  text: string;
};

export type Project = {
  icon?: LucideIcon;
  name: string;
  description: string;
  stack: string[];
  github?: string;
  website?: string;
  live?: string;
};

/** The flagship gets architecture callouts and a diagram, not just a blurb. */
export const flagship: Project & { callouts: Callout[] } = {
  name: "Qelvix ERP",
  description:
    "Generic multi-tenant ERP platform built for growing businesses, with Car Spot as its first live customer. Covers inventory, sales, and business operations, deployed to production behind a Dockerized CI pipeline.",
  stack: ["Spring Boot", "Angular", "PostgreSQL", "Docker"],
  website: "https://qelvix.in",
  live: "https://erp.qelvix.com",
  callouts: [
    {
      icon: Database,
      title: "Tenant Isolation",
      tag: "schema-per-tenant",
      text: "Each tenant gets its own PostgreSQL schema: strong data isolation without running a database per customer.",
    },
    {
      icon: Boxes,
      title: "Microservices Core",
      tag: "spring-boot",
      text: "Spring Boot services behind a REST API covering inventory, sales, and day-to-day business operations.",
    },
    {
      icon: Container,
      title: "Docker CI Pipeline",
      tag: "dockerized",
      text: "Containerized builds through a CI pipeline give repeatable, environment-independent releases.",
    },
  ],
};

export const projects: Project[] = [
  {
    icon: Trophy,
    name: "Kickivo",
    description:
      "Web application for organizing and running football tournaments: brackets, teams, and match scheduling in one place.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Firebase"],
    github: "https://github.com/shibilivellarampara/Kickivo",
  },
  {
    icon: Wallet,
    name: "ExpenseWise",
    description:
      "Personal finance and expense tracking app with charts, categorized spending, and AI-assisted insights via Genkit.",
    stack: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS", "Genkit"],
    github: "https://github.com/shibilivellarampara/ExpenseWiseApplication",
  },
  {
    icon: Bot,
    name: "InstaBot",
    description:
      "Telegram bot that reads Instagram followers/following exports and returns a styled PDF of accounts that don't follow you back.",
    stack: ["Java", "Docker"],
    github: "https://github.com/shibilivellarampara/InstaBot",
  },
];

export type Game = {
  id: "snake" | "racers";
  icon: LucideIcon;
  name: string;
  kind: string;
  description: string;
  engineering: string[];
  stack: string[];
  live: string;
  github: string;
};

export const games: Game[] = [
  {
    id: "snake",
    icon: Worm,
    name: "Toy Snake",
    kind: "Multiplayer PWA",
    description:
      "Battle-royale snake and apples. Play solo against bot snakes, or against friends over shared Wi-Fi with a 4-digit room code. Last snake alive wins.",
    engineering: [
      "Host-authoritative simulation: guests only send inputs",
      "WebRTC data channels, no signaling server or accounts",
      "Bot snakes steer with nearest-apple and flood-fill checks",
    ],
    stack: ["TypeScript", "WebRTC", "PWA", "Vite"],
    live: "https://toy-snake.vercel.app",
    github: "https://github.com/shibilivellarampara/toy-snake",
  },
  {
    id: "racers",
    icon: Car,
    name: "Toy Racers",
    kind: "Multiplayer PWA",
    description:
      "Top-down toy car racing, installable on Android and iOS. Race solo, or pair phones over Wi-Fi by scanning QR codes: three laps, synced countdown.",
    engineering: [
      "Peer-to-peer over WebRTC, paired by scanning QR codes",
      "Per-car local physics, host-authoritative lap and finish order",
      "Star topology: the host relays state to every guest",
    ],
    stack: ["TypeScript", "WebRTC", "PWA", "Vite"],
    live: "https://toy-racers.vercel.app",
    github: "https://github.com/shibilivellarampara/toy-racers",
  },
];
