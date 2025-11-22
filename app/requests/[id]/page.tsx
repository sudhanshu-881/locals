
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/lib/store/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Clock, MapPin, DollarSign, CheckCircle, XCircle, Calendar, CreditCard } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { format } from "date-fns";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Tables } from "@/lib/types/supabase";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);


const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  accepted: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  in_progress: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  accepted: "Accepted",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const CheckoutForm = ({ request, onPaymentSuccess }: { request: Tables<"requests">, onPaymentSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const response = await fetch('/api/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requestId: request.id, amount: request.amount! * 100, currency: 'inr' }),
    });

    const { clientSecret, error: backendError } = await response.json();

    if (backendError) {
      toast.error(backendError);
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement)!;

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (stripeError) {
      toast.error(stripeError.message);
      setIsProcessing(false);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      toast.success('Payment successful!');
      onPaymentSuccess();
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-2 border rounded-md" />
      <Button type="submit" disabled={!stripe || isProcessing} className="w-full">
        {isProcessing ? 'Processing...' : `Pay ₹${request.amount}`}
      </Button>
    </form>
  );
};

export default function RequestDetailPage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [showPayment, setShowPayment] = useState(false);
  const id = params.id as string;

  const { data: request, isLoading, isError } = useQuery<Tables<"requests"> | null>({
    queryKey: ["request", id],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from('requests').select('*, requester:requester_id(*), provider:provider_id(*), service:service_id(*), payments(*)').eq('id', id).single();
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  const updateStatusMutation = useMutation({
    mutationFn: async ({ requestId, status }: { requestId: string, status: string }) => {
      const supabase = createClient();
      const { data, error } = await supabase.from('requests').update({ status }).eq('id', requestId).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["request", id], data);
      toast.success(`Request ${data.status} successfully`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async (requestId: string) => {
        const supabase = createClient();
        const { error } = await supabase.from('requests').delete().eq('id', requestId);
        if (error) throw new Error(error.message);
        return true;
      },
    onSuccess: () => {
      toast.success("Request cancelled");
      router.push("/requests");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    updateStatusMutation.mutate({ requestId: id, status: "in_progress" });
  };

  const userRole = request?.requester_id === user?.id ? "seeker" : "provider";
  const otherUser = userRole === "seeker" ? request?.provider : request?.requester;
  const otherUserName = otherUser ? `${otherUser.first_name || ""} ${otherUser.last_name || ""}`.trim() || "Unknown" : "Unknown";

  const canAccept = userRole === "provider" && request?.status === "pending";
  const canPay = userRole === "seeker" && request?.status === "accepted";
  const canStart = userRole === "provider" && request?.status === "in_progress";
  const canComplete = userRole === "provider" && request?.status === "in_progress";
  const canCancel = userRole === "seeker" && request?.status === "pending";

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading request...</p></div>;
  }

  if (isError || !request) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-destructive">Request not found</p></div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/requests"><Button variant="ghost" className="mb-6"><ArrowLeft className="mr-2 h-4 w-4" />Back to Requests</Button></Link>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{request.title}</CardTitle>
                    <Badge className={statusColors[request.status] || statusColors.pending}>{statusLabels[request.status]}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {request.description && <div><h3 className="font-semibold mb-2">Description</h3><p className="text-muted-foreground">{request.description}</p></div>}
                {request.service && <div><h3 className="font-semibold mb-2">Service</h3><Badge variant="secondary">{request.service.category}</Badge></div>}
                <div className="grid gap-4 md:grid-cols-2">
                  {request.address && <div className="flex items-start gap-2"><MapPin className="h-5 w-5 text-muted-foreground mt-0.5" /><div><p className="font-semibold">Address</p><p className="text-sm text-muted-foreground">{request.address}</p></div></div>}
                  {request.scheduled_date && <div className="flex items-start gap-2"><Calendar className="h-5 w-5 text-muted-foreground mt-0.5" /><div><p className="font-semibold">Scheduled Date</p><p className="text-sm text-muted-foreground">{format(new Date(request.scheduled_date), "PPP p")}</p></div></div>}
                  {request.amount && <div className="flex items-start gap-2"><DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" /><div><p className="font-semibold">Amount</p><p className="text-sm text-muted-foreground">₹{request.amount.toLocaleString()}</p></div></div>}
                  <div className="flex items-start gap-2"><Clock className="h-5 w-5 text-muted-foreground mt-0.5" /><div><p className="font-semibold">Created</p><p className="text-sm text-muted-foreground">{format(new Date(request.created_at), "PPP")}</p></div></div>
                </div>
              </CardContent>
            </Card>
            {showPayment && <Card><CardHeader><CardTitle>Complete Payment</CardTitle><CardDescription>Enter your card details to pay for the service.</CardDescription></CardHeader><CardContent><Elements stripe={stripePromise}><CheckoutForm request={request} onPaymentSuccess={handlePaymentSuccess} /></Elements></CardContent></Card>}
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>{userRole === "seeker" ? "Provider" : "Seeker"}</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12"><AvatarImage src={otherUser?.avatar_url} /><AvatarFallback>{otherUserName[0]}</AvatarFallback></Avatar>
                  <div><p className="font-semibold">{otherUserName}</p>{otherUser?.email && <p className="text-sm text-muted-foreground">{otherUser.email}</p>}</div>
                </div>
                {otherUser?.phone && <div className="text-sm text-muted-foreground"><p>Phone: {otherUser.phone}</p></div>}
                <Link href={`/messages?to=${otherUser?.id}`} className="mt-4 block"><Button variant="outline" className="w-full">Send Message</Button></Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {canAccept && <Button onClick={() => updateStatusMutation.mutate({ requestId: id, status: "accepted" })} disabled={updateStatusMutation.isPending} className="w-full"><CheckCircle className="mr-2 h-4 w-4" />Accept Request</Button>}
                {canPay && <Button onClick={() => setShowPayment(true)} disabled={updateStatusMutation.isPending} className="w-full"><CreditCard className="mr-2 h-4 w-4" />Pay Now</Button>}
                {canStart && <Button onClick={() => updateStatusMutation.mutate({ requestId: id, status: "in_progress" })} disabled={updateStatusMutation.isPending} className="w-full">Start Service</Button>}
                {canComplete && <Button onClick={() => updateStatusMutation.mutate({ requestId: id, status: "completed" })} disabled={updateStatusMutation.isPending} className="w-full"><CheckCircle className="mr-2 h-4 w-4" />Mark as Completed</Button>}
                {canCancel && <Button onClick={() => cancelMutation.mutate(id)} disabled={cancelMutation.isPending} className="w-full" variant="destructive"><XCircle className="mr-2 h-4 w-4" />Cancel Request</Button>}
                {!canAccept && !canPay && !canStart && !canComplete && !canCancel && <p className="text-sm text-muted-foreground text-center">No actions available</p>}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
