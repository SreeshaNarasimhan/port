import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/lib/theme";
import { usePortfolio } from "@/lib/use-portfolio";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { SoftSkills } from "@/components/portfolio/SoftSkills";
import { ExperienceEducation } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Achievements } from "@/components/portfolio/Achievements";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const data = usePortfolio();
  return (
    <ThemeProvider>
      <div
        className="min-h-screen"
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <Navbar />
        <main>
          <Hero hero={data.hero} />
          <About about={data.about} />
          <SoftSkills items={data.softSkills} />
          <Skills skills={data.skills} />
          <ExperienceEducation experience={data.experience} education={data.education} />
          <Projects projects={data.projects} />
          <Achievements items={data.achievements} />
          <Contact hero={data.hero} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
