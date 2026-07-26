export const profile = {
  name: "Shibil Muhamed V",
  title: "Senior Java Backend Developer",
  tagline:
    "Java Backend Developer building Spring Boot microservices, cloud-deployed APIs, and the occasional side project.",
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

export const skills = [
  "Java",
  "Spring Boot",
  "Microservices",
  "PostgreSQL",
  "REST APIs",
  "AWS",
  "Google Cloud Run",
  "Docker",
  "Angular",
  "Maven",
  "JUnit / Mockito",
  "Git",
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

export const experience = [
  {
    role: "Senior Java Developer",
    company: "Allianz Technology",
    duration: "Mar 2025 – Present",
    description:
      "Working as a Senior Java Backend Developer handling microservices and cloud deployments.",
    bullets: [] as string[],
  },
  {
    role: "Software Engineer",
    company: "SunTec Business Solutions",
    duration: "Jan 2021 – Oct 2024",
    description:
      "Worked on Java 8/17, Spring Boot microservices, and Xelerate platform integrations.",
    bullets: [
      "Migrated product from TBMS to Xelerate 2.4, reducing revenue loss and boosting performance",
      "Developed APIs, custom validations, and enhanced backend services with catalog integration",
    ],
  },
];

export type Project = {
  name: string;
  description: string;
  stack: string[];
  github?: string;
  live?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "Qelvix ERP",
    description:
      "Generic multi-tenant ERP platform built for growing businesses, with Car Spot as its first live customer. Covers inventory, sales, and business operations, deployed on Railway with a full CI pipeline.",
    stack: ["Spring Boot", "Angular", "PostgreSQL", "Docker", "Railway"],
    live: "https://qelvix.up.railway.app",
    featured: true,
  },
  {
    name: "Kickivo",
    description:
      "Web application for organizing and running football tournaments — brackets, teams, and match scheduling in one place.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Firebase"],
    github: "https://github.com/shibilivellarampara/Kickivo",
    featured: true,
  },
  {
    name: "ExpenseWise",
    description:
      "Personal finance and expense tracking app with charts, categorized spending, and AI-assisted insights via Genkit.",
    stack: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS", "Genkit"],
    github: "https://github.com/shibilivellarampara/ExpenseWiseApplication",
    featured: true,
  },
  {
    name: "InstaBot — NonFollowers Finder",
    description:
      "Telegram bot that reads Instagram followers/following export files and returns a styled PDF listing accounts that don't follow you back.",
    stack: ["Java", "Docker"],
    github: "https://github.com/shibilivellarampara/InstaBot",
    featured: true,
  },
];
