import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cover } from "@/components/Cover";
import { getProject } from "@/lib/projects";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).slug);
  return project ? { title: project.title, description: project.summary ?? undefined } : {};
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProject((await params).slug);
  if (!project) notFound();

  const meta = [
    ["Client", project.client],
    ["Year", project.year],
    ["Discipline", project.category],
  ].filter(([, v]) => v);

  return (
    <article className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/#work" className="text-sm text-muted hover:text-foreground">← All work</Link>

      <header className="mt-8 grid gap-10 md:grid-cols-[2fr_1fr]">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
          {project.summary && <p className="mt-4 text-lg text-muted">{project.summary}</p>}
        </div>
        <dl className="grid grid-cols-3 gap-4 text-sm md:grid-cols-1">
          {meta.map(([label, value]) => (
            <div key={label as string}>
              <dt className="text-muted">{label}</dt>
              <dd className="mt-1">{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-lg bg-line">
        <Cover src={project.cover_url} title={project.title} priority />
      </div>

      {project.description && (
        <p className="mx-auto mt-16 max-w-2xl text-lg leading-relaxed whitespace-pre-line">{project.description}</p>
      )}

      {project.images.length > 0 && (
        <div className="mt-16 grid gap-6">
          {project.images.map((src) => (
            <Image
              key={src}
              src={src}
              alt={project.title}
              width={1600}
              height={1000}
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="h-auto w-full rounded-lg"
            />
          ))}
        </div>
      )}

      {project.tags.length > 0 && (
        <ul className="mt-16 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">{t}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
