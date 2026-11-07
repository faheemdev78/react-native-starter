import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button, Card, Text, TextButton, TextField } from '@/components/ui';
import { AuthScaffold } from '@/features/auth/AuthScaffold';
import { forgotPasswordSchema, type ForgotPasswordValues } from '@/features/auth/schemas';
import { getErrorMessage } from '@/lib/errors';
import { useAuthStore } from '@/stores/auth-store';

export default function ForgotPasswordScreen() {
  const requestPasswordReset = useAuthStore((state) => state.requestPasswordReset);
  const [message, setMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setFormError(null);
    try {
      const nextMessage = await requestPasswordReset(values);
      setMessage(nextMessage);
    } catch (error) {
      setFormError(getErrorMessage(error));
    }
  });

  return (
    <AuthScaffold
      title="Reset password"
      subtitle="This mock accepts the request and stops there. No email is sent."
      footer={<TextButton label="Back to sign in" onPress={() => router.replace('/sign-in')} />}
    >
      {message ? (
        <Card>
          <Text variant="heading">Check your inbox</Text>
          <Text variant="body" color="muted">
            {message}
          </Text>
          <Button label="Return to sign in" onPress={() => router.replace('/sign-in')} />
        </Card>
      ) : (
        <>
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <TextField
                label="Email"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
                placeholder="you@company.com"
                keyboardType="email-address"
                autoComplete="email"
                textContentType="emailAddress"
              />
            )}
          />
          {formError ? (
            <Text variant="caption" color="danger">
              {formError}
            </Text>
          ) : null}
          <Button
            label="Send reset link"
            loading={form.formState.isSubmitting}
            onPress={() => {
              void onSubmit();
            }}
          />
        </>
      )}
    </AuthScaffold>
  );
}
