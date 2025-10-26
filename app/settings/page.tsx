import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function SettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
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
          <h1 className="text-3xl font-bold mb-8">Settings</h1>

          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-lg font-semibold mb-2">Account Information</h2>
              <p className="text-muted-foreground mb-4">Email: {user.email}</p>
              <p className="text-sm text-muted-foreground">User ID: {user.id}</p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-lg font-semibold mb-4">Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Email Notifications</label>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Message Notifications</label>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-lg font-semibold mb-4">Danger Zone</h2>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
