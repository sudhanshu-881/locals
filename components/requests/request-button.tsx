"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RequestForm } from "./request-form"
import { toast } from "sonner"

interface RequestButtonProps {
  providerId: string
  providerName: string
  serviceId?: string
  defaultAmount?: number
}

export function RequestButton({ providerId, providerName, serviceId, defaultAmount }: RequestButtonProps) {
  const router = useRouter()
  const supabase = createClient()
  const [open, setOpen] = useState(false)

  const handleSuccess = () => {
    setOpen(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Request Service</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Service Request</DialogTitle>
          <DialogDescription>Request a service from {providerName}</DialogDescription>
        </DialogHeader>
        <RequestForm
          providerId={providerId}
          providerName={providerName}
          serviceId={serviceId}
          defaultAmount={defaultAmount}
          onSuccess={handleSuccess}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

