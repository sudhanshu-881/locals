import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// GET /api/requests - List service requests (filtered by user role)
export async function GET(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const role = searchParams.get("role") // 'seeker' or 'provider'
  const status = searchParams.get("status") // optional filter

  try {
    let query = supabase
      .from("service_requests")
      .select(`
        *,
        seeker:profiles!service_requests_seeker_id_fkey(id, first_name, last_name, avatar_url, email),
        provider:profiles!service_requests_provider_id_fkey(id, first_name, last_name, avatar_url, email),
        service:services(*)
      `)
      .order("created_at", { ascending: false })

    if (role === "seeker") {
      query = query.eq("seeker_id", user.id)
    } else if (role === "provider") {
      query = query.eq("provider_id", user.id)
    } else {
      // Return both seeker and provider requests
      query = query.or(`seeker_id.eq.${user.id},provider_id.eq.${user.id}`)
    }

    if (status) {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching requests:", error)
    return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 })
  }
}

// POST /api/requests - Create a new service request
export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { provider_id, service_id, title, description, address, latitude, longitude, scheduled_date, amount } = body

    // Validate required fields
    if (!provider_id || !title) {
      return NextResponse.json({ error: "Provider ID and title are required" }, { status: 400 })
    }

    // Check if provider exists and is a service provider
    const { data: provider, error: providerError } = await supabase
      .from("profiles")
      .select("user_type")
      .eq("id", provider_id)
      .single()

    if (providerError || !provider) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 })
    }

    if (provider.user_type !== "service_provider" && provider.user_type !== "both") {
      return NextResponse.json({ error: "User is not a service provider" }, { status: 400 })
    }

    // Create service request
    const { data: newRequest, error: requestError } = await supabase
      .from("service_requests")
      .insert({
        seeker_id: user.id,
        provider_id,
        service_id: service_id || null,
        title,
        description: description || null,
        address: address || null,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        scheduled_date: scheduled_date || null,
        amount: amount ? parseFloat(amount) : null,
        status: "pending",
      })
      .select(`
        *,
        seeker:profiles!service_requests_seeker_id_fkey(id, first_name, last_name, avatar_url),
        provider:profiles!service_requests_provider_id_fkey(id, first_name, last_name, avatar_url)
      `)
      .single()

    if (requestError) throw requestError

    return NextResponse.json(newRequest, { status: 201 })
  } catch (error) {
    console.error("Error creating request:", error)
    return NextResponse.json({ error: "Failed to create request" }, { status: 500 })
  }
}

