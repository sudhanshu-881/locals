"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, MessageSquare, Heart } from "lucide-react"
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
  "All",
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Tutoring",
  "Fitness",
  "Photography",
  "Writing",
  "Design",
  "Other",
]

export default function DiscoverPage() {
  const [providers, setProviders] = useState<ServiceProvider[]>([])
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedCity, setSelectedCity] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchProviders = async () => {
      const supabase = createClient()

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_type", "service_provider")
          .or("user_type.eq.both")

        if (error) throw error

        setProviders(data || [])
        setFilteredProviders(data || [])
      } catch (error) {
        console.error("Error fetching providers:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProviders()
  }, [])

  useEffect(() => {
    let filtered = providers

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          `${p.first_name} ${p.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.skills?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (selectedCity) {
      filtered = filtered.filter((p) => p.city?.toLowerCase() === selectedCity.toLowerCase())
    }

    setFilteredProviders(filtered)
  }, [searchQuery, selectedCity, providers])

  const cities = Array.from(new Set(providers.map((p) => p.city).filter(Boolean)))

  const handleToggleFavorite = (providerId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(providerId)) {
      newFavorites.delete(providerId)
    } else {
      newFavorites.add(providerId)
    }
    setFavorites(newFavorites)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6 animate-slide-up">
          <h1 className="text-3xl font-bold mb-6 text-primary">Discover Services</h1>

          <div className="grid gap-4 md:grid-cols-3">
            <Input
              placeholder="Search by name, skill, or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="md:col-span-2 smooth-transition focus:ring-2 focus:ring-primary/50"
            />
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="smooth-transition">
                <SelectValue placeholder="Filter by city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city || "unknown"}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground animate-pulse">Loading services...</p>
          </div>
        ) : filteredProviders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 animate-slide-up">
            <p className="text-muted-foreground mb-4">No services found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCity("")
              }}
              variant="outline"
              className="smooth-transition hover:bg-primary/10"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProviders.map((provider, index) => (
              <Card
                key={provider.id}
                className="overflow-hidden card-hover-lift stagger-item"
                style={{ animationDelay: `${(index % 6) * 0.1}s` }}
              >
                <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-accent/5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <Avatar className="ring-2 ring-primary/20 hover-3d">
                        <AvatarImage src={provider.avatar_url || "/placeholder.svg"} />
                        <AvatarFallback>
                          {provider.first_name?.[0]}
                          {provider.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">
                          {provider.first_name} {provider.last_name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 animate-float" />
                          <span className="font-medium">{provider.rating_avg || "N/A"}</span>
                          <span className="text-muted-foreground">({provider.total_ratings})</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleFavorite(provider.id)}
                      className="text-muted-foreground hover:text-red-500 transition-all duration-300 hover:scale-125 animate-float"
                    >
                      <Heart className="h-5 w-5" fill={favorites.has(provider.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 pt-4">
                  {provider.bio && <p className="text-sm text-muted-foreground line-clamp-2">{provider.bio}</p>}

                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {provider.city}, {provider.state}
                  </div>

                  {provider.skills && provider.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {provider.skills.slice(0, 3).map((skill, idx) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs smooth-transition hover:scale-110"
                          style={{ animationDelay: `${idx * 0.05}s` }}
                        >
                          {skill}
                        </Badge>
                      ))}
                      {provider.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{provider.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  {provider.hourly_rate && (
                    <div className="text-sm font-semibold text-primary animate-glow-pulse">
                      ${provider.hourly_rate}/hour
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Link href={`/provider/${provider.id}`} className="flex-1">
                      <Button variant="outline" className="w-full bg-transparent smooth-transition hover:bg-primary/10">
                        View Profile
                      </Button>
                    </Link>
                    <Link href={`/messages?to=${provider.id}`}>
                      <Button
                        size="icon"
                        variant="outline"
                        className="smooth-transition hover:bg-accent/10 hover:text-accent bg-transparent"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
