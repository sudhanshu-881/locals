
"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestCard } from "@/components/requests/request-card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Tables } from "@/lib/types/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/lib/store/auth";

interface RequestsListProps {
  user_type: "seeker" | "provider" | undefined;
  tab: string;
}

export default function RequestsList({ user_type, tab }: RequestsListProps) {
  const router = useRouter();
  const supabase = createClient();
  const { user } = useAuthStore();

  const { data: requests, isLoading } = useQuery<Tables<"requests">[]>({ 
    queryKey: ['requests', tab, user?.id],
    queryFn: async () => {
      if(!user) return [];

      let query = supabase.from('requests').select('*, requester:requester_id!inner(*), provider:provider_id!inner(*), service:service_id(*)');

      if(user_type === 'seeker') {
        query = query.eq('requester_id', user.id);
      } else if (user_type === 'provider') {
        query = query.eq('provider_id', user.id);
      }

      if (tab !== 'all') {
        query = query.eq('status', tab);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error(error);
        return [];
      }

      return data || [];
    },
    enabled: !!user
  });

  const handleTabChange = (value: string) => {
    router.push(`/requests?tab=${value}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Service Requests</h1>
            <p className="text-muted-foreground">Manage your service requests and bookings</p>
          </div>
          {user_type === "seeker" && (
            <Link href="/discover">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Request
              </Button>
            </Link>
          )}
        </div>

        <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={tab} className="mt-6">
            {isLoading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            ) : requests && requests.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground mb-4">No requests found</p>
                  {user_type === "seeker" && (
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
                {requests && requests.map((request) => (
                  <RequestCard key={request.id} request={request} role={user_type || "seeker"} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
