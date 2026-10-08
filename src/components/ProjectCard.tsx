import Link from "next/link";
import type { Project } from "@/lib/projects";
import { Cover } from "./Cover";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-line">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
          <Cover src={project.cover_url} title={project.title} />
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-medium">{project.title}</h3>
        <span className="shrink-0 text-sm text-muted">
          {[project.category, project.year].filter(Boolean).join(" · ")}
        </span>
      </div>
      {project.summary && <p className="mt-1 text-sm text-muted">{project.summary}</p>}
    </Link>
  );
}
