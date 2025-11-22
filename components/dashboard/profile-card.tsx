
"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/auth";
import { fetchProfile } from "@/lib/queries/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star } from "lucide-react";

export function ProfileCard() {
  const { user } = useAuthStore();
  const { data: profile, isLoading, isError, error } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => fetchProfile(user!.id),
    enabled: !!user,
  });

  if (isLoading) {
    return <div>Loading profile...</div>; // Or a skeleton loader
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!profile) {
    return null;
  }

  const initials = `${profile?.first_name?.[0] || ""}${profile?.last_name?.[0] || ""}`.toUpperCase();

  return (
    <Card className="card-hover-lift overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="flex flex-col items-center gap-4 animate-slide-up">
          <Avatar className="h-20 w-20 ring-2 ring-primary/20 hover-3d">
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
          <div className="flex items-center justify-center gap-2 py-2 border-t border-b bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-lg animate-glow-pulse">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 animate-float" />
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
              {profile.skills.map((skill: string, index: number) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="smooth-transition hover:scale-110 hover:shadow-lg stagger-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Link href="/profile" className="w-full">
          <Button className="w-full btn-glow">Edit Profile</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
