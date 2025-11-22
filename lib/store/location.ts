
import { create } from 'zustand';

interface LocationState {
  city: string;
  state: string;
  address: string;
  setCity: (city: string) => void;
  setState: (state: string) => void;
  setAddress: (address: string) => void;
  reset: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  city: '',
  state: '',
  address: '',
  setCity: (city) => set({ city }),
  setState: (state) => set({ state }),
  setAddress: (address) => set({ address }),
  reset: () => set({ city: '', state: '', address: '' }),
}));
