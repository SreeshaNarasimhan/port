import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Lock, ArrowLeft } from "lucide-react";
import { isAuthed, login } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin/")({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (isAuthed()) navigate({ to: "/admin/dashboard" });
  }, [navigate]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (login(u, p)) navigate({ to: "/admin/dashboard" });
    else setErr("Invalid credentials");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full gradient-brand opacity-20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full gradient-brand opacity-20 blur-3xl"
      />
      <Link
        to="/"
        className="absolute top-4 left-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to site
      </Link>
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl glass p-8 shadow-glow"
      >
        <div className="h-12 w-12 rounded-xl gradient-brand inline-flex items-center justify-center text-primary-foreground mb-4">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="text-sm text-muted-foreground mt-1">Sign in to manage portfolio content.</p>
        <div className="mt-6 space-y-3">
          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              value={u}
              onChange={(e) => setU(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={p}
              onChange={(e) => setP(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button className="w-full h-11 rounded-md gradient-brand text-primary-foreground font-medium hover-glow">
            Sign In
          </button>
          <p className="text-xs text-muted-foreground text-center">Demo: admin / admin123</p>
        </div>
      </motion.form>
    </div>
  );
}
