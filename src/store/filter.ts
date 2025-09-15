import {colors} from '@/constants/colors';
import {create} from 'zustand';

interface FilterState {
  filters: Record<string, boolean>;
  setFilters: (filters: Record<string, boolean>) => void;
  initializeFilters: (theme: 'light' | 'dark') => void;
}

const useFilterStore = create<FilterState>(set => ({
  filters: {},
  setFilters: filters => {
    set({filters});
  },
  initializeFilters: (theme: 'light' | 'dark') => {
    const initialFilters = {
      [colors[theme].PINK_400]: true,
      [colors[theme].YELLOW_400]: true,
      [colors[theme].GREEN_400]: true,
      [colors[theme].BLUE_400]: true,
      [colors[theme].PURPLE_400]: true,
      '1': true,
      '2': true,
      '3': true,
      '4': true,
      '5': true,
    };
    set({filters: initialFilters});
  },
}));

export default useFilterStore;
