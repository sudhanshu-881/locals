
"use client";

import { useAuthStore } from "@/lib/store/auth";
import { useProfileStore } from "@/lib/store/profile";
import { ProfileForm } from "@/components/profile/profile-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const dynamic = 'force-dynamic';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { profile } = useProfileStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user || !profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
          <ProfileForm profile={profile} userId={user.id} />
        </div>
      </div>
    </div>
  );
}
