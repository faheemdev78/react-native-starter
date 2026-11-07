import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button, Text, TextButton, TextField } from '@/components/ui';
import { AuthScaffold } from '@/features/auth/AuthScaffold';
import { signUpSchema, type SignUpValues } from '@/features/auth/schemas';
import { getErrorMessage } from '@/lib/errors';
import { useAuthStore } from '@/stores/auth-store';
import { useTheme } from '@/theme';

export default function SignUpScreen() {
  const theme = useTheme();
  const signUp = useAuthStore((state) => state.signUp);
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setFormError(null);
    try {
      await signUp({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      router.replace('/');
    } catch (error) {
      setFormError(getErrorMessage(error));
    }
  });

  return (
    <AuthScaffold
      title="Create an account"
      subtitle="The account stays in memory for this session. The seeded recruiter login always works."
      footer={
        <TextButton
          label="Already have an account? Sign in"
          onPress={() => router.replace('/sign-in')}
        />
      }
    >
      <View style={{ gap: theme.spacing.lg }}>
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <TextField
              label="Name"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              placeholder="Your name"
              autoCapitalize="words"
              autoComplete="name"
              textContentType="name"
            />
          )}
        />
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
              hint="At least 8 characters, with a letter and a number."
              placeholder="Create a password"
              secureTextEntry
              autoComplete="new-password"
              textContentType="newPassword"
            />
          )}
        />
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <TextField
              label="Confirm password"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              placeholder="Repeat your password"
              secureTextEntry
              autoComplete="new-password"
              textContentType="newPassword"
            />
          )}
        />
        {formError ? (
          <Text variant="caption" color="danger">
            {formError}
          </Text>
        ) : null}
        <Button
          label="Create account"
          loading={form.formState.isSubmitting}
          onPress={() => {
            void onSubmit();
          }}
        />
      </View>
    </AuthScaffold>
  );
}
