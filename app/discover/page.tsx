
import { createClient } from "@/lib/supabase/server";
import { fetchProviders } from "@/lib/queries/providers";
import DiscoverClient from "@/components/discover/discover-client";

export const dynamic = 'force-dynamic';

const CATEGORIES = [
  "All", "Plumbing", "Electrical", "Cleaning", "Tutoring", "Fitness", "Photography", "Design",
];

export default async function DiscoverPage({ searchParams }: { searchParams: { searchQuery?: string, category?: string, city?: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const searchQuery = searchParams.searchQuery || "";
  const selectedCategory = searchParams.category || "All";
  const selectedCity = searchParams.city || "All";

  const providers = await fetchProviders({ searchQuery, selectedCategory, selectedCity });

  const { data: allProvidersForCities } = await supabase.from("profiles").select("city").eq("user_type", "service_provider");
  const cities = Array.from(new Set(allProvidersForCities?.map(p => p.city).filter(Boolean))) as string[];

  return (
    <DiscoverClient
      user={user}
      initialProviders={providers}
      cities={cities}
      categories={CATEGORIES}
      searchQuery={searchQuery}
      selectedCategory={selectedCategory}
      selectedCity={selectedCity}
    />
  );
}
