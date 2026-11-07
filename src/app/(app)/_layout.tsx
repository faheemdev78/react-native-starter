import { Stack } from 'expo-router';

import { useTheme } from '@/theme';

export default function AppLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.ink,
        headerShadowVisible: false,
        headerTitleStyle: { fontFamily: theme.fonts.display, fontSize: 18 },
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="article/[id]" options={{ title: 'Note' }} />
    </Stack>
  );
}
