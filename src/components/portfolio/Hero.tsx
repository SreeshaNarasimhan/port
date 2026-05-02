import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileDown, ArrowDown, Sparkles, Zap } from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import type { Hero as HeroT } from "@/lib/portfolio-data";

const ROLES = [
  "AI & Data Science Student",
  "Python Developer",
  "ML Engineer",
  "Prompt Engineer",
  "Full-Stack Builder",
];

function useTypingEffect(words: string[], speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

/* ── Particle canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number; hue: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random(),
        hue: Math.random() > 0.5 ? 270 : 185,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.a * 0.6})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }} />;
}

const stats = [
  { label: "Projects Built", value: "5+", icon: "🚀" },
  { label: "Internships", value: "2", icon: "💼" },
  { label: "Certifications", value: "3+", icon: "🏆" },
  { label: "AI Tools Used", value: "10+", icon: "🤖" },
];

export function Hero({ hero }: { hero: HeroT }) {
  const typedRole = useTypingEffect(ROLES);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Aurora blobs */}
      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full animate-aurora-1"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full animate-aurora-2"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full animate-aurora-3"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute top-10 right-1/4 w-[300px] h-[300px] rounded-full animate-aurora-1"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)", filter: "blur(50px)", animationDelay: "-4s" }}
        />
      </div>

      {/* Particle canvas */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <ParticleCanvas />
      </div>

      {/* Grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <div className="mx-auto max-w-6xl w-full px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
            style={{
              background: "rgba(16,185,129,0.1)",
              borderColor: "rgba(16,185,129,0.3)",
              color: "#10b981",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Open to Opportunities
            <Zap className="h-3 w-3" />
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]"
          >
            <span style={{ color: "var(--foreground)" }}>Hi, I'm</span>
            <br />
            <span className="text-gradient" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {hero.name.split(" ")[0]}
            </span>{" "}
            <span style={{ color: "var(--foreground)" }}>
              {hero.name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>

          {/* Typing role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 h-8 flex items-center"
          >
            <span
              className="text-lg sm:text-xl font-semibold"
              style={{ color: "#a78bfa", fontFamily: "'JetBrains Mono', monospace" }}
            >
              &gt; {typedRole}
              <span className="animate-cursor" style={{ color: "#7c3aed" }}>|</span>
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-base text-muted-foreground max-w-lg leading-relaxed"
          >
            {hero.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href={hero.github}
              target="_blank"
              rel="noreferrer"
              className="btn-neon inline-flex items-center gap-2 h-12 px-6 text-sm font-semibold"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={hero.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              style={{
                background: "rgba(10,102,194,0.15)",
                border: "1px solid rgba(10,102,194,0.4)",
                color: "#60a5fa",
              }}
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={`mailto:${hero.email}`}
              className="inline-flex items-center gap-2 h-12 px-6 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                color: "var(--foreground)",
              }}
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
            {hero.resume && (
              <a
                href={hero.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{
                  background: "rgba(16,185,129,0.12)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  color: "#10b981",
                }}
              >
                <FileDown className="h-4 w-4" />
                Resume
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Right — Profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative justify-self-center flex flex-col items-center gap-8"
        >
          {/* Glowing ring profile */}
          <div className="relative">
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-[2.5rem] animate-pulse-ring"
              style={{
                background: "conic-gradient(from 0deg, #7c3aed, #a855f7, #06b6d4, #10b981, #7c3aed)",
                padding: "3px",
                filter: "blur(2px)",
              }}
            />
            {/* Glow halo */}
            <div
              className="absolute -inset-6 rounded-[3rem] opacity-30"
              style={{ background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)", filter: "blur(20px)" }}
            />
            {/* Image container */}
            <div
              className="relative z-10 w-[280px] sm:w-[320px] aspect-[4/5] rounded-[2.5rem] overflow-hidden"
              style={{
                background: "var(--gradient-brand)",
                padding: "3px",
              }}
            >
              <div className="h-full w-full rounded-[2.3rem] overflow-hidden bg-background/50 backdrop-blur-sm">
                <img
                  src={profileImg}
                  alt={hero.name}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: "60% 30%" }}
                  width={600}
                  height={750}
                />
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-6 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg"
              style={{ background: "rgba(124,58,237,0.9)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <Sparkles className="h-3 w-3 inline mr-1" />
              AI Dev
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-3 -left-6 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg"
              style={{ background: "rgba(6,182,212,0.9)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              🐍 Python
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mx-auto max-w-6xl w-full px-4 sm:px-6 mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.08 }}
            className="stat-card text-center"
          >
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-bold text-gradient">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs font-medium tracking-widest uppercase opacity-50">Scroll</span>
        <ArrowDown className="h-5 w-5" />
      </motion.button>
    </section>
  );
}
