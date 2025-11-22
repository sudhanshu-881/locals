
import { createClient } from "@/lib/supabase/client";

export const fetchConversations = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_user_conversations");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const fetchMessages = async (conversationId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
