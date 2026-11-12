// Saves the published projects and testimonials from Supabase into src/data/fallback.json,
// which the site uses if the database can't be reached. Run with: npm run snapshot
import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "node:fs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (see .env.example).");

const supabase = createClient(url, key);
const pick = async (table, columns) => {
  const { data, error } = await supabase.from(table).select(columns).order("sort_order").order("created_at", { ascending: false });
  if (error) throw new Error(`${table}: ${error.message}`);
  return data;
};

const snapshot = {
  projects: await pick("projects", "id, title, subtitle, category, image_url, placeholder_label, placeholder_color"),
  testimonials: await pick("testimonials", "id, brand, quote"),
};
writeFileSync(new URL("../src/data/fallback.json", import.meta.url), JSON.stringify(snapshot, null, 2) + "\n");
console.log(`Saved ${snapshot.projects.length} projects and ${snapshot.testimonials.length} testimonials.`);
