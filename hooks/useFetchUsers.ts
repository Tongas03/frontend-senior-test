"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { dbWallet } from "@/lib";
import { StoredUser } from "@/types";

export const useFetchUsers = () => {
  const query = useQuery({
    queryKey: ["initial-users"],
    queryFn: async () => {
      const res = await fetch("https://randomuser.me/api/?results=11");
      const data = await res.json();
      return data?.results ?? []
    },
    staleTime: Infinity,
    enabled: true,
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

      // Persistir en IndexedDB
      const persist = async () => {
        await dbWallet.users.clear();
        await dbWallet.users.add(parsedUsers[0]);
        await dbWallet.contacts.clear();
        await dbWallet.contacts.bulkAdd(parsedUsers.slice(1));
        await dbWallet.balances.put({ id: 1, amount: 25000 });
      };

      persist();
    }
  }, [query.data]);

  return query;
};
