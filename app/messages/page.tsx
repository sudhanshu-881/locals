"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Conversation {
  id: string
  first_name: string
  last_name: string
  avatar_url: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
}

interface Message {
  id: string
  sender_id: string
  recipient_id: string
  content: string
  created_at: string
  is_read: boolean
}

export default function MessagesPage() {
  const searchParams = useSearchParams()
  const toUserId = searchParams.get("to")

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(toUserId)
  const [messages, setMessages] = useState<Message[]>([])
  const [messageInput, setMessageInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [selectedUserProfile, setSelectedUserProfile] = useState<any>(null)

  const supabase = createClient()

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setCurrentUser(user)
    }
    fetchCurrentUser()
  }, [])

  useEffect(() => {
    if (!currentUser) return

    const fetchConversations = async () => {
      setIsLoading(true)
      try {
        const { data: sentMessages } = await supabase
          .from("messages")
          .select("recipient_id")
          .eq("sender_id", currentUser.id)

        const { data: receivedMessages } = await supabase
          .from("messages")
          .select("sender_id")
          .eq("recipient_id", currentUser.id)

        const userIds = new Set<string>()
        sentMessages?.forEach((m) => userIds.add(m.recipient_id))
        receivedMessages?.forEach((m) => userIds.add(m.sender_id))

        const conversationList: Conversation[] = []

        for (const userId of userIds) {
          const { data: profile } = await supabase.from("profiles").select("*").eq("id", userId).single()

          if (profile) {
            const { data: lastMsg } = await supabase
              .from("messages")
              .select("*")
              .or(`sender_id.eq.${currentUser.id},recipient_id.eq.${currentUser.id}`)
              .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
              .order("created_at", { ascending: false })
              .limit(1)

            const { count: unreadCount } = await supabase
              .from("messages")
              .select("*", { count: "exact", head: true })
              .eq("recipient_id", currentUser.id)
              .eq("sender_id", userId)
              .eq("is_read", false)

            conversationList.push({
              id: userId,
              first_name: profile.first_name,
              last_name: profile.last_name,
              avatar_url: profile.avatar_url,
              lastMessage: lastMsg?.[0]?.content || "No messages yet",
              lastMessageTime: lastMsg?.[0]?.created_at || "",
              unreadCount: unreadCount || 0,
            })
          }
        }

        setConversations(
          conversationList.sort(
            (a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime(),
          ),
        )
      } catch (error) {
        console.error("Error fetching conversations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchConversations()
  }, [currentUser])

  useEffect(() => {
    if (!selectedConversation || !currentUser) return

    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .or(
          `and(sender_id.eq.${currentUser.id},recipient_id.eq.${selectedConversation}),and(sender_id.eq.${selectedConversation},recipient_id.eq.${currentUser.id})`,
        )
        .order("created_at", { ascending: true })

      setMessages(data || [])

      // Mark messages as read
      await supabase
        .from("messages")
        .update({ is_read: true })
        .eq("recipient_id", currentUser.id)
        .eq("sender_id", selectedConversation)
    }

    const fetchUserProfile = async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", selectedConversation).single()
      setSelectedUserProfile(data)
    }

    fetchMessages()
    fetchUserProfile()

    // Subscribe to new messages
    const channel = supabase
      .channel(`messages:${currentUser.id}:${selectedConversation}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `or(and(sender_id=eq.${currentUser.id},recipient_id=eq.${selectedConversation}),and(sender_id=eq.${selectedConversation},recipient_id=eq.${currentUser.id}))`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [selectedConversation, currentUser])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim() || !selectedConversation || !currentUser) return

    try {
      const { error } = await supabase.from("messages").insert({
        sender_id: currentUser.id,
        recipient_id: selectedConversation,
        content: messageInput,
      })

      if (error) throw error
      setMessageInput("")
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  if (!currentUser) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 h-screen flex flex-col">
        <Link href="/dashboard" className="mb-4">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

        <div className="flex gap-6 flex-1 min-h-0">
          {/* Conversations List */}
          <div className="w-full md:w-80 border rounded-lg flex flex-col">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Messages</h2>
            </div>
            <ScrollArea className="flex-1">
              {isLoading ? (
                <div className="p-4 text-center text-muted-foreground">Loading conversations...</div>
              ) : conversations.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">No conversations yet</div>
              ) : (
                <div className="space-y-1 p-2">
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        selectedConversation === conv.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conv.avatar_url || "/placeholder.svg"} />
                          <AvatarFallback>
                            {conv.first_name?.[0]}
                            {conv.last_name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {conv.first_name} {conv.last_name}
                          </p>
                          <p className="text-xs truncate opacity-75">{conv.lastMessage}</p>
                        </div>
                        {conv.unreadCount > 0 && (
                          <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conv.unreadCount}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Chat Area */}
          {selectedConversation ? (
            <div className="flex-1 border rounded-lg flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedUserProfile?.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback>
                    {selectedUserProfile?.first_name?.[0]}
                    {selectedUserProfile?.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">
                    {selectedUserProfile?.first_name} {selectedUserProfile?.last_name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{selectedUserProfile?.city}</p>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender_id === currentUser.id ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.sender_id === currentUser.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(msg.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex-1 border rounded-lg flex items-center justify-center text-muted-foreground">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
