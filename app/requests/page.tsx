"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RequestCard } from "@/components/requests/request-card"
import { Plus, Filter } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface ServiceRequest {
  id: string
  title: string
  description?: string
  status: string
  amount?: number
  scheduled_date?: string
  address?: string
  created_at: string
  seeker?: {
    id: string
    first_name?: string
    last_name?: string
    avatar_url?: string
  }
  provider?: {
    id: string
    first_name?: string
    last_name?: string
    avatar_url?: string
  }
}

export default function RequestsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<string>("all")
  const [userRole, setUserRole] = useState<"seeker" | "provider" | null>(null)

  useEffect(() => {
    const fetchUserAndRequests = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      // Get user profile to determine role
      const { data: profile } = await supabase.from("profiles").select("user_type").eq("id", user.id).single()

      if (profile?.user_type === "service_seeker") {
        setUserRole("seeker")
      } else if (profile?.user_type === "service_provider" || profile?.user_type === "both") {
        setUserRole("provider")
      }

      // Set active tab from URL or default
      const tab = searchParams.get("tab") || "all"
      setActiveTab(tab)

      // Fetch requests
      await fetchRequests(tab)
    }

    fetchUserAndRequests()
  }, [router, searchParams])

  const fetchRequests = async (tab: string) => {
    setIsLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: profile } = await supabase.from("profiles").select("user_type").eq("id", user.id).single()

      const role = profile?.user_type === "service_seeker" ? "seeker" : "provider"
      const statusParam = tab !== "all" ? tab : null

      const queryParams = new URLSearchParams({ role })
      if (statusParam) {
        queryParams.append("status", statusParam)
      }

      const response = await fetch(`/api/requests?${queryParams.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch requests")
      }

      const data = await response.json()
      setRequests(data || [])
    } catch (error) {
      console.error("Error fetching requests:", error)
      toast.error("Failed to load requests")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/requests?tab=${value}`)
    fetchRequests(value)
  }

  if (isLoading && requests.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Loading requests...</p>
          </div>
        </div>
      </div>
    )
  }

  const filteredRequests = activeTab === "all" ? requests : requests.filter((r) => r.status === activeTab)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Service Requests</h1>
            <p className="text-muted-foreground">Manage your service requests and bookings</p>
          </div>
          {userRole === "seeker" && (
            <Link href="/discover">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Request
              </Button>
            </Link>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredRequests.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground mb-4">No requests found</p>
                  {userRole === "seeker" && (
                    <Link href="/discover">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Request
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredRequests.map((request) => (
                  <RequestCard key={request.id} request={request} role={userRole || "seeker"} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

