
import { create } from 'zustand';

interface RequestState {
  showPayment: boolean;
  setShowPayment: (show: boolean) => void;
}

export const useRequestStore = create<RequestState>((set) => ({
  showPayment: false,
  setShowPayment: (show) => set({ showPayment: show }),
}));
