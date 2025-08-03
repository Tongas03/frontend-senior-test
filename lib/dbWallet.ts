import Dexie, { Table } from "dexie";
import { StoredUser, Balance, Transfer } from "@/types";

export class WalletDB extends Dexie {
  users!: Table<StoredUser>;
  contacts!: Table<StoredUser>;
  balances!: Table<Balance>;
  transfers!: Table<Transfer>;

  constructor() {
    super("wallet-db");
    this.version(1).stores({
      users: "id",
      contacts: "id",
      balances: "id",
      transfers: "id, contactId, date, amount, notes",
    });
  }
}

export const dbWallet = new WalletDB();
