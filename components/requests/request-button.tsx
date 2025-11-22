"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RequestForm } from "./request-form";

interface RequestButtonProps {
  providerId: string;
  providerName: string;
  serviceId?: string;
  defaultAmount?: number;
}

export function RequestButton({ providerId, providerName, serviceId, defaultAmount }: RequestButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSuccess = () => {
    setIsModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="w-full font-semibold btn-glow">Request Service</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-card-foreground">New Service Request</DialogTitle>
        </DialogHeader>
        <RequestForm
          providerId={providerId}
          providerName={providerName}
          serviceId={serviceId}
          defaultAmount={defaultAmount}
          onSuccess={handleSuccess}
          onCancel={() => setIsModalOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
