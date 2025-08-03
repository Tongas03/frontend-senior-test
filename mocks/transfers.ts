export const mockTransfers = [
  {
    id: crypto.randomUUID(),
    contactId: 'contact-id-1',
    name: 'Lucía Gómez',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // hace 5 días
    amount: 1500,
    notes: 'Alquiler',
  },
  {
    id: crypto.randomUUID(),
    contactId: 'contact-id-2',
    name: 'Mariano Ruiz',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // hace 3 días
    amount: 2200,
    notes: '',
  },
  {
    id: crypto.randomUUID(),
    contactId: 'contact-id-3',
    name: 'Elena Torres',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // hace 2 días
    amount: 4800,
    notes: 'Cena con amigos',
  },
  {
    id: crypto.randomUUID(),
    contactId: 'contact-id-4',
    name: 'Carlos Pérez',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // ayer
    amount: 3100,
    notes: '',
  },
];
