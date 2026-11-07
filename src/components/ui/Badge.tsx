import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { useTheme } from '@/theme';

type BadgeProps = {
  label: string;
};

export function Badge({ label }: BadgeProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        backgroundColor: theme.colors.accentMuted,
        borderRadius: theme.radii.pill,
        paddingHorizontal: 10,
        paddingVertical: 4,
      }}
    >
      <Text variant="eyebrow" color="accent">
        {label}
      </Text>
    </View>
  );
}
