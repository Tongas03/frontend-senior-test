import { StoredUser } from "@/types";

export interface Transfer {
  id: string;
  contactId: string;
  name: string;
  date: string;
  amount: number;
  notes?: string;
}

export interface TransferWithContact extends Transfer {
  contact: StoredUser;
}