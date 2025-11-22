
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";

export function MessageInput({ sendMessageMutation, activeConversation, currentUser }) {
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeConversation || !currentUser) return;

    sendMessageMutation.mutate({
      conversation_id: activeConversation.conversation_id,
      sender_id: currentUser.id,
      receiver_id: activeConversation.other_user_id,
      content: messageInput.trim(),
    });

    setMessageInput("");
  };

  return (
    <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2 items-center">
      <Input
        placeholder="Type a message..."
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        className="flex-1 py-6"
        disabled={sendMessageMutation.isPending}
      />
      <Button type="submit" size="icon" disabled={sendMessageMutation.isPending || !messageInput.trim()}>
        {sendMessageMutation.isPending ? <Loader2 className="animate-spin" /> : <Send className="h-5 w-5" />}
      </Button>
    </form>
  );
}
