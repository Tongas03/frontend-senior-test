import Dexie, { Table } from "dexie";
import { StoredUser } from "@/types";

export class WalletDB extends Dexie {
  user!: Table<StoredUser>;
  contacts!: Table<StoredUser>;

  constructor() {
    super("wallet-db");
    this.version(1).stores({
      user: "id",
      contacts: "id",
    });
  }
}

export const dbWallet = new WalletDB();
