import { Github, Linkedin, Mail, Code2, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { icon: Github, href: "https://github.com/", label: "GitHub", color: "#fff" },
    { icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn", color: "#60a5fa" },
    { icon: Mail, href: "mailto:sreesha@example.com", label: "Email", color: "#a78bfa" },
  ];

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Aurora bg */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "var(--gradient-brand)" }}
              >
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span
                className="text-xl font-bold text-gradient"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Sreesha Narasimhan
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              AI & Data Science Student · Python Developer · ML Enthusiast. Building the future, one
              model at a time.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() =>
                  document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </button>
            ))}
            <Link
              to="/admin"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Admin
            </Link>
          </nav>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-8"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)",
          }}
        />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            © {year} Sreesha Narasimhan · Made with
            <Heart className="h-3.5 w-3.5 inline" style={{ color: "#ef4444" }} />
            and lots of Python ☕
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color,
                }}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
