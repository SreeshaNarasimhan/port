import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Calendar, Building2 } from "lucide-react";
import { Section } from "./Section";
import bgAchievements from "@/assets/bg-achievements.png";
import type { Achievement } from "@/lib/portfolio-data";

const BADGE_COLORS = [
  { bg: "rgba(124,58,237,0.15)", border: "rgba(124,58,237,0.35)", text: "#a78bfa", icon: "🏆" },
  { bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.35)", text: "#fbbf24", icon: "🥇" },
  { bg: "rgba(16,185,129,0.15)", border: "rgba(16,185,129,0.35)", text: "#34d399", icon: "🎖️" },
];

export function Achievements({ items }: { items: Achievement[] }) {
  const [active, setActive] = useState<Achievement | null>(null);

  return (
    <Section
      id="achievements"
      eyebrow="Recognition"
      title="Achievements & Awards"
      bgImage={bgAchievements}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((a, i) => {
          const col = BADGE_COLORS[i % BADGE_COLORS.length];
          return (
            <motion.button
              key={a.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setActive(a)}
              className="group text-left rounded-2xl overflow-hidden glow-border"
              style={{
                background: "var(--glass-bg)",
                border: `1px solid ${col.border}`,
                backdropFilter: "blur(12px)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, rgba(5,8,24,0.9) 0%, transparent 60%)`,
                  }}
                />
                {/* Trophy badge */}
                <div
                  className="absolute top-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                  style={{
                    background: col.bg,
                    border: `1px solid ${col.border}`,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {col.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="text-xs text-muted-foreground font-medium">{a.issuer}</span>
                  <span className="text-muted-foreground">·</span>
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="text-xs text-muted-foreground">{a.date}</span>
                </div>
                <h3
                  className="font-bold text-base leading-snug"
                  style={{ color: "var(--foreground)" }}
                >
                  {a.title}
                </h3>
                <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{a.description}</p>

                {/* View detail hint */}
                <div
                  className="mt-3 text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: col.text }}
                >
                  <Trophy className="h-3.5 w-3.5" /> View Details →
                </div>
              </div>
            </motion.button>
          );
        })}
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
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid rgba(124,58,237,0.3)",
                backdropFilter: "blur(24px)",
                boxShadow: "var(--shadow-glow)",
              }}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-10 h-9 w-9 rounded-xl inline-flex items-center justify-center hover:scale-110 transition-transform"
                style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <X className="h-4 w-4 text-white" />
              </button>
              <div className="aspect-[16/9] overflow-hidden">
                <img src={active.image} alt={active.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                  <span>{active.issuer}</span>
                  <span>·</span>
                  <span>{active.date}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gradient">{active.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {active.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
