import { dbWallet } from "./dbWallet";
import { Transfer, TransferWithContact } from "@/types";
import { queryClient } from "@/lib";

export const getUserFromDB = async () => {
  const user = await dbWallet.users.toCollection().first();
  return user ?? null;
};

export const getContactsFromDB = async () => {
  const contacts = await dbWallet.contacts.toArray();
  return contacts ?? [];
};

export const getBalanceFromDB = async () => {
  const balance = await dbWallet.balances.get(1);
  return balance ?? { id: 1, amount: 0 };
};

export const getTransfersFromDB = async (): Promise<TransferWithContact[]> => {
  const transfers = await dbWallet.transfers.toArray();

  const contactIds = transfers.map((transfer) => transfer.contactId);
  const contacts = await dbWallet.contacts
    .where("id")
    .anyOf(contactIds)
    .toArray();

  const contactMap = new Map(contacts.map((contact) => [contact.id, contact]));

  return transfers.map((transfer) => ({
    ...transfer,
    contact: contactMap.get(transfer.contactId)!,
  }));
};

export const getTransfersWithContactsFromDB = async (): Promise<TransferWithContact[]> => {
  const transfers = await dbWallet.transfers.orderBy("date").reverse().toArray();
  const contacts = await dbWallet.contacts.toArray();


  const contactMap = new Map(contacts.map((contact) => [contact.id, contact]));


  return transfers.map((transfer) => ({
    ...transfer,
    contact: contactMap.get(transfer.contactId)!,
  }));
};

export const addTransferToDB = async (transfer: Transfer) => {
  return await dbWallet.transfers.put(transfer);
};

export const updateBalanceInDB = async (newAmount: number) => {
  await dbWallet.balances.put({ id: 1, amount: newAmount });
  queryClient.invalidateQueries({ queryKey: ["balance-from-db"] });
};
