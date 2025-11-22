
"use client"

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Search, X } from "lucide-react";
import Link from "next/link";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { Tables } from "@/lib/types/supabase";
import { User } from "@supabase/supabase-js";

interface DiscoverClientProps {
  user: User | null;
  initialProviders: Tables<"profiles">[];
  cities: string[];
  categories: string[];
  searchQuery: string;
  selectedCategory: string;
  selectedCity: string;
}

export default function DiscoverClient({
  user,
  initialProviders,
  cities,
  categories,
  searchQuery: initialSearchQuery,
  selectedCategory: initialSelectedCategory,
  selectedCity: initialSelectedCity,
}: DiscoverClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  const handleFilterChange = (type: "category" | "city", value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value === "All") {
      newParams.delete(type);
    } else {
      newParams.set(type, value);
    }
    router.push(`/discover?${newParams.toString()}`);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      newParams.set("searchQuery", searchQuery);
    } else {
      newParams.delete("searchQuery");
    }
    router.push(`/discover?${newParams.toString()}`);
  };
  
  const clearFilters = () => {
    router.push("/discover");
  };

  return (
    <div className="min-h-screen w-full animated-gradient-bg">
      {user ? <DashboardNav /> : (
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
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="text-center animate-slide-up">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Discover Local Professionals</h1>
          <p className="mt-4 text-lg text-muted-foreground">Find the right person for any job, right in your neighborhood.</p>
        </div>

        <Card className="mt-8 p-6 animate-slide-up stagger-1 border-border/60">
          <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            <div className="relative md:col-span-3 lg:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, skill, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-base py-3"
              />
            </div>
            <Select value={initialSelectedCategory} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
              <SelectContent>
                {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={initialSelectedCity} onValueChange={(value) => handleFilterChange("city", value)}>
              <SelectTrigger><SelectValue placeholder="Filter by city" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Cities</SelectItem>
                {cities.map(city => <SelectItem key={city} value={city || "unknown"}>{city}</SelectItem>)}
              </SelectContent>
            </Select>
          </form>
          {(initialSearchQuery || initialSelectedCity !== "All" || initialSelectedCategory !== "All") && (
            <Button variant="ghost" onClick={clearFilters} className="mt-4 text-sm text-muted-foreground hover:text-primary">
              <X className="w-4 h-4 mr-2" /> Clear Filters
            </Button>
          )}
        </Card>

        <div className="mt-8">
          {initialProviders.length === 0 ? (
            <div className="text-center py-12 animate-slide-up">
              <h3 className="text-xl font-semibold">No Professionals Found</h3>
              <p className="mt-2 text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {initialProviders.map((provider, index) => (
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
                    <p className="text-sm text-muted-foreground mt-1"><MapPin className="inline h-4 w-4 mr-1" />{provider.city}, {provider.state}</p>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2 h-[40px]">{provider.bio}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(provider.skills as string[])?.slice(0, 3).map(skill => (
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
