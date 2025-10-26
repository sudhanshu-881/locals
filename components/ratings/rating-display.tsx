import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RatingDisplayProps {
  rating: number
  totalRatings: number
  reviews?: Array<{
    id: string
    rating: number
    review: string | null
    created_at: string
  }>
}

export function RatingDisplay({ rating, totalRatings, reviews = [] }: RatingDisplayProps) {
  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach((r) => {
      distribution[r.rating as keyof typeof distribution]++
    })
    return distribution
  }

  const distribution = getRatingDistribution()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews & Ratings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Rating */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold">{rating.toFixed(1)}</div>
            <div className="flex justify-center mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{totalRatings} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-sm w-8">{stars}★</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{
                      width: `${totalRatings > 0 ? (distribution[stars as keyof typeof distribution] / totalRatings) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8 text-right">
                  {distribution[stars as keyof typeof distribution]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Reviews */}
        {reviews.length > 0 && (
          <div className="space-y-4 border-t pt-4">
            {reviews.map((review) => (
              <div key={review.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                {review.review && <p className="text-sm text-muted-foreground">{review.review}</p>}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
