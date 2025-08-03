"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useContactsFromDB, useBalanceFromDB } from "@/hooks";
import { addTransferToDB, updateBalanceInDB } from "@/lib";
import { useTransferStore } from "@/stores";

interface Props {
  id: string;
}

export default function SendScreen({ id }: Props) {
  const router = useRouter();
  const { data: contacts } = useContactsFromDB();
  const contact = contacts?.find((c) => c.id === id);
  const { data: balance = 0 } = useBalanceFromDB();

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const { setLastTransfer } = useTransferStore();

  if (!contact) {
    return (
      <div className="p-4 text-black text-center">Contacto no encontrado.</div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      toast.error("Por favor, ingrese un monto válido.");
      return;
    }

    if (typeof balance === "object" && value > balance.amount) {
      toast.error("No puedes enviar más de tu balance disponible.");
      return;
    }

    //Guardar la transferencia
    await addTransferToDB({
      id: crypto.randomUUID(),
      contactId: contact.id,
      date: new Date().toISOString().split("T")[0],
      name: `${contact.firstName} ${contact.lastName}`,
      amount: value,
      notes: note || "",
    });

    //Actualizar balance
    if (typeof balance === "object") {
      const newBalance = balance.amount - value;
      await updateBalanceInDB(newBalance);
    }

    const now = new Date();
    const time = now.toTimeString().split(" ")[0].slice(0, 5);

    setLastTransfer({
      id: crypto.randomUUID(),
      contactId: contact.id,
      name: `${contact.firstName} ${contact.lastName}`,
      avatar: contact.avatar,
      date: now.toISOString().split("T")[0],
      time,
      amount: value,
      notes: note,
      reference: "#9999999", // opcionalmente generado
    });

    router.push("/transfers/success");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 text-black flex flex-col gap-24"
    >
      <div>
        <div className="flex flex-col items-center mb-6">
          <img
            src={contact.avatar}
            alt={contact.firstName}
            className="w-20 h-20 rounded-full mb-2 border-2 border-white"
          />
          <p className="text-center">
            {contact.firstName} {contact.lastName}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-full flex flex-col items-center gap-4">
            <label
              htmlFor="amount"
              className="block mb-1 text-xl font-semibold"
            >
              Set Amount
            </label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              placeholder="$0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-48 text-center text-lg rounded bg-white text-black"
            />
          </div>

          <div className="w-full max-w-xs text-left">
            <label htmlFor="note" className="block mb-1 text-sm font-medium">
              Notes
            </label>
            <textarea
              id="note"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="w-full p-2 rounded bg-gray-100 text-black"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          className="bg-[#00C47F] text-white font-semibold px-6 py-3 rounded-2xl w-full max-w-xs mx-auto"
        >
          Process to Transfer
        </button>
      </div>
    </form>
  );
}
