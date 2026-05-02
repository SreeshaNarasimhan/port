export type Hero = {
  name: string; role: string; tagline: string;
  github: string; linkedin: string; email: string; resume?: string;
};
export type AboutCard = { id: string; title: string; description: string; icon: string };
export type Skill = { id: string; name: string; category: "Languages" | "AI & Data" | "Tools"; icon: string };
export type Project = {
  id: string; title: string; description: string; tech: string[];
  thumbnail: string; images: string[]; github?: string; live?: string;
};
export type Achievement = {
  id: string; title: string; issuer: string; description: string; date: string; image: string;
};
export type Experience = { id: string; role: string; company: string; period: string; description: string };
export type Education = { id: string; degree: string; school: string; period: string; details: string };

export type PortfolioData = {
  hero: Hero;
  about: { intro: string; cards: AboutCard[] };
  skills: Skill[];
  softSkills: AboutCard[];
  projects: Project[];
  achievements: Achievement[];
  experience: Experience[];
  education: Education[];
};

export const defaultData: PortfolioData = {
  hero: {
    name: "Sreesha Narasimhan",
    role: "AI & Data Science Student | Python Developer | ML Enthusiast",
    tagline: "Building intelligent, user-friendly solutions that solve real-world problems.",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    email: "sreesha@example.com",
    resume: "",
  },
  about: {
    intro:
      "I'm a 2nd-year B.Tech student in AI & Data Science at AVS Engineering College, deeply passionate about building intelligent, user-friendly solutions that bridge the gap between research and real-world impact.",
    cards: [
      { id: "1", title: "Curious", description: "Constantly exploring new AI tools, frameworks and ideas.", icon: "Sparkles" },
      { id: "2", title: "Collaborative", description: "Thrive in teams — communication first, ego last.", icon: "Users" },
      { id: "3", title: "Builder", description: "Prototype-driven mindset: ship, learn, iterate.", icon: "Hammer" },
    ],
  },
  skills: [
    { id: "s1", name: "Python", category: "Languages", icon: "Code2" },
    { id: "s2", name: "SQL", category: "Languages", icon: "Database" },
    { id: "s3", name: "JavaScript", category: "Languages", icon: "Braces" },
    { id: "s4", name: "HTML / CSS", category: "Languages", icon: "FileCode" },
    { id: "s5", name: "C (Basics)", category: "Languages", icon: "Terminal" },
    { id: "s6", name: "Machine Learning", category: "AI & Data", icon: "Brain" },
    { id: "s7", name: "Data Science", category: "AI & Data", icon: "BarChart3" },
    { id: "s8", name: "Prompt Engineering", category: "AI & Data", icon: "MessageSquare" },
    { id: "s9", name: "Scikit-learn", category: "AI & Data", icon: "Cpu" },
    { id: "s10", name: "Pandas", category: "AI & Data", icon: "Table" },
    { id: "s11", name: "NumPy", category: "AI & Data", icon: "Sigma" },
    { id: "s12", name: "Matplotlib", category: "AI & Data", icon: "LineChart" },
    { id: "s13", name: "Jupyter", category: "Tools", icon: "Notebook" },
    { id: "s14", name: "Google Colab", category: "Tools", icon: "Cloud" },
    { id: "s15", name: "Git", category: "Tools", icon: "GitBranch" },
    { id: "s16", name: "VS Code", category: "Tools", icon: "Code" },
    { id: "s17", name: "Power BI", category: "Tools", icon: "PieChart" },
    { id: "s18", name: "Gemini AI", category: "Tools", icon: "Gem" },
  ],
  softSkills: [
    { id: "ss1", title: "Communication", description: "Clear writing and presentation across technical and non-technical audiences.", icon: "MessageCircle" },
    { id: "ss2", title: "Teamwork", description: "Comfortable collaborating across roles, time zones, and tools.", icon: "Users" },
    { id: "ss3", title: "Problem Solving", description: "Break ambiguous problems into testable, shippable steps.", icon: "Lightbulb" },
  ],
  projects: [
    {
      id: "p1", title: "Coffee",
      description: "A responsive, animated coffee shop landing built with vanilla web technologies — focused on smooth UX and clean visual hierarchy.",
      tech: ["HTML", "CSS", "JavaScript"],
      thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&q=80",
      ],
      github: "https://github.com/",
    },
    {
      id: "p2", title: "Titanic Survival Prediction",
      description: "Classic ML pipeline — data cleaning, feature engineering, and a comparison of classifiers to predict passenger survival.",
      tech: ["Python", "Pandas", "Scikit-learn"],
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1600&q=80",
      ],
      github: "https://github.com/",
    },
    {
      id: "p3", title: "Investa AI",
      description: "An AI-powered startup analyzer that scores ideas across market, team, and execution signals using LLM reasoning.",
      tech: ["Python", "LLM", "Streamlit"],
      thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1600&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
      ],
      github: "https://github.com/",
    },
    {
      id: "p4", title: "Smart Campus Navigator",
      description: "A Figma UI/UX concept for an indoor campus wayfinding app — flows, components, and a polished design system.",
      tech: ["Figma", "UI/UX", "Prototyping"],
      thumbnail: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1600&q=80",
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1600&q=80",
      ],
    },
    {
      id: "p5", title: "Prompt-based Mini Games",
      description: "A collection of small browser games designed and iterated through prompt engineering with Gemini.",
      tech: ["Gemini", "JavaScript", "Prompt Eng."],
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80",
        "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1600&q=80",
      ],
      github: "https://github.com/",
    },
  ],
  achievements: [
    {
      id: "a1", title: "Hack India — Spark 8 Participant",
      issuer: "Hack India",
      description: "Selected participant at Spark 8 — collaborated on a rapid prototype within 36 hours.",
      date: "2024",
      image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=1200&q=80",
    },
    {
      id: "a2", title: "NPTEL Certification",
      issuer: "NPTEL",
      description: "Completed Python for Data Science and LLM coursework with verified certification.",
      date: "2024",
      image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1200&q=80",
    },
    {
      id: "a3", title: "Symposium Paper Presentations",
      issuer: "College Symposium",
      description: "Presented multiple research papers at college-level technical symposiums.",
      date: "2023 — 2024",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80",
    },
  ],
  experience: [
    { id: "e1", role: "Full-Stack Python Intern", company: "Gateway Software Solutions", period: "2024", description: "Built internal tools and APIs with Python and modern web stack." },
    { id: "e2", role: "Python Intern", company: "CodSoft", period: "2024", description: "Worked on automation scripts and small data projects." },
    { id: "e3", role: "Content Writer", company: "Freelance", period: "2023 — Present", description: "Technical and non-technical writing across multiple clients." },
  ],
  education: [
    { id: "ed1", degree: "B.Tech, AI & Data Science", school: "AVS Engineering College", period: "2023 — 2027 (2nd Year)", details: "Focused on machine learning, data engineering, and AI systems." },
    { id: "ed2", degree: "NPTEL Certification", school: "NPTEL", period: "2024", details: "Python for Data Science & LLM." },
  ],
};

const KEY = "portfolio:data:v1";

export function loadData(): PortfolioData {
  if (typeof window === "undefined") return defaultData;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultData;
    return { ...defaultData, ...JSON.parse(raw) };
  } catch {
    return defaultData;
  }
}

export function saveData(data: PortfolioData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent("portfolio:updated"));
}

export function resetData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("portfolio:updated"));
}
