import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Star, Briefcase } from "lucide-react"

interface QuickStatsProps {
  profile: any
}

export function QuickStats({ profile }: QuickStatsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome Back!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {profile?.user_type === "service_provider"
              ? "Manage your services and connect with clients looking for your expertise."
              : "Find skilled professionals in your area to help with your projects."}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Unread messages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile?.rating_avg || "N/A"}</div>
            <p className="text-xs text-muted-foreground">{profile?.total_ratings || 0} reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Active services</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
