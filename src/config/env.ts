import { z } from 'zod';

/**
 * Expo inlines EXPO_PUBLIC_ variables only when they are read as
 * `process.env.EXPO_PUBLIC_NAME`. Keep those expressions intact.
 */
const envSchema = z.object({
  appEnv: z.enum(['development', 'preview', 'production']).default('development'),
  apiUrl: z.url().default('https://api.example.com'),
  apiTimeoutMs: z.number().int().positive(),
});

export type Env = z.infer<typeof envSchema>;

export type PublicEnv = {
  EXPO_PUBLIC_APP_ENV?: string;
  EXPO_PUBLIC_API_URL?: string;
  EXPO_PUBLIC_API_TIMEOUT_MS?: string;
};

function blankToUndefined(value: string | undefined): string | undefined {
  if (value === undefined || value.trim() === '') {
    return undefined;
  }
  return value;
}

function parseTimeout(value: string | undefined): number {
  const raw = blankToUndefined(value);
  if (raw === undefined) {
    return 8000;
  }
  return Number(raw);
}

export function readEnv(overrides?: PublicEnv): Env {
  const source: PublicEnv = {
    EXPO_PUBLIC_APP_ENV: process.env.EXPO_PUBLIC_APP_ENV,
    EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
    EXPO_PUBLIC_API_TIMEOUT_MS: process.env.EXPO_PUBLIC_API_TIMEOUT_MS,
    ...overrides,
  };

  return envSchema.parse({
    appEnv: blankToUndefined(source.EXPO_PUBLIC_APP_ENV),
    apiUrl: blankToUndefined(source.EXPO_PUBLIC_API_URL),
    apiTimeoutMs: parseTimeout(source.EXPO_PUBLIC_API_TIMEOUT_MS),
  });
}

export const env = readEnv();
