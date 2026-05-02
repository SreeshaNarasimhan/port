import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LogOut,
  ExternalLink,
  Moon,
  Sun,
  User,
  Info,
  Brain,
  Heart,
  Briefcase,
  GraduationCap,
  Rocket,
  Award,
} from "lucide-react";
import { isAuthed, logout } from "@/lib/admin-auth";
import { useTheme } from "@/lib/theme";
import { loadData, saveData, resetData, type PortfolioData } from "@/lib/portfolio-data";
import {
  HeroEditor,
  AboutEditor,
  SkillsEditor,
  SoftSkillsEditor,
  ProjectsEditor,
  AchievementsEditor,
  ExperienceEditor,
  EducationEditor,
  SaveBar,
} from "@/components/admin/Editors";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/dashboard")({
  component: Dashboard,
});

const sections = [
  { id: "hero", label: "Hero", icon: User },
  { id: "about", label: "About", icon: Info },
  { id: "skills", label: "Skills", icon: Brain },
  { id: "softSkills", label: "Soft Skills", icon: Heart },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "projects", label: "Projects", icon: Rocket },
  { id: "achievements", label: "Achievements", icon: Award },
] as const;

type SectionId = (typeof sections)[number]["id"];

function Dashboard() {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const [active, setActive] = useState<SectionId>("hero");
  const [draft, setDraft] = useState<PortfolioData>(loadData);
  const [saved, setSaved] = useState<PortfolioData>(loadData);

  useEffect(() => {
    if (!isAuthed()) navigate({ to: "/admin" });
  }, [navigate]);

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(saved), [draft, saved]);

  function save() {
    saveData(draft);
    setSaved(draft);
  }
  function reset() {
    if (!confirm("Reset all content to defaults?")) return;
    resetData();
    const d = loadData();
    setDraft(d);
    setSaved(d);
  }

  function handleLogout() {
    logout();
    navigate({ to: "/admin" });
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-64 md:min-h-screen border-b md:border-b-0 md:border-r border-border bg-card/50 backdrop-blur">
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-bold tracking-tight text-lg">
              <span className="text-gradient">SN</span> Admin
            </Link>
            <button
              onClick={toggle}
              className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-border hover:bg-accent"
              aria-label="Theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <nav className="p-3 grid grid-cols-2 md:grid-cols-1 gap-1">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-left",
                  active === s.id
                    ? "gradient-brand text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" /> {s.label}
              </button>
            );
          })}
        </nav>
        <div className="p-3 mt-auto md:absolute md:bottom-0 md:w-64 border-t border-border space-y-1">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" /> View Portfolio
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-5 sm:p-8 max-w-5xl">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <h1 className="text-2xl font-bold capitalize">
            {sections.find((s) => s.id === active)?.label}
          </h1>
          <p className="text-sm text-muted-foreground mt-1 mb-6">
            Edit content. Changes save to your browser and reflect on the live site.
          </p>

          {active === "hero" && (
            <HeroEditor value={draft.hero} onChange={(hero) => setDraft({ ...draft, hero })} />
          )}
          {active === "about" && (
            <AboutEditor value={draft.about} onChange={(about) => setDraft({ ...draft, about })} />
          )}
          {active === "skills" && (
            <SkillsEditor
              value={draft.skills}
              onChange={(skills) => setDraft({ ...draft, skills })}
            />
          )}
          {active === "softSkills" && (
            <SoftSkillsEditor
              value={draft.softSkills}
              onChange={(softSkills) => setDraft({ ...draft, softSkills })}
            />
          )}
          {active === "experience" && (
            <ExperienceEditor
              value={draft.experience}
              onChange={(experience) => setDraft({ ...draft, experience })}
            />
          )}
          {active === "education" && (
            <EducationEditor
              value={draft.education}
              onChange={(education) => setDraft({ ...draft, education })}
            />
          )}
          {active === "projects" && (
            <ProjectsEditor
              value={draft.projects}
              onChange={(projects) => setDraft({ ...draft, projects })}
            />
          )}
          {active === "achievements" && (
            <AchievementsEditor
              value={draft.achievements}
              onChange={(achievements) => setDraft({ ...draft, achievements })}
            />
          )}
        </motion.div>

        <SaveBar dirty={dirty} onSave={save} onReset={reset} />
      </main>
    </div>
  );
}
