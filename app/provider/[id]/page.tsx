import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { RatingForm } from "@/components/ratings/rating-form"
import { RatingDisplay } from "@/components/ratings/rating-display"

interface ProviderPageProps {
  params: Promise<{ id: string }>
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: provider, error } = await supabase.from("profiles").select("*").eq("id", id).single()

  if (error || !provider) {
    notFound()
  }

  const { data: services } = await supabase.from("services").select("*").eq("provider_id", id).eq("is_active", true)

  const { data: ratings } = await supabase
    .from("ratings")
    .select("*")
    .eq("ratee_id", id)
    .order("created_at", { ascending: false })

  const initials = `${provider.first_name?.[0] || ""}${provider.last_name?.[0] || ""}`.toUpperCase()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/discover">
          <Button variant="ghost" className="mb-6">
            Back to Services
          </Button>
        </Link>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={provider.avatar_url || "/placeholder.svg"} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h1 className="text-2xl font-bold">
                      {provider.first_name} {provider.last_name}
                    </h1>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{provider.rating_avg || "N/A"}</span>
                      <span className="text-sm text-muted-foreground">({provider.total_ratings} reviews)</span>
                    </div>
                  </div>

                  <div className="w-full space-y-2 border-t pt-4">
                    {provider.city && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {provider.city}, {provider.state}
                        </span>
                      </div>
                    )}
                    {provider.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{provider.phone}</span>
                      </div>
                    )}
                    {provider.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{provider.email}</span>
                      </div>
                    )}
                  </div>

                  {provider.hourly_rate && (
                    <div className="w-full border-t pt-4">
                      <div className="text-lg font-bold text-primary">${provider.hourly_rate}/hour</div>
                    </div>
                  )}

                  <Link href={`/messages?to=${provider.id}`} className="w-full">
                    <Button className="w-full">Send Message</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            {provider.bio && (
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{provider.bio}</p>
                </CardContent>
              </Card>
            )}

            {provider.skills && provider.skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {provider.skills.map((skill) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {services && services.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="border-b pb-4 last:border-0">
                      <h4 className="font-semibold">{service.title}</h4>
                      {service.description && (
                        <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="secondary">{service.category}</Badge>
                        {service.hourly_rate && <span className="font-semibold">${service.hourly_rate}/hr</span>}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <RatingDisplay
              rating={provider.rating_avg || 0}
              totalRatings={provider.total_ratings || 0}
              reviews={ratings || []}
            />

            <RatingForm rateeId={id} />
          </div>
        </div>
      </div>
    </div>
  )
}
