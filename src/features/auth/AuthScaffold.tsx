import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Monogram, Screen, Text } from '@/components/ui';
import { useTheme } from '@/theme';

type AuthScaffoldProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthScaffold({ title, subtitle, children, footer }: AuthScaffoldProps) {
  const theme = useTheme();

  return (
    <Screen scroll footer={footer} testID="auth-screen">
      <View style={{ gap: theme.spacing.lg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
          <Monogram />
          <Text variant="eyebrow" color="muted">
            faheemdev78
          </Text>
        </View>
        <View style={{ gap: theme.spacing.sm }}>
          <Text variant="display">{title}</Text>
          <Text variant="body" color="muted">
            {subtitle}
          </Text>
        </View>
      </View>
      {children}
    </Screen>
  );
}
