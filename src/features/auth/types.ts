import { z } from 'zod';

export const authUserSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.email(),
});

export type AuthUser = z.infer<typeof authUserSchema>;

export type AuthSession = {
  token: string;
  user: AuthUser;
};

export type SignInInput = {
  email: string;
  password: string;
};

export type SignUpInput = {
  name: string;
  email: string;
  password: string;
};

export type PasswordResetInput = {
  email: string;
};

export type PasswordResetResult = {
  message: string;
};
