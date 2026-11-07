import { Pressable } from 'react-native';

import { Text } from '@/components/ui/Text';

type TextButtonProps = {
  label: string;
  onPress: () => void;
};

export function TextButton({ label, onPress }: TextButtonProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} hitSlop={8}>
      <Text variant="label" color="accent">
        {label}
      </Text>
    </Pressable>
  );
}
