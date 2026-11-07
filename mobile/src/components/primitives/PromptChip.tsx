// Figma: Prompt Chip 894:555 — https://www.figma.com/design/Eo7DWsANnIc4IbnsYmrZX9?node-id=894-555
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { palette, spacing } from '@/tokens';

import { Asset } from './Asset';
import { Text } from './Text';

type PromptChipProps = { label: string; onPress?: () => void; accessibilityHint?: string; style?: StyleProp<ViewStyle> };

export function PromptChip({ label, onPress, accessibilityHint, style }: PromptChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityHint={accessibilityHint}
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.chip, pressed && { backgroundColor: palette.neutral[300] }, style]}
    >
      <Asset name="icon" width={20} />
      <Text color={palette.wireframe.textPrimary}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing[2],
    paddingLeft: spacing[4],
    paddingRight: 20,
    paddingVertical: 10,
    minHeight: 44,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.neutral[300],
    backgroundColor: palette.white,
  },
});
