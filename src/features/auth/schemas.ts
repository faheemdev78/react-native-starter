import { z } from 'zod';

export const validationCopy = {
  email: 'Enter a valid email',
  passwordRequired: 'Enter your password',
  name: 'Enter your name',
  nameLong: 'Keep your name under 60 characters',
  passwordLength: 'Use at least 8 characters',
  passwordLetter: 'Include a letter',
  passwordNumber: 'Include a number',
  confirmPassword: 'Confirm your password',
  passwordMismatch: 'Passwords do not match',
} as const;

const passwordSchema = z
  .string()
  .min(8, validationCopy.passwordLength)
  .regex(/[A-Za-z]/, validationCopy.passwordLetter)
  .regex(/[0-9]/, validationCopy.passwordNumber);

export const signInSchema = z.object({
  email: z.email(validationCopy.email),
  password: z.string().min(1, validationCopy.passwordRequired),
});

export const signUpSchema = z
  .object({
    name: z.string().trim().min(2, validationCopy.name).max(60, validationCopy.nameLong),
    email: z.email(validationCopy.email),
    password: passwordSchema,
    confirmPassword: z.string().min(1, validationCopy.confirmPassword),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: validationCopy.passwordMismatch,
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: z.email(validationCopy.email),
});

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
