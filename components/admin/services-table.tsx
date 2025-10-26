import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Service {
  id: string
  title: string
  category: string
  hourly_rate: number
  is_active: boolean
  created_at: string
  profiles: {
    first_name: string
    last_name: string
  }
}

interface ServicesTableProps {
  services: Service[]
}

export function ServicesTable({ services }: ServicesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Services</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Service</th>
                <th className="text-left py-3 px-4 font-semibold">Provider</th>
                <th className="text-left py-3 px-4 font-semibold">Category</th>
                <th className="text-left py-3 px-4 font-semibold">Rate</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Created</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium">{service.title}</td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {service.profiles?.first_name} {service.profiles?.last_name}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary">{service.category}</Badge>
                  </td>
                  <td className="py-3 px-4 font-semibold">${service.hourly_rate || "N/A"}</td>
                  <td className="py-3 px-4">
                    <Badge variant={service.is_active ? "default" : "secondary"}>
                      {service.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {new Date(service.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
