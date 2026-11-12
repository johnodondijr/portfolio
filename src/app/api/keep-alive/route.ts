import { supabase } from "@/lib/supabase";

// Called once a day by a Vercel cron job (see vercel.json). Free Supabase projects pause
// after a week without activity; this small query keeps the portfolio's database awake.
export const dynamic = "force-dynamic";

export async function GET() {
  if (!supabase) return Response.json({ ok: false, reason: "Supabase is not configured" }, { status: 500 });
  const { error } = await supabase.from("projects").select("id").limit(1);
  if (error) return Response.json({ ok: false, reason: error.message }, { status: 502 });
  return Response.json({ ok: true, at: new Date().toISOString() });
}
