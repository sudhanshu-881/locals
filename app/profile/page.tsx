import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ProfileForm } from "@/components/profile/profile-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

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
  )
}
