
"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/auth";
import { fetchProfile } from "@/lib/queries/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Star, Briefcase } from "lucide-react";

export function QuickStats() {
  const { user } = useAuthStore();
  const { data: profile, isLoading, isError, error } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => fetchProfile(user!.id),
    enabled: !!user,
  });

  if (isLoading) {
    return <div>Loading stats...</div>; // Or a skeleton loader
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!profile) {
    return null;
  }

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
  );
}
