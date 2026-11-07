import type {
  AuthSession,
  PasswordResetInput,
  PasswordResetResult,
  SignInInput,
  SignUpInput,
} from '@/features/auth/types';

/**
 * The only auth boundary screens are allowed to call.
 * Swap the mock for a network implementation without touching the UI.
 */
export interface AuthService {
  signIn(input: SignInInput): Promise<AuthSession>;
  signUp(input: SignUpInput): Promise<AuthSession>;
  requestPasswordReset(input: PasswordResetInput): Promise<PasswordResetResult>;
  signOut(): Promise<void>;
  restoreSession(token: string): Promise<AuthSession | null>;
}
