
import { create } from 'zustand';

interface DiscoverState {
  searchQuery: string;
  selectedCategory: string;
  selectedCity: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedCity: (city: string) => void;
  clearFilters: () => void;
}

export const useDiscoverStore = create<DiscoverState>((set) => ({
  searchQuery: '',
  selectedCategory: 'All',
  selectedCity: 'All',
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedCity: (city) => set({ selectedCity: city }),
  clearFilters: () => set({ searchQuery: '', selectedCategory: 'All', selectedCity: 'All' }),
}));
