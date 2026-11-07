import { DEMO_ACCOUNT, PASSWORD_RESET_MESSAGE } from '@/features/auth/demo-account';
import { AuthError } from '@/features/auth/errors';
import { createMockAuthService } from '@/features/auth/mock-auth-service';

describe('createMockAuthService', () => {
  const service = createMockAuthService();

  it('signs in the seeded account and restores that session', async () => {
    const session = await service.signIn({
      email: `  ${DEMO_ACCOUNT.email.toUpperCase()}  `,
      password: DEMO_ACCOUNT.password,
    });

    expect(session.user.email).toBe(DEMO_ACCOUNT.email);
    await expect(service.restoreSession(session.token)).resolves.toEqual(session);
  });

  it('rejects a wrong password', async () => {
    await expect(
      service.signIn({ email: DEMO_ACCOUNT.email, password: 'not-the-password' }),
    ).rejects.toBeInstanceOf(AuthError);
  });

  it('rejects a duplicate sign-up and accepts a new account', async () => {
    await expect(
      service.signUp({
        name: 'Guest Recruiter',
        email: DEMO_ACCOUNT.email,
        password: 'password123',
      }),
    ).rejects.toMatchObject({ code: 'email_taken' });

    const created = await service.signUp({
      name: 'New Person',
      email: 'new.person@example.com',
      password: 'password123',
    });

    expect(created.user.name).toBe('New Person');
  });

  it('returns the same reset message for known and unknown emails', async () => {
    await expect(service.requestPasswordReset({ email: DEMO_ACCOUNT.email })).resolves.toEqual({
      message: PASSWORD_RESET_MESSAGE,
    });
    await expect(service.requestPasswordReset({ email: 'missing@example.com' })).resolves.toEqual({
      message: PASSWORD_RESET_MESSAGE,
    });
  });

  it('drops a token that is not a mock session', async () => {
    await expect(service.restoreSession('not-a-token')).resolves.toBeNull();
  });
});
