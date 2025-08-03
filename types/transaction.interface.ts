export type Transaction = {
  id: string;
  type: "Payment" | "Transfer" | "CashIn";
  label?: string;
  date: string;
  amount: number;
  fromDB?: boolean;
};