import create from 'zustand';

interface Genre {
  mal_id: number;
  name: string;
}

interface AnimeState {
  genres: Genre[];
  filters: string[];
  setFilters: (filters: string[]) => void;
  query: string;
  setQuery: (query: string) => void;
  sort: string;
  setSort: (sort: string) => void;
}

export const useAnimeStore = create<AnimeState>((set) => ({
  genres: [],
  filters: [],
  setFilters: (filters) => set({ filters }),
  query: '',
  setQuery: (query) => set({ query }),
  sort: '',
  setSort: (sort) => set({ sort }),
}));



  
