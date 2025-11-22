
import { createClient } from "@/lib/supabase/client";

export const sendMessage = async ({ conversation_id, sender_id, receiver_id, content }: { conversation_id: string; sender_id: string; receiver_id: string; content: string; }) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("messages").insert({
    conversation_id,
    sender_id,
    receiver_id,
    content,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
