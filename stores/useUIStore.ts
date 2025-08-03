import { create } from "zustand";

interface UIState {
  hasSeenTransactionHistory: boolean;
  setHasSeenTransactionHistory: () => void;
  hasSeenContacts: boolean;
  setHasSeenContacts: () => void;
  hasSeenUserHeader: boolean;
  setHasSeenUserHeader: () => void;
  hasSeenTransfersScreen: boolean;
  setHasSeenTransfersScreen: () => void;
  hasSeenProfileScreen: boolean;
  setHasSeenProfileScreen: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  hasSeenTransactionHistory: false,
  setHasSeenTransactionHistory: () => set({ hasSeenTransactionHistory: true }),
  hasSeenContacts: false,
  setHasSeenContacts: () => set({ hasSeenContacts: true }),
  hasSeenUserHeader: false,
  setHasSeenUserHeader: () => set({ hasSeenUserHeader: true }),
  hasSeenTransfersScreen: false,
  setHasSeenTransfersScreen: () => set({ hasSeenTransfersScreen: true }),
  hasSeenProfileScreen: false,
  setHasSeenProfileScreen: () => set({ hasSeenProfileScreen: true }),
}));
