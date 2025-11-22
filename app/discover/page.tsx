
"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Search, Filter, X } from "lucide-react"
import Link from "next/link"

interface ServiceProvider {
  id: string
  first_name: string
  last_name: string
  avatar_url: string
  bio: string
  city: string
  state: string
  skills: string[]
  hourly_rate: number
  rating_avg: number
  total_ratings: number
}

const CATEGORIES = [
  "All", "Plumbing", "Electrical", "Cleaning", "Tutoring", "Fitness", "Photography", "Design",
];

export default function DiscoverPage() {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      const supabase = createClient();
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from("profiles").select("*").eq("user_type", "service_provider");
        if (error) throw error;
        setProviders(data || []);
        setFilteredProviders(data || []);
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProviders();
  }, []);

  useEffect(() => {
    let filtered = providers;

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        `${p.first_name} ${p.last_name}`.toLowerCase().includes(lowercasedQuery) ||
        p.bio?.toLowerCase().includes(lowercasedQuery) ||
        p.skills?.some(s => s.toLowerCase().includes(lowercasedQuery))
      );
    }

    if (selectedCity !== "All") {
      filtered = filtered.filter(p => p.city?.toLowerCase() === selectedCity.toLowerCase());
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(p => p.skills?.includes(selectedCategory));
    }

    setFilteredProviders(filtered);
  }, [searchQuery, selectedCity, selectedCategory, providers]);

  const cities = Array.from(new Set(providers.map(p => p.city).filter(Boolean)));

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCity("All");
    setSelectedCategory("All");
  };

  return (
    <div className="min-h-screen w-full animated-gradient-bg">
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0">
            <Link href="/" className="text-2xl font-bold animate-text-gradient">
                Locals
            </Link>
            <div className="flex flex-1 items-center justify-end space-x-4">
                <nav className="flex items-center space-x-1">
                    <Link href="/auth/login">
                        <Button variant="ghost">Log In</Button>
                    </Link>
                    <Link href="/auth/sign-up">
                        <Button className="font-bold rounded-full btn-glow bg-primary text-primary-foreground hover:bg-primary/90">Sign Up</Button>
                    </Link>
                </nav>
            </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center animate-slide-up">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Discover Local Professionals</h1>
            <p className="mt-4 text-lg text-muted-foreground">Find the right person for any job, right in your neighborhood.</p>
        </div>

        {/* Filters */}
        <Card className="mt-8 p-6 animate-slide-up stagger-1 border-border/60">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                <div className="relative md:col-span-3 lg:col-span-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, skill, or service..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 text-base py-3"
                    />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                    <SelectContent>
                        {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger><SelectValue placeholder="Filter by city" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Cities</SelectItem>
                        {cities.map(city => <SelectItem key={city} value={city || "unknown"}>{city}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            {(searchQuery || selectedCity !== "All" || selectedCategory !== "All") && (
                 <Button variant="ghost" onClick={clearFilters} className="mt-4 text-sm text-muted-foreground hover:text-primary">
                    <X className="w-4 h-4 mr-2"/> Clear Filters
                </Button>
            )}
        </Card>

        {/* Results */}
        <div className="mt-8">
            {isLoading ? (
                <div className="text-center py-12 text-muted-foreground">Loading professionals...</div>
            ) : filteredProviders.length === 0 ? (
                <div className="text-center py-12 animate-slide-up">
                    <h3 className="text-xl font-semibold">No Professionals Found</h3>
                    <p className="mt-2 text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProviders.map((provider, index) => (
                        <Card key={provider.id} className="overflow-hidden card-hover-effect animate-slide-up"
                              style={{ animationDelay: `${Math.min(index * 100, 500)}ms` }}>
                            <CardHeader className="p-0">
                                <Avatar className="w-full h-40 rounded-t-lg rounded-b-none object-cover">
                                    <AvatarImage src={provider.avatar_url || `https://avatar.vercel.sh/${provider.id}.png`} />
                                    <AvatarFallback className="rounded-t-lg rounded-b-none text-3xl">
                                        {provider.first_name?.[0]}{provider.last_name?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-lg truncate">{provider.first_name} {provider.last_name}</h3>
                                    <div className="flex items-center gap-1 text-sm font-bold text-primary">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        {provider.rating_avg?.toFixed(1) || "New"}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1"><MapPin className="inline h-4 w-4 mr-1"/>{provider.city}, {provider.state}</p>
                                <p className="text-sm text-muted-foreground mt-2 line-clamp-2 h-[40px]">{provider.bio}</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {provider.skills?.slice(0, 3).map(skill => (
                                        <Badge key={skill} variant="secondary">{skill}</Badge>
                                    ))}
                                </div>
                                <Link href={`/provider/${provider.id}`} className="mt-4 block">
                                    <Button className="w-full font-semibold btn-glow">View Profile</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
      </main>
    </div>
  );
}
