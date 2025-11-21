import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/requests/[id] - Get request details
export async function GET(request: Request, { params }: RouteParams) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params

    const { data, error } = await supabase
      .from("service_requests")
      .select(`
        *,
        seeker:profiles!service_requests_seeker_id_fkey(id, first_name, last_name, avatar_url, email, phone),
        provider:profiles!service_requests_provider_id_fkey(id, first_name, last_name, avatar_url, email, phone),
        service:services(*),
        payments(*)
      `)
      .eq("id", id)
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 })
    }

    // Check if user has access to this request
    if (data.seeker_id !== user.id && data.provider_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching request:", error)
    return NextResponse.json({ error: "Failed to fetch request" }, { status: 500 })
  }
}

// PATCH /api/requests/[id] - Update request status
export async function PATCH(request: Request, { params }: RouteParams) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const { status, amount } = body

    // Validate status
    const validStatuses = ["pending", "accepted", "in_progress", "completed", "cancelled"]
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    // Get current request to check permissions
    const { data: currentRequest, error: fetchError } = await supabase
      .from("service_requests")
      .select("*")
      .eq("id", id)
      .single()

    if (fetchError || !currentRequest) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 })
    }

    // Check permissions
    const isProvider = currentRequest.provider_id === user.id
    const isSeeker = currentRequest.seeker_id === user.id

    if (!isProvider && !isSeeker) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Status transition rules
    if (status) {
      if (status === "accepted" && currentRequest.status !== "pending") {
        return NextResponse.json({ error: "Can only accept pending requests" }, { status: 400 })
      }

      if (status === "cancelled" && !isSeeker && currentRequest.status !== "pending") {
        return NextResponse.json({ error: "Only seeker can cancel non-pending requests" }, { status: 400 })
      }

      // Only provider can accept, mark in_progress, or complete
      if ((status === "accepted" || status === "in_progress" || status === "completed") && !isProvider) {
        return NextResponse.json({ error: "Only provider can update request to this status" }, { status: 403 })
      }
    }

    // Update request
    const updateData: any = {}
    if (status) updateData.status = status
    if (amount !== undefined) updateData.amount = parseFloat(amount)

    const { data: updatedRequest, error: updateError } = await supabase
      .from("service_requests")
      .update(updateData)
      .eq("id", id)
      .select(`
        *,
        seeker:profiles!service_requests_seeker_id_fkey(id, first_name, last_name, avatar_url),
        provider:profiles!service_requests_provider_id_fkey(id, first_name, last_name, avatar_url)
      `)
      .single()

    if (updateError) throw updateError

    return NextResponse.json(updatedRequest)
  } catch (error) {
    console.error("Error updating request:", error)
    return NextResponse.json({ error: "Failed to update request" }, { status: 500 })
  }
}

// DELETE /api/requests/[id] - Cancel/delete request (only seeker, only pending)
export async function DELETE(request: Request, { params }: RouteParams) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params

    // Get current request
    const { data: currentRequest, error: fetchError } = await supabase
      .from("service_requests")
      .select("*")
      .eq("id", id)
      .single()

    if (fetchError || !currentRequest) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 })
    }

    // Only seeker can delete, and only if pending
    if (currentRequest.seeker_id !== user.id) {
      return NextResponse.json({ error: "Only seeker can cancel requests" }, { status: 403 })
    }

    if (currentRequest.status !== "pending") {
      return NextResponse.json({ error: "Can only cancel pending requests" }, { status: 400 })
    }

    // Update status to cancelled instead of deleting
    const { data: cancelledRequest, error: updateError } = await supabase
      .from("service_requests")
      .update({ status: "cancelled" })
      .eq("id", id)
      .select()
      .single()

    if (updateError) throw updateError

    return NextResponse.json(cancelledRequest)
  } catch (error) {
    console.error("Error cancelling request:", error)
    return NextResponse.json({ error: "Failed to cancel request" }, { status: 500 })
  }
}
