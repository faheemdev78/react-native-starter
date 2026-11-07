import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { useThemeStore } from '@/stores/theme-store';
import { useTheme, themePreferences, type ThemePreference } from '@/theme';

const labels: Record<ThemePreference, string> = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
};

export function ThemePreferenceControl() {
  const theme = useTheme();
  const preference = useThemeStore((state) => state.preference);
  const setPreference = useThemeStore((state) => state.setPreference);

  return (
    <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
      {themePreferences.map((option) => {
        const selected = preference === option;
        return (
          <Pressable
            key={option}
            accessibilityRole="button"
            accessibilityLabel={labels[option]}
            accessibilityState={{ selected }}
            onPress={() => {
              void setPreference(option);
            }}
            style={{
              flex: 1,
              minHeight: 44,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: theme.radii.md,
              borderWidth: 1,
              borderColor: selected ? theme.colors.accent : theme.colors.line,
              backgroundColor: selected ? theme.colors.accentMuted : theme.colors.surface,
            }}
          >
            <Text variant="label" color={selected ? 'accent' : 'muted'}>
              {labels[option]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
