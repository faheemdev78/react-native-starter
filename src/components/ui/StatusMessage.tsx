import { View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';

type StatusMessageProps = {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function StatusMessage({ title, body, actionLabel, onAction }: StatusMessageProps) {
  return (
    <View style={{ gap: 12, paddingVertical: 24 }}>
      <Text variant="heading">{title}</Text>
      <Text variant="body" color="muted">
        {body}
      </Text>
      {actionLabel && onAction ? (
        <Button label={actionLabel} variant="secondary" onPress={onAction} />
      ) : null}
    </View>
  );
}
