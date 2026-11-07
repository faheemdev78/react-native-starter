import { delay } from '@/lib/delay';
import type { AuthService } from '@/features/auth/auth-service';
import { DEMO_ACCOUNT, PASSWORD_RESET_MESSAGE } from '@/features/auth/demo-account';
import { AuthError } from '@/features/auth/errors';
import { issueToken, readToken } from '@/features/auth/token';
import type { AuthSession, AuthUser } from '@/features/auth/types';

type StoredUser = {
  password: string;
  user: AuthUser;
};

type MockAuthOptions = {
  latencyMs?: number;
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function createMockAuthService(options?: MockAuthOptions): AuthService {
  const latencyMs = options?.latencyMs ?? 0;
  let sequence = 1;
  const users = new Map<string, StoredUser>([
    [
      DEMO_ACCOUNT.email,
      {
        password: DEMO_ACCOUNT.password,
        user: {
          id: 'user_recruiter',
          name: DEMO_ACCOUNT.name,
          email: DEMO_ACCOUNT.email,
        },
      },
    ],
  ]);

  const pause = async () => {
    if (latencyMs > 0) {
      await delay(latencyMs);
    }
  };

  const sessionFor = (user: AuthUser): AuthSession => ({
    token: issueToken(user),
    user,
  });

  return {
    async signIn(input) {
      await pause();
      const email = normalizeEmail(input.email);
      const record = users.get(email);
      if (!record || record.password !== input.password) {
        throw new AuthError('invalid_credentials', 'Email or password is incorrect.');
      }
      return sessionFor(record.user);
    },

    async signUp(input) {
      await pause();
      const email = normalizeEmail(input.email);
      if (users.has(email)) {
        throw new AuthError('email_taken', 'An account with that email already exists.');
      }

      sequence += 1;
      const user: AuthUser = {
        id: `user_${sequence}`,
        name: input.name.trim(),
        email,
      };
      users.set(email, { password: input.password, user });
      return sessionFor(user);
    },

    async requestPasswordReset(input) {
      await pause();
      normalizeEmail(input.email);
      return { message: PASSWORD_RESET_MESSAGE };
    },

    async signOut() {
      await pause();
    },

    async restoreSession(token) {
      await pause();
      const user = readToken(token);
      if (!user) {
        return null;
      }
      return { token, user };
    },
  };
}
