import { motion } from "framer-motion";
import { Section, fadeUp } from "./Section";
import type { Skill } from "@/lib/portfolio-data";

/* ── Official SVG logos via CDN (simple-icons / devicons) ── */
const SKILL_META: Record<string, { logo: string; color: string }> = {
  // Languages
  Python: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#3776AB",
  },
  SQL: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    color: "#4479A1",
  },
  JavaScript: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
  },
  "HTML / CSS": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "#E34F26",
  },
  "C (Basics)": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    color: "#A8B9CC",
  },

  // AI & Data
  "Machine Learning": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    color: "#FF6F00",
  },
  "Data Science": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/anaconda/anaconda-original.svg",
    color: "#44A833",
  },
  "Prompt Engineering": {
    logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
    color: "#8B5CF6",
  },
  "Scikit-learn": {
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
    color: "#F89939",
  },
  Pandas: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    color: "#150458",
  },
  NumPy: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
    color: "#013243",
  },
  Matplotlib: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg",
    color: "#11557C",
  },

  // Tools
  Jupyter: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
    color: "#F37626",
  },
  "Google Colab": {
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg",
    color: "#F9AB00",
  },
  Git: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032",
  },
  "VS Code": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    color: "#007ACC",
  },
  "Power BI": {
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
    color: "#F2C811",
  },
  "Gemini AI": {
    logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
    color: "#8B5CF6",
  },
};

const groups: Skill["category"][] = ["Languages", "AI & Data", "Tools"];

const GROUP_META = {
  Languages: { icon: "💻", color: "#7c3aed", label: "Programming Languages" },
  "AI & Data": { icon: "🤖", color: "#06b6d4", label: "AI & Data Science" },
  Tools: { icon: "🛠️", color: "#10b981", label: "Dev Tools & Platforms" },
};

function SkillCard({ skill, i }: { skill: Skill; i: number }) {
  const meta = SKILL_META[skill.name];
  const logoUrl = meta?.logo;
  const brandColor = meta?.color ?? "#7c3aed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.04 }}
      whileHover={{ y: -6, scale: 1.06 }}
      className="skill-card group"
    >
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{
          background: `radial-gradient(circle at center, ${brandColor}18 0%, transparent 70%)`,
        }}
      />

      {/* Logo */}
      <div className="relative z-10 w-12 h-12 flex items-center justify-center">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={skill.name}
            className="skill-logo"
            style={{ width: 40, height: 40, objectFit: "contain" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
              const next = e.currentTarget.nextElementSibling as HTMLElement | null;
              if (next) next.style.display = "flex";
            }}
          />
        ) : null}
        {/* Fallback emoji */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold"
          style={{
            display: logoUrl ? "none" : "flex",
            background: `${brandColor}20`,
            color: brandColor,
          }}
        >
          {skill.name[0]}
        </div>
      </div>

      {/* Name */}
      <span
        className="relative z-10 text-xs font-semibold text-center leading-tight"
        style={{ color: "var(--foreground)" }}
      >
        {skill.name}
      </span>

      {/* Bottom color strip */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${brandColor}, transparent)` }}
      />
    </motion.div>
  );
}

export function Skills({ skills }: { skills: Skill[] }) {
  return (
    <Section
      id="skills"
      eyebrow="Stack"
      title="Technical Skills"
      subtitle="My toolkit for building intelligent applications and data-driven solutions."
    >
      <div className="space-y-14">
        {groups.map((g) => {
          const items = skills.filter((s) => s.category === g);
          if (items.length === 0) return null;
          const gm = GROUP_META[g];
          return (
            <motion.div
              key={g}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-xl text-lg"
                  style={{ background: `${gm.color}20`, border: `1px solid ${gm.color}30` }}
                >
                  {gm.icon}
                </div>
                <div>
                  <h3
                    className="text-sm font-bold uppercase tracking-widest"
                    style={{ color: gm.color }}
                  >
                    {g}
                  </h3>
                  <p className="text-xs text-muted-foreground">{gm.label}</p>
                </div>
                <div
                  className="ml-4 flex-1 h-px"
                  style={{ background: `linear-gradient(90deg, ${gm.color}40, transparent)` }}
                />
              </div>

              {/* Skill grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {items.map((s, i) => (
                  <SkillCard key={s.id} skill={s} i={i} />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
