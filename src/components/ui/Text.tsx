import {
  Text as NativeText,
  type TextProps as NativeTextProps,
  type TextStyle,
} from 'react-native';

import { useTheme } from '@/theme';

type Variant = 'display' | 'title' | 'heading' | 'body' | 'caption' | 'label' | 'eyebrow' | 'mono';
type ColorName = 'ink' | 'muted' | 'accent' | 'danger' | 'onAccent' | 'onDanger';

type TextProps = NativeTextProps & {
  variant?: Variant;
  color?: ColorName;
};

export function Text({ variant = 'body', color = 'ink', style, ...rest }: TextProps) {
  const theme = useTheme();

  const variantStyle: TextStyle = {
    display: {
      fontFamily: theme.fonts.display,
      fontSize: 36,
      lineHeight: 42,
      color: theme.colors.ink,
    },
    title: {
      fontFamily: theme.fonts.display,
      fontSize: 28,
      lineHeight: 34,
      color: theme.colors.ink,
    },
    heading: {
      fontFamily: theme.fonts.display,
      fontSize: 22,
      lineHeight: 28,
      color: theme.colors.ink,
    },
    body: {
      fontFamily: theme.fonts.body,
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.ink,
    },
    caption: {
      fontFamily: theme.fonts.body,
      fontSize: 13,
      lineHeight: 18,
      color: theme.colors.ink,
    },
    label: {
      fontFamily: theme.fonts.body,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '600' as const,
      color: theme.colors.ink,
    },
    eyebrow: {
      fontFamily: theme.fonts.body,
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '600' as const,
      letterSpacing: 1.1,
      textTransform: 'uppercase' as const,
      color: theme.colors.ink,
    },
    mono: {
      fontFamily: theme.fonts.mono,
      fontSize: 13,
      lineHeight: 18,
      color: theme.colors.ink,
    },
  }[variant];

  return <NativeText {...rest} style={[variantStyle, { color: theme.colors[color] }, style]} />;
}
