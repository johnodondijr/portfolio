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

export async function getProjects(): Promise<Project[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, subtitle, category, image_url, placeholder_label, placeholder_color")
    .order("sort_order")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Failed to load projects:", error.message);
    return [];
  }
  return data as Project[];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("testimonials")
    .select("id, brand, quote")
    .order("sort_order")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Failed to load testimonials:", error.message);
    return [];
  }
  return data;
}
