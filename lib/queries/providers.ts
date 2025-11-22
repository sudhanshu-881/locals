
import { createClient } from "@/lib/supabase/server";

export const fetchProviders = async (filters: { searchQuery: string, selectedCategory: string, selectedCity: string }) => {
  const supabase = createClient();
  let query = supabase
    .from("profiles")
    .select("*")
    .eq("user_type", "service_provider");

  if (filters.searchQuery) {
    query = query.ilike('bio', `%${filters.searchQuery}%`);
  }

  if (filters.selectedCategory && filters.selectedCategory !== 'All') {
    query = query.contains('skills', [filters.selectedCategory]);
  }

  if (filters.selectedCity && filters.selectedCity !== 'All') {
    query = query.eq('city', filters.selectedCity);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
