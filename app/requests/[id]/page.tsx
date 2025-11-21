"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Clock, MapPin, DollarSign, CheckCircle, XCircle, Calendar } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { format } from "date-fns"

interface ServiceRequest {
  id: string
  title: string
  description?: string
  status: string
  amount?: number
  scheduled_date?: string
  address?: string
  latitude?: number
  longitude?: number
  created_at: string
  updated_at: string
  seeker?: {
    id: string
    first_name?: string
    last_name?: string
    avatar_url?: string
    email?: string
    phone?: string
  }
  provider?: {
    id: string
    first_name?: string
    last_name?: string
    avatar_url?: string
    email?: string
    phone?: string
  }
  service?: {
    id: string
    title: string
    category: string
  }
  payments?: Array<{
    id: string
    status: string
    amount: number
  }>
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  accepted: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  in_progress: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

const statusLabels: Record<string, string> = {
  pending: "Pending",
  accepted: "Accepted",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
}

export default function RequestDetailPage() {
  const router = useRouter()
  const params = useParams()
  const supabase = createClient()
  const [request, setRequest] = useState<ServiceRequest | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<"seeker" | "provider" | null>(null)

  useEffect(() => {
    const fetchRequest = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      setCurrentUserId(user.id)

      const id = params.id as string
      const response = await fetch(`/api/requests/${id}`)

      if (!response.ok) {
        if (response.status === 404) {
          toast.error("Request not found")
          router.push("/requests")
        } else {
          toast.error("Failed to load request")
        }
        return
      }

      const data = await response.json()
      setRequest(data)

      // Determine user role
      if (data.seeker_id === user.id) {
        setUserRole("seeker")
      } else if (data.provider_id === user.id) {
        setUserRole("provider")
      }

      setIsLoading(false)
    }

    fetchRequest()
  }, [params.id, router])

  const handleStatusUpdate = async (newStatus: string) => {
    if (!request) return

    setIsUpdating(true)
    try {
      const response = await fetch(`/api/requests/${request.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update status")
      }

      const updated = await response.json()
      setRequest(updated)
      toast.success(`Request ${newStatus} successfully`)
      router.refresh()
    } catch (error) {
      console.error("Error updating status:", error)
      toast.error(error instanceof Error ? error.message : "Failed to update status")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCancel = async () => {
    if (!request) return
    if (!confirm("Are you sure you want to cancel this request?")) return

    setIsUpdating(true)
    try {
      const response = await fetch(`/api/requests/${request.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to cancel request")
      }

      toast.success("Request cancelled")
      router.push("/requests")
    } catch (error) {
      console.error("Error cancelling request:", error)
      toast.error(error instanceof Error ? error.message : "Failed to cancel request")
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Loading request...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">Request not found</p>
              <Link href="/requests">
                <Button>Back to Requests</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const otherUser = userRole === "seeker" ? request.provider : request.seeker
  const otherUserName = otherUser
    ? `${otherUser.first_name || ""} ${otherUser.last_name || ""}`.trim() || "Unknown"
    : "Unknown"

  const canAccept = userRole === "provider" && request.status === "pending"
  const canStart = userRole === "provider" && request.status === "accepted"
  const canComplete = userRole === "provider" && request.status === "in_progress"
  const canCancel = userRole === "seeker" && request.status === "pending"

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/requests">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Requests
          </Button>
        </Link>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{request.title}</CardTitle>
                    <Badge className={statusColors[request.status] || statusColors.pending}>
                      {statusLabels[request.status]}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {request.description && (
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{request.description}</p>
                  </div>
                )}

                {request.service && (
                  <div>
                    <h3 className="font-semibold mb-2">Service</h3>
                    <Badge variant="secondary">{request.service.category}</Badge>
                  </div>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  {request.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-semibold">Address</p>
                        <p className="text-sm text-muted-foreground">{request.address}</p>
                      </div>
                    </div>
                  )}

                  {request.scheduled_date && (
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-semibold">Scheduled Date</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(request.scheduled_date), "PPP p")}
                        </p>
                      </div>
                    </div>
                  )}

                  {request.amount && (
                    <div className="flex items-start gap-2">
                      <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-semibold">Amount</p>
                        <p className="text-sm text-muted-foreground">₹{request.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-semibold">Created</p>
                      <p className="text-sm text-muted-foreground">{format(new Date(request.created_at), "PPP")}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{userRole === "seeker" ? "Provider" : "Seeker"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={otherUser?.avatar_url} />
                    <AvatarFallback>{otherUserName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{otherUserName}</p>
                    {otherUser?.email && <p className="text-sm text-muted-foreground">{otherUser.email}</p>}
                  </div>
                </div>
                {otherUser?.phone && (
                  <div className="text-sm text-muted-foreground">
                    <p>Phone: {otherUser.phone}</p>
                  </div>
                )}
                <Link href={`/messages?to=${otherUser?.id}`} className="mt-4 block">
                  <Button variant="outline" className="w-full">
                    Send Message
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {canAccept && (
                  <Button
                    onClick={() => handleStatusUpdate("accepted")}
                    disabled={isUpdating}
                    className="w-full"
                    variant="default"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Accept Request
                  </Button>
                )}

                {canStart && (
                  <Button
                    onClick={() => handleStatusUpdate("in_progress")}
                    disabled={isUpdating}
                    className="w-full"
                    variant="default"
                  >
                    Start Service
                  </Button>
                )}

                {canComplete && (
                  <Button
                    onClick={() => handleStatusUpdate("completed")}
                    disabled={isUpdating}
                    className="w-full"
                    variant="default"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Completed
                  </Button>
                )}

                {canCancel && (
                  <Button
                    onClick={handleCancel}
                    disabled={isUpdating}
                    className="w-full"
                    variant="destructive"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel Request
                  </Button>
                )}

                {!canAccept && !canStart && !canComplete && !canCancel && (
                  <p className="text-sm text-muted-foreground text-center">No actions available</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

