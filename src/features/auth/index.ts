export type { AuthService } from '@/features/auth/auth-service';
export { DEMO_ACCOUNT, PASSWORD_RESET_MESSAGE } from '@/features/auth/demo-account';
export { configureAuth, getAuthDependencies } from '@/features/auth/dependencies';
export { AuthError } from '@/features/auth/errors';
export { createMockAuthService } from '@/features/auth/mock-auth-service';
export {
  forgotPasswordSchema,
  signInSchema,
  signUpSchema,
  validationCopy,
  type ForgotPasswordValues,
  type SignInValues,
  type SignUpValues,
} from '@/features/auth/schemas';
export { createMemorySessionStorage } from '@/features/auth/session-storage';
export type {
  AuthSession,
  AuthUser,
  PasswordResetInput,
  SignInInput,
  SignUpInput,
} from '@/features/auth/types';
