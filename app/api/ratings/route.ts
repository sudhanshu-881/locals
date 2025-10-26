import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { ratee_id, rating, review, service_id } = await request.json()

  if (!ratee_id || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 })
  }

  try {
    // Insert rating
    const { data: newRating, error: ratingError } = await supabase
      .from("ratings")
      .insert({
        rater_id: user.id,
        ratee_id,
        rating,
        review: review || null,
        service_id: service_id || null,
      })
      .select()
      .single()

    if (ratingError) throw ratingError

    // Update provider's average rating
    const { data: allRatings } = await supabase.from("ratings").select("rating").eq("ratee_id", ratee_id)

    if (allRatings && allRatings.length > 0) {
      const avgRating = allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length

      await supabase
        .from("profiles")
        .update({
          rating_avg: Math.round(avgRating * 100) / 100,
          total_ratings: allRatings.length,
        })
        .eq("id", ratee_id)
    }

    return NextResponse.json(newRating)
  } catch (error) {
    console.error("Error creating rating:", error)
    return NextResponse.json({ error: "Failed to create rating" }, { status: 500 })
  }
}
