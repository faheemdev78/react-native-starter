import { configureAuth } from '@/features/auth/dependencies';
import { createMockAuthService } from '@/features/auth/mock-auth-service';
import { createMemorySessionStorage } from '@/features/auth/session-storage';
import { useAuthStore } from '@/stores/auth-store';
import { useThemeStore } from '@/stores/theme-store';
import { configureTheme, createMemoryThemeStorage } from '@/theme/dependencies';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

beforeEach(() => {
  configureAuth({
    authService: createMockAuthService({ latencyMs: 0 }),
    sessionStorage: createMemorySessionStorage(),
  });
  useAuthStore.setState({ status: 'signedOut', session: null });

  configureTheme({ storage: createMemoryThemeStorage() });
  useThemeStore.setState({ status: 'ready', preference: 'light' });
});
