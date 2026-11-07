import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { useTheme } from '@/theme';

type MonogramProps = {
  label?: string;
  size?: number;
};

export function Monogram({ label = 'F', size = 36 }: MonogramProps) {
  const theme = useTheme();

  return (
    <View
      accessibilityElementsHidden
      style={{
        width: size,
        height: size,
        borderRadius: theme.radii.md,
        backgroundColor: theme.colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text variant="label" color="onAccent">
        {label}
      </Text>
    </View>
  );
}
