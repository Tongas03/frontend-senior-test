import { create } from "zustand";
import { persist } from 'zustand/middleware'
import { User } from "@/types";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  updateBalance: (amount: number) => void;
  reset: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateBalance: (amount) =>
        set((state) =>
          state.user ? { user: { ...state.user, balance: state.user.balance + amount } } : state
        ),
      reset: () => set({ user: null }),
    }),
    {
      name: 'wallet-user',
    }
  )
)
