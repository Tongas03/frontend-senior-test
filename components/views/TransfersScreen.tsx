import { useTransfersFromDB } from '@/hooks';

export default function TransfersScreen() {
  const { data: transfers, isLoading } = useTransfersFromDB();

  if (isLoading) return <p className="text-center">Cargando transferencias...</p>;

  return (
    <div className="p-4 text-sm text-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-center">Transferencias Realizadas</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th>Contacto</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Notas</th>
          </tr>
        </thead>
        <tbody>
          {transfers?.map((t) => (
            <tr key={t.id} className="border-b">
              <td>{t.name}</td>
              <td>${t.amount.toLocaleString()}</td>
              <td>{t.date}</td>
              <td>{t.notes || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
