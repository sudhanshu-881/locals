
import { createClient } from "@/lib/supabase/server";

export const fetchProviderWithDetails = async (providerId: string) => {
  const supabase = createClient();
  const { data: provider, error } = await supabase
    .from("profiles")
    .select(`
      *,
      services:services(*),
      ratings:ratings!ratee_id(*)
    `)
    .eq("id", providerId)
    .eq("services.is_active", true)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return provider;
};
