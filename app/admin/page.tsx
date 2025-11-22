import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin/admin-nav"
import { AdminStats } from "@/components/admin/admin-stats"
import { UsersTable } from "@/components/admin/users-table"
import { ServicesTable } from "@/components/admin/services-table"

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is admin (you can add an is_admin field to profiles table)
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile?.is_admin) {
    redirect("/dashboard")
  }

  // Fetch stats
  const { count: totalUsers } = await supabase.from("profiles").select("*", { count: "exact", head: true })

  const { count: totalServices } = await supabase.from("services").select("*", { count: "exact", head: true })

  const { count: totalMessages } = await supabase.from("messages").select("*", { count: "exact", head: true })

  const { count: totalRatings } = await supabase.from("ratings").select("*", { count: "exact", head: true })

  // Fetch recent users
  const { data: recentUsers } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10)

  // Fetch recent services
  const { data: recentServices } = await supabase
    .from("services")
    .select("*, profiles(first_name, last_name)")
    .order("created_at", { ascending: false })
    .limit(10)

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground">Manage users, services, and platform activity</p>
        </div>

        <AdminStats
          totalUsers={totalUsers || 0}
          totalServices={totalServices || 0}
          totalMessages={totalMessages || 0}
          totalRatings={totalRatings || 0}
        />

        <div className="grid gap-6 mt-8">
          <UsersTable users={recentUsers || []} />
          <ServicesTable services={recentServices || []} />
        </div>
      </main>
    </div>
  )
}
