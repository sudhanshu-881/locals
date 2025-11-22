
"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitRatingAction(formData: FormData) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "You must be logged in to submit a rating." };
    }

    const ratee_id = formData.get('rateeId') as string;
    const rating = Number(formData.get('rating'));
    const review = formData.get('review') as string;

    if (!ratee_id || !rating) {
        return { error: "Missing required fields." };
    }

    const { error } = await supabase.from('ratings').insert({
        ratee_id,
        rating,
        review,
        rater_id: user.id
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath(`/provider/${ratee_id}`);
    return { success: true };
}
