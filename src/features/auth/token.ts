import { authUserSchema, type AuthUser } from '@/features/auth/types';

const PREFIX = 'mock.';

export function issueToken(user: AuthUser): string {
  return `${PREFIX}${encodeURIComponent(JSON.stringify(user))}`;
}

export function readToken(token: string): AuthUser | null {
  if (!token.startsWith(PREFIX)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(token.slice(PREFIX.length)));
    const result = authUserSchema.safeParse(parsed);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
