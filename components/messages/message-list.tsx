
"use client";

import { useEffect, useRef } from "react";
import { useMessagesStore } from "@/lib/store/messages";
import { useAuthStore } from "@/lib/store/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function MessageList() {
  const { messages, conversations, activeConversationId, setActiveConversationId } = useMessagesStore();
  const { user } = useAuthStore();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find((c) => c.conversation_id === activeConversationId);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: "smooth" });
      }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <header className="p-4 border-b flex items-center gap-3 bg-background/80 backdrop-blur-sm">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setActiveConversationId(null)}><ArrowLeft /></Button>
        <Avatar>
          <AvatarImage src={activeConversation?.avatar_url || '/placeholder.svg'} />
          <AvatarFallback>{activeConversation?.first_name?.[0]}{activeConversation?.last_name?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg">{activeConversation?.first_name} {activeConversation?.last_name}</h3>
        </div>
      </header>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender_id === user?.id ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-md px-4 py-2 rounded-2xl ${
                msg.sender_id === user?.id
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-muted text-foreground rounded-bl-none"
              }`}>
                <p>{msg.content}</p>
                <p className="text-xs opacity-70 mt-1 text-right">{format(new Date(msg.created_at), 'p')}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
