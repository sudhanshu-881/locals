
import { create } from 'zustand';

interface ServiceRequest {
  id: string;
  title: string;
  description?: string;
  status: string;
  amount?: number;
  scheduled_date?: string;
  address?: string;
  created_at: string;
  seeker?: {
    id: string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  };
  provider?: {
    id: string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  };
}

interface RequestsState {
  requests: ServiceRequest[];
  activeTab: string;
  userRole: "seeker" | "provider" | null;
  setRequests: (requests: ServiceRequest[]) => void;
  setActiveTab: (tab: string) => void;
  setUserRole: (role: "seeker" | "provider" | null) => void;
}

export const useRequestsStore = create<RequestsState>((set) => ({
  requests: [],
  activeTab: "all",
  userRole: null,
  setRequests: (requests) => set({ requests }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setUserRole: (role) => set({ userRole: role }),
}));
