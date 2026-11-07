import { create } from 'zustand';

import { getThemeDependencies } from '@/theme/dependencies';
import type { ThemePreference } from '@/theme/tokens';

type ThemeStatus = 'loading' | 'ready';

type ThemeState = {
  status: ThemeStatus;
  preference: ThemePreference;
  hydrate: () => Promise<void>;
  setPreference: (preference: ThemePreference) => Promise<void>;
};

export const useThemeStore = create<ThemeState>((set) => ({
  status: 'loading',
  preference: 'system',
  hydrate: async () => {
    try {
      const stored = await getThemeDependencies().storage.getPreference();
      set({ preference: stored ?? 'system', status: 'ready' });
    } catch {
      set({ preference: 'system', status: 'ready' });
    }
  },
  setPreference: async (preference) => {
    set({ preference, status: 'ready' });
    await getThemeDependencies().storage.setPreference(preference);
  },
}));
