"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { dbWallet } from "@/lib";
import { StoredUser } from "@/types";

export const useFetchUsers = () => {
  const queryClient = useQueryClient();
  const [shouldFetch, setShouldFetch] = useState(false);

  // Verificamos si ya hay datos en IndexedDB
  useEffect(() => {
    const checkDB = async () => {
      const usersCount = await dbWallet.users.count();
      const contactsCount = await dbWallet.contacts.count();

      // Solo si NO hay datos, habilitamos el fetch
      if (usersCount === 0 || contactsCount === 0) {
        setShouldFetch(true);
      }
    };

    checkDB();
  }, []);

  const query = useQuery({
    queryKey: ["initial-users"],
    queryFn: async () => {
      const res = await fetch("https://randomuser.me/api/?results=11");
      const data = await res.json();
      return data?.results ?? [];
    },
    staleTime: Infinity,
    enabled: shouldFetch, // solo se ejecuta si faltan datos
  });

  useEffect(() => {
    if (query.data) {
      const users = query.data;

      const parsedUsers: StoredUser[] = users.map((user: any) => ({
        id: user.login.uuid,
        firstName: user.name.first,
        lastName: user.name.last,
        city: user.location.city,
        state: user.location.state,
        street: `${user.location.street.name} ${user.location.street.number}`,
        email: user.email,
        phone: user.phone,
        avatar: user.picture.medium,
      }));

      const persist = async () => {
        await dbWallet.users.clear();
        await dbWallet.users.put(parsedUsers[0]);

        await dbWallet.contacts.clear();
        await dbWallet.contacts.bulkPut(parsedUsers.slice(1));

        await dbWallet.balances.put({ id: 1, amount: 25000 });

        // Mocks de transferencias si no hay datos previos
        const transfersCount = await dbWallet.transfers.count();
        if (transfersCount === 0) {
          const mockTransfers = parsedUsers.slice(1, 6).map((user, i) => {
            const daysAgo = 5 - i; // 5 días atrás hasta 1 día atrás
            const date = new Date();
            date.setHours(17, 30, 0, 0); // Hora fija: 17:30
            date.setDate(date.getDate() - daysAgo);

            const isoDate = new Date(
              date.getTime() - date.getTimezoneOffset() * 60000
            ).toISOString();

            return {
              id: crypto.randomUUID(),
              contactId: user.id,
              name: `${user.firstName} ${user.lastName}`,
              date: isoDate,
              amount: 5000 + i * 1000,
              notes: [
                "Pago de servicios",
                "Cena",
                "Regalo",
                "Alquiler",
                "Varios",
              ][i],
            };
          });

          await dbWallet.transfers.bulkPut(mockTransfers);
        }

        queryClient.invalidateQueries({ queryKey: ["users-from-db"] });
        queryClient.invalidateQueries({ queryKey: ["contacts-from-db"] });
        queryClient.invalidateQueries({ queryKey: ["balance-from-db"] });
        queryClient.invalidateQueries({ queryKey: ["transfers-from-db"] });
      };

      persist();
    }
  }, [query.data]);

  return query;
};
