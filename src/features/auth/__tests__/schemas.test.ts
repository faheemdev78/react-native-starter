import { validationCopy, signInSchema, signUpSchema } from '@/features/auth/schemas';

describe('auth schemas', () => {
  it('rejects a sign-in form without an email', () => {
    const result = signInSchema.safeParse({ email: '', password: '' });

    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
      expect(messages).toContain(validationCopy.email);
      expect(messages).toContain(validationCopy.passwordRequired);
    }
  });

  it('accepts a matching sign-up and rejects a mismatch', () => {
    const valid = signUpSchema.safeParse({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'analytic1',
      confirmPassword: 'analytic1',
    });
    const mismatch = signUpSchema.safeParse({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'analytic1',
      confirmPassword: 'different1',
    });

    expect(valid.success).toBe(true);
    expect(mismatch.success).toBe(false);
    if (!mismatch.success) {
      expect(
        mismatch.error.issues.some((issue) => issue.message === validationCopy.passwordMismatch),
      ).toBe(true);
    }
  });
});
