import { create } from 'zustand';

import { getAuthDependencies } from '@/features/auth/dependencies';
import type {
  AuthSession,
  PasswordResetInput,
  SignInInput,
  SignUpInput,
} from '@/features/auth/types';

type AuthStatus = 'loading' | 'signedOut' | 'signedIn';

type AuthState = {
  status: AuthStatus;
  session: AuthSession | null;
  hydrate: () => Promise<void>;
  signIn: (input: SignInInput) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<void>;
  requestPasswordReset: (input: PasswordResetInput) => Promise<string>;
  signOut: () => Promise<void>;
};

async function persistSession(session: AuthSession): Promise<void> {
  await getAuthDependencies().sessionStorage.setToken(session.token);
}

export const useAuthStore = create<AuthState>((set) => ({
  status: 'loading',
  session: null,
  hydrate: async () => {
    try {
      const { authService, sessionStorage } = getAuthDependencies();
      const token = await sessionStorage.getToken();
      if (!token) {
        set({ status: 'signedOut', session: null });
        return;
      }

      const session = await authService.restoreSession(token);
      if (!session) {
        await sessionStorage.setToken(null);
        set({ status: 'signedOut', session: null });
        return;
      }

      set({ status: 'signedIn', session });
    } catch {
      set({ status: 'signedOut', session: null });
    }
  },
  signIn: async (input) => {
    const session = await getAuthDependencies().authService.signIn(input);
    await persistSession(session);
    set({ status: 'signedIn', session });
  },
  signUp: async (input) => {
    const session = await getAuthDependencies().authService.signUp(input);
    await persistSession(session);
    set({ status: 'signedIn', session });
  },
  requestPasswordReset: async (input) => {
    const result = await getAuthDependencies().authService.requestPasswordReset(input);
    return result.message;
  },
  signOut: async () => {
    const { authService, sessionStorage } = getAuthDependencies();
    try {
      await authService.signOut();
    } finally {
      await sessionStorage.setToken(null);
      set({ status: 'signedOut', session: null });
    }
  },
}));
