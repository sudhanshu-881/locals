
"use client";

import { useMessagesStore } from "@/lib/store/messages";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from 'date-fns';

interface Conversation {
  conversation_id: string;
  other_user_id: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  last_message: string;
  last_message_at: string;
  unread_count: number;
}

interface ConversationListProps {
  conversations: Conversation[];
}

export function ConversationList({ conversations }: ConversationListProps) {
  const { activeConversationId, setActiveConversationId } = useMessagesStore();

  return (
    <ScrollArea className="flex-1">
      {conversations.length === 0 ? (
        <div className="p-4 text-center text-muted-foreground">No conversations yet.</div>
      ) : (
        <div className="p-2">
          {conversations.map((conv) => (
            <button
              key={conv.conversation_id}
              onClick={() => setActiveConversationId(conv.conversation_id)}
              className={`w-full p-3 rounded-lg text-left transition-colors ${
                activeConversationId === conv.conversation_id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarImage src={conv.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback>{conv.first_name?.[0]}{conv.last_name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-bold truncate">{conv.first_name} {conv.last_name}</p>
                    <p className={`text-xs ${
                      activeConversationId === conv.conversation_id
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}>
                      {formatDistanceToNow(new Date(conv.last_message_at), { addSuffix: true })}
                    </p>
                  </div>
                  <p className={`text-sm truncate ${
                    activeConversationId === conv.conversation_id
                      ? "text-primary-foreground/90"
                      : "text-muted-foreground"
                  }`}>{conv.last_message}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </ScrollArea>
  );
}
