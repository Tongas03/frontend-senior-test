import { dbWallet } from "./dbWallet";
import { Transfer } from "@/types";

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

export const getTransfersFromDB = async () => {
  return await dbWallet.transfers.toArray();
};

export const addTransferToDB = async (transfer: Transfer) => {
  return await dbWallet.transfers.add(transfer);
};
