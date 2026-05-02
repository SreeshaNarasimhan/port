import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, Code2, ArrowUp } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "soft-skills", label: "Mindset" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Journey" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Awards" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      const sections = links.map((l) => document.getElementById(l.id));
      const y = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s && s.offsetTop <= y) {
          setActive(links[i].id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled ? "glass shadow-card" : "bg-transparent",
        )}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => go("home")} className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "var(--gradient-brand)" }}
            >
              <Code2 className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-gradient" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Sreesha
              </span>
              <span style={{ color: "var(--muted-foreground)" }}>.dev</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-medium transition-all duration-200 rounded-lg",
                  active === l.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                )}
              >
                {l.label}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full"
                    style={{ background: "var(--gradient-brand)" }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="h-9 w-9 inline-flex items-center justify-center rounded-lg border transition-all hover:scale-110"
              style={{ borderColor: "var(--glass-border)", background: "var(--glass-bg)" }}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-yellow-400" />
              ) : (
                <Moon className="h-4 w-4 text-violet-500" />
              )}
            </button>

            {/* Hire me button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                go("contact");
              }}
              className="hidden md:inline-flex items-center gap-1.5 h-9 px-4 rounded-lg text-sm font-semibold text-white btn-neon"
            >
              Hire Me 🚀
            </a>

            <button
              onClick={() => setOpen((o) => !o)}
              className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-lg border"
              style={{ borderColor: "var(--glass-border)", background: "var(--glass-bg)" }}
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-[2px] w-full" style={{ background: "rgba(255,255,255,0.05)" }}>
          <motion.div
            className="h-full"
            style={{
              width: `${progress}%`,
              background: "var(--gradient-brand)",
              transition: "width 0.1s linear",
            }}
          />
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 inset-x-4 z-40 md:hidden glass rounded-2xl border overflow-hidden shadow-glow"
            style={{ borderColor: "var(--glass-border)" }}
          >
            <div className="px-3 py-3 flex flex-col gap-1">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className={cn(
                    "text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                    active === l.id
                      ? "text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                  )}
                  style={active === l.id ? { background: "var(--gradient-brand)" } : {}}
                >
                  {l.label}
                </button>
              ))}
              <div className="h-px my-1" style={{ background: "var(--glass-border)" }} />
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  go("contact");
                }}
                className="text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white btn-neon"
              >
                Hire Me 🚀
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Back to Top Button */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => go("home")}
            className="fixed bottom-6 right-6 z-[100] h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-glow hover:scale-110 transition-transform btn-neon md:h-14 md:w-14"
            aria-label="Back to top"
          >
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ArrowUp className="h-6 w-6" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
