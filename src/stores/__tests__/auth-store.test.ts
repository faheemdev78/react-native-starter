import { act, renderHook } from '@testing-library/react-native';

import { DEMO_ACCOUNT } from '@/features/auth/demo-account';
import { getAuthDependencies } from '@/features/auth/dependencies';
import { useAuthStore } from '@/stores/auth-store';

describe('useAuthStore', () => {
  it('hydrates a signed-out session when storage is empty', async () => {
    const { result } = await renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.hydrate();
    });

    expect(result.current.status).toBe('signedOut');
    expect(result.current.session).toBeNull();
  });

  it('signs in, persists the token, and signs out', async () => {
    const { result } = await renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.signIn({
        email: DEMO_ACCOUNT.email,
        password: DEMO_ACCOUNT.password,
      });
    });

    expect(result.current.status).toBe('signedIn');
    expect(result.current.session?.user.email).toBe(DEMO_ACCOUNT.email);
    await expect(getAuthDependencies().sessionStorage.getToken()).resolves.toBe(
      result.current.session?.token,
    );

    await act(async () => {
      await result.current.signOut();
    });

    expect(result.current.status).toBe('signedOut');
    await expect(getAuthDependencies().sessionStorage.getToken()).resolves.toBeNull();
  });
});
