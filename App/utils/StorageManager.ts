import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Keychain from 'react-native-keychain'

export const setItem = async (itemName: string, data: any) => {
  const res = await AsyncStorage.setItem(itemName, JSON.stringify(data))
  return res
}

export const removeItem = async (itemName: string) => {
  const res = await AsyncStorage.removeItem(itemName)
  return res
}

export const getItem = async (itemName: string) => {
  const data = await AsyncStorage.getItem(itemName)
  return JSON.parse(data ?? '{}')
}

export async function storeCredentials<T> (username: string, password: string) {
  await Keychain.setGenericPassword(username, password)
}

export async function getCredentialsAsync<T> () {
  const credentials = await Keychain.getGenericPassword()
  if (!credentials) {
    return null
  }
  return {
    email: credentials.username,
    password: credentials.password,
  }
}

export const resetCredentials = async () => {
  await Keychain.resetGenericPassword()
}
