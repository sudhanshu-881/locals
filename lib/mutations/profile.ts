
import { createClient } from "@/lib/supabase/client";
import { z } from "zod";
import { profileSchema } from "@/lib/schema/profile";

export const updateProfileLocation = async ({ city, state, address, userId }: { city: string; state: string; address: string; userId: string; }) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update({
      city: city.trim(),
      state: state.trim(),
      address: address.trim(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateProfile = async ({ profileData, userId }: { profileData: z.infer<typeof profileSchema>; userId: string }) => {
    const supabase = createClient();

    const { error } = await supabase
        .from("profiles")
        .update({
            ...profileData,
            updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

    if (error) {
        throw new Error(error.message);
    }

    return { success: true };
}
