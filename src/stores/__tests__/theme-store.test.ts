import { act, renderHook } from '@testing-library/react-native';

import { useThemeStore } from '@/stores/theme-store';
import { getThemeDependencies } from '@/theme/dependencies';

describe('useThemeStore', () => {
  it('hydrates a saved preference', async () => {
    await getThemeDependencies().storage.setPreference('dark');
    const { result } = await renderHook(() => useThemeStore());

    await act(async () => {
      await result.current.hydrate();
    });

    expect(result.current.preference).toBe('dark');
    expect(result.current.status).toBe('ready');
  });
});
