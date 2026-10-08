import { supabase } from "./supabase";

export type Project = {
  id: string;
  slug: string;
  title: string;
  client: string | null;
  year: number | null;
  category: string | null;
  summary: string | null;
  description: string | null;
  cover_url: string | null;
  images: string[];
  tags: string[];
  featured: boolean;
};

const columns =
  "id, slug, title, client, year, category, summary, description, cover_url, images, tags, featured";

export async function getProjects(): Promise<Project[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select(columns)
    .order("sort_order")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Failed to load projects:", error.message);
    return [];
  }
  return data;
}

export async function getProject(slug: string): Promise<Project | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select(columns)
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error(`Failed to load project ${slug}:`, error.message);
    return null;
  }
  return data;
}
