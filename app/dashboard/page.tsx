import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { ProfileCard } from "@/components/dashboard/profile-card"
import { QuickStats } from "@/components/dashboard/quick-stats"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile?.city || !profile?.state) {
    redirect("/setup-location")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav user={user} profile={profile} />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <ProfileCard profile={profile} />
          </div>
          <div className="md:col-span-2">
            <QuickStats profile={profile} />
          </div>
        </div>
      </main>
    </div>
  )
}
