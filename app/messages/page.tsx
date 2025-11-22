
"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { format, formatDistanceToNow } from 'date-fns';


interface Conversation {
  conversation_id: string
  other_user_id: string
  first_name: string
  last_name: string
  avatar_url: string
  last_message: string
  last_message_at: string
  unread_count: number
}

interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
  is_read: boolean
}

export default function MessagesPage() {
  const searchParams = useSearchParams()
  const initialUserId = searchParams.get("to")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [messageInput, setMessageInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [activeProfile, setActiveProfile] = useState<any>(null)

  const supabase = createClient()

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    init();
  }, []);

  // Fetch conversations
  useEffect(() => {
    if (!currentUser) return

    const fetchConversations = async () => {
      setIsLoading(true)
      const { data, error } = await supabase.rpc('get_user_conversations')
      if (error) {
        console.error('Error fetching conversations:', error)
        setIsLoading(false)
        return
      }
      setConversations(data || [])
      setIsLoading(false)
      
      if(initialUserId && data.some(c => c.other_user_id === initialUserId)){
        const convo = data.find(c => c.other_user_id === initialUserId)
        if(convo) setActiveConversationId(convo.conversation_id)
      } else if (data.length > 0) {
        setActiveConversationId(data[0].conversation_id)
      }
    }

    fetchConversations()
  }, [currentUser, initialUserId])

  // Fetch messages for the active conversation
  useEffect(() => {
    if (!activeConversationId) return

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', activeConversationId)
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching messages:', error)
        return
      }
      setMessages(data || [])
      scrollToBottom()
    }

    fetchMessages()

    // Subscribe to new messages
    const channel = supabase
      .channel(`messages_${activeConversationId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${activeConversationId}` },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message])
          scrollToBottom()
        }
      ).subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [activeConversationId])

  // Get active profile
  useEffect(() => {
    const otherUser = conversations.find(c => c.conversation_id === activeConversationId)?.other_user_id
    if(otherUser) {
        const fetchUserProfile = async () => {
            const { data } = await supabase.from("profiles").select("*").eq("id", otherUser).single()
            setActiveProfile(data)
        }
        fetchUserProfile()
    }
  }, [activeConversationId, conversations])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim() || !activeConversationId || !currentUser || !activeProfile) return
    
    setIsSending(true)
    const content = messageInput.trim()
    setMessageInput("")

    const { error } = await supabase.from('messages').insert({
      conversation_id: activeConversationId,
      sender_id: currentUser.id,
      receiver_id: activeProfile.id,
      content: content,
    })

    if (error) {
      console.error('Error sending message:', error)
      setMessageInput(content) // Re-populate input on error
    }
    setIsSending(false)
  }

  const scrollToBottom = () => {
    setTimeout(() => {
        scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto h-[calc(100vh-4rem)] flex">
            <aside className={`w-full md:w-80 lg:w-96 border-r flex flex-col ${activeConversationId && 'hidden md:flex'}`}>
                <div className="p-4 border-b">
                    <h2 className="text-2xl font-bold">Inbox</h2>
                </div>
                <ScrollArea className="flex-1">
                    {isLoading ? (
                        <div className="p-4 text-center"><Loader2 className="animate-spin mx-auto"/></div>
                    ) : conversations.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">No conversations yet. Start one from a provider's profile.</div>
                    ) : (
                        <div className="p-2">
                            {conversations.map(conv => (
                                <button key={conv.conversation_id} onClick={() => setActiveConversationId(conv.conversation_id)}
                                    className={`w-full p-3 rounded-lg text-left transition-colors ${activeConversationId === conv.conversation_id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12 border-2 border-primary/20">
                                            <AvatarImage src={conv.avatar_url || '/placeholder.svg'} />
                                            <AvatarFallback>{conv.first_name?.[0]}{conv.last_name?.[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center">
                                                <p className="font-bold truncate">{conv.first_name} {conv.last_name}</p>
                                                <p className={`text-xs ${activeConversationId === conv.conversation_id ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                                                    {formatDistanceToNow(new Date(conv.last_message_at), { addSuffix: true })}
                                                </p>
                                            </div>
                                            <p className={`text-sm truncate ${activeConversationId === conv.conversation_id ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>{conv.last_message}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </aside>
            <main className={`flex-1 flex flex-col ${!activeConversationId && 'hidden md:flex'}`}>
                {activeConversationId && activeProfile ? (
                    <>
                        <header className="p-4 border-b flex items-center gap-3 bg-background/80 backdrop-blur-sm">
                            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setActiveConversationId(null)}><ArrowLeft/></Button>
                            <Avatar>
                                <AvatarImage src={activeProfile?.avatar_url || '/placeholder.svg'} />
                                <AvatarFallback>{activeProfile?.first_name?.[0]}{activeProfile?.last_name?.[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold text-lg">{activeProfile?.first_name} {activeProfile?.last_name}</h3>
                                <p className="text-xs text-muted-foreground">{activeProfile?.city}, {activeProfile?.state}</p>
                            </div>
                        </header>
                        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                            <div className="space-y-4">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`flex ${msg.sender_id === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-md px-4 py-2 rounded-2xl ${msg.sender_id === currentUser.id ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted text-foreground rounded-bl-none'}`}>
                                            <p>{msg.content}</p>
                                            <p className="text-xs opacity-70 mt-1 text-right">{format(new Date(msg.created_at), 'p')}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2 items-center">
                            <Input placeholder="Type a message..." value={messageInput} onChange={(e) => setMessageInput(e.target.value)} className="flex-1 py-6" disabled={isSending}/>
                            <Button type="submit" size="icon" disabled={isSending || !messageInput.trim()}>
                                {isSending ? <Loader2 className="animate-spin"/> : <Send className="h-5 w-5" />}
                            </Button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground text-center p-8">
                        {isLoading ? <Loader2 className="animate-spin"/> : <div>Select a conversation to start messaging.</div>}
                    </div>
                )}
            </main>
        </div>
    </div>
  )
}
