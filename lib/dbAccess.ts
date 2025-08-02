import { dbWallet } from './dbWallet'

export const getUserFromDB = async () => {
  const user = await dbWallet.users.toCollection().first()
  return user ?? null
}

export const getContactsFromDB = async () => {
  const contacts = await dbWallet.contacts.toArray()
  return contacts ?? []
}

export const getBalanceFromDB = async () => {
  const balance = await dbWallet.balances.get(1)
  return balance ?? { id: 1, amount: 0 }
}