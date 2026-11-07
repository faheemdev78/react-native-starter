import { fireEvent, waitFor } from '@testing-library/react-native';

import { ThemePreferenceControl } from '@/components/theme/ThemePreferenceControl';
import { useThemeStore } from '@/stores/theme-store';
import { renderWithTheme } from '@/test/render';

describe('ThemePreferenceControl', () => {
  it('stores the selected appearance', async () => {
    const screen = await renderWithTheme(<ThemePreferenceControl />);

    fireEvent.press(screen.getByRole('button', { name: 'Dark' }));

    await waitFor(() => {
      expect(useThemeStore.getState().preference).toBe('dark');
    });
  });
});
