import { create } from "zustand";
import {TransferSummary} from "@/types"

interface TransferState {
  lastTransfer: TransferSummary | null;
  setLastTransfer: (t: TransferSummary) => void;
  clearLastTransfer: () => void;
}

export const useTransferStore = create<TransferState>((set) => ({
  lastTransfer: null,
  setLastTransfer: (t) => set({ lastTransfer: t }),
  clearLastTransfer: () => set({ lastTransfer: null }),
}));
