import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Section, fadeUp } from "./Section";
import type { PortfolioData } from "@/lib/portfolio-data";

const CARD_COLORS = [
  { bg: "rgba(124,58,237,0.12)", border: "rgba(124,58,237,0.3)", icon: "#7c3aed", glow: "rgba(124,58,237,0.2)" },
  { bg: "rgba(6,182,212,0.12)",  border: "rgba(6,182,212,0.3)",  icon: "#06b6d4", glow: "rgba(6,182,212,0.2)" },
  { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)", icon: "#10b981", glow: "rgba(16,185,129,0.2)" },
];

export function About({ about }: { about: PortfolioData["about"] }) {
  return (
    <Section id="about" eyebrow="About Me" title="Who I Am" subtitle={about.intro}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {about.cards.map((c, i) => {
          const Icon = (Icons as any)[c.icon] ?? Icons.Sparkles;
          const col = CARD_COLORS[i % CARD_COLORS.length];
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group rounded-2xl p-6 overflow-hidden"
              style={{
                background: "var(--glass-bg)",
                border: `1px solid ${col.border}`,
                backdropFilter: "blur(16px)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(circle at 30% 30%, ${col.glow} 0%, transparent 60%)` }}
              />

              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ background: col.icon }}
              />

              {/* Icon */}
              <div
                className="relative z-10 h-12 w-12 rounded-xl flex items-center justify-center mb-5 shadow-lg transition-transform group-hover:scale-110 duration-300"
                style={{ background: col.bg, border: `1px solid ${col.border}` }}
              >
                <Icon className="h-6 w-6" style={{ color: col.icon }} />
              </div>

              {/* Content */}
              <h3
                className="relative z-10 text-lg font-bold mb-2"
                style={{ color: "var(--foreground)" }}
              >
                {c.title}
              </h3>
              <p className="relative z-10 text-sm text-muted-foreground leading-relaxed">
                {c.description}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${col.icon}, transparent)` }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Fun facts row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          { emoji: "🎓", text: "2nd Year B.Tech — AI & Data Science", sub: "AVS Engineering College" },
          { emoji: "🌍", text: "Based in Tamil Nadu, India", sub: "Open to remote / hybrid roles" },
          { emoji: "⚡", text: "Fast learner, fast builder", sub: "Ship it, then iterate" },
        ].map((f, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-4 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <span className="text-2xl">{f.emoji}</span>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{f.text}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{f.sub}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </Section>
  );
}
