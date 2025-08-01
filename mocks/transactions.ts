import{ Transaction } from '@/types'

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'Payment',
    label: 'Internet',
    date: 'May 16, 2023 · 17:34',
    amount: -24000,
  },
  {
    id: '2',
    type: 'Transfer',
    label: 'Transfer',
    date: 'Yesterday · 19:12',
    amount: -600000,
  },
  {
    id: '3',
    type: 'CashIn',
    label: 'CashIn',
    date: 'May 29, 2023 · 19:12',
    amount: 260000,
  },
  {
    id: '4',
    type: 'Payment',
    label: 'Insurance',
    date: 'April 23, 2023 · 11:28',
    amount: -100000,
  },
  {
    id: '5',
    type: 'Transfer',
    label: 'Transfer',
    date: 'Yesterday · 19:12',
    amount: -600000,
  },
  {
    id: '6',
    type: 'Payment',
    label: 'Spotify',
    date: 'July 10, 2023 · 20:10',
    amount: -20000,
  },
  {
    id: '7',
    type: 'CashIn',
    label: 'CashIn',
    date: 'Today · 09:30',
    amount: 500000,
  },
  {
    id: '8',
    type: 'Transfer',
    label: 'Transfer',
    date: 'Yesterday · 10:22',
    amount: -300000,
  },
  {
    id: '9',
    type: 'CashIn',
    label: 'CashIn',
    date: 'June 5, 2023 · 12:00',
    amount: 120000,
  },
  {
    id: '10',
    type: 'Payment',
    label: 'Netflix',
    date: 'July 1, 2023 · 18:20',
    amount: -18000,
  },
]