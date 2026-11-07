import type { AuthService } from '@/features/auth/auth-service';
import { createMockAuthService } from '@/features/auth/mock-auth-service';
import { createSecureSessionStorage, type SessionStorage } from '@/features/auth/session-storage';

export type AuthDependencies = {
  authService: AuthService;
  sessionStorage: SessionStorage;
};

const defaults: AuthDependencies = {
  authService: createMockAuthService({ latencyMs: 280 }),
  sessionStorage: createSecureSessionStorage(),
};

let current = defaults;

export function getAuthDependencies(): AuthDependencies {
  return current;
}

/** Replace the mock service or session storage. Production code uses the defaults. */
export function configureAuth(next: Partial<AuthDependencies>): void {
  current = { ...current, ...next };
}
