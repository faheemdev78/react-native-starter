import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Stack, ThemeProvider as NavigationThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, type ReactNode } from 'react';

import { AppProviders } from '@/providers/AppProviders';
import { useAuthStore } from '@/stores/auth-store';
import { useThemeStore } from '@/stores/theme-store';
import { createNavigationTheme } from '@/theme/navigation';
import { useTheme } from '@/theme';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

export const unstable_settings = {
  anchor: '(app)',
};

export default function RootLayout() {
  useEffect(() => {
    void useAuthStore.getState().hydrate();
    void useThemeStore.getState().hydrate();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProviders>
        <SplashGate>
          <RootNavigator />
        </SplashGate>
      </AppProviders>
    </GestureHandlerRootView>
  );
}

function SplashGate({ children }: { children: ReactNode }) {
  const authStatus = useAuthStore((state) => state.status);
  const themeStatus = useThemeStore((state) => state.status);
  const theme = useTheme();
  const ready = authStatus !== 'loading' && themeStatus !== 'loading';

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <>
      <StatusBar style={theme.scheme === 'dark' ? 'light' : 'dark'} />
      {children}
    </>
  );
}

function RootNavigator() {
  const theme = useTheme();
  const status = useAuthStore((state) => state.status);
  const isSignedIn = status === 'signedIn';

  return (
    <NavigationThemeProvider value={createNavigationTheme(theme)}>
      <Stack screenOptions={{ headerShown: false }}>
        {/*
          Sign-in lives at /sign-in, not /. On SDK 58 a guarded home at /
          and a redirect back to / can loop, so each guard names its target.
        */}
        <Stack.Protected guard={isSignedIn} redirectTo="/sign-in">
          <Stack.Screen name="(app)" />
        </Stack.Protected>
        <Stack.Protected guard={!isSignedIn} redirectTo="/">
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
    </NavigationThemeProvider>
  );
}
