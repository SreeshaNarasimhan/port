import { motion } from "framer-motion";
import { Section, fadeUp } from "./Section";
import type { AboutCard } from "@/lib/portfolio-data";

const SKILL_META: { emoji: string; color: string; bg: string }[] = [
  { emoji: "🗣️", color: "#7c3aed", bg: "rgba(124,58,237,0.12)" },
  { emoji: "🤝", color: "#06b6d4", bg: "rgba(6,182,212,0.12)" },
  { emoji: "💡", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  { emoji: "📈", color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  { emoji: "⚡", color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
];

export function SoftSkills({ items }: { items: AboutCard[] }) {
  return (
    <Section id="soft-skills" eyebrow="Mindset" title="Soft Skills">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((c, i) => {
          const meta = SKILL_META[i % SKILL_META.length];
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative rounded-2xl p-6 overflow-hidden"
              style={{
                background: "var(--glass-bg)",
                border: `1px solid ${meta.color}25`,
                backdropFilter: "blur(12px)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              {/* BG glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: `radial-gradient(circle at 20% 20%, ${meta.bg} 0%, transparent 60%)`,
                }}
              />

              {/* Emoji icon */}
              <div
                className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-transform group-hover:scale-110 duration-300"
                style={{ background: meta.bg, border: `1px solid ${meta.color}30` }}
              >
                {meta.emoji}
              </div>

              <h3
                className="relative z-10 font-bold text-lg mb-1.5"
                style={{ color: "var(--foreground)" }}
              >
                {c.title}
              </h3>
              <p className="relative z-10 text-sm text-muted-foreground leading-relaxed">
                {c.description}
              </p>

              {/* Bottom line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)`,
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
