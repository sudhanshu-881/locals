
import { create } from 'zustand';

interface AuthState {
  user: any;
  session: any;
  user_type: string | null;
  setUser: (user: any) => void;
  setSession: (session: any) => void;
  setUserType: (user_type: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  user_type: null,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setUserType: (user_type) => set({ user_type }),
  logout: () => set({ user: null, session: null, user_type: null }),
}));
