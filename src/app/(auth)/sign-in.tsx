import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button, Card, Text, TextButton, TextField } from '@/components/ui';
import { AuthScaffold } from '@/features/auth/AuthScaffold';
import { DEMO_ACCOUNT } from '@/features/auth/demo-account';
import { signInSchema, type SignInValues } from '@/features/auth/schemas';
import { getErrorMessage } from '@/lib/errors';
import { useAuthStore } from '@/stores/auth-store';
import { useTheme } from '@/theme';

export default function SignInScreen() {
  const theme = useTheme();
  const signIn = useAuthStore((state) => state.signIn);
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setFormError(null);
    try {
      await signIn(values);
      router.replace('/');
    } catch (error) {
      setFormError(getErrorMessage(error));
    }
  });

  return (
    <AuthScaffold
      title="Sign in"
      subtitle="The seeded account lives in the mock service. Nothing is sent to a server."
      footer={
        <View style={{ gap: theme.spacing.md }}>
          <TextButton label="Forgot password?" onPress={() => router.push('/forgot-password')} />
          <TextButton label="Create an account" onPress={() => router.push('/sign-up')} />
        </View>
      }
    >
      <Card>
        <Text variant="label">Demo account</Text>
        <Text variant="mono" color="muted">
          {DEMO_ACCOUNT.email}
        </Text>
        <Text variant="mono" color="muted">
          {DEMO_ACCOUNT.password}
        </Text>
        <Button
          label="Use demo account"
          variant="secondary"
          onPress={() => {
            form.setValue('email', DEMO_ACCOUNT.email, { shouldValidate: true });
            form.setValue('password', DEMO_ACCOUNT.password, { shouldValidate: true });
          }}
        />
      </Card>

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
            testID="sign-in-email"
          />
        )}
      />
      <Controller
        control={form.control}
        name="password"
        render={({ field, fieldState }) => (
          <TextField
            label="Password"
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
            placeholder="Your password"
            secureTextEntry
            autoComplete="current-password"
            textContentType="password"
            returnKeyType="go"
            onSubmitEditing={() => {
              void onSubmit();
            }}
            testID="sign-in-password"
          />
        )}
      />

      {formError ? (
        <Text variant="caption" color="danger" accessibilityLiveRegion="polite">
          {formError}
        </Text>
      ) : null}

      <Button
        label="Sign in"
        loading={form.formState.isSubmitting}
        onPress={() => {
          void onSubmit();
        }}
      />
    </AuthScaffold>
  );
}
