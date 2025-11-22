
"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useMessagesStore } from "@/lib/store/messages";
import { useAuthStore } from "@/lib/store/auth";
import { fetchConversations, fetchMessages } from "@/lib/queries/messages";
import { sendMessage } from "@/lib/mutations/messages";
import { ConversationList } from "@/components/messages/conversation-list";
import { MessageList } from "@/components/messages/message-list";
import { MessageInput } from "@/components/messages/message-input";
import { Loader2 } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function MessagesPage() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const initialUserId = searchParams.get("to");

  const {
    conversations,
    setConversations,
    activeConversationId,
    setActiveConversationId,
    setMessages,
    addMessage,
  } = useMessagesStore();
  const { user } = useAuthStore();

  const { data: fetchedConversations, isLoading: isLoadingConversations } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
    enabled: !!user,
  });

  useEffect(() => {
    if (fetchedConversations) {
      setConversations(fetchedConversations);
      if (initialUserId) {
        const convo = fetchedConversations.find((c: any) => c.other_user_id === initialUserId);
        if (convo) {
          setActiveConversationId(convo.conversation_id);
        }
      } else if (fetchedConversations.length > 0) {
        setActiveConversationId(fetchedConversations[0].conversation_id);
      }
    }
  }, [fetchedConversations, initialUserId, setConversations, setActiveConversationId]);

  const { data: fetchedMessages, isLoading: isLoadingMessages } = useQuery({
    queryKey: ["messages", activeConversationId],
    queryFn: () => fetchMessages(activeConversationId!),
    enabled: !!activeConversationId,
  });

  useEffect(() => {
    if (fetchedMessages) {
      setMessages(fetchedMessages);
    }
  }, [fetchedMessages, setMessages]);

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (newMessage: any) => {
        if (!newMessage) return;
        addMessage(newMessage[0]);
        queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });

  useEffect(() => {
    if (!activeConversationId) return;

    const supabase = createClient();
    const channel = supabase
      .channel(`messages_${activeConversationId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${activeConversationId}` },
        (payload) => {
          addMessage(payload.new as any);
          queryClient.invalidateQueries({ queryKey: ['conversations'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeConversationId, addMessage, queryClient]);

  const activeConversation = conversations.find((c) => c.conversation_id === activeConversationId);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto h-[calc(100vh-4rem)] flex">
        <aside className={`w-full md:w-80 lg:w-96 border-r flex flex-col ${activeConversationId && "hidden md:flex"}`}>
          <div className="p-4 border-b">
            <h2 className="text-2xl font-bold">Inbox</h2>
          </div>
          {isLoadingConversations ? (
            <div className="p-4 text-center"><Loader2 className="animate-spin mx-auto" /></div>
          ) : (
            <ConversationList conversations={conversations} />
          )}
        </aside>
        <main className={`flex-1 flex flex-col ${!activeConversationId && "hidden md:flex"}`}>
          {activeConversation ? (
            <>
              <MessageList />
              <MessageInput 
                sendMessageMutation={sendMessageMutation} 
                activeConversation={activeConversation} 
                currentUser={user}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-center p-8">
              {isLoadingConversations ? <Loader2 className="animate-spin" /> : <div>Select a conversation to start messaging.</div>}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
