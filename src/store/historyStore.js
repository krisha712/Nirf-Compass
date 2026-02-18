import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useHistoryStore = create(
  persist(
    (set, get) => ({
      // State
      history: [],
      
      // Actions
      addToHistory: (analysisData) => {
        const historyItem = {
          id: Date.now(),
          universityName: analysisData.universityName,
          timestamp: analysisData.timestamp,
          date: new Date().toISOString(),
          status: 'Report Generated',
          data: analysisData,
        };
        
        set((state) => ({
          history: [historyItem, ...state.history],
        }));
      },
      
      getHistoryItem: (id) => {
        return get().history.find((item) => item.id === id);
      },
      
      clearHistory: () => set({ history: [] }),
      
      removeHistoryItem: (id) => {
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        }));
      },
    }),
    {
      name: 'nirf-compass-history',
    }
  )
);
