import { publicEnv } from "@/lib/env";

export function isSupabaseConfigured() {
  return Boolean(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL &&
      publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
