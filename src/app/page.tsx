import { ProjectCard } from "@/components/ProjectCard";
import { getProjects } from "@/lib/projects";
import { site } from "@/config/site";

// Re-fetch projects from Supabase at most once a minute.
export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="py-24 sm:py-32">
        <p className="text-sm text-muted">{site.role} · {site.location}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          {site.tagline}
        </h1>
      </section>

      <section id="work" className="scroll-mt-20 pb-24">
        <h2 className="mb-8 text-sm font-medium uppercase tracking-widest text-muted">Selected work</h2>
        {projects.length ? (
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <p className="text-muted">Projects coming soon.</p>
        )}
      </section>

      <section id="about" className="grid scroll-mt-20 gap-10 border-t border-line py-24 md:grid-cols-[1fr_2fr]">
        <h2 className="text-sm font-medium uppercase tracking-widest text-muted">About</h2>
        <div>
          <p className="text-xl leading-relaxed">{site.about}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {site.services.map((s) => (
              <li key={s} className="rounded-full border border-line px-4 py-1.5 text-sm">{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className="grid scroll-mt-20 gap-10 border-t border-line py-24 md:grid-cols-[1fr_2fr]">
        <h2 className="text-sm font-medium uppercase tracking-widest text-muted">Contact</h2>
        <div>
          <a href={`mailto:${site.email}`} className="text-2xl font-medium underline-offset-4 hover:underline sm:text-4xl">
            {site.email}
          </a>
          <ul className="mt-8 flex flex-wrap gap-6 text-sm text-muted">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-foreground">{s.label} ↗</a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
