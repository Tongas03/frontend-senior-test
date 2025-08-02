export interface Transfer {
  id: string;
  contactId: string;
  name: string;
  date: string; // ISO date string
  amount: number;
  notes: string;
}