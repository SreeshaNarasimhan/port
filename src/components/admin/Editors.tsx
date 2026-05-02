import { Plus, Trash2, Save } from "lucide-react";
import type { PortfolioData } from "@/lib/portfolio-data";

type Update<K extends keyof PortfolioData> = (next: PortfolioData[K]) => void;

function Field({
  label,
  value,
  onChange,
  type = "text",
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      )}
    </label>
  );
}

function Card({ children, onDelete }: { children: React.ReactNode; onDelete?: () => void }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3 relative">
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-3 right-3 h-7 w-7 rounded-md border border-border text-destructive hover:bg-destructive/10 inline-flex items-center justify-center"
          aria-label="Delete"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      )}
      {children}
    </div>
  );
}

function AddBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 h-9 px-4 rounded-md border border-dashed border-border hover:bg-accent text-sm font-medium"
    >
      <Plus className="h-4 w-4" /> {label}
    </button>
  );
}

export function HeroEditor({
  value,
  onChange,
}: {
  value: PortfolioData["hero"];
  onChange: Update<"hero">;
}) {
  const set = <K extends keyof PortfolioData["hero"]>(k: K, v: PortfolioData["hero"][K]) =>
    onChange({ ...value, [k]: v });
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <Field label="Name" value={value.name} onChange={(v) => set("name", v)} />
      <Field label="Role" value={value.role} onChange={(v) => set("role", v)} />
      <div className="sm:col-span-2">
        <Field label="Tagline" value={value.tagline} onChange={(v) => set("tagline", v)} textarea />
      </div>
      <Field label="GitHub URL" value={value.github} onChange={(v) => set("github", v)} />
      <Field label="LinkedIn URL" value={value.linkedin} onChange={(v) => set("linkedin", v)} />
      <Field label="Email" value={value.email} onChange={(v) => set("email", v)} />
      <Field label="Resume URL" value={value.resume ?? ""} onChange={(v) => set("resume", v)} />
    </div>
  );
}

export function AboutEditor({
  value,
  onChange,
}: {
  value: PortfolioData["about"];
  onChange: Update<"about">;
}) {
  const setIntro = (v: string) => onChange({ ...value, intro: v });
  const setCard = (id: string, patch: Partial<PortfolioData["about"]["cards"][number]>) =>
    onChange({ ...value, cards: value.cards.map((c) => (c.id === id ? { ...c, ...patch } : c)) });
  const add = () =>
    onChange({
      ...value,
      cards: [
        ...value.cards,
        { id: crypto.randomUUID(), title: "New", description: "", icon: "Sparkles" },
      ],
    });
  const del = (id: string) => onChange({ ...value, cards: value.cards.filter((c) => c.id !== id) });
  return (
    <div className="space-y-4">
      <Field label="Intro" value={value.intro} onChange={setIntro} textarea />
      <div className="grid md:grid-cols-2 gap-3">
        {value.cards.map((c) => (
          <Card key={c.id} onDelete={() => del(c.id)}>
            <Field label="Title" value={c.title} onChange={(v) => setCard(c.id, { title: v })} />
            <Field
              label="Description"
              value={c.description}
              onChange={(v) => setCard(c.id, { description: v })}
              textarea
            />
            <Field
              label="Icon (lucide name)"
              value={c.icon}
              onChange={(v) => setCard(c.id, { icon: v })}
            />
          </Card>
        ))}
      </div>
      <AddBtn onClick={add} label="Add card" />
    </div>
  );
}

export function SkillsEditor({
  value,
  onChange,
}: {
  value: PortfolioData["skills"];
  onChange: Update<"skills">;
}) {
  const setItem = (id: string, patch: Partial<PortfolioData["skills"][number]>) =>
    onChange(value.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const add = () =>
    onChange([
      ...value,
      { id: crypto.randomUUID(), name: "New skill", category: "Tools", icon: "Code" },
    ]);
  const del = (id: string) => onChange(value.filter((s) => s.id !== id));
  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {value.map((s) => (
          <Card key={s.id} onDelete={() => del(s.id)}>
            <Field label="Name" value={s.name} onChange={(v) => setItem(s.id, { name: v })} />
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Category</span>
              <select
                value={s.category}
                onChange={(e) => setItem(s.id, { category: e.target.value as any })}
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option>Languages</option>
                <option>AI &amp; Data</option>
                <option>Tools</option>
              </select>
            </label>
            <Field label="Icon" value={s.icon} onChange={(v) => setItem(s.id, { icon: v })} />
          </Card>
        ))}
      </div>
      <AddBtn onClick={add} label="Add skill" />
    </div>
  );
}

