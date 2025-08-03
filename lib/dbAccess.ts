import { dbWallet } from './dbWallet'

export const getUserFromDB = async () => {
  return await dbWallet.user.toCollection().first()
}

export const getContactsFromDB = async () => {
  return await dbWallet.contacts.toArray()
}