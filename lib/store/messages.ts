
import { create } from 'zustand';

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

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

interface MessagesState {
  conversations: Conversation[];
  messages: Message[];
  activeConversationId: string | null;
  currentUser: any;
  setConversations: (conversations: Conversation[]) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setActiveConversationId: (conversationId: string | null) => void;
  setCurrentUser: (user: any) => void;
}

export const useMessagesStore = create<MessagesState>((set) => ({
  conversations: [],
  messages: [],
  activeConversationId: null,
  currentUser: null,
  setConversations: (conversations) => set({ conversations }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setActiveConversationId: (conversationId) => set({ activeConversationId: conversationId }),
  setCurrentUser: (user) => set({ currentUser: user }),
}));