export function SoftSkillsEditor({
  value,
  onChange,
}: {
  value: PortfolioData["softSkills"];
  onChange: Update<"softSkills">;
}) {
  const setItem = (id: string, patch: Partial<PortfolioData["softSkills"][number]>) =>
    onChange(value.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const add = () =>
    onChange([...value, { id: crypto.randomUUID(), title: "New", description: "", icon: "Heart" }]);
  const del = (id: string) => onChange(value.filter((c) => c.id !== id));
  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        {value.map((c) => (
          <Card key={c.id} onDelete={() => del(c.id)}>
            <Field label="Title" value={c.title} onChange={(v) => setItem(c.id, { title: v })} />
            <Field
              label="Description"
              value={c.description}
              onChange={(v) => setItem(c.id, { description: v })}
              textarea
            />
            <Field label="Icon" value={c.icon} onChange={(v) => setItem(c.id, { icon: v })} />
          </Card>
        ))}
      </div>
      <AddBtn onClick={add} label="Add soft skill" />
    </div>
  );
}

export function ProjectsEditor({
  value,
  onChange,
}: {
  value: PortfolioData["projects"];
  onChange: Update<"projects">;
}) {
  const setItem = (id: string, patch: Partial<PortfolioData["projects"][number]>) =>
    onChange(value.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const add = () =>
    onChange([
      ...value,
      {
        id: crypto.randomUUID(),
        title: "New project",
        description: "",
        tech: [],
        thumbnail: "",
        images: [],
        github: "",
        live: "",
      },
    ]);
  const del = (id: string) => onChange(value.filter((p) => p.id !== id));
  return (
    <div className="space-y-3">
      {value.map((p) => (
        <Card key={p.id} onDelete={() => del(p.id)}>
          <div className="grid md:grid-cols-2 gap-3">
            <Field label="Title" value={p.title} onChange={(v) => setItem(p.id, { title: v })} />
            <Field
              label="Tech (comma separated)"
              value={p.tech.join(", ")}
              onChange={(v) =>
                setItem(p.id, {
                  tech: v
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
            <div className="md:col-span-2">
              <Field
                label="Description"
                value={p.description}
                onChange={(v) => setItem(p.id, { description: v })}
                textarea
              />
            </div>
            <Field
              label="Thumbnail URL"
              value={p.thumbnail}
              onChange={(v) => setItem(p.id, { thumbnail: v })}
            />
            <Field
              label="Image URLs (comma separated)"
              value={p.images.join(", ")}
              onChange={(v) =>
                setItem(p.id, {
                  images: v
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
            <Field
              label="GitHub URL"
              value={p.github ?? ""}
              onChange={(v) => setItem(p.id, { github: v })}
            />
            <Field
              label="Live URL"
              value={p.live ?? ""}
              onChange={(v) => setItem(p.id, { live: v })}
            />
          </div>
          {p.thumbnail && (
            <img
              src={p.thumbnail}
              alt=""
              className="mt-2 h-24 w-40 object-cover rounded-md border border-border"
            />
          )}
        </Card>
      ))}
      <AddBtn onClick={add} label="Add project" />
    </div>
  );
}

export function AchievementsEditor({
  value,
  onChange,
}: {
  value: PortfolioData["achievements"];
  onChange: Update<"achievements">;
}) {
  const setItem = (id: string, patch: Partial<PortfolioData["achievements"][number]>) =>
    onChange(value.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  const add = () =>
    onChange([
      ...value,
      { id: crypto.randomUUID(), title: "New", issuer: "", description: "", date: "", image: "" },
    ]);
  const del = (id: string) => onChange(value.filter((a) => a.id !== id));
  return (
    <div className="space-y-3">
      {value.map((a) => (
        <Card key={a.id} onDelete={() => del(a.id)}>
          <div className="grid md:grid-cols-2 gap-3">
            <Field label="Title" value={a.title} onChange={(v) => setItem(a.id, { title: v })} />
            <Field label="Issuer" value={a.issuer} onChange={(v) => setItem(a.id, { issuer: v })} />
            <Field label="Date" value={a.date} onChange={(v) => setItem(a.id, { date: v })} />
            <Field
              label="Image URL"
              value={a.image}
              onChange={(v) => setItem(a.id, { image: v })}
            />
            <div className="md:col-span-2">
              <Field
                label="Description"
                value={a.description}
                onChange={(v) => setItem(a.id, { description: v })}
                textarea
              />
            </div>
          </div>
          {a.image && (
            <img
              src={a.image}
              alt=""
              className="mt-2 h-24 w-40 object-cover rounded-md border border-border"
            />
          )}
        </Card>
      ))}
      <AddBtn onClick={add} label="Add achievement" />
    </div>
  );
}

export function ExperienceEditor({
  value,
  onChange,
}: {
  value: PortfolioData["experience"];
  onChange: Update<"experience">;
}) {
  const setItem = (id: string, patch: Partial<PortfolioData["experience"][number]>) =>
    onChange(value.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  const add = () =>
    onChange([
      ...value,
      { id: crypto.randomUUID(), role: "New role", company: "", period: "", description: "" },
    ]);
  const del = (id: string) => onChange(value.filter((e) => e.id !== id));
  return (
    <div className="space-y-3">
      {value.map((e) => (
        <Card key={e.id} onDelete={() => del(e.id)}>
          <div className="grid md:grid-cols-3 gap-3">
            <Field label="Role" value={e.role} onChange={(v) => setItem(e.id, { role: v })} />
            <Field
              label="Company"
              value={e.company}
              onChange={(v) => setItem(e.id, { company: v })}
            />
            <Field label="Period" value={e.period} onChange={(v) => setItem(e.id, { period: v })} />
          </div>
          <Field
            label="Description"
            value={e.description}
            onChange={(v) => setItem(e.id, { description: v })}
            textarea
          />
        </Card>
      ))}
      <AddBtn onClick={add} label="Add experience" />
    </div>
  );
}

export function EducationEditor({
  value,
  onChange,
}: {
  value: PortfolioData["education"];
  onChange: Update<"education">;
}) {
  const setItem = (id: string, patch: Partial<PortfolioData["education"][number]>) =>
    onChange(value.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  const add = () =>
    onChange([
      ...value,
      { id: crypto.randomUUID(), degree: "New", school: "", period: "", details: "" },
    ]);
  const del = (id: string) => onChange(value.filter((e) => e.id !== id));
  return (
    <div className="space-y-3">
      {value.map((e) => (
        <Card key={e.id} onDelete={() => del(e.id)}>
          <div className="grid md:grid-cols-3 gap-3">
            <Field label="Degree" value={e.degree} onChange={(v) => setItem(e.id, { degree: v })} />
            <Field label="School" value={e.school} onChange={(v) => setItem(e.id, { school: v })} />
            <Field label="Period" value={e.period} onChange={(v) => setItem(e.id, { period: v })} />
          </div>
          <Field
            label="Details"
            value={e.details}
            onChange={(v) => setItem(e.id, { details: v })}
            textarea
          />
        </Card>
      ))}
      <AddBtn onClick={add} label="Add education" />
    </div>
  );
}

export function SaveBar({
  dirty,
  onSave,
  onReset,
}: {
  dirty: boolean;
  onSave: () => void;
  onReset: () => void;
}) {
  return (
    <div className="sticky bottom-4 z-30 flex justify-end mt-6">
      <div className="glass rounded-xl shadow-glow px-3 py-2 flex items-center gap-2">
        <span className="text-xs text-muted-foreground px-2">
          {dirty ? "Unsaved changes" : "All changes saved"}
        </span>
        <button
          onClick={onReset}
          className="h-9 px-3 rounded-md border border-border text-sm hover:bg-accent"
        >
          Reset to default
        </button>
        <button
          onClick={onSave}
          disabled={!dirty}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-md gradient-brand text-primary-foreground text-sm font-medium hover-glow disabled:opacity-50"
        >
          <Save className="h-4 w-4" /> Save
        </button>
      </div>
    </div>
  );
}
