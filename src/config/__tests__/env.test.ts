import { readEnv } from '@/config/env';

describe('readEnv', () => {
  it('fills defaults when the public values are blank', () => {
    expect(
      readEnv({
        EXPO_PUBLIC_APP_ENV: '',
        EXPO_PUBLIC_API_URL: '   ',
        EXPO_PUBLIC_API_TIMEOUT_MS: undefined,
      }),
    ).toEqual({
      appEnv: 'development',
      apiUrl: 'https://api.example.com',
      apiTimeoutMs: 8000,
    });
  });

  it('reads a valid override', () => {
    expect(
      readEnv({
        EXPO_PUBLIC_APP_ENV: 'preview',
        EXPO_PUBLIC_API_URL: 'https://preview.example.com',
        EXPO_PUBLIC_API_TIMEOUT_MS: '1500',
      }),
    ).toEqual({
      appEnv: 'preview',
      apiUrl: 'https://preview.example.com',
      apiTimeoutMs: 1500,
    });
  });

  it('rejects an unknown environment name', () => {
    expect(() => readEnv({ EXPO_PUBLIC_APP_ENV: 'staging' })).toThrow();
  });
});
