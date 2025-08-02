import Dexie, { Table } from "dexie";
import { StoredUser, Balance } from "@/types";

export class WalletDB extends Dexie {
  users!: Table<StoredUser>;
  contacts!: Table<StoredUser>;
  balances!: Table<Balance>;

  constructor() {
    super("wallet-db");
    this.version(1).stores({
      users: "id",
      contacts: "id",
      balances: "id",
    });
  }
}

export const dbWallet = new WalletDB();
