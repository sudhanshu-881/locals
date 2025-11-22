
"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createRequestAction(formData: FormData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { error: "You must be logged in to create a request." };
    }

    const { data: profile } = await supabase.from("profiles").select("latitude, longitude, address").eq("id", user.id).single();

    const requestData = {
        provider_id: formData.get('providerId') as string,
        seeker_id: user.id,
        service_id: formData.get('serviceId') as string | null,
        title: formData.get('title') as string,
        description: formData.get('description') as string | null,
        address: (formData.get('address') as string) || profile?.address || null,
        latitude: profile?.latitude || null,
        longitude: profile?.longitude || null,
        scheduled_date: (formData.get('scheduledDate') as string) || null,
        amount: Number(formData.get('amount')) || null,
        status: 'pending'
    };

    if (!requestData.provider_id || !requestData.title) {
        return { error: "Missing required fields." };
    }

    const { data, error } = await supabase.from('requests').insert(requestData).select("id").single();

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/requests");
    revalidatePath(`/requests/${data.id}`);

    return { success: true, requestId: data.id };
}
