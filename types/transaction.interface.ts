export type Transaction = {
  id: string
  type: 'Transfer' | 'CashIn' | 'Payment'
  label: string
  date: string
  amount: number
}