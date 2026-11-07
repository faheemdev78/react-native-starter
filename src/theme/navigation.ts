import { DarkTheme, DefaultTheme, type Theme } from 'expo-router';

import type { AppTheme } from '@/theme/ThemeProvider';

export function createNavigationTheme(theme: AppTheme): Theme {
  const base = theme.scheme === 'dark' ? DarkTheme : DefaultTheme;
  return {
    ...base,
    colors: {
      ...base.colors,
      primary: theme.colors.accent,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.ink,
      border: theme.colors.line,
      notification: theme.colors.danger,
    },
  };
}
