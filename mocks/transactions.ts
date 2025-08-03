import { Transaction } from '@/types';

export const mockTransactions: Transaction[] = [
  {
    id: crypto.randomUUID(),
    type: 'Transfer',
    label: 'Transfer',
    date: '2025-08-03T09:30:00', // Hoy
    amount: -600000,
  },
  {
    id: crypto.randomUUID(),
    type: 'CashIn',
    label: 'CashIn',
    date: '2025-08-02T14:20:00', // Ayer
    amount: 500000,
  },
  {
    id: crypto.randomUUID(),
    type: 'Transfer',
    label: 'Transfer',
    date: '2025-07-20T18:45:00',
    amount: -1500,
  },
  {
    id: crypto.randomUUID(),
    type: 'Transfer',
    label: 'Transfer',
    date: '2025-07-18T11:12:00',
    amount: -2200,
  },
  {
    id: crypto.randomUUID(),
    type: 'Payment',
    label: 'Netflix',
    date: '2025-07-10T20:10:00',
    amount: -18000,
  },
  {
    id: crypto.randomUUID(),
    type: 'CashIn',
    label: 'CashIn',
    date: '2025-06-25T12:00:00',
    amount: 120000,
  },
  {
    id: crypto.randomUUID(),
    type: 'Payment',
    label: 'Spotify',
    date: '2025-06-20T18:20:00',
    amount: -20000,
  },
  {
    id: crypto.randomUUID(),
    type: 'Payment',
    label: 'Insurance',
    date: '2025-05-10T11:28:00',
    amount: -100000,
  },
  {
    id: crypto.randomUUID(),
    type: 'CashIn',
    label: 'CashIn',
    date: '2025-04-15T19:12:00',
    amount: 260000,
  },
  {
    id: crypto.randomUUID(),
    type: 'Payment',
    label: 'Internet',
    date: '2025-03-12T17:34:00',
    amount: -24000,
  },
];
