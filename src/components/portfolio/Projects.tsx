import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { Section, fadeUp } from "./Section";
import bgProjects from "@/assets/bg-projects.jpg";
import type { Project } from "@/lib/portfolio-data";

export function Projects({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const [idx, setIdx] = useState(0);

  const open = (p: Project) => { setActive(p); setIdx(0); };
  const close = () => setActive(null);

  return (
    <Section
      id="projects"
      eyebrow="Work"
      title="Featured Projects"
      subtitle="A selection of things I've built — from ML pipelines to full-stack apps."
      bgImage={bgProjects}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            onClick={() => open(p)}
            className="group text-left rounded-2xl overflow-hidden glow-border"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(12px)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            {/* Thumbnail */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={p.thumbnail}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-300 opacity-60 group-hover:opacity-80"
                style={{ background: "linear-gradient(to top, #050818 0%, transparent 60%)" }}
              />
              {/* View hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: "rgba(124,58,237,0.85)", backdropFilter: "blur(8px)" }}
                >
                  View Project →
                </div>
              </div>
              {/* Tech count badge */}
              <div
                className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold"
                style={{ background: "rgba(0,0,0,0.6)", color: "#a78bfa", backdropFilter: "blur(8px)" }}
              >
                <Layers className="h-3 w-3" />
                {p.tech.length} tech
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-base mb-1.5" style={{ color: "var(--foreground)" }}>
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.tech.slice(0, 4).map((t) => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
                {p.tech.length > 4 && (
                  <span className="tech-badge">+{p.tech.length - 4}</span>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ background: "rgba(5,8,24,0.85)", backdropFilter: "blur(16px)" }}
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl thin-scroll"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid rgba(124,58,237,0.3)",
                backdropFilter: "blur(24px)",
                boxShadow: "var(--shadow-glow)",
              }}
            >
              {/* Close */}
              <button
                onClick={close}
                className="absolute top-4 right-4 z-10 h-9 w-9 rounded-xl inline-flex items-center justify-center transition-colors hover:scale-110"
                style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <X className="h-4 w-4 text-white" />
              </button>

              {/* Image carousel */}
              <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={idx}
                    src={active.images[idx] ?? active.thumbnail}
                    alt={active.title}
                    className="h-full w-full object-cover"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  />
                </AnimatePresence>

                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(5,8,24,0.8) 0%, transparent 50%)" }}
                />

                {active.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setIdx((i) => (i - 1 + active.images.length) % active.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl inline-flex items-center justify-center"
                      style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      <ChevronLeft className="h-4 w-4 text-white" />
                    </button>
                    <button
                      onClick={() => setIdx((i) => (i + 1) % active.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl inline-flex items-center justify-center"
                      style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      <ChevronRight className="h-4 w-4 text-white" />
                    </button>
                    <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
                      {active.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setIdx(i)}
                          className="h-1.5 rounded-full transition-all duration-300"
                          style={{
                            width: i === idx ? 24 : 6,
                            background: i === idx ? "var(--gradient-brand)" : "rgba(255,255,255,0.4)",
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Details */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--foreground)" }}>
                  {active.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {active.tech.map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {active.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {active.github && (
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold text-white btn-neon"
                    >
                      <Github className="h-4 w-4" /> View Code
                    </a>
                  )}
                  {active.live && (
                    <a
                      href={active.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "var(--foreground)",
                      }}
                    >
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
