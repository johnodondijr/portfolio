import fallback from "@/data/fallback.json";
import { supabase } from "./supabase";

export type Category = "social" | "ui" | "branding";

export type Project = {
  id: string;
  title: string;
  subtitle: string | null;
  category: Category;
  image_url: string | null;
  placeholder_label: string | null;
  placeholder_color: string;
};

export type Testimonial = {
  id: string;
  brand: string;
  quote: string;
};

// If Supabase can't be reached (for example while a free project is paused), the site
// falls back to this snapshot instead of rendering an empty section.
// Refresh it with `npm run snapshot` after changing projects or testimonials.
const fallbackProjects = fallback.projects as Project[];
const fallbackTestimonials = fallback.testimonials as Testimonial[];

export async function getProjects(): Promise<Project[]> {
  if (!supabase) return fallbackProjects;
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("id, title, subtitle, category, image_url, placeholder_label, placeholder_color")
      .order("sort_order")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data as Project[];
  } catch (e) {
    console.error("Failed to load projects, using fallback snapshot:", e);
    return fallbackProjects;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!supabase) return fallbackTestimonials;
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("id, brand, quote")
      .order("sort_order")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  } catch (e) {
    console.error("Failed to load testimonials, using fallback snapshot:", e);
    return fallbackTestimonials;
  }
}
