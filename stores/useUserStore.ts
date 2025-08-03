import { create } from "zustand";
import { persist } from 'zustand/middleware'
import { StoredUser } from "@/types";

interface UserStore {
  user: StoredUser | null;
  setUser: (user: StoredUser) => void;
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
