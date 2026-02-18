import { create } from 'zustand';

export const useAnalysisStore = create((set) => ({
  // State
  universityName: '',
  analysisData: null,
  isAnalyzing: false,
  error: null,
  
  // Actions
  setUniversityName: (name) => set({ universityName: name }),
  
  setAnalysisData: (data) => set({ analysisData: data, error: null }),
  
  setIsAnalyzing: (status) => set({ isAnalyzing: status }),
  
  setError: (error) => set({ error, isAnalyzing: false }),
  
  resetAnalysis: () => set({
    universityName: '',
    analysisData: null,
    isAnalyzing: false,
    error: null,
  }),
}));
