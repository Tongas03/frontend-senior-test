"use client";

import { useState } from "react";
import { useContactsFromDB, useBalanceFromDB } from "@/hooks";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

  if (!contact) {
    return (
      <div className="p-4 text-black text-center">Contacto no encontrado.</div>
    );
  }

  // if (Number(amount) > balance) {
  //   toast.error("No puedes enviar más de tu balance disponible.");
  //   return;
  // }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      toast.error("Por favor, ingrese un monto válido.");
      return;
    }

    toast.success(`$${value.toFixed(2)} enviados a ${contact.firstName}`);
    router.push("/");
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
