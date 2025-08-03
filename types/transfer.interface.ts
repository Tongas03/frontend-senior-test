import { StoredUser } from "@/types";

export interface Transfer {
  id: string;
  contactId: string; // UUID del contacto
  date: string;      // ISO string o timestamp
  amount: number;
  notes?: string;
}

export interface TransferWithContact extends Transfer {
  contact: StoredUser;
}