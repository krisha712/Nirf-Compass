import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useHistoryStore = create(
  persist(
    (set, get) => ({
      // history is stored as { [userId]: historyItem[] }
      history: {},

      addToHistory: (analysisData, userId) => {
        if (!userId) return;
        const historyItem = {
          id: Date.now(),
          userId,
          universityName: analysisData.universityName,
          timestamp: analysisData.timestamp,
          date: new Date().toISOString(),
          status: 'Report Generated',
          data: analysisData,
        };
        set((state) => ({
          history: {
            ...state.history,
            [userId]: [historyItem, ...(state.history[userId] || [])],
          },
        }));
      },

      // Returns history for a specific user
      getUserHistory: (userId) => {
        if (!userId) return [];
        return get().history[userId] || [];
      },

      removeHistoryItem: (id, userId) => {
        if (!userId) return;
        set((state) => ({
          history: {
            ...state.history,
            [userId]: (state.history[userId] || []).filter((item) => item.id !== id),
          },
        }));
      },

      clearUserHistory: (userId) => {
        if (!userId) return;
        set((state) => ({
          history: {
            ...state.history,
            [userId]: [],
          },
        }));
      },

      getHistoryItem: (id, userId) => {
        const userHistory = get().history[userId] || [];
        return userHistory.find((item) => item.id === id);
      },
    }),
    { name: 'nirf-compass-history' }
  )
);
