import { Link, Stack } from 'expo-router';

import { Screen, Text } from '@/components/ui';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found', headerShown: false }} />
      <Screen>
        <Text variant="display">That screen is not in the stack.</Text>
        <Text variant="body" color="muted">
          The route does not match a file in src/app.
        </Text>
        <Link href="/">
          <Text variant="label" color="accent">
            Go to home
          </Text>
        </Link>
      </Screen>
    </>
  );
}
