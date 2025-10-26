import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface User {
  id: string
  first_name: string
  last_name: string
  avatar_url: string
  email: string
  city: string
  user_type: string
  rating_avg: number
  total_ratings: number
  created_at: string
}

interface UsersTableProps {
  users: User[]
}

export function UsersTable({ users }: UsersTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">User</th>
                <th className="text-left py-3 px-4 font-semibold">Email</th>
                <th className="text-left py-3 px-4 font-semibold">Type</th>
                <th className="text-left py-3 px-4 font-semibold">Location</th>
                <th className="text-left py-3 px-4 font-semibold">Rating</th>
                <th className="text-left py-3 px-4 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar_url || "/placeholder.svg"} />
                        <AvatarFallback>
                          {user.first_name?.[0]}
                          {user.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {user.first_name} {user.last_name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary" className="capitalize">
                      {user.user_type?.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{user.city || "N/A"}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{user.rating_avg || "N/A"}</span>
                      <span className="text-xs text-muted-foreground">({user.total_ratings})</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{new Date(user.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
