import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Star } from "lucide-react"

interface ProfileCardProps {
  profile: any
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const initials = `${profile?.first_name?.[0] || ""}${profile?.last_name?.[0] || ""}`.toUpperCase()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt={profile?.first_name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-lg font-semibold">
              {profile?.first_name} {profile?.last_name}
            </h3>
            <p className="text-sm text-muted-foreground">{profile?.email}</p>
          </div>
        </div>

        {profile?.rating_avg > 0 && (
          <div className="flex items-center justify-center gap-2 py-2 border-t border-b">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{profile?.rating_avg.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">({profile?.total_ratings} reviews)</span>
          </div>
        )}

        {profile?.city && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{profile?.city}</p>
          </div>
        )}

        {profile?.skills && profile.skills.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Skills</p>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill: string) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Link href="/profile" className="w-full">
          <Button className="w-full">Edit Profile</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
