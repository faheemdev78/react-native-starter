import { AuthError } from '@/features/auth/errors';
import { ApiError } from '@/services/api/errors';

export function getErrorMessage(error: unknown): string {
  if (error instanceof AuthError || error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error && error.message.length > 0) {
    return error.message;
  }

  return 'Something went wrong. Try again.';
}
