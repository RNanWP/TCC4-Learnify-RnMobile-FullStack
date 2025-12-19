import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const isWeb = Platform.OS === "web";

export async function saveStorageItem(key: string, value: string) {
  if (isWeb) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error("Erro no LocalStorage (Web):", e);
    }
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

export async function getStorageItem(key: string) {
  if (isWeb) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error("Erro no LocalStorage (Web):", e);
      return null;
    }
  } else {
    return await SecureStore.getItemAsync(key);
  }
}

export async function removeStorageItem(key: string) {
  if (isWeb) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error("Erro no LocalStorage (Web):", e);
    }
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}
