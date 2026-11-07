import AsyncStorage from '@react-native-async-storage/async-storage';

import { isThemePreference, type ThemePreference } from '@/theme/tokens';

const STORAGE_KEY = 'theme.preference';

export interface ThemeStorage {
  getPreference(): Promise<ThemePreference | null>;
  setPreference(preference: ThemePreference): Promise<void>;
}

export function createMemoryThemeStorage(initial?: ThemePreference): ThemeStorage {
  let preference = initial ?? null;
  return {
    async getPreference() {
      return preference;
    },
    async setPreference(next) {
      preference = next;
    },
  };
}

export function createAsyncThemeStorage(): ThemeStorage {
  return {
    async getPreference() {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      return isThemePreference(value) ? value : null;
    },
    async setPreference(preference) {
      await AsyncStorage.setItem(STORAGE_KEY, preference);
    },
  };
}

export type ThemeDependencies = {
  storage: ThemeStorage;
};

const defaults: ThemeDependencies = {
  storage: createAsyncThemeStorage(),
};

let current = defaults;

export function getThemeDependencies(): ThemeDependencies {
  return current;
}

export function configureTheme(next: Partial<ThemeDependencies>): void {
  current = { ...current, ...next };
}
