import { Platform } from 'react-native';

export const palette = {
  light: {
    background: '#F4F0E6',
    surface: '#FFFDF8',
    ink: '#1C1915',
    muted: '#6E675E',
    line: '#E3DACB',
    accent: '#0F6E6B',
    accentMuted: '#E5F3F2',
    onAccent: '#F4F0E6',
    danger: '#8E2F2F',
    dangerMuted: '#F8E6E4',
    onDanger: '#FFFDF8',
  },
  dark: {
    background: '#121410',
    surface: '#1C1F1A',
    ink: '#F3EDE2',
    muted: '#A8A093',
    line: '#2E332C',
    accent: '#7DCEC8',
    accentMuted: '#1A3331',
    onAccent: '#10211F',
    danger: '#F0A3A0',
    dangerMuted: '#3A2220',
    onDanger: '#1C1915',
  },
} as const;

export type ColorSchemeName = keyof typeof palette;
export type ThemeColors = (typeof palette)[ColorSchemeName];

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

function platformFont(ios: string, android: string, fallback: string): string {
  return Platform.select({ ios, android, default: fallback }) ?? fallback;
}

export const fonts = {
  display: platformFont('Georgia', 'serif', 'Georgia'),
  body: platformFont('System', 'sans-serif', 'system-ui'),
  mono: platformFont('Menlo', 'monospace', 'ui-monospace'),
} as const;

export const themePreferences = ['system', 'light', 'dark'] as const;
export type ThemePreference = (typeof themePreferences)[number];

export function isThemePreference(value: string | null | undefined): value is ThemePreference {
  return value === 'system' || value === 'light' || value === 'dark';
}
