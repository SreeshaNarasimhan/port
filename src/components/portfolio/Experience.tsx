import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { Section } from "./Section";
import type { PortfolioData } from "@/lib/portfolio-data";

export function ExperienceEducation({
  experience,
  education,
}: {
  experience: PortfolioData["experience"];
  education: PortfolioData["education"];
}) {
  return (
    <Section id="experience" eyebrow="Journey" title="Experience & Education">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Experience */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)" }}
            >
              <Briefcase className="h-5 w-5" style={{ color: "#7c3aed" }} />
            </div>
            <h3 className="text-lg font-bold" style={{ color: "#a78bfa" }}>
              Work Experience
            </h3>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[5px] top-2 bottom-0 w-[2px]"
              style={{ background: "linear-gradient(to bottom, #7c3aed, rgba(124,58,237,0.1))" }}
            />

            <ol className="space-y-8 pl-8">
              {experience.map((e, i) => (
                <motion.li
                  key={e.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="timeline-dot absolute -left-8 top-1" />

                  {/* Card */}
                  <div
                    className="group p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: "var(--glass-bg)",
                      border: "1px solid var(--glass-border)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-base" style={{ color: "var(--foreground)" }}>
                        {e.role}
                      </h4>
                      <span
                        className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: "rgba(124,58,237,0.12)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.2)" }}
                      >
                        <Calendar className="h-3 w-3" />
                        {e.period}
                      </span>
                    </div>
                    <p
                      className="text-sm font-semibold mb-2 flex items-center gap-1.5"
                      style={{ color: "#06b6d4" }}
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      {e.company}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{e.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}
            >
              <GraduationCap className="h-5 w-5" style={{ color: "#10b981" }} />
            </div>
            <h3 className="text-lg font-bold" style={{ color: "#34d399" }}>
              Education
            </h3>
          </div>

          <div className="relative">
            <div
              className="absolute left-[5px] top-2 bottom-0 w-[2px]"
              style={{ background: "linear-gradient(to bottom, #10b981, rgba(16,185,129,0.1))" }}
            />

            <ol className="space-y-8 pl-8">
              {education.map((e, i) => (
                <motion.li
                  key={e.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot — green */}
                  <div
                    className="absolute -left-8 top-1 w-3 h-3 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #10b981, #34d399)",
                      boxShadow: "0 0 0 3px rgba(16,185,129,0.2), 0 0 12px rgba(16,185,129,0.4)",
                    }}
                  />

                  <div
                    className="group p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: "var(--glass-bg)",
                      border: "1px solid rgba(16,185,129,0.15)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-base" style={{ color: "var(--foreground)" }}>
                        {e.degree}
                      </h4>
                      <span
                        className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", border: "1px solid rgba(16,185,129,0.2)" }}
                      >
                        <Calendar className="h-3 w-3" />
                        {e.period}
                      </span>
                    </div>
                    <p
                      className="text-sm font-semibold mb-2 flex items-center gap-1.5"
                      style={{ color: "#06b6d4" }}
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      {e.school}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{e.details}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}
