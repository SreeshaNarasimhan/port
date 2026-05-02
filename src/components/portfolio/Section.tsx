import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id, eyebrow, title, subtitle, children, className, bgImage,
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  bgImage?: string;
}) {
  return (
    <section id={id} className={cn("relative py-24 sm:py-32 overflow-hidden", className)}>
      {/* Background image with improved visibility */}
      {bgImage && (
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgImage})`,
            opacity: 0.18,
            filter: "saturate(1.2) brightness(1.1)",
          }}
        />
      )}

      {/* Aurora gradient overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(to bottom, var(--background) 0%, transparent 20%, transparent 80%, var(--background) 100%)",
        }}
      />

      {/* Subtle dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "radial-gradient(rgba(124,58,237,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {(eyebrow || title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            {eyebrow && (
              <div className="section-eyebrow mx-auto w-fit">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--gradient-brand)" }}
                />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-3">
                <span className="text-gradient">{title.split(" ")[0]}</span>{" "}
                <span style={{ color: "var(--foreground)" }}>{title.split(" ").slice(1).join(" ")}</span>
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
                {subtitle}
              </p>
            )}

            {/* Decorative line */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="h-px w-16 opacity-30" style={{ background: "var(--gradient-brand)" }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--brand)" }} />
              <div className="h-px w-16 opacity-30" style={{ background: "var(--gradient-brand)" }} />
            </div>
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55 },
};
