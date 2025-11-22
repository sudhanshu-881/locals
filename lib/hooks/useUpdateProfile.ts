
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/lib/mutations/profile";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { profileSchema } from "@/lib/schema/profile";

export function useUpdateProfile(userId: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: z.infer<typeof profileSchema>) => updateProfile({ profileData: data, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      toast.success("Profile updated successfully!");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
