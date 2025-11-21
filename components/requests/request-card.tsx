"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, DollarSign, ArrowRight } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface RequestCardProps {
  request: {
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
  role: "seeker" | "provider"
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

export function RequestCard({ request, role }: RequestCardProps) {
  const otherUser = role === "seeker" ? request.provider : request.seeker
  const otherUserName = otherUser
    ? `${otherUser.first_name || ""} ${otherUser.last_name || ""}`.trim() || "Unknown"
    : "Unknown"

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{request.title}</h3>
              <Badge className={statusColors[request.status] || statusColors.pending}>{statusLabels[request.status]}</Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={otherUser?.avatar_url} />
                  <AvatarFallback>{otherUserName[0]}</AvatarFallback>
                </Avatar>
                <span>{otherUserName}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {request.description && <p className="text-sm text-muted-foreground line-clamp-2">{request.description}</p>}

        <div className="flex flex-wrap gap-2 text-sm">
          {request.address && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="truncate max-w-[200px]">{request.address}</span>
            </div>
          )}
          {request.amount && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <DollarSign className="h-3 w-3" />
              <span>₹{request.amount.toLocaleString()}</span>
            </div>
          )}
          {request.scheduled_date && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{new Date(request.scheduled_date).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        <Link href={`/requests/${request.id}`}>
          <Button variant="outline" className="w-full group">
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

