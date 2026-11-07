import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const STORAGE_KEY = 'auth.session.token';

export interface SessionStorage {
  getToken(): Promise<string | null>;
  setToken(token: string | null): Promise<void>;
}

export function createMemorySessionStorage(initial: string | null = null): SessionStorage {
  let token = initial;
  return {
    async getToken() {
      return token;
    },
    async setToken(next) {
      token = next;
    },
  };
}

export function createSecureSessionStorage(): SessionStorage {
  return {
    async getToken() {
      if (Platform.OS === 'web') {
        if (typeof localStorage === 'undefined') {
          return null;
        }
        return localStorage.getItem(STORAGE_KEY);
      }
      return SecureStore.getItemAsync(STORAGE_KEY);
    },
    async setToken(token) {
      if (Platform.OS === 'web') {
        if (typeof localStorage === 'undefined') {
          return;
        }
        if (token === null) {
          localStorage.removeItem(STORAGE_KEY);
        } else {
          localStorage.setItem(STORAGE_KEY, token);
        }
        return;
      }

      if (token === null) {
        await SecureStore.deleteItemAsync(STORAGE_KEY);
        return;
      }
      await SecureStore.setItemAsync(STORAGE_KEY, token);
    },
  };
}
