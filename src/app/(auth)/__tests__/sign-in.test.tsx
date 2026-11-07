import { fireEvent, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';

import SignInScreen from '@/app/(auth)/sign-in';
import { validationCopy } from '@/features/auth/schemas';
import { useAuthStore } from '@/stores/auth-store';
import { renderWithTheme } from '@/test/render';

jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
    push: jest.fn(),
  },
}));

describe('SignInScreen', () => {
  it('shows a validation message before calling auth', async () => {
    const screen = await renderWithTheme(<SignInScreen />);

    fireEvent.press(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByText(validationCopy.email)).toBeTruthy();
    expect(useAuthStore.getState().status).toBe('signedOut');
  });

  it('signs in with the demo account', async () => {
    const screen = await renderWithTheme(<SignInScreen />);

    fireEvent.press(screen.getByRole('button', { name: 'Use demo account' }));
    fireEvent.press(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      expect(useAuthStore.getState().status).toBe('signedIn');
    });
    expect(router.replace).toHaveBeenCalledWith('/');
  });
});
