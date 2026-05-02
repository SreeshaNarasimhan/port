import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle, MapPin, Clock } from "lucide-react";
import { z } from "zod";
import { Section, fadeUp } from "./Section";
import type { Hero } from "@/lib/portfolio-data";

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Required").max(1000),
});

export function Contact({ hero }: { hero: Hero }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const i of parsed.error.issues) errs[i.path[0] as string] = i.message;
      setErrors(errs);
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/mqenkopy", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(parsed.data),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's Build Together"
      subtitle="Open to internships, collaborations, freelance projects, and interesting AI problems."
    >
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left info panel */}
        <motion.div
          {...fadeUp}
          className="lg:col-span-2 space-y-4"
        >
          {/* Availability card */}
          <div
            className="p-5 rounded-2xl"
            style={{
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.25)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-sm font-bold" style={{ color: "#10b981" }}>
                Available for Opportunities
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Actively looking for internships and part-time AI/Data Science roles. Let's connect!
            </p>
          </div>

          {/* Contact links */}
          <div
            className="p-5 rounded-2xl space-y-3"
            style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", backdropFilter: "blur(12px)" }}
          >
            <h3 className="font-bold text-base mb-4" style={{ color: "var(--foreground)" }}>
              Reach Out Directly
            </h3>

            <a
              href={`mailto:${hero.email}`}
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02] group"
              style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}
            >
              <span
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "var(--gradient-brand)" }}
              >
                <Mail className="h-4 w-4 text-white" />
              </span>
              <div className="min-w-0">
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="text-sm font-semibold truncate" style={{ color: "var(--foreground)" }}>
                  {hero.email}
                </div>
              </div>
            </a>

            <a
              href={hero.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02]"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "#24292e" }}
              >
                <Github className="h-4 w-4 text-white" />
              </span>
              <div>
                <div className="text-xs text-muted-foreground">GitHub</div>
                <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  View my projects
                </div>
              </div>
            </a>

            <a
              href={hero.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02]"
              style={{ background: "rgba(10,102,194,0.1)", border: "1px solid rgba(10,102,194,0.25)" }}
            >
              <span
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "#0a66c2" }}
              >
                <Linkedin className="h-4 w-4 text-white" />
              </span>
              <div>
                <div className="text-xs text-muted-foreground">LinkedIn</div>
                <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  Let's connect
                </div>
              </div>
            </a>
          </div>

          {/* Location & timezone */}
          <div
            className="p-4 rounded-xl flex flex-col gap-2"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" style={{ color: "#7c3aed" }} />
              Tamil Nadu, India
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 shrink-0" style={{ color: "#06b6d4" }} />
              IST (UTC +5:30) · Usually replies in &lt;24h
            </div>
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.form
          {...fadeUp}
          onSubmit={onSubmit}
          className="lg:col-span-3 rounded-2xl p-6 sm:p-8 space-y-5"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            backdropFilter: "blur(16px)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div>
            <h3 className="text-xl font-bold mb-1" style={{ color: "var(--foreground)" }}>
              Send a Message
            </h3>
            <p className="text-sm text-muted-foreground">
              Drop me a note — I'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>
                Your Name
              </label>
              <input
                name="name"
                type="text"
                maxLength={255}
                placeholder="Sreesha..."
                className="form-field"
              />
              {errors.name && (
                <p className="mt-1 text-xs flex items-center gap-1" style={{ color: "#ef4444" }}>
                  <AlertCircle className="h-3 w-3" /> {errors.name}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>
                Email Address
              </label>
              <input
                name="email"
                type="email"
                maxLength={255}
                placeholder="you@example.com"
                className="form-field"
              />
              {errors.email && (
                <p className="mt-1 text-xs flex items-center gap-1" style={{ color: "#ef4444" }}>
                  <AlertCircle className="h-3 w-3" /> {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>
              Message
            </label>
            <textarea
              name="message"
              rows={5}
              maxLength={1000}
              placeholder="Hi Sreesha, I'd love to talk about..."
              className="form-field resize-none"
            />
            {errors.message && (
              <p className="mt-1 text-xs flex items-center gap-1" style={{ color: "#ef4444" }}>
                <AlertCircle className="h-3 w-3" /> {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-neon inline-flex items-center gap-2 h-12 px-7 w-full sm:w-auto justify-center rounded-xl font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "success" ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Message Sent! 🎉
              </>
            ) : status === "loading" ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </button>

          {status === "error" && (
            <p className="text-sm flex items-center gap-1.5" style={{ color: "#ef4444" }}>
              <AlertCircle className="h-4 w-4" />
              Something went wrong. Try emailing directly.
            </p>
          )}
        </motion.form>
      </div>
    </Section>
  );
}
