import Constants from 'expo-constants';
import { useState } from 'react';
import { View } from 'react-native';

import { ThemePreferenceControl } from '@/components/theme/ThemePreferenceControl';
import { Button, Card, Monogram, Screen, Text } from '@/components/ui';
import { getErrorMessage } from '@/lib/errors';
import { useAuthStore } from '@/stores/auth-store';
import { useTheme } from '@/theme';

export default function ProfileScreen() {
  const theme = useTheme();
  const session = useAuthStore((state) => state.session);
  const signOut = useAuthStore((state) => state.signOut);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const version = Constants.expoConfig?.version ?? '1.0.0';
  const initial = session?.user.name.trim().charAt(0).toUpperCase() || 'F';

  return (
    <Screen scroll testID="profile-screen">
      <View style={{ gap: theme.spacing.sm }}>
        <Text variant="eyebrow" color="muted">
          Account
        </Text>
        <Text variant="display">Profile</Text>
      </View>

      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
          <Monogram label={initial} size={52} />
          <View style={{ flex: 1, gap: 2 }}>
            <Text variant="heading">{session?.user.name ?? 'Signed out'}</Text>
            <Text variant="caption" color="muted">
              {session?.user.email ?? 'No session'}
            </Text>
          </View>
        </View>
      </Card>

      <Card>
        <Text variant="label">Appearance</Text>
        <Text variant="caption" color="muted">
          System follows the device. Light and dark are saved on this device.
        </Text>
        <ThemePreferenceControl />
      </Card>

      <Card>
        <Text variant="label">Session</Text>
        <Text variant="body" color="muted">
          Signing out clears the token from secure storage and returns you to the sign-in screen.
        </Text>
        {error ? (
          <Text variant="caption" color="danger">
            {error}
          </Text>
        ) : null}
        <Button
          label="Sign out"
          variant="danger"
          loading={submitting}
          onPress={() => {
            setSubmitting(true);
            setError(null);
            void signOut()
              .catch((signOutError: unknown) => {
                setError(getErrorMessage(signOutError));
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        />
      </Card>

      <Text variant="caption" color="muted">
        RN Starter {version} · faheemdev78
      </Text>
    </Screen>
  );
}
