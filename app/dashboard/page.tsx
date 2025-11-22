
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/auth";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { QuickStats } from "@/components/dashboard/quick-stats";
import { fetchProfile } from "@/lib/queries/profile";

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  const { data: profile, isLoading, isError, error } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => fetchProfile(user!.id),
    enabled: !!user,
  });

  useEffect(() => {
    if (profile && (!profile.city || !profile.state)) {
      router.push("/setup-location");
    }
  }, [profile, router]);

  if (isLoading || !profile || !user) {
    return <div>Loading...</div>; // Or a skeleton loader
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <ProfileCard />
          </div>
          <div className="md:col-span-2">
            <QuickStats />
          </div>
        </div>
      </main>
    </div>
  );
}
