
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { TablesInsert } from "@/lib/types/supabase";

interface RequestFormProps {
  providerId: string;
  providerName: string;
  serviceId?: string;
  defaultAmount?: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function RequestForm({
  providerId,
  serviceId,
  defaultAmount,
  onSuccess,
  onCancel,
}: RequestFormProps) {
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast.error("You must be logged in to create a request.");
      setIsLoading(false);
      return;
    }

    const requestData: TablesInsert<"requests"> = {
      provider_id: providerId,
      requester_id: user.id,
      service_id: serviceId,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      address: formData.get("address") as string,
      scheduled_date: scheduledDate ? scheduledDate.toISOString() : null,
      amount: defaultAmount ? Number(defaultAmount) : null,
      status: 'pending'
    };

    const { error } = await supabase.from("requests").insert(requestData);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Service request created successfully!");
      if (onSuccess) {
        onSuccess();
      }
    }
    setIsLoading(false);
  };

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Plumbing repair needed"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Provide details about the service you need..."
              rows={3}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Service Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="Enter service location"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Scheduled Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !scheduledDate && "text-muted-foreground")}
                    disabled={isLoading}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={scheduledDate} onSelect={setScheduledDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="0.00"
                defaultValue={defaultAmount}
                min="0"
                step="0.01"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Creating..." : "Create Request"}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
